module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "warn",
            2
        ],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "warn", {"allow": ["assert", "warn", "error"]}
        ],
        "no-unused-vars": [
            "warn", {"varsIgnorePattern": '(Greeter|[rR]eact)'}
        ],
    }
};
