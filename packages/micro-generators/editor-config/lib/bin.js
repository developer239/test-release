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

var doSomeCoreFunction = function (task) {
    // eslint-disable-next-line
    console.log('doing something:', task);
};

exports.doSomeCoreFunction = doSomeCoreFunction;
});

unwrapExports(lib);
var lib_1 = lib.doSomeCoreFunction;

var generateEditorConfig = function (task) {
    lib_1(task);
};

generateEditorConfig('generating from cli');
