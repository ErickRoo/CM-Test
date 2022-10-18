/**
 * Stylelint configs
 *
 * See https://stylelint.io/user-guide/configuration/ for more info on
 * Stylelint configs and plugins.
 */

module.exports = {
  extends: [
    // Extends the standard scss config from the `stylelint-config-standard-scss`
    // package, which does the following:
    // 1. Extends the `stylelint-config-standard` shared config and configures its rules for SCSS
    // 2. Extends the `stylelint-config-recommended-scss` shared config
    'stylelint-config-standard-scss',

    // Extends the config from `stylelint-config-recess-order`, which
    // uses the `stylelint-order` plugin to enforce the order of
    // CSS/SCSS properties
    'stylelint-config-recess-order',

    // Extends the recommended config from the `stylelint-prettier`
    // package, which does the following:
    // 1. Enables the `stylelint-plugin-prettier` plugin
    // 2. Enables the `prettier/prettier` rule
    // 3. Extends the `stylelint-config-prettier` configuration, which
    //    disables Stylelint rules that conflict with Prettier.
    //
    // See https://github.com/prettier/stylelint-config-prettier/blob/master/src/index.js
    // for the full list of disabled rules.
    'stylelint-prettier/recommended',
  ],
  plugins: [
    // Enables the `stylelint-order` plugin, but
    // does not enable the rules by default. We need to
    // enable them  manually in the `rules` section below.
    'stylelint-order',

    // Enables the `stylelint-declaration-block-no-ignored-properties` plugin,
    // which disallows property values that are ignored due to another property
    // value in the same rule. The rules from this plugin are not enabled  by
    // default.We need to enable them  manually in the `rules` section below.
    'stylelint-declaration-block-no-ignored-properties',

    // Enables the `stylelint-declaration-strict-value` plugin, which
    // will enforces either variables, functions or custom CSS values,
    // like keywords.
    'stylelint-declaration-strict-value',
  ],

  // Ignores the `public` and `.cache` directories
  // in each of the Gatsby sites in the `sites` directory.
  ignoreFiles: ['sites/**/public', 'sites/**/.cache'],

  // Overrides the default rules from the `stylelint-config-standard-scss`,
  // enables the rules from a few `stylelint-*` packages and includes a few
  // custom rules set by the TIME Engineering team. Some rules are disabled
  // by default by the `stylelint-config-prettier` package(see
  // `stylelint-prettier/recommended` above) since they conflict with the
  // `prettier/prettier` rule.
  rules: {
    // List of rules from the `stylelint-order` package
    'order/order': [
      [
        'custom-properties',
        'dollar-variables',
        'at-rules',
        'declarations',
        'rules',
        {
          // modifiers(if following BEM naming convention)
          type: 'rule',
          selector: '^&--',
        },
        {
          type: 'rule',
          selector: '^&:(before|after)',
        },
        {
          type: 'rule',
          selector: '^&::(before|after)',
        },
        {
          type: 'rule',
          selector: '^&:(first-child|last-child|nth-child|last-of-type|first-of-type|nth-of-type)',
        },
        {
          type: 'rule',
          selector: '&:hover',
        },
        {
          type: 'rule',
          selector: '&:focus',
        },
        {
          type: 'rule',
          selector: '&:active',
        },
        {
          type: 'rule',
          selector: '&:disabled',
        },
        {
          type: 'at-rule',
          name: 'supports',
          hasBlock: true,
        },
        {
          type: 'at-rule',
          name: 'media',
          hasBlock: true,
        },
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: true,
        },
      ],
      { severity: 'warning' },
    ],

    // List of rules from the `stylelint-declaration-block-no-ignored-properties` package
    'plugin/declaration-block-no-ignored-properties': true,

    // List of rules from the `stylelint-declaration-strict-value` package
    'scale-unlimited/declaration-strict-value': [
      ['/color$/', 'fill', 'stroke'],
      {
        ignoreValues: {
          '/color$/': ['currentColor', '/^#[0-9a-fA-F]{3,6}$/', 'inherit'],
          fill: ['currentColor', 'inherit'],
          stroke: 'currentColor',
          'z-index': '/^\\d+$/',
        },
        disableFix: true,
        severity: 'warning',
      },
    ],

    // List of rules set by the TIME Engineering team
    'comment-no-empty': true,
    'color-function-notation': 'modern',
    'font-family-name-quotes': 'always-unless-keyword',
    'property-no-unknown': [
      true,
      {
        checkPrefixed: true,
      },
    ],
    'selector-class-pattern': [
      // The RegEx below will allow classes to be written in kebab-case
      // lowerCamelCase, UpperCamelCase and follow BEM naming
      // conventions(optional).
      // More info on this RegEx can be found here:
      // https://gist.github.com/Potherca/f2a65491e63338659c3a0d2b07eee382
      '^[a-zA-Z]([a-zA-Z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$',
      {
        resolveNestedSelectors: true,
        message:
          'Expected class selector to be in kebab-case, lowerCamelCase or UpperCamelCase and optionally contain a dash or underscore',
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      }
    ]
  },
};

