'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouter = undefined;

var _api = require('./api');

/**
 * Creates a router instance from a history$
 * @method createRouter
 * @public
 * @param  {Observable<location>}     history$ An observable of the
 * current location object as defined by rackt/history
 * @return {routerAPI}
 */
function createRouter(history$) {
  return (0, _api.createAPI)(history$, [], history$.createHref);
}

exports.createRouter = createRouter;