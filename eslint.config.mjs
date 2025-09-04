// eslint.config.mjs — ESLint v9 flat config (ESM)

import js from "@eslint/js";
import globals from "globals";
import security from "eslint-plugin-security"; // General JS security rules
import noUnsanitized from "eslint-plugin-no-unsanitized"; // DOM XSS guards (wp security)


// eslint.config.mjs


export default [
  // Ignore files/folders we never want to lint
  {
    ignores: [
      "**/node_modules/**",
      "**/vendor/**",
      "**/.git/**",
      "**/dist/**",
      "**/build/**",
      "**/*.min.js",
      "**/codemirror/**",
      "webpack.config.js",
      "eslint.config.mjs" // this file
    ],
  },

  // Base JS recommendations
  js.configs.recommended,

  // Project rules
  {
    files: ["**/*.js", "**/*.jsx"],

    // Use one clear sourceType (choose "script" for classic WP-style scripts)
    languageOptions: {
      ecmaVersion: "latest",// Use the latest ECMAScript version
      sourceType: "script", // 'script' for non-module scripts, 'module' for ES modules
      parserOptions: {
        ecmaFeatures: { jsx: true }, // allow JSX in *.jsx files
      },
      globals: {
        ...globals.browser,
        ...globals.node,

        // Project globals
        Backbone: "readonly",
        _: "readonly",
        jQuery: "readonly",
        console: "readonly",
        window: "readonly",
        document: "readonly",
        $: "readonly",
        setTimeout: "readonly",
        ht_commons_var: "readonly",
        htCommonsAutoload: "readonly",
        wp: "writable",
        passwordStrength: "readonly",
      },
    },

    plugins: {
      security,
      "no-unsanitized": noUnsanitized,
    },

    rules: {
      /* ───────── Spacing / Formatting ───────── */
      indent: ["error", "tab", { SwitchCase: 1 }],
      "no-trailing-spaces": "error",
      "max-len": ["warn", { code: 100, tabWidth: 4, ignoreUrls: true }],
      curly: ["error", "all"],
      "comma-spacing": ["error", { before: false, after: true }],
      "semi-spacing": ["error", { before: false, after: true }],
      "semi-style": ["error", "last"],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "space-infix-ops": "error",
      "array-bracket-spacing": ["error", "always"], // your chosen style
      "object-curly-spacing": ["error", "always"],
      "eol-last": ["error", "always"],
      "space-unary-ops": ["error", { words: true, nonwords: false, overrides: { "!": true } }],
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-before-blocks": ["error", "always"],
      "block-spacing": ["error", "always"],
      "space-before-function-paren": ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "space-in-parens": ["error", "always"],
      "computed-property-spacing": ["error", "always"],

      /* ───────── Objects & Arrays ───────── */
      "object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
      "comma-dangle": ["error", "always-multiline"],
      "array-bracket-newline": ["error", { multiline: true }],
      "array-element-newline": ["error", "consistent"],
      "comma-style": ["error", "last"],
      "func-call-spacing": ["error", "never"],

      /* ───────── Semicolons ───────── */
      semi: ["error", "always"],

      /* ───────── Line Breaks ───────── */
      "function-paren-newline": ["error", "multiline"],
      "object-curly-newline": ["error", { multiline: true, consistent: true }],
      "operator-linebreak": ["error", "after"],
      "multiline-ternary": ["error", "always-multiline"],
      "newline-per-chained-call": ["error", { ignoreChainWithDepth: 1 }],

      /* ───────── Naming ───────── */
      camelcase: ["error", { properties: "always" }],
      "func-names": ["error", "always"],
      "id-length": ["error", { min: 2, exceptions: ["$", "i"] }],
      "new-cap": ["error", { newIsCap: true, capIsNew: false }],

      /* ───────── Switch & Blocks ───────── */
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "default-case": "error",
      "no-fallthrough": "error",

      /* ───────── Best Practices ───────── */
      "no-array-constructor": "error",
      "dot-notation": "error",
      "no-new-object": "error",
      "no-unused-vars": ["error", { args: "none" }],
      "no-constant-condition": "error",
      "no-unmodified-loop-condition": "error",
      "no-await-in-loop": "warn",
      "no-iterator": "error",
      "no-proto": "error",
      "no-labels": "error",
      "no-extra-bind": "error",
      "no-new-wrappers": "error",
      "no-return-assign": ["error", "always"],
      "prefer-const": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",

      /* ───────── Equality & Types ───────── */
      eqeqeq: ["error", "always", { null: "ignore" }],

      /* ───────── Strings ───────── */
      quotes: ["error", "single", { avoidEscape: true }],

      /* ───────── Comments ───────── */
      "spaced-comment": ["error", "always", { exceptions: ["-"] }],
      "lines-around-comment": [
        "error",
        {
          beforeBlockComment: true,
          beforeLineComment: true,
          allowBlockStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
        },
      ],

      /* ───────── Restricted Globals ───────── */
      "no-restricted-globals": [
        "error",
        { name: "$", message: "Use $ only inside (function($){ ... })(jQuery);" },
      ],

      /* ───────── Security (General + WP) ───────── */
      // Core ESLint security-sensitive patterns
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      "no-prototype-builtins": "error",
      "no-extend-native": "error",

      // Disallow obvious DOM sinks without sanitization
      "no-restricted-properties": [
        "error",
        { object: "document", property: "write", message: "Avoid document.write; use safe rendering. // wp security" }
      ],

      // Plugin: eslint-plugin-no-unsanitized (DOM XSS)
      "no-unsanitized/method": "error", // innerHTML/insertAdjacentHTML etc. require sanitization - wp security
      "no-unsanitized/property": "error", // element.innerHTML/outerHTML assignments - wp security

      // eslint-plugin-security
      "security/detect-eval-with-expression": "error",
      "security/detect-non-literal-regexp": "warn",
      "security/detect-non-literal-require": "warn",
      "security/detect-object-injection": "warn",
      "security/detect-new-buffer": "error",
    },
  },
];