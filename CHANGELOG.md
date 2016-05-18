2016-05-18 v2.1.0
=================

### Features

* [#4](https://github.com/escompress/babel-plugin-transform-mangle-names/pull/4) can now shorten destructured arrays and default function parameters

2016-05-17 v2.0.0
=================

### Breaking
* Added `babel-plugin-add-module-exports` plugin so that CommonJS can just use `require('babel-plugin-transform-mangle-names');` instead of `require('babel-plugin-transform-mangle-names').default;`
