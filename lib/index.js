'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _makeRouterDriver = require('./makeRouterDriver');

Object.defineProperty(exports, 'makeRouterDriver', {
  enumerable: true,
  get: function get() {
    return _makeRouterDriver.makeRouterDriver;
  }
});

var _createRouter = require('./createRouter');

Object.defineProperty(exports, 'createRouter', {
  enumerable: true,
  get: function get() {
    return _createRouter.createRouter;
  }
});

var _util = require('./util');

Object.defineProperty(exports, 'supportsHistory', {
  enumerable: true,
  get: function get() {
    return _util.supportsHistory;
  }
});
Object.defineProperty(exports, 'createLocation', {
  enumerable: true,
  get: function get() {
    return _util.createLocation;
  }
});