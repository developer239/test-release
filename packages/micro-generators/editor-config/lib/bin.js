#!/usr/bin/env node
'use strict';

var core = require('@test-release/core');

var generateEditorConfig = function (task) {
    core.doSomeCoreFunction(task);
};

generateEditorConfig('generating from cli');
