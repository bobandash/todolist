/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "popperGenerator": () => (/* binding */ popperGenerator)
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = (0,_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__["default"])([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0,_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__["default"])(modifiers);

          if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_7__.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__["default"])(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__["default"])(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBoundingClientRect)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    scaleX = element.offsetWidth > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !(0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__["default"])() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getClippingRect)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element, strategy) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element, strategy)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCompositeRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentElement)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentRect)
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getHTMLElementScroll)
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLayoutRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeName)
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeScroll)
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOffsetParent)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");








function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
  var isIE = /Trident/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(currentNode)) {
    currentNode = currentNode.host;
  }

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getParentNode)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getScrollParent)
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getViewportRect)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getViewportRect(element, strategy) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindow)
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScroll)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScrollBarX)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isElement": () => (/* binding */ isElement),
/* harmony export */   "isHTMLElement": () => (/* binding */ isHTMLElement),
/* harmony export */   "isShadowRoot": () => (/* binding */ isShadowRoot)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isLayoutViewport)
/* harmony export */ });
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__["default"])());
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isScrollParent)
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isTableElement)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listScrollParents)
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterMain": () => (/* binding */ afterMain),
/* harmony export */   "afterRead": () => (/* binding */ afterRead),
/* harmony export */   "afterWrite": () => (/* binding */ afterWrite),
/* harmony export */   "auto": () => (/* binding */ auto),
/* harmony export */   "basePlacements": () => (/* binding */ basePlacements),
/* harmony export */   "beforeMain": () => (/* binding */ beforeMain),
/* harmony export */   "beforeRead": () => (/* binding */ beforeRead),
/* harmony export */   "beforeWrite": () => (/* binding */ beforeWrite),
/* harmony export */   "bottom": () => (/* binding */ bottom),
/* harmony export */   "clippingParents": () => (/* binding */ clippingParents),
/* harmony export */   "end": () => (/* binding */ end),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "main": () => (/* binding */ main),
/* harmony export */   "modifierPhases": () => (/* binding */ modifierPhases),
/* harmony export */   "placements": () => (/* binding */ placements),
/* harmony export */   "popper": () => (/* binding */ popper),
/* harmony export */   "read": () => (/* binding */ read),
/* harmony export */   "reference": () => (/* binding */ reference),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "top": () => (/* binding */ top),
/* harmony export */   "variationPlacements": () => (/* binding */ variationPlacements),
/* harmony export */   "viewport": () => (/* binding */ viewport),
/* harmony export */   "write": () => (/* binding */ write)
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "mapToStyles": () => (/* binding */ mapToStyles)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.right) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (true) {
    var transitionProperty = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.placement),
    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "arrow": () => (/* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "flip": () => (/* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "hide": () => (/* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "offset": () => (/* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"])
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "distanceAndSkiddingToXY": () => (/* binding */ distanceAndSkiddingToXY)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.top, _enums_js__WEBPACK_IMPORTED_MODULE_5__.left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles),
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeAutoPlacement)
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeOffsets)
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectOverflow)
/* harmony export */ });
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.reference);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ expandToHashMap)
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/format.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ format)
/* harmony export */ });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAltAxis)
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBasePlacement)
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getFreshSideObject)
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMainAxisFromPlacement)
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositePlacement)
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositeVariationPlacement)
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getVariation)
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "round": () => (/* binding */ round)
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeByName)
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergePaddingObject)
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ orderModifiers)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rectToClientRect)
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uniqueBy)
/* harmony export */ });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/userAgent.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/userAgent.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUAString)
/* harmony export */ });
function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ validateModifiers)
/* harmony export */ });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

          break;

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (modifier.effect != null && typeof modifier.effect !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "within": () => (/* binding */ within),
/* harmony export */   "withinMaxClamp": () => (/* binding */ withinMaxClamp)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const indexCounter = () => {
    let currIndex = 0;

    function getIndex(){
        return currIndex;
    }

    function incrementIndex() {
        currIndex = currIndex + 1;
    }
    return {getIndex, incrementIndex};
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (indexCounter);

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ "./src/helper.js");


const project = (name, tasks = [], index) => {
    let currTaskIndex = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    
    function getName(){
        return name;
    }

    function getIndex() {
        return index;
    }

    function getTasks(){
        return tasks;
    }

    function setName(newName){
        name = newName;
    }

    function setIndex(newIndex){
        index = newIndex;
    }

    //need to set a unique index for task after it's created
    function addTask(task){
        task.setIndex(currTaskIndex.getIndex());
        tasks.push(task);
        currTaskIndex.incrementIndex();
        return task;
    }

    //removes the task from the task array
    function removeTask(taskIndex){
        tasks.splice(taskIndex, 1);
    }

    return {getName, getIndex, getTasks, setName, setIndex, addTask, removeTask}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (project);

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ "./src/helper.js");

//projects contain tasks, tasks contain subtasks
//for now, we'll follow that hierachy

const storage = (() => {
    //the default projects that can't be removed
    const allProjects = [];
    let currProjectIndex = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    function addProject(project){
        project.setIndex(currProjectIndex.getIndex());
        currProjectIndex.incrementIndex();
        allProjects.push(project);
    }

    function removeProject(projectIndex){
        allProjects.forEach((project, index) => {
            if(project.getIndex() === projectIndex){
                allProjects.splice(index, 1);
            }
        })
    }

    return {allProjects, addProject, removeProject};
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (storage);



/***/ }),

/***/ "./src/subtask.js":
/*!************************!*\
  !*** ./src/subtask.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const subtask = (
    name,
    description,
    index) =>
{

    function setIndex(newIndex){
        index = newIndex;
    }

    function getIndex(){
        return index;
    }

    function getDescription(){
        return description;
    }

    function getName(){
        return name;
    }

    function setName(newName){
        name = newName;
    }

    function setDescription(newDescription){
        description = newDescription;
    }

    return {getIndex, getName, getDescription, setIndex, setName, setDescription};
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (subtask);

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ "./src/helper.js");


const task = (
    name,
    description,
    dueDate,
    estimatedCompletionTime,
    priority,
    subtasks = [],
    index) =>
{

    let currSubtaskIndex = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    
    function getName(){
        return name;
    }

    function getDescription(){
        return description;
    }

    function getDueDate(){
        return dueDate;
    }

    function getEstimatedTime(){
        return estimatedCompletionTime;
    }

    function getIndex(){
        return index;
    }

    function getPriority(){
        return priority;
    }

    function setName(newName){
        name = newName;
    }

    function setDescription(newDescription){
        description = newDescription;
    }

    function setPriority(newPriority){
        priority = newPriority;
    }

    function setDueDate(newDueDate){
        dueDate = newDueDate;
    }

    function setEstimatedTime(newEstTime){
        estimatedCompletionTime = newEstTime;
    }

    function setIndex(taskIndex){
        index = taskIndex;
    }

    function getSubtasks(){
        return subtasks;
    }

    //need to set a unique index for subtask after it's created
    function addSubtask(subtaskObj){
        subtaskObj.setIndex(currSubtaskIndex.getIndex());
        subtasks.push(subtaskObj);
        currSubtaskIndex.incrementIndex();
    }

    function removeSubtask(index){
        subtasks.splice(index, 1);
    }

    function editSubtask(subtaskObj){
        subtasks.forEach((subtask, i) => {
            if(subtask.index === index){
                subtasks[i] = subtaskObj;
                return;
            }
        })
    }

    return {getName, getDescription, getDueDate, getEstimatedTime, getIndex, getPriority, getSubtasks,
            setName, setPriority, setDescription, setDueDate, setEstimatedTime, setIndex, addSubtask, removeSubtask};
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (task);

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task.js */ "./src/task.js");
/* harmony import */ var _subtask_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subtask.js */ "./src/subtask.js");
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var vanillajs_datepicker_Datepicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vanillajs-datepicker/Datepicker */ "./node_modules/vanillajs-datepicker/js/Datepicker.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
//contains all DOM Manipulation that's needed for tasks







//each dom element has a data index that's also in the storage
//these 'data-index' attributes are used to reference the storage arrays

// HTML HELPER FUNCTIONS
function createContainer(element, classes, identifier, childElements, customAttribute){
    const node = document.createElement(element);
    if(classes){
        classes.forEach(item => node.classList.add(item));
    }

    if(identifier){
        node.setAttribute('id',identifier);
    }

    if(childElements){
        childElements.forEach(item => node.appendChild(item))
    }

    if(customAttribute){
        if(customAttribute.length > 1){
            node.setAttribute(customAttribute[0], customAttribute[1]);
        }
    }

    return node;
}

function createTag(element, text, classes, identifier){
    const node = document.createElement(element);
    if(classes){
        classes.forEach(item => node.classList.add(item));
    }

    if(identifier){
        node.setAttribute('id',identifier);
    }

    if(text){
        node.innerText = text;
    }
    return node;
}

function createInput(type, classes, identifier, placeholder, isRequired, isAutoFocus){
    const input = document.createElement('input');
    input.setAttribute('type', type);
    if(identifier){
        input.setAttribute('id', identifier);
    }
    if(placeholder){
        input.setAttribute('placeholder', placeholder);
    }
    if(classes){
        classes.forEach(item => node.classList.add(item));
    }
    if(isRequired ? input.required = true : input.required = false);
    if(isAutoFocus ? input.autofocus = true : input.autofocus = false);
    return input;
}

const skip = (num) => new Array(num);
// END HTML HELPER FUNCTIONS


const ui = (() => {
    function initialRender(){
        addHamburgerMenuBtnFunctionality();
        addHamburgerNavItemsFunctionality();
        renderInbox();
    }

    function renderInbox(){
        const bodyElem = document.querySelector('body');
        const containerDiv = createDOMContainer();
        const inboxProject = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects.filter(project => project.getName() === 'Inbox')[0];
        const header = createDOMProjectHeader(inboxProject);
        const addTaskDiv = createDOMAddTask();
        
        containerDiv.appendChild(header);
        _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects.forEach(project => {
            if(project.getName() === 'Inbox'){
                const tasks = project.getTasks()
                addAllTasksDOM(containerDiv, tasks);
            }
        })
        containerDiv.appendChild(addTaskDiv);
        bodyElem.appendChild(containerDiv);  
    }

    function addHamburgerMenuBtnFunctionality(){
        const hamburgerMenuBtn = document.getElementById('mobile-pop-icon');
        hamburgerMenuBtn.addEventListener('click', function(){
            const sidebar = document.getElementById('hamburger-menu');
            const body = document.querySelector('body');
            if(sidebar.classList.contains('hide')){
                sidebar.classList.remove('hide');
                body.classList.add('opaque-background');
            } else {
                sidebar.classList.add('hide');
                body.classList.remove('opaque-background');
            }
        })
    }

    function addHamburgerNavItemsFunctionality(){
        addDefaultHamburgerNavItemsFunctionality();
        addProjectFunctionality();
    }

    //ads default nav functionalities for inbox, today, and this week
    function addDefaultHamburgerNavItemsFunctionality(){
        const inboxNav = document.querySelector('a[data-project-index="0"]');
/*         const todayNav = document.querySelector('a[data-project-index="1"]');
        const thisWeekNav = document.querySelector('a[data-project-index="2"]'); */
        
        inboxNav.addEventListener('click', function(){
            const container = document.getElementById('container');
            container.remove();
            renderInbox();
        })
    }

    //creates new projects from clicking on the sidebar and typing in a project name
    function addProjectFunctionality(){
        const addProjectNode = document.getElementById('add-project-button');
        addProjectNodeFunctionality(addProjectNode);

        function createAddProjectText(){
            const addProjectLink = createTag('a','+ Add Projects', ...skip(3))
            const addProjectBtn = createContainer('li', skip(1), 'add-project-button', [addProjectLink], skip(1));
            addProjectNodeFunctionality(addProjectBtn);
            return addProjectBtn;
        }

        function addProjectNodeFunctionality(addProjectNode){
            addProjectNode.addEventListener('click', function(){
                addProjectNode.parentNode.insertBefore(createAddProjectForm(), addProjectNode);
                addProjectNode.remove();
            })
        }

        function createAddProjectForm(){
            const addProjectInput = createInput('text', skip(1), 'add-project-name', skip(1), true, true);
            const confirmIcon = createTag('i',skip(1),['fa-solid','fa-sharp','fa-check'], skip(1));
            const cancelIcon = createTag('i',skip(1),['fa-solid','fa-sharp','fa-x'], skip(1));
            const confirmDiv = createContainer('div', skip(1), 'confirm-add-project', [confirmIcon], skip(1));
            const cancelDiv = createContainer('div', skip(1), 'cancel-add-project', [cancelIcon], skip(1));           
            const form = createContainer('form', skip(1), 'add-project-form', [addProjectInput, confirmDiv, cancelDiv], skip(1));

            addCancelBtnFormFunctionality(cancelDiv);
            addConfirmBtnFormFunctionality(form, confirmDiv, addProjectInput);

            return form;
        }

        function addCancelBtnFormFunctionality(cancelDiv){
            cancelDiv.addEventListener('click', function() {
                const form = document.getElementById('add-project-form');
                const addProjectText = createAddProjectText();
                form.parentNode.insertBefore(addProjectText, form);
                form.remove();
            })
        }

        function addConfirmBtnFormFunctionality(form, confirmDiv, projectNameInput){
            confirmDiv.addEventListener('click', createNewProject)
            form.addEventListener('keydown', function(event){
                if(event.key === 'Enter'){
                    createNewProject();
                }
            })

            function createNewProject(){
                    const form = document.getElementById('add-project-form');
                    const projectName = projectNameInput.value;
                    if(projectName){
                        let newProject = (0,_project_js__WEBPACK_IMPORTED_MODULE_4__["default"])(projectName);
                        _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(newProject);
                        const projectLink = createProjectNode(newProject);
                        const addProjectText = createAddProjectText();
                        form.parentNode.insertBefore(projectLink, form);
                        form.parentNode.insertBefore(addProjectText, form);
                        form.remove();
                    }
                }
        }

        //element that contains project name, if clicked on then clear all tasks and load the relevant tasks
        function createProjectNode(projectObject){
            const projectLink = document.createElement('a');
            projectLink.innerText = projectObject.getName();
            projectLink.setAttribute('data-project-index', projectObject.getIndex());
            
            const projectLinkContainer = createContainer('li', skip(1), skip(1), [projectLink], skip(1));
            projectLinkContainer.appendChild(projectLink);
            addProjectLinkEventListener();

            function addProjectLinkEventListener(){
                projectLinkContainer.addEventListener('click', addProject);

                function addProject(){
                    clearAllTasksDOM();
                    container.appendChild(createDOMProjectHeader(projectObject));

                    const projectIndexArray = storageLookups.getProjectIndex();
                    const relevantTasks = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectIndexArray].getTasks();
                    addAllTasksDOM(container, relevantTasks);
                    container.appendChild(createDOMAddTask());
                }

            }

            return projectLinkContainer;
        }
    }

    //entire container that holds all the tasks, unique id is container
    function createDOMContainer(){
        return createContainer('div', skip(1), 'container', ...skip(2));
    }

    //the text that contains the project name
    function createDOMProjectHeader(project){
        const header = createTag('h1', project.getName(), ['header-type'], skip(1));
        return createContainer('div', skip(1), 'project-header', [header], ['data-project-index', project.getIndex()]);
    }

    //creates the div that when clicked, the add new task form appears
    function createDOMAddTask(){
        const plusIcon = createTag('i', skip(1), ['fa','fa-plus', 'pointer'], skip(1));
        const addTaskText = createTag('div', 'Add Task', ['add-task-text'], skip(1));
        const addTaskDiv = createContainer('div', ['pointer'], 'add-task-clickable-div', [plusIcon, addTaskText], skip(1));
        addTaskDiv.addEventListener('click', function(){
            if(hasForm()){
                revertForm();
            }
            const container = document.getElementById('container');
            const addTaskForm = createDOMTaskForm('add');
            container.appendChild(addTaskForm);
            addTaskDiv.remove();
        }, {once: true})

        return addTaskDiv;
    }

    //stylistic decision to only have one form display at a time in to do list
    //helper functions for forms
    function hasForm(){
        if(document.getElementById('task-form')){
            return true;
        }
        return false;
    }

    //removes the existing form and for edit forms, remove the invisible id from task/subtask
    function revertForm(){
        const form = document.getElementById('task-form');
        const invisibleElement = document.getElementById('invisible');
        const addTaskDiv = document.getElementById('add-task-clickable-div');
        if(invisibleElement){
            invisibleElement.setAttribute('id','');
        }
        if(!addTaskDiv){
            const container = document.getElementById('container');
            container.appendChild(createDOMAddTask());
        }
        form.remove();
    }

    //creates the form that when submitted, adds a new task to the dom
    function createDOMTaskForm(type){
        const nameInput = createInput('text', skip(1), 'name', 'Name', true, true);
        const descriptionInput = createInput('text', skip(1), 'description', 'Description', false, false);
        
        const priorityDiv = getPopoverIcons('priority-btn', 'fa-flag', 'Priority');
        const dueDateDiv = getPopoverIcons('due-date-btn', 'fa-calendar','Due Date');
        const estimatedTimeDiv = getPopoverIcons('est-completion-time-btn', 'fa-clock', 'Est Time');        
        const popoverContainer = createContainer('div', ['popover-icons-div'], skip(1), [priorityDiv, dueDateDiv, estimatedTimeDiv], skip(1));
 
        addPriorityPopoverEventListener(priorityDiv, popoverContainer);
        addDueDatePopoverEventListener(dueDateDiv, popoverContainer);

        //buttons for form actions
        const cancelBtn = createTag('button','Cancel', skip(1), 'cancel-task-form');
        const submitBtn = createTag('button','Confirm', skip(1), 'submit-task-form');
        const formActionBtnsContainer = createContainer('div', skip(1), 'form-actions-div', [cancelBtn, submitBtn]);

        const form = createContainer('div', skip(1), 'task-form', [nameInput, descriptionInput, popoverContainer, formActionBtnsContainer], skip(1));
        
        //add all button functionalities
        if(type === 'add'){
            addCancelAddTaskBtnFunctionality();
            addSubmitAddTaskBtnFunctionality();
        }
        else if(type === 'edit'){
            addCancelEditTaskBtnFunctionality();
            addSubmitEditTaskFunctionality();
        }


        return form;

        //for priority, due date, and estimated time popovers
        function getPopoverIcons(divId, iconClass, text){
            const containerDiv = document.createElement('div');
            containerDiv.setAttribute('id',divId);
            containerDiv.classList.add('task-form-icons');
            const icon = document.createElement('i');
            const iconText = document.createTextNode(' ' + text);
            icon.classList.add('fa-regular',iconClass);
            containerDiv.appendChild(icon);
            containerDiv.appendChild(iconText);
            return containerDiv;
        }

        //when clicking priority options div
        function addPriorityPopoverEventListener(priorityDiv, parentDiv){
            priorityDiv.addEventListener('click', function(){
                if(isActive(priorityDiv)){
                    removeActivePopovers();
                }
                else {
                    const priority1 = getPriorityOption(1);
                    const priority2 = getPriorityOption(2);
                    const priority3 = getPriorityOption(3);
                    const priorityContainer = createContainer('div',['popover-container','active-popover'], 'priority-options', [priority1, priority2, priority3], skip(1));
                    (0,_popperjs_core__WEBPACK_IMPORTED_MODULE_5__.createPopper)(priorityDiv, priorityContainer, {placement: 'bottom'});
                    parentDiv.appendChild(priorityContainer);
                }
                toggleActive(priorityDiv);
            })
        }

        function getPriorityOption(priorityNumber){
            const priorityOptionDiv = document.createElement('div');
            const priorityIcon = document.createElement('i');
            priorityIcon.classList.add('fa-solid','fa-flag','icon');
            switch(priorityNumber){
                case 1:
                    priorityIcon.classList.add('icon-red');
                    break;
                case 2:
                    priorityIcon.classList.add('icon-yellow');
                    break;
                case 3:
                    priorityIcon.classList.add('icon-green');
                    break;
            }
            const iconText = document.createTextNode(' Priority');
            priorityOptionDiv.appendChild(priorityIcon);
            priorityOptionDiv.appendChild(iconText);
            priorityOptionDiv.addEventListener('click', function() {
                changePriorityIcon(priorityIcon);
                addPriorityDataAttribute(priorityNumber);
                removeActivePopovers();
            })
            return priorityOptionDiv;
        }

        function changePriorityIcon(newPriorityIcon){
            const priorityBtn = document.getElementById('priority-btn');
            const oldPriorityIcon = priorityBtn.querySelector('i');
            oldPriorityIcon.parentNode.replaceChild(newPriorityIcon, oldPriorityIcon);
        }

        function addPriorityDataAttribute(priorityNumber){
            const priorityOptionsDiv = document.getElementById('priority-btn');
            priorityOptionsDiv.setAttribute('data-priority-number', priorityNumber);
        }

        function addDueDatePopoverEventListener(dueDateDiv, parentDiv){
            dueDateDiv.addEventListener('click', function(){
                removeActivePopovers();
                const spanHelper = createTag('span', skip(1), ['active-popover'], skip(1));
                const datepicker = new vanillajs_datepicker_Datepicker__WEBPACK_IMPORTED_MODULE_3__["default"](spanHelper, {
                    onSelect: (instance, date) => {
                        removeActivePopovers();
                        // Do stuff when a date is selected (or unselected) on the calendar.
                        // You have access to the datepicker instance for convenience.
                    },
                    minDate: new Date()
                }); 
                (0,_popperjs_core__WEBPACK_IMPORTED_MODULE_5__.createPopper)(dueDateDiv, spanHelper, {placement: 'bottom'});
                parentDiv.appendChild(spanHelper);
            })
        }

        //checks if element has active-popover class
        function isActive(element){
            if(element.classList.contains('active')){
                return true;
            }
            return false;
        }

        function toggleActive(element){
            if(element.classList.contains('active')){
                element.classList.remove('active');
            } else {
                element.classList.add('active');
            }
        }

        //if there's any active popovers, remove the popover
        //determined by class name 'active-popover'
        function removeActivePopovers(){
            const activePopovers = Array.from(document.getElementsByClassName('active-popover'));
            if(activePopovers.length > 0){
                activePopovers.forEach(popover => {
                popover.remove();
            })}
        }

        //removes the form and adds the add task text back
        function addCancelAddTaskBtnFunctionality(){
            cancelBtn.addEventListener('click', function(){
                form.remove();
                const container = document.getElementById('container');
                container.appendChild(createDOMAddTask());
            }, {once:true});
        }

        //removes the form and adds the task dom
        //need to add error message of some sort when there's no text in the name field
        function addSubmitAddTaskBtnFunctionality(){
            submitBtn.addEventListener('click', function(){
                const nameField = document.getElementById('name').value;
                const descriptionField = document.getElementById('description').value;
                const priorityNumber = document.getElementById('priority-btn').getAttribute('data-priority-number');
                if(nameField){
                    const container = document.getElementById('container');

                    let projectIndexInArray = storageLookups.getProjectIndex();
                    let newTask = (0,_task_js__WEBPACK_IMPORTED_MODULE_1__["default"])(nameField, descriptionField, '', '', priorityNumber);
                    newTask = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectIndexInArray].addTask(newTask);

                    let newTaskDOM = createDOMTask(newTask);
                    const addTaskElem = createDOMAddTask();                    
                    container.appendChild(newTaskDOM);
                    container.appendChild(addTaskElem);
                    form.remove();
                } 
            })          
        }

        function addCancelEditTaskBtnFunctionality(){
            cancelBtn.addEventListener('click', function(){
                const invisibleTask = document.getElementById('invisible');
                invisibleTask.removeAttribute('id');
                form.remove();
            })
        }

        function addSubmitEditTaskFunctionality(){
            submitBtn.addEventListener('click', function(){                
                const nameField = document.getElementById('name').value;
                const descriptionField = document.getElementById('description').value;
                const priorityNumber = document.getElementById('priority-btn').getAttribute('data-priority-number');
                const invisibleTaskElement = document.getElementById('invisible');

                if(nameField){
                    const currentTaskDataIndex = invisibleTaskElement.getAttribute('data-task-index');
                    const projectIndexInArray = storageLookups.getProjectIndex();
                    const taskIndexInArray = storageLookups.getTaskIndex(projectIndexInArray, currentTaskDataIndex);
                    const currentTask = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectIndexInArray].getTasks()[taskIndexInArray];
                    currentTask.setName(nameField)
                    currentTask.setDescription(descriptionField)
                    currentTask.setPriority(priorityNumber);
                    
                    const newTaskDOM = createDOMTask(currentTask);
                    invisibleTaskElement.parentNode.insertBefore(newTaskDOM, invisibleTaskElement);
                    invisibleTaskElement.remove();
                    form.remove();
                }               
            })
        }
    }


    function createDOMSubtaskForm(type){
        const nameInput = createInput('text', skip(1), 'name', 'Name', true, true);
        const descriptionInput = createInput('text', skip(1), 'description', 'Description', false, false);
        //buttons for form actions
        const cancelBtn = createTag('button','Cancel', skip(1), 'cancel-task-form');
        const submitBtn = createTag('button','Confirm', skip(1), 'submit-task-form');
        const formActionBtnsContainer = createContainer('div', skip(1), 'form-actions-div', [cancelBtn, submitBtn]);

        const form = createContainer('div', skip(1), 'task-form', [nameInput, descriptionInput, formActionBtnsContainer], skip(1));

        if(type === 'add'){
            addCancelAddTaskBtnFunctionality();
            addSubmitAddTaskBtnFunctionality();
        }
        else if(type === 'edit'){
            addCancelEditTaskBtnFunctionality();
            addSubmitEditTaskFunctionality();
        }        

        return form;

        function addCancelAddTaskBtnFunctionality(){
            cancelBtn.addEventListener('click', function(){
                form.remove();
            })
        }

        function addSubmitAddTaskBtnFunctionality(){
            submitBtn.addEventListener('click', function(){
                const nameField = document.getElementById('name').value;
                const descriptionField = document.getElementById('description').value;
                if(nameField){
                    let newSubtask = (0,_subtask_js__WEBPACK_IMPORTED_MODULE_2__["default"])(nameField, descriptionField);

                    const projectArrayIndex = storageLookups.getProjectIndex();
                    const dataTaskIndex = form.getAttribute('data-task-index');
                    const taskArrayIndex = storageLookups.getTaskIndex(projectArrayIndex, dataTaskIndex);
                    const currentTaskInStorage = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectArrayIndex].getTasks()[taskArrayIndex];
                    
                    currentTaskInStorage.addSubtask(newSubtask);

                    const subtaskDOM = createDOMSubtask(newSubtask, dataTaskIndex);
                    form.parentNode.insertBefore(subtaskDOM, form);
                    form.remove();
                }
            })
        }

        function addCancelEditTaskBtnFunctionality(){
            cancelBtn.addEventListener('click', function(){
                const invisibleTask = document.getElementById('invisible');
                invisibleTask.removeAttribute('id');
                form.remove();
            })
        }

        function addSubmitEditTaskFunctionality(){
            submitBtn.addEventListener('click', function(){
                const invisibleTaskElement = document.getElementById('invisible');
                const taskDataIndex = form.getAttribute('data-task-index');
                const subtaskDataIndex = form.getAttribute('data-subtask-index');
    
                const projectArrayIndex = storageLookups.getProjectIndex();
                const taskArrayIndex = storageLookups.getTaskIndex(projectArrayIndex, taskDataIndex);
                const subtaskArrayIndex = storageLookups.getSubtaskIndex(projectArrayIndex, taskArrayIndex, subtaskDataIndex)
                const currentSubtask = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectArrayIndex].getTasks()[taskArrayIndex].getSubtasks()[subtaskArrayIndex];

                const nameField = document.getElementById('name').value;
                const descriptionField = document.getElementById('description').value;
                if(nameField){
                    currentSubtask.setName(nameField);
                    if(descriptionField){
                        currentSubtask.setDescription(descriptionField);
                    }
                    const newSubtaskDOM = createDOMSubtask(currentSubtask);
                    invisibleTaskElement.parentNode.insertBefore(newSubtaskDOM, invisibleTaskElement);
                    invisibleTaskElement.remove();
                    form.remove();

                }
            })
        }


    }

    //creates the task dom
    function createDOMTask(taskObj){
        const completeTaskIcon = createTag('i',skip(1), ['fa-regular','fa-circle', 'pointer']);
        const completeTaskDiv = createContainer('div', ['complete-task-btn'], skip(1), [completeTaskIcon], skip(1));

        const taskInformationDiv = createTag('div', taskObj.getName(), ['task-title'], skip(1));

        const addSubtaskIcon = createTag('i', skip(1), ['fa-solid','fa-square-plus', 'pointer'], skip(1));
        const editIcon = createTag('i', skip(1), ['fa-solid','fa-pen-to-square', 'pointer'], skip(1));
        const deleteIcon = createTag('i', skip(1), ['fa-solid','fa-trash', 'pointer'], skip(1));      
        const iconContainer = createContainer('div', ['button-icons'], skip(1), [addSubtaskIcon, editIcon, deleteIcon], skip(1));

        if(taskObj.getEstimatedTime()){
            const taskEstimatedTime = createTag('div',`Est Time: ${taskObj.getEstimatedTime()}`, ['task-estimated-time'], skip(1));
            taskInformationDiv.appendChild(taskEstimatedTime);
        }
        if(taskObj.getDescription()){
            const taskDescription = createTag('div',taskObj.getDescription(), ['task-description'], skip(1));
            taskInformationDiv.appendChild(taskDescription);
        }

        const taskDOM = createContainer('div', ['task'], '', [completeTaskDiv, taskInformationDiv, iconContainer], ['data-task-index', taskObj.getIndex()]);
        
        addPriorityColor(completeTaskIcon, taskObj.getPriority());
        addCompleteTaskIconFunctionality();
        addDeleteIconFunctionality();
        addEditIconFunctionality();
        addSubtaskIconFunctionality();

        //change the bullet point color
        function addPriorityColor(icon, priorityNumber){
            switch(priorityNumber){
                case '1':
                    icon.classList.add('icon-red');
                    break;
                case '2':
                    icon.classList.add('icon-yellow');
                    break;
                case '3':
                    icon.classList.add('icon-green');
                    break;
            }          
        }

        function makeSolidIcon(icon){
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid','icon');
        }

        //useful helper functions for icon operations
        function getTaskFromChildNode(node){
            if(!node.classList.contains('task')){
            {
                while(!node.parentNode.classList.contains('task')){
                    node = node.parentNode;
                }
                node = node.parentNode;
            }
            return node;
            }
        }

        function getStorageProjectIndex(){
            const projectIndex = document.getElementById('project-header').getAttribute('data-project-index');
            const projectArrayIndex = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects.findIndex(project => project.getIndex() == projectIndex);
            return projectArrayIndex;
        }

        function getStorageTaskIndex(projectIndex, taskElement){
            const taskIndex = taskElement.getAttribute('data-task-index');
            const taskArrayIndex = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectIndex].getTasks().findIndex(task => task.getIndex() == taskIndex);
            return taskArrayIndex;
        }

        //end useful helper functions for icon operations

        //for completing a task and deleting a task
        //complete and delete task are the same functionality for now
        function addCompleteTaskIconFunctionality(){
            completeTaskIcon.addEventListener('click', function() {
                removeRelevantTasksAndSubtasksDOM();
                removeTaskFromStorage();
                taskDOM.remove();
            })
        }
        
        function addDeleteIconFunctionality(){
            deleteIcon.addEventListener('click', function() {
                removeRelevantTasksAndSubtasksDOM();
                removeTaskFromStorage();
                taskDOM.remove();
            }) 
        }

        function removeTaskFromStorage(){
            const storageProjectIndex = getStorageProjectIndex();
            const storageTaskIndex = getStorageTaskIndex(storageProjectIndex, taskDOM);
            //calls the remove task in project.js
            _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[storageProjectIndex].removeTask(storageTaskIndex);
        }

        function removeRelevantTasksAndSubtasksDOM(){
            const taskIndex = taskObj.getIndex();
            const allDOMToRemove = Array.from(document.querySelectorAll(`[data-task-index='${taskIndex}']`));
            allDOMToRemove.forEach(node => {{
                node.remove();
            }})
        }

        //end for completing a task and deleting a task


        //for editing a task
        function addEditIconFunctionality(){
            editIcon.addEventListener('click', function() {
                if(hasForm()){
                    revertForm();
                }
                const taskElement = getTaskFromChildNode(editIcon);
                const taskForm = createDOMTaskForm('edit');

                const storageProjectIndex = getStorageProjectIndex();
                const storageTaskIndex = getStorageTaskIndex(storageProjectIndex, taskElement);
                const currentTaskObject = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[storageProjectIndex].getTasks()[storageTaskIndex];

                taskElement.parentNode.insertBefore(taskForm, taskElement.nextSibling);
                taskElement.setAttribute('id','invisible');

                document.getElementById('name').value = currentTaskObject.getName();
                document.getElementById('description').value = currentTaskObject.getDescription();
                const priorityIcon = document.querySelector('#priority-btn > i');
                if(currentTaskObject.getPriority()){
                    addPriorityColor(priorityIcon, currentTaskObject.getPriority());
                    makeSolidIcon(priorityIcon);
                }
            })
        }
        //end for editing a task

        function addSubtaskIconFunctionality(){
            addSubtaskIcon.addEventListener('click', function(){
                if(hasForm()){
                    revertForm();
                }
                const lastSubtaskOrTask = getLastRelevantTaskElement();
                const subtaskForm = createDOMSubtaskForm('add');
                subtaskForm.setAttribute('data-task-index', taskDOM.getAttribute('data-task-index'));
                lastSubtaskOrTask.parentNode.insertBefore(subtaskForm, lastSubtaskOrTask.nextSibling);
            })
        }

        //get last subtask or task element that has the same task index
        //subtask form should be appended at the last subtask of the dom
        //
        function getLastRelevantTaskElement(){
            const allElementsWithDataTaskIndex = Array.from(document.querySelectorAll(`[data-task-index='${taskObj.getIndex()}']`));
            return allElementsWithDataTaskIndex[allElementsWithDataTaskIndex.length-1];
        }

        return taskDOM;
    }

    //creates the subtask dom
    const createDOMSubtask = (subtaskObj, dataTaskIndex) => {
        const completeTaskIcon = createTag('i',skip(1), ['fa-regular','fa-circle', 'pointer']);
        const completeTaskDiv = createContainer('div', ['complete-task-btn'], skip(1), [completeTaskIcon], skip(1));

        const taskInformation = createTag('div', subtaskObj.getName(), ['task-title'], skip(1));
        if(subtaskObj.getDescription()){
            const description = createTag('div', subtaskObj.getDescription(), ['task-description'], skip(1));
            taskInformation.appendChild(description);
        }
        
        const editIcon = createTag('i', skip(1), ['fa-solid','fa-pen-to-square', 'pointer'], skip(1));
        const deleteIcon = createTag('i', skip(1), ['fa-solid','fa-trash', 'pointer'], skip(1));      
        const iconContainer = createContainer('div', ['button-icons'], skip(1), [editIcon, deleteIcon], skip(1));    

        const subtask = createContainer('div', ['subtask'], '', [completeTaskDiv, taskInformation, iconContainer], skip(1)) 
        subtask.setAttribute('data-task-index', dataTaskIndex);
        subtask.setAttribute('data-subtask-index', subtaskObj.getIndex());

        addCompleteTaskEventListener();
        addDeleteTaskEventListener();
        addEditTaskEventListener();
        return subtask;


        function addCompleteTaskEventListener(){
            completeTaskIcon.addEventListener('click', function(){
                const taskDataIndex = subtask.getAttribute('data-task-index');
                const subtaskDataIndex = subtask.getAttribute('data-subtask-index');
    
                const projectArrayIndex = storageLookups.getProjectIndex();
                const taskArrayIndex = storageLookups.getTaskIndex(projectArrayIndex, taskDataIndex);
                const subtaskArrayIndex = storageLookups.getSubtaskIndex(projectArrayIndex, taskArrayIndex, subtaskDataIndex)
                _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectArrayIndex].getTasks()[taskDataIndex].removeSubtask(subtaskArrayIndex);
                subtask.remove();
            })
        }

        function addDeleteTaskEventListener(){
            deleteIcon.addEventListener('click', function(){
                const taskDataIndex = subtask.getAttribute('data-task-index');
                const subtaskDataIndex = subtask.getAttribute('data-subtask-index');
    
                const projectArrayIndex = storageLookups.getProjectIndex();
                const taskArrayIndex = storageLookups.getTaskIndex(projectArrayIndex, taskDataIndex);
                const subtaskArrayIndex = storageLookups.getSubtaskIndex(projectArrayIndex, taskArrayIndex, subtaskDataIndex)
                _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectArrayIndex].getTasks()[taskDataIndex].removeSubtask(subtaskArrayIndex);
                subtask.remove();
            })           
        }

        function addEditTaskEventListener(){
            editIcon.addEventListener('click', function(){
                if(hasForm()){
                    revertForm();
                }
                subtask.setAttribute('id','invisible');
                const subtaskForm = createDOMSubtaskForm('edit');
                subtaskForm.setAttribute('data-task-index', dataTaskIndex);
                subtaskForm.setAttribute('data-subtask-index', subtaskObj.getIndex());
                subtask.parentNode.insertBefore(subtaskForm, subtask);
                document.getElementById('name').value = subtaskObj.getName();
                document.getElementById('description').value = subtaskObj.getDescription();
            })
        }

    }

    //adds all dom of tasks and subtasks in a project
    function addAllTasksDOM(container, tasks){
        tasks.forEach(task => {
            container.appendChild(createDOMTask(task));
            const allSubtasks = task.getSubtasks();
            allSubtasks.forEach(subtask => {
                container.appendChild(createDOMSubtask(subtask, task.getIndex()));
            })
        })
    }

    const clearAllTasksDOM = () => {
        const containerDiv = document.getElementById('container');
        while(containerDiv.firstChild){
            containerDiv.removeChild(containerDiv.firstChild);   
        }
    }

    //find the array indicies of projects, tasks, and subtasks
    const storageLookups = (() => {
        //returns index of project in all projects array
        function getProjectIndex(){
            let projectIndexInArray = 0;
            let projectDataIndex = document.getElementById('project-header').getAttribute('data-project-index');
            _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects.forEach((project, index) => {
                if(project.getIndex() == projectDataIndex){
                    projectIndexInArray = index;
                }
            })
            return projectIndexInArray;
        }

        //returns index of task in all tasks array
        function getTaskIndex(projectIndex, taskDataIndex){
            let currentProjectTasks = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectIndex].getTasks();
            return currentProjectTasks.findIndex(task => task.getIndex() == taskDataIndex);
        }

        function getSubtaskIndex(projectIndex, taskIndex, subtaskDataIndex){
            let currentProjectSubtasks = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectIndex].getTasks()[taskIndex].getSubtasks();
            return currentProjectSubtasks.findIndex(subtask => subtask.getIndex() == subtaskDataIndex);
        }

        return {getProjectIndex, getTaskIndex, getSubtaskIndex}
    })();

    return {initialRender};

})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ui);

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/Datepicker.js":
/*!************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/Datepicker.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Datepicker)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/date-format.js */ "./node_modules/vanillajs-datepicker/js/lib/date-format.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _lib_event_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/event.js */ "./node_modules/vanillajs-datepicker/js/lib/event.js");
/* harmony import */ var _i18n_base_locales_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./i18n/base-locales.js */ "./node_modules/vanillajs-datepicker/js/i18n/base-locales.js");
/* harmony import */ var _options_defaultOptions_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./options/defaultOptions.js */ "./node_modules/vanillajs-datepicker/js/options/defaultOptions.js");
/* harmony import */ var _options_processOptions_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./options/processOptions.js */ "./node_modules/vanillajs-datepicker/js/options/processOptions.js");
/* harmony import */ var _picker_Picker_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./picker/Picker.js */ "./node_modules/vanillajs-datepicker/js/picker/Picker.js");
/* harmony import */ var _events_functions_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./events/functions.js */ "./node_modules/vanillajs-datepicker/js/events/functions.js");
/* harmony import */ var _events_inputFieldListeners_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./events/inputFieldListeners.js */ "./node_modules/vanillajs-datepicker/js/events/inputFieldListeners.js");
/* harmony import */ var _events_otherListeners_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./events/otherListeners.js */ "./node_modules/vanillajs-datepicker/js/events/otherListeners.js");













function stringifyDates(dates, config) {
  return dates
    .map(dt => (0,_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__.formatDate)(dt, config.format, config.locale))
    .join(config.dateDelimiter);
}

// parse input dates and create an array of time values for selection
// returns undefined if there are no valid dates in inputDates
// when origDates (current selection) is passed, the function works to mix
// the input dates into the current selection
function processInputDates(datepicker, inputDates, clear = false) {
  // const {config, dates: origDates, rangepicker} = datepicker;
  const {config, dates: origDates, rangeSideIndex} = datepicker;
  if (inputDates.length === 0) {
    // empty input is considered valid unless origiDates is passed
    return clear ? [] : undefined;
  }

  // const rangeEnd = rangepicker && datepicker === rangepicker.datepickers[1];
  let newDates = inputDates.reduce((dates, dt) => {
    let date = (0,_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__.parseDate)(dt, config.format, config.locale);
    if (date === undefined) {
      return dates;
    }
    // adjust to 1st of the month/Jan 1st of the year
    // or to the last day of the monh/Dec 31st of the year if the datepicker
    // is the range-end picker of a rangepicker
    date = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.regularizeDate)(date, config.pickLevel, rangeSideIndex);
    if (
      (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.isInRange)(date, config.minDate, config.maxDate)
      && !dates.includes(date)
      && !config.datesDisabled.includes(date)
      && (config.pickLevel > 0 || !config.daysOfWeekDisabled.includes(new Date(date).getDay()))
    ) {
      dates.push(date);
    }
    return dates;
  }, []);
  if (newDates.length === 0) {
    return;
  }
  if (config.multidate && !clear) {
    // get the synmetric difference between origDates and newDates
    newDates = newDates.reduce((dates, date) => {
      if (!origDates.includes(date)) {
        dates.push(date);
      }
      return dates;
    }, origDates.filter(date => !newDates.includes(date)));
  }
  // do length check always because user can input multiple dates regardless of the mode
  return config.maxNumberOfDates && newDates.length > config.maxNumberOfDates
    ? newDates.slice(config.maxNumberOfDates * -1)
    : newDates;
}

// refresh the UI elements
// modes: 1: input only, 2, picker only, 3 both
function refreshUI(datepicker, mode = 3, quickRender = true) {
  const {config, picker, inputField} = datepicker;
  if (mode & 2) {
    const newView = picker.active ? config.pickLevel : config.startView;
    picker.update().changeView(newView).render(quickRender);
  }
  if (mode & 1 && inputField) {
    inputField.value = stringifyDates(datepicker.dates, config);
  }
}

function setDate(datepicker, inputDates, options) {
  let {clear, render, autohide, revert} = options;
  if (render === undefined) {
    render = true;
  }
  if (!render) {
    autohide = false;
  } else if (autohide === undefined) {
    autohide = datepicker.config.autohide;
  }

  const newDates = processInputDates(datepicker, inputDates, clear);
  if (!newDates && !revert) {
    return;
  }
  if (newDates && newDates.toString() !== datepicker.dates.toString()) {
    datepicker.dates = newDates;
    refreshUI(datepicker, render ? 3 : 1);
    (0,_events_functions_js__WEBPACK_IMPORTED_MODULE_9__.triggerDatepickerEvent)(datepicker, 'changeDate');
  } else {
    refreshUI(datepicker, 1);
  }

  if (autohide) {
    datepicker.hide();
  }
}

/**
 * Class representing a date picker
 */
class Datepicker {
  /**
   * Create a date picker
   * @param  {Element} element - element to bind a date picker
   * @param  {Object} [options] - config options
   * @param  {DateRangePicker} [rangepicker] - DateRangePicker instance the
   * date picker belongs to. Use this only when creating date picker as a part
   * of date range picker
   */
  constructor(element, options = {}, rangepicker = undefined) {
    element.datepicker = this;
    this.element = element;

    const config = this.config = Object.assign({
      buttonClass: (options.buttonClass && String(options.buttonClass)) || 'button',
      container: null,
      defaultViewDate: (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.today)(),
      maxDate: undefined,
      minDate: undefined,
    }, (0,_options_processOptions_js__WEBPACK_IMPORTED_MODULE_7__["default"])(_options_defaultOptions_js__WEBPACK_IMPORTED_MODULE_6__["default"], this));
    // configure by type
    const inline = this.inline = element.tagName !== 'INPUT';
    let inputField;
    if (inline) {
      config.container = element;
    } else {
      if (options.container) {
        // omit string type check because it doesn't guarantee to avoid errors
        // (invalid selector string causes abend with sytax error)
        config.container = options.container instanceof HTMLElement
          ? options.container
          : document.querySelector(options.container);
      }
      inputField = this.inputField = element;
      inputField.classList.add('datepicker-input');
    }
    if (rangepicker) {
      // check validiry
      const index = rangepicker.inputs.indexOf(inputField);
      const datepickers = rangepicker.datepickers;
      if (index < 0 || index > 1 || !Array.isArray(datepickers)) {
        throw Error('Invalid rangepicker object.');
      }
      // attach itaelf to the rangepicker here so that processInputDates() can
      // determine if this is the range-end picker of the rangepicker while
      // setting inital values when pickLevel > 0
      datepickers[index] = this;
      // add getter for rangepicker
      Object.defineProperty(this, 'rangepicker', {
        get() {
          return rangepicker;
        },
      });
      Object.defineProperty(this, 'rangeSideIndex', {
        get() {
          return index;
        },
      });
    }

    // set up config
    this._options = options;
    Object.assign(config, (0,_options_processOptions_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, this));

    // set initial dates
    let initialDates;
    if (inline) {
      initialDates = (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.stringToArray)(element.dataset.date, config.dateDelimiter);
      delete element.dataset.date;
    } else {
      initialDates = (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.stringToArray)(inputField.value, config.dateDelimiter);
    }
    this.dates = [];
    // process initial value
    const inputDateValues = processInputDates(this, initialDates);
    if (inputDateValues && inputDateValues.length > 0) {
      this.dates = inputDateValues;
    }
    if (inputField) {
      inputField.value = stringifyDates(this.dates, config);
    }

    const picker = this.picker = new _picker_Picker_js__WEBPACK_IMPORTED_MODULE_8__["default"](this);

    if (inline) {
      this.show();
    } else {
      // set up event listeners in other modes
      const onMousedownDocument = _events_otherListeners_js__WEBPACK_IMPORTED_MODULE_11__.onClickOutside.bind(null, this);
      const listeners = [
        [inputField, 'keydown', _events_inputFieldListeners_js__WEBPACK_IMPORTED_MODULE_10__.onKeydown.bind(null, this)],
        [inputField, 'focus', _events_inputFieldListeners_js__WEBPACK_IMPORTED_MODULE_10__.onFocus.bind(null, this)],
        [inputField, 'mousedown', _events_inputFieldListeners_js__WEBPACK_IMPORTED_MODULE_10__.onMousedown.bind(null, this)],
        [inputField, 'click', _events_inputFieldListeners_js__WEBPACK_IMPORTED_MODULE_10__.onClickInput.bind(null, this)],
        [inputField, 'paste', _events_inputFieldListeners_js__WEBPACK_IMPORTED_MODULE_10__.onPaste.bind(null, this)],
        [document, 'mousedown', onMousedownDocument],
        [document, 'touchstart', onMousedownDocument],
        [window, 'resize', picker.place.bind(picker)]
      ];
      (0,_lib_event_js__WEBPACK_IMPORTED_MODULE_4__.registerListeners)(this, listeners);
    }
  }

  /**
   * Format Date object or time value in given format and language
   * @param  {Date|Number} date - date or time value to format
   * @param  {String|Object} format - format string or object that contains
   * toDisplay() custom formatter, whose signature is
   * - args:
   *   - date: {Date} - Date instance of the date passed to the method
   *   - format: {Object} - the format object passed to the method
   *   - locale: {Object} - locale for the language specified by `lang`
   * - return:
   *     {String} formatted date
   * @param  {String} [lang=en] - language code for the locale to use
   * @return {String} formatted date
   */
  static formatDate(date, format, lang) {
    return (0,_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__.formatDate)(date, format, lang && _i18n_base_locales_js__WEBPACK_IMPORTED_MODULE_5__.locales[lang] || _i18n_base_locales_js__WEBPACK_IMPORTED_MODULE_5__.locales.en);
  }

  /**
   * Parse date string
   * @param  {String|Date|Number} dateStr - date string, Date object or time
   * value to parse
   * @param  {String|Object} format - format string or object that contains
   * toValue() custom parser, whose signature is
   * - args:
   *   - dateStr: {String|Date|Number} - the dateStr passed to the method
   *   - format: {Object} - the format object passed to the method
   *   - locale: {Object} - locale for the language specified by `lang`
   * - return:
   *     {Date|Number} parsed date or its time value
   * @param  {String} [lang=en] - language code for the locale to use
   * @return {Number} time value of parsed date
   */
  static parseDate(dateStr, format, lang) {
    return (0,_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__.parseDate)(dateStr, format, lang && _i18n_base_locales_js__WEBPACK_IMPORTED_MODULE_5__.locales[lang] || _i18n_base_locales_js__WEBPACK_IMPORTED_MODULE_5__.locales.en);
  }

  /**
   * @type {Object} - Installed locales in `[languageCode]: localeObject` format
   * en`:_English (US)_ is pre-installed.
   */
  static get locales() {
    return _i18n_base_locales_js__WEBPACK_IMPORTED_MODULE_5__.locales;
  }

  /**
   * @type {Boolean} - Whether the picker element is shown. `true` whne shown
   */
  get active() {
    return !!(this.picker && this.picker.active);
  }

  /**
   * @type {HTMLDivElement} - DOM object of picker element
   */
  get pickerElement() {
    return this.picker ? this.picker.element : undefined;
  }

  /**
   * Set new values to the config options
   * @param {Object} options - config options to update
   */
  setOptions(options) {
    const picker = this.picker;
    const newOptions = (0,_options_processOptions_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, this);
    Object.assign(this._options, options);
    Object.assign(this.config, newOptions);
    picker.setOptions(newOptions);

    refreshUI(this, 3);
  }

  /**
   * Show the picker element
   */
  show() {
    if (this.inputField) {
      if (this.inputField.disabled) {
        return;
      }
      if (!(0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__.isActiveElement)(this.inputField) && !this.config.disableTouchKeyboard) {
        this._showing = true;
        this.inputField.focus();
        delete this._showing;
      }
    }
    this.picker.show();
  }

  /**
   * Hide the picker element
   * Not available on inline picker
   */
  hide() {
    if (this.inline) {
      return;
    }
    this.picker.hide();
    this.picker.update().changeView(this.config.startView).render();
  }

  /**
   * Destroy the Datepicker instance
   * @return {Detepicker} - the instance destroyed
   */
  destroy() {
    this.hide();
    (0,_lib_event_js__WEBPACK_IMPORTED_MODULE_4__.unregisterListeners)(this);
    this.picker.detach();
    if (!this.inline) {
      this.inputField.classList.remove('datepicker-input');
    }
    delete this.element.datepicker;
    return this;
  }

  /**
   * Get the selected date(s)
   *
   * The method returns a Date object of selected date by default, and returns
   * an array of selected dates in multidate mode. If format string is passed,
   * it returns date string(s) formatted in given format.
   *
   * @param  {String} [format] - Format string to stringify the date(s)
   * @return {Date|String|Date[]|String[]} - selected date(s), or if none is
   * selected, empty array in multidate mode and untitled in sigledate mode
   */
  getDate(format = undefined) {
    const callback = format
      ? date => (0,_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__.formatDate)(date, format, this.config.locale)
      : date => new Date(date);

    if (this.config.multidate) {
      return this.dates.map(callback);
    }
    if (this.dates.length > 0) {
      return callback(this.dates[0]);
    }
  }

  /**
   * Set selected date(s)
   *
   * In multidate mode, you can pass multiple dates as a series of arguments
   * or an array. (Since each date is parsed individually, the type of the
   * dates doesn't have to be the same.)
   * The given dates are used to toggle the select status of each date. The
   * number of selected dates is kept from exceeding the length set to
   * maxNumberOfDates.
   *
   * With clear: true option, the method can be used to clear the selection
   * and to replace the selection instead of toggling in multidate mode.
   * If the option is passed with no date arguments or an empty dates array,
   * it works as "clear" (clear the selection then set nothing), and if the
   * option is passed with new dates to select, it works as "replace" (clear
   * the selection then set the given dates)
   *
   * When render: false option is used, the method omits re-rendering the
   * picker element. In this case, you need to call refresh() method later in
   * order for the picker element to reflect the changes. The input field is
   * refreshed always regardless of this option.
   *
   * When invalid (unparsable, repeated, disabled or out-of-range) dates are
   * passed, the method ignores them and applies only valid ones. In the case
   * that all the given dates are invalid, which is distinguished from passing
   * no dates, the method considers it as an error and leaves the selection
   * untouched. (The input field also remains untouched unless revert: true
   * option is used.)
   *
   * @param {...(Date|Number|String)|Array} [dates] - Date strings, Date
   * objects, time values or mix of those for new selection
   * @param {Object} [options] - function options
   * - clear: {boolean} - Whether to clear the existing selection
   *     defualt: false
   * - render: {boolean} - Whether to re-render the picker element
   *     default: true
   * - autohide: {boolean} - Whether to hide the picker element after re-render
   *     Ignored when used with render: false
   *     default: config.autohide
   * - revert: {boolean} - Whether to refresh the input field when all the
   *     passed dates are invalid
   *     default: false
   */
  setDate(...args) {
    const dates = [...args];
    const opts = {};
    const lastArg = (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.lastItemOf)(args);
    if (
      typeof lastArg === 'object'
      && !Array.isArray(lastArg)
      && !(lastArg instanceof Date)
      && lastArg
    ) {
      Object.assign(opts, dates.pop());
    }

    const inputDates = Array.isArray(dates[0]) ? dates[0] : dates;
    setDate(this, inputDates, opts);
  }

  /**
   * Update the selected date(s) with input field's value
   * Not available on inline picker
   *
   * The input field will be refreshed with properly formatted date string.
   *
   * In the case that all the entered dates are invalid (unparsable, repeated,
   * disabled or out-of-range), whixh is distinguished from empty input field,
   * the method leaves the input field untouched as well as the selection by
   * default. If revert: true option is used in this case, the input field is
   * refreshed with the existing selection.
   *
   * @param  {Object} [options] - function options
   * - autohide: {boolean} - whether to hide the picker element after refresh
   *     default: false
   * - revert: {boolean} - Whether to refresh the input field when all the
   *     passed dates are invalid
   *     default: false
   */
  update(options = undefined) {
    if (this.inline) {
      return;
    }

    const opts = Object.assign(options || {}, {clear: true, render: true});
    const inputDates = (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.stringToArray)(this.inputField.value, this.config.dateDelimiter);
    setDate(this, inputDates, opts);
  }

  /**
   * Refresh the picker element and the associated input field
   * @param {String} [target] - target item when refreshing one item only
   * 'picker' or 'input'
   * @param {Boolean} [forceRender] - whether to re-render the picker element
   * regardless of its state instead of optimized refresh
   */
  refresh(target = undefined, forceRender = false) {
    if (target && typeof target !== 'string') {
      forceRender = target;
      target = undefined;
    }

    let mode;
    if (target === 'picker') {
      mode = 2;
    } else if (target === 'input') {
      mode = 1;
    } else {
      mode = 3;
    }
    refreshUI(this, mode, !forceRender);
  }

  /**
   * Enter edit mode
   * Not available on inline picker or when the picker element is hidden
   */
  enterEditMode() {
    if (this.inline || !this.picker.active || this.editMode) {
      return;
    }
    this.editMode = true;
    this.inputField.classList.add('in-edit');
  }

  /**
   * Exit from edit mode
   * Not available on inline picker
   * @param  {Object} [options] - function options
   * - update: {boolean} - whether to call update() after exiting
   *     If false, input field is revert to the existing selection
   *     default: false
   */
  exitEditMode(options = undefined) {
    if (this.inline || !this.editMode) {
      return;
    }
    const opts = Object.assign({update: false}, options);
    delete this.editMode;
    this.inputField.classList.remove('in-edit');
    if (opts.update) {
      this.update(opts);
    }
  }
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/events/functions.js":
/*!******************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/events/functions.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "goToPrevOrNext": () => (/* binding */ goToPrevOrNext),
/* harmony export */   "switchView": () => (/* binding */ switchView),
/* harmony export */   "triggerDatepickerEvent": () => (/* binding */ triggerDatepickerEvent),
/* harmony export */   "unfocus": () => (/* binding */ unfocus)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");



function triggerDatepickerEvent(datepicker, type) {
  const detail = {
    date: datepicker.getDate(),
    viewDate: new Date(datepicker.picker.viewDate),
    viewId: datepicker.picker.currentView.id,
    datepicker,
  };
  datepicker.element.dispatchEvent(new CustomEvent(type, {detail}));
}

// direction: -1 (to previous), 1 (to next)
function goToPrevOrNext(datepicker, direction) {
  const {minDate, maxDate} = datepicker.config;
  const {currentView, viewDate} = datepicker.picker;
  let newViewDate;
  switch (currentView.id) {
    case 0:
      newViewDate = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.addMonths)(viewDate, direction);
      break;
    case 1:
      newViewDate = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.addYears)(viewDate, direction);
      break;
    default:
      newViewDate = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.addYears)(viewDate, direction * currentView.navStep);
  }
  newViewDate = (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.limitToRange)(newViewDate, minDate, maxDate);
  datepicker.picker.changeFocus(newViewDate).render();
}

function switchView(datepicker) {
  const viewId = datepicker.picker.currentView.id;
  if (viewId === datepicker.config.maxView) {
    return;
  }
  datepicker.picker.changeView(viewId + 1).render();
}

function unfocus(datepicker) {
  if (datepicker.config.updateOnBlur) {
    datepicker.update({revert: true});
  } else {
    datepicker.refresh('input');
  }
  datepicker.hide();
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/events/inputFieldListeners.js":
/*!****************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/events/inputFieldListeners.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onClickInput": () => (/* binding */ onClickInput),
/* harmony export */   "onFocus": () => (/* binding */ onFocus),
/* harmony export */   "onKeydown": () => (/* binding */ onKeydown),
/* harmony export */   "onMousedown": () => (/* binding */ onMousedown),
/* harmony export */   "onPaste": () => (/* binding */ onPaste)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functions.js */ "./node_modules/vanillajs-datepicker/js/events/functions.js");





// Find the closest date that doesn't meet the condition for unavailable date
// Returns undefined if no available date is found
// addFn: function to calculate the next date
//   - args: time value, amount
// increase: amount to pass to addFn
// testFn: function to test the unavailablity of the date
//   - args: time value; retun: true if unavailable
function findNextAvailableOne(date, addFn, increase, testFn, min, max) {
  if (!(0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.isInRange)(date, min, max)) {
    return;
  }
  if (testFn(date)) {
    const newDate = addFn(date, increase);
    return findNextAvailableOne(newDate, addFn, increase, testFn, min, max);
  }
  return date;
}

// direction: -1 (left/up), 1 (right/down)
// vertical: true for up/down, false for left/right
function moveByArrowKey(datepicker, ev, direction, vertical) {
  const picker = datepicker.picker;
  const currentView = picker.currentView;
  const step = currentView.step || 1;
  let viewDate = picker.viewDate;
  let addFn;
  let testFn;
  switch (currentView.id) {
    case 0:
      if (vertical) {
        viewDate = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_2__.addDays)(viewDate, direction * 7);
      } else if (ev.ctrlKey || ev.metaKey) {
        viewDate = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_2__.addYears)(viewDate, direction);
      } else {
        viewDate = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_2__.addDays)(viewDate, direction);
      }
      addFn = _lib_date_js__WEBPACK_IMPORTED_MODULE_2__.addDays;
      testFn = (date) => currentView.disabled.includes(date);
      break;
    case 1:
      viewDate = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_2__.addMonths)(viewDate, vertical ? direction * 4 : direction);
      addFn = _lib_date_js__WEBPACK_IMPORTED_MODULE_2__.addMonths;
      testFn = (date) => {
        const dt = new Date(date);
        const {year, disabled} = currentView;
        return dt.getFullYear() === year && disabled.includes(dt.getMonth());
      };
      break;
    default:
      viewDate = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_2__.addYears)(viewDate, direction * (vertical ? 4 : 1) * step);
      addFn = _lib_date_js__WEBPACK_IMPORTED_MODULE_2__.addYears;
      testFn = date => currentView.disabled.includes((0,_lib_date_js__WEBPACK_IMPORTED_MODULE_2__.startOfYearPeriod)(date, step));
  }
  viewDate = findNextAvailableOne(
    viewDate,
    addFn,
    direction < 0 ? -step : step,
    testFn,
    currentView.minDate,
    currentView.maxDate
  );
  if (viewDate !== undefined) {
    picker.changeFocus(viewDate).render();
  }
}

function onKeydown(datepicker, ev) {
  const key = ev.key;
  if (key === 'Tab') {
    (0,_functions_js__WEBPACK_IMPORTED_MODULE_3__.unfocus)(datepicker);
    return;
  }

  const picker = datepicker.picker;
  const {id, isMinView} = picker.currentView;
  if (!picker.active) {
    if (key === 'ArrowDown') {
      picker.show();
    } else {
      if (key === 'Enter') {
        datepicker.update();
      } else if (key === 'Escape') {
        picker.show();
      }
      return;
    }
  } else if (datepicker.editMode) {
    if (key === 'Enter') {
      datepicker.exitEditMode({update: true, autohide: datepicker.config.autohide});
    } else if (key === 'Escape') {
      picker.hide();
    }
    return;
  } else {
    if (key === 'ArrowLeft') {
      if (ev.ctrlKey || ev.metaKey) {
        (0,_functions_js__WEBPACK_IMPORTED_MODULE_3__.goToPrevOrNext)(datepicker, -1);
      } else if (ev.shiftKey) {
        datepicker.enterEditMode();
        return;
      } else {
        moveByArrowKey(datepicker, ev, -1, false);
      }
    } else if (key === 'ArrowRight') {
      if (ev.ctrlKey || ev.metaKey) {
        (0,_functions_js__WEBPACK_IMPORTED_MODULE_3__.goToPrevOrNext)(datepicker, 1);
      } else if (ev.shiftKey) {
        datepicker.enterEditMode();
        return;
      } else {
        moveByArrowKey(datepicker, ev, 1, false);
      }
    } else if (key === 'ArrowUp') {
      if (ev.ctrlKey || ev.metaKey) {
        (0,_functions_js__WEBPACK_IMPORTED_MODULE_3__.switchView)(datepicker);
      } else if (ev.shiftKey) {
        datepicker.enterEditMode();
        return;
      } else {
        moveByArrowKey(datepicker, ev, -1, true);
      }
    } else if (key === 'ArrowDown') {
      if (ev.shiftKey && !ev.ctrlKey && !ev.metaKey) {
        datepicker.enterEditMode();
        return;
      }
      moveByArrowKey(datepicker, ev, 1, true);
    } else if (key === 'Enter') {
      if (isMinView) {
        datepicker.setDate(picker.viewDate);
        return;
      }
      picker.changeView(id - 1).render();
    } else {
      if (key === 'Escape') {
        picker.hide();
      } else if (
        key === 'Backspace'
        || key === 'Delete'
        || (key.length === 1 && !ev.ctrlKey && !ev.metaKey)
      ) {
        datepicker.enterEditMode();
      }
      return;
    }
  }
  ev.preventDefault();
}

function onFocus(datepicker) {
  if (datepicker.config.showOnFocus && !datepicker._showing) {
    datepicker.show();
  }
}

// for the prevention for entering edit mode while getting focus on click
function onMousedown(datepicker, ev) {
  const el = ev.target;
  if (datepicker.picker.active || datepicker.config.showOnClick) {
    el._active = (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_1__.isActiveElement)(el);
    el._clicking = setTimeout(() => {
      delete el._active;
      delete el._clicking;
    }, 2000);
  }
}

function onClickInput(datepicker, ev) {
  const el = ev.target;
  if (!el._clicking) {
    return;
  }
  clearTimeout(el._clicking);
  delete el._clicking;

  if (el._active) {
    datepicker.enterEditMode();
  }
  delete el._active;

  if (datepicker.config.showOnClick) {
    datepicker.show();
  }
}

function onPaste(datepicker, ev) {
  if (ev.clipboardData.types.includes('text/plain')) {
    datepicker.enterEditMode();
  }
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/events/otherListeners.js":
/*!***********************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/events/otherListeners.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onClickOutside": () => (/* binding */ onClickOutside)
/* harmony export */ });
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _lib_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/event.js */ "./node_modules/vanillajs-datepicker/js/lib/event.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions.js */ "./node_modules/vanillajs-datepicker/js/events/functions.js");




// for the `document` to delegate the events from outside the picker/input field
function onClickOutside(datepicker, ev) {
  const {element, picker} = datepicker;
  // check both picker's and input's activeness to make updateOnBlur work in
  // the cases where...
  // - picker is hidden by ESC key press → input stays focused
  // - input is unfocused by closing mobile keyboard → piker is kept shown
  if (!picker.active && !(0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_0__.isActiveElement)(element)) {
    return;
  }
  const pickerElem = picker.element;
  if ((0,_lib_event_js__WEBPACK_IMPORTED_MODULE_1__.findElementInEventPath)(ev, el => el === element || el === pickerElem)) {
    return;
  }
  (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.unfocus)(datepicker);
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/events/pickerListeners.js":
/*!************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/events/pickerListeners.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onClickClearBtn": () => (/* binding */ onClickClearBtn),
/* harmony export */   "onClickNextBtn": () => (/* binding */ onClickNextBtn),
/* harmony export */   "onClickPrevBtn": () => (/* binding */ onClickPrevBtn),
/* harmony export */   "onClickTodayBtn": () => (/* binding */ onClickTodayBtn),
/* harmony export */   "onClickView": () => (/* binding */ onClickView),
/* harmony export */   "onClickViewSwitch": () => (/* binding */ onClickViewSwitch),
/* harmony export */   "onMousedownPicker": () => (/* binding */ onMousedownPicker)
/* harmony export */ });
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/event.js */ "./node_modules/vanillajs-datepicker/js/lib/event.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions.js */ "./node_modules/vanillajs-datepicker/js/events/functions.js");




function goToSelectedMonthOrYear(datepicker, selection) {
  const picker = datepicker.picker;
  const viewDate = new Date(picker.viewDate);
  const viewId = picker.currentView.id;
  const newDate = viewId === 1
    ? (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_0__.addMonths)(viewDate, selection - viewDate.getMonth())
    : (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_0__.addYears)(viewDate, selection - viewDate.getFullYear());

  picker.changeFocus(newDate).changeView(viewId - 1).render();
}

function onClickTodayBtn(datepicker) {
  const picker = datepicker.picker;
  const currentDate = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_0__.today)();
  if (datepicker.config.todayBtnMode === 1) {
    if (datepicker.config.autohide) {
      datepicker.setDate(currentDate);
      return;
    }
    datepicker.setDate(currentDate, {render: false});
    picker.update();
  }
  if (picker.viewDate !== currentDate) {
    picker.changeFocus(currentDate);
  }
  picker.changeView(0).render();
}

function onClickClearBtn(datepicker) {
  datepicker.setDate({clear: true});
}

function onClickViewSwitch(datepicker) {
  (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.switchView)(datepicker);
}

function onClickPrevBtn(datepicker) {
  (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.goToPrevOrNext)(datepicker, -1);
}

function onClickNextBtn(datepicker) {
  (0,_functions_js__WEBPACK_IMPORTED_MODULE_2__.goToPrevOrNext)(datepicker, 1);
}

// For the picker's main block to delegete the events from `datepicker-cell`s
function onClickView(datepicker, ev) {
  const target = (0,_lib_event_js__WEBPACK_IMPORTED_MODULE_1__.findElementInEventPath)(ev, '.datepicker-cell');
  if (!target || target.classList.contains('disabled')) {
    return;
  }

  const {id, isMinView} = datepicker.picker.currentView;
  if (isMinView) {
    datepicker.setDate(Number(target.dataset.date));
  } else if (id === 1) {
    goToSelectedMonthOrYear(datepicker, Number(target.dataset.month));
  } else {
    goToSelectedMonthOrYear(datepicker, Number(target.dataset.year));
  }
}

function onMousedownPicker(ev) {
  ev.preventDefault();
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/i18n/base-locales.js":
/*!*******************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/i18n/base-locales.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "locales": () => (/* binding */ locales)
/* harmony export */ });
// default locales
const locales = {
  en: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    clear: "Clear",
    titleFormat: "MM y"
  }
};


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/lib/date-format.js":
/*!*****************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/lib/date-format.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatDate": () => (/* binding */ formatDate),
/* harmony export */   "parseDate": () => (/* binding */ parseDate),
/* harmony export */   "reFormatTokens": () => (/* binding */ reFormatTokens),
/* harmony export */   "reNonDateParts": () => (/* binding */ reNonDateParts)
/* harmony export */ });
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");



// pattern for format parts
const reFormatTokens = /dd?|DD?|mm?|MM?|yy?(?:yy)?/;
// pattern for non date parts
const reNonDateParts = /[\s!-/:-@[-`{-~年月日]+/;
// cache for persed formats
let knownFormats = {};
// parse funtions for date parts
const parseFns = {
  y(date, year) {
    return new Date(date).setFullYear(parseInt(year, 10));
  },
  m(date, month, locale) {
    const newDate = new Date(date);
    let monthIndex = parseInt(month, 10) - 1;

    if (isNaN(monthIndex)) {
      if (!month) {
        return NaN;
      }

      const monthName = month.toLowerCase();
      const compareNames = name => name.toLowerCase().startsWith(monthName);
      // compare with both short and full names because some locales have periods
      // in the short names (not equal to the first X letters of the full names)
      monthIndex = locale.monthsShort.findIndex(compareNames);
      if (monthIndex < 0) {
        monthIndex = locale.months.findIndex(compareNames);
      }
      if (monthIndex < 0) {
        return NaN;
      }
    }

    newDate.setMonth(monthIndex);
    return newDate.getMonth() !== normalizeMonth(monthIndex)
      ? newDate.setDate(0)
      : newDate.getTime();
  },
  d(date, day) {
    return new Date(date).setDate(parseInt(day, 10));
  },
};
// format functions for date parts
const formatFns = {
  d(date) {
    return date.getDate();
  },
  dd(date) {
    return padZero(date.getDate(), 2);
  },
  D(date, locale) {
    return locale.daysShort[date.getDay()];
  },
  DD(date, locale) {
    return locale.days[date.getDay()];
  },
  m(date) {
    return date.getMonth() + 1;
  },
  mm(date) {
    return padZero(date.getMonth() + 1, 2);
  },
  M(date, locale) {
    return locale.monthsShort[date.getMonth()];
  },
  MM(date, locale) {
    return locale.months[date.getMonth()];
  },
  y(date) {
    return date.getFullYear();
  },
  yy(date) {
    return padZero(date.getFullYear(), 2).slice(-2);
  },
  yyyy(date) {
    return padZero(date.getFullYear(), 4);
  },
};

// get month index in normal range (0 - 11) from any number
function normalizeMonth(monthIndex) {
  return monthIndex > -1 ? monthIndex % 12 : normalizeMonth(monthIndex + 12);
}

function padZero(num, length) {
  return num.toString().padStart(length, '0');
}

function parseFormatString(format) {
  if (typeof format !== 'string') {
    throw new Error("Invalid date format.");
  }
  if (format in knownFormats) {
    return knownFormats[format];
  }

  // sprit the format string into parts and seprators
  const separators = format.split(reFormatTokens);
  const parts = format.match(new RegExp(reFormatTokens, 'g'));
  if (separators.length === 0 || !parts) {
    throw new Error("Invalid date format.");
  }

  // collect format functions used in the format
  const partFormatters = parts.map(token => formatFns[token]);

  // collect parse function keys used in the format
  // iterate over parseFns' keys in order to keep the order of the keys.
  const partParserKeys = Object.keys(parseFns).reduce((keys, key) => {
    const token = parts.find(part => part[0] !== 'D' && part[0].toLowerCase() === key);
    if (token) {
      keys.push(key);
    }
    return keys;
  }, []);

  return knownFormats[format] = {
    parser(dateStr, locale) {
      const dateParts = dateStr.split(reNonDateParts).reduce((dtParts, part, index) => {
        if (part.length > 0 && parts[index]) {
          const token = parts[index][0];
          if (token === 'M') {
            dtParts.m = part;
          } else if (token !== 'D') {
            dtParts[token] = part;
          }
        }
        return dtParts;
      }, {});

      // iterate over partParserkeys so that the parsing is made in the oder
      // of year, month and day to prevent the day parser from correcting last
      // day of month wrongly
      return partParserKeys.reduce((origDate, key) => {
        const newDate = parseFns[key](origDate, dateParts[key], locale);
        // ingnore the part failed to parse
        return isNaN(newDate) ? origDate : newDate;
      }, (0,_date_js__WEBPACK_IMPORTED_MODULE_0__.today)());
    },
    formatter(date, locale) {
      let dateStr = partFormatters.reduce((str, fn, index) => {
        return str += `${separators[index]}${fn(date, locale)}`;
      }, '');
      // separators' length is always parts' length + 1,
      return dateStr += (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.lastItemOf)(separators);
    },
  };
}

function parseDate(dateStr, format, locale) {
  if (dateStr instanceof Date || typeof dateStr === 'number') {
    const date = (0,_date_js__WEBPACK_IMPORTED_MODULE_0__.stripTime)(dateStr);
    return isNaN(date) ? undefined : date;
  }
  if (!dateStr) {
    return undefined;
  }
  if (dateStr === 'today') {
    return (0,_date_js__WEBPACK_IMPORTED_MODULE_0__.today)();
  }

  if (format && format.toValue) {
    const date = format.toValue(dateStr, format, locale);
    return isNaN(date) ? undefined : (0,_date_js__WEBPACK_IMPORTED_MODULE_0__.stripTime)(date);
  }

  return parseFormatString(format).parser(dateStr, locale);
}

function formatDate(date, format, locale) {
  if (isNaN(date) || (!date && date !== 0)) {
    return '';
  }

  const dateObj = typeof date === 'number' ? new Date(date) : date;

  if (format.toDisplay) {
    return format.toDisplay(dateObj, format, locale);
  }

  return parseFormatString(format).formatter(dateObj, locale);
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/lib/date.js":
/*!**********************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/lib/date.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addDays": () => (/* binding */ addDays),
/* harmony export */   "addMonths": () => (/* binding */ addMonths),
/* harmony export */   "addWeeks": () => (/* binding */ addWeeks),
/* harmony export */   "addYears": () => (/* binding */ addYears),
/* harmony export */   "dateValue": () => (/* binding */ dateValue),
/* harmony export */   "dayOfTheWeekOf": () => (/* binding */ dayOfTheWeekOf),
/* harmony export */   "getWeek": () => (/* binding */ getWeek),
/* harmony export */   "regularizeDate": () => (/* binding */ regularizeDate),
/* harmony export */   "startOfYearPeriod": () => (/* binding */ startOfYearPeriod),
/* harmony export */   "stripTime": () => (/* binding */ stripTime),
/* harmony export */   "today": () => (/* binding */ today)
/* harmony export */ });
function stripTime(timeValue) {
  return new Date(timeValue).setHours(0, 0, 0, 0);
}

function today() {
  return new Date().setHours(0, 0, 0, 0);
}

// Get the time value of the start of given date or year, month and day
function dateValue(...args) {
  switch (args.length) {
    case 0:
      return today();
    case 1:
      return stripTime(args[0]);
  }

  // use setFullYear() to keep 2-digit year from being mapped to 1900-1999
  const newDate = new Date(0);
  newDate.setFullYear(...args);
  return newDate.setHours(0, 0, 0, 0);
}

function addDays(date, amount) {
  const newDate = new Date(date);
  return newDate.setDate(newDate.getDate() + amount);
}

function addWeeks(date, amount) {
  return addDays(date, amount * 7);
}

function addMonths(date, amount) {
  // If the day of the date is not in the new month, the last day of the new
  // month will be returned. e.g. Jan 31 + 1 month → Feb 28 (not Mar 03)
  const newDate = new Date(date);
  const monthsToSet = newDate.getMonth() + amount;
  let expectedMonth = monthsToSet % 12;
  if (expectedMonth < 0) {
    expectedMonth += 12;
  }

  const time = newDate.setMonth(monthsToSet);
  return newDate.getMonth() !== expectedMonth ? newDate.setDate(0) : time;
}

function addYears(date, amount) {
  // If the date is Feb 29 and the new year is not a leap year, Feb 28 of the
  // new year will be returned.
  const newDate = new Date(date);
  const expectedMonth = newDate.getMonth();
  const time = newDate.setFullYear(newDate.getFullYear() + amount);
  return expectedMonth === 1 && newDate.getMonth() === 2 ? newDate.setDate(0) : time;
}

// Calculate the distance bettwen 2 days of the week
function dayDiff(day, from) {
  return (day - from + 7) % 7;
}

// Get the date of the specified day of the week of given base date
function dayOfTheWeekOf(baseDate, dayOfWeek, weekStart = 0) {
  const baseDay = new Date(baseDate).getDay();
  return addDays(baseDate, dayDiff(dayOfWeek, weekStart) - dayDiff(baseDay, weekStart));
}

// Get the ISO week of a date
function getWeek(date) {
  // start of ISO week is Monday
  const thuOfTheWeek = dayOfTheWeekOf(date, 4, 1);
  // 1st week == the week where the 4th of January is in
  const firstThu = dayOfTheWeekOf(new Date(thuOfTheWeek).setMonth(0, 4), 4, 1);
  return Math.round((thuOfTheWeek - firstThu) / 604800000) + 1;
}

// Get the start year of the period of years that includes given date
// years: length of the year period
function startOfYearPeriod(date, years) {
  /* @see https://en.wikipedia.org/wiki/Year_zero#ISO_8601 */
  const year = new Date(date).getFullYear();
  return Math.floor(year / years) * years;
}

// Convert date to the first/last date of the month/year of the date
function regularizeDate(date, timeSpan, useLastDate) {
  if (timeSpan !== 1 && timeSpan !== 2) {
    return date;
  }
  const newDate = new Date(date);
  if (timeSpan === 1) {
    useLastDate
      ? newDate.setMonth(newDate.getMonth() + 1, 0)
      : newDate.setDate(1);
  } else {
    useLastDate
      ? newDate.setFullYear(newDate.getFullYear() + 1, 0, 0)
      : newDate.setMonth(0, 1);
  }
  return newDate.setHours(0, 0, 0, 0);
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/lib/dom.js":
/*!*********************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/lib/dom.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "emptyChildNodes": () => (/* binding */ emptyChildNodes),
/* harmony export */   "getParent": () => (/* binding */ getParent),
/* harmony export */   "hideElement": () => (/* binding */ hideElement),
/* harmony export */   "isActiveElement": () => (/* binding */ isActiveElement),
/* harmony export */   "isVisible": () => (/* binding */ isVisible),
/* harmony export */   "parseHTML": () => (/* binding */ parseHTML),
/* harmony export */   "replaceChildNodes": () => (/* binding */ replaceChildNodes),
/* harmony export */   "showElement": () => (/* binding */ showElement)
/* harmony export */ });
const range = document.createRange();

function parseHTML(html) {
  return range.createContextualFragment(html);
}

function getParent(el) {
  return el.parentElement
    || (el.parentNode instanceof ShadowRoot ? el.parentNode.host : undefined);
}

function isActiveElement(el) {
  return el.getRootNode().activeElement === el;
}

// equivalent to jQuery's :visble
function isVisible(el) {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

function hideElement(el) {
  if (el.style.display === 'none') {
    return;
  }
  // back up the existing display setting in data-style-display
  if (el.style.display) {
    el.dataset.styleDisplay = el.style.display;
  }
  el.style.display = 'none';
}

function showElement(el) {
  if (el.style.display !== 'none') {
    return;
  }
  if (el.dataset.styleDisplay) {
    // restore backed-up dispay property
    el.style.display = el.dataset.styleDisplay;
    delete el.dataset.styleDisplay;
  } else {
    el.style.display = '';
  }
}

function emptyChildNodes(el) {
  if (el.firstChild) {
    el.removeChild(el.firstChild);
    emptyChildNodes(el);
  }
}

function replaceChildNodes(el, newChildNodes) {
  emptyChildNodes(el);
  if (newChildNodes instanceof DocumentFragment) {
    el.appendChild(newChildNodes);
  } else if (typeof newChildNodes === 'string') {
    el.appendChild(parseHTML(newChildNodes));
  } else if (typeof newChildNodes.forEach === 'function') {
    newChildNodes.forEach((node) => {
      el.appendChild(node);
    });
  }
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/lib/event.js":
/*!***********************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/lib/event.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findElementInEventPath": () => (/* binding */ findElementInEventPath),
/* harmony export */   "registerListeners": () => (/* binding */ registerListeners),
/* harmony export */   "unregisterListeners": () => (/* binding */ unregisterListeners)
/* harmony export */ });
const listenerRegistry = new WeakMap();
const {addEventListener, removeEventListener} = EventTarget.prototype;

// Register event listeners to a key object
// listeners: array of listener definitions;
//   - each definition must be a flat array of event target and the arguments
//     used to call addEventListener() on the target
function registerListeners(keyObj, listeners) {
  let registered = listenerRegistry.get(keyObj);
  if (!registered) {
    registered = [];
    listenerRegistry.set(keyObj, registered);
  }
  listeners.forEach((listener) => {
    addEventListener.call(...listener);
    registered.push(listener);
  });
}

function unregisterListeners(keyObj) {
  let listeners = listenerRegistry.get(keyObj);
  if (!listeners) {
    return;
  }
  listeners.forEach((listener) => {
    removeEventListener.call(...listener);
  });
  listenerRegistry.delete(keyObj);
}

// Event.composedPath() polyfill for Edge
// based on https://gist.github.com/kleinfreund/e9787d73776c0e3750dcfcdc89f100ec
if (!Event.prototype.composedPath) {
  const getComposedPath = (node, path = []) => {
    path.push(node);

    let parent;
    if (node.parentNode) {
      parent = node.parentNode;
    } else if (node.host) { // ShadowRoot
      parent = node.host;
    } else if (node.defaultView) {  // Document
      parent = node.defaultView;
    }
    return parent ? getComposedPath(parent, path) : path;
  };

  Event.prototype.composedPath = function () {
    return getComposedPath(this.target);
  };
}

function findFromPath(path, criteria, currentTarget) {
  const [node, ...rest] = path;
  if (criteria(node)) {
    return node;
  }
  if (node === currentTarget || node.tagName === 'HTML' || rest.length === 0) {
    // stop when reaching currentTarget or <html>
    return;
  }
  return findFromPath(rest, criteria, currentTarget);
}

// Search for the actual target of a delegated event
function findElementInEventPath(ev, selector) {
  const criteria = typeof selector === 'function'
    ? selector
    : el => el instanceof Element && el.matches(selector);
  return findFromPath(ev.composedPath(), criteria, ev.currentTarget);
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/lib/utils.js":
/*!***********************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/lib/utils.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTagRepeat": () => (/* binding */ createTagRepeat),
/* harmony export */   "hasProperty": () => (/* binding */ hasProperty),
/* harmony export */   "isInRange": () => (/* binding */ isInRange),
/* harmony export */   "lastItemOf": () => (/* binding */ lastItemOf),
/* harmony export */   "limitToRange": () => (/* binding */ limitToRange),
/* harmony export */   "optimizeTemplateHTML": () => (/* binding */ optimizeTemplateHTML),
/* harmony export */   "pushUnique": () => (/* binding */ pushUnique),
/* harmony export */   "stringToArray": () => (/* binding */ stringToArray)
/* harmony export */ });
function hasProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function lastItemOf(arr) {
  return arr[arr.length - 1];
}

// push only the items not included in the array
function pushUnique(arr, ...items) {
  items.forEach((item) => {
    if (arr.includes(item)) {
      return;
    }
    arr.push(item);
  });
  return arr;
}

function stringToArray(str, separator) {
  // convert empty string to an empty array
  return str ? str.split(separator) : [];
}

function isInRange(testVal, min, max) {
  const minOK = min === undefined || testVal >= min;
  const maxOK = max === undefined || testVal <= max;
  return minOK && maxOK;
}

function limitToRange(val, min, max) {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
}

function createTagRepeat(tagName, repeat, attributes = {}, index = 0, html = '') {
  const openTagSrc = Object.keys(attributes).reduce((src, attr) => {
    let val = attributes[attr];
    if (typeof val === 'function') {
      val = val(index);
    }
    return `${src} ${attr}="${val}"`;
  }, tagName);
  html += `<${openTagSrc}></${tagName}>`;

  const next = index + 1;
  return next < repeat
    ? createTagRepeat(tagName, repeat, attributes, next, html)
    : html;
}

// Remove the spacing surrounding tags for HTML parser not to create text nodes
// before/after elements
function optimizeTemplateHTML(html) {
  return html.replace(/>\s+/g, '>').replace(/\s+</, '<');
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/options/defaultOptions.js":
/*!************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/options/defaultOptions.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// config options updatable by setOptions() and their default values
const defaultOptions = {
  autohide: false,
  beforeShowDay: null,
  beforeShowDecade: null,
  beforeShowMonth: null,
  beforeShowYear: null,
  calendarWeeks: false,
  clearBtn: false,
  dateDelimiter: ',',
  datesDisabled: [],
  daysOfWeekDisabled: [],
  daysOfWeekHighlighted: [],
  defaultViewDate: undefined, // placeholder, defaults to today() by the program
  disableTouchKeyboard: false,
  format: 'mm/dd/yyyy',
  language: 'en',
  maxDate: null,
  maxNumberOfDates: 1,
  maxView: 3,
  minDate: null,
  nextArrow: '»',
  orientation: 'auto',
  pickLevel: 0,
  prevArrow: '«',
  showDaysOfWeek: true,
  showOnClick: true,
  showOnFocus: true,
  startView: 0,
  title: '',
  todayBtn: false,
  todayBtnMode: 0,
  todayHighlight: false,
  updateOnBlur: true,
  weekStart: 0,
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultOptions);


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/options/processOptions.js":
/*!************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/options/processOptions.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ processOptions)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/date-format.js */ "./node_modules/vanillajs-datepicker/js/lib/date-format.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _defaultOptions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaultOptions.js */ "./node_modules/vanillajs-datepicker/js/options/defaultOptions.js");






const {
  language: defaultLang,
  format: defaultFormat,
  weekStart: defaultWeekStart,
} = _defaultOptions_js__WEBPACK_IMPORTED_MODULE_4__["default"];

// Reducer function to filter out invalid day-of-week from the input
function sanitizeDOW(dow, day) {
  return dow.length < 6 && day >= 0 && day < 7
    ? (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.pushUnique)(dow, day)
    : dow;
}

function calcEndOfWeek(startOfWeek) {
  return (startOfWeek + 6) % 7;
}

// validate input date. if invalid, fallback to the original value
function validateDate(value, format, locale, origValue) {
  const date = (0,_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__.parseDate)(value, format, locale);
  return date !== undefined ? date : origValue;
}

// Validate viewId. if invalid, fallback to the original value
function validateViewId(value, origValue, max = 3) {
  const viewId = parseInt(value, 10);
  return viewId >= 0 && viewId <= max ? viewId : origValue;
}

// Create Datepicker configuration to set
function processOptions(options, datepicker) {
  const inOpts = Object.assign({}, options);
  const config = {};
  const locales = datepicker.constructor.locales;
  const rangeSideIndex = datepicker.rangeSideIndex;
  let {
    format,
    language,
    locale,
    maxDate,
    maxView,
    minDate,
    pickLevel,
    startView,
    weekStart,
  } = datepicker.config || {};

  if (inOpts.language) {
    let lang;
    if (inOpts.language !== language) {
      if (locales[inOpts.language]) {
        lang = inOpts.language;
      } else {
        // Check if langauge + region tag can fallback to the one without
        // region (e.g. fr-CA → fr)
        lang = inOpts.language.split('-')[0];
        if (locales[lang] === undefined) {
          lang = false;
        }
      }
    }
    delete inOpts.language;
    if (lang) {
      language = config.language = lang;

      // update locale as well when updating language
      const origLocale = locale || locales[defaultLang];
      // use default language's properties for the fallback
      locale = Object.assign({
        format: defaultFormat,
        weekStart: defaultWeekStart
      }, locales[defaultLang]);
      if (language !== defaultLang) {
        Object.assign(locale, locales[language]);
      }
      config.locale = locale;
      // if format and/or weekStart are the same as old locale's defaults,
      // update them to new locale's defaults
      if (format === origLocale.format) {
        format = config.format = locale.format;
      }
      if (weekStart === origLocale.weekStart) {
        weekStart = config.weekStart = locale.weekStart;
        config.weekEnd = calcEndOfWeek(locale.weekStart);
      }
    }
  }

  if (inOpts.format) {
    const hasToDisplay = typeof inOpts.format.toDisplay === 'function';
    const hasToValue = typeof inOpts.format.toValue === 'function';
    const validFormatString = _lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__.reFormatTokens.test(inOpts.format);
    if ((hasToDisplay && hasToValue) || validFormatString) {
      format = config.format = inOpts.format;
    }
    delete inOpts.format;
  }

  //*** pick level ***//
  let newPickLevel = pickLevel;
  if (inOpts.pickLevel !== undefined) {
    newPickLevel = validateViewId(inOpts.pickLevel, 2);
    delete inOpts.pickLevel;
  }
  if (newPickLevel !== pickLevel) {
    if (newPickLevel > pickLevel) {
      // complement current minDate/madDate so that the existing range will be
      // expanded to fit the new level later
      if (inOpts.minDate === undefined) {
        inOpts.minDate = minDate;
      }
      if (inOpts.maxDate === undefined) {
        inOpts.maxDate = maxDate;
      }
    }
    // complement datesDisabled so that it will be reset later
    if (!inOpts.datesDisabled) {
      inOpts.datesDisabled = [];
    }
    pickLevel = config.pickLevel = newPickLevel;
  }

  //*** dates ***//
  // while min and maxDate for "no limit" in the options are better to be null
  // (especially when updating), the ones in the config have to be undefined
  // because null is treated as 0 (= unix epoch) when comparing with time value
  let minDt = minDate;
  let maxDt = maxDate;
  if (inOpts.minDate !== undefined) {
    const defaultMinDt = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.dateValue)(0, 0, 1);
    minDt = inOpts.minDate === null
      ? defaultMinDt  // set 0000-01-01 to prevent negative values for year
      : validateDate(inOpts.minDate, format, locale, minDt);
    if (minDt !== defaultMinDt) {
      minDt = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.regularizeDate)(minDt, pickLevel, false);
    }
    delete inOpts.minDate;
  }
  if (inOpts.maxDate !== undefined) {
    maxDt = inOpts.maxDate === null
      ? undefined
      : validateDate(inOpts.maxDate, format, locale, maxDt);
    if (maxDt !== undefined) {
      maxDt = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.regularizeDate)(maxDt, pickLevel, true);
    }
    delete inOpts.maxDate;
  }
  if (maxDt < minDt) {
    minDate = config.minDate = maxDt;
    maxDate = config.maxDate = minDt;
  } else {
    if (minDate !== minDt) {
      minDate = config.minDate = minDt;
    }
    if (maxDate !== maxDt) {
      maxDate = config.maxDate = maxDt;
    }
  }

  if (inOpts.datesDisabled) {
    config.datesDisabled = inOpts.datesDisabled.reduce((dates, dt) => {
      const date = (0,_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__.parseDate)(dt, format, locale);
      return date !== undefined
        ? (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.pushUnique)(dates, (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.regularizeDate)(date, pickLevel, rangeSideIndex))
        : dates;
    }, []);
    delete inOpts.datesDisabled;
  }
  if (inOpts.defaultViewDate !== undefined) {
    const viewDate = (0,_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__.parseDate)(inOpts.defaultViewDate, format, locale);
    if (viewDate !== undefined) {
      config.defaultViewDate = viewDate;
    }
    delete inOpts.defaultViewDate;
  }

  //*** days of week ***//
  if (inOpts.weekStart !== undefined) {
    const wkStart = Number(inOpts.weekStart) % 7;
    if (!isNaN(wkStart)) {
      weekStart = config.weekStart = wkStart;
      config.weekEnd = calcEndOfWeek(wkStart);
    }
    delete inOpts.weekStart;
  }
  if (inOpts.daysOfWeekDisabled) {
    config.daysOfWeekDisabled = inOpts.daysOfWeekDisabled.reduce(sanitizeDOW, []);
    delete inOpts.daysOfWeekDisabled;
  }
  if (inOpts.daysOfWeekHighlighted) {
    config.daysOfWeekHighlighted = inOpts.daysOfWeekHighlighted.reduce(sanitizeDOW, []);
    delete inOpts.daysOfWeekHighlighted;
  }

  //*** multi date ***//
  if (inOpts.maxNumberOfDates !== undefined) {
    const maxNumberOfDates = parseInt(inOpts.maxNumberOfDates, 10);
    if (maxNumberOfDates >= 0) {
      config.maxNumberOfDates = maxNumberOfDates;
      config.multidate = maxNumberOfDates !== 1;
    }
    delete inOpts.maxNumberOfDates;
  }
  if (inOpts.dateDelimiter) {
    config.dateDelimiter = String(inOpts.dateDelimiter);
    delete inOpts.dateDelimiter;
  }

  //*** view ***//
  let newMaxView = maxView;
  if (inOpts.maxView !== undefined) {
    newMaxView = validateViewId(inOpts.maxView, maxView);
    delete inOpts.maxView;
  }
  // ensure max view >= pick level
  newMaxView = pickLevel > newMaxView ? pickLevel : newMaxView;
  if (newMaxView !== maxView) {
    maxView = config.maxView = newMaxView;
  }

  let newStartView = startView;
  if (inOpts.startView !== undefined) {
    newStartView = validateViewId(inOpts.startView, newStartView);
    delete inOpts.startView;
  }
  // ensure pick level <= start view <= max view
  if (newStartView < pickLevel) {
    newStartView = pickLevel;
  } else if (newStartView > maxView) {
    newStartView = maxView;
  }
  if (newStartView !== startView) {
    config.startView = newStartView;
  }

  //*** template ***//
  if (inOpts.prevArrow) {
    const prevArrow = (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__.parseHTML)(inOpts.prevArrow);
    if (prevArrow.childNodes.length > 0) {
      config.prevArrow = prevArrow.childNodes;
    }
    delete inOpts.prevArrow;
  }
  if (inOpts.nextArrow) {
    const nextArrow = (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__.parseHTML)(inOpts.nextArrow);
    if (nextArrow.childNodes.length > 0) {
      config.nextArrow = nextArrow.childNodes;
    }
    delete inOpts.nextArrow;
  }

  //*** misc ***//
  if (inOpts.disableTouchKeyboard !== undefined) {
    config.disableTouchKeyboard = 'ontouchstart' in document && !!inOpts.disableTouchKeyboard;
    delete inOpts.disableTouchKeyboard;
  }
  if (inOpts.orientation) {
    const orientation = inOpts.orientation.toLowerCase().split(/\s+/g);
    config.orientation = {
      x: orientation.find(x => (x === 'left' || x === 'right')) || 'auto',
      y: orientation.find(y => (y === 'top' || y === 'bottom')) || 'auto',
    };
    delete inOpts.orientation;
  }
  if (inOpts.todayBtnMode !== undefined) {
    switch(inOpts.todayBtnMode) {
      case 0:
      case 1:
        config.todayBtnMode = inOpts.todayBtnMode;
    }
    delete inOpts.todayBtnMode;
  }

  //*** copy the rest ***//
  Object.keys(inOpts).forEach((key) => {
    if (inOpts[key] !== undefined && (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasProperty)(_defaultOptions_js__WEBPACK_IMPORTED_MODULE_4__["default"], key)) {
      config[key] = inOpts[key];
    }
  });

  return config;
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/Picker.js":
/*!***************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/Picker.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Picker)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _lib_event_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/event.js */ "./node_modules/vanillajs-datepicker/js/lib/event.js");
/* harmony import */ var _templates_pickerTemplate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./templates/pickerTemplate.js */ "./node_modules/vanillajs-datepicker/js/picker/templates/pickerTemplate.js");
/* harmony import */ var _views_DaysView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/DaysView.js */ "./node_modules/vanillajs-datepicker/js/picker/views/DaysView.js");
/* harmony import */ var _views_MonthsView_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/MonthsView.js */ "./node_modules/vanillajs-datepicker/js/picker/views/MonthsView.js");
/* harmony import */ var _views_YearsView_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/YearsView.js */ "./node_modules/vanillajs-datepicker/js/picker/views/YearsView.js");
/* harmony import */ var _events_functions_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../events/functions.js */ "./node_modules/vanillajs-datepicker/js/events/functions.js");
/* harmony import */ var _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../events/pickerListeners.js */ "./node_modules/vanillajs-datepicker/js/events/pickerListeners.js");











const orientClasses = ['left', 'top', 'right', 'bottom'].reduce((obj, key) => {
  obj[key] = `datepicker-orient-${key}`;
  return obj;
}, {});
const toPx = num => num ? `${num}px` : num;

function processPickerOptions(picker, options) {
  if (options.title !== undefined) {
    if (options.title) {
      picker.controls.title.textContent = options.title;
      (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.showElement)(picker.controls.title);
    } else {
      picker.controls.title.textContent = '';
      (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.hideElement)(picker.controls.title);
    }
  }
  if (options.prevArrow) {
    const prevBtn = picker.controls.prevBtn;
    (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.emptyChildNodes)(prevBtn);
    options.prevArrow.forEach((node) => {
      prevBtn.appendChild(node.cloneNode(true));
    });
  }
  if (options.nextArrow) {
    const nextBtn = picker.controls.nextBtn;
    (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.emptyChildNodes)(nextBtn);
    options.nextArrow.forEach((node) => {
      nextBtn.appendChild(node.cloneNode(true));
    });
  }
  if (options.locale) {
    picker.controls.todayBtn.textContent = options.locale.today;
    picker.controls.clearBtn.textContent = options.locale.clear;
  }
  if (options.todayBtn !== undefined) {
    if (options.todayBtn) {
      (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.showElement)(picker.controls.todayBtn);
    } else {
      (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.hideElement)(picker.controls.todayBtn);
    }
  }
  if ((0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasProperty)(options, 'minDate') || (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasProperty)(options, 'maxDate')) {
    const {minDate, maxDate} = picker.datepicker.config;
    picker.controls.todayBtn.disabled = !(0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.isInRange)((0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.today)(), minDate, maxDate);
  }
  if (options.clearBtn !== undefined) {
    if (options.clearBtn) {
      (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.showElement)(picker.controls.clearBtn);
    } else {
      (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.hideElement)(picker.controls.clearBtn);
    }
  }
}

// Compute view date to reset, which will be...
// - the last item of the selected dates or defaultViewDate if no selection
// - limitted to minDate or maxDate if it exceeds the range
function computeResetViewDate(datepicker) {
  const {dates, config} = datepicker;
  const viewDate = dates.length > 0 ? (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.lastItemOf)(dates) : config.defaultViewDate;
  return (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.limitToRange)(viewDate, config.minDate, config.maxDate);
}

// Change current view's view date
function setViewDate(picker, newDate) {
  const oldViewDate = new Date(picker.viewDate);
  const newViewDate = new Date(newDate);
  const {id, year, first, last} = picker.currentView;
  const viewYear = newViewDate.getFullYear();

  picker.viewDate = newDate;
  if (viewYear !== oldViewDate.getFullYear()) {
    (0,_events_functions_js__WEBPACK_IMPORTED_MODULE_8__.triggerDatepickerEvent)(picker.datepicker, 'changeYear');
  }
  if (newViewDate.getMonth() !== oldViewDate.getMonth()) {
    (0,_events_functions_js__WEBPACK_IMPORTED_MODULE_8__.triggerDatepickerEvent)(picker.datepicker, 'changeMonth');
  }

  // return whether the new date is in different period on time from the one
  // displayed in the current view
  // when true, the view needs to be re-rendered on the next UI refresh.
  switch (id) {
    case 0:
      return newDate < first || newDate > last;
    case 1:
      return viewYear !== year;
    default:
      return viewYear < first || viewYear > last;
  }
}

function getTextDirection(el) {
  return window.getComputedStyle(el).direction;
}

// find the closet scrollable ancestor elemnt under the body
function findScrollParents(el) {
  const parent = (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.getParent)(el);
  if (parent === document.body || !parent) {
    return;
  }

  // checking overflow only is enough because computed overflow cannot be
  // visible or a combination of visible and other when either axis is set
  // to other than visible.
  // (Setting one axis to other than 'visible' while the other is 'visible'
  // results in the other axis turning to 'auto')
  return window.getComputedStyle(parent).overflow !== 'visible'
    ? parent
    : findScrollParents(parent);
}

// Class representing the picker UI
class Picker {
  constructor(datepicker) {
    const {config} = this.datepicker = datepicker;

    const template = _templates_pickerTemplate_js__WEBPACK_IMPORTED_MODULE_4__["default"].replace(/%buttonClass%/g, config.buttonClass);
    const element = this.element = (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.parseHTML)(template).firstChild;
    const [header, main, footer] = element.firstChild.children;
    const title = header.firstElementChild;
    const [prevBtn, viewSwitch, nextBtn] = header.lastElementChild.children;
    const [todayBtn, clearBtn] = footer.firstChild.children;
    const controls = {
      title,
      prevBtn,
      viewSwitch,
      nextBtn,
      todayBtn,
      clearBtn,
    };
    this.main = main;
    this.controls = controls;

    const elementClass = datepicker.inline ? 'inline' : 'dropdown';
    element.classList.add(`datepicker-${elementClass}`);

    processPickerOptions(this, config);
    this.viewDate = computeResetViewDate(datepicker);

    // set up event listeners
    (0,_lib_event_js__WEBPACK_IMPORTED_MODULE_3__.registerListeners)(datepicker, [
      [element, 'mousedown', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__.onMousedownPicker],
      [main, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__.onClickView.bind(null, datepicker)],
      [controls.viewSwitch, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__.onClickViewSwitch.bind(null, datepicker)],
      [controls.prevBtn, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__.onClickPrevBtn.bind(null, datepicker)],
      [controls.nextBtn, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__.onClickNextBtn.bind(null, datepicker)],
      [controls.todayBtn, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__.onClickTodayBtn.bind(null, datepicker)],
      [controls.clearBtn, 'click', _events_pickerListeners_js__WEBPACK_IMPORTED_MODULE_9__.onClickClearBtn.bind(null, datepicker)],
    ]);

    // set up views
    this.views = [
      new _views_DaysView_js__WEBPACK_IMPORTED_MODULE_5__["default"](this),
      new _views_MonthsView_js__WEBPACK_IMPORTED_MODULE_6__["default"](this),
      new _views_YearsView_js__WEBPACK_IMPORTED_MODULE_7__["default"](this, {id: 2, name: 'years', cellClass: 'year', step: 1}),
      new _views_YearsView_js__WEBPACK_IMPORTED_MODULE_7__["default"](this, {id: 3, name: 'decades', cellClass: 'decade', step: 10}),
    ];
    this.currentView = this.views[config.startView];

    this.currentView.render();
    this.main.appendChild(this.currentView.element);
    if (config.container) {
      config.container.appendChild(this.element);
    } else {
      datepicker.inputField.after(this.element);
    }
  }

  setOptions(options) {
    processPickerOptions(this, options);
    this.views.forEach((view) => {
      view.init(options, false);
    });
    this.currentView.render();
  }

  detach() {
    this.element.remove();
  }

  show() {
    if (this.active) {
      return;
    }

    const {datepicker, element} = this;
    if (datepicker.inline) {
      element.classList.add('active');
    } else {
      // ensure picker's direction matches input's
      const inputDirection = getTextDirection(datepicker.inputField);
      if (inputDirection !== getTextDirection((0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.getParent)(element))) {
        element.dir = inputDirection;
      } else if (element.dir) {
        element.removeAttribute('dir');
      }

      element.style.visiblity = 'hidden';
      element.classList.add('active');
      this.place();
      element.style.visiblity = '';

      if (datepicker.config.disableTouchKeyboard) {
        datepicker.inputField.blur();
      }
    }
    this.active = true;
    (0,_events_functions_js__WEBPACK_IMPORTED_MODULE_8__.triggerDatepickerEvent)(datepicker, 'show');
  }

  hide() {
    if (!this.active) {
      return;
    }
    this.datepicker.exitEditMode();
    this.element.classList.remove('active');
    this.active = false;
    (0,_events_functions_js__WEBPACK_IMPORTED_MODULE_8__.triggerDatepickerEvent)(this.datepicker, 'hide');
  }

  place() {
    const {classList, offsetParent, style} = this.element;
    const {config, inputField} = this.datepicker;
    const {
      width: calendarWidth,
      height: calendarHeight,
    } = this.element.getBoundingClientRect();
    const {
      left: inputLeft,
      top: inputTop,
      right: inputRight,
      bottom: inputBottom,
      width: inputWidth,
      height: inputHeight
    } = inputField.getBoundingClientRect();
    let {x: orientX, y: orientY} = config.orientation;
    let left = inputLeft;
    let top = inputTop;

    // caliculate offsetLeft/Top of inputField
    if (offsetParent === document.body || !offsetParent) {
      left += window.scrollX;
      top += window.scrollY;
    } else {
      const offsetParentRect = offsetParent.getBoundingClientRect();
      left -= offsetParentRect.left - offsetParent.scrollLeft;
      top -= offsetParentRect.top - offsetParent.scrollTop;
    }

    // caliculate the boundaries of the visible area that contains inputField
    const scrollParent = findScrollParents(inputField);
    let scrollAreaLeft = 0;
    let scrollAreaTop = 0;
    let {
      clientWidth: scrollAreaRight,
      clientHeight: scrollAreaBottom,
    } = document.documentElement;

    if (scrollParent) {
      const scrollParentRect = scrollParent.getBoundingClientRect();
      if (scrollParentRect.top > 0) {
        scrollAreaTop = scrollParentRect.top;
      }
      if (scrollParentRect.left > 0) {
        scrollAreaLeft = scrollParentRect.left;
      }
      if (scrollParentRect.right < scrollAreaRight) {
        scrollAreaRight = scrollParentRect.right;
      }
      if (scrollParentRect.bottom < scrollAreaBottom) {
        scrollAreaBottom = scrollParentRect.bottom;
      }
    }

    // determine the horizontal orientation and left position
    let adjustment = 0;
    if (orientX === 'auto') {
      if (inputLeft < scrollAreaLeft) {
        orientX = 'left';
        adjustment = scrollAreaLeft - inputLeft;
      } else if (inputLeft + calendarWidth > scrollAreaRight) {
        orientX = 'right';
        if (scrollAreaRight < inputRight) {
          adjustment = scrollAreaRight - inputRight;
        }
      } else if (getTextDirection(inputField) === 'rtl') {
        orientX = inputRight - calendarWidth < scrollAreaLeft ? 'left' : 'right';
      } else {
        orientX = 'left';
      }
    }
    if (orientX === 'right') {
      left += inputWidth - calendarWidth;
    }
    left += adjustment;

    // determine the vertical orientation and top position
    if (orientY === 'auto') {
      if (inputTop - calendarHeight > scrollAreaTop) {
        orientY = inputBottom + calendarHeight > scrollAreaBottom ? 'top' : 'bottom';
      } else {
        orientY = 'bottom';
      }
    }
    if (orientY === 'top') {
      top -= calendarHeight;
    } else {
      top += inputHeight;
    }

    classList.remove(...Object.values(orientClasses));
    classList.add(orientClasses[orientX], orientClasses[orientY]);

    style.left = toPx(left);
    style.top = toPx(top);
  }

  setViewSwitchLabel(labelText) {
    this.controls.viewSwitch.textContent = labelText;
  }

  setPrevBtnDisabled(disabled) {
    this.controls.prevBtn.disabled = disabled;
  }

  setNextBtnDisabled(disabled) {
    this.controls.nextBtn.disabled = disabled;
  }

  changeView(viewId) {
    const oldView = this.currentView;
    const newView =  this.views[viewId];
    if (newView.id !== oldView.id) {
      this.currentView = newView;
      this._renderMethod = 'render';
      (0,_events_functions_js__WEBPACK_IMPORTED_MODULE_8__.triggerDatepickerEvent)(this.datepicker, 'changeView');
      this.main.replaceChild(newView.element, oldView.element);
    }
    return this;
  }

  // Change the focused date (view date)
  changeFocus(newViewDate) {
    this._renderMethod = setViewDate(this, newViewDate) ? 'render' : 'refreshFocus';
    this.views.forEach((view) => {
      view.updateFocus();
    });
    return this;
  }

  // Apply the change of the selected dates
  update() {
    const newViewDate = computeResetViewDate(this.datepicker);
    this._renderMethod = setViewDate(this, newViewDate) ? 'render' : 'refresh';
    this.views.forEach((view) => {
      view.updateFocus();
      view.updateSelection();
    });
    return this;
  }

  // Refresh the picker UI
  render(quickRender = true) {
    const renderMethod = (quickRender && this._renderMethod) || 'render';
    delete this._renderMethod;

    this.currentView[renderMethod]();
  }
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/templates/calendarWeeksTemplate.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/templates/calendarWeeksTemplate.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");


const calendarWeeksTemplate = (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.optimizeTemplateHTML)(`<div class="calendar-weeks">
  <div class="days-of-week"><span class="dow"></span></div>
  <div class="weeks">${(0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.createTagRepeat)('span', 6, {class: 'week'})}</div>
</div>`);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calendarWeeksTemplate);


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/templates/daysTemplate.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/templates/daysTemplate.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");


const daysTemplate = (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.optimizeTemplateHTML)(`<div class="days">
  <div class="days-of-week">${(0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.createTagRepeat)('span', 7, {class: 'dow'})}</div>
  <div class="datepicker-grid">${(0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.createTagRepeat)('span', 42)}</div>
</div>`);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (daysTemplate);


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/templates/pickerTemplate.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/templates/pickerTemplate.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");


const pickerTemplate = (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.optimizeTemplateHTML)(`<div class="datepicker">
  <div class="datepicker-picker">
    <div class="datepicker-header">
      <div class="datepicker-title"></div>
      <div class="datepicker-controls">
        <button type="button" class="%buttonClass% prev-btn"></button>
        <button type="button" class="%buttonClass% view-switch"></button>
        <button type="button" class="%buttonClass% next-btn"></button>
      </div>
    </div>
    <div class="datepicker-main"></div>
    <div class="datepicker-footer">
      <div class="datepicker-controls">
        <button type="button" class="%buttonClass% today-btn"></button>
        <button type="button" class="%buttonClass% clear-btn"></button>
      </div>
    </div>
  </div>
</div>`);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pickerTemplate);


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/views/DaysView.js":
/*!***********************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/views/DaysView.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DaysView)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/date-format.js */ "./node_modules/vanillajs-datepicker/js/lib/date-format.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _templates_daysTemplate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../templates/daysTemplate.js */ "./node_modules/vanillajs-datepicker/js/picker/templates/daysTemplate.js");
/* harmony import */ var _templates_calendarWeeksTemplate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../templates/calendarWeeksTemplate.js */ "./node_modules/vanillajs-datepicker/js/picker/templates/calendarWeeksTemplate.js");
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./View.js */ "./node_modules/vanillajs-datepicker/js/picker/views/View.js");








class DaysView extends _View_js__WEBPACK_IMPORTED_MODULE_6__["default"] {
  constructor(picker) {
    super(picker, {
      id: 0,
      name: 'days',
      cellClass: 'day',
    });
  }

  init(options, onConstruction = true) {
    if (onConstruction) {
      const inner = (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__.parseHTML)(_templates_daysTemplate_js__WEBPACK_IMPORTED_MODULE_4__["default"]).firstChild;
      this.dow = inner.firstChild;
      this.grid = inner.lastChild;
      this.element.appendChild(inner);
    }
    super.init(options);
  }

  setOptions(options) {
    let updateDOW;

    if ((0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasProperty)(options, 'minDate')) {
      this.minDate = options.minDate;
    }
    if ((0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasProperty)(options, 'maxDate')) {
      this.maxDate = options.maxDate;
    }
    if (options.datesDisabled) {
      this.datesDisabled = options.datesDisabled;
    }
    if (options.daysOfWeekDisabled) {
      this.daysOfWeekDisabled = options.daysOfWeekDisabled;
      updateDOW = true;
    }
    if (options.daysOfWeekHighlighted) {
      this.daysOfWeekHighlighted = options.daysOfWeekHighlighted;
    }
    if (options.todayHighlight !== undefined) {
      this.todayHighlight = options.todayHighlight;
    }
    if (options.weekStart !== undefined) {
      this.weekStart = options.weekStart;
      this.weekEnd = options.weekEnd;
      updateDOW = true;
    }
    if (options.locale) {
      const locale = this.locale = options.locale;
      this.dayNames = locale.daysMin;
      this.switchLabelFormat = locale.titleFormat;
      updateDOW = true;
    }
    if (options.beforeShowDay !== undefined) {
      this.beforeShow = typeof options.beforeShowDay === 'function'
        ? options.beforeShowDay
        : undefined;
    }

    if (options.calendarWeeks !== undefined) {
      if (options.calendarWeeks && !this.calendarWeeks) {
        const weeksElem = (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__.parseHTML)(_templates_calendarWeeksTemplate_js__WEBPACK_IMPORTED_MODULE_5__["default"]).firstChild;
        this.calendarWeeks = {
          element: weeksElem,
          dow: weeksElem.firstChild,
          weeks: weeksElem.lastChild,
        };
        this.element.insertBefore(weeksElem, this.element.firstChild);
      } else if (this.calendarWeeks && !options.calendarWeeks) {
        this.element.removeChild(this.calendarWeeks.element);
        this.calendarWeeks = null;
      }
    }
    if (options.showDaysOfWeek !== undefined) {
      if (options.showDaysOfWeek) {
        (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__.showElement)(this.dow);
        if (this.calendarWeeks) {
          (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__.showElement)(this.calendarWeeks.dow);
        }
      } else {
        (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__.hideElement)(this.dow);
        if (this.calendarWeeks) {
          (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_3__.hideElement)(this.calendarWeeks.dow);
        }
      }
    }

    // update days-of-week when locale, daysOfweekDisabled or weekStart is changed
    if (updateDOW) {
      Array.from(this.dow.children).forEach((el, index) => {
        const dow = (this.weekStart + index) % 7;
        el.textContent = this.dayNames[dow];
        el.className = this.daysOfWeekDisabled.includes(dow) ? 'dow disabled' : 'dow';
      });
    }
  }

  // Apply update on the focused date to view's settings
  updateFocus() {
    const viewDate = new Date(this.picker.viewDate);
    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();
    const firstOfMonth = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.dateValue)(viewYear, viewMonth, 1);
    const start = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.dayOfTheWeekOf)(firstOfMonth, this.weekStart, this.weekStart);

    this.first = firstOfMonth;
    this.last = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.dateValue)(viewYear, viewMonth + 1, 0);
    this.start = start;
    this.focused = this.picker.viewDate;
  }

  // Apply update on the selected dates to view's settings
  updateSelection() {
    const {dates, rangepicker} = this.picker.datepicker;
    this.selected = dates;
    if (rangepicker) {
      this.range = rangepicker.dates;
    }
  }

   // Update the entire view UI
  render() {
    // update today marker on ever render
    this.today = this.todayHighlight ? (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.today)() : undefined;
    // refresh disabled dates on every render in order to clear the ones added
    // by beforeShow hook at previous render
    this.disabled = [...this.datesDisabled];

    const switchLabel = (0,_lib_date_format_js__WEBPACK_IMPORTED_MODULE_2__.formatDate)(this.focused, this.switchLabelFormat, this.locale);
    this.picker.setViewSwitchLabel(switchLabel);
    this.picker.setPrevBtnDisabled(this.first <= this.minDate);
    this.picker.setNextBtnDisabled(this.last >= this.maxDate);

    if (this.calendarWeeks) {
      // start of the UTC week (Monday) of the 1st of the month
      const startOfWeek = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.dayOfTheWeekOf)(this.first, 1, 1);
      Array.from(this.calendarWeeks.weeks.children).forEach((el, index) => {
        el.textContent = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.getWeek)((0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.addWeeks)(startOfWeek, index));
      });
    }
    Array.from(this.grid.children).forEach((el, index) => {
      const classList = el.classList;
      const current = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.addDays)(this.start, index);
      const date = new Date(current);
      const day = date.getDay();

      el.className = `datepicker-cell ${this.cellClass}`;
      el.dataset.date = current;
      el.textContent = date.getDate();

      if (current < this.first) {
        classList.add('prev');
      } else if (current > this.last) {
        classList.add('next');
      }
      if (this.today === current) {
        classList.add('today');
      }
      if (current < this.minDate || current > this.maxDate || this.disabled.includes(current)) {
        classList.add('disabled');
      }
      if (this.daysOfWeekDisabled.includes(day)) {
        classList.add('disabled');
        (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.pushUnique)(this.disabled, current);
      }
      if (this.daysOfWeekHighlighted.includes(day)) {
        classList.add('highlighted');
      }
      if (this.range) {
        const [rangeStart, rangeEnd] = this.range;
        if (current > rangeStart && current < rangeEnd) {
          classList.add('range');
        }
        if (current === rangeStart) {
          classList.add('range-start');
        }
        if (current === rangeEnd) {
          classList.add('range-end');
        }
      }
      if (this.selected.includes(current)) {
        classList.add('selected');
      }
      if (current === this.focused) {
        classList.add('focused');
      }

      if (this.beforeShow) {
        this.performBeforeHook(el, current, current);
      }
    });
  }

  // Update the view UI by applying the changes of selected and focused items
  refresh() {
    const [rangeStart, rangeEnd] = this.range || [];
    this.grid
      .querySelectorAll('.range, .range-start, .range-end, .selected, .focused')
      .forEach((el) => {
        el.classList.remove('range', 'range-start', 'range-end', 'selected', 'focused');
      });
    Array.from(this.grid.children).forEach((el) => {
      const current = Number(el.dataset.date);
      const classList = el.classList;
      if (current > rangeStart && current < rangeEnd) {
        classList.add('range');
      }
      if (current === rangeStart) {
        classList.add('range-start');
      }
      if (current === rangeEnd) {
        classList.add('range-end');
      }
      if (this.selected.includes(current)) {
        classList.add('selected');
      }
      if (current === this.focused) {
        classList.add('focused');
      }
    });
  }

  // Update the view UI by applying the change of focused item
  refreshFocus() {
    const index = Math.round((this.focused - this.start) / 86400000);
    this.grid.querySelectorAll('.focused').forEach((el) => {
      el.classList.remove('focused');
    });
    this.grid.children[index].classList.add('focused');
  }
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/views/MonthsView.js":
/*!*************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/views/MonthsView.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MonthsView)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./View.js */ "./node_modules/vanillajs-datepicker/js/picker/views/View.js");





function computeMonthRange(range, thisYear) {
  if (!range || !range[0] || !range[1]) {
    return;
  }

  const [[startY, startM], [endY, endM]] = range;
  if (startY > thisYear || endY < thisYear) {
    return;
  }
  return [
    startY === thisYear ? startM : -1,
    endY === thisYear ? endM : 12,
  ];
}

class MonthsView extends _View_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(picker) {
    super(picker, {
      id: 1,
      name: 'months',
      cellClass: 'month',
    });
  }

  init(options, onConstruction = true) {
    if (onConstruction) {
      this.grid = this.element;
      this.element.classList.add('months', 'datepicker-grid');
      this.grid.appendChild((0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.parseHTML)((0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.createTagRepeat)('span', 12, {'data-month': ix => ix})));
    }
    super.init(options);
  }

  setOptions(options) {
    if (options.locale) {
      this.monthNames = options.locale.monthsShort;
    }
    if ((0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasProperty)(options, 'minDate')) {
      if (options.minDate === undefined) {
        this.minYear = this.minMonth = this.minDate = undefined;
      } else {
        const minDateObj = new Date(options.minDate);
        this.minYear = minDateObj.getFullYear();
        this.minMonth = minDateObj.getMonth();
        this.minDate = minDateObj.setDate(1);
      }
    }
    if ((0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasProperty)(options, 'maxDate')) {
      if (options.maxDate === undefined) {
        this.maxYear = this.maxMonth = this.maxDate = undefined;
      } else {
        const maxDateObj = new Date(options.maxDate);
        this.maxYear = maxDateObj.getFullYear();
        this.maxMonth = maxDateObj.getMonth();
        this.maxDate = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.dateValue)(this.maxYear, this.maxMonth + 1, 0);
      }
    }
    if (this.isMinView) {
      if (options.datesDisabled) {
        this.datesDisabled = options.datesDisabled;
      }
    } else {
      this.datesDisabled = [];
    }
    if (options.beforeShowMonth !== undefined) {
      this.beforeShow = typeof options.beforeShowMonth === 'function'
        ? options.beforeShowMonth
        : undefined;
    }
  }

  // Update view's settings to reflect the viewDate set on the picker
  updateFocus() {
    const viewDate = new Date(this.picker.viewDate);
    this.year = viewDate.getFullYear();
    this.focused = viewDate.getMonth();
  }

  // Update view's settings to reflect the selected dates
  updateSelection() {
    const {dates, rangepicker} = this.picker.datepicker;
    this.selected = dates.reduce((selected, timeValue) => {
      const date = new Date(timeValue);
      const year = date.getFullYear();
      const month = date.getMonth();
      if (selected[year] === undefined) {
        selected[year] = [month];
      } else {
        (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.pushUnique)(selected[year], month);
      }
      return selected;
    }, {});
    if (rangepicker && rangepicker.dates) {
      this.range = rangepicker.dates.map(timeValue => {
        const date = new Date(timeValue);
        return isNaN(date) ? undefined : [date.getFullYear(), date.getMonth()];
      });
    }
  }

  // Update the entire view UI
  render() {
    // refresh disabled months on every render in order to clear the ones added
    // by beforeShow hook at previous render
    // this.disabled = [...this.datesDisabled];
    this.disabled = this.datesDisabled.reduce((arr, disabled) => {
      const dt = new Date(disabled);
      if (this.year === dt.getFullYear()) {
        arr.push(dt.getMonth());
      }
      return arr;
    }, []);

    this.picker.setViewSwitchLabel(this.year);
    this.picker.setPrevBtnDisabled(this.year <= this.minYear);
    this.picker.setNextBtnDisabled(this.year >= this.maxYear);

    const selected = this.selected[this.year] || [];
    const yrOutOfRange = this.year < this.minYear || this.year > this.maxYear;
    const isMinYear = this.year === this.minYear;
    const isMaxYear = this.year === this.maxYear;
    const range = computeMonthRange(this.range, this.year);

    Array.from(this.grid.children).forEach((el, index) => {
      const classList = el.classList;
      const date = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.dateValue)(this.year, index, 1);

      el.className = `datepicker-cell ${this.cellClass}`;
      if (this.isMinView) {
        el.dataset.date = date;
      }
      // reset text on every render to clear the custom content set
      // by beforeShow hook at previous render
      el.textContent = this.monthNames[index];

      if (
        yrOutOfRange
        || isMinYear && index < this.minMonth
        || isMaxYear && index > this.maxMonth
        || this.disabled.includes(index)
      ) {
        classList.add('disabled');
      }
      if (range) {
        const [rangeStart, rangeEnd] = range;
        if (index > rangeStart && index < rangeEnd) {
          classList.add('range');
        }
        if (index === rangeStart) {
          classList.add('range-start');
        }
        if (index === rangeEnd) {
          classList.add('range-end');
        }
      }
      if (selected.includes(index)) {
        classList.add('selected');
      }
      if (index === this.focused) {
        classList.add('focused');
      }

      if (this.beforeShow) {
        this.performBeforeHook(el, index, date);
      }
    });
  }

  // Update the view UI by applying the changes of selected and focused items
  refresh() {
    const selected = this.selected[this.year] || [];
    const [rangeStart, rangeEnd] = computeMonthRange(this.range, this.year) || [];
    this.grid
      .querySelectorAll('.range, .range-start, .range-end, .selected, .focused')
      .forEach((el) => {
        el.classList.remove('range', 'range-start', 'range-end', 'selected', 'focused');
      });
    Array.from(this.grid.children).forEach((el, index) => {
      const classList = el.classList;
      if (index > rangeStart && index < rangeEnd) {
        classList.add('range');
      }
      if (index === rangeStart) {
        classList.add('range-start');
      }
      if (index === rangeEnd) {
        classList.add('range-end');
      }
      if (selected.includes(index)) {
        classList.add('selected');
      }
      if (index === this.focused) {
        classList.add('focused');
      }
    });
  }

  // Update the view UI by applying the change of focused item
  refreshFocus() {
    this.grid.querySelectorAll('.focused').forEach((el) => {
      el.classList.remove('focused');
    });
    this.grid.children[this.focused].classList.add('focused');
  }
}

/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/views/View.js":
/*!*******************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/views/View.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");



// Base class of the view classes
class View {
  constructor(picker, config) {
    Object.assign(this, config, {
      picker,
      element: (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_1__.parseHTML)(`<div class="datepicker-view"></div>`).firstChild,
      selected: [],
    });
    this.init(this.picker.datepicker.config);
  }

  init(options) {
    if (options.pickLevel !== undefined) {
      this.isMinView = this.id === options.pickLevel;
    }
    this.setOptions(options);
    this.updateFocus();
    this.updateSelection();
  }

  // Execute beforeShow() callback and apply the result to the element
  // args:
  // - current - current value on the iteration on view rendering
  // - timeValue - time value of the date to pass to beforeShow()
  performBeforeHook(el, current, timeValue) {
    let result = this.beforeShow(new Date(timeValue));
    switch (typeof result) {
      case 'boolean':
        result = {enabled: result};
        break;
      case 'string':
        result = {classes: result};
    }

    if (result) {
      if (result.enabled === false) {
        el.classList.add('disabled');
        (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.pushUnique)(this.disabled, current);
      }
      if (result.classes) {
        const extraClasses = result.classes.split(/\s+/);
        el.classList.add(...extraClasses);
        if (extraClasses.includes('disabled')) {
          (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.pushUnique)(this.disabled, current);
        }
      }
      if (result.content) {
        (0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_1__.replaceChildNodes)(el, result.content);
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/vanillajs-datepicker/js/picker/views/YearsView.js":
/*!************************************************************************!*\
  !*** ./node_modules/vanillajs-datepicker/js/picker/views/YearsView.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ YearsView)
/* harmony export */ });
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ "./node_modules/vanillajs-datepicker/js/lib/utils.js");
/* harmony import */ var _lib_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/date.js */ "./node_modules/vanillajs-datepicker/js/lib/date.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/dom.js */ "./node_modules/vanillajs-datepicker/js/lib/dom.js");
/* harmony import */ var _View_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./View.js */ "./node_modules/vanillajs-datepicker/js/picker/views/View.js");





function toTitleCase(word) {
  return [...word].reduce((str, ch, ix) => str += ix ? ch : ch.toUpperCase(), '');
}

// Class representing the years and decades view elements
class YearsView extends _View_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(picker, config) {
    super(picker, config);
  }

  init(options, onConstruction = true) {
    if (onConstruction) {
      this.navStep = this.step * 10;
      this.beforeShowOption = `beforeShow${toTitleCase(this.cellClass)}`;
      this.grid = this.element;
      this.element.classList.add(this.name, 'datepicker-grid');
      this.grid.appendChild((0,_lib_dom_js__WEBPACK_IMPORTED_MODULE_2__.parseHTML)((0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.createTagRepeat)('span', 12)));
    }
    super.init(options);
  }

  setOptions(options) {
    if ((0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasProperty)(options, 'minDate')) {
      if (options.minDate === undefined) {
        this.minYear = this.minDate = undefined;
      } else {
        this.minYear = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.startOfYearPeriod)(options.minDate, this.step);
        this.minDate = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.dateValue)(this.minYear, 0, 1);
      }
    }
    if ((0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.hasProperty)(options, 'maxDate')) {
      if (options.maxDate === undefined) {
        this.maxYear = this.maxDate = undefined;
      } else {
        this.maxYear = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.startOfYearPeriod)(options.maxDate, this.step);
        this.maxDate = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.dateValue)(this.maxYear, 11, 31);
      }
    }
    if (this.isMinView) {
      if (options.datesDisabled) {
        this.datesDisabled = options.datesDisabled;
      }
    } else {
      this.datesDisabled = [];
    }
    if (options[this.beforeShowOption] !== undefined) {
      const beforeShow = options[this.beforeShowOption];
      this.beforeShow = typeof beforeShow === 'function' ? beforeShow : undefined;
    }
  }

  // Update view's settings to reflect the viewDate set on the picker
  updateFocus() {
    const viewDate = new Date(this.picker.viewDate);
    const first = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.startOfYearPeriod)(viewDate, this.navStep);
    const last = first + 9 * this.step;

    this.first = first;
    this.last = last;
    this.start = first - this.step;
    this.focused = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.startOfYearPeriod)(viewDate, this.step);
  }

  // Update view's settings to reflect the selected dates
  updateSelection() {
    const {dates, rangepicker} = this.picker.datepicker;
    this.selected = dates.reduce((years, timeValue) => {
      return (0,_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__.pushUnique)(years, (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.startOfYearPeriod)(timeValue, this.step));
    }, []);
    if (rangepicker && rangepicker.dates) {
      this.range = rangepicker.dates.map(timeValue => {
        if (timeValue !== undefined) {
          return (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.startOfYearPeriod)(timeValue, this.step);
        }
      });
    }
  }

  // Update the entire view UI
  render() {
    // refresh disabled years on every render in order to clear the ones added
    // by beforeShow hook at previous render
    // this.disabled = [...this.datesDisabled];
    this.disabled = this.datesDisabled.map(disabled => new Date(disabled).getFullYear());

    this.picker.setViewSwitchLabel(`${this.first}-${this.last}`);
    this.picker.setPrevBtnDisabled(this.first <= this.minYear);
    this.picker.setNextBtnDisabled(this.last >= this.maxYear);

    Array.from(this.grid.children).forEach((el, index) => {
      const classList = el.classList;
      const current = this.start + (index * this.step);
      const date = (0,_lib_date_js__WEBPACK_IMPORTED_MODULE_1__.dateValue)(current, 0, 1);

      el.className = `datepicker-cell ${this.cellClass}`;
      if (this.isMinView) {
        el.dataset.date = date;
      }
      el.textContent = el.dataset.year = current;

      if (index === 0) {
        classList.add('prev');
      } else if (index === 11) {
        classList.add('next');
      }
      if (current < this.minYear || current > this.maxYear || this.disabled.includes(current)) {
        classList.add('disabled');
      }
      if (this.range) {
        const [rangeStart, rangeEnd] = this.range;
        if (current > rangeStart && current < rangeEnd) {
          classList.add('range');
        }
        if (current === rangeStart) {
          classList.add('range-start');
        }
        if (current === rangeEnd) {
          classList.add('range-end');
        }
      }
      if (this.selected.includes(current)) {
        classList.add('selected');
      }
      if (current === this.focused) {
        classList.add('focused');
      }

      if (this.beforeShow) {
        this.performBeforeHook(el, current, date);
      }
    });
  }

  // Update the view UI by applying the changes of selected and focused items
  refresh() {
    const [rangeStart, rangeEnd] = this.range || [];
    this.grid
      .querySelectorAll('.range, .range-start, .range-end, .selected, .focused')
      .forEach((el) => {
        el.classList.remove('range', 'range-start', 'range-end', 'selected', 'focused');
      });
    Array.from(this.grid.children).forEach((el) => {
      const current = Number(el.textContent);
      const classList = el.classList;
      if (current > rangeStart && current < rangeEnd) {
        classList.add('range');
      }
      if (current === rangeStart) {
        classList.add('range-start');
      }
      if (current === rangeEnd) {
        classList.add('range-end');
      }
      if (this.selected.includes(current)) {
        classList.add('selected');
      }
      if (current === this.focused) {
        classList.add('focused');
      }
    });
  }

  // Update the view UI by applying the change of focused item
  refreshFocus() {
    const index = Math.round((this.focused - this.start) / this.step);
    this.grid.querySelectorAll('.focused').forEach((el) => {
      el.classList.remove('focused');
    });
    this.grid.children[index].classList.add('focused');
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.js */ "./src/ui.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task.js */ "./src/task.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
//render inbox





(() => {
    renderDefaultProjects();

    _ui_js__WEBPACK_IMPORTED_MODULE_0__["default"].initialRender();

    function renderDefaultProjects(){
        let inbox = (0,_project_js__WEBPACK_IMPORTED_MODULE_1__["default"])('Inbox');
/*         let today = project('Today');
        let thisweek = project('This Week'); */
        let haveFun = (0,_task_js__WEBPACK_IMPORTED_MODULE_2__["default"])("Have Fun","Learn a lot while having fun");
        _storage_js__WEBPACK_IMPORTED_MODULE_3__["default"].addProject(inbox);
        inbox.addTask(haveFun);
/*         storage.addProject(today);
        storage.addProject(thisweek); */
    }


})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsaUVBQWUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7O0FDakNpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHNEQUFZO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUZuQjtBQUNtQztBQUNOO0FBQ007QUFDVztBQUNXO0FBQ3RCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixzRUFBMEI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVFQUEyQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLHVEQUFPO0FBQ2hELHdCQUF3Qiw4REFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLCtEQUFtQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsR0FBRyxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDREQUFZLGtDQUFrQyxvQkFBb0I7QUFDdEY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDUDtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuR0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlEQTtBQUNBLE9BQU8sdUNBQXVDOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQO0FBQ0E7QUFDQTtB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QUksNERBQWdCO0FBQ3BCO0FBQ0E7QUFDQSxvQkFBb0IsdURBQU87QUFDM0I7QUFDQSw2Q0FBNkM7QUFDN0Msc0JBQXNCLG9EQUFJO0FBQzFCLFFBQVEsOERBQWtCO0FBQzFCO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvY3JlYXRlUG9wcGVyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9jb250YWlucy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRDbGlwcGluZ1JlY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldENvbXBvc2l0ZVJlY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldENvbXB1dGVkU3R5bGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRSZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRIVE1MRWxlbWVudFNjcm9sbC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZU5hbWUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldE5vZGVTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldE9mZnNldFBhcmVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0UGFyZW50Tm9kZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0U2Nyb2xsUGFyZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRWaWV3cG9ydFJlY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFdpbmRvdy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0V2luZG93U2Nyb2xsLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pc0xheW91dFZpZXdwb3J0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pc1Njcm9sbFBhcmVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaXNUYWJsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2xpc3RTY3JvbGxQYXJlbnRzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2VudW1zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9hcHBseVN0eWxlcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvYXJyb3cuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2NvbXB1dGVTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9mbGlwLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9oaWRlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvb2Zmc2V0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9wb3BwZXJPZmZzZXRzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9wcmV2ZW50T3ZlcmZsb3cuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvcG9wcGVyLWxpdGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvcG9wcGVyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2NvbXB1dGVBdXRvUGxhY2VtZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2NvbXB1dGVPZmZzZXRzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2RlYm91bmNlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2V4cGFuZFRvSGFzaE1hcC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9mb3JtYXQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0QWx0QXhpcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEZyZXNoU2lkZU9iamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0T3Bwb3NpdGVQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0VmFyaWF0aW9uLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL21hdGguanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWVyZ2VCeU5hbWUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWVyZ2VQYWRkaW5nT2JqZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL29yZGVyTW9kaWZpZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3JlY3RUb0NsaWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvdW5pcXVlQnkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvdXNlckFnZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3ZhbGlkYXRlTW9kaWZpZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3dpdGhpbi5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2hlbHBlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3VidGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL0RhdGVwaWNrZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9ldmVudHMvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvZXZlbnRzL2lucHV0RmllbGRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9ldmVudHMvb3RoZXJMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9ldmVudHMvcGlja2VyTGlzdGVuZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvaTE4bi9iYXNlLWxvY2FsZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9saWIvZGF0ZS1mb3JtYXQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9saWIvZGF0ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2xpYi9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9saWIvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9vcHRpb25zL2RlZmF1bHRPcHRpb25zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvb3B0aW9ucy9wcm9jZXNzT3B0aW9ucy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL3BpY2tlci9QaWNrZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9waWNrZXIvdGVtcGxhdGVzL2NhbGVuZGFyV2Vla3NUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL3BpY2tlci90ZW1wbGF0ZXMvZGF5c1RlbXBsYXRlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvcGlja2VyL3RlbXBsYXRlcy9waWNrZXJUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL3BpY2tlci92aWV3cy9EYXlzVmlldy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL3BpY2tlci92aWV3cy9Nb250aHNWaWV3LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvcGlja2VyL3ZpZXdzL1ZpZXcuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9waWNrZXIvdmlld3MvWWVhcnNWaWV3LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnZXRDb21wb3NpdGVSZWN0IGZyb20gXCIuL2RvbS11dGlscy9nZXRDb21wb3NpdGVSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qc1wiO1xuaW1wb3J0IGxpc3RTY3JvbGxQYXJlbnRzIGZyb20gXCIuL2RvbS11dGlscy9saXN0U2Nyb2xsUGFyZW50cy5qc1wiO1xuaW1wb3J0IGdldE9mZnNldFBhcmVudCBmcm9tIFwiLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IG9yZGVyTW9kaWZpZXJzIGZyb20gXCIuL3V0aWxzL29yZGVyTW9kaWZpZXJzLmpzXCI7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSBcIi4vdXRpbHMvZGVib3VuY2UuanNcIjtcbmltcG9ydCB2YWxpZGF0ZU1vZGlmaWVycyBmcm9tIFwiLi91dGlscy92YWxpZGF0ZU1vZGlmaWVycy5qc1wiO1xuaW1wb3J0IHVuaXF1ZUJ5IGZyb20gXCIuL3V0aWxzL3VuaXF1ZUJ5LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgbWVyZ2VCeU5hbWUgZnJvbSBcIi4vdXRpbHMvbWVyZ2VCeU5hbWUuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi91dGlscy9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IHsgaXNFbGVtZW50IH0gZnJvbSBcIi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCB7IGF1dG8gfSBmcm9tIFwiLi9lbnVtcy5qc1wiO1xudmFyIElOVkFMSURfRUxFTUVOVF9FUlJPUiA9ICdQb3BwZXI6IEludmFsaWQgcmVmZXJlbmNlIG9yIHBvcHBlciBhcmd1bWVudCBwcm92aWRlZC4gVGhleSBtdXN0IGJlIGVpdGhlciBhIERPTSBlbGVtZW50IG9yIHZpcnR1YWwgZWxlbWVudC4nO1xudmFyIElORklOSVRFX0xPT1BfRVJST1IgPSAnUG9wcGVyOiBBbiBpbmZpbml0ZSBsb29wIGluIHRoZSBtb2RpZmllcnMgY3ljbGUgaGFzIGJlZW4gZGV0ZWN0ZWQhIFRoZSBjeWNsZSBoYXMgYmVlbiBpbnRlcnJ1cHRlZCB0byBwcmV2ZW50IGEgYnJvd3NlciBjcmFzaC4nO1xudmFyIERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgbW9kaWZpZXJzOiBbXSxcbiAgc3RyYXRlZ3k6ICdhYnNvbHV0ZSdcbn07XG5cbmZ1bmN0aW9uIGFyZVZhbGlkRWxlbWVudHMoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gIWFyZ3Muc29tZShmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHJldHVybiAhKGVsZW1lbnQgJiYgdHlwZW9mIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID09PSAnZnVuY3Rpb24nKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3BwZXJHZW5lcmF0b3IoZ2VuZXJhdG9yT3B0aW9ucykge1xuICBpZiAoZ2VuZXJhdG9yT3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgZ2VuZXJhdG9yT3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9nZW5lcmF0b3JPcHRpb25zID0gZ2VuZXJhdG9yT3B0aW9ucyxcbiAgICAgIF9nZW5lcmF0b3JPcHRpb25zJGRlZiA9IF9nZW5lcmF0b3JPcHRpb25zLmRlZmF1bHRNb2RpZmllcnMsXG4gICAgICBkZWZhdWx0TW9kaWZpZXJzID0gX2dlbmVyYXRvck9wdGlvbnMkZGVmID09PSB2b2lkIDAgPyBbXSA6IF9nZW5lcmF0b3JPcHRpb25zJGRlZixcbiAgICAgIF9nZW5lcmF0b3JPcHRpb25zJGRlZjIgPSBfZ2VuZXJhdG9yT3B0aW9ucy5kZWZhdWx0T3B0aW9ucyxcbiAgICAgIGRlZmF1bHRPcHRpb25zID0gX2dlbmVyYXRvck9wdGlvbnMkZGVmMiA9PT0gdm9pZCAwID8gREVGQVVMVF9PUFRJT05TIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmMjtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZVBvcHBlcihyZWZlcmVuY2UsIHBvcHBlciwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucztcbiAgICB9XG5cbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgICAgb3JkZXJlZE1vZGlmaWVyczogW10sXG4gICAgICBvcHRpb25zOiBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX09QVElPTlMsIGRlZmF1bHRPcHRpb25zKSxcbiAgICAgIG1vZGlmaWVyc0RhdGE6IHt9LFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgcmVmZXJlbmNlOiByZWZlcmVuY2UsXG4gICAgICAgIHBvcHBlcjogcG9wcGVyXG4gICAgICB9LFxuICAgICAgYXR0cmlidXRlczoge30sXG4gICAgICBzdHlsZXM6IHt9XG4gICAgfTtcbiAgICB2YXIgZWZmZWN0Q2xlYW51cEZucyA9IFtdO1xuICAgIHZhciBpc0Rlc3Ryb3llZCA9IGZhbHNlO1xuICAgIHZhciBpbnN0YW5jZSA9IHtcbiAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgIHNldE9wdGlvbnM6IGZ1bmN0aW9uIHNldE9wdGlvbnMoc2V0T3B0aW9uc0FjdGlvbikge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzZXRPcHRpb25zQWN0aW9uID09PSAnZnVuY3Rpb24nID8gc2V0T3B0aW9uc0FjdGlvbihzdGF0ZS5vcHRpb25zKSA6IHNldE9wdGlvbnNBY3Rpb247XG4gICAgICAgIGNsZWFudXBNb2RpZmllckVmZmVjdHMoKTtcbiAgICAgICAgc3RhdGUub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBzdGF0ZS5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgc3RhdGUuc2Nyb2xsUGFyZW50cyA9IHtcbiAgICAgICAgICByZWZlcmVuY2U6IGlzRWxlbWVudChyZWZlcmVuY2UpID8gbGlzdFNjcm9sbFBhcmVudHMocmVmZXJlbmNlKSA6IHJlZmVyZW5jZS5jb250ZXh0RWxlbWVudCA/IGxpc3RTY3JvbGxQYXJlbnRzKHJlZmVyZW5jZS5jb250ZXh0RWxlbWVudCkgOiBbXSxcbiAgICAgICAgICBwb3BwZXI6IGxpc3RTY3JvbGxQYXJlbnRzKHBvcHBlcilcbiAgICAgICAgfTsgLy8gT3JkZXJzIHRoZSBtb2RpZmllcnMgYmFzZWQgb24gdGhlaXIgZGVwZW5kZW5jaWVzIGFuZCBgcGhhc2VgXG4gICAgICAgIC8vIHByb3BlcnRpZXNcblxuICAgICAgICB2YXIgb3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyTW9kaWZpZXJzKG1lcmdlQnlOYW1lKFtdLmNvbmNhdChkZWZhdWx0TW9kaWZpZXJzLCBzdGF0ZS5vcHRpb25zLm1vZGlmaWVycykpKTsgLy8gU3RyaXAgb3V0IGRpc2FibGVkIG1vZGlmaWVyc1xuXG4gICAgICAgIHN0YXRlLm9yZGVyZWRNb2RpZmllcnMgPSBvcmRlcmVkTW9kaWZpZXJzLmZpbHRlcihmdW5jdGlvbiAobSkge1xuICAgICAgICAgIHJldHVybiBtLmVuYWJsZWQ7XG4gICAgICAgIH0pOyAvLyBWYWxpZGF0ZSB0aGUgcHJvdmlkZWQgbW9kaWZpZXJzIHNvIHRoYXQgdGhlIGNvbnN1bWVyIHdpbGwgZ2V0IHdhcm5lZFxuICAgICAgICAvLyBpZiBvbmUgb2YgdGhlIG1vZGlmaWVycyBpcyBpbnZhbGlkIGZvciBhbnkgcmVhc29uXG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgIHZhciBtb2RpZmllcnMgPSB1bmlxdWVCeShbXS5jb25jYXQob3JkZXJlZE1vZGlmaWVycywgc3RhdGUub3B0aW9ucy5tb2RpZmllcnMpLCBmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBfcmVmLm5hbWU7XG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZGF0ZU1vZGlmaWVycyhtb2RpZmllcnMpO1xuXG4gICAgICAgICAgaWYgKGdldEJhc2VQbGFjZW1lbnQoc3RhdGUub3B0aW9ucy5wbGFjZW1lbnQpID09PSBhdXRvKSB7XG4gICAgICAgICAgICB2YXIgZmxpcE1vZGlmaWVyID0gc3RhdGUub3JkZXJlZE1vZGlmaWVycy5maW5kKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgICAgICAgICB2YXIgbmFtZSA9IF9yZWYyLm5hbWU7XG4gICAgICAgICAgICAgIHJldHVybiBuYW1lID09PSAnZmxpcCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFmbGlwTW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhdXRvXCIgcGxhY2VtZW50cyByZXF1aXJlIHRoZSBcImZsaXBcIiBtb2RpZmllciBiZScsICdwcmVzZW50IGFuZCBlbmFibGVkIHRvIHdvcmsuJ10uam9pbignICcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgX2dldENvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHBvcHBlciksXG4gICAgICAgICAgICAgIG1hcmdpblRvcCA9IF9nZXRDb21wdXRlZFN0eWxlLm1hcmdpblRvcCxcbiAgICAgICAgICAgICAgbWFyZ2luUmlnaHQgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5SaWdodCxcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luQm90dG9tLFxuICAgICAgICAgICAgICBtYXJnaW5MZWZ0ID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luTGVmdDsgLy8gV2Ugbm8gbG9uZ2VyIHRha2UgaW50byBhY2NvdW50IGBtYXJnaW5zYCBvbiB0aGUgcG9wcGVyLCBhbmQgaXQgY2FuXG4gICAgICAgICAgLy8gY2F1c2UgYnVncyB3aXRoIHBvc2l0aW9uaW5nLCBzbyB3ZSdsbCB3YXJuIHRoZSBjb25zdW1lclxuXG5cbiAgICAgICAgICBpZiAoW21hcmdpblRvcCwgbWFyZ2luUmlnaHQsIG1hcmdpbkJvdHRvbSwgbWFyZ2luTGVmdF0uc29tZShmdW5jdGlvbiAobWFyZ2luKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChtYXJnaW4pO1xuICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oWydQb3BwZXI6IENTUyBcIm1hcmdpblwiIHN0eWxlcyBjYW5ub3QgYmUgdXNlZCB0byBhcHBseSBwYWRkaW5nJywgJ2JldHdlZW4gdGhlIHBvcHBlciBhbmQgaXRzIHJlZmVyZW5jZSBlbGVtZW50IG9yIGJvdW5kYXJ5LicsICdUbyByZXBsaWNhdGUgbWFyZ2luLCB1c2UgdGhlIGBvZmZzZXRgIG1vZGlmaWVyLCBhcyB3ZWxsIGFzJywgJ3RoZSBgcGFkZGluZ2Agb3B0aW9uIGluIHRoZSBgcHJldmVudE92ZXJmbG93YCBhbmQgYGZsaXBgJywgJ21vZGlmaWVycy4nXS5qb2luKCcgJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bk1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UudXBkYXRlKCk7XG4gICAgICB9LFxuICAgICAgLy8gU3luYyB1cGRhdGUg4oCTIGl0IHdpbGwgYWx3YXlzIGJlIGV4ZWN1dGVkLCBldmVuIGlmIG5vdCBuZWNlc3NhcnkuIFRoaXNcbiAgICAgIC8vIGlzIHVzZWZ1bCBmb3IgbG93IGZyZXF1ZW5jeSB1cGRhdGVzIHdoZXJlIHN5bmMgYmVoYXZpb3Igc2ltcGxpZmllcyB0aGVcbiAgICAgIC8vIGxvZ2ljLlxuICAgICAgLy8gRm9yIGhpZ2ggZnJlcXVlbmN5IHVwZGF0ZXMgKGUuZy4gYHJlc2l6ZWAgYW5kIGBzY3JvbGxgIGV2ZW50cyksIGFsd2F5c1xuICAgICAgLy8gcHJlZmVyIHRoZSBhc3luYyBQb3BwZXIjdXBkYXRlIG1ldGhvZFxuICAgICAgZm9yY2VVcGRhdGU6IGZ1bmN0aW9uIGZvcmNlVXBkYXRlKCkge1xuICAgICAgICBpZiAoaXNEZXN0cm95ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX3N0YXRlJGVsZW1lbnRzID0gc3RhdGUuZWxlbWVudHMsXG4gICAgICAgICAgICByZWZlcmVuY2UgPSBfc3RhdGUkZWxlbWVudHMucmVmZXJlbmNlLFxuICAgICAgICAgICAgcG9wcGVyID0gX3N0YXRlJGVsZW1lbnRzLnBvcHBlcjsgLy8gRG9uJ3QgcHJvY2VlZCBpZiBgcmVmZXJlbmNlYCBvciBgcG9wcGVyYCBhcmUgbm90IHZhbGlkIGVsZW1lbnRzXG4gICAgICAgIC8vIGFueW1vcmVcblxuICAgICAgICBpZiAoIWFyZVZhbGlkRWxlbWVudHMocmVmZXJlbmNlLCBwb3BwZXIpKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihJTlZBTElEX0VMRU1FTlRfRVJST1IpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyBTdG9yZSB0aGUgcmVmZXJlbmNlIGFuZCBwb3BwZXIgcmVjdHMgdG8gYmUgcmVhZCBieSBtb2RpZmllcnNcblxuXG4gICAgICAgIHN0YXRlLnJlY3RzID0ge1xuICAgICAgICAgIHJlZmVyZW5jZTogZ2V0Q29tcG9zaXRlUmVjdChyZWZlcmVuY2UsIGdldE9mZnNldFBhcmVudChwb3BwZXIpLCBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5ID09PSAnZml4ZWQnKSxcbiAgICAgICAgICBwb3BwZXI6IGdldExheW91dFJlY3QocG9wcGVyKVxuICAgICAgICB9OyAvLyBNb2RpZmllcnMgaGF2ZSB0aGUgYWJpbGl0eSB0byByZXNldCB0aGUgY3VycmVudCB1cGRhdGUgY3ljbGUuIFRoZVxuICAgICAgICAvLyBtb3N0IGNvbW1vbiB1c2UgY2FzZSBmb3IgdGhpcyBpcyB0aGUgYGZsaXBgIG1vZGlmaWVyIGNoYW5naW5nIHRoZVxuICAgICAgICAvLyBwbGFjZW1lbnQsIHdoaWNoIHRoZW4gbmVlZHMgdG8gcmUtcnVuIGFsbCB0aGUgbW9kaWZpZXJzLCBiZWNhdXNlIHRoZVxuICAgICAgICAvLyBsb2dpYyB3YXMgcHJldmlvdXNseSByYW4gZm9yIHRoZSBwcmV2aW91cyBwbGFjZW1lbnQgYW5kIGlzIHRoZXJlZm9yZVxuICAgICAgICAvLyBzdGFsZS9pbmNvcnJlY3RcblxuICAgICAgICBzdGF0ZS5yZXNldCA9IGZhbHNlO1xuICAgICAgICBzdGF0ZS5wbGFjZW1lbnQgPSBzdGF0ZS5vcHRpb25zLnBsYWNlbWVudDsgLy8gT24gZWFjaCB1cGRhdGUgY3ljbGUsIHRoZSBgbW9kaWZpZXJzRGF0YWAgcHJvcGVydHkgZm9yIGVhY2ggbW9kaWZpZXJcbiAgICAgICAgLy8gaXMgZmlsbGVkIHdpdGggdGhlIGluaXRpYWwgZGF0YSBzcGVjaWZpZWQgYnkgdGhlIG1vZGlmaWVyLiBUaGlzIG1lYW5zXG4gICAgICAgIC8vIGl0IGRvZXNuJ3QgcGVyc2lzdCBhbmQgaXMgZnJlc2ggb24gZWFjaCB1cGRhdGUuXG4gICAgICAgIC8vIFRvIGVuc3VyZSBwZXJzaXN0ZW50IGRhdGEsIHVzZSBgJHtuYW1lfSNwZXJzaXN0ZW50YFxuXG4gICAgICAgIHN0YXRlLm9yZGVyZWRNb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUubW9kaWZpZXJzRGF0YVttb2RpZmllci5uYW1lXSA9IE9iamVjdC5hc3NpZ24oe30sIG1vZGlmaWVyLmRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIF9fZGVidWdfbG9vcHNfXyA9IDA7XG5cbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHN0YXRlLm9yZGVyZWRNb2RpZmllcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgX19kZWJ1Z19sb29wc19fICs9IDE7XG5cbiAgICAgICAgICAgIGlmIChfX2RlYnVnX2xvb3BzX18gPiAxMDApIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihJTkZJTklURV9MT09QX0VSUk9SKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHN0YXRlLnJlc2V0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzdGF0ZS5yZXNldCA9IGZhbHNlO1xuICAgICAgICAgICAgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfc3RhdGUkb3JkZXJlZE1vZGlmaWUgPSBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzW2luZGV4XSxcbiAgICAgICAgICAgICAgZm4gPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUuZm4sXG4gICAgICAgICAgICAgIF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIgPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUub3B0aW9ucyxcbiAgICAgICAgICAgICAgX29wdGlvbnMgPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUyID09PSB2b2lkIDAgPyB7fSA6IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIsXG4gICAgICAgICAgICAgIG5hbWUgPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUubmFtZTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHN0YXRlID0gZm4oe1xuICAgICAgICAgICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IF9vcHRpb25zLFxuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICBpbnN0YW5jZTogaW5zdGFuY2VcbiAgICAgICAgICAgIH0pIHx8IHN0YXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIEFzeW5jIGFuZCBvcHRpbWlzdGljYWxseSBvcHRpbWl6ZWQgdXBkYXRlIOKAkyBpdCB3aWxsIG5vdCBiZSBleGVjdXRlZCBpZlxuICAgICAgLy8gbm90IG5lY2Vzc2FyeSAoZGVib3VuY2VkIHRvIHJ1biBhdCBtb3N0IG9uY2UtcGVyLXRpY2spXG4gICAgICB1cGRhdGU6IGRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgaW5zdGFuY2UuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICByZXNvbHZlKHN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSxcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIGNsZWFudXBNb2RpZmllckVmZmVjdHMoKTtcbiAgICAgICAgaXNEZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoIWFyZVZhbGlkRWxlbWVudHMocmVmZXJlbmNlLCBwb3BwZXIpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoSU5WQUxJRF9FTEVNRU5UX0VSUk9SKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cblxuICAgIGluc3RhbmNlLnNldE9wdGlvbnMob3B0aW9ucykudGhlbihmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgIGlmICghaXNEZXN0cm95ZWQgJiYgb3B0aW9ucy5vbkZpcnN0VXBkYXRlKSB7XG4gICAgICAgIG9wdGlvbnMub25GaXJzdFVwZGF0ZShzdGF0ZSk7XG4gICAgICB9XG4gICAgfSk7IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIGV4ZWN1dGUgYXJiaXRyYXJ5IGNvZGUgYmVmb3JlIHRoZSBmaXJzdFxuICAgIC8vIHVwZGF0ZSBjeWNsZSBydW5zLiBUaGV5IHdpbGwgYmUgZXhlY3V0ZWQgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIHVwZGF0ZVxuICAgIC8vIGN5Y2xlLiBUaGlzIGlzIHVzZWZ1bCB3aGVuIGEgbW9kaWZpZXIgYWRkcyBzb21lIHBlcnNpc3RlbnQgZGF0YSB0aGF0XG4gICAgLy8gb3RoZXIgbW9kaWZpZXJzIG5lZWQgdG8gdXNlLCBidXQgdGhlIG1vZGlmaWVyIGlzIHJ1biBhZnRlciB0aGUgZGVwZW5kZW50XG4gICAgLy8gb25lLlxuXG4gICAgZnVuY3Rpb24gcnVuTW9kaWZpZXJFZmZlY3RzKCkge1xuICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgICB2YXIgbmFtZSA9IF9yZWYzLm5hbWUsXG4gICAgICAgICAgICBfcmVmMyRvcHRpb25zID0gX3JlZjMub3B0aW9ucyxcbiAgICAgICAgICAgIG9wdGlvbnMgPSBfcmVmMyRvcHRpb25zID09PSB2b2lkIDAgPyB7fSA6IF9yZWYzJG9wdGlvbnMsXG4gICAgICAgICAgICBlZmZlY3QgPSBfcmVmMy5lZmZlY3Q7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlZmZlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YXIgY2xlYW51cEZuID0gZWZmZWN0KHtcbiAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBpbnN0YW5jZTogaW5zdGFuY2UsXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgbm9vcEZuID0gZnVuY3Rpb24gbm9vcEZuKCkge307XG5cbiAgICAgICAgICBlZmZlY3RDbGVhbnVwRm5zLnB1c2goY2xlYW51cEZuIHx8IG5vb3BGbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFudXBNb2RpZmllckVmZmVjdHMoKSB7XG4gICAgICBlZmZlY3RDbGVhbnVwRm5zLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHJldHVybiBmbigpO1xuICAgICAgfSk7XG4gICAgICBlZmZlY3RDbGVhbnVwRm5zID0gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xufVxuZXhwb3J0IHZhciBjcmVhdGVQb3BwZXIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKCk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgZGV0ZWN0T3ZlcmZsb3cgfTsiLCJpbXBvcnQgeyBpc1NoYWRvd1Jvb3QgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb250YWlucyhwYXJlbnQsIGNoaWxkKSB7XG4gIHZhciByb290Tm9kZSA9IGNoaWxkLmdldFJvb3ROb2RlICYmIGNoaWxkLmdldFJvb3ROb2RlKCk7IC8vIEZpcnN0LCBhdHRlbXB0IHdpdGggZmFzdGVyIG5hdGl2ZSBtZXRob2RcblxuICBpZiAocGFyZW50LmNvbnRhaW5zKGNoaWxkKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIHRoZW4gZmFsbGJhY2sgdG8gY3VzdG9tIGltcGxlbWVudGF0aW9uIHdpdGggU2hhZG93IERPTSBzdXBwb3J0XG4gIGVsc2UgaWYgKHJvb3ROb2RlICYmIGlzU2hhZG93Um9vdChyb290Tm9kZSkpIHtcbiAgICAgIHZhciBuZXh0ID0gY2hpbGQ7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKG5leHQgJiYgcGFyZW50LmlzU2FtZU5vZGUobmV4dCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ106IG5lZWQgYSBiZXR0ZXIgd2F5IHRvIGhhbmRsZSB0aGlzLi4uXG5cblxuICAgICAgICBuZXh0ID0gbmV4dC5wYXJlbnROb2RlIHx8IG5leHQuaG9zdDtcbiAgICAgIH0gd2hpbGUgKG5leHQpO1xuICAgIH0gLy8gR2l2ZSB1cCwgdGhlIHJlc3VsdCBpcyBmYWxzZVxuXG5cbiAgcmV0dXJuIGZhbHNlO1xufSIsImltcG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCB7IHJvdW5kIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgaXNMYXlvdXRWaWV3cG9ydCBmcm9tIFwiLi9pc0xheW91dFZpZXdwb3J0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgaW5jbHVkZVNjYWxlLCBpc0ZpeGVkU3RyYXRlZ3kpIHtcbiAgaWYgKGluY2x1ZGVTY2FsZSA9PT0gdm9pZCAwKSB7XG4gICAgaW5jbHVkZVNjYWxlID0gZmFsc2U7XG4gIH1cblxuICBpZiAoaXNGaXhlZFN0cmF0ZWd5ID09PSB2b2lkIDApIHtcbiAgICBpc0ZpeGVkU3RyYXRlZ3kgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBjbGllbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNjYWxlWCA9IDE7XG4gIHZhciBzY2FsZVkgPSAxO1xuXG4gIGlmIChpbmNsdWRlU2NhbGUgJiYgaXNIVE1MRWxlbWVudChlbGVtZW50KSkge1xuICAgIHNjYWxlWCA9IGVsZW1lbnQub2Zmc2V0V2lkdGggPiAwID8gcm91bmQoY2xpZW50UmVjdC53aWR0aCkgLyBlbGVtZW50Lm9mZnNldFdpZHRoIHx8IDEgOiAxO1xuICAgIHNjYWxlWSA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ID4gMCA/IHJvdW5kKGNsaWVudFJlY3QuaGVpZ2h0KSAvIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IDEgOiAxO1xuICB9XG5cbiAgdmFyIF9yZWYgPSBpc0VsZW1lbnQoZWxlbWVudCkgPyBnZXRXaW5kb3coZWxlbWVudCkgOiB3aW5kb3csXG4gICAgICB2aXN1YWxWaWV3cG9ydCA9IF9yZWYudmlzdWFsVmlld3BvcnQ7XG5cbiAgdmFyIGFkZFZpc3VhbE9mZnNldHMgPSAhaXNMYXlvdXRWaWV3cG9ydCgpICYmIGlzRml4ZWRTdHJhdGVneTtcbiAgdmFyIHggPSAoY2xpZW50UmVjdC5sZWZ0ICsgKGFkZFZpc3VhbE9mZnNldHMgJiYgdmlzdWFsVmlld3BvcnQgPyB2aXN1YWxWaWV3cG9ydC5vZmZzZXRMZWZ0IDogMCkpIC8gc2NhbGVYO1xuICB2YXIgeSA9IChjbGllbnRSZWN0LnRvcCArIChhZGRWaXN1YWxPZmZzZXRzICYmIHZpc3VhbFZpZXdwb3J0ID8gdmlzdWFsVmlld3BvcnQub2Zmc2V0VG9wIDogMCkpIC8gc2NhbGVZO1xuICB2YXIgd2lkdGggPSBjbGllbnRSZWN0LndpZHRoIC8gc2NhbGVYO1xuICB2YXIgaGVpZ2h0ID0gY2xpZW50UmVjdC5oZWlnaHQgLyBzY2FsZVk7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIHRvcDogeSxcbiAgICByaWdodDogeCArIHdpZHRoLFxuICAgIGJvdHRvbTogeSArIGhlaWdodCxcbiAgICBsZWZ0OiB4LFxuICAgIHg6IHgsXG4gICAgeTogeVxuICB9O1xufSIsImltcG9ydCB7IHZpZXdwb3J0IH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0Vmlld3BvcnRSZWN0IGZyb20gXCIuL2dldFZpZXdwb3J0UmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50UmVjdCBmcm9tIFwiLi9nZXREb2N1bWVudFJlY3QuanNcIjtcbmltcG9ydCBsaXN0U2Nyb2xsUGFyZW50cyBmcm9tIFwiLi9saXN0U2Nyb2xsUGFyZW50cy5qc1wiO1xuaW1wb3J0IGdldE9mZnNldFBhcmVudCBmcm9tIFwiLi9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgeyBpc0VsZW1lbnQsIGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGNvbnRhaW5zIGZyb20gXCIuL2NvbnRhaW5zLmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCByZWN0VG9DbGllbnRSZWN0IGZyb20gXCIuLi91dGlscy9yZWN0VG9DbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgeyBtYXgsIG1pbiB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5cbmZ1bmN0aW9uIGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQsIHN0cmF0ZWd5KSB7XG4gIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQsIGZhbHNlLCBzdHJhdGVneSA9PT0gJ2ZpeGVkJyk7XG4gIHJlY3QudG9wID0gcmVjdC50b3AgKyBlbGVtZW50LmNsaWVudFRvcDtcbiAgcmVjdC5sZWZ0ID0gcmVjdC5sZWZ0ICsgZWxlbWVudC5jbGllbnRMZWZ0O1xuICByZWN0LmJvdHRvbSA9IHJlY3QudG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIHJlY3QucmlnaHQgPSByZWN0LmxlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoO1xuICByZWN0LndpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgcmVjdC5oZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgcmVjdC54ID0gcmVjdC5sZWZ0O1xuICByZWN0LnkgPSByZWN0LnRvcDtcbiAgcmV0dXJuIHJlY3Q7XG59XG5cbmZ1bmN0aW9uIGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSkge1xuICByZXR1cm4gY2xpcHBpbmdQYXJlbnQgPT09IHZpZXdwb3J0ID8gcmVjdFRvQ2xpZW50UmVjdChnZXRWaWV3cG9ydFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpKSA6IGlzRWxlbWVudChjbGlwcGluZ1BhcmVudCkgPyBnZXRJbm5lckJvdW5kaW5nQ2xpZW50UmVjdChjbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpIDogcmVjdFRvQ2xpZW50UmVjdChnZXREb2N1bWVudFJlY3QoZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpKSk7XG59IC8vIEEgXCJjbGlwcGluZyBwYXJlbnRcIiBpcyBhbiBvdmVyZmxvd2FibGUgY29udGFpbmVyIHdpdGggdGhlIGNoYXJhY3RlcmlzdGljIG9mXG4vLyBjbGlwcGluZyAob3IgaGlkaW5nKSBvdmVyZmxvd2luZyBlbGVtZW50cyB3aXRoIGEgcG9zaXRpb24gZGlmZmVyZW50IGZyb21cbi8vIGBpbml0aWFsYFxuXG5cbmZ1bmN0aW9uIGdldENsaXBwaW5nUGFyZW50cyhlbGVtZW50KSB7XG4gIHZhciBjbGlwcGluZ1BhcmVudHMgPSBsaXN0U2Nyb2xsUGFyZW50cyhnZXRQYXJlbnROb2RlKGVsZW1lbnQpKTtcbiAgdmFyIGNhbkVzY2FwZUNsaXBwaW5nID0gWydhYnNvbHV0ZScsICdmaXhlZCddLmluZGV4T2YoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5wb3NpdGlvbikgPj0gMDtcbiAgdmFyIGNsaXBwZXJFbGVtZW50ID0gY2FuRXNjYXBlQ2xpcHBpbmcgJiYgaXNIVE1MRWxlbWVudChlbGVtZW50KSA/IGdldE9mZnNldFBhcmVudChlbGVtZW50KSA6IGVsZW1lbnQ7XG5cbiAgaWYgKCFpc0VsZW1lbnQoY2xpcHBlckVsZW1lbnQpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl06IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8xNDE0XG5cblxuICByZXR1cm4gY2xpcHBpbmdQYXJlbnRzLmZpbHRlcihmdW5jdGlvbiAoY2xpcHBpbmdQYXJlbnQpIHtcbiAgICByZXR1cm4gaXNFbGVtZW50KGNsaXBwaW5nUGFyZW50KSAmJiBjb250YWlucyhjbGlwcGluZ1BhcmVudCwgY2xpcHBlckVsZW1lbnQpICYmIGdldE5vZGVOYW1lKGNsaXBwaW5nUGFyZW50KSAhPT0gJ2JvZHknO1xuICB9KTtcbn0gLy8gR2V0cyB0aGUgbWF4aW11bSBhcmVhIHRoYXQgdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSBpbiBkdWUgdG8gYW55IG51bWJlciBvZlxuLy8gY2xpcHBpbmcgcGFyZW50c1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENsaXBwaW5nUmVjdChlbGVtZW50LCBib3VuZGFyeSwgcm9vdEJvdW5kYXJ5LCBzdHJhdGVneSkge1xuICB2YXIgbWFpbkNsaXBwaW5nUGFyZW50cyA9IGJvdW5kYXJ5ID09PSAnY2xpcHBpbmdQYXJlbnRzJyA/IGdldENsaXBwaW5nUGFyZW50cyhlbGVtZW50KSA6IFtdLmNvbmNhdChib3VuZGFyeSk7XG4gIHZhciBjbGlwcGluZ1BhcmVudHMgPSBbXS5jb25jYXQobWFpbkNsaXBwaW5nUGFyZW50cywgW3Jvb3RCb3VuZGFyeV0pO1xuICB2YXIgZmlyc3RDbGlwcGluZ1BhcmVudCA9IGNsaXBwaW5nUGFyZW50c1swXTtcbiAgdmFyIGNsaXBwaW5nUmVjdCA9IGNsaXBwaW5nUGFyZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjY1JlY3QsIGNsaXBwaW5nUGFyZW50KSB7XG4gICAgdmFyIHJlY3QgPSBnZXRDbGllbnRSZWN0RnJvbU1peGVkVHlwZShlbGVtZW50LCBjbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpO1xuICAgIGFjY1JlY3QudG9wID0gbWF4KHJlY3QudG9wLCBhY2NSZWN0LnRvcCk7XG4gICAgYWNjUmVjdC5yaWdodCA9IG1pbihyZWN0LnJpZ2h0LCBhY2NSZWN0LnJpZ2h0KTtcbiAgICBhY2NSZWN0LmJvdHRvbSA9IG1pbihyZWN0LmJvdHRvbSwgYWNjUmVjdC5ib3R0b20pO1xuICAgIGFjY1JlY3QubGVmdCA9IG1heChyZWN0LmxlZnQsIGFjY1JlY3QubGVmdCk7XG4gICAgcmV0dXJuIGFjY1JlY3Q7XG4gIH0sIGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGZpcnN0Q2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KSk7XG4gIGNsaXBwaW5nUmVjdC53aWR0aCA9IGNsaXBwaW5nUmVjdC5yaWdodCAtIGNsaXBwaW5nUmVjdC5sZWZ0O1xuICBjbGlwcGluZ1JlY3QuaGVpZ2h0ID0gY2xpcHBpbmdSZWN0LmJvdHRvbSAtIGNsaXBwaW5nUmVjdC50b3A7XG4gIGNsaXBwaW5nUmVjdC54ID0gY2xpcHBpbmdSZWN0LmxlZnQ7XG4gIGNsaXBwaW5nUmVjdC55ID0gY2xpcHBpbmdSZWN0LnRvcDtcbiAgcmV0dXJuIGNsaXBwaW5nUmVjdDtcbn0iLCJpbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldE5vZGVTY3JvbGwgZnJvbSBcIi4vZ2V0Tm9kZVNjcm9sbC5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldFdpbmRvd1Njcm9sbEJhclggZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsQmFyWC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuXG5mdW5jdGlvbiBpc0VsZW1lbnRTY2FsZWQoZWxlbWVudCkge1xuICB2YXIgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBzY2FsZVggPSByb3VuZChyZWN0LndpZHRoKSAvIGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgMTtcbiAgdmFyIHNjYWxlWSA9IHJvdW5kKHJlY3QuaGVpZ2h0KSAvIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IDE7XG4gIHJldHVybiBzY2FsZVggIT09IDEgfHwgc2NhbGVZICE9PSAxO1xufSAvLyBSZXR1cm5zIHRoZSBjb21wb3NpdGUgcmVjdCBvZiBhbiBlbGVtZW50IHJlbGF0aXZlIHRvIGl0cyBvZmZzZXRQYXJlbnQuXG4vLyBDb21wb3NpdGUgbWVhbnMgaXQgdGFrZXMgaW50byBhY2NvdW50IHRyYW5zZm9ybXMgYXMgd2VsbCBhcyBsYXlvdXQuXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q29tcG9zaXRlUmVjdChlbGVtZW50T3JWaXJ0dWFsRWxlbWVudCwgb2Zmc2V0UGFyZW50LCBpc0ZpeGVkKSB7XG4gIGlmIChpc0ZpeGVkID09PSB2b2lkIDApIHtcbiAgICBpc0ZpeGVkID0gZmFsc2U7XG4gIH1cblxuICB2YXIgaXNPZmZzZXRQYXJlbnRBbkVsZW1lbnQgPSBpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIHZhciBvZmZzZXRQYXJlbnRJc1NjYWxlZCA9IGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KSAmJiBpc0VsZW1lbnRTY2FsZWQob2Zmc2V0UGFyZW50KTtcbiAgdmFyIGRvY3VtZW50RWxlbWVudCA9IGdldERvY3VtZW50RWxlbWVudChvZmZzZXRQYXJlbnQpO1xuICB2YXIgcmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50T3JWaXJ0dWFsRWxlbWVudCwgb2Zmc2V0UGFyZW50SXNTY2FsZWQsIGlzRml4ZWQpO1xuICB2YXIgc2Nyb2xsID0ge1xuICAgIHNjcm9sbExlZnQ6IDAsXG4gICAgc2Nyb2xsVG9wOiAwXG4gIH07XG4gIHZhciBvZmZzZXRzID0ge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9O1xuXG4gIGlmIChpc09mZnNldFBhcmVudEFuRWxlbWVudCB8fCAhaXNPZmZzZXRQYXJlbnRBbkVsZW1lbnQgJiYgIWlzRml4ZWQpIHtcbiAgICBpZiAoZ2V0Tm9kZU5hbWUob2Zmc2V0UGFyZW50KSAhPT0gJ2JvZHknIHx8IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvMTA3OFxuICAgIGlzU2Nyb2xsUGFyZW50KGRvY3VtZW50RWxlbWVudCkpIHtcbiAgICAgIHNjcm9sbCA9IGdldE5vZGVTY3JvbGwob2Zmc2V0UGFyZW50KTtcbiAgICB9XG5cbiAgICBpZiAoaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpKSB7XG4gICAgICBvZmZzZXRzID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KG9mZnNldFBhcmVudCwgdHJ1ZSk7XG4gICAgICBvZmZzZXRzLnggKz0gb2Zmc2V0UGFyZW50LmNsaWVudExlZnQ7XG4gICAgICBvZmZzZXRzLnkgKz0gb2Zmc2V0UGFyZW50LmNsaWVudFRvcDtcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50RWxlbWVudCkge1xuICAgICAgb2Zmc2V0cy54ID0gZ2V0V2luZG93U2Nyb2xsQmFyWChkb2N1bWVudEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogcmVjdC5sZWZ0ICsgc2Nyb2xsLnNjcm9sbExlZnQgLSBvZmZzZXRzLngsXG4gICAgeTogcmVjdC50b3AgKyBzY3JvbGwuc2Nyb2xsVG9wIC0gb2Zmc2V0cy55LFxuICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgIGhlaWdodDogcmVjdC5oZWlnaHRcbiAgfTtcbn0iLCJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSB7XG4gIHJldHVybiBnZXRXaW5kb3coZWxlbWVudCkuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbn0iLCJpbXBvcnQgeyBpc0VsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkge1xuICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBhc3N1bWUgYm9keSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gIHJldHVybiAoKGlzRWxlbWVudChlbGVtZW50KSA/IGVsZW1lbnQub3duZXJEb2N1bWVudCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICBlbGVtZW50LmRvY3VtZW50KSB8fCB3aW5kb3cuZG9jdW1lbnQpLmRvY3VtZW50RWxlbWVudDtcbn0iLCJpbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IGdldFdpbmRvd1Njcm9sbEJhclggZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsQmFyWC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmltcG9ydCB7IG1heCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7IC8vIEdldHMgdGhlIGVudGlyZSBzaXplIG9mIHRoZSBzY3JvbGxhYmxlIGRvY3VtZW50IGFyZWEsIGV2ZW4gZXh0ZW5kaW5nIG91dHNpZGVcbi8vIG9mIHRoZSBgPGh0bWw+YCBhbmQgYDxib2R5PmAgcmVjdCBib3VuZHMgaWYgaG9yaXpvbnRhbGx5IHNjcm9sbGFibGVcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0RG9jdW1lbnRSZWN0KGVsZW1lbnQpIHtcbiAgdmFyIF9lbGVtZW50JG93bmVyRG9jdW1lbjtcblxuICB2YXIgaHRtbCA9IGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KTtcbiAgdmFyIHdpblNjcm9sbCA9IGdldFdpbmRvd1Njcm9sbChlbGVtZW50KTtcbiAgdmFyIGJvZHkgPSAoX2VsZW1lbnQkb3duZXJEb2N1bWVuID0gZWxlbWVudC5vd25lckRvY3VtZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2VsZW1lbnQkb3duZXJEb2N1bWVuLmJvZHk7XG4gIHZhciB3aWR0aCA9IG1heChodG1sLnNjcm9sbFdpZHRoLCBodG1sLmNsaWVudFdpZHRoLCBib2R5ID8gYm9keS5zY3JvbGxXaWR0aCA6IDAsIGJvZHkgPyBib2R5LmNsaWVudFdpZHRoIDogMCk7XG4gIHZhciBoZWlnaHQgPSBtYXgoaHRtbC5zY3JvbGxIZWlnaHQsIGh0bWwuY2xpZW50SGVpZ2h0LCBib2R5ID8gYm9keS5zY3JvbGxIZWlnaHQgOiAwLCBib2R5ID8gYm9keS5jbGllbnRIZWlnaHQgOiAwKTtcbiAgdmFyIHggPSAtd2luU2Nyb2xsLnNjcm9sbExlZnQgKyBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpO1xuICB2YXIgeSA9IC13aW5TY3JvbGwuc2Nyb2xsVG9wO1xuXG4gIGlmIChnZXRDb21wdXRlZFN0eWxlKGJvZHkgfHwgaHRtbCkuZGlyZWN0aW9uID09PSAncnRsJykge1xuICAgIHggKz0gbWF4KGh0bWwuY2xpZW50V2lkdGgsIGJvZHkgPyBib2R5LmNsaWVudFdpZHRoIDogMCkgLSB3aWR0aDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIHg6IHgsXG4gICAgeTogeVxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEhUTUxFbGVtZW50U2Nyb2xsKGVsZW1lbnQpIHtcbiAgcmV0dXJuIHtcbiAgICBzY3JvbGxMZWZ0OiBlbGVtZW50LnNjcm9sbExlZnQsXG4gICAgc2Nyb2xsVG9wOiBlbGVtZW50LnNjcm9sbFRvcFxuICB9O1xufSIsImltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7IC8vIFJldHVybnMgdGhlIGxheW91dCByZWN0IG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gaXRzIG9mZnNldFBhcmVudC4gTGF5b3V0XG4vLyBtZWFucyBpdCBkb2Vzbid0IHRha2UgaW50byBhY2NvdW50IHRyYW5zZm9ybXMuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldExheW91dFJlY3QoZWxlbWVudCkge1xuICB2YXIgY2xpZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50KTsgLy8gVXNlIHRoZSBjbGllbnRSZWN0IHNpemVzIGlmIGl0J3Mgbm90IGJlZW4gdHJhbnNmb3JtZWQuXG4gIC8vIEZpeGVzIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvMTIyM1xuXG4gIHZhciB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIHZhciBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICBpZiAoTWF0aC5hYnMoY2xpZW50UmVjdC53aWR0aCAtIHdpZHRoKSA8PSAxKSB7XG4gICAgd2lkdGggPSBjbGllbnRSZWN0LndpZHRoO1xuICB9XG5cbiAgaWYgKE1hdGguYWJzKGNsaWVudFJlY3QuaGVpZ2h0IC0gaGVpZ2h0KSA8PSAxKSB7XG4gICAgaGVpZ2h0ID0gY2xpZW50UmVjdC5oZWlnaHQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHg6IGVsZW1lbnQub2Zmc2V0TGVmdCxcbiAgICB5OiBlbGVtZW50Lm9mZnNldFRvcCxcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHRcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlTmFtZShlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50ID8gKGVsZW1lbnQubm9kZU5hbWUgfHwgJycpLnRvTG93ZXJDYXNlKCkgOiBudWxsO1xufSIsImltcG9ydCBnZXRXaW5kb3dTY3JvbGwgZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBnZXRIVE1MRWxlbWVudFNjcm9sbCBmcm9tIFwiLi9nZXRIVE1MRWxlbWVudFNjcm9sbC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Tm9kZVNjcm9sbChub2RlKSB7XG4gIGlmIChub2RlID09PSBnZXRXaW5kb3cobm9kZSkgfHwgIWlzSFRNTEVsZW1lbnQobm9kZSkpIHtcbiAgICByZXR1cm4gZ2V0V2luZG93U2Nyb2xsKG5vZGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBnZXRIVE1MRWxlbWVudFNjcm9sbChub2RlKTtcbiAgfVxufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQsIGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBpc1RhYmxlRWxlbWVudCBmcm9tIFwiLi9pc1RhYmxlRWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGdldFVBU3RyaW5nIGZyb20gXCIuLi91dGlscy91c2VyQWdlbnQuanNcIjtcblxuZnVuY3Rpb24gZ2V0VHJ1ZU9mZnNldFBhcmVudChlbGVtZW50KSB7XG4gIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAvLyBodHRwczovL2dpdGh1Yi5jb20vcG9wcGVyanMvcG9wcGVyLWNvcmUvaXNzdWVzLzgzN1xuICBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG59IC8vIGAub2Zmc2V0UGFyZW50YCByZXBvcnRzIGBudWxsYCBmb3IgZml4ZWQgZWxlbWVudHMsIHdoaWxlIGFic29sdXRlIGVsZW1lbnRzXG4vLyByZXR1cm4gdGhlIGNvbnRhaW5pbmcgYmxvY2tcblxuXG5mdW5jdGlvbiBnZXRDb250YWluaW5nQmxvY2soZWxlbWVudCkge1xuICB2YXIgaXNGaXJlZm94ID0gL2ZpcmVmb3gvaS50ZXN0KGdldFVBU3RyaW5nKCkpO1xuICB2YXIgaXNJRSA9IC9UcmlkZW50L2kudGVzdChnZXRVQVN0cmluZygpKTtcblxuICBpZiAoaXNJRSAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgLy8gSW4gSUUgOSwgMTAgYW5kIDExIGZpeGVkIGVsZW1lbnRzIGNvbnRhaW5pbmcgYmxvY2sgaXMgYWx3YXlzIGVzdGFibGlzaGVkIGJ5IHRoZSB2aWV3cG9ydFxuICAgIHZhciBlbGVtZW50Q3NzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcblxuICAgIGlmIChlbGVtZW50Q3NzLnBvc2l0aW9uID09PSAnZml4ZWQnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICB2YXIgY3VycmVudE5vZGUgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuXG4gIGlmIChpc1NoYWRvd1Jvb3QoY3VycmVudE5vZGUpKSB7XG4gICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5ob3N0O1xuICB9XG5cbiAgd2hpbGUgKGlzSFRNTEVsZW1lbnQoY3VycmVudE5vZGUpICYmIFsnaHRtbCcsICdib2R5J10uaW5kZXhPZihnZXROb2RlTmFtZShjdXJyZW50Tm9kZSkpIDwgMCkge1xuICAgIHZhciBjc3MgPSBnZXRDb21wdXRlZFN0eWxlKGN1cnJlbnROb2RlKTsgLy8gVGhpcyBpcyBub24tZXhoYXVzdGl2ZSBidXQgY292ZXJzIHRoZSBtb3N0IGNvbW1vbiBDU1MgcHJvcGVydGllcyB0aGF0XG4gICAgLy8gY3JlYXRlIGEgY29udGFpbmluZyBibG9jay5cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvQ29udGFpbmluZ19ibG9jayNpZGVudGlmeWluZ190aGVfY29udGFpbmluZ19ibG9ja1xuXG4gICAgaWYgKGNzcy50cmFuc2Zvcm0gIT09ICdub25lJyB8fCBjc3MucGVyc3BlY3RpdmUgIT09ICdub25lJyB8fCBjc3MuY29udGFpbiA9PT0gJ3BhaW50JyB8fCBbJ3RyYW5zZm9ybScsICdwZXJzcGVjdGl2ZSddLmluZGV4T2YoY3NzLndpbGxDaGFuZ2UpICE9PSAtMSB8fCBpc0ZpcmVmb3ggJiYgY3NzLndpbGxDaGFuZ2UgPT09ICdmaWx0ZXInIHx8IGlzRmlyZWZveCAmJiBjc3MuZmlsdGVyICYmIGNzcy5maWx0ZXIgIT09ICdub25lJykge1xuICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59IC8vIEdldHMgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgcG9zaXRpb25lZCBlbGVtZW50LiBIYW5kbGVzIHNvbWUgZWRnZSBjYXNlcyxcbi8vIHN1Y2ggYXMgdGFibGUgYW5jZXN0b3JzIGFuZCBjcm9zcyBicm93c2VyIGJ1Z3MuXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgdmFyIHdpbmRvdyA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgdmFyIG9mZnNldFBhcmVudCA9IGdldFRydWVPZmZzZXRQYXJlbnQoZWxlbWVudCk7XG5cbiAgd2hpbGUgKG9mZnNldFBhcmVudCAmJiBpc1RhYmxlRWxlbWVudChvZmZzZXRQYXJlbnQpICYmIGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICBvZmZzZXRQYXJlbnQgPSBnZXRUcnVlT2Zmc2V0UGFyZW50KG9mZnNldFBhcmVudCk7XG4gIH1cblxuICBpZiAob2Zmc2V0UGFyZW50ICYmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpID09PSAnaHRtbCcgfHwgZ2V0Tm9kZU5hbWUob2Zmc2V0UGFyZW50KSA9PT0gJ2JvZHknICYmIGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpKSB7XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfVxuXG4gIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZ2V0Q29udGFpbmluZ0Jsb2NrKGVsZW1lbnQpIHx8IHdpbmRvdztcbn0iLCJpbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgeyBpc1NoYWRvd1Jvb3QgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRQYXJlbnROb2RlKGVsZW1lbnQpIHtcbiAgaWYgKGdldE5vZGVOYW1lKGVsZW1lbnQpID09PSAnaHRtbCcpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHJldHVybiAoLy8gdGhpcyBpcyBhIHF1aWNrZXIgKGJ1dCBsZXNzIHR5cGUgc2FmZSkgd2F5IHRvIHNhdmUgcXVpdGUgc29tZSBieXRlcyBmcm9tIHRoZSBidW5kbGVcbiAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dXG4gICAgLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gICAgZWxlbWVudC5hc3NpZ25lZFNsb3QgfHwgLy8gc3RlcCBpbnRvIHRoZSBzaGFkb3cgRE9NIG9mIHRoZSBwYXJlbnQgb2YgYSBzbG90dGVkIG5vZGVcbiAgICBlbGVtZW50LnBhcmVudE5vZGUgfHwgKCAvLyBET00gRWxlbWVudCBkZXRlY3RlZFxuICAgIGlzU2hhZG93Um9vdChlbGVtZW50KSA/IGVsZW1lbnQuaG9zdCA6IG51bGwpIHx8IC8vIFNoYWRvd1Jvb3QgZGV0ZWN0ZWRcbiAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1jYWxsXTogSFRNTEVsZW1lbnQgaXMgYSBOb2RlXG4gICAgZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpIC8vIGZhbGxiYWNrXG5cbiAgKTtcbn0iLCJpbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgaXNTY3JvbGxQYXJlbnQgZnJvbSBcIi4vaXNTY3JvbGxQYXJlbnQuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNjcm9sbFBhcmVudChub2RlKSB7XG4gIGlmIChbJ2h0bWwnLCAnYm9keScsICcjZG9jdW1lbnQnXS5pbmRleE9mKGdldE5vZGVOYW1lKG5vZGUpKSA+PSAwKSB7XG4gICAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogYXNzdW1lIGJvZHkgaXMgYWx3YXlzIGF2YWlsYWJsZVxuICAgIHJldHVybiBub2RlLm93bmVyRG9jdW1lbnQuYm9keTtcbiAgfVxuXG4gIGlmIChpc0hUTUxFbGVtZW50KG5vZGUpICYmIGlzU2Nyb2xsUGFyZW50KG5vZGUpKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICByZXR1cm4gZ2V0U2Nyb2xsUGFyZW50KGdldFBhcmVudE5vZGUobm9kZSkpO1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvd1Njcm9sbEJhclggZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsQmFyWC5qc1wiO1xuaW1wb3J0IGlzTGF5b3V0Vmlld3BvcnQgZnJvbSBcIi4vaXNMYXlvdXRWaWV3cG9ydC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Vmlld3BvcnRSZWN0KGVsZW1lbnQsIHN0cmF0ZWd5KSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coZWxlbWVudCk7XG4gIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgdmlzdWFsVmlld3BvcnQgPSB3aW4udmlzdWFsVmlld3BvcnQ7XG4gIHZhciB3aWR0aCA9IGh0bWwuY2xpZW50V2lkdGg7XG4gIHZhciBoZWlnaHQgPSBodG1sLmNsaWVudEhlaWdodDtcbiAgdmFyIHggPSAwO1xuICB2YXIgeSA9IDA7XG5cbiAgaWYgKHZpc3VhbFZpZXdwb3J0KSB7XG4gICAgd2lkdGggPSB2aXN1YWxWaWV3cG9ydC53aWR0aDtcbiAgICBoZWlnaHQgPSB2aXN1YWxWaWV3cG9ydC5oZWlnaHQ7XG4gICAgdmFyIGxheW91dFZpZXdwb3J0ID0gaXNMYXlvdXRWaWV3cG9ydCgpO1xuXG4gICAgaWYgKGxheW91dFZpZXdwb3J0IHx8ICFsYXlvdXRWaWV3cG9ydCAmJiBzdHJhdGVneSA9PT0gJ2ZpeGVkJykge1xuICAgICAgeCA9IHZpc3VhbFZpZXdwb3J0Lm9mZnNldExlZnQ7XG4gICAgICB5ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0VG9wO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIHg6IHggKyBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpLFxuICAgIHk6IHlcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRXaW5kb3cobm9kZSkge1xuICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfVxuXG4gIGlmIChub2RlLnRvU3RyaW5nKCkgIT09ICdbb2JqZWN0IFdpbmRvd10nKSB7XG4gICAgdmFyIG93bmVyRG9jdW1lbnQgPSBub2RlLm93bmVyRG9jdW1lbnQ7XG4gICAgcmV0dXJuIG93bmVyRG9jdW1lbnQgPyBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IHx8IHdpbmRvdyA6IHdpbmRvdztcbiAgfVxuXG4gIHJldHVybiBub2RlO1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGwobm9kZSkge1xuICB2YXIgd2luID0gZ2V0V2luZG93KG5vZGUpO1xuICB2YXIgc2Nyb2xsTGVmdCA9IHdpbi5wYWdlWE9mZnNldDtcbiAgdmFyIHNjcm9sbFRvcCA9IHdpbi5wYWdlWU9mZnNldDtcbiAgcmV0dXJuIHtcbiAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wXG4gIH07XG59IiwiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0V2luZG93U2Nyb2xsQmFyWChlbGVtZW50KSB7XG4gIC8vIElmIDxodG1sPiBoYXMgYSBDU1Mgd2lkdGggZ3JlYXRlciB0aGFuIHRoZSB2aWV3cG9ydCwgdGhlbiB0aGlzIHdpbGwgYmVcbiAgLy8gaW5jb3JyZWN0IGZvciBSVEwuXG4gIC8vIFBvcHBlciAxIGlzIGJyb2tlbiBpbiB0aGlzIGNhc2UgYW5kIG5ldmVyIGhhZCBhIGJ1ZyByZXBvcnQgc28gbGV0J3MgYXNzdW1lXG4gIC8vIGl0J3Mgbm90IGFuIGlzc3VlLiBJIGRvbid0IHRoaW5rIGFueW9uZSBldmVyIHNwZWNpZmllcyB3aWR0aCBvbiA8aHRtbD5cbiAgLy8gYW55d2F5LlxuICAvLyBCcm93c2VycyB3aGVyZSB0aGUgbGVmdCBzY3JvbGxiYXIgZG9lc24ndCBjYXVzZSBhbiBpc3N1ZSByZXBvcnQgYDBgIGZvclxuICAvLyB0aGlzIChlLmcuIEVkZ2UgMjAxOSwgSUUxMSwgU2FmYXJpKVxuICByZXR1cm4gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSkubGVmdCArIGdldFdpbmRvd1Njcm9sbChlbGVtZW50KS5zY3JvbGxMZWZ0O1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5cbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlKSB7XG4gIHZhciBPd25FbGVtZW50ID0gZ2V0V2luZG93KG5vZGUpLkVsZW1lbnQ7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gaXNIVE1MRWxlbWVudChub2RlKSB7XG4gIHZhciBPd25FbGVtZW50ID0gZ2V0V2luZG93KG5vZGUpLkhUTUxFbGVtZW50O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBpc1NoYWRvd1Jvb3Qobm9kZSkge1xuICAvLyBJRSAxMSBoYXMgbm8gU2hhZG93Um9vdFxuICBpZiAodHlwZW9mIFNoYWRvd1Jvb3QgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuU2hhZG93Um9vdDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBTaGFkb3dSb290O1xufVxuXG5leHBvcnQgeyBpc0VsZW1lbnQsIGlzSFRNTEVsZW1lbnQsIGlzU2hhZG93Um9vdCB9OyIsImltcG9ydCBnZXRVQVN0cmluZyBmcm9tIFwiLi4vdXRpbHMvdXNlckFnZW50LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0xheW91dFZpZXdwb3J0KCkge1xuICByZXR1cm4gIS9eKCg/IWNocm9tZXxhbmRyb2lkKS4pKnNhZmFyaS9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG59IiwiaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNTY3JvbGxQYXJlbnQoZWxlbWVudCkge1xuICAvLyBGaXJlZm94IHdhbnRzIHVzIHRvIGNoZWNrIGAteGAgYW5kIGAteWAgdmFyaWF0aW9ucyBhcyB3ZWxsXG4gIHZhciBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCksXG4gICAgICBvdmVyZmxvdyA9IF9nZXRDb21wdXRlZFN0eWxlLm92ZXJmbG93LFxuICAgICAgb3ZlcmZsb3dYID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3dYLFxuICAgICAgb3ZlcmZsb3dZID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3dZO1xuXG4gIHJldHVybiAvYXV0b3xzY3JvbGx8b3ZlcmxheXxoaWRkZW4vLnRlc3Qob3ZlcmZsb3cgKyBvdmVyZmxvd1kgKyBvdmVyZmxvd1gpO1xufSIsImltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNUYWJsZUVsZW1lbnQoZWxlbWVudCkge1xuICByZXR1cm4gWyd0YWJsZScsICd0ZCcsICd0aCddLmluZGV4T2YoZ2V0Tm9kZU5hbWUoZWxlbWVudCkpID49IDA7XG59IiwiaW1wb3J0IGdldFNjcm9sbFBhcmVudCBmcm9tIFwiLi9nZXRTY3JvbGxQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgaXNTY3JvbGxQYXJlbnQgZnJvbSBcIi4vaXNTY3JvbGxQYXJlbnQuanNcIjtcbi8qXG5naXZlbiBhIERPTSBlbGVtZW50LCByZXR1cm4gdGhlIGxpc3Qgb2YgYWxsIHNjcm9sbCBwYXJlbnRzLCB1cCB0aGUgbGlzdCBvZiBhbmNlc29yc1xudW50aWwgd2UgZ2V0IHRvIHRoZSB0b3Agd2luZG93IG9iamVjdC4gVGhpcyBsaXN0IGlzIHdoYXQgd2UgYXR0YWNoIHNjcm9sbCBsaXN0ZW5lcnNcbnRvLCBiZWNhdXNlIGlmIGFueSBvZiB0aGVzZSBwYXJlbnQgZWxlbWVudHMgc2Nyb2xsLCB3ZSdsbCBuZWVkIHRvIHJlLWNhbGN1bGF0ZSB0aGVcbnJlZmVyZW5jZSBlbGVtZW50J3MgcG9zaXRpb24uXG4qL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaXN0U2Nyb2xsUGFyZW50cyhlbGVtZW50LCBsaXN0KSB7XG4gIHZhciBfZWxlbWVudCRvd25lckRvY3VtZW47XG5cbiAgaWYgKGxpc3QgPT09IHZvaWQgMCkge1xuICAgIGxpc3QgPSBbXTtcbiAgfVxuXG4gIHZhciBzY3JvbGxQYXJlbnQgPSBnZXRTY3JvbGxQYXJlbnQoZWxlbWVudCk7XG4gIHZhciBpc0JvZHkgPSBzY3JvbGxQYXJlbnQgPT09ICgoX2VsZW1lbnQkb3duZXJEb2N1bWVuID0gZWxlbWVudC5vd25lckRvY3VtZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2VsZW1lbnQkb3duZXJEb2N1bWVuLmJvZHkpO1xuICB2YXIgd2luID0gZ2V0V2luZG93KHNjcm9sbFBhcmVudCk7XG4gIHZhciB0YXJnZXQgPSBpc0JvZHkgPyBbd2luXS5jb25jYXQod2luLnZpc3VhbFZpZXdwb3J0IHx8IFtdLCBpc1Njcm9sbFBhcmVudChzY3JvbGxQYXJlbnQpID8gc2Nyb2xsUGFyZW50IDogW10pIDogc2Nyb2xsUGFyZW50O1xuICB2YXIgdXBkYXRlZExpc3QgPSBsaXN0LmNvbmNhdCh0YXJnZXQpO1xuICByZXR1cm4gaXNCb2R5ID8gdXBkYXRlZExpc3QgOiAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1jYWxsXTogaXNCb2R5IHRlbGxzIHVzIHRhcmdldCB3aWxsIGJlIGFuIEhUTUxFbGVtZW50IGhlcmVcbiAgdXBkYXRlZExpc3QuY29uY2F0KGxpc3RTY3JvbGxQYXJlbnRzKGdldFBhcmVudE5vZGUodGFyZ2V0KSkpO1xufSIsImV4cG9ydCB2YXIgdG9wID0gJ3RvcCc7XG5leHBvcnQgdmFyIGJvdHRvbSA9ICdib3R0b20nO1xuZXhwb3J0IHZhciByaWdodCA9ICdyaWdodCc7XG5leHBvcnQgdmFyIGxlZnQgPSAnbGVmdCc7XG5leHBvcnQgdmFyIGF1dG8gPSAnYXV0byc7XG5leHBvcnQgdmFyIGJhc2VQbGFjZW1lbnRzID0gW3RvcCwgYm90dG9tLCByaWdodCwgbGVmdF07XG5leHBvcnQgdmFyIHN0YXJ0ID0gJ3N0YXJ0JztcbmV4cG9ydCB2YXIgZW5kID0gJ2VuZCc7XG5leHBvcnQgdmFyIGNsaXBwaW5nUGFyZW50cyA9ICdjbGlwcGluZ1BhcmVudHMnO1xuZXhwb3J0IHZhciB2aWV3cG9ydCA9ICd2aWV3cG9ydCc7XG5leHBvcnQgdmFyIHBvcHBlciA9ICdwb3BwZXInO1xuZXhwb3J0IHZhciByZWZlcmVuY2UgPSAncmVmZXJlbmNlJztcbmV4cG9ydCB2YXIgdmFyaWF0aW9uUGxhY2VtZW50cyA9IC8qI19fUFVSRV9fKi9iYXNlUGxhY2VtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gIHJldHVybiBhY2MuY29uY2F0KFtwbGFjZW1lbnQgKyBcIi1cIiArIHN0YXJ0LCBwbGFjZW1lbnQgKyBcIi1cIiArIGVuZF0pO1xufSwgW10pO1xuZXhwb3J0IHZhciBwbGFjZW1lbnRzID0gLyojX19QVVJFX18qL1tdLmNvbmNhdChiYXNlUGxhY2VtZW50cywgW2F1dG9dKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gIHJldHVybiBhY2MuY29uY2F0KFtwbGFjZW1lbnQsIHBsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG59LCBbXSk7IC8vIG1vZGlmaWVycyB0aGF0IG5lZWQgdG8gcmVhZCB0aGUgRE9NXG5cbmV4cG9ydCB2YXIgYmVmb3JlUmVhZCA9ICdiZWZvcmVSZWFkJztcbmV4cG9ydCB2YXIgcmVhZCA9ICdyZWFkJztcbmV4cG9ydCB2YXIgYWZ0ZXJSZWFkID0gJ2FmdGVyUmVhZCc7IC8vIHB1cmUtbG9naWMgbW9kaWZpZXJzXG5cbmV4cG9ydCB2YXIgYmVmb3JlTWFpbiA9ICdiZWZvcmVNYWluJztcbmV4cG9ydCB2YXIgbWFpbiA9ICdtYWluJztcbmV4cG9ydCB2YXIgYWZ0ZXJNYWluID0gJ2FmdGVyTWFpbic7IC8vIG1vZGlmaWVyIHdpdGggdGhlIHB1cnBvc2UgdG8gd3JpdGUgdG8gdGhlIERPTSAob3Igd3JpdGUgaW50byBhIGZyYW1ld29yayBzdGF0ZSlcblxuZXhwb3J0IHZhciBiZWZvcmVXcml0ZSA9ICdiZWZvcmVXcml0ZSc7XG5leHBvcnQgdmFyIHdyaXRlID0gJ3dyaXRlJztcbmV4cG9ydCB2YXIgYWZ0ZXJXcml0ZSA9ICdhZnRlcldyaXRlJztcbmV4cG9ydCB2YXIgbW9kaWZpZXJQaGFzZXMgPSBbYmVmb3JlUmVhZCwgcmVhZCwgYWZ0ZXJSZWFkLCBiZWZvcmVNYWluLCBtYWluLCBhZnRlck1haW4sIGJlZm9yZVdyaXRlLCB3cml0ZSwgYWZ0ZXJXcml0ZV07IiwiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjsgLy8gVGhpcyBtb2RpZmllciB0YWtlcyB0aGUgc3R5bGVzIHByZXBhcmVkIGJ5IHRoZSBgY29tcHV0ZVN0eWxlc2AgbW9kaWZpZXJcbi8vIGFuZCBhcHBsaWVzIHRoZW0gdG8gdGhlIEhUTUxFbGVtZW50cyBzdWNoIGFzIHBvcHBlciBhbmQgYXJyb3dcblxuZnVuY3Rpb24gYXBwbHlTdHlsZXMoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlO1xuICBPYmplY3Qua2V5cyhzdGF0ZS5lbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBzdHlsZSA9IHN0YXRlLnN0eWxlc1tuYW1lXSB8fCB7fTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IHN0YXRlLmF0dHJpYnV0ZXNbbmFtZV0gfHwge307XG4gICAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1tuYW1lXTsgLy8gYXJyb3cgaXMgb3B0aW9uYWwgKyB2aXJ0dWFsIGVsZW1lbnRzXG5cbiAgICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgIWdldE5vZGVOYW1lKGVsZW1lbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBGbG93IGRvZXNuJ3Qgc3VwcG9ydCB0byBleHRlbmQgdGhpcyBwcm9wZXJ0eSwgYnV0IGl0J3MgdGhlIG1vc3RcbiAgICAvLyBlZmZlY3RpdmUgd2F5IHRvIGFwcGx5IHN0eWxlcyB0byBhbiBIVE1MRWxlbWVudFxuICAgIC8vICRGbG93Rml4TWVbY2Fubm90LXdyaXRlXVxuXG5cbiAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW25hbWVdO1xuXG4gICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUgPT09IHRydWUgPyAnJyA6IHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVmZmVjdChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZTtcbiAgdmFyIGluaXRpYWxTdHlsZXMgPSB7XG4gICAgcG9wcGVyOiB7XG4gICAgICBwb3NpdGlvbjogc3RhdGUub3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIGxlZnQ6ICcwJyxcbiAgICAgIHRvcDogJzAnLFxuICAgICAgbWFyZ2luOiAnMCdcbiAgICB9LFxuICAgIGFycm93OiB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgIH0sXG4gICAgcmVmZXJlbmNlOiB7fVxuICB9O1xuICBPYmplY3QuYXNzaWduKHN0YXRlLmVsZW1lbnRzLnBvcHBlci5zdHlsZSwgaW5pdGlhbFN0eWxlcy5wb3BwZXIpO1xuICBzdGF0ZS5zdHlsZXMgPSBpbml0aWFsU3R5bGVzO1xuXG4gIGlmIChzdGF0ZS5lbGVtZW50cy5hcnJvdykge1xuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUuZWxlbWVudHMuYXJyb3cuc3R5bGUsIGluaXRpYWxTdHlsZXMuYXJyb3cpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBPYmplY3Qua2V5cyhzdGF0ZS5lbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1tuYW1lXTtcbiAgICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICAgIHZhciBzdHlsZVByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhzdGF0ZS5zdHlsZXMuaGFzT3duUHJvcGVydHkobmFtZSkgPyBzdGF0ZS5zdHlsZXNbbmFtZV0gOiBpbml0aWFsU3R5bGVzW25hbWVdKTsgLy8gU2V0IGFsbCB2YWx1ZXMgdG8gYW4gZW1wdHkgc3RyaW5nIHRvIHVuc2V0IHRoZW1cblxuICAgICAgdmFyIHN0eWxlID0gc3R5bGVQcm9wZXJ0aWVzLnJlZHVjZShmdW5jdGlvbiAoc3R5bGUsIHByb3BlcnR5KSB7XG4gICAgICAgIHN0eWxlW3Byb3BlcnR5XSA9ICcnO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICB9LCB7fSk7IC8vIGFycm93IGlzIG9wdGlvbmFsICsgdmlydHVhbCBlbGVtZW50c1xuXG4gICAgICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgIWdldE5vZGVOYW1lKGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGUpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYXBwbHlTdHlsZXMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3dyaXRlJyxcbiAgZm46IGFwcGx5U3R5bGVzLFxuICBlZmZlY3Q6IGVmZmVjdCxcbiAgcmVxdWlyZXM6IFsnY29tcHV0ZVN0eWxlcyddXG59OyIsImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBjb250YWlucyBmcm9tIFwiLi4vZG9tLXV0aWxzL2NvbnRhaW5zLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHdpdGhpbiB9IGZyb20gXCIuLi91dGlscy93aXRoaW4uanNcIjtcbmltcG9ydCBtZXJnZVBhZGRpbmdPYmplY3QgZnJvbSBcIi4uL3V0aWxzL21lcmdlUGFkZGluZ09iamVjdC5qc1wiO1xuaW1wb3J0IGV4cGFuZFRvSGFzaE1hcCBmcm9tIFwiLi4vdXRpbHMvZXhwYW5kVG9IYXNoTWFwLmpzXCI7XG5pbXBvcnQgeyBsZWZ0LCByaWdodCwgYmFzZVBsYWNlbWVudHMsIHRvcCwgYm90dG9tIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4uL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxudmFyIHRvUGFkZGluZ09iamVjdCA9IGZ1bmN0aW9uIHRvUGFkZGluZ09iamVjdChwYWRkaW5nLCBzdGF0ZSkge1xuICBwYWRkaW5nID0gdHlwZW9mIHBhZGRpbmcgPT09ICdmdW5jdGlvbicgPyBwYWRkaW5nKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlY3RzLCB7XG4gICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSkpIDogcGFkZGluZztcbiAgcmV0dXJuIG1lcmdlUGFkZGluZ09iamVjdCh0eXBlb2YgcGFkZGluZyAhPT0gJ251bWJlcicgPyBwYWRkaW5nIDogZXhwYW5kVG9IYXNoTWFwKHBhZGRpbmcsIGJhc2VQbGFjZW1lbnRzKSk7XG59O1xuXG5mdW5jdGlvbiBhcnJvdyhfcmVmKSB7XG4gIHZhciBfc3RhdGUkbW9kaWZpZXJzRGF0YSQ7XG5cbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICB2YXIgYXJyb3dFbGVtZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3c7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzO1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQoc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGF4aXMgPSBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCk7XG4gIHZhciBpc1ZlcnRpY2FsID0gW2xlZnQsIHJpZ2h0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDA7XG4gIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gIGlmICghYXJyb3dFbGVtZW50IHx8ICFwb3BwZXJPZmZzZXRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHBhZGRpbmdPYmplY3QgPSB0b1BhZGRpbmdPYmplY3Qob3B0aW9ucy5wYWRkaW5nLCBzdGF0ZSk7XG4gIHZhciBhcnJvd1JlY3QgPSBnZXRMYXlvdXRSZWN0KGFycm93RWxlbWVudCk7XG4gIHZhciBtaW5Qcm9wID0gYXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgdmFyIG1heFByb3AgPSBheGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgdmFyIGVuZERpZmYgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbbGVuXSArIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXSAtIHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5wb3BwZXJbbGVuXTtcbiAgdmFyIHN0YXJ0RGlmZiA9IHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbYXhpc107XG4gIHZhciBhcnJvd09mZnNldFBhcmVudCA9IGdldE9mZnNldFBhcmVudChhcnJvd0VsZW1lbnQpO1xuICB2YXIgY2xpZW50U2l6ZSA9IGFycm93T2Zmc2V0UGFyZW50ID8gYXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50SGVpZ2h0IHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRXaWR0aCB8fCAwIDogMDtcbiAgdmFyIGNlbnRlclRvUmVmZXJlbmNlID0gZW5kRGlmZiAvIDIgLSBzdGFydERpZmYgLyAyOyAvLyBNYWtlIHN1cmUgdGhlIGFycm93IGRvZXNuJ3Qgb3ZlcmZsb3cgdGhlIHBvcHBlciBpZiB0aGUgY2VudGVyIHBvaW50IGlzXG4gIC8vIG91dHNpZGUgb2YgdGhlIHBvcHBlciBib3VuZHNcblxuICB2YXIgbWluID0gcGFkZGluZ09iamVjdFttaW5Qcm9wXTtcbiAgdmFyIG1heCA9IGNsaWVudFNpemUgLSBhcnJvd1JlY3RbbGVuXSAtIHBhZGRpbmdPYmplY3RbbWF4UHJvcF07XG4gIHZhciBjZW50ZXIgPSBjbGllbnRTaXplIC8gMiAtIGFycm93UmVjdFtsZW5dIC8gMiArIGNlbnRlclRvUmVmZXJlbmNlO1xuICB2YXIgb2Zmc2V0ID0gd2l0aGluKG1pbiwgY2VudGVyLCBtYXgpOyAvLyBQcmV2ZW50cyBicmVha2luZyBzeW50YXggaGlnaGxpZ2h0aW5nLi4uXG5cbiAgdmFyIGF4aXNQcm9wID0gYXhpcztcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IChfc3RhdGUkbW9kaWZpZXJzRGF0YSQgPSB7fSwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkW2F4aXNQcm9wXSA9IG9mZnNldCwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkLmNlbnRlck9mZnNldCA9IG9mZnNldCAtIGNlbnRlciwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkKTtcbn1cblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYyLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRlbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50LFxuICAgICAgYXJyb3dFbGVtZW50ID0gX29wdGlvbnMkZWxlbWVudCA9PT0gdm9pZCAwID8gJ1tkYXRhLXBvcHBlci1hcnJvd10nIDogX29wdGlvbnMkZWxlbWVudDtcblxuICBpZiAoYXJyb3dFbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gQ1NTIHNlbGVjdG9yXG5cblxuICBpZiAodHlwZW9mIGFycm93RWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5wb3BwZXIucXVlcnlTZWxlY3RvcihhcnJvd0VsZW1lbnQpO1xuXG4gICAgaWYgKCFhcnJvd0VsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgaWYgKCFpc0hUTUxFbGVtZW50KGFycm93RWxlbWVudCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoWydQb3BwZXI6IFwiYXJyb3dcIiBlbGVtZW50IG11c3QgYmUgYW4gSFRNTEVsZW1lbnQgKG5vdCBhbiBTVkdFbGVtZW50KS4nLCAnVG8gdXNlIGFuIFNWRyBhcnJvdywgd3JhcCBpdCBpbiBhbiBIVE1MRWxlbWVudCB0aGF0IHdpbGwgYmUgdXNlZCBhcycsICd0aGUgYXJyb3cuJ10uam9pbignICcpKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbnRhaW5zKHN0YXRlLmVsZW1lbnRzLnBvcHBlciwgYXJyb3dFbGVtZW50KSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoWydQb3BwZXI6IFwiYXJyb3dcIiBtb2RpZmllclxcJ3MgYGVsZW1lbnRgIG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgcG9wcGVyJywgJ2VsZW1lbnQuJ10uam9pbignICcpKTtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBzdGF0ZS5lbGVtZW50cy5hcnJvdyA9IGFycm93RWxlbWVudDtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2Fycm93JyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IGFycm93LFxuICBlZmZlY3Q6IGVmZmVjdCxcbiAgcmVxdWlyZXM6IFsncG9wcGVyT2Zmc2V0cyddLFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ3ByZXZlbnRPdmVyZmxvdyddXG59OyIsImltcG9ydCB7IHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgZW5kIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuLi91dGlscy9nZXRWYXJpYXRpb24uanNcIjtcbmltcG9ydCB7IHJvdW5kIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgdW5zZXRTaWRlcyA9IHtcbiAgdG9wOiAnYXV0bycsXG4gIHJpZ2h0OiAnYXV0bycsXG4gIGJvdHRvbTogJ2F1dG8nLFxuICBsZWZ0OiAnYXV0bydcbn07IC8vIFJvdW5kIHRoZSBvZmZzZXRzIHRvIHRoZSBuZWFyZXN0IHN1aXRhYmxlIHN1YnBpeGVsIGJhc2VkIG9uIHRoZSBEUFIuXG4vLyBab29taW5nIGNhbiBjaGFuZ2UgdGhlIERQUiwgYnV0IGl0IHNlZW1zIHRvIHJlcG9ydCBhIHZhbHVlIHRoYXQgd2lsbFxuLy8gY2xlYW5seSBkaXZpZGUgdGhlIHZhbHVlcyBpbnRvIHRoZSBhcHByb3ByaWF0ZSBzdWJwaXhlbHMuXG5cbmZ1bmN0aW9uIHJvdW5kT2Zmc2V0c0J5RFBSKF9yZWYpIHtcbiAgdmFyIHggPSBfcmVmLngsXG4gICAgICB5ID0gX3JlZi55O1xuICB2YXIgd2luID0gd2luZG93O1xuICB2YXIgZHByID0gd2luLmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgcmV0dXJuIHtcbiAgICB4OiByb3VuZCh4ICogZHByKSAvIGRwciB8fCAwLFxuICAgIHk6IHJvdW5kKHkgKiBkcHIpIC8gZHByIHx8IDBcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvU3R5bGVzKF9yZWYyKSB7XG4gIHZhciBfT2JqZWN0JGFzc2lnbjI7XG5cbiAgdmFyIHBvcHBlciA9IF9yZWYyLnBvcHBlcixcbiAgICAgIHBvcHBlclJlY3QgPSBfcmVmMi5wb3BwZXJSZWN0LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZjIucGxhY2VtZW50LFxuICAgICAgdmFyaWF0aW9uID0gX3JlZjIudmFyaWF0aW9uLFxuICAgICAgb2Zmc2V0cyA9IF9yZWYyLm9mZnNldHMsXG4gICAgICBwb3NpdGlvbiA9IF9yZWYyLnBvc2l0aW9uLFxuICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX3JlZjIuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgYWRhcHRpdmUgPSBfcmVmMi5hZGFwdGl2ZSxcbiAgICAgIHJvdW5kT2Zmc2V0cyA9IF9yZWYyLnJvdW5kT2Zmc2V0cyxcbiAgICAgIGlzRml4ZWQgPSBfcmVmMi5pc0ZpeGVkO1xuICB2YXIgX29mZnNldHMkeCA9IG9mZnNldHMueCxcbiAgICAgIHggPSBfb2Zmc2V0cyR4ID09PSB2b2lkIDAgPyAwIDogX29mZnNldHMkeCxcbiAgICAgIF9vZmZzZXRzJHkgPSBvZmZzZXRzLnksXG4gICAgICB5ID0gX29mZnNldHMkeSA9PT0gdm9pZCAwID8gMCA6IF9vZmZzZXRzJHk7XG5cbiAgdmFyIF9yZWYzID0gdHlwZW9mIHJvdW5kT2Zmc2V0cyA9PT0gJ2Z1bmN0aW9uJyA/IHJvdW5kT2Zmc2V0cyh7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH0pIDoge1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9O1xuXG4gIHggPSBfcmVmMy54O1xuICB5ID0gX3JlZjMueTtcbiAgdmFyIGhhc1ggPSBvZmZzZXRzLmhhc093blByb3BlcnR5KCd4Jyk7XG4gIHZhciBoYXNZID0gb2Zmc2V0cy5oYXNPd25Qcm9wZXJ0eSgneScpO1xuICB2YXIgc2lkZVggPSBsZWZ0O1xuICB2YXIgc2lkZVkgPSB0b3A7XG4gIHZhciB3aW4gPSB3aW5kb3c7XG5cbiAgaWYgKGFkYXB0aXZlKSB7XG4gICAgdmFyIG9mZnNldFBhcmVudCA9IGdldE9mZnNldFBhcmVudChwb3BwZXIpO1xuICAgIHZhciBoZWlnaHRQcm9wID0gJ2NsaWVudEhlaWdodCc7XG4gICAgdmFyIHdpZHRoUHJvcCA9ICdjbGllbnRXaWR0aCc7XG5cbiAgICBpZiAob2Zmc2V0UGFyZW50ID09PSBnZXRXaW5kb3cocG9wcGVyKSkge1xuICAgICAgb2Zmc2V0UGFyZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KHBvcHBlcik7XG5cbiAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKG9mZnNldFBhcmVudCkucG9zaXRpb24gIT09ICdzdGF0aWMnICYmIHBvc2l0aW9uID09PSAnYWJzb2x1dGUnKSB7XG4gICAgICAgIGhlaWdodFByb3AgPSAnc2Nyb2xsSGVpZ2h0JztcbiAgICAgICAgd2lkdGhQcm9wID0gJ3Njcm9sbFdpZHRoJztcbiAgICAgIH1cbiAgICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhc3RdOiBmb3JjZSB0eXBlIHJlZmluZW1lbnQsIHdlIGNvbXBhcmUgb2Zmc2V0UGFyZW50IHdpdGggd2luZG93IGFib3ZlLCBidXQgRmxvdyBkb2Vzbid0IGRldGVjdCBpdFxuXG5cbiAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQ7XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSB0b3AgfHwgKHBsYWNlbWVudCA9PT0gbGVmdCB8fCBwbGFjZW1lbnQgPT09IHJpZ2h0KSAmJiB2YXJpYXRpb24gPT09IGVuZCkge1xuICAgICAgc2lkZVkgPSBib3R0b207XG4gICAgICB2YXIgb2Zmc2V0WSA9IGlzRml4ZWQgJiYgb2Zmc2V0UGFyZW50ID09PSB3aW4gJiYgd2luLnZpc3VhbFZpZXdwb3J0ID8gd2luLnZpc3VhbFZpZXdwb3J0LmhlaWdodCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICAgICAgb2Zmc2V0UGFyZW50W2hlaWdodFByb3BdO1xuICAgICAgeSAtPSBvZmZzZXRZIC0gcG9wcGVyUmVjdC5oZWlnaHQ7XG4gICAgICB5ICo9IGdwdUFjY2VsZXJhdGlvbiA/IDEgOiAtMTtcbiAgICB9XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBsZWZ0IHx8IChwbGFjZW1lbnQgPT09IHRvcCB8fCBwbGFjZW1lbnQgPT09IGJvdHRvbSkgJiYgdmFyaWF0aW9uID09PSBlbmQpIHtcbiAgICAgIHNpZGVYID0gcmlnaHQ7XG4gICAgICB2YXIgb2Zmc2V0WCA9IGlzRml4ZWQgJiYgb2Zmc2V0UGFyZW50ID09PSB3aW4gJiYgd2luLnZpc3VhbFZpZXdwb3J0ID8gd2luLnZpc3VhbFZpZXdwb3J0LndpZHRoIDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gICAgICBvZmZzZXRQYXJlbnRbd2lkdGhQcm9wXTtcbiAgICAgIHggLT0gb2Zmc2V0WCAtIHBvcHBlclJlY3Qud2lkdGg7XG4gICAgICB4ICo9IGdwdUFjY2VsZXJhdGlvbiA/IDEgOiAtMTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29tbW9uU3R5bGVzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgcG9zaXRpb246IHBvc2l0aW9uXG4gIH0sIGFkYXB0aXZlICYmIHVuc2V0U2lkZXMpO1xuXG4gIHZhciBfcmVmNCA9IHJvdW5kT2Zmc2V0cyA9PT0gdHJ1ZSA/IHJvdW5kT2Zmc2V0c0J5RFBSKHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfSkgOiB7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG5cbiAgeCA9IF9yZWY0Lng7XG4gIHkgPSBfcmVmNC55O1xuXG4gIGlmIChncHVBY2NlbGVyYXRpb24pIHtcbiAgICB2YXIgX09iamVjdCRhc3NpZ247XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCAoX09iamVjdCRhc3NpZ24gPSB7fSwgX09iamVjdCRhc3NpZ25bc2lkZVldID0gaGFzWSA/ICcwJyA6ICcnLCBfT2JqZWN0JGFzc2lnbltzaWRlWF0gPSBoYXNYID8gJzAnIDogJycsIF9PYmplY3QkYXNzaWduLnRyYW5zZm9ybSA9ICh3aW4uZGV2aWNlUGl4ZWxSYXRpbyB8fCAxKSA8PSAxID8gXCJ0cmFuc2xhdGUoXCIgKyB4ICsgXCJweCwgXCIgKyB5ICsgXCJweClcIiA6IFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCJweCwgXCIgKyB5ICsgXCJweCwgMClcIiwgX09iamVjdCRhc3NpZ24pKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIChfT2JqZWN0JGFzc2lnbjIgPSB7fSwgX09iamVjdCRhc3NpZ24yW3NpZGVZXSA9IGhhc1kgPyB5ICsgXCJweFwiIDogJycsIF9PYmplY3QkYXNzaWduMltzaWRlWF0gPSBoYXNYID8geCArIFwicHhcIiA6ICcnLCBfT2JqZWN0JGFzc2lnbjIudHJhbnNmb3JtID0gJycsIF9PYmplY3QkYXNzaWduMikpO1xufVxuXG5mdW5jdGlvbiBjb21wdXRlU3R5bGVzKF9yZWY1KSB7XG4gIHZhciBzdGF0ZSA9IF9yZWY1LnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWY1Lm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRncHVBY2NlbGVyYXQgPSBvcHRpb25zLmdwdUFjY2VsZXJhdGlvbixcbiAgICAgIGdwdUFjY2VsZXJhdGlvbiA9IF9vcHRpb25zJGdwdUFjY2VsZXJhdCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGdwdUFjY2VsZXJhdCxcbiAgICAgIF9vcHRpb25zJGFkYXB0aXZlID0gb3B0aW9ucy5hZGFwdGl2ZSxcbiAgICAgIGFkYXB0aXZlID0gX29wdGlvbnMkYWRhcHRpdmUgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRhZGFwdGl2ZSxcbiAgICAgIF9vcHRpb25zJHJvdW5kT2Zmc2V0cyA9IG9wdGlvbnMucm91bmRPZmZzZXRzLFxuICAgICAgcm91bmRPZmZzZXRzID0gX29wdGlvbnMkcm91bmRPZmZzZXRzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcm91bmRPZmZzZXRzO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICB2YXIgdHJhbnNpdGlvblByb3BlcnR5ID0gZ2V0Q29tcHV0ZWRTdHlsZShzdGF0ZS5lbGVtZW50cy5wb3BwZXIpLnRyYW5zaXRpb25Qcm9wZXJ0eSB8fCAnJztcblxuICAgIGlmIChhZGFwdGl2ZSAmJiBbJ3RyYW5zZm9ybScsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXS5zb21lKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHRyYW5zaXRpb25Qcm9wZXJ0eS5pbmRleE9mKHByb3BlcnR5KSA+PSAwO1xuICAgIH0pKSB7XG4gICAgICBjb25zb2xlLndhcm4oWydQb3BwZXI6IERldGVjdGVkIENTUyB0cmFuc2l0aW9ucyBvbiBhdCBsZWFzdCBvbmUgb2YgdGhlIGZvbGxvd2luZycsICdDU1MgcHJvcGVydGllczogXCJ0cmFuc2Zvcm1cIiwgXCJ0b3BcIiwgXCJyaWdodFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIi4nLCAnXFxuXFxuJywgJ0Rpc2FibGUgdGhlIFwiY29tcHV0ZVN0eWxlc1wiIG1vZGlmaWVyXFwncyBgYWRhcHRpdmVgIG9wdGlvbiB0byBhbGxvdycsICdmb3Igc21vb3RoIHRyYW5zaXRpb25zLCBvciByZW1vdmUgdGhlc2UgcHJvcGVydGllcyBmcm9tIHRoZSBDU1MnLCAndHJhbnNpdGlvbiBkZWNsYXJhdGlvbiBvbiB0aGUgcG9wcGVyIGVsZW1lbnQgaWYgb25seSB0cmFuc2l0aW9uaW5nJywgJ29wYWNpdHkgb3IgYmFja2dyb3VuZC1jb2xvciBmb3IgZXhhbXBsZS4nLCAnXFxuXFxuJywgJ1dlIHJlY29tbWVuZCB1c2luZyB0aGUgcG9wcGVyIGVsZW1lbnQgYXMgYSB3cmFwcGVyIGFyb3VuZCBhbiBpbm5lcicsICdlbGVtZW50IHRoYXQgY2FuIGhhdmUgYW55IENTUyBwcm9wZXJ0eSB0cmFuc2l0aW9uZWQgZm9yIGFuaW1hdGlvbnMuJ10uam9pbignICcpKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29tbW9uU3R5bGVzID0ge1xuICAgIHBsYWNlbWVudDogZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpLFxuICAgIHZhcmlhdGlvbjogZ2V0VmFyaWF0aW9uKHN0YXRlLnBsYWNlbWVudCksXG4gICAgcG9wcGVyOiBzdGF0ZS5lbGVtZW50cy5wb3BwZXIsXG4gICAgcG9wcGVyUmVjdDogc3RhdGUucmVjdHMucG9wcGVyLFxuICAgIGdwdUFjY2VsZXJhdGlvbjogZ3B1QWNjZWxlcmF0aW9uLFxuICAgIGlzRml4ZWQ6IHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3kgPT09ICdmaXhlZCdcbiAgfTtcblxuICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzICE9IG51bGwpIHtcbiAgICBzdGF0ZS5zdHlsZXMucG9wcGVyID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc3R5bGVzLnBvcHBlciwgbWFwVG9TdHlsZXMoT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCB7XG4gICAgICBvZmZzZXRzOiBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMsXG4gICAgICBwb3NpdGlvbjogc3RhdGUub3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIGFkYXB0aXZlOiBhZGFwdGl2ZSxcbiAgICAgIHJvdW5kT2Zmc2V0czogcm91bmRPZmZzZXRzXG4gICAgfSkpKTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLmFycm93ICE9IG51bGwpIHtcbiAgICBzdGF0ZS5zdHlsZXMuYXJyb3cgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdHlsZXMuYXJyb3csIG1hcFRvU3R5bGVzKE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywge1xuICAgICAgb2Zmc2V0czogc3RhdGUubW9kaWZpZXJzRGF0YS5hcnJvdyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgYWRhcHRpdmU6IGZhbHNlLFxuICAgICAgcm91bmRPZmZzZXRzOiByb3VuZE9mZnNldHNcbiAgICB9KSkpO1xuICB9XG5cbiAgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciwge1xuICAgICdkYXRhLXBvcHBlci1wbGFjZW1lbnQnOiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSk7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdjb21wdXRlU3R5bGVzJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdiZWZvcmVXcml0ZScsXG4gIGZuOiBjb21wdXRlU3R5bGVzLFxuICBkYXRhOiB7fVxufTsiLCJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0V2luZG93LmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxudmFyIHBhc3NpdmUgPSB7XG4gIHBhc3NpdmU6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGVmZmVjdChfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBpbnN0YW5jZSA9IF9yZWYuaW5zdGFuY2UsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICB2YXIgX29wdGlvbnMkc2Nyb2xsID0gb3B0aW9ucy5zY3JvbGwsXG4gICAgICBzY3JvbGwgPSBfb3B0aW9ucyRzY3JvbGwgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRzY3JvbGwsXG4gICAgICBfb3B0aW9ucyRyZXNpemUgPSBvcHRpb25zLnJlc2l6ZSxcbiAgICAgIHJlc2l6ZSA9IF9vcHRpb25zJHJlc2l6ZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHJlc2l6ZTtcbiAgdmFyIHdpbmRvdyA9IGdldFdpbmRvdyhzdGF0ZS5lbGVtZW50cy5wb3BwZXIpO1xuICB2YXIgc2Nyb2xsUGFyZW50cyA9IFtdLmNvbmNhdChzdGF0ZS5zY3JvbGxQYXJlbnRzLnJlZmVyZW5jZSwgc3RhdGUuc2Nyb2xsUGFyZW50cy5wb3BwZXIpO1xuXG4gIGlmIChzY3JvbGwpIHtcbiAgICBzY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHNjcm9sbFBhcmVudCkge1xuICAgICAgc2Nyb2xsUGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAocmVzaXplKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChzY3JvbGwpIHtcbiAgICAgIHNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAoc2Nyb2xsUGFyZW50KSB7XG4gICAgICAgIHNjcm9sbFBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBpbnN0YW5jZS51cGRhdGUsIHBhc3NpdmUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc2l6ZSkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgfVxuICB9O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3dyaXRlJyxcbiAgZm46IGZ1bmN0aW9uIGZuKCkge30sXG4gIGVmZmVjdDogZWZmZWN0LFxuICBkYXRhOiB7fVxufTsiLCJpbXBvcnQgZ2V0T3Bwb3NpdGVQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE9wcG9zaXRlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuLi91dGlscy9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IGNvbXB1dGVBdXRvUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9jb21wdXRlQXV0b1BsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgYm90dG9tLCB0b3AsIHN0YXJ0LCByaWdodCwgbGVmdCwgYXV0byB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi4vdXRpbHMvZ2V0VmFyaWF0aW9uLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZnVuY3Rpb24gZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocGxhY2VtZW50KSB7XG4gIGlmIChnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgPT09IGF1dG8pIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgb3Bwb3NpdGVQbGFjZW1lbnQgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICByZXR1cm4gW2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KHBsYWNlbWVudCksIG9wcG9zaXRlUGxhY2VtZW50LCBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChvcHBvc2l0ZVBsYWNlbWVudCldO1xufVxuXG5mdW5jdGlvbiBmbGlwKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnMsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdLl9za2lwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIF9vcHRpb25zJG1haW5BeGlzID0gb3B0aW9ucy5tYWluQXhpcyxcbiAgICAgIGNoZWNrTWFpbkF4aXMgPSBfb3B0aW9ucyRtYWluQXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJG1haW5BeGlzLFxuICAgICAgX29wdGlvbnMkYWx0QXhpcyA9IG9wdGlvbnMuYWx0QXhpcyxcbiAgICAgIGNoZWNrQWx0QXhpcyA9IF9vcHRpb25zJGFsdEF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRhbHRBeGlzLFxuICAgICAgc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzID0gb3B0aW9ucy5mYWxsYmFja1BsYWNlbWVudHMsXG4gICAgICBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgYm91bmRhcnkgPSBvcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeSA9IG9wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRmbGlwVmFyaWF0aW8gPSBvcHRpb25zLmZsaXBWYXJpYXRpb25zLFxuICAgICAgZmxpcFZhcmlhdGlvbnMgPSBfb3B0aW9ucyRmbGlwVmFyaWF0aW8gPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRmbGlwVmFyaWF0aW8sXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHMgPSBvcHRpb25zLmFsbG93ZWRBdXRvUGxhY2VtZW50cztcbiAgdmFyIHByZWZlcnJlZFBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50O1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocHJlZmVycmVkUGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9IGJhc2VQbGFjZW1lbnQgPT09IHByZWZlcnJlZFBsYWNlbWVudDtcbiAgdmFyIGZhbGxiYWNrUGxhY2VtZW50cyA9IHNwZWNpZmllZEZhbGxiYWNrUGxhY2VtZW50cyB8fCAoaXNCYXNlUGxhY2VtZW50IHx8ICFmbGlwVmFyaWF0aW9ucyA/IFtnZXRPcHBvc2l0ZVBsYWNlbWVudChwcmVmZXJyZWRQbGFjZW1lbnQpXSA6IGdldEV4cGFuZGVkRmFsbGJhY2tQbGFjZW1lbnRzKHByZWZlcnJlZFBsYWNlbWVudCkpO1xuICB2YXIgcGxhY2VtZW50cyA9IFtwcmVmZXJyZWRQbGFjZW1lbnRdLmNvbmNhdChmYWxsYmFja1BsYWNlbWVudHMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgPT09IGF1dG8gPyBjb21wdXRlQXV0b1BsYWNlbWVudChzdGF0ZSwge1xuICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmc6IHBhZGRpbmcsXG4gICAgICBmbGlwVmFyaWF0aW9uczogZmxpcFZhcmlhdGlvbnMsXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHM6IGFsbG93ZWRBdXRvUGxhY2VtZW50c1xuICAgIH0pIDogcGxhY2VtZW50KTtcbiAgfSwgW10pO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBjaGVja3NNYXAgPSBuZXcgTWFwKCk7XG4gIHZhciBtYWtlRmFsbGJhY2tDaGVja3MgPSB0cnVlO1xuICB2YXIgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50c1swXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcGxhY2VtZW50ID0gcGxhY2VtZW50c1tpXTtcblxuICAgIHZhciBfYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KTtcblxuICAgIHZhciBpc1N0YXJ0VmFyaWF0aW9uID0gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgPT09IHN0YXJ0O1xuICAgIHZhciBpc1ZlcnRpY2FsID0gW3RvcCwgYm90dG9tXS5pbmRleE9mKF9iYXNlUGxhY2VtZW50KSA+PSAwO1xuICAgIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xuICAgIHZhciBvdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgYWx0Qm91bmRhcnk6IGFsdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZ1xuICAgIH0pO1xuICAgIHZhciBtYWluVmFyaWF0aW9uU2lkZSA9IGlzVmVydGljYWwgPyBpc1N0YXJ0VmFyaWF0aW9uID8gcmlnaHQgOiBsZWZ0IDogaXNTdGFydFZhcmlhdGlvbiA/IGJvdHRvbSA6IHRvcDtcblxuICAgIGlmIChyZWZlcmVuY2VSZWN0W2xlbl0gPiBwb3BwZXJSZWN0W2xlbl0pIHtcbiAgICAgIG1haW5WYXJpYXRpb25TaWRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpblZhcmlhdGlvblNpZGUpO1xuICAgIH1cblxuICAgIHZhciBhbHRWYXJpYXRpb25TaWRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpblZhcmlhdGlvblNpZGUpO1xuICAgIHZhciBjaGVja3MgPSBbXTtcblxuICAgIGlmIChjaGVja01haW5BeGlzKSB7XG4gICAgICBjaGVja3MucHVzaChvdmVyZmxvd1tfYmFzZVBsYWNlbWVudF0gPD0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrQWx0QXhpcykge1xuICAgICAgY2hlY2tzLnB1c2gob3ZlcmZsb3dbbWFpblZhcmlhdGlvblNpZGVdIDw9IDAsIG92ZXJmbG93W2FsdFZhcmlhdGlvblNpZGVdIDw9IDApO1xuICAgIH1cblxuICAgIGlmIChjaGVja3MuZXZlcnkoZnVuY3Rpb24gKGNoZWNrKSB7XG4gICAgICByZXR1cm4gY2hlY2s7XG4gICAgfSkpIHtcbiAgICAgIGZpcnN0Rml0dGluZ1BsYWNlbWVudCA9IHBsYWNlbWVudDtcbiAgICAgIG1ha2VGYWxsYmFja0NoZWNrcyA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2hlY2tzTWFwLnNldChwbGFjZW1lbnQsIGNoZWNrcyk7XG4gIH1cblxuICBpZiAobWFrZUZhbGxiYWNrQ2hlY2tzKSB7XG4gICAgLy8gYDJgIG1heSBiZSBkZXNpcmVkIGluIHNvbWUgY2FzZXMg4oCTIHJlc2VhcmNoIGxhdGVyXG4gICAgdmFyIG51bWJlck9mQ2hlY2tzID0gZmxpcFZhcmlhdGlvbnMgPyAzIDogMTtcblxuICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKF9pKSB7XG4gICAgICB2YXIgZml0dGluZ1BsYWNlbWVudCA9IHBsYWNlbWVudHMuZmluZChmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgICAgIHZhciBjaGVja3MgPSBjaGVja3NNYXAuZ2V0KHBsYWNlbWVudCk7XG5cbiAgICAgICAgaWYgKGNoZWNrcykge1xuICAgICAgICAgIHJldHVybiBjaGVja3Muc2xpY2UoMCwgX2kpLmV2ZXJ5KGZ1bmN0aW9uIChjaGVjaykge1xuICAgICAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGZpdHRpbmdQbGFjZW1lbnQpIHtcbiAgICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gZml0dGluZ1BsYWNlbWVudDtcbiAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZm9yICh2YXIgX2kgPSBudW1iZXJPZkNoZWNrczsgX2kgPiAwOyBfaS0tKSB7XG4gICAgICB2YXIgX3JldCA9IF9sb29wKF9pKTtcblxuICAgICAgaWYgKF9yZXQgPT09IFwiYnJlYWtcIikgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLnBsYWNlbWVudCAhPT0gZmlyc3RGaXR0aW5nUGxhY2VtZW50KSB7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXS5fc2tpcCA9IHRydWU7XG4gICAgc3RhdGUucGxhY2VtZW50ID0gZmlyc3RGaXR0aW5nUGxhY2VtZW50O1xuICAgIHN0YXRlLnJlc2V0ID0gdHJ1ZTtcbiAgfVxufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZmxpcCcsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIGZuOiBmbGlwLFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddLFxuICBkYXRhOiB7XG4gICAgX3NraXA6IGZhbHNlXG4gIH1cbn07IiwiaW1wb3J0IHsgdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0IH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4uL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5cbmZ1bmN0aW9uIGdldFNpZGVPZmZzZXRzKG92ZXJmbG93LCByZWN0LCBwcmV2ZW50ZWRPZmZzZXRzKSB7XG4gIGlmIChwcmV2ZW50ZWRPZmZzZXRzID09PSB2b2lkIDApIHtcbiAgICBwcmV2ZW50ZWRPZmZzZXRzID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IG92ZXJmbG93LnRvcCAtIHJlY3QuaGVpZ2h0IC0gcHJldmVudGVkT2Zmc2V0cy55LFxuICAgIHJpZ2h0OiBvdmVyZmxvdy5yaWdodCAtIHJlY3Qud2lkdGggKyBwcmV2ZW50ZWRPZmZzZXRzLngsXG4gICAgYm90dG9tOiBvdmVyZmxvdy5ib3R0b20gLSByZWN0LmhlaWdodCArIHByZXZlbnRlZE9mZnNldHMueSxcbiAgICBsZWZ0OiBvdmVyZmxvdy5sZWZ0IC0gcmVjdC53aWR0aCAtIHByZXZlbnRlZE9mZnNldHMueFxuICB9O1xufVxuXG5mdW5jdGlvbiBpc0FueVNpZGVGdWxseUNsaXBwZWQob3ZlcmZsb3cpIHtcbiAgcmV0dXJuIFt0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnRdLnNvbWUoZnVuY3Rpb24gKHNpZGUpIHtcbiAgICByZXR1cm4gb3ZlcmZsb3dbc2lkZV0gPj0gMDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhpZGUoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZTtcbiAgdmFyIHJlZmVyZW5jZVJlY3QgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2U7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgcHJldmVudGVkT2Zmc2V0cyA9IHN0YXRlLm1vZGlmaWVyc0RhdGEucHJldmVudE92ZXJmbG93O1xuICB2YXIgcmVmZXJlbmNlT3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGVsZW1lbnRDb250ZXh0OiAncmVmZXJlbmNlJ1xuICB9KTtcbiAgdmFyIHBvcHBlckFsdE92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICBhbHRCb3VuZGFyeTogdHJ1ZVxuICB9KTtcbiAgdmFyIHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyA9IGdldFNpZGVPZmZzZXRzKHJlZmVyZW5jZU92ZXJmbG93LCByZWZlcmVuY2VSZWN0KTtcbiAgdmFyIHBvcHBlckVzY2FwZU9mZnNldHMgPSBnZXRTaWRlT2Zmc2V0cyhwb3BwZXJBbHRPdmVyZmxvdywgcG9wcGVyUmVjdCwgcHJldmVudGVkT2Zmc2V0cyk7XG4gIHZhciBpc1JlZmVyZW5jZUhpZGRlbiA9IGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChyZWZlcmVuY2VDbGlwcGluZ09mZnNldHMpO1xuICB2YXIgaGFzUG9wcGVyRXNjYXBlZCA9IGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChwb3BwZXJFc2NhcGVPZmZzZXRzKTtcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IHtcbiAgICByZWZlcmVuY2VDbGlwcGluZ09mZnNldHM6IHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyxcbiAgICBwb3BwZXJFc2NhcGVPZmZzZXRzOiBwb3BwZXJFc2NhcGVPZmZzZXRzLFxuICAgIGlzUmVmZXJlbmNlSGlkZGVuOiBpc1JlZmVyZW5jZUhpZGRlbixcbiAgICBoYXNQb3BwZXJFc2NhcGVkOiBoYXNQb3BwZXJFc2NhcGVkXG4gIH07XG4gIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIsIHtcbiAgICAnZGF0YS1wb3BwZXItcmVmZXJlbmNlLWhpZGRlbic6IGlzUmVmZXJlbmNlSGlkZGVuLFxuICAgICdkYXRhLXBvcHBlci1lc2NhcGVkJzogaGFzUG9wcGVyRXNjYXBlZFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2hpZGUnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ3ByZXZlbnRPdmVyZmxvdyddLFxuICBmbjogaGlkZVxufTsiLCJleHBvcnQgeyBkZWZhdWx0IGFzIGFwcGx5U3R5bGVzIH0gZnJvbSBcIi4vYXBwbHlTdHlsZXMuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgYXJyb3cgfSBmcm9tIFwiLi9hcnJvdy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBjb21wdXRlU3R5bGVzIH0gZnJvbSBcIi4vY29tcHV0ZVN0eWxlcy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBldmVudExpc3RlbmVycyB9IGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGZsaXAgfSBmcm9tIFwiLi9mbGlwLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGhpZGUgfSBmcm9tIFwiLi9oaWRlLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIG9mZnNldCB9IGZyb20gXCIuL29mZnNldC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwb3BwZXJPZmZzZXRzIH0gZnJvbSBcIi4vcG9wcGVyT2Zmc2V0cy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwcmV2ZW50T3ZlcmZsb3cgfSBmcm9tIFwiLi9wcmV2ZW50T3ZlcmZsb3cuanNcIjsiLCJpbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgcGxhY2VtZW50cyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZUFuZFNraWRkaW5nVG9YWShwbGFjZW1lbnQsIHJlY3RzLCBvZmZzZXQpIHtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCk7XG4gIHZhciBpbnZlcnREaXN0YW5jZSA9IFtsZWZ0LCB0b3BdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMCA/IC0xIDogMTtcblxuICB2YXIgX3JlZiA9IHR5cGVvZiBvZmZzZXQgPT09ICdmdW5jdGlvbicgPyBvZmZzZXQoT2JqZWN0LmFzc2lnbih7fSwgcmVjdHMsIHtcbiAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICB9KSkgOiBvZmZzZXQsXG4gICAgICBza2lkZGluZyA9IF9yZWZbMF0sXG4gICAgICBkaXN0YW5jZSA9IF9yZWZbMV07XG5cbiAgc2tpZGRpbmcgPSBza2lkZGluZyB8fCAwO1xuICBkaXN0YW5jZSA9IChkaXN0YW5jZSB8fCAwKSAqIGludmVydERpc3RhbmNlO1xuICByZXR1cm4gW2xlZnQsIHJpZ2h0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDAgPyB7XG4gICAgeDogZGlzdGFuY2UsXG4gICAgeTogc2tpZGRpbmdcbiAgfSA6IHtcbiAgICB4OiBza2lkZGluZyxcbiAgICB5OiBkaXN0YW5jZVxuICB9O1xufVxuXG5mdW5jdGlvbiBvZmZzZXQoX3JlZjIpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjIuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjIub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmMi5uYW1lO1xuICB2YXIgX29wdGlvbnMkb2Zmc2V0ID0gb3B0aW9ucy5vZmZzZXQsXG4gICAgICBvZmZzZXQgPSBfb3B0aW9ucyRvZmZzZXQgPT09IHZvaWQgMCA/IFswLCAwXSA6IF9vcHRpb25zJG9mZnNldDtcbiAgdmFyIGRhdGEgPSBwbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICBhY2NbcGxhY2VtZW50XSA9IGRpc3RhbmNlQW5kU2tpZGRpbmdUb1hZKHBsYWNlbWVudCwgc3RhdGUucmVjdHMsIG9mZnNldCk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuICB2YXIgX2RhdGEkc3RhdGUkcGxhY2VtZW50ID0gZGF0YVtzdGF0ZS5wbGFjZW1lbnRdLFxuICAgICAgeCA9IF9kYXRhJHN0YXRlJHBsYWNlbWVudC54LFxuICAgICAgeSA9IF9kYXRhJHN0YXRlJHBsYWNlbWVudC55O1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMgIT0gbnVsbCkge1xuICAgIHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cy54ICs9IHg7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLnkgKz0geTtcbiAgfVxuXG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSBkYXRhO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnb2Zmc2V0JyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgcmVxdWlyZXM6IFsncG9wcGVyT2Zmc2V0cyddLFxuICBmbjogb2Zmc2V0XG59OyIsImltcG9ydCBjb21wdXRlT2Zmc2V0cyBmcm9tIFwiLi4vdXRpbHMvY29tcHV0ZU9mZnNldHMuanNcIjtcblxuZnVuY3Rpb24gcG9wcGVyT2Zmc2V0cyhfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICAvLyBPZmZzZXRzIGFyZSB0aGUgYWN0dWFsIHBvc2l0aW9uIHRoZSBwb3BwZXIgbmVlZHMgdG8gaGF2ZSB0byBiZVxuICAvLyBwcm9wZXJseSBwb3NpdGlvbmVkIG5lYXIgaXRzIHJlZmVyZW5jZSBlbGVtZW50XG4gIC8vIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgcGxhY2VtZW50LCBhbmQgd2lsbCBiZSBhZGp1c3RlZCBieVxuICAvLyB0aGUgbW9kaWZpZXJzIGluIHRoZSBuZXh0IHN0ZXBcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGNvbXB1dGVPZmZzZXRzKHtcbiAgICByZWZlcmVuY2U6IHN0YXRlLnJlY3RzLnJlZmVyZW5jZSxcbiAgICBlbGVtZW50OiBzdGF0ZS5yZWN0cy5wb3BwZXIsXG4gICAgc3RyYXRlZ3k6ICdhYnNvbHV0ZScsXG4gICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSk7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdwb3BwZXJPZmZzZXRzJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdyZWFkJyxcbiAgZm46IHBvcHBlck9mZnNldHMsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCB7IHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgc3RhcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRBbHRBeGlzIGZyb20gXCIuLi91dGlscy9nZXRBbHRBeGlzLmpzXCI7XG5pbXBvcnQgeyB3aXRoaW4sIHdpdGhpbk1heENsYW1wIH0gZnJvbSBcIi4uL3V0aWxzL3dpdGhpbi5qc1wiO1xuaW1wb3J0IGdldExheW91dFJlY3QgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4uL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuLi91dGlscy9nZXRWYXJpYXRpb24uanNcIjtcbmltcG9ydCBnZXRGcmVzaFNpZGVPYmplY3QgZnJvbSBcIi4uL3V0aWxzL2dldEZyZXNoU2lkZU9iamVjdC5qc1wiO1xuaW1wb3J0IHsgbWluIGFzIG1hdGhNaW4sIG1heCBhcyBtYXRoTWF4IH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcblxuZnVuY3Rpb24gcHJldmVudE92ZXJmbG93KF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnMsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICB2YXIgX29wdGlvbnMkbWFpbkF4aXMgPSBvcHRpb25zLm1haW5BeGlzLFxuICAgICAgY2hlY2tNYWluQXhpcyA9IF9vcHRpb25zJG1haW5BeGlzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkbWFpbkF4aXMsXG4gICAgICBfb3B0aW9ucyRhbHRBeGlzID0gb3B0aW9ucy5hbHRBeGlzLFxuICAgICAgY2hlY2tBbHRBeGlzID0gX29wdGlvbnMkYWx0QXhpcyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfb3B0aW9ucyRhbHRBeGlzLFxuICAgICAgYm91bmRhcnkgPSBvcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeSA9IG9wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgX29wdGlvbnMkdGV0aGVyID0gb3B0aW9ucy50ZXRoZXIsXG4gICAgICB0ZXRoZXIgPSBfb3B0aW9ucyR0ZXRoZXIgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyR0ZXRoZXIsXG4gICAgICBfb3B0aW9ucyR0ZXRoZXJPZmZzZXQgPSBvcHRpb25zLnRldGhlck9mZnNldCxcbiAgICAgIHRldGhlck9mZnNldCA9IF9vcHRpb25zJHRldGhlck9mZnNldCA9PT0gdm9pZCAwID8gMCA6IF9vcHRpb25zJHRldGhlck9mZnNldDtcbiAgdmFyIG92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgcGFkZGluZzogcGFkZGluZyxcbiAgICBhbHRCb3VuZGFyeTogYWx0Qm91bmRhcnlcbiAgfSk7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpO1xuICB2YXIgdmFyaWF0aW9uID0gZ2V0VmFyaWF0aW9uKHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciBpc0Jhc2VQbGFjZW1lbnQgPSAhdmFyaWF0aW9uO1xuICB2YXIgbWFpbkF4aXMgPSBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCk7XG4gIHZhciBhbHRBeGlzID0gZ2V0QWx0QXhpcyhtYWluQXhpcyk7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciB0ZXRoZXJPZmZzZXRWYWx1ZSA9IHR5cGVvZiB0ZXRoZXJPZmZzZXQgPT09ICdmdW5jdGlvbicgPyB0ZXRoZXJPZmZzZXQoT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVjdHMsIHtcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KSkgOiB0ZXRoZXJPZmZzZXQ7XG4gIHZhciBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUgPSB0eXBlb2YgdGV0aGVyT2Zmc2V0VmFsdWUgPT09ICdudW1iZXInID8ge1xuICAgIG1haW5BeGlzOiB0ZXRoZXJPZmZzZXRWYWx1ZSxcbiAgICBhbHRBeGlzOiB0ZXRoZXJPZmZzZXRWYWx1ZVxuICB9IDogT2JqZWN0LmFzc2lnbih7XG4gICAgbWFpbkF4aXM6IDAsXG4gICAgYWx0QXhpczogMFxuICB9LCB0ZXRoZXJPZmZzZXRWYWx1ZSk7XG4gIHZhciBvZmZzZXRNb2RpZmllclN0YXRlID0gc3RhdGUubW9kaWZpZXJzRGF0YS5vZmZzZXQgPyBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldFtzdGF0ZS5wbGFjZW1lbnRdIDogbnVsbDtcbiAgdmFyIGRhdGEgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKCFwb3BwZXJPZmZzZXRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGNoZWNrTWFpbkF4aXMpIHtcbiAgICB2YXIgX29mZnNldE1vZGlmaWVyU3RhdGUkO1xuXG4gICAgdmFyIG1haW5TaWRlID0gbWFpbkF4aXMgPT09ICd5JyA/IHRvcCA6IGxlZnQ7XG4gICAgdmFyIGFsdFNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gYm90dG9tIDogcmlnaHQ7XG4gICAgdmFyIGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgdmFyIG9mZnNldCA9IHBvcHBlck9mZnNldHNbbWFpbkF4aXNdO1xuICAgIHZhciBtaW4gPSBvZmZzZXQgKyBvdmVyZmxvd1ttYWluU2lkZV07XG4gICAgdmFyIG1heCA9IG9mZnNldCAtIG92ZXJmbG93W2FsdFNpZGVdO1xuICAgIHZhciBhZGRpdGl2ZSA9IHRldGhlciA/IC1wb3BwZXJSZWN0W2xlbl0gLyAyIDogMDtcbiAgICB2YXIgbWluTGVuID0gdmFyaWF0aW9uID09PSBzdGFydCA/IHJlZmVyZW5jZVJlY3RbbGVuXSA6IHBvcHBlclJlY3RbbGVuXTtcbiAgICB2YXIgbWF4TGVuID0gdmFyaWF0aW9uID09PSBzdGFydCA/IC1wb3BwZXJSZWN0W2xlbl0gOiAtcmVmZXJlbmNlUmVjdFtsZW5dOyAvLyBXZSBuZWVkIHRvIGluY2x1ZGUgdGhlIGFycm93IGluIHRoZSBjYWxjdWxhdGlvbiBzbyB0aGUgYXJyb3cgZG9lc24ndCBnb1xuICAgIC8vIG91dHNpZGUgdGhlIHJlZmVyZW5jZSBib3VuZHNcblxuICAgIHZhciBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5hcnJvdztcbiAgICB2YXIgYXJyb3dSZWN0ID0gdGV0aGVyICYmIGFycm93RWxlbWVudCA/IGdldExheW91dFJlY3QoYXJyb3dFbGVtZW50KSA6IHtcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwXG4gICAgfTtcbiAgICB2YXIgYXJyb3dQYWRkaW5nT2JqZWN0ID0gc3RhdGUubW9kaWZpZXJzRGF0YVsnYXJyb3cjcGVyc2lzdGVudCddID8gc3RhdGUubW9kaWZpZXJzRGF0YVsnYXJyb3cjcGVyc2lzdGVudCddLnBhZGRpbmcgOiBnZXRGcmVzaFNpZGVPYmplY3QoKTtcbiAgICB2YXIgYXJyb3dQYWRkaW5nTWluID0gYXJyb3dQYWRkaW5nT2JqZWN0W21haW5TaWRlXTtcbiAgICB2YXIgYXJyb3dQYWRkaW5nTWF4ID0gYXJyb3dQYWRkaW5nT2JqZWN0W2FsdFNpZGVdOyAvLyBJZiB0aGUgcmVmZXJlbmNlIGxlbmd0aCBpcyBzbWFsbGVyIHRoYW4gdGhlIGFycm93IGxlbmd0aCwgd2UgZG9uJ3Qgd2FudFxuICAgIC8vIHRvIGluY2x1ZGUgaXRzIGZ1bGwgc2l6ZSBpbiB0aGUgY2FsY3VsYXRpb24uIElmIHRoZSByZWZlcmVuY2UgaXMgc21hbGxcbiAgICAvLyBhbmQgbmVhciB0aGUgZWRnZSBvZiBhIGJvdW5kYXJ5LCB0aGUgcG9wcGVyIGNhbiBvdmVyZmxvdyBldmVuIGlmIHRoZVxuICAgIC8vIHJlZmVyZW5jZSBpcyBub3Qgb3ZlcmZsb3dpbmcgYXMgd2VsbCAoZS5nLiB2aXJ0dWFsIGVsZW1lbnRzIHdpdGggbm9cbiAgICAvLyB3aWR0aCBvciBoZWlnaHQpXG5cbiAgICB2YXIgYXJyb3dMZW4gPSB3aXRoaW4oMCwgcmVmZXJlbmNlUmVjdFtsZW5dLCBhcnJvd1JlY3RbbGVuXSk7XG4gICAgdmFyIG1pbk9mZnNldCA9IGlzQmFzZVBsYWNlbWVudCA/IHJlZmVyZW5jZVJlY3RbbGVuXSAvIDIgLSBhZGRpdGl2ZSAtIGFycm93TGVuIC0gYXJyb3dQYWRkaW5nTWluIC0gbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzIDogbWluTGVuIC0gYXJyb3dMZW4gLSBhcnJvd1BhZGRpbmdNaW4gLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXM7XG4gICAgdmFyIG1heE9mZnNldCA9IGlzQmFzZVBsYWNlbWVudCA/IC1yZWZlcmVuY2VSZWN0W2xlbl0gLyAyICsgYWRkaXRpdmUgKyBhcnJvd0xlbiArIGFycm93UGFkZGluZ01heCArIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcyA6IG1heExlbiArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzO1xuICAgIHZhciBhcnJvd09mZnNldFBhcmVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93ICYmIGdldE9mZnNldFBhcmVudChzdGF0ZS5lbGVtZW50cy5hcnJvdyk7XG4gICAgdmFyIGNsaWVudE9mZnNldCA9IGFycm93T2Zmc2V0UGFyZW50ID8gbWFpbkF4aXMgPT09ICd5JyA/IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudFRvcCB8fCAwIDogYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50TGVmdCB8fCAwIDogMDtcbiAgICB2YXIgb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQgPSBvZmZzZXRNb2RpZmllclN0YXRlID09IG51bGwgPyB2b2lkIDAgOiBvZmZzZXRNb2RpZmllclN0YXRlW21haW5BeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJCA6IDA7XG4gICAgdmFyIHRldGhlck1pbiA9IG9mZnNldCArIG1pbk9mZnNldCAtIG9mZnNldE1vZGlmaWVyVmFsdWUgLSBjbGllbnRPZmZzZXQ7XG4gICAgdmFyIHRldGhlck1heCA9IG9mZnNldCArIG1heE9mZnNldCAtIG9mZnNldE1vZGlmaWVyVmFsdWU7XG4gICAgdmFyIHByZXZlbnRlZE9mZnNldCA9IHdpdGhpbih0ZXRoZXIgPyBtYXRoTWluKG1pbiwgdGV0aGVyTWluKSA6IG1pbiwgb2Zmc2V0LCB0ZXRoZXIgPyBtYXRoTWF4KG1heCwgdGV0aGVyTWF4KSA6IG1heCk7XG4gICAgcG9wcGVyT2Zmc2V0c1ttYWluQXhpc10gPSBwcmV2ZW50ZWRPZmZzZXQ7XG4gICAgZGF0YVttYWluQXhpc10gPSBwcmV2ZW50ZWRPZmZzZXQgLSBvZmZzZXQ7XG4gIH1cblxuICBpZiAoY2hlY2tBbHRBeGlzKSB7XG4gICAgdmFyIF9vZmZzZXRNb2RpZmllclN0YXRlJDI7XG5cbiAgICB2YXIgX21haW5TaWRlID0gbWFpbkF4aXMgPT09ICd4JyA/IHRvcCA6IGxlZnQ7XG5cbiAgICB2YXIgX2FsdFNpZGUgPSBtYWluQXhpcyA9PT0gJ3gnID8gYm90dG9tIDogcmlnaHQ7XG5cbiAgICB2YXIgX29mZnNldCA9IHBvcHBlck9mZnNldHNbYWx0QXhpc107XG5cbiAgICB2YXIgX2xlbiA9IGFsdEF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICAgIHZhciBfbWluID0gX29mZnNldCArIG92ZXJmbG93W19tYWluU2lkZV07XG5cbiAgICB2YXIgX21heCA9IF9vZmZzZXQgLSBvdmVyZmxvd1tfYWx0U2lkZV07XG5cbiAgICB2YXIgaXNPcmlnaW5TaWRlID0gW3RvcCwgbGVmdF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgICB2YXIgX29mZnNldE1vZGlmaWVyVmFsdWUgPSAoX29mZnNldE1vZGlmaWVyU3RhdGUkMiA9IG9mZnNldE1vZGlmaWVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IG9mZnNldE1vZGlmaWVyU3RhdGVbYWx0QXhpc10pICE9IG51bGwgPyBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyIDogMDtcblxuICAgIHZhciBfdGV0aGVyTWluID0gaXNPcmlnaW5TaWRlID8gX21pbiA6IF9vZmZzZXQgLSByZWZlcmVuY2VSZWN0W19sZW5dIC0gcG9wcGVyUmVjdFtfbGVuXSAtIF9vZmZzZXRNb2RpZmllclZhbHVlICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLmFsdEF4aXM7XG5cbiAgICB2YXIgX3RldGhlck1heCA9IGlzT3JpZ2luU2lkZSA/IF9vZmZzZXQgKyByZWZlcmVuY2VSZWN0W19sZW5dICsgcG9wcGVyUmVjdFtfbGVuXSAtIF9vZmZzZXRNb2RpZmllclZhbHVlIC0gbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLmFsdEF4aXMgOiBfbWF4O1xuXG4gICAgdmFyIF9wcmV2ZW50ZWRPZmZzZXQgPSB0ZXRoZXIgJiYgaXNPcmlnaW5TaWRlID8gd2l0aGluTWF4Q2xhbXAoX3RldGhlck1pbiwgX29mZnNldCwgX3RldGhlck1heCkgOiB3aXRoaW4odGV0aGVyID8gX3RldGhlck1pbiA6IF9taW4sIF9vZmZzZXQsIHRldGhlciA/IF90ZXRoZXJNYXggOiBfbWF4KTtcblxuICAgIHBvcHBlck9mZnNldHNbYWx0QXhpc10gPSBfcHJldmVudGVkT2Zmc2V0O1xuICAgIGRhdGFbYWx0QXhpc10gPSBfcHJldmVudGVkT2Zmc2V0IC0gX29mZnNldDtcbiAgfVxuXG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSBkYXRhO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAncHJldmVudE92ZXJmbG93JyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IHByZXZlbnRPdmVyZmxvdyxcbiAgcmVxdWlyZXNJZkV4aXN0czogWydvZmZzZXQnXVxufTsiLCJpbXBvcnQgeyBwb3BwZXJHZW5lcmF0b3IsIGRldGVjdE92ZXJmbG93IH0gZnJvbSBcIi4vY3JlYXRlUG9wcGVyLmpzXCI7XG5pbXBvcnQgZXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5pbXBvcnQgcG9wcGVyT2Zmc2V0cyBmcm9tIFwiLi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qc1wiO1xuaW1wb3J0IGNvbXB1dGVTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2NvbXB1dGVTdHlsZXMuanNcIjtcbmltcG9ydCBhcHBseVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvYXBwbHlTdHlsZXMuanNcIjtcbnZhciBkZWZhdWx0TW9kaWZpZXJzID0gW2V2ZW50TGlzdGVuZXJzLCBwb3BwZXJPZmZzZXRzLCBjb21wdXRlU3R5bGVzLCBhcHBseVN0eWxlc107XG52YXIgY3JlYXRlUG9wcGVyID0gLyojX19QVVJFX18qL3BvcHBlckdlbmVyYXRvcih7XG4gIGRlZmF1bHRNb2RpZmllcnM6IGRlZmF1bHRNb2RpZmllcnNcbn0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciwgcG9wcGVyR2VuZXJhdG9yLCBkZWZhdWx0TW9kaWZpZXJzLCBkZXRlY3RPdmVyZmxvdyB9OyIsImltcG9ydCB7IHBvcHBlckdlbmVyYXRvciwgZGV0ZWN0T3ZlcmZsb3cgfSBmcm9tIFwiLi9jcmVhdGVQb3BwZXIuanNcIjtcbmltcG9ydCBldmVudExpc3RlbmVycyBmcm9tIFwiLi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmltcG9ydCBwb3BwZXJPZmZzZXRzIGZyb20gXCIuL21vZGlmaWVycy9wb3BwZXJPZmZzZXRzLmpzXCI7XG5pbXBvcnQgY29tcHV0ZVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvY29tcHV0ZVN0eWxlcy5qc1wiO1xuaW1wb3J0IGFwcGx5U3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9hcHBseVN0eWxlcy5qc1wiO1xuaW1wb3J0IG9mZnNldCBmcm9tIFwiLi9tb2RpZmllcnMvb2Zmc2V0LmpzXCI7XG5pbXBvcnQgZmxpcCBmcm9tIFwiLi9tb2RpZmllcnMvZmxpcC5qc1wiO1xuaW1wb3J0IHByZXZlbnRPdmVyZmxvdyBmcm9tIFwiLi9tb2RpZmllcnMvcHJldmVudE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgYXJyb3cgZnJvbSBcIi4vbW9kaWZpZXJzL2Fycm93LmpzXCI7XG5pbXBvcnQgaGlkZSBmcm9tIFwiLi9tb2RpZmllcnMvaGlkZS5qc1wiO1xudmFyIGRlZmF1bHRNb2RpZmllcnMgPSBbZXZlbnRMaXN0ZW5lcnMsIHBvcHBlck9mZnNldHMsIGNvbXB1dGVTdHlsZXMsIGFwcGx5U3R5bGVzLCBvZmZzZXQsIGZsaXAsIHByZXZlbnRPdmVyZmxvdywgYXJyb3csIGhpZGVdO1xudmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3Ioe1xuICBkZWZhdWx0TW9kaWZpZXJzOiBkZWZhdWx0TW9kaWZpZXJzXG59KTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIsIHBvcHBlckdlbmVyYXRvciwgZGVmYXVsdE1vZGlmaWVycywgZGV0ZWN0T3ZlcmZsb3cgfTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIgYXMgY3JlYXRlUG9wcGVyTGl0ZSB9IGZyb20gXCIuL3BvcHBlci1saXRlLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0ICogZnJvbSBcIi4vbW9kaWZpZXJzL2luZGV4LmpzXCI7IiwiaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi9nZXRWYXJpYXRpb24uanNcIjtcbmltcG9ydCB7IHZhcmlhdGlvblBsYWNlbWVudHMsIGJhc2VQbGFjZW1lbnRzLCBwbGFjZW1lbnRzIGFzIGFsbFBsYWNlbWVudHMgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4vZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcHV0ZUF1dG9QbGFjZW1lbnQoc3RhdGUsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMsXG4gICAgICBwbGFjZW1lbnQgPSBfb3B0aW9ucy5wbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeSA9IF9vcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gX29wdGlvbnMucm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZyA9IF9vcHRpb25zLnBhZGRpbmcsXG4gICAgICBmbGlwVmFyaWF0aW9ucyA9IF9vcHRpb25zLmZsaXBWYXJpYXRpb25zLFxuICAgICAgX29wdGlvbnMkYWxsb3dlZEF1dG9QID0gX29wdGlvbnMuYWxsb3dlZEF1dG9QbGFjZW1lbnRzLFxuICAgICAgYWxsb3dlZEF1dG9QbGFjZW1lbnRzID0gX29wdGlvbnMkYWxsb3dlZEF1dG9QID09PSB2b2lkIDAgPyBhbGxQbGFjZW1lbnRzIDogX29wdGlvbnMkYWxsb3dlZEF1dG9QO1xuICB2YXIgdmFyaWF0aW9uID0gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCk7XG4gIHZhciBwbGFjZW1lbnRzID0gdmFyaWF0aW9uID8gZmxpcFZhcmlhdGlvbnMgPyB2YXJpYXRpb25QbGFjZW1lbnRzIDogdmFyaWF0aW9uUGxhY2VtZW50cy5maWx0ZXIoZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgIHJldHVybiBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA9PT0gdmFyaWF0aW9uO1xuICB9KSA6IGJhc2VQbGFjZW1lbnRzO1xuICB2YXIgYWxsb3dlZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgcmV0dXJuIGFsbG93ZWRBdXRvUGxhY2VtZW50cy5pbmRleE9mKHBsYWNlbWVudCkgPj0gMDtcbiAgfSk7XG5cbiAgaWYgKGFsbG93ZWRQbGFjZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGFsbG93ZWRQbGFjZW1lbnRzID0gcGxhY2VtZW50cztcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoWydQb3BwZXI6IFRoZSBgYWxsb3dlZEF1dG9QbGFjZW1lbnRzYCBvcHRpb24gZGlkIG5vdCBhbGxvdyBhbnknLCAncGxhY2VtZW50cy4gRW5zdXJlIHRoZSBgcGxhY2VtZW50YCBvcHRpb24gbWF0Y2hlcyB0aGUgdmFyaWF0aW9uJywgJ29mIHRoZSBhbGxvd2VkIHBsYWNlbWVudHMuJywgJ0ZvciBleGFtcGxlLCBcImF1dG9cIiBjYW5ub3QgYmUgdXNlZCB0byBhbGxvdyBcImJvdHRvbS1zdGFydFwiLicsICdVc2UgXCJhdXRvLXN0YXJ0XCIgaW5zdGVhZC4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfSAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS10eXBlXTogRmxvdyBzZWVtcyB0byBoYXZlIHByb2JsZW1zIHdpdGggdHdvIGFycmF5IHVuaW9ucy4uLlxuXG5cbiAgdmFyIG92ZXJmbG93cyA9IGFsbG93ZWRQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICBhY2NbcGxhY2VtZW50XSA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZ1xuICAgIH0pW2dldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KV07XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuICByZXR1cm4gT2JqZWN0LmtleXMob3ZlcmZsb3dzKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIG92ZXJmbG93c1thXSAtIG92ZXJmbG93c1tiXTtcbiAgfSk7XG59IiwiaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4vZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi9nZXRWYXJpYXRpb24uanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4vZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyB0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnQsIHN0YXJ0LCBlbmQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXB1dGVPZmZzZXRzKF9yZWYpIHtcbiAgdmFyIHJlZmVyZW5jZSA9IF9yZWYucmVmZXJlbmNlLFxuICAgICAgZWxlbWVudCA9IF9yZWYuZWxlbWVudCxcbiAgICAgIHBsYWNlbWVudCA9IF9yZWYucGxhY2VtZW50O1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IHBsYWNlbWVudCA/IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA6IG51bGw7XG4gIHZhciB2YXJpYXRpb24gPSBwbGFjZW1lbnQgPyBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA6IG51bGw7XG4gIHZhciBjb21tb25YID0gcmVmZXJlbmNlLnggKyByZWZlcmVuY2Uud2lkdGggLyAyIC0gZWxlbWVudC53aWR0aCAvIDI7XG4gIHZhciBjb21tb25ZID0gcmVmZXJlbmNlLnkgKyByZWZlcmVuY2UuaGVpZ2h0IC8gMiAtIGVsZW1lbnQuaGVpZ2h0IC8gMjtcbiAgdmFyIG9mZnNldHM7XG5cbiAgc3dpdGNoIChiYXNlUGxhY2VtZW50KSB7XG4gICAgY2FzZSB0b3A6XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiBjb21tb25YLFxuICAgICAgICB5OiByZWZlcmVuY2UueSAtIGVsZW1lbnQuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIGJvdHRvbTpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IGNvbW1vblgsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55ICsgcmVmZXJlbmNlLmhlaWdodFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSByaWdodDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54ICsgcmVmZXJlbmNlLndpZHRoLFxuICAgICAgICB5OiBjb21tb25ZXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIGxlZnQ6XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiByZWZlcmVuY2UueCAtIGVsZW1lbnQud2lkdGgsXG4gICAgICAgIHk6IGNvbW1vbllcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiByZWZlcmVuY2UueCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnlcbiAgICAgIH07XG4gIH1cblxuICB2YXIgbWFpbkF4aXMgPSBiYXNlUGxhY2VtZW50ID8gZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50KGJhc2VQbGFjZW1lbnQpIDogbnVsbDtcblxuICBpZiAobWFpbkF4aXMgIT0gbnVsbCkge1xuICAgIHZhciBsZW4gPSBtYWluQXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgc3dpdGNoICh2YXJpYXRpb24pIHtcbiAgICAgIGNhc2Ugc3RhcnQ6XG4gICAgICAgIG9mZnNldHNbbWFpbkF4aXNdID0gb2Zmc2V0c1ttYWluQXhpc10gLSAocmVmZXJlbmNlW2xlbl0gLyAyIC0gZWxlbWVudFtsZW5dIC8gMik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIGVuZDpcbiAgICAgICAgb2Zmc2V0c1ttYWluQXhpc10gPSBvZmZzZXRzW21haW5BeGlzXSArIChyZWZlcmVuY2VbbGVuXSAvIDIgLSBlbGVtZW50W2xlbl0gLyAyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9mZnNldHM7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVib3VuY2UoZm4pIHtcbiAgdmFyIHBlbmRpbmc7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFwZW5kaW5nKSB7XG4gICAgICBwZW5kaW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcGVuZGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICByZXNvbHZlKGZuKCkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwZW5kaW5nO1xuICB9O1xufSIsImltcG9ydCBnZXRDbGlwcGluZ1JlY3QgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRDbGlwcGluZ1JlY3QuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCBjb21wdXRlT2Zmc2V0cyBmcm9tIFwiLi9jb21wdXRlT2Zmc2V0cy5qc1wiO1xuaW1wb3J0IHJlY3RUb0NsaWVudFJlY3QgZnJvbSBcIi4vcmVjdFRvQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IHsgY2xpcHBpbmdQYXJlbnRzLCByZWZlcmVuY2UsIHBvcHBlciwgYm90dG9tLCB0b3AsIHJpZ2h0LCBiYXNlUGxhY2VtZW50cywgdmlld3BvcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IG1lcmdlUGFkZGluZ09iamVjdCBmcm9tIFwiLi9tZXJnZVBhZGRpbmdPYmplY3QuanNcIjtcbmltcG9ydCBleHBhbmRUb0hhc2hNYXAgZnJvbSBcIi4vZXhwYW5kVG9IYXNoTWFwLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMsXG4gICAgICBfb3B0aW9ucyRwbGFjZW1lbnQgPSBfb3B0aW9ucy5wbGFjZW1lbnQsXG4gICAgICBwbGFjZW1lbnQgPSBfb3B0aW9ucyRwbGFjZW1lbnQgPT09IHZvaWQgMCA/IHN0YXRlLnBsYWNlbWVudCA6IF9vcHRpb25zJHBsYWNlbWVudCxcbiAgICAgIF9vcHRpb25zJHN0cmF0ZWd5ID0gX29wdGlvbnMuc3RyYXRlZ3ksXG4gICAgICBzdHJhdGVneSA9IF9vcHRpb25zJHN0cmF0ZWd5ID09PSB2b2lkIDAgPyBzdGF0ZS5zdHJhdGVneSA6IF9vcHRpb25zJHN0cmF0ZWd5LFxuICAgICAgX29wdGlvbnMkYm91bmRhcnkgPSBfb3B0aW9ucy5ib3VuZGFyeSxcbiAgICAgIGJvdW5kYXJ5ID0gX29wdGlvbnMkYm91bmRhcnkgPT09IHZvaWQgMCA/IGNsaXBwaW5nUGFyZW50cyA6IF9vcHRpb25zJGJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkcm9vdEJvdW5kYXJ5ID0gX29wdGlvbnMucm9vdEJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gX29wdGlvbnMkcm9vdEJvdW5kYXJ5ID09PSB2b2lkIDAgPyB2aWV3cG9ydCA6IF9vcHRpb25zJHJvb3RCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJGVsZW1lbnRDb250ZSA9IF9vcHRpb25zLmVsZW1lbnRDb250ZXh0LFxuICAgICAgZWxlbWVudENvbnRleHQgPSBfb3B0aW9ucyRlbGVtZW50Q29udGUgPT09IHZvaWQgMCA/IHBvcHBlciA6IF9vcHRpb25zJGVsZW1lbnRDb250ZSxcbiAgICAgIF9vcHRpb25zJGFsdEJvdW5kYXJ5ID0gX29wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeSA9IF9vcHRpb25zJGFsdEJvdW5kYXJ5ID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkcGFkZGluZyA9IF9vcHRpb25zLnBhZGRpbmcsXG4gICAgICBwYWRkaW5nID0gX29wdGlvbnMkcGFkZGluZyA9PT0gdm9pZCAwID8gMCA6IF9vcHRpb25zJHBhZGRpbmc7XG4gIHZhciBwYWRkaW5nT2JqZWN0ID0gbWVyZ2VQYWRkaW5nT2JqZWN0KHR5cGVvZiBwYWRkaW5nICE9PSAnbnVtYmVyJyA/IHBhZGRpbmcgOiBleHBhbmRUb0hhc2hNYXAocGFkZGluZywgYmFzZVBsYWNlbWVudHMpKTtcbiAgdmFyIGFsdENvbnRleHQgPSBlbGVtZW50Q29udGV4dCA9PT0gcG9wcGVyID8gcmVmZXJlbmNlIDogcG9wcGVyO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1thbHRCb3VuZGFyeSA/IGFsdENvbnRleHQgOiBlbGVtZW50Q29udGV4dF07XG4gIHZhciBjbGlwcGluZ0NsaWVudFJlY3QgPSBnZXRDbGlwcGluZ1JlY3QoaXNFbGVtZW50KGVsZW1lbnQpID8gZWxlbWVudCA6IGVsZW1lbnQuY29udGV4dEVsZW1lbnQgfHwgZ2V0RG9jdW1lbnRFbGVtZW50KHN0YXRlLmVsZW1lbnRzLnBvcHBlciksIGJvdW5kYXJ5LCByb290Qm91bmRhcnksIHN0cmF0ZWd5KTtcbiAgdmFyIHJlZmVyZW5jZUNsaWVudFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qoc3RhdGUuZWxlbWVudHMucmVmZXJlbmNlKTtcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBjb21wdXRlT2Zmc2V0cyh7XG4gICAgcmVmZXJlbmNlOiByZWZlcmVuY2VDbGllbnRSZWN0LFxuICAgIGVsZW1lbnQ6IHBvcHBlclJlY3QsXG4gICAgc3RyYXRlZ3k6ICdhYnNvbHV0ZScsXG4gICAgcGxhY2VtZW50OiBwbGFjZW1lbnRcbiAgfSk7XG4gIHZhciBwb3BwZXJDbGllbnRSZWN0ID0gcmVjdFRvQ2xpZW50UmVjdChPYmplY3QuYXNzaWduKHt9LCBwb3BwZXJSZWN0LCBwb3BwZXJPZmZzZXRzKSk7XG4gIHZhciBlbGVtZW50Q2xpZW50UmVjdCA9IGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgPyBwb3BwZXJDbGllbnRSZWN0IDogcmVmZXJlbmNlQ2xpZW50UmVjdDsgLy8gcG9zaXRpdmUgPSBvdmVyZmxvd2luZyB0aGUgY2xpcHBpbmcgcmVjdFxuICAvLyAwIG9yIG5lZ2F0aXZlID0gd2l0aGluIHRoZSBjbGlwcGluZyByZWN0XG5cbiAgdmFyIG92ZXJmbG93T2Zmc2V0cyA9IHtcbiAgICB0b3A6IGNsaXBwaW5nQ2xpZW50UmVjdC50b3AgLSBlbGVtZW50Q2xpZW50UmVjdC50b3AgKyBwYWRkaW5nT2JqZWN0LnRvcCxcbiAgICBib3R0b206IGVsZW1lbnRDbGllbnRSZWN0LmJvdHRvbSAtIGNsaXBwaW5nQ2xpZW50UmVjdC5ib3R0b20gKyBwYWRkaW5nT2JqZWN0LmJvdHRvbSxcbiAgICBsZWZ0OiBjbGlwcGluZ0NsaWVudFJlY3QubGVmdCAtIGVsZW1lbnRDbGllbnRSZWN0LmxlZnQgKyBwYWRkaW5nT2JqZWN0LmxlZnQsXG4gICAgcmlnaHQ6IGVsZW1lbnRDbGllbnRSZWN0LnJpZ2h0IC0gY2xpcHBpbmdDbGllbnRSZWN0LnJpZ2h0ICsgcGFkZGluZ09iamVjdC5yaWdodFxuICB9O1xuICB2YXIgb2Zmc2V0RGF0YSA9IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0OyAvLyBPZmZzZXRzIGNhbiBiZSBhcHBsaWVkIG9ubHkgdG8gdGhlIHBvcHBlciBlbGVtZW50XG5cbiAgaWYgKGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgJiYgb2Zmc2V0RGF0YSkge1xuICAgIHZhciBvZmZzZXQgPSBvZmZzZXREYXRhW3BsYWNlbWVudF07XG4gICAgT2JqZWN0LmtleXMob3ZlcmZsb3dPZmZzZXRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBtdWx0aXBseSA9IFtyaWdodCwgYm90dG9tXS5pbmRleE9mKGtleSkgPj0gMCA/IDEgOiAtMTtcbiAgICAgIHZhciBheGlzID0gW3RvcCwgYm90dG9tXS5pbmRleE9mKGtleSkgPj0gMCA/ICd5JyA6ICd4JztcbiAgICAgIG92ZXJmbG93T2Zmc2V0c1trZXldICs9IG9mZnNldFtheGlzXSAqIG11bHRpcGx5O1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG92ZXJmbG93T2Zmc2V0cztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHBhbmRUb0hhc2hNYXAodmFsdWUsIGtleXMpIHtcbiAgcmV0dXJuIGtleXMucmVkdWNlKGZ1bmN0aW9uIChoYXNoTWFwLCBrZXkpIHtcbiAgICBoYXNoTWFwW2tleV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gaGFzaE1hcDtcbiAgfSwge30pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdChzdHIpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIFtdLmNvbmNhdChhcmdzKS5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHtcbiAgICByZXR1cm4gcC5yZXBsYWNlKC8lcy8sIGMpO1xuICB9LCBzdHIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEFsdEF4aXMoYXhpcykge1xuICByZXR1cm4gYXhpcyA9PT0gJ3gnID8gJ3knIDogJ3gnO1xufSIsImltcG9ydCB7IGF1dG8gfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRGcmVzaFNpZGVPYmplY3QoKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIGJvdHRvbTogMCxcbiAgICBsZWZ0OiAwXG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gWyd0b3AnLCAnYm90dG9tJ10uaW5kZXhPZihwbGFjZW1lbnQpID49IDAgPyAneCcgOiAneSc7XG59IiwidmFyIGhhc2ggPSB7XG4gIGxlZnQ6ICdyaWdodCcsXG4gIHJpZ2h0OiAnbGVmdCcsXG4gIGJvdHRvbTogJ3RvcCcsXG4gIHRvcDogJ2JvdHRvbSdcbn07XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9sZWZ0fHJpZ2h0fGJvdHRvbXx0b3AvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59IiwidmFyIGhhc2ggPSB7XG4gIHN0YXJ0OiAnZW5kJyxcbiAgZW5kOiAnc3RhcnQnXG59O1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQucmVwbGFjZSgvc3RhcnR8ZW5kL2csIGZ1bmN0aW9uIChtYXRjaGVkKSB7XG4gICAgcmV0dXJuIGhhc2hbbWF0Y2hlZF07XG4gIH0pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzFdO1xufSIsImV4cG9ydCB2YXIgbWF4ID0gTWF0aC5tYXg7XG5leHBvcnQgdmFyIG1pbiA9IE1hdGgubWluO1xuZXhwb3J0IHZhciByb3VuZCA9IE1hdGgucm91bmQ7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VCeU5hbWUobW9kaWZpZXJzKSB7XG4gIHZhciBtZXJnZWQgPSBtb2RpZmllcnMucmVkdWNlKGZ1bmN0aW9uIChtZXJnZWQsIGN1cnJlbnQpIHtcbiAgICB2YXIgZXhpc3RpbmcgPSBtZXJnZWRbY3VycmVudC5uYW1lXTtcbiAgICBtZXJnZWRbY3VycmVudC5uYW1lXSA9IGV4aXN0aW5nID8gT2JqZWN0LmFzc2lnbih7fSwgZXhpc3RpbmcsIGN1cnJlbnQsIHtcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLm9wdGlvbnMsIGN1cnJlbnQub3B0aW9ucyksXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZy5kYXRhLCBjdXJyZW50LmRhdGEpXG4gICAgfSkgOiBjdXJyZW50O1xuICAgIHJldHVybiBtZXJnZWQ7XG4gIH0sIHt9KTsgLy8gSUUxMSBkb2VzIG5vdCBzdXBwb3J0IE9iamVjdC52YWx1ZXNcblxuICByZXR1cm4gT2JqZWN0LmtleXMobWVyZ2VkKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBtZXJnZWRba2V5XTtcbiAgfSk7XG59IiwiaW1wb3J0IGdldEZyZXNoU2lkZU9iamVjdCBmcm9tIFwiLi9nZXRGcmVzaFNpZGVPYmplY3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlUGFkZGluZ09iamVjdChwYWRkaW5nT2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBnZXRGcmVzaFNpZGVPYmplY3QoKSwgcGFkZGluZ09iamVjdCk7XG59IiwiaW1wb3J0IHsgbW9kaWZpZXJQaGFzZXMgfSBmcm9tIFwiLi4vZW51bXMuanNcIjsgLy8gc291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80OTg3NTI1NVxuXG5mdW5jdGlvbiBvcmRlcihtb2RpZmllcnMpIHtcbiAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIHZpc2l0ZWQgPSBuZXcgU2V0KCk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgbWFwLnNldChtb2RpZmllci5uYW1lLCBtb2RpZmllcik7XG4gIH0pOyAvLyBPbiB2aXNpdGluZyBvYmplY3QsIGNoZWNrIGZvciBpdHMgZGVwZW5kZW5jaWVzIGFuZCB2aXNpdCB0aGVtIHJlY3Vyc2l2ZWx5XG5cbiAgZnVuY3Rpb24gc29ydChtb2RpZmllcikge1xuICAgIHZpc2l0ZWQuYWRkKG1vZGlmaWVyLm5hbWUpO1xuICAgIHZhciByZXF1aXJlcyA9IFtdLmNvbmNhdChtb2RpZmllci5yZXF1aXJlcyB8fCBbXSwgbW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cyB8fCBbXSk7XG4gICAgcmVxdWlyZXMuZm9yRWFjaChmdW5jdGlvbiAoZGVwKSB7XG4gICAgICBpZiAoIXZpc2l0ZWQuaGFzKGRlcCkpIHtcbiAgICAgICAgdmFyIGRlcE1vZGlmaWVyID0gbWFwLmdldChkZXApO1xuXG4gICAgICAgIGlmIChkZXBNb2RpZmllcikge1xuICAgICAgICAgIHNvcnQoZGVwTW9kaWZpZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVzdWx0LnB1c2gobW9kaWZpZXIpO1xuICB9XG5cbiAgbW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgaWYgKCF2aXNpdGVkLmhhcyhtb2RpZmllci5uYW1lKSkge1xuICAgICAgLy8gY2hlY2sgZm9yIHZpc2l0ZWQgb2JqZWN0XG4gICAgICBzb3J0KG1vZGlmaWVyKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcmRlck1vZGlmaWVycyhtb2RpZmllcnMpIHtcbiAgLy8gb3JkZXIgYmFzZWQgb24gZGVwZW5kZW5jaWVzXG4gIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXIobW9kaWZpZXJzKTsgLy8gb3JkZXIgYmFzZWQgb24gcGhhc2VcblxuICByZXR1cm4gbW9kaWZpZXJQaGFzZXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBoYXNlKSB7XG4gICAgcmV0dXJuIGFjYy5jb25jYXQob3JkZXJlZE1vZGlmaWVycy5maWx0ZXIoZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgICByZXR1cm4gbW9kaWZpZXIucGhhc2UgPT09IHBoYXNlO1xuICAgIH0pKTtcbiAgfSwgW10pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlY3RUb0NsaWVudFJlY3QocmVjdCkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcmVjdCwge1xuICAgIGxlZnQ6IHJlY3QueCxcbiAgICB0b3A6IHJlY3QueSxcbiAgICByaWdodDogcmVjdC54ICsgcmVjdC53aWR0aCxcbiAgICBib3R0b206IHJlY3QueSArIHJlY3QuaGVpZ2h0XG4gIH0pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuaXF1ZUJ5KGFyciwgZm4pIHtcbiAgdmFyIGlkZW50aWZpZXJzID0gbmV3IFNldCgpO1xuICByZXR1cm4gYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgIHZhciBpZGVudGlmaWVyID0gZm4oaXRlbSk7XG5cbiAgICBpZiAoIWlkZW50aWZpZXJzLmhhcyhpZGVudGlmaWVyKSkge1xuICAgICAgaWRlbnRpZmllcnMuYWRkKGlkZW50aWZpZXIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVQVN0cmluZygpIHtcbiAgdmFyIHVhRGF0YSA9IG5hdmlnYXRvci51c2VyQWdlbnREYXRhO1xuXG4gIGlmICh1YURhdGEgIT0gbnVsbCAmJiB1YURhdGEuYnJhbmRzKSB7XG4gICAgcmV0dXJuIHVhRGF0YS5icmFuZHMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS5icmFuZCArIFwiL1wiICsgaXRlbS52ZXJzaW9uO1xuICAgIH0pLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50O1xufSIsImltcG9ydCBmb3JtYXQgZnJvbSBcIi4vZm9ybWF0LmpzXCI7XG5pbXBvcnQgeyBtb2RpZmllclBoYXNlcyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xudmFyIElOVkFMSURfTU9ESUZJRVJfRVJST1IgPSAnUG9wcGVyOiBtb2RpZmllciBcIiVzXCIgcHJvdmlkZWQgYW4gaW52YWxpZCAlcyBwcm9wZXJ0eSwgZXhwZWN0ZWQgJXMgYnV0IGdvdCAlcyc7XG52YXIgTUlTU0lOR19ERVBFTkRFTkNZX0VSUk9SID0gJ1BvcHBlcjogbW9kaWZpZXIgXCIlc1wiIHJlcXVpcmVzIFwiJXNcIiwgYnV0IFwiJXNcIiBtb2RpZmllciBpcyBub3QgYXZhaWxhYmxlJztcbnZhciBWQUxJRF9QUk9QRVJUSUVTID0gWyduYW1lJywgJ2VuYWJsZWQnLCAncGhhc2UnLCAnZm4nLCAnZWZmZWN0JywgJ3JlcXVpcmVzJywgJ29wdGlvbnMnXTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZhbGlkYXRlTW9kaWZpZXJzKG1vZGlmaWVycykge1xuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBbXS5jb25jYXQoT2JqZWN0LmtleXMobW9kaWZpZXIpLCBWQUxJRF9QUk9QRVJUSUVTKSAvLyBJRTExLWNvbXBhdGlibGUgcmVwbGFjZW1lbnQgZm9yIGBuZXcgU2V0KGl0ZXJhYmxlKWBcbiAgICAuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgIHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcbiAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICAgIGlmICh0eXBlb2YgbW9kaWZpZXIubmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIFN0cmluZyhtb2RpZmllci5uYW1lKSwgJ1wibmFtZVwiJywgJ1wic3RyaW5nXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5uYW1lKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZW5hYmxlZCc6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5lbmFibGVkICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcImVuYWJsZWRcIicsICdcImJvb2xlYW5cIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLmVuYWJsZWQpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdwaGFzZSc6XG4gICAgICAgICAgaWYgKG1vZGlmaWVyUGhhc2VzLmluZGV4T2YobW9kaWZpZXIucGhhc2UpIDwgMCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wicGhhc2VcIicsIFwiZWl0aGVyIFwiICsgbW9kaWZpZXJQaGFzZXMuam9pbignLCAnKSwgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIucGhhc2UpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdmbic6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5mbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZm5cIicsICdcImZ1bmN0aW9uXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5mbikgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2VmZmVjdCc6XG4gICAgICAgICAgaWYgKG1vZGlmaWVyLmVmZmVjdCAhPSBudWxsICYmIHR5cGVvZiBtb2RpZmllci5lZmZlY3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcImVmZmVjdFwiJywgJ1wiZnVuY3Rpb25cIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLmZuKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVxdWlyZXMnOlxuICAgICAgICAgIGlmIChtb2RpZmllci5yZXF1aXJlcyAhPSBudWxsICYmICFBcnJheS5pc0FycmF5KG1vZGlmaWVyLnJlcXVpcmVzKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wicmVxdWlyZXNcIicsICdcImFycmF5XCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5yZXF1aXJlcykgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3JlcXVpcmVzSWZFeGlzdHMnOlxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wicmVxdWlyZXNJZkV4aXN0c1wiJywgJ1wiYXJyYXlcIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLnJlcXVpcmVzSWZFeGlzdHMpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdvcHRpb25zJzpcbiAgICAgICAgY2FzZSAnZGF0YSc6XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUG9wcGVySlM6IGFuIGludmFsaWQgcHJvcGVydHkgaGFzIGJlZW4gcHJvdmlkZWQgdG8gdGhlIFxcXCJcIiArIG1vZGlmaWVyLm5hbWUgKyBcIlxcXCIgbW9kaWZpZXIsIHZhbGlkIHByb3BlcnRpZXMgYXJlIFwiICsgVkFMSURfUFJPUEVSVElFUy5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlxcXCJcIiArIHMgKyBcIlxcXCJcIjtcbiAgICAgICAgICB9KS5qb2luKCcsICcpICsgXCI7IGJ1dCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgd2FzIHByb3ZpZGVkLlwiKTtcbiAgICAgIH1cblxuICAgICAgbW9kaWZpZXIucmVxdWlyZXMgJiYgbW9kaWZpZXIucmVxdWlyZXMuZm9yRWFjaChmdW5jdGlvbiAocmVxdWlyZW1lbnQpIHtcbiAgICAgICAgaWYgKG1vZGlmaWVycy5maW5kKGZ1bmN0aW9uIChtb2QpIHtcbiAgICAgICAgICByZXR1cm4gbW9kLm5hbWUgPT09IHJlcXVpcmVtZW50O1xuICAgICAgICB9KSA9PSBudWxsKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoTUlTU0lOR19ERVBFTkRFTkNZX0VSUk9SLCBTdHJpbmcobW9kaWZpZXIubmFtZSksIHJlcXVpcmVtZW50LCByZXF1aXJlbWVudCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59IiwiaW1wb3J0IHsgbWF4IGFzIG1hdGhNYXgsIG1pbiBhcyBtYXRoTWluIH0gZnJvbSBcIi4vbWF0aC5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhpbihtaW4sIHZhbHVlLCBtYXgpIHtcbiAgcmV0dXJuIG1hdGhNYXgobWluLCBtYXRoTWluKHZhbHVlLCBtYXgpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3aXRoaW5NYXhDbGFtcChtaW4sIHZhbHVlLCBtYXgpIHtcbiAgdmFyIHYgPSB3aXRoaW4obWluLCB2YWx1ZSwgbWF4KTtcbiAgcmV0dXJuIHYgPiBtYXggPyBtYXggOiB2O1xufSIsImNvbnN0IGluZGV4Q291bnRlciA9ICgpID0+IHtcclxuICAgIGxldCBjdXJySW5kZXggPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KCl7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRJbmRleCgpIHtcclxuICAgICAgICBjdXJySW5kZXggPSBjdXJySW5kZXggKyAxO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtnZXRJbmRleCwgaW5jcmVtZW50SW5kZXh9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbmRleENvdW50ZXI7IiwiaW1wb3J0IGluZGV4Q291bnRlciBmcm9tICcuL2hlbHBlci5qcyc7XHJcblxyXG5jb25zdCBwcm9qZWN0ID0gKG5hbWUsIHRhc2tzID0gW10sIGluZGV4KSA9PiB7XHJcbiAgICBsZXQgY3VyclRhc2tJbmRleCA9IGluZGV4Q291bnRlcigpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBnZXROYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFRhc2tzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldE5hbWUobmV3TmFtZSl7XHJcbiAgICAgICAgbmFtZSA9IG5ld05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0SW5kZXgobmV3SW5kZXgpe1xyXG4gICAgICAgIGluZGV4ID0gbmV3SW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLy9uZWVkIHRvIHNldCBhIHVuaXF1ZSBpbmRleCBmb3IgdGFzayBhZnRlciBpdCdzIGNyZWF0ZWRcclxuICAgIGZ1bmN0aW9uIGFkZFRhc2sodGFzayl7XHJcbiAgICAgICAgdGFzay5zZXRJbmRleChjdXJyVGFza0luZGV4LmdldEluZGV4KCkpO1xyXG4gICAgICAgIHRhc2tzLnB1c2godGFzayk7XHJcbiAgICAgICAgY3VyclRhc2tJbmRleC5pbmNyZW1lbnRJbmRleCgpO1xyXG4gICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcmVtb3ZlcyB0aGUgdGFzayBmcm9tIHRoZSB0YXNrIGFycmF5XHJcbiAgICBmdW5jdGlvbiByZW1vdmVUYXNrKHRhc2tJbmRleCl7XHJcbiAgICAgICAgdGFza3Muc3BsaWNlKHRhc2tJbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtnZXROYW1lLCBnZXRJbmRleCwgZ2V0VGFza3MsIHNldE5hbWUsIHNldEluZGV4LCBhZGRUYXNrLCByZW1vdmVUYXNrfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0OyIsImltcG9ydCBpbmRleENvdW50ZXIgZnJvbSAnLi9oZWxwZXIuanMnO1xyXG4vL3Byb2plY3RzIGNvbnRhaW4gdGFza3MsIHRhc2tzIGNvbnRhaW4gc3VidGFza3NcclxuLy9mb3Igbm93LCB3ZSdsbCBmb2xsb3cgdGhhdCBoaWVyYWNoeVxyXG5cclxuY29uc3Qgc3RvcmFnZSA9ICgoKSA9PiB7XHJcbiAgICAvL3RoZSBkZWZhdWx0IHByb2plY3RzIHRoYXQgY2FuJ3QgYmUgcmVtb3ZlZFxyXG4gICAgY29uc3QgYWxsUHJvamVjdHMgPSBbXTtcclxuICAgIGxldCBjdXJyUHJvamVjdEluZGV4ID0gaW5kZXhDb3VudGVyKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChwcm9qZWN0KXtcclxuICAgICAgICBwcm9qZWN0LnNldEluZGV4KGN1cnJQcm9qZWN0SW5kZXguZ2V0SW5kZXgoKSk7XHJcbiAgICAgICAgY3VyclByb2plY3RJbmRleC5pbmNyZW1lbnRJbmRleCgpO1xyXG4gICAgICAgIGFsbFByb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0SW5kZXgpe1xyXG4gICAgICAgIGFsbFByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2plY3QuZ2V0SW5kZXgoKSA9PT0gcHJvamVjdEluZGV4KXtcclxuICAgICAgICAgICAgICAgIGFsbFByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7YWxsUHJvamVjdHMsIGFkZFByb2plY3QsIHJlbW92ZVByb2plY3R9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RvcmFnZTtcclxuXHJcbiIsImNvbnN0IHN1YnRhc2sgPSAoXHJcbiAgICBuYW1lLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBpbmRleCkgPT5cclxue1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldEluZGV4KG5ld0luZGV4KXtcclxuICAgICAgICBpbmRleCA9IG5ld0luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KCl7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldERlc2NyaXB0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXROYW1lKG5ld05hbWUpe1xyXG4gICAgICAgIG5hbWUgPSBuZXdOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldERlc2NyaXB0aW9uKG5ld0Rlc2NyaXB0aW9uKXtcclxuICAgICAgICBkZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7Z2V0SW5kZXgsIGdldE5hbWUsIGdldERlc2NyaXB0aW9uLCBzZXRJbmRleCwgc2V0TmFtZSwgc2V0RGVzY3JpcHRpb259O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdWJ0YXNrOyIsImltcG9ydCBpbmRleENvdW50ZXIgZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5cclxuY29uc3QgdGFzayA9IChcclxuICAgIG5hbWUsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGR1ZURhdGUsXHJcbiAgICBlc3RpbWF0ZWRDb21wbGV0aW9uVGltZSxcclxuICAgIHByaW9yaXR5LFxyXG4gICAgc3VidGFza3MgPSBbXSxcclxuICAgIGluZGV4KSA9PlxyXG57XHJcblxyXG4gICAgbGV0IGN1cnJTdWJ0YXNrSW5kZXggPSBpbmRleENvdW50ZXIoKTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gZ2V0TmFtZSgpe1xyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldERlc2NyaXB0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldER1ZURhdGUoKXtcclxuICAgICAgICByZXR1cm4gZHVlRGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRFc3RpbWF0ZWRUaW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIGVzdGltYXRlZENvbXBsZXRpb25UaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KCl7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFByaW9yaXR5KCl7XHJcbiAgICAgICAgcmV0dXJuIHByaW9yaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldE5hbWUobmV3TmFtZSl7XHJcbiAgICAgICAgbmFtZSA9IG5ld05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0RGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pe1xyXG4gICAgICAgIGRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UHJpb3JpdHkobmV3UHJpb3JpdHkpe1xyXG4gICAgICAgIHByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0RHVlRGF0ZShuZXdEdWVEYXRlKXtcclxuICAgICAgICBkdWVEYXRlID0gbmV3RHVlRGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRFc3RpbWF0ZWRUaW1lKG5ld0VzdFRpbWUpe1xyXG4gICAgICAgIGVzdGltYXRlZENvbXBsZXRpb25UaW1lID0gbmV3RXN0VGltZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRJbmRleCh0YXNrSW5kZXgpe1xyXG4gICAgICAgIGluZGV4ID0gdGFza0luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFN1YnRhc2tzKCl7XHJcbiAgICAgICAgcmV0dXJuIHN1YnRhc2tzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vbmVlZCB0byBzZXQgYSB1bmlxdWUgaW5kZXggZm9yIHN1YnRhc2sgYWZ0ZXIgaXQncyBjcmVhdGVkXHJcbiAgICBmdW5jdGlvbiBhZGRTdWJ0YXNrKHN1YnRhc2tPYmope1xyXG4gICAgICAgIHN1YnRhc2tPYmouc2V0SW5kZXgoY3VyclN1YnRhc2tJbmRleC5nZXRJbmRleCgpKTtcclxuICAgICAgICBzdWJ0YXNrcy5wdXNoKHN1YnRhc2tPYmopO1xyXG4gICAgICAgIGN1cnJTdWJ0YXNrSW5kZXguaW5jcmVtZW50SW5kZXgoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVTdWJ0YXNrKGluZGV4KXtcclxuICAgICAgICBzdWJ0YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVkaXRTdWJ0YXNrKHN1YnRhc2tPYmope1xyXG4gICAgICAgIHN1YnRhc2tzLmZvckVhY2goKHN1YnRhc2ssIGkpID0+IHtcclxuICAgICAgICAgICAgaWYoc3VidGFzay5pbmRleCA9PT0gaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgc3VidGFza3NbaV0gPSBzdWJ0YXNrT2JqO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2dldE5hbWUsIGdldERlc2NyaXB0aW9uLCBnZXREdWVEYXRlLCBnZXRFc3RpbWF0ZWRUaW1lLCBnZXRJbmRleCwgZ2V0UHJpb3JpdHksIGdldFN1YnRhc2tzLFxyXG4gICAgICAgICAgICBzZXROYW1lLCBzZXRQcmlvcml0eSwgc2V0RGVzY3JpcHRpb24sIHNldER1ZURhdGUsIHNldEVzdGltYXRlZFRpbWUsIHNldEluZGV4LCBhZGRTdWJ0YXNrLCByZW1vdmVTdWJ0YXNrfTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrOyIsIi8vY29udGFpbnMgYWxsIERPTSBNYW5pcHVsYXRpb24gdGhhdCdzIG5lZWRlZCBmb3IgdGFza3NcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlLmpzJztcclxuaW1wb3J0IHRhc2sgZnJvbSAnLi90YXNrLmpzJztcclxuaW1wb3J0IHN1YnRhc2sgZnJvbSAnLi9zdWJ0YXNrLmpzJztcclxuaW1wb3J0IHsgY3JlYXRlUG9wcGVyIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xyXG5pbXBvcnQgRGF0ZXBpY2tlciBmcm9tICd2YW5pbGxhanMtZGF0ZXBpY2tlci9EYXRlcGlja2VyJztcclxuaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0LmpzJztcclxuXHJcbi8vZWFjaCBkb20gZWxlbWVudCBoYXMgYSBkYXRhIGluZGV4IHRoYXQncyBhbHNvIGluIHRoZSBzdG9yYWdlXHJcbi8vdGhlc2UgJ2RhdGEtaW5kZXgnIGF0dHJpYnV0ZXMgYXJlIHVzZWQgdG8gcmVmZXJlbmNlIHRoZSBzdG9yYWdlIGFycmF5c1xyXG5cclxuLy8gSFRNTCBIRUxQRVIgRlVOQ1RJT05TXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcihlbGVtZW50LCBjbGFzc2VzLCBpZGVudGlmaWVyLCBjaGlsZEVsZW1lbnRzLCBjdXN0b21BdHRyaWJ1dGUpe1xyXG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICBpZihjbGFzc2VzKXtcclxuICAgICAgICBjbGFzc2VzLmZvckVhY2goaXRlbSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoaXRlbSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGlkZW50aWZpZXIpe1xyXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdpZCcsaWRlbnRpZmllcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoY2hpbGRFbGVtZW50cyl7XHJcbiAgICAgICAgY2hpbGRFbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT4gbm9kZS5hcHBlbmRDaGlsZChpdGVtKSlcclxuICAgIH1cclxuXHJcbiAgICBpZihjdXN0b21BdHRyaWJ1dGUpe1xyXG4gICAgICAgIGlmKGN1c3RvbUF0dHJpYnV0ZS5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoY3VzdG9tQXR0cmlidXRlWzBdLCBjdXN0b21BdHRyaWJ1dGVbMV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGFnKGVsZW1lbnQsIHRleHQsIGNsYXNzZXMsIGlkZW50aWZpZXIpe1xyXG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICBpZihjbGFzc2VzKXtcclxuICAgICAgICBjbGFzc2VzLmZvckVhY2goaXRlbSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoaXRlbSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGlkZW50aWZpZXIpe1xyXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdpZCcsaWRlbnRpZmllcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGV4dCl7XHJcbiAgICAgICAgbm9kZS5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUlucHV0KHR5cGUsIGNsYXNzZXMsIGlkZW50aWZpZXIsIHBsYWNlaG9sZGVyLCBpc1JlcXVpcmVkLCBpc0F1dG9Gb2N1cyl7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKTtcclxuICAgIGlmKGlkZW50aWZpZXIpe1xyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZGVudGlmaWVyKTtcclxuICAgIH1cclxuICAgIGlmKHBsYWNlaG9sZGVyKXtcclxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIpO1xyXG4gICAgfVxyXG4gICAgaWYoY2xhc3Nlcyl7XHJcbiAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKGl0ZW0gPT4gbm9kZS5jbGFzc0xpc3QuYWRkKGl0ZW0pKTtcclxuICAgIH1cclxuICAgIGlmKGlzUmVxdWlyZWQgPyBpbnB1dC5yZXF1aXJlZCA9IHRydWUgOiBpbnB1dC5yZXF1aXJlZCA9IGZhbHNlKTtcclxuICAgIGlmKGlzQXV0b0ZvY3VzID8gaW5wdXQuYXV0b2ZvY3VzID0gdHJ1ZSA6IGlucHV0LmF1dG9mb2N1cyA9IGZhbHNlKTtcclxuICAgIHJldHVybiBpbnB1dDtcclxufVxyXG5cclxuY29uc3Qgc2tpcCA9IChudW0pID0+IG5ldyBBcnJheShudW0pO1xyXG4vLyBFTkQgSFRNTCBIRUxQRVIgRlVOQ1RJT05TXHJcblxyXG5cclxuY29uc3QgdWkgPSAoKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gaW5pdGlhbFJlbmRlcigpe1xyXG4gICAgICAgIGFkZEhhbWJ1cmdlck1lbnVCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgYWRkSGFtYnVyZ2VyTmF2SXRlbXNGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgcmVuZGVySW5ib3goKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJJbmJveCgpe1xyXG4gICAgICAgIGNvbnN0IGJvZHlFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGNyZWF0ZURPTUNvbnRhaW5lcigpO1xyXG4gICAgICAgIGNvbnN0IGluYm94UHJvamVjdCA9IHN0b3JhZ2UuYWxsUHJvamVjdHMuZmlsdGVyKHByb2plY3QgPT4gcHJvamVjdC5nZXROYW1lKCkgPT09ICdJbmJveCcpWzBdO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGNyZWF0ZURPTVByb2plY3RIZWFkZXIoaW5ib3hQcm9qZWN0KTtcclxuICAgICAgICBjb25zdCBhZGRUYXNrRGl2ID0gY3JlYXRlRE9NQWRkVGFzaygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgICAgIHN0b3JhZ2UuYWxsUHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICAgICAgaWYocHJvamVjdC5nZXROYW1lKCkgPT09ICdJbmJveCcpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza3MgPSBwcm9qZWN0LmdldFRhc2tzKClcclxuICAgICAgICAgICAgICAgIGFkZEFsbFRhc2tzRE9NKGNvbnRhaW5lckRpdiwgdGFza3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoYWRkVGFza0Rpdik7XHJcbiAgICAgICAgYm9keUVsZW0uYXBwZW5kQ2hpbGQoY29udGFpbmVyRGl2KTsgIFxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEhhbWJ1cmdlck1lbnVCdG5GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgY29uc3QgaGFtYnVyZ2VyTWVudUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2JpbGUtcG9wLWljb24nKTtcclxuICAgICAgICBoYW1idXJnZXJNZW51QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoYW1idXJnZXItbWVudScpO1xyXG4gICAgICAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgICAgICAgICBpZihzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnaGlkZScpKXtcclxuICAgICAgICAgICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdvcGFxdWUtYmFja2dyb3VuZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ29wYXF1ZS1iYWNrZ3JvdW5kJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEhhbWJ1cmdlck5hdkl0ZW1zRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgIGFkZERlZmF1bHRIYW1idXJnZXJOYXZJdGVtc0Z1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICBhZGRQcm9qZWN0RnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYWRzIGRlZmF1bHQgbmF2IGZ1bmN0aW9uYWxpdGllcyBmb3IgaW5ib3gsIHRvZGF5LCBhbmQgdGhpcyB3ZWVrXHJcbiAgICBmdW5jdGlvbiBhZGREZWZhdWx0SGFtYnVyZ2VyTmF2SXRlbXNGdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgY29uc3QgaW5ib3hOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhW2RhdGEtcHJvamVjdC1pbmRleD1cIjBcIl0nKTtcclxuLyogICAgICAgICBjb25zdCB0b2RheU5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FbZGF0YS1wcm9qZWN0LWluZGV4PVwiMVwiXScpO1xyXG4gICAgICAgIGNvbnN0IHRoaXNXZWVrTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtkYXRhLXByb2plY3QtaW5kZXg9XCIyXCJdJyk7ICovXHJcbiAgICAgICAgXHJcbiAgICAgICAgaW5ib3hOYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmVuZGVySW5ib3goKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlcyBuZXcgcHJvamVjdHMgZnJvbSBjbGlja2luZyBvbiB0aGUgc2lkZWJhciBhbmQgdHlwaW5nIGluIGEgcHJvamVjdCBuYW1lXHJcbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0RnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgIGNvbnN0IGFkZFByb2plY3ROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xyXG4gICAgICAgIGFkZFByb2plY3ROb2RlRnVuY3Rpb25hbGl0eShhZGRQcm9qZWN0Tm9kZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUFkZFByb2plY3RUZXh0KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFByb2plY3RMaW5rID0gY3JlYXRlVGFnKCdhJywnKyBBZGQgUHJvamVjdHMnLCAuLi5za2lwKDMpKVxyXG4gICAgICAgICAgICBjb25zdCBhZGRQcm9qZWN0QnRuID0gY3JlYXRlQ29udGFpbmVyKCdsaScsIHNraXAoMSksICdhZGQtcHJvamVjdC1idXR0b24nLCBbYWRkUHJvamVjdExpbmtdLCBza2lwKDEpKTtcclxuICAgICAgICAgICAgYWRkUHJvamVjdE5vZGVGdW5jdGlvbmFsaXR5KGFkZFByb2plY3RCdG4pO1xyXG4gICAgICAgICAgICByZXR1cm4gYWRkUHJvamVjdEJ0bjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFByb2plY3ROb2RlRnVuY3Rpb25hbGl0eShhZGRQcm9qZWN0Tm9kZSl7XHJcbiAgICAgICAgICAgIGFkZFByb2plY3ROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGFkZFByb2plY3ROb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNyZWF0ZUFkZFByb2plY3RGb3JtKCksIGFkZFByb2plY3ROb2RlKTtcclxuICAgICAgICAgICAgICAgIGFkZFByb2plY3ROb2RlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQWRkUHJvamVjdEZvcm0oKXtcclxuICAgICAgICAgICAgY29uc3QgYWRkUHJvamVjdElucHV0ID0gY3JlYXRlSW5wdXQoJ3RleHQnLCBza2lwKDEpLCAnYWRkLXByb2plY3QtbmFtZScsIHNraXAoMSksIHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICBjb25zdCBjb25maXJtSWNvbiA9IGNyZWF0ZVRhZygnaScsc2tpcCgxKSxbJ2ZhLXNvbGlkJywnZmEtc2hhcnAnLCdmYS1jaGVjayddLCBza2lwKDEpKTtcclxuICAgICAgICAgICAgY29uc3QgY2FuY2VsSWNvbiA9IGNyZWF0ZVRhZygnaScsc2tpcCgxKSxbJ2ZhLXNvbGlkJywnZmEtc2hhcnAnLCdmYS14J10sIHNraXAoMSkpO1xyXG4gICAgICAgICAgICBjb25zdCBjb25maXJtRGl2ID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBza2lwKDEpLCAnY29uZmlybS1hZGQtcHJvamVjdCcsIFtjb25maXJtSWNvbl0sIHNraXAoMSkpO1xyXG4gICAgICAgICAgICBjb25zdCBjYW5jZWxEaXYgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIHNraXAoMSksICdjYW5jZWwtYWRkLXByb2plY3QnLCBbY2FuY2VsSWNvbl0sIHNraXAoMSkpOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBjcmVhdGVDb250YWluZXIoJ2Zvcm0nLCBza2lwKDEpLCAnYWRkLXByb2plY3QtZm9ybScsIFthZGRQcm9qZWN0SW5wdXQsIGNvbmZpcm1EaXYsIGNhbmNlbERpdl0sIHNraXAoMSkpO1xyXG5cclxuICAgICAgICAgICAgYWRkQ2FuY2VsQnRuRm9ybUZ1bmN0aW9uYWxpdHkoY2FuY2VsRGl2KTtcclxuICAgICAgICAgICAgYWRkQ29uZmlybUJ0bkZvcm1GdW5jdGlvbmFsaXR5KGZvcm0sIGNvbmZpcm1EaXYsIGFkZFByb2plY3RJbnB1dCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENhbmNlbEJ0bkZvcm1GdW5jdGlvbmFsaXR5KGNhbmNlbERpdil7XHJcbiAgICAgICAgICAgIGNhbmNlbERpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvamVjdC1mb3JtJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRQcm9qZWN0VGV4dCA9IGNyZWF0ZUFkZFByb2plY3RUZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGFkZFByb2plY3RUZXh0LCBmb3JtKTtcclxuICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRDb25maXJtQnRuRm9ybUZ1bmN0aW9uYWxpdHkoZm9ybSwgY29uZmlybURpdiwgcHJvamVjdE5hbWVJbnB1dCl7XHJcbiAgICAgICAgICAgIGNvbmZpcm1EaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVOZXdQcm9qZWN0KVxyXG4gICAgICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICBpZihldmVudC5rZXkgPT09ICdFbnRlcicpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU5ld1Byb2plY3QoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZU5ld1Byb2plY3QoKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1wcm9qZWN0LWZvcm0nKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3ROYW1lSW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvamVjdE5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3QocHJvamVjdE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yYWdlLmFkZFByb2plY3QobmV3UHJvamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaW5rID0gY3JlYXRlUHJvamVjdE5vZGUobmV3UHJvamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZFByb2plY3RUZXh0ID0gY3JlYXRlQWRkUHJvamVjdFRleHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwcm9qZWN0TGluaywgZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYWRkUHJvamVjdFRleHQsIGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZWxlbWVudCB0aGF0IGNvbnRhaW5zIHByb2plY3QgbmFtZSwgaWYgY2xpY2tlZCBvbiB0aGVuIGNsZWFyIGFsbCB0YXNrcyBhbmQgbG9hZCB0aGUgcmVsZXZhbnQgdGFza3NcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0Tm9kZShwcm9qZWN0T2JqZWN0KXtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgIHByb2plY3RMaW5rLmlubmVyVGV4dCA9IHByb2plY3RPYmplY3QuZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcsIHByb2plY3RPYmplY3QuZ2V0SW5kZXgoKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TGlua0NvbnRhaW5lciA9IGNyZWF0ZUNvbnRhaW5lcignbGknLCBza2lwKDEpLCBza2lwKDEpLCBbcHJvamVjdExpbmtdLCBza2lwKDEpKTtcclxuICAgICAgICAgICAgcHJvamVjdExpbmtDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdExpbmspO1xyXG4gICAgICAgICAgICBhZGRQcm9qZWN0TGlua0V2ZW50TGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZFByb2plY3RMaW5rRXZlbnRMaXN0ZW5lcigpe1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdExpbmtDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRQcm9qZWN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJBbGxUYXNrc0RPTSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVET01Qcm9qZWN0SGVhZGVyKHByb2plY3RPYmplY3QpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdEluZGV4QXJyYXkgPSBzdG9yYWdlTG9va3Vwcy5nZXRQcm9qZWN0SW5kZXgoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxldmFudFRhc2tzID0gc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0SW5kZXhBcnJheV0uZ2V0VGFza3MoKTtcclxuICAgICAgICAgICAgICAgICAgICBhZGRBbGxUYXNrc0RPTShjb250YWluZXIsIHJlbGV2YW50VGFza3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVET01BZGRUYXNrKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByb2plY3RMaW5rQ29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2VudGlyZSBjb250YWluZXIgdGhhdCBob2xkcyBhbGwgdGhlIHRhc2tzLCB1bmlxdWUgaWQgaXMgY29udGFpbmVyXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVET01Db250YWluZXIoKXtcclxuICAgICAgICByZXR1cm4gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBza2lwKDEpLCAnY29udGFpbmVyJywgLi4uc2tpcCgyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy90aGUgdGV4dCB0aGF0IGNvbnRhaW5zIHRoZSBwcm9qZWN0IG5hbWVcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZURPTVByb2plY3RIZWFkZXIocHJvamVjdCl7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gY3JlYXRlVGFnKCdoMScsIHByb2plY3QuZ2V0TmFtZSgpLCBbJ2hlYWRlci10eXBlJ10sIHNraXAoMSkpO1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVDb250YWluZXIoJ2RpdicsIHNraXAoMSksICdwcm9qZWN0LWhlYWRlcicsIFtoZWFkZXJdLCBbJ2RhdGEtcHJvamVjdC1pbmRleCcsIHByb2plY3QuZ2V0SW5kZXgoKV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlcyB0aGUgZGl2IHRoYXQgd2hlbiBjbGlja2VkLCB0aGUgYWRkIG5ldyB0YXNrIGZvcm0gYXBwZWFyc1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlRE9NQWRkVGFzaygpe1xyXG4gICAgICAgIGNvbnN0IHBsdXNJY29uID0gY3JlYXRlVGFnKCdpJywgc2tpcCgxKSwgWydmYScsJ2ZhLXBsdXMnLCAncG9pbnRlciddLCBza2lwKDEpKTtcclxuICAgICAgICBjb25zdCBhZGRUYXNrVGV4dCA9IGNyZWF0ZVRhZygnZGl2JywgJ0FkZCBUYXNrJywgWydhZGQtdGFzay10ZXh0J10sIHNraXAoMSkpO1xyXG4gICAgICAgIGNvbnN0IGFkZFRhc2tEaXYgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIFsncG9pbnRlciddLCAnYWRkLXRhc2stY2xpY2thYmxlLWRpdicsIFtwbHVzSWNvbiwgYWRkVGFza1RleHRdLCBza2lwKDEpKTtcclxuICAgICAgICBhZGRUYXNrRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoaGFzRm9ybSgpKXtcclxuICAgICAgICAgICAgICAgIHJldmVydEZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhc2tGb3JtID0gY3JlYXRlRE9NVGFza0Zvcm0oJ2FkZCcpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkVGFza0Zvcm0pO1xyXG4gICAgICAgICAgICBhZGRUYXNrRGl2LnJlbW92ZSgpO1xyXG4gICAgICAgIH0sIHtvbmNlOiB0cnVlfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGFkZFRhc2tEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgLy9zdHlsaXN0aWMgZGVjaXNpb24gdG8gb25seSBoYXZlIG9uZSBmb3JtIGRpc3BsYXkgYXQgYSB0aW1lIGluIHRvIGRvIGxpc3RcclxuICAgIC8vaGVscGVyIGZ1bmN0aW9ucyBmb3IgZm9ybXNcclxuICAgIGZ1bmN0aW9uIGhhc0Zvcm0oKXtcclxuICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJykpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcmVtb3ZlcyB0aGUgZXhpc3RpbmcgZm9ybSBhbmQgZm9yIGVkaXQgZm9ybXMsIHJlbW92ZSB0aGUgaW52aXNpYmxlIGlkIGZyb20gdGFzay9zdWJ0YXNrXHJcbiAgICBmdW5jdGlvbiByZXZlcnRGb3JtKCl7XHJcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWZvcm0nKTtcclxuICAgICAgICBjb25zdCBpbnZpc2libGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludmlzaWJsZScpO1xyXG4gICAgICAgIGNvbnN0IGFkZFRhc2tEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stY2xpY2thYmxlLWRpdicpO1xyXG4gICAgICAgIGlmKGludmlzaWJsZUVsZW1lbnQpe1xyXG4gICAgICAgICAgICBpbnZpc2libGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIWFkZFRhc2tEaXYpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVET01BZGRUYXNrKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3JtLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlcyB0aGUgZm9ybSB0aGF0IHdoZW4gc3VibWl0dGVkLCBhZGRzIGEgbmV3IHRhc2sgdG8gdGhlIGRvbVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRE9NVGFza0Zvcm0odHlwZSl7XHJcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gY3JlYXRlSW5wdXQoJ3RleHQnLCBza2lwKDEpLCAnbmFtZScsICdOYW1lJywgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGNyZWF0ZUlucHV0KCd0ZXh0Jywgc2tpcCgxKSwgJ2Rlc2NyaXB0aW9uJywgJ0Rlc2NyaXB0aW9uJywgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBwcmlvcml0eURpdiA9IGdldFBvcG92ZXJJY29ucygncHJpb3JpdHktYnRuJywgJ2ZhLWZsYWcnLCAnUHJpb3JpdHknKTtcclxuICAgICAgICBjb25zdCBkdWVEYXRlRGl2ID0gZ2V0UG9wb3Zlckljb25zKCdkdWUtZGF0ZS1idG4nLCAnZmEtY2FsZW5kYXInLCdEdWUgRGF0ZScpO1xyXG4gICAgICAgIGNvbnN0IGVzdGltYXRlZFRpbWVEaXYgPSBnZXRQb3BvdmVySWNvbnMoJ2VzdC1jb21wbGV0aW9uLXRpbWUtYnRuJywgJ2ZhLWNsb2NrJywgJ0VzdCBUaW1lJyk7ICAgICAgICBcclxuICAgICAgICBjb25zdCBwb3BvdmVyQ29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBbJ3BvcG92ZXItaWNvbnMtZGl2J10sIHNraXAoMSksIFtwcmlvcml0eURpdiwgZHVlRGF0ZURpdiwgZXN0aW1hdGVkVGltZURpdl0sIHNraXAoMSkpO1xyXG4gXHJcbiAgICAgICAgYWRkUHJpb3JpdHlQb3BvdmVyRXZlbnRMaXN0ZW5lcihwcmlvcml0eURpdiwgcG9wb3ZlckNvbnRhaW5lcik7XHJcbiAgICAgICAgYWRkRHVlRGF0ZVBvcG92ZXJFdmVudExpc3RlbmVyKGR1ZURhdGVEaXYsIHBvcG92ZXJDb250YWluZXIpO1xyXG5cclxuICAgICAgICAvL2J1dHRvbnMgZm9yIGZvcm0gYWN0aW9uc1xyXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGNyZWF0ZVRhZygnYnV0dG9uJywnQ2FuY2VsJywgc2tpcCgxKSwgJ2NhbmNlbC10YXNrLWZvcm0nKTtcclxuICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBjcmVhdGVUYWcoJ2J1dHRvbicsJ0NvbmZpcm0nLCBza2lwKDEpLCAnc3VibWl0LXRhc2stZm9ybScpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1BY3Rpb25CdG5zQ29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBza2lwKDEpLCAnZm9ybS1hY3Rpb25zLWRpdicsIFtjYW5jZWxCdG4sIHN1Ym1pdEJ0bl0pO1xyXG5cclxuICAgICAgICBjb25zdCBmb3JtID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBza2lwKDEpLCAndGFzay1mb3JtJywgW25hbWVJbnB1dCwgZGVzY3JpcHRpb25JbnB1dCwgcG9wb3ZlckNvbnRhaW5lciwgZm9ybUFjdGlvbkJ0bnNDb250YWluZXJdLCBza2lwKDEpKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2FkZCBhbGwgYnV0dG9uIGZ1bmN0aW9uYWxpdGllc1xyXG4gICAgICAgIGlmKHR5cGUgPT09ICdhZGQnKXtcclxuICAgICAgICAgICAgYWRkQ2FuY2VsQWRkVGFza0J0bkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICAgICAgYWRkU3VibWl0QWRkVGFza0J0bkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0eXBlID09PSAnZWRpdCcpe1xyXG4gICAgICAgICAgICBhZGRDYW5jZWxFZGl0VGFza0J0bkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICAgICAgYWRkU3VibWl0RWRpdFRhc2tGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcblxyXG4gICAgICAgIC8vZm9yIHByaW9yaXR5LCBkdWUgZGF0ZSwgYW5kIGVzdGltYXRlZCB0aW1lIHBvcG92ZXJzXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0UG9wb3Zlckljb25zKGRpdklkLCBpY29uQ2xhc3MsIHRleHQpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLGRpdklkKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stZm9ybS1pY29ucycpO1xyXG4gICAgICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBjb25zdCBpY29uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgJyArIHRleHQpO1xyXG4gICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXJlZ3VsYXInLGljb25DbGFzcyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpY29uKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGljb25UZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vd2hlbiBjbGlja2luZyBwcmlvcml0eSBvcHRpb25zIGRpdlxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFByaW9yaXR5UG9wb3ZlckV2ZW50TGlzdGVuZXIocHJpb3JpdHlEaXYsIHBhcmVudERpdil7XHJcbiAgICAgICAgICAgIHByaW9yaXR5RGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKGlzQWN0aXZlKHByaW9yaXR5RGl2KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlUG9wb3ZlcnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5MSA9IGdldFByaW9yaXR5T3B0aW9uKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5MiA9IGdldFByaW9yaXR5T3B0aW9uKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5MyA9IGdldFByaW9yaXR5T3B0aW9uKDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5Q29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLFsncG9wb3Zlci1jb250YWluZXInLCdhY3RpdmUtcG9wb3ZlciddLCAncHJpb3JpdHktb3B0aW9ucycsIFtwcmlvcml0eTEsIHByaW9yaXR5MiwgcHJpb3JpdHkzXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlUG9wcGVyKHByaW9yaXR5RGl2LCBwcmlvcml0eUNvbnRhaW5lciwge3BsYWNlbWVudDogJ2JvdHRvbSd9KTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlDb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG9nZ2xlQWN0aXZlKHByaW9yaXR5RGl2KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFByaW9yaXR5T3B0aW9uKHByaW9yaXR5TnVtYmVyKXtcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlPcHRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1mbGFnJywnaWNvbicpO1xyXG4gICAgICAgICAgICBzd2l0Y2gocHJpb3JpdHlOdW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uLXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uLXllbGxvdycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uLWdyZWVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaWNvblRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnIFByaW9yaXR5Jyk7XHJcbiAgICAgICAgICAgIHByaW9yaXR5T3B0aW9uRGl2LmFwcGVuZENoaWxkKHByaW9yaXR5SWNvbik7XHJcbiAgICAgICAgICAgIHByaW9yaXR5T3B0aW9uRGl2LmFwcGVuZENoaWxkKGljb25UZXh0KTtcclxuICAgICAgICAgICAgcHJpb3JpdHlPcHRpb25EaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZVByaW9yaXR5SWNvbihwcmlvcml0eUljb24pO1xyXG4gICAgICAgICAgICAgICAgYWRkUHJpb3JpdHlEYXRhQXR0cmlidXRlKHByaW9yaXR5TnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZVBvcG92ZXJzKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBwcmlvcml0eU9wdGlvbkRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVByaW9yaXR5SWNvbihuZXdQcmlvcml0eUljb24pe1xyXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eS1idG4nKTtcclxuICAgICAgICAgICAgY29uc3Qgb2xkUHJpb3JpdHlJY29uID0gcHJpb3JpdHlCdG4ucXVlcnlTZWxlY3RvcignaScpO1xyXG4gICAgICAgICAgICBvbGRQcmlvcml0eUljb24ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3UHJpb3JpdHlJY29uLCBvbGRQcmlvcml0eUljb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkUHJpb3JpdHlEYXRhQXR0cmlidXRlKHByaW9yaXR5TnVtYmVyKXtcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlPcHRpb25zRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5LWJ0bicpO1xyXG4gICAgICAgICAgICBwcmlvcml0eU9wdGlvbnNEaXYuc2V0QXR0cmlidXRlKCdkYXRhLXByaW9yaXR5LW51bWJlcicsIHByaW9yaXR5TnVtYmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZER1ZURhdGVQb3BvdmVyRXZlbnRMaXN0ZW5lcihkdWVEYXRlRGl2LCBwYXJlbnREaXYpe1xyXG4gICAgICAgICAgICBkdWVEYXRlRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZVBvcG92ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuSGVscGVyID0gY3JlYXRlVGFnKCdzcGFuJywgc2tpcCgxKSwgWydhY3RpdmUtcG9wb3ZlciddLCBza2lwKDEpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSBuZXcgRGF0ZXBpY2tlcihzcGFuSGVscGVyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6IChpbnN0YW5jZSwgZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmVQb3BvdmVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBzdHVmZiB3aGVuIGEgZGF0ZSBpcyBzZWxlY3RlZCAob3IgdW5zZWxlY3RlZCkgb24gdGhlIGNhbGVuZGFyLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBZb3UgaGF2ZSBhY2Nlc3MgdG8gdGhlIGRhdGVwaWNrZXIgaW5zdGFuY2UgZm9yIGNvbnZlbmllbmNlLlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoKVxyXG4gICAgICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUG9wcGVyKGR1ZURhdGVEaXYsIHNwYW5IZWxwZXIsIHtwbGFjZW1lbnQ6ICdib3R0b20nfSk7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQoc3BhbkhlbHBlcik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NoZWNrcyBpZiBlbGVtZW50IGhhcyBhY3RpdmUtcG9wb3ZlciBjbGFzc1xyXG4gICAgICAgIGZ1bmN0aW9uIGlzQWN0aXZlKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICBpZihlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlQWN0aXZlKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICBpZihlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaWYgdGhlcmUncyBhbnkgYWN0aXZlIHBvcG92ZXJzLCByZW1vdmUgdGhlIHBvcG92ZXJcclxuICAgICAgICAvL2RldGVybWluZWQgYnkgY2xhc3MgbmFtZSAnYWN0aXZlLXBvcG92ZXInXHJcbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlQWN0aXZlUG9wb3ZlcnMoKXtcclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlUG9wb3ZlcnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FjdGl2ZS1wb3BvdmVyJykpO1xyXG4gICAgICAgICAgICBpZihhY3RpdmVQb3BvdmVycy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZVBvcG92ZXJzLmZvckVhY2gocG9wb3ZlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb3BvdmVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlcyB0aGUgZm9ybSBhbmQgYWRkcyB0aGUgYWRkIHRhc2sgdGV4dCBiYWNrXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkQ2FuY2VsQWRkVGFza0J0bkZ1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRE9NQWRkVGFzaygpKTtcclxuICAgICAgICAgICAgfSwge29uY2U6dHJ1ZX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZW1vdmVzIHRoZSBmb3JtIGFuZCBhZGRzIHRoZSB0YXNrIGRvbVxyXG4gICAgICAgIC8vbmVlZCB0byBhZGQgZXJyb3IgbWVzc2FnZSBvZiBzb21lIHNvcnQgd2hlbiB0aGVyZSdzIG5vIHRleHQgaW4gdGhlIG5hbWUgZmllbGRcclxuICAgICAgICBmdW5jdGlvbiBhZGRTdWJtaXRBZGRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5TnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5LWJ0bicpLmdldEF0dHJpYnV0ZSgnZGF0YS1wcmlvcml0eS1udW1iZXInKTtcclxuICAgICAgICAgICAgICAgIGlmKG5hbWVGaWVsZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvamVjdEluZGV4SW5BcnJheSA9IHN0b3JhZ2VMb29rdXBzLmdldFByb2plY3RJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdUYXNrID0gdGFzayhuYW1lRmllbGQsIGRlc2NyaXB0aW9uRmllbGQsICcnLCAnJywgcHJpb3JpdHlOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1Rhc2sgPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RJbmRleEluQXJyYXldLmFkZFRhc2sobmV3VGFzayk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdUYXNrRE9NID0gY3JlYXRlRE9NVGFzayhuZXdUYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRUYXNrRWxlbSA9IGNyZWF0ZURPTUFkZFRhc2soKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdUYXNrRE9NKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkVGFza0VsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9KSAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENhbmNlbEVkaXRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgICAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW52aXNpYmxlVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIGludmlzaWJsZVRhc2sucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFN1Ym1pdEVkaXRUYXNrRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eU51bWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eS1idG4nKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpb3JpdHktbnVtYmVyJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZpc2libGVUYXNrRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihuYW1lRmllbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUYXNrRGF0YUluZGV4ID0gaW52aXNpYmxlVGFza0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXhJbkFycmF5ID0gc3RvcmFnZUxvb2t1cHMuZ2V0UHJvamVjdEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFza0luZGV4SW5BcnJheSA9IHN0b3JhZ2VMb29rdXBzLmdldFRhc2tJbmRleChwcm9qZWN0SW5kZXhJbkFycmF5LCBjdXJyZW50VGFza0RhdGFJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFRhc2sgPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RJbmRleEluQXJyYXldLmdldFRhc2tzKClbdGFza0luZGV4SW5BcnJheV07XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhc2suc2V0TmFtZShuYW1lRmllbGQpXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhc2suc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb25GaWVsZClcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFzay5zZXRQcmlvcml0eShwcmlvcml0eU51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza0RPTSA9IGNyZWF0ZURPTVRhc2soY3VycmVudFRhc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIGludmlzaWJsZVRhc2tFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1Rhc2tET00sIGludmlzaWJsZVRhc2tFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpbnZpc2libGVUYXNrRWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRE9NU3VidGFza0Zvcm0odHlwZSl7XHJcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gY3JlYXRlSW5wdXQoJ3RleHQnLCBza2lwKDEpLCAnbmFtZScsICdOYW1lJywgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGNyZWF0ZUlucHV0KCd0ZXh0Jywgc2tpcCgxKSwgJ2Rlc2NyaXB0aW9uJywgJ0Rlc2NyaXB0aW9uJywgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAvL2J1dHRvbnMgZm9yIGZvcm0gYWN0aW9uc1xyXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGNyZWF0ZVRhZygnYnV0dG9uJywnQ2FuY2VsJywgc2tpcCgxKSwgJ2NhbmNlbC10YXNrLWZvcm0nKTtcclxuICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBjcmVhdGVUYWcoJ2J1dHRvbicsJ0NvbmZpcm0nLCBza2lwKDEpLCAnc3VibWl0LXRhc2stZm9ybScpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1BY3Rpb25CdG5zQ29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBza2lwKDEpLCAnZm9ybS1hY3Rpb25zLWRpdicsIFtjYW5jZWxCdG4sIHN1Ym1pdEJ0bl0pO1xyXG5cclxuICAgICAgICBjb25zdCBmb3JtID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBza2lwKDEpLCAndGFzay1mb3JtJywgW25hbWVJbnB1dCwgZGVzY3JpcHRpb25JbnB1dCwgZm9ybUFjdGlvbkJ0bnNDb250YWluZXJdLCBza2lwKDEpKTtcclxuXHJcbiAgICAgICAgaWYodHlwZSA9PT0gJ2FkZCcpe1xyXG4gICAgICAgICAgICBhZGRDYW5jZWxBZGRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgICAgICBhZGRTdWJtaXRBZGRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGUgPT09ICdlZGl0Jyl7XHJcbiAgICAgICAgICAgIGFkZENhbmNlbEVkaXRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgICAgICBhZGRTdWJtaXRFZGl0VGFza0Z1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENhbmNlbEFkZFRhc2tCdG5GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3VibWl0QWRkVGFza0J0bkZ1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZihuYW1lRmllbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdTdWJ0YXNrID0gc3VidGFzayhuYW1lRmllbGQsIGRlc2NyaXB0aW9uRmllbGQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0QXJyYXlJbmRleCA9IHN0b3JhZ2VMb29rdXBzLmdldFByb2plY3RJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFUYXNrSW5kZXggPSBmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRUYXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIGRhdGFUYXNrSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUYXNrSW5TdG9yYWdlID0gc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0QXJyYXlJbmRleF0uZ2V0VGFza3MoKVt0YXNrQXJyYXlJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhc2tJblN0b3JhZ2UuYWRkU3VidGFzayhuZXdTdWJ0YXNrKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0RPTSA9IGNyZWF0ZURPTVN1YnRhc2sobmV3U3VidGFzaywgZGF0YVRhc2tJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzdWJ0YXNrRE9NLCBmb3JtKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkQ2FuY2VsRWRpdFRhc2tCdG5GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZpc2libGVUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgaW52aXNpYmxlVGFzay5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3VibWl0RWRpdFRhc2tGdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZpc2libGVUYXNrRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tEYXRhSW5kZXggPSBmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRGF0YUluZGV4ID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1pbmRleCcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0QXJyYXlJbmRleCA9IHN0b3JhZ2VMb29rdXBzLmdldFByb2plY3RJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRUYXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIHRhc2tEYXRhSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRTdWJ0YXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIHRhc2tBcnJheUluZGV4LCBzdWJ0YXNrRGF0YUluZGV4KVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFN1YnRhc2sgPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RBcnJheUluZGV4XS5nZXRUYXNrcygpW3Rhc2tBcnJheUluZGV4XS5nZXRTdWJ0YXNrcygpW3N1YnRhc2tBcnJheUluZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb25GaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYobmFtZUZpZWxkKXtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3VidGFzay5zZXROYW1lKG5hbWVGaWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGVzY3JpcHRpb25GaWVsZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJ0YXNrLnNldERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uRmllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdTdWJ0YXNrRE9NID0gY3JlYXRlRE9NU3VidGFzayhjdXJyZW50U3VidGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW52aXNpYmxlVGFza0VsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3VidGFza0RPTSwgaW52aXNpYmxlVGFza0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludmlzaWJsZVRhc2tFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlcyB0aGUgdGFzayBkb21cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZURPTVRhc2sodGFza09iail7XHJcbiAgICAgICAgY29uc3QgY29tcGxldGVUYXNrSWNvbiA9IGNyZWF0ZVRhZygnaScsc2tpcCgxKSwgWydmYS1yZWd1bGFyJywnZmEtY2lyY2xlJywgJ3BvaW50ZXInXSk7XHJcbiAgICAgICAgY29uc3QgY29tcGxldGVUYXNrRGl2ID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBbJ2NvbXBsZXRlLXRhc2stYnRuJ10sIHNraXAoMSksIFtjb21wbGV0ZVRhc2tJY29uXSwgc2tpcCgxKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhc2tJbmZvcm1hdGlvbkRpdiA9IGNyZWF0ZVRhZygnZGl2JywgdGFza09iai5nZXROYW1lKCksIFsndGFzay10aXRsZSddLCBza2lwKDEpKTtcclxuXHJcbiAgICAgICAgY29uc3QgYWRkU3VidGFza0ljb24gPSBjcmVhdGVUYWcoJ2knLCBza2lwKDEpLCBbJ2ZhLXNvbGlkJywnZmEtc3F1YXJlLXBsdXMnLCAncG9pbnRlciddLCBza2lwKDEpKTtcclxuICAgICAgICBjb25zdCBlZGl0SWNvbiA9IGNyZWF0ZVRhZygnaScsIHNraXAoMSksIFsnZmEtc29saWQnLCdmYS1wZW4tdG8tc3F1YXJlJywgJ3BvaW50ZXInXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGNyZWF0ZVRhZygnaScsIHNraXAoMSksIFsnZmEtc29saWQnLCdmYS10cmFzaCcsICdwb2ludGVyJ10sIHNraXAoMSkpOyAgICAgIFxyXG4gICAgICAgIGNvbnN0IGljb25Db250YWluZXIgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIFsnYnV0dG9uLWljb25zJ10sIHNraXAoMSksIFthZGRTdWJ0YXNrSWNvbiwgZWRpdEljb24sIGRlbGV0ZUljb25dLCBza2lwKDEpKTtcclxuXHJcbiAgICAgICAgaWYodGFza09iai5nZXRFc3RpbWF0ZWRUaW1lKCkpe1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrRXN0aW1hdGVkVGltZSA9IGNyZWF0ZVRhZygnZGl2JyxgRXN0IFRpbWU6ICR7dGFza09iai5nZXRFc3RpbWF0ZWRUaW1lKCl9YCwgWyd0YXNrLWVzdGltYXRlZC10aW1lJ10sIHNraXAoMSkpO1xyXG4gICAgICAgICAgICB0YXNrSW5mb3JtYXRpb25EaXYuYXBwZW5kQ2hpbGQodGFza0VzdGltYXRlZFRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0YXNrT2JqLmdldERlc2NyaXB0aW9uKCkpe1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBjcmVhdGVUYWcoJ2RpdicsdGFza09iai5nZXREZXNjcmlwdGlvbigpLCBbJ3Rhc2stZGVzY3JpcHRpb24nXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgICAgIHRhc2tJbmZvcm1hdGlvbkRpdi5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGFza0RPTSA9IGNyZWF0ZUNvbnRhaW5lcignZGl2JywgWyd0YXNrJ10sICcnLCBbY29tcGxldGVUYXNrRGl2LCB0YXNrSW5mb3JtYXRpb25EaXYsIGljb25Db250YWluZXJdLCBbJ2RhdGEtdGFzay1pbmRleCcsIHRhc2tPYmouZ2V0SW5kZXgoKV0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGFkZFByaW9yaXR5Q29sb3IoY29tcGxldGVUYXNrSWNvbiwgdGFza09iai5nZXRQcmlvcml0eSgpKTtcclxuICAgICAgICBhZGRDb21wbGV0ZVRhc2tJY29uRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIGFkZERlbGV0ZUljb25GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgYWRkRWRpdEljb25GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgYWRkU3VidGFza0ljb25GdW5jdGlvbmFsaXR5KCk7XHJcblxyXG4gICAgICAgIC8vY2hhbmdlIHRoZSBidWxsZXQgcG9pbnQgY29sb3JcclxuICAgICAgICBmdW5jdGlvbiBhZGRQcmlvcml0eUNvbG9yKGljb24sIHByaW9yaXR5TnVtYmVyKXtcclxuICAgICAgICAgICAgc3dpdGNoKHByaW9yaXR5TnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgJzEnOlxyXG4gICAgICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnaWNvbi1yZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzInOlxyXG4gICAgICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnaWNvbi15ZWxsb3cnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJzMnOlxyXG4gICAgICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnaWNvbi1ncmVlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbWFrZVNvbGlkSWNvbihpY29uKXtcclxuICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYS1yZWd1bGFyJyk7XHJcbiAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdpY29uJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3VzZWZ1bCBoZWxwZXIgZnVuY3Rpb25zIGZvciBpY29uIG9wZXJhdGlvbnNcclxuICAgICAgICBmdW5jdGlvbiBnZXRUYXNrRnJvbUNoaWxkTm9kZShub2RlKXtcclxuICAgICAgICAgICAgaWYoIW5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrJykpe1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSghbm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygndGFzaycpKXtcclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RvcmFnZVByb2plY3RJbmRleCgpe1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1oZWFkZXInKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpO1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0QXJyYXlJbmRleCA9IHN0b3JhZ2UuYWxsUHJvamVjdHMuZmluZEluZGV4KHByb2plY3QgPT4gcHJvamVjdC5nZXRJbmRleCgpID09IHByb2plY3RJbmRleCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0QXJyYXlJbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFN0b3JhZ2VUYXNrSW5kZXgocHJvamVjdEluZGV4LCB0YXNrRWxlbWVudCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IHRhc2tFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tBcnJheUluZGV4ID0gc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0SW5kZXhdLmdldFRhc2tzKCkuZmluZEluZGV4KHRhc2sgPT4gdGFzay5nZXRJbmRleCgpID09IHRhc2tJbmRleCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXNrQXJyYXlJbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZW5kIHVzZWZ1bCBoZWxwZXIgZnVuY3Rpb25zIGZvciBpY29uIG9wZXJhdGlvbnNcclxuXHJcbiAgICAgICAgLy9mb3IgY29tcGxldGluZyBhIHRhc2sgYW5kIGRlbGV0aW5nIGEgdGFza1xyXG4gICAgICAgIC8vY29tcGxldGUgYW5kIGRlbGV0ZSB0YXNrIGFyZSB0aGUgc2FtZSBmdW5jdGlvbmFsaXR5IGZvciBub3dcclxuICAgICAgICBmdW5jdGlvbiBhZGRDb21wbGV0ZVRhc2tJY29uRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVSZWxldmFudFRhc2tzQW5kU3VidGFza3NET00oKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZVRhc2tGcm9tU3RvcmFnZSgpO1xyXG4gICAgICAgICAgICAgICAgdGFza0RPTS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkRGVsZXRlSWNvbkZ1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICAgICAgZGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlUmVsZXZhbnRUYXNrc0FuZFN1YnRhc2tzRE9NKCk7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVUYXNrRnJvbVN0b3JhZ2UoKTtcclxuICAgICAgICAgICAgICAgIHRhc2tET00ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlVGFza0Zyb21TdG9yYWdlKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JhZ2VQcm9qZWN0SW5kZXggPSBnZXRTdG9yYWdlUHJvamVjdEluZGV4KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JhZ2VUYXNrSW5kZXggPSBnZXRTdG9yYWdlVGFza0luZGV4KHN0b3JhZ2VQcm9qZWN0SW5kZXgsIHRhc2tET00pO1xyXG4gICAgICAgICAgICAvL2NhbGxzIHRoZSByZW1vdmUgdGFzayBpbiBwcm9qZWN0LmpzXHJcbiAgICAgICAgICAgIHN0b3JhZ2UuYWxsUHJvamVjdHNbc3RvcmFnZVByb2plY3RJbmRleF0ucmVtb3ZlVGFzayhzdG9yYWdlVGFza0luZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZVJlbGV2YW50VGFza3NBbmRTdWJ0YXNrc0RPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrT2JqLmdldEluZGV4KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbERPTVRvUmVtb3ZlID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS10YXNrLWluZGV4PScke3Rhc2tJbmRleH0nXWApKTtcclxuICAgICAgICAgICAgYWxsRE9NVG9SZW1vdmUuZm9yRWFjaChub2RlID0+IHt7XHJcbiAgICAgICAgICAgICAgICBub2RlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9fSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZW5kIGZvciBjb21wbGV0aW5nIGEgdGFzayBhbmQgZGVsZXRpbmcgYSB0YXNrXHJcblxyXG5cclxuICAgICAgICAvL2ZvciBlZGl0aW5nIGEgdGFza1xyXG4gICAgICAgIGZ1bmN0aW9uIGFkZEVkaXRJY29uRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgICAgICBlZGl0SWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYoaGFzRm9ybSgpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXZlcnRGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRWxlbWVudCA9IGdldFRhc2tGcm9tQ2hpbGROb2RlKGVkaXRJY29uKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tGb3JtID0gY3JlYXRlRE9NVGFza0Zvcm0oJ2VkaXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdG9yYWdlUHJvamVjdEluZGV4ID0gZ2V0U3RvcmFnZVByb2plY3RJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmFnZVRhc2tJbmRleCA9IGdldFN0b3JhZ2VUYXNrSW5kZXgoc3RvcmFnZVByb2plY3RJbmRleCwgdGFza0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFRhc2tPYmplY3QgPSBzdG9yYWdlLmFsbFByb2plY3RzW3N0b3JhZ2VQcm9qZWN0SW5kZXhdLmdldFRhc2tzKClbc3RvcmFnZVRhc2tJbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgdGFza0VsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFza0Zvcm0sIHRhc2tFbGVtZW50Lm5leHRTaWJsaW5nKTtcclxuICAgICAgICAgICAgICAgIHRhc2tFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCdpbnZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpLnZhbHVlID0gY3VycmVudFRhc2tPYmplY3QuZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWUgPSBjdXJyZW50VGFza09iamVjdC5nZXREZXNjcmlwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5LWJ0biA+IGknKTtcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRUYXNrT2JqZWN0LmdldFByaW9yaXR5KCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZFByaW9yaXR5Q29sb3IocHJpb3JpdHlJY29uLCBjdXJyZW50VGFza09iamVjdC5nZXRQcmlvcml0eSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBtYWtlU29saWRJY29uKHByaW9yaXR5SWNvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZW5kIGZvciBlZGl0aW5nIGEgdGFza1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRTdWJ0YXNrSWNvbkZ1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICAgICAgYWRkU3VidGFza0ljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYoaGFzRm9ybSgpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXZlcnRGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U3VidGFza09yVGFzayA9IGdldExhc3RSZWxldmFudFRhc2tFbGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRm9ybSA9IGNyZWF0ZURPTVN1YnRhc2tGb3JtKCdhZGQnKTtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2tGb3JtLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JywgdGFza0RPTS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpKTtcclxuICAgICAgICAgICAgICAgIGxhc3RTdWJ0YXNrT3JUYXNrLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN1YnRhc2tGb3JtLCBsYXN0U3VidGFza09yVGFzay5uZXh0U2libGluZyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2dldCBsYXN0IHN1YnRhc2sgb3IgdGFzayBlbGVtZW50IHRoYXQgaGFzIHRoZSBzYW1lIHRhc2sgaW5kZXhcclxuICAgICAgICAvL3N1YnRhc2sgZm9ybSBzaG91bGQgYmUgYXBwZW5kZWQgYXQgdGhlIGxhc3Qgc3VidGFzayBvZiB0aGUgZG9tXHJcbiAgICAgICAgLy9cclxuICAgICAgICBmdW5jdGlvbiBnZXRMYXN0UmVsZXZhbnRUYXNrRWxlbWVudCgpe1xyXG4gICAgICAgICAgICBjb25zdCBhbGxFbGVtZW50c1dpdGhEYXRhVGFza0luZGV4ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS10YXNrLWluZGV4PScke3Rhc2tPYmouZ2V0SW5kZXgoKX0nXWApKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFsbEVsZW1lbnRzV2l0aERhdGFUYXNrSW5kZXhbYWxsRWxlbWVudHNXaXRoRGF0YVRhc2tJbmRleC5sZW5ndGgtMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGFza0RPTTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NyZWF0ZXMgdGhlIHN1YnRhc2sgZG9tXHJcbiAgICBjb25zdCBjcmVhdGVET01TdWJ0YXNrID0gKHN1YnRhc2tPYmosIGRhdGFUYXNrSW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZVRhc2tJY29uID0gY3JlYXRlVGFnKCdpJyxza2lwKDEpLCBbJ2ZhLXJlZ3VsYXInLCdmYS1jaXJjbGUnLCAncG9pbnRlciddKTtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZVRhc2tEaXYgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIFsnY29tcGxldGUtdGFzay1idG4nXSwgc2tpcCgxKSwgW2NvbXBsZXRlVGFza0ljb25dLCBza2lwKDEpKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFza0luZm9ybWF0aW9uID0gY3JlYXRlVGFnKCdkaXYnLCBzdWJ0YXNrT2JqLmdldE5hbWUoKSwgWyd0YXNrLXRpdGxlJ10sIHNraXAoMSkpO1xyXG4gICAgICAgIGlmKHN1YnRhc2tPYmouZ2V0RGVzY3JpcHRpb24oKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gY3JlYXRlVGFnKCdkaXYnLCBzdWJ0YXNrT2JqLmdldERlc2NyaXB0aW9uKCksIFsndGFzay1kZXNjcmlwdGlvbiddLCBza2lwKDEpKTtcclxuICAgICAgICAgICAgdGFza0luZm9ybWF0aW9uLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZWRpdEljb24gPSBjcmVhdGVUYWcoJ2knLCBza2lwKDEpLCBbJ2ZhLXNvbGlkJywnZmEtcGVuLXRvLXNxdWFyZScsICdwb2ludGVyJ10sIHNraXAoMSkpO1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZUljb24gPSBjcmVhdGVUYWcoJ2knLCBza2lwKDEpLCBbJ2ZhLXNvbGlkJywnZmEtdHJhc2gnLCAncG9pbnRlciddLCBza2lwKDEpKTsgICAgICBcclxuICAgICAgICBjb25zdCBpY29uQ29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBbJ2J1dHRvbi1pY29ucyddLCBza2lwKDEpLCBbZWRpdEljb24sIGRlbGV0ZUljb25dLCBza2lwKDEpKTsgICAgXHJcblxyXG4gICAgICAgIGNvbnN0IHN1YnRhc2sgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIFsnc3VidGFzayddLCAnJywgW2NvbXBsZXRlVGFza0RpdiwgdGFza0luZm9ybWF0aW9uLCBpY29uQ29udGFpbmVyXSwgc2tpcCgxKSkgXHJcbiAgICAgICAgc3VidGFzay5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcsIGRhdGFUYXNrSW5kZXgpO1xyXG4gICAgICAgIHN1YnRhc2suc2V0QXR0cmlidXRlKCdkYXRhLXN1YnRhc2staW5kZXgnLCBzdWJ0YXNrT2JqLmdldEluZGV4KCkpO1xyXG5cclxuICAgICAgICBhZGRDb21wbGV0ZVRhc2tFdmVudExpc3RlbmVyKCk7XHJcbiAgICAgICAgYWRkRGVsZXRlVGFza0V2ZW50TGlzdGVuZXIoKTtcclxuICAgICAgICBhZGRFZGl0VGFza0V2ZW50TGlzdGVuZXIoKTtcclxuICAgICAgICByZXR1cm4gc3VidGFzaztcclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENvbXBsZXRlVGFza0V2ZW50TGlzdGVuZXIoKXtcclxuICAgICAgICAgICAgY29tcGxldGVUYXNrSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRGF0YUluZGV4ID0gc3VidGFzay5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0RhdGFJbmRleCA9IHN1YnRhc2suZ2V0QXR0cmlidXRlKCdkYXRhLXN1YnRhc2staW5kZXgnKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdEFycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRQcm9qZWN0SW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tBcnJheUluZGV4ID0gc3RvcmFnZUxvb2t1cHMuZ2V0VGFza0luZGV4KHByb2plY3RBcnJheUluZGV4LCB0YXNrRGF0YUluZGV4KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tBcnJheUluZGV4ID0gc3RvcmFnZUxvb2t1cHMuZ2V0U3VidGFza0luZGV4KHByb2plY3RBcnJheUluZGV4LCB0YXNrQXJyYXlJbmRleCwgc3VidGFza0RhdGFJbmRleClcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UuYWxsUHJvamVjdHNbcHJvamVjdEFycmF5SW5kZXhdLmdldFRhc2tzKClbdGFza0RhdGFJbmRleF0ucmVtb3ZlU3VidGFzayhzdWJ0YXNrQXJyYXlJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzdWJ0YXNrLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkRGVsZXRlVGFza0V2ZW50TGlzdGVuZXIoKXtcclxuICAgICAgICAgICAgZGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRGF0YUluZGV4ID0gc3VidGFzay5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0RhdGFJbmRleCA9IHN1YnRhc2suZ2V0QXR0cmlidXRlKCdkYXRhLXN1YnRhc2staW5kZXgnKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdEFycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRQcm9qZWN0SW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tBcnJheUluZGV4ID0gc3RvcmFnZUxvb2t1cHMuZ2V0VGFza0luZGV4KHByb2plY3RBcnJheUluZGV4LCB0YXNrRGF0YUluZGV4KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tBcnJheUluZGV4ID0gc3RvcmFnZUxvb2t1cHMuZ2V0U3VidGFza0luZGV4KHByb2plY3RBcnJheUluZGV4LCB0YXNrQXJyYXlJbmRleCwgc3VidGFza0RhdGFJbmRleClcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UuYWxsUHJvamVjdHNbcHJvamVjdEFycmF5SW5kZXhdLmdldFRhc2tzKClbdGFza0RhdGFJbmRleF0ucmVtb3ZlU3VidGFzayhzdWJ0YXNrQXJyYXlJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzdWJ0YXNrLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KSAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRFZGl0VGFza0V2ZW50TGlzdGVuZXIoKXtcclxuICAgICAgICAgICAgZWRpdEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYoaGFzRm9ybSgpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXZlcnRGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdWJ0YXNrLnNldEF0dHJpYnV0ZSgnaWQnLCdpbnZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tGb3JtID0gY3JlYXRlRE9NU3VidGFza0Zvcm0oJ2VkaXQnKTtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2tGb3JtLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JywgZGF0YVRhc2tJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzdWJ0YXNrRm9ybS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1pbmRleCcsIHN1YnRhc2tPYmouZ2V0SW5kZXgoKSk7XHJcbiAgICAgICAgICAgICAgICBzdWJ0YXNrLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN1YnRhc2tGb3JtLCBzdWJ0YXNrKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWUgPSBzdWJ0YXNrT2JqLmdldE5hbWUoKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpLnZhbHVlID0gc3VidGFza09iai5nZXREZXNjcmlwdGlvbigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy9hZGRzIGFsbCBkb20gb2YgdGFza3MgYW5kIHN1YnRhc2tzIGluIGEgcHJvamVjdFxyXG4gICAgZnVuY3Rpb24gYWRkQWxsVGFza3NET00oY29udGFpbmVyLCB0YXNrcyl7XHJcbiAgICAgICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZURPTVRhc2sodGFzaykpO1xyXG4gICAgICAgICAgICBjb25zdCBhbGxTdWJ0YXNrcyA9IHRhc2suZ2V0U3VidGFza3MoKTtcclxuICAgICAgICAgICAgYWxsU3VidGFza3MuZm9yRWFjaChzdWJ0YXNrID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVET01TdWJ0YXNrKHN1YnRhc2ssIHRhc2suZ2V0SW5kZXgoKSkpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xlYXJBbGxUYXNrc0RPTSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcbiAgICAgICAgd2hpbGUoY29udGFpbmVyRGl2LmZpcnN0Q2hpbGQpe1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYucmVtb3ZlQ2hpbGQoY29udGFpbmVyRGl2LmZpcnN0Q2hpbGQpOyAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2ZpbmQgdGhlIGFycmF5IGluZGljaWVzIG9mIHByb2plY3RzLCB0YXNrcywgYW5kIHN1YnRhc2tzXHJcbiAgICBjb25zdCBzdG9yYWdlTG9va3VwcyA9ICgoKSA9PiB7XHJcbiAgICAgICAgLy9yZXR1cm5zIGluZGV4IG9mIHByb2plY3QgaW4gYWxsIHByb2plY3RzIGFycmF5XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0UHJvamVjdEluZGV4KCl7XHJcbiAgICAgICAgICAgIGxldCBwcm9qZWN0SW5kZXhJbkFycmF5ID0gMDtcclxuICAgICAgICAgICAgbGV0IHByb2plY3REYXRhSW5kZXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1oZWFkZXInKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpO1xyXG4gICAgICAgICAgICBzdG9yYWdlLmFsbFByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihwcm9qZWN0LmdldEluZGV4KCkgPT0gcHJvamVjdERhdGFJbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdEluZGV4SW5BcnJheSA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdEluZGV4SW5BcnJheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmV0dXJucyBpbmRleCBvZiB0YXNrIGluIGFsbCB0YXNrcyBhcnJheVxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFRhc2tJbmRleChwcm9qZWN0SW5kZXgsIHRhc2tEYXRhSW5kZXgpe1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFByb2plY3RUYXNrcyA9IHN0b3JhZ2UuYWxsUHJvamVjdHNbcHJvamVjdEluZGV4XS5nZXRUYXNrcygpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFByb2plY3RUYXNrcy5maW5kSW5kZXgodGFzayA9PiB0YXNrLmdldEluZGV4KCkgPT0gdGFza0RhdGFJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRTdWJ0YXNrSW5kZXgocHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIHN1YnRhc2tEYXRhSW5kZXgpe1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFByb2plY3RTdWJ0YXNrcyA9IHN0b3JhZ2UuYWxsUHJvamVjdHNbcHJvamVjdEluZGV4XS5nZXRUYXNrcygpW3Rhc2tJbmRleF0uZ2V0U3VidGFza3MoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm9qZWN0U3VidGFza3MuZmluZEluZGV4KHN1YnRhc2sgPT4gc3VidGFzay5nZXRJbmRleCgpID09IHN1YnRhc2tEYXRhSW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtnZXRQcm9qZWN0SW5kZXgsIGdldFRhc2tJbmRleCwgZ2V0U3VidGFza0luZGV4fVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICByZXR1cm4ge2luaXRpYWxSZW5kZXJ9O1xyXG5cclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVpOyIsImltcG9ydCB7bGFzdEl0ZW1PZiwgc3RyaW5nVG9BcnJheSwgaXNJblJhbmdlfSBmcm9tICcuL2xpYi91dGlscy5qcyc7XG5pbXBvcnQge3RvZGF5LCByZWd1bGFyaXplRGF0ZX0gZnJvbSAnLi9saWIvZGF0ZS5qcyc7XG5pbXBvcnQge3BhcnNlRGF0ZSwgZm9ybWF0RGF0ZX0gZnJvbSAnLi9saWIvZGF0ZS1mb3JtYXQuanMnO1xuaW1wb3J0IHtpc0FjdGl2ZUVsZW1lbnR9IGZyb20gJy4vbGliL2RvbS5qcyc7XG5pbXBvcnQge3JlZ2lzdGVyTGlzdGVuZXJzLCB1bnJlZ2lzdGVyTGlzdGVuZXJzfSBmcm9tICcuL2xpYi9ldmVudC5qcyc7XG5pbXBvcnQge2xvY2FsZXN9IGZyb20gJy4vaTE4bi9iYXNlLWxvY2FsZXMuanMnO1xuaW1wb3J0IGRlZmF1bHRPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9kZWZhdWx0T3B0aW9ucy5qcyc7XG5pbXBvcnQgcHJvY2Vzc09wdGlvbnMgZnJvbSAnLi9vcHRpb25zL3Byb2Nlc3NPcHRpb25zLmpzJztcbmltcG9ydCBQaWNrZXIgZnJvbSAnLi9waWNrZXIvUGlja2VyLmpzJztcbmltcG9ydCB7dHJpZ2dlckRhdGVwaWNrZXJFdmVudH0gZnJvbSAnLi9ldmVudHMvZnVuY3Rpb25zLmpzJztcbmltcG9ydCB7b25LZXlkb3duLCBvbkZvY3VzLCBvbk1vdXNlZG93biwgb25DbGlja0lucHV0LCBvblBhc3RlfSBmcm9tICcuL2V2ZW50cy9pbnB1dEZpZWxkTGlzdGVuZXJzLmpzJztcbmltcG9ydCB7b25DbGlja091dHNpZGV9IGZyb20gJy4vZXZlbnRzL290aGVyTGlzdGVuZXJzLmpzJztcblxuZnVuY3Rpb24gc3RyaW5naWZ5RGF0ZXMoZGF0ZXMsIGNvbmZpZykge1xuICByZXR1cm4gZGF0ZXNcbiAgICAubWFwKGR0ID0+IGZvcm1hdERhdGUoZHQsIGNvbmZpZy5mb3JtYXQsIGNvbmZpZy5sb2NhbGUpKVxuICAgIC5qb2luKGNvbmZpZy5kYXRlRGVsaW1pdGVyKTtcbn1cblxuLy8gcGFyc2UgaW5wdXQgZGF0ZXMgYW5kIGNyZWF0ZSBhbiBhcnJheSBvZiB0aW1lIHZhbHVlcyBmb3Igc2VsZWN0aW9uXG4vLyByZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbm8gdmFsaWQgZGF0ZXMgaW4gaW5wdXREYXRlc1xuLy8gd2hlbiBvcmlnRGF0ZXMgKGN1cnJlbnQgc2VsZWN0aW9uKSBpcyBwYXNzZWQsIHRoZSBmdW5jdGlvbiB3b3JrcyB0byBtaXhcbi8vIHRoZSBpbnB1dCBkYXRlcyBpbnRvIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuZnVuY3Rpb24gcHJvY2Vzc0lucHV0RGF0ZXMoZGF0ZXBpY2tlciwgaW5wdXREYXRlcywgY2xlYXIgPSBmYWxzZSkge1xuICAvLyBjb25zdCB7Y29uZmlnLCBkYXRlczogb3JpZ0RhdGVzLCByYW5nZXBpY2tlcn0gPSBkYXRlcGlja2VyO1xuICBjb25zdCB7Y29uZmlnLCBkYXRlczogb3JpZ0RhdGVzLCByYW5nZVNpZGVJbmRleH0gPSBkYXRlcGlja2VyO1xuICBpZiAoaW5wdXREYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAvLyBlbXB0eSBpbnB1dCBpcyBjb25zaWRlcmVkIHZhbGlkIHVubGVzcyBvcmlnaURhdGVzIGlzIHBhc3NlZFxuICAgIHJldHVybiBjbGVhciA/IFtdIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gY29uc3QgcmFuZ2VFbmQgPSByYW5nZXBpY2tlciAmJiBkYXRlcGlja2VyID09PSByYW5nZXBpY2tlci5kYXRlcGlja2Vyc1sxXTtcbiAgbGV0IG5ld0RhdGVzID0gaW5wdXREYXRlcy5yZWR1Y2UoKGRhdGVzLCBkdCkgPT4ge1xuICAgIGxldCBkYXRlID0gcGFyc2VEYXRlKGR0LCBjb25maWcuZm9ybWF0LCBjb25maWcubG9jYWxlKTtcbiAgICBpZiAoZGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZGF0ZXM7XG4gICAgfVxuICAgIC8vIGFkanVzdCB0byAxc3Qgb2YgdGhlIG1vbnRoL0phbiAxc3Qgb2YgdGhlIHllYXJcbiAgICAvLyBvciB0byB0aGUgbGFzdCBkYXkgb2YgdGhlIG1vbmgvRGVjIDMxc3Qgb2YgdGhlIHllYXIgaWYgdGhlIGRhdGVwaWNrZXJcbiAgICAvLyBpcyB0aGUgcmFuZ2UtZW5kIHBpY2tlciBvZiBhIHJhbmdlcGlja2VyXG4gICAgZGF0ZSA9IHJlZ3VsYXJpemVEYXRlKGRhdGUsIGNvbmZpZy5waWNrTGV2ZWwsIHJhbmdlU2lkZUluZGV4KTtcbiAgICBpZiAoXG4gICAgICBpc0luUmFuZ2UoZGF0ZSwgY29uZmlnLm1pbkRhdGUsIGNvbmZpZy5tYXhEYXRlKVxuICAgICAgJiYgIWRhdGVzLmluY2x1ZGVzKGRhdGUpXG4gICAgICAmJiAhY29uZmlnLmRhdGVzRGlzYWJsZWQuaW5jbHVkZXMoZGF0ZSlcbiAgICAgICYmIChjb25maWcucGlja0xldmVsID4gMCB8fCAhY29uZmlnLmRheXNPZldlZWtEaXNhYmxlZC5pbmNsdWRlcyhuZXcgRGF0ZShkYXRlKS5nZXREYXkoKSkpXG4gICAgKSB7XG4gICAgICBkYXRlcy5wdXNoKGRhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0ZXM7XG4gIH0sIFtdKTtcbiAgaWYgKG5ld0RhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29uZmlnLm11bHRpZGF0ZSAmJiAhY2xlYXIpIHtcbiAgICAvLyBnZXQgdGhlIHN5bm1ldHJpYyBkaWZmZXJlbmNlIGJldHdlZW4gb3JpZ0RhdGVzIGFuZCBuZXdEYXRlc1xuICAgIG5ld0RhdGVzID0gbmV3RGF0ZXMucmVkdWNlKChkYXRlcywgZGF0ZSkgPT4ge1xuICAgICAgaWYgKCFvcmlnRGF0ZXMuaW5jbHVkZXMoZGF0ZSkpIHtcbiAgICAgICAgZGF0ZXMucHVzaChkYXRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRlcztcbiAgICB9LCBvcmlnRGF0ZXMuZmlsdGVyKGRhdGUgPT4gIW5ld0RhdGVzLmluY2x1ZGVzKGRhdGUpKSk7XG4gIH1cbiAgLy8gZG8gbGVuZ3RoIGNoZWNrIGFsd2F5cyBiZWNhdXNlIHVzZXIgY2FuIGlucHV0IG11bHRpcGxlIGRhdGVzIHJlZ2FyZGxlc3Mgb2YgdGhlIG1vZGVcbiAgcmV0dXJuIGNvbmZpZy5tYXhOdW1iZXJPZkRhdGVzICYmIG5ld0RhdGVzLmxlbmd0aCA+IGNvbmZpZy5tYXhOdW1iZXJPZkRhdGVzXG4gICAgPyBuZXdEYXRlcy5zbGljZShjb25maWcubWF4TnVtYmVyT2ZEYXRlcyAqIC0xKVxuICAgIDogbmV3RGF0ZXM7XG59XG5cbi8vIHJlZnJlc2ggdGhlIFVJIGVsZW1lbnRzXG4vLyBtb2RlczogMTogaW5wdXQgb25seSwgMiwgcGlja2VyIG9ubHksIDMgYm90aFxuZnVuY3Rpb24gcmVmcmVzaFVJKGRhdGVwaWNrZXIsIG1vZGUgPSAzLCBxdWlja1JlbmRlciA9IHRydWUpIHtcbiAgY29uc3Qge2NvbmZpZywgcGlja2VyLCBpbnB1dEZpZWxkfSA9IGRhdGVwaWNrZXI7XG4gIGlmIChtb2RlICYgMikge1xuICAgIGNvbnN0IG5ld1ZpZXcgPSBwaWNrZXIuYWN0aXZlID8gY29uZmlnLnBpY2tMZXZlbCA6IGNvbmZpZy5zdGFydFZpZXc7XG4gICAgcGlja2VyLnVwZGF0ZSgpLmNoYW5nZVZpZXcobmV3VmlldykucmVuZGVyKHF1aWNrUmVuZGVyKTtcbiAgfVxuICBpZiAobW9kZSAmIDEgJiYgaW5wdXRGaWVsZCkge1xuICAgIGlucHV0RmllbGQudmFsdWUgPSBzdHJpbmdpZnlEYXRlcyhkYXRlcGlja2VyLmRhdGVzLCBjb25maWcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldERhdGUoZGF0ZXBpY2tlciwgaW5wdXREYXRlcywgb3B0aW9ucykge1xuICBsZXQge2NsZWFyLCByZW5kZXIsIGF1dG9oaWRlLCByZXZlcnR9ID0gb3B0aW9ucztcbiAgaWYgKHJlbmRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmVuZGVyID0gdHJ1ZTtcbiAgfVxuICBpZiAoIXJlbmRlcikge1xuICAgIGF1dG9oaWRlID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoYXV0b2hpZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIGF1dG9oaWRlID0gZGF0ZXBpY2tlci5jb25maWcuYXV0b2hpZGU7XG4gIH1cblxuICBjb25zdCBuZXdEYXRlcyA9IHByb2Nlc3NJbnB1dERhdGVzKGRhdGVwaWNrZXIsIGlucHV0RGF0ZXMsIGNsZWFyKTtcbiAgaWYgKCFuZXdEYXRlcyAmJiAhcmV2ZXJ0KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChuZXdEYXRlcyAmJiBuZXdEYXRlcy50b1N0cmluZygpICE9PSBkYXRlcGlja2VyLmRhdGVzLnRvU3RyaW5nKCkpIHtcbiAgICBkYXRlcGlja2VyLmRhdGVzID0gbmV3RGF0ZXM7XG4gICAgcmVmcmVzaFVJKGRhdGVwaWNrZXIsIHJlbmRlciA/IDMgOiAxKTtcbiAgICB0cmlnZ2VyRGF0ZXBpY2tlckV2ZW50KGRhdGVwaWNrZXIsICdjaGFuZ2VEYXRlJyk7XG4gIH0gZWxzZSB7XG4gICAgcmVmcmVzaFVJKGRhdGVwaWNrZXIsIDEpO1xuICB9XG5cbiAgaWYgKGF1dG9oaWRlKSB7XG4gICAgZGF0ZXBpY2tlci5oaWRlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBkYXRlIHBpY2tlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlcGlja2VyIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIGRhdGUgcGlja2VyXG4gICAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnQgLSBlbGVtZW50IHRvIGJpbmQgYSBkYXRlIHBpY2tlclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zXSAtIGNvbmZpZyBvcHRpb25zXG4gICAqIEBwYXJhbSAge0RhdGVSYW5nZVBpY2tlcn0gW3JhbmdlcGlja2VyXSAtIERhdGVSYW5nZVBpY2tlciBpbnN0YW5jZSB0aGVcbiAgICogZGF0ZSBwaWNrZXIgYmVsb25ncyB0by4gVXNlIHRoaXMgb25seSB3aGVuIGNyZWF0aW5nIGRhdGUgcGlja2VyIGFzIGEgcGFydFxuICAgKiBvZiBkYXRlIHJhbmdlIHBpY2tlclxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucyA9IHt9LCByYW5nZXBpY2tlciA9IHVuZGVmaW5lZCkge1xuICAgIGVsZW1lbnQuZGF0ZXBpY2tlciA9IHRoaXM7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBidXR0b25DbGFzczogKG9wdGlvbnMuYnV0dG9uQ2xhc3MgJiYgU3RyaW5nKG9wdGlvbnMuYnV0dG9uQ2xhc3MpKSB8fCAnYnV0dG9uJyxcbiAgICAgIGNvbnRhaW5lcjogbnVsbCxcbiAgICAgIGRlZmF1bHRWaWV3RGF0ZTogdG9kYXkoKSxcbiAgICAgIG1heERhdGU6IHVuZGVmaW5lZCxcbiAgICAgIG1pbkRhdGU6IHVuZGVmaW5lZCxcbiAgICB9LCBwcm9jZXNzT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgdGhpcykpO1xuICAgIC8vIGNvbmZpZ3VyZSBieSB0eXBlXG4gICAgY29uc3QgaW5saW5lID0gdGhpcy5pbmxpbmUgPSBlbGVtZW50LnRhZ05hbWUgIT09ICdJTlBVVCc7XG4gICAgbGV0IGlucHV0RmllbGQ7XG4gICAgaWYgKGlubGluZSkge1xuICAgICAgY29uZmlnLmNvbnRhaW5lciA9IGVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcHRpb25zLmNvbnRhaW5lcikge1xuICAgICAgICAvLyBvbWl0IHN0cmluZyB0eXBlIGNoZWNrIGJlY2F1c2UgaXQgZG9lc24ndCBndWFyYW50ZWUgdG8gYXZvaWQgZXJyb3JzXG4gICAgICAgIC8vIChpbnZhbGlkIHNlbGVjdG9yIHN0cmluZyBjYXVzZXMgYWJlbmQgd2l0aCBzeXRheCBlcnJvcilcbiAgICAgICAgY29uZmlnLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgICA/IG9wdGlvbnMuY29udGFpbmVyXG4gICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuY29udGFpbmVyKTtcbiAgICAgIH1cbiAgICAgIGlucHV0RmllbGQgPSB0aGlzLmlucHV0RmllbGQgPSBlbGVtZW50O1xuICAgICAgaW5wdXRGaWVsZC5jbGFzc0xpc3QuYWRkKCdkYXRlcGlja2VyLWlucHV0Jyk7XG4gICAgfVxuICAgIGlmIChyYW5nZXBpY2tlcikge1xuICAgICAgLy8gY2hlY2sgdmFsaWRpcnlcbiAgICAgIGNvbnN0IGluZGV4ID0gcmFuZ2VwaWNrZXIuaW5wdXRzLmluZGV4T2YoaW5wdXRGaWVsZCk7XG4gICAgICBjb25zdCBkYXRlcGlja2VycyA9IHJhbmdlcGlja2VyLmRhdGVwaWNrZXJzO1xuICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IDEgfHwgIUFycmF5LmlzQXJyYXkoZGF0ZXBpY2tlcnMpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIHJhbmdlcGlja2VyIG9iamVjdC4nKTtcbiAgICAgIH1cbiAgICAgIC8vIGF0dGFjaCBpdGFlbGYgdG8gdGhlIHJhbmdlcGlja2VyIGhlcmUgc28gdGhhdCBwcm9jZXNzSW5wdXREYXRlcygpIGNhblxuICAgICAgLy8gZGV0ZXJtaW5lIGlmIHRoaXMgaXMgdGhlIHJhbmdlLWVuZCBwaWNrZXIgb2YgdGhlIHJhbmdlcGlja2VyIHdoaWxlXG4gICAgICAvLyBzZXR0aW5nIGluaXRhbCB2YWx1ZXMgd2hlbiBwaWNrTGV2ZWwgPiAwXG4gICAgICBkYXRlcGlja2Vyc1tpbmRleF0gPSB0aGlzO1xuICAgICAgLy8gYWRkIGdldHRlciBmb3IgcmFuZ2VwaWNrZXJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmFuZ2VwaWNrZXInLCB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gcmFuZ2VwaWNrZXI7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmFuZ2VTaWRlSW5kZXgnLCB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzZXQgdXAgY29uZmlnXG4gICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgT2JqZWN0LmFzc2lnbihjb25maWcsIHByb2Nlc3NPcHRpb25zKG9wdGlvbnMsIHRoaXMpKTtcblxuICAgIC8vIHNldCBpbml0aWFsIGRhdGVzXG4gICAgbGV0IGluaXRpYWxEYXRlcztcbiAgICBpZiAoaW5saW5lKSB7XG4gICAgICBpbml0aWFsRGF0ZXMgPSBzdHJpbmdUb0FycmF5KGVsZW1lbnQuZGF0YXNldC5kYXRlLCBjb25maWcuZGF0ZURlbGltaXRlcik7XG4gICAgICBkZWxldGUgZWxlbWVudC5kYXRhc2V0LmRhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluaXRpYWxEYXRlcyA9IHN0cmluZ1RvQXJyYXkoaW5wdXRGaWVsZC52YWx1ZSwgY29uZmlnLmRhdGVEZWxpbWl0ZXIpO1xuICAgIH1cbiAgICB0aGlzLmRhdGVzID0gW107XG4gICAgLy8gcHJvY2VzcyBpbml0aWFsIHZhbHVlXG4gICAgY29uc3QgaW5wdXREYXRlVmFsdWVzID0gcHJvY2Vzc0lucHV0RGF0ZXModGhpcywgaW5pdGlhbERhdGVzKTtcbiAgICBpZiAoaW5wdXREYXRlVmFsdWVzICYmIGlucHV0RGF0ZVZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmRhdGVzID0gaW5wdXREYXRlVmFsdWVzO1xuICAgIH1cbiAgICBpZiAoaW5wdXRGaWVsZCkge1xuICAgICAgaW5wdXRGaWVsZC52YWx1ZSA9IHN0cmluZ2lmeURhdGVzKHRoaXMuZGF0ZXMsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGlja2VyID0gdGhpcy5waWNrZXIgPSBuZXcgUGlja2VyKHRoaXMpO1xuXG4gICAgaWYgKGlubGluZSkge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNldCB1cCBldmVudCBsaXN0ZW5lcnMgaW4gb3RoZXIgbW9kZXNcbiAgICAgIGNvbnN0IG9uTW91c2Vkb3duRG9jdW1lbnQgPSBvbkNsaWNrT3V0c2lkZS5iaW5kKG51bGwsIHRoaXMpO1xuICAgICAgY29uc3QgbGlzdGVuZXJzID0gW1xuICAgICAgICBbaW5wdXRGaWVsZCwgJ2tleWRvd24nLCBvbktleWRvd24uYmluZChudWxsLCB0aGlzKV0sXG4gICAgICAgIFtpbnB1dEZpZWxkLCAnZm9jdXMnLCBvbkZvY3VzLmJpbmQobnVsbCwgdGhpcyldLFxuICAgICAgICBbaW5wdXRGaWVsZCwgJ21vdXNlZG93bicsIG9uTW91c2Vkb3duLmJpbmQobnVsbCwgdGhpcyldLFxuICAgICAgICBbaW5wdXRGaWVsZCwgJ2NsaWNrJywgb25DbGlja0lucHV0LmJpbmQobnVsbCwgdGhpcyldLFxuICAgICAgICBbaW5wdXRGaWVsZCwgJ3Bhc3RlJywgb25QYXN0ZS5iaW5kKG51bGwsIHRoaXMpXSxcbiAgICAgICAgW2RvY3VtZW50LCAnbW91c2Vkb3duJywgb25Nb3VzZWRvd25Eb2N1bWVudF0sXG4gICAgICAgIFtkb2N1bWVudCwgJ3RvdWNoc3RhcnQnLCBvbk1vdXNlZG93bkRvY3VtZW50XSxcbiAgICAgICAgW3dpbmRvdywgJ3Jlc2l6ZScsIHBpY2tlci5wbGFjZS5iaW5kKHBpY2tlcildXG4gICAgICBdO1xuICAgICAgcmVnaXN0ZXJMaXN0ZW5lcnModGhpcywgbGlzdGVuZXJzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IERhdGUgb2JqZWN0IG9yIHRpbWUgdmFsdWUgaW4gZ2l2ZW4gZm9ybWF0IGFuZCBsYW5ndWFnZVxuICAgKiBAcGFyYW0gIHtEYXRlfE51bWJlcn0gZGF0ZSAtIGRhdGUgb3IgdGltZSB2YWx1ZSB0byBmb3JtYXRcbiAgICogQHBhcmFtICB7U3RyaW5nfE9iamVjdH0gZm9ybWF0IC0gZm9ybWF0IHN0cmluZyBvciBvYmplY3QgdGhhdCBjb250YWluc1xuICAgKiB0b0Rpc3BsYXkoKSBjdXN0b20gZm9ybWF0dGVyLCB3aG9zZSBzaWduYXR1cmUgaXNcbiAgICogLSBhcmdzOlxuICAgKiAgIC0gZGF0ZToge0RhdGV9IC0gRGF0ZSBpbnN0YW5jZSBvZiB0aGUgZGF0ZSBwYXNzZWQgdG8gdGhlIG1ldGhvZFxuICAgKiAgIC0gZm9ybWF0OiB7T2JqZWN0fSAtIHRoZSBmb3JtYXQgb2JqZWN0IHBhc3NlZCB0byB0aGUgbWV0aG9kXG4gICAqICAgLSBsb2NhbGU6IHtPYmplY3R9IC0gbG9jYWxlIGZvciB0aGUgbGFuZ3VhZ2Ugc3BlY2lmaWVkIGJ5IGBsYW5nYFxuICAgKiAtIHJldHVybjpcbiAgICogICAgIHtTdHJpbmd9IGZvcm1hdHRlZCBkYXRlXG4gICAqIEBwYXJhbSAge1N0cmluZ30gW2xhbmc9ZW5dIC0gbGFuZ3VhZ2UgY29kZSBmb3IgdGhlIGxvY2FsZSB0byB1c2VcbiAgICogQHJldHVybiB7U3RyaW5nfSBmb3JtYXR0ZWQgZGF0ZVxuICAgKi9cbiAgc3RhdGljIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0LCBsYW5nKSB7XG4gICAgcmV0dXJuIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0LCBsYW5nICYmIGxvY2FsZXNbbGFuZ10gfHwgbG9jYWxlcy5lbik7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgZGF0ZSBzdHJpbmdcbiAgICogQHBhcmFtICB7U3RyaW5nfERhdGV8TnVtYmVyfSBkYXRlU3RyIC0gZGF0ZSBzdHJpbmcsIERhdGUgb2JqZWN0IG9yIHRpbWVcbiAgICogdmFsdWUgdG8gcGFyc2VcbiAgICogQHBhcmFtICB7U3RyaW5nfE9iamVjdH0gZm9ybWF0IC0gZm9ybWF0IHN0cmluZyBvciBvYmplY3QgdGhhdCBjb250YWluc1xuICAgKiB0b1ZhbHVlKCkgY3VzdG9tIHBhcnNlciwgd2hvc2Ugc2lnbmF0dXJlIGlzXG4gICAqIC0gYXJnczpcbiAgICogICAtIGRhdGVTdHI6IHtTdHJpbmd8RGF0ZXxOdW1iZXJ9IC0gdGhlIGRhdGVTdHIgcGFzc2VkIHRvIHRoZSBtZXRob2RcbiAgICogICAtIGZvcm1hdDoge09iamVjdH0gLSB0aGUgZm9ybWF0IG9iamVjdCBwYXNzZWQgdG8gdGhlIG1ldGhvZFxuICAgKiAgIC0gbG9jYWxlOiB7T2JqZWN0fSAtIGxvY2FsZSBmb3IgdGhlIGxhbmd1YWdlIHNwZWNpZmllZCBieSBgbGFuZ2BcbiAgICogLSByZXR1cm46XG4gICAqICAgICB7RGF0ZXxOdW1iZXJ9IHBhcnNlZCBkYXRlIG9yIGl0cyB0aW1lIHZhbHVlXG4gICAqIEBwYXJhbSAge1N0cmluZ30gW2xhbmc9ZW5dIC0gbGFuZ3VhZ2UgY29kZSBmb3IgdGhlIGxvY2FsZSB0byB1c2VcbiAgICogQHJldHVybiB7TnVtYmVyfSB0aW1lIHZhbHVlIG9mIHBhcnNlZCBkYXRlXG4gICAqL1xuICBzdGF0aWMgcGFyc2VEYXRlKGRhdGVTdHIsIGZvcm1hdCwgbGFuZykge1xuICAgIHJldHVybiBwYXJzZURhdGUoZGF0ZVN0ciwgZm9ybWF0LCBsYW5nICYmIGxvY2FsZXNbbGFuZ10gfHwgbG9jYWxlcy5lbik7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge09iamVjdH0gLSBJbnN0YWxsZWQgbG9jYWxlcyBpbiBgW2xhbmd1YWdlQ29kZV06IGxvY2FsZU9iamVjdGAgZm9ybWF0XG4gICAqIGVuYDpfRW5nbGlzaCAoVVMpXyBpcyBwcmUtaW5zdGFsbGVkLlxuICAgKi9cbiAgc3RhdGljIGdldCBsb2NhbGVzKCkge1xuICAgIHJldHVybiBsb2NhbGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtCb29sZWFufSAtIFdoZXRoZXIgdGhlIHBpY2tlciBlbGVtZW50IGlzIHNob3duLiBgdHJ1ZWAgd2huZSBzaG93blxuICAgKi9cbiAgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gISEodGhpcy5waWNrZXIgJiYgdGhpcy5waWNrZXIuYWN0aXZlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9IC0gRE9NIG9iamVjdCBvZiBwaWNrZXIgZWxlbWVudFxuICAgKi9cbiAgZ2V0IHBpY2tlckVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VyID8gdGhpcy5waWNrZXIuZWxlbWVudCA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IHZhbHVlcyB0byB0aGUgY29uZmlnIG9wdGlvbnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBjb25maWcgb3B0aW9ucyB0byB1cGRhdGVcbiAgICovXG4gIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGNvbnN0IHBpY2tlciA9IHRoaXMucGlja2VyO1xuICAgIGNvbnN0IG5ld09wdGlvbnMgPSBwcm9jZXNzT3B0aW9ucyhvcHRpb25zLCB0aGlzKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIG5ld09wdGlvbnMpO1xuICAgIHBpY2tlci5zZXRPcHRpb25zKG5ld09wdGlvbnMpO1xuXG4gICAgcmVmcmVzaFVJKHRoaXMsIDMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgdGhlIHBpY2tlciBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIGlmICh0aGlzLmlucHV0RmllbGQpIHtcbiAgICAgIGlmICh0aGlzLmlucHV0RmllbGQuZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFpc0FjdGl2ZUVsZW1lbnQodGhpcy5pbnB1dEZpZWxkKSAmJiAhdGhpcy5jb25maWcuZGlzYWJsZVRvdWNoS2V5Ym9hcmQpIHtcbiAgICAgICAgdGhpcy5fc2hvd2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMuaW5wdXRGaWVsZC5mb2N1cygpO1xuICAgICAgICBkZWxldGUgdGhpcy5fc2hvd2luZztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5waWNrZXIuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGUgdGhlIHBpY2tlciBlbGVtZW50XG4gICAqIE5vdCBhdmFpbGFibGUgb24gaW5saW5lIHBpY2tlclxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBpZiAodGhpcy5pbmxpbmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5waWNrZXIuaGlkZSgpO1xuICAgIHRoaXMucGlja2VyLnVwZGF0ZSgpLmNoYW5nZVZpZXcodGhpcy5jb25maWcuc3RhcnRWaWV3KS5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBEYXRlcGlja2VyIGluc3RhbmNlXG4gICAqIEByZXR1cm4ge0RldGVwaWNrZXJ9IC0gdGhlIGluc3RhbmNlIGRlc3Ryb3llZFxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgICB1bnJlZ2lzdGVyTGlzdGVuZXJzKHRoaXMpO1xuICAgIHRoaXMucGlja2VyLmRldGFjaCgpO1xuICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgIHRoaXMuaW5wdXRGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCdkYXRlcGlja2VyLWlucHV0Jyk7XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnQuZGF0ZXBpY2tlcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNlbGVjdGVkIGRhdGUocylcbiAgICpcbiAgICogVGhlIG1ldGhvZCByZXR1cm5zIGEgRGF0ZSBvYmplY3Qgb2Ygc2VsZWN0ZWQgZGF0ZSBieSBkZWZhdWx0LCBhbmQgcmV0dXJuc1xuICAgKiBhbiBhcnJheSBvZiBzZWxlY3RlZCBkYXRlcyBpbiBtdWx0aWRhdGUgbW9kZS4gSWYgZm9ybWF0IHN0cmluZyBpcyBwYXNzZWQsXG4gICAqIGl0IHJldHVybnMgZGF0ZSBzdHJpbmcocykgZm9ybWF0dGVkIGluIGdpdmVuIGZvcm1hdC5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfSBbZm9ybWF0XSAtIEZvcm1hdCBzdHJpbmcgdG8gc3RyaW5naWZ5IHRoZSBkYXRlKHMpXG4gICAqIEByZXR1cm4ge0RhdGV8U3RyaW5nfERhdGVbXXxTdHJpbmdbXX0gLSBzZWxlY3RlZCBkYXRlKHMpLCBvciBpZiBub25lIGlzXG4gICAqIHNlbGVjdGVkLCBlbXB0eSBhcnJheSBpbiBtdWx0aWRhdGUgbW9kZSBhbmQgdW50aXRsZWQgaW4gc2lnbGVkYXRlIG1vZGVcbiAgICovXG4gIGdldERhdGUoZm9ybWF0ID0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSBmb3JtYXRcbiAgICAgID8gZGF0ZSA9PiBmb3JtYXREYXRlKGRhdGUsIGZvcm1hdCwgdGhpcy5jb25maWcubG9jYWxlKVxuICAgICAgOiBkYXRlID0+IG5ldyBEYXRlKGRhdGUpO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLm11bHRpZGF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0ZXMubWFwKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuZGF0ZXNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgc2VsZWN0ZWQgZGF0ZShzKVxuICAgKlxuICAgKiBJbiBtdWx0aWRhdGUgbW9kZSwgeW91IGNhbiBwYXNzIG11bHRpcGxlIGRhdGVzIGFzIGEgc2VyaWVzIG9mIGFyZ3VtZW50c1xuICAgKiBvciBhbiBhcnJheS4gKFNpbmNlIGVhY2ggZGF0ZSBpcyBwYXJzZWQgaW5kaXZpZHVhbGx5LCB0aGUgdHlwZSBvZiB0aGVcbiAgICogZGF0ZXMgZG9lc24ndCBoYXZlIHRvIGJlIHRoZSBzYW1lLilcbiAgICogVGhlIGdpdmVuIGRhdGVzIGFyZSB1c2VkIHRvIHRvZ2dsZSB0aGUgc2VsZWN0IHN0YXR1cyBvZiBlYWNoIGRhdGUuIFRoZVxuICAgKiBudW1iZXIgb2Ygc2VsZWN0ZWQgZGF0ZXMgaXMga2VwdCBmcm9tIGV4Y2VlZGluZyB0aGUgbGVuZ3RoIHNldCB0b1xuICAgKiBtYXhOdW1iZXJPZkRhdGVzLlxuICAgKlxuICAgKiBXaXRoIGNsZWFyOiB0cnVlIG9wdGlvbiwgdGhlIG1ldGhvZCBjYW4gYmUgdXNlZCB0byBjbGVhciB0aGUgc2VsZWN0aW9uXG4gICAqIGFuZCB0byByZXBsYWNlIHRoZSBzZWxlY3Rpb24gaW5zdGVhZCBvZiB0b2dnbGluZyBpbiBtdWx0aWRhdGUgbW9kZS5cbiAgICogSWYgdGhlIG9wdGlvbiBpcyBwYXNzZWQgd2l0aCBubyBkYXRlIGFyZ3VtZW50cyBvciBhbiBlbXB0eSBkYXRlcyBhcnJheSxcbiAgICogaXQgd29ya3MgYXMgXCJjbGVhclwiIChjbGVhciB0aGUgc2VsZWN0aW9uIHRoZW4gc2V0IG5vdGhpbmcpLCBhbmQgaWYgdGhlXG4gICAqIG9wdGlvbiBpcyBwYXNzZWQgd2l0aCBuZXcgZGF0ZXMgdG8gc2VsZWN0LCBpdCB3b3JrcyBhcyBcInJlcGxhY2VcIiAoY2xlYXJcbiAgICogdGhlIHNlbGVjdGlvbiB0aGVuIHNldCB0aGUgZ2l2ZW4gZGF0ZXMpXG4gICAqXG4gICAqIFdoZW4gcmVuZGVyOiBmYWxzZSBvcHRpb24gaXMgdXNlZCwgdGhlIG1ldGhvZCBvbWl0cyByZS1yZW5kZXJpbmcgdGhlXG4gICAqIHBpY2tlciBlbGVtZW50LiBJbiB0aGlzIGNhc2UsIHlvdSBuZWVkIHRvIGNhbGwgcmVmcmVzaCgpIG1ldGhvZCBsYXRlciBpblxuICAgKiBvcmRlciBmb3IgdGhlIHBpY2tlciBlbGVtZW50IHRvIHJlZmxlY3QgdGhlIGNoYW5nZXMuIFRoZSBpbnB1dCBmaWVsZCBpc1xuICAgKiByZWZyZXNoZWQgYWx3YXlzIHJlZ2FyZGxlc3Mgb2YgdGhpcyBvcHRpb24uXG4gICAqXG4gICAqIFdoZW4gaW52YWxpZCAodW5wYXJzYWJsZSwgcmVwZWF0ZWQsIGRpc2FibGVkIG9yIG91dC1vZi1yYW5nZSkgZGF0ZXMgYXJlXG4gICAqIHBhc3NlZCwgdGhlIG1ldGhvZCBpZ25vcmVzIHRoZW0gYW5kIGFwcGxpZXMgb25seSB2YWxpZCBvbmVzLiBJbiB0aGUgY2FzZVxuICAgKiB0aGF0IGFsbCB0aGUgZ2l2ZW4gZGF0ZXMgYXJlIGludmFsaWQsIHdoaWNoIGlzIGRpc3Rpbmd1aXNoZWQgZnJvbSBwYXNzaW5nXG4gICAqIG5vIGRhdGVzLCB0aGUgbWV0aG9kIGNvbnNpZGVycyBpdCBhcyBhbiBlcnJvciBhbmQgbGVhdmVzIHRoZSBzZWxlY3Rpb25cbiAgICogdW50b3VjaGVkLiAoVGhlIGlucHV0IGZpZWxkIGFsc28gcmVtYWlucyB1bnRvdWNoZWQgdW5sZXNzIHJldmVydDogdHJ1ZVxuICAgKiBvcHRpb24gaXMgdXNlZC4pXG4gICAqXG4gICAqIEBwYXJhbSB7Li4uKERhdGV8TnVtYmVyfFN0cmluZyl8QXJyYXl9IFtkYXRlc10gLSBEYXRlIHN0cmluZ3MsIERhdGVcbiAgICogb2JqZWN0cywgdGltZSB2YWx1ZXMgb3IgbWl4IG9mIHRob3NlIGZvciBuZXcgc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBmdW5jdGlvbiBvcHRpb25zXG4gICAqIC0gY2xlYXI6IHtib29sZWFufSAtIFdoZXRoZXIgdG8gY2xlYXIgdGhlIGV4aXN0aW5nIHNlbGVjdGlvblxuICAgKiAgICAgZGVmdWFsdDogZmFsc2VcbiAgICogLSByZW5kZXI6IHtib29sZWFufSAtIFdoZXRoZXIgdG8gcmUtcmVuZGVyIHRoZSBwaWNrZXIgZWxlbWVudFxuICAgKiAgICAgZGVmYXVsdDogdHJ1ZVxuICAgKiAtIGF1dG9oaWRlOiB7Ym9vbGVhbn0gLSBXaGV0aGVyIHRvIGhpZGUgdGhlIHBpY2tlciBlbGVtZW50IGFmdGVyIHJlLXJlbmRlclxuICAgKiAgICAgSWdub3JlZCB3aGVuIHVzZWQgd2l0aCByZW5kZXI6IGZhbHNlXG4gICAqICAgICBkZWZhdWx0OiBjb25maWcuYXV0b2hpZGVcbiAgICogLSByZXZlcnQ6IHtib29sZWFufSAtIFdoZXRoZXIgdG8gcmVmcmVzaCB0aGUgaW5wdXQgZmllbGQgd2hlbiBhbGwgdGhlXG4gICAqICAgICBwYXNzZWQgZGF0ZXMgYXJlIGludmFsaWRcbiAgICogICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBzZXREYXRlKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBkYXRlcyA9IFsuLi5hcmdzXTtcbiAgICBjb25zdCBvcHRzID0ge307XG4gICAgY29uc3QgbGFzdEFyZyA9IGxhc3RJdGVtT2YoYXJncyk7XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIGxhc3RBcmcgPT09ICdvYmplY3QnXG4gICAgICAmJiAhQXJyYXkuaXNBcnJheShsYXN0QXJnKVxuICAgICAgJiYgIShsYXN0QXJnIGluc3RhbmNlb2YgRGF0ZSlcbiAgICAgICYmIGxhc3RBcmdcbiAgICApIHtcbiAgICAgIE9iamVjdC5hc3NpZ24ob3B0cywgZGF0ZXMucG9wKCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGlucHV0RGF0ZXMgPSBBcnJheS5pc0FycmF5KGRhdGVzWzBdKSA/IGRhdGVzWzBdIDogZGF0ZXM7XG4gICAgc2V0RGF0ZSh0aGlzLCBpbnB1dERhdGVzLCBvcHRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHNlbGVjdGVkIGRhdGUocykgd2l0aCBpbnB1dCBmaWVsZCdzIHZhbHVlXG4gICAqIE5vdCBhdmFpbGFibGUgb24gaW5saW5lIHBpY2tlclxuICAgKlxuICAgKiBUaGUgaW5wdXQgZmllbGQgd2lsbCBiZSByZWZyZXNoZWQgd2l0aCBwcm9wZXJseSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcuXG4gICAqXG4gICAqIEluIHRoZSBjYXNlIHRoYXQgYWxsIHRoZSBlbnRlcmVkIGRhdGVzIGFyZSBpbnZhbGlkICh1bnBhcnNhYmxlLCByZXBlYXRlZCxcbiAgICogZGlzYWJsZWQgb3Igb3V0LW9mLXJhbmdlKSwgd2hpeGggaXMgZGlzdGluZ3Vpc2hlZCBmcm9tIGVtcHR5IGlucHV0IGZpZWxkLFxuICAgKiB0aGUgbWV0aG9kIGxlYXZlcyB0aGUgaW5wdXQgZmllbGQgdW50b3VjaGVkIGFzIHdlbGwgYXMgdGhlIHNlbGVjdGlvbiBieVxuICAgKiBkZWZhdWx0LiBJZiByZXZlcnQ6IHRydWUgb3B0aW9uIGlzIHVzZWQgaW4gdGhpcyBjYXNlLCB0aGUgaW5wdXQgZmllbGQgaXNcbiAgICogcmVmcmVzaGVkIHdpdGggdGhlIGV4aXN0aW5nIHNlbGVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9uc10gLSBmdW5jdGlvbiBvcHRpb25zXG4gICAqIC0gYXV0b2hpZGU6IHtib29sZWFufSAtIHdoZXRoZXIgdG8gaGlkZSB0aGUgcGlja2VyIGVsZW1lbnQgYWZ0ZXIgcmVmcmVzaFxuICAgKiAgICAgZGVmYXVsdDogZmFsc2VcbiAgICogLSByZXZlcnQ6IHtib29sZWFufSAtIFdoZXRoZXIgdG8gcmVmcmVzaCB0aGUgaW5wdXQgZmllbGQgd2hlbiBhbGwgdGhlXG4gICAqICAgICBwYXNzZWQgZGF0ZXMgYXJlIGludmFsaWRcbiAgICogICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICB1cGRhdGUob3B0aW9ucyA9IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLmlubGluZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMgfHwge30sIHtjbGVhcjogdHJ1ZSwgcmVuZGVyOiB0cnVlfSk7XG4gICAgY29uc3QgaW5wdXREYXRlcyA9IHN0cmluZ1RvQXJyYXkodGhpcy5pbnB1dEZpZWxkLnZhbHVlLCB0aGlzLmNvbmZpZy5kYXRlRGVsaW1pdGVyKTtcbiAgICBzZXREYXRlKHRoaXMsIGlucHV0RGF0ZXMsIG9wdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2ggdGhlIHBpY2tlciBlbGVtZW50IGFuZCB0aGUgYXNzb2NpYXRlZCBpbnB1dCBmaWVsZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3RhcmdldF0gLSB0YXJnZXQgaXRlbSB3aGVuIHJlZnJlc2hpbmcgb25lIGl0ZW0gb25seVxuICAgKiAncGlja2VyJyBvciAnaW5wdXQnXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZvcmNlUmVuZGVyXSAtIHdoZXRoZXIgdG8gcmUtcmVuZGVyIHRoZSBwaWNrZXIgZWxlbWVudFxuICAgKiByZWdhcmRsZXNzIG9mIGl0cyBzdGF0ZSBpbnN0ZWFkIG9mIG9wdGltaXplZCByZWZyZXNoXG4gICAqL1xuICByZWZyZXNoKHRhcmdldCA9IHVuZGVmaW5lZCwgZm9yY2VSZW5kZXIgPSBmYWxzZSkge1xuICAgIGlmICh0YXJnZXQgJiYgdHlwZW9mIHRhcmdldCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGZvcmNlUmVuZGVyID0gdGFyZ2V0O1xuICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGxldCBtb2RlO1xuICAgIGlmICh0YXJnZXQgPT09ICdwaWNrZXInKSB7XG4gICAgICBtb2RlID0gMjtcbiAgICB9IGVsc2UgaWYgKHRhcmdldCA9PT0gJ2lucHV0Jykge1xuICAgICAgbW9kZSA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vZGUgPSAzO1xuICAgIH1cbiAgICByZWZyZXNoVUkodGhpcywgbW9kZSwgIWZvcmNlUmVuZGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnRlciBlZGl0IG1vZGVcbiAgICogTm90IGF2YWlsYWJsZSBvbiBpbmxpbmUgcGlja2VyIG9yIHdoZW4gdGhlIHBpY2tlciBlbGVtZW50IGlzIGhpZGRlblxuICAgKi9cbiAgZW50ZXJFZGl0TW9kZSgpIHtcbiAgICBpZiAodGhpcy5pbmxpbmUgfHwgIXRoaXMucGlja2VyLmFjdGl2ZSB8fCB0aGlzLmVkaXRNb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZWRpdE1vZGUgPSB0cnVlO1xuICAgIHRoaXMuaW5wdXRGaWVsZC5jbGFzc0xpc3QuYWRkKCdpbi1lZGl0Jyk7XG4gIH1cblxuICAvKipcbiAgICogRXhpdCBmcm9tIGVkaXQgbW9kZVxuICAgKiBOb3QgYXZhaWxhYmxlIG9uIGlubGluZSBwaWNrZXJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9uc10gLSBmdW5jdGlvbiBvcHRpb25zXG4gICAqIC0gdXBkYXRlOiB7Ym9vbGVhbn0gLSB3aGV0aGVyIHRvIGNhbGwgdXBkYXRlKCkgYWZ0ZXIgZXhpdGluZ1xuICAgKiAgICAgSWYgZmFsc2UsIGlucHV0IGZpZWxkIGlzIHJldmVydCB0byB0aGUgZXhpc3Rpbmcgc2VsZWN0aW9uXG4gICAqICAgICBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgZXhpdEVkaXRNb2RlKG9wdGlvbnMgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpcy5pbmxpbmUgfHwgIXRoaXMuZWRpdE1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe3VwZGF0ZTogZmFsc2V9LCBvcHRpb25zKTtcbiAgICBkZWxldGUgdGhpcy5lZGl0TW9kZTtcbiAgICB0aGlzLmlucHV0RmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnaW4tZWRpdCcpO1xuICAgIGlmIChvcHRzLnVwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGUob3B0cyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge2xpbWl0VG9SYW5nZX0gZnJvbSAnLi4vbGliL3V0aWxzLmpzJztcbmltcG9ydCB7YWRkTW9udGhzLCBhZGRZZWFyc30gZnJvbSAnLi4vbGliL2RhdGUuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlckRhdGVwaWNrZXJFdmVudChkYXRlcGlja2VyLCB0eXBlKSB7XG4gIGNvbnN0IGRldGFpbCA9IHtcbiAgICBkYXRlOiBkYXRlcGlja2VyLmdldERhdGUoKSxcbiAgICB2aWV3RGF0ZTogbmV3IERhdGUoZGF0ZXBpY2tlci5waWNrZXIudmlld0RhdGUpLFxuICAgIHZpZXdJZDogZGF0ZXBpY2tlci5waWNrZXIuY3VycmVudFZpZXcuaWQsXG4gICAgZGF0ZXBpY2tlcixcbiAgfTtcbiAgZGF0ZXBpY2tlci5lbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KHR5cGUsIHtkZXRhaWx9KSk7XG59XG5cbi8vIGRpcmVjdGlvbjogLTEgKHRvIHByZXZpb3VzKSwgMSAodG8gbmV4dClcbmV4cG9ydCBmdW5jdGlvbiBnb1RvUHJldk9yTmV4dChkYXRlcGlja2VyLCBkaXJlY3Rpb24pIHtcbiAgY29uc3Qge21pbkRhdGUsIG1heERhdGV9ID0gZGF0ZXBpY2tlci5jb25maWc7XG4gIGNvbnN0IHtjdXJyZW50Vmlldywgdmlld0RhdGV9ID0gZGF0ZXBpY2tlci5waWNrZXI7XG4gIGxldCBuZXdWaWV3RGF0ZTtcbiAgc3dpdGNoIChjdXJyZW50Vmlldy5pZCkge1xuICAgIGNhc2UgMDpcbiAgICAgIG5ld1ZpZXdEYXRlID0gYWRkTW9udGhzKHZpZXdEYXRlLCBkaXJlY3Rpb24pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgbmV3Vmlld0RhdGUgPSBhZGRZZWFycyh2aWV3RGF0ZSwgZGlyZWN0aW9uKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBuZXdWaWV3RGF0ZSA9IGFkZFllYXJzKHZpZXdEYXRlLCBkaXJlY3Rpb24gKiBjdXJyZW50Vmlldy5uYXZTdGVwKTtcbiAgfVxuICBuZXdWaWV3RGF0ZSA9IGxpbWl0VG9SYW5nZShuZXdWaWV3RGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGRhdGVwaWNrZXIucGlja2VyLmNoYW5nZUZvY3VzKG5ld1ZpZXdEYXRlKS5yZW5kZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaFZpZXcoZGF0ZXBpY2tlcikge1xuICBjb25zdCB2aWV3SWQgPSBkYXRlcGlja2VyLnBpY2tlci5jdXJyZW50Vmlldy5pZDtcbiAgaWYgKHZpZXdJZCA9PT0gZGF0ZXBpY2tlci5jb25maWcubWF4Vmlldykge1xuICAgIHJldHVybjtcbiAgfVxuICBkYXRlcGlja2VyLnBpY2tlci5jaGFuZ2VWaWV3KHZpZXdJZCArIDEpLnJlbmRlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5mb2N1cyhkYXRlcGlja2VyKSB7XG4gIGlmIChkYXRlcGlja2VyLmNvbmZpZy51cGRhdGVPbkJsdXIpIHtcbiAgICBkYXRlcGlja2VyLnVwZGF0ZSh7cmV2ZXJ0OiB0cnVlfSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0ZXBpY2tlci5yZWZyZXNoKCdpbnB1dCcpO1xuICB9XG4gIGRhdGVwaWNrZXIuaGlkZSgpO1xufVxuIiwiaW1wb3J0IHtpc0luUmFuZ2V9IGZyb20gJy4uL2xpYi91dGlscy5qcyc7XG5pbXBvcnQge2lzQWN0aXZlRWxlbWVudH0gZnJvbSAnLi4vbGliL2RvbS5qcyc7XG5pbXBvcnQge2FkZERheXMsIGFkZE1vbnRocywgYWRkWWVhcnMsIHN0YXJ0T2ZZZWFyUGVyaW9kfSBmcm9tICcuLi9saWIvZGF0ZS5qcyc7XG5pbXBvcnQge2dvVG9QcmV2T3JOZXh0LCBzd2l0Y2hWaWV3LCB1bmZvY3VzfSBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5cbi8vIEZpbmQgdGhlIGNsb3Nlc3QgZGF0ZSB0aGF0IGRvZXNuJ3QgbWVldCB0aGUgY29uZGl0aW9uIGZvciB1bmF2YWlsYWJsZSBkYXRlXG4vLyBSZXR1cm5zIHVuZGVmaW5lZCBpZiBubyBhdmFpbGFibGUgZGF0ZSBpcyBmb3VuZFxuLy8gYWRkRm46IGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSB0aGUgbmV4dCBkYXRlXG4vLyAgIC0gYXJnczogdGltZSB2YWx1ZSwgYW1vdW50XG4vLyBpbmNyZWFzZTogYW1vdW50IHRvIHBhc3MgdG8gYWRkRm5cbi8vIHRlc3RGbjogZnVuY3Rpb24gdG8gdGVzdCB0aGUgdW5hdmFpbGFibGl0eSBvZiB0aGUgZGF0ZVxuLy8gICAtIGFyZ3M6IHRpbWUgdmFsdWU7IHJldHVuOiB0cnVlIGlmIHVuYXZhaWxhYmxlXG5mdW5jdGlvbiBmaW5kTmV4dEF2YWlsYWJsZU9uZShkYXRlLCBhZGRGbiwgaW5jcmVhc2UsIHRlc3RGbiwgbWluLCBtYXgpIHtcbiAgaWYgKCFpc0luUmFuZ2UoZGF0ZSwgbWluLCBtYXgpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0ZXN0Rm4oZGF0ZSkpIHtcbiAgICBjb25zdCBuZXdEYXRlID0gYWRkRm4oZGF0ZSwgaW5jcmVhc2UpO1xuICAgIHJldHVybiBmaW5kTmV4dEF2YWlsYWJsZU9uZShuZXdEYXRlLCBhZGRGbiwgaW5jcmVhc2UsIHRlc3RGbiwgbWluLCBtYXgpO1xuICB9XG4gIHJldHVybiBkYXRlO1xufVxuXG4vLyBkaXJlY3Rpb246IC0xIChsZWZ0L3VwKSwgMSAocmlnaHQvZG93bilcbi8vIHZlcnRpY2FsOiB0cnVlIGZvciB1cC9kb3duLCBmYWxzZSBmb3IgbGVmdC9yaWdodFxuZnVuY3Rpb24gbW92ZUJ5QXJyb3dLZXkoZGF0ZXBpY2tlciwgZXYsIGRpcmVjdGlvbiwgdmVydGljYWwpIHtcbiAgY29uc3QgcGlja2VyID0gZGF0ZXBpY2tlci5waWNrZXI7XG4gIGNvbnN0IGN1cnJlbnRWaWV3ID0gcGlja2VyLmN1cnJlbnRWaWV3O1xuICBjb25zdCBzdGVwID0gY3VycmVudFZpZXcuc3RlcCB8fCAxO1xuICBsZXQgdmlld0RhdGUgPSBwaWNrZXIudmlld0RhdGU7XG4gIGxldCBhZGRGbjtcbiAgbGV0IHRlc3RGbjtcbiAgc3dpdGNoIChjdXJyZW50Vmlldy5pZCkge1xuICAgIGNhc2UgMDpcbiAgICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgICB2aWV3RGF0ZSA9IGFkZERheXModmlld0RhdGUsIGRpcmVjdGlvbiAqIDcpO1xuICAgICAgfSBlbHNlIGlmIChldi5jdHJsS2V5IHx8IGV2Lm1ldGFLZXkpIHtcbiAgICAgICAgdmlld0RhdGUgPSBhZGRZZWFycyh2aWV3RGF0ZSwgZGlyZWN0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZpZXdEYXRlID0gYWRkRGF5cyh2aWV3RGF0ZSwgZGlyZWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIGFkZEZuID0gYWRkRGF5cztcbiAgICAgIHRlc3RGbiA9IChkYXRlKSA9PiBjdXJyZW50Vmlldy5kaXNhYmxlZC5pbmNsdWRlcyhkYXRlKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTpcbiAgICAgIHZpZXdEYXRlID0gYWRkTW9udGhzKHZpZXdEYXRlLCB2ZXJ0aWNhbCA/IGRpcmVjdGlvbiAqIDQgOiBkaXJlY3Rpb24pO1xuICAgICAgYWRkRm4gPSBhZGRNb250aHM7XG4gICAgICB0ZXN0Rm4gPSAoZGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBkdCA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICBjb25zdCB7eWVhciwgZGlzYWJsZWR9ID0gY3VycmVudFZpZXc7XG4gICAgICAgIHJldHVybiBkdC5nZXRGdWxsWWVhcigpID09PSB5ZWFyICYmIGRpc2FibGVkLmluY2x1ZGVzKGR0LmdldE1vbnRoKCkpO1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB2aWV3RGF0ZSA9IGFkZFllYXJzKHZpZXdEYXRlLCBkaXJlY3Rpb24gKiAodmVydGljYWwgPyA0IDogMSkgKiBzdGVwKTtcbiAgICAgIGFkZEZuID0gYWRkWWVhcnM7XG4gICAgICB0ZXN0Rm4gPSBkYXRlID0+IGN1cnJlbnRWaWV3LmRpc2FibGVkLmluY2x1ZGVzKHN0YXJ0T2ZZZWFyUGVyaW9kKGRhdGUsIHN0ZXApKTtcbiAgfVxuICB2aWV3RGF0ZSA9IGZpbmROZXh0QXZhaWxhYmxlT25lKFxuICAgIHZpZXdEYXRlLFxuICAgIGFkZEZuLFxuICAgIGRpcmVjdGlvbiA8IDAgPyAtc3RlcCA6IHN0ZXAsXG4gICAgdGVzdEZuLFxuICAgIGN1cnJlbnRWaWV3Lm1pbkRhdGUsXG4gICAgY3VycmVudFZpZXcubWF4RGF0ZVxuICApO1xuICBpZiAodmlld0RhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHBpY2tlci5jaGFuZ2VGb2N1cyh2aWV3RGF0ZSkucmVuZGVyKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uS2V5ZG93bihkYXRlcGlja2VyLCBldikge1xuICBjb25zdCBrZXkgPSBldi5rZXk7XG4gIGlmIChrZXkgPT09ICdUYWInKSB7XG4gICAgdW5mb2N1cyhkYXRlcGlja2VyKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBwaWNrZXIgPSBkYXRlcGlja2VyLnBpY2tlcjtcbiAgY29uc3Qge2lkLCBpc01pblZpZXd9ID0gcGlja2VyLmN1cnJlbnRWaWV3O1xuICBpZiAoIXBpY2tlci5hY3RpdmUpIHtcbiAgICBpZiAoa2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgcGlja2VyLnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBkYXRlcGlja2VyLnVwZGF0ZSgpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIHBpY2tlci5zaG93KCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2UgaWYgKGRhdGVwaWNrZXIuZWRpdE1vZGUpIHtcbiAgICBpZiAoa2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBkYXRlcGlja2VyLmV4aXRFZGl0TW9kZSh7dXBkYXRlOiB0cnVlLCBhdXRvaGlkZTogZGF0ZXBpY2tlci5jb25maWcuYXV0b2hpZGV9KTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgIHBpY2tlci5oaWRlKCk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfSBlbHNlIHtcbiAgICBpZiAoa2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgaWYgKGV2LmN0cmxLZXkgfHwgZXYubWV0YUtleSkge1xuICAgICAgICBnb1RvUHJldk9yTmV4dChkYXRlcGlja2VyLCAtMSk7XG4gICAgICB9IGVsc2UgaWYgKGV2LnNoaWZ0S2V5KSB7XG4gICAgICAgIGRhdGVwaWNrZXIuZW50ZXJFZGl0TW9kZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb3ZlQnlBcnJvd0tleShkYXRlcGlja2VyLCBldiwgLTEsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICBpZiAoZXYuY3RybEtleSB8fCBldi5tZXRhS2V5KSB7XG4gICAgICAgIGdvVG9QcmV2T3JOZXh0KGRhdGVwaWNrZXIsIDEpO1xuICAgICAgfSBlbHNlIGlmIChldi5zaGlmdEtleSkge1xuICAgICAgICBkYXRlcGlja2VyLmVudGVyRWRpdE1vZGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW92ZUJ5QXJyb3dLZXkoZGF0ZXBpY2tlciwgZXYsIDEsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICBpZiAoZXYuY3RybEtleSB8fCBldi5tZXRhS2V5KSB7XG4gICAgICAgIHN3aXRjaFZpZXcoZGF0ZXBpY2tlcik7XG4gICAgICB9IGVsc2UgaWYgKGV2LnNoaWZ0S2V5KSB7XG4gICAgICAgIGRhdGVwaWNrZXIuZW50ZXJFZGl0TW9kZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb3ZlQnlBcnJvd0tleShkYXRlcGlja2VyLCBldiwgLTEsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgaWYgKGV2LnNoaWZ0S2V5ICYmICFldi5jdHJsS2V5ICYmICFldi5tZXRhS2V5KSB7XG4gICAgICAgIGRhdGVwaWNrZXIuZW50ZXJFZGl0TW9kZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBtb3ZlQnlBcnJvd0tleShkYXRlcGlja2VyLCBldiwgMSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIGlmIChpc01pblZpZXcpIHtcbiAgICAgICAgZGF0ZXBpY2tlci5zZXREYXRlKHBpY2tlci52aWV3RGF0ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHBpY2tlci5jaGFuZ2VWaWV3KGlkIC0gMSkucmVuZGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChrZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIHBpY2tlci5oaWRlKCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBrZXkgPT09ICdCYWNrc3BhY2UnXG4gICAgICAgIHx8IGtleSA9PT0gJ0RlbGV0ZSdcbiAgICAgICAgfHwgKGtleS5sZW5ndGggPT09IDEgJiYgIWV2LmN0cmxLZXkgJiYgIWV2Lm1ldGFLZXkpXG4gICAgICApIHtcbiAgICAgICAgZGF0ZXBpY2tlci5lbnRlckVkaXRNb2RlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkZvY3VzKGRhdGVwaWNrZXIpIHtcbiAgaWYgKGRhdGVwaWNrZXIuY29uZmlnLnNob3dPbkZvY3VzICYmICFkYXRlcGlja2VyLl9zaG93aW5nKSB7XG4gICAgZGF0ZXBpY2tlci5zaG93KCk7XG4gIH1cbn1cblxuLy8gZm9yIHRoZSBwcmV2ZW50aW9uIGZvciBlbnRlcmluZyBlZGl0IG1vZGUgd2hpbGUgZ2V0dGluZyBmb2N1cyBvbiBjbGlja1xuZXhwb3J0IGZ1bmN0aW9uIG9uTW91c2Vkb3duKGRhdGVwaWNrZXIsIGV2KSB7XG4gIGNvbnN0IGVsID0gZXYudGFyZ2V0O1xuICBpZiAoZGF0ZXBpY2tlci5waWNrZXIuYWN0aXZlIHx8IGRhdGVwaWNrZXIuY29uZmlnLnNob3dPbkNsaWNrKSB7XG4gICAgZWwuX2FjdGl2ZSA9IGlzQWN0aXZlRWxlbWVudChlbCk7XG4gICAgZWwuX2NsaWNraW5nID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkZWxldGUgZWwuX2FjdGl2ZTtcbiAgICAgIGRlbGV0ZSBlbC5fY2xpY2tpbmc7XG4gICAgfSwgMjAwMCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2xpY2tJbnB1dChkYXRlcGlja2VyLCBldikge1xuICBjb25zdCBlbCA9IGV2LnRhcmdldDtcbiAgaWYgKCFlbC5fY2xpY2tpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY2xlYXJUaW1lb3V0KGVsLl9jbGlja2luZyk7XG4gIGRlbGV0ZSBlbC5fY2xpY2tpbmc7XG5cbiAgaWYgKGVsLl9hY3RpdmUpIHtcbiAgICBkYXRlcGlja2VyLmVudGVyRWRpdE1vZGUoKTtcbiAgfVxuICBkZWxldGUgZWwuX2FjdGl2ZTtcblxuICBpZiAoZGF0ZXBpY2tlci5jb25maWcuc2hvd09uQ2xpY2spIHtcbiAgICBkYXRlcGlja2VyLnNob3coKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb25QYXN0ZShkYXRlcGlja2VyLCBldikge1xuICBpZiAoZXYuY2xpcGJvYXJkRGF0YS50eXBlcy5pbmNsdWRlcygndGV4dC9wbGFpbicpKSB7XG4gICAgZGF0ZXBpY2tlci5lbnRlckVkaXRNb2RlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7aXNBY3RpdmVFbGVtZW50fSBmcm9tICcuLi9saWIvZG9tLmpzJztcbmltcG9ydCB7ZmluZEVsZW1lbnRJbkV2ZW50UGF0aH0gZnJvbSAnLi4vbGliL2V2ZW50LmpzJztcbmltcG9ydCB7dW5mb2N1c30gZnJvbSAnLi9mdW5jdGlvbnMuanMnO1xuXG4vLyBmb3IgdGhlIGBkb2N1bWVudGAgdG8gZGVsZWdhdGUgdGhlIGV2ZW50cyBmcm9tIG91dHNpZGUgdGhlIHBpY2tlci9pbnB1dCBmaWVsZFxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2xpY2tPdXRzaWRlKGRhdGVwaWNrZXIsIGV2KSB7XG4gIGNvbnN0IHtlbGVtZW50LCBwaWNrZXJ9ID0gZGF0ZXBpY2tlcjtcbiAgLy8gY2hlY2sgYm90aCBwaWNrZXIncyBhbmQgaW5wdXQncyBhY3RpdmVuZXNzIHRvIG1ha2UgdXBkYXRlT25CbHVyIHdvcmsgaW5cbiAgLy8gdGhlIGNhc2VzIHdoZXJlLi4uXG4gIC8vIC0gcGlja2VyIGlzIGhpZGRlbiBieSBFU0Mga2V5IHByZXNzIOKGkiBpbnB1dCBzdGF5cyBmb2N1c2VkXG4gIC8vIC0gaW5wdXQgaXMgdW5mb2N1c2VkIGJ5IGNsb3NpbmcgbW9iaWxlIGtleWJvYXJkIOKGkiBwaWtlciBpcyBrZXB0IHNob3duXG4gIGlmICghcGlja2VyLmFjdGl2ZSAmJiAhaXNBY3RpdmVFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHBpY2tlckVsZW0gPSBwaWNrZXIuZWxlbWVudDtcbiAgaWYgKGZpbmRFbGVtZW50SW5FdmVudFBhdGgoZXYsIGVsID0+IGVsID09PSBlbGVtZW50IHx8IGVsID09PSBwaWNrZXJFbGVtKSkge1xuICAgIHJldHVybjtcbiAgfVxuICB1bmZvY3VzKGRhdGVwaWNrZXIpO1xufVxuIiwiaW1wb3J0IHt0b2RheSwgYWRkTW9udGhzLCBhZGRZZWFyc30gZnJvbSAnLi4vbGliL2RhdGUuanMnO1xuaW1wb3J0IHtmaW5kRWxlbWVudEluRXZlbnRQYXRofSBmcm9tICcuLi9saWIvZXZlbnQuanMnO1xuaW1wb3J0IHtnb1RvUHJldk9yTmV4dCwgc3dpdGNoVmlld30gZnJvbSAnLi9mdW5jdGlvbnMuanMnO1xuXG5mdW5jdGlvbiBnb1RvU2VsZWN0ZWRNb250aE9yWWVhcihkYXRlcGlja2VyLCBzZWxlY3Rpb24pIHtcbiAgY29uc3QgcGlja2VyID0gZGF0ZXBpY2tlci5waWNrZXI7XG4gIGNvbnN0IHZpZXdEYXRlID0gbmV3IERhdGUocGlja2VyLnZpZXdEYXRlKTtcbiAgY29uc3Qgdmlld0lkID0gcGlja2VyLmN1cnJlbnRWaWV3LmlkO1xuICBjb25zdCBuZXdEYXRlID0gdmlld0lkID09PSAxXG4gICAgPyBhZGRNb250aHModmlld0RhdGUsIHNlbGVjdGlvbiAtIHZpZXdEYXRlLmdldE1vbnRoKCkpXG4gICAgOiBhZGRZZWFycyh2aWV3RGF0ZSwgc2VsZWN0aW9uIC0gdmlld0RhdGUuZ2V0RnVsbFllYXIoKSk7XG5cbiAgcGlja2VyLmNoYW5nZUZvY3VzKG5ld0RhdGUpLmNoYW5nZVZpZXcodmlld0lkIC0gMSkucmVuZGVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNsaWNrVG9kYXlCdG4oZGF0ZXBpY2tlcikge1xuICBjb25zdCBwaWNrZXIgPSBkYXRlcGlja2VyLnBpY2tlcjtcbiAgY29uc3QgY3VycmVudERhdGUgPSB0b2RheSgpO1xuICBpZiAoZGF0ZXBpY2tlci5jb25maWcudG9kYXlCdG5Nb2RlID09PSAxKSB7XG4gICAgaWYgKGRhdGVwaWNrZXIuY29uZmlnLmF1dG9oaWRlKSB7XG4gICAgICBkYXRlcGlja2VyLnNldERhdGUoY3VycmVudERhdGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkYXRlcGlja2VyLnNldERhdGUoY3VycmVudERhdGUsIHtyZW5kZXI6IGZhbHNlfSk7XG4gICAgcGlja2VyLnVwZGF0ZSgpO1xuICB9XG4gIGlmIChwaWNrZXIudmlld0RhdGUgIT09IGN1cnJlbnREYXRlKSB7XG4gICAgcGlja2VyLmNoYW5nZUZvY3VzKGN1cnJlbnREYXRlKTtcbiAgfVxuICBwaWNrZXIuY2hhbmdlVmlldygwKS5yZW5kZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2xpY2tDbGVhckJ0bihkYXRlcGlja2VyKSB7XG4gIGRhdGVwaWNrZXIuc2V0RGF0ZSh7Y2xlYXI6IHRydWV9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2xpY2tWaWV3U3dpdGNoKGRhdGVwaWNrZXIpIHtcbiAgc3dpdGNoVmlldyhkYXRlcGlja2VyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2xpY2tQcmV2QnRuKGRhdGVwaWNrZXIpIHtcbiAgZ29Ub1ByZXZPck5leHQoZGF0ZXBpY2tlciwgLTEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25DbGlja05leHRCdG4oZGF0ZXBpY2tlcikge1xuICBnb1RvUHJldk9yTmV4dChkYXRlcGlja2VyLCAxKTtcbn1cblxuLy8gRm9yIHRoZSBwaWNrZXIncyBtYWluIGJsb2NrIHRvIGRlbGVnZXRlIHRoZSBldmVudHMgZnJvbSBgZGF0ZXBpY2tlci1jZWxsYHNcbmV4cG9ydCBmdW5jdGlvbiBvbkNsaWNrVmlldyhkYXRlcGlja2VyLCBldikge1xuICBjb25zdCB0YXJnZXQgPSBmaW5kRWxlbWVudEluRXZlbnRQYXRoKGV2LCAnLmRhdGVwaWNrZXItY2VsbCcpO1xuICBpZiAoIXRhcmdldCB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qge2lkLCBpc01pblZpZXd9ID0gZGF0ZXBpY2tlci5waWNrZXIuY3VycmVudFZpZXc7XG4gIGlmIChpc01pblZpZXcpIHtcbiAgICBkYXRlcGlja2VyLnNldERhdGUoTnVtYmVyKHRhcmdldC5kYXRhc2V0LmRhdGUpKTtcbiAgfSBlbHNlIGlmIChpZCA9PT0gMSkge1xuICAgIGdvVG9TZWxlY3RlZE1vbnRoT3JZZWFyKGRhdGVwaWNrZXIsIE51bWJlcih0YXJnZXQuZGF0YXNldC5tb250aCkpO1xuICB9IGVsc2Uge1xuICAgIGdvVG9TZWxlY3RlZE1vbnRoT3JZZWFyKGRhdGVwaWNrZXIsIE51bWJlcih0YXJnZXQuZGF0YXNldC55ZWFyKSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uTW91c2Vkb3duUGlja2VyKGV2KSB7XG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XG59XG4iLCIvLyBkZWZhdWx0IGxvY2FsZXNcbmV4cG9ydCBjb25zdCBsb2NhbGVzID0ge1xuICBlbjoge1xuICAgIGRheXM6IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdLFxuICAgIGRheXNTaG9ydDogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxuICAgIGRheXNNaW46IFtcIlN1XCIsIFwiTW9cIiwgXCJUdVwiLCBcIldlXCIsIFwiVGhcIiwgXCJGclwiLCBcIlNhXCJdLFxuICAgIG1vbnRoczogW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl0sXG4gICAgbW9udGhzU2hvcnQ6IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXSxcbiAgICB0b2RheTogXCJUb2RheVwiLFxuICAgIGNsZWFyOiBcIkNsZWFyXCIsXG4gICAgdGl0bGVGb3JtYXQ6IFwiTU0geVwiXG4gIH1cbn07XG4iLCJpbXBvcnQge3N0cmlwVGltZSwgdG9kYXl9IGZyb20gJy4vZGF0ZS5qcyc7XG5pbXBvcnQge2xhc3RJdGVtT2Z9IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vLyBwYXR0ZXJuIGZvciBmb3JtYXQgcGFydHNcbmV4cG9ydCBjb25zdCByZUZvcm1hdFRva2VucyA9IC9kZD98REQ/fG1tP3xNTT98eXk/KD86eXkpPy87XG4vLyBwYXR0ZXJuIGZvciBub24gZGF0ZSBwYXJ0c1xuZXhwb3J0IGNvbnN0IHJlTm9uRGF0ZVBhcnRzID0gL1tcXHMhLS86LUBbLWB7LX7lubTmnIjml6VdKy87XG4vLyBjYWNoZSBmb3IgcGVyc2VkIGZvcm1hdHNcbmxldCBrbm93bkZvcm1hdHMgPSB7fTtcbi8vIHBhcnNlIGZ1bnRpb25zIGZvciBkYXRlIHBhcnRzXG5jb25zdCBwYXJzZUZucyA9IHtcbiAgeShkYXRlLCB5ZWFyKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUpLnNldEZ1bGxZZWFyKHBhcnNlSW50KHllYXIsIDEwKSk7XG4gIH0sXG4gIG0oZGF0ZSwgbW9udGgsIGxvY2FsZSkge1xuICAgIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICBsZXQgbW9udGhJbmRleCA9IHBhcnNlSW50KG1vbnRoLCAxMCkgLSAxO1xuXG4gICAgaWYgKGlzTmFOKG1vbnRoSW5kZXgpKSB7XG4gICAgICBpZiAoIW1vbnRoKSB7XG4gICAgICAgIHJldHVybiBOYU47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1vbnRoTmFtZSA9IG1vbnRoLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBjb21wYXJlTmFtZXMgPSBuYW1lID0+IG5hbWUudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKG1vbnRoTmFtZSk7XG4gICAgICAvLyBjb21wYXJlIHdpdGggYm90aCBzaG9ydCBhbmQgZnVsbCBuYW1lcyBiZWNhdXNlIHNvbWUgbG9jYWxlcyBoYXZlIHBlcmlvZHNcbiAgICAgIC8vIGluIHRoZSBzaG9ydCBuYW1lcyAobm90IGVxdWFsIHRvIHRoZSBmaXJzdCBYIGxldHRlcnMgb2YgdGhlIGZ1bGwgbmFtZXMpXG4gICAgICBtb250aEluZGV4ID0gbG9jYWxlLm1vbnRoc1Nob3J0LmZpbmRJbmRleChjb21wYXJlTmFtZXMpO1xuICAgICAgaWYgKG1vbnRoSW5kZXggPCAwKSB7XG4gICAgICAgIG1vbnRoSW5kZXggPSBsb2NhbGUubW9udGhzLmZpbmRJbmRleChjb21wYXJlTmFtZXMpO1xuICAgICAgfVxuICAgICAgaWYgKG1vbnRoSW5kZXggPCAwKSB7XG4gICAgICAgIHJldHVybiBOYU47XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmV3RGF0ZS5zZXRNb250aChtb250aEluZGV4KTtcbiAgICByZXR1cm4gbmV3RGF0ZS5nZXRNb250aCgpICE9PSBub3JtYWxpemVNb250aChtb250aEluZGV4KVxuICAgICAgPyBuZXdEYXRlLnNldERhdGUoMClcbiAgICAgIDogbmV3RGF0ZS5nZXRUaW1lKCk7XG4gIH0sXG4gIGQoZGF0ZSwgZGF5KSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUpLnNldERhdGUocGFyc2VJbnQoZGF5LCAxMCkpO1xuICB9LFxufTtcbi8vIGZvcm1hdCBmdW5jdGlvbnMgZm9yIGRhdGUgcGFydHNcbmNvbnN0IGZvcm1hdEZucyA9IHtcbiAgZChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpO1xuICB9LFxuICBkZChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZFplcm8oZGF0ZS5nZXREYXRlKCksIDIpO1xuICB9LFxuICBEKGRhdGUsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUuZGF5c1Nob3J0W2RhdGUuZ2V0RGF5KCldO1xuICB9LFxuICBERChkYXRlLCBsb2NhbGUpIHtcbiAgICByZXR1cm4gbG9jYWxlLmRheXNbZGF0ZS5nZXREYXkoKV07XG4gIH0sXG4gIG0oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICB9LFxuICBtbShkYXRlKSB7XG4gICAgcmV0dXJuIHBhZFplcm8oZGF0ZS5nZXRNb250aCgpICsgMSwgMik7XG4gIH0sXG4gIE0oZGF0ZSwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5tb250aHNTaG9ydFtkYXRlLmdldE1vbnRoKCldO1xuICB9LFxuICBNTShkYXRlLCBsb2NhbGUpIHtcbiAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1tkYXRlLmdldE1vbnRoKCldO1xuICB9LFxuICB5KGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICB9LFxuICB5eShkYXRlKSB7XG4gICAgcmV0dXJuIHBhZFplcm8oZGF0ZS5nZXRGdWxsWWVhcigpLCAyKS5zbGljZSgtMik7XG4gIH0sXG4gIHl5eXkoZGF0ZSkge1xuICAgIHJldHVybiBwYWRaZXJvKGRhdGUuZ2V0RnVsbFllYXIoKSwgNCk7XG4gIH0sXG59O1xuXG4vLyBnZXQgbW9udGggaW5kZXggaW4gbm9ybWFsIHJhbmdlICgwIC0gMTEpIGZyb20gYW55IG51bWJlclxuZnVuY3Rpb24gbm9ybWFsaXplTW9udGgobW9udGhJbmRleCkge1xuICByZXR1cm4gbW9udGhJbmRleCA+IC0xID8gbW9udGhJbmRleCAlIDEyIDogbm9ybWFsaXplTW9udGgobW9udGhJbmRleCArIDEyKTtcbn1cblxuZnVuY3Rpb24gcGFkWmVybyhudW0sIGxlbmd0aCkge1xuICByZXR1cm4gbnVtLnRvU3RyaW5nKCkucGFkU3RhcnQobGVuZ3RoLCAnMCcpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUZvcm1hdFN0cmluZyhmb3JtYXQpIHtcbiAgaWYgKHR5cGVvZiBmb3JtYXQgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlIGZvcm1hdC5cIik7XG4gIH1cbiAgaWYgKGZvcm1hdCBpbiBrbm93bkZvcm1hdHMpIHtcbiAgICByZXR1cm4ga25vd25Gb3JtYXRzW2Zvcm1hdF07XG4gIH1cblxuICAvLyBzcHJpdCB0aGUgZm9ybWF0IHN0cmluZyBpbnRvIHBhcnRzIGFuZCBzZXByYXRvcnNcbiAgY29uc3Qgc2VwYXJhdG9ycyA9IGZvcm1hdC5zcGxpdChyZUZvcm1hdFRva2Vucyk7XG4gIGNvbnN0IHBhcnRzID0gZm9ybWF0Lm1hdGNoKG5ldyBSZWdFeHAocmVGb3JtYXRUb2tlbnMsICdnJykpO1xuICBpZiAoc2VwYXJhdG9ycy5sZW5ndGggPT09IDAgfHwgIXBhcnRzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlIGZvcm1hdC5cIik7XG4gIH1cblxuICAvLyBjb2xsZWN0IGZvcm1hdCBmdW5jdGlvbnMgdXNlZCBpbiB0aGUgZm9ybWF0XG4gIGNvbnN0IHBhcnRGb3JtYXR0ZXJzID0gcGFydHMubWFwKHRva2VuID0+IGZvcm1hdEZuc1t0b2tlbl0pO1xuXG4gIC8vIGNvbGxlY3QgcGFyc2UgZnVuY3Rpb24ga2V5cyB1c2VkIGluIHRoZSBmb3JtYXRcbiAgLy8gaXRlcmF0ZSBvdmVyIHBhcnNlRm5zJyBrZXlzIGluIG9yZGVyIHRvIGtlZXAgdGhlIG9yZGVyIG9mIHRoZSBrZXlzLlxuICBjb25zdCBwYXJ0UGFyc2VyS2V5cyA9IE9iamVjdC5rZXlzKHBhcnNlRm5zKS5yZWR1Y2UoKGtleXMsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRva2VuID0gcGFydHMuZmluZChwYXJ0ID0+IHBhcnRbMF0gIT09ICdEJyAmJiBwYXJ0WzBdLnRvTG93ZXJDYXNlKCkgPT09IGtleSk7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG4gIH0sIFtdKTtcblxuICByZXR1cm4ga25vd25Gb3JtYXRzW2Zvcm1hdF0gPSB7XG4gICAgcGFyc2VyKGRhdGVTdHIsIGxvY2FsZSkge1xuICAgICAgY29uc3QgZGF0ZVBhcnRzID0gZGF0ZVN0ci5zcGxpdChyZU5vbkRhdGVQYXJ0cykucmVkdWNlKChkdFBhcnRzLCBwYXJ0LCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAocGFydC5sZW5ndGggPiAwICYmIHBhcnRzW2luZGV4XSkge1xuICAgICAgICAgIGNvbnN0IHRva2VuID0gcGFydHNbaW5kZXhdWzBdO1xuICAgICAgICAgIGlmICh0b2tlbiA9PT0gJ00nKSB7XG4gICAgICAgICAgICBkdFBhcnRzLm0gPSBwYXJ0O1xuICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4gIT09ICdEJykge1xuICAgICAgICAgICAgZHRQYXJ0c1t0b2tlbl0gPSBwYXJ0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZHRQYXJ0cztcbiAgICAgIH0sIHt9KTtcblxuICAgICAgLy8gaXRlcmF0ZSBvdmVyIHBhcnRQYXJzZXJrZXlzIHNvIHRoYXQgdGhlIHBhcnNpbmcgaXMgbWFkZSBpbiB0aGUgb2RlclxuICAgICAgLy8gb2YgeWVhciwgbW9udGggYW5kIGRheSB0byBwcmV2ZW50IHRoZSBkYXkgcGFyc2VyIGZyb20gY29ycmVjdGluZyBsYXN0XG4gICAgICAvLyBkYXkgb2YgbW9udGggd3JvbmdseVxuICAgICAgcmV0dXJuIHBhcnRQYXJzZXJLZXlzLnJlZHVjZSgob3JpZ0RhdGUsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdEYXRlID0gcGFyc2VGbnNba2V5XShvcmlnRGF0ZSwgZGF0ZVBhcnRzW2tleV0sIGxvY2FsZSk7XG4gICAgICAgIC8vIGluZ25vcmUgdGhlIHBhcnQgZmFpbGVkIHRvIHBhcnNlXG4gICAgICAgIHJldHVybiBpc05hTihuZXdEYXRlKSA/IG9yaWdEYXRlIDogbmV3RGF0ZTtcbiAgICAgIH0sIHRvZGF5KCkpO1xuICAgIH0sXG4gICAgZm9ybWF0dGVyKGRhdGUsIGxvY2FsZSkge1xuICAgICAgbGV0IGRhdGVTdHIgPSBwYXJ0Rm9ybWF0dGVycy5yZWR1Y2UoKHN0ciwgZm4sIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiBzdHIgKz0gYCR7c2VwYXJhdG9yc1tpbmRleF19JHtmbihkYXRlLCBsb2NhbGUpfWA7XG4gICAgICB9LCAnJyk7XG4gICAgICAvLyBzZXBhcmF0b3JzJyBsZW5ndGggaXMgYWx3YXlzIHBhcnRzJyBsZW5ndGggKyAxLFxuICAgICAgcmV0dXJuIGRhdGVTdHIgKz0gbGFzdEl0ZW1PZihzZXBhcmF0b3JzKTtcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGVTdHIsIGZvcm1hdCwgbG9jYWxlKSB7XG4gIGlmIChkYXRlU3RyIGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgZGF0ZVN0ciA9PT0gJ251bWJlcicpIHtcbiAgICBjb25zdCBkYXRlID0gc3RyaXBUaW1lKGRhdGVTdHIpO1xuICAgIHJldHVybiBpc05hTihkYXRlKSA/IHVuZGVmaW5lZCA6IGRhdGU7XG4gIH1cbiAgaWYgKCFkYXRlU3RyKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBpZiAoZGF0ZVN0ciA9PT0gJ3RvZGF5Jykge1xuICAgIHJldHVybiB0b2RheSgpO1xuICB9XG5cbiAgaWYgKGZvcm1hdCAmJiBmb3JtYXQudG9WYWx1ZSkge1xuICAgIGNvbnN0IGRhdGUgPSBmb3JtYXQudG9WYWx1ZShkYXRlU3RyLCBmb3JtYXQsIGxvY2FsZSk7XG4gICAgcmV0dXJuIGlzTmFOKGRhdGUpID8gdW5kZWZpbmVkIDogc3RyaXBUaW1lKGRhdGUpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlRm9ybWF0U3RyaW5nKGZvcm1hdCkucGFyc2VyKGRhdGVTdHIsIGxvY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGUsIGZvcm1hdCwgbG9jYWxlKSB7XG4gIGlmIChpc05hTihkYXRlKSB8fCAoIWRhdGUgJiYgZGF0ZSAhPT0gMCkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdCBkYXRlT2JqID0gdHlwZW9mIGRhdGUgPT09ICdudW1iZXInID8gbmV3IERhdGUoZGF0ZSkgOiBkYXRlO1xuXG4gIGlmIChmb3JtYXQudG9EaXNwbGF5KSB7XG4gICAgcmV0dXJuIGZvcm1hdC50b0Rpc3BsYXkoZGF0ZU9iaiwgZm9ybWF0LCBsb2NhbGUpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlRm9ybWF0U3RyaW5nKGZvcm1hdCkuZm9ybWF0dGVyKGRhdGVPYmosIGxvY2FsZSk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gc3RyaXBUaW1lKHRpbWVWYWx1ZSkge1xuICByZXR1cm4gbmV3IERhdGUodGltZVZhbHVlKS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZGF5KCkge1xuICByZXR1cm4gbmV3IERhdGUoKS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbn1cblxuLy8gR2V0IHRoZSB0aW1lIHZhbHVlIG9mIHRoZSBzdGFydCBvZiBnaXZlbiBkYXRlIG9yIHllYXIsIG1vbnRoIGFuZCBkYXlcbmV4cG9ydCBmdW5jdGlvbiBkYXRlVmFsdWUoLi4uYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIHRvZGF5KCk7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHN0cmlwVGltZShhcmdzWzBdKTtcbiAgfVxuXG4gIC8vIHVzZSBzZXRGdWxsWWVhcigpIHRvIGtlZXAgMi1kaWdpdCB5ZWFyIGZyb20gYmVpbmcgbWFwcGVkIHRvIDE5MDAtMTk5OVxuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoMCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoLi4uYXJncyk7XG4gIHJldHVybiBuZXdEYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRGF5cyhkYXRlLCBhbW91bnQpIHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICByZXR1cm4gbmV3RGF0ZS5zZXREYXRlKG5ld0RhdGUuZ2V0RGF0ZSgpICsgYW1vdW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFdlZWtzKGRhdGUsIGFtb3VudCkge1xuICByZXR1cm4gYWRkRGF5cyhkYXRlLCBhbW91bnQgKiA3KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1vbnRocyhkYXRlLCBhbW91bnQpIHtcbiAgLy8gSWYgdGhlIGRheSBvZiB0aGUgZGF0ZSBpcyBub3QgaW4gdGhlIG5ldyBtb250aCwgdGhlIGxhc3QgZGF5IG9mIHRoZSBuZXdcbiAgLy8gbW9udGggd2lsbCBiZSByZXR1cm5lZC4gZS5nLiBKYW4gMzEgKyAxIG1vbnRoIOKGkiBGZWIgMjggKG5vdCBNYXIgMDMpXG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgY29uc3QgbW9udGhzVG9TZXQgPSBuZXdEYXRlLmdldE1vbnRoKCkgKyBhbW91bnQ7XG4gIGxldCBleHBlY3RlZE1vbnRoID0gbW9udGhzVG9TZXQgJSAxMjtcbiAgaWYgKGV4cGVjdGVkTW9udGggPCAwKSB7XG4gICAgZXhwZWN0ZWRNb250aCArPSAxMjtcbiAgfVxuXG4gIGNvbnN0IHRpbWUgPSBuZXdEYXRlLnNldE1vbnRoKG1vbnRoc1RvU2V0KTtcbiAgcmV0dXJuIG5ld0RhdGUuZ2V0TW9udGgoKSAhPT0gZXhwZWN0ZWRNb250aCA/IG5ld0RhdGUuc2V0RGF0ZSgwKSA6IHRpbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRZZWFycyhkYXRlLCBhbW91bnQpIHtcbiAgLy8gSWYgdGhlIGRhdGUgaXMgRmViIDI5IGFuZCB0aGUgbmV3IHllYXIgaXMgbm90IGEgbGVhcCB5ZWFyLCBGZWIgMjggb2YgdGhlXG4gIC8vIG5ldyB5ZWFyIHdpbGwgYmUgcmV0dXJuZWQuXG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgY29uc3QgZXhwZWN0ZWRNb250aCA9IG5ld0RhdGUuZ2V0TW9udGgoKTtcbiAgY29uc3QgdGltZSA9IG5ld0RhdGUuc2V0RnVsbFllYXIobmV3RGF0ZS5nZXRGdWxsWWVhcigpICsgYW1vdW50KTtcbiAgcmV0dXJuIGV4cGVjdGVkTW9udGggPT09IDEgJiYgbmV3RGF0ZS5nZXRNb250aCgpID09PSAyID8gbmV3RGF0ZS5zZXREYXRlKDApIDogdGltZTtcbn1cblxuLy8gQ2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBiZXR0d2VuIDIgZGF5cyBvZiB0aGUgd2Vla1xuZnVuY3Rpb24gZGF5RGlmZihkYXksIGZyb20pIHtcbiAgcmV0dXJuIChkYXkgLSBmcm9tICsgNykgJSA3O1xufVxuXG4vLyBHZXQgdGhlIGRhdGUgb2YgdGhlIHNwZWNpZmllZCBkYXkgb2YgdGhlIHdlZWsgb2YgZ2l2ZW4gYmFzZSBkYXRlXG5leHBvcnQgZnVuY3Rpb24gZGF5T2ZUaGVXZWVrT2YoYmFzZURhdGUsIGRheU9mV2Vlaywgd2Vla1N0YXJ0ID0gMCkge1xuICBjb25zdCBiYXNlRGF5ID0gbmV3IERhdGUoYmFzZURhdGUpLmdldERheSgpO1xuICByZXR1cm4gYWRkRGF5cyhiYXNlRGF0ZSwgZGF5RGlmZihkYXlPZldlZWssIHdlZWtTdGFydCkgLSBkYXlEaWZmKGJhc2VEYXksIHdlZWtTdGFydCkpO1xufVxuXG4vLyBHZXQgdGhlIElTTyB3ZWVrIG9mIGEgZGF0ZVxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWsoZGF0ZSkge1xuICAvLyBzdGFydCBvZiBJU08gd2VlayBpcyBNb25kYXlcbiAgY29uc3QgdGh1T2ZUaGVXZWVrID0gZGF5T2ZUaGVXZWVrT2YoZGF0ZSwgNCwgMSk7XG4gIC8vIDFzdCB3ZWVrID09IHRoZSB3ZWVrIHdoZXJlIHRoZSA0dGggb2YgSmFudWFyeSBpcyBpblxuICBjb25zdCBmaXJzdFRodSA9IGRheU9mVGhlV2Vla09mKG5ldyBEYXRlKHRodU9mVGhlV2Vlaykuc2V0TW9udGgoMCwgNCksIDQsIDEpO1xuICByZXR1cm4gTWF0aC5yb3VuZCgodGh1T2ZUaGVXZWVrIC0gZmlyc3RUaHUpIC8gNjA0ODAwMDAwKSArIDE7XG59XG5cbi8vIEdldCB0aGUgc3RhcnQgeWVhciBvZiB0aGUgcGVyaW9kIG9mIHllYXJzIHRoYXQgaW5jbHVkZXMgZ2l2ZW4gZGF0ZVxuLy8geWVhcnM6IGxlbmd0aCBvZiB0aGUgeWVhciBwZXJpb2RcbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mWWVhclBlcmlvZChkYXRlLCB5ZWFycykge1xuICAvKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1llYXJfemVybyNJU09fODYwMSAqL1xuICBjb25zdCB5ZWFyID0gbmV3IERhdGUoZGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgcmV0dXJuIE1hdGguZmxvb3IoeWVhciAvIHllYXJzKSAqIHllYXJzO1xufVxuXG4vLyBDb252ZXJ0IGRhdGUgdG8gdGhlIGZpcnN0L2xhc3QgZGF0ZSBvZiB0aGUgbW9udGgveWVhciBvZiB0aGUgZGF0ZVxuZXhwb3J0IGZ1bmN0aW9uIHJlZ3VsYXJpemVEYXRlKGRhdGUsIHRpbWVTcGFuLCB1c2VMYXN0RGF0ZSkge1xuICBpZiAodGltZVNwYW4gIT09IDEgJiYgdGltZVNwYW4gIT09IDIpIHtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gIGlmICh0aW1lU3BhbiA9PT0gMSkge1xuICAgIHVzZUxhc3REYXRlXG4gICAgICA/IG5ld0RhdGUuc2V0TW9udGgobmV3RGF0ZS5nZXRNb250aCgpICsgMSwgMClcbiAgICAgIDogbmV3RGF0ZS5zZXREYXRlKDEpO1xuICB9IGVsc2Uge1xuICAgIHVzZUxhc3REYXRlXG4gICAgICA/IG5ld0RhdGUuc2V0RnVsbFllYXIobmV3RGF0ZS5nZXRGdWxsWWVhcigpICsgMSwgMCwgMClcbiAgICAgIDogbmV3RGF0ZS5zZXRNb250aCgwLCAxKTtcbiAgfVxuICByZXR1cm4gbmV3RGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbn1cbiIsImNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSFRNTChodG1sKSB7XG4gIHJldHVybiByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoaHRtbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnQoZWwpIHtcbiAgcmV0dXJuIGVsLnBhcmVudEVsZW1lbnRcbiAgICB8fCAoZWwucGFyZW50Tm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QgPyBlbC5wYXJlbnROb2RlLmhvc3QgOiB1bmRlZmluZWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBY3RpdmVFbGVtZW50KGVsKSB7XG4gIHJldHVybiBlbC5nZXRSb290Tm9kZSgpLmFjdGl2ZUVsZW1lbnQgPT09IGVsO1xufVxuXG4vLyBlcXVpdmFsZW50IHRvIGpRdWVyeSdzIDp2aXNibGVcbmV4cG9ydCBmdW5jdGlvbiBpc1Zpc2libGUoZWwpIHtcbiAgcmV0dXJuICEhKGVsLm9mZnNldFdpZHRoIHx8IGVsLm9mZnNldEhlaWdodCB8fCBlbC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRWxlbWVudChlbCkge1xuICBpZiAoZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGJhY2sgdXAgdGhlIGV4aXN0aW5nIGRpc3BsYXkgc2V0dGluZyBpbiBkYXRhLXN0eWxlLWRpc3BsYXlcbiAgaWYgKGVsLnN0eWxlLmRpc3BsYXkpIHtcbiAgICBlbC5kYXRhc2V0LnN0eWxlRGlzcGxheSA9IGVsLnN0eWxlLmRpc3BsYXk7XG4gIH1cbiAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsKSB7XG4gIGlmIChlbC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGVsLmRhdGFzZXQuc3R5bGVEaXNwbGF5KSB7XG4gICAgLy8gcmVzdG9yZSBiYWNrZWQtdXAgZGlzcGF5IHByb3BlcnR5XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IGVsLmRhdGFzZXQuc3R5bGVEaXNwbGF5O1xuICAgIGRlbGV0ZSBlbC5kYXRhc2V0LnN0eWxlRGlzcGxheTtcbiAgfSBlbHNlIHtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5Q2hpbGROb2RlcyhlbCkge1xuICBpZiAoZWwuZmlyc3RDaGlsZCkge1xuICAgIGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpO1xuICAgIGVtcHR5Q2hpbGROb2RlcyhlbCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VDaGlsZE5vZGVzKGVsLCBuZXdDaGlsZE5vZGVzKSB7XG4gIGVtcHR5Q2hpbGROb2RlcyhlbCk7XG4gIGlmIChuZXdDaGlsZE5vZGVzIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgIGVsLmFwcGVuZENoaWxkKG5ld0NoaWxkTm9kZXMpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdDaGlsZE5vZGVzID09PSAnc3RyaW5nJykge1xuICAgIGVsLmFwcGVuZENoaWxkKHBhcnNlSFRNTChuZXdDaGlsZE5vZGVzKSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5ld0NoaWxkTm9kZXMuZm9yRWFjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG5ld0NoaWxkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgZWwuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImNvbnN0IGxpc3RlbmVyUmVnaXN0cnkgPSBuZXcgV2Vha01hcCgpO1xuY29uc3Qge2FkZEV2ZW50TGlzdGVuZXIsIHJlbW92ZUV2ZW50TGlzdGVuZXJ9ID0gRXZlbnRUYXJnZXQucHJvdG90eXBlO1xuXG4vLyBSZWdpc3RlciBldmVudCBsaXN0ZW5lcnMgdG8gYSBrZXkgb2JqZWN0XG4vLyBsaXN0ZW5lcnM6IGFycmF5IG9mIGxpc3RlbmVyIGRlZmluaXRpb25zO1xuLy8gICAtIGVhY2ggZGVmaW5pdGlvbiBtdXN0IGJlIGEgZmxhdCBhcnJheSBvZiBldmVudCB0YXJnZXQgYW5kIHRoZSBhcmd1bWVudHNcbi8vICAgICB1c2VkIHRvIGNhbGwgYWRkRXZlbnRMaXN0ZW5lcigpIG9uIHRoZSB0YXJnZXRcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlckxpc3RlbmVycyhrZXlPYmosIGxpc3RlbmVycykge1xuICBsZXQgcmVnaXN0ZXJlZCA9IGxpc3RlbmVyUmVnaXN0cnkuZ2V0KGtleU9iaik7XG4gIGlmICghcmVnaXN0ZXJlZCkge1xuICAgIHJlZ2lzdGVyZWQgPSBbXTtcbiAgICBsaXN0ZW5lclJlZ2lzdHJ5LnNldChrZXlPYmosIHJlZ2lzdGVyZWQpO1xuICB9XG4gIGxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIuY2FsbCguLi5saXN0ZW5lcik7XG4gICAgcmVnaXN0ZXJlZC5wdXNoKGxpc3RlbmVyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnJlZ2lzdGVyTGlzdGVuZXJzKGtleU9iaikge1xuICBsZXQgbGlzdGVuZXJzID0gbGlzdGVuZXJSZWdpc3RyeS5nZXQoa2V5T2JqKTtcbiAgaWYgKCFsaXN0ZW5lcnMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiB7XG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lci5jYWxsKC4uLmxpc3RlbmVyKTtcbiAgfSk7XG4gIGxpc3RlbmVyUmVnaXN0cnkuZGVsZXRlKGtleU9iaik7XG59XG5cbi8vIEV2ZW50LmNvbXBvc2VkUGF0aCgpIHBvbHlmaWxsIGZvciBFZGdlXG4vLyBiYXNlZCBvbiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9rbGVpbmZyZXVuZC9lOTc4N2Q3Mzc3NmMwZTM3NTBkY2ZjZGM4OWYxMDBlY1xuaWYgKCFFdmVudC5wcm90b3R5cGUuY29tcG9zZWRQYXRoKSB7XG4gIGNvbnN0IGdldENvbXBvc2VkUGF0aCA9IChub2RlLCBwYXRoID0gW10pID0+IHtcbiAgICBwYXRoLnB1c2gobm9kZSk7XG5cbiAgICBsZXQgcGFyZW50O1xuICAgIGlmIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9IGVsc2UgaWYgKG5vZGUuaG9zdCkgeyAvLyBTaGFkb3dSb290XG4gICAgICBwYXJlbnQgPSBub2RlLmhvc3Q7XG4gICAgfSBlbHNlIGlmIChub2RlLmRlZmF1bHRWaWV3KSB7ICAvLyBEb2N1bWVudFxuICAgICAgcGFyZW50ID0gbm9kZS5kZWZhdWx0VmlldztcbiAgICB9XG4gICAgcmV0dXJuIHBhcmVudCA/IGdldENvbXBvc2VkUGF0aChwYXJlbnQsIHBhdGgpIDogcGF0aDtcbiAgfTtcblxuICBFdmVudC5wcm90b3R5cGUuY29tcG9zZWRQYXRoID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnZXRDb21wb3NlZFBhdGgodGhpcy50YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmaW5kRnJvbVBhdGgocGF0aCwgY3JpdGVyaWEsIGN1cnJlbnRUYXJnZXQpIHtcbiAgY29uc3QgW25vZGUsIC4uLnJlc3RdID0gcGF0aDtcbiAgaWYgKGNyaXRlcmlhKG5vZGUpKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgaWYgKG5vZGUgPT09IGN1cnJlbnRUYXJnZXQgfHwgbm9kZS50YWdOYW1lID09PSAnSFRNTCcgfHwgcmVzdC5sZW5ndGggPT09IDApIHtcbiAgICAvLyBzdG9wIHdoZW4gcmVhY2hpbmcgY3VycmVudFRhcmdldCBvciA8aHRtbD5cbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIGZpbmRGcm9tUGF0aChyZXN0LCBjcml0ZXJpYSwgY3VycmVudFRhcmdldCk7XG59XG5cbi8vIFNlYXJjaCBmb3IgdGhlIGFjdHVhbCB0YXJnZXQgb2YgYSBkZWxlZ2F0ZWQgZXZlbnRcbmV4cG9ydCBmdW5jdGlvbiBmaW5kRWxlbWVudEluRXZlbnRQYXRoKGV2LCBzZWxlY3Rvcikge1xuICBjb25zdCBjcml0ZXJpYSA9IHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2VsZWN0b3JcbiAgICA6IGVsID0+IGVsIGluc3RhbmNlb2YgRWxlbWVudCAmJiBlbC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgcmV0dXJuIGZpbmRGcm9tUGF0aChldi5jb21wb3NlZFBhdGgoKSwgY3JpdGVyaWEsIGV2LmN1cnJlbnRUYXJnZXQpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGhhc1Byb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXN0SXRlbU9mKGFycikge1xuICByZXR1cm4gYXJyW2Fyci5sZW5ndGggLSAxXTtcbn1cblxuLy8gcHVzaCBvbmx5IHRoZSBpdGVtcyBub3QgaW5jbHVkZWQgaW4gdGhlIGFycmF5XG5leHBvcnQgZnVuY3Rpb24gcHVzaFVuaXF1ZShhcnIsIC4uLml0ZW1zKSB7XG4gIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpZiAoYXJyLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGFyci5wdXNoKGl0ZW0pO1xuICB9KTtcbiAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvQXJyYXkoc3RyLCBzZXBhcmF0b3IpIHtcbiAgLy8gY29udmVydCBlbXB0eSBzdHJpbmcgdG8gYW4gZW1wdHkgYXJyYXlcbiAgcmV0dXJuIHN0ciA/IHN0ci5zcGxpdChzZXBhcmF0b3IpIDogW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0luUmFuZ2UodGVzdFZhbCwgbWluLCBtYXgpIHtcbiAgY29uc3QgbWluT0sgPSBtaW4gPT09IHVuZGVmaW5lZCB8fCB0ZXN0VmFsID49IG1pbjtcbiAgY29uc3QgbWF4T0sgPSBtYXggPT09IHVuZGVmaW5lZCB8fCB0ZXN0VmFsIDw9IG1heDtcbiAgcmV0dXJuIG1pbk9LICYmIG1heE9LO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGltaXRUb1JhbmdlKHZhbCwgbWluLCBtYXgpIHtcbiAgaWYgKHZhbCA8IG1pbikge1xuICAgIHJldHVybiBtaW47XG4gIH1cbiAgaWYgKHZhbCA+IG1heCkge1xuICAgIHJldHVybiBtYXg7XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRhZ1JlcGVhdCh0YWdOYW1lLCByZXBlYXQsIGF0dHJpYnV0ZXMgPSB7fSwgaW5kZXggPSAwLCBodG1sID0gJycpIHtcbiAgY29uc3Qgb3BlblRhZ1NyYyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLnJlZHVjZSgoc3JjLCBhdHRyKSA9PiB7XG4gICAgbGV0IHZhbCA9IGF0dHJpYnV0ZXNbYXR0cl07XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhbCA9IHZhbChpbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBgJHtzcmN9ICR7YXR0cn09XCIke3ZhbH1cImA7XG4gIH0sIHRhZ05hbWUpO1xuICBodG1sICs9IGA8JHtvcGVuVGFnU3JjfT48LyR7dGFnTmFtZX0+YDtcblxuICBjb25zdCBuZXh0ID0gaW5kZXggKyAxO1xuICByZXR1cm4gbmV4dCA8IHJlcGVhdFxuICAgID8gY3JlYXRlVGFnUmVwZWF0KHRhZ05hbWUsIHJlcGVhdCwgYXR0cmlidXRlcywgbmV4dCwgaHRtbClcbiAgICA6IGh0bWw7XG59XG5cbi8vIFJlbW92ZSB0aGUgc3BhY2luZyBzdXJyb3VuZGluZyB0YWdzIGZvciBIVE1MIHBhcnNlciBub3QgdG8gY3JlYXRlIHRleHQgbm9kZXNcbi8vIGJlZm9yZS9hZnRlciBlbGVtZW50c1xuZXhwb3J0IGZ1bmN0aW9uIG9wdGltaXplVGVtcGxhdGVIVE1MKGh0bWwpIHtcbiAgcmV0dXJuIGh0bWwucmVwbGFjZSgvPlxccysvZywgJz4nKS5yZXBsYWNlKC9cXHMrPC8sICc8Jyk7XG59XG4iLCIvLyBjb25maWcgb3B0aW9ucyB1cGRhdGFibGUgYnkgc2V0T3B0aW9ucygpIGFuZCB0aGVpciBkZWZhdWx0IHZhbHVlc1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gIGF1dG9oaWRlOiBmYWxzZSxcbiAgYmVmb3JlU2hvd0RheTogbnVsbCxcbiAgYmVmb3JlU2hvd0RlY2FkZTogbnVsbCxcbiAgYmVmb3JlU2hvd01vbnRoOiBudWxsLFxuICBiZWZvcmVTaG93WWVhcjogbnVsbCxcbiAgY2FsZW5kYXJXZWVrczogZmFsc2UsXG4gIGNsZWFyQnRuOiBmYWxzZSxcbiAgZGF0ZURlbGltaXRlcjogJywnLFxuICBkYXRlc0Rpc2FibGVkOiBbXSxcbiAgZGF5c09mV2Vla0Rpc2FibGVkOiBbXSxcbiAgZGF5c09mV2Vla0hpZ2hsaWdodGVkOiBbXSxcbiAgZGVmYXVsdFZpZXdEYXRlOiB1bmRlZmluZWQsIC8vIHBsYWNlaG9sZGVyLCBkZWZhdWx0cyB0byB0b2RheSgpIGJ5IHRoZSBwcm9ncmFtXG4gIGRpc2FibGVUb3VjaEtleWJvYXJkOiBmYWxzZSxcbiAgZm9ybWF0OiAnbW0vZGQveXl5eScsXG4gIGxhbmd1YWdlOiAnZW4nLFxuICBtYXhEYXRlOiBudWxsLFxuICBtYXhOdW1iZXJPZkRhdGVzOiAxLFxuICBtYXhWaWV3OiAzLFxuICBtaW5EYXRlOiBudWxsLFxuICBuZXh0QXJyb3c6ICfCuycsXG4gIG9yaWVudGF0aW9uOiAnYXV0bycsXG4gIHBpY2tMZXZlbDogMCxcbiAgcHJldkFycm93OiAnwqsnLFxuICBzaG93RGF5c09mV2VlazogdHJ1ZSxcbiAgc2hvd09uQ2xpY2s6IHRydWUsXG4gIHNob3dPbkZvY3VzOiB0cnVlLFxuICBzdGFydFZpZXc6IDAsXG4gIHRpdGxlOiAnJyxcbiAgdG9kYXlCdG46IGZhbHNlLFxuICB0b2RheUJ0bk1vZGU6IDAsXG4gIHRvZGF5SGlnaGxpZ2h0OiBmYWxzZSxcbiAgdXBkYXRlT25CbHVyOiB0cnVlLFxuICB3ZWVrU3RhcnQ6IDAsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0T3B0aW9ucztcbiIsImltcG9ydCB7aGFzUHJvcGVydHksIHB1c2hVbmlxdWV9IGZyb20gJy4uL2xpYi91dGlscy5qcyc7XG5pbXBvcnQge2RhdGVWYWx1ZSwgcmVndWxhcml6ZURhdGV9IGZyb20gJy4uL2xpYi9kYXRlLmpzJztcbmltcG9ydCB7cmVGb3JtYXRUb2tlbnMsIHBhcnNlRGF0ZX0gZnJvbSAnLi4vbGliL2RhdGUtZm9ybWF0LmpzJztcbmltcG9ydCB7cGFyc2VIVE1MfSBmcm9tICcuLi9saWIvZG9tLmpzJztcbmltcG9ydCBkZWZhdWx0T3B0aW9ucyBmcm9tICcuL2RlZmF1bHRPcHRpb25zLmpzJztcblxuY29uc3Qge1xuICBsYW5ndWFnZTogZGVmYXVsdExhbmcsXG4gIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgd2Vla1N0YXJ0OiBkZWZhdWx0V2Vla1N0YXJ0LFxufSA9IGRlZmF1bHRPcHRpb25zO1xuXG4vLyBSZWR1Y2VyIGZ1bmN0aW9uIHRvIGZpbHRlciBvdXQgaW52YWxpZCBkYXktb2Ytd2VlayBmcm9tIHRoZSBpbnB1dFxuZnVuY3Rpb24gc2FuaXRpemVET1coZG93LCBkYXkpIHtcbiAgcmV0dXJuIGRvdy5sZW5ndGggPCA2ICYmIGRheSA+PSAwICYmIGRheSA8IDdcbiAgICA/IHB1c2hVbmlxdWUoZG93LCBkYXkpXG4gICAgOiBkb3c7XG59XG5cbmZ1bmN0aW9uIGNhbGNFbmRPZldlZWsoc3RhcnRPZldlZWspIHtcbiAgcmV0dXJuIChzdGFydE9mV2VlayArIDYpICUgNztcbn1cblxuLy8gdmFsaWRhdGUgaW5wdXQgZGF0ZS4gaWYgaW52YWxpZCwgZmFsbGJhY2sgdG8gdGhlIG9yaWdpbmFsIHZhbHVlXG5mdW5jdGlvbiB2YWxpZGF0ZURhdGUodmFsdWUsIGZvcm1hdCwgbG9jYWxlLCBvcmlnVmFsdWUpIHtcbiAgY29uc3QgZGF0ZSA9IHBhcnNlRGF0ZSh2YWx1ZSwgZm9ybWF0LCBsb2NhbGUpO1xuICByZXR1cm4gZGF0ZSAhPT0gdW5kZWZpbmVkID8gZGF0ZSA6IG9yaWdWYWx1ZTtcbn1cblxuLy8gVmFsaWRhdGUgdmlld0lkLiBpZiBpbnZhbGlkLCBmYWxsYmFjayB0byB0aGUgb3JpZ2luYWwgdmFsdWVcbmZ1bmN0aW9uIHZhbGlkYXRlVmlld0lkKHZhbHVlLCBvcmlnVmFsdWUsIG1heCA9IDMpIHtcbiAgY29uc3Qgdmlld0lkID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgcmV0dXJuIHZpZXdJZCA+PSAwICYmIHZpZXdJZCA8PSBtYXggPyB2aWV3SWQgOiBvcmlnVmFsdWU7XG59XG5cbi8vIENyZWF0ZSBEYXRlcGlja2VyIGNvbmZpZ3VyYXRpb24gdG8gc2V0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcm9jZXNzT3B0aW9ucyhvcHRpb25zLCBkYXRlcGlja2VyKSB7XG4gIGNvbnN0IGluT3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuICBjb25zdCBjb25maWcgPSB7fTtcbiAgY29uc3QgbG9jYWxlcyA9IGRhdGVwaWNrZXIuY29uc3RydWN0b3IubG9jYWxlcztcbiAgY29uc3QgcmFuZ2VTaWRlSW5kZXggPSBkYXRlcGlja2VyLnJhbmdlU2lkZUluZGV4O1xuICBsZXQge1xuICAgIGZvcm1hdCxcbiAgICBsYW5ndWFnZSxcbiAgICBsb2NhbGUsXG4gICAgbWF4RGF0ZSxcbiAgICBtYXhWaWV3LFxuICAgIG1pbkRhdGUsXG4gICAgcGlja0xldmVsLFxuICAgIHN0YXJ0VmlldyxcbiAgICB3ZWVrU3RhcnQsXG4gIH0gPSBkYXRlcGlja2VyLmNvbmZpZyB8fCB7fTtcblxuICBpZiAoaW5PcHRzLmxhbmd1YWdlKSB7XG4gICAgbGV0IGxhbmc7XG4gICAgaWYgKGluT3B0cy5sYW5ndWFnZSAhPT0gbGFuZ3VhZ2UpIHtcbiAgICAgIGlmIChsb2NhbGVzW2luT3B0cy5sYW5ndWFnZV0pIHtcbiAgICAgICAgbGFuZyA9IGluT3B0cy5sYW5ndWFnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGxhbmdhdWdlICsgcmVnaW9uIHRhZyBjYW4gZmFsbGJhY2sgdG8gdGhlIG9uZSB3aXRob3V0XG4gICAgICAgIC8vIHJlZ2lvbiAoZS5nLiBmci1DQSDihpIgZnIpXG4gICAgICAgIGxhbmcgPSBpbk9wdHMubGFuZ3VhZ2Uuc3BsaXQoJy0nKVswXTtcbiAgICAgICAgaWYgKGxvY2FsZXNbbGFuZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGxhbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLmxhbmd1YWdlO1xuICAgIGlmIChsYW5nKSB7XG4gICAgICBsYW5ndWFnZSA9IGNvbmZpZy5sYW5ndWFnZSA9IGxhbmc7XG5cbiAgICAgIC8vIHVwZGF0ZSBsb2NhbGUgYXMgd2VsbCB3aGVuIHVwZGF0aW5nIGxhbmd1YWdlXG4gICAgICBjb25zdCBvcmlnTG9jYWxlID0gbG9jYWxlIHx8IGxvY2FsZXNbZGVmYXVsdExhbmddO1xuICAgICAgLy8gdXNlIGRlZmF1bHQgbGFuZ3VhZ2UncyBwcm9wZXJ0aWVzIGZvciB0aGUgZmFsbGJhY2tcbiAgICAgIGxvY2FsZSA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgICAgIHdlZWtTdGFydDogZGVmYXVsdFdlZWtTdGFydFxuICAgICAgfSwgbG9jYWxlc1tkZWZhdWx0TGFuZ10pO1xuICAgICAgaWYgKGxhbmd1YWdlICE9PSBkZWZhdWx0TGFuZykge1xuICAgICAgICBPYmplY3QuYXNzaWduKGxvY2FsZSwgbG9jYWxlc1tsYW5ndWFnZV0pO1xuICAgICAgfVxuICAgICAgY29uZmlnLmxvY2FsZSA9IGxvY2FsZTtcbiAgICAgIC8vIGlmIGZvcm1hdCBhbmQvb3Igd2Vla1N0YXJ0IGFyZSB0aGUgc2FtZSBhcyBvbGQgbG9jYWxlJ3MgZGVmYXVsdHMsXG4gICAgICAvLyB1cGRhdGUgdGhlbSB0byBuZXcgbG9jYWxlJ3MgZGVmYXVsdHNcbiAgICAgIGlmIChmb3JtYXQgPT09IG9yaWdMb2NhbGUuZm9ybWF0KSB7XG4gICAgICAgIGZvcm1hdCA9IGNvbmZpZy5mb3JtYXQgPSBsb2NhbGUuZm9ybWF0O1xuICAgICAgfVxuICAgICAgaWYgKHdlZWtTdGFydCA9PT0gb3JpZ0xvY2FsZS53ZWVrU3RhcnQpIHtcbiAgICAgICAgd2Vla1N0YXJ0ID0gY29uZmlnLndlZWtTdGFydCA9IGxvY2FsZS53ZWVrU3RhcnQ7XG4gICAgICAgIGNvbmZpZy53ZWVrRW5kID0gY2FsY0VuZE9mV2Vlayhsb2NhbGUud2Vla1N0YXJ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW5PcHRzLmZvcm1hdCkge1xuICAgIGNvbnN0IGhhc1RvRGlzcGxheSA9IHR5cGVvZiBpbk9wdHMuZm9ybWF0LnRvRGlzcGxheSA9PT0gJ2Z1bmN0aW9uJztcbiAgICBjb25zdCBoYXNUb1ZhbHVlID0gdHlwZW9mIGluT3B0cy5mb3JtYXQudG9WYWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICBjb25zdCB2YWxpZEZvcm1hdFN0cmluZyA9IHJlRm9ybWF0VG9rZW5zLnRlc3QoaW5PcHRzLmZvcm1hdCk7XG4gICAgaWYgKChoYXNUb0Rpc3BsYXkgJiYgaGFzVG9WYWx1ZSkgfHwgdmFsaWRGb3JtYXRTdHJpbmcpIHtcbiAgICAgIGZvcm1hdCA9IGNvbmZpZy5mb3JtYXQgPSBpbk9wdHMuZm9ybWF0O1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLmZvcm1hdDtcbiAgfVxuXG4gIC8vKioqIHBpY2sgbGV2ZWwgKioqLy9cbiAgbGV0IG5ld1BpY2tMZXZlbCA9IHBpY2tMZXZlbDtcbiAgaWYgKGluT3B0cy5waWNrTGV2ZWwgIT09IHVuZGVmaW5lZCkge1xuICAgIG5ld1BpY2tMZXZlbCA9IHZhbGlkYXRlVmlld0lkKGluT3B0cy5waWNrTGV2ZWwsIDIpO1xuICAgIGRlbGV0ZSBpbk9wdHMucGlja0xldmVsO1xuICB9XG4gIGlmIChuZXdQaWNrTGV2ZWwgIT09IHBpY2tMZXZlbCkge1xuICAgIGlmIChuZXdQaWNrTGV2ZWwgPiBwaWNrTGV2ZWwpIHtcbiAgICAgIC8vIGNvbXBsZW1lbnQgY3VycmVudCBtaW5EYXRlL21hZERhdGUgc28gdGhhdCB0aGUgZXhpc3RpbmcgcmFuZ2Ugd2lsbCBiZVxuICAgICAgLy8gZXhwYW5kZWQgdG8gZml0IHRoZSBuZXcgbGV2ZWwgbGF0ZXJcbiAgICAgIGlmIChpbk9wdHMubWluRGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGluT3B0cy5taW5EYXRlID0gbWluRGF0ZTtcbiAgICAgIH1cbiAgICAgIGlmIChpbk9wdHMubWF4RGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGluT3B0cy5tYXhEYXRlID0gbWF4RGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY29tcGxlbWVudCBkYXRlc0Rpc2FibGVkIHNvIHRoYXQgaXQgd2lsbCBiZSByZXNldCBsYXRlclxuICAgIGlmICghaW5PcHRzLmRhdGVzRGlzYWJsZWQpIHtcbiAgICAgIGluT3B0cy5kYXRlc0Rpc2FibGVkID0gW107XG4gICAgfVxuICAgIHBpY2tMZXZlbCA9IGNvbmZpZy5waWNrTGV2ZWwgPSBuZXdQaWNrTGV2ZWw7XG4gIH1cblxuICAvLyoqKiBkYXRlcyAqKiovL1xuICAvLyB3aGlsZSBtaW4gYW5kIG1heERhdGUgZm9yIFwibm8gbGltaXRcIiBpbiB0aGUgb3B0aW9ucyBhcmUgYmV0dGVyIHRvIGJlIG51bGxcbiAgLy8gKGVzcGVjaWFsbHkgd2hlbiB1cGRhdGluZyksIHRoZSBvbmVzIGluIHRoZSBjb25maWcgaGF2ZSB0byBiZSB1bmRlZmluZWRcbiAgLy8gYmVjYXVzZSBudWxsIGlzIHRyZWF0ZWQgYXMgMCAoPSB1bml4IGVwb2NoKSB3aGVuIGNvbXBhcmluZyB3aXRoIHRpbWUgdmFsdWVcbiAgbGV0IG1pbkR0ID0gbWluRGF0ZTtcbiAgbGV0IG1heER0ID0gbWF4RGF0ZTtcbiAgaWYgKGluT3B0cy5taW5EYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBkZWZhdWx0TWluRHQgPSBkYXRlVmFsdWUoMCwgMCwgMSk7XG4gICAgbWluRHQgPSBpbk9wdHMubWluRGF0ZSA9PT0gbnVsbFxuICAgICAgPyBkZWZhdWx0TWluRHQgIC8vIHNldCAwMDAwLTAxLTAxIHRvIHByZXZlbnQgbmVnYXRpdmUgdmFsdWVzIGZvciB5ZWFyXG4gICAgICA6IHZhbGlkYXRlRGF0ZShpbk9wdHMubWluRGF0ZSwgZm9ybWF0LCBsb2NhbGUsIG1pbkR0KTtcbiAgICBpZiAobWluRHQgIT09IGRlZmF1bHRNaW5EdCkge1xuICAgICAgbWluRHQgPSByZWd1bGFyaXplRGF0ZShtaW5EdCwgcGlja0xldmVsLCBmYWxzZSk7XG4gICAgfVxuICAgIGRlbGV0ZSBpbk9wdHMubWluRGF0ZTtcbiAgfVxuICBpZiAoaW5PcHRzLm1heERhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgIG1heER0ID0gaW5PcHRzLm1heERhdGUgPT09IG51bGxcbiAgICAgID8gdW5kZWZpbmVkXG4gICAgICA6IHZhbGlkYXRlRGF0ZShpbk9wdHMubWF4RGF0ZSwgZm9ybWF0LCBsb2NhbGUsIG1heER0KTtcbiAgICBpZiAobWF4RHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbWF4RHQgPSByZWd1bGFyaXplRGF0ZShtYXhEdCwgcGlja0xldmVsLCB0cnVlKTtcbiAgICB9XG4gICAgZGVsZXRlIGluT3B0cy5tYXhEYXRlO1xuICB9XG4gIGlmIChtYXhEdCA8IG1pbkR0KSB7XG4gICAgbWluRGF0ZSA9IGNvbmZpZy5taW5EYXRlID0gbWF4RHQ7XG4gICAgbWF4RGF0ZSA9IGNvbmZpZy5tYXhEYXRlID0gbWluRHQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKG1pbkRhdGUgIT09IG1pbkR0KSB7XG4gICAgICBtaW5EYXRlID0gY29uZmlnLm1pbkRhdGUgPSBtaW5EdDtcbiAgICB9XG4gICAgaWYgKG1heERhdGUgIT09IG1heER0KSB7XG4gICAgICBtYXhEYXRlID0gY29uZmlnLm1heERhdGUgPSBtYXhEdDtcbiAgICB9XG4gIH1cblxuICBpZiAoaW5PcHRzLmRhdGVzRGlzYWJsZWQpIHtcbiAgICBjb25maWcuZGF0ZXNEaXNhYmxlZCA9IGluT3B0cy5kYXRlc0Rpc2FibGVkLnJlZHVjZSgoZGF0ZXMsIGR0KSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gcGFyc2VEYXRlKGR0LCBmb3JtYXQsIGxvY2FsZSk7XG4gICAgICByZXR1cm4gZGF0ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gcHVzaFVuaXF1ZShkYXRlcywgcmVndWxhcml6ZURhdGUoZGF0ZSwgcGlja0xldmVsLCByYW5nZVNpZGVJbmRleCkpXG4gICAgICAgIDogZGF0ZXM7XG4gICAgfSwgW10pO1xuICAgIGRlbGV0ZSBpbk9wdHMuZGF0ZXNEaXNhYmxlZDtcbiAgfVxuICBpZiAoaW5PcHRzLmRlZmF1bHRWaWV3RGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3Qgdmlld0RhdGUgPSBwYXJzZURhdGUoaW5PcHRzLmRlZmF1bHRWaWV3RGF0ZSwgZm9ybWF0LCBsb2NhbGUpO1xuICAgIGlmICh2aWV3RGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25maWcuZGVmYXVsdFZpZXdEYXRlID0gdmlld0RhdGU7XG4gICAgfVxuICAgIGRlbGV0ZSBpbk9wdHMuZGVmYXVsdFZpZXdEYXRlO1xuICB9XG5cbiAgLy8qKiogZGF5cyBvZiB3ZWVrICoqKi8vXG4gIGlmIChpbk9wdHMud2Vla1N0YXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCB3a1N0YXJ0ID0gTnVtYmVyKGluT3B0cy53ZWVrU3RhcnQpICUgNztcbiAgICBpZiAoIWlzTmFOKHdrU3RhcnQpKSB7XG4gICAgICB3ZWVrU3RhcnQgPSBjb25maWcud2Vla1N0YXJ0ID0gd2tTdGFydDtcbiAgICAgIGNvbmZpZy53ZWVrRW5kID0gY2FsY0VuZE9mV2Vlayh3a1N0YXJ0KTtcbiAgICB9XG4gICAgZGVsZXRlIGluT3B0cy53ZWVrU3RhcnQ7XG4gIH1cbiAgaWYgKGluT3B0cy5kYXlzT2ZXZWVrRGlzYWJsZWQpIHtcbiAgICBjb25maWcuZGF5c09mV2Vla0Rpc2FibGVkID0gaW5PcHRzLmRheXNPZldlZWtEaXNhYmxlZC5yZWR1Y2Uoc2FuaXRpemVET1csIFtdKTtcbiAgICBkZWxldGUgaW5PcHRzLmRheXNPZldlZWtEaXNhYmxlZDtcbiAgfVxuICBpZiAoaW5PcHRzLmRheXNPZldlZWtIaWdobGlnaHRlZCkge1xuICAgIGNvbmZpZy5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQgPSBpbk9wdHMuZGF5c09mV2Vla0hpZ2hsaWdodGVkLnJlZHVjZShzYW5pdGl6ZURPVywgW10pO1xuICAgIGRlbGV0ZSBpbk9wdHMuZGF5c09mV2Vla0hpZ2hsaWdodGVkO1xuICB9XG5cbiAgLy8qKiogbXVsdGkgZGF0ZSAqKiovL1xuICBpZiAoaW5PcHRzLm1heE51bWJlck9mRGF0ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IG1heE51bWJlck9mRGF0ZXMgPSBwYXJzZUludChpbk9wdHMubWF4TnVtYmVyT2ZEYXRlcywgMTApO1xuICAgIGlmIChtYXhOdW1iZXJPZkRhdGVzID49IDApIHtcbiAgICAgIGNvbmZpZy5tYXhOdW1iZXJPZkRhdGVzID0gbWF4TnVtYmVyT2ZEYXRlcztcbiAgICAgIGNvbmZpZy5tdWx0aWRhdGUgPSBtYXhOdW1iZXJPZkRhdGVzICE9PSAxO1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLm1heE51bWJlck9mRGF0ZXM7XG4gIH1cbiAgaWYgKGluT3B0cy5kYXRlRGVsaW1pdGVyKSB7XG4gICAgY29uZmlnLmRhdGVEZWxpbWl0ZXIgPSBTdHJpbmcoaW5PcHRzLmRhdGVEZWxpbWl0ZXIpO1xuICAgIGRlbGV0ZSBpbk9wdHMuZGF0ZURlbGltaXRlcjtcbiAgfVxuXG4gIC8vKioqIHZpZXcgKioqLy9cbiAgbGV0IG5ld01heFZpZXcgPSBtYXhWaWV3O1xuICBpZiAoaW5PcHRzLm1heFZpZXcgIT09IHVuZGVmaW5lZCkge1xuICAgIG5ld01heFZpZXcgPSB2YWxpZGF0ZVZpZXdJZChpbk9wdHMubWF4VmlldywgbWF4Vmlldyk7XG4gICAgZGVsZXRlIGluT3B0cy5tYXhWaWV3O1xuICB9XG4gIC8vIGVuc3VyZSBtYXggdmlldyA+PSBwaWNrIGxldmVsXG4gIG5ld01heFZpZXcgPSBwaWNrTGV2ZWwgPiBuZXdNYXhWaWV3ID8gcGlja0xldmVsIDogbmV3TWF4VmlldztcbiAgaWYgKG5ld01heFZpZXcgIT09IG1heFZpZXcpIHtcbiAgICBtYXhWaWV3ID0gY29uZmlnLm1heFZpZXcgPSBuZXdNYXhWaWV3O1xuICB9XG5cbiAgbGV0IG5ld1N0YXJ0VmlldyA9IHN0YXJ0VmlldztcbiAgaWYgKGluT3B0cy5zdGFydFZpZXcgIT09IHVuZGVmaW5lZCkge1xuICAgIG5ld1N0YXJ0VmlldyA9IHZhbGlkYXRlVmlld0lkKGluT3B0cy5zdGFydFZpZXcsIG5ld1N0YXJ0Vmlldyk7XG4gICAgZGVsZXRlIGluT3B0cy5zdGFydFZpZXc7XG4gIH1cbiAgLy8gZW5zdXJlIHBpY2sgbGV2ZWwgPD0gc3RhcnQgdmlldyA8PSBtYXggdmlld1xuICBpZiAobmV3U3RhcnRWaWV3IDwgcGlja0xldmVsKSB7XG4gICAgbmV3U3RhcnRWaWV3ID0gcGlja0xldmVsO1xuICB9IGVsc2UgaWYgKG5ld1N0YXJ0VmlldyA+IG1heFZpZXcpIHtcbiAgICBuZXdTdGFydFZpZXcgPSBtYXhWaWV3O1xuICB9XG4gIGlmIChuZXdTdGFydFZpZXcgIT09IHN0YXJ0Vmlldykge1xuICAgIGNvbmZpZy5zdGFydFZpZXcgPSBuZXdTdGFydFZpZXc7XG4gIH1cblxuICAvLyoqKiB0ZW1wbGF0ZSAqKiovL1xuICBpZiAoaW5PcHRzLnByZXZBcnJvdykge1xuICAgIGNvbnN0IHByZXZBcnJvdyA9IHBhcnNlSFRNTChpbk9wdHMucHJldkFycm93KTtcbiAgICBpZiAocHJldkFycm93LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uZmlnLnByZXZBcnJvdyA9IHByZXZBcnJvdy5jaGlsZE5vZGVzO1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLnByZXZBcnJvdztcbiAgfVxuICBpZiAoaW5PcHRzLm5leHRBcnJvdykge1xuICAgIGNvbnN0IG5leHRBcnJvdyA9IHBhcnNlSFRNTChpbk9wdHMubmV4dEFycm93KTtcbiAgICBpZiAobmV4dEFycm93LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uZmlnLm5leHRBcnJvdyA9IG5leHRBcnJvdy5jaGlsZE5vZGVzO1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLm5leHRBcnJvdztcbiAgfVxuXG4gIC8vKioqIG1pc2MgKioqLy9cbiAgaWYgKGluT3B0cy5kaXNhYmxlVG91Y2hLZXlib2FyZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uZmlnLmRpc2FibGVUb3VjaEtleWJvYXJkID0gJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQgJiYgISFpbk9wdHMuZGlzYWJsZVRvdWNoS2V5Ym9hcmQ7XG4gICAgZGVsZXRlIGluT3B0cy5kaXNhYmxlVG91Y2hLZXlib2FyZDtcbiAgfVxuICBpZiAoaW5PcHRzLm9yaWVudGF0aW9uKSB7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBpbk9wdHMub3JpZW50YXRpb24udG9Mb3dlckNhc2UoKS5zcGxpdCgvXFxzKy9nKTtcbiAgICBjb25maWcub3JpZW50YXRpb24gPSB7XG4gICAgICB4OiBvcmllbnRhdGlvbi5maW5kKHggPT4gKHggPT09ICdsZWZ0JyB8fCB4ID09PSAncmlnaHQnKSkgfHwgJ2F1dG8nLFxuICAgICAgeTogb3JpZW50YXRpb24uZmluZCh5ID0+ICh5ID09PSAndG9wJyB8fCB5ID09PSAnYm90dG9tJykpIHx8ICdhdXRvJyxcbiAgICB9O1xuICAgIGRlbGV0ZSBpbk9wdHMub3JpZW50YXRpb247XG4gIH1cbiAgaWYgKGluT3B0cy50b2RheUJ0bk1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHN3aXRjaChpbk9wdHMudG9kYXlCdG5Nb2RlKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGNvbmZpZy50b2RheUJ0bk1vZGUgPSBpbk9wdHMudG9kYXlCdG5Nb2RlO1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLnRvZGF5QnRuTW9kZTtcbiAgfVxuXG4gIC8vKioqIGNvcHkgdGhlIHJlc3QgKioqLy9cbiAgT2JqZWN0LmtleXMoaW5PcHRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAoaW5PcHRzW2tleV0gIT09IHVuZGVmaW5lZCAmJiBoYXNQcm9wZXJ0eShkZWZhdWx0T3B0aW9ucywga2V5KSkge1xuICAgICAgY29uZmlnW2tleV0gPSBpbk9wdHNba2V5XTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59XG4iLCJpbXBvcnQge2hhc1Byb3BlcnR5LCBsYXN0SXRlbU9mLCBpc0luUmFuZ2UsIGxpbWl0VG9SYW5nZX0gZnJvbSAnLi4vbGliL3V0aWxzLmpzJztcbmltcG9ydCB7dG9kYXl9IGZyb20gJy4uL2xpYi9kYXRlLmpzJztcbmltcG9ydCB7cGFyc2VIVE1MLCBnZXRQYXJlbnQsIHNob3dFbGVtZW50LCBoaWRlRWxlbWVudCwgZW1wdHlDaGlsZE5vZGVzfSBmcm9tICcuLi9saWIvZG9tLmpzJztcbmltcG9ydCB7cmVnaXN0ZXJMaXN0ZW5lcnN9IGZyb20gJy4uL2xpYi9ldmVudC5qcyc7XG5pbXBvcnQgcGlja2VyVGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZXMvcGlja2VyVGVtcGxhdGUuanMnO1xuaW1wb3J0IERheXNWaWV3IGZyb20gJy4vdmlld3MvRGF5c1ZpZXcuanMnO1xuaW1wb3J0IE1vbnRoc1ZpZXcgZnJvbSAnLi92aWV3cy9Nb250aHNWaWV3LmpzJztcbmltcG9ydCBZZWFyc1ZpZXcgZnJvbSAnLi92aWV3cy9ZZWFyc1ZpZXcuanMnO1xuaW1wb3J0IHt0cmlnZ2VyRGF0ZXBpY2tlckV2ZW50fSBmcm9tICcuLi9ldmVudHMvZnVuY3Rpb25zLmpzJztcbmltcG9ydCB7XG4gIG9uQ2xpY2tUb2RheUJ0bixcbiAgb25DbGlja0NsZWFyQnRuLFxuICBvbkNsaWNrVmlld1N3aXRjaCxcbiAgb25DbGlja1ByZXZCdG4sXG4gIG9uQ2xpY2tOZXh0QnRuLFxuICBvbkNsaWNrVmlldyxcbiAgb25Nb3VzZWRvd25QaWNrZXIsXG59IGZyb20gJy4uL2V2ZW50cy9waWNrZXJMaXN0ZW5lcnMuanMnO1xuXG5jb25zdCBvcmllbnRDbGFzc2VzID0gWydsZWZ0JywgJ3RvcCcsICdyaWdodCcsICdib3R0b20nXS5yZWR1Y2UoKG9iaiwga2V5KSA9PiB7XG4gIG9ialtrZXldID0gYGRhdGVwaWNrZXItb3JpZW50LSR7a2V5fWA7XG4gIHJldHVybiBvYmo7XG59LCB7fSk7XG5jb25zdCB0b1B4ID0gbnVtID0+IG51bSA/IGAke251bX1weGAgOiBudW07XG5cbmZ1bmN0aW9uIHByb2Nlc3NQaWNrZXJPcHRpb25zKHBpY2tlciwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucy50aXRsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKG9wdGlvbnMudGl0bGUpIHtcbiAgICAgIHBpY2tlci5jb250cm9scy50aXRsZS50ZXh0Q29udGVudCA9IG9wdGlvbnMudGl0bGU7XG4gICAgICBzaG93RWxlbWVudChwaWNrZXIuY29udHJvbHMudGl0bGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwaWNrZXIuY29udHJvbHMudGl0bGUudGV4dENvbnRlbnQgPSAnJztcbiAgICAgIGhpZGVFbGVtZW50KHBpY2tlci5jb250cm9scy50aXRsZSk7XG4gICAgfVxuICB9XG4gIGlmIChvcHRpb25zLnByZXZBcnJvdykge1xuICAgIGNvbnN0IHByZXZCdG4gPSBwaWNrZXIuY29udHJvbHMucHJldkJ0bjtcbiAgICBlbXB0eUNoaWxkTm9kZXMocHJldkJ0bik7XG4gICAgb3B0aW9ucy5wcmV2QXJyb3cuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgcHJldkJ0bi5hcHBlbmRDaGlsZChub2RlLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMubmV4dEFycm93KSB7XG4gICAgY29uc3QgbmV4dEJ0biA9IHBpY2tlci5jb250cm9scy5uZXh0QnRuO1xuICAgIGVtcHR5Q2hpbGROb2RlcyhuZXh0QnRuKTtcbiAgICBvcHRpb25zLm5leHRBcnJvdy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBuZXh0QnRuLmFwcGVuZENoaWxkKG5vZGUuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB9KTtcbiAgfVxuICBpZiAob3B0aW9ucy5sb2NhbGUpIHtcbiAgICBwaWNrZXIuY29udHJvbHMudG9kYXlCdG4udGV4dENvbnRlbnQgPSBvcHRpb25zLmxvY2FsZS50b2RheTtcbiAgICBwaWNrZXIuY29udHJvbHMuY2xlYXJCdG4udGV4dENvbnRlbnQgPSBvcHRpb25zLmxvY2FsZS5jbGVhcjtcbiAgfVxuICBpZiAob3B0aW9ucy50b2RheUJ0biAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKG9wdGlvbnMudG9kYXlCdG4pIHtcbiAgICAgIHNob3dFbGVtZW50KHBpY2tlci5jb250cm9scy50b2RheUJ0bik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpZGVFbGVtZW50KHBpY2tlci5jb250cm9scy50b2RheUJ0bik7XG4gICAgfVxuICB9XG4gIGlmIChoYXNQcm9wZXJ0eShvcHRpb25zLCAnbWluRGF0ZScpIHx8IGhhc1Byb3BlcnR5KG9wdGlvbnMsICdtYXhEYXRlJykpIHtcbiAgICBjb25zdCB7bWluRGF0ZSwgbWF4RGF0ZX0gPSBwaWNrZXIuZGF0ZXBpY2tlci5jb25maWc7XG4gICAgcGlja2VyLmNvbnRyb2xzLnRvZGF5QnRuLmRpc2FibGVkID0gIWlzSW5SYW5nZSh0b2RheSgpLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgfVxuICBpZiAob3B0aW9ucy5jbGVhckJ0biAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKG9wdGlvbnMuY2xlYXJCdG4pIHtcbiAgICAgIHNob3dFbGVtZW50KHBpY2tlci5jb250cm9scy5jbGVhckJ0bik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpZGVFbGVtZW50KHBpY2tlci5jb250cm9scy5jbGVhckJ0bik7XG4gICAgfVxuICB9XG59XG5cbi8vIENvbXB1dGUgdmlldyBkYXRlIHRvIHJlc2V0LCB3aGljaCB3aWxsIGJlLi4uXG4vLyAtIHRoZSBsYXN0IGl0ZW0gb2YgdGhlIHNlbGVjdGVkIGRhdGVzIG9yIGRlZmF1bHRWaWV3RGF0ZSBpZiBubyBzZWxlY3Rpb25cbi8vIC0gbGltaXR0ZWQgdG8gbWluRGF0ZSBvciBtYXhEYXRlIGlmIGl0IGV4Y2VlZHMgdGhlIHJhbmdlXG5mdW5jdGlvbiBjb21wdXRlUmVzZXRWaWV3RGF0ZShkYXRlcGlja2VyKSB7XG4gIGNvbnN0IHtkYXRlcywgY29uZmlnfSA9IGRhdGVwaWNrZXI7XG4gIGNvbnN0IHZpZXdEYXRlID0gZGF0ZXMubGVuZ3RoID4gMCA/IGxhc3RJdGVtT2YoZGF0ZXMpIDogY29uZmlnLmRlZmF1bHRWaWV3RGF0ZTtcbiAgcmV0dXJuIGxpbWl0VG9SYW5nZSh2aWV3RGF0ZSwgY29uZmlnLm1pbkRhdGUsIGNvbmZpZy5tYXhEYXRlKTtcbn1cblxuLy8gQ2hhbmdlIGN1cnJlbnQgdmlldydzIHZpZXcgZGF0ZVxuZnVuY3Rpb24gc2V0Vmlld0RhdGUocGlja2VyLCBuZXdEYXRlKSB7XG4gIGNvbnN0IG9sZFZpZXdEYXRlID0gbmV3IERhdGUocGlja2VyLnZpZXdEYXRlKTtcbiAgY29uc3QgbmV3Vmlld0RhdGUgPSBuZXcgRGF0ZShuZXdEYXRlKTtcbiAgY29uc3Qge2lkLCB5ZWFyLCBmaXJzdCwgbGFzdH0gPSBwaWNrZXIuY3VycmVudFZpZXc7XG4gIGNvbnN0IHZpZXdZZWFyID0gbmV3Vmlld0RhdGUuZ2V0RnVsbFllYXIoKTtcblxuICBwaWNrZXIudmlld0RhdGUgPSBuZXdEYXRlO1xuICBpZiAodmlld1llYXIgIT09IG9sZFZpZXdEYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICB0cmlnZ2VyRGF0ZXBpY2tlckV2ZW50KHBpY2tlci5kYXRlcGlja2VyLCAnY2hhbmdlWWVhcicpO1xuICB9XG4gIGlmIChuZXdWaWV3RGF0ZS5nZXRNb250aCgpICE9PSBvbGRWaWV3RGF0ZS5nZXRNb250aCgpKSB7XG4gICAgdHJpZ2dlckRhdGVwaWNrZXJFdmVudChwaWNrZXIuZGF0ZXBpY2tlciwgJ2NoYW5nZU1vbnRoJyk7XG4gIH1cblxuICAvLyByZXR1cm4gd2hldGhlciB0aGUgbmV3IGRhdGUgaXMgaW4gZGlmZmVyZW50IHBlcmlvZCBvbiB0aW1lIGZyb20gdGhlIG9uZVxuICAvLyBkaXNwbGF5ZWQgaW4gdGhlIGN1cnJlbnQgdmlld1xuICAvLyB3aGVuIHRydWUsIHRoZSB2aWV3IG5lZWRzIHRvIGJlIHJlLXJlbmRlcmVkIG9uIHRoZSBuZXh0IFVJIHJlZnJlc2guXG4gIHN3aXRjaCAoaWQpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gbmV3RGF0ZSA8IGZpcnN0IHx8IG5ld0RhdGUgPiBsYXN0O1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiB2aWV3WWVhciAhPT0geWVhcjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHZpZXdZZWFyIDwgZmlyc3QgfHwgdmlld1llYXIgPiBsYXN0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRleHREaXJlY3Rpb24oZWwpIHtcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5kaXJlY3Rpb247XG59XG5cbi8vIGZpbmQgdGhlIGNsb3NldCBzY3JvbGxhYmxlIGFuY2VzdG9yIGVsZW1udCB1bmRlciB0aGUgYm9keVxuZnVuY3Rpb24gZmluZFNjcm9sbFBhcmVudHMoZWwpIHtcbiAgY29uc3QgcGFyZW50ID0gZ2V0UGFyZW50KGVsKTtcbiAgaWYgKHBhcmVudCA9PT0gZG9jdW1lbnQuYm9keSB8fCAhcGFyZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gY2hlY2tpbmcgb3ZlcmZsb3cgb25seSBpcyBlbm91Z2ggYmVjYXVzZSBjb21wdXRlZCBvdmVyZmxvdyBjYW5ub3QgYmVcbiAgLy8gdmlzaWJsZSBvciBhIGNvbWJpbmF0aW9uIG9mIHZpc2libGUgYW5kIG90aGVyIHdoZW4gZWl0aGVyIGF4aXMgaXMgc2V0XG4gIC8vIHRvIG90aGVyIHRoYW4gdmlzaWJsZS5cbiAgLy8gKFNldHRpbmcgb25lIGF4aXMgdG8gb3RoZXIgdGhhbiAndmlzaWJsZScgd2hpbGUgdGhlIG90aGVyIGlzICd2aXNpYmxlJ1xuICAvLyByZXN1bHRzIGluIHRoZSBvdGhlciBheGlzIHR1cm5pbmcgdG8gJ2F1dG8nKVxuICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUocGFyZW50KS5vdmVyZmxvdyAhPT0gJ3Zpc2libGUnXG4gICAgPyBwYXJlbnRcbiAgICA6IGZpbmRTY3JvbGxQYXJlbnRzKHBhcmVudCk7XG59XG5cbi8vIENsYXNzIHJlcHJlc2VudGluZyB0aGUgcGlja2VyIFVJXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaWNrZXIge1xuICBjb25zdHJ1Y3RvcihkYXRlcGlja2VyKSB7XG4gICAgY29uc3Qge2NvbmZpZ30gPSB0aGlzLmRhdGVwaWNrZXIgPSBkYXRlcGlja2VyO1xuXG4gICAgY29uc3QgdGVtcGxhdGUgPSBwaWNrZXJUZW1wbGF0ZS5yZXBsYWNlKC8lYnV0dG9uQ2xhc3MlL2csIGNvbmZpZy5idXR0b25DbGFzcyk7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudCA9IHBhcnNlSFRNTCh0ZW1wbGF0ZSkuZmlyc3RDaGlsZDtcbiAgICBjb25zdCBbaGVhZGVyLCBtYWluLCBmb290ZXJdID0gZWxlbWVudC5maXJzdENoaWxkLmNoaWxkcmVuO1xuICAgIGNvbnN0IHRpdGxlID0gaGVhZGVyLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGNvbnN0IFtwcmV2QnRuLCB2aWV3U3dpdGNoLCBuZXh0QnRuXSA9IGhlYWRlci5sYXN0RWxlbWVudENoaWxkLmNoaWxkcmVuO1xuICAgIGNvbnN0IFt0b2RheUJ0biwgY2xlYXJCdG5dID0gZm9vdGVyLmZpcnN0Q2hpbGQuY2hpbGRyZW47XG4gICAgY29uc3QgY29udHJvbHMgPSB7XG4gICAgICB0aXRsZSxcbiAgICAgIHByZXZCdG4sXG4gICAgICB2aWV3U3dpdGNoLFxuICAgICAgbmV4dEJ0bixcbiAgICAgIHRvZGF5QnRuLFxuICAgICAgY2xlYXJCdG4sXG4gICAgfTtcbiAgICB0aGlzLm1haW4gPSBtYWluO1xuICAgIHRoaXMuY29udHJvbHMgPSBjb250cm9scztcblxuICAgIGNvbnN0IGVsZW1lbnRDbGFzcyA9IGRhdGVwaWNrZXIuaW5saW5lID8gJ2lubGluZScgOiAnZHJvcGRvd24nO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChgZGF0ZXBpY2tlci0ke2VsZW1lbnRDbGFzc31gKTtcblxuICAgIHByb2Nlc3NQaWNrZXJPcHRpb25zKHRoaXMsIGNvbmZpZyk7XG4gICAgdGhpcy52aWV3RGF0ZSA9IGNvbXB1dGVSZXNldFZpZXdEYXRlKGRhdGVwaWNrZXIpO1xuXG4gICAgLy8gc2V0IHVwIGV2ZW50IGxpc3RlbmVyc1xuICAgIHJlZ2lzdGVyTGlzdGVuZXJzKGRhdGVwaWNrZXIsIFtcbiAgICAgIFtlbGVtZW50LCAnbW91c2Vkb3duJywgb25Nb3VzZWRvd25QaWNrZXJdLFxuICAgICAgW21haW4sICdjbGljaycsIG9uQ2xpY2tWaWV3LmJpbmQobnVsbCwgZGF0ZXBpY2tlcildLFxuICAgICAgW2NvbnRyb2xzLnZpZXdTd2l0Y2gsICdjbGljaycsIG9uQ2xpY2tWaWV3U3dpdGNoLmJpbmQobnVsbCwgZGF0ZXBpY2tlcildLFxuICAgICAgW2NvbnRyb2xzLnByZXZCdG4sICdjbGljaycsIG9uQ2xpY2tQcmV2QnRuLmJpbmQobnVsbCwgZGF0ZXBpY2tlcildLFxuICAgICAgW2NvbnRyb2xzLm5leHRCdG4sICdjbGljaycsIG9uQ2xpY2tOZXh0QnRuLmJpbmQobnVsbCwgZGF0ZXBpY2tlcildLFxuICAgICAgW2NvbnRyb2xzLnRvZGF5QnRuLCAnY2xpY2snLCBvbkNsaWNrVG9kYXlCdG4uYmluZChudWxsLCBkYXRlcGlja2VyKV0sXG4gICAgICBbY29udHJvbHMuY2xlYXJCdG4sICdjbGljaycsIG9uQ2xpY2tDbGVhckJ0bi5iaW5kKG51bGwsIGRhdGVwaWNrZXIpXSxcbiAgICBdKTtcblxuICAgIC8vIHNldCB1cCB2aWV3c1xuICAgIHRoaXMudmlld3MgPSBbXG4gICAgICBuZXcgRGF5c1ZpZXcodGhpcyksXG4gICAgICBuZXcgTW9udGhzVmlldyh0aGlzKSxcbiAgICAgIG5ldyBZZWFyc1ZpZXcodGhpcywge2lkOiAyLCBuYW1lOiAneWVhcnMnLCBjZWxsQ2xhc3M6ICd5ZWFyJywgc3RlcDogMX0pLFxuICAgICAgbmV3IFllYXJzVmlldyh0aGlzLCB7aWQ6IDMsIG5hbWU6ICdkZWNhZGVzJywgY2VsbENsYXNzOiAnZGVjYWRlJywgc3RlcDogMTB9KSxcbiAgICBdO1xuICAgIHRoaXMuY3VycmVudFZpZXcgPSB0aGlzLnZpZXdzW2NvbmZpZy5zdGFydFZpZXddO1xuXG4gICAgdGhpcy5jdXJyZW50Vmlldy5yZW5kZXIoKTtcbiAgICB0aGlzLm1haW4uYXBwZW5kQ2hpbGQodGhpcy5jdXJyZW50Vmlldy5lbGVtZW50KTtcbiAgICBpZiAoY29uZmlnLmNvbnRhaW5lcikge1xuICAgICAgY29uZmlnLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlcGlja2VyLmlucHV0RmllbGQuYWZ0ZXIodGhpcy5lbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBwcm9jZXNzUGlja2VyT3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLnZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcbiAgICAgIHZpZXcuaW5pdChvcHRpb25zLCBmYWxzZSk7XG4gICAgfSk7XG4gICAgdGhpcy5jdXJyZW50Vmlldy5yZW5kZXIoKTtcbiAgfVxuXG4gIGRldGFjaCgpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKCk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHtkYXRlcGlja2VyLCBlbGVtZW50fSA9IHRoaXM7XG4gICAgaWYgKGRhdGVwaWNrZXIuaW5saW5lKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlbnN1cmUgcGlja2VyJ3MgZGlyZWN0aW9uIG1hdGNoZXMgaW5wdXQnc1xuICAgICAgY29uc3QgaW5wdXREaXJlY3Rpb24gPSBnZXRUZXh0RGlyZWN0aW9uKGRhdGVwaWNrZXIuaW5wdXRGaWVsZCk7XG4gICAgICBpZiAoaW5wdXREaXJlY3Rpb24gIT09IGdldFRleHREaXJlY3Rpb24oZ2V0UGFyZW50KGVsZW1lbnQpKSkge1xuICAgICAgICBlbGVtZW50LmRpciA9IGlucHV0RGlyZWN0aW9uO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50LmRpcikge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGlyJyk7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQuc3R5bGUudmlzaWJsaXR5ID0gJ2hpZGRlbic7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgdGhpcy5wbGFjZSgpO1xuICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmxpdHkgPSAnJztcblxuICAgICAgaWYgKGRhdGVwaWNrZXIuY29uZmlnLmRpc2FibGVUb3VjaEtleWJvYXJkKSB7XG4gICAgICAgIGRhdGVwaWNrZXIuaW5wdXRGaWVsZC5ibHVyKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0cmlnZ2VyRGF0ZXBpY2tlckV2ZW50KGRhdGVwaWNrZXIsICdzaG93Jyk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kYXRlcGlja2VyLmV4aXRFZGl0TW9kZSgpO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRyaWdnZXJEYXRlcGlja2VyRXZlbnQodGhpcy5kYXRlcGlja2VyLCAnaGlkZScpO1xuICB9XG5cbiAgcGxhY2UoKSB7XG4gICAgY29uc3Qge2NsYXNzTGlzdCwgb2Zmc2V0UGFyZW50LCBzdHlsZX0gPSB0aGlzLmVsZW1lbnQ7XG4gICAgY29uc3Qge2NvbmZpZywgaW5wdXRGaWVsZH0gPSB0aGlzLmRhdGVwaWNrZXI7XG4gICAgY29uc3Qge1xuICAgICAgd2lkdGg6IGNhbGVuZGFyV2lkdGgsXG4gICAgICBoZWlnaHQ6IGNhbGVuZGFySGVpZ2h0LFxuICAgIH0gPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qge1xuICAgICAgbGVmdDogaW5wdXRMZWZ0LFxuICAgICAgdG9wOiBpbnB1dFRvcCxcbiAgICAgIHJpZ2h0OiBpbnB1dFJpZ2h0LFxuICAgICAgYm90dG9tOiBpbnB1dEJvdHRvbSxcbiAgICAgIHdpZHRoOiBpbnB1dFdpZHRoLFxuICAgICAgaGVpZ2h0OiBpbnB1dEhlaWdodFxuICAgIH0gPSBpbnB1dEZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCB7eDogb3JpZW50WCwgeTogb3JpZW50WX0gPSBjb25maWcub3JpZW50YXRpb247XG4gICAgbGV0IGxlZnQgPSBpbnB1dExlZnQ7XG4gICAgbGV0IHRvcCA9IGlucHV0VG9wO1xuXG4gICAgLy8gY2FsaWN1bGF0ZSBvZmZzZXRMZWZ0L1RvcCBvZiBpbnB1dEZpZWxkXG4gICAgaWYgKG9mZnNldFBhcmVudCA9PT0gZG9jdW1lbnQuYm9keSB8fCAhb2Zmc2V0UGFyZW50KSB7XG4gICAgICBsZWZ0ICs9IHdpbmRvdy5zY3JvbGxYO1xuICAgICAgdG9wICs9IHdpbmRvdy5zY3JvbGxZO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBvZmZzZXRQYXJlbnRSZWN0ID0gb2Zmc2V0UGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgbGVmdCAtPSBvZmZzZXRQYXJlbnRSZWN0LmxlZnQgLSBvZmZzZXRQYXJlbnQuc2Nyb2xsTGVmdDtcbiAgICAgIHRvcCAtPSBvZmZzZXRQYXJlbnRSZWN0LnRvcCAtIG9mZnNldFBhcmVudC5zY3JvbGxUb3A7XG4gICAgfVxuXG4gICAgLy8gY2FsaWN1bGF0ZSB0aGUgYm91bmRhcmllcyBvZiB0aGUgdmlzaWJsZSBhcmVhIHRoYXQgY29udGFpbnMgaW5wdXRGaWVsZFxuICAgIGNvbnN0IHNjcm9sbFBhcmVudCA9IGZpbmRTY3JvbGxQYXJlbnRzKGlucHV0RmllbGQpO1xuICAgIGxldCBzY3JvbGxBcmVhTGVmdCA9IDA7XG4gICAgbGV0IHNjcm9sbEFyZWFUb3AgPSAwO1xuICAgIGxldCB7XG4gICAgICBjbGllbnRXaWR0aDogc2Nyb2xsQXJlYVJpZ2h0LFxuICAgICAgY2xpZW50SGVpZ2h0OiBzY3JvbGxBcmVhQm90dG9tLFxuICAgIH0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICBpZiAoc2Nyb2xsUGFyZW50KSB7XG4gICAgICBjb25zdCBzY3JvbGxQYXJlbnRSZWN0ID0gc2Nyb2xsUGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKHNjcm9sbFBhcmVudFJlY3QudG9wID4gMCkge1xuICAgICAgICBzY3JvbGxBcmVhVG9wID0gc2Nyb2xsUGFyZW50UmVjdC50b3A7XG4gICAgICB9XG4gICAgICBpZiAoc2Nyb2xsUGFyZW50UmVjdC5sZWZ0ID4gMCkge1xuICAgICAgICBzY3JvbGxBcmVhTGVmdCA9IHNjcm9sbFBhcmVudFJlY3QubGVmdDtcbiAgICAgIH1cbiAgICAgIGlmIChzY3JvbGxQYXJlbnRSZWN0LnJpZ2h0IDwgc2Nyb2xsQXJlYVJpZ2h0KSB7XG4gICAgICAgIHNjcm9sbEFyZWFSaWdodCA9IHNjcm9sbFBhcmVudFJlY3QucmlnaHQ7XG4gICAgICB9XG4gICAgICBpZiAoc2Nyb2xsUGFyZW50UmVjdC5ib3R0b20gPCBzY3JvbGxBcmVhQm90dG9tKSB7XG4gICAgICAgIHNjcm9sbEFyZWFCb3R0b20gPSBzY3JvbGxQYXJlbnRSZWN0LmJvdHRvbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZXRlcm1pbmUgdGhlIGhvcml6b250YWwgb3JpZW50YXRpb24gYW5kIGxlZnQgcG9zaXRpb25cbiAgICBsZXQgYWRqdXN0bWVudCA9IDA7XG4gICAgaWYgKG9yaWVudFggPT09ICdhdXRvJykge1xuICAgICAgaWYgKGlucHV0TGVmdCA8IHNjcm9sbEFyZWFMZWZ0KSB7XG4gICAgICAgIG9yaWVudFggPSAnbGVmdCc7XG4gICAgICAgIGFkanVzdG1lbnQgPSBzY3JvbGxBcmVhTGVmdCAtIGlucHV0TGVmdDtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRMZWZ0ICsgY2FsZW5kYXJXaWR0aCA+IHNjcm9sbEFyZWFSaWdodCkge1xuICAgICAgICBvcmllbnRYID0gJ3JpZ2h0JztcbiAgICAgICAgaWYgKHNjcm9sbEFyZWFSaWdodCA8IGlucHV0UmlnaHQpIHtcbiAgICAgICAgICBhZGp1c3RtZW50ID0gc2Nyb2xsQXJlYVJpZ2h0IC0gaW5wdXRSaWdodDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChnZXRUZXh0RGlyZWN0aW9uKGlucHV0RmllbGQpID09PSAncnRsJykge1xuICAgICAgICBvcmllbnRYID0gaW5wdXRSaWdodCAtIGNhbGVuZGFyV2lkdGggPCBzY3JvbGxBcmVhTGVmdCA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcmllbnRYID0gJ2xlZnQnO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3JpZW50WCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgbGVmdCArPSBpbnB1dFdpZHRoIC0gY2FsZW5kYXJXaWR0aDtcbiAgICB9XG4gICAgbGVmdCArPSBhZGp1c3RtZW50O1xuXG4gICAgLy8gZGV0ZXJtaW5lIHRoZSB2ZXJ0aWNhbCBvcmllbnRhdGlvbiBhbmQgdG9wIHBvc2l0aW9uXG4gICAgaWYgKG9yaWVudFkgPT09ICdhdXRvJykge1xuICAgICAgaWYgKGlucHV0VG9wIC0gY2FsZW5kYXJIZWlnaHQgPiBzY3JvbGxBcmVhVG9wKSB7XG4gICAgICAgIG9yaWVudFkgPSBpbnB1dEJvdHRvbSArIGNhbGVuZGFySGVpZ2h0ID4gc2Nyb2xsQXJlYUJvdHRvbSA/ICd0b3AnIDogJ2JvdHRvbSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcmllbnRZID0gJ2JvdHRvbSc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmllbnRZID09PSAndG9wJykge1xuICAgICAgdG9wIC09IGNhbGVuZGFySGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0b3AgKz0gaW5wdXRIZWlnaHQ7XG4gICAgfVxuXG4gICAgY2xhc3NMaXN0LnJlbW92ZSguLi5PYmplY3QudmFsdWVzKG9yaWVudENsYXNzZXMpKTtcbiAgICBjbGFzc0xpc3QuYWRkKG9yaWVudENsYXNzZXNbb3JpZW50WF0sIG9yaWVudENsYXNzZXNbb3JpZW50WV0pO1xuXG4gICAgc3R5bGUubGVmdCA9IHRvUHgobGVmdCk7XG4gICAgc3R5bGUudG9wID0gdG9QeCh0b3ApO1xuICB9XG5cbiAgc2V0Vmlld1N3aXRjaExhYmVsKGxhYmVsVGV4dCkge1xuICAgIHRoaXMuY29udHJvbHMudmlld1N3aXRjaC50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcbiAgfVxuXG4gIHNldFByZXZCdG5EaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIHRoaXMuY29udHJvbHMucHJldkJ0bi5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICB9XG5cbiAgc2V0TmV4dEJ0bkRpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5jb250cm9scy5uZXh0QnRuLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICBjaGFuZ2VWaWV3KHZpZXdJZCkge1xuICAgIGNvbnN0IG9sZFZpZXcgPSB0aGlzLmN1cnJlbnRWaWV3O1xuICAgIGNvbnN0IG5ld1ZpZXcgPSAgdGhpcy52aWV3c1t2aWV3SWRdO1xuICAgIGlmIChuZXdWaWV3LmlkICE9PSBvbGRWaWV3LmlkKSB7XG4gICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gbmV3VmlldztcbiAgICAgIHRoaXMuX3JlbmRlck1ldGhvZCA9ICdyZW5kZXInO1xuICAgICAgdHJpZ2dlckRhdGVwaWNrZXJFdmVudCh0aGlzLmRhdGVwaWNrZXIsICdjaGFuZ2VWaWV3Jyk7XG4gICAgICB0aGlzLm1haW4ucmVwbGFjZUNoaWxkKG5ld1ZpZXcuZWxlbWVudCwgb2xkVmlldy5lbGVtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBDaGFuZ2UgdGhlIGZvY3VzZWQgZGF0ZSAodmlldyBkYXRlKVxuICBjaGFuZ2VGb2N1cyhuZXdWaWV3RGF0ZSkge1xuICAgIHRoaXMuX3JlbmRlck1ldGhvZCA9IHNldFZpZXdEYXRlKHRoaXMsIG5ld1ZpZXdEYXRlKSA/ICdyZW5kZXInIDogJ3JlZnJlc2hGb2N1cyc7XG4gICAgdGhpcy52aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XG4gICAgICB2aWV3LnVwZGF0ZUZvY3VzKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBBcHBseSB0aGUgY2hhbmdlIG9mIHRoZSBzZWxlY3RlZCBkYXRlc1xuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgbmV3Vmlld0RhdGUgPSBjb21wdXRlUmVzZXRWaWV3RGF0ZSh0aGlzLmRhdGVwaWNrZXIpO1xuICAgIHRoaXMuX3JlbmRlck1ldGhvZCA9IHNldFZpZXdEYXRlKHRoaXMsIG5ld1ZpZXdEYXRlKSA/ICdyZW5kZXInIDogJ3JlZnJlc2gnO1xuICAgIHRoaXMudmlld3MuZm9yRWFjaCgodmlldykgPT4ge1xuICAgICAgdmlldy51cGRhdGVGb2N1cygpO1xuICAgICAgdmlldy51cGRhdGVTZWxlY3Rpb24oKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIFJlZnJlc2ggdGhlIHBpY2tlciBVSVxuICByZW5kZXIocXVpY2tSZW5kZXIgPSB0cnVlKSB7XG4gICAgY29uc3QgcmVuZGVyTWV0aG9kID0gKHF1aWNrUmVuZGVyICYmIHRoaXMuX3JlbmRlck1ldGhvZCkgfHwgJ3JlbmRlcic7XG4gICAgZGVsZXRlIHRoaXMuX3JlbmRlck1ldGhvZDtcblxuICAgIHRoaXMuY3VycmVudFZpZXdbcmVuZGVyTWV0aG9kXSgpO1xuICB9XG59XG4iLCJpbXBvcnQge2NyZWF0ZVRhZ1JlcGVhdCwgb3B0aW1pemVUZW1wbGF0ZUhUTUx9IGZyb20gJy4uLy4uL2xpYi91dGlscy5qcyc7XG5cbmNvbnN0IGNhbGVuZGFyV2Vla3NUZW1wbGF0ZSA9IG9wdGltaXplVGVtcGxhdGVIVE1MKGA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItd2Vla3NcIj5cbiAgPGRpdiBjbGFzcz1cImRheXMtb2Ytd2Vla1wiPjxzcGFuIGNsYXNzPVwiZG93XCI+PC9zcGFuPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwid2Vla3NcIj4ke2NyZWF0ZVRhZ1JlcGVhdCgnc3BhbicsIDYsIHtjbGFzczogJ3dlZWsnfSl9PC9kaXY+XG48L2Rpdj5gKTtcblxuZXhwb3J0IGRlZmF1bHQgY2FsZW5kYXJXZWVrc1RlbXBsYXRlO1xuIiwiaW1wb3J0IHtjcmVhdGVUYWdSZXBlYXQsIG9wdGltaXplVGVtcGxhdGVIVE1MfSBmcm9tICcuLi8uLi9saWIvdXRpbHMuanMnO1xuXG5jb25zdCBkYXlzVGVtcGxhdGUgPSBvcHRpbWl6ZVRlbXBsYXRlSFRNTChgPGRpdiBjbGFzcz1cImRheXNcIj5cbiAgPGRpdiBjbGFzcz1cImRheXMtb2Ytd2Vla1wiPiR7Y3JlYXRlVGFnUmVwZWF0KCdzcGFuJywgNywge2NsYXNzOiAnZG93J30pfTwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1ncmlkXCI+JHtjcmVhdGVUYWdSZXBlYXQoJ3NwYW4nLCA0Mil9PC9kaXY+XG48L2Rpdj5gKTtcblxuZXhwb3J0IGRlZmF1bHQgZGF5c1RlbXBsYXRlO1xuIiwiaW1wb3J0IHtvcHRpbWl6ZVRlbXBsYXRlSFRNTH0gZnJvbSAnLi4vLi4vbGliL3V0aWxzLmpzJztcblxuY29uc3QgcGlja2VyVGVtcGxhdGUgPSBvcHRpbWl6ZVRlbXBsYXRlSFRNTChgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXJcIj5cbiAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItcGlja2VyXCI+XG4gICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItaGVhZGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci10aXRsZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItY29udHJvbHNcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIlYnV0dG9uQ2xhc3MlIHByZXYtYnRuXCI+PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJWJ1dHRvbkNsYXNzJSB2aWV3LXN3aXRjaFwiPjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiVidXR0b25DbGFzcyUgbmV4dC1idG5cIj48L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLW1haW5cIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1mb290ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWNvbnRyb2xzXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJWJ1dHRvbkNsYXNzJSB0b2RheS1idG5cIj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIlYnV0dG9uQ2xhc3MlIGNsZWFyLWJ0blwiPjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+YCk7XG5cbmV4cG9ydCBkZWZhdWx0IHBpY2tlclRlbXBsYXRlO1xuIiwiaW1wb3J0IHtoYXNQcm9wZXJ0eSwgcHVzaFVuaXF1ZX0gZnJvbSAnLi4vLi4vbGliL3V0aWxzLmpzJztcbmltcG9ydCB7dG9kYXksIGRhdGVWYWx1ZSwgYWRkRGF5cywgYWRkV2Vla3MsIGRheU9mVGhlV2Vla09mLCBnZXRXZWVrfSBmcm9tICcuLi8uLi9saWIvZGF0ZS5qcyc7XG5pbXBvcnQge2Zvcm1hdERhdGV9IGZyb20gJy4uLy4uL2xpYi9kYXRlLWZvcm1hdC5qcyc7XG5pbXBvcnQge3BhcnNlSFRNTCwgc2hvd0VsZW1lbnQsIGhpZGVFbGVtZW50fSBmcm9tICcuLi8uLi9saWIvZG9tLmpzJztcbmltcG9ydCBkYXlzVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL2RheXNUZW1wbGF0ZS5qcyc7XG5pbXBvcnQgY2FsZW5kYXJXZWVrc1RlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9jYWxlbmRhcldlZWtzVGVtcGxhdGUuanMnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5c1ZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgY29uc3RydWN0b3IocGlja2VyKSB7XG4gICAgc3VwZXIocGlja2VyLCB7XG4gICAgICBpZDogMCxcbiAgICAgIG5hbWU6ICdkYXlzJyxcbiAgICAgIGNlbGxDbGFzczogJ2RheScsXG4gICAgfSk7XG4gIH1cblxuICBpbml0KG9wdGlvbnMsIG9uQ29uc3RydWN0aW9uID0gdHJ1ZSkge1xuICAgIGlmIChvbkNvbnN0cnVjdGlvbikge1xuICAgICAgY29uc3QgaW5uZXIgPSBwYXJzZUhUTUwoZGF5c1RlbXBsYXRlKS5maXJzdENoaWxkO1xuICAgICAgdGhpcy5kb3cgPSBpbm5lci5maXJzdENoaWxkO1xuICAgICAgdGhpcy5ncmlkID0gaW5uZXIubGFzdENoaWxkO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGlubmVyKTtcbiAgICB9XG4gICAgc3VwZXIuaW5pdChvcHRpb25zKTtcbiAgfVxuXG4gIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGxldCB1cGRhdGVET1c7XG5cbiAgICBpZiAoaGFzUHJvcGVydHkob3B0aW9ucywgJ21pbkRhdGUnKSkge1xuICAgICAgdGhpcy5taW5EYXRlID0gb3B0aW9ucy5taW5EYXRlO1xuICAgIH1cbiAgICBpZiAoaGFzUHJvcGVydHkob3B0aW9ucywgJ21heERhdGUnKSkge1xuICAgICAgdGhpcy5tYXhEYXRlID0gb3B0aW9ucy5tYXhEYXRlO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kYXRlc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmRhdGVzRGlzYWJsZWQgPSBvcHRpb25zLmRhdGVzRGlzYWJsZWQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRheXNPZldlZWtEaXNhYmxlZCkge1xuICAgICAgdGhpcy5kYXlzT2ZXZWVrRGlzYWJsZWQgPSBvcHRpb25zLmRheXNPZldlZWtEaXNhYmxlZDtcbiAgICAgIHVwZGF0ZURPVyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRheXNPZldlZWtIaWdobGlnaHRlZCkge1xuICAgICAgdGhpcy5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQgPSBvcHRpb25zLmRheXNPZldlZWtIaWdobGlnaHRlZDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudG9kYXlIaWdobGlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy50b2RheUhpZ2hsaWdodCA9IG9wdGlvbnMudG9kYXlIaWdobGlnaHQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLndlZWtTdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLndlZWtTdGFydCA9IG9wdGlvbnMud2Vla1N0YXJ0O1xuICAgICAgdGhpcy53ZWVrRW5kID0gb3B0aW9ucy53ZWVrRW5kO1xuICAgICAgdXBkYXRlRE9XID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubG9jYWxlKSB7XG4gICAgICBjb25zdCBsb2NhbGUgPSB0aGlzLmxvY2FsZSA9IG9wdGlvbnMubG9jYWxlO1xuICAgICAgdGhpcy5kYXlOYW1lcyA9IGxvY2FsZS5kYXlzTWluO1xuICAgICAgdGhpcy5zd2l0Y2hMYWJlbEZvcm1hdCA9IGxvY2FsZS50aXRsZUZvcm1hdDtcbiAgICAgIHVwZGF0ZURPVyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmJlZm9yZVNob3dEYXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5iZWZvcmVTaG93ID0gdHlwZW9mIG9wdGlvbnMuYmVmb3JlU2hvd0RheSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IG9wdGlvbnMuYmVmb3JlU2hvd0RheVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5jYWxlbmRhcldlZWtzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChvcHRpb25zLmNhbGVuZGFyV2Vla3MgJiYgIXRoaXMuY2FsZW5kYXJXZWVrcykge1xuICAgICAgICBjb25zdCB3ZWVrc0VsZW0gPSBwYXJzZUhUTUwoY2FsZW5kYXJXZWVrc1RlbXBsYXRlKS5maXJzdENoaWxkO1xuICAgICAgICB0aGlzLmNhbGVuZGFyV2Vla3MgPSB7XG4gICAgICAgICAgZWxlbWVudDogd2Vla3NFbGVtLFxuICAgICAgICAgIGRvdzogd2Vla3NFbGVtLmZpcnN0Q2hpbGQsXG4gICAgICAgICAgd2Vla3M6IHdlZWtzRWxlbS5sYXN0Q2hpbGQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZWxlbWVudC5pbnNlcnRCZWZvcmUod2Vla3NFbGVtLCB0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2FsZW5kYXJXZWVrcyAmJiAhb3B0aW9ucy5jYWxlbmRhcldlZWtzKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmNhbGVuZGFyV2Vla3MuZWxlbWVudCk7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJXZWVrcyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNob3dEYXlzT2ZXZWVrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChvcHRpb25zLnNob3dEYXlzT2ZXZWVrKSB7XG4gICAgICAgIHNob3dFbGVtZW50KHRoaXMuZG93KTtcbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXJXZWVrcykge1xuICAgICAgICAgIHNob3dFbGVtZW50KHRoaXMuY2FsZW5kYXJXZWVrcy5kb3cpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoaWRlRWxlbWVudCh0aGlzLmRvdyk7XG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgICAgICBoaWRlRWxlbWVudCh0aGlzLmNhbGVuZGFyV2Vla3MuZG93KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBkYXlzLW9mLXdlZWsgd2hlbiBsb2NhbGUsIGRheXNPZndlZWtEaXNhYmxlZCBvciB3ZWVrU3RhcnQgaXMgY2hhbmdlZFxuICAgIGlmICh1cGRhdGVET1cpIHtcbiAgICAgIEFycmF5LmZyb20odGhpcy5kb3cuY2hpbGRyZW4pLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBkb3cgPSAodGhpcy53ZWVrU3RhcnQgKyBpbmRleCkgJSA3O1xuICAgICAgICBlbC50ZXh0Q29udGVudCA9IHRoaXMuZGF5TmFtZXNbZG93XTtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gdGhpcy5kYXlzT2ZXZWVrRGlzYWJsZWQuaW5jbHVkZXMoZG93KSA/ICdkb3cgZGlzYWJsZWQnIDogJ2Rvdyc7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBBcHBseSB1cGRhdGUgb24gdGhlIGZvY3VzZWQgZGF0ZSB0byB2aWV3J3Mgc2V0dGluZ3NcbiAgdXBkYXRlRm9jdXMoKSB7XG4gICAgY29uc3Qgdmlld0RhdGUgPSBuZXcgRGF0ZSh0aGlzLnBpY2tlci52aWV3RGF0ZSk7XG4gICAgY29uc3Qgdmlld1llYXIgPSB2aWV3RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IHZpZXdNb250aCA9IHZpZXdEYXRlLmdldE1vbnRoKCk7XG4gICAgY29uc3QgZmlyc3RPZk1vbnRoID0gZGF0ZVZhbHVlKHZpZXdZZWFyLCB2aWV3TW9udGgsIDEpO1xuICAgIGNvbnN0IHN0YXJ0ID0gZGF5T2ZUaGVXZWVrT2YoZmlyc3RPZk1vbnRoLCB0aGlzLndlZWtTdGFydCwgdGhpcy53ZWVrU3RhcnQpO1xuXG4gICAgdGhpcy5maXJzdCA9IGZpcnN0T2ZNb250aDtcbiAgICB0aGlzLmxhc3QgPSBkYXRlVmFsdWUodmlld1llYXIsIHZpZXdNb250aCArIDEsIDApO1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmZvY3VzZWQgPSB0aGlzLnBpY2tlci52aWV3RGF0ZTtcbiAgfVxuXG4gIC8vIEFwcGx5IHVwZGF0ZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZXMgdG8gdmlldydzIHNldHRpbmdzXG4gIHVwZGF0ZVNlbGVjdGlvbigpIHtcbiAgICBjb25zdCB7ZGF0ZXMsIHJhbmdlcGlja2VyfSA9IHRoaXMucGlja2VyLmRhdGVwaWNrZXI7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGRhdGVzO1xuICAgIGlmIChyYW5nZXBpY2tlcikge1xuICAgICAgdGhpcy5yYW5nZSA9IHJhbmdlcGlja2VyLmRhdGVzO1xuICAgIH1cbiAgfVxuXG4gICAvLyBVcGRhdGUgdGhlIGVudGlyZSB2aWV3IFVJXG4gIHJlbmRlcigpIHtcbiAgICAvLyB1cGRhdGUgdG9kYXkgbWFya2VyIG9uIGV2ZXIgcmVuZGVyXG4gICAgdGhpcy50b2RheSA9IHRoaXMudG9kYXlIaWdobGlnaHQgPyB0b2RheSgpIDogdW5kZWZpbmVkO1xuICAgIC8vIHJlZnJlc2ggZGlzYWJsZWQgZGF0ZXMgb24gZXZlcnkgcmVuZGVyIGluIG9yZGVyIHRvIGNsZWFyIHRoZSBvbmVzIGFkZGVkXG4gICAgLy8gYnkgYmVmb3JlU2hvdyBob29rIGF0IHByZXZpb3VzIHJlbmRlclxuICAgIHRoaXMuZGlzYWJsZWQgPSBbLi4udGhpcy5kYXRlc0Rpc2FibGVkXTtcblxuICAgIGNvbnN0IHN3aXRjaExhYmVsID0gZm9ybWF0RGF0ZSh0aGlzLmZvY3VzZWQsIHRoaXMuc3dpdGNoTGFiZWxGb3JtYXQsIHRoaXMubG9jYWxlKTtcbiAgICB0aGlzLnBpY2tlci5zZXRWaWV3U3dpdGNoTGFiZWwoc3dpdGNoTGFiZWwpO1xuICAgIHRoaXMucGlja2VyLnNldFByZXZCdG5EaXNhYmxlZCh0aGlzLmZpcnN0IDw9IHRoaXMubWluRGF0ZSk7XG4gICAgdGhpcy5waWNrZXIuc2V0TmV4dEJ0bkRpc2FibGVkKHRoaXMubGFzdCA+PSB0aGlzLm1heERhdGUpO1xuXG4gICAgaWYgKHRoaXMuY2FsZW5kYXJXZWVrcykge1xuICAgICAgLy8gc3RhcnQgb2YgdGhlIFVUQyB3ZWVrIChNb25kYXkpIG9mIHRoZSAxc3Qgb2YgdGhlIG1vbnRoXG4gICAgICBjb25zdCBzdGFydE9mV2VlayA9IGRheU9mVGhlV2Vla09mKHRoaXMuZmlyc3QsIDEsIDEpO1xuICAgICAgQXJyYXkuZnJvbSh0aGlzLmNhbGVuZGFyV2Vla3Mud2Vla3MuY2hpbGRyZW4pLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICBlbC50ZXh0Q29udGVudCA9IGdldFdlZWsoYWRkV2Vla3Moc3RhcnRPZldlZWssIGluZGV4KSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgQXJyYXkuZnJvbSh0aGlzLmdyaWQuY2hpbGRyZW4pLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgY2xhc3NMaXN0ID0gZWwuY2xhc3NMaXN0O1xuICAgICAgY29uc3QgY3VycmVudCA9IGFkZERheXModGhpcy5zdGFydCwgaW5kZXgpO1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnQpO1xuICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXkoKTtcblxuICAgICAgZWwuY2xhc3NOYW1lID0gYGRhdGVwaWNrZXItY2VsbCAke3RoaXMuY2VsbENsYXNzfWA7XG4gICAgICBlbC5kYXRhc2V0LmRhdGUgPSBjdXJyZW50O1xuICAgICAgZWwudGV4dENvbnRlbnQgPSBkYXRlLmdldERhdGUoKTtcblxuICAgICAgaWYgKGN1cnJlbnQgPCB0aGlzLmZpcnN0KSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3ByZXYnKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudCA+IHRoaXMubGFzdCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCduZXh0Jyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy50b2RheSA9PT0gY3VycmVudCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCd0b2RheScpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPCB0aGlzLm1pbkRhdGUgfHwgY3VycmVudCA+IHRoaXMubWF4RGF0ZSB8fCB0aGlzLmRpc2FibGVkLmluY2x1ZGVzKGN1cnJlbnQpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kYXlzT2ZXZWVrRGlzYWJsZWQuaW5jbHVkZXMoZGF5KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICBwdXNoVW5pcXVlKHRoaXMuZGlzYWJsZWQsIGN1cnJlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGF5c09mV2Vla0hpZ2hsaWdodGVkLmluY2x1ZGVzKGRheSkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnaGlnaGxpZ2h0ZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgIGNvbnN0IFtyYW5nZVN0YXJ0LCByYW5nZUVuZF0gPSB0aGlzLnJhbmdlO1xuICAgICAgICBpZiAoY3VycmVudCA+IHJhbmdlU3RhcnQgJiYgY3VycmVudCA8IHJhbmdlRW5kKSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudCA9PT0gcmFuZ2VTdGFydCkge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLXN0YXJ0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IHJhbmdlRW5kKSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UtZW5kJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkLmluY2x1ZGVzKGN1cnJlbnQpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA9PT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYmVmb3JlU2hvdykge1xuICAgICAgICB0aGlzLnBlcmZvcm1CZWZvcmVIb29rKGVsLCBjdXJyZW50LCBjdXJyZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgdmlldyBVSSBieSBhcHBseWluZyB0aGUgY2hhbmdlcyBvZiBzZWxlY3RlZCBhbmQgZm9jdXNlZCBpdGVtc1xuICByZWZyZXNoKCkge1xuICAgIGNvbnN0IFtyYW5nZVN0YXJ0LCByYW5nZUVuZF0gPSB0aGlzLnJhbmdlIHx8IFtdO1xuICAgIHRoaXMuZ3JpZFxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYW5nZSwgLnJhbmdlLXN0YXJ0LCAucmFuZ2UtZW5kLCAuc2VsZWN0ZWQsIC5mb2N1c2VkJylcbiAgICAgIC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdyYW5nZScsICdyYW5nZS1zdGFydCcsICdyYW5nZS1lbmQnLCAnc2VsZWN0ZWQnLCAnZm9jdXNlZCcpO1xuICAgICAgfSk7XG4gICAgQXJyYXkuZnJvbSh0aGlzLmdyaWQuY2hpbGRyZW4pLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gTnVtYmVyKGVsLmRhdGFzZXQuZGF0ZSk7XG4gICAgICBjb25zdCBjbGFzc0xpc3QgPSBlbC5jbGFzc0xpc3Q7XG4gICAgICBpZiAoY3VycmVudCA+IHJhbmdlU3RhcnQgJiYgY3VycmVudCA8IHJhbmdlRW5kKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlJyk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA9PT0gcmFuZ2VTdGFydCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1zdGFydCcpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHJhbmdlRW5kKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLWVuZCcpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQuaW5jbHVkZXMoY3VycmVudCkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ID09PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSB2aWV3IFVJIGJ5IGFwcGx5aW5nIHRoZSBjaGFuZ2Ugb2YgZm9jdXNlZCBpdGVtXG4gIHJlZnJlc2hGb2N1cygpIHtcbiAgICBjb25zdCBpbmRleCA9IE1hdGgucm91bmQoKHRoaXMuZm9jdXNlZCAtIHRoaXMuc3RhcnQpIC8gODY0MDAwMDApO1xuICAgIHRoaXMuZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9jdXNlZCcpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdmb2N1c2VkJyk7XG4gICAgfSk7XG4gICAgdGhpcy5ncmlkLmNoaWxkcmVuW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7aGFzUHJvcGVydHksIHB1c2hVbmlxdWUsIGNyZWF0ZVRhZ1JlcGVhdH0gZnJvbSAnLi4vLi4vbGliL3V0aWxzLmpzJztcbmltcG9ydCB7ZGF0ZVZhbHVlfSBmcm9tICcuLi8uLi9saWIvZGF0ZS5qcyc7XG5pbXBvcnQge3BhcnNlSFRNTH0gZnJvbSAnLi4vLi4vbGliL2RvbS5qcyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcuanMnO1xuXG5mdW5jdGlvbiBjb21wdXRlTW9udGhSYW5nZShyYW5nZSwgdGhpc1llYXIpIHtcbiAgaWYgKCFyYW5nZSB8fCAhcmFuZ2VbMF0gfHwgIXJhbmdlWzFdKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgW1tzdGFydFksIHN0YXJ0TV0sIFtlbmRZLCBlbmRNXV0gPSByYW5nZTtcbiAgaWYgKHN0YXJ0WSA+IHRoaXNZZWFyIHx8IGVuZFkgPCB0aGlzWWVhcikge1xuICAgIHJldHVybjtcbiAgfVxuICByZXR1cm4gW1xuICAgIHN0YXJ0WSA9PT0gdGhpc1llYXIgPyBzdGFydE0gOiAtMSxcbiAgICBlbmRZID09PSB0aGlzWWVhciA/IGVuZE0gOiAxMixcbiAgXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9udGhzVmlldyBleHRlbmRzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihwaWNrZXIpIHtcbiAgICBzdXBlcihwaWNrZXIsIHtcbiAgICAgIGlkOiAxLFxuICAgICAgbmFtZTogJ21vbnRocycsXG4gICAgICBjZWxsQ2xhc3M6ICdtb250aCcsXG4gICAgfSk7XG4gIH1cblxuICBpbml0KG9wdGlvbnMsIG9uQ29uc3RydWN0aW9uID0gdHJ1ZSkge1xuICAgIGlmIChvbkNvbnN0cnVjdGlvbikge1xuICAgICAgdGhpcy5ncmlkID0gdGhpcy5lbGVtZW50O1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21vbnRocycsICdkYXRlcGlja2VyLWdyaWQnKTtcbiAgICAgIHRoaXMuZ3JpZC5hcHBlbmRDaGlsZChwYXJzZUhUTUwoY3JlYXRlVGFnUmVwZWF0KCdzcGFuJywgMTIsIHsnZGF0YS1tb250aCc6IGl4ID0+IGl4fSkpKTtcbiAgICB9XG4gICAgc3VwZXIuaW5pdChvcHRpb25zKTtcbiAgfVxuXG4gIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmxvY2FsZSkge1xuICAgICAgdGhpcy5tb250aE5hbWVzID0gb3B0aW9ucy5sb2NhbGUubW9udGhzU2hvcnQ7XG4gICAgfVxuICAgIGlmIChoYXNQcm9wZXJ0eShvcHRpb25zLCAnbWluRGF0ZScpKSB7XG4gICAgICBpZiAob3B0aW9ucy5taW5EYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5taW5ZZWFyID0gdGhpcy5taW5Nb250aCA9IHRoaXMubWluRGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1pbkRhdGVPYmogPSBuZXcgRGF0ZShvcHRpb25zLm1pbkRhdGUpO1xuICAgICAgICB0aGlzLm1pblllYXIgPSBtaW5EYXRlT2JqLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHRoaXMubWluTW9udGggPSBtaW5EYXRlT2JqLmdldE1vbnRoKCk7XG4gICAgICAgIHRoaXMubWluRGF0ZSA9IG1pbkRhdGVPYmouc2V0RGF0ZSgxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGhhc1Byb3BlcnR5KG9wdGlvbnMsICdtYXhEYXRlJykpIHtcbiAgICAgIGlmIChvcHRpb25zLm1heERhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm1heFllYXIgPSB0aGlzLm1heE1vbnRoID0gdGhpcy5tYXhEYXRlID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWF4RGF0ZU9iaiA9IG5ldyBEYXRlKG9wdGlvbnMubWF4RGF0ZSk7XG4gICAgICAgIHRoaXMubWF4WWVhciA9IG1heERhdGVPYmouZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdGhpcy5tYXhNb250aCA9IG1heERhdGVPYmouZ2V0TW9udGgoKTtcbiAgICAgICAgdGhpcy5tYXhEYXRlID0gZGF0ZVZhbHVlKHRoaXMubWF4WWVhciwgdGhpcy5tYXhNb250aCArIDEsIDApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5pc01pblZpZXcpIHtcbiAgICAgIGlmIChvcHRpb25zLmRhdGVzRGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5kYXRlc0Rpc2FibGVkID0gb3B0aW9ucy5kYXRlc0Rpc2FibGVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGVzRGlzYWJsZWQgPSBbXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuYmVmb3JlU2hvd01vbnRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYmVmb3JlU2hvdyA9IHR5cGVvZiBvcHRpb25zLmJlZm9yZVNob3dNb250aCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IG9wdGlvbnMuYmVmb3JlU2hvd01vbnRoXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSB2aWV3J3Mgc2V0dGluZ3MgdG8gcmVmbGVjdCB0aGUgdmlld0RhdGUgc2V0IG9uIHRoZSBwaWNrZXJcbiAgdXBkYXRlRm9jdXMoKSB7XG4gICAgY29uc3Qgdmlld0RhdGUgPSBuZXcgRGF0ZSh0aGlzLnBpY2tlci52aWV3RGF0ZSk7XG4gICAgdGhpcy55ZWFyID0gdmlld0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICB0aGlzLmZvY3VzZWQgPSB2aWV3RGF0ZS5nZXRNb250aCgpO1xuICB9XG5cbiAgLy8gVXBkYXRlIHZpZXcncyBzZXR0aW5ncyB0byByZWZsZWN0IHRoZSBzZWxlY3RlZCBkYXRlc1xuICB1cGRhdGVTZWxlY3Rpb24oKSB7XG4gICAgY29uc3Qge2RhdGVzLCByYW5nZXBpY2tlcn0gPSB0aGlzLnBpY2tlci5kYXRlcGlja2VyO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlcy5yZWR1Y2UoKHNlbGVjdGVkLCB0aW1lVmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lVmFsdWUpO1xuICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgaWYgKHNlbGVjdGVkW3llYXJdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2VsZWN0ZWRbeWVhcl0gPSBbbW9udGhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHVzaFVuaXF1ZShzZWxlY3RlZFt5ZWFyXSwgbW9udGgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGVjdGVkO1xuICAgIH0sIHt9KTtcbiAgICBpZiAocmFuZ2VwaWNrZXIgJiYgcmFuZ2VwaWNrZXIuZGF0ZXMpIHtcbiAgICAgIHRoaXMucmFuZ2UgPSByYW5nZXBpY2tlci5kYXRlcy5tYXAodGltZVZhbHVlID0+IHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRpbWVWYWx1ZSk7XG4gICAgICAgIHJldHVybiBpc05hTihkYXRlKSA/IHVuZGVmaW5lZCA6IFtkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKV07XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIGVudGlyZSB2aWV3IFVJXG4gIHJlbmRlcigpIHtcbiAgICAvLyByZWZyZXNoIGRpc2FibGVkIG1vbnRocyBvbiBldmVyeSByZW5kZXIgaW4gb3JkZXIgdG8gY2xlYXIgdGhlIG9uZXMgYWRkZWRcbiAgICAvLyBieSBiZWZvcmVTaG93IGhvb2sgYXQgcHJldmlvdXMgcmVuZGVyXG4gICAgLy8gdGhpcy5kaXNhYmxlZCA9IFsuLi50aGlzLmRhdGVzRGlzYWJsZWRdO1xuICAgIHRoaXMuZGlzYWJsZWQgPSB0aGlzLmRhdGVzRGlzYWJsZWQucmVkdWNlKChhcnIsIGRpc2FibGVkKSA9PiB7XG4gICAgICBjb25zdCBkdCA9IG5ldyBEYXRlKGRpc2FibGVkKTtcbiAgICAgIGlmICh0aGlzLnllYXIgPT09IGR0LmdldEZ1bGxZZWFyKCkpIHtcbiAgICAgICAgYXJyLnB1c2goZHQuZ2V0TW9udGgoKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0sIFtdKTtcblxuICAgIHRoaXMucGlja2VyLnNldFZpZXdTd2l0Y2hMYWJlbCh0aGlzLnllYXIpO1xuICAgIHRoaXMucGlja2VyLnNldFByZXZCdG5EaXNhYmxlZCh0aGlzLnllYXIgPD0gdGhpcy5taW5ZZWFyKTtcbiAgICB0aGlzLnBpY2tlci5zZXROZXh0QnRuRGlzYWJsZWQodGhpcy55ZWFyID49IHRoaXMubWF4WWVhcik7XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRbdGhpcy55ZWFyXSB8fCBbXTtcbiAgICBjb25zdCB5ck91dE9mUmFuZ2UgPSB0aGlzLnllYXIgPCB0aGlzLm1pblllYXIgfHwgdGhpcy55ZWFyID4gdGhpcy5tYXhZZWFyO1xuICAgIGNvbnN0IGlzTWluWWVhciA9IHRoaXMueWVhciA9PT0gdGhpcy5taW5ZZWFyO1xuICAgIGNvbnN0IGlzTWF4WWVhciA9IHRoaXMueWVhciA9PT0gdGhpcy5tYXhZZWFyO1xuICAgIGNvbnN0IHJhbmdlID0gY29tcHV0ZU1vbnRoUmFuZ2UodGhpcy5yYW5nZSwgdGhpcy55ZWFyKTtcblxuICAgIEFycmF5LmZyb20odGhpcy5ncmlkLmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgICAgIGNvbnN0IGRhdGUgPSBkYXRlVmFsdWUodGhpcy55ZWFyLCBpbmRleCwgMSk7XG5cbiAgICAgIGVsLmNsYXNzTmFtZSA9IGBkYXRlcGlja2VyLWNlbGwgJHt0aGlzLmNlbGxDbGFzc31gO1xuICAgICAgaWYgKHRoaXMuaXNNaW5WaWV3KSB7XG4gICAgICAgIGVsLmRhdGFzZXQuZGF0ZSA9IGRhdGU7XG4gICAgICB9XG4gICAgICAvLyByZXNldCB0ZXh0IG9uIGV2ZXJ5IHJlbmRlciB0byBjbGVhciB0aGUgY3VzdG9tIGNvbnRlbnQgc2V0XG4gICAgICAvLyBieSBiZWZvcmVTaG93IGhvb2sgYXQgcHJldmlvdXMgcmVuZGVyXG4gICAgICBlbC50ZXh0Q29udGVudCA9IHRoaXMubW9udGhOYW1lc1tpbmRleF07XG5cbiAgICAgIGlmIChcbiAgICAgICAgeXJPdXRPZlJhbmdlXG4gICAgICAgIHx8IGlzTWluWWVhciAmJiBpbmRleCA8IHRoaXMubWluTW9udGhcbiAgICAgICAgfHwgaXNNYXhZZWFyICYmIGluZGV4ID4gdGhpcy5tYXhNb250aFxuICAgICAgICB8fCB0aGlzLmRpc2FibGVkLmluY2x1ZGVzKGluZGV4KVxuICAgICAgKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgY29uc3QgW3JhbmdlU3RhcnQsIHJhbmdlRW5kXSA9IHJhbmdlO1xuICAgICAgICBpZiAoaW5kZXggPiByYW5nZVN0YXJ0ICYmIGluZGV4IDwgcmFuZ2VFbmQpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gcmFuZ2VTdGFydCkge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLXN0YXJ0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSByYW5nZUVuZCkge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLWVuZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0ZWQuaW5jbHVkZXMoaW5kZXgpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggPT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmJlZm9yZVNob3cpIHtcbiAgICAgICAgdGhpcy5wZXJmb3JtQmVmb3JlSG9vayhlbCwgaW5kZXgsIGRhdGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSB2aWV3IFVJIGJ5IGFwcGx5aW5nIHRoZSBjaGFuZ2VzIG9mIHNlbGVjdGVkIGFuZCBmb2N1c2VkIGl0ZW1zXG4gIHJlZnJlc2goKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkW3RoaXMueWVhcl0gfHwgW107XG4gICAgY29uc3QgW3JhbmdlU3RhcnQsIHJhbmdlRW5kXSA9IGNvbXB1dGVNb250aFJhbmdlKHRoaXMucmFuZ2UsIHRoaXMueWVhcikgfHwgW107XG4gICAgdGhpcy5ncmlkXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgnLnJhbmdlLCAucmFuZ2Utc3RhcnQsIC5yYW5nZS1lbmQsIC5zZWxlY3RlZCwgLmZvY3VzZWQnKVxuICAgICAgLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3JhbmdlJywgJ3JhbmdlLXN0YXJ0JywgJ3JhbmdlLWVuZCcsICdzZWxlY3RlZCcsICdmb2N1c2VkJyk7XG4gICAgICB9KTtcbiAgICBBcnJheS5mcm9tKHRoaXMuZ3JpZC5jaGlsZHJlbikuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjbGFzc0xpc3QgPSBlbC5jbGFzc0xpc3Q7XG4gICAgICBpZiAoaW5kZXggPiByYW5nZVN0YXJ0ICYmIGluZGV4IDwgcmFuZ2VFbmQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCA9PT0gcmFuZ2VTdGFydCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1zdGFydCcpO1xuICAgICAgfVxuICAgICAgaWYgKGluZGV4ID09PSByYW5nZUVuZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1lbmQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RlZC5pbmNsdWRlcyhpbmRleCkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgdmlldyBVSSBieSBhcHBseWluZyB0aGUgY2hhbmdlIG9mIGZvY3VzZWQgaXRlbVxuICByZWZyZXNoRm9jdXMoKSB7XG4gICAgdGhpcy5ncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb2N1c2VkJykuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZvY3VzZWQnKTtcbiAgICB9KTtcbiAgICB0aGlzLmdyaWQuY2hpbGRyZW5bdGhpcy5mb2N1c2VkXS5jbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gIH1cbn0iLCJpbXBvcnQge3B1c2hVbmlxdWV9IGZyb20gJy4uLy4uL2xpYi91dGlscy5qcyc7XG5pbXBvcnQge3BhcnNlSFRNTCwgcmVwbGFjZUNoaWxkTm9kZXN9IGZyb20gJy4uLy4uL2xpYi9kb20uanMnO1xuXG4vLyBCYXNlIGNsYXNzIG9mIHRoZSB2aWV3IGNsYXNzZXNcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihwaWNrZXIsIGNvbmZpZykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnLCB7XG4gICAgICBwaWNrZXIsXG4gICAgICBlbGVtZW50OiBwYXJzZUhUTUwoYDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLXZpZXdcIj48L2Rpdj5gKS5maXJzdENoaWxkLFxuICAgICAgc2VsZWN0ZWQ6IFtdLFxuICAgIH0pO1xuICAgIHRoaXMuaW5pdCh0aGlzLnBpY2tlci5kYXRlcGlja2VyLmNvbmZpZyk7XG4gIH1cblxuICBpbml0KG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5waWNrTGV2ZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5pc01pblZpZXcgPSB0aGlzLmlkID09PSBvcHRpb25zLnBpY2tMZXZlbDtcbiAgICB9XG4gICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMudXBkYXRlRm9jdXMoKTtcbiAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbigpO1xuICB9XG5cbiAgLy8gRXhlY3V0ZSBiZWZvcmVTaG93KCkgY2FsbGJhY2sgYW5kIGFwcGx5IHRoZSByZXN1bHQgdG8gdGhlIGVsZW1lbnRcbiAgLy8gYXJnczpcbiAgLy8gLSBjdXJyZW50IC0gY3VycmVudCB2YWx1ZSBvbiB0aGUgaXRlcmF0aW9uIG9uIHZpZXcgcmVuZGVyaW5nXG4gIC8vIC0gdGltZVZhbHVlIC0gdGltZSB2YWx1ZSBvZiB0aGUgZGF0ZSB0byBwYXNzIHRvIGJlZm9yZVNob3coKVxuICBwZXJmb3JtQmVmb3JlSG9vayhlbCwgY3VycmVudCwgdGltZVZhbHVlKSB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuYmVmb3JlU2hvdyhuZXcgRGF0ZSh0aW1lVmFsdWUpKTtcbiAgICBzd2l0Y2ggKHR5cGVvZiByZXN1bHQpIHtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXN1bHQgPSB7ZW5hYmxlZDogcmVzdWx0fTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXN1bHQgPSB7Y2xhc3NlczogcmVzdWx0fTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBpZiAocmVzdWx0LmVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHB1c2hVbmlxdWUodGhpcy5kaXNhYmxlZCwgY3VycmVudCk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0LmNsYXNzZXMpIHtcbiAgICAgICAgY29uc3QgZXh0cmFDbGFzc2VzID0gcmVzdWx0LmNsYXNzZXMuc3BsaXQoL1xccysvKTtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCguLi5leHRyYUNsYXNzZXMpO1xuICAgICAgICBpZiAoZXh0cmFDbGFzc2VzLmluY2x1ZGVzKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgcHVzaFVuaXF1ZSh0aGlzLmRpc2FibGVkLCBjdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdC5jb250ZW50KSB7XG4gICAgICAgIHJlcGxhY2VDaGlsZE5vZGVzKGVsLCByZXN1bHQuY29udGVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge2hhc1Byb3BlcnR5LCBwdXNoVW5pcXVlLCBjcmVhdGVUYWdSZXBlYXR9IGZyb20gJy4uLy4uL2xpYi91dGlscy5qcyc7XG5pbXBvcnQge2RhdGVWYWx1ZSwgc3RhcnRPZlllYXJQZXJpb2R9IGZyb20gJy4uLy4uL2xpYi9kYXRlLmpzJztcbmltcG9ydCB7cGFyc2VIVE1MfSBmcm9tICcuLi8uLi9saWIvZG9tLmpzJztcbmltcG9ydCBWaWV3IGZyb20gJy4vVmlldy5qcyc7XG5cbmZ1bmN0aW9uIHRvVGl0bGVDYXNlKHdvcmQpIHtcbiAgcmV0dXJuIFsuLi53b3JkXS5yZWR1Y2UoKHN0ciwgY2gsIGl4KSA9PiBzdHIgKz0gaXggPyBjaCA6IGNoLnRvVXBwZXJDYXNlKCksICcnKTtcbn1cblxuLy8gQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSB5ZWFycyBhbmQgZGVjYWRlcyB2aWV3IGVsZW1lbnRzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBZZWFyc1ZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgY29uc3RydWN0b3IocGlja2VyLCBjb25maWcpIHtcbiAgICBzdXBlcihwaWNrZXIsIGNvbmZpZyk7XG4gIH1cblxuICBpbml0KG9wdGlvbnMsIG9uQ29uc3RydWN0aW9uID0gdHJ1ZSkge1xuICAgIGlmIChvbkNvbnN0cnVjdGlvbikge1xuICAgICAgdGhpcy5uYXZTdGVwID0gdGhpcy5zdGVwICogMTA7XG4gICAgICB0aGlzLmJlZm9yZVNob3dPcHRpb24gPSBgYmVmb3JlU2hvdyR7dG9UaXRsZUNhc2UodGhpcy5jZWxsQ2xhc3MpfWA7XG4gICAgICB0aGlzLmdyaWQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLm5hbWUsICdkYXRlcGlja2VyLWdyaWQnKTtcbiAgICAgIHRoaXMuZ3JpZC5hcHBlbmRDaGlsZChwYXJzZUhUTUwoY3JlYXRlVGFnUmVwZWF0KCdzcGFuJywgMTIpKSk7XG4gICAgfVxuICAgIHN1cGVyLmluaXQob3B0aW9ucyk7XG4gIH1cblxuICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAoaGFzUHJvcGVydHkob3B0aW9ucywgJ21pbkRhdGUnKSkge1xuICAgICAgaWYgKG9wdGlvbnMubWluRGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubWluWWVhciA9IHRoaXMubWluRGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWluWWVhciA9IHN0YXJ0T2ZZZWFyUGVyaW9kKG9wdGlvbnMubWluRGF0ZSwgdGhpcy5zdGVwKTtcbiAgICAgICAgdGhpcy5taW5EYXRlID0gZGF0ZVZhbHVlKHRoaXMubWluWWVhciwgMCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChoYXNQcm9wZXJ0eShvcHRpb25zLCAnbWF4RGF0ZScpKSB7XG4gICAgICBpZiAob3B0aW9ucy5tYXhEYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5tYXhZZWFyID0gdGhpcy5tYXhEYXRlID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYXhZZWFyID0gc3RhcnRPZlllYXJQZXJpb2Qob3B0aW9ucy5tYXhEYXRlLCB0aGlzLnN0ZXApO1xuICAgICAgICB0aGlzLm1heERhdGUgPSBkYXRlVmFsdWUodGhpcy5tYXhZZWFyLCAxMSwgMzEpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5pc01pblZpZXcpIHtcbiAgICAgIGlmIChvcHRpb25zLmRhdGVzRGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5kYXRlc0Rpc2FibGVkID0gb3B0aW9ucy5kYXRlc0Rpc2FibGVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGVzRGlzYWJsZWQgPSBbXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnNbdGhpcy5iZWZvcmVTaG93T3B0aW9uXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBiZWZvcmVTaG93ID0gb3B0aW9uc1t0aGlzLmJlZm9yZVNob3dPcHRpb25dO1xuICAgICAgdGhpcy5iZWZvcmVTaG93ID0gdHlwZW9mIGJlZm9yZVNob3cgPT09ICdmdW5jdGlvbicgPyBiZWZvcmVTaG93IDogdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSB2aWV3J3Mgc2V0dGluZ3MgdG8gcmVmbGVjdCB0aGUgdmlld0RhdGUgc2V0IG9uIHRoZSBwaWNrZXJcbiAgdXBkYXRlRm9jdXMoKSB7XG4gICAgY29uc3Qgdmlld0RhdGUgPSBuZXcgRGF0ZSh0aGlzLnBpY2tlci52aWV3RGF0ZSk7XG4gICAgY29uc3QgZmlyc3QgPSBzdGFydE9mWWVhclBlcmlvZCh2aWV3RGF0ZSwgdGhpcy5uYXZTdGVwKTtcbiAgICBjb25zdCBsYXN0ID0gZmlyc3QgKyA5ICogdGhpcy5zdGVwO1xuXG4gICAgdGhpcy5maXJzdCA9IGZpcnN0O1xuICAgIHRoaXMubGFzdCA9IGxhc3Q7XG4gICAgdGhpcy5zdGFydCA9IGZpcnN0IC0gdGhpcy5zdGVwO1xuICAgIHRoaXMuZm9jdXNlZCA9IHN0YXJ0T2ZZZWFyUGVyaW9kKHZpZXdEYXRlLCB0aGlzLnN0ZXApO1xuICB9XG5cbiAgLy8gVXBkYXRlIHZpZXcncyBzZXR0aW5ncyB0byByZWZsZWN0IHRoZSBzZWxlY3RlZCBkYXRlc1xuICB1cGRhdGVTZWxlY3Rpb24oKSB7XG4gICAgY29uc3Qge2RhdGVzLCByYW5nZXBpY2tlcn0gPSB0aGlzLnBpY2tlci5kYXRlcGlja2VyO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlcy5yZWR1Y2UoKHllYXJzLCB0aW1lVmFsdWUpID0+IHtcbiAgICAgIHJldHVybiBwdXNoVW5pcXVlKHllYXJzLCBzdGFydE9mWWVhclBlcmlvZCh0aW1lVmFsdWUsIHRoaXMuc3RlcCkpO1xuICAgIH0sIFtdKTtcbiAgICBpZiAocmFuZ2VwaWNrZXIgJiYgcmFuZ2VwaWNrZXIuZGF0ZXMpIHtcbiAgICAgIHRoaXMucmFuZ2UgPSByYW5nZXBpY2tlci5kYXRlcy5tYXAodGltZVZhbHVlID0+IHtcbiAgICAgICAgaWYgKHRpbWVWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXJ0T2ZZZWFyUGVyaW9kKHRpbWVWYWx1ZSwgdGhpcy5zdGVwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSBlbnRpcmUgdmlldyBVSVxuICByZW5kZXIoKSB7XG4gICAgLy8gcmVmcmVzaCBkaXNhYmxlZCB5ZWFycyBvbiBldmVyeSByZW5kZXIgaW4gb3JkZXIgdG8gY2xlYXIgdGhlIG9uZXMgYWRkZWRcbiAgICAvLyBieSBiZWZvcmVTaG93IGhvb2sgYXQgcHJldmlvdXMgcmVuZGVyXG4gICAgLy8gdGhpcy5kaXNhYmxlZCA9IFsuLi50aGlzLmRhdGVzRGlzYWJsZWRdO1xuICAgIHRoaXMuZGlzYWJsZWQgPSB0aGlzLmRhdGVzRGlzYWJsZWQubWFwKGRpc2FibGVkID0+IG5ldyBEYXRlKGRpc2FibGVkKS5nZXRGdWxsWWVhcigpKTtcblxuICAgIHRoaXMucGlja2VyLnNldFZpZXdTd2l0Y2hMYWJlbChgJHt0aGlzLmZpcnN0fS0ke3RoaXMubGFzdH1gKTtcbiAgICB0aGlzLnBpY2tlci5zZXRQcmV2QnRuRGlzYWJsZWQodGhpcy5maXJzdCA8PSB0aGlzLm1pblllYXIpO1xuICAgIHRoaXMucGlja2VyLnNldE5leHRCdG5EaXNhYmxlZCh0aGlzLmxhc3QgPj0gdGhpcy5tYXhZZWFyKTtcblxuICAgIEFycmF5LmZyb20odGhpcy5ncmlkLmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLnN0YXJ0ICsgKGluZGV4ICogdGhpcy5zdGVwKTtcbiAgICAgIGNvbnN0IGRhdGUgPSBkYXRlVmFsdWUoY3VycmVudCwgMCwgMSk7XG5cbiAgICAgIGVsLmNsYXNzTmFtZSA9IGBkYXRlcGlja2VyLWNlbGwgJHt0aGlzLmNlbGxDbGFzc31gO1xuICAgICAgaWYgKHRoaXMuaXNNaW5WaWV3KSB7XG4gICAgICAgIGVsLmRhdGFzZXQuZGF0ZSA9IGRhdGU7XG4gICAgICB9XG4gICAgICBlbC50ZXh0Q29udGVudCA9IGVsLmRhdGFzZXQueWVhciA9IGN1cnJlbnQ7XG5cbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdwcmV2Jyk7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAxMSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCduZXh0Jyk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA8IHRoaXMubWluWWVhciB8fCBjdXJyZW50ID4gdGhpcy5tYXhZZWFyIHx8IHRoaXMuZGlzYWJsZWQuaW5jbHVkZXMoY3VycmVudCkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgIGNvbnN0IFtyYW5nZVN0YXJ0LCByYW5nZUVuZF0gPSB0aGlzLnJhbmdlO1xuICAgICAgICBpZiAoY3VycmVudCA+IHJhbmdlU3RhcnQgJiYgY3VycmVudCA8IHJhbmdlRW5kKSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudCA9PT0gcmFuZ2VTdGFydCkge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLXN0YXJ0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IHJhbmdlRW5kKSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UtZW5kJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkLmluY2x1ZGVzKGN1cnJlbnQpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA9PT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYmVmb3JlU2hvdykge1xuICAgICAgICB0aGlzLnBlcmZvcm1CZWZvcmVIb29rKGVsLCBjdXJyZW50LCBkYXRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgdmlldyBVSSBieSBhcHBseWluZyB0aGUgY2hhbmdlcyBvZiBzZWxlY3RlZCBhbmQgZm9jdXNlZCBpdGVtc1xuICByZWZyZXNoKCkge1xuICAgIGNvbnN0IFtyYW5nZVN0YXJ0LCByYW5nZUVuZF0gPSB0aGlzLnJhbmdlIHx8IFtdO1xuICAgIHRoaXMuZ3JpZFxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYW5nZSwgLnJhbmdlLXN0YXJ0LCAucmFuZ2UtZW5kLCAuc2VsZWN0ZWQsIC5mb2N1c2VkJylcbiAgICAgIC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdyYW5nZScsICdyYW5nZS1zdGFydCcsICdyYW5nZS1lbmQnLCAnc2VsZWN0ZWQnLCAnZm9jdXNlZCcpO1xuICAgICAgfSk7XG4gICAgQXJyYXkuZnJvbSh0aGlzLmdyaWQuY2hpbGRyZW4pLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gTnVtYmVyKGVsLnRleHRDb250ZW50KTtcbiAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgICAgIGlmIChjdXJyZW50ID4gcmFuZ2VTdGFydCAmJiBjdXJyZW50IDwgcmFuZ2VFbmQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ID09PSByYW5nZVN0YXJ0KSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLXN0YXJ0Jyk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA9PT0gcmFuZ2VFbmQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UtZW5kJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZC5pbmNsdWRlcyhjdXJyZW50KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIHZpZXcgVUkgYnkgYXBwbHlpbmcgdGhlIGNoYW5nZSBvZiBmb2N1c2VkIGl0ZW1cbiAgcmVmcmVzaEZvY3VzKCkge1xuICAgIGNvbnN0IGluZGV4ID0gTWF0aC5yb3VuZCgodGhpcy5mb2N1c2VkIC0gdGhpcy5zdGFydCkgLyB0aGlzLnN0ZXApO1xuICAgIHRoaXMuZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9jdXNlZCcpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdmb2N1c2VkJyk7XG4gICAgfSk7XG4gICAgdGhpcy5ncmlkLmNoaWxkcmVuW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy9yZW5kZXIgaW5ib3hcclxuaW1wb3J0IFVJIGZyb20gJy4vdWkuanMnO1xyXG5pbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3QuanMnO1xyXG5pbXBvcnQgdGFzayBmcm9tICcuL3Rhc2suanMnXHJcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZS5qcyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gICAgcmVuZGVyRGVmYXVsdFByb2plY3RzKCk7XHJcblxyXG4gICAgVUkuaW5pdGlhbFJlbmRlcigpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlckRlZmF1bHRQcm9qZWN0cygpe1xyXG4gICAgICAgIGxldCBpbmJveCA9IHByb2plY3QoJ0luYm94Jyk7XHJcbi8qICAgICAgICAgbGV0IHRvZGF5ID0gcHJvamVjdCgnVG9kYXknKTtcclxuICAgICAgICBsZXQgdGhpc3dlZWsgPSBwcm9qZWN0KCdUaGlzIFdlZWsnKTsgKi9cclxuICAgICAgICBsZXQgaGF2ZUZ1biA9IHRhc2soXCJIYXZlIEZ1blwiLFwiTGVhcm4gYSBsb3Qgd2hpbGUgaGF2aW5nIGZ1blwiKTtcclxuICAgICAgICBzdG9yYWdlLmFkZFByb2plY3QoaW5ib3gpO1xyXG4gICAgICAgIGluYm94LmFkZFRhc2soaGF2ZUZ1bik7XHJcbi8qICAgICAgICAgc3RvcmFnZS5hZGRQcm9qZWN0KHRvZGF5KTtcclxuICAgICAgICBzdG9yYWdlLmFkZFByb2plY3QodGhpc3dlZWspOyAqL1xyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=