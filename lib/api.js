'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAPI = undefined;

var _pathFilter = require('./pathFilter');

var _definitionResolver = require('./definitionResolver');

var _util = require('./util');

/**
 * Creates the public API returned by the base router driver
 * as well as the API which is returned by `.path()`
 * @private
 * @method createAPI
 * @param  {Observable<history.location>}  history$   Observable of the current
 * location as defined by rackt/history
 * @param  {Array<String>}  namespace  An array which contains all of the
 * `.path()`s that have be created to this point
 * @param  {function}  createHref This is the method to create a HREF as defined
 * by the history object that is passed to the history driver
 * @return {routerAPI}
 */
function createAPI(history$, namespace, createHref) {
  var replayedHistory$ = history$.replay(1);
  var disposable = replayedHistory$.connect();

  /**
   * The Public API returned by the router driver, createRouter(), and .path()
   * @typedef {routerAPI}
   * @name routerAPI
   * @type {Object}
   * @prop {path} path - used for filtering routes to a given path
   * @prop {define} define - used for defining a set of routes to values via
   * switch-path
   * @prop {Observable<location>} observable - a way to get access to the
   * current history$ from the historyDriver
   * @prop {createHref} createHref - a method for create HREFs that are properly
   * prefixed for the current namespace
   * @prop {function} dispose - a method to dispose of the history$ returned
   * by [.observable](#API)
   */
  var API = {
    path: (0, _pathFilter.makePathFilter)(replayedHistory$, namespace, createHref),
    define: (0, _definitionResolver.makeDefinitionResolver)(replayedHistory$, namespace, createHref),
    observable: replayedHistory$,
    createHref: (0, _util.makeCreateHref)(namespace, createHref),
    dispose: function dispose() {
      return disposable.dispose();
    }
  };
  return API;
}

exports.createAPI = createAPI;