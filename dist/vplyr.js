(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.vplyr || (g.vplyr = {})).js = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":11}],2:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":12}],3:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":13}],4:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":14}],5:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":15}],6:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/weak-map"), __esModule: true };
},{"core-js/library/fn/weak-map":16}],7:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],8:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = _dereq_("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":3}],9:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = _dereq_("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
},{"../core-js/object/define-property":3}],10:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = _dereq_("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = _dereq_("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":4,"../core-js/symbol/iterator":5}],11:[function(_dereq_,module,exports){
var core  = _dereq_('../../modules/_core')
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};
},{"../../modules/_core":29}],12:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.assign');
module.exports = _dereq_('../../modules/_core').Object.assign;
},{"../../modules/_core":29,"../../modules/es6.object.assign":87}],13:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.define-property');
var $Object = _dereq_('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":29,"../../modules/es6.object.define-property":88}],14:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.symbol');
_dereq_('../../modules/es6.object.to-string');
_dereq_('../../modules/es7.symbol.async-iterator');
_dereq_('../../modules/es7.symbol.observable');
module.exports = _dereq_('../../modules/_core').Symbol;
},{"../../modules/_core":29,"../../modules/es6.object.to-string":89,"../../modules/es6.symbol":91,"../../modules/es7.symbol.async-iterator":93,"../../modules/es7.symbol.observable":94}],15:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.string.iterator');
_dereq_('../../modules/web.dom.iterable');
module.exports = _dereq_('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":83,"../../modules/es6.string.iterator":90,"../../modules/web.dom.iterable":95}],16:[function(_dereq_,module,exports){
_dereq_('../modules/es6.object.to-string');
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.weak-map');
module.exports = _dereq_('../modules/_core').WeakMap;
},{"../modules/_core":29,"../modules/es6.object.to-string":89,"../modules/es6.weak-map":92,"../modules/web.dom.iterable":95}],17:[function(_dereq_,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],18:[function(_dereq_,module,exports){
module.exports = function(){ /* empty */ };
},{}],19:[function(_dereq_,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],20:[function(_dereq_,module,exports){
var isObject = _dereq_('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":47}],21:[function(_dereq_,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = _dereq_('./_to-iobject')
  , toLength  = _dereq_('./_to-length')
  , toIndex   = _dereq_('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":75,"./_to-iobject":77,"./_to-length":78}],22:[function(_dereq_,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = _dereq_('./_ctx')
  , IObject  = _dereq_('./_iobject')
  , toObject = _dereq_('./_to-object')
  , toLength = _dereq_('./_to-length')
  , asc      = _dereq_('./_array-species-create');
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./_array-species-create":24,"./_ctx":30,"./_iobject":44,"./_to-length":78,"./_to-object":79}],23:[function(_dereq_,module,exports){
var isObject = _dereq_('./_is-object')
  , isArray  = _dereq_('./_is-array')
  , SPECIES  = _dereq_('./_wks')('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};
},{"./_is-array":46,"./_is-object":47,"./_wks":84}],24:[function(_dereq_,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = _dereq_('./_array-species-constructor');

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};
},{"./_array-species-constructor":23}],25:[function(_dereq_,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = _dereq_('./_cof')
  , TAG = _dereq_('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":26,"./_wks":84}],26:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],27:[function(_dereq_,module,exports){
'use strict';
var redefineAll       = _dereq_('./_redefine-all')
  , getWeak           = _dereq_('./_meta').getWeak
  , anObject          = _dereq_('./_an-object')
  , isObject          = _dereq_('./_is-object')
  , anInstance        = _dereq_('./_an-instance')
  , forOf             = _dereq_('./_for-of')
  , createArrayMethod = _dereq_('./_array-methods')
  , $has              = _dereq_('./_has')
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
},{"./_an-instance":19,"./_an-object":20,"./_array-methods":22,"./_for-of":38,"./_has":40,"./_is-object":47,"./_meta":55,"./_redefine-all":69}],28:[function(_dereq_,module,exports){
'use strict';
var global         = _dereq_('./_global')
  , $export        = _dereq_('./_export')
  , meta           = _dereq_('./_meta')
  , fails          = _dereq_('./_fails')
  , hide           = _dereq_('./_hide')
  , redefineAll    = _dereq_('./_redefine-all')
  , forOf          = _dereq_('./_for-of')
  , anInstance     = _dereq_('./_an-instance')
  , isObject       = _dereq_('./_is-object')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , dP             = _dereq_('./_object-dp').f
  , each           = _dereq_('./_array-methods')(0)
  , DESCRIPTORS    = _dereq_('./_descriptors');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function(target, iterable){
      anInstance(target, C, NAME, '_c');
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        anInstance(this, C, KEY);
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)dP(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./_an-instance":19,"./_array-methods":22,"./_descriptors":32,"./_export":36,"./_fails":37,"./_for-of":38,"./_global":39,"./_hide":41,"./_is-object":47,"./_meta":55,"./_object-dp":58,"./_redefine-all":69,"./_set-to-string-tag":71}],29:[function(_dereq_,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],30:[function(_dereq_,module,exports){
// optional / simple context binding
var aFunction = _dereq_('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":17}],31:[function(_dereq_,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],32:[function(_dereq_,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !_dereq_('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":37}],33:[function(_dereq_,module,exports){
var isObject = _dereq_('./_is-object')
  , document = _dereq_('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":39,"./_is-object":47}],34:[function(_dereq_,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],35:[function(_dereq_,module,exports){
// all enumerable object keys, includes symbols
var getKeys = _dereq_('./_object-keys')
  , gOPS    = _dereq_('./_object-gops')
  , pIE     = _dereq_('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":63,"./_object-keys":66,"./_object-pie":67}],36:[function(_dereq_,module,exports){
var global    = _dereq_('./_global')
  , core      = _dereq_('./_core')
  , ctx       = _dereq_('./_ctx')
  , hide      = _dereq_('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":29,"./_ctx":30,"./_global":39,"./_hide":41}],37:[function(_dereq_,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],38:[function(_dereq_,module,exports){
var ctx         = _dereq_('./_ctx')
  , call        = _dereq_('./_iter-call')
  , isArrayIter = _dereq_('./_is-array-iter')
  , anObject    = _dereq_('./_an-object')
  , toLength    = _dereq_('./_to-length')
  , getIterFn   = _dereq_('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":20,"./_ctx":30,"./_is-array-iter":45,"./_iter-call":48,"./_to-length":78,"./core.get-iterator-method":85}],39:[function(_dereq_,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],40:[function(_dereq_,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],41:[function(_dereq_,module,exports){
var dP         = _dereq_('./_object-dp')
  , createDesc = _dereq_('./_property-desc');
module.exports = _dereq_('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":32,"./_object-dp":58,"./_property-desc":68}],42:[function(_dereq_,module,exports){
module.exports = _dereq_('./_global').document && document.documentElement;
},{"./_global":39}],43:[function(_dereq_,module,exports){
module.exports = !_dereq_('./_descriptors') && !_dereq_('./_fails')(function(){
  return Object.defineProperty(_dereq_('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":32,"./_dom-create":33,"./_fails":37}],44:[function(_dereq_,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _dereq_('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":26}],45:[function(_dereq_,module,exports){
// check on default Array iterator
var Iterators  = _dereq_('./_iterators')
  , ITERATOR   = _dereq_('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":52,"./_wks":84}],46:[function(_dereq_,module,exports){
// 7.2.2 IsArray(argument)
var cof = _dereq_('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":26}],47:[function(_dereq_,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],48:[function(_dereq_,module,exports){
// call something on iterator step with safe closing on error
var anObject = _dereq_('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":20}],49:[function(_dereq_,module,exports){
'use strict';
var create         = _dereq_('./_object-create')
  , descriptor     = _dereq_('./_property-desc')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_dereq_('./_hide')(IteratorPrototype, _dereq_('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":41,"./_object-create":57,"./_property-desc":68,"./_set-to-string-tag":71,"./_wks":84}],50:[function(_dereq_,module,exports){
'use strict';
var LIBRARY        = _dereq_('./_library')
  , $export        = _dereq_('./_export')
  , redefine       = _dereq_('./_redefine')
  , hide           = _dereq_('./_hide')
  , has            = _dereq_('./_has')
  , Iterators      = _dereq_('./_iterators')
  , $iterCreate    = _dereq_('./_iter-create')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , getPrototypeOf = _dereq_('./_object-gpo')
  , ITERATOR       = _dereq_('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":36,"./_has":40,"./_hide":41,"./_iter-create":49,"./_iterators":52,"./_library":54,"./_object-gpo":64,"./_redefine":70,"./_set-to-string-tag":71,"./_wks":84}],51:[function(_dereq_,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],52:[function(_dereq_,module,exports){
module.exports = {};
},{}],53:[function(_dereq_,module,exports){
var getKeys   = _dereq_('./_object-keys')
  , toIObject = _dereq_('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":66,"./_to-iobject":77}],54:[function(_dereq_,module,exports){
module.exports = true;
},{}],55:[function(_dereq_,module,exports){
var META     = _dereq_('./_uid')('meta')
  , isObject = _dereq_('./_is-object')
  , has      = _dereq_('./_has')
  , setDesc  = _dereq_('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !_dereq_('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":37,"./_has":40,"./_is-object":47,"./_object-dp":58,"./_uid":81}],56:[function(_dereq_,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = _dereq_('./_object-keys')
  , gOPS     = _dereq_('./_object-gops')
  , pIE      = _dereq_('./_object-pie')
  , toObject = _dereq_('./_to-object')
  , IObject  = _dereq_('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || _dereq_('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":37,"./_iobject":44,"./_object-gops":63,"./_object-keys":66,"./_object-pie":67,"./_to-object":79}],57:[function(_dereq_,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = _dereq_('./_an-object')
  , dPs         = _dereq_('./_object-dps')
  , enumBugKeys = _dereq_('./_enum-bug-keys')
  , IE_PROTO    = _dereq_('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _dereq_('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  _dereq_('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":20,"./_dom-create":33,"./_enum-bug-keys":34,"./_html":42,"./_object-dps":59,"./_shared-key":72}],58:[function(_dereq_,module,exports){
var anObject       = _dereq_('./_an-object')
  , IE8_DOM_DEFINE = _dereq_('./_ie8-dom-define')
  , toPrimitive    = _dereq_('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = _dereq_('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":20,"./_descriptors":32,"./_ie8-dom-define":43,"./_to-primitive":80}],59:[function(_dereq_,module,exports){
var dP       = _dereq_('./_object-dp')
  , anObject = _dereq_('./_an-object')
  , getKeys  = _dereq_('./_object-keys');

module.exports = _dereq_('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":20,"./_descriptors":32,"./_object-dp":58,"./_object-keys":66}],60:[function(_dereq_,module,exports){
var pIE            = _dereq_('./_object-pie')
  , createDesc     = _dereq_('./_property-desc')
  , toIObject      = _dereq_('./_to-iobject')
  , toPrimitive    = _dereq_('./_to-primitive')
  , has            = _dereq_('./_has')
  , IE8_DOM_DEFINE = _dereq_('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = _dereq_('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":32,"./_has":40,"./_ie8-dom-define":43,"./_object-pie":67,"./_property-desc":68,"./_to-iobject":77,"./_to-primitive":80}],61:[function(_dereq_,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = _dereq_('./_to-iobject')
  , gOPN      = _dereq_('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":62,"./_to-iobject":77}],62:[function(_dereq_,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = _dereq_('./_object-keys-internal')
  , hiddenKeys = _dereq_('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":34,"./_object-keys-internal":65}],63:[function(_dereq_,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],64:[function(_dereq_,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = _dereq_('./_has')
  , toObject    = _dereq_('./_to-object')
  , IE_PROTO    = _dereq_('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":40,"./_shared-key":72,"./_to-object":79}],65:[function(_dereq_,module,exports){
var has          = _dereq_('./_has')
  , toIObject    = _dereq_('./_to-iobject')
  , arrayIndexOf = _dereq_('./_array-includes')(false)
  , IE_PROTO     = _dereq_('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":21,"./_has":40,"./_shared-key":72,"./_to-iobject":77}],66:[function(_dereq_,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = _dereq_('./_object-keys-internal')
  , enumBugKeys = _dereq_('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":34,"./_object-keys-internal":65}],67:[function(_dereq_,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],68:[function(_dereq_,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],69:[function(_dereq_,module,exports){
var hide = _dereq_('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":41}],70:[function(_dereq_,module,exports){
module.exports = _dereq_('./_hide');
},{"./_hide":41}],71:[function(_dereq_,module,exports){
var def = _dereq_('./_object-dp').f
  , has = _dereq_('./_has')
  , TAG = _dereq_('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":40,"./_object-dp":58,"./_wks":84}],72:[function(_dereq_,module,exports){
var shared = _dereq_('./_shared')('keys')
  , uid    = _dereq_('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":73,"./_uid":81}],73:[function(_dereq_,module,exports){
var global = _dereq_('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":39}],74:[function(_dereq_,module,exports){
var toInteger = _dereq_('./_to-integer')
  , defined   = _dereq_('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":31,"./_to-integer":76}],75:[function(_dereq_,module,exports){
var toInteger = _dereq_('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":76}],76:[function(_dereq_,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],77:[function(_dereq_,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _dereq_('./_iobject')
  , defined = _dereq_('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":31,"./_iobject":44}],78:[function(_dereq_,module,exports){
// 7.1.15 ToLength
var toInteger = _dereq_('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":76}],79:[function(_dereq_,module,exports){
// 7.1.13 ToObject(argument)
var defined = _dereq_('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":31}],80:[function(_dereq_,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = _dereq_('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":47}],81:[function(_dereq_,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],82:[function(_dereq_,module,exports){
var global         = _dereq_('./_global')
  , core           = _dereq_('./_core')
  , LIBRARY        = _dereq_('./_library')
  , wksExt         = _dereq_('./_wks-ext')
  , defineProperty = _dereq_('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":29,"./_global":39,"./_library":54,"./_object-dp":58,"./_wks-ext":83}],83:[function(_dereq_,module,exports){
exports.f = _dereq_('./_wks');
},{"./_wks":84}],84:[function(_dereq_,module,exports){
var store      = _dereq_('./_shared')('wks')
  , uid        = _dereq_('./_uid')
  , Symbol     = _dereq_('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":39,"./_shared":73,"./_uid":81}],85:[function(_dereq_,module,exports){
var classof   = _dereq_('./_classof')
  , ITERATOR  = _dereq_('./_wks')('iterator')
  , Iterators = _dereq_('./_iterators');
module.exports = _dereq_('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":25,"./_core":29,"./_iterators":52,"./_wks":84}],86:[function(_dereq_,module,exports){
'use strict';
var addToUnscopables = _dereq_('./_add-to-unscopables')
  , step             = _dereq_('./_iter-step')
  , Iterators        = _dereq_('./_iterators')
  , toIObject        = _dereq_('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = _dereq_('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":18,"./_iter-define":50,"./_iter-step":51,"./_iterators":52,"./_to-iobject":77}],87:[function(_dereq_,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = _dereq_('./_export');

$export($export.S + $export.F, 'Object', {assign: _dereq_('./_object-assign')});
},{"./_export":36,"./_object-assign":56}],88:[function(_dereq_,module,exports){
var $export = _dereq_('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !_dereq_('./_descriptors'), 'Object', {defineProperty: _dereq_('./_object-dp').f});
},{"./_descriptors":32,"./_export":36,"./_object-dp":58}],89:[function(_dereq_,module,exports){

},{}],90:[function(_dereq_,module,exports){
'use strict';
var $at  = _dereq_('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
_dereq_('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":50,"./_string-at":74}],91:[function(_dereq_,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = _dereq_('./_global')
  , has            = _dereq_('./_has')
  , DESCRIPTORS    = _dereq_('./_descriptors')
  , $export        = _dereq_('./_export')
  , redefine       = _dereq_('./_redefine')
  , META           = _dereq_('./_meta').KEY
  , $fails         = _dereq_('./_fails')
  , shared         = _dereq_('./_shared')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , uid            = _dereq_('./_uid')
  , wks            = _dereq_('./_wks')
  , wksExt         = _dereq_('./_wks-ext')
  , wksDefine      = _dereq_('./_wks-define')
  , keyOf          = _dereq_('./_keyof')
  , enumKeys       = _dereq_('./_enum-keys')
  , isArray        = _dereq_('./_is-array')
  , anObject       = _dereq_('./_an-object')
  , toIObject      = _dereq_('./_to-iobject')
  , toPrimitive    = _dereq_('./_to-primitive')
  , createDesc     = _dereq_('./_property-desc')
  , _create        = _dereq_('./_object-create')
  , gOPNExt        = _dereq_('./_object-gopn-ext')
  , $GOPD          = _dereq_('./_object-gopd')
  , $DP            = _dereq_('./_object-dp')
  , $keys          = _dereq_('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  _dereq_('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  _dereq_('./_object-pie').f  = $propertyIsEnumerable;
  _dereq_('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !_dereq_('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || _dereq_('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":20,"./_descriptors":32,"./_enum-keys":35,"./_export":36,"./_fails":37,"./_global":39,"./_has":40,"./_hide":41,"./_is-array":46,"./_keyof":53,"./_library":54,"./_meta":55,"./_object-create":57,"./_object-dp":58,"./_object-gopd":60,"./_object-gopn":62,"./_object-gopn-ext":61,"./_object-gops":63,"./_object-keys":66,"./_object-pie":67,"./_property-desc":68,"./_redefine":70,"./_set-to-string-tag":71,"./_shared":73,"./_to-iobject":77,"./_to-primitive":80,"./_uid":81,"./_wks":84,"./_wks-define":82,"./_wks-ext":83}],92:[function(_dereq_,module,exports){
'use strict';
var each         = _dereq_('./_array-methods')(0)
  , redefine     = _dereq_('./_redefine')
  , meta         = _dereq_('./_meta')
  , assign       = _dereq_('./_object-assign')
  , weak         = _dereq_('./_collection-weak')
  , isObject     = _dereq_('./_is-object')
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = _dereq_('./_collection')('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./_array-methods":22,"./_collection":28,"./_collection-weak":27,"./_is-object":47,"./_meta":55,"./_object-assign":56,"./_redefine":70}],93:[function(_dereq_,module,exports){
_dereq_('./_wks-define')('asyncIterator');
},{"./_wks-define":82}],94:[function(_dereq_,module,exports){
_dereq_('./_wks-define')('observable');
},{"./_wks-define":82}],95:[function(_dereq_,module,exports){
_dereq_('./es6.array.iterator');
var global        = _dereq_('./_global')
  , hide          = _dereq_('./_hide')
  , Iterators     = _dereq_('./_iterators')
  , TO_STRING_TAG = _dereq_('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":39,"./_hide":41,"./_iterators":52,"./_wks":84,"./es6.array.iterator":86}],96:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultConfig = undefined;

var _assign = _dereq_('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = _dereq_('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _selectors;

exports.createDefaultConfig = createDefaultConfig;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig = exports.defaultConfig = {
    enabled: true,
    debug: true,
    autoplay: false,
    loop: false,
    seekTime: 10,
    volume: 10,
    volumeMin: 0,
    volumeMax: 10,
    volumeStep: 1,
    duration: null,
    displayDuration: true,
    loadSprite: true,
    hideControls: true,
    blankUrl: 'https://cdn.selz.com/plyr/blank.mp4',
    controls: ['play-large', 'play', 'progress', 'time', 'mute', 'volume', 'captions', 'fullscreen'],
    selectors: (_selectors = {
        html5: 'video, audio',
        editable: 'input, textarea, select, [contenteditable]',
        container: '.vplyr',
        controls: {
            container: null,
            wrapper: '.vplyr-controls'
        },
        buttons: {
            seek: '[data-video="seek"]',
            play: '[data-video="play"]',
            pause: '[data-video="pause"]',
            mute: '[data-video="mute"]',
            fullscreen: '[data-video="fullscreen"]'
        },
        volume: {
            input: '[data-video="volume"]',
            display: '.vplyr-volume-display'
        },
        progress: {
            container: '.vplyr-progress-bar-container',
            buffer: '.vplyr-progress-buffer',
            played: '.vplyr-progress-played'
        }
    }, (0, _defineProperty3.default)(_selectors, 'volume', {
        input: '[data-video="volume"]',
        display: '.vplyr-volume-display'
    }), (0, _defineProperty3.default)(_selectors, 'currentTime', '.control-currenttime'), (0, _defineProperty3.default)(_selectors, 'duration', '.control-duration'), _selectors),

    // Custom control listeners
    listeners: {
        seek: null,
        play: null,
        pause: null,
        restart: null,
        rewind: null,
        forward: null,
        mute: null,
        volume: null,
        captions: null,
        fullscreen: null
    },
    storage: {
        enabled: true,
        key: 'vplyr'
    },
    types: {
        html5: ['video']
    },
    classes: {
        setup: 'vplyr-setup',
        ready: 'vplyr-ready',
        muted: 'vplyr-muted',
        type: 'vplyr-{0}',
        videoWrapper: 'vplyr-video-container',
        playing: 'vplyr-plying',
        loading: 'vplyr-loading',
        hover: 'vplyr-hover',
        stopped: 'vplyr-stopped',
        inIos: 'vplyr--is-ios',
        inTouch: 'vplyr--is-touch',
        inWechat: 'vplyr--is-wechat',
        inChrome: 'vplyr--is-chrome',
        tabFocus: 'tab-focus',
        hideControls: 'vplyr-hide-controls',
        fullscreen: {
            enabled: 'vplyr-fullscreen-enabled',
            active: 'vplyr-fullscreen-active'
        }
    },
    events: ['ready', 'ended', 'progress', 'stalled', 'playing', 'waiting', 'canplay', 'canplaythrough', 'loadstart', 'loadeddata', 'loadedmetadata', 'timeupdate', 'volumechange', 'play', 'pause', 'error', 'seeking', 'seeked', 'emptied'],
    // Logging
    logPrefix: '[VPlyr]'
};
function createDefaultConfig() {
    return (0, _assign2.default)({}, defaultConfig);
}

},{"babel-runtime/core-js/object/assign":2,"babel-runtime/helpers/defineProperty":9}],97:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _util = _dereq_('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dom = function () {
  function Dom() {
    (0, _classCallCheck3.default)(this, Dom);

    this.toggleClass = this._toggleClass.bind(this);
    this.removeElement = this._removeElement.bind(this);
    this.hasClass = this._hasClass.bind(this);
    this.injectScript = this._injectScript.bind(this);
    this.prependChild = this._prependChild.bind(this);
    this.setAttributes = this._setAttributes.bind(this);
    this.insertElement = this._insertElement.bind(this);
    this.getClassname = this._getClassname.bind(this);
    this.fullscreen = this._fullscreen.bind(this);
  }

  (0, _createClass3.default)(Dom, [{
    key: '_getClassname',
    value: function _getClassname(selector) {
      return selector.replace('.', '');
    }
  }, {
    key: '_insertElement',
    value: function _insertElement(type, parent, attributes) {
      // Create a new <element>
      var element = document.createElement(type);

      // Set all passed attributes
      _setAttributes(element, attributes);

      // Inject the new element
      _prependChild(parent, element);
    }
  }, {
    key: '_setAttributes',
    value: function _setAttributes(element, attributes) {
      for (var key in attributes) {
        element.setAttribute(key, _is.boolean(attributes[key]) && attributes[key] ? '' : attributes[key]);
      }
    }
  }, {
    key: '_prependChild',
    value: function _prependChild(parent, element) {
      parent.insertBefore(element, parent.firstChild);
    }
  }, {
    key: '_injectScript',
    value: function _injectScript(source) {
      if (document.querySelectorAll('script[src="' + source + '"]').length) {
        return;
      }

      var tag = document.createElement('script');
      tag.src = source;
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, {
    key: '_hasClass',
    value: function _hasClass(element, className) {
      if (element) {
        if (element.classList) {
          return element.classList.contains(className);
        } else {
          return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className);
        }
      }
      return false;
    }
  }, {
    key: '_removeElement',
    value: function _removeElement(element) {
      if (!element) {
        return;
      }
      element.parentNode.removeChild(element);
    }
    // Toggle class on an element

  }, {
    key: '_toggleClass',
    value: function _toggleClass(element, className, state) {
      if (element) {
        if (element.classList) {
          element.classList[state ? 'add' : 'remove'](className);
        } else {
          var name = (' ' + element.className + ' ').replace(/\s+/g, ' ').replace(' ' + className + ' ', '');
          element.className = name + (state ? ' ' + className : '');
        }
      }
    }
  }, {
    key: '_fullscreen',
    value: function _fullscreen() {
      var fullscreen = {
        supportsFullScreen: false,
        isFullScreen: function isFullScreen() {
          return false;
        },
        requestFullScreen: function requestFullScreen() {},
        cancelFullScreen: function cancelFullScreen() {},
        fullScreenEventName: '',
        element: null,
        prefix: ''
      },
          browserPrefixes = 'webkit o moz ms khtml'.split(' ');

      // Check for native support
      if (!_util2.default.is.undefined(document.cancelFullScreen)) {
        fullscreen.supportsFullScreen = true;
      } else {
        // Check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++) {
          fullscreen.prefix = browserPrefixes[i];

          if (!_util2.default.is.undefined(document[fullscreen.prefix + 'CancelFullScreen'])) {
            fullscreen.supportsFullScreen = true;
            break;
          } else if (!_util2.default.is.undefined(document.msExitFullscreen) && document.msFullscreenEnabled) {
            // Special case for MS (when isn't it?)
            fullscreen.prefix = 'ms';
            fullscreen.supportsFullScreen = true;
            break;
          }
        }
      }

      // Update methods to do something useful
      if (fullscreen.supportsFullScreen) {
        // Yet again Microsoft awesomeness,
        // Sometimes the prefix is 'ms', sometimes 'MS' to keep you on your toes
        fullscreen.fullScreenEventName = fullscreen.prefix === 'ms' ? 'MSFullscreenChange' : fullscreen.prefix + 'fullscreenchange';

        fullscreen.isFullScreen = function (element) {
          if (_util2.default.is.undefined(element)) {
            element = document.body;
          }
          switch (this.prefix) {
            case '':
              return document.fullscreenElement === element;
            case 'moz':
              return document.mozFullScreenElement === element;
            default:
              return document[this.prefix + 'FullscreenElement'] === element;
          }
        };
        fullscreen.requestFullScreen = function (element) {
          if (_util2.default.is.undefined(element)) {
            element = document.body;
          }
          return this.prefix === '' ? element.requestFullScreen() : element[this.prefix + (this.prefix === 'ms' ? 'RequestFullscreen' : 'RequestFullScreen')]();
        };
        fullscreen.cancelFullScreen = function () {
          return this.prefix === '' ? document.cancelFullScreen() : document[this.prefix + (this.prefix === 'ms' ? 'ExitFullscreen' : 'CancelFullScreen')]();
        };
        fullscreen.element = function () {
          return this.prefix === '' ? document.fullscreenElement : document[this.prefix + 'FullscreenElement'];
        };
      }

      return fullscreen;
    }
  }]);
  return Dom;
}();

exports.default = new Dom();

},{"./util":103,"babel-runtime/helpers/classCallCheck":7,"babel-runtime/helpers/createClass":8}],98:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _util = _dereq_('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Event = function () {
  function Event() {
    (0, _classCallCheck3.default)(this, Event);

    this.onEvent = this._on.bind(this);
    this.customEvent = this._event.bind(this);
  }

  (0, _createClass3.default)(Event, [{
    key: '_event',
    value: function _event(element, type, bubbles, properties) {
      // Bail if no element
      if (!element || !type) {
        return;
      }

      // Default bubbles to false
      if (!_util2.default.is.boolean(bubbles)) {
        bubbles = false;
      }

      // Create and dispatch the event
      var event = new CustomEvent(type, {
        bubbles: bubbles,
        detail: properties
      });

      // Dispatch the event
      element.dispatchEvent(event);
    }
  }, {
    key: '_on',
    value: function _on(element, events, callback, useCapture) {
      if (element) {
        this._toggleListener(element, events, callback, true, useCapture);
      }
    }
  }, {
    key: '_toggleListener',
    value: function _toggleListener(element, events, callback, toggle, useCapture) {
      var eventList = events.split(' ');
      // Whether the listener is a capturing listener or not
      // Default to false
      if (!_util2.default.is.boolean(useCapture)) {
        useCapture = false;
      }

      // If a nodelist is passed, call itself on each node
      if (element instanceof NodeList) {
        for (var x = 0; x < element.length; x++) {
          if (element[x] instanceof Node) {
            this._toggleListener(element[x], arguments[1], arguments[2], arguments[3]);
          }
        }
        return;
      }

      // If a single node is passed, bind the event listener
      for (var i = 0; i < eventList.length; i++) {
        element[toggle ? 'addEventListener' : 'removeEventListener'](eventList[i], callback, useCapture);
      }
    }
  }]);
  return Event;
}();

exports.default = new Event();

},{"./util":103,"babel-runtime/helpers/classCallCheck":7,"babel-runtime/helpers/createClass":8}],99:[function(_dereq_,module,exports){
'use strict';

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _vplyr = _dereq_('./vplyr.js');

var _vplyr2 = _interopRequireDefault(_vplyr);

var _polyfill = _dereq_('./polyfill.js');

var _polyfill2 = _interopRequireDefault(_polyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;(function (root, factory) {
    'use strict';
    /*global define,module*/

    if ((typeof module === 'undefined' ? 'undefined' : (0, _typeof3.default)(module)) === 'object' && (0, _typeof3.default)(module.exports) === 'object') {
        // Node, CommonJS-like
        module.exports = factory(root, document);
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define([], function () {
            return factory(root, document);
        });
    } else {
        // Browser globals (root is window)
        root.vplyr = factory(root, document);
    }
})(typeof window !== 'undefined' ? window : undefined, function (window, document) {
    _polyfill2.default.install();
    window.vPlayer = _vplyr2.default;
});

},{"./polyfill.js":102,"./vplyr.js":104,"babel-runtime/helpers/typeof":10}],100:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _util = _dereq_('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Log = function () {
  function Log(config) {
    (0, _classCallCheck3.default)(this, Log);

    this._config = config;
    this.log = this._log.bind(this);
    this.warn = this._warn.bind(this);
    this.console = this._console.bind(this);
  }

  (0, _createClass3.default)(Log, [{
    key: '_console',
    value: function _console(type, args) {
      if (this._config.debug && window.console) {
        args = Array.prototype.slice.call(args);

        if (_util2.default.is.string(this._config.logPrefix) && this._config.logPrefix.length) {
          args.unshift(this._config.logPrefix);
        }
        console[type].apply(console, args);
      }
    }
  }, {
    key: '_log',
    value: function _log() {
      this._console('log', arguments);
    }
  }, {
    key: '_warn',
    value: function _warn() {
      this._console('warn', arguments);
    }
  }]);
  return Log;
}();

exports.default = Log;

},{"./util.js":103,"babel-runtime/helpers/classCallCheck":7,"babel-runtime/helpers/createClass":8}],101:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = _dereq_('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _weakMap = _dereq_('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

var _util = _dereq_('./util');

var _util2 = _interopRequireDefault(_util);

var _dom = _dereq_('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _event = _dereq_('./event');

var _event2 = _interopRequireDefault(_event);

var _logger2 = _dereq_('./logger');

var _logger3 = _interopRequireDefault(_logger2);

var _config = _dereq_('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _log = void 0,
    _warn = void 0;


var playerMap = new _weakMap2.default();
var fullscreen = _dom2.default.fullscreen();

var Player = function () {
  function Player(media, config) {
    (0, _classCallCheck3.default)(this, Player);

    var _logger = new _logger3.default(config);

    this._log = _logger.log;
    this._warn = _logger.warn;
    playerMap.set(this, {
      media: media,
      config: config,
      player: {},
      timers: {},
      fullscreen: fullscreen,
      original: null,
      storage: {}
    });
    this._init();
    this._log(this, _dom2.default);
  }

  (0, _createClass3.default)(Player, [{
    key: 'pause',
    value: function pause() {
      this._pause();
    }
  }, {
    key: 'play',
    value: function play() {
      this._play();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._pause();
      this._seek();
    }
  }, {
    key: 'togglePlay',
    value: function togglePlay() {
      this._togglePlay();
    }
  }, {
    key: 'toggleControls',
    value: function toggleControls() {
      this._toggleControls();
    }
  }, {
    key: '_init',
    value: function _init() {
      var _playerMap$get = playerMap.get(this),
          player = _playerMap$get.player,
          media = _playerMap$get.media,
          config = _playerMap$get.config;

      var _playerMap$get2 = playerMap.get(this),
          original = _playerMap$get2.original;

      original = media.cloneNode(true);
      player.media = media;
      this._log('Config', config);

      this._setup();
      this._log('player', player);
      if (!this.__init__) {
        return null;
      }
    }
  }, {
    key: '_setup',
    value: function _setup() {
      if (this.__init__) {
        return null;
      }

      var _playerMap$get3 = playerMap.get(this),
          original = _playerMap$get3.original,
          player = _playerMap$get3.player,
          config = _playerMap$get3.config;

      var media = player.media;

      player.browser = _util2.default.browserSniff;
      if (!_util2.default.is.htmlElement(media)) {
        return;
      }
      this._setupStorage(); //设置storage
      var tagName = media.tagName.toLowerCase();
      player.type = tagName;
      config.crossorigin = media.getAttribute('crossorigin') !== null;
      config.autoplay = config.autoplay || media.getAttribute('autoplay') !== null;
      config.loop = config.loop || media.getAttribute('loop') !== null;
      player.supported = _util2.default.supported(player.type);
      if (!player.supported.basic) {
        return;
      }
      player.container = this._wrap(media, document.createElement('div'));
      player.container.setAttribute('tabindex', 0);
      this._toggleStyleHook();
      this._log('' + player.browser.name + ' ' + player.browser.version);
      this._setupMedia();

      if (_util2.default.inArray(config.types.html5, player.type)) {
        // Setup UI
        this._setupInterface();

        this._ready();
      }
      this.__init__ = true;
    }
  }, {
    key: '_ready',
    value: function _ready() {
      var _this = this;

      var _playerMap$get4 = playerMap.get(this),
          player = _playerMap$get4.player,
          config = _playerMap$get4.config;

      var media = player.media,
          container = player.container;

      // Ready event at end of execution stack

      window.setTimeout(function () {
        _this._triggerEvent(media, 'ready');
      }, 0);

      // Set class hook on media element
      _dom2.default.toggleClass(media, _config.defaultConfig.classes.setup, true);

      // Set container class for ready
      _dom2.default.toggleClass(container, config.classes.ready, true);

      // Autoplay
      if (config.autoplay) {
        this._play();
      }
    }
  }, {
    key: '_setupInterface',
    value: function _setupInterface() {
      var _playerMap$get5 = playerMap.get(this),
          player = _playerMap$get5.player,
          config = _playerMap$get5.config;

      var _getElements = function _getElements(selector) {
        return player.container.querySelectorAll(selector);
      };
      var _getElement = function _getElement(selector) {
        return _getElements(selector)[0];
      };
      if (!player.supported.full) {
        this._warn('Basic support only', player.type);

        // Remove controls
        _dom2.default.removeElement(_getElement(config.selectors.controls.wrapper));
        // reset native controls
        this._toggleNativeControls(true);
        // Bail
        return;
      }
      var controlsMissing = !_getElements(config.selectors.controls.wrapper).length;
      if (controlsMissing) {
        // Inject custom controls
        this._injectControls();
      }
      // Find the elements
      if (!this._findElements()) {
        return;
      }
      if (controlsMissing) {
        this._controlListeners();
      }
      this._mediaListeners();
      this._toggleNativeControls(false);
      this._timeUpdate();
      // Set volume
      this._setVolume();

      this._updateVolume();

      this._checkPlaying();
    }
  }, {
    key: '_setupStorage',
    value: function _setupStorage() {
      var value = null;

      var _playerMap$get6 = playerMap.get(this),
          config = _playerMap$get6.config,
          storage = _playerMap$get6.storage;
      // Bail if we don't have localStorage support or it's disabled


      if (!_util2.default.storageSupport || !config.storage.enabled) {
        return;
      }

      window.localStorage.removeItem('vplyr-volume');

      // load value from the current key
      value = window.localStorage.getItem(config.storage.key);

      if (!value) {
        // Key wasn't set (or had been cleared), move along
        return;
      } else if (/^\d+(\.\d+)?$/.test(value)) {
        // If value is a number, it's probably volume from an older
        // version of plyr. See: https://github.com/Selz/plyr/pull/313
        // Update the key to be JSON
        this._updateStorage({ volume: parseFloat(value) });
      } else {
        // Assume it's JSON from this or a later version of plyr
        storage = JSON.parse(value);
      }
    }
  }, {
    key: '_triggerEvent',
    value: function _triggerEvent(element, type, bubbles, properties) {
      _event2.default.customEvent(element, type, bubbles, _util2.default.extend({}, properties, {
        vplyr: this
      }));
    }
  }, {
    key: '_getDuration',
    value: function _getDuration() {
      var _playerMap$get7 = playerMap.get(this),
          config = _playerMap$get7.config,
          player = _playerMap$get7.player;

      var media = player.media;

      // It should be a number, but parse it just incase

      var duration = parseInt(config.duration),


      // True duration
      mediaDuration = 0;

      // Only if duration available
      if (media.duration !== null && !isNaN(media.duration)) {
        mediaDuration = media.duration;
      }

      // If custom duration is funky, use regular duration
      return isNaN(duration) ? mediaDuration : duration;
    }
  }, {
    key: '_seek',
    value: function _seek(input) {
      var _playerMap$get8 = playerMap.get(this),
          player = _playerMap$get8.player;

      var media = player.media;

      var targetTime = 0,
          paused = media.paused,
          duration = this._getDuration();

      if (_util2.default.is.number(input)) {
        targetTime = input;
      } else if (_util2.default.is.object(input) && _util2.default.inArray(['input', 'change'], input.type)) {
        // It's the seek slider
        // Seek to the selected time
        targetTime = input.target.value / input.target.max * duration;
      }
      if (targetTime < 0) {
        targetTime = 0;
      } else if (targetTime > duration) {
        targetTime = duration;
      }
      this._updateSeekDisplay(targetTime);
      try {
        media.currentTime = targetTime.toFixed(4);
      } catch (e) {}
      // Logging
      this._log('Seeking to ' + media.currentTime + ' seconds');
    }
  }, {
    key: '_play',
    value: function _play() {
      var _playerMap$get9 = playerMap.get(this),
          player = _playerMap$get9.player;

      var media = player.media;

      if ('play' in media) {
        media.play();
      }
    }
  }, {
    key: '_pause',
    value: function _pause() {
      var _playerMap$get10 = playerMap.get(this),
          player = _playerMap$get10.player;

      var media = player.media;

      if ('pause' in media) {
        media.pause();
      }
    }
  }, {
    key: '_togglePlay',
    value: function _togglePlay(toggle) {
      var _playerMap$get11 = playerMap.get(this),
          player = _playerMap$get11.player;

      var media = player.media;
      // True toggle

      if (!_util2.default.is.boolean(toggle)) {
        toggle = media.paused;
      }

      if (toggle) {
        this._play();
      } else {
        this._pause();
      }
      return toggle;
    }
  }, {
    key: '_getPercentage',
    value: function _getPercentage(current, max) {
      if (current === 0 || max === 0 || isNaN(current) || isNaN(max)) {
        return 0;
      }
      return (current / max * 100).toFixed(2);
    }
  }, {
    key: '_updateSeekDisplay',
    value: function _updateSeekDisplay(time) {
      // Default to 0
      if (!_util2.default.is.number(time)) {
        time = 0;
      }

      var _playerMap$get12 = playerMap.get(this),
          player = _playerMap$get12.player;

      var progress = player.progress,
          buttons = player.buttons;

      var duration = this._getDuration(),
          value = this._getPercentage(time, duration);

      // Update progress
      if (progress && progress.played) {
        progress.played.value = value;
      }

      // Update seek range input
      if (buttons && buttons.seek) {
        buttons.seek.value = value;
      }
    }
  }, {
    key: '_mediaListeners',
    value: function _mediaListeners() {
      var _playerMap$get13 = playerMap.get(this),
          player = _playerMap$get13.player;

      var media = player.media;
      // Time change on media

      _event2.default.onEvent(media, 'timeupdate seeking', this._timeUpdate.bind(this));

      _event2.default.onEvent(media, 'durationchange loadedmetadata', this._displayDuration.bind(this));

      _event2.default.onEvent(media, 'play pause ended', this._checkPlaying.bind(this));

      _event2.default.onEvent(media, 'progress playing', this._updateProgress.bind(this));

      _event2.default.onEvent(media, 'waiting canplay seeked', this._checkLoading.bind(this));

      _event2.default.onEvent(media, 'volumechange', this._updateVolume.bind(this));
    }
  }, {
    key: '_proxyListener',
    value: function _proxyListener(element, eventName, userListener, defaultListener, useCapture) {
      _event2.default.onEvent(element, eventName, function (event) {
        if (userListener) {
          userListener.apply(element, [event]);
        }
        defaultListener.apply(element, [event]);
      }, useCapture);
    }
  }, {
    key: '_controlListeners',
    value: function _controlListeners() {
      var _this2 = this;

      var _playerMap$get14 = playerMap.get(this),
          player = _playerMap$get14.player,
          config = _playerMap$get14.config,
          fullscreen = _playerMap$get14.fullscreen;

      var browser = player.browser,
          buttons = player.buttons,
          volume = player.volume,
          container = player.container,
          controls = player.controls;
      var classes = config.classes,
          listeners = config.listeners,
          hideControls = config.hideControls;

      var inputEvent = browser.isIE ? 'change' : 'input';
      var togglePlay = function togglePlay() {
        var play = _this2._togglePlay();
        var trigger = buttons[play ? 'play' : 'pause'],
            target = buttons[play ? 'pause' : 'play'];

        // Get the last play button to account for the large play button
        if (target && target.length > 1) {
          target = target[target.length - 1];
        } else {
          target = target[0];
        }
        if (target) {
          var hadTabFocus = _dom2.default.hasClass(trigger, classes.tabFocus);

          setTimeout(function () {
            target.focus();
            if (hadTabFocus) {
              _dom2.default.toggleClass(trigger, classes.tabFocus, false);
              _dom2.default.toggleClass(target, classes.tabFocus, true);
            }
          }, 100);
        }
      };
      this._proxyListener(buttons.play, 'click', listeners.play, togglePlay);
      // Pause
      this._proxyListener(buttons.pause, 'click', listeners.pause, togglePlay);
      // Seek
      this._proxyListener(buttons.seek, inputEvent, listeners.seek, this._seek.bind(this));

      this._proxyListener(volume.input, inputEvent, listeners.volume, function () {
        _this2._setVolume(volume.input.value);
      });
      this._proxyListener(buttons.mute, 'click', listeners.mute, this._toggleMute.bind(this));

      this._proxyListener(buttons.fullscreen, 'click', listeners.fullscreen, this._toggleFullscreen.bind(this));

      // Handle user exiting fullscreen by escaping etc
      if (fullscreen.supportsFullScreen) {
        _event2.default.onEvent(document, fullscreen.fullScreenEventName, this._toggleFullscreen.bind(this));
      }
      if (hideControls) {
        // Toggle controls on mouse events and entering fullscreen
        _event2.default.onEvent(container, 'mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen', this._toggleControls.bind(this));

        // Watch for cursor over controls so they don't hide when trying to interact
        _event2.default.onEvent(controls, 'mouseenter mouseleave', function (event) {
          player.controls.hover = event.type === 'mouseenter';
        });

        // Watch for cursor over controls so they don't hide when trying to interact
        _event2.default.onEvent(controls, 'mousedown mouseup touchstart touchend touchcancel', function (event) {
          player.controls.pressed = _util2.default.inArray(['mousedown', 'touchstart'], event.type);
        });
        // Focus in/out on controls
        _event2.default.onEvent(controls, 'focus blur', this._toggleControls.bind(this), true);
      }
    }
  }, {
    key: '_toggleFullscreen',
    value: function _toggleFullscreen(event) {
      // Check for native support
      var _playerMap$get15 = playerMap.get(this),
          player = _playerMap$get15.player,
          config = _playerMap$get15.config,
          fullscreen = _playerMap$get15.fullscreen;

      var container = player.container,
          buttons = player.buttons;

      var nativeSupport = fullscreen.supportsFullScreen;

      if (nativeSupport) {
        // If it's a fullscreen change event, update the UI
        if (event && event.type === fullscreen.fullScreenEventName) {
          player.isFullscreen = fullscreen.isFullScreen(container);
        } else {
          // Else it's a user request to enter or exit
          if (!fullscreen.isFullScreen(container)) {
            // Save scroll position
            this._saveScrollPosition();

            // Request full screen
            fullscreen.requestFullScreen(container);
          } else {
            // Bail from fullscreen
            fullscreen.cancelFullScreen();
          }

          // Check if we're actually full screen (it could fail)
          player.isFullscreen = fullscreen.isFullScreen(container);

          return;
        }
      } else {
        // Otherwise, it's a simple toggle
        player.isFullscreen = !player.isFullscreen;

        // Bind/unbind escape key
        document.body.style.overflow = player.isFullscreen ? 'hidden' : '';
      }

      // Set class hook
      _dom2.default.toggleClass(container, config.classes.fullscreen.active, player.isFullscreen);

      // Trap focus
      this._focusTrap(player.isFullscreen);

      // Set button state
      if (buttons && buttons.fullscreen) {
        this._toggleState(buttons.fullscreen, player.isFullscreen);
      }

      // Trigger an event
      this._triggerEvent(container, player.isFullscreen ? 'enterfullscreen' : 'exitfullscreen', true);

      // Restore scroll position
      if (!player.isFullscreen && nativeSupport) {
        this._restoreScrollPosition();
      }
    }
  }, {
    key: '_focusTrap',
    value: function _focusTrap() {
      var _playerMap$get16 = playerMap.get(this),
          player = _playerMap$get16.player,
          config = _playerMap$get16.config;

      var container = player.container;

      var _getElements = function _getElements(selector) {
        return container.querySelectorAll(selector);
      };
      var _getElement = function _getElement(selector) {
        return _getElements(selector)[0];
      };
      var tabbables = _getElements('input:not([disabled]), button:not([disabled])'),
          first = tabbables[0],
          last = tabbables[tabbables.length - 1];

      function _checkFocus(event) {
        // If it is TAB
        if (event.which === 9 && isFullscreen) {
          if (event.target === last && !event.shiftKey) {
            // Move focus to first element that can be tabbed if Shift isn't used
            event.preventDefault();
            first.focus();
          } else if (event.target === first && event.shiftKey) {
            // Move focus to last element that can be tabbed if Shift is used
            event.preventDefault();
            last.focus();
          }
        }
      }

      // Bind the handler
      _event2.default.onEvent(container, 'keydown', _checkFocus);
    }
  }, {
    key: '_saveScrollPosition',
    value: function _saveScrollPosition() {
      scroll = {
        x: window.pageXOffset || 0,
        y: window.pageYOffset || 0
      };
    }
  }, {
    key: '_restoreScrollPosition',
    value: function _restoreScrollPosition() {
      window.scrollTo(scroll.x, scroll.y);
    }
  }, {
    key: '_checkLoading',
    value: function _checkLoading(event) {
      var _this3 = this;

      var _playerMap$get17 = playerMap.get(this),
          player = _playerMap$get17.player,
          config = _playerMap$get17.config,
          timers = _playerMap$get17.timers;

      var loading = event.type === 'waiting';
      var container = player.container;
      var classes = config.classes;
      // Clear timer

      clearTimeout(timers.loading);

      // Timer to prevent flicker when seeking
      timers.loading = setTimeout(function () {
        // Toggle container class hook
        _dom2.default.toggleClass(container, classes.loading, loading);

        // Show controls if loading, hide if done
        _this3._toggleControls(loading);
      }, loading ? 250 : 0);
    }
  }, {
    key: '_checkPlaying',
    value: function _checkPlaying() {
      var _playerMap$get18 = playerMap.get(this),
          player = _playerMap$get18.player,
          config = _playerMap$get18.config;

      var media = player.media,
          container = player.container;
      var classes = config.classes;
      var paused = media.paused;

      _dom2.default.toggleClass(container, classes.playing, !paused);

      _dom2.default.toggleClass(container, classes.stopped, paused);

      this._toggleControls(paused);
    }
  }, {
    key: '_timeUpdate',
    value: function _timeUpdate(event) {
      var _playerMap$get19 = playerMap.get(this),
          player = _playerMap$get19.player,
          config = _playerMap$get19.config;

      var media = player.media;
      // Duration

      this._updateTimeDisplay(media.currentTime, player.currentTime);

      // Ignore updates while seeking
      if (event && event.type === 'timeupdate' && media.seeking) {
        return;
      }
      // Playing progress
      this._updateProgress(event);
    }
  }, {
    key: '_updateProgress',
    value: function _updateProgress(event) {
      var _this4 = this;

      var _playerMap$get20 = playerMap.get(this),
          player = _playerMap$get20.player;

      var media = player.media,
          controls = player.controls,
          progress = player.progress,
          buttons = player.buttons,
          supported = player.supported;

      if (!supported.full) {
        return;
      }

      var __progress = progress.played,
          __value = 0,
          duration = this._getDuration();
      if (event) {
        switch (event.type) {
          case 'timeupdate':
          case 'seeking':
            if (controls.pressed) {
              return;
            }

            __value = this._getPercentage(media.currentTime, duration);

            // Set seek range value only if it's a 'natural' time event
            if (event.type === 'timeupdate' && buttons.seek) {
              buttons.seek.value = __value;
            }

            break;
          // Check buffer status
          case 'playing':
          case 'progress':
            __progress = progress.buffer;
            __value = function () {
              var buffered = media.buffered;

              if (buffered && buffered.length) {
                // HTML5
                return _this4._getPercentage(buffered.end(0), duration);
              }
              return 0;
            }();
            break;
        }
      }
      this._setProgress(__progress, __value);
    }
  }, {
    key: '_setProgress',
    value: function _setProgress(progress, value) {
      var _playerMap$get21 = playerMap.get(this),
          player = _playerMap$get21.player;

      var supported = player.supported;

      if (!supported.full) {
        return;
      }

      // Default to 0
      if (_util2.default.is.undefined(value)) {
        value = 0;
      }
      // Default to buffer or bail
      if (_util2.default.is.undefined(progress)) {
        if (player.progress && player.progress.buffer) {
          progress = player.progress.buffer;
        } else {
          return;
        }
      }

      // One progress element passed
      if (_util2.default.is.htmlElement(progress)) {
        progress.value = value;
      } else if (progress) {
        // Object of progress + text element
        if (progress.bar) {
          progress.bar.value = value;
        }
        if (progress.text) {
          progress.text.innerHTML = value;
        }
      }
    }
  }, {
    key: '_setVolume',
    value: function _setVolume(volume) {
      var _playerMap$get22 = playerMap.get(this),
          player = _playerMap$get22.player,
          config = _playerMap$get22.config,
          storage = _playerMap$get22.storage;

      var media = player.media;

      var max = config.volumeMax,
          min = config.volumeMin;

      // Load volume from storage if no value specified
      if (_util2.default.is.undefined(volume)) {
        volume = storage.volume;
      }

      // Use config if all else fails
      if (volume === null || isNaN(volume)) {
        volume = config.volume;
      }

      // Maximum is volumeMax
      if (volume > max) {
        volume = max;
      }
      // Minimum is volumeMin
      if (volume < min) {
        volume = min;
      }
      // Set the player volume
      media.volume = parseFloat(volume / max);

      // Set the display
      if (player.volume.display) {
        player.volume.display.value = volume;
      }
      // Toggle muted state
      if (volume === 0) {
        media.muted = true;
      } else if (media.muted && volume > 0) {
        this._toggleMute();
      }
    }
  }, {
    key: '_updateVolume',
    value: function _updateVolume() {
      var _playerMap$get23 = playerMap.get(this),
          player = _playerMap$get23.player,
          config = _playerMap$get23.config,
          storage = _playerMap$get23.storage;

      var media = player.media,
          container = player.container,
          buttons = player.buttons,
          supported = player.supported,
          volume = player.volume;
      var muted = media.muted;
      var classes = config.classes;
      // Get the current volume

      var __volume = muted ? 0 : media.volume * config.volumeMax;

      // Update the <input type="range"> if present
      if (supported.full) {
        if (volume.input) {
          volume.input.value = __volume;
        }
        if (volume.display) {
          volume.display.value = __volume;
        }
      }

      // Update the volume in storage
      this._updateStorage({ volume: __volume });

      // Toggle class if muted
      _dom2.default.toggleClass(container, classes.muted, __volume === 0);

      // Update checkbox for mute state
      if (supported.full && buttons.mute) {
        this._toggleState(buttons.mute, volume === 0);
      }
    }
  }, {
    key: '_updateStorage',
    value: function _updateStorage(value) {
      var _playerMap$get24 = playerMap.get(this),
          storage = _playerMap$get24.storage,
          config = _playerMap$get24.config;

      // Bail if we don't have localStorage support or it's disabled


      if (!_util2.default.storageSupport || !config.storage.enabled) {
        return;
      }

      // Update the working copy of the values
      _util2.default.extend(storage, value);

      // Update storage
      window.localStorage.setItem(config.storage.key, (0, _stringify2.default)(storage));
    }
  }, {
    key: '_toggleState',
    value: function _toggleState(target, state) {
      // Bail if no target
      if (!target) {
        return;
      }
      // Get state
      state = _util2.default.is.boolean(state) ? state : !target.getAttribute('aria-pressed');

      // Set the attribute on target
      target.setAttribute('aria-pressed', state);
      return state;
    }
  }, {
    key: '_toggleMute',
    value: function _toggleMute(muted) {
      var _playerMap$get25 = playerMap.get(this),
          player = _playerMap$get25.player,
          config = _playerMap$get25.config,
          storage = _playerMap$get25.storage;

      var media = player.media;

      if (!_util2.default.is.boolean(muted)) {
        muted = !media.muted;
      }

      // Set button state
      this._toggleState(player.buttons.mute, muted);

      // Set mute on the player
      media.muted = muted;

      // If volume is 0 after unmuting, set to default
      if (media.volume === 0) {
        this._setVolume(config.volume);
      }
    }
  }, {
    key: '_displayDuration',
    value: function _displayDuration() {
      var _playerMap$get26 = playerMap.get(this),
          player = _playerMap$get26.player,
          config = _playerMap$get26.config,
          storage = _playerMap$get26.storage;

      var media = player.media,
          supported = player.supported,
          duration = player.duration,
          currentTime = player.currentTime;
      var displayDuration = config.displayDuration;

      if (!supported.full) {
        return;
      }

      // Determine duration
      var __duration = this._getDuration() || 0;

      // If there's only one time display, display duration there
      if (!duration && displayDuration && media.paused) {
        this._updateTimeDisplay(__duration, currentTime);
      }

      // If there's a duration element, update content
      if (duration) {
        this._updateTimeDisplay(__duration, duration);
      }
    }
  }, {
    key: '_updateTimeDisplay',
    value: function _updateTimeDisplay(time, element) {
      var _playerMap$get27 = playerMap.get(this),
          player = _playerMap$get27.player;

      // Bail if there's no duration display


      if (!element) {
        return;
      }

      // Fallback to 0
      if (isNaN(time)) {
        time = 0;
      }

      player.secs = parseInt(time % 60);
      player.mins = parseInt(time / 60 % 60);
      player.hours = parseInt(time / 60 / 60 % 60);

      // Do we need to display hours?
      var displayHours = parseInt(this._getDuration() / 60 / 60 % 60) > 0;

      // Ensure it's two digits. For example, 03 rather than 3.
      player.secs = ('0' + player.secs).slice(-2);
      player.mins = ('0' + player.mins).slice(-2);

      // Render
      element.innerHTML = (displayHours ? player.hours + ':' : '') + player.mins + ':' + player.secs;
    }
  }, {
    key: '_injectControls',
    value: function _injectControls() {
      var _playerMap$get28 = playerMap.get(this),
          player = _playerMap$get28.player,
          config = _playerMap$get28.config;

      var html = config.html,
          selectors = config.selectors;
      var container = player.container;
      // Insert custom video controls

      this._log('Injecting custom controls');
      // If no controls are specified, create default
      if (!html) {
        html = this._buildControls();
      }
      var random = Math.floor(Math.random() * 1000000);
      container.setAttribute('id', 'vplyr' + random);
      html = _util2.default.replaceAll(html, '{id}', random);
      var target = void 0;
      if (_util2.default.is.string(selectors.controls.container)) {
        target = document.querySelector(selectors.controls.container);
      }
      // Inject into the container by default
      if (!_util2.default.is.htmlElement(target)) {
        target = container;
      }
      target.insertAdjacentHTML('beforeend', html);
    }
  }, {
    key: '_findElements',
    value: function _findElements() {
      var _playerMap$get29 = playerMap.get(this),
          player = _playerMap$get29.player,
          config = _playerMap$get29.config;

      var container = player.container;
      var selectors = config.selectors;
      var controls = selectors.controls,
          buttons = selectors.buttons,
          progress = selectors.progress,
          volume = selectors.volume,
          duration = selectors.duration,
          currentTime = selectors.currentTime,
          seekTime = selectors.seekTime;

      var _getElements = function _getElements(selector) {
        return container.querySelectorAll(selector);
      };
      var _getElement = function _getElement(selector) {
        return _getElements(selector)[0];
      };
      try {
        player.controls = _getElement(controls.wrapper);

        // Buttons
        player.buttons = {};
        player.buttons.seek = _getElement(buttons.seek);
        player.buttons.play = _getElements(buttons.play);
        player.buttons.pause = _getElement(buttons.pause);
        player.buttons.fullscreen = _getElement(buttons.fullscreen);

        // Inputs
        player.buttons.mute = _getElement(buttons.mute);

        // Progress
        player.progress = {};
        player.progress.container = _getElement(progress.container);

        // Progress - Buffering
        player.progress.buffer = {};
        player.progress.buffer.bar = _getElement(progress.buffer);
        player.progress.buffer.text = player.progress.buffer.bar && player.progress.buffer.bar.getElementsByTagName('span')[0];

        // Progress - Played
        player.progress.played = _getElement(progress.played);

        // Volume
        player.volume = {};
        player.volume.input = _getElement(volume.input);
        player.volume.display = _getElement(volume.display);

        // Timing
        player.duration = _getElement(duration);
        player.currentTime = _getElement(currentTime);
        player.seekTime = _getElements(seekTime);

        return true;
      } catch (e) {
        this._warn('It looks like there is a problem with your controls HTML');
        // Restore native video controls
        this._toggleNativeControls(true);

        return false;
      }
    }
  }, {
    key: '_buildControls',
    value: function _buildControls() {
      var _playerMap$get30 = playerMap.get(this),
          config = _playerMap$get30.config;

      var controls = config.controls;

      var html = ['<div class="vplyr-video-loader-container">', '<div class="vplyr-video-loader">', '<div class="loader-inner one"></div>', '<div class="loader-inner two"></div>', '<div class="loader-inner three"></div>', '</div>', '</div><div class="vplyr-gradient-bottom"></div>'];
      html.push('<div class="vplyr-bottom-container">');
      if (_util2.default.inArray(controls, 'progress')) {
        html.push('<div class="vplyr-progress-bar-container">', '<input id="seek{id}" type="range" min="0" max="100" value="0" step="0.1" class="vplyr-progress-bar" data-video="seek"/>', '<progress class="vplyr-progress-played" max="100" role="presentation"></progress>', '<progress class="vplyr-progress-buffer" max="100" value="100">', '<span>100.00</span>% buffered', '</progress>', '</div>');
      }
      html.push('<div class="vplyr-controls">');
      html.push('<div class="left-controls">');
      if (_util2.default.inArray(controls, 'play')) {
        html.push('<div class="btn-controls">', '<div class="btn-wrap">', '<div class="play" data-video="play"></div>', '<div class="pause" data-video="pause"></div>', '</div>', '</div>');
      }
      if (_util2.default.inArray(controls, 'time')) {
        html.push('<div class="time-mod-controls">', '<div class="control-currenttime">00:00</div>', '<div class="control-separator">/</div>', '<div class="control-duration">00:00</div>', '</div>');
      }
      html.push('</div>'); //close vplyr left controls
      html.push('<div class="right-controls">');
      if (_util2.default.inArray(controls, 'fullscreen')) {
        html.push('<div class="fullscreen-controls" data-video="fullscreen">', '<svg class="icon-exit-fullscreen">', '<use xlink:href="#vplyr-exit-fullscreen"></use>', '</svg>', '<svg class="icon-enter-fullscreen">', ' <use xlink:href="#vplyr-enter-fullscreen"></use>', '</svg>', '</div>');
      }
      html.push('<div class="volume-controls">');
      if (_util2.default.inArray(controls, 'mute')) {
        html.push('<div class="vplyr-volume" data-video="mute">', '<svg class="icon-muted">', '<use xlink:href="#vplyr-muted"></use>', '</svg>', '<svg class="icon-volume">', '<use xlink:href="#vplyr-volume"></use>', '</svg>', '</div>');
      }
      if (_util2.default.inArray(controls, 'volume')) {
        html.push('<div class="vplyr-volume-progress">', '<input type="range" id="volume{id}"  class="vplyr-volume-input"  min="0"  max="10" data-video="volume" value="8">', '<progress class="vplyr-volume-display" max="10" role="presentation"></progress>', '</div>');
      }
      html.push('</div>'); //close vplyr volume controls

      html.push('</div>'); //close vplyr right controls

      html.push('</div>'); //close vplyr controls
      html.push('</div>'); //close
      return html.join('');
    }
  }, {
    key: '_toggleControls',
    value: function _toggleControls(toggle) {
      var _playerMap$get31 = playerMap.get(this),
          player = _playerMap$get31.player,
          config = _playerMap$get31.config,
          timers = _playerMap$get31.timers;

      var hideControls = config.hideControls,
          classes = config.classes;
      var type = player.type,
          container = player.container,
          browser = player.browser,
          controls = player.controls,
          media = player.media;
      var paused = media.paused;
      // Don't hide if config says not to, it's audio, or not ready or loading

      if (!hideControls || type === 'audio') {
        return;
      }

      var delay = 0,
          isEnterFullscreen = false,
          show = toggle,
          loading = _dom2.default.hasClass(container, classes.loading);

      // Default to false if no boolean
      if (!_util2.default.is.boolean(toggle)) {
        if (toggle && toggle.type) {
          // Is the enter fullscreen event
          isEnterFullscreen = toggle.type === 'enterfullscreen';

          // Whether to show controls
          show = _util2.default.inArray(['mousemove', 'touchstart', 'mouseenter', 'focus'], toggle.type);

          // Delay hiding on move events
          if (_util2.default.inArray(['mousemove', 'touchmove'], toggle.type)) {
            delay = 2000;
          }

          // Delay a little more for keyboard users
          if (toggle.type === 'focus') {
            delay = 3000;
          }
        } else {
          show = _dom2.default.hasClass(container, classes.hideControls);
        }
      }

      // Clear timer every movement
      window.clearTimeout(timers.hover);

      // If the mouse is not over the controls, set a timeout to hide them
      if (show || paused || loading) {
        _dom2.default.toggleClass(container, classes.hideControls, false);

        // Always show controls when paused or if touch
        if (paused || loading) {
          return;
        }

        // Delay for hiding on touch
        if (browser.isTouch) {
          delay = 3000;
        }
      }

      // If toggle is false or if we're playing (regardless of toggle),
      // then set the timer to hide the controls
      if (!show || !paused) {
        timers.hover = window.setTimeout(function () {
          // If the mouse is over the controls (and not entering fullscreen), bail
          if ((controls.pressed || controls.hover) && !isEnterFullscreen) {
            return;
          }

          _dom2.default.toggleClass(container, classes.hideControls, true);
        }, delay);
      }
    }
  }, {
    key: '_setupMedia',
    value: function _setupMedia() {
      var _playerMap$get32 = playerMap.get(this),
          original = _playerMap$get32.original,
          player = _playerMap$get32.player,
          config = _playerMap$get32.config;

      if (!player.media) {
        this._warn('No media element found!');
        return;
      }
      var autoplay = config.autoplay,
          classes = config.classes;
      var container = player.container,
          type = player.type,
          browser = player.browser,
          supported = player.supported;
      var stopped = classes.stopped,
          inIos = classes.inIos,
          inChrome = classes.inChrome,
          inTouch = classes.inTouch,
          inWechat = classes.inWechat,
          videoWrapper = classes.videoWrapper;
      var isIos = browser.isIos,
          isChrome = browser.isChrome,
          isTouch = browser.isTouch,
          isWechat = browser.isWechat;

      if (supported.full) {
        _dom2.default.toggleClass(container, classes.type.replace('{0}', type), true);
        _dom2.default.toggleClass(container, stopped, autoplay);
        // Add iOS class
        _dom2.default.toggleClass(container, inIos, isIos);
        // Add chrome class
        _dom2.default.toggleClass(container, inChrome, isChrome);
        // Add touch class
        _dom2.default.toggleClass(container, inTouch, isTouch);

        // Add wechat class
        _dom2.default.toggleClass(container, inWechat, isWechat);
        if (player.type === 'video') {
          var wrapper = document.createElement('div');
          wrapper.setAttribute('class', videoWrapper);
          this._wrap(player.media, wrapper);
          // Cache the container
          player.videoContainer = wrapper;
        }
      }
    }
  }, {
    key: '_toggleNativeControls',
    value: function _toggleNativeControls(toggle) {
      var _playerMap$get33 = playerMap.get(this),
          player = _playerMap$get33.player,
          config = _playerMap$get33.config;

      var media = player.media;

      if (toggle && _util2.default.inArray(config.types.html5, player.type)) {
        media.setAttribute('controls', '');
      } else {
        media.removeAttribute('controls');
      }
    }
  }, {
    key: '_wrap',
    value: function _wrap(elements, wrapper) {
      // Convert `elements` to an array, if necessary.
      if (!elements.length) {
        elements = [elements];
      }

      // Loops backwards to prevent having to clone the wrapper on the
      // first element (see `child` below).
      for (var i = elements.length - 1; i >= 0; i--) {
        var child = i > 0 ? wrapper.cloneNode(true) : wrapper;
        var element = elements[i];

        // Cache the current parent and sibling.
        var parent = element.parentNode;
        var sibling = element.nextSibling;

        // Wrap the element (is automatically removed from its current
        // parent).
        child.appendChild(element);

        // If the element had a sibling, insert the wrapper before
        // the sibling to maintain the HTML structure; otherwise, just
        // append it to the parent.
        if (sibling) {
          parent.insertBefore(child, sibling);
        } else {
          parent.appendChild(child);
        }
        return child;
      }
    }
  }, {
    key: '_toggleStyleHook',
    value: function _toggleStyleHook() {
      var _playerMap$get34 = playerMap.get(this),
          player = _playerMap$get34.player,
          config = _playerMap$get34.config;

      _dom2.default.toggleClass(player.container, config.selectors.container.replace('.', ''), player.supported.full);
    }
  }, {
    key: 'loadingState',
    get: function get() {
      var _playerMap$get35 = playerMap.get(this),
          player = _playerMap$get35.player,
          config = _playerMap$get35.config;

      var container = player.container;
      var classes = config.classes;

      return _dom2.default.hasClass(container, classes.loading);
    }
  }, {
    key: 'readyState',
    get: function get() {
      var _playerMap$get36 = playerMap.get(this),
          player = _playerMap$get36.player,
          config = _playerMap$get36.config;

      var container = player.container;
      var classes = config.classes;

      return _dom2.default.hasClass(container, classes.ready);
    }
  }, {
    key: 'container',
    get: function get() {
      var _playerMap$get37 = playerMap.get(this),
          player = _playerMap$get37.player;

      return player.container;
    }
  }, {
    key: 'type',
    get: function get() {
      var _playerMap$get38 = playerMap.get(this),
          player = _playerMap$get38.player;

      return player.type;
    }
  }, {
    key: 'volume',
    get: function get() {
      var _playerMap$get39 = playerMap.get(this),
          player = _playerMap$get39.player;

      return player.media.volume;
    },
    set: function set(value) {
      return this._setVolume(value);
    }
  }, {
    key: 'duration',
    get: function get() {
      return this._getDuration();
    }
  }, {
    key: 'currentTime',
    get: function get() {
      var _playerMap$get40 = playerMap.get(this),
          player = _playerMap$get40.player;

      return player.media.currentTime;
    },
    set: function set(value) {
      this.seek(value);
    }
  }, {
    key: 'fullscreen',
    get: function get() {
      var _playerMap$get41 = playerMap.get(this),
          player = _playerMap$get41.player;

      return player.isFullscreen || false;
    },
    set: function set(fullscreen) {
      if (!_util2.default.is.boolean(fullscreen)) {
        return;
      }

      var _playerMap$get42 = playerMap.get(this),
          player = _playerMap$get42.player;

      if (!player.isFullscreen && fullscreen || player.isFullscreen && !fullscreen) {
        this._toggleFullscreen();
      }
    }
  }, {
    key: 'muted',
    get: function get() {
      var _playerMap$get43 = playerMap.get(this),
          player = _playerMap$get43.player;

      return player.media.muted;
    },
    set: function set(muted) {
      this._toggleMute(muted);
    }
  }, {
    key: 'paused',
    get: function get() {
      var _playerMap$get44 = playerMap.get(this),
          player = _playerMap$get44.player;

      return player.media.paused;
    }
  }]);
  return Player;
}();

exports.default = Player;

},{"./config":96,"./dom":97,"./event":98,"./logger":100,"./util":103,"babel-runtime/core-js/json/stringify":1,"babel-runtime/core-js/weak-map":6,"babel-runtime/helpers/classCallCheck":7,"babel-runtime/helpers/createClass":8}],102:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Polyfill = function () {
    function Polyfill() {
        (0, _classCallCheck3.default)(this, Polyfill);

        this.install = this._install.bind(this);
    }

    (0, _createClass3.default)(Polyfill, [{
        key: '_install',
        value: function _install() {
            if (typeof window.CustomEvent === 'function') {
                return;
            }

            function CustomEvent(event, params) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            }

            CustomEvent.prototype = window.Event.prototype;
            window.CustomEvent = CustomEvent;
        }
    }]);
    return Polyfill;
}();

exports.default = new Polyfill();

},{"babel-runtime/helpers/classCallCheck":7,"babel-runtime/helpers/createClass":8}],103:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Utils = function () {
  function Utils() {
    (0, _classCallCheck3.default)(this, Utils);

    this.browserSniff = this._browserSniff.bind(this)();
    this.is = this._is.bind(this)();
    this.storageSupport = this._storageSupport.bind(this)();
    this.extend = this._extend.bind(this);
    this.matches = this._matches.bind(this);
    this.inArray = this._inArray.bind(this);
    this.supported = this._support.bind(this);
    this.replaceAll = this._replaceAll.bind(this);
  }

  (0, _createClass3.default)(Utils, [{
    key: '_replaceAll',
    value: function _replaceAll(string, find, replace) {
      return string.replace(new RegExp(find.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'), replace);
    }
  }, {
    key: '_support',
    value: function _support(type) {
      var browser = this._browserSniff(),
          isOldIE = browser.isIE && browser.version <= 9,
          isIos = browser.isIos,
          isIphone = browser.isIphone,
          audioSupport = !!document.createElement('audio').canPlayType,
          videoSupport = !!document.createElement('video').canPlayType;
      var basic = false,
          full = false;

      switch (type) {
        case 'video':
          basic = videoSupport;
          full = basic && !isOldIE;
          break;

        case 'audio':
          basic = audioSupport;
          full = basic && !isOldIE;
          break;

        default:
          basic = audioSupport && videoSupport;
          full = basic && !isOldIE;
      }

      return {
        basic: basic,
        full: full
      };
    }
  }, {
    key: '_inArray',
    value: function _inArray(haystack, needle) {
      return Array.prototype.indexOf && haystack.indexOf(needle) !== -1;
    }
  }, {
    key: '_matches',
    value: function _matches(element, selector) {
      var p = Element.prototype;

      var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };

      return f.call(element, selector);
    }
  }, {
    key: '_extend',
    value: function _extend() {
      // Get arguments
      var objects = arguments;

      // Bail if nothing to merge
      if (!objects.length) {
        return;
      }

      // Return first if specified but nothing to merge
      if (objects.length === 1) {
        return objects[0];
      }

      // First object is the destination
      var destination = Array.prototype.shift.call(objects),
          length = objects.length;

      // Loop through all objects to merge
      for (var i = 0; i < length; i++) {
        var source = objects[i];

        for (var property in source) {
          if (source[property] && source[property].constructor && source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            this._extend(destination[property], source[property]);
          } else {
            destination[property] = source[property];
          }
        }
      }

      return destination;
    }
    //remove an element

  }, {
    key: '_storageSupport',
    value: function _storageSupport() {
      if (!('localStorage' in window)) {
        return false;
      }

      // Try to use it (it might be disabled, e.g. user is in private/porn mode)
      // see: https://github.com/Selz/plyr/issues/131
      try {
        // Add test item
        window.localStorage.setItem('___test', 'OK');

        // Get the test item
        var result = window.localStorage.getItem('___test');

        // Clean up
        window.localStorage.removeItem('___test');

        // Check if value matches
        return result === 'OK';
      } catch (e) {
        return false;
      }

      return false;
    }
  }, {
    key: '_browserSniff',
    value: function _browserSniff() {
      var ua = navigator.userAgent,
          name = navigator.appName,
          fullVersion = '' + parseFloat(navigator.appVersion),
          majorVersion = parseInt(navigator.appVersion, 10),
          nameOffset = void 0,
          verOffset = void 0,
          ix = void 0,
          isIE = false,
          isFirefox = false,
          isChrome = false,
          isWechat = false,
          isSafari = false;

      if (navigator.appVersion.indexOf('Windows NT') !== -1 && navigator.appVersion.indexOf('rv:11') !== -1) {
        // MSIE 11
        isIE = true;
        name = 'IE';
        fullVersion = '11';
      } else if ((verOffset = ua.indexOf('MSIE')) !== -1) {
        // MSIE
        isIE = true;
        name = 'IE';
        fullVersion = ua.substring(verOffset + 5);
      } else if ((verOffset = ua.indexOf('micromessenger')) !== -1) {
        // WeChat
        isWechat = true;
        name = 'WeChat';
        fullVersion = ua.substring(verOffset + 15);
      } else if ((verOffset = ua.indexOf('Chrome')) !== -1) {
        // Chrome
        isChrome = true;
        name = 'Chrome';
        fullVersion = ua.substring(verOffset + 7);
      } else if ((verOffset = ua.indexOf('Safari')) !== -1) {
        // Safari
        isSafari = true;
        name = 'Safari';
        fullVersion = ua.substring(verOffset + 7);
        if ((verOffset = ua.indexOf('Version')) !== -1) {
          fullVersion = ua.substring(verOffset + 8);
        }
      } else if ((verOffset = ua.indexOf('Firefox')) !== -1) {
        // Firefox
        isFirefox = true;
        name = 'Firefox';
        fullVersion = ua.substring(verOffset + 8);
      } else if ((nameOffset = ua.lastIndexOf(' ') + 1) < (verOffset = ua.lastIndexOf('/'))) {
        // In most other browsers, 'name/version' is at the end of userAgent
        name = ua.substring(nameOffset, verOffset);
        fullVersion = ua.substring(verOffset + 1);

        if (name.toLowerCase() === name.toUpperCase()) {
          name = navigator.appName;
        }
      }

      // Trim the fullVersion string at semicolon/space if present
      if ((ix = fullVersion.indexOf(';')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
      }
      if ((ix = fullVersion.indexOf(' ')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
      }

      // Get major version
      majorVersion = parseInt('' + fullVersion, 10);
      if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
      }

      // Return data
      return {
        name: name,
        version: majorVersion,
        isIE: isIE,
        isFirefox: isFirefox,
        isChrome: isChrome,
        isSafari: isSafari,
        isWechat: isWechat,
        isIos: /(iPad|iPhone|iPod)/g.test(navigator.platform),
        isIphone: /(iPhone|iPod)/g.test(navigator.userAgent),
        isTouch: 'ontouchstart' in document.documentElement
      };
    }
  }, {
    key: '_is',
    value: function _is() {
      return {
        object: function object(input) {
          return input !== null && (typeof input === 'undefined' ? 'undefined' : (0, _typeof3.default)(input)) === 'object';
        },
        array: function array(input) {
          return input !== null && (typeof input === 'undefined' ? 'undefined' : (0, _typeof3.default)(input)) === 'object' && input.constructor === Array;
        },
        number: function number(input) {
          return input !== null && (typeof input === 'number' && !isNaN(input - 0) || (typeof input === 'undefined' ? 'undefined' : (0, _typeof3.default)(input)) === 'object' && input.constructor === Number);
        },
        string: function string(input) {
          return input !== null && (typeof input === 'string' || (typeof input === 'undefined' ? 'undefined' : (0, _typeof3.default)(input)) === 'object' && input.constructor === String);
        },
        boolean: function boolean(input) {
          return input !== null && typeof input === 'boolean';
        },
        nodeList: function nodeList(input) {
          return input !== null && input instanceof NodeList;
        },
        htmlElement: function htmlElement(input) {
          return input !== null && input instanceof HTMLElement;
        },
        function: function _function(input) {
          return input !== null && typeof input === 'function';
        },
        undefined: function undefined(input) {
          return input !== null && typeof input === 'undefined';
        }
      };
    }
  }]);
  return Utils;
}();

exports.default = new Utils();

},{"babel-runtime/helpers/classCallCheck":7,"babel-runtime/helpers/createClass":8,"babel-runtime/helpers/typeof":10}],104:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _util = _dereq_('./util');

var _util2 = _interopRequireDefault(_util);

var _dom = _dereq_('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _config = _dereq_('./config');

var _event = _dereq_('./event');

var _event2 = _interopRequireDefault(_event);

var _player = _dereq_('./player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vPlayer = function () {
  function vPlayer(targets, options) {
    (0, _classCallCheck3.default)(this, vPlayer);

    this.TAG = 'VideoPlayer';
    this.players = this._init(targets, options);
  }

  (0, _createClass3.default)(vPlayer, [{
    key: '_init',
    value: function _init(targets, options) {
      var _targets = this.__getTargets(targets, options);

      if (!_util2.default.supported().basic || !_targets.length) {
        return false;
      }
      var players = [],
          instances = [];
      var selector = [_config.defaultConfig.selectors.html5].join(',');
      var _add = function _add(target, media) {
        if (!_dom2.default.hasClass(media, _config.defaultConfig.classes.hook)) {
          players.push({
            target: target,
            media: media
          });
        }
      }; //end add
      for (var i = 0; i < _targets.length; i++) {
        var target = _targets[i];

        // Get children
        var children = target.querySelectorAll(selector);

        // If there's more than one media element child, wrap them
        if (children.length) {
          for (var x = 0; x < children.length; x++) {
            _add(target, children[x]);
          }
        } else if (this.__matches(target, selector)) {
          // Target is media element
          _add(target, target);
        }
      } // end for
      console.log('players--->', players);
      players.forEach(function (player) {
        var element = player.target;
        var media = player.media;
        var match = false;
        if (media === element) {
          match = true;
        }
        var data = {};
        try {
          data = JSON.parse(element.getAttribute('data-vplyr'));
        } catch (e) {}
        var config = _util2.default.extend({}, _config.defaultConfig, options, data);
        if (!config.enabled) {
          return null;
        }

        console.log(media.duration);
        var instance = new _player2.default(media, config);
        // Go to next if setup failed
        if (!_util2.default.is.object(instance)) {
          return;
        }
        if (config.debug) {
          var events = config.events.concat(['setup', 'statechange', 'enterfullscreen', 'exitfullscreen', 'captionsenabled', 'captionsdisabled']);
          _event2.default.onEvent(instance.container, events.join(' '), function (event) {
            console.log([config.logPrefix, 'event:', event.type].join(' '), event.detail.vplyr);
          });
        }
        // Callback
        _event2.default.customEvent(instance.container, 'setup', true, {
          vplyr: instance
        });

        // Add to return array even if it's already setup
        instances.push(instance);
      });
      return instances;
    }
  }, {
    key: '__matches',
    value: function __matches(element, selector) {
      var p = Element.prototype;

      var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };

      return f.call(element, selector);
    }
  }, {
    key: '__getTargets',
    value: function __getTargets(targets, options) {
      var selector = [_config.defaultConfig.selectors.html5].join(',');
      if (_util2.default.is.string(targets)) {
        // String selector passed
        targets = document.querySelectorAll(targets);
      } else if (_util2.default.is.htmlElement(targets)) {
        targets = [targets];
      } else if (!_util2.default.is.nodeList(targets) && !_util2.default.is.array(targets) && !_util2.default.is.string(targets)) {
        // No selector passed, possibly options as first argument
        // If options are the first argument
        if (_util2.default.is.undefined(options) && _util2.default.is.object(targets)) {
          options = targets;
        }
        targets = document.querySelectorAll(selector);
      }
      if (_util2.default.is.nodeList(targets)) {
        targets = Array.prototype.slice.call(targets);
      }
      return targets;
    }
  }]);
  return vPlayer;
}();

exports.default = vPlayer;

},{"./config":96,"./dom":97,"./event":98,"./player":101,"./util":103,"babel-runtime/helpers/classCallCheck":7,"babel-runtime/helpers/createClass":8}]},{},[99])(99)
});

//# sourceMappingURL=vplyr.js.map
