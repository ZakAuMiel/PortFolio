(self["webpackChunk_studiometa_wordpress_project"] = self["webpackChunk_studiometa_wordpress_project"] || []).push([["vendors"],{

/***/ "./node_modules/ansi-html-community/index.js":
/***/ ((module) => {



module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/ansi-regex/index.js":
/***/ ((module) => {



module.exports = ({onlyFirst = false} = {}) => {
	const pattern = [
		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
	].join('|');

	return new RegExp(pattern, onlyFirst ? undefined : 'g');
};


/***/ }),

/***/ "./node_modules/deepmerge/dist/cjs.js":
/***/ ((module) => {



var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var named_references_1 = __webpack_require__("./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__("./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__("./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
var encodeRegExps = {
    specialChars: /[<>'"&]/g,
    nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
};
var defaultEncodeOptions = {
    mode: 'specialChars',
    level: 'all',
    numeric: 'decimal'
};
/** Encodes all the necessary (specified by `level`) characters in the text */
function encode(text, _a) {
    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;
    if (!text) {
        return '';
    }
    var encodeRegExp = encodeRegExps[mode];
    var references = allNamedReferences[level].characters;
    var isHex = numeric === 'hexadecimal';
    encodeRegExp.lastIndex = 0;
    var _b = encodeRegExp.exec(text);
    var _c;
    if (_b) {
        _c = '';
        var _d = 0;
        do {
            if (_d !== _b.index) {
                _c += text.substring(_d, _b.index);
            }
            var _e = _b[0];
            var result_1 = references[_e];
            if (!result_1) {
                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';
            }
            _c += result_1;
            _d = _b.index + _e.length;
        } while ((_b = encodeRegExp.exec(text)));
        if (_d !== text.length) {
            _c += text.substring(_d);
        }
    }
    else {
        _c =
            text;
    }
    return _c;
}
exports.encode = encode;
var defaultDecodeOptions = {
    scope: 'body',
    level: 'all'
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
    xml: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.xml
    },
    html4: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html4
    },
    html5: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html5
    }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
    level: 'all'
};
/** Decodes a single entity */
function decodeEntity(entity, _a) {
    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;
    if (!entity) {
        return '';
    }
    var _b = entity;
    var decodeEntityLastChar_1 = entity[entity.length - 1];
    if (false) {}
    else if (false) {}
    else {
        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
        if (decodeResultByReference_1) {
            _b = decodeResultByReference_1;
        }
        else if (entity[0] === '&' && entity[1] === '#') {
            var decodeSecondChar_1 = entity[2];
            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            _b =
                decodeCode_1 >= 0x10ffff
                    ? outOfBoundsChar
                    : decodeCode_1 > 65535
                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
        }
    }
    return _b;
}
exports.decodeEntity = decodeEntity;
/** Decodes all entities in the text */
function decode(text, _a) {
    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;
    if (!text) {
        return '';
    }
    var decodeRegExp = decodeRegExps[level][scope];
    var references = allNamedReferences[level].entities;
    var isAttribute = scope === 'attribute';
    var isStrict = scope === 'strict';
    decodeRegExp.lastIndex = 0;
    var replaceMatch_1 = decodeRegExp.exec(text);
    var replaceResult_1;
    if (replaceMatch_1) {
        replaceResult_1 = '';
        var replaceLastIndex_1 = 0;
        do {
            if (replaceLastIndex_1 !== replaceMatch_1.index) {
                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
            }
            var replaceInput_1 = replaceMatch_1[0];
            var decodeResult_1 = replaceInput_1;
            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
            if (isAttribute
                && decodeEntityLastChar_2 === '=') {
                decodeResult_1 = replaceInput_1;
            }
            else if (isStrict
                && decodeEntityLastChar_2 !== ';') {
                decodeResult_1 = replaceInput_1;
            }
            else {
                var decodeResultByReference_2 = references[replaceInput_1];
                if (decodeResultByReference_2) {
                    decodeResult_1 = decodeResultByReference_2;
                }
                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {
                    var decodeSecondChar_2 = replaceInput_1[2];
                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'
                        ? parseInt(replaceInput_1.substr(3), 16)
                        : parseInt(replaceInput_1.substr(2));
                    decodeResult_1 =
                        decodeCode_2 >= 0x10ffff
                            ? outOfBoundsChar
                            : decodeCode_2 > 65535
                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                }
            }
            replaceResult_1 += decodeResult_1;
            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
        } while ((replaceMatch_1 = decodeRegExp.exec(text)));
        if (replaceLastIndex_1 !== text.length) {
            replaceResult_1 += text.substring(replaceLastIndex_1);
        }
    }
    else {
        replaceResult_1 =
            text;
    }
    return replaceResult_1;
}
exports.decode = decode;


/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":"??","&nbsp;":"??","&iexcl":"??","&iexcl;":"??","&cent":"??","&cent;":"??","&pound":"??","&pound;":"??","&curren":"??","&curren;":"??","&yen":"??","&yen;":"??","&brvbar":"??","&brvbar;":"??","&sect":"??","&sect;":"??","&uml":"??","&uml;":"??","&copy":"??","&copy;":"??","&ordf":"??","&ordf;":"??","&laquo":"??","&laquo;":"??","&not":"??","&not;":"??","&shy":"??","&shy;":"??","&reg":"??","&reg;":"??","&macr":"??","&macr;":"??","&deg":"??","&deg;":"??","&plusmn":"??","&plusmn;":"??","&sup2":"??","&sup2;":"??","&sup3":"??","&sup3;":"??","&acute":"??","&acute;":"??","&micro":"??","&micro;":"??","&para":"??","&para;":"??","&middot":"??","&middot;":"??","&cedil":"??","&cedil;":"??","&sup1":"??","&sup1;":"??","&ordm":"??","&ordm;":"??","&raquo":"??","&raquo;":"??","&frac14":"??","&frac14;":"??","&frac12":"??","&frac12;":"??","&frac34":"??","&frac34;":"??","&iquest":"??","&iquest;":"??","&Agrave":"??","&Agrave;":"??","&Aacute":"??","&Aacute;":"??","&Acirc":"??","&Acirc;":"??","&Atilde":"??","&Atilde;":"??","&Auml":"??","&Auml;":"??","&Aring":"??","&Aring;":"??","&AElig":"??","&AElig;":"??","&Ccedil":"??","&Ccedil;":"??","&Egrave":"??","&Egrave;":"??","&Eacute":"??","&Eacute;":"??","&Ecirc":"??","&Ecirc;":"??","&Euml":"??","&Euml;":"??","&Igrave":"??","&Igrave;":"??","&Iacute":"??","&Iacute;":"??","&Icirc":"??","&Icirc;":"??","&Iuml":"??","&Iuml;":"??","&ETH":"??","&ETH;":"??","&Ntilde":"??","&Ntilde;":"??","&Ograve":"??","&Ograve;":"??","&Oacute":"??","&Oacute;":"??","&Ocirc":"??","&Ocirc;":"??","&Otilde":"??","&Otilde;":"??","&Ouml":"??","&Ouml;":"??","&times":"??","&times;":"??","&Oslash":"??","&Oslash;":"??","&Ugrave":"??","&Ugrave;":"??","&Uacute":"??","&Uacute;":"??","&Ucirc":"??","&Ucirc;":"??","&Uuml":"??","&Uuml;":"??","&Yacute":"??","&Yacute;":"??","&THORN":"??","&THORN;":"??","&szlig":"??","&szlig;":"??","&agrave":"??","&agrave;":"??","&aacute":"??","&aacute;":"??","&acirc":"??","&acirc;":"??","&atilde":"??","&atilde;":"??","&auml":"??","&auml;":"??","&aring":"??","&aring;":"??","&aelig":"??","&aelig;":"??","&ccedil":"??","&ccedil;":"??","&egrave":"??","&egrave;":"??","&eacute":"??","&eacute;":"??","&ecirc":"??","&ecirc;":"??","&euml":"??","&euml;":"??","&igrave":"??","&igrave;":"??","&iacute":"??","&iacute;":"??","&icirc":"??","&icirc;":"??","&iuml":"??","&iuml;":"??","&eth":"??","&eth;":"??","&ntilde":"??","&ntilde;":"??","&ograve":"??","&ograve;":"??","&oacute":"??","&oacute;":"??","&ocirc":"??","&ocirc;":"??","&otilde":"??","&otilde;":"??","&ouml":"??","&ouml;":"??","&divide":"??","&divide;":"??","&oslash":"??","&oslash;":"??","&ugrave":"??","&ugrave;":"??","&uacute":"??","&uacute;":"??","&ucirc":"??","&ucirc;":"??","&uuml":"??","&uuml;":"??","&yacute":"??","&yacute;":"??","&thorn":"??","&thorn;":"??","&yuml":"??","&yuml;":"??","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"??","&oelig;":"??","&Scaron;":"??","&scaron;":"??","&Yuml;":"??","&circ;":"??","&tilde;":"??","&ensp;":"???","&emsp;":"???","&thinsp;":"???","&zwnj;":"???","&zwj;":"???","&lrm;":"???","&rlm;":"???","&ndash;":"???","&mdash;":"???","&lsquo;":"???","&rsquo;":"???","&sbquo;":"???","&ldquo;":"???","&rdquo;":"???","&bdquo;":"???","&dagger;":"???","&Dagger;":"???","&permil;":"???","&lsaquo;":"???","&rsaquo;":"???","&euro;":"???","&fnof;":"??","&Alpha;":"??","&Beta;":"??","&Gamma;":"??","&Delta;":"??","&Epsilon;":"??","&Zeta;":"??","&Eta;":"??","&Theta;":"??","&Iota;":"??","&Kappa;":"??","&Lambda;":"??","&Mu;":"??","&Nu;":"??","&Xi;":"??","&Omicron;":"??","&Pi;":"??","&Rho;":"??","&Sigma;":"??","&Tau;":"??","&Upsilon;":"??","&Phi;":"??","&Chi;":"??","&Psi;":"??","&Omega;":"??","&alpha;":"??","&beta;":"??","&gamma;":"??","&delta;":"??","&epsilon;":"??","&zeta;":"??","&eta;":"??","&theta;":"??","&iota;":"??","&kappa;":"??","&lambda;":"??","&mu;":"??","&nu;":"??","&xi;":"??","&omicron;":"??","&pi;":"??","&rho;":"??","&sigmaf;":"??","&sigma;":"??","&tau;":"??","&upsilon;":"??","&phi;":"??","&chi;":"??","&psi;":"??","&omega;":"??","&thetasym;":"??","&upsih;":"??","&piv;":"??","&bull;":"???","&hellip;":"???","&prime;":"???","&Prime;":"???","&oline;":"???","&frasl;":"???","&weierp;":"???","&image;":"???","&real;":"???","&trade;":"???","&alefsym;":"???","&larr;":"???","&uarr;":"???","&rarr;":"???","&darr;":"???","&harr;":"???","&crarr;":"???","&lArr;":"???","&uArr;":"???","&rArr;":"???","&dArr;":"???","&hArr;":"???","&forall;":"???","&part;":"???","&exist;":"???","&empty;":"???","&nabla;":"???","&isin;":"???","&notin;":"???","&ni;":"???","&prod;":"???","&sum;":"???","&minus;":"???","&lowast;":"???","&radic;":"???","&prop;":"???","&infin;":"???","&ang;":"???","&and;":"???","&or;":"???","&cap;":"???","&cup;":"???","&int;":"???","&there4;":"???","&sim;":"???","&cong;":"???","&asymp;":"???","&ne;":"???","&equiv;":"???","&le;":"???","&ge;":"???","&sub;":"???","&sup;":"???","&nsub;":"???","&sube;":"???","&supe;":"???","&oplus;":"???","&otimes;":"???","&perp;":"???","&sdot;":"???","&lceil;":"???","&rceil;":"???","&lfloor;":"???","&rfloor;":"???","&lang;":"???","&rang;":"???","&loz;":"???","&spades;":"???","&clubs;":"???","&hearts;":"???","&diams;":"???"},characters:{"'":"&apos;","??":"&nbsp;","??":"&iexcl;","??":"&cent;","??":"&pound;","??":"&curren;","??":"&yen;","??":"&brvbar;","??":"&sect;","??":"&uml;","??":"&copy;","??":"&ordf;","??":"&laquo;","??":"&not;","??":"&shy;","??":"&reg;","??":"&macr;","??":"&deg;","??":"&plusmn;","??":"&sup2;","??":"&sup3;","??":"&acute;","??":"&micro;","??":"&para;","??":"&middot;","??":"&cedil;","??":"&sup1;","??":"&ordm;","??":"&raquo;","??":"&frac14;","??":"&frac12;","??":"&frac34;","??":"&iquest;","??":"&Agrave;","??":"&Aacute;","??":"&Acirc;","??":"&Atilde;","??":"&Auml;","??":"&Aring;","??":"&AElig;","??":"&Ccedil;","??":"&Egrave;","??":"&Eacute;","??":"&Ecirc;","??":"&Euml;","??":"&Igrave;","??":"&Iacute;","??":"&Icirc;","??":"&Iuml;","??":"&ETH;","??":"&Ntilde;","??":"&Ograve;","??":"&Oacute;","??":"&Ocirc;","??":"&Otilde;","??":"&Ouml;","??":"&times;","??":"&Oslash;","??":"&Ugrave;","??":"&Uacute;","??":"&Ucirc;","??":"&Uuml;","??":"&Yacute;","??":"&THORN;","??":"&szlig;","??":"&agrave;","??":"&aacute;","??":"&acirc;","??":"&atilde;","??":"&auml;","??":"&aring;","??":"&aelig;","??":"&ccedil;","??":"&egrave;","??":"&eacute;","??":"&ecirc;","??":"&euml;","??":"&igrave;","??":"&iacute;","??":"&icirc;","??":"&iuml;","??":"&eth;","??":"&ntilde;","??":"&ograve;","??":"&oacute;","??":"&ocirc;","??":"&otilde;","??":"&ouml;","??":"&divide;","??":"&oslash;","??":"&ugrave;","??":"&uacute;","??":"&ucirc;","??":"&uuml;","??":"&yacute;","??":"&thorn;","??":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","??":"&OElig;","??":"&oelig;","??":"&Scaron;","??":"&scaron;","??":"&Yuml;","??":"&circ;","??":"&tilde;","???":"&ensp;","???":"&emsp;","???":"&thinsp;","???":"&zwnj;","???":"&zwj;","???":"&lrm;","???":"&rlm;","???":"&ndash;","???":"&mdash;","???":"&lsquo;","???":"&rsquo;","???":"&sbquo;","???":"&ldquo;","???":"&rdquo;","???":"&bdquo;","???":"&dagger;","???":"&Dagger;","???":"&permil;","???":"&lsaquo;","???":"&rsaquo;","???":"&euro;","??":"&fnof;","??":"&Alpha;","??":"&Beta;","??":"&Gamma;","??":"&Delta;","??":"&Epsilon;","??":"&Zeta;","??":"&Eta;","??":"&Theta;","??":"&Iota;","??":"&Kappa;","??":"&Lambda;","??":"&Mu;","??":"&Nu;","??":"&Xi;","??":"&Omicron;","??":"&Pi;","??":"&Rho;","??":"&Sigma;","??":"&Tau;","??":"&Upsilon;","??":"&Phi;","??":"&Chi;","??":"&Psi;","??":"&Omega;","??":"&alpha;","??":"&beta;","??":"&gamma;","??":"&delta;","??":"&epsilon;","??":"&zeta;","??":"&eta;","??":"&theta;","??":"&iota;","??":"&kappa;","??":"&lambda;","??":"&mu;","??":"&nu;","??":"&xi;","??":"&omicron;","??":"&pi;","??":"&rho;","??":"&sigmaf;","??":"&sigma;","??":"&tau;","??":"&upsilon;","??":"&phi;","??":"&chi;","??":"&psi;","??":"&omega;","??":"&thetasym;","??":"&upsih;","??":"&piv;","???":"&bull;","???":"&hellip;","???":"&prime;","???":"&Prime;","???":"&oline;","???":"&frasl;","???":"&weierp;","???":"&image;","???":"&real;","???":"&trade;","???":"&alefsym;","???":"&larr;","???":"&uarr;","???":"&rarr;","???":"&darr;","???":"&harr;","???":"&crarr;","???":"&lArr;","???":"&uArr;","???":"&rArr;","???":"&dArr;","???":"&hArr;","???":"&forall;","???":"&part;","???":"&exist;","???":"&empty;","???":"&nabla;","???":"&isin;","???":"&notin;","???":"&ni;","???":"&prod;","???":"&sum;","???":"&minus;","???":"&lowast;","???":"&radic;","???":"&prop;","???":"&infin;","???":"&ang;","???":"&and;","???":"&or;","???":"&cap;","???":"&cup;","???":"&int;","???":"&there4;","???":"&sim;","???":"&cong;","???":"&asymp;","???":"&ne;","???":"&equiv;","???":"&le;","???":"&ge;","???":"&sub;","???":"&sup;","???":"&nsub;","???":"&sube;","???":"&supe;","???":"&oplus;","???":"&otimes;","???":"&perp;","???":"&sdot;","???":"&lceil;","???":"&rceil;","???":"&lfloor;","???":"&rfloor;","???":"&lang;","???":"&rang;","???":"&loz;","???":"&spades;","???":"&clubs;","???":"&hearts;","???":"&diams;"}},html5:{entities:{"&AElig":"??","&AElig;":"??","&AMP":"&","&AMP;":"&","&Aacute":"??","&Aacute;":"??","&Abreve;":"??","&Acirc":"??","&Acirc;":"??","&Acy;":"??","&Afr;":"????","&Agrave":"??","&Agrave;":"??","&Alpha;":"??","&Amacr;":"??","&And;":"???","&Aogon;":"??","&Aopf;":"????","&ApplyFunction;":"???","&Aring":"??","&Aring;":"??","&Ascr;":"????","&Assign;":"???","&Atilde":"??","&Atilde;":"??","&Auml":"??","&Auml;":"??","&Backslash;":"???","&Barv;":"???","&Barwed;":"???","&Bcy;":"??","&Because;":"???","&Bernoullis;":"???","&Beta;":"??","&Bfr;":"????","&Bopf;":"????","&Breve;":"??","&Bscr;":"???","&Bumpeq;":"???","&CHcy;":"??","&COPY":"??","&COPY;":"??","&Cacute;":"??","&Cap;":"???","&CapitalDifferentialD;":"???","&Cayleys;":"???","&Ccaron;":"??","&Ccedil":"??","&Ccedil;":"??","&Ccirc;":"??","&Cconint;":"???","&Cdot;":"??","&Cedilla;":"??","&CenterDot;":"??","&Cfr;":"???","&Chi;":"??","&CircleDot;":"???","&CircleMinus;":"???","&CirclePlus;":"???","&CircleTimes;":"???","&ClockwiseContourIntegral;":"???","&CloseCurlyDoubleQuote;":"???","&CloseCurlyQuote;":"???","&Colon;":"???","&Colone;":"???","&Congruent;":"???","&Conint;":"???","&ContourIntegral;":"???","&Copf;":"???","&Coproduct;":"???","&CounterClockwiseContourIntegral;":"???","&Cross;":"???","&Cscr;":"????","&Cup;":"???","&CupCap;":"???","&DD;":"???","&DDotrahd;":"???","&DJcy;":"??","&DScy;":"??","&DZcy;":"??","&Dagger;":"???","&Darr;":"???","&Dashv;":"???","&Dcaron;":"??","&Dcy;":"??","&Del;":"???","&Delta;":"??","&Dfr;":"????","&DiacriticalAcute;":"??","&DiacriticalDot;":"??","&DiacriticalDoubleAcute;":"??","&DiacriticalGrave;":"`","&DiacriticalTilde;":"??","&Diamond;":"???","&DifferentialD;":"???","&Dopf;":"????","&Dot;":"??","&DotDot;":"???","&DotEqual;":"???","&DoubleContourIntegral;":"???","&DoubleDot;":"??","&DoubleDownArrow;":"???","&DoubleLeftArrow;":"???","&DoubleLeftRightArrow;":"???","&DoubleLeftTee;":"???","&DoubleLongLeftArrow;":"???","&DoubleLongLeftRightArrow;":"???","&DoubleLongRightArrow;":"???","&DoubleRightArrow;":"???","&DoubleRightTee;":"???","&DoubleUpArrow;":"???","&DoubleUpDownArrow;":"???","&DoubleVerticalBar;":"???","&DownArrow;":"???","&DownArrowBar;":"???","&DownArrowUpArrow;":"???","&DownBreve;":"??","&DownLeftRightVector;":"???","&DownLeftTeeVector;":"???","&DownLeftVector;":"???","&DownLeftVectorBar;":"???","&DownRightTeeVector;":"???","&DownRightVector;":"???","&DownRightVectorBar;":"???","&DownTee;":"???","&DownTeeArrow;":"???","&Downarrow;":"???","&Dscr;":"????","&Dstrok;":"??","&ENG;":"??","&ETH":"??","&ETH;":"??","&Eacute":"??","&Eacute;":"??","&Ecaron;":"??","&Ecirc":"??","&Ecirc;":"??","&Ecy;":"??","&Edot;":"??","&Efr;":"????","&Egrave":"??","&Egrave;":"??","&Element;":"???","&Emacr;":"??","&EmptySmallSquare;":"???","&EmptyVerySmallSquare;":"???","&Eogon;":"??","&Eopf;":"????","&Epsilon;":"??","&Equal;":"???","&EqualTilde;":"???","&Equilibrium;":"???","&Escr;":"???","&Esim;":"???","&Eta;":"??","&Euml":"??","&Euml;":"??","&Exists;":"???","&ExponentialE;":"???","&Fcy;":"??","&Ffr;":"????","&FilledSmallSquare;":"???","&FilledVerySmallSquare;":"???","&Fopf;":"????","&ForAll;":"???","&Fouriertrf;":"???","&Fscr;":"???","&GJcy;":"??","&GT":">","&GT;":">","&Gamma;":"??","&Gammad;":"??","&Gbreve;":"??","&Gcedil;":"??","&Gcirc;":"??","&Gcy;":"??","&Gdot;":"??","&Gfr;":"????","&Gg;":"???","&Gopf;":"????","&GreaterEqual;":"???","&GreaterEqualLess;":"???","&GreaterFullEqual;":"???","&GreaterGreater;":"???","&GreaterLess;":"???","&GreaterSlantEqual;":"???","&GreaterTilde;":"???","&Gscr;":"????","&Gt;":"???","&HARDcy;":"??","&Hacek;":"??","&Hat;":"^","&Hcirc;":"??","&Hfr;":"???","&HilbertSpace;":"???","&Hopf;":"???","&HorizontalLine;":"???","&Hscr;":"???","&Hstrok;":"??","&HumpDownHump;":"???","&HumpEqual;":"???","&IEcy;":"??","&IJlig;":"??","&IOcy;":"??","&Iacute":"??","&Iacute;":"??","&Icirc":"??","&Icirc;":"??","&Icy;":"??","&Idot;":"??","&Ifr;":"???","&Igrave":"??","&Igrave;":"??","&Im;":"???","&Imacr;":"??","&ImaginaryI;":"???","&Implies;":"???","&Int;":"???","&Integral;":"???","&Intersection;":"???","&InvisibleComma;":"???","&InvisibleTimes;":"???","&Iogon;":"??","&Iopf;":"????","&Iota;":"??","&Iscr;":"???","&Itilde;":"??","&Iukcy;":"??","&Iuml":"??","&Iuml;":"??","&Jcirc;":"??","&Jcy;":"??","&Jfr;":"????","&Jopf;":"????","&Jscr;":"????","&Jsercy;":"??","&Jukcy;":"??","&KHcy;":"??","&KJcy;":"??","&Kappa;":"??","&Kcedil;":"??","&Kcy;":"??","&Kfr;":"????","&Kopf;":"????","&Kscr;":"????","&LJcy;":"??","&LT":"<","&LT;":"<","&Lacute;":"??","&Lambda;":"??","&Lang;":"???","&Laplacetrf;":"???","&Larr;":"???","&Lcaron;":"??","&Lcedil;":"??","&Lcy;":"??","&LeftAngleBracket;":"???","&LeftArrow;":"???","&LeftArrowBar;":"???","&LeftArrowRightArrow;":"???","&LeftCeiling;":"???","&LeftDoubleBracket;":"???","&LeftDownTeeVector;":"???","&LeftDownVector;":"???","&LeftDownVectorBar;":"???","&LeftFloor;":"???","&LeftRightArrow;":"???","&LeftRightVector;":"???","&LeftTee;":"???","&LeftTeeArrow;":"???","&LeftTeeVector;":"???","&LeftTriangle;":"???","&LeftTriangleBar;":"???","&LeftTriangleEqual;":"???","&LeftUpDownVector;":"???","&LeftUpTeeVector;":"???","&LeftUpVector;":"???","&LeftUpVectorBar;":"???","&LeftVector;":"???","&LeftVectorBar;":"???","&Leftarrow;":"???","&Leftrightarrow;":"???","&LessEqualGreater;":"???","&LessFullEqual;":"???","&LessGreater;":"???","&LessLess;":"???","&LessSlantEqual;":"???","&LessTilde;":"???","&Lfr;":"????","&Ll;":"???","&Lleftarrow;":"???","&Lmidot;":"??","&LongLeftArrow;":"???","&LongLeftRightArrow;":"???","&LongRightArrow;":"???","&Longleftarrow;":"???","&Longleftrightarrow;":"???","&Longrightarrow;":"???","&Lopf;":"????","&LowerLeftArrow;":"???","&LowerRightArrow;":"???","&Lscr;":"???","&Lsh;":"???","&Lstrok;":"??","&Lt;":"???","&Map;":"???","&Mcy;":"??","&MediumSpace;":"???","&Mellintrf;":"???","&Mfr;":"????","&MinusPlus;":"???","&Mopf;":"????","&Mscr;":"???","&Mu;":"??","&NJcy;":"??","&Nacute;":"??","&Ncaron;":"??","&Ncedil;":"??","&Ncy;":"??","&NegativeMediumSpace;":"???","&NegativeThickSpace;":"???","&NegativeThinSpace;":"???","&NegativeVeryThinSpace;":"???","&NestedGreaterGreater;":"???","&NestedLessLess;":"???","&NewLine;":"\n","&Nfr;":"????","&NoBreak;":"???","&NonBreakingSpace;":"??","&Nopf;":"???","&Not;":"???","&NotCongruent;":"???","&NotCupCap;":"???","&NotDoubleVerticalBar;":"???","&NotElement;":"???","&NotEqual;":"???","&NotEqualTilde;":"?????","&NotExists;":"???","&NotGreater;":"???","&NotGreaterEqual;":"???","&NotGreaterFullEqual;":"?????","&NotGreaterGreater;":"?????","&NotGreaterLess;":"???","&NotGreaterSlantEqual;":"?????","&NotGreaterTilde;":"???","&NotHumpDownHump;":"?????","&NotHumpEqual;":"?????","&NotLeftTriangle;":"???","&NotLeftTriangleBar;":"?????","&NotLeftTriangleEqual;":"???","&NotLess;":"???","&NotLessEqual;":"???","&NotLessGreater;":"???","&NotLessLess;":"?????","&NotLessSlantEqual;":"?????","&NotLessTilde;":"???","&NotNestedGreaterGreater;":"?????","&NotNestedLessLess;":"?????","&NotPrecedes;":"???","&NotPrecedesEqual;":"?????","&NotPrecedesSlantEqual;":"???","&NotReverseElement;":"???","&NotRightTriangle;":"???","&NotRightTriangleBar;":"?????","&NotRightTriangleEqual;":"???","&NotSquareSubset;":"?????","&NotSquareSubsetEqual;":"???","&NotSquareSuperset;":"?????","&NotSquareSupersetEqual;":"???","&NotSubset;":"??????","&NotSubsetEqual;":"???","&NotSucceeds;":"???","&NotSucceedsEqual;":"?????","&NotSucceedsSlantEqual;":"???","&NotSucceedsTilde;":"?????","&NotSuperset;":"??????","&NotSupersetEqual;":"???","&NotTilde;":"???","&NotTildeEqual;":"???","&NotTildeFullEqual;":"???","&NotTildeTilde;":"???","&NotVerticalBar;":"???","&Nscr;":"????","&Ntilde":"??","&Ntilde;":"??","&Nu;":"??","&OElig;":"??","&Oacute":"??","&Oacute;":"??","&Ocirc":"??","&Ocirc;":"??","&Ocy;":"??","&Odblac;":"??","&Ofr;":"????","&Ograve":"??","&Ograve;":"??","&Omacr;":"??","&Omega;":"??","&Omicron;":"??","&Oopf;":"????","&OpenCurlyDoubleQuote;":"???","&OpenCurlyQuote;":"???","&Or;":"???","&Oscr;":"????","&Oslash":"??","&Oslash;":"??","&Otilde":"??","&Otilde;":"??","&Otimes;":"???","&Ouml":"??","&Ouml;":"??","&OverBar;":"???","&OverBrace;":"???","&OverBracket;":"???","&OverParenthesis;":"???","&PartialD;":"???","&Pcy;":"??","&Pfr;":"????","&Phi;":"??","&Pi;":"??","&PlusMinus;":"??","&Poincareplane;":"???","&Popf;":"???","&Pr;":"???","&Precedes;":"???","&PrecedesEqual;":"???","&PrecedesSlantEqual;":"???","&PrecedesTilde;":"???","&Prime;":"???","&Product;":"???","&Proportion;":"???","&Proportional;":"???","&Pscr;":"????","&Psi;":"??","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"????","&Qopf;":"???","&Qscr;":"????","&RBarr;":"???","&REG":"??","&REG;":"??","&Racute;":"??","&Rang;":"???","&Rarr;":"???","&Rarrtl;":"???","&Rcaron;":"??","&Rcedil;":"??","&Rcy;":"??","&Re;":"???","&ReverseElement;":"???","&ReverseEquilibrium;":"???","&ReverseUpEquilibrium;":"???","&Rfr;":"???","&Rho;":"??","&RightAngleBracket;":"???","&RightArrow;":"???","&RightArrowBar;":"???","&RightArrowLeftArrow;":"???","&RightCeiling;":"???","&RightDoubleBracket;":"???","&RightDownTeeVector;":"???","&RightDownVector;":"???","&RightDownVectorBar;":"???","&RightFloor;":"???","&RightTee;":"???","&RightTeeArrow;":"???","&RightTeeVector;":"???","&RightTriangle;":"???","&RightTriangleBar;":"???","&RightTriangleEqual;":"???","&RightUpDownVector;":"???","&RightUpTeeVector;":"???","&RightUpVector;":"???","&RightUpVectorBar;":"???","&RightVector;":"???","&RightVectorBar;":"???","&Rightarrow;":"???","&Ropf;":"???","&RoundImplies;":"???","&Rrightarrow;":"???","&Rscr;":"???","&Rsh;":"???","&RuleDelayed;":"???","&SHCHcy;":"??","&SHcy;":"??","&SOFTcy;":"??","&Sacute;":"??","&Sc;":"???","&Scaron;":"??","&Scedil;":"??","&Scirc;":"??","&Scy;":"??","&Sfr;":"????","&ShortDownArrow;":"???","&ShortLeftArrow;":"???","&ShortRightArrow;":"???","&ShortUpArrow;":"???","&Sigma;":"??","&SmallCircle;":"???","&Sopf;":"????","&Sqrt;":"???","&Square;":"???","&SquareIntersection;":"???","&SquareSubset;":"???","&SquareSubsetEqual;":"???","&SquareSuperset;":"???","&SquareSupersetEqual;":"???","&SquareUnion;":"???","&Sscr;":"????","&Star;":"???","&Sub;":"???","&Subset;":"???","&SubsetEqual;":"???","&Succeeds;":"???","&SucceedsEqual;":"???","&SucceedsSlantEqual;":"???","&SucceedsTilde;":"???","&SuchThat;":"???","&Sum;":"???","&Sup;":"???","&Superset;":"???","&SupersetEqual;":"???","&Supset;":"???","&THORN":"??","&THORN;":"??","&TRADE;":"???","&TSHcy;":"??","&TScy;":"??","&Tab;":"\t","&Tau;":"??","&Tcaron;":"??","&Tcedil;":"??","&Tcy;":"??","&Tfr;":"????","&Therefore;":"???","&Theta;":"??","&ThickSpace;":"??????","&ThinSpace;":"???","&Tilde;":"???","&TildeEqual;":"???","&TildeFullEqual;":"???","&TildeTilde;":"???","&Topf;":"????","&TripleDot;":"???","&Tscr;":"????","&Tstrok;":"??","&Uacute":"??","&Uacute;":"??","&Uarr;":"???","&Uarrocir;":"???","&Ubrcy;":"??","&Ubreve;":"??","&Ucirc":"??","&Ucirc;":"??","&Ucy;":"??","&Udblac;":"??","&Ufr;":"????","&Ugrave":"??","&Ugrave;":"??","&Umacr;":"??","&UnderBar;":"_","&UnderBrace;":"???","&UnderBracket;":"???","&UnderParenthesis;":"???","&Union;":"???","&UnionPlus;":"???","&Uogon;":"??","&Uopf;":"????","&UpArrow;":"???","&UpArrowBar;":"???","&UpArrowDownArrow;":"???","&UpDownArrow;":"???","&UpEquilibrium;":"???","&UpTee;":"???","&UpTeeArrow;":"???","&Uparrow;":"???","&Updownarrow;":"???","&UpperLeftArrow;":"???","&UpperRightArrow;":"???","&Upsi;":"??","&Upsilon;":"??","&Uring;":"??","&Uscr;":"????","&Utilde;":"??","&Uuml":"??","&Uuml;":"??","&VDash;":"???","&Vbar;":"???","&Vcy;":"??","&Vdash;":"???","&Vdashl;":"???","&Vee;":"???","&Verbar;":"???","&Vert;":"???","&VerticalBar;":"???","&VerticalLine;":"|","&VerticalSeparator;":"???","&VerticalTilde;":"???","&VeryThinSpace;":"???","&Vfr;":"????","&Vopf;":"????","&Vscr;":"????","&Vvdash;":"???","&Wcirc;":"??","&Wedge;":"???","&Wfr;":"????","&Wopf;":"????","&Wscr;":"????","&Xfr;":"????","&Xi;":"??","&Xopf;":"????","&Xscr;":"????","&YAcy;":"??","&YIcy;":"??","&YUcy;":"??","&Yacute":"??","&Yacute;":"??","&Ycirc;":"??","&Ycy;":"??","&Yfr;":"????","&Yopf;":"????","&Yscr;":"????","&Yuml;":"??","&ZHcy;":"??","&Zacute;":"??","&Zcaron;":"??","&Zcy;":"??","&Zdot;":"??","&ZeroWidthSpace;":"???","&Zeta;":"??","&Zfr;":"???","&Zopf;":"???","&Zscr;":"????","&aacute":"??","&aacute;":"??","&abreve;":"??","&ac;":"???","&acE;":"?????","&acd;":"???","&acirc":"??","&acirc;":"??","&acute":"??","&acute;":"??","&acy;":"??","&aelig":"??","&aelig;":"??","&af;":"???","&afr;":"????","&agrave":"??","&agrave;":"??","&alefsym;":"???","&aleph;":"???","&alpha;":"??","&amacr;":"??","&amalg;":"???","&amp":"&","&amp;":"&","&and;":"???","&andand;":"???","&andd;":"???","&andslope;":"???","&andv;":"???","&ang;":"???","&ange;":"???","&angle;":"???","&angmsd;":"???","&angmsdaa;":"???","&angmsdab;":"???","&angmsdac;":"???","&angmsdad;":"???","&angmsdae;":"???","&angmsdaf;":"???","&angmsdag;":"???","&angmsdah;":"???","&angrt;":"???","&angrtvb;":"???","&angrtvbd;":"???","&angsph;":"???","&angst;":"??","&angzarr;":"???","&aogon;":"??","&aopf;":"????","&ap;":"???","&apE;":"???","&apacir;":"???","&ape;":"???","&apid;":"???","&apos;":"'","&approx;":"???","&approxeq;":"???","&aring":"??","&aring;":"??","&ascr;":"????","&ast;":"*","&asymp;":"???","&asympeq;":"???","&atilde":"??","&atilde;":"??","&auml":"??","&auml;":"??","&awconint;":"???","&awint;":"???","&bNot;":"???","&backcong;":"???","&backepsilon;":"??","&backprime;":"???","&backsim;":"???","&backsimeq;":"???","&barvee;":"???","&barwed;":"???","&barwedge;":"???","&bbrk;":"???","&bbrktbrk;":"???","&bcong;":"???","&bcy;":"??","&bdquo;":"???","&becaus;":"???","&because;":"???","&bemptyv;":"???","&bepsi;":"??","&bernou;":"???","&beta;":"??","&beth;":"???","&between;":"???","&bfr;":"????","&bigcap;":"???","&bigcirc;":"???","&bigcup;":"???","&bigodot;":"???","&bigoplus;":"???","&bigotimes;":"???","&bigsqcup;":"???","&bigstar;":"???","&bigtriangledown;":"???","&bigtriangleup;":"???","&biguplus;":"???","&bigvee;":"???","&bigwedge;":"???","&bkarow;":"???","&blacklozenge;":"???","&blacksquare;":"???","&blacktriangle;":"???","&blacktriangledown;":"???","&blacktriangleleft;":"???","&blacktriangleright;":"???","&blank;":"???","&blk12;":"???","&blk14;":"???","&blk34;":"???","&block;":"???","&bne;":"=???","&bnequiv;":"??????","&bnot;":"???","&bopf;":"????","&bot;":"???","&bottom;":"???","&bowtie;":"???","&boxDL;":"???","&boxDR;":"???","&boxDl;":"???","&boxDr;":"???","&boxH;":"???","&boxHD;":"???","&boxHU;":"???","&boxHd;":"???","&boxHu;":"???","&boxUL;":"???","&boxUR;":"???","&boxUl;":"???","&boxUr;":"???","&boxV;":"???","&boxVH;":"???","&boxVL;":"???","&boxVR;":"???","&boxVh;":"???","&boxVl;":"???","&boxVr;":"???","&boxbox;":"???","&boxdL;":"???","&boxdR;":"???","&boxdl;":"???","&boxdr;":"???","&boxh;":"???","&boxhD;":"???","&boxhU;":"???","&boxhd;":"???","&boxhu;":"???","&boxminus;":"???","&boxplus;":"???","&boxtimes;":"???","&boxuL;":"???","&boxuR;":"???","&boxul;":"???","&boxur;":"???","&boxv;":"???","&boxvH;":"???","&boxvL;":"???","&boxvR;":"???","&boxvh;":"???","&boxvl;":"???","&boxvr;":"???","&bprime;":"???","&breve;":"??","&brvbar":"??","&brvbar;":"??","&bscr;":"????","&bsemi;":"???","&bsim;":"???","&bsime;":"???","&bsol;":"\\","&bsolb;":"???","&bsolhsub;":"???","&bull;":"???","&bullet;":"???","&bump;":"???","&bumpE;":"???","&bumpe;":"???","&bumpeq;":"???","&cacute;":"??","&cap;":"???","&capand;":"???","&capbrcup;":"???","&capcap;":"???","&capcup;":"???","&capdot;":"???","&caps;":"??????","&caret;":"???","&caron;":"??","&ccaps;":"???","&ccaron;":"??","&ccedil":"??","&ccedil;":"??","&ccirc;":"??","&ccups;":"???","&ccupssm;":"???","&cdot;":"??","&cedil":"??","&cedil;":"??","&cemptyv;":"???","&cent":"??","&cent;":"??","&centerdot;":"??","&cfr;":"????","&chcy;":"??","&check;":"???","&checkmark;":"???","&chi;":"??","&cir;":"???","&cirE;":"???","&circ;":"??","&circeq;":"???","&circlearrowleft;":"???","&circlearrowright;":"???","&circledR;":"??","&circledS;":"???","&circledast;":"???","&circledcirc;":"???","&circleddash;":"???","&cire;":"???","&cirfnint;":"???","&cirmid;":"???","&cirscir;":"???","&clubs;":"???","&clubsuit;":"???","&colon;":":","&colone;":"???","&coloneq;":"???","&comma;":",","&commat;":"@","&comp;":"???","&compfn;":"???","&complement;":"???","&complexes;":"???","&cong;":"???","&congdot;":"???","&conint;":"???","&copf;":"????","&coprod;":"???","&copy":"??","&copy;":"??","&copysr;":"???","&crarr;":"???","&cross;":"???","&cscr;":"????","&csub;":"???","&csube;":"???","&csup;":"???","&csupe;":"???","&ctdot;":"???","&cudarrl;":"???","&cudarrr;":"???","&cuepr;":"???","&cuesc;":"???","&cularr;":"???","&cularrp;":"???","&cup;":"???","&cupbrcap;":"???","&cupcap;":"???","&cupcup;":"???","&cupdot;":"???","&cupor;":"???","&cups;":"??????","&curarr;":"???","&curarrm;":"???","&curlyeqprec;":"???","&curlyeqsucc;":"???","&curlyvee;":"???","&curlywedge;":"???","&curren":"??","&curren;":"??","&curvearrowleft;":"???","&curvearrowright;":"???","&cuvee;":"???","&cuwed;":"???","&cwconint;":"???","&cwint;":"???","&cylcty;":"???","&dArr;":"???","&dHar;":"???","&dagger;":"???","&daleth;":"???","&darr;":"???","&dash;":"???","&dashv;":"???","&dbkarow;":"???","&dblac;":"??","&dcaron;":"??","&dcy;":"??","&dd;":"???","&ddagger;":"???","&ddarr;":"???","&ddotseq;":"???","&deg":"??","&deg;":"??","&delta;":"??","&demptyv;":"???","&dfisht;":"???","&dfr;":"????","&dharl;":"???","&dharr;":"???","&diam;":"???","&diamond;":"???","&diamondsuit;":"???","&diams;":"???","&die;":"??","&digamma;":"??","&disin;":"???","&div;":"??","&divide":"??","&divide;":"??","&divideontimes;":"???","&divonx;":"???","&djcy;":"??","&dlcorn;":"???","&dlcrop;":"???","&dollar;":"$","&dopf;":"????","&dot;":"??","&doteq;":"???","&doteqdot;":"???","&dotminus;":"???","&dotplus;":"???","&dotsquare;":"???","&doublebarwedge;":"???","&downarrow;":"???","&downdownarrows;":"???","&downharpoonleft;":"???","&downharpoonright;":"???","&drbkarow;":"???","&drcorn;":"???","&drcrop;":"???","&dscr;":"????","&dscy;":"??","&dsol;":"???","&dstrok;":"??","&dtdot;":"???","&dtri;":"???","&dtrif;":"???","&duarr;":"???","&duhar;":"???","&dwangle;":"???","&dzcy;":"??","&dzigrarr;":"???","&eDDot;":"???","&eDot;":"???","&eacute":"??","&eacute;":"??","&easter;":"???","&ecaron;":"??","&ecir;":"???","&ecirc":"??","&ecirc;":"??","&ecolon;":"???","&ecy;":"??","&edot;":"??","&ee;":"???","&efDot;":"???","&efr;":"????","&eg;":"???","&egrave":"??","&egrave;":"??","&egs;":"???","&egsdot;":"???","&el;":"???","&elinters;":"???","&ell;":"???","&els;":"???","&elsdot;":"???","&emacr;":"??","&empty;":"???","&emptyset;":"???","&emptyv;":"???","&emsp13;":"???","&emsp14;":"???","&emsp;":"???","&eng;":"??","&ensp;":"???","&eogon;":"??","&eopf;":"????","&epar;":"???","&eparsl;":"???","&eplus;":"???","&epsi;":"??","&epsilon;":"??","&epsiv;":"??","&eqcirc;":"???","&eqcolon;":"???","&eqsim;":"???","&eqslantgtr;":"???","&eqslantless;":"???","&equals;":"=","&equest;":"???","&equiv;":"???","&equivDD;":"???","&eqvparsl;":"???","&erDot;":"???","&erarr;":"???","&escr;":"???","&esdot;":"???","&esim;":"???","&eta;":"??","&eth":"??","&eth;":"??","&euml":"??","&euml;":"??","&euro;":"???","&excl;":"!","&exist;":"???","&expectation;":"???","&exponentiale;":"???","&fallingdotseq;":"???","&fcy;":"??","&female;":"???","&ffilig;":"???","&fflig;":"???","&ffllig;":"???","&ffr;":"????","&filig;":"???","&fjlig;":"fj","&flat;":"???","&fllig;":"???","&fltns;":"???","&fnof;":"??","&fopf;":"????","&forall;":"???","&fork;":"???","&forkv;":"???","&fpartint;":"???","&frac12":"??","&frac12;":"??","&frac13;":"???","&frac14":"??","&frac14;":"??","&frac15;":"???","&frac16;":"???","&frac18;":"???","&frac23;":"???","&frac25;":"???","&frac34":"??","&frac34;":"??","&frac35;":"???","&frac38;":"???","&frac45;":"???","&frac56;":"???","&frac58;":"???","&frac78;":"???","&frasl;":"???","&frown;":"???","&fscr;":"????","&gE;":"???","&gEl;":"???","&gacute;":"??","&gamma;":"??","&gammad;":"??","&gap;":"???","&gbreve;":"??","&gcirc;":"??","&gcy;":"??","&gdot;":"??","&ge;":"???","&gel;":"???","&geq;":"???","&geqq;":"???","&geqslant;":"???","&ges;":"???","&gescc;":"???","&gesdot;":"???","&gesdoto;":"???","&gesdotol;":"???","&gesl;":"??????","&gesles;":"???","&gfr;":"????","&gg;":"???","&ggg;":"???","&gimel;":"???","&gjcy;":"??","&gl;":"???","&glE;":"???","&gla;":"???","&glj;":"???","&gnE;":"???","&gnap;":"???","&gnapprox;":"???","&gne;":"???","&gneq;":"???","&gneqq;":"???","&gnsim;":"???","&gopf;":"????","&grave;":"`","&gscr;":"???","&gsim;":"???","&gsime;":"???","&gsiml;":"???","&gt":">","&gt;":">","&gtcc;":"???","&gtcir;":"???","&gtdot;":"???","&gtlPar;":"???","&gtquest;":"???","&gtrapprox;":"???","&gtrarr;":"???","&gtrdot;":"???","&gtreqless;":"???","&gtreqqless;":"???","&gtrless;":"???","&gtrsim;":"???","&gvertneqq;":"??????","&gvnE;":"??????","&hArr;":"???","&hairsp;":"???","&half;":"??","&hamilt;":"???","&hardcy;":"??","&harr;":"???","&harrcir;":"???","&harrw;":"???","&hbar;":"???","&hcirc;":"??","&hearts;":"???","&heartsuit;":"???","&hellip;":"???","&hercon;":"???","&hfr;":"????","&hksearow;":"???","&hkswarow;":"???","&hoarr;":"???","&homtht;":"???","&hookleftarrow;":"???","&hookrightarrow;":"???","&hopf;":"????","&horbar;":"???","&hscr;":"????","&hslash;":"???","&hstrok;":"??","&hybull;":"???","&hyphen;":"???","&iacute":"??","&iacute;":"??","&ic;":"???","&icirc":"??","&icirc;":"??","&icy;":"??","&iecy;":"??","&iexcl":"??","&iexcl;":"??","&iff;":"???","&ifr;":"????","&igrave":"??","&igrave;":"??","&ii;":"???","&iiiint;":"???","&iiint;":"???","&iinfin;":"???","&iiota;":"???","&ijlig;":"??","&imacr;":"??","&image;":"???","&imagline;":"???","&imagpart;":"???","&imath;":"??","&imof;":"???","&imped;":"??","&in;":"???","&incare;":"???","&infin;":"???","&infintie;":"???","&inodot;":"??","&int;":"???","&intcal;":"???","&integers;":"???","&intercal;":"???","&intlarhk;":"???","&intprod;":"???","&iocy;":"??","&iogon;":"??","&iopf;":"????","&iota;":"??","&iprod;":"???","&iquest":"??","&iquest;":"??","&iscr;":"????","&isin;":"???","&isinE;":"???","&isindot;":"???","&isins;":"???","&isinsv;":"???","&isinv;":"???","&it;":"???","&itilde;":"??","&iukcy;":"??","&iuml":"??","&iuml;":"??","&jcirc;":"??","&jcy;":"??","&jfr;":"????","&jmath;":"??","&jopf;":"????","&jscr;":"????","&jsercy;":"??","&jukcy;":"??","&kappa;":"??","&kappav;":"??","&kcedil;":"??","&kcy;":"??","&kfr;":"????","&kgreen;":"??","&khcy;":"??","&kjcy;":"??","&kopf;":"????","&kscr;":"????","&lAarr;":"???","&lArr;":"???","&lAtail;":"???","&lBarr;":"???","&lE;":"???","&lEg;":"???","&lHar;":"???","&lacute;":"??","&laemptyv;":"???","&lagran;":"???","&lambda;":"??","&lang;":"???","&langd;":"???","&langle;":"???","&lap;":"???","&laquo":"??","&laquo;":"??","&larr;":"???","&larrb;":"???","&larrbfs;":"???","&larrfs;":"???","&larrhk;":"???","&larrlp;":"???","&larrpl;":"???","&larrsim;":"???","&larrtl;":"???","&lat;":"???","&latail;":"???","&late;":"???","&lates;":"??????","&lbarr;":"???","&lbbrk;":"???","&lbrace;":"{","&lbrack;":"[","&lbrke;":"???","&lbrksld;":"???","&lbrkslu;":"???","&lcaron;":"??","&lcedil;":"??","&lceil;":"???","&lcub;":"{","&lcy;":"??","&ldca;":"???","&ldquo;":"???","&ldquor;":"???","&ldrdhar;":"???","&ldrushar;":"???","&ldsh;":"???","&le;":"???","&leftarrow;":"???","&leftarrowtail;":"???","&leftharpoondown;":"???","&leftharpoonup;":"???","&leftleftarrows;":"???","&leftrightarrow;":"???","&leftrightarrows;":"???","&leftrightharpoons;":"???","&leftrightsquigarrow;":"???","&leftthreetimes;":"???","&leg;":"???","&leq;":"???","&leqq;":"???","&leqslant;":"???","&les;":"???","&lescc;":"???","&lesdot;":"???","&lesdoto;":"???","&lesdotor;":"???","&lesg;":"??????","&lesges;":"???","&lessapprox;":"???","&lessdot;":"???","&lesseqgtr;":"???","&lesseqqgtr;":"???","&lessgtr;":"???","&lesssim;":"???","&lfisht;":"???","&lfloor;":"???","&lfr;":"????","&lg;":"???","&lgE;":"???","&lhard;":"???","&lharu;":"???","&lharul;":"???","&lhblk;":"???","&ljcy;":"??","&ll;":"???","&llarr;":"???","&llcorner;":"???","&llhard;":"???","&lltri;":"???","&lmidot;":"??","&lmoust;":"???","&lmoustache;":"???","&lnE;":"???","&lnap;":"???","&lnapprox;":"???","&lne;":"???","&lneq;":"???","&lneqq;":"???","&lnsim;":"???","&loang;":"???","&loarr;":"???","&lobrk;":"???","&longleftarrow;":"???","&longleftrightarrow;":"???","&longmapsto;":"???","&longrightarrow;":"???","&looparrowleft;":"???","&looparrowright;":"???","&lopar;":"???","&lopf;":"????","&loplus;":"???","&lotimes;":"???","&lowast;":"???","&lowbar;":"_","&loz;":"???","&lozenge;":"???","&lozf;":"???","&lpar;":"(","&lparlt;":"???","&lrarr;":"???","&lrcorner;":"???","&lrhar;":"???","&lrhard;":"???","&lrm;":"???","&lrtri;":"???","&lsaquo;":"???","&lscr;":"????","&lsh;":"???","&lsim;":"???","&lsime;":"???","&lsimg;":"???","&lsqb;":"[","&lsquo;":"???","&lsquor;":"???","&lstrok;":"??","&lt":"<","&lt;":"<","&ltcc;":"???","&ltcir;":"???","&ltdot;":"???","&lthree;":"???","&ltimes;":"???","&ltlarr;":"???","&ltquest;":"???","&ltrPar;":"???","&ltri;":"???","&ltrie;":"???","&ltrif;":"???","&lurdshar;":"???","&luruhar;":"???","&lvertneqq;":"??????","&lvnE;":"??????","&mDDot;":"???","&macr":"??","&macr;":"??","&male;":"???","&malt;":"???","&maltese;":"???","&map;":"???","&mapsto;":"???","&mapstodown;":"???","&mapstoleft;":"???","&mapstoup;":"???","&marker;":"???","&mcomma;":"???","&mcy;":"??","&mdash;":"???","&measuredangle;":"???","&mfr;":"????","&mho;":"???","&micro":"??","&micro;":"??","&mid;":"???","&midast;":"*","&midcir;":"???","&middot":"??","&middot;":"??","&minus;":"???","&minusb;":"???","&minusd;":"???","&minusdu;":"???","&mlcp;":"???","&mldr;":"???","&mnplus;":"???","&models;":"???","&mopf;":"????","&mp;":"???","&mscr;":"????","&mstpos;":"???","&mu;":"??","&multimap;":"???","&mumap;":"???","&nGg;":"?????","&nGt;":"??????","&nGtv;":"?????","&nLeftarrow;":"???","&nLeftrightarrow;":"???","&nLl;":"?????","&nLt;":"??????","&nLtv;":"?????","&nRightarrow;":"???","&nVDash;":"???","&nVdash;":"???","&nabla;":"???","&nacute;":"??","&nang;":"??????","&nap;":"???","&napE;":"?????","&napid;":"?????","&napos;":"??","&napprox;":"???","&natur;":"???","&natural;":"???","&naturals;":"???","&nbsp":"??","&nbsp;":"??","&nbump;":"?????","&nbumpe;":"?????","&ncap;":"???","&ncaron;":"??","&ncedil;":"??","&ncong;":"???","&ncongdot;":"?????","&ncup;":"???","&ncy;":"??","&ndash;":"???","&ne;":"???","&neArr;":"???","&nearhk;":"???","&nearr;":"???","&nearrow;":"???","&nedot;":"?????","&nequiv;":"???","&nesear;":"???","&nesim;":"?????","&nexist;":"???","&nexists;":"???","&nfr;":"????","&ngE;":"?????","&nge;":"???","&ngeq;":"???","&ngeqq;":"?????","&ngeqslant;":"?????","&nges;":"?????","&ngsim;":"???","&ngt;":"???","&ngtr;":"???","&nhArr;":"???","&nharr;":"???","&nhpar;":"???","&ni;":"???","&nis;":"???","&nisd;":"???","&niv;":"???","&njcy;":"??","&nlArr;":"???","&nlE;":"?????","&nlarr;":"???","&nldr;":"???","&nle;":"???","&nleftarrow;":"???","&nleftrightarrow;":"???","&nleq;":"???","&nleqq;":"?????","&nleqslant;":"?????","&nles;":"?????","&nless;":"???","&nlsim;":"???","&nlt;":"???","&nltri;":"???","&nltrie;":"???","&nmid;":"???","&nopf;":"????","&not":"??","&not;":"??","&notin;":"???","&notinE;":"?????","&notindot;":"?????","&notinva;":"???","&notinvb;":"???","&notinvc;":"???","&notni;":"???","&notniva;":"???","&notnivb;":"???","&notnivc;":"???","&npar;":"???","&nparallel;":"???","&nparsl;":"??????","&npart;":"?????","&npolint;":"???","&npr;":"???","&nprcue;":"???","&npre;":"?????","&nprec;":"???","&npreceq;":"?????","&nrArr;":"???","&nrarr;":"???","&nrarrc;":"?????","&nrarrw;":"?????","&nrightarrow;":"???","&nrtri;":"???","&nrtrie;":"???","&nsc;":"???","&nsccue;":"???","&nsce;":"?????","&nscr;":"????","&nshortmid;":"???","&nshortparallel;":"???","&nsim;":"???","&nsime;":"???","&nsimeq;":"???","&nsmid;":"???","&nspar;":"???","&nsqsube;":"???","&nsqsupe;":"???","&nsub;":"???","&nsubE;":"?????","&nsube;":"???","&nsubset;":"??????","&nsubseteq;":"???","&nsubseteqq;":"?????","&nsucc;":"???","&nsucceq;":"?????","&nsup;":"???","&nsupE;":"?????","&nsupe;":"???","&nsupset;":"??????","&nsupseteq;":"???","&nsupseteqq;":"?????","&ntgl;":"???","&ntilde":"??","&ntilde;":"??","&ntlg;":"???","&ntriangleleft;":"???","&ntrianglelefteq;":"???","&ntriangleright;":"???","&ntrianglerighteq;":"???","&nu;":"??","&num;":"#","&numero;":"???","&numsp;":"???","&nvDash;":"???","&nvHarr;":"???","&nvap;":"??????","&nvdash;":"???","&nvge;":"??????","&nvgt;":">???","&nvinfin;":"???","&nvlArr;":"???","&nvle;":"??????","&nvlt;":"<???","&nvltrie;":"??????","&nvrArr;":"???","&nvrtrie;":"??????","&nvsim;":"??????","&nwArr;":"???","&nwarhk;":"???","&nwarr;":"???","&nwarrow;":"???","&nwnear;":"???","&oS;":"???","&oacute":"??","&oacute;":"??","&oast;":"???","&ocir;":"???","&ocirc":"??","&ocirc;":"??","&ocy;":"??","&odash;":"???","&odblac;":"??","&odiv;":"???","&odot;":"???","&odsold;":"???","&oelig;":"??","&ofcir;":"???","&ofr;":"????","&ogon;":"??","&ograve":"??","&ograve;":"??","&ogt;":"???","&ohbar;":"???","&ohm;":"??","&oint;":"???","&olarr;":"???","&olcir;":"???","&olcross;":"???","&oline;":"???","&olt;":"???","&omacr;":"??","&omega;":"??","&omicron;":"??","&omid;":"???","&ominus;":"???","&oopf;":"????","&opar;":"???","&operp;":"???","&oplus;":"???","&or;":"???","&orarr;":"???","&ord;":"???","&order;":"???","&orderof;":"???","&ordf":"??","&ordf;":"??","&ordm":"??","&ordm;":"??","&origof;":"???","&oror;":"???","&orslope;":"???","&orv;":"???","&oscr;":"???","&oslash":"??","&oslash;":"??","&osol;":"???","&otilde":"??","&otilde;":"??","&otimes;":"???","&otimesas;":"???","&ouml":"??","&ouml;":"??","&ovbar;":"???","&par;":"???","&para":"??","&para;":"??","&parallel;":"???","&parsim;":"???","&parsl;":"???","&part;":"???","&pcy;":"??","&percnt;":"%","&period;":".","&permil;":"???","&perp;":"???","&pertenk;":"???","&pfr;":"????","&phi;":"??","&phiv;":"??","&phmmat;":"???","&phone;":"???","&pi;":"??","&pitchfork;":"???","&piv;":"??","&planck;":"???","&planckh;":"???","&plankv;":"???","&plus;":"+","&plusacir;":"???","&plusb;":"???","&pluscir;":"???","&plusdo;":"???","&plusdu;":"???","&pluse;":"???","&plusmn":"??","&plusmn;":"??","&plussim;":"???","&plustwo;":"???","&pm;":"??","&pointint;":"???","&popf;":"????","&pound":"??","&pound;":"??","&pr;":"???","&prE;":"???","&prap;":"???","&prcue;":"???","&pre;":"???","&prec;":"???","&precapprox;":"???","&preccurlyeq;":"???","&preceq;":"???","&precnapprox;":"???","&precneqq;":"???","&precnsim;":"???","&precsim;":"???","&prime;":"???","&primes;":"???","&prnE;":"???","&prnap;":"???","&prnsim;":"???","&prod;":"???","&profalar;":"???","&profline;":"???","&profsurf;":"???","&prop;":"???","&propto;":"???","&prsim;":"???","&prurel;":"???","&pscr;":"????","&psi;":"??","&puncsp;":"???","&qfr;":"????","&qint;":"???","&qopf;":"????","&qprime;":"???","&qscr;":"????","&quaternions;":"???","&quatint;":"???","&quest;":"?","&questeq;":"???","&quot":'"',"&quot;":'"',"&rAarr;":"???","&rArr;":"???","&rAtail;":"???","&rBarr;":"???","&rHar;":"???","&race;":"?????","&racute;":"??","&radic;":"???","&raemptyv;":"???","&rang;":"???","&rangd;":"???","&range;":"???","&rangle;":"???","&raquo":"??","&raquo;":"??","&rarr;":"???","&rarrap;":"???","&rarrb;":"???","&rarrbfs;":"???","&rarrc;":"???","&rarrfs;":"???","&rarrhk;":"???","&rarrlp;":"???","&rarrpl;":"???","&rarrsim;":"???","&rarrtl;":"???","&rarrw;":"???","&ratail;":"???","&ratio;":"???","&rationals;":"???","&rbarr;":"???","&rbbrk;":"???","&rbrace;":"}","&rbrack;":"]","&rbrke;":"???","&rbrksld;":"???","&rbrkslu;":"???","&rcaron;":"??","&rcedil;":"??","&rceil;":"???","&rcub;":"}","&rcy;":"??","&rdca;":"???","&rdldhar;":"???","&rdquo;":"???","&rdquor;":"???","&rdsh;":"???","&real;":"???","&realine;":"???","&realpart;":"???","&reals;":"???","&rect;":"???","&reg":"??","&reg;":"??","&rfisht;":"???","&rfloor;":"???","&rfr;":"????","&rhard;":"???","&rharu;":"???","&rharul;":"???","&rho;":"??","&rhov;":"??","&rightarrow;":"???","&rightarrowtail;":"???","&rightharpoondown;":"???","&rightharpoonup;":"???","&rightleftarrows;":"???","&rightleftharpoons;":"???","&rightrightarrows;":"???","&rightsquigarrow;":"???","&rightthreetimes;":"???","&ring;":"??","&risingdotseq;":"???","&rlarr;":"???","&rlhar;":"???","&rlm;":"???","&rmoust;":"???","&rmoustache;":"???","&rnmid;":"???","&roang;":"???","&roarr;":"???","&robrk;":"???","&ropar;":"???","&ropf;":"????","&roplus;":"???","&rotimes;":"???","&rpar;":")","&rpargt;":"???","&rppolint;":"???","&rrarr;":"???","&rsaquo;":"???","&rscr;":"????","&rsh;":"???","&rsqb;":"]","&rsquo;":"???","&rsquor;":"???","&rthree;":"???","&rtimes;":"???","&rtri;":"???","&rtrie;":"???","&rtrif;":"???","&rtriltri;":"???","&ruluhar;":"???","&rx;":"???","&sacute;":"??","&sbquo;":"???","&sc;":"???","&scE;":"???","&scap;":"???","&scaron;":"??","&sccue;":"???","&sce;":"???","&scedil;":"??","&scirc;":"??","&scnE;":"???","&scnap;":"???","&scnsim;":"???","&scpolint;":"???","&scsim;":"???","&scy;":"??","&sdot;":"???","&sdotb;":"???","&sdote;":"???","&seArr;":"???","&searhk;":"???","&searr;":"???","&searrow;":"???","&sect":"??","&sect;":"??","&semi;":";","&seswar;":"???","&setminus;":"???","&setmn;":"???","&sext;":"???","&sfr;":"????","&sfrown;":"???","&sharp;":"???","&shchcy;":"??","&shcy;":"??","&shortmid;":"???","&shortparallel;":"???","&shy":"??","&shy;":"??","&sigma;":"??","&sigmaf;":"??","&sigmav;":"??","&sim;":"???","&simdot;":"???","&sime;":"???","&simeq;":"???","&simg;":"???","&simgE;":"???","&siml;":"???","&simlE;":"???","&simne;":"???","&simplus;":"???","&simrarr;":"???","&slarr;":"???","&smallsetminus;":"???","&smashp;":"???","&smeparsl;":"???","&smid;":"???","&smile;":"???","&smt;":"???","&smte;":"???","&smtes;":"??????","&softcy;":"??","&sol;":"/","&solb;":"???","&solbar;":"???","&sopf;":"????","&spades;":"???","&spadesuit;":"???","&spar;":"???","&sqcap;":"???","&sqcaps;":"??????","&sqcup;":"???","&sqcups;":"??????","&sqsub;":"???","&sqsube;":"???","&sqsubset;":"???","&sqsubseteq;":"???","&sqsup;":"???","&sqsupe;":"???","&sqsupset;":"???","&sqsupseteq;":"???","&squ;":"???","&square;":"???","&squarf;":"???","&squf;":"???","&srarr;":"???","&sscr;":"????","&ssetmn;":"???","&ssmile;":"???","&sstarf;":"???","&star;":"???","&starf;":"???","&straightepsilon;":"??","&straightphi;":"??","&strns;":"??","&sub;":"???","&subE;":"???","&subdot;":"???","&sube;":"???","&subedot;":"???","&submult;":"???","&subnE;":"???","&subne;":"???","&subplus;":"???","&subrarr;":"???","&subset;":"???","&subseteq;":"???","&subseteqq;":"???","&subsetneq;":"???","&subsetneqq;":"???","&subsim;":"???","&subsub;":"???","&subsup;":"???","&succ;":"???","&succapprox;":"???","&succcurlyeq;":"???","&succeq;":"???","&succnapprox;":"???","&succneqq;":"???","&succnsim;":"???","&succsim;":"???","&sum;":"???","&sung;":"???","&sup1":"??","&sup1;":"??","&sup2":"??","&sup2;":"??","&sup3":"??","&sup3;":"??","&sup;":"???","&supE;":"???","&supdot;":"???","&supdsub;":"???","&supe;":"???","&supedot;":"???","&suphsol;":"???","&suphsub;":"???","&suplarr;":"???","&supmult;":"???","&supnE;":"???","&supne;":"???","&supplus;":"???","&supset;":"???","&supseteq;":"???","&supseteqq;":"???","&supsetneq;":"???","&supsetneqq;":"???","&supsim;":"???","&supsub;":"???","&supsup;":"???","&swArr;":"???","&swarhk;":"???","&swarr;":"???","&swarrow;":"???","&swnwar;":"???","&szlig":"??","&szlig;":"??","&target;":"???","&tau;":"??","&tbrk;":"???","&tcaron;":"??","&tcedil;":"??","&tcy;":"??","&tdot;":"???","&telrec;":"???","&tfr;":"????","&there4;":"???","&therefore;":"???","&theta;":"??","&thetasym;":"??","&thetav;":"??","&thickapprox;":"???","&thicksim;":"???","&thinsp;":"???","&thkap;":"???","&thksim;":"???","&thorn":"??","&thorn;":"??","&tilde;":"??","&times":"??","&times;":"??","&timesb;":"???","&timesbar;":"???","&timesd;":"???","&tint;":"???","&toea;":"???","&top;":"???","&topbot;":"???","&topcir;":"???","&topf;":"????","&topfork;":"???","&tosa;":"???","&tprime;":"???","&trade;":"???","&triangle;":"???","&triangledown;":"???","&triangleleft;":"???","&trianglelefteq;":"???","&triangleq;":"???","&triangleright;":"???","&trianglerighteq;":"???","&tridot;":"???","&trie;":"???","&triminus;":"???","&triplus;":"???","&trisb;":"???","&tritime;":"???","&trpezium;":"???","&tscr;":"????","&tscy;":"??","&tshcy;":"??","&tstrok;":"??","&twixt;":"???","&twoheadleftarrow;":"???","&twoheadrightarrow;":"???","&uArr;":"???","&uHar;":"???","&uacute":"??","&uacute;":"??","&uarr;":"???","&ubrcy;":"??","&ubreve;":"??","&ucirc":"??","&ucirc;":"??","&ucy;":"??","&udarr;":"???","&udblac;":"??","&udhar;":"???","&ufisht;":"???","&ufr;":"????","&ugrave":"??","&ugrave;":"??","&uharl;":"???","&uharr;":"???","&uhblk;":"???","&ulcorn;":"???","&ulcorner;":"???","&ulcrop;":"???","&ultri;":"???","&umacr;":"??","&uml":"??","&uml;":"??","&uogon;":"??","&uopf;":"????","&uparrow;":"???","&updownarrow;":"???","&upharpoonleft;":"???","&upharpoonright;":"???","&uplus;":"???","&upsi;":"??","&upsih;":"??","&upsilon;":"??","&upuparrows;":"???","&urcorn;":"???","&urcorner;":"???","&urcrop;":"???","&uring;":"??","&urtri;":"???","&uscr;":"????","&utdot;":"???","&utilde;":"??","&utri;":"???","&utrif;":"???","&uuarr;":"???","&uuml":"??","&uuml;":"??","&uwangle;":"???","&vArr;":"???","&vBar;":"???","&vBarv;":"???","&vDash;":"???","&vangrt;":"???","&varepsilon;":"??","&varkappa;":"??","&varnothing;":"???","&varphi;":"??","&varpi;":"??","&varpropto;":"???","&varr;":"???","&varrho;":"??","&varsigma;":"??","&varsubsetneq;":"??????","&varsubsetneqq;":"??????","&varsupsetneq;":"??????","&varsupsetneqq;":"??????","&vartheta;":"??","&vartriangleleft;":"???","&vartriangleright;":"???","&vcy;":"??","&vdash;":"???","&vee;":"???","&veebar;":"???","&veeeq;":"???","&vellip;":"???","&verbar;":"|","&vert;":"|","&vfr;":"????","&vltri;":"???","&vnsub;":"??????","&vnsup;":"??????","&vopf;":"????","&vprop;":"???","&vrtri;":"???","&vscr;":"????","&vsubnE;":"??????","&vsubne;":"??????","&vsupnE;":"??????","&vsupne;":"??????","&vzigzag;":"???","&wcirc;":"??","&wedbar;":"???","&wedge;":"???","&wedgeq;":"???","&weierp;":"???","&wfr;":"????","&wopf;":"????","&wp;":"???","&wr;":"???","&wreath;":"???","&wscr;":"????","&xcap;":"???","&xcirc;":"???","&xcup;":"???","&xdtri;":"???","&xfr;":"????","&xhArr;":"???","&xharr;":"???","&xi;":"??","&xlArr;":"???","&xlarr;":"???","&xmap;":"???","&xnis;":"???","&xodot;":"???","&xopf;":"????","&xoplus;":"???","&xotime;":"???","&xrArr;":"???","&xrarr;":"???","&xscr;":"????","&xsqcup;":"???","&xuplus;":"???","&xutri;":"???","&xvee;":"???","&xwedge;":"???","&yacute":"??","&yacute;":"??","&yacy;":"??","&ycirc;":"??","&ycy;":"??","&yen":"??","&yen;":"??","&yfr;":"????","&yicy;":"??","&yopf;":"????","&yscr;":"????","&yucy;":"??","&yuml":"??","&yuml;":"??","&zacute;":"??","&zcaron;":"??","&zcy;":"??","&zdot;":"??","&zeetrf;":"???","&zeta;":"??","&zfr;":"????","&zhcy;":"??","&zigrarr;":"???","&zopf;":"????","&zscr;":"????","&zwj;":"???","&zwnj;":"???"},characters:{"??":"&AElig;","&":"&amp;","??":"&Aacute;","??":"&Abreve;","??":"&Acirc;","??":"&Acy;","????":"&Afr;","??":"&Agrave;","??":"&Alpha;","??":"&Amacr;","???":"&And;","??":"&Aogon;","????":"&Aopf;","???":"&af;","??":"&angst;","????":"&Ascr;","???":"&coloneq;","??":"&Atilde;","??":"&Auml;","???":"&ssetmn;","???":"&Barv;","???":"&doublebarwedge;","??":"&Bcy;","???":"&because;","???":"&bernou;","??":"&Beta;","????":"&Bfr;","????":"&Bopf;","??":"&breve;","???":"&bump;","??":"&CHcy;","??":"&copy;","??":"&Cacute;","???":"&Cap;","???":"&DD;","???":"&Cfr;","??":"&Ccaron;","??":"&Ccedil;","??":"&Ccirc;","???":"&Cconint;","??":"&Cdot;","??":"&cedil;","??":"&middot;","??":"&Chi;","???":"&odot;","???":"&ominus;","???":"&oplus;","???":"&otimes;","???":"&cwconint;","???":"&rdquor;","???":"&rsquor;","???":"&Proportion;","???":"&Colone;","???":"&equiv;","???":"&DoubleContourIntegral;","???":"&oint;","???":"&complexes;","???":"&coprod;","???":"&awconint;","???":"&Cross;","????":"&Cscr;","???":"&Cup;","???":"&asympeq;","???":"&DDotrahd;","??":"&DJcy;","??":"&DScy;","??":"&DZcy;","???":"&ddagger;","???":"&Darr;","???":"&DoubleLeftTee;","??":"&Dcaron;","??":"&Dcy;","???":"&nabla;","??":"&Delta;","????":"&Dfr;","??":"&acute;","??":"&dot;","??":"&dblac;","`":"&grave;","??":"&tilde;","???":"&diamond;","???":"&dd;","????":"&Dopf;","??":"&uml;","???":"&DotDot;","???":"&esdot;","???":"&dArr;","???":"&lArr;","???":"&iff;","???":"&xlArr;","???":"&xhArr;","???":"&xrArr;","???":"&rArr;","???":"&vDash;","???":"&uArr;","???":"&vArr;","???":"&spar;","???":"&downarrow;","???":"&DownArrowBar;","???":"&duarr;","??":"&DownBreve;","???":"&DownLeftRightVector;","???":"&DownLeftTeeVector;","???":"&lhard;","???":"&DownLeftVectorBar;","???":"&DownRightTeeVector;","???":"&rightharpoondown;","???":"&DownRightVectorBar;","???":"&top;","???":"&mapstodown;","????":"&Dscr;","??":"&Dstrok;","??":"&ENG;","??":"&ETH;","??":"&Eacute;","??":"&Ecaron;","??":"&Ecirc;","??":"&Ecy;","??":"&Edot;","????":"&Efr;","??":"&Egrave;","???":"&isinv;","??":"&Emacr;","???":"&EmptySmallSquare;","???":"&EmptyVerySmallSquare;","??":"&Eogon;","????":"&Eopf;","??":"&Epsilon;","???":"&Equal;","???":"&esim;","???":"&rlhar;","???":"&expectation;","???":"&Esim;","??":"&Eta;","??":"&Euml;","???":"&exist;","???":"&exponentiale;","??":"&Fcy;","????":"&Ffr;","???":"&FilledSmallSquare;","???":"&squf;","????":"&Fopf;","???":"&forall;","???":"&Fscr;","??":"&GJcy;",">":"&gt;","??":"&Gamma;","??":"&Gammad;","??":"&Gbreve;","??":"&Gcedil;","??":"&Gcirc;","??":"&Gcy;","??":"&Gdot;","????":"&Gfr;","???":"&ggg;","????":"&Gopf;","???":"&geq;","???":"&gtreqless;","???":"&geqq;","???":"&GreaterGreater;","???":"&gtrless;","???":"&ges;","???":"&gtrsim;","????":"&Gscr;","???":"&gg;","??":"&HARDcy;","??":"&caron;","^":"&Hat;","??":"&Hcirc;","???":"&Poincareplane;","???":"&hamilt;","???":"&quaternions;","???":"&boxh;","??":"&Hstrok;","???":"&bumpeq;","??":"&IEcy;","??":"&IJlig;","??":"&IOcy;","??":"&Iacute;","??":"&Icirc;","??":"&Icy;","??":"&Idot;","???":"&imagpart;","??":"&Igrave;","??":"&Imacr;","???":"&ii;","???":"&Int;","???":"&int;","???":"&xcap;","???":"&ic;","???":"&it;","??":"&Iogon;","????":"&Iopf;","??":"&Iota;","???":"&imagline;","??":"&Itilde;","??":"&Iukcy;","??":"&Iuml;","??":"&Jcirc;","??":"&Jcy;","????":"&Jfr;","????":"&Jopf;","????":"&Jscr;","??":"&Jsercy;","??":"&Jukcy;","??":"&KHcy;","??":"&KJcy;","??":"&Kappa;","??":"&Kcedil;","??":"&Kcy;","????":"&Kfr;","????":"&Kopf;","????":"&Kscr;","??":"&LJcy;","<":"&lt;","??":"&Lacute;","??":"&Lambda;","???":"&Lang;","???":"&lagran;","???":"&twoheadleftarrow;","??":"&Lcaron;","??":"&Lcedil;","??":"&Lcy;","???":"&langle;","???":"&slarr;","???":"&larrb;","???":"&lrarr;","???":"&lceil;","???":"&lobrk;","???":"&LeftDownTeeVector;","???":"&downharpoonleft;","???":"&LeftDownVectorBar;","???":"&lfloor;","???":"&leftrightarrow;","???":"&LeftRightVector;","???":"&dashv;","???":"&mapstoleft;","???":"&LeftTeeVector;","???":"&vltri;","???":"&LeftTriangleBar;","???":"&trianglelefteq;","???":"&LeftUpDownVector;","???":"&LeftUpTeeVector;","???":"&upharpoonleft;","???":"&LeftUpVectorBar;","???":"&lharu;","???":"&LeftVectorBar;","???":"&lesseqgtr;","???":"&leqq;","???":"&lg;","???":"&LessLess;","???":"&les;","???":"&lsim;","????":"&Lfr;","???":"&Ll;","???":"&lAarr;","??":"&Lmidot;","???":"&xlarr;","???":"&xharr;","???":"&xrarr;","????":"&Lopf;","???":"&swarrow;","???":"&searrow;","???":"&lsh;","??":"&Lstrok;","???":"&ll;","???":"&Map;","??":"&Mcy;","???":"&MediumSpace;","???":"&phmmat;","????":"&Mfr;","???":"&mp;","????":"&Mopf;","??":"&Mu;","??":"&NJcy;","??":"&Nacute;","??":"&Ncaron;","??":"&Ncedil;","??":"&Ncy;","???":"&ZeroWidthSpace;","\n":"&NewLine;","????":"&Nfr;","???":"&NoBreak;","??":"&nbsp;","???":"&naturals;","???":"&Not;","???":"&nequiv;","???":"&NotCupCap;","???":"&nspar;","???":"&notinva;","???":"&ne;","?????":"&nesim;","???":"&nexists;","???":"&ngtr;","???":"&ngeq;","?????":"&ngeqq;","?????":"&nGtv;","???":"&ntgl;","?????":"&nges;","???":"&ngsim;","?????":"&nbump;","?????":"&nbumpe;","???":"&ntriangleleft;","?????":"&NotLeftTriangleBar;","???":"&ntrianglelefteq;","???":"&nlt;","???":"&nleq;","???":"&ntlg;","?????":"&nLtv;","?????":"&nles;","???":"&nlsim;","?????":"&NotNestedGreaterGreater;","?????":"&NotNestedLessLess;","???":"&nprec;","?????":"&npreceq;","???":"&nprcue;","???":"&notniva;","???":"&ntriangleright;","?????":"&NotRightTriangleBar;","???":"&ntrianglerighteq;","?????":"&NotSquareSubset;","???":"&nsqsube;","?????":"&NotSquareSuperset;","???":"&nsqsupe;","??????":"&vnsub;","???":"&nsubseteq;","???":"&nsucc;","?????":"&nsucceq;","???":"&nsccue;","?????":"&NotSucceedsTilde;","??????":"&vnsup;","???":"&nsupseteq;","???":"&nsim;","???":"&nsimeq;","???":"&ncong;","???":"&napprox;","???":"&nsmid;","????":"&Nscr;","??":"&Ntilde;","??":"&Nu;","??":"&OElig;","??":"&Oacute;","??":"&Ocirc;","??":"&Ocy;","??":"&Odblac;","????":"&Ofr;","??":"&Ograve;","??":"&Omacr;","??":"&ohm;","??":"&Omicron;","????":"&Oopf;","???":"&ldquo;","???":"&lsquo;","???":"&Or;","????":"&Oscr;","??":"&Oslash;","??":"&Otilde;","???":"&Otimes;","??":"&Ouml;","???":"&oline;","???":"&OverBrace;","???":"&tbrk;","???":"&OverParenthesis;","???":"&part;","??":"&Pcy;","????":"&Pfr;","??":"&Phi;","??":"&Pi;","??":"&pm;","???":"&primes;","???":"&Pr;","???":"&prec;","???":"&preceq;","???":"&preccurlyeq;","???":"&prsim;","???":"&Prime;","???":"&prod;","???":"&vprop;","????":"&Pscr;","??":"&Psi;",'"':"&quot;","????":"&Qfr;","???":"&rationals;","????":"&Qscr;","???":"&drbkarow;","??":"&reg;","??":"&Racute;","???":"&Rang;","???":"&twoheadrightarrow;","???":"&Rarrtl;","??":"&Rcaron;","??":"&Rcedil;","??":"&Rcy;","???":"&realpart;","???":"&niv;","???":"&lrhar;","???":"&duhar;","??":"&Rho;","???":"&rangle;","???":"&srarr;","???":"&rarrb;","???":"&rlarr;","???":"&rceil;","???":"&robrk;","???":"&RightDownTeeVector;","???":"&downharpoonright;","???":"&RightDownVectorBar;","???":"&rfloor;","???":"&vdash;","???":"&mapsto;","???":"&RightTeeVector;","???":"&vrtri;","???":"&RightTriangleBar;","???":"&trianglerighteq;","???":"&RightUpDownVector;","???":"&RightUpTeeVector;","???":"&upharpoonright;","???":"&RightUpVectorBar;","???":"&rightharpoonup;","???":"&RightVectorBar;","???":"&reals;","???":"&RoundImplies;","???":"&rAarr;","???":"&realine;","???":"&rsh;","???":"&RuleDelayed;","??":"&SHCHcy;","??":"&SHcy;","??":"&SOFTcy;","??":"&Sacute;","???":"&Sc;","??":"&Scaron;","??":"&Scedil;","??":"&Scirc;","??":"&Scy;","????":"&Sfr;","???":"&uparrow;","??":"&Sigma;","???":"&compfn;","????":"&Sopf;","???":"&radic;","???":"&square;","???":"&sqcap;","???":"&sqsubset;","???":"&sqsubseteq;","???":"&sqsupset;","???":"&sqsupseteq;","???":"&sqcup;","????":"&Sscr;","???":"&sstarf;","???":"&Subset;","???":"&subseteq;","???":"&succ;","???":"&succeq;","???":"&succcurlyeq;","???":"&succsim;","???":"&sum;","???":"&Supset;","???":"&supset;","???":"&supseteq;","??":"&THORN;","???":"&trade;","??":"&TSHcy;","??":"&TScy;","\t":"&Tab;","??":"&Tau;","??":"&Tcaron;","??":"&Tcedil;","??":"&Tcy;","????":"&Tfr;","???":"&therefore;","??":"&Theta;","??????":"&ThickSpace;","???":"&thinsp;","???":"&thksim;","???":"&simeq;","???":"&cong;","???":"&thkap;","????":"&Topf;","???":"&tdot;","????":"&Tscr;","??":"&Tstrok;","??":"&Uacute;","???":"&Uarr;","???":"&Uarrocir;","??":"&Ubrcy;","??":"&Ubreve;","??":"&Ucirc;","??":"&Ucy;","??":"&Udblac;","????":"&Ufr;","??":"&Ugrave;","??":"&Umacr;",_:"&lowbar;","???":"&UnderBrace;","???":"&bbrk;","???":"&UnderParenthesis;","???":"&xcup;","???":"&uplus;","??":"&Uogon;","????":"&Uopf;","???":"&UpArrowBar;","???":"&udarr;","???":"&varr;","???":"&udhar;","???":"&perp;","???":"&mapstoup;","???":"&nwarrow;","???":"&nearrow;","??":"&upsih;","??":"&Upsilon;","??":"&Uring;","????":"&Uscr;","??":"&Utilde;","??":"&Uuml;","???":"&VDash;","???":"&Vbar;","??":"&Vcy;","???":"&Vdash;","???":"&Vdashl;","???":"&xvee;","???":"&Vert;","???":"&smid;","|":"&vert;","???":"&VerticalSeparator;","???":"&wreath;","???":"&hairsp;","????":"&Vfr;","????":"&Vopf;","????":"&Vscr;","???":"&Vvdash;","??":"&Wcirc;","???":"&xwedge;","????":"&Wfr;","????":"&Wopf;","????":"&Wscr;","????":"&Xfr;","??":"&Xi;","????":"&Xopf;","????":"&Xscr;","??":"&YAcy;","??":"&YIcy;","??":"&YUcy;","??":"&Yacute;","??":"&Ycirc;","??":"&Ycy;","????":"&Yfr;","????":"&Yopf;","????":"&Yscr;","??":"&Yuml;","??":"&ZHcy;","??":"&Zacute;","??":"&Zcaron;","??":"&Zcy;","??":"&Zdot;","??":"&Zeta;","???":"&zeetrf;","???":"&integers;","????":"&Zscr;","??":"&aacute;","??":"&abreve;","???":"&mstpos;","?????":"&acE;","???":"&acd;","??":"&acirc;","??":"&acy;","??":"&aelig;","????":"&afr;","??":"&agrave;","???":"&aleph;","??":"&alpha;","??":"&amacr;","???":"&amalg;","???":"&wedge;","???":"&andand;","???":"&andd;","???":"&andslope;","???":"&andv;","???":"&angle;","???":"&ange;","???":"&measuredangle;","???":"&angmsdaa;","???":"&angmsdab;","???":"&angmsdac;","???":"&angmsdad;","???":"&angmsdae;","???":"&angmsdaf;","???":"&angmsdag;","???":"&angmsdah;","???":"&angrt;","???":"&angrtvb;","???":"&angrtvbd;","???":"&angsph;","???":"&angzarr;","??":"&aogon;","????":"&aopf;","???":"&apE;","???":"&apacir;","???":"&approxeq;","???":"&apid;","'":"&apos;","??":"&aring;","????":"&ascr;","*":"&midast;","??":"&atilde;","??":"&auml;","???":"&awint;","???":"&bNot;","???":"&bcong;","??":"&bepsi;","???":"&bprime;","???":"&bsim;","???":"&bsime;","???":"&barvee;","???":"&barwedge;","???":"&bbrktbrk;","??":"&bcy;","???":"&ldquor;","???":"&bemptyv;","??":"&beta;","???":"&beth;","???":"&twixt;","????":"&bfr;","???":"&xcirc;","???":"&xodot;","???":"&xoplus;","???":"&xotime;","???":"&xsqcup;","???":"&starf;","???":"&xdtri;","???":"&xutri;","???":"&xuplus;","???":"&rbarr;","???":"&lozf;","???":"&utrif;","???":"&dtrif;","???":"&ltrif;","???":"&rtrif;","???":"&blank;","???":"&blk12;","???":"&blk14;","???":"&blk34;","???":"&block;","=???":"&bne;","??????":"&bnequiv;","???":"&bnot;","????":"&bopf;","???":"&bowtie;","???":"&boxDL;","???":"&boxDR;","???":"&boxDl;","???":"&boxDr;","???":"&boxH;","???":"&boxHD;","???":"&boxHU;","???":"&boxHd;","???":"&boxHu;","???":"&boxUL;","???":"&boxUR;","???":"&boxUl;","???":"&boxUr;","???":"&boxV;","???":"&boxVH;","???":"&boxVL;","???":"&boxVR;","???":"&boxVh;","???":"&boxVl;","???":"&boxVr;","???":"&boxbox;","???":"&boxdL;","???":"&boxdR;","???":"&boxdl;","???":"&boxdr;","???":"&boxhD;","???":"&boxhU;","???":"&boxhd;","???":"&boxhu;","???":"&minusb;","???":"&plusb;","???":"&timesb;","???":"&boxuL;","???":"&boxuR;","???":"&boxul;","???":"&boxur;","???":"&boxv;","???":"&boxvH;","???":"&boxvL;","???":"&boxvR;","???":"&boxvh;","???":"&boxvl;","???":"&boxvr;","??":"&brvbar;","????":"&bscr;","???":"&bsemi;","\\":"&bsol;","???":"&bsolb;","???":"&bsolhsub;","???":"&bullet;","???":"&bumpE;","??":"&cacute;","???":"&cap;","???":"&capand;","???":"&capbrcup;","???":"&capcap;","???":"&capcup;","???":"&capdot;","??????":"&caps;","???":"&caret;","???":"&ccaps;","??":"&ccaron;","??":"&ccedil;","??":"&ccirc;","???":"&ccups;","???":"&ccupssm;","??":"&cdot;","???":"&cemptyv;","??":"&cent;","????":"&cfr;","??":"&chcy;","???":"&checkmark;","??":"&chi;","???":"&cir;","???":"&cirE;","??":"&circ;","???":"&cire;","???":"&olarr;","???":"&orarr;","???":"&oS;","???":"&oast;","???":"&ocir;","???":"&odash;","???":"&cirfnint;","???":"&cirmid;","???":"&cirscir;","???":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","???":"&complement;","???":"&congdot;","????":"&copf;","???":"&copysr;","???":"&crarr;","???":"&cross;","????":"&cscr;","???":"&csub;","???":"&csube;","???":"&csup;","???":"&csupe;","???":"&ctdot;","???":"&cudarrl;","???":"&cudarrr;","???":"&curlyeqprec;","???":"&curlyeqsucc;","???":"&curvearrowleft;","???":"&cularrp;","???":"&cup;","???":"&cupbrcap;","???":"&cupcap;","???":"&cupcup;","???":"&cupdot;","???":"&cupor;","??????":"&cups;","???":"&curvearrowright;","???":"&curarrm;","???":"&cuvee;","???":"&cuwed;","??":"&curren;","???":"&cwint;","???":"&cylcty;","???":"&dHar;","???":"&dagger;","???":"&daleth;","???":"&hyphen;","???":"&rBarr;","??":"&dcaron;","??":"&dcy;","???":"&downdownarrows;","???":"&eDDot;","??":"&deg;","??":"&delta;","???":"&demptyv;","???":"&dfisht;","????":"&dfr;","???":"&diams;","??":"&gammad;","???":"&disin;","??":"&divide;","???":"&divonx;","??":"&djcy;","???":"&llcorner;","???":"&dlcrop;",$:"&dollar;","????":"&dopf;","???":"&eDot;","???":"&minusd;","???":"&plusdo;","???":"&sdotb;","???":"&lrcorner;","???":"&drcrop;","????":"&dscr;","??":"&dscy;","???":"&dsol;","??":"&dstrok;","???":"&dtdot;","???":"&triangledown;","???":"&dwangle;","??":"&dzcy;","???":"&dzigrarr;","??":"&eacute;","???":"&easter;","??":"&ecaron;","???":"&eqcirc;","??":"&ecirc;","???":"&eqcolon;","??":"&ecy;","??":"&edot;","???":"&fallingdotseq;","????":"&efr;","???":"&eg;","??":"&egrave;","???":"&eqslantgtr;","???":"&egsdot;","???":"&el;","???":"&elinters;","???":"&ell;","???":"&eqslantless;","???":"&elsdot;","??":"&emacr;","???":"&varnothing;","???":"&emsp13;","???":"&emsp14;","???":"&emsp;","??":"&eng;","???":"&ensp;","??":"&eogon;","????":"&eopf;","???":"&epar;","???":"&eparsl;","???":"&eplus;","??":"&epsilon;","??":"&varepsilon;","=":"&equals;","???":"&questeq;","???":"&equivDD;","???":"&eqvparsl;","???":"&risingdotseq;","???":"&erarr;","???":"&escr;","??":"&eta;","??":"&eth;","??":"&euml;","???":"&euro;","!":"&excl;","??":"&fcy;","???":"&female;","???":"&ffilig;","???":"&fflig;","???":"&ffllig;","????":"&ffr;","???":"&filig;",fj:"&fjlig;","???":"&flat;","???":"&fllig;","???":"&fltns;","??":"&fnof;","????":"&fopf;","???":"&pitchfork;","???":"&forkv;","???":"&fpartint;","??":"&half;","???":"&frac13;","??":"&frac14;","???":"&frac15;","???":"&frac16;","???":"&frac18;","???":"&frac23;","???":"&frac25;","??":"&frac34;","???":"&frac35;","???":"&frac38;","???":"&frac45;","???":"&frac56;","???":"&frac58;","???":"&frac78;","???":"&frasl;","???":"&sfrown;","????":"&fscr;","???":"&gtreqqless;","??":"&gacute;","??":"&gamma;","???":"&gtrapprox;","??":"&gbreve;","??":"&gcirc;","??":"&gcy;","??":"&gdot;","???":"&gescc;","???":"&gesdot;","???":"&gesdoto;","???":"&gesdotol;","??????":"&gesl;","???":"&gesles;","????":"&gfr;","???":"&gimel;","??":"&gjcy;","???":"&glE;","???":"&gla;","???":"&glj;","???":"&gneqq;","???":"&gnapprox;","???":"&gneq;","???":"&gnsim;","????":"&gopf;","???":"&gscr;","???":"&gsime;","???":"&gsiml;","???":"&gtcc;","???":"&gtcir;","???":"&gtrdot;","???":"&gtlPar;","???":"&gtquest;","???":"&gtrarr;","??????":"&gvnE;","??":"&hardcy;","???":"&harrcir;","???":"&leftrightsquigarrow;","???":"&plankv;","??":"&hcirc;","???":"&heartsuit;","???":"&mldr;","???":"&hercon;","????":"&hfr;","???":"&searhk;","???":"&swarhk;","???":"&hoarr;","???":"&homtht;","???":"&larrhk;","???":"&rarrhk;","????":"&hopf;","???":"&horbar;","????":"&hscr;","??":"&hstrok;","???":"&hybull;","??":"&iacute;","??":"&icirc;","??":"&icy;","??":"&iecy;","??":"&iexcl;","????":"&ifr;","??":"&igrave;","???":"&qint;","???":"&tint;","???":"&iinfin;","???":"&iiota;","??":"&ijlig;","??":"&imacr;","??":"&inodot;","???":"&imof;","??":"&imped;","???":"&incare;","???":"&infin;","???":"&infintie;","???":"&intercal;","???":"&intlarhk;","???":"&iprod;","??":"&iocy;","??":"&iogon;","????":"&iopf;","??":"&iota;","??":"&iquest;","????":"&iscr;","???":"&isinE;","???":"&isindot;","???":"&isins;","???":"&isinsv;","??":"&itilde;","??":"&iukcy;","??":"&iuml;","??":"&jcirc;","??":"&jcy;","????":"&jfr;","??":"&jmath;","????":"&jopf;","????":"&jscr;","??":"&jsercy;","??":"&jukcy;","??":"&kappa;","??":"&varkappa;","??":"&kcedil;","??":"&kcy;","????":"&kfr;","??":"&kgreen;","??":"&khcy;","??":"&kjcy;","????":"&kopf;","????":"&kscr;","???":"&lAtail;","???":"&lBarr;","???":"&lesseqqgtr;","???":"&lHar;","??":"&lacute;","???":"&laemptyv;","??":"&lambda;","???":"&langd;","???":"&lessapprox;","??":"&laquo;","???":"&larrbfs;","???":"&larrfs;","???":"&looparrowleft;","???":"&larrpl;","???":"&larrsim;","???":"&leftarrowtail;","???":"&lat;","???":"&latail;","???":"&late;","??????":"&lates;","???":"&lbarr;","???":"&lbbrk;","{":"&lcub;","[":"&lsqb;","???":"&lbrke;","???":"&lbrksld;","???":"&lbrkslu;","??":"&lcaron;","??":"&lcedil;","??":"&lcy;","???":"&ldca;","???":"&ldrdhar;","???":"&ldrushar;","???":"&ldsh;","???":"&leq;","???":"&llarr;","???":"&lthree;","???":"&lescc;","???":"&lesdot;","???":"&lesdoto;","???":"&lesdotor;","??????":"&lesg;","???":"&lesges;","???":"&ltdot;","???":"&lfisht;","????":"&lfr;","???":"&lgE;","???":"&lharul;","???":"&lhblk;","??":"&ljcy;","???":"&llhard;","???":"&lltri;","??":"&lmidot;","???":"&lmoustache;","???":"&lneqq;","???":"&lnapprox;","???":"&lneq;","???":"&lnsim;","???":"&loang;","???":"&loarr;","???":"&xmap;","???":"&rarrlp;","???":"&lopar;","????":"&lopf;","???":"&loplus;","???":"&lotimes;","???":"&lowast;","???":"&lozenge;","(":"&lpar;","???":"&lparlt;","???":"&lrhard;","???":"&lrm;","???":"&lrtri;","???":"&lsaquo;","????":"&lscr;","???":"&lsime;","???":"&lsimg;","???":"&sbquo;","??":"&lstrok;","???":"&ltcc;","???":"&ltcir;","???":"&ltimes;","???":"&ltlarr;","???":"&ltquest;","???":"&ltrPar;","???":"&triangleleft;","???":"&lurdshar;","???":"&luruhar;","??????":"&lvnE;","???":"&mDDot;","??":"&strns;","???":"&male;","???":"&maltese;","???":"&marker;","???":"&mcomma;","??":"&mcy;","???":"&mdash;","????":"&mfr;","???":"&mho;","??":"&micro;","???":"&midcir;","???":"&minus;","???":"&minusdu;","???":"&mlcp;","???":"&models;","????":"&mopf;","????":"&mscr;","??":"&mu;","???":"&mumap;","?????":"&nGg;","??????":"&nGt;","???":"&nlArr;","???":"&nhArr;","?????":"&nLl;","??????":"&nLt;","???":"&nrArr;","???":"&nVDash;","???":"&nVdash;","??":"&nacute;","??????":"&nang;","?????":"&napE;","?????":"&napid;","??":"&napos;","???":"&natural;","???":"&ncap;","??":"&ncaron;","??":"&ncedil;","?????":"&ncongdot;","???":"&ncup;","??":"&ncy;","???":"&ndash;","???":"&neArr;","???":"&nearhk;","?????":"&nedot;","???":"&toea;","????":"&nfr;","???":"&nleftrightarrow;","???":"&nhpar;","???":"&nis;","???":"&nisd;","??":"&njcy;","?????":"&nleqq;","???":"&nleftarrow;","???":"&nldr;","????":"&nopf;","??":"&not;","?????":"&notinE;","?????":"&notindot;","???":"&notinvb;","???":"&notinvc;","???":"&notnivb;","???":"&notnivc;","??????":"&nparsl;","?????":"&npart;","???":"&npolint;","???":"&nrightarrow;","?????":"&nrarrc;","?????":"&nrarrw;","????":"&nscr;","???":"&nsub;","?????":"&nsubseteqq;","???":"&nsup;","?????":"&nsupseteqq;","??":"&ntilde;","??":"&nu;","#":"&num;","???":"&numero;","???":"&numsp;","???":"&nvDash;","???":"&nvHarr;","??????":"&nvap;","???":"&nvdash;","??????":"&nvge;",">???":"&nvgt;","???":"&nvinfin;","???":"&nvlArr;","??????":"&nvle;","<???":"&nvlt;","??????":"&nvltrie;","???":"&nvrArr;","??????":"&nvrtrie;","??????":"&nvsim;","???":"&nwArr;","???":"&nwarhk;","???":"&nwnear;","??":"&oacute;","??":"&ocirc;","??":"&ocy;","??":"&odblac;","???":"&odiv;","???":"&odsold;","??":"&oelig;","???":"&ofcir;","????":"&ofr;","??":"&ogon;","??":"&ograve;","???":"&ogt;","???":"&ohbar;","???":"&olcir;","???":"&olcross;","???":"&olt;","??":"&omacr;","??":"&omega;","??":"&omicron;","???":"&omid;","????":"&oopf;","???":"&opar;","???":"&operp;","???":"&vee;","???":"&ord;","???":"&oscr;","??":"&ordf;","??":"&ordm;","???":"&origof;","???":"&oror;","???":"&orslope;","???":"&orv;","??":"&oslash;","???":"&osol;","??":"&otilde;","???":"&otimesas;","??":"&ouml;","???":"&ovbar;","??":"&para;","???":"&parsim;","???":"&parsl;","??":"&pcy;","%":"&percnt;",".":"&period;","???":"&permil;","???":"&pertenk;","????":"&pfr;","??":"&phi;","??":"&varphi;","???":"&phone;","??":"&pi;","??":"&varpi;","???":"&planckh;","+":"&plus;","???":"&plusacir;","???":"&pluscir;","???":"&plusdu;","???":"&pluse;","???":"&plussim;","???":"&plustwo;","???":"&pointint;","????":"&popf;","??":"&pound;","???":"&prE;","???":"&precapprox;","???":"&prnap;","???":"&prnE;","???":"&prnsim;","???":"&prime;","???":"&profalar;","???":"&profline;","???":"&profsurf;","???":"&prurel;","????":"&pscr;","??":"&psi;","???":"&puncsp;","????":"&qfr;","????":"&qopf;","???":"&qprime;","????":"&qscr;","???":"&quatint;","?":"&quest;","???":"&rAtail;","???":"&rHar;","?????":"&race;","??":"&racute;","???":"&raemptyv;","???":"&rangd;","???":"&range;","??":"&raquo;","???":"&rarrap;","???":"&rarrbfs;","???":"&rarrc;","???":"&rarrfs;","???":"&rarrpl;","???":"&rarrsim;","???":"&rightarrowtail;","???":"&rightsquigarrow;","???":"&ratail;","???":"&ratio;","???":"&rbbrk;","}":"&rcub;","]":"&rsqb;","???":"&rbrke;","???":"&rbrksld;","???":"&rbrkslu;","??":"&rcaron;","??":"&rcedil;","??":"&rcy;","???":"&rdca;","???":"&rdldhar;","???":"&rdsh;","???":"&rect;","???":"&rfisht;","????":"&rfr;","???":"&rharul;","??":"&rho;","??":"&varrho;","???":"&rrarr;","???":"&rthree;","??":"&ring;","???":"&rlm;","???":"&rmoustache;","???":"&rnmid;","???":"&roang;","???":"&roarr;","???":"&ropar;","????":"&ropf;","???":"&roplus;","???":"&rotimes;",")":"&rpar;","???":"&rpargt;","???":"&rppolint;","???":"&rsaquo;","????":"&rscr;","???":"&rtimes;","???":"&triangleright;","???":"&rtriltri;","???":"&ruluhar;","???":"&rx;","??":"&sacute;","???":"&scE;","???":"&succapprox;","??":"&scaron;","??":"&scedil;","??":"&scirc;","???":"&succneqq;","???":"&succnapprox;","???":"&succnsim;","???":"&scpolint;","??":"&scy;","???":"&sdot;","???":"&sdote;","???":"&seArr;","??":"&sect;",";":"&semi;","???":"&tosa;","???":"&sext;","????":"&sfr;","???":"&sharp;","??":"&shchcy;","??":"&shcy;","??":"&shy;","??":"&sigma;","??":"&varsigma;","???":"&simdot;","???":"&simg;","???":"&simgE;","???":"&siml;","???":"&simlE;","???":"&simne;","???":"&simplus;","???":"&simrarr;","???":"&smashp;","???":"&smeparsl;","???":"&ssmile;","???":"&smt;","???":"&smte;","??????":"&smtes;","??":"&softcy;","/":"&sol;","???":"&solb;","???":"&solbar;","????":"&sopf;","???":"&spadesuit;","??????":"&sqcaps;","??????":"&sqcups;","????":"&sscr;","???":"&star;","???":"&subset;","???":"&subseteqq;","???":"&subdot;","???":"&subedot;","???":"&submult;","???":"&subsetneqq;","???":"&subsetneq;","???":"&subplus;","???":"&subrarr;","???":"&subsim;","???":"&subsub;","???":"&subsup;","???":"&sung;","??":"&sup1;","??":"&sup2;","??":"&sup3;","???":"&supseteqq;","???":"&supdot;","???":"&supdsub;","???":"&supedot;","???":"&suphsol;","???":"&suphsub;","???":"&suplarr;","???":"&supmult;","???":"&supsetneqq;","???":"&supsetneq;","???":"&supplus;","???":"&supsim;","???":"&supsub;","???":"&supsup;","???":"&swArr;","???":"&swnwar;","??":"&szlig;","???":"&target;","??":"&tau;","??":"&tcaron;","??":"&tcedil;","??":"&tcy;","???":"&telrec;","????":"&tfr;","??":"&theta;","??":"&vartheta;","??":"&thorn;","??":"&times;","???":"&timesbar;","???":"&timesd;","???":"&topbot;","???":"&topcir;","????":"&topf;","???":"&topfork;","???":"&tprime;","???":"&utri;","???":"&trie;","???":"&tridot;","???":"&triminus;","???":"&triplus;","???":"&trisb;","???":"&tritime;","???":"&trpezium;","????":"&tscr;","??":"&tscy;","??":"&tshcy;","??":"&tstrok;","???":"&uHar;","??":"&uacute;","??":"&ubrcy;","??":"&ubreve;","??":"&ucirc;","??":"&ucy;","??":"&udblac;","???":"&ufisht;","????":"&ufr;","??":"&ugrave;","???":"&uhblk;","???":"&ulcorner;","???":"&ulcrop;","???":"&ultri;","??":"&umacr;","??":"&uogon;","????":"&uopf;","??":"&upsilon;","???":"&uuarr;","???":"&urcorner;","???":"&urcrop;","??":"&uring;","???":"&urtri;","????":"&uscr;","???":"&utdot;","??":"&utilde;","??":"&uuml;","???":"&uwangle;","???":"&vBar;","???":"&vBarv;","???":"&vangrt;","??????":"&vsubne;","??????":"&vsubnE;","??????":"&vsupne;","??????":"&vsupnE;","??":"&vcy;","???":"&veebar;","???":"&veeeq;","???":"&vellip;","????":"&vfr;","????":"&vopf;","????":"&vscr;","???":"&vzigzag;","??":"&wcirc;","???":"&wedbar;","???":"&wedgeq;","???":"&wp;","????":"&wfr;","????":"&wopf;","????":"&wscr;","????":"&xfr;","??":"&xi;","???":"&xnis;","????":"&xopf;","????":"&xscr;","??":"&yacute;","??":"&yacy;","??":"&ycirc;","??":"&ycy;","??":"&yen;","????":"&yfr;","??":"&yicy;","????":"&yopf;","????":"&yscr;","??":"&yucy;","??":"&yuml;","??":"&zacute;","??":"&zcaron;","??":"&zcy;","??":"&zdot;","??":"&zeta;","????":"&zfr;","??":"&zhcy;","???":"&zigrarr;","????":"&zopf;","????":"&zscr;","???":"&zwj;","???":"&zwnj;"}}};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* eslint-env browser */

/*
  eslint-disable
  no-console,
  func-names
*/

/** @typedef {any} TODO */
var normalizeUrl = __webpack_require__("./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");

var srcByModuleId = Object.create(null);
var noDocument = typeof document === "undefined";
var forEach = Array.prototype.forEach;
/**
 * @param {function} fn
 * @param {number} time
 * @returns {(function(): void)|*}
 */

function debounce(fn, time) {
  var timeout = 0;
  return function () {
    // @ts-ignore
    var self = this; // eslint-disable-next-line prefer-rest-params

    var args = arguments;

    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };

    clearTimeout(timeout); // @ts-ignore

    timeout = setTimeout(functionCall, time);
  };
}

function noop() {}
/**
 * @param {TODO} moduleId
 * @returns {TODO}
 */


function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];

  if (!src) {
    if (document.currentScript) {
      src =
      /** @type {HTMLScriptElement} */
      document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName("script");
      var lastScriptTag = scripts[scripts.length - 1];

      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }

    srcByModuleId[moduleId] = src;
  }
  /**
   * @param {string} fileMap
   * @returns {null | string[]}
   */


  return function (fileMap) {
    if (!src) {
      return null;
    }

    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];

    if (!filename) {
      return [src.replace(".js", ".css")];
    }

    if (!fileMap) {
      return [src.replace(".js", ".css")];
    }

    return fileMap.split(",").map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), "g");
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}
/**
 * @param {TODO} el
 * @param {string} [url]
 */


function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    } // eslint-disable-next-line


    url = el.href.split("?")[0];
  }

  if (!isUrlRequest(
  /** @type {string} */
  url)) {
    return;
  }

  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }

  if (!url || !(url.indexOf(".css") > -1)) {
    return;
  } // eslint-disable-next-line no-param-reassign


  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener("load", function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener("error", function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());

  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}
/**
 * @param {string} href
 * @param {TODO} src
 * @returns {TODO}
 */


function getReloadUrl(href, src) {
  var ret; // eslint-disable-next-line no-param-reassign

  href = normalizeUrl(href);
  src.some(
  /**
   * @param {string} url
   */
  // eslint-disable-next-line array-callback-return
  function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}
/**
 * @param {string} [src]
 * @returns {boolean}
 */


function reloadStyle(src) {
  if (!src) {
    return false;
  }

  var elements = document.querySelectorAll("link");
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }

    var url = getReloadUrl(el.href, src);

    if (!isUrlRequest(url)) {
      return;
    }

    if (el.visited === true) {
      return;
    }

    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}

function reloadAll() {
  var elements = document.querySelectorAll("link");
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }

    updateCss(el);
  });
}
/**
 * @param {string} url
 * @returns {boolean}
 */


function isUrlRequest(url) {
  // An URL is not an request if
  // It is not http or https
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
    return false;
  }

  return true;
}
/**
 * @param {TODO} moduleId
 * @param {TODO} options
 * @returns {TODO}
 */


module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log("no window.document found, will not HMR CSS");
    return noop;
  }

  var getScriptSrc = getCurrentScriptUrl(moduleId);

  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);

    if (options.locals) {
      console.log("[HMR] Detected local css modules. Reload all css");
      reloadAll();
      return;
    }

    if (reloaded) {
      console.log("[HMR] css reload %s", src.join(" "));
    } else {
      console.log("[HMR] Reload all css");
      reloadAll();
    }
  }

  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/***/ ((module) => {



/* eslint-disable */

/**
 * @param {string[]} pathComponents
 * @returns {string}
 */
function normalizeUrl(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case "..":
        accumulator.pop();
        break;

      case ".":
        break;

      default:
        accumulator.push(item);
    }

    return accumulator;
  },
  /** @type {string[]} */
  []).join("/");
}
/**
 * @param {string} urlString
 * @returns {string}
 */


module.exports = function (urlString) {
  urlString = urlString.trim();

  if (/^data:/i.test(urlString)) {
    return urlString;
  }

  var protocol = urlString.indexOf("//") !== -1 ? urlString.split("//")[0] + "//" : "";
  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");
  var host = components[0].toLowerCase().replace(/\.$/, "");
  components[0] = "";
  var path = normalizeUrl(components);
  return protocol + host + path;
};

/***/ }),

/***/ "./node_modules/strip-ansi/index.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const ansiRegex = __webpack_require__("./node_modules/ansi-regex/index.js");

module.exports = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;


/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client-overlay.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*eslint-env browser*/

var clientOverlay = document.createElement('div');
clientOverlay.id = 'webpack-hot-middleware-clientOverlay';
var styles = {
  background: 'rgba(0,0,0,0.85)',
  color: '#e8e8e8',
  lineHeight: '1.6',
  whiteSpace: 'pre',
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: '13px',
  position: 'fixed',
  zIndex: 9999,
  padding: '10px',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'auto',
  dir: 'ltr',
  textAlign: 'left',
};

var ansiHTML = __webpack_require__("./node_modules/ansi-html-community/index.js");
var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'ff3348',
  green: '3fff4f',
  yellow: 'ffd30e',
  blue: '169be0',
  magenta: 'f840b7',
  cyan: '0ad8e9',
  lightgrey: 'ebe7e3',
  darkgrey: '6d7891',
};

var htmlEntities = __webpack_require__("./node_modules/html-entities/lib/index.js");

function showProblems(type, lines) {
  clientOverlay.innerHTML = '';
  lines.forEach(function (msg) {
    msg = ansiHTML(htmlEntities.encode(msg));
    var div = document.createElement('div');
    div.style.marginBottom = '26px';
    div.innerHTML = problemType(type) + ' in ' + msg;
    clientOverlay.appendChild(div);
  });
  if (document.body) {
    document.body.appendChild(clientOverlay);
  }
}

function clear() {
  if (document.body && clientOverlay.parentNode) {
    document.body.removeChild(clientOverlay);
  }
}

function problemType(type) {
  var problemColors = {
    errors: colors.red,
    warnings: colors.yellow,
  };
  var color = problemColors[type] || colors.red;
  return (
    '<span style="background-color:#' +
    color +
    '; color:#000000; padding:3px 6px; border-radius: 4px;">' +
    type.slice(0, -1).toUpperCase() +
    '</span>'
  );
}

module.exports = function (options) {
  for (var color in options.ansiColors) {
    if (color in colors) {
      colors[color] = options.ansiColors[color];
    }
    ansiHTML.setColors(colors);
  }

  for (var style in options.overlayStyles) {
    styles[style] = options.overlayStyles[style];
  }

  for (var key in styles) {
    clientOverlay.style[key] = styles[key];
  }

  return {
    showProblems: showProblems,
    clear: clear,
  };
};

module.exports.clear = clear;
module.exports.showProblems = showProblems;


/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client.js?reload=true":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __resourceQuery = "?reload=true";
/* module decorator */ module = __webpack_require__.nmd(module);
/*eslint-env browser*/
/*global __resourceQuery __webpack_public_path__*/

var options = {
  path: '/__webpack_hmr',
  timeout: 20 * 1000,
  overlay: true,
  reload: false,
  log: true,
  warn: true,
  name: '',
  autoConnect: true,
  overlayStyles: {},
  overlayWarnings: false,
  ansiColors: {},
};
if (true) {
  var overrides = Object.fromEntries(
    new URLSearchParams(__resourceQuery.slice(1))
  );
  setOverrides(overrides);
}

if (typeof window === 'undefined') {
  // do nothing
} else if (typeof window.EventSource === 'undefined') {
  console.warn(
    "webpack-hot-middleware's client requires EventSource to work. " +
      'You should include a polyfill if you want to support this browser: ' +
      'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools'
  );
} else {
  if (options.autoConnect) {
    connect();
  }
}

/* istanbul ignore next */
function setOptionsAndConnect(overrides) {
  setOverrides(overrides);
  connect();
}

function setOverrides(overrides) {
  if (overrides.autoConnect)
    options.autoConnect = overrides.autoConnect == 'true';
  if (overrides.path) options.path = overrides.path;
  if (overrides.timeout) options.timeout = overrides.timeout;
  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
  if (overrides.reload) options.reload = overrides.reload !== 'false';
  if (overrides.noInfo && overrides.noInfo !== 'false') {
    options.log = false;
  }
  if (overrides.name) {
    options.name = overrides.name;
  }
  if (overrides.quiet && overrides.quiet !== 'false') {
    options.log = false;
    options.warn = false;
  }

  if (overrides.dynamicPublicPath) {
    options.path = __webpack_require__.p + options.path;
  }

  if (overrides.ansiColors)
    options.ansiColors = JSON.parse(overrides.ansiColors);
  if (overrides.overlayStyles)
    options.overlayStyles = JSON.parse(overrides.overlayStyles);

  if (overrides.overlayWarnings) {
    options.overlayWarnings = overrides.overlayWarnings == 'true';
  }
}

function EventSourceWrapper() {
  var source;
  var lastActivity = new Date();
  var listeners = [];

  init();
  var timer = setInterval(function () {
    if (new Date() - lastActivity > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function init() {
    source = new window.EventSource(options.path);
    source.onopen = handleOnline;
    source.onerror = handleDisconnect;
    source.onmessage = handleMessage;
  }

  function handleOnline() {
    if (options.log) console.log('[HMR] connected');
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event);
    }
  }

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(init, options.timeout);
  }

  return {
    addMessageListener: function (fn) {
      listeners.push(fn);
    },
  };
}

function getEventSourceWrapper() {
  if (!window.__whmEventSourceWrapper) {
    window.__whmEventSourceWrapper = {};
  }
  if (!window.__whmEventSourceWrapper[options.path]) {
    // cache the wrapper for other entries loaded on
    // the same page with the same options.path
    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
  }
  return window.__whmEventSourceWrapper[options.path];
}

function connect() {
  getEventSourceWrapper().addMessageListener(handleMessage);

  function handleMessage(event) {
    if (event.data == '\uD83D\uDC93') {
      return;
    }
    try {
      processMessage(JSON.parse(event.data));
    } catch (ex) {
      if (options.warn) {
        console.warn('Invalid HMR message: ' + event.data + '\n' + ex);
      }
    }
  }
}

// the reporter needs to be a singleton on the page
// in case the client is being used by multiple bundles
// we only want to report once.
// all the errors will go to all clients
var singletonKey = '__webpack_hot_middleware_reporter__';
var reporter;
if (typeof window !== 'undefined') {
  if (!window[singletonKey]) {
    window[singletonKey] = createReporter();
  }
  reporter = window[singletonKey];
}

function createReporter() {
  var strip = __webpack_require__("./node_modules/strip-ansi/index.js");

  var overlay;
  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__("./node_modules/webpack-hot-middleware/client-overlay.js")({
      ansiColors: options.ansiColors,
      overlayStyles: options.overlayStyles,
    });
  }

  var styles = {
    errors: 'color: #ff0000;',
    warnings: 'color: #999933;',
  };
  var previousProblems = null;
  function log(type, obj) {
    var newProblems = obj[type]
      .map(function (msg) {
        return strip(msg);
      })
      .join('\n');
    if (previousProblems == newProblems) {
      return;
    } else {
      previousProblems = newProblems;
    }

    var style = styles[type];
    var name = obj.name ? "'" + obj.name + "' " : '';
    var title = '[HMR] bundle ' + name + 'has ' + obj[type].length + ' ' + type;
    // NOTE: console.warn or console.error will print the stack trace
    // which isn't helpful here, so using console.log to escape it.
    if (console.group && console.groupEnd) {
      console.group('%c' + title, style);
      console.log('%c' + newProblems, style);
      console.groupEnd();
    } else {
      console.log(
        '%c' + title + '\n\t%c' + newProblems.replace(/\n/g, '\n\t'),
        style + 'font-weight: bold;',
        style + 'font-weight: normal;'
      );
    }
  }

  return {
    cleanProblemsCache: function () {
      previousProblems = null;
    },
    problems: function (type, obj) {
      if (options.warn) {
        log(type, obj);
      }
      if (overlay) {
        if (options.overlayWarnings || type === 'errors') {
          overlay.showProblems(type, obj[type]);
          return false;
        }
        overlay.clear();
      }
      return true;
    },
    success: function () {
      if (overlay) overlay.clear();
    },
    useCustomOverlay: function (customOverlay) {
      overlay = customOverlay;
    },
  };
}

var processUpdate = __webpack_require__("./node_modules/webpack-hot-middleware/process-update.js");

var customHandler;
var subscribeAllHandler;
function processMessage(obj) {
  switch (obj.action) {
    case 'building':
      if (options.log) {
        console.log(
          '[HMR] bundle ' +
            (obj.name ? "'" + obj.name + "' " : '') +
            'rebuilding'
        );
      }
      break;
    case 'built':
      if (options.log) {
        console.log(
          '[HMR] bundle ' +
            (obj.name ? "'" + obj.name + "' " : '') +
            'rebuilt in ' +
            obj.time +
            'ms'
        );
      }
    // fall through
    case 'sync':
      if (obj.name && options.name && obj.name !== options.name) {
        return;
      }
      var applyUpdate = true;
      if (obj.errors.length > 0) {
        if (reporter) reporter.problems('errors', obj);
        applyUpdate = false;
      } else if (obj.warnings.length > 0) {
        if (reporter) {
          var overlayShown = reporter.problems('warnings', obj);
          applyUpdate = overlayShown;
        }
      } else {
        if (reporter) {
          reporter.cleanProblemsCache();
          reporter.success();
        }
      }
      if (applyUpdate) {
        processUpdate(obj.hash, obj.modules, options);
      }
      break;
    default:
      if (customHandler) {
        customHandler(obj);
      }
  }

  if (subscribeAllHandler) {
    subscribeAllHandler(obj);
  }
}

if (module) {
  module.exports = {
    subscribeAll: function subscribeAll(handler) {
      subscribeAllHandler = handler;
    },
    subscribe: function subscribe(handler) {
      customHandler = handler;
    },
    useCustomOverlay: function useCustomOverlay(customOverlay) {
      if (reporter) reporter.useCustomOverlay(customOverlay);
    },
    setOptionsAndConnect: setOptionsAndConnect,
  };
}


/***/ }),

/***/ "./node_modules/webpack-hot-middleware/process-update.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Based heavily on https://github.com/webpack/webpack/blob/
 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers @sokra (MIT license)
 */

/* global window __webpack_hash__ */

if (false) {}

var hmrDocsUrl = 'https://webpack.js.org/concepts/hot-module-replacement/'; // eslint-disable-line max-len

var lastHash;
var failureStatuses = { abort: 1, fail: 1 };
var applyOptions = {
  ignoreUnaccepted: true,
  ignoreDeclined: true,
  ignoreErrored: true,
  onUnaccepted: function (data) {
    console.warn(
      'Ignored an update to unaccepted module ' + data.chain.join(' -> ')
    );
  },
  onDeclined: function (data) {
    console.warn(
      'Ignored an update to declined module ' + data.chain.join(' -> ')
    );
  },
  onErrored: function (data) {
    console.error(data.error);
    console.warn(
      'Ignored an error while updating module ' +
        data.moduleId +
        ' (' +
        data.type +
        ')'
    );
  },
};

function upToDate(hash) {
  if (hash) lastHash = hash;
  return lastHash == __webpack_require__.h();
}

module.exports = function (hash, moduleMap, options) {
  var reload = options.reload;
  if (!upToDate(hash) && module.hot.status() == 'idle') {
    if (options.log) console.log('[HMR] Checking for updates on the server...');
    check();
  }

  function check() {
    var cb = function (err, updatedModules) {
      if (err) return handleError(err);

      if (!updatedModules) {
        if (options.warn) {
          console.warn('[HMR] Cannot find update (Full reload needed)');
          console.warn('[HMR] (Probably because of restarting the server)');
        }
        performReload();
        return null;
      }

      var applyCallback = function (applyErr, renewedModules) {
        if (applyErr) return handleError(applyErr);

        if (!upToDate()) check();

        logUpdates(updatedModules, renewedModules);
      };

      var applyResult = module.hot.apply(applyOptions, applyCallback);
      // webpack 2 promise
      if (applyResult && applyResult.then) {
        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
        applyResult.then(function (outdatedModules) {
          applyCallback(null, outdatedModules);
        });
        applyResult.catch(applyCallback);
      }
    };

    var result = module.hot.check(false, cb);
    // webpack 2 promise
    if (result && result.then) {
      result.then(function (updatedModules) {
        cb(null, updatedModules);
      });
      result.catch(cb);
    }
  }

  function logUpdates(updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function (moduleId) {
      return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });

    if (unacceptedModules.length > 0) {
      if (options.warn) {
        console.warn(
          "[HMR] The following modules couldn't be hot updated: " +
            '(Full reload needed)\n' +
            'This is usually because the modules which have changed ' +
            '(and their parents) do not know how to hot reload themselves. ' +
            'See ' +
            hmrDocsUrl +
            ' for more details.'
        );
        unacceptedModules.forEach(function (moduleId) {
          console.warn('[HMR]  - ' + (moduleMap[moduleId] || moduleId));
        });
      }
      performReload();
      return;
    }

    if (options.log) {
      if (!renewedModules || renewedModules.length === 0) {
        console.log('[HMR] Nothing hot updated.');
      } else {
        console.log('[HMR] Updated modules:');
        renewedModules.forEach(function (moduleId) {
          console.log('[HMR]  - ' + (moduleMap[moduleId] || moduleId));
        });
      }

      if (upToDate()) {
        console.log('[HMR] App is up to date.');
      }
    }
  }

  function handleError(err) {
    if (module.hot.status() in failureStatuses) {
      if (options.warn) {
        console.warn('[HMR] Cannot check for update (Full reload needed)');
        console.warn('[HMR] ' + (err.stack || err.message));
      }
      performReload();
      return;
    }
    if (options.warn) {
      console.warn('[HMR] Update check failed: ' + (err.stack || err.message));
    }
  }

  function performReload() {
    if (reload) {
      if (options.warn) console.warn('[HMR] Reloading page');
      window.location.reload();
    }
  }
};


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/Base/index.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Base": () => (/* binding */ Base)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/utils.js");
/* harmony import */ var _managers_ChildrenManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/managers/ChildrenManager.js");
/* harmony import */ var _managers_RefsManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/managers/RefsManager.js");
/* harmony import */ var _managers_ServicesManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/managers/ServicesManager.js");
/* harmony import */ var _managers_EventsManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/managers/EventsManager.js");
/* harmony import */ var _managers_OptionsManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/managers/OptionsManager.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/noop.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};







let id = 0;
function createAndTestManagers(instance) {
  [
    {
      prop: "__options",
      constructorName: "OptionsManager",
      constructor: _managers_OptionsManager_js__WEBPACK_IMPORTED_MODULE_0__.OptionsManager
    },
    {
      prop: "__services",
      constructorName: "ServicesManager",
      constructor: _managers_ServicesManager_js__WEBPACK_IMPORTED_MODULE_1__.ServicesManager
    },
    {
      prop: "__events",
      constructorName: "EventsManager",
      constructor: _managers_EventsManager_js__WEBPACK_IMPORTED_MODULE_2__.EventsManager
    },
    {
      prop: "__refs",
      constructorName: "RefsManager",
      constructor: _managers_RefsManager_js__WEBPACK_IMPORTED_MODULE_3__.RefsManager
    },
    {
      prop: "__children",
      constructorName: "ChildrenManager",
      constructor: _managers_ChildrenManager_js__WEBPACK_IMPORTED_MODULE_4__.ChildrenManager
    }
  ].forEach(({ prop, constructorName, constructor }) => {
    instance[prop] = new instance.__managers[constructorName](instance);
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev && !(instance[prop] instanceof constructor)) {
      throw new Error(
        `The \`$managers.${constructorName}\` must extend the \`${constructorName}\` class.`
      );
    }
  });
}
class Base extends EventTarget {
  constructor(element) {
    super();
    __publicField(this, "$parent", null);
    __publicField(this, "$id");
    __publicField(this, "$el");
    __publicField(this, "$isMounted", false);
    __publicField(this, "__eventHandlers", /* @__PURE__ */ new Map());
    __publicField(this, "__services");
    __publicField(this, "__refs");
    __publicField(this, "__options");
    __publicField(this, "__children");
    __publicField(this, "__events");
    if (!element) {
      if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev) {
        throw new Error("The root element must be defined.");
      }
      return;
    }
    const { __config } = this;
    if (__config.name === "Base") {
      if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev) {
        throw new Error("The `config.name` property is required.");
      }
      return;
    }
    this.$id = `${__config.name}-${id}`;
    id += 1;
    this.$el = element;
    if (!this.$el.__base__) {
      this.$el.__base__ = /* @__PURE__ */ new WeakMap();
    }
    this.$el.__base__.set(this.__ctor, this);
    createAndTestManagers(this);
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev) {
      this.__debug("constructor", this);
    }
  }
  get $root() {
    if (!this.$parent) {
      return this;
    }
    let parent = this.$parent;
    let root = this.$parent;
    while (parent) {
      if (!parent.$parent) {
        root = parent;
      }
      parent = parent.$parent;
    }
    return root;
  }
  get __config() {
    var _a, _b, _c;
    let proto = Object.getPrototypeOf(this);
    let { config } = proto.constructor;
    while (proto.constructor.config && proto.constructor.$isBase) {
      config = { ...proto.constructor.config, ...config };
      if (proto.constructor.config.options) {
        config.options = { ...proto.constructor.config.options, ...config.options };
      }
      if (proto.constructor.config.emits && config.emits) {
        config.emits = [...proto.constructor.config.emits, ...config.emits];
      }
      proto = Object.getPrototypeOf(proto);
    }
    config.options = (_a = config.options) != null ? _a : {};
    config.refs = (_b = config.refs) != null ? _b : [];
    config.components = (_c = config.components) != null ? _c : {};
    return config;
  }
  get $services() {
    return this.__services;
  }
  get $refs() {
    return this.__refs;
  }
  get $options() {
    return this.__options;
  }
  get $children() {
    return this.__children;
  }
  get $log() {
    return this.__options.log ? window.console.log.bind(window, `[${this.__config.name}]`) : _utils_index_js__WEBPACK_IMPORTED_MODULE_6__.noop;
  }
  get __debug() {
    return _utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev && this.__options.debug ? window.console.log.bind(window, `[debug] [${this.$id}]`) : _utils_index_js__WEBPACK_IMPORTED_MODULE_6__.noop;
  }
  get __managers() {
    return {
      ChildrenManager: _managers_ChildrenManager_js__WEBPACK_IMPORTED_MODULE_4__.ChildrenManager,
      EventsManager: _managers_EventsManager_js__WEBPACK_IMPORTED_MODULE_2__.EventsManager,
      OptionsManager: _managers_OptionsManager_js__WEBPACK_IMPORTED_MODULE_0__.OptionsManager,
      RefsManager: _managers_RefsManager_js__WEBPACK_IMPORTED_MODULE_3__.RefsManager,
      ServicesManager: _managers_ServicesManager_js__WEBPACK_IMPORTED_MODULE_1__.ServicesManager
    };
  }
  __callMethod(method, ...args) {
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev) {
      this.__debug("callMethod", method, ...args);
    }
    this.$emit(method, ...args);
    if (!(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isFunction)(this[method])) {
      return null;
    }
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev) {
      this.__debug(method, this, ...args);
    }
    return this[method].call(this, ...args);
  }
  __hasEvent(event) {
    const eventHandlers = this.__eventHandlers.get(event);
    return eventHandlers && eventHandlers.size > 0;
  }
  $mount() {
    if (this.$isMounted) {
      return this;
    }
    this.$emit("before-mounted");
    this.$isMounted = true;
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev) {
      this.__debug("$mount");
    }
    this.$children.registerAll();
    this.$refs.registerAll();
    this.__events.bindRootElement();
    this.$services.enableAll();
    this.$children.mountAll();
    this.__callMethod("mounted");
    return this;
  }
  $update() {
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev) {
      this.__debug("$update");
    }
    this.$refs.unregisterAll();
    this.$services.disableAll();
    this.$children.registerAll();
    this.$refs.registerAll();
    this.$services.enableAll();
    this.$children.updateAll();
    this.__callMethod("updated");
    return this;
  }
  $destroy() {
    if (!this.$isMounted) {
      return this;
    }
    this.$isMounted = false;
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev) {
      this.__debug("$destroy");
    }
    this.__events.unbindRootElement();
    this.$refs.unregisterAll();
    this.$services.disableAll();
    this.$children.destroyAll();
    this.__callMethod("destroyed");
    return this;
  }
  $terminate() {
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev) {
      this.__debug("$terminate");
    }
    this.$destroy();
    this.__callMethod("terminated");
    this.$el.__base__.set(this.__ctor, "terminated");
  }
  __addEmits(event) {
    const ctor = this.__ctor;
    if ((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isArray)(ctor.config.emits)) {
      ctor.config.emits.push(event);
    } else {
      ctor.config.emits = [event];
    }
  }
  __removeEmits(event) {
    const ctor = this.__ctor;
    const index = ctor.config.emits.indexOf(event);
    ctor.config.emits.splice(index, 1);
  }
  get __ctor() {
    return this.constructor;
  }
  $on(event, listener, options) {
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev) {
      this.__debug("$on", event, listener, options);
    }
    let set = this.__eventHandlers.get(event);
    if (!set) {
      set = /* @__PURE__ */ new Set();
      this.__eventHandlers.set(event, set);
    }
    set.add(listener);
    const target = (0,_utils_js__WEBPACK_IMPORTED_MODULE_7__.getEventTarget)(this, event, this.__config);
    target.addEventListener(event, listener, options);
    return () => {
      this.$off(event, listener, options);
    };
  }
  $off(event, listener, options) {
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev) {
      this.__debug("$off", event, listener);
    }
    this.__eventHandlers.get(event).delete(listener);
    const target = (0,_utils_js__WEBPACK_IMPORTED_MODULE_7__.getEventTarget)(this, event, this.__config);
    target.removeEventListener(event, listener, options);
  }
  $emit(event, ...args) {
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev) {
      this.__debug("$emit", event, args);
    }
    this.dispatchEvent(new CustomEvent(event, { detail: args }));
  }
  static $factory(nameOrSelector) {
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.isDev && !nameOrSelector) {
      throw new Error(
        "The $factory method requires a component\u2019s name or selector to be specified."
      );
    }
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_7__.getComponentElements)(nameOrSelector).map((el) => new this(el).$mount());
  }
}
__publicField(Base, "$isBase", true);
__publicField(Base, "config", {
  name: "Base",
  emits: [
    "before-mounted",
    "mounted",
    "updated",
    "destroyed",
    "terminated",
    "ticked",
    "scrolled",
    "resized",
    "moved",
    "loaded",
    "keyed"
  ]
});



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/Base/managers/AbstractManager.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractManager": () => (/* binding */ AbstractManager)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AbstractManager {
  constructor(base) {
    __publicField(this, "__base");
    this.__base = base;
    this.__hideProperties(["__base"]);
  }
  get __element() {
    return this.__base.$el;
  }
  get __config() {
    return this.__base.__config;
  }
  get __eventsManager() {
    return this.__base.__events;
  }
  __hideProperties(properties) {
    Object.defineProperties(
      this,
      Object.fromEntries(
        properties.map((property) => [
          property,
          {
            enumerable: false,
            writable: false,
            value: this[property]
          }
        ])
      )
    );
  }
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/Base/managers/ChildrenManager.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChildrenManager": () => (/* binding */ ChildrenManager)
/* harmony export */ });
/* harmony import */ var _AbstractManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/managers/AbstractManager.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/utils.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};


function __getChild(that, el, ComponentClass, name) {
  const asyncComponentPromise = that.__asyncComponentPromises.get(ComponentClass);
  if ("$isBase" in ComponentClass || asyncComponentPromise && asyncComponentPromise.status === "resolved") {
    let ctor = ComponentClass;
    if (asyncComponentPromise) {
      ctor = asyncComponentPromise.ctor;
    }
    if (el.__base__ && el.__base__.has(ctor)) {
      return el.__base__.get(ctor);
    }
    const child = new ctor(el);
    Object.defineProperty(child, "$parent", { get: () => that.__base });
    return child;
  }
  const promise = asyncComponentPromise ? asyncComponentPromise.promise : ComponentClass(that.__base);
  if (!asyncComponentPromise) {
    that.__asyncComponentPromises.set(ComponentClass, {
      promise,
      status: "pending",
      ctor: void 0
    });
  }
  return promise.then((module) => {
    var _a;
    const ctor = (_a = module.default) != null ? _a : module;
    that.__asyncComponentPromises.set(ComponentClass, {
      promise,
      status: "resolved",
      ctor
    });
    return __getChild(that, el, ctor, name);
  });
}
function __register(that, name, component) {
  Object.defineProperty(that, name, {
    enumerable: true,
    configurable: true,
    get: () => {
      const elements = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getComponentElements)(name, that.__element);
      if (elements.length === 0) {
        return [];
      }
      return elements.map((element) => __getChild(that, element, component, name)).filter((instance) => instance !== "terminated");
    }
  });
}
function __triggerHook(that, hook, instance, name) {
  if (hook === "$update" && !instance.$isMounted) {
    hook = "$mount";
  }
  if (hook === "$update" || hook === "$destroy") {
    that.__eventsManager.unbindChild(name, instance);
  }
  if (hook === "$update" || hook === "$mount") {
    that.__eventsManager.bindChild(name, instance);
  }
  instance[hook]();
}
function __triggerHookForAll(that, hook) {
  that.registeredNames.forEach((name) => {
    that[name].forEach((instance) => {
      if (instance instanceof Promise) {
        instance.then((resolvedInstance) => __triggerHook(that, hook, resolvedInstance, name));
      } else {
        __triggerHook(that, hook, instance, name);
      }
    });
  });
}
class ChildrenManager extends _AbstractManager_js__WEBPACK_IMPORTED_MODULE_1__.AbstractManager {
  constructor() {
    super(...arguments);
    __publicField(this, "__asyncComponentPromises", /* @__PURE__ */ new WeakMap());
  }
  get registeredNames() {
    return Object.keys(this).filter((key) => !key.startsWith("__"));
  }
  registerAll() {
    Object.entries(this.__config.components).forEach(
      ([name, component]) => __register(this, name, component)
    );
  }
  mountAll() {
    __triggerHookForAll(this, "$mount");
  }
  updateAll() {
    __triggerHookForAll(this, "$update");
  }
  destroyAll() {
    __triggerHookForAll(this, "$destroy");
  }
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/Base/managers/EventsManager.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventsManager": () => (/* binding */ EventsManager),
/* harmony export */   "normalizeEventName": () => (/* binding */ normalizeEventName),
/* harmony export */   "normalizeName": () => (/* binding */ normalizeName)
/* harmony export */ });
/* harmony import */ var _utils_object_getAllProperties_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/object/getAllProperties.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/utils.js");
/* harmony import */ var _AbstractManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/managers/AbstractManager.js");
/* harmony import */ var _RefsManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/managers/RefsManager.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};





const names = /* @__PURE__ */ new Map();
const normalizeRegex1 = /[A-Z]([A-Z].*)/g;
const normalizeRegex2 = /[^a-zA-Z\d\s:]/g;
const normalizeRegex3 = /(^\w|\s+\w)/g;
function normalizeName(name) {
  if (!names.has(name)) {
    names.set(
      name,
      name.replace(normalizeRegex1, (c) => c.toLowerCase()).replace(normalizeRegex2, " ").replace(normalizeRegex3, (c) => c.trim().toUpperCase()).trim()
    );
  }
  return names.get(name);
}
const eventNames = /* @__PURE__ */ new Map();
const normalizeEventRegex1 = /[A-Z]/g;
const normalizeEventRegex2 = /^-/;
function normalizeEventName(name) {
  if (!eventNames.has(name)) {
    eventNames.set(
      name,
      name.replace(normalizeEventRegex1, (c) => `-${c.toLowerCase()}`).replace(normalizeEventRegex2, "")
    );
  }
  return eventNames.get(name);
}
const regexes = /* @__PURE__ */ new Map();
function getRegex(regex) {
  if (!regexes.has(regex)) {
    regexes.set(regex, new RegExp(regex));
  }
  return regexes.get(regex);
}
function getEventNameByMethod(method, name = "") {
  const regex = getRegex(`^on${normalizeName(name)}([A-Z].*)$`);
  const [, event] = method.match(regex);
  return normalizeEventName(event);
}
function getEventMethodsByName(that, name = "") {
  const regex = getRegex(`^on${normalizeName(name)}[A-Z].*$`);
  const key = regex.toString();
  let methods = that.__methodsCache.get(key);
  if (!methods) {
    methods = Array.from(
      (0,_utils_object_getAllProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"])(that.__base, [], (method) => regex.test(method)).reduce(
        (set, [method]) => set.add(method),
        /* @__PURE__ */ new Set()
      )
    );
    that.__methodsCache.set(key, methods);
  }
  return methods;
}
function manageRef(that, name, elements, mode = "add") {
  const action = `${mode}EventListener`;
  const methods = getEventMethodsByName(that, name);
  methods.forEach((method) => {
    const event = getEventNameByMethod(method, name);
    elements.filter((element) => element).forEach((element) => element[action](event, that.__refsHandler));
  });
}
function manageChild(that, name, instance, mode = "add") {
  const action = mode === "add" ? "$on" : "$off";
  const methods = getEventMethodsByName(that, name);
  methods.forEach((method) => {
    const event = getEventNameByMethod(method, name);
    instance[action](event, that.__childrenHandler);
  });
}
const isDocumentRegex = /^onDocument[A-Z][a-z]+/;
const isWindowRegex = /^onWindow[A-Z][a-z]+/;
const methodIsDocument = (method) => isDocumentRegex.test(method);
const methodIsWindow = (method) => isWindowRegex.test(method);
const methodIsGlobal = (method) => methodIsWindow(method) || methodIsDocument(method);
const getGlobalEventTarget = (method) => methodIsDocument(method) ? document : window;
function manageRootElement(that, mode = "add") {
  const modeMethod = `${mode}EventListener`;
  const methods = getEventMethodsByName(that);
  const { __base: base, __config: config } = that;
  methods.forEach((method) => {
    let event = getEventNameByMethod(method);
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.eventIsDefinedInConfig)(event, config) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.eventIsNative)(event, base.$el)) {
      const target = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.getEventTarget)(base, event, config);
      target[modeMethod](event, that.__rootElementHandler);
    } else if (methodIsGlobal(method)) {
      event = getEventNameByMethod(method, methodIsDocument(method) ? "document" : "window");
      const target = getGlobalEventTarget(method);
      target[modeMethod](
        event,
        methodIsDocument(method) ? that.__documentHandler : that.__windowHandler
      );
    }
  });
}
class EventsManager extends _AbstractManager_js__WEBPACK_IMPORTED_MODULE_2__.AbstractManager {
  constructor(base) {
    super(base);
    __publicField(this, "__methodsCache", /* @__PURE__ */ new Map());
    __publicField(this, "__rootElementHandler", {
      handleEvent: (event) => {
        const normalizedEventName = normalizeName(event.type);
        const method = `on${normalizedEventName}`;
        if (event instanceof CustomEvent && (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.isArray)(event.detail) && event.detail.length) {
          this.__base[method](...event.detail, event);
        } else {
          this.__base[method](event);
        }
      }
    });
    __publicField(this, "__documentHandler", {
      handleEvent: (event) => {
        const normalizedEventName = normalizeName(event.type);
        const method = `onDocument${normalizedEventName}`;
        this.__base[method](event);
      }
    });
    __publicField(this, "__windowHandler", {
      handleEvent: (event) => {
        const normalizedEventName = normalizeName(event.type);
        const method = `onWindow${normalizedEventName}`;
        this.__base[method](event);
      }
    });
    __publicField(this, "__refsHandler", {
      handleEvent: (event) => {
        const ref = event.currentTarget;
        const refName = (0,_RefsManager_js__WEBPACK_IMPORTED_MODULE_4__.normalizeRefName)(ref.dataset.ref);
        const normalizedRefName = normalizeName(refName);
        const normalizedEventName = normalizeName(event.type);
        const method = `on${normalizedRefName}${normalizedEventName}`;
        let index = 0;
        if ((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.isArray)(this.__base.$refs[refName])) {
          index = this.__base.$refs[refName].indexOf(ref);
        }
        this.__base[method](event, index);
      }
    });
    __publicField(this, "__childrenHandler", {
      handleEvent: (event) => {
        const childrenManager = this.__base.$children;
        const { name, child: resolvedChild } = childrenManager.registeredNames.map((childName) => ({
          name: childName,
          child: [...childrenManager[childName]].find(
            (instance) => instance === event.currentTarget || instance.$el === event.currentTarget
          )
        })).find(({ child }) => child);
        const normalizedChildName = normalizeName(name);
        const normalizedEventName = normalizeName(event.type);
        const method = `on${normalizedChildName}${normalizedEventName}`;
        const index = [...childrenManager[name]].indexOf(resolvedChild);
        const args = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.isArray)(event.detail) ? event.detail : [];
        this.__base[method](...args, index, event);
      }
    });
    this.__hideProperties([
      "__methodsCache",
      "__rootElementHandler",
      "__refsHandler",
      "__childrenHandler",
      "__documentHandler",
      "__windowHandler"
    ]);
  }
  bindRef(name, elements) {
    manageRef(this, name, elements);
  }
  unbindRef(name, elements) {
    manageRef(this, name, elements, "remove");
  }
  bindChild(name, instance) {
    manageChild(this, name, instance);
  }
  unbindChild(name, instance) {
    manageChild(this, name, instance, "remove");
  }
  bindRootElement() {
    manageRootElement(this);
  }
  unbindRootElement() {
    manageRootElement(this, "remove");
  }
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/Base/managers/OptionsManager.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionsManager": () => (/* binding */ OptionsManager),
/* harmony export */   "__getPropertyName": () => (/* binding */ __getPropertyName)
/* harmony export */ });
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AbstractManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/managers/AbstractManager.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};



const types = /* @__PURE__ */ new Set([String, Number, Boolean, Array, Object]);
const __defaultValues = {
  String: "",
  Number: 0,
  Boolean: false,
  Array: () => [],
  Object: () => ({})
};
const __propertyNameCache = /* @__PURE__ */ new Map();
function __getPropertyName(name, prefix = "") {
  const key = name + prefix;
  if (__propertyNameCache.has(key)) {
    return __propertyNameCache.get(key);
  }
  const propertyName = `option${prefix}${name.replace(/^\w/, (c) => c.toUpperCase())}`;
  __propertyNameCache.set(key, propertyName);
  return propertyName;
}
function __register(that, name, config) {
  var _a;
  if (!types.has(config.type)) {
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isDev) {
      throw new Error(
        `The "${name}" option has an invalid type. The allowed types are: String, Number, Boolean, Array and Object.`
      );
    }
    return;
  }
  config.default = (_a = config.default) != null ? _a : __defaultValues[config.type.name];
  if ((config.type === Array || config.type === Object) && !(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isFunction)(config.default)) {
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isDev) {
      throw new Error(
        `The default value for options of type "${config.type.name}" must be returned by a function.`
      );
    }
    return;
  }
  Object.defineProperty(that, name, {
    get: () => that.get(name, config),
    set: (value) => {
      that.set(name, value, config);
    },
    enumerable: true
  });
}
class OptionsManager extends _AbstractManager_js__WEBPACK_IMPORTED_MODULE_2__.AbstractManager {
  constructor(base) {
    var _a, _b;
    super(base);
    __publicField(this, "__values", {});
    __publicField(this, "name", "Base");
    __publicField(this, "debug", false);
    __publicField(this, "log", false);
    this.__hideProperties(["__values", "__defaultValues"]);
    const schema = this.__config.options || {};
    this.name = this.__config.name;
    schema.debug = {
      type: Boolean,
      default: (_a = this.__config.debug) != null ? _a : false
    };
    schema.log = {
      type: Boolean,
      default: (_b = this.__config.log) != null ? _b : false
    };
    Object.entries(schema).forEach(([name, config]) => {
      __register(
        this,
        name,
        types.has(config) ? { type: config } : config
      );
    });
  }
  get(name, config) {
    const { type, default: defaultValue } = config;
    const propertyName = __getPropertyName(name);
    const hasProperty = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isDefined)(this.__element.dataset[propertyName]);
    if (type === Boolean) {
      if (defaultValue) {
        const negatedPropertyName = __getPropertyName(name, "No");
        const hasNegatedProperty = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isDefined)(this.__element.dataset[negatedPropertyName]);
        return !hasNegatedProperty;
      }
      return hasProperty || defaultValue;
    }
    const value = this.__element.dataset[propertyName];
    if (type === Number) {
      return hasProperty ? Number(value) : defaultValue;
    }
    if (type === Array || type === Object) {
      config = type === Array ? config : config;
      if (!this.__values[name]) {
        let val = hasProperty ? JSON.parse(value) : config.default();
        if ((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isDefined)(config.merge)) {
          val = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isBoolean)(config.merge) ? deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(config.default(), val) : deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(config.default(), val, config.merge);
        }
        this.__values[name] = val;
      }
      return this.__values[name];
    }
    return hasProperty ? value : defaultValue;
  }
  set(name, value, config) {
    const { type, default: defaultValue } = config;
    const propertyName = __getPropertyName(name);
    if (value.constructor.name !== type.name) {
      if (_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isDev) {
        const val = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(value) || (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isObject)(value) ? JSON.stringify(value) : value;
        throw new TypeError(
          `The "${val}" value for the "${name}" option must be of type "${type.name}"`
        );
      }
      return;
    }
    switch (type) {
      case Boolean:
        if (defaultValue) {
          const negatedPropertyName = __getPropertyName(name, "No");
          if (value) {
            delete this.__element.dataset[negatedPropertyName];
          } else {
            this.__element.dataset[negatedPropertyName] = "";
          }
        } else if (value) {
          this.__element.dataset[propertyName] = "";
        } else {
          delete this.__element.dataset[propertyName];
        }
        break;
      case Array:
      case Object:
        this.__values[name] = value;
        break;
      default:
        this.__element.dataset[propertyName] = value;
    }
  }
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/Base/managers/RefsManager.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RefsManager": () => (/* binding */ RefsManager),
/* harmony export */   "normalizeRefName": () => (/* binding */ normalizeRefName)
/* harmony export */ });
/* harmony import */ var _AbstractManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/managers/AbstractManager.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");


const NORMALIZE_REF_NAME_REGEX = /\[\]$/;
function normalizeRefName(name) {
  return name.endsWith("[]") ? name.replace(NORMALIZE_REF_NAME_REGEX, "") : name;
}
function __filterRefsBelongingToInstance(that, ref) {
  let ancestor = ref.parentElement;
  while (ancestor && !(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.isDefined)(ancestor.dataset.component)) {
    ancestor = ancestor.parentElement;
  }
  return ancestor === null || ancestor === that.__element;
}
function __register(that, refName) {
  const isMultiple = refName.endsWith("[]");
  const propName = normalizeRefName(refName);
  const refs = Array.from(
    that.__element.querySelectorAll(`[data-ref="${refName}"]`)
  ).filter((ref) => __filterRefsBelongingToInstance(that, ref));
  if (_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.isDev && !isMultiple && refs.length > 1) {
    console.warn(
      `[${that.__base.$options.name}]`,
      `The "${refName}" ref has been found multiple times.`,
      "Did you forgot to add the `[]` suffix to its name?"
    );
  }
  if (!isMultiple && refs.length <= 1 && !(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.isDefined)(refs[0])) {
    if (_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.isDev) {
      console.warn(
        `[${that.__base.$options.name}]`,
        `The "${refName}" ref is missing.`,
        `Is there an \`[data-ref="${refName}"]\` element in the component's scope?`
      );
    }
    return;
  }
  that.__eventsManager.bindRef(refName, refs);
  Object.defineProperty(that, propName, {
    value: isMultiple || refs.length > 1 ? refs : refs[0],
    enumerable: true,
    configurable: true
  });
}
function __unregister(that, refName) {
  const propName = normalizeRefName(refName);
  const refs = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(that[propName]) ? that[propName] : [that[propName]];
  that.__eventsManager.unbindRef(refName, refs);
}
class RefsManager extends _AbstractManager_js__WEBPACK_IMPORTED_MODULE_1__.AbstractManager {
  get __refs() {
    var _a;
    return (_a = this.__config.refs) != null ? _a : [];
  }
  registerAll() {
    this.__refs.forEach((refName) => __register(this, refName));
  }
  unregisterAll() {
    this.__refs.forEach((refName) => __unregister(this, refName));
  }
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/Base/managers/ServicesManager.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServicesManager": () => (/* binding */ ServicesManager)
/* harmony export */ });
/* harmony import */ var _services_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/services/scroll.js");
/* harmony import */ var _services_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/services/resize.js");
/* harmony import */ var _services_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/services/raf.js");
/* harmony import */ var _services_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/services/pointer.js");
/* harmony import */ var _services_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/services/key.js");
/* harmony import */ var _services_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/services/load.js");
/* harmony import */ var _AbstractManager_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/managers/AbstractManager.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/noop.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};



const SERVICES_MAP = {
  scrolled: _services_index_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  resized: _services_index_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  ticked: _services_index_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  moved: _services_index_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  keyed: _services_index_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  loaded: _services_index_js__WEBPACK_IMPORTED_MODULE_5__["default"]
};
const SERVICE_NAMES = Object.keys(SERVICES_MAP);
class ServicesManager extends _AbstractManager_js__WEBPACK_IMPORTED_MODULE_6__.AbstractManager {
  constructor() {
    super(...arguments);
    __publicField(this, "__customServices", {});
  }
  get __services() {
    return {
      ...this.__customServices,
      ...SERVICES_MAP
    };
  }
  has(service) {
    if (!(((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_7__.isFunction)(this.__base[service]) || this.__base.__hasEvent(service)) && this.__services[service])) {
      return false;
    }
    const { has } = this.__services[service]();
    return has(this.__base.$id);
  }
  get(service) {
    return this.__services[service]().props();
  }
  enable(service) {
    if (this.has(service)) {
      return this.disable.bind(this, service);
    }
    if (!((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_7__.isFunction)(this.__base[service]) || this.__base.__hasEvent(service)) || !this.__services[service]) {
      return _utils_index_js__WEBPACK_IMPORTED_MODULE_8__.noop;
    }
    const serviceInstance = this.__services[service]();
    serviceInstance.add(this.__base.$id, (...args) => {
      this.__base.__callMethod(service, ...args);
    });
    return this.disable.bind(this, service);
  }
  enableAll() {
    return Object.keys(this.__services).map((serviceName) => this.enable(serviceName));
  }
  disableAll() {
    Object.keys(this.__services).forEach((serviceName) => {
      this.disable(serviceName);
    });
  }
  disable(service) {
    if (!this.__services[service]) {
      return;
    }
    const { remove } = this.__services[service]();
    remove(this.__base.$id);
  }
  toggle(service, force) {
    if ((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_7__.isDefined)(force)) {
      if (force && !this.has(service)) {
        this.enable(service);
      }
      if (!force && this.has(service)) {
        this.disable(service);
      }
    } else if (this.has(service)) {
      this.disable(service);
    } else {
      this.enable(service);
    }
  }
  register(name, useFunction) {
    this.__customServices[name] = useFunction;
    this.__base.__addEmits(name);
  }
  unregister(name) {
    if (SERVICE_NAMES.includes(name)) {
      if (_utils_index_js__WEBPACK_IMPORTED_MODULE_7__.isDev) {
        throw new Error(`[ServicesManager] The \`${name}\` core service can not be unregistered.`);
      }
      return;
    }
    this.__base.__removeEmits(name);
    delete this.__customServices[name];
  }
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/Base/utils.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventIsDefinedInConfig": () => (/* binding */ eventIsDefinedInConfig),
/* harmony export */   "eventIsNative": () => (/* binding */ eventIsNative),
/* harmony export */   "getComponentElements": () => (/* binding */ getComponentElements),
/* harmony export */   "getEventTarget": () => (/* binding */ getEventTarget)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");

function getComponentElements(nameOrSelector, element = document) {
  const selector = `[data-component="${nameOrSelector}"]`;
  let elements = [];
  try {
    elements = Array.from(element.querySelectorAll(selector));
  } catch {
  }
  if (elements.length === 0) {
    elements = Array.from(element.querySelectorAll(nameOrSelector));
  }
  return elements;
}
function eventIsDefinedInConfig(event, config) {
  return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(config.emits) && config.emits.includes(event);
}
function eventIsNative(event, element) {
  return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.isDefined)(element[`on${event}`]);
}
function getEventTarget(instance, event, config) {
  if (eventIsDefinedInConfig(event, config)) {
    return instance;
  }
  if (eventIsNative(event, instance.$el)) {
    return instance.$el;
  }
  if (_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.isDev) {
    console.warn(
      `[${config.name}]`,
      `The "${event}" event is missing from the configuration and is not a native`,
      `event for the root element of type \`${instance.$el.constructor.name}\`.`
    );
  }
  return instance;
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/decorators/withMountWhenInView.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "withMountWhenInView": () => (/* binding */ withMountWhenInView)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function withMountWhenInView(BaseClass, defaultOptions = { threshold: [0, 1] }) {
  var _a;
  class WithMountWhenInView extends BaseClass {
    constructor(element) {
      super(element);
      __publicField(this, "__isVisible", false);
      __publicField(this, "__observer");
      this.__observer = new IntersectionObserver(
        (entries) => {
          const isVisible = entries.reduce((acc, entry) => acc || entry.isIntersecting, false);
          if (this.__isVisible !== isVisible) {
            this.__isVisible = isVisible;
            if (isVisible) {
              this.$mount();
            } else {
              setTimeout(() => this.$destroy());
            }
          }
        },
        {
          ...defaultOptions,
          ...this.$options.intersectionObserver
        }
      );
      this.__observer.observe(this.$el);
      this.$on("terminated", () => {
        this.__observer.disconnect();
      });
    }
    $mount() {
      if (this.__isVisible) {
        super.$mount();
      }
      return this;
    }
  }
  __publicField(WithMountWhenInView, "config", {
    ...BaseClass.config,
    name: `${BaseClass.config.name}WithMountWhenInView`,
    options: {
      ...((_a = BaseClass.config) == null ? void 0 : _a.options) || {},
      intersectionObserver: Object
    }
  });
  return WithMountWhenInView;
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/helpers/createApp.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createApp)
/* harmony export */ });
function createApp(App, rootElement = document.body) {
  let isLoaded = document.readyState === "complete";
  let app;
  if (!isLoaded) {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        app = new App(rootElement).$mount();
        isLoaded = true;
      }
    });
  } else {
    app = new App(rootElement).$mount();
  }
  const promise = new Promise((resolve) => {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        setTimeout(() => resolve(app), 0);
      }
    });
  });
  return function useApp() {
    if (isLoaded) {
      return Promise.resolve(app);
    }
    return promise;
  };
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/helpers/importWhenVisible.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ importWhenVisible)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/helpers/utils.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");


function importWhenVisible(fn, nameOrSelectorOrElement, parent, observerOptions = {}) {
  let ResolvedClass;
  const resolver = (resolve, cb) => {
    fn().then((module) => {
      ResolvedClass = "default" in module ? module.default : module;
      resolve(ResolvedClass);
      if ((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(cb)) {
        cb();
      }
    });
  };
  return new Promise((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      const someEntriesAreVisible = entries.some((entry) => entry.isIntersecting);
      if (someEntriesAreVisible) {
        setTimeout(() => {
          resolver(resolve, () => observer.disconnect());
        }, 0);
      }
    }, observerOptions);
    const elements = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.getTargetElements)(nameOrSelectorOrElement, parent == null ? void 0 : parent.$el);
    elements.forEach((element) => observer.observe(element));
  });
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/helpers/utils.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTargetElements": () => (/* binding */ getTargetElements)
/* harmony export */ });
/* harmony import */ var _Base_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/utils.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");


function getTargetElements(nameOrSelectorOrElement, context) {
  if ((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.isString)(nameOrSelectorOrElement)) {
    return (0,_Base_utils_js__WEBPACK_IMPORTED_MODULE_1__.getComponentElements)(nameOrSelectorOrElement, context);
  }
  if (!(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(nameOrSelectorOrElement)) {
    return [nameOrSelectorOrElement];
  }
  return nameOrSelectorOrElement;
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/services/key.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useKey)
/* harmony export */ });
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/services/service.js");
/* harmony import */ var _utils_keyCodes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/keyCodes.js");


function getInitialKeyCodes() {
  return Object.fromEntries(Object.keys(_utils_keyCodes_js__WEBPACK_IMPORTED_MODULE_0__["default"]).map((key2) => [key2, false]));
}
function createKeyService() {
  let previousEvent;
  function updateProps(event) {
    props.event = event;
    Object.entries(_utils_keyCodes_js__WEBPACK_IMPORTED_MODULE_0__["default"]).forEach(([name, code]) => {
      props[name] = code === event.keyCode;
    });
    if (!previousEvent) {
      props.triggered = 0;
    }
    if (props.event.type === "keydown" && (previousEvent == null ? void 0 : previousEvent.type) === "keydown") {
      props.triggered += 1;
    } else {
      props.triggered = 1;
    }
    previousEvent = props.event;
    props.direction = props.event.type === "keydown" ? "down" : "up";
    props.isUp = props.event.type === "keyup";
    props.isDown = props.event.type === "keydown";
    return props;
  }
  function onKey(event) {
    trigger(updateProps(event));
  }
  const { add, remove, has, trigger, props } = (0,_service_js__WEBPACK_IMPORTED_MODULE_1__.useService)({
    props: {
      event: null,
      triggered: 0,
      isUp: false,
      isDown: false,
      direction: "none",
      ...getInitialKeyCodes()
    },
    init() {
      document.addEventListener("keydown", onKey);
      document.addEventListener("keyup", onKey);
    },
    kill() {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keyup", onKey);
    }
  });
  return {
    add,
    remove,
    has,
    props: () => props
  };
}
let key;
function useKey() {
  if (!key) {
    key = createKeyService();
  }
  return key;
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/services/load.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useLoad)
/* harmony export */ });
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/services/service.js");

function createLoadService() {
  function onLoad() {
    props.time = window.performance.now();
    trigger(props);
  }
  const { add, remove, has, props, trigger } = (0,_service_js__WEBPACK_IMPORTED_MODULE_0__.useService)({
    props: {
      time: performance.now()
    },
    init() {
      window.addEventListener("load", onLoad);
    },
    kill() {
      window.removeEventListener("load", onLoad);
    }
  });
  return {
    add,
    remove,
    has,
    props: () => props
  };
}
let load;
function useLoad() {
  if (!load) {
    load = createLoadService();
  }
  return load;
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/services/pointer.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ usePointer)
/* harmony export */ });
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/services/service.js");

function isTouchEvent(event) {
  return typeof TouchEvent !== "undefined" && event instanceof TouchEvent;
}
const events = ["mousemove", "touchmove", "mousedown", "touchstart", "mouseup", "touchend"];
function createPointerService() {
  function updateProps(event) {
    var _a, _b;
    props.event = event;
    const yLast = props.y;
    const xLast = props.x;
    const y = isTouchEvent(event) ? (_a = event.touches[0]) == null ? void 0 : _a.clientY : event.clientY;
    if (y !== props.y) {
      props.y = y;
    }
    const x = isTouchEvent(event) ? (_b = event.touches[0]) == null ? void 0 : _b.clientX : event.clientX;
    if (x !== props.x) {
      props.x = x;
    }
    props.changed.x = props.x !== xLast;
    props.changed.y = props.y !== yLast;
    props.last.x = xLast;
    props.last.y = yLast;
    props.delta.x = props.x - xLast;
    props.delta.y = props.y - yLast;
    props.max.x = window.innerWidth;
    props.max.y = window.innerHeight;
    props.progress.x = props.x / props.max.x;
    props.progress.y = props.y / props.max.y;
    return props;
  }
  function handleEvent(event) {
    switch (event.type) {
      case "mouseenter":
      case "mousemove":
      case "touchmove":
        trigger(updateProps(event));
        break;
      case "mousedown":
      case "touchstart":
        props.isDown = true;
        trigger(props);
        break;
      case "mouseup":
      case "touchend":
        props.isDown = false;
        trigger(props);
        break;
    }
  }
  const { add, remove, has, trigger, props } = (0,_service_js__WEBPACK_IMPORTED_MODULE_0__.useService)({
    props: {
      event: null,
      isDown: false,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      changed: {
        x: false,
        y: false
      },
      last: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      },
      delta: {
        x: 0,
        y: 0
      },
      progress: {
        x: 0.5,
        y: 0.5
      },
      max: {
        x: window.innerWidth,
        y: window.innerHeight
      }
    },
    init() {
      document.documentElement.addEventListener("mouseenter", handleEvent, {
        once: true,
        capture: true
      });
      const options = { passive: true, capture: true };
      events.forEach((event) => {
        document.addEventListener(event, handleEvent, options);
      });
    },
    kill() {
      events.forEach((event) => {
        document.removeEventListener(event, handleEvent);
      });
    }
  });
  return {
    add,
    remove,
    has,
    props: () => props
  };
}
let pointer;
function usePointer() {
  if (!pointer) {
    pointer = createPointerService();
  }
  return pointer;
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/services/raf.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useRaf)
/* harmony export */ });
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/services/service.js");
/* harmony import */ var _utils_nextFrame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/nextFrame.js");
/* harmony import */ var _utils_scheduler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/scheduler.js");
/* harmony import */ var _utils_is_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");




const scheduler = (0,_utils_scheduler_js__WEBPACK_IMPORTED_MODULE_0__.useScheduler)(["update", "render"]);
function createRafService() {
  let isTicking = false;
  const RAF = (0,_utils_nextFrame_js__WEBPACK_IMPORTED_MODULE_1__.getRaf)();
  function trigger(props2) {
    callbacks.forEach(function forEachCallback(callback) {
      scheduler.update(function rafUpdate() {
        const render = callback(props2);
        if ((0,_utils_is_js__WEBPACK_IMPORTED_MODULE_2__.isFunction)(render)) {
          scheduler.render(function rafRender() {
            render(props2);
          });
        }
      });
    });
  }
  function loop() {
    props.time = performance.now();
    trigger(props);
    if (!isTicking) {
      return;
    }
    RAF(loop);
  }
  const { add, remove, has, props, callbacks } = (0,_service_js__WEBPACK_IMPORTED_MODULE_3__.useService)({
    props: {
      time: performance.now()
    },
    init() {
      isTicking = true;
      RAF(loop);
    },
    kill() {
      isTicking = false;
    }
  });
  return {
    add,
    remove,
    has,
    props: () => props
  };
}
let raf;
function useRaf() {
  if (!raf) {
    raf = createRafService();
  }
  return raf;
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/services/resize.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useResize)
/* harmony export */ });
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/services/service.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/debounce.js");


let breakpointElement;
let breakpoints = [];
function getBreakpointElement() {
  if (!breakpointElement) {
    breakpointElement = document.querySelector("[data-breakpoint]");
  }
  return breakpointElement;
}
function getBreakpoint() {
  return getBreakpointElement() ? window.getComputedStyle(getBreakpointElement(), "::before").getPropertyValue("content").replaceAll('"', "") : void 0;
}
function getBreakpoints() {
  if (!getBreakpointElement() || breakpoints.length) {
    return breakpoints;
  }
  breakpoints = window.getComputedStyle(getBreakpointElement(), "::after").getPropertyValue("content").replaceAll('"', "").split(",");
  return breakpoints;
}
function createResizeService() {
  function updateProps() {
    props.width = window.innerWidth;
    props.height = window.innerHeight;
    props.ratio = window.innerWidth / window.innerHeight;
    props.orientation = "square";
    if (props.ratio > 1) {
      props.orientation = "landscape";
    }
    if (props.ratio < 1) {
      props.orientation = "portrait";
    }
    return props;
  }
  const onResize = (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_0__["default"])(() => {
    trigger(updateProps());
  });
  const { add, remove, has, trigger, props } = (0,_service_js__WEBPACK_IMPORTED_MODULE_1__.useService)({
    props: {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.innerWidth / window.innerHeight,
      orientation: "square",
      get breakpoint() {
        return getBreakpoint();
      },
      get breakpoints() {
        return getBreakpoints();
      }
    },
    init() {
      window.addEventListener("resize", onResize);
    },
    kill() {
      window.removeEventListener("resize", onResize);
    }
  });
  return {
    add,
    remove,
    has,
    props: () => props
  };
}
let resize;
function useResize() {
  if (!resize) {
    resize = createResizeService();
  }
  return resize;
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/services/scroll.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useScroll)
/* harmony export */ });
/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/services/service.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/debounce.js");


function createScrollService() {
  function updateProps() {
    const yLast = props.y;
    const xLast = props.x;
    if (window.pageYOffset !== props.y) {
      props.y = window.pageYOffset;
    }
    if (window.pageXOffset !== props.x) {
      props.x = window.pageXOffset;
    }
    props.changed.x = props.x !== xLast;
    props.changed.y = props.y !== yLast;
    props.last.x = xLast;
    props.last.y = yLast;
    props.delta.x = props.x - xLast;
    props.delta.y = props.y - yLast;
    props.max.x = (document.scrollingElement || document.body).scrollWidth - window.innerWidth;
    props.max.y = (document.scrollingElement || document.body).scrollHeight - window.innerHeight;
    props.progress.x = props.max.x === 0 ? 1 : props.x / props.max.x;
    props.progress.y = props.max.y === 0 ? 1 : props.y / props.max.y;
    props.direction.x = props.x > xLast ? "RIGHT" : props.x < xLast ? "LEFT" : "NONE";
    props.direction.y = props.y > yLast ? "DOWN" : props.y < yLast ? "UP" : "NONE";
    return props;
  }
  const onScrollDebounced = (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_0__["default"])(() => {
    trigger(updateProps());
  }, 100);
  function onScroll() {
    trigger(updateProps());
    onScrollDebounced();
  }
  const { add, remove, has, props, trigger } = (0,_service_js__WEBPACK_IMPORTED_MODULE_1__.useService)({
    props: {
      x: window.pageXOffset,
      y: window.pageYOffset,
      changed: {
        x: false,
        y: false
      },
      last: {
        x: window.pageXOffset,
        y: window.pageYOffset
      },
      delta: {
        x: 0,
        y: 0
      },
      max: {
        x: (document.scrollingElement || document.body).scrollWidth - window.innerWidth,
        y: (document.scrollingElement || document.body).scrollHeight - window.innerHeight
      },
      progress: {
        x: 0,
        y: 0
      },
      direction: {
        x: "NONE",
        y: "NONE"
      }
    },
    init() {
      document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    },
    kill() {
      document.removeEventListener("scroll", onScroll);
    }
  });
  return {
    add,
    remove,
    has,
    props: () => props
  };
}
let scroll;
function useScroll() {
  if (!scroll) {
    scroll = createScrollService();
  }
  return scroll;
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/services/service.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useService": () => (/* binding */ useService)
/* harmony export */ });
function useService(options) {
  const callbacks = /* @__PURE__ */ new Map();
  let isInit = false;
  const { init, kill, props } = options;
  function has(key) {
    return callbacks.has(key);
  }
  function get(key) {
    return callbacks.get(key);
  }
  function add(key, callback) {
    if (has(key)) {
      console.warn(`The key \`${key}\` has already been added.`);
      return;
    }
    if (callbacks.size === 0 && !isInit) {
      init();
      isInit = true;
    }
    callbacks.set(key, callback);
  }
  function remove(key) {
    callbacks.delete(key);
    if (callbacks.size === 0 && isInit) {
      kill();
      isInit = false;
    }
  }
  function trigger(p) {
    callbacks.forEach(function forEachCallback(callback) {
      callback(p);
    });
  }
  return {
    callbacks,
    props,
    add,
    remove,
    has,
    get,
    trigger
  };
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/utils/css/classes.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "toggle": () => (/* binding */ toggle)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/css/utils.js");


function setClasses(element, classNames, method, forceToggle) {
  if (!element || !classNames) {
    return;
  }
  const normalizedClassNames = (0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(classNames) ? classNames : classNames.split(" ");
  if (method !== "toggle") {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.eachElements)(element, (el) => el.classList[method](...normalizedClassNames));
  } else {
    normalizedClassNames.forEach(
      (className) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.eachElements)(element, (el) => el.classList[method](className, forceToggle))
    );
  }
}
function add(element, classNames) {
  setClasses(element, classNames, "add");
}
function remove(element, classNames) {
  setClasses(element, classNames, "remove");
}
function toggle(element, classNames, force) {
  setClasses(element, classNames, "toggle", force);
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/utils/css/styles.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "remove": () => (/* binding */ remove)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/css/utils.js");


function setStyles(elementOrElements, styles, method = "add") {
  if (!elementOrElements || !styles || !(0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(styles)) {
    return;
  }
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.eachElements)(elementOrElements, (el) => {
    Object.entries(styles).forEach(([prop, value]) => {
      el.style[prop] = method === "add" ? value : "";
    });
  });
}
function add(elementOrElements, styles) {
  setStyles(elementOrElements, styles);
}
function remove(elementOrElements, styles) {
  setStyles(elementOrElements, styles, "remove");
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/utils/css/transition.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transition),
/* harmony export */   "setClassesOrStyles": () => (/* binding */ setClassesOrStyles)
/* harmony export */ });
/* harmony import */ var _nextFrame_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/nextFrame.js");
/* harmony import */ var _classes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/css/classes.js");
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/css/styles.js");
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/has.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/css/utils.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};






const cache = /* @__PURE__ */ new WeakMap();
class Transition {
  constructor(element) {
    __publicField(this, "isTransitioning", false);
    __publicField(this, "transitionEndHandler", null);
    cache.set(element, this);
  }
  static getInstance(element) {
    let instance = cache.get(element);
    if (!instance) {
      instance = new this(element);
    }
    return instance;
  }
}
function setClassesOrStyles(element, classesOrStyles, method = "add") {
  if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isString)(classesOrStyles) || (0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(classesOrStyles)) {
    _classes_js__WEBPACK_IMPORTED_MODULE_1__[method](element, classesOrStyles);
  } else {
    _styles_js__WEBPACK_IMPORTED_MODULE_2__[method](element, classesOrStyles);
  }
}
function testTransition(element) {
  if (!(0,_has_js__WEBPACK_IMPORTED_MODULE_3__.hasWindow)()) {
    return false;
  }
  const { transitionDuration } = window.getComputedStyle(element);
  return !!transitionDuration && transitionDuration !== "0s";
}
async function start(element, classesOrStyles) {
  const trs = Transition.getInstance(element);
  trs.isTransitioning = true;
  setClassesOrStyles(element, classesOrStyles.from);
  await (0,_nextFrame_js__WEBPACK_IMPORTED_MODULE_4__.nextFrame)();
  setClassesOrStyles(element, classesOrStyles.active);
}
async function next(element, classesOrStyles) {
  const hasTransition = testTransition(element);
  return new Promise(async (resolve) => {
    if (hasTransition) {
      const trs = Transition.getInstance(element);
      trs.transitionEndHandler = resolve;
      element.addEventListener("transitionend", trs.transitionEndHandler, false);
    }
    setClassesOrStyles(element, classesOrStyles.from, "remove");
    setClassesOrStyles(element, classesOrStyles.to);
    await (0,_nextFrame_js__WEBPACK_IMPORTED_MODULE_4__.nextFrame)();
    if (!hasTransition) {
      resolve();
    }
  });
}
function end(element, classesOrStyles, mode = "remove") {
  const trs = Transition.getInstance(element);
  element.removeEventListener("transitionend", trs.transitionEndHandler, false);
  if (mode === "remove") {
    setClassesOrStyles(element, classesOrStyles.to, "remove");
  }
  setClassesOrStyles(element, classesOrStyles.active, "remove");
  trs.isTransitioning = false;
  trs.transitionEndHandler = null;
}
async function singleTransition(element, name, endMode = "remove") {
  const classesOrStyles = (0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isString)(name) ? {
    from: `${name}-from`,
    active: `${name}-active`,
    to: `${name}-to`
  } : {
    from: "",
    active: "",
    to: "",
    ...name
  };
  const trs = Transition.getInstance(element);
  if (trs.isTransitioning) {
    end(element, classesOrStyles);
  }
  await start(element, classesOrStyles);
  await next(element, classesOrStyles);
  end(element, classesOrStyles, endMode);
  return Promise.resolve();
}
async function transition(elementOrElements, name, endMode = "remove") {
  await Promise.all(
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.eachElements)(elementOrElements, (element) => singleTransition(element, name, endMode))
  );
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/utils/css/utils.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eachElements": () => (/* binding */ eachElements)
/* harmony export */ });
function eachElements(elementOrElements, callback) {
  if (elementOrElements instanceof Node) {
    return [callback(elementOrElements)];
  }
  return Array.from(elementOrElements).map(callback);
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/utils/debounce.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(fn, delay = 300) {
  let timeout;
  return function debounced(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/utils/has.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasWindow": () => (/* binding */ hasWindow)
/* harmony export */ });
function hasWindow() {
  return typeof window !== "undefined";
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/utils/is.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isBoolean": () => (/* binding */ isBoolean),
/* harmony export */   "isDefined": () => (/* binding */ isDefined),
/* harmony export */   "isDev": () => (/* binding */ isDev),
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isString": () => (/* binding */ isString)
/* harmony export */ });
const isDev =  true && true;
const isFunction = (value) => typeof value === "function";
const isDefined = (value) => typeof value !== "undefined";
const isString = (value) => typeof value === "string";
const isObject = (value) => typeof value === "object" && !!value && value.toString() === "[object Object]";
const isNumber = (value) => typeof value === "number";
const isBoolean = (value) => typeof value === "boolean";
const isArray = Array.isArray;



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/utils/keyCodes.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ keyCodes_default)
/* harmony export */ });
var keyCodes_default = {
  ENTER: 13,
  SPACE: 32,
  TAB: 9,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/utils/nextFrame.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCancelRaf": () => (/* binding */ getCancelRaf),
/* harmony export */   "getRaf": () => (/* binding */ getRaf),
/* harmony export */   "nextFrame": () => (/* binding */ nextFrame)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/has.js");


function getRaf() {
  return (0,_has_js__WEBPACK_IMPORTED_MODULE_0__.hasWindow)() && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout;
}
function getCancelRaf() {
  return (0,_has_js__WEBPACK_IMPORTED_MODULE_0__.hasWindow)() && window.cancelAnimationFrame ? window.cancelAnimationFrame.bind(window) : clearTimeout;
}
function nextFrame(fn) {
  return new Promise((resolve) => {
    getRaf()(() => resolve((0,_is_js__WEBPACK_IMPORTED_MODULE_1__.isFunction)(fn) && fn()));
  });
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/utils/noop.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "noopValue": () => (/* binding */ noopValue)
/* harmony export */ });
function noop() {
}
function noopValue(value) {
  return value;
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/utils/object/getAllProperties.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAllProperties)
/* harmony export */ });
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");

function getAllProperties(object, props = [], testFn = null) {
  const proto = Object.getPrototypeOf(object);
  if (proto === Object.prototype || proto === null) {
    return props;
  }
  let foundProps = Object.getOwnPropertyNames(proto);
  if ((0,_is_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(testFn)) {
    foundProps = foundProps.filter((name) => testFn(name, proto));
  }
  foundProps = foundProps.map((name) => [name, proto]).reduce((acc, val) => [...acc, val], props);
  return getAllProperties(proto, foundProps, testFn);
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/js-toolkit/utils/scheduler.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domScheduler": () => (/* binding */ domScheduler),
/* harmony export */   "useScheduler": () => (/* binding */ useScheduler)
/* harmony export */ });
function getScheduler(steps) {
  const stepsFns = {};
  const api = {};
  let isScheduled = false;
  const resolvedPromise = Promise.resolve();
  function run(tasks) {
    let task;
    while (task = tasks.shift()) {
      task();
    }
  }
  function flush() {
    steps.forEach(function runStep(step) {
      run(stepsFns[step]);
    });
    isScheduled = false;
    if (steps.reduce((length, step) => length + stepsFns[step].length, 0) > 0) {
      scheduleFlush();
    }
  }
  function scheduleFlush() {
    if (isScheduled) {
      return;
    }
    isScheduled = true;
    resolvedPromise.then(flush);
  }
  steps.forEach((step) => {
    stepsFns[step] = [];
    api[step] = function add(fn) {
      stepsFns[step].push(fn);
      scheduleFlush();
    };
  });
  return api;
}
const instances = /* @__PURE__ */ new Map();
const domSchedulerSteps = ["read", "write", "afterWrite"];
function useScheduler(steps = domSchedulerSteps) {
  const key = steps.join("-");
  if (instances.has(key)) {
    return instances.get(key);
  }
  const scheduler = getScheduler(steps);
  instances.set(key, scheduler);
  return scheduler;
}
const domScheduler = useScheduler(domSchedulerSteps);



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/ui/atoms/Figure/Figure.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Figure": () => (/* binding */ Figure)
/* harmony export */ });
/* harmony import */ var _studiometa_js_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/decorators/withMountWhenInView.js");
/* harmony import */ var _primitives_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/ui/primitives/Transition/Transition.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};


class Figure extends (0,_studiometa_js_toolkit__WEBPACK_IMPORTED_MODULE_0__.withMountWhenInView)(_primitives_index_js__WEBPACK_IMPORTED_MODULE_1__.Transition, {
  threshold: [0, 1]
}) {
  get target() {
    return this.$refs.img;
  }
  get src() {
    return this.$refs.img.src;
  }
  set src(value) {
    this.$refs.img.src = value;
  }
  mounted() {
    const { img } = this.$refs;
    if (!img) {
      throw new Error("[Figure] The `img` ref is required.");
    }
    if (!(img instanceof HTMLImageElement)) {
      throw new Error("[Figure] The `img` ref must be an `<img>` element.");
    }
    const { src } = img.dataset;
    if (this.$options.lazy && src && src !== this.src) {
      let tempImg = new Image();
      tempImg.addEventListener(
        "load",
        async () => {
          this.src = src;
          tempImg = null;
          this.enter();
        },
        { once: true }
      );
      tempImg.src = src;
    }
  }
}
__publicField(Figure, "config", {
  ..._primitives_index_js__WEBPACK_IMPORTED_MODULE_1__.Transition.config,
  name: "Figure",
  refs: ["img"],
  options: {
    ..._primitives_index_js__WEBPACK_IMPORTED_MODULE_1__.Transition.config.options,
    lazy: Boolean
  }
});



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/ui/decorators/withTransition.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "withTransition": () => (/* binding */ withTransition)
/* harmony export */ });
/* harmony import */ var _studiometa_js_toolkit_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/is.js");
/* harmony import */ var _studiometa_js_toolkit_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/css/transition.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

function delegateTransition(elementOrElements, name, endMode) {
  return (0,_studiometa_js_toolkit_utils__WEBPACK_IMPORTED_MODULE_0__.isArray)(elementOrElements) || elementOrElements instanceof NodeList ? Promise.all(
    Array.from(elementOrElements).map((el) => (0,_studiometa_js_toolkit_utils__WEBPACK_IMPORTED_MODULE_1__["default"])(el, name, endMode))
  ) : (0,_studiometa_js_toolkit_utils__WEBPACK_IMPORTED_MODULE_1__["default"])(elementOrElements, name, endMode);
}
function withTransition(BaseClass) {
  class Transition extends BaseClass {
    get target() {
      return this.$el;
    }
    async enter(target) {
      const { enterFrom, enterActive, enterTo, enterKeep, leaveTo } = this.$options;
      await delegateTransition(
        target != null ? target : this.target,
        {
          from: (leaveTo + " " + enterFrom).trim(),
          active: enterActive,
          to: enterTo
        },
        enterKeep && "keep"
      );
    }
    async leave(target) {
      const { leaveFrom, leaveActive, leaveTo, leaveKeep, enterTo } = this.$options;
      await delegateTransition(
        target != null ? target : this.target,
        {
          from: (enterTo + " " + leaveFrom).trim(),
          active: leaveActive,
          to: leaveTo
        },
        leaveKeep && "keep"
      );
    }
  }
  __publicField(Transition, "config", {
    name: "Transition",
    options: {
      enterFrom: String,
      enterActive: String,
      enterTo: String,
      enterKeep: Boolean,
      leaveFrom: String,
      leaveActive: String,
      leaveTo: String,
      leaveKeep: Boolean
    }
  });
  return Transition;
}



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/ui/primitives/Transition/Transition.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transition": () => (/* binding */ Transition)
/* harmony export */ });
/* harmony import */ var _studiometa_js_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/index.js");
/* harmony import */ var _decorators_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/ui/decorators/withTransition.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};


class Transition extends (0,_decorators_index_js__WEBPACK_IMPORTED_MODULE_0__.withTransition)(_studiometa_js_toolkit__WEBPACK_IMPORTED_MODULE_1__.Base) {
}
__publicField(Transition, "config", {
  name: "Transition"
});



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ })

}])
//# sourceMappingURL=vendors.js.map