import js from "@eslint/js";
import globals from "globals";
import security from "eslint-plugin-security"; // General JS security rules
import noUnsanitized from "eslint-plugin-no-unsanitized"; // DOM XSS guards (wp security)


// eslint.config.mjs


export default [

	// Ignore files
	{
		ignores: ['**/eslint.config.mjs','webpack.config.js','**/*.min.js','**/codemirror/**']
	},

	// Base JS rules
	js.configs.recommended,

	// // WordPress plugin defaults (ENABLE IF NEEDED )
	// wordpressPlugin.configs.recommended,

  {
    files: ["**/*.js", "**/*.jsx"],

    languageOptions: 
    {
        ecmaVersion: "latest",// Use the latest ECMAScript version

        sourceType: 'script', // 'script' for non-module scripts, 'module' for ES modules

      

        sourceType: "module",// Use 'module' for ES modules
        globals: 
        {
          ...globals.browser,
          ...globals.node,
          // Allow Backbone globally(JavaScript MVC (Model-View-Controller) framework.)
          Backbone: "readonly",

          // Allow Underscore.js globally (JavaScript library that provides utility functions for common programming tasks.)
          _: "readonly",	

          // Allow jQuery globally
          jQuery: "readonly",
          
          // Allow console methods
          console: 'readonly',	

          // Allow window object in browser environments
          window: 'readonly',

          // Allow document object in browser environments
          document: 'readonly',
          // Allow $ for jQuery (use only inside (function($){ ... })(jQuery); )
          $: 'readonly',

          	// Allow setTimeout globally
          setTimeout: 'readonly',

          // Allow ht_commons_var globally (custom global variable, likely defined elsewhere in the project)
          ht_commons_var: 'readonly',
          
          // Allow htCommonsAutoload globally (custom global variable, likely defined elsewhere in the project)
          htCommonsAutoload: 'readonly',
          // Allow WordPress global object (used in WordPress development)
          wp: "writable",

          // Allow passwordStrength globally (used in WordPress for password strength validation)
          passwordStrength: "readonly"

        }

      },
    plugins: {
      security,
      "no-unsanitized": noUnsanitized
    },
    rules: {

      /* ────────────── Spacing ────────────── */

      indent: ["error", "tab", { SwitchCase: 1 }],//   [WPCS FOR JS] 

      "no-trailing-spaces": "error",//  [WPCS FOR JS] 

      "max-len": ["warn", { code: 100, tabWidth: 4, ignoreUrls: true }],// [NOT WPCS  EXACTLY BUT   BEST PRACTICE]

      curly: ["error", "all"],//  [WPCS FOR JS] 
	  
      "comma-spacing": ["error", { before: false, after: true }],//  [WPCS FOR JS] 

      "semi-spacing": ["error", { before: false, after: true }],//  [WPCS FOR JS] 

      "semi-style": ["error", "last"],//  [WPCS FOR JS] 

      "key-spacing": ["error", { beforeColon: false, afterColon: true }],//  [WPCS FOR JS] 

      "space-infix-ops": "error",//  [WPCS FOR JS] 

      "array-bracket-spacing": ["error", "always"], // WordPress style

      "object-curly-spacing": ["error", "always"],// [NOT WPCS  EXACTLY BUT   BEST PRACTICE]

      "eol-last": ["error", "always"],//  [WPCS FOR JS] 

      "space-unary-ops": [
        "error",
        { words: true, nonwords: false, overrides: { "!": true } }
      ],//  [WPCS FOR JS] 

      "keyword-spacing": ["error", { before: true, after: true }],//  [WPCS FOR JS] 

      "space-before-blocks": ["error", "always"],//  [WPCS FOR JS] 

      "block-spacing": ["error", "always"],//  [WPCS FOR JS] 

      "space-before-function-paren": ["error", "always"],// [NOT WPCS listed EXACTLY, BUT   BEST PRACTICE(only for wp adding it)]

      "no-multiple-empty-lines": ["error", { max: 1 }],//  [WPCS FOR JS] 

      "space-in-parens": ["error", "always"],// [NOT WPCS listed EXACTLY, BUT   BEST PRACTICE(only for wp adding it)]

      "computed-property-spacing": ["error", "always"],// [NOT WPCS listed EXACTLY, BUT   BEST PRACTICE(only for wp adding it)]

     //   "catch-spacing": ["error", { before: true, after: true }],   // not supported in ESLint v9.33


      /* ────────────── Objects & Arrays ────────────── */

      "object-property-newline": [
        "error",
        { allowAllPropertiesOnSameLine: true }
      ],// [WPCS FOR JS]
      
      "comma-dangle": ["error", "always-multiline"],//[NOT WPCS  EXACTLY BUT   BEST PRACTICE]
      "array-bracket-newline": ["error", { multiline: true }],//[NOT WPCS  EXACTLY BUT   BEST PRACTICE]
      "array-element-newline": ["error", "consistent"],//[NOT WPCS  EXACTLY BUT   BEST PRACTICE]
      "comma-style": ["error", "last"],// [WPCS FOR JS]
      "func-call-spacing": ["error", "never"],// [WPCS FOR JS]

      /* ────────────── Semicolons ────────────── */

      semi: ["error", "always"],// [WPCS FOR JS]

      /* ────────────── Line Breaks ────────────── */

      "function-paren-newline": ["error", "multiline"],//[NOT WPCS  EXACTLY BUT   BEST PRACTICE]
      "object-curly-newline": ["error", { multiline: true, consistent: true }],//[NOT WPCS EXACTLY  BUT  BEST PRACTICE]
      "operator-linebreak": ["error", "after"],//[NOT WPCS EXACTLY  BUT  BEST PRACTICE]
      "multiline-ternary": ["error", "always-multiline"],//[NOT WPCS BUT EXACTLY   BEST PRACTICE]
      "newline-per-chained-call": ["error", { ignoreChainWithDepth: 1 }],//[NOT WPCS EXACTLY BUT  BEST PRACTICE]



      /* ────────────── Naming ────────────── */
       camelcase: ["error", { properties: "always" }], // enforce camelCase  according to WPCS
	    // camelcase: [
			// 	'error',
			// 	{
			// 		properties: 'never',
			// 		allow: [
			// 			'^ht_',
			// 			'^l_',
			// 			'^local_',
			// 			'_handler$',
			// 			'_success$',
			// 			'_error$',
			// 			'_optimizer$',
			// 			'_notice$',
			// 			'^clear_',
			// 			'^autoload_',
			// 			'^optimize_',
			// 			'^ajax_',
			// 			'^fade_'
			// 		]
			// 	}
			// ],// enforce camelCase  according to HT-Commons customizations. - [CUSTOM RULE FOR HT-COMMONS]
	  
      "func-names": ["error", "always"],// enforce function names -  [WPCS FOR JS]

      "id-length": ["error", { min: 2, exceptions: ["$", "i"] }], // allow short names like $, i. ($ we added out of wpcs)

      // "id-match": 
      // [
      //     "error",
      
      //     // "^([a-z][a-zA-Z0-9]*|DOM[A-Z][a-zA-Z0-9]*|Id[A-Z][a-zA-Z0-9]*)$",
      //     "^[a-z][a-zA-Z0-9]*$",

      //     { onlyDeclarations: true, properties: true }

      // ],// enforce specific naming pattern for identifiers,(camelCase , DOMId , ID)-[WPCS FOR JS]

      "new-cap": ["error", { newIsCap: true, capIsNew: false }],

      /* ────────────── Switch & Blocks ────────────── */

      "brace-style": ["error", "1tbs", { allowSingleLine: true }],// [WPCS FOR JS]
      "default-case": "error",//[ESLint BEST PRACTICE]
      "no-fallthrough": "error",//[ESLint BEST PRACTICE]


      /* ────────────── Best Practices ────────────── */
      // ✅ Arrays
      "no-array-constructor": "error",

      // ✅ Objects
      "dot-notation": "error",// Use dot notation unless dynamic key or invalid string identifier. - []
      "no-new-object": "error",// // Use {} instead of new Object()- [WPCS FOR JS]
      // ✅ Iteration
      "no-unused-vars": ["error", { args: "none" }],

      "no-constant-condition": "error", // [WPCS FOR JS]
      "no-unmodified-loop-condition": "error", // [WPCS FOR JS]
      "no-await-in-loop": "warn", // [WPCS FOR JS]
      "no-iterator": "error", // [WPCS FOR JS]
      "no-proto": "error", // [WPCS FOR JS]
      "no-labels": "error", // [WPCS FOR JS]
      "no-extra-bind": "error", // [WPCS FOR JS]
      "no-new-wrappers": "error", // [WPCS FOR JS]
      "no-return-assign": ["error", "always"], // [WPCS FOR JS]

      "prefer-const": "error", // [WPCS FOR JS]
      "prefer-rest-params": "error", // [WPCS FOR JS]
      "prefer-spread": "error", // [WPCS ]


      /* ────────────── Equality & Types ────────────── */
      eqeqeq: ["error", "always", { null: "ignore" }],// [WPCS FOR JS]

      // "valid-typeof": "error",//[ESLINT DEFAULT]
      

      /* ────────────── Strings ────────────── */

      quotes: ["error", "single", { avoidEscape: true }],// [WPCS FOR JS]

      
      /* ────────────── Comments ────────────── */

      "spaced-comment": ["error", "always", { exceptions: ["-"] }],// [WPCS FOR JS]

      // "valid-jsdoc": "warn",
      // "require-jsdoc": [
      //   "warn",
      //   {
      //     require: {
      //       FunctionDeclaration: true,
      //       ClassDeclaration: true,
      //       MethodDefinition: true
      //     }
      //   }
      // ],  // not supported in ESLint v9.33

      "lines-around-comment": [
        "error",
        {
          beforeBlockComment: true,
          beforeLineComment: true,
          allowBlockStart: true,
          allowObjectStart: true,
          allowArrayStart: true
        }
      ],//[ESLINT RULE FOR SPACES IN START OF COMMENTS]

      /* ────────────── Restricted Globals ────────────── */

      "no-restricted-globals": [
        "error",
        { name: "$", message: "Use $ only inside (function($){ ... })(jQuery);" }
      ]//[WPCS FOR JS BUT INDIRECTLY]

      /* ────────────── Security (General + WP) ────────────── */
      // Core ESLint security-sensitive patterns
      "no-eval": "error", // Avoid eval (code injection) - wp security
      "no-implied-eval": "error", // setTimeout/setInterval with strings - wp security
      "no-new-func": "error", // Function("...") is like eval - wp security
      "no-script-url": "error", // Prevent javascript: URLs - wp security
      "no-prototype-builtins": "error", // Safer hasOwnProperty usage - general security
      "no-extend-native": "error", // Avoid patching built-ins - general security

      // Disallow obvious DOM sinks without sanitization
      "no-restricted-properties": [
        "error",
        { object: "document", property: "write", message: "Avoid document.write; use safe rendering. // wp security" }
      ],

      // Plugin: eslint-plugin-no-unsanitized (DOM XSS)
      "no-unsanitized/method": "error", // innerHTML/insertAdjacentHTML etc. require sanitization - wp security
      "no-unsanitized/property": "error", // element.innerHTML/outerHTML assignments - wp security

      // Plugin: eslint-plugin-security (general JS security)
      "security/detect-eval-with-expression": "error", // general security
      "security/detect-non-literal-regexp": "warn", // general security
      "security/detect-non-literal-require": "warn", // general security (Node)
      "security/detect-object-injection": "warn", // general security
      "security/detect-new-buffer": "error" // Node Buffer constructor is unsafe; use Buffer.from - general security
    }
  }
];
