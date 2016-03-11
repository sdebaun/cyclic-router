'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDefinitionResolver = undefined;

var _switchPath = require('switch-path');

var _switchPath2 = _interopRequireDefault(_switchPath);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Workaround for issues with switch-path finding the * parameter
 * @private
 * @method getPathValue
 * @param  {string}     pathname    the route to match against
 * @param  {Object}     definitions route definitions object as defined by
 * switch-path
 * @return {Object}                 an object containing the path matched
 * and the value associated with that route.
 */
function getPathValue(pathname, definitions) {
  var path = void 0;
  var value = void 0;
  try {
    var match = (0, _switchPath2.default)(pathname, definitions);
    value = match.value;
    path = match.path;
  } catch (e) {
    // try handling default route
    if (definitions['*']) {
      path = pathname;
      value = definitions['*'];
    } else {
      throw e;
    }
  }
  return { path: path, value: value };
}

/**
 * Creates the method used publicly as .define()
 * @private
 * @method makeDefinitionResolver
 * @param  {Observable<location>}               history$   Observable
 * of the current location as defined by rackt/history
 * @param  {Array<String>}               namespace  An array which contains
 * all of the `.path()`s that have be created to this point
 * @param  {function}               createHref function used to create HREFs
 * as defined by the current history instance
 * @return {function}                          the public API function used
 * for `.define()`
 */
function makeDefinitionResolver(history$, namespace, createHref) {
  /**
   * Function used to match the current route to a set of routes using
   * switch-path
   * @public
   * @typedef {define}
   * @name define
   * @method define
   * @param  {Object}   definitions Route definitions as expected by switch-path
   * @return {defineAPI}
   */
  return function define(definitions) {
    var matches$ = history$.map(function (_ref) {
      var pathname = _ref.pathname;

      var filteredPath = '/' + (0, _util.filterPath)((0, _util.splitPath)(pathname), namespace);

      var _getPathValue = getPathValue(filteredPath, definitions);

      var path = _getPathValue.path;
      var value = _getPathValue.value;

      return { path: path, value: value, pathname: pathname };
    });

    var path$ = matches$.pluck('path').replay(1);
    var pathDisposable = path$.connect();

    var value$ = matches$.pluck('value').replay(1);
    var valueDisposable = value$.connect();

    var fullPath$ = matches$.pluck('pathname').replay(1);
    var fullPathDisposable = fullPath$.connect();

    var dispose = function dispose() {
      pathDisposable.dispose();
      fullPathDisposable.dispose();
      valueDisposable.dispose();
    };
    /**
     * Propeties and methods returned from define()
     * @typedef {defineAPI}
     * @name defineAPI
     * @type {Object}
     * @prop {Observable<string>} path$ - an Observable of the path matched
     * by switch-path
     * @prop {Observable<any>} value$ - an Observable of the value matched
     * by switchPath
     * @prop {Observable<string>} fullPath$ - an Observable of the current
     * url entirely unfiltered
     * @prop {createHref} createHref - method used to define nested HREFs
     * @props {function} dispose() - method used to dispose of the history$
     */
    var defineAPI = {
      path$: path$,
      value$: value$,
      fullPath$: fullPath$,
      createHref: (0, _util.makeCreateHref)(namespace, createHref),
      dispose: dispose
    };
    return defineAPI;
  };
}

exports.makeDefinitionResolver = makeDefinitionResolver;