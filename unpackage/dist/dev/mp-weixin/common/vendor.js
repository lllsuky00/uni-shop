(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uni-shop","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 107:
/*!****************************************************************************************************!*\
  !*** F:/临时/uniapp/uni-shop/uni_modules/uni-swipe-action/components/uni-swipe-action-item/mpwxs.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _isPC = __webpack_require__(/*! ./isPC */ 108);var _default =
{
  data: function data() {
    return {
      position: [],
      button: {},
      btn: "[]" };

  },
  // computed: {
  // 	pos() {
  // 		return JSON.stringify(this.position)
  // 	},
  // 	btn() {
  // 		return JSON.stringify(this.button)
  // 	}
  // },
  watch: {
    button: {
      handler: function handler(newVal) {
        this.btn = JSON.stringify(newVal);
      },
      deep: true },

    show: function show(newVal) {
      if (this.autoClose) return;
      if (!this.button) {
        this.init();
        return;
      }
      this.button.show = newVal;
    },
    leftOptions: function leftOptions() {
      this.init();
    },
    rightOptions: function rightOptions() {
      this.init();
    } },

  created: function created() {
    if (this.swipeaction.children !== undefined) {
      this.swipeaction.children.push(this);
    }
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {var _this = this;
    this.swipeaction.children.forEach(function (item, index) {
      if (item === _this) {
        _this.swipeaction.children.splice(index, 1);
      }
    });
  },
  methods: {
    init: function init() {var _this2 = this;
      clearTimeout(this.swipetimer);
      this.swipetimer = setTimeout(function () {
        _this2.getButtonSize();
      }, 50);
    },
    closeSwipe: function closeSwipe(e) {
      if (!this.autoClose) return;
      this.swipeaction.closeOther(this);
    },

    change: function change(e) {
      this.$emit('change', e.open);
      var show = this.button.show;
      if (show !== e.open) {
        this.button.show = e.open;
      }

    },

    appTouchStart: function appTouchStart(e) {var




      clientX =
      e.changedTouches[0].clientX;
      this.clientX = clientX;
      this.timestamp = new Date().getTime();
    },
    appTouchEnd: function appTouchEnd(e, index, item, position) {var




      clientX =
      e.changedTouches[0].clientX;
      // fixed by xxxx 模拟点击事件，解决 ios 13 点击区域错位的问题
      var diff = Math.abs(this.clientX - clientX);
      var time = new Date().getTime() - this.timestamp;
      if (diff < 40 && time < 300) {
        this.$emit('click', {
          content: item,
          index: index,
          position: position });

      }
    },
    onClickForPC: function onClickForPC(index, item, position) {








    },
    getButtonSize: function getButtonSize() {var _this3 = this;
      var views = uni.createSelectorQuery().in(this);
      views.
      selectAll('.uni-swipe_button-group').
      boundingClientRect(function (data) {
        var show = 'none';
        if (_this3.autoClose) {
          show = 'none';
        } else {
          show = _this3.show;
        }
        _this3.button = {
          data: data,
          show: show };

      }).
      exec();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 108:
/*!***************************************************************************************************!*\
  !*** F:/临时/uniapp/uni-shop/uni_modules/uni-swipe-action/components/uni-swipe-action-item/isPC.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isPC = isPC;function isPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length - 1; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 12:
/*!************************************************************************************************!*\
  !*** F:/临时/uniapp/uni-shop/node_modules/@escook/request-miniprogram/miniprogram_dist/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.$http = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var Request = /*#__PURE__*/function () {
  function Request() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Request);
    // 请求的根路径
    this.baseUrl = options.baseUrl || '';
    // 请求的 url 地址
    this.url = options.url || '';
    // 请求方式
    this.method = 'GET';
    // 请求的参数对象
    this.data = null;
    // header 请求头
    this.header = options.header || {};
    this.beforeRequest = null;
    this.afterRequest = null;
  }_createClass(Request, [{ key: "get", value: function get(

    url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.method = 'GET';
      this.url = this.baseUrl + url;
      this.data = data;
      return this._();
    } }, { key: "post", value: function post(

    url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.method = 'POST';
      this.url = this.baseUrl + url;
      this.data = data;
      return this._();
    } }, { key: "put", value: function put(

    url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.method = 'PUT';
      this.url = this.baseUrl + url;
      this.data = data;
      return this._();
    } }, { key: "delete", value: function _delete(

    url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.method = 'DELETE';
      this.url = this.baseUrl + url;
      this.data = data;
      return this._();
    } }, { key: "_", value: function _()

    {var _this = this;
      // 清空 header 对象
      this.header = {};
      // 请求之前做一些事
      this.beforeRequest && typeof this.beforeRequest === 'function' && this.beforeRequest(this);
      // 发起请求
      return new Promise(function (resolve, reject) {
        var weixin = wx;
        // 适配 uniapp
        if ('undefined' !== typeof uni) {
          weixin = uni;
        }
        weixin.request({
          url: _this.url,
          method: _this.method,
          data: _this.data,
          header: _this.header,
          success: function success(res) {resolve(res);},
          fail: function fail(err) {reject(err);},
          complete: function complete(res) {
            // 请求完成以后做一些事情
            _this.afterRequest && typeof _this.afterRequest === 'function' && _this.afterRequest(res);
          } });

      });
    } }]);return Request;}();


var $http = new Request();exports.$http = $http;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!********************************************!*\
  !*** F:/临时/uniapp/uni-shop/store/store.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 14));
var _cart = _interopRequireDefault(__webpack_require__(/*! ./cart.js */ 15));
var _user = _interopRequireDefault(__webpack_require__(/*! @/store/user.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    'm_cart': _cart.default,
    'm_user': _user.default } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 14:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(item =>String.fromCharCode(item)).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 15:
/*!*******************************************!*\
  !*** F:/临时/uniapp/uni-shop/store/cart.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  namespaced: true,
  state: function state() {return {
      //购物车的数组，储存购物车中每个商品的信息对象
      //{goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
      cart: JSON.parse(uni.getStorageSync('cart') || '[]') };},


  mutations: {
    addToCart: function addToCart(state, goods) {
      //根据提交的商品id，查询购物车中是否存在这件商品，有返回数组对象，否则返回undefinded
      var findResult = state.cart.find(function (x) {return x.goods_id === goods.goods_id;});
      if (!findResult) {
        //如果没有，则直接push
        state.cart.push(goods);
      } else {
        //如果有，让件数+1
        findResult.goods_count++;
      }
      //通过commit方法，调用m_cart命名空间下的saveToStorage方法
      this.commit('m_cart/saveToStorage');
    },

    //数据持久化
    saveToStorage: function saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart));
    },

    //更新购物车中的勾选状态
    updateGoodsState: function updateGoodsState(state, goods) {
      //根据goods_id查询购物车中对应商品的信息对象
      var findResult = state.cart.find(function (x) {return x.goods_id === goods.goods_id;});
      if (findResult) {
        findResult.goods_state = goods.goods_state;

        //持久化储存到本地
        this.commit('m_cart/saveToStorage');
      }
    },

    //更新购物车里的商品数量
    updateGoodsCount: function updateGoodsCount(state, goods) {
      //根据goods_id查询购物车中对应商品的信息对象
      var findResult = state.cart.find(function (x) {return x.goods_id === goods.goods_id;});

      if (findResult) {
        findResult.goods_count = goods.goods_count;

        //持久化储存到本地
        this.commit('m_cart/saveToStorage');
      }
    },

    //删除购物车里的商品项
    removeGoodsById: function removeGoodsById(state, goods_id) {
      //过滤对应id的商品，将要删除项以外的商品存到cart数组中
      state.cart = state.cart.filter(function (x) {return x.goods_id !== goods_id;});

      //持久化储存到本地
      this.commit('m_cart/saveToStorage');

    },

    //修改购物车里所有商品的勾选状态
    updateAllGoodsState: function updateAllGoodsState(state, newState) {
      //遍历每一个商品的状态，并且让其等于传进来的新状态
      state.cart.forEach(function (x) {return x.goods_state = newState;});
      //持久化储存到本地
      this.commit('m_cart/saveToStorage');
    } },




  getters: {
    //商品总数
    total: function total(state) {
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      // return c

      return state.cart.reduce(function (total, item) {return total += item.goods_count;}, 0);
    },

    //被选中商品的总数
    checkedCount: function checkedCount(state) {
      //先用filter，从购物车中过滤已勾选的商品
      //在使用reduce，将已勾选的商品进行累加
      //reduce 的返回值是已勾选商品的总数量
      return state.cart.filter(function (x) {return x.goods_state;}).reduce(function (total, item) {return total += item.goods_count;}, 0);
    },

    //被选中商品的总价格
    checkedGoodsAmount: function checkedGoodsAmount(state) {
      //先用filter，从购物车中过滤已勾选的商品
      //在使用reduce，将已勾选的商品加个进行累加
      return state.cart.filter(function (x) {return x.goods_state;}).reduce(function (totalPrice, item) {return totalPrice += item.goods_count * item.goods_price;}, 0).toFixed(2);
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!*******************************************!*\
  !*** F:/临时/uniapp/uni-shop/store/user.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  //开启命名空间
  namespaced: true,

  //数据
  state: function state() {return {
      //收货地址
      address: JSON.parse(uni.getStorageSync('address') || '{}'),

      //登陆成功后的token字符串
      // token:''|| uni.getStorageSync('token'),
      token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo',

      //用户的基本信息
      userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),

      //重定向的对象{ openType， from }
      redirectInfo: null };},


  //方法
  mutations: {
    //更新收货地址
    updateAddress: function updateAddress(state, address) {
      state.address = address;

      //通过this.commit() 方法，调用m_user模块下的saveAddressToStorage 方法将address永久化存储到本地
      this.commit('m_user/saveAddressToStorage');
    },
    //定义将address 持久化存储到本地的方法
    saveAddressToStorage: function saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address));
    },

    //更新用户信息
    updateUserInfo: function updateUserInfo(state, userinfo) {
      state.userinfo = userinfo;
      //通过this.commit()方法，调用m_user模块下的saveUserInfoToStorage方法，将userinfo存储到本地
      this.commit('m_user/saveUserInfoToStorage');
    },
    //定义将userinfo 持久化存储到本地的方法
    saveUserInfoToStorage: function saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo));
    },

    //更新token字符串
    updateToken: function updateToken(state, token) {
      state.token = token;
      this.commit('m_user/saveTokenStorage');
    },

    saveTokenStorage: function saveTokenStorage(state) {
      uni.setStorageSync('token', state.token);
    },

    //更新重定向的信息对象
    updateRedirectInfo: function updateRedirectInfo(state, info) {
      state.redirectInfo = info;
    } },


  //
  getters: {
    addstr: function addstr(state) {
      if (!state.address.provinceName) return '';

      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo;
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 174:
/*!*******************************************************************!*\
  !*** F:/临时/uniapp/uni-shop/uni_modules/n-icon/static/iconfont.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = "data:font/truetype;charset=utf-8;base64,AAEAAAANAIAAAwBQRkZUTY4yTL8AAZtUAAAAHEdERUYAKQGkAAGbNAAAAB5PUy8yPLJKRgAAAVgAAABWY21hcCp1KhcAAAX8AAADHGdhc3D//wADAAGbLAAAAAhnbHlmmjenuwAADFgAAXfMaGVhZBuvabMAAADcAAAANmhoZWEH4AQLAAABFAAAACRobXR4ShtiJAAAAbAAAARKbG9jYULZ5VgAAAkYAAADPm1heHACtQDmAAABOAAAACBuYW1lKeYRVQABhCQAAAKIcG9zdA2byjwAAYasAAAUgAABAAAAAQAAu7YO8F8PPPUACwQAAAAAANxHEtsAAAAA3EcS2wAA/5UEAgNrAAAACAACAAAAAAAAAAEAAAOA/4AAXAQDAAAAAAQCAAEAAAAAAAAAAAAAAAAAAACHAAEAAAGeANoADQAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5kToVAOA/4AAXAOAAIAAAAABAAAAAAAABAAAAAAAAAABVQAABAAAQAQAAIAEAADABAAAgAQAAD8EAAA7BAAAOwQAADkEAACgBAAAoAQAAEAEAABCBAAAQAQAAEAEAABABAAAQAQAAEAEAABBBAAAQAQAAEAEAABABAAAggQAAD4EAAA+BAAAQAQAAEAEAABgBAAAYAQAACAEAAAgBAAAYAQAAGAEAABgBAAAYAQAAGAEAABBBAAAeAQAAEAEAABABAAAQgQAAD4EAAEQBAAAYAQAACwEAABgBAAAgQQAAEAEAAA/BAAAQAQAAEAEAABKBAAAgAQAAEAEAAB+BAAAQAQAAIAEAABABAAAQAQAAT4EAAA9BAABogQAAEAEAABBBAAAQAQAAGMEAABgBAAAQAQAAGEEAAA9BAAAQAQAAD0EAAA+BAAAQgQAAEAEAABABAAAYAQAAGAEAABABAAAQAQAAIEEAABgBAAAfAQAAIEEAABrBAAAPgQAAEMEAACQBAAAQAQAAEAEAABABAAAYAQAAGAEAABgBAAAQAQAAEAEAABABAAAwAQAAGAEAAA9BAAAfwQAABUEAACABAAAoAQAAIAEAABABAAAQgQAAEIEAAA/BAAAPwQAAEAEAABABAAAQAQAAKAEAACgBAAAfgQAAEIEAAB/BAAAIAQAACAEAAB/BAAAfwQAAH8EAABABAAAfwQAAEAEAAC7BAAAgQQAAGAEAACABAAAgAQDAAAEAACAAMAA4ACAAIAAgAB+AH4AIABAAEAAvwC/AEAAQABCAEIAQABAAF8AXwCgAEAAYABAAEMAQABAAIAAgABgAEAAQABBAEAAYwA/AD8AQADAAEAAQABAAIAAQAB8AIEAgABAAEAAQQAgACAAQABAAD0APQBAAGAAQQBBAIABAAFAAF4AXgAeAIAAIABTAE4AgABCAEAAYABeAF8AQgBgAEAAgACEAGMAYABhAIMAIgAjAG8AQABfAEAAWgBbAIAAIAAgAD8APwCUAIAAYABeAF4AQAA7AD8AQAB9AD8AQQBAAFUAQABAAEAAQQBBAIAAQACWAEAAQABAACAAIAAgACAAVQA/AKwAIABfAEAAZABjAGMAoACgAEAAowCjAEAAQABAAIAAgABgAGMAYgBgAEAAgACeAEAAfABVAFUAQAA/AFMAVQCEAEAAawBrAEsAgQBAANUAqwBrAKoAegBrAGsAWgBVARYAawBtAFcAagBVAG0BtQBBAJYAbQBvAG0AbQCtAKsAQACVAJUAQABVAEAAlQBVAGkAlQBVAEAAaQBVAKMArQCYAFUAVwBhAG0AeABVAJUAawBVAEEAqwAqAEEAHgDAAKsAQABgAFUAXACAAIAAQABAAEAAegBVAEAAQABAAEAAQwBDAEMAQwBDAEAAQwBDAEAAQABDAEMAQwBAAEMAQABAAEAAQAA+AEAAQABDAFUAVQBAAGAAgABfAJ8AngBoAIEAVQBVAEAAQgBAAAAAAAADAAAAAwAAABwAAQAAAAACFgADAAEAAAAcAAQB+gAAAHgAQAAFADjmRuZM5lLmX+Zu5nPmd+Z55nzmfuaC5oTmiuaR5pfmmeag5qbmrOaw5rLmtOa95sDmxebH5s/m2+bl5wDnC+cn5y3nOudC503nU+dZ513nYedl52nncOeA54/nkeeW55nnnOef56Hnree157rnyOfR5/PoQuhU//8AAOZE5knmT+ZW5mHmceZ15nnmfOZ+5oLmhOaJ5pDml+aZ5pvmo+as5q/msua05rfmv+bC5sfmyebS5t3m6ucC5w7nKecw5zznSudP51XnW+dg52PnZ+dv53Xni+eR55Tnmeeb557noeej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BgojFxo6HSA4FzY9AgEgIR1HJyM6GBoWLE6JJxQPBQk6I1s5dn1KgTMrPhETAxkWTDM3gYWHPjVfKAcPAwsi/tQJMEklFScRIBEMGxwTOEZBFw8Hzz5RFxQOBx49VzU5dTc1XiYrNwsKBAwLKSIeSVVXKDZbHAQBAwMKCGq/aAkYCwoECDATGSkNDggHBh8XN4pLLlEfGxEKCSgbIiAXFAkWgEwsYS9dTi87DyEWDUU1K2o8QopDOGIjJSQJFBkWRjMLIQwZBN40YkQMBgMJEzw2byweMBcSHRlAAAAEAEAAFQPAAtUACQATAB8AKwAAASEiBgcVITUuAQM+ATcRIREeARcTMzIWFAYHIS4BNDYXMzIWFAYHIy4BNDYDfP0IHSYBA4ABJh0dJgH8gAEmHTz+DhISDv7+DQ8RD4APEREPhA0PEQLVJh5mZh4m/UABJh4Be/6FHiYBAUARHREBAhEcEYARHREBAhEcEQAAABIA3gABAAAAAAAAABUALAABAAAAAAABAAgAVAABAAAAAAACAAcAbQABAAAAAAADAAgAhwABAAAAAAAEAAgAogABAAAAAAAFAAsAwwABAAAAAAAGAAgA4QABAAAAAAAKACsBQgABAAAAAAALABMBlgADAAEECQAAACoAAAADAAEECQABABAAQgADAAEECQACAA4AXQADAAEECQADABAAdQADAAEECQAEABAAkAADAAEECQAFABYAqwADAAEECQAGABAAzwADAAEECQAKAFYA6gADAAEECQALACYBbgAKAEMAcgBlAGEAdABlAGQAIABiAHkAIABpAGMAbwBuAGYAbwBuAHQACgAACkNyZWF0ZWQgYnkgaWNvbmZvbnQKAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABSAGUAZwB1AGwAYQByAABSZWd1bGFyAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABWAGUAcgBzAGkAbwBuACAAMQAuADAAAFZlcnNpb24gMS4wAABpAGMAbwBuAGYAbwBuAHQAAGljb25mb250AABHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAABHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuAABoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAABodHRwOi8vZm9udGVsbG8uY29tAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ4AAAABAAIBAgEDAQQBBQEGAQcBCAEJAQoBCwEMAQ0BDgEPARABEQESARMBFAEVARYBFwEYARkBGgEbARwBHQEeAR8BIAEhASIBIwEkASUBJgEnASgBKQEqASsBLAEtAS4BLwEwATEBMgAiATMBNAE1ATYBNwE4ATkBOgE7ATwBPQE+AT8BQAFBAUIBQwFEAUUBRgFHAUgBSQFKAUsBTAFNAU4BTwFQAVEBUgFTAVQBVQFWAVcBWAFZAVoBWwFcAV0BXgFfAWABYQFiAWMBZAFlAWYBZwFoAWkBagFrAWwBbQFuAW8BcAFxAXIBcwF0AXUBdgF3AXgBeQF6AXsBfAF9AX4BfwGAAYEBggGDAYQBhQGGAYcBiAGJAYoBiwGMAY0BjgGPAZABkQGSAZMBlAGVAZYBlwGYAZkBmgGbAZwBnQGeAZ8BoAGhAaIBowGkAaUBpgGnAagBqQGqAasBrAGtAa4BrwGwAbEBsgGzAbQBtQG2AbcBuAG5AboBuwG8Ab0BvgG/AcABwQHCAcMBxAHFAcYBxwHIAckBygHLAcwBzQHOAc8B0AHRAdIB0wHUAdUB1gHXAdgB2QHaAdsB3AHdAd4B3wHgAeEB4gHjAeQB5QHmAecB6AHpAeoB6wHsAe0B7gHvAfAB8QHyAfMB9AH1AfYB9wH4AfkB+gH7AfwB/QH+Af8CAAIBAgICAwIEAgUCBgIHAggCCQIKAgsCDAINAg4CDwIQAhECEgITAhQCFQIWAhcCGAIZAhoCGwIcAh0CHgIfAiACIQIiAiMCJAIlAiYCJwIoAikCKgIrAiwCLQIuAi8CMAIxAjICMwI0AjUCNgI3AjgCOQI6AjsCPAI9Aj4CPwJAAkECQgJDAkQCRQJGAkcCSAJJAkoCSwJMAk0CTgJPAlACUQJSAlMCVAJVAlYCVwJYAlkCWgJbAlwCXQJeAl8CYAJhAmICYwJkAmUCZgJnAmgCaQJqAmsCbAJtAm4CbwJwAnECcgJzAnQCdQJ2AncCeAJ5AnoCewJ8An0CfgJ/AoACgQKCAoMChAKFAoYChwKIAokCigKLAowCjQKOAo8CkAKRApICkwKUApUClgKXApgCmQAjApoKYXBwcmVjaWF0ZQVjaGVjawVjbG9zZQRlZGl0BWVtb2ppCWZhdm9yZmlsbAVmYXZvcgdsb2FkaW5nDGxvY2F0aW9uZmlsbAhsb2NhdGlvbgVwaG9uZQ5yb3VuZGNoZWNrZmlsbApyb3VuZGNoZWNrDnJvdW5kY2xvc2VmaWxsCnJvdW5kY2xvc2UOcm91bmRyaWdodGZpbGwKcm91bmRyaWdodAZzZWFyY2gEdGF4aQh0aW1lZmlsbAR0aW1lBnVuZm9sZAh3YXJuZmlsbAR3YXJuCmNhbWVyYWZpbGwGY2FtZXJhC2NvbW1lbnRmaWxsB2NvbW1lbnQIbGlrZWZpbGwEbGlrZRBub3RpZmljYXRpb25maWxsDG5vdGlmaWNhdGlvbgVvcmRlcghzYW1lZmlsbARzYW1lB2RlbGl2ZXIIZXZhbHVhdGUDcGF5BHNlbmQEc2hvcAZ0aWNrZXQEYmFjawhjYXNjYWRlcwhkaXNjb3ZlcgRsaXN0BG1vcmUEc2NhbghzZXR0aW5ncwxxdWVzdGlvbmZpbGwIc2hvcGZpbGwEZm9ybQNwaWMGZmlsdGVyCWZvb3RwcmludAN0b3AIcHVsbGRvd24GcHVsbHVwBXJpZ2h0B3JlZnJlc2gLbW9yZWFuZHJvaWQKZGVsZXRlZmlsbAZyZWZ1bmQEY2FydAZxcmNvZGUGcmVtaW5kBmRlbGV0ZQdwcm9maWxlBGhvbWUIY2FydGZpbGwMZGlzY292ZXJmaWxsCGhvbWVmaWxsB21lc3NhZ2ULYWRkcmVzc2Jvb2sEbGluawRsb2NrBnVubG9jawN2aXAFd2VpYm8IYWN0aXZpdHkDYmlnDWZyaWVuZGFkZGZpbGwJZnJpZW5kYWRkDGZyaWVuZGZhbW91cwZmcmllbmQFZ29vZHMJc2VsZWN0aW9uBXRtYWxsB2V4cGxvcmUHcHJlc2VudA9zcXVhcmVjaGVja2ZpbGwGc3F1YXJlC3NxdWFyZWNoZWNrBXJvdW5kDHJvdW5kYWRkZmlsbAhyb3VuZGFkZANhZGQWbm90aWZpY2F0aW9uZm9yYmlkZmlsbAtleHBsb3JlZmlsbARmb2xkBGdhbWUJcmVkcGFja2V0DXNlbGVjdGlvbmZpbGwHc2ltaWxhcg5hcHByZWNpYXRlZmlsbAhpbmZvZmlsbARpbmZvC2ZvcndhcmRmaWxsB2ZvcndhcmQMcmVjaGFyZ2VmaWxsCHJlY2hhcmdlB3ZpcGNhcmQFdm9pY2UJdm9pY2VmaWxsC2ZyaWVuZGZhdm9yBHdpZmkFc2hhcmUGd2VmaWxsAndlCWxpZ2h0YXV0bwtsaWdodGZvcmJpZAlsaWdodGZpbGwMY2FtZXJhcm90YXRlBWxpZ2h0B2JhcmNvZGUPZmxhc2hsaWdodGNsb3NlDmZsYXNobGlnaHRvcGVuCnNlYXJjaGxpc3QHc2VydmljZQRzb3J0BDEyMTIEZG93bgZtb2JpbGUKbW9iaWxlZmlsbARjb3B5DWNvdW50ZG93bmZpbGwJY291bnRkb3duCm5vdGljZWZpbGwGbm90aWNlBXFpYW5nC3Vwc3RhZ2VmaWxsB3Vwc3RhZ2UIYmFieWZpbGwEYmFieQlicmFuZGZpbGwFYnJhbmQOY2hvaWNlbmVzc2ZpbGwKY2hvaWNlbmVzcwtjbG90aGVzZmlsbAdjbG90aGVzDGNyZWF0aXZlZmlsbAhjcmVhdGl2ZQZmZW1hbGUIa2V5Ym9hcmQEbWFsZQduZXdmaWxsA25ldwhwdWxsbGVmdAlwdWxscmlnaHQIcmFua2ZpbGwEcmFuawNiYWQJY2FtZXJhYWRkBWZvY3VzCmZyaWVuZGZpbGwNY2FtZXJhYWRkZmlsbARhcHBzCXBhaW50ZmlsbAVwYWludAdwaWNmaWxsDHJlZnJlc2hhcnJvdwhtYXJrZmlsbARtYXJrC3ByZXNlbnRmaWxsBnJlcGVhbAVhbGJ1bQpwZW9wbGVmaWxsBnBlb3BsZQtzZXJ2aWNlZmlsbAZyZXBhaXIEZmlsZQpyZXBhaXJmaWxsDWF0dGVudGlvbmZpbGwJYXR0ZW50aW9uC2NvbW1hbmRmaWxsB2NvbW1hbmQNY29tbXVuaXR5ZmlsbAljb21tdW5pdHkEcmVhZAhjYWxlbmRhcgNjdXQFbWFnaWMMYmFja3dhcmRmaWxsCHBsYXlmaWxsBHN0b3AHdGFnZmlsbAN0YWcFZ3JvdXADYWxsCmJhY2tkZWxldGUHaG90ZmlsbANob3QEcG9zdAhyYWRpb2JveAlyb3VuZGRvd24GdXBsb2FkCXdyaXRlZmlsbAV3cml0ZQxyYWRpb2JveGZpbGwFcHVuY2gFc2hha2UEYWRkMQRtb3ZlBHNhZmUCcWkCeWUMYWN0aXZpdHlmaWxsCWNyb3duZmlsbAVjcm93bglnb29kc2ZpbGwLbWVzc2FnZWZpbGwLcHJvZmlsZWZpbGwFc291bmQLc3BvbnNvcmZpbGwHc3BvbnNvcgd1cGJsb2NrB3dlYmxvY2sJd2V1bmJsb2NrCWVtb2ppZmlsbA5lbW9qaWZsYXNoZmlsbBFmbGFzaGJ1eWZpbGwtY29weQR0ZXh0Cmdvb2RzZmF2b3IJbXVzaWNmaWxsD211c2ljZm9yYmlkZmlsbA1yb3VuZGxlZnRmaWxsEHRyaWFuZ2xlZG93bmZpbGwOdHJpYW5nbGV1cGZpbGwScm91bmRsZWZ0ZmlsbC1jb3B5CXB1bGxkb3duMQplbW9qaWxpZ2h0DWtleWJvYXJkbGlnaHQKcmVjb3JkZmlsbAtyZWNvcmRsaWdodAZyZWNvcmQNcm91bmRhZGRsaWdodApzb3VuZGxpZ2h0DWNhcmRib2FyZGZpbGwJY2FyZGJvYXJkCGZvcm1maWxsBGNvaW4Jc29ydGxpZ2h0D2NhcmRib2FyZGZvcmJpZApjaXJjbGVmaWxsBmNpcmNsZQ9hdHRlbnRpb25mb3JiaWQTYXR0ZW50aW9uZm9yYmlkZmlsbBJhdHRlbnRpb25mYXZvcmZpbGwOYXR0ZW50aW9uZmF2b3IIcGljbGlnaHQJc2hvcGxpZ2h0CnZvaWNlbGlnaHQXYXR0ZW50aW9uZmF2b3JmaWxsLWNvcHkEZnVsbARtYWlsCnBlb3BsZWxpc3QMZ29vZHNuZXdmaWxsCGdvb2RzbmV3CW1lZGFsZmlsbAVtZWRhbAhuZXdzZmlsbAtuZXdzaG90ZmlsbAduZXdzaG90BG5ld3MJdmlkZW9maWxsBXZpZGVvBGV4aXQIc2tpbmZpbGwEc2tpbgxtb25leWJhZ2ZpbGwLdXNlZnVsbGZpbGwHdXNlZnVsbAhtb25leWJhZw5yZWRwYWNrZXRfZmlsbAxzdWJzY3JpcHRpb24KaG9tZV9saWdodAhteV9saWdodA9jb21tdW5pdHlfbGlnaHQKY2FydF9saWdodAh3ZV9saWdodA9ob21lX2ZpbGxfbGlnaHQPY2FydF9maWxsX2xpZ2h0FGNvbW11bml0eV9maWxsX2xpZ2h0DW15X2ZpbGxfbGlnaHQNd2VfZmlsbF9saWdodApza2luX2xpZ2h0DHNlYXJjaF9saWdodApzY2FuX2xpZ2h0EXBlb3BsZV9saXN0X2xpZ2h0DW1lc3NhZ2VfbGlnaHQLY2xvc2VfbGlnaHQJYWRkX2xpZ2h0DXByb2ZpbGVfbGlnaHQNc2VydmljZV9saWdodBBmcmllbmRfYWRkX2xpZ2h0CmVkaXRfbGlnaHQMY2FtZXJhX2xpZ2h0CWhvdF9saWdodA1yZWZyZXNoX2xpZ2h0CmJhY2tfbGlnaHQLc2hhcmVfbGlnaHQNY29tbWVudF9saWdodBBhcHByZWNpYXRlX2xpZ2h0C2Zhdm9yX2xpZ2h0FWFwcHJlY2lhdGVfZmlsbF9saWdodBJjb21tZW50X2ZpbGxfbGlnaHQSbW9yZV9hbmRyb2lkX2xpZ2h0DGZyaWVuZF9saWdodAptb3JlX2xpZ2h0EWdvb2RzX2Zhdm9yX2xpZ2h0FGdvb2RzX25ld19maWxsX2xpZ2h0D2dvb2RzX25ld19saWdodAtnb29kc19saWdodBBtZWRhbF9maWxsX2xpZ2h0C21lZGFsX2xpZ2h0D25ld3NfZmlsbF9saWdodBNuZXdzX2hvdF9maWxsX2xpZ2h0Dm5ld3NfaG90X2xpZ2h0Cm5ld3NfbGlnaHQQdmlkZW9fZmlsbF9saWdodBJtZXNzYWdlX2ZpbGxfbGlnaHQKZm9ybV9saWdodAt2aWRlb19saWdodBFzZWFyY2hfbGlzdF9saWdodA9mb3JtX2ZpbGxfbGlnaHQMZ2xvYmFsX2xpZ2h0Bmdsb2JhbBBmYXZvcl9maWxsX2xpZ2h0DGRlbGV0ZV9saWdodAxiYWNrX2FuZHJvaWQSYmFja19hbmRyb2lkX2xpZ2h0CmRvd25fbGlnaHQRcm91bmRfY2xvc2VfbGlnaHQWcm91bmRfY2xvc2VfZmlsbF9saWdodApleHByZXNzbWFuC3B1bmNoX2xpZ2h0DWV2YWx1YXRlX2ZpbGwJZnVybml0dXJlBWRyZXNzBmNvZmZlZQZzcG9ydHMLZ3JvdXBfbGlnaHQObG9jYXRpb25fbGlnaHQPYXR0ZW50aW9uX2xpZ2h0EGdyb3VwX2ZpbGxfbGlnaHQKZ3JvdXBfZmlsbBFwbGF5X2ZvcndhcmRfZmlsbBJzdWJzY3JpcHRpb25fbGlnaHQMZGVsaXZlcl9maWxsEm5vdGljZV9mb3JiaWRfZmlsbA1xcl9jb2RlX2xpZ2h0DnNldHRpbmdzX2xpZ2h0BHBpY2sQZm9ybV9mYXZvcl9saWdodBNyb3VuZF9jb21tZW50X2xpZ2h0C3Bob25lX2xpZ2h0EHJvdW5kX2Rvd25fbGlnaHQVZnJpZW5kX3NldHRpbmdzX2xpZ2h0BmNoYW5nZRByb3VuZF9saXN0X2xpZ2h0C3RpY2tldF9maWxsEXJvdW5kX2ZyaWVuZF9maWxsEHJvdW5kX2Nyb3duX2ZpbGwPcm91bmRfbGlua19maWxsEHJvdW5kX2xpZ2h0X2ZpbGwQcm91bmRfZmF2b3JfZmlsbA9yb3VuZF9tZW51X2ZpbGwTcm91bmRfbG9jYXRpb25fZmlsbA5yb3VuZF9wYXlfZmlsbA9yb3VuZF9saWtlX2ZpbGwRcm91bmRfcGVvcGxlX2ZpbGwJcm91bmRfcGF5D3JvdW5kX3JhbmtfZmlsbBRyb3VuZF9yZWRwYWNrZXRfZmlsbA9yb3VuZF9za2luX2ZpbGwRcm91bmRfcmVjb3JkX2ZpbGwRcm91bmRfdGlja2V0X2ZpbGwPcm91bmRfcmVkcGFja2V0D3JvdW5kX3RleHRfZmlsbAxyb3VuZF90aWNrZXQTcm91bmRfdHJhbnNmZXJfZmlsbBRzdWJ0aXRsZV9ibG9ja19saWdodAp3YXJuX2xpZ2h0DnJvdW5kX3RyYW5zZmVyFnN1YnRpdGxlX3VuYmxvY2tfbGlnaHQPcm91bmRfc2hvcF9maWxsEW9wcG9zZV9maWxsX2xpZ2h0DG9wcG9zZV9saWdodAZsaXZpbmcOZ29vZHNfaG90X2ZpbGwRdGlja2V0X21vbmV5X2ZpbGwPYXJyb3dfbGVmdF9maWxsDWFycm93X3VwX2ZpbGwKeGlhb2hlaXF1bgdhdWN0aW9uBnJldHVybgptYWxsX2xpZ2h0D21hbGxfZmlsbF9saWdodA5icm9hZGNhc3RfZmlsbAljYXJkX2ZpbGwAAAAB//8AAgABAAAADAAAABYAAAACAAEAAwGdAAEABAAAAAIAAAAAAAAAAQAAAADVpCcIAAAAANxHEtsAAAAA3EcS2w==";exports.default = _default;

/***/ }),

/***/ 175:
/*!*******************************************************************!*\
  !*** F:/临时/uniapp/uni-shop/uni_modules/n-icon/static/iconList.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "male": "\uE71C",
  "warn_light": "\uE841",
  "newfill": "\uE71D",
  "round_transfer": "\uE842",
  "new": "\uE71E",
  "pullleft": "\uE71F",
  "subtitle_unblock_light": "\uE844",
  "pullright": "\uE720",
  "round_shop_fill": "\uE845",
  "rankfill": "\uE721",
  "oppose_fill_light": "\uE846",
  "rank": "\uE722",
  "oppose_light": "\uE847",
  "bad": "\uE723",
  "living": "\uE848",
  "cameraadd": "\uE724",
  "goods_hot_fill": "\uE849",
  "focus": "\uE725",
  "ticket_money_fill": "\uE84A",
  "friendfill": "\uE726",
  "arrow_left_fill": "\uE84B",
  "cameraaddfill": "\uE727",
  "arrow_up_fill": "\uE84C",
  "apps": "\uE729",
  "xiaoheiqun": "\uE84D",
  "paintfill": "\uE72A",
  "auction": "\uE84E",
  "paint": "\uE72B",
  "return": "\uE84F",
  "picfill": "\uE72C",
  "mall_light": "\uE850",
  "refresharrow": "\uE72D",
  "mall_fill_light": "\uE851",
  "markfill": "\uE730",
  "broadcast_fill": "\uE852",
  "mark": "\uE731",
  "at": "\uE853",
  "presentfill": "\uE732",
  "card_fill": "\uE854",
  "repeal": "\uE733",
  "album": "\uE734",
  "peoplefill": "\uE735",
  "people": "\uE736",
  "servicefill": "\uE737",
  "repair": "\uE738",
  "file": "\uE739",
  "repairfill": "\uE73A",
  "attentionfill": "\uE73C",
  "attention": "\uE73D",
  "commandfill": "\uE73E",
  "command": "\uE73F",
  "communityfill": "\uE740",
  "community": "\uE741",
  "read": "\uE742",
  "calendar": "\uE74A",
  "cut": "\uE74B",
  "magic": "\uE74C",
  "backwardfill": "\uE74D",
  "playfill": "\uE74F",
  "stop": "\uE750",
  "tagfill": "\uE751",
  "tag": "\uE752",
  "group": "\uE753",
  "all": "\uE755",
  "backdelete": "\uE756",
  "hotfill": "\uE757",
  "hot": "\uE758",
  "post": "\uE759",
  "radiobox": "\uE75B",
  "rounddown": "\uE75C",
  "upload": "\uE75D",
  "writefill": "\uE760",
  "write": "\uE761",
  "radioboxfill": "\uE763",
  "punch": "\uE764",
  "shake": "\uE765",
  "add1": "\uE767",
  "move": "\uE768",
  "safe": "\uE769",
  "qi": "\uE76F",
  "ye": "\uE770",
  "activityfill": "\uE775",
  "crownfill": "\uE776",
  "crown": "\uE777",
  "goodsfill": "\uE778",
  "messagefill": "\uE779",
  "profilefill": "\uE77A",
  "sound": "\uE77B",
  "sponsorfill": "\uE77C",
  "sponsor": "\uE77D",
  "upblock": "\uE77E",
  "weblock": "\uE77F",
  "weunblock": "\uE780",
  "my": "\uE78B",
  "myfill": "\uE78C",
  "emojifill": "\uE78D",
  "emojiflashfill": "\uE78E",
  "flashbuyfill-copy": "\uE78F",
  "text": "\uE791",
  "goodsfavor": "\uE794",
  "musicfill": "\uE795",
  "musicforbidfill": "\uE796",
  "roundleftfill": "\uE799",
  "triangledownfill": "\uE79B",
  "appreciate": "\uE644",
  "triangleupfill": "\uE79C",
  "check": "\uE645",
  "roundleftfill-copy": "\uE79E",
  "close": "\uE646",
  "pulldown1": "\uE79F",
  "edit": "\uE649",
  "emojilight": "\uE7A1",
  "emoji": "\uE64A",
  "keyboardlight": "\uE7A3",
  "favorfill": "\uE64B",
  "recordfill": "\uE7A4",
  "favor": "\uE64C",
  "recordlight": "\uE7A5",
  "loading": "\uE64F",
  "record": "\uE7A6",
  "locationfill": "\uE650",
  "roundaddlight": "\uE7A7",
  "location": "\uE651",
  "soundlight": "\uE7A8",
  "phone": "\uE652",
  "cardboardfill": "\uE7A9",
  "roundcheckfill": "\uE656",
  "cardboard": "\uE7AA",
  "roundcheck": "\uE657",
  "formfill": "\uE7AB",
  "roundclosefill": "\uE658",
  "coin": "\uE7AC",
  "roundclose": "\uE659",
  "sortlight": "\uE7AD",
  "roundrightfill": "\uE65A",
  "cardboardforbid": "\uE7AF",
  "roundright": "\uE65B",
  "circlefill": "\uE7B0",
  "search": "\uE65C",
  "circle": "\uE7B1",
  "taxi": "\uE65D",
  "attentionforbid": "\uE7B2",
  "timefill": "\uE65E",
  "attentionforbidfill": "\uE7B3",
  "time": "\uE65F",
  "attentionfavorfill": "\uE7B4",
  "unfold": "\uE661",
  "attentionfavor": "\uE7B5",
  "warnfill": "\uE662",
  "piclight": "\uE7B7",
  "warn": "\uE663",
  "shoplight": "\uE7B8",
  "camerafill": "\uE664",
  "voicelight": "\uE7B9",
  "camera": "\uE665",
  "attentionfavorfill-copy": "\uE7BA",
  "commentfill": "\uE666",
  "full": "\uE7BC",
  "comment": "\uE667",
  "mail": "\uE7BD",
  "likefill": "\uE668",
  "peoplelist": "\uE7BE",
  "like": "\uE669",
  "goodsnewfill": "\uE7BF",
  "notificationfill": "\uE66A",
  "goodsnew": "\uE7C0",
  "notification": "\uE66B",
  "medalfill": "\uE7C1",
  "order": "\uE66C",
  "medal": "\uE7C2",
  "samefill": "\uE66D",
  "newsfill": "\uE7C3",
  "same": "\uE66E",
  "newshotfill": "\uE7C4",
  "deliver": "\uE671",
  "newshot": "\uE7C5",
  "evaluate": "\uE672",
  "news": "\uE7C6",
  "pay": "\uE673",
  "videofill": "\uE7C7",
  "send": "\uE675",
  "video": "\uE7C8",
  "shop": "\uE676",
  "ticket": "\uE677",
  "exit": "\uE7CB",
  "back": "\uE679",
  "skinfill": "\uE7CC",
  "cascades": "\uE67C",
  "skin": "\uE7CD",
  "discover": "\uE67E",
  "moneybagfill": "\uE7CE",
  "list": "\uE682",
  "usefullfill": "\uE7CF",
  "more": "\uE684",
  "usefull": "\uE7D0",
  "scan": "\uE689",
  "moneybag": "\uE7D1",
  "settings": "\uE68A",
  "redpacket_fill": "\uE7D3",
  "questionfill": "\uE690",
  "subscription": "\uE7D4",
  "question": "\uE691",
  "home_light": "\uE7D5",
  "shopfill": "\uE697",
  "my_light": "\uE7D6",
  "form": "\uE699",
  "community_light": "\uE7D7",
  "cart_light": "\uE7D8",
  "pic": "\uE69B",
  "we_light": "\uE7D9",
  "filter": "\uE69C",
  "home_fill_light": "\uE7DA",
  "footprint": "\uE69D",
  "cart_fill_light": "\uE7DB",
  "top": "\uE69E",
  "community_fill_light": "\uE7DC",
  "pulldown": "\uE69F",
  "my_fill_light": "\uE7DD",
  "pullup": "\uE6A0",
  "we_fill_light": "\uE7DE",
  "right": "\uE6A3",
  "skin_light": "\uE7DF",
  "refresh": "\uE6A4",
  "search_light": "\uE7E0",
  "moreandroid": "\uE6A5",
  "scan_light": "\uE7E1",
  "deletefill": "\uE6A6",
  "people_list_light": "\uE7E2",
  "refund": "\uE6AC",
  "message_light": "\uE7E3",
  "cart": "\uE6AF",
  "close_light": "\uE7E4",
  "qrcode": "\uE6B0",
  "add_light": "\uE7E5",
  "remind": "\uE6B2",
  "profile_light": "\uE7E6",
  "delete": "\uE6B4",
  "service_light": "\uE7E7",
  "profile": "\uE6B7",
  "friend_add_light": "\uE7E8",
  "home": "\uE6B8",
  "edit_light": "\uE7E9",
  "cartfill": "\uE6B9",
  "camera_light": "\uE7EA",
  "discoverfill": "\uE6BA",
  "hot_light": "\uE7EB",
  "homefill": "\uE6BB",
  "refresh_light": "\uE7EC",
  "message": "\uE6BC",
  "back_light": "\uE7ED",
  "addressbook": "\uE6BD",
  "share_light": "\uE7EE",
  "link": "\uE6BF",
  "comment_light": "\uE7EF",
  "lock": "\uE6C0",
  "appreciate_light": "\uE7F0",
  "unlock": "\uE6C2",
  "favor_light": "\uE7F1",
  "vip": "\uE6C3",
  "appreciate_fill_light": "\uE7F2",
  "weibo": "\uE6C4",
  "comment_fill_light": "\uE7F3",
  "activity": "\uE6C5",
  "big": "\uE6C7",
  "more_android_light": "\uE7F5",
  "friendaddfill": "\uE6C9",
  "friend_light": "\uE7F6",
  "friendadd": "\uE6CA",
  "more_light": "\uE7F7",
  "friendfamous": "\uE6CB",
  "goods_favor_light": "\uE7F8",
  "friend": "\uE6CC",
  "goods_new_fill_light": "\uE7F9",
  "goods": "\uE6CD",
  "goods_new_light": "\uE7FA",
  "selection": "\uE6CE",
  "goods_light": "\uE7FB",
  "tmall": "\uE6CF",
  "medal_fill_light": "\uE7FC",
  "explore": "\uE6D2",
  "medal_light": "\uE7FD",
  "present": "\uE6D3",
  "news_fill_light": "\uE7FE",
  "squarecheckfill": "\uE6D4",
  "news_hot_fill_light": "\uE7FF",
  "square": "\uE6D5",
  "news_hot_light": "\uE800",
  "squarecheck": "\uE6D6",
  "news_light": "\uE801",
  "round": "\uE6D7",
  "video_fill_light": "\uE802",
  "roundaddfill": "\uE6D8",
  "message_fill_light": "\uE803",
  "roundadd": "\uE6D9",
  "form_light": "\uE804",
  "add": "\uE6DA",
  "video_light": "\uE805",
  "notificationforbidfill": "\uE6DB",
  "search_list_light": "\uE806",
  "explorefill": "\uE6DD",
  "form_fill_light": "\uE807",
  "fold": "\uE6DE",
  "global_light": "\uE808",
  "game": "\uE6DF",
  "global": "\uE809",
  "redpacket": "\uE6E0",
  "favor_fill_light": "\uE80A",
  "selectionfill": "\uE6E1",
  "delete_light": "\uE80B",
  "similar": "\uE6E2",
  "back_android": "\uE80C",
  "appreciatefill": "\uE6E3",
  "back_android_light": "\uE80D",
  "infofill": "\uE6E4",
  "down_light": "\uE80E",
  "info": "\uE6E5",
  "round_close_light": "\uE80F",
  "round_close_fill_light": "\uE810",
  "expressman": "\uE811",
  "forwardfill": "\uE6EA",
  "punch_light": "\uE812",
  "forward": "\uE6EB",
  "evaluate_fill": "\uE813",
  "rechargefill": "\uE6EC",
  "furniture": "\uE814",
  "recharge": "\uE6ED",
  "dress": "\uE815",
  "vipcard": "\uE6EE",
  "coffee": "\uE816",
  "voice": "\uE6EF",
  "sports": "\uE817",
  "voicefill": "\uE6F0",
  "group_light": "\uE818",
  "friendfavor": "\uE6F1",
  "location_light": "\uE819",
  "wifi": "\uE6F2",
  "attention_light": "\uE81A",
  "share": "\uE6F3",
  "group_fill_light": "\uE81B",
  "wefill": "\uE6F4",
  "group_fill": "\uE81C",
  "we": "\uE6F5",
  "play_forward_fill": "\uE81D",
  "lightauto": "\uE6F6",
  "subscription_light": "\uE81E",
  "lightforbid": "\uE6F7",
  "deliver_fill": "\uE81F",
  "lightfill": "\uE6F8",
  "notice_forbid_fill": "\uE820",
  "camerarotate": "\uE6F9",
  "qr_code_light": "\uE821",
  "light": "\uE6FA",
  "settings_light": "\uE822",
  "barcode": "\uE6FB",
  "pick": "\uE823",
  "flashlightclose": "\uE6FC",
  "form_favor_light": "\uE824",
  "flashlightopen": "\uE6FD",
  "round_comment_light": "\uE825",
  "searchlist": "\uE6FE",
  "phone_light": "\uE826",
  "service": "\uE6FF",
  "round_down_light": "\uE827",
  "sort": "\uE700",
  "friend_settings_light": "\uE828",
  "1212": "\uE702",
  "change": "\uE829",
  "down": "\uE703",
  "round_list_light": "\uE82A",
  "mobile": "\uE704",
  "ticket_fill": "\uE82B",
  "mobilefill": "\uE705",
  "round_friend_fill": "\uE82C",
  "copy": "\uE706",
  "round_crown_fill": "\uE82D",
  "countdownfill": "\uE707",
  "round_link_fill": "\uE82E",
  "countdown": "\uE708",
  "round_light_fill": "\uE82F",
  "noticefill": "\uE709",
  "round_favor_fill": "\uE830",
  "notice": "\uE70A",
  "round_menu_fill": "\uE831",
  "qiang": "\uE70B",
  "round_location_fill": "\uE832",
  "upstagefill": "\uE70E",
  "round_pay_fill": "\uE833",
  "upstage": "\uE70F",
  "round_like_fill": "\uE834",
  "babyfill": "\uE710",
  "round_people_fill": "\uE835",
  "baby": "\uE711",
  "round_pay": "\uE836",
  "brandfill": "\uE712",
  "round_rank_fill": "\uE837",
  "brand": "\uE713",
  "round_redpacket_fill": "\uE838",
  "choicenessfill": "\uE714",
  "round_skin_fill": "\uE839",
  "choiceness": "\uE715",
  "round_record_fill": "\uE83A",
  "clothesfill": "\uE716",
  "round_ticket_fill": "\uE83B",
  "clothes": "\uE717",
  "round_redpacket": "\uE83C",
  "creativefill": "\uE718",
  "round_text_fill": "\uE83D",
  "creative": "\uE719",
  "round_ticket": "\uE83E",
  "female": "\uE71A",
  "round_transfer_fill": "\uE83F",
  "keyboard": "\uE71B",
  "subtitle_block_light": "\uE840" };exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uni-shop","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"uni-shop","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"uni-shop","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"uni-shop","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 23:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 24);

/***/ }),

/***/ 24:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 25);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 25:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 26:
/*!****************************************************!*\
  !*** F:/临时/uniapp/uni-shop/mixins/tabbar-badge.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 14);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =

{
  computed: _objectSpread({},

  (0, _vuex.mapGetters)('m_cart', ['total'])),


  watch: {
    //监听total的变化
    total: function total() {
      this.setBadge();
    } },


  onShow: function onShow() {
    //页面展示时，显示数字徽章
    this.setBadge();
  },

  methods: {
    //设置数字徽章
    setBadge: function setBadge() {
      uni.setTabBarBadge({
        index: 2, //tabbar的索引 索引为2也就是购物车的tabbar选项
        text: this.total + '' //text的值必须是字符串，不能是数字
      });
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') !== -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') !== -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


var ignoreVueI18n = true;
function watchAppLocale(appVm, i18n) {
  appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
    i18n.setLocale(newLocale);
  });
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    locale =
    typeof uni !== 'undefined' && uni.getLocale && uni.getLocale() ||
    LOCALE_EN;
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var appVm = getApp().$vm;
      watchAppLocale(appVm, i18n);
      if (!appVm.$t || !appVm.$i18n || ignoreVueI18n) {
        // if (!locale) {
        //   i18n.setLocale(getDefaultLocale())
        // }
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          // 触发响应式
          appVm.$locale;
          return i18n.t(key, values);
        };
      } else
      {
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          var $i18n = appVm.$i18n;
          var silentTranslationWarn = $i18n.silentTranslationWarn;
          $i18n.silentTranslationWarn = true;
          var msg = appVm.$t(key, values);
          $i18n.silentTranslationWarn = silentTranslationWarn;
          if (msg !== key) {
            return msg;
          }
          return i18n.t(key, $i18n.locale, values);
        };
      }
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 5:
/*!****************************************!*\
  !*** F:/临时/uniapp/uni-shop/pages.json ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 94:
/*!*********************************************************************************!*\
  !*** F:/临时/uniapp/uni-shop/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map