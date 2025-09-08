/**
 * @file loads in all ctc pages ( /click-to-chat - enqueued from ctc-pages.php )
 *  note :- @summary This file is responsible for all the functionality of the ctc pages.
 *
 * currency set. get location and try to set currency based on location.
 * stores at local storage. to load fast at pricing page.
 */
( function ( $ ) {
	$( document )
		.ready( function () {

			var ht_code_storage = {};

			function getStorageData () {
				console.log( 'app.js - getStorageData' );
				if ( localStorage.getItem( 'ht_code_storage' ) ) {
					ht_code_storage = localStorage.getItem( 'ht_code_storage' );
					ht_code_storage = JSON.parse( ht_code_storage );
					console.log( ht_code_storage );
				}
			}
			getStorageData();

			// get items from ht_code_storage
			function getItem ( item ) {
				console.log( 'app.js - getItem' );
				return ( ht_code_storage[ item ] ) ? ht_code_storage[ item ] : false;
			}

			// set items to ht_code_storage storage
			function setItem ( name, value ) {
				console.log( ht_code_storage );
				getStorageData();
				console.log( ht_code_storage );
				console.log( 'app.js - setItem: name: ' + name + ' value: ' + value );
				ht_code_storage[ name ] = value;
				console.log( ht_code_storage );
				var newValues = JSON.stringify( ht_code_storage );
				localStorage.setItem( 'ht_code_storage', newValues );
			}

			function pricing () {
				if ( getItem( 'currency' ) ) {
					return;
				}

				function determineCurrency ( loc ) {
					var eur_list = [
						'IT',   // Italy
						'DE',   // Germany
						'FR',   // France
						'ES',   // Spain
						'NL',   // Netherlands
						'PT',   // Portugal
						'AT',   // Austria
						'BE',   // Belgium
						'HR',   // Croatia
						'CY',   // Cyprus
						'EE',   // Estonia
						'FI',   // Finland
						'GR',   // Greece
						'IE',   // Ireland
						'LV',   // Latvia
						'LT',   // Lithuania
						'LU',   // Luxembourg
						'MT',   // Malta
						'SK',   // Slovakia
						'SI',    // Slovenia
					];

					var currencyMap = {
						'IN': 'INR',
						'GB': 'GBP',
						'AU': 'AUD',
						'CA': 'CAD',
						'IL': 'ILS',
						'JP': 'JPY',
						'MX': 'MXN',
						'PH': 'PHP',
						'RU': 'RUB',
						'SG': 'SGD',
						'TW': 'TWD',
					};

					return currencyMap[ loc ] || ( eur_list.includes( loc ) ? 'EUR' : 'USD' );
				}

				var loc = getItem( 'loc' );
				if ( loc ) {
					var currency = determineCurrency( loc );
					setItem( 'currency', currency );
					console.log( 'app.js - pricing: currency: ' + currency );
				} else {
					$.get( 'https://www.cloudflare.com/cdn-cgi/trace', function ( data ) {
						if ( data && data.length > 1 ) {
							var locMatch = data.match( /loc=(.*)\n/ );
							loc = locMatch ? locMatch[ 1 ] : '';
							setItem( 'loc', loc );

							var currency = determineCurrency( loc );
							setItem( 'currency', currency );
							console.log( 'app.js - pricing: currency: ' + currency );
						} else {
							console.log( 'Invalid or empty data from Cloudflare trace' );
						}
					} )
						.fail( function ( error ) {
							console.log( 'Failed to fetch location data', error );
							setItem( 'currency', 'USD' );
							console.log( 'app.js - pricing: currency: USD' );
						} );
				}

			}

			// Call the function
			pricing();

		} );
} )( jQuery );



