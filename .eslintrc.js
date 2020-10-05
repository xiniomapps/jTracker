module.exports = {
    "parser": "babel-eslint",
    "parserOptions": { 
        "ecmaVersion": 6
    },
    "env": {
        "browser": true,
        "amd": true,
        "jest": true,
        "es6": true,
        "node": true
    },
    "plugins": [
        "react",
        "flowtype"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:flowtype/recommended"
    ],
    "rules": {
		"comma-dangle": ["error", {
        "arrays": "always",
        "objects": "always",
		}],
        "no-trailing-spaces":"error",
        "jsx-quotes": ["error", "prefer-single"],
        "quotes": ["error", "single"],
        "no-multi-spaces": "error",
        "indent": ["error", 4,  { "SwitchCase": 1 }],
        "curly": "error",
        "no-var": "error",
        "semi": ["error", "always"],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "react/prop-types": ["error", { "ignore": ["navigation"] }],
        "keyword-spacing": ["error", { "before": true, "after": true }],
        "brace-style": ["error", "stroustrup"]
    },
    "globals": {
        "__DEV__": true
    }
}