2016-05-17 v2.0.0
=================

### Breaking
* Added `babel-plugin-add-module-exports` plugin so that CommonJS can just use `require('babel-plugin-transform-mangle-names');` instead of `require('babel-plugin-transform-mangle-names').default;`