// error.js

// 1. Syntax Error (missing closing parenthesis)
function brokenSyntax () {
	console.log( 'This will cause a syntax error' );
}

// 3. Type Error (calling a number as a function)
function brokenType () {
	const num = 42;
	num(); // will throw TypeError
}

// Run them one by one
try {
	brokenSyntax();
} catch ( err ) {
	console.error( 'Caught Syntax Error:', err );
}

function brokenReference () {
	console.log( '' );
}

try {
	brokenReference();
} catch ( err ) {
	console.error( 'Caught Reference Error:', err );
}

try {
	brokenType();
} catch ( err ) {
	console.error( 'Caught Type Error:', err );
}

