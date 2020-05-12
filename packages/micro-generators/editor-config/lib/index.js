#!/usr/bin/env node
'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

var runTest = function (name) {
    // eslint-disable-next-line
    console.log('running test for', name);
};
var core = 'hello worlddd';

exports.core = core;
exports.runTest = runTest;
});

unwrapExports(lib);
var lib_1 = lib.core;
var lib_2 = lib.runTest;

lib_2('editor config so it works');
lib_2('editor config so it works');
