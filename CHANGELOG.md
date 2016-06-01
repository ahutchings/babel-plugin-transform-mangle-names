2016-06-01 v2.1.2
=================

### Fixes

* Saves new variable names on `Program` to avoid clashes

2016-05-30 v2.1.1
=================

### Fixes

* Refactored back to just using one traversal as it seems to then handle variables in child scopes better
* Added tests

2016-05-18 v2.1.0
=================

### Features

* [#4](https://github.com/escompress/babel-plugin-transform-mangle-names/pull/4) can now shorten destructured arrays and default function parameters

2016-05-17 v2.0.0
=================

### Breaking
* Added `babel-plugin-add-module-exports` plugin so that CommonJS can just use `require('babel-plugin-transform-mangle-names');` instead of `require('babel-plugin-transform-mangle-names').default;`
