'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makePathFilter = undefined;

var _api = require('./api');

var _util = require('./util');

/**
 * filters a path based on the current namespace
 * @private
 * @method isStrictlyInScope
 * @param  {Array<string>}          namespace an array of nested path
 * @param  {string}          path      the current pathaname
 * @return {Boolean}                   whether or not the current route is
 *  within the current namespace
 */
function isStrictlyInScope(namespace, path) {
  var pathParts = (0, _util.splitPath)(path);
  return namespace.every(function (v, i) {
    return pathParts[i] === v;
  });
}

/**
 * Creates the function used publicly as .path()
 * @private
 * @method makePathFilter
 * @param  {Observable<history.location>}               history$   Observable
 * of the current location as defined by rackt/history
 * @param  {Array<String>}               namespace  An array which contains
 * all of the `.path()`s that have be created to this point
 * @param  {function}               createHref function used to create HREFs
 * as defined by the current history instance
 * @return {function}                          the public API function used
 * for `.path()`
 */
function makePathFilter(history$, namespace, createHref) {
  /**
   * Filters the current location to easily create nested routes
   * @public
   * @typedef {path}
   * @name path
   * @method path
   * @param  {string} pathname the route at which to filter
   * @return {routerAPI}
   */
  return function path(pathname) {
    var scopedNamespace = namespace.concat((0, _util.splitPath)(pathname));
    var scopedHistory$ = history$.filter(function (_ref) {
      var _path = _ref.pathname;
      return isStrictlyInScope(scopedNamespace, _path);
    });
    return (0, _api.createAPI)(scopedHistory$, scopedNamespace, createHref);
  };
}

exports.makePathFilter = makePathFilter;