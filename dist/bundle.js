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

    return {getIndex, getName, getDescription, setIndex};
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
        const bodyElem = document.querySelector('body');
        
        const test = document.createElement('div');
        const datepicker = new vanillajs_datepicker_Datepicker__WEBPACK_IMPORTED_MODULE_3__["default"](test, {
            // ...options
          }); 
/*         addMotivationalMessage().renderDefaultMessages(); */
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

    //entire container that holds all the tasks, unique id is container
    function createDOMContainer(){
        return createContainer('div', skip(1), 'container', ...skip(2));
    }

    //the text that contains the project name
    function createDOMProjectHeader(project){
        const header = createTag('h1', project.getName(), ['header-type'], skip(1));
        return createContainer('div', skip(1), 'project-header', [header], ['data-index', project.getIndex()]);
    }

    //creates the div that when clicked, the add new task form appears
    function createDOMAddTask(){
        const plusIcon = createTag('i', skip(1), ['fa','fa-plus'], skip(1));
        const addTaskText = createTag('div', 'Add Task', ['add-task-text'], skip(1));
        const addTaskDiv = createContainer('div', skip(1), 'add-task-clickable-div', [plusIcon, addTaskText], skip(1));
        addTaskDiv.addEventListener('click', function(){
            const container = document.getElementById('container');
            const addTaskForm = createDOMTaskForm('add');
            container.appendChild(addTaskForm);
            addTaskDiv.remove();
        }, {once: true})

        return addTaskDiv;
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
                const spanHelper = createTag('span', skip(1), ['active-popover']. skip(1));
                const dateInput = new vanillajs_datepicker_Datepicker__WEBPACK_IMPORTED_MODULE_3__["default"](spanHelper);
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
                invisibleTask.classList.remove('invisible');
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
                    
                    //this doesn't work
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
                invisibleTask.classList.remove('invisible');
                form.remove();
            })
        }

        function addSubmitEditTaskFunctionality(){
            submitBtn.addEventListener('click', function(){
                const invisibleTaskElement = document.getElementById('invisible');
                const taskDataIndex = _subtask_js__WEBPACK_IMPORTED_MODULE_2__["default"].getAttribute('data-task-index');
                const subtaskDataIndex = _subtask_js__WEBPACK_IMPORTED_MODULE_2__["default"].getAttribute('data-subtask-index');
    
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
                    const newSubtaskDOM = createDOMTask(currentSubtask);
                    invisibleTaskElement.parentNode.insertBefore(newSubtaskDOM, invisibleTaskElement);
                    invisibleTaskElement.remove();
                    form.remove();

                }
            })
        }


    }

    //creates the task dom
    function createDOMTask(taskObj){
        const completeTaskIcon = createTag('i',skip(1), ['fa-regular','fa-circle']);
        const completeTaskDiv = createContainer('div', ['complete-task-btn'], skip(1), [completeTaskIcon], skip(1));

        const taskInformationDiv = createTag('div', taskObj.getName(), ['task-title'], skip(1));

        const addSubtaskIcon = createTag('i', skip(1), ['fa-solid','fa-square-plus'], skip(1));
        const editIcon = createTag('i', skip(1), ['fa-solid','fa-pen-to-square'], skip(1));
        const deleteIcon = createTag('i', skip(1), ['fa-solid','fa-trash'], skip(1));      
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
            const projectIndex = document.getElementById('project-header').getAttribute('data-index');
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
                const taskElement = getTaskFromChildNode(addSubtaskIcon);
                const subtaskForm = createDOMSubtaskForm('add');
                subtaskForm.setAttribute('data-task-index', taskElement.getAttribute('data-task-index'));
                taskElement.parentNode.insertBefore(subtaskForm, taskElement.nextSibling);
            })
        }

        return taskDOM;
    }

    //creates the subtask dom
    const createDOMSubtask = (subtaskObj, dataTaskIndex) => {
        const completeTaskIcon = createTag('i',skip(1), ['fa-regular','fa-circle']);
        const completeTaskDiv = createContainer('div', ['complete-task-btn'], skip(1), [completeTaskIcon], skip(1));

        const taskInformation = createTag('div', subtaskObj.getName(), ['task-title'], skip(1));
        if(subtaskObj.getDescription()){
            const description =  createTag('div', subtaskObj.getDescription(), ['task-description'], skip(1));
            taskInformation.appendChild(description);
        }
        
        const editIcon = createTag('i', skip(1), ['fa-solid','fa-pen-to-square'], skip(1));
        const deleteIcon = createTag('i', skip(1), ['fa-solid','fa-trash'], skip(1));      
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
                subtask.setAttribute('id','invisible');
                const subtaskForm = createDOMSubtaskForm('edit');
                subtask.parentNode.insertBefore(subtaskForm, subtask);
            })
        }
    }


    //find the array indicies of projects, tasks, and subtasks
    const storageLookups = (() => {
        //returns index of project in all projects array
        function getProjectIndex(){
            let projectIndexInArray = 0;
            let projectDataIndex = document.getElementById('project-header').getAttribute('data-index');
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

    //adds all dom of tasks and subtasks in a project
    function addAllTasksDOM(container, tasks){
        tasks.forEach(task => {
            container.appendChild(createDOMTask(task));
            const allSubtasks = task.getSubtasks();
            allSubtasks.forEach(subtask => {
                container.appendChild(subtaskDOM(subtask).getDOM());
            })
        })
    }

    const clearAllTasks = () => {
        const containerDiv = document.getElementById('containers');
        containerDiv.remove();
    }

    return {initialRender, clearAllTasks};

})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ui);


/* 
//creates DOM of one subtask
const subtaskDOM = (subtaskObj) => {
    function createSubtaskDiv(){
        const subtaskDiv = document.createElement('div');
        subtaskDiv.classList.add('subtask');
        return subtaskDiv;
    }

    function createCompleteSubtaskDiv(){
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('complete-task-btn');

        const circleIcon = document.createElement('i');
        circleIcon.classList.add('fa-regular','fa-circle');

        containerDiv.appendChild(circleIcon);
        return containerDiv;
    }

    function createSubtaskTitleDiv(subtaskObj){
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('task-title');
        titleDiv.innerText = subtaskObj.getName();
        return titleDiv;
    }

    function createSubtaskDescriptionDiv(subtaskObj){
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('task-description');
        descriptionDiv.innerText = subtaskObj.getDescription();
        return descriptionDiv;
    }

    function createSubtaskButtonIcons() {
        const buttonsIconDiv = document.createElement('div');
        buttonsIconDiv.classList.add('button-icons');

        const editIcon = document.createElement('i');
        editIcon.classList.add('fa-solid','fa-pen-to-square');

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid','fa-trash');

        buttonsIconDiv.appendChild(editIcon);
        buttonsIconDiv.appendChild(deleteIcon);
        return buttonsIconDiv;
    }

    function getDOM(){
        const containerDiv = createSubtaskDiv();
        const completeSubtaskDiv = createCompleteSubtaskDiv();
        const subtaskTitleDiv = createSubtaskTitleDiv(subtaskObj);
        const subtaskDescriptionDiv = createSubtaskDescriptionDiv(subtaskObj);
        const subtaskBtnIcons = createSubtaskButtonIcons();

        containerDiv.appendChild(completeSubtaskDiv);
        containerDiv.appendChild(subtaskTitleDiv);
        subtaskTitleDiv.appendChild(subtaskDescriptionDiv);
        containerDiv.appendChild(subtaskBtnIcons);

        return containerDiv;
    }

    return {getDOM};
} */








/* 
const renderTasks = () => {
    const addMotivationalMessage = () => {
        const motivationalMessagesArray = [];
        const DOM = motivationalMessageDOM();
        const btnFunctionality = motivationalMessageDOMFunctionality();
        //object declaration for motivational messages
        function motivationalMessage(header, message, author = ''){
            return {header, message, author};
        }
    
        //preset methods for motivational message
        function addDefaultMotivationalMessages() {
            const motivationalMessage1 = motivationalMessage('Motivational Message','Yesterday you said tomorrow, so just do it. Don\'t let your dreams be dreams.','Shia LaBeouf');
            const motivationalMessage2 =  motivationalMessage('Motivational Message',"The most important investment you can make is in yourself.",'Warren Buffett');
            const motivationalMessage3 = motivationalMessage('Personal Message','You can play Pokemon if you finish coding this to-do list.','Bruce');
            motivationalMessagesArray.push(motivationalMessage3);
        }
    
        function chooseOneMotivationalMessage() {
            const random = Math.floor(Math.random() * motivationalMessagesArray.length);
            return motivationalMessagesArray[random];
        }
    
        function deleteMessage(index) {
            motivationalMessagesArray.splice(index, 1);
        }
    
        function renderDefaultMessages() {
            addDefaultMotivationalMessages();
            DOM.createMotivationalMessage(chooseOneMotivationalMessage());
            btnFunctionality.addBtnFunctionality();
        }
    
        return {renderDefaultMessages, deleteMessage};
    }

    return {renderDefault, clearAllTasks};
} */


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
        let today = (0,_project_js__WEBPACK_IMPORTED_MODULE_1__["default"])('Today');
        let thisweek = (0,_project_js__WEBPACK_IMPORTED_MODULE_1__["default"])('This Week');
        let haveFun = (0,_task_js__WEBPACK_IMPORTED_MODULE_2__["default"])("Have Fun","Learn a lot while having fun");
        _storage_js__WEBPACK_IMPORTED_MODULE_3__["default"].addProject(inbox);
        inbox.addTask(haveFun);
        _storage_js__WEBPACK_IMPORTED_MODULE_3__["default"].addProject(today);
        _storage_js__WEBPACK_IMPORTED_MODULE_3__["default"].addProject(thisweek);
    }


})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TTtBQUNOO0FBQ0E7QUFDQSw4Q0FBOEMsc0RBQVM7QUFDdkQ7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSw0RUFBc0I7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDRFQUFzQjtBQUMxQjs7QUFFQTtBQUNBLFdBQVcsZ0NBQWdDO0FBQzNDLFdBQVcsb0JBQW9CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixTQUFTLHdCQUF3QjtBQUNqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDRFQUFzQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7O1VDL0tBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUN5QjtBQUNVO0FBQ1A7QUFDTztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksNERBQWdCO0FBQ3BCO0FBQ0E7QUFDQSxvQkFBb0IsdURBQU87QUFDM0Isb0JBQW9CLHVEQUFPO0FBQzNCLHVCQUF1Qix1REFBTztBQUM5QixzQkFBc0Isb0RBQUk7QUFDMUIsUUFBUSw4REFBa0I7QUFDMUI7QUFDQSxRQUFRLDhEQUFrQjtBQUMxQixRQUFRLDhEQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9jcmVhdGVQb3BwZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2NvbnRhaW5zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldENsaXBwaW5nUmVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q29tcG9zaXRlUmVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRFbGVtZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXREb2N1bWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXROb2RlTmFtZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRQYXJlbnROb2RlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRTY3JvbGxQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFZpZXdwb3J0UmVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0V2luZG93LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3dTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFdpbmRvd1Njcm9sbEJhclguanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2luc3RhbmNlT2YuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzTGF5b3V0Vmlld3BvcnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzU2Nyb2xsUGFyZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pc1RhYmxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvbGlzdFNjcm9sbFBhcmVudHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZW51bXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9hcnJvdy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvY29tcHV0ZVN0eWxlcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2ZsaXAuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2hpZGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9vZmZzZXQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL3BvcHBlck9mZnNldHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL3ByZXZlbnRPdmVyZmxvdy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9wb3BwZXItbGl0ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9wb3BwZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvY29tcHV0ZUF1dG9QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvY29tcHV0ZU9mZnNldHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZXhwYW5kVG9IYXNoTWFwLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2Zvcm1hdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRBbHRBeGlzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0RnJlc2hTaWRlT2JqZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRPcHBvc2l0ZVBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRWYXJpYXRpb24uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWF0aC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9tZXJnZUJ5TmFtZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9tZXJnZVBhZGRpbmdPYmplY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvb3JkZXJNb2RpZmllcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvcmVjdFRvQ2xpZW50UmVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy91bmlxdWVCeS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy91c2VyQWdlbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvdmFsaWRhdGVNb2RpZmllcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvd2l0aGluLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaGVscGVyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdWJ0YXNrLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3VpLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvRGF0ZXBpY2tlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2V2ZW50cy9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9ldmVudHMvaW5wdXRGaWVsZExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2V2ZW50cy9vdGhlckxpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2V2ZW50cy9waWNrZXJMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9pMThuL2Jhc2UtbG9jYWxlcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2xpYi9kYXRlLWZvcm1hdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2xpYi9kYXRlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvbGliL2RvbS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2xpYi9ldmVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL29wdGlvbnMvZGVmYXVsdE9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9vcHRpb25zL3Byb2Nlc3NPcHRpb25zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvcGlja2VyL1BpY2tlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL3BpY2tlci90ZW1wbGF0ZXMvY2FsZW5kYXJXZWVrc1RlbXBsYXRlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvcGlja2VyL3RlbXBsYXRlcy9kYXlzVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9waWNrZXIvdGVtcGxhdGVzL3BpY2tlclRlbXBsYXRlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvcGlja2VyL3ZpZXdzL0RheXNWaWV3LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvcGlja2VyL3ZpZXdzL01vbnRoc1ZpZXcuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9waWNrZXIvdmlld3MvVmlldy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL3BpY2tlci92aWV3cy9ZZWFyc1ZpZXcuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdldENvbXBvc2l0ZVJlY3QgZnJvbSBcIi4vZG9tLXV0aWxzL2dldENvbXBvc2l0ZVJlY3QuanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzXCI7XG5pbXBvcnQgbGlzdFNjcm9sbFBhcmVudHMgZnJvbSBcIi4vZG9tLXV0aWxzL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2RvbS11dGlscy9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgb3JkZXJNb2RpZmllcnMgZnJvbSBcIi4vdXRpbHMvb3JkZXJNb2RpZmllcnMuanNcIjtcbmltcG9ydCBkZWJvdW5jZSBmcm9tIFwiLi91dGlscy9kZWJvdW5jZS5qc1wiO1xuaW1wb3J0IHZhbGlkYXRlTW9kaWZpZXJzIGZyb20gXCIuL3V0aWxzL3ZhbGlkYXRlTW9kaWZpZXJzLmpzXCI7XG5pbXBvcnQgdW5pcXVlQnkgZnJvbSBcIi4vdXRpbHMvdW5pcXVlQnkuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBtZXJnZUJ5TmFtZSBmcm9tIFwiLi91dGlscy9tZXJnZUJ5TmFtZS5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgeyBpc0VsZW1lbnQgfSBmcm9tIFwiLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuL2VudW1zLmpzXCI7XG52YXIgSU5WQUxJRF9FTEVNRU5UX0VSUk9SID0gJ1BvcHBlcjogSW52YWxpZCByZWZlcmVuY2Ugb3IgcG9wcGVyIGFyZ3VtZW50IHByb3ZpZGVkLiBUaGV5IG11c3QgYmUgZWl0aGVyIGEgRE9NIGVsZW1lbnQgb3IgdmlydHVhbCBlbGVtZW50Lic7XG52YXIgSU5GSU5JVEVfTE9PUF9FUlJPUiA9ICdQb3BwZXI6IEFuIGluZmluaXRlIGxvb3AgaW4gdGhlIG1vZGlmaWVycyBjeWNsZSBoYXMgYmVlbiBkZXRlY3RlZCEgVGhlIGN5Y2xlIGhhcyBiZWVuIGludGVycnVwdGVkIHRvIHByZXZlbnQgYSBicm93c2VyIGNyYXNoLic7XG52YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICBtb2RpZmllcnM6IFtdLFxuICBzdHJhdGVneTogJ2Fic29sdXRlJ1xufTtcblxuZnVuY3Rpb24gYXJlVmFsaWRFbGVtZW50cygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiAhYXJncy5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuICEoZWxlbWVudCAmJiB0eXBlb2YgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHBlckdlbmVyYXRvcihnZW5lcmF0b3JPcHRpb25zKSB7XG4gIGlmIChnZW5lcmF0b3JPcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBnZW5lcmF0b3JPcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX2dlbmVyYXRvck9wdGlvbnMgPSBnZW5lcmF0b3JPcHRpb25zLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmID0gX2dlbmVyYXRvck9wdGlvbnMuZGVmYXVsdE1vZGlmaWVycyxcbiAgICAgIGRlZmF1bHRNb2RpZmllcnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYgPT09IHZvaWQgMCA/IFtdIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmMiA9IF9nZW5lcmF0b3JPcHRpb25zLmRlZmF1bHRPcHRpb25zLFxuICAgICAgZGVmYXVsdE9wdGlvbnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyID09PSB2b2lkIDAgPyBERUZBVUxUX09QVElPTlMgOiBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyO1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUG9wcGVyKHJlZmVyZW5jZSwgcG9wcGVyLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIH1cblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICBvcmRlcmVkTW9kaWZpZXJzOiBbXSxcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgZGVmYXVsdE9wdGlvbnMpLFxuICAgICAgbW9kaWZpZXJzRGF0YToge30sXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICByZWZlcmVuY2U6IHJlZmVyZW5jZSxcbiAgICAgICAgcG9wcGVyOiBwb3BwZXJcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9O1xuICAgIHZhciBlZmZlY3RDbGVhbnVwRm5zID0gW107XG4gICAgdmFyIGlzRGVzdHJveWVkID0gZmFsc2U7XG4gICAgdmFyIGluc3RhbmNlID0ge1xuICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgc2V0T3B0aW9uczogZnVuY3Rpb24gc2V0T3B0aW9ucyhzZXRPcHRpb25zQWN0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIHNldE9wdGlvbnNBY3Rpb24gPT09ICdmdW5jdGlvbicgPyBzZXRPcHRpb25zQWN0aW9uKHN0YXRlLm9wdGlvbnMpIDogc2V0T3B0aW9uc0FjdGlvbjtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBzdGF0ZS5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIHN0YXRlLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBzdGF0ZS5zY3JvbGxQYXJlbnRzID0ge1xuICAgICAgICAgIHJlZmVyZW5jZTogaXNFbGVtZW50KHJlZmVyZW5jZSkgPyBsaXN0U2Nyb2xsUGFyZW50cyhyZWZlcmVuY2UpIDogcmVmZXJlbmNlLmNvbnRleHRFbGVtZW50ID8gbGlzdFNjcm9sbFBhcmVudHMocmVmZXJlbmNlLmNvbnRleHRFbGVtZW50KSA6IFtdLFxuICAgICAgICAgIHBvcHBlcjogbGlzdFNjcm9sbFBhcmVudHMocG9wcGVyKVxuICAgICAgICB9OyAvLyBPcmRlcnMgdGhlIG1vZGlmaWVycyBiYXNlZCBvbiB0aGVpciBkZXBlbmRlbmNpZXMgYW5kIGBwaGFzZWBcbiAgICAgICAgLy8gcHJvcGVydGllc1xuXG4gICAgICAgIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXJNb2RpZmllcnMobWVyZ2VCeU5hbWUoW10uY29uY2F0KGRlZmF1bHRNb2RpZmllcnMsIHN0YXRlLm9wdGlvbnMubW9kaWZpZXJzKSkpOyAvLyBTdHJpcCBvdXQgZGlzYWJsZWQgbW9kaWZpZXJzXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyZWRNb2RpZmllcnMuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgcmV0dXJuIG0uZW5hYmxlZDtcbiAgICAgICAgfSk7IC8vIFZhbGlkYXRlIHRoZSBwcm92aWRlZCBtb2RpZmllcnMgc28gdGhhdCB0aGUgY29uc3VtZXIgd2lsbCBnZXQgd2FybmVkXG4gICAgICAgIC8vIGlmIG9uZSBvZiB0aGUgbW9kaWZpZXJzIGlzIGludmFsaWQgZm9yIGFueSByZWFzb25cblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgdmFyIG1vZGlmaWVycyA9IHVuaXF1ZUJ5KFtdLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLCBzdGF0ZS5vcHRpb25zLm1vZGlmaWVycyksIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IF9yZWYubmFtZTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkYXRlTW9kaWZpZXJzKG1vZGlmaWVycyk7XG5cbiAgICAgICAgICBpZiAoZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5vcHRpb25zLnBsYWNlbWVudCkgPT09IGF1dG8pIHtcbiAgICAgICAgICAgIHZhciBmbGlwTW9kaWZpZXIgPSBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZpbmQoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgICAgICAgIHZhciBuYW1lID0gX3JlZjIubmFtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5hbWUgPT09ICdmbGlwJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWZsaXBNb2RpZmllcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBcImF1dG9cIiBwbGFjZW1lbnRzIHJlcXVpcmUgdGhlIFwiZmxpcFwiIG1vZGlmaWVyIGJlJywgJ3ByZXNlbnQgYW5kIGVuYWJsZWQgdG8gd29yay4nXS5qb2luKCcgJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUocG9wcGVyKSxcbiAgICAgICAgICAgICAgbWFyZ2luVG9wID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luVG9wLFxuICAgICAgICAgICAgICBtYXJnaW5SaWdodCA9IF9nZXRDb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0LFxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b20gPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5Cb3R0b20sXG4gICAgICAgICAgICAgIG1hcmdpbkxlZnQgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5MZWZ0OyAvLyBXZSBubyBsb25nZXIgdGFrZSBpbnRvIGFjY291bnQgYG1hcmdpbnNgIG9uIHRoZSBwb3BwZXIsIGFuZCBpdCBjYW5cbiAgICAgICAgICAvLyBjYXVzZSBidWdzIHdpdGggcG9zaXRpb25pbmcsIHNvIHdlJ2xsIHdhcm4gdGhlIGNvbnN1bWVyXG5cblxuICAgICAgICAgIGlmIChbbWFyZ2luVG9wLCBtYXJnaW5SaWdodCwgbWFyZ2luQm90dG9tLCBtYXJnaW5MZWZ0XS5zb21lKGZ1bmN0aW9uIChtYXJnaW4pIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG1hcmdpbik7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihbJ1BvcHBlcjogQ1NTIFwibWFyZ2luXCIgc3R5bGVzIGNhbm5vdCBiZSB1c2VkIHRvIGFwcGx5IHBhZGRpbmcnLCAnYmV0d2VlbiB0aGUgcG9wcGVyIGFuZCBpdHMgcmVmZXJlbmNlIGVsZW1lbnQgb3IgYm91bmRhcnkuJywgJ1RvIHJlcGxpY2F0ZSBtYXJnaW4sIHVzZSB0aGUgYG9mZnNldGAgbW9kaWZpZXIsIGFzIHdlbGwgYXMnLCAndGhlIGBwYWRkaW5nYCBvcHRpb24gaW4gdGhlIGBwcmV2ZW50T3ZlcmZsb3dgIGFuZCBgZmxpcGAnLCAnbW9kaWZpZXJzLiddLmpvaW4oJyAnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcnVuTW9kaWZpZXJFZmZlY3RzKCk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICAvLyBTeW5jIHVwZGF0ZSDigJMgaXQgd2lsbCBhbHdheXMgYmUgZXhlY3V0ZWQsIGV2ZW4gaWYgbm90IG5lY2Vzc2FyeS4gVGhpc1xuICAgICAgLy8gaXMgdXNlZnVsIGZvciBsb3cgZnJlcXVlbmN5IHVwZGF0ZXMgd2hlcmUgc3luYyBiZWhhdmlvciBzaW1wbGlmaWVzIHRoZVxuICAgICAgLy8gbG9naWMuXG4gICAgICAvLyBGb3IgaGlnaCBmcmVxdWVuY3kgdXBkYXRlcyAoZS5nLiBgcmVzaXplYCBhbmQgYHNjcm9sbGAgZXZlbnRzKSwgYWx3YXlzXG4gICAgICAvLyBwcmVmZXIgdGhlIGFzeW5jIFBvcHBlciN1cGRhdGUgbWV0aG9kXG4gICAgICBmb3JjZVVwZGF0ZTogZnVuY3Rpb24gZm9yY2VVcGRhdGUoKSB7XG4gICAgICAgIGlmIChpc0Rlc3Ryb3llZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfc3RhdGUkZWxlbWVudHMgPSBzdGF0ZS5lbGVtZW50cyxcbiAgICAgICAgICAgIHJlZmVyZW5jZSA9IF9zdGF0ZSRlbGVtZW50cy5yZWZlcmVuY2UsXG4gICAgICAgICAgICBwb3BwZXIgPSBfc3RhdGUkZWxlbWVudHMucG9wcGVyOyAvLyBEb24ndCBwcm9jZWVkIGlmIGByZWZlcmVuY2VgIG9yIGBwb3BwZXJgIGFyZSBub3QgdmFsaWQgZWxlbWVudHNcbiAgICAgICAgLy8gYW55bW9yZVxuXG4gICAgICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKElOVkFMSURfRUxFTUVOVF9FUlJPUik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFN0b3JlIHRoZSByZWZlcmVuY2UgYW5kIHBvcHBlciByZWN0cyB0byBiZSByZWFkIGJ5IG1vZGlmaWVyc1xuXG5cbiAgICAgICAgc3RhdGUucmVjdHMgPSB7XG4gICAgICAgICAgcmVmZXJlbmNlOiBnZXRDb21wb3NpdGVSZWN0KHJlZmVyZW5jZSwgZ2V0T2Zmc2V0UGFyZW50KHBvcHBlciksIHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3kgPT09ICdmaXhlZCcpLFxuICAgICAgICAgIHBvcHBlcjogZ2V0TGF5b3V0UmVjdChwb3BwZXIpXG4gICAgICAgIH07IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIHJlc2V0IHRoZSBjdXJyZW50IHVwZGF0ZSBjeWNsZS4gVGhlXG4gICAgICAgIC8vIG1vc3QgY29tbW9uIHVzZSBjYXNlIGZvciB0aGlzIGlzIHRoZSBgZmxpcGAgbW9kaWZpZXIgY2hhbmdpbmcgdGhlXG4gICAgICAgIC8vIHBsYWNlbWVudCwgd2hpY2ggdGhlbiBuZWVkcyB0byByZS1ydW4gYWxsIHRoZSBtb2RpZmllcnMsIGJlY2F1c2UgdGhlXG4gICAgICAgIC8vIGxvZ2ljIHdhcyBwcmV2aW91c2x5IHJhbiBmb3IgdGhlIHByZXZpb3VzIHBsYWNlbWVudCBhbmQgaXMgdGhlcmVmb3JlXG4gICAgICAgIC8vIHN0YWxlL2luY29ycmVjdFxuXG4gICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLnBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50OyAvLyBPbiBlYWNoIHVwZGF0ZSBjeWNsZSwgdGhlIGBtb2RpZmllcnNEYXRhYCBwcm9wZXJ0eSBmb3IgZWFjaCBtb2RpZmllclxuICAgICAgICAvLyBpcyBmaWxsZWQgd2l0aCB0aGUgaW5pdGlhbCBkYXRhIHNwZWNpZmllZCBieSB0aGUgbW9kaWZpZXIuIFRoaXMgbWVhbnNcbiAgICAgICAgLy8gaXQgZG9lc24ndCBwZXJzaXN0IGFuZCBpcyBmcmVzaCBvbiBlYWNoIHVwZGF0ZS5cbiAgICAgICAgLy8gVG8gZW5zdXJlIHBlcnNpc3RlbnQgZGF0YSwgdXNlIGAke25hbWV9I3BlcnNpc3RlbnRgXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5tb2RpZmllcnNEYXRhW21vZGlmaWVyLm5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kaWZpZXIuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgX19kZWJ1Z19sb29wc19fID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBfX2RlYnVnX2xvb3BzX18gKz0gMTtcblxuICAgICAgICAgICAgaWYgKF9fZGVidWdfbG9vcHNfXyA+IDEwMCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKElORklOSVRFX0xPT1BfRVJST1IpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RhdGUucmVzZXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIF9zdGF0ZSRvcmRlcmVkTW9kaWZpZSA9IHN0YXRlLm9yZGVyZWRNb2RpZmllcnNbaW5kZXhdLFxuICAgICAgICAgICAgICBmbiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5mbixcbiAgICAgICAgICAgICAgX3N0YXRlJG9yZGVyZWRNb2RpZmllMiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5vcHRpb25zLFxuICAgICAgICAgICAgICBfb3B0aW9ucyA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIgPT09IHZvaWQgMCA/IHt9IDogX3N0YXRlJG9yZGVyZWRNb2RpZmllMixcbiAgICAgICAgICAgICAgbmFtZSA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5uYW1lO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc3RhdGUgPSBmbih7XG4gICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgICAgb3B0aW9uczogX29wdGlvbnMsXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxuICAgICAgICAgICAgfSkgfHwgc3RhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gQXN5bmMgYW5kIG9wdGltaXN0aWNhbGx5IG9wdGltaXplZCB1cGRhdGUg4oCTIGl0IHdpbGwgbm90IGJlIGV4ZWN1dGVkIGlmXG4gICAgICAvLyBub3QgbmVjZXNzYXJ5IChkZWJvdW5jZWQgdG8gcnVuIGF0IG1vc3Qgb25jZS1wZXItdGljaylcbiAgICAgIHVwZGF0ZTogZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICBpbnN0YW5jZS5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgIHJlc29sdmUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBpc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihJTlZBTElEX0VMRU1FTlRfRVJST1IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgaW5zdGFuY2Uuc2V0T3B0aW9ucyhvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgaWYgKCFpc0Rlc3Ryb3llZCAmJiBvcHRpb25zLm9uRmlyc3RVcGRhdGUpIHtcbiAgICAgICAgb3B0aW9ucy5vbkZpcnN0VXBkYXRlKHN0YXRlKTtcbiAgICAgIH1cbiAgICB9KTsgLy8gTW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSBiZWZvcmUgdGhlIGZpcnN0XG4gICAgLy8gdXBkYXRlIGN5Y2xlIHJ1bnMuIFRoZXkgd2lsbCBiZSBleGVjdXRlZCBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgdXBkYXRlXG4gICAgLy8gY3ljbGUuIFRoaXMgaXMgdXNlZnVsIHdoZW4gYSBtb2RpZmllciBhZGRzIHNvbWUgcGVyc2lzdGVudCBkYXRhIHRoYXRcbiAgICAvLyBvdGhlciBtb2RpZmllcnMgbmVlZCB0byB1c2UsIGJ1dCB0aGUgbW9kaWZpZXIgaXMgcnVuIGFmdGVyIHRoZSBkZXBlbmRlbnRcbiAgICAvLyBvbmUuXG5cbiAgICBmdW5jdGlvbiBydW5Nb2RpZmllckVmZmVjdHMoKSB7XG4gICAgICBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICAgIHZhciBuYW1lID0gX3JlZjMubmFtZSxcbiAgICAgICAgICAgIF9yZWYzJG9wdGlvbnMgPSBfcmVmMy5vcHRpb25zLFxuICAgICAgICAgICAgb3B0aW9ucyA9IF9yZWYzJG9wdGlvbnMgPT09IHZvaWQgMCA/IHt9IDogX3JlZjMkb3B0aW9ucyxcbiAgICAgICAgICAgIGVmZmVjdCA9IF9yZWYzLmVmZmVjdDtcblxuICAgICAgICBpZiAodHlwZW9mIGVmZmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBjbGVhbnVwRm4gPSBlZmZlY3Qoe1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBub29wRm4gPSBmdW5jdGlvbiBub29wRm4oKSB7fTtcblxuICAgICAgICAgIGVmZmVjdENsZWFudXBGbnMucHVzaChjbGVhbnVwRm4gfHwgbm9vcEZuKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpIHtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICB9KTtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMgPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG59XG5leHBvcnQgdmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3IoKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBkZXRlY3RPdmVyZmxvdyB9OyIsImltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhaW5zKHBhcmVudCwgY2hpbGQpIHtcbiAgdmFyIHJvb3ROb2RlID0gY2hpbGQuZ2V0Um9vdE5vZGUgJiYgY2hpbGQuZ2V0Um9vdE5vZGUoKTsgLy8gRmlyc3QsIGF0dGVtcHQgd2l0aCBmYXN0ZXIgbmF0aXZlIG1ldGhvZFxuXG4gIGlmIChwYXJlbnQuY29udGFpbnMoY2hpbGQpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gdGhlbiBmYWxsYmFjayB0byBjdXN0b20gaW1wbGVtZW50YXRpb24gd2l0aCBTaGFkb3cgRE9NIHN1cHBvcnRcbiAgZWxzZSBpZiAocm9vdE5vZGUgJiYgaXNTaGFkb3dSb290KHJvb3ROb2RlKSkge1xuICAgICAgdmFyIG5leHQgPSBjaGlsZDtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAobmV4dCAmJiBwYXJlbnQuaXNTYW1lTm9kZShuZXh0KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXTogbmVlZCBhIGJldHRlciB3YXkgdG8gaGFuZGxlIHRoaXMuLi5cblxuXG4gICAgICAgIG5leHQgPSBuZXh0LnBhcmVudE5vZGUgfHwgbmV4dC5ob3N0O1xuICAgICAgfSB3aGlsZSAobmV4dCk7XG4gICAgfSAvLyBHaXZlIHVwLCB0aGUgcmVzdWx0IGlzIGZhbHNlXG5cblxuICByZXR1cm4gZmFsc2U7XG59IiwiaW1wb3J0IHsgaXNFbGVtZW50LCBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc0xheW91dFZpZXdwb3J0IGZyb20gXCIuL2lzTGF5b3V0Vmlld3BvcnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50LCBpbmNsdWRlU2NhbGUsIGlzRml4ZWRTdHJhdGVneSkge1xuICBpZiAoaW5jbHVkZVNjYWxlID09PSB2b2lkIDApIHtcbiAgICBpbmNsdWRlU2NhbGUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc0ZpeGVkU3RyYXRlZ3kgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWRTdHJhdGVneSA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIGNsaWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc2NhbGVYID0gMTtcbiAgdmFyIHNjYWxlWSA9IDE7XG5cbiAgaWYgKGluY2x1ZGVTY2FsZSAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgc2NhbGVYID0gZWxlbWVudC5vZmZzZXRXaWR0aCA+IDAgPyByb3VuZChjbGllbnRSZWN0LndpZHRoKSAvIGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgMSA6IDE7XG4gICAgc2NhbGVZID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgPiAwID8gcm91bmQoY2xpZW50UmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMSA6IDE7XG4gIH1cblxuICB2YXIgX3JlZiA9IGlzRWxlbWVudChlbGVtZW50KSA/IGdldFdpbmRvdyhlbGVtZW50KSA6IHdpbmRvdyxcbiAgICAgIHZpc3VhbFZpZXdwb3J0ID0gX3JlZi52aXN1YWxWaWV3cG9ydDtcblxuICB2YXIgYWRkVmlzdWFsT2Zmc2V0cyA9ICFpc0xheW91dFZpZXdwb3J0KCkgJiYgaXNGaXhlZFN0cmF0ZWd5O1xuICB2YXIgeCA9IChjbGllbnRSZWN0LmxlZnQgKyAoYWRkVmlzdWFsT2Zmc2V0cyAmJiB2aXN1YWxWaWV3cG9ydCA/IHZpc3VhbFZpZXdwb3J0Lm9mZnNldExlZnQgOiAwKSkgLyBzY2FsZVg7XG4gIHZhciB5ID0gKGNsaWVudFJlY3QudG9wICsgKGFkZFZpc3VhbE9mZnNldHMgJiYgdmlzdWFsVmlld3BvcnQgPyB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3AgOiAwKSkgLyBzY2FsZVk7XG4gIHZhciB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGggLyBzY2FsZVg7XG4gIHZhciBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodCAvIHNjYWxlWTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgdG9wOiB5LFxuICAgIHJpZ2h0OiB4ICsgd2lkdGgsXG4gICAgYm90dG9tOiB5ICsgaGVpZ2h0LFxuICAgIGxlZnQ6IHgsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiaW1wb3J0IHsgdmlld3BvcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRWaWV3cG9ydFJlY3QgZnJvbSBcIi4vZ2V0Vmlld3BvcnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRSZWN0IGZyb20gXCIuL2dldERvY3VtZW50UmVjdC5qc1wiO1xuaW1wb3J0IGxpc3RTY3JvbGxQYXJlbnRzIGZyb20gXCIuL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgY29udGFpbnMgZnJvbSBcIi4vY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHJlY3RUb0NsaWVudFJlY3QgZnJvbSBcIi4uL3V0aWxzL3JlY3RUb0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCB7IG1heCwgbWluIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcblxuZnVuY3Rpb24gZ2V0SW5uZXJCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgZmFsc2UsIHN0cmF0ZWd5ID09PSAnZml4ZWQnKTtcbiAgcmVjdC50b3AgPSByZWN0LnRvcCArIGVsZW1lbnQuY2xpZW50VG9wO1xuICByZWN0LmxlZnQgPSByZWN0LmxlZnQgKyBlbGVtZW50LmNsaWVudExlZnQ7XG4gIHJlY3QuYm90dG9tID0gcmVjdC50b3AgKyBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgcmVjdC5yaWdodCA9IHJlY3QubGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIHJlY3Qud2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICByZWN0LmhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICByZWN0LnggPSByZWN0LmxlZnQ7XG4gIHJlY3QueSA9IHJlY3QudG9wO1xuICByZXR1cm4gcmVjdDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgY2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KSB7XG4gIHJldHVybiBjbGlwcGluZ1BhcmVudCA9PT0gdmlld3BvcnQgPyByZWN0VG9DbGllbnRSZWN0KGdldFZpZXdwb3J0UmVjdChlbGVtZW50LCBzdHJhdGVneSkpIDogaXNFbGVtZW50KGNsaXBwaW5nUGFyZW50KSA/IGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSkgOiByZWN0VG9DbGllbnRSZWN0KGdldERvY3VtZW50UmVjdChnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkpKTtcbn0gLy8gQSBcImNsaXBwaW5nIHBhcmVudFwiIGlzIGFuIG92ZXJmbG93YWJsZSBjb250YWluZXIgd2l0aCB0aGUgY2hhcmFjdGVyaXN0aWMgb2Zcbi8vIGNsaXBwaW5nIChvciBoaWRpbmcpIG92ZXJmbG93aW5nIGVsZW1lbnRzIHdpdGggYSBwb3NpdGlvbiBkaWZmZXJlbnQgZnJvbVxuLy8gYGluaXRpYWxgXG5cblxuZnVuY3Rpb24gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIHtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IGxpc3RTY3JvbGxQYXJlbnRzKGdldFBhcmVudE5vZGUoZWxlbWVudCkpO1xuICB2YXIgY2FuRXNjYXBlQ2xpcHBpbmcgPSBbJ2Fic29sdXRlJywgJ2ZpeGVkJ10uaW5kZXhPZihnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uKSA+PSAwO1xuICB2YXIgY2xpcHBlckVsZW1lbnQgPSBjYW5Fc2NhcGVDbGlwcGluZyAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpID8gZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQpIDogZWxlbWVudDtcblxuICBpZiAoIWlzRWxlbWVudChjbGlwcGVyRWxlbWVudCkpIHtcbiAgICByZXR1cm4gW107XG4gIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzE0MTRcblxuXG4gIHJldHVybiBjbGlwcGluZ1BhcmVudHMuZmlsdGVyKGZ1bmN0aW9uIChjbGlwcGluZ1BhcmVudCkge1xuICAgIHJldHVybiBpc0VsZW1lbnQoY2xpcHBpbmdQYXJlbnQpICYmIGNvbnRhaW5zKGNsaXBwaW5nUGFyZW50LCBjbGlwcGVyRWxlbWVudCkgJiYgZ2V0Tm9kZU5hbWUoY2xpcHBpbmdQYXJlbnQpICE9PSAnYm9keSc7XG4gIH0pO1xufSAvLyBHZXRzIHRoZSBtYXhpbXVtIGFyZWEgdGhhdCB0aGUgZWxlbWVudCBpcyB2aXNpYmxlIGluIGR1ZSB0byBhbnkgbnVtYmVyIG9mXG4vLyBjbGlwcGluZyBwYXJlbnRzXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q2xpcHBpbmdSZWN0KGVsZW1lbnQsIGJvdW5kYXJ5LCByb290Qm91bmRhcnksIHN0cmF0ZWd5KSB7XG4gIHZhciBtYWluQ2xpcHBpbmdQYXJlbnRzID0gYm91bmRhcnkgPT09ICdjbGlwcGluZ1BhcmVudHMnID8gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIDogW10uY29uY2F0KGJvdW5kYXJ5KTtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IFtdLmNvbmNhdChtYWluQ2xpcHBpbmdQYXJlbnRzLCBbcm9vdEJvdW5kYXJ5XSk7XG4gIHZhciBmaXJzdENsaXBwaW5nUGFyZW50ID0gY2xpcHBpbmdQYXJlbnRzWzBdO1xuICB2YXIgY2xpcHBpbmdSZWN0ID0gY2xpcHBpbmdQYXJlbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjUmVjdCwgY2xpcHBpbmdQYXJlbnQpIHtcbiAgICB2YXIgcmVjdCA9IGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSk7XG4gICAgYWNjUmVjdC50b3AgPSBtYXgocmVjdC50b3AsIGFjY1JlY3QudG9wKTtcbiAgICBhY2NSZWN0LnJpZ2h0ID0gbWluKHJlY3QucmlnaHQsIGFjY1JlY3QucmlnaHQpO1xuICAgIGFjY1JlY3QuYm90dG9tID0gbWluKHJlY3QuYm90dG9tLCBhY2NSZWN0LmJvdHRvbSk7XG4gICAgYWNjUmVjdC5sZWZ0ID0gbWF4KHJlY3QubGVmdCwgYWNjUmVjdC5sZWZ0KTtcbiAgICByZXR1cm4gYWNjUmVjdDtcbiAgfSwgZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgZmlyc3RDbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpKTtcbiAgY2xpcHBpbmdSZWN0LndpZHRoID0gY2xpcHBpbmdSZWN0LnJpZ2h0IC0gY2xpcHBpbmdSZWN0LmxlZnQ7XG4gIGNsaXBwaW5nUmVjdC5oZWlnaHQgPSBjbGlwcGluZ1JlY3QuYm90dG9tIC0gY2xpcHBpbmdSZWN0LnRvcDtcbiAgY2xpcHBpbmdSZWN0LnggPSBjbGlwcGluZ1JlY3QubGVmdDtcbiAgY2xpcHBpbmdSZWN0LnkgPSBjbGlwcGluZ1JlY3QudG9wO1xuICByZXR1cm4gY2xpcHBpbmdSZWN0O1xufSIsImltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZVNjcm9sbCBmcm9tIFwiLi9nZXROb2RlU2Nyb2xsLmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGlzU2Nyb2xsUGFyZW50IGZyb20gXCIuL2lzU2Nyb2xsUGFyZW50LmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5cbmZ1bmN0aW9uIGlzRWxlbWVudFNjYWxlZChlbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNjYWxlWCA9IHJvdW5kKHJlY3Qud2lkdGgpIC8gZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAxO1xuICB2YXIgc2NhbGVZID0gcm91bmQocmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMTtcbiAgcmV0dXJuIHNjYWxlWCAhPT0gMSB8fCBzY2FsZVkgIT09IDE7XG59IC8vIFJldHVybnMgdGhlIGNvbXBvc2l0ZSByZWN0IG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gaXRzIG9mZnNldFBhcmVudC5cbi8vIENvbXBvc2l0ZSBtZWFucyBpdCB0YWtlcyBpbnRvIGFjY291bnQgdHJhbnNmb3JtcyBhcyB3ZWxsIGFzIGxheW91dC5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wb3NpdGVSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnQsIGlzRml4ZWQpIHtcbiAgaWYgKGlzRml4ZWQgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBpc09mZnNldFBhcmVudEFuRWxlbWVudCA9IGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KTtcbiAgdmFyIG9mZnNldFBhcmVudElzU2NhbGVkID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpICYmIGlzRWxlbWVudFNjYWxlZChvZmZzZXRQYXJlbnQpO1xuICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnRJc1NjYWxlZCwgaXNGaXhlZCk7XG4gIHZhciBzY3JvbGwgPSB7XG4gICAgc2Nyb2xsTGVmdDogMCxcbiAgICBzY3JvbGxUb3A6IDBcbiAgfTtcbiAgdmFyIG9mZnNldHMgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50IHx8ICFpc09mZnNldFBhcmVudEFuRWxlbWVudCAmJiAhaXNGaXhlZCkge1xuICAgIGlmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpICE9PSAnYm9keScgfHwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMDc4XG4gICAgaXNTY3JvbGxQYXJlbnQoZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgc2Nyb2xsID0gZ2V0Tm9kZVNjcm9sbChvZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICAgIGlmIChpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgIG9mZnNldHMgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50LCB0cnVlKTtcbiAgICAgIG9mZnNldHMueCArPSBvZmZzZXRQYXJlbnQuY2xpZW50TGVmdDtcbiAgICAgIG9mZnNldHMueSArPSBvZmZzZXRQYXJlbnQuY2xpZW50VG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBvZmZzZXRzLnggPSBnZXRXaW5kb3dTY3JvbGxCYXJYKGRvY3VtZW50RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyBzY3JvbGwuc2Nyb2xsTGVmdCAtIG9mZnNldHMueCxcbiAgICB5OiByZWN0LnRvcCArIHNjcm9sbC5zY3JvbGxUb3AgLSBvZmZzZXRzLnksXG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICB9O1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGdldFdpbmRvdyhlbGVtZW50KS5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufSIsImltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSB7XG4gIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl06IGFzc3VtZSBib2R5IGlzIGFsd2F5cyBhdmFpbGFibGVcbiAgcmV0dXJuICgoaXNFbGVtZW50KGVsZW1lbnQpID8gZWxlbWVudC5vd25lckRvY3VtZW50IDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gIGVsZW1lbnQuZG9jdW1lbnQpIHx8IHdpbmRvdy5kb2N1bWVudCkuZG9jdW1lbnRFbGVtZW50O1xufSIsImltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbC5qc1wiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjsgLy8gR2V0cyB0aGUgZW50aXJlIHNpemUgb2YgdGhlIHNjcm9sbGFibGUgZG9jdW1lbnQgYXJlYSwgZXZlbiBleHRlbmRpbmcgb3V0c2lkZVxuLy8gb2YgdGhlIGA8aHRtbD5gIGFuZCBgPGJvZHk+YCByZWN0IGJvdW5kcyBpZiBob3Jpem9udGFsbHkgc2Nyb2xsYWJsZVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXREb2N1bWVudFJlY3QoZWxlbWVudCkge1xuICB2YXIgX2VsZW1lbnQkb3duZXJEb2N1bWVuO1xuXG4gIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgd2luU2Nyb2xsID0gZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpO1xuICB2YXIgYm9keSA9IChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keTtcbiAgdmFyIHdpZHRoID0gbWF4KGh0bWwuc2Nyb2xsV2lkdGgsIGh0bWwuY2xpZW50V2lkdGgsIGJvZHkgPyBib2R5LnNjcm9sbFdpZHRoIDogMCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKTtcbiAgdmFyIGhlaWdodCA9IG1heChodG1sLnNjcm9sbEhlaWdodCwgaHRtbC5jbGllbnRIZWlnaHQsIGJvZHkgPyBib2R5LnNjcm9sbEhlaWdodCA6IDAsIGJvZHkgPyBib2R5LmNsaWVudEhlaWdodCA6IDApO1xuICB2YXIgeCA9IC13aW5TY3JvbGwuc2Nyb2xsTGVmdCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCk7XG4gIHZhciB5ID0gLXdpblNjcm9sbC5zY3JvbGxUb3A7XG5cbiAgaWYgKGdldENvbXB1dGVkU3R5bGUoYm9keSB8fCBodG1sKS5kaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgeCArPSBtYXgoaHRtbC5jbGllbnRXaWR0aCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKSAtIHdpZHRoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRTY3JvbGwoZWxlbWVudCkge1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IGVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICBzY3JvbGxUb3A6IGVsZW1lbnQuc2Nyb2xsVG9wXG4gIH07XG59IiwiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjsgLy8gUmV0dXJucyB0aGUgbGF5b3V0IHJlY3Qgb2YgYW4gZWxlbWVudCByZWxhdGl2ZSB0byBpdHMgb2Zmc2V0UGFyZW50LiBMYXlvdXRcbi8vIG1lYW5zIGl0IGRvZXNuJ3QgdGFrZSBpbnRvIGFjY291bnQgdHJhbnNmb3Jtcy5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TGF5b3V0UmVjdChlbGVtZW50KSB7XG4gIHZhciBjbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpOyAvLyBVc2UgdGhlIGNsaWVudFJlY3Qgc2l6ZXMgaWYgaXQncyBub3QgYmVlbiB0cmFuc2Zvcm1lZC5cbiAgLy8gRml4ZXMgaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMjIzXG5cbiAgdmFyIHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gIGlmIChNYXRoLmFicyhjbGllbnRSZWN0LndpZHRoIC0gd2lkdGgpIDw9IDEpIHtcbiAgICB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGg7XG4gIH1cblxuICBpZiAoTWF0aC5hYnMoY2xpZW50UmVjdC5oZWlnaHQgLSBoZWlnaHQpIDw9IDEpIHtcbiAgICBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogZWxlbWVudC5vZmZzZXRMZWZ0LFxuICAgIHk6IGVsZW1lbnQub2Zmc2V0VG9wLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVOYW1lKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgPyAoZWxlbWVudC5ub2RlTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKSA6IG51bGw7XG59IiwiaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldEhUTUxFbGVtZW50U2Nyb2xsIGZyb20gXCIuL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlU2Nyb2xsKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IGdldFdpbmRvdyhub2RlKSB8fCAhaXNIVE1MRWxlbWVudChub2RlKSkge1xuICAgIHJldHVybiBnZXRXaW5kb3dTY3JvbGwobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50U2Nyb2xsKG5vZGUpO1xuICB9XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGlzVGFibGVFbGVtZW50IGZyb20gXCIuL2lzVGFibGVFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgZ2V0VUFTdHJpbmcgZnJvbSBcIi4uL3V0aWxzL3VzZXJBZ2VudC5qc1wiO1xuXG5mdW5jdGlvbiBnZXRUcnVlT2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvODM3XG4gIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50Lm9mZnNldFBhcmVudDtcbn0gLy8gYC5vZmZzZXRQYXJlbnRgIHJlcG9ydHMgYG51bGxgIGZvciBmaXhlZCBlbGVtZW50cywgd2hpbGUgYWJzb2x1dGUgZWxlbWVudHNcbi8vIHJldHVybiB0aGUgY29udGFpbmluZyBibG9ja1xuXG5cbmZ1bmN0aW9uIGdldENvbnRhaW5pbmdCbG9jayhlbGVtZW50KSB7XG4gIHZhciBpc0ZpcmVmb3ggPSAvZmlyZWZveC9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG4gIHZhciBpc0lFID0gL1RyaWRlbnQvaS50ZXN0KGdldFVBU3RyaW5nKCkpO1xuXG4gIGlmIChpc0lFICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAvLyBJbiBJRSA5LCAxMCBhbmQgMTEgZml4ZWQgZWxlbWVudHMgY29udGFpbmluZyBibG9jayBpcyBhbHdheXMgZXN0YWJsaXNoZWQgYnkgdGhlIHZpZXdwb3J0XG4gICAgdmFyIGVsZW1lbnRDc3MgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgaWYgKGVsZW1lbnRDc3MucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7XG5cbiAgaWYgKGlzU2hhZG93Um9vdChjdXJyZW50Tm9kZSkpIHtcbiAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLmhvc3Q7XG4gIH1cblxuICB3aGlsZSAoaXNIVE1MRWxlbWVudChjdXJyZW50Tm9kZSkgJiYgWydodG1sJywgJ2JvZHknXS5pbmRleE9mKGdldE5vZGVOYW1lKGN1cnJlbnROb2RlKSkgPCAwKSB7XG4gICAgdmFyIGNzcyA9IGdldENvbXB1dGVkU3R5bGUoY3VycmVudE5vZGUpOyAvLyBUaGlzIGlzIG5vbi1leGhhdXN0aXZlIGJ1dCBjb3ZlcnMgdGhlIG1vc3QgY29tbW9uIENTUyBwcm9wZXJ0aWVzIHRoYXRcbiAgICAvLyBjcmVhdGUgYSBjb250YWluaW5nIGJsb2NrLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9Db250YWluaW5nX2Jsb2NrI2lkZW50aWZ5aW5nX3RoZV9jb250YWluaW5nX2Jsb2NrXG5cbiAgICBpZiAoY3NzLnRyYW5zZm9ybSAhPT0gJ25vbmUnIHx8IGNzcy5wZXJzcGVjdGl2ZSAhPT0gJ25vbmUnIHx8IGNzcy5jb250YWluID09PSAncGFpbnQnIHx8IFsndHJhbnNmb3JtJywgJ3BlcnNwZWN0aXZlJ10uaW5kZXhPZihjc3Mud2lsbENoYW5nZSkgIT09IC0xIHx8IGlzRmlyZWZveCAmJiBjc3Mud2lsbENoYW5nZSA9PT0gJ2ZpbHRlcicgfHwgaXNGaXJlZm94ICYmIGNzcy5maWx0ZXIgJiYgY3NzLmZpbHRlciAhPT0gJ25vbmUnKSB7XG4gICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn0gLy8gR2V0cyB0aGUgY2xvc2VzdCBhbmNlc3RvciBwb3NpdGlvbmVkIGVsZW1lbnQuIEhhbmRsZXMgc29tZSBlZGdlIGNhc2VzLFxuLy8gc3VjaCBhcyB0YWJsZSBhbmNlc3RvcnMgYW5kIGNyb3NzIGJyb3dzZXIgYnVncy5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KGVsZW1lbnQpO1xuICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0VHJ1ZU9mZnNldFBhcmVudChlbGVtZW50KTtcblxuICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIGlzVGFibGVFbGVtZW50KG9mZnNldFBhcmVudCkgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgIG9mZnNldFBhcmVudCA9IGdldFRydWVPZmZzZXRQYXJlbnQob2Zmc2V0UGFyZW50KTtcbiAgfVxuXG4gIGlmIChvZmZzZXRQYXJlbnQgJiYgKGdldE5vZGVOYW1lKG9mZnNldFBhcmVudCkgPT09ICdodG1sJyB8fCBnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpID09PSAnYm9keScgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCBnZXRDb250YWluaW5nQmxvY2soZWxlbWVudCkgfHwgd2luZG93O1xufSIsImltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhcmVudE5vZGUoZWxlbWVudCkge1xuICBpZiAoZ2V0Tm9kZU5hbWUoZWxlbWVudCkgPT09ICdodG1sJykge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuICgvLyB0aGlzIGlzIGEgcXVpY2tlciAoYnV0IGxlc3MgdHlwZSBzYWZlKSB3YXkgdG8gc2F2ZSBxdWl0ZSBzb21lIGJ5dGVzIGZyb20gdGhlIGJ1bmRsZVxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl1cbiAgICAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICBlbGVtZW50LmFzc2lnbmVkU2xvdCB8fCAvLyBzdGVwIGludG8gdGhlIHNoYWRvdyBET00gb2YgdGhlIHBhcmVudCBvZiBhIHNsb3R0ZWQgbm9kZVxuICAgIGVsZW1lbnQucGFyZW50Tm9kZSB8fCAoIC8vIERPTSBFbGVtZW50IGRldGVjdGVkXG4gICAgaXNTaGFkb3dSb290KGVsZW1lbnQpID8gZWxlbWVudC5ob3N0IDogbnVsbCkgfHwgLy8gU2hhZG93Um9vdCBkZXRlY3RlZFxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBIVE1MRWxlbWVudCBpcyBhIE5vZGVcbiAgICBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkgLy8gZmFsbGJhY2tcblxuICApO1xufSIsImltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50KG5vZGUpIHtcbiAgaWYgKFsnaHRtbCcsICdib2R5JywgJyNkb2N1bWVudCddLmluZGV4T2YoZ2V0Tm9kZU5hbWUobm9kZSkpID49IDApIHtcbiAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBhc3N1bWUgYm9keSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gICAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgaWYgKGlzSFRNTEVsZW1lbnQobm9kZSkgJiYgaXNTY3JvbGxQYXJlbnQobm9kZSkpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHJldHVybiBnZXRTY3JvbGxQYXJlbnQoZ2V0UGFyZW50Tm9kZShub2RlKSk7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgaXNMYXlvdXRWaWV3cG9ydCBmcm9tIFwiLi9pc0xheW91dFZpZXdwb3J0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRWaWV3cG9ydFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgdmFyIGh0bWwgPSBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCk7XG4gIHZhciB2aXN1YWxWaWV3cG9ydCA9IHdpbi52aXN1YWxWaWV3cG9ydDtcbiAgdmFyIHdpZHRoID0gaHRtbC5jbGllbnRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGh0bWwuY2xpZW50SGVpZ2h0O1xuICB2YXIgeCA9IDA7XG4gIHZhciB5ID0gMDtcblxuICBpZiAodmlzdWFsVmlld3BvcnQpIHtcbiAgICB3aWR0aCA9IHZpc3VhbFZpZXdwb3J0LndpZHRoO1xuICAgIGhlaWdodCA9IHZpc3VhbFZpZXdwb3J0LmhlaWdodDtcbiAgICB2YXIgbGF5b3V0Vmlld3BvcnQgPSBpc0xheW91dFZpZXdwb3J0KCk7XG5cbiAgICBpZiAobGF5b3V0Vmlld3BvcnQgfHwgIWxheW91dFZpZXdwb3J0ICYmIHN0cmF0ZWd5ID09PSAnZml4ZWQnKSB7XG4gICAgICB4ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdDtcbiAgICAgIHkgPSB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3A7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCksXG4gICAgeTogeVxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvdyhub2RlKSB7XG4gIGlmIChub2RlID09IG51bGwpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgaWYgKG5vZGUudG9TdHJpbmcoKSAhPT0gJ1tvYmplY3QgV2luZG93XScpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICByZXR1cm4gb3duZXJEb2N1bWVudCA/IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93IDogd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvd1Njcm9sbChub2RlKSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3cobm9kZSk7XG4gIHZhciBzY3JvbGxMZWZ0ID0gd2luLnBhZ2VYT2Zmc2V0O1xuICB2YXIgc2Nyb2xsVG9wID0gd2luLnBhZ2VZT2Zmc2V0O1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgfTtcbn0iLCJpbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGwgZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpIHtcbiAgLy8gSWYgPGh0bWw+IGhhcyBhIENTUyB3aWR0aCBncmVhdGVyIHRoYW4gdGhlIHZpZXdwb3J0LCB0aGVuIHRoaXMgd2lsbCBiZVxuICAvLyBpbmNvcnJlY3QgZm9yIFJUTC5cbiAgLy8gUG9wcGVyIDEgaXMgYnJva2VuIGluIHRoaXMgY2FzZSBhbmQgbmV2ZXIgaGFkIGEgYnVnIHJlcG9ydCBzbyBsZXQncyBhc3N1bWVcbiAgLy8gaXQncyBub3QgYW4gaXNzdWUuIEkgZG9uJ3QgdGhpbmsgYW55b25lIGV2ZXIgc3BlY2lmaWVzIHdpZHRoIG9uIDxodG1sPlxuICAvLyBhbnl3YXkuXG4gIC8vIEJyb3dzZXJzIHdoZXJlIHRoZSBsZWZ0IHNjcm9sbGJhciBkb2Vzbid0IGNhdXNlIGFuIGlzc3VlIHJlcG9ydCBgMGAgZm9yXG4gIC8vIHRoaXMgKGUuZy4gRWRnZSAyMDE5LCBJRTExLCBTYWZhcmkpXG4gIHJldHVybiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpKS5sZWZ0ICsgZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpLnNjcm9sbExlZnQ7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcblxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuRWxlbWVudDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBpc0hUTUxFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuSFRNTEVsZW1lbnQ7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGlzU2hhZG93Um9vdChub2RlKSB7XG4gIC8vIElFIDExIGhhcyBubyBTaGFkb3dSb290XG4gIGlmICh0eXBlb2YgU2hhZG93Um9vdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgT3duRWxlbWVudCA9IGdldFdpbmRvdyhub2RlKS5TaGFkb3dSb290O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q7XG59XG5cbmV4cG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH07IiwiaW1wb3J0IGdldFVBU3RyaW5nIGZyb20gXCIuLi91dGlscy91c2VyQWdlbnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTGF5b3V0Vmlld3BvcnQoKSB7XG4gIHJldHVybiAhL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChnZXRVQVN0cmluZygpKTtcbn0iLCJpbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1Njcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIEZpcmVmb3ggd2FudHMgdXMgdG8gY2hlY2sgYC14YCBhbmQgYC15YCB2YXJpYXRpb25zIGFzIHdlbGxcbiAgdmFyIF9nZXRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSxcbiAgICAgIG92ZXJmbG93ID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3csXG4gICAgICBvdmVyZmxvd1ggPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1gsXG4gICAgICBvdmVyZmxvd1kgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1k7XG5cbiAgcmV0dXJuIC9hdXRvfHNjcm9sbHxvdmVybGF5fGhpZGRlbi8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCk7XG59IiwiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1RhYmxlRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBbJ3RhYmxlJywgJ3RkJywgJ3RoJ10uaW5kZXhPZihnZXROb2RlTmFtZShlbGVtZW50KSkgPj0gMDtcbn0iLCJpbXBvcnQgZ2V0U2Nyb2xsUGFyZW50IGZyb20gXCIuL2dldFNjcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuLypcbmdpdmVuIGEgRE9NIGVsZW1lbnQsIHJldHVybiB0aGUgbGlzdCBvZiBhbGwgc2Nyb2xsIHBhcmVudHMsIHVwIHRoZSBsaXN0IG9mIGFuY2Vzb3JzXG51bnRpbCB3ZSBnZXQgdG8gdGhlIHRvcCB3aW5kb3cgb2JqZWN0LiBUaGlzIGxpc3QgaXMgd2hhdCB3ZSBhdHRhY2ggc2Nyb2xsIGxpc3RlbmVyc1xudG8sIGJlY2F1c2UgaWYgYW55IG9mIHRoZXNlIHBhcmVudCBlbGVtZW50cyBzY3JvbGwsIHdlJ2xsIG5lZWQgdG8gcmUtY2FsY3VsYXRlIHRoZVxucmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvbi5cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpc3RTY3JvbGxQYXJlbnRzKGVsZW1lbnQsIGxpc3QpIHtcbiAgdmFyIF9lbGVtZW50JG93bmVyRG9jdW1lbjtcblxuICBpZiAobGlzdCA9PT0gdm9pZCAwKSB7XG4gICAgbGlzdCA9IFtdO1xuICB9XG5cbiAgdmFyIHNjcm9sbFBhcmVudCA9IGdldFNjcm9sbFBhcmVudChlbGVtZW50KTtcbiAgdmFyIGlzQm9keSA9IHNjcm9sbFBhcmVudCA9PT0gKChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keSk7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coc2Nyb2xsUGFyZW50KTtcbiAgdmFyIHRhcmdldCA9IGlzQm9keSA/IFt3aW5dLmNvbmNhdCh3aW4udmlzdWFsVmlld3BvcnQgfHwgW10sIGlzU2Nyb2xsUGFyZW50KHNjcm9sbFBhcmVudCkgPyBzY3JvbGxQYXJlbnQgOiBbXSkgOiBzY3JvbGxQYXJlbnQ7XG4gIHZhciB1cGRhdGVkTGlzdCA9IGxpc3QuY29uY2F0KHRhcmdldCk7XG4gIHJldHVybiBpc0JvZHkgPyB1cGRhdGVkTGlzdCA6IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBpc0JvZHkgdGVsbHMgdXMgdGFyZ2V0IHdpbGwgYmUgYW4gSFRNTEVsZW1lbnQgaGVyZVxuICB1cGRhdGVkTGlzdC5jb25jYXQobGlzdFNjcm9sbFBhcmVudHMoZ2V0UGFyZW50Tm9kZSh0YXJnZXQpKSk7XG59IiwiZXhwb3J0IHZhciB0b3AgPSAndG9wJztcbmV4cG9ydCB2YXIgYm90dG9tID0gJ2JvdHRvbSc7XG5leHBvcnQgdmFyIHJpZ2h0ID0gJ3JpZ2h0JztcbmV4cG9ydCB2YXIgbGVmdCA9ICdsZWZ0JztcbmV4cG9ydCB2YXIgYXV0byA9ICdhdXRvJztcbmV4cG9ydCB2YXIgYmFzZVBsYWNlbWVudHMgPSBbdG9wLCBib3R0b20sIHJpZ2h0LCBsZWZ0XTtcbmV4cG9ydCB2YXIgc3RhcnQgPSAnc3RhcnQnO1xuZXhwb3J0IHZhciBlbmQgPSAnZW5kJztcbmV4cG9ydCB2YXIgY2xpcHBpbmdQYXJlbnRzID0gJ2NsaXBwaW5nUGFyZW50cyc7XG5leHBvcnQgdmFyIHZpZXdwb3J0ID0gJ3ZpZXdwb3J0JztcbmV4cG9ydCB2YXIgcG9wcGVyID0gJ3BvcHBlcic7XG5leHBvcnQgdmFyIHJlZmVyZW5jZSA9ICdyZWZlcmVuY2UnO1xuZXhwb3J0IHZhciB2YXJpYXRpb25QbGFjZW1lbnRzID0gLyojX19QVVJFX18qL2Jhc2VQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG59LCBbXSk7XG5leHBvcnQgdmFyIHBsYWNlbWVudHMgPSAvKiNfX1BVUkVfXyovW10uY29uY2F0KGJhc2VQbGFjZW1lbnRzLCBbYXV0b10pLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCwgcGxhY2VtZW50ICsgXCItXCIgKyBzdGFydCwgcGxhY2VtZW50ICsgXCItXCIgKyBlbmRdKTtcbn0sIFtdKTsgLy8gbW9kaWZpZXJzIHRoYXQgbmVlZCB0byByZWFkIHRoZSBET01cblxuZXhwb3J0IHZhciBiZWZvcmVSZWFkID0gJ2JlZm9yZVJlYWQnO1xuZXhwb3J0IHZhciByZWFkID0gJ3JlYWQnO1xuZXhwb3J0IHZhciBhZnRlclJlYWQgPSAnYWZ0ZXJSZWFkJzsgLy8gcHVyZS1sb2dpYyBtb2RpZmllcnNcblxuZXhwb3J0IHZhciBiZWZvcmVNYWluID0gJ2JlZm9yZU1haW4nO1xuZXhwb3J0IHZhciBtYWluID0gJ21haW4nO1xuZXhwb3J0IHZhciBhZnRlck1haW4gPSAnYWZ0ZXJNYWluJzsgLy8gbW9kaWZpZXIgd2l0aCB0aGUgcHVycG9zZSB0byB3cml0ZSB0byB0aGUgRE9NIChvciB3cml0ZSBpbnRvIGEgZnJhbWV3b3JrIHN0YXRlKVxuXG5leHBvcnQgdmFyIGJlZm9yZVdyaXRlID0gJ2JlZm9yZVdyaXRlJztcbmV4cG9ydCB2YXIgd3JpdGUgPSAnd3JpdGUnO1xuZXhwb3J0IHZhciBhZnRlcldyaXRlID0gJ2FmdGVyV3JpdGUnO1xuZXhwb3J0IHZhciBtb2RpZmllclBoYXNlcyA9IFtiZWZvcmVSZWFkLCByZWFkLCBhZnRlclJlYWQsIGJlZm9yZU1haW4sIG1haW4sIGFmdGVyTWFpbiwgYmVmb3JlV3JpdGUsIHdyaXRlLCBhZnRlcldyaXRlXTsiLCJpbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4uL2RvbS11dGlscy9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiOyAvLyBUaGlzIG1vZGlmaWVyIHRha2VzIHRoZSBzdHlsZXMgcHJlcGFyZWQgYnkgdGhlIGBjb21wdXRlU3R5bGVzYCBtb2RpZmllclxuLy8gYW5kIGFwcGxpZXMgdGhlbSB0byB0aGUgSFRNTEVsZW1lbnRzIHN1Y2ggYXMgcG9wcGVyIGFuZCBhcnJvd1xuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGU7XG4gIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIHN0eWxlID0gc3RhdGUuc3R5bGVzW25hbWVdIHx8IHt9O1xuICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW25hbWVdOyAvLyBhcnJvdyBpcyBvcHRpb25hbCArIHZpcnR1YWwgZWxlbWVudHNcblxuICAgIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAhZ2V0Tm9kZU5hbWUoZWxlbWVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIEZsb3cgZG9lc24ndCBzdXBwb3J0IHRvIGV4dGVuZCB0aGlzIHByb3BlcnR5LCBidXQgaXQncyB0aGUgbW9zdFxuICAgIC8vIGVmZmVjdGl2ZSB3YXkgdG8gYXBwbHkgc3R5bGVzIHRvIGFuIEhUTUxFbGVtZW50XG4gICAgLy8gJEZsb3dGaXhNZVtjYW5ub3Qtd3JpdGVdXG5cblxuICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgc3R5bGUpO1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlO1xuICB2YXIgaW5pdGlhbFN0eWxlcyA9IHtcbiAgICBwb3BwZXI6IHtcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgbGVmdDogJzAnLFxuICAgICAgdG9wOiAnMCcsXG4gICAgICBtYXJnaW46ICcwJ1xuICAgIH0sXG4gICAgYXJyb3c6IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgfSxcbiAgICByZWZlcmVuY2U6IHt9XG4gIH07XG4gIE9iamVjdC5hc3NpZ24oc3RhdGUuZWxlbWVudHMucG9wcGVyLnN0eWxlLCBpbml0aWFsU3R5bGVzLnBvcHBlcik7XG4gIHN0YXRlLnN0eWxlcyA9IGluaXRpYWxTdHlsZXM7XG5cbiAgaWYgKHN0YXRlLmVsZW1lbnRzLmFycm93KSB7XG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZS5lbGVtZW50cy5hcnJvdy5zdHlsZSwgaW5pdGlhbFN0eWxlcy5hcnJvdyk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW25hbWVdO1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBzdGF0ZS5hdHRyaWJ1dGVzW25hbWVdIHx8IHt9O1xuICAgICAgdmFyIHN0eWxlUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHN0YXRlLnN0eWxlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IHN0YXRlLnN0eWxlc1tuYW1lXSA6IGluaXRpYWxTdHlsZXNbbmFtZV0pOyAvLyBTZXQgYWxsIHZhbHVlcyB0byBhbiBlbXB0eSBzdHJpbmcgdG8gdW5zZXQgdGhlbVxuXG4gICAgICB2YXIgc3R5bGUgPSBzdHlsZVByb3BlcnRpZXMucmVkdWNlKGZ1bmN0aW9uIChzdHlsZSwgcHJvcGVydHkpIHtcbiAgICAgICAgc3R5bGVbcHJvcGVydHldID0gJyc7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgIH0sIHt9KTsgLy8gYXJyb3cgaXMgb3B0aW9uYWwgKyB2aXJ0dWFsIGVsZW1lbnRzXG5cbiAgICAgIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAhZ2V0Tm9kZU5hbWUoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdhcHBseVN0eWxlcycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogYXBwbHlTdHlsZXMsXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydjb21wdXRlU3R5bGVzJ11cbn07IiwiaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qc1wiO1xuaW1wb3J0IGNvbnRhaW5zIGZyb20gXCIuLi9kb20tdXRpbHMvY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgd2l0aGluIH0gZnJvbSBcIi4uL3V0aWxzL3dpdGhpbi5qc1wiO1xuaW1wb3J0IG1lcmdlUGFkZGluZ09iamVjdCBmcm9tIFwiLi4vdXRpbHMvbWVyZ2VQYWRkaW5nT2JqZWN0LmpzXCI7XG5pbXBvcnQgZXhwYW5kVG9IYXNoTWFwIGZyb20gXCIuLi91dGlscy9leHBhbmRUb0hhc2hNYXAuanNcIjtcbmltcG9ydCB7IGxlZnQsIHJpZ2h0LCBiYXNlUGxhY2VtZW50cywgdG9wLCBib3R0b20gfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgdG9QYWRkaW5nT2JqZWN0ID0gZnVuY3Rpb24gdG9QYWRkaW5nT2JqZWN0KHBhZGRpbmcsIHN0YXRlKSB7XG4gIHBhZGRpbmcgPSB0eXBlb2YgcGFkZGluZyA9PT0gJ2Z1bmN0aW9uJyA/IHBhZGRpbmcoT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVjdHMsIHtcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KSkgOiBwYWRkaW5nO1xuICByZXR1cm4gbWVyZ2VQYWRkaW5nT2JqZWN0KHR5cGVvZiBwYWRkaW5nICE9PSAnbnVtYmVyJyA/IHBhZGRpbmcgOiBleHBhbmRUb0hhc2hNYXAocGFkZGluZywgYmFzZVBsYWNlbWVudHMpKTtcbn07XG5cbmZ1bmN0aW9uIGFycm93KF9yZWYpIHtcbiAgdmFyIF9zdGF0ZSRtb2RpZmllcnNEYXRhJDtcblxuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gIHZhciBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5hcnJvdztcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpO1xuICB2YXIgYXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGlzVmVydGljYWwgPSBbbGVmdCwgcmlnaHRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMDtcbiAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgaWYgKCFhcnJvd0VsZW1lbnQgfHwgIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcGFkZGluZ09iamVjdCA9IHRvUGFkZGluZ09iamVjdChvcHRpb25zLnBhZGRpbmcsIHN0YXRlKTtcbiAgdmFyIGFycm93UmVjdCA9IGdldExheW91dFJlY3QoYXJyb3dFbGVtZW50KTtcbiAgdmFyIG1pblByb3AgPSBheGlzID09PSAneScgPyB0b3AgOiBsZWZ0O1xuICB2YXIgbWF4UHJvcCA9IGF4aXMgPT09ICd5JyA/IGJvdHRvbSA6IHJpZ2h0O1xuICB2YXIgZW5kRGlmZiA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtsZW5dICsgc3RhdGUucmVjdHMucmVmZXJlbmNlW2F4aXNdIC0gcG9wcGVyT2Zmc2V0c1theGlzXSAtIHN0YXRlLnJlY3RzLnBvcHBlcltsZW5dO1xuICB2YXIgc3RhcnREaWZmID0gcG9wcGVyT2Zmc2V0c1theGlzXSAtIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXTtcbiAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KGFycm93RWxlbWVudCk7XG4gIHZhciBjbGllbnRTaXplID0gYXJyb3dPZmZzZXRQYXJlbnQgPyBheGlzID09PSAneScgPyBhcnJvd09mZnNldFBhcmVudC5jbGllbnRIZWlnaHQgfHwgMCA6IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudFdpZHRoIHx8IDAgOiAwO1xuICB2YXIgY2VudGVyVG9SZWZlcmVuY2UgPSBlbmREaWZmIC8gMiAtIHN0YXJ0RGlmZiAvIDI7IC8vIE1ha2Ugc3VyZSB0aGUgYXJyb3cgZG9lc24ndCBvdmVyZmxvdyB0aGUgcG9wcGVyIGlmIHRoZSBjZW50ZXIgcG9pbnQgaXNcbiAgLy8gb3V0c2lkZSBvZiB0aGUgcG9wcGVyIGJvdW5kc1xuXG4gIHZhciBtaW4gPSBwYWRkaW5nT2JqZWN0W21pblByb3BdO1xuICB2YXIgbWF4ID0gY2xpZW50U2l6ZSAtIGFycm93UmVjdFtsZW5dIC0gcGFkZGluZ09iamVjdFttYXhQcm9wXTtcbiAgdmFyIGNlbnRlciA9IGNsaWVudFNpemUgLyAyIC0gYXJyb3dSZWN0W2xlbl0gLyAyICsgY2VudGVyVG9SZWZlcmVuY2U7XG4gIHZhciBvZmZzZXQgPSB3aXRoaW4obWluLCBjZW50ZXIsIG1heCk7IC8vIFByZXZlbnRzIGJyZWFraW5nIHN5bnRheCBoaWdobGlnaHRpbmcuLi5cblxuICB2YXIgYXhpc1Byb3AgPSBheGlzO1xuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gKF9zdGF0ZSRtb2RpZmllcnNEYXRhJCA9IHt9LCBfc3RhdGUkbW9kaWZpZXJzRGF0YSRbYXhpc1Byb3BdID0gb2Zmc2V0LCBfc3RhdGUkbW9kaWZpZXJzRGF0YSQuY2VudGVyT2Zmc2V0ID0gb2Zmc2V0IC0gY2VudGVyLCBfc3RhdGUkbW9kaWZpZXJzRGF0YSQpO1xufVxuXG5mdW5jdGlvbiBlZmZlY3QoX3JlZjIpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjIuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjIub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJGVsZW1lbnQgPSBvcHRpb25zLmVsZW1lbnQsXG4gICAgICBhcnJvd0VsZW1lbnQgPSBfb3B0aW9ucyRlbGVtZW50ID09PSB2b2lkIDAgPyAnW2RhdGEtcG9wcGVyLWFycm93XScgOiBfb3B0aW9ucyRlbGVtZW50O1xuXG4gIGlmIChhcnJvd0VsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfSAvLyBDU1Mgc2VsZWN0b3JcblxuXG4gIGlmICh0eXBlb2YgYXJyb3dFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLnBvcHBlci5xdWVyeVNlbGVjdG9yKGFycm93RWxlbWVudCk7XG5cbiAgICBpZiAoIWFycm93RWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoIWlzSFRNTEVsZW1lbnQoYXJyb3dFbGVtZW50KSkge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhcnJvd1wiIGVsZW1lbnQgbXVzdCBiZSBhbiBIVE1MRWxlbWVudCAobm90IGFuIFNWR0VsZW1lbnQpLicsICdUbyB1c2UgYW4gU1ZHIGFycm93LCB3cmFwIGl0IGluIGFuIEhUTUxFbGVtZW50IHRoYXQgd2lsbCBiZSB1c2VkIGFzJywgJ3RoZSBhcnJvdy4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29udGFpbnMoc3RhdGUuZWxlbWVudHMucG9wcGVyLCBhcnJvd0VsZW1lbnQpKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhcnJvd1wiIG1vZGlmaWVyXFwncyBgZWxlbWVudGAgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBwb3BwZXInLCAnZWxlbWVudC4nXS5qb2luKCcgJykpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHN0YXRlLmVsZW1lbnRzLmFycm93ID0gYXJyb3dFbGVtZW50O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYXJyb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogYXJyb3csXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J11cbn07IiwiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBlbmQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbnZhciB1bnNldFNpZGVzID0ge1xuICB0b3A6ICdhdXRvJyxcbiAgcmlnaHQ6ICdhdXRvJyxcbiAgYm90dG9tOiAnYXV0bycsXG4gIGxlZnQ6ICdhdXRvJ1xufTsgLy8gUm91bmQgdGhlIG9mZnNldHMgdG8gdGhlIG5lYXJlc3Qgc3VpdGFibGUgc3VicGl4ZWwgYmFzZWQgb24gdGhlIERQUi5cbi8vIFpvb21pbmcgY2FuIGNoYW5nZSB0aGUgRFBSLCBidXQgaXQgc2VlbXMgdG8gcmVwb3J0IGEgdmFsdWUgdGhhdCB3aWxsXG4vLyBjbGVhbmx5IGRpdmlkZSB0aGUgdmFsdWVzIGludG8gdGhlIGFwcHJvcHJpYXRlIHN1YnBpeGVscy5cblxuZnVuY3Rpb24gcm91bmRPZmZzZXRzQnlEUFIoX3JlZikge1xuICB2YXIgeCA9IF9yZWYueCxcbiAgICAgIHkgPSBfcmVmLnk7XG4gIHZhciB3aW4gPSB3aW5kb3c7XG4gIHZhciBkcHIgPSB3aW4uZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICByZXR1cm4ge1xuICAgIHg6IHJvdW5kKHggKiBkcHIpIC8gZHByIHx8IDAsXG4gICAgeTogcm91bmQoeSAqIGRwcikgLyBkcHIgfHwgMFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9TdHlsZXMoX3JlZjIpIHtcbiAgdmFyIF9PYmplY3QkYXNzaWduMjtcblxuICB2YXIgcG9wcGVyID0gX3JlZjIucG9wcGVyLFxuICAgICAgcG9wcGVyUmVjdCA9IF9yZWYyLnBvcHBlclJlY3QsXG4gICAgICBwbGFjZW1lbnQgPSBfcmVmMi5wbGFjZW1lbnQsXG4gICAgICB2YXJpYXRpb24gPSBfcmVmMi52YXJpYXRpb24sXG4gICAgICBvZmZzZXRzID0gX3JlZjIub2Zmc2V0cyxcbiAgICAgIHBvc2l0aW9uID0gX3JlZjIucG9zaXRpb24sXG4gICAgICBncHVBY2NlbGVyYXRpb24gPSBfcmVmMi5ncHVBY2NlbGVyYXRpb24sXG4gICAgICBhZGFwdGl2ZSA9IF9yZWYyLmFkYXB0aXZlLFxuICAgICAgcm91bmRPZmZzZXRzID0gX3JlZjIucm91bmRPZmZzZXRzLFxuICAgICAgaXNGaXhlZCA9IF9yZWYyLmlzRml4ZWQ7XG4gIHZhciBfb2Zmc2V0cyR4ID0gb2Zmc2V0cy54LFxuICAgICAgeCA9IF9vZmZzZXRzJHggPT09IHZvaWQgMCA/IDAgOiBfb2Zmc2V0cyR4LFxuICAgICAgX29mZnNldHMkeSA9IG9mZnNldHMueSxcbiAgICAgIHkgPSBfb2Zmc2V0cyR5ID09PSB2b2lkIDAgPyAwIDogX29mZnNldHMkeTtcblxuICB2YXIgX3JlZjMgPSB0eXBlb2Ygcm91bmRPZmZzZXRzID09PSAnZnVuY3Rpb24nID8gcm91bmRPZmZzZXRzKHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfSkgOiB7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG5cbiAgeCA9IF9yZWYzLng7XG4gIHkgPSBfcmVmMy55O1xuICB2YXIgaGFzWCA9IG9mZnNldHMuaGFzT3duUHJvcGVydHkoJ3gnKTtcbiAgdmFyIGhhc1kgPSBvZmZzZXRzLmhhc093blByb3BlcnR5KCd5Jyk7XG4gIHZhciBzaWRlWCA9IGxlZnQ7XG4gIHZhciBzaWRlWSA9IHRvcDtcbiAgdmFyIHdpbiA9IHdpbmRvdztcblxuICBpZiAoYWRhcHRpdmUpIHtcbiAgICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KHBvcHBlcik7XG4gICAgdmFyIGhlaWdodFByb3AgPSAnY2xpZW50SGVpZ2h0JztcbiAgICB2YXIgd2lkdGhQcm9wID0gJ2NsaWVudFdpZHRoJztcblxuICAgIGlmIChvZmZzZXRQYXJlbnQgPT09IGdldFdpbmRvdyhwb3BwZXIpKSB7XG4gICAgICBvZmZzZXRQYXJlbnQgPSBnZXREb2N1bWVudEVsZW1lbnQocG9wcGVyKTtcblxuICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiAhPT0gJ3N0YXRpYycgJiYgcG9zaXRpb24gPT09ICdhYnNvbHV0ZScpIHtcbiAgICAgICAgaGVpZ2h0UHJvcCA9ICdzY3JvbGxIZWlnaHQnO1xuICAgICAgICB3aWR0aFByb3AgPSAnc2Nyb2xsV2lkdGgnO1xuICAgICAgfVxuICAgIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FzdF06IGZvcmNlIHR5cGUgcmVmaW5lbWVudCwgd2UgY29tcGFyZSBvZmZzZXRQYXJlbnQgd2l0aCB3aW5kb3cgYWJvdmUsIGJ1dCBGbG93IGRvZXNuJ3QgZGV0ZWN0IGl0XG5cblxuICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudDtcblxuICAgIGlmIChwbGFjZW1lbnQgPT09IHRvcCB8fCAocGxhY2VtZW50ID09PSBsZWZ0IHx8IHBsYWNlbWVudCA9PT0gcmlnaHQpICYmIHZhcmlhdGlvbiA9PT0gZW5kKSB7XG4gICAgICBzaWRlWSA9IGJvdHRvbTtcbiAgICAgIHZhciBvZmZzZXRZID0gaXNGaXhlZCAmJiBvZmZzZXRQYXJlbnQgPT09IHdpbiAmJiB3aW4udmlzdWFsVmlld3BvcnQgPyB3aW4udmlzdWFsVmlld3BvcnQuaGVpZ2h0IDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gICAgICBvZmZzZXRQYXJlbnRbaGVpZ2h0UHJvcF07XG4gICAgICB5IC09IG9mZnNldFkgLSBwb3BwZXJSZWN0LmhlaWdodDtcbiAgICAgIHkgKj0gZ3B1QWNjZWxlcmF0aW9uID8gMSA6IC0xO1xuICAgIH1cblxuICAgIGlmIChwbGFjZW1lbnQgPT09IGxlZnQgfHwgKHBsYWNlbWVudCA9PT0gdG9wIHx8IHBsYWNlbWVudCA9PT0gYm90dG9tKSAmJiB2YXJpYXRpb24gPT09IGVuZCkge1xuICAgICAgc2lkZVggPSByaWdodDtcbiAgICAgIHZhciBvZmZzZXRYID0gaXNGaXhlZCAmJiBvZmZzZXRQYXJlbnQgPT09IHdpbiAmJiB3aW4udmlzdWFsVmlld3BvcnQgPyB3aW4udmlzdWFsVmlld3BvcnQud2lkdGggOiAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICAgIG9mZnNldFBhcmVudFt3aWR0aFByb3BdO1xuICAgICAgeCAtPSBvZmZzZXRYIC0gcG9wcGVyUmVjdC53aWR0aDtcbiAgICAgIHggKj0gZ3B1QWNjZWxlcmF0aW9uID8gMSA6IC0xO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb21tb25TdHlsZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICBwb3NpdGlvbjogcG9zaXRpb25cbiAgfSwgYWRhcHRpdmUgJiYgdW5zZXRTaWRlcyk7XG5cbiAgdmFyIF9yZWY0ID0gcm91bmRPZmZzZXRzID09PSB0cnVlID8gcm91bmRPZmZzZXRzQnlEUFIoe1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9KSA6IHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcblxuICB4ID0gX3JlZjQueDtcbiAgeSA9IF9yZWY0Lnk7XG5cbiAgaWYgKGdwdUFjY2VsZXJhdGlvbikge1xuICAgIHZhciBfT2JqZWN0JGFzc2lnbjtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIChfT2JqZWN0JGFzc2lnbiA9IHt9LCBfT2JqZWN0JGFzc2lnbltzaWRlWV0gPSBoYXNZID8gJzAnIDogJycsIF9PYmplY3QkYXNzaWduW3NpZGVYXSA9IGhhc1ggPyAnMCcgOiAnJywgX09iamVjdCRhc3NpZ24udHJhbnNmb3JtID0gKHdpbi5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpIDw9IDEgPyBcInRyYW5zbGF0ZShcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4KVwiIDogXCJ0cmFuc2xhdGUzZChcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4LCAwKVwiLCBfT2JqZWN0JGFzc2lnbikpO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywgKF9PYmplY3QkYXNzaWduMiA9IHt9LCBfT2JqZWN0JGFzc2lnbjJbc2lkZVldID0gaGFzWSA/IHkgKyBcInB4XCIgOiAnJywgX09iamVjdCRhc3NpZ24yW3NpZGVYXSA9IGhhc1ggPyB4ICsgXCJweFwiIDogJycsIF9PYmplY3QkYXNzaWduMi50cmFuc2Zvcm0gPSAnJywgX09iamVjdCRhc3NpZ24yKSk7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZXMoX3JlZjUpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjUuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjUub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJGdwdUFjY2VsZXJhdCA9IG9wdGlvbnMuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX29wdGlvbnMkZ3B1QWNjZWxlcmF0ID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkZ3B1QWNjZWxlcmF0LFxuICAgICAgX29wdGlvbnMkYWRhcHRpdmUgPSBvcHRpb25zLmFkYXB0aXZlLFxuICAgICAgYWRhcHRpdmUgPSBfb3B0aW9ucyRhZGFwdGl2ZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFkYXB0aXZlLFxuICAgICAgX29wdGlvbnMkcm91bmRPZmZzZXRzID0gb3B0aW9ucy5yb3VuZE9mZnNldHMsXG4gICAgICByb3VuZE9mZnNldHMgPSBfb3B0aW9ucyRyb3VuZE9mZnNldHMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRyb3VuZE9mZnNldHM7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIHZhciB0cmFuc2l0aW9uUHJvcGVydHkgPSBnZXRDb21wdXRlZFN0eWxlKHN0YXRlLmVsZW1lbnRzLnBvcHBlcikudHJhbnNpdGlvblByb3BlcnR5IHx8ICcnO1xuXG4gICAgaWYgKGFkYXB0aXZlICYmIFsndHJhbnNmb3JtJywgJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddLnNvbWUoZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gdHJhbnNpdGlvblByb3BlcnR5LmluZGV4T2YocHJvcGVydHkpID49IDA7XG4gICAgfSkpIHtcbiAgICAgIGNvbnNvbGUud2FybihbJ1BvcHBlcjogRGV0ZWN0ZWQgQ1NTIHRyYW5zaXRpb25zIG9uIGF0IGxlYXN0IG9uZSBvZiB0aGUgZm9sbG93aW5nJywgJ0NTUyBwcm9wZXJ0aWVzOiBcInRyYW5zZm9ybVwiLCBcInRvcFwiLCBcInJpZ2h0XCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLicsICdcXG5cXG4nLCAnRGlzYWJsZSB0aGUgXCJjb21wdXRlU3R5bGVzXCIgbW9kaWZpZXJcXCdzIGBhZGFwdGl2ZWAgb3B0aW9uIHRvIGFsbG93JywgJ2ZvciBzbW9vdGggdHJhbnNpdGlvbnMsIG9yIHJlbW92ZSB0aGVzZSBwcm9wZXJ0aWVzIGZyb20gdGhlIENTUycsICd0cmFuc2l0aW9uIGRlY2xhcmF0aW9uIG9uIHRoZSBwb3BwZXIgZWxlbWVudCBpZiBvbmx5IHRyYW5zaXRpb25pbmcnLCAnb3BhY2l0eSBvciBiYWNrZ3JvdW5kLWNvbG9yIGZvciBleGFtcGxlLicsICdcXG5cXG4nLCAnV2UgcmVjb21tZW5kIHVzaW5nIHRoZSBwb3BwZXIgZWxlbWVudCBhcyBhIHdyYXBwZXIgYXJvdW5kIGFuIGlubmVyJywgJ2VsZW1lbnQgdGhhdCBjYW4gaGF2ZSBhbnkgQ1NTIHByb3BlcnR5IHRyYW5zaXRpb25lZCBmb3IgYW5pbWF0aW9ucy4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb21tb25TdHlsZXMgPSB7XG4gICAgcGxhY2VtZW50OiBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCksXG4gICAgdmFyaWF0aW9uOiBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KSxcbiAgICBwb3BwZXI6IHN0YXRlLmVsZW1lbnRzLnBvcHBlcixcbiAgICBwb3BwZXJSZWN0OiBzdGF0ZS5yZWN0cy5wb3BwZXIsXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiBncHVBY2NlbGVyYXRpb24sXG4gICAgaXNGaXhlZDogc3RhdGUub3B0aW9ucy5zdHJhdGVneSA9PT0gJ2ZpeGVkJ1xuICB9O1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdHlsZXMucG9wcGVyLCBtYXBUb1N0eWxlcyhPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIHtcbiAgICAgIG9mZnNldHM6IHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyxcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgYWRhcHRpdmU6IGFkYXB0aXZlLFxuICAgICAgcm91bmRPZmZzZXRzOiByb3VuZE9mZnNldHNcbiAgICB9KSkpO1xuICB9XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEuYXJyb3cgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5hcnJvdyA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnN0eWxlcy5hcnJvdywgbWFwVG9TdHlsZXMoT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCB7XG4gICAgICBvZmZzZXRzOiBzdGF0ZS5tb2RpZmllcnNEYXRhLmFycm93LFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBhZGFwdGl2ZTogZmFsc2UsXG4gICAgICByb3VuZE9mZnNldHM6IHJvdW5kT2Zmc2V0c1xuICAgIH0pKSk7XG4gIH1cblxuICBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyLCB7XG4gICAgJ2RhdGEtcG9wcGVyLXBsYWNlbWVudCc6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2NvbXB1dGVTdHlsZXMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ2JlZm9yZVdyaXRlJyxcbiAgZm46IGNvbXB1dGVTdHlsZXMsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgcGFzc2l2ZSA9IHtcbiAgcGFzc2l2ZTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIGluc3RhbmNlID0gX3JlZi5pbnN0YW5jZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRzY3JvbGwgPSBvcHRpb25zLnNjcm9sbCxcbiAgICAgIHNjcm9sbCA9IF9vcHRpb25zJHNjcm9sbCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHNjcm9sbCxcbiAgICAgIF9vcHRpb25zJHJlc2l6ZSA9IG9wdGlvbnMucmVzaXplLFxuICAgICAgcmVzaXplID0gX29wdGlvbnMkcmVzaXplID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcmVzaXplO1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KHN0YXRlLmVsZW1lbnRzLnBvcHBlcik7XG4gIHZhciBzY3JvbGxQYXJlbnRzID0gW10uY29uY2F0KHN0YXRlLnNjcm9sbFBhcmVudHMucmVmZXJlbmNlLCBzdGF0ZS5zY3JvbGxQYXJlbnRzLnBvcHBlcik7XG5cbiAgaWYgKHNjcm9sbCkge1xuICAgIHNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAoc2Nyb2xsUGFyZW50KSB7XG4gICAgICBzY3JvbGxQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChyZXNpemUpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JvbGxQYXJlbnQpIHtcbiAgICAgICAgc2Nyb2xsUGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVzaXplKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdldmVudExpc3RlbmVycycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogZnVuY3Rpb24gZm4oKSB7fSxcbiAgZWZmZWN0OiBlZmZlY3QsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCBnZXRPcHBvc2l0ZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0T3Bwb3NpdGVQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4uL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgY29tcHV0ZUF1dG9QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2NvbXB1dGVBdXRvUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyBib3R0b20sIHRvcCwgc3RhcnQsIHJpZ2h0LCBsZWZ0LCBhdXRvIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuLi91dGlscy9nZXRWYXJpYXRpb24uanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5mdW5jdGlvbiBnZXRFeHBhbmRlZEZhbGxiYWNrUGxhY2VtZW50cyhwbGFjZW1lbnQpIHtcbiAgaWYgKGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0bykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBvcHBvc2l0ZVBsYWNlbWVudCA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG4gIHJldHVybiBbZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQocGxhY2VtZW50KSwgb3Bwb3NpdGVQbGFjZW1lbnQsIGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KG9wcG9zaXRlUGxhY2VtZW50KV07XG59XG5cbmZ1bmN0aW9uIGZsaXAoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0uX3NraXApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX29wdGlvbnMkbWFpbkF4aXMgPSBvcHRpb25zLm1haW5BeGlzLFxuICAgICAgY2hlY2tNYWluQXhpcyA9IF9vcHRpb25zJG1haW5BeGlzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkbWFpbkF4aXMsXG4gICAgICBfb3B0aW9ucyRhbHRBeGlzID0gb3B0aW9ucy5hbHRBeGlzLFxuICAgICAgY2hlY2tBbHRBeGlzID0gX29wdGlvbnMkYWx0QXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBzcGVjaWZpZWRGYWxsYmFja1BsYWNlbWVudHMgPSBvcHRpb25zLmZhbGxiYWNrUGxhY2VtZW50cyxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9IG9wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBmbGlwVmFyaWF0aW9ucyA9IF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGZsaXBWYXJpYXRpbyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50cyA9IG9wdGlvbnMuYWxsb3dlZEF1dG9QbGFjZW1lbnRzO1xuICB2YXIgcHJlZmVycmVkUGxhY2VtZW50ID0gc3RhdGUub3B0aW9ucy5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwcmVmZXJyZWRQbGFjZW1lbnQpO1xuICB2YXIgaXNCYXNlUGxhY2VtZW50ID0gYmFzZVBsYWNlbWVudCA9PT0gcHJlZmVycmVkUGxhY2VtZW50O1xuICB2YXIgZmFsbGJhY2tQbGFjZW1lbnRzID0gc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzIHx8IChpc0Jhc2VQbGFjZW1lbnQgfHwgIWZsaXBWYXJpYXRpb25zID8gW2dldE9wcG9zaXRlUGxhY2VtZW50KHByZWZlcnJlZFBsYWNlbWVudCldIDogZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocHJlZmVycmVkUGxhY2VtZW50KSk7XG4gIHZhciBwbGFjZW1lbnRzID0gW3ByZWZlcnJlZFBsYWNlbWVudF0uY29uY2F0KGZhbGxiYWNrUGxhY2VtZW50cykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIHJldHVybiBhY2MuY29uY2F0KGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0byA/IGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zOiBmbGlwVmFyaWF0aW9ucyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50czogYWxsb3dlZEF1dG9QbGFjZW1lbnRzXG4gICAgfSkgOiBwbGFjZW1lbnQpO1xuICB9LCBbXSk7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIGNoZWNrc01hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIG1ha2VGYWxsYmFja0NoZWNrcyA9IHRydWU7XG4gIHZhciBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRzWzBdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwbGFjZW1lbnQgPSBwbGFjZW1lbnRzW2ldO1xuXG4gICAgdmFyIF9iYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuXG4gICAgdmFyIGlzU3RhcnRWYXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA9PT0gc3RhcnQ7XG4gICAgdmFyIGlzVmVydGljYWwgPSBbdG9wLCBib3R0b21dLmluZGV4T2YoX2Jhc2VQbGFjZW1lbnQpID49IDA7XG4gICAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG4gICAgdmFyIG92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeTogYWx0Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSk7XG4gICAgdmFyIG1haW5WYXJpYXRpb25TaWRlID0gaXNWZXJ0aWNhbCA/IGlzU3RhcnRWYXJpYXRpb24gPyByaWdodCA6IGxlZnQgOiBpc1N0YXJ0VmFyaWF0aW9uID8gYm90dG9tIDogdG9wO1xuXG4gICAgaWYgKHJlZmVyZW5jZVJlY3RbbGVuXSA+IHBvcHBlclJlY3RbbGVuXSkge1xuICAgICAgbWFpblZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgfVxuXG4gICAgdmFyIGFsdFZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgdmFyIGNoZWNrcyA9IFtdO1xuXG4gICAgaWYgKGNoZWNrTWFpbkF4aXMpIHtcbiAgICAgIGNoZWNrcy5wdXNoKG92ZXJmbG93W19iYXNlUGxhY2VtZW50XSA8PSAwKTtcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tBbHRBeGlzKSB7XG4gICAgICBjaGVja3MucHVzaChvdmVyZmxvd1ttYWluVmFyaWF0aW9uU2lkZV0gPD0gMCwgb3ZlcmZsb3dbYWx0VmFyaWF0aW9uU2lkZV0gPD0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrcy5ldmVyeShmdW5jdGlvbiAoY2hlY2spIHtcbiAgICAgIHJldHVybiBjaGVjaztcbiAgICB9KSkge1xuICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50O1xuICAgICAgbWFrZUZhbGxiYWNrQ2hlY2tzID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjaGVja3NNYXAuc2V0KHBsYWNlbWVudCwgY2hlY2tzKTtcbiAgfVxuXG4gIGlmIChtYWtlRmFsbGJhY2tDaGVja3MpIHtcbiAgICAvLyBgMmAgbWF5IGJlIGRlc2lyZWQgaW4gc29tZSBjYXNlcyDigJMgcmVzZWFyY2ggbGF0ZXJcbiAgICB2YXIgbnVtYmVyT2ZDaGVja3MgPSBmbGlwVmFyaWF0aW9ucyA/IDMgOiAxO1xuXG4gICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoX2kpIHtcbiAgICAgIHZhciBmaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50cy5maW5kKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICAgICAgdmFyIGNoZWNrcyA9IGNoZWNrc01hcC5nZXQocGxhY2VtZW50KTtcblxuICAgICAgICBpZiAoY2hlY2tzKSB7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrcy5zbGljZSgwLCBfaSkuZXZlcnkoZnVuY3Rpb24gKGNoZWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZml0dGluZ1BsYWNlbWVudCkge1xuICAgICAgICBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBmaXR0aW5nUGxhY2VtZW50O1xuICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBfaSA9IG51bWJlck9mQ2hlY2tzOyBfaSA+IDA7IF9pLS0pIHtcbiAgICAgIHZhciBfcmV0ID0gX2xvb3AoX2kpO1xuXG4gICAgICBpZiAoX3JldCA9PT0gXCJicmVha1wiKSBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUucGxhY2VtZW50ICE9PSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQpIHtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdLl9za2lwID0gdHJ1ZTtcbiAgICBzdGF0ZS5wbGFjZW1lbnQgPSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQ7XG4gICAgc3RhdGUucmVzZXQgPSB0cnVlO1xuICB9XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdmbGlwJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IGZsaXAsXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsnb2Zmc2V0J10sXG4gIGRhdGE6IHtcbiAgICBfc2tpcDogZmFsc2VcbiAgfVxufTsiLCJpbXBvcnQgeyB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcblxuZnVuY3Rpb24gZ2V0U2lkZU9mZnNldHMob3ZlcmZsb3csIHJlY3QsIHByZXZlbnRlZE9mZnNldHMpIHtcbiAgaWYgKHByZXZlbnRlZE9mZnNldHMgPT09IHZvaWQgMCkge1xuICAgIHByZXZlbnRlZE9mZnNldHMgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcDogb3ZlcmZsb3cudG9wIC0gcmVjdC5oZWlnaHQgLSBwcmV2ZW50ZWRPZmZzZXRzLnksXG4gICAgcmlnaHQ6IG92ZXJmbG93LnJpZ2h0IC0gcmVjdC53aWR0aCArIHByZXZlbnRlZE9mZnNldHMueCxcbiAgICBib3R0b206IG92ZXJmbG93LmJvdHRvbSAtIHJlY3QuaGVpZ2h0ICsgcHJldmVudGVkT2Zmc2V0cy55LFxuICAgIGxlZnQ6IG92ZXJmbG93LmxlZnQgLSByZWN0LndpZHRoIC0gcHJldmVudGVkT2Zmc2V0cy54XG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChvdmVyZmxvdykge1xuICByZXR1cm4gW3RvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdF0uc29tZShmdW5jdGlvbiAoc2lkZSkge1xuICAgIHJldHVybiBvdmVyZmxvd1tzaWRlXSA+PSAwO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZShfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBwcmV2ZW50ZWRPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wcmV2ZW50T3ZlcmZsb3c7XG4gIHZhciByZWZlcmVuY2VPdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgZWxlbWVudENvbnRleHQ6ICdyZWZlcmVuY2UnXG4gIH0pO1xuICB2YXIgcG9wcGVyQWx0T3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGFsdEJvdW5kYXJ5OiB0cnVlXG4gIH0pO1xuICB2YXIgcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzID0gZ2V0U2lkZU9mZnNldHMocmVmZXJlbmNlT3ZlcmZsb3csIHJlZmVyZW5jZVJlY3QpO1xuICB2YXIgcG9wcGVyRXNjYXBlT2Zmc2V0cyA9IGdldFNpZGVPZmZzZXRzKHBvcHBlckFsdE92ZXJmbG93LCBwb3BwZXJSZWN0LCBwcmV2ZW50ZWRPZmZzZXRzKTtcbiAgdmFyIGlzUmVmZXJlbmNlSGlkZGVuID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyk7XG4gIHZhciBoYXNQb3BwZXJFc2NhcGVkID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHBvcHBlckVzY2FwZU9mZnNldHMpO1xuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0ge1xuICAgIHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0czogcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzLFxuICAgIHBvcHBlckVzY2FwZU9mZnNldHM6IHBvcHBlckVzY2FwZU9mZnNldHMsXG4gICAgaXNSZWZlcmVuY2VIaWRkZW46IGlzUmVmZXJlbmNlSGlkZGVuLFxuICAgIGhhc1BvcHBlckVzY2FwZWQ6IGhhc1BvcHBlckVzY2FwZWRcbiAgfTtcbiAgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciwge1xuICAgICdkYXRhLXBvcHBlci1yZWZlcmVuY2UtaGlkZGVuJzogaXNSZWZlcmVuY2VIaWRkZW4sXG4gICAgJ2RhdGEtcG9wcGVyLWVzY2FwZWQnOiBoYXNQb3BwZXJFc2NhcGVkXG4gIH0pO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnaGlkZScsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J10sXG4gIGZuOiBoaWRlXG59OyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgYXBwbHlTdHlsZXMgfSBmcm9tIFwiLi9hcHBseVN0eWxlcy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBhcnJvdyB9IGZyb20gXCIuL2Fycm93LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNvbXB1dGVTdHlsZXMgfSBmcm9tIFwiLi9jb21wdXRlU3R5bGVzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZmxpcCB9IGZyb20gXCIuL2ZsaXAuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgaGlkZSB9IGZyb20gXCIuL2hpZGUuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgb2Zmc2V0IH0gZnJvbSBcIi4vb2Zmc2V0LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBvcHBlck9mZnNldHMgfSBmcm9tIFwiLi9wb3BwZXJPZmZzZXRzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHByZXZlbnRPdmVyZmxvdyB9IGZyb20gXCIuL3ByZXZlbnRPdmVyZmxvdy5qc1wiOyIsImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBwbGFjZW1lbnRzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlQW5kU2tpZGRpbmdUb1hZKHBsYWNlbWVudCwgcmVjdHMsIG9mZnNldCkge1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgdmFyIGludmVydERpc3RhbmNlID0gW2xlZnQsIHRvcF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwID8gLTEgOiAxO1xuXG4gIHZhciBfcmVmID0gdHlwZW9mIG9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IG9mZnNldChPYmplY3QuYXNzaWduKHt9LCByZWN0cywge1xuICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gIH0pKSA6IG9mZnNldCxcbiAgICAgIHNraWRkaW5nID0gX3JlZlswXSxcbiAgICAgIGRpc3RhbmNlID0gX3JlZlsxXTtcblxuICBza2lkZGluZyA9IHNraWRkaW5nIHx8IDA7XG4gIGRpc3RhbmNlID0gKGRpc3RhbmNlIHx8IDApICogaW52ZXJ0RGlzdGFuY2U7XG4gIHJldHVybiBbbGVmdCwgcmlnaHRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMCA/IHtcbiAgICB4OiBkaXN0YW5jZSxcbiAgICB5OiBza2lkZGluZ1xuICB9IDoge1xuICAgIHg6IHNraWRkaW5nLFxuICAgIHk6IGRpc3RhbmNlXG4gIH07XG59XG5cbmZ1bmN0aW9uIG9mZnNldChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmMi5vcHRpb25zLFxuICAgICAgbmFtZSA9IF9yZWYyLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRvZmZzZXQgPSBvcHRpb25zLm9mZnNldCxcbiAgICAgIG9mZnNldCA9IF9vcHRpb25zJG9mZnNldCA9PT0gdm9pZCAwID8gWzAsIDBdIDogX29wdGlvbnMkb2Zmc2V0O1xuICB2YXIgZGF0YSA9IHBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGlzdGFuY2VBbmRTa2lkZGluZ1RvWFkocGxhY2VtZW50LCBzdGF0ZS5yZWN0cywgb2Zmc2V0KTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHZhciBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQgPSBkYXRhW3N0YXRlLnBsYWNlbWVudF0sXG4gICAgICB4ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50LngsXG4gICAgICB5ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50Lnk7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyAhPSBudWxsKSB7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLnggKz0geDtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMueSArPSB5O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdvZmZzZXQnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIGZuOiBvZmZzZXRcbn07IiwiaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuLi91dGlscy9jb21wdXRlT2Zmc2V0cy5qc1wiO1xuXG5mdW5jdGlvbiBwb3BwZXJPZmZzZXRzKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIC8vIE9mZnNldHMgYXJlIHRoZSBhY3R1YWwgcG9zaXRpb24gdGhlIHBvcHBlciBuZWVkcyB0byBoYXZlIHRvIGJlXG4gIC8vIHByb3Blcmx5IHBvc2l0aW9uZWQgbmVhciBpdHMgcmVmZXJlbmNlIGVsZW1lbnRcbiAgLy8gVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBwbGFjZW1lbnQsIGFuZCB3aWxsIGJlIGFkanVzdGVkIGJ5XG4gIC8vIHRoZSBtb2RpZmllcnMgaW4gdGhlIG5leHQgc3RlcFxuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gY29tcHV0ZU9mZnNldHMoe1xuICAgIHJlZmVyZW5jZTogc3RhdGUucmVjdHMucmVmZXJlbmNlLFxuICAgIGVsZW1lbnQ6IHN0YXRlLnJlY3RzLnBvcHBlcixcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3BvcHBlck9mZnNldHMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3JlYWQnLFxuICBmbjogcG9wcGVyT2Zmc2V0cyxcbiAgZGF0YToge31cbn07IiwiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBzdGFydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldEFsdEF4aXMgZnJvbSBcIi4uL3V0aWxzL2dldEFsdEF4aXMuanNcIjtcbmltcG9ydCB7IHdpdGhpbiwgd2l0aGluTWF4Q2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvd2l0aGluLmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldEZyZXNoU2lkZU9iamVjdCBmcm9tIFwiLi4vdXRpbHMvZ2V0RnJlc2hTaWRlT2JqZWN0LmpzXCI7XG5pbXBvcnQgeyBtaW4gYXMgbWF0aE1pbiwgbWF4IGFzIG1hdGhNYXggfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuXG5mdW5jdGlvbiBwcmV2ZW50T3ZlcmZsb3coX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRtYWluQXhpcyA9IG9wdGlvbnMubWFpbkF4aXMsXG4gICAgICBjaGVja01haW5BeGlzID0gX29wdGlvbnMkbWFpbkF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRtYWluQXhpcyxcbiAgICAgIF9vcHRpb25zJGFsdEF4aXMgPSBvcHRpb25zLmFsdEF4aXMsXG4gICAgICBjaGVja0FsdEF4aXMgPSBfb3B0aW9ucyRhbHRBeGlzID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBfb3B0aW9ucyR0ZXRoZXIgPSBvcHRpb25zLnRldGhlcixcbiAgICAgIHRldGhlciA9IF9vcHRpb25zJHRldGhlciA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHRldGhlcixcbiAgICAgIF9vcHRpb25zJHRldGhlck9mZnNldCA9IG9wdGlvbnMudGV0aGVyT2Zmc2V0LFxuICAgICAgdGV0aGVyT2Zmc2V0ID0gX29wdGlvbnMkdGV0aGVyT2Zmc2V0ID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkdGV0aGVyT2Zmc2V0O1xuICB2YXIgb3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgIGFsdEJvdW5kYXJ5OiBhbHRCb3VuZGFyeVxuICB9KTtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9ICF2YXJpYXRpb247XG4gIHZhciBtYWluQXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGFsdEF4aXMgPSBnZXRBbHRBeGlzKG1haW5BeGlzKTtcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIHRldGhlck9mZnNldFZhbHVlID0gdHlwZW9mIHRldGhlck9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IHRldGhlck9mZnNldChPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZWN0cywge1xuICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gIH0pKSA6IHRldGhlck9mZnNldDtcbiAgdmFyIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZSA9IHR5cGVvZiB0ZXRoZXJPZmZzZXRWYWx1ZSA9PT0gJ251bWJlcicgPyB7XG4gICAgbWFpbkF4aXM6IHRldGhlck9mZnNldFZhbHVlLFxuICAgIGFsdEF4aXM6IHRldGhlck9mZnNldFZhbHVlXG4gIH0gOiBPYmplY3QuYXNzaWduKHtcbiAgICBtYWluQXhpczogMCxcbiAgICBhbHRBeGlzOiAwXG4gIH0sIHRldGhlck9mZnNldFZhbHVlKTtcbiAgdmFyIG9mZnNldE1vZGlmaWVyU3RhdGUgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldCA/IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0W3N0YXRlLnBsYWNlbWVudF0gOiBudWxsO1xuICB2YXIgZGF0YSA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcblxuICBpZiAoIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY2hlY2tNYWluQXhpcykge1xuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQ7XG5cbiAgICB2YXIgbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgICB2YXIgYWx0U2lkZSA9IG1haW5BeGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgICB2YXIgbGVuID0gbWFpbkF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICB2YXIgb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1ttYWluQXhpc107XG4gICAgdmFyIG1pbiA9IG9mZnNldCArIG92ZXJmbG93W21haW5TaWRlXTtcbiAgICB2YXIgbWF4ID0gb2Zmc2V0IC0gb3ZlcmZsb3dbYWx0U2lkZV07XG4gICAgdmFyIGFkZGl0aXZlID0gdGV0aGVyID8gLXBvcHBlclJlY3RbbGVuXSAvIDIgOiAwO1xuICAgIHZhciBtaW5MZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gcmVmZXJlbmNlUmVjdFtsZW5dIDogcG9wcGVyUmVjdFtsZW5dO1xuICAgIHZhciBtYXhMZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gLXBvcHBlclJlY3RbbGVuXSA6IC1yZWZlcmVuY2VSZWN0W2xlbl07IC8vIFdlIG5lZWQgdG8gaW5jbHVkZSB0aGUgYXJyb3cgaW4gdGhlIGNhbGN1bGF0aW9uIHNvIHRoZSBhcnJvdyBkb2Vzbid0IGdvXG4gICAgLy8gb3V0c2lkZSB0aGUgcmVmZXJlbmNlIGJvdW5kc1xuXG4gICAgdmFyIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93O1xuICAgIHZhciBhcnJvd1JlY3QgPSB0ZXRoZXIgJiYgYXJyb3dFbGVtZW50ID8gZ2V0TGF5b3V0UmVjdChhcnJvd0VsZW1lbnQpIDoge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDBcbiAgICB9O1xuICAgIHZhciBhcnJvd1BhZGRpbmdPYmplY3QgPSBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10gPyBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10ucGFkZGluZyA6IGdldEZyZXNoU2lkZU9iamVjdCgpO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNaW4gPSBhcnJvd1BhZGRpbmdPYmplY3RbbWFpblNpZGVdO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNYXggPSBhcnJvd1BhZGRpbmdPYmplY3RbYWx0U2lkZV07IC8vIElmIHRoZSByZWZlcmVuY2UgbGVuZ3RoIGlzIHNtYWxsZXIgdGhhbiB0aGUgYXJyb3cgbGVuZ3RoLCB3ZSBkb24ndCB3YW50XG4gICAgLy8gdG8gaW5jbHVkZSBpdHMgZnVsbCBzaXplIGluIHRoZSBjYWxjdWxhdGlvbi4gSWYgdGhlIHJlZmVyZW5jZSBpcyBzbWFsbFxuICAgIC8vIGFuZCBuZWFyIHRoZSBlZGdlIG9mIGEgYm91bmRhcnksIHRoZSBwb3BwZXIgY2FuIG92ZXJmbG93IGV2ZW4gaWYgdGhlXG4gICAgLy8gcmVmZXJlbmNlIGlzIG5vdCBvdmVyZmxvd2luZyBhcyB3ZWxsIChlLmcuIHZpcnR1YWwgZWxlbWVudHMgd2l0aCBub1xuICAgIC8vIHdpZHRoIG9yIGhlaWdodClcblxuICAgIHZhciBhcnJvd0xlbiA9IHdpdGhpbigwLCByZWZlcmVuY2VSZWN0W2xlbl0sIGFycm93UmVjdFtsZW5dKTtcbiAgICB2YXIgbWluT2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gcmVmZXJlbmNlUmVjdFtsZW5dIC8gMiAtIGFkZGl0aXZlIC0gYXJyb3dMZW4gLSBhcnJvd1BhZGRpbmdNaW4gLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXMgOiBtaW5MZW4gLSBhcnJvd0xlbiAtIGFycm93UGFkZGluZ01pbiAtIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcztcbiAgICB2YXIgbWF4T2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gLXJlZmVyZW5jZVJlY3RbbGVuXSAvIDIgKyBhZGRpdGl2ZSArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzIDogbWF4TGVuICsgYXJyb3dMZW4gKyBhcnJvd1BhZGRpbmdNYXggKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXM7XG4gICAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3cgJiYgZ2V0T2Zmc2V0UGFyZW50KHN0YXRlLmVsZW1lbnRzLmFycm93KTtcbiAgICB2YXIgY2xpZW50T2Zmc2V0ID0gYXJyb3dPZmZzZXRQYXJlbnQgPyBtYWluQXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50VG9wIHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRMZWZ0IHx8IDAgOiAwO1xuICAgIHZhciBvZmZzZXRNb2RpZmllclZhbHVlID0gKF9vZmZzZXRNb2RpZmllclN0YXRlJCA9IG9mZnNldE1vZGlmaWVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IG9mZnNldE1vZGlmaWVyU3RhdGVbbWFpbkF4aXNdKSAhPSBudWxsID8gX29mZnNldE1vZGlmaWVyU3RhdGUkIDogMDtcbiAgICB2YXIgdGV0aGVyTWluID0gb2Zmc2V0ICsgbWluT2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZSAtIGNsaWVudE9mZnNldDtcbiAgICB2YXIgdGV0aGVyTWF4ID0gb2Zmc2V0ICsgbWF4T2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZTtcbiAgICB2YXIgcHJldmVudGVkT2Zmc2V0ID0gd2l0aGluKHRldGhlciA/IG1hdGhNaW4obWluLCB0ZXRoZXJNaW4pIDogbWluLCBvZmZzZXQsIHRldGhlciA/IG1hdGhNYXgobWF4LCB0ZXRoZXJNYXgpIDogbWF4KTtcbiAgICBwb3BwZXJPZmZzZXRzW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldDtcbiAgICBkYXRhW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldCAtIG9mZnNldDtcbiAgfVxuXG4gIGlmIChjaGVja0FsdEF4aXMpIHtcbiAgICB2YXIgX29mZnNldE1vZGlmaWVyU3RhdGUkMjtcblxuICAgIHZhciBfbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3gnID8gdG9wIDogbGVmdDtcblxuICAgIHZhciBfYWx0U2lkZSA9IG1haW5BeGlzID09PSAneCcgPyBib3R0b20gOiByaWdodDtcblxuICAgIHZhciBfb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1thbHRBeGlzXTtcblxuICAgIHZhciBfbGVuID0gYWx0QXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgdmFyIF9taW4gPSBfb2Zmc2V0ICsgb3ZlcmZsb3dbX21haW5TaWRlXTtcblxuICAgIHZhciBfbWF4ID0gX29mZnNldCAtIG92ZXJmbG93W19hbHRTaWRlXTtcblxuICAgIHZhciBpc09yaWdpblNpZGUgPSBbdG9wLCBsZWZ0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcblxuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyID0gb2Zmc2V0TW9kaWZpZXJTdGF0ZSA9PSBudWxsID8gdm9pZCAwIDogb2Zmc2V0TW9kaWZpZXJTdGF0ZVthbHRBeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJDIgOiAwO1xuXG4gICAgdmFyIF90ZXRoZXJNaW4gPSBpc09yaWdpblNpZGUgPyBfbWluIDogX29mZnNldCAtIHJlZmVyZW5jZVJlY3RbX2xlbl0gLSBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcztcblxuICAgIHZhciBfdGV0aGVyTWF4ID0gaXNPcmlnaW5TaWRlID8gX29mZnNldCArIHJlZmVyZW5jZVJlY3RbX2xlbl0gKyBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcyA6IF9tYXg7XG5cbiAgICB2YXIgX3ByZXZlbnRlZE9mZnNldCA9IHRldGhlciAmJiBpc09yaWdpblNpZGUgPyB3aXRoaW5NYXhDbGFtcChfdGV0aGVyTWluLCBfb2Zmc2V0LCBfdGV0aGVyTWF4KSA6IHdpdGhpbih0ZXRoZXIgPyBfdGV0aGVyTWluIDogX21pbiwgX29mZnNldCwgdGV0aGVyID8gX3RldGhlck1heCA6IF9tYXgpO1xuXG4gICAgcG9wcGVyT2Zmc2V0c1thbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQ7XG4gICAgZGF0YVthbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQgLSBfb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdwcmV2ZW50T3ZlcmZsb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogcHJldmVudE92ZXJmbG93LFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddXG59OyIsImltcG9ydCB7IHBvcHBlckdlbmVyYXRvciwgZGV0ZWN0T3ZlcmZsb3cgfSBmcm9tIFwiLi9jcmVhdGVQb3BwZXIuanNcIjtcbmltcG9ydCBldmVudExpc3RlbmVycyBmcm9tIFwiLi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmltcG9ydCBwb3BwZXJPZmZzZXRzIGZyb20gXCIuL21vZGlmaWVycy9wb3BwZXJPZmZzZXRzLmpzXCI7XG5pbXBvcnQgY29tcHV0ZVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvY29tcHV0ZVN0eWxlcy5qc1wiO1xuaW1wb3J0IGFwcGx5U3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9hcHBseVN0eWxlcy5qc1wiO1xudmFyIGRlZmF1bHRNb2RpZmllcnMgPSBbZXZlbnRMaXN0ZW5lcnMsIHBvcHBlck9mZnNldHMsIGNvbXB1dGVTdHlsZXMsIGFwcGx5U3R5bGVzXTtcbnZhciBjcmVhdGVQb3BwZXIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKHtcbiAgZGVmYXVsdE1vZGlmaWVyczogZGVmYXVsdE1vZGlmaWVyc1xufSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgY3JlYXRlUG9wcGVyLCBwb3BwZXJHZW5lcmF0b3IsIGRlZmF1bHRNb2RpZmllcnMsIGRldGVjdE92ZXJmbG93IH07IiwiaW1wb3J0IHsgcG9wcGVyR2VuZXJhdG9yLCBkZXRlY3RPdmVyZmxvdyB9IGZyb20gXCIuL2NyZWF0ZVBvcHBlci5qc1wiO1xuaW1wb3J0IGV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL21vZGlmaWVycy9ldmVudExpc3RlbmVycy5qc1wiO1xuaW1wb3J0IHBvcHBlck9mZnNldHMgZnJvbSBcIi4vbW9kaWZpZXJzL3BvcHBlck9mZnNldHMuanNcIjtcbmltcG9ydCBjb21wdXRlU3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzXCI7XG5pbXBvcnQgYXBwbHlTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzXCI7XG5pbXBvcnQgb2Zmc2V0IGZyb20gXCIuL21vZGlmaWVycy9vZmZzZXQuanNcIjtcbmltcG9ydCBmbGlwIGZyb20gXCIuL21vZGlmaWVycy9mbGlwLmpzXCI7XG5pbXBvcnQgcHJldmVudE92ZXJmbG93IGZyb20gXCIuL21vZGlmaWVycy9wcmV2ZW50T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBhcnJvdyBmcm9tIFwiLi9tb2RpZmllcnMvYXJyb3cuanNcIjtcbmltcG9ydCBoaWRlIGZyb20gXCIuL21vZGlmaWVycy9oaWRlLmpzXCI7XG52YXIgZGVmYXVsdE1vZGlmaWVycyA9IFtldmVudExpc3RlbmVycywgcG9wcGVyT2Zmc2V0cywgY29tcHV0ZVN0eWxlcywgYXBwbHlTdHlsZXMsIG9mZnNldCwgZmxpcCwgcHJldmVudE92ZXJmbG93LCBhcnJvdywgaGlkZV07XG52YXIgY3JlYXRlUG9wcGVyID0gLyojX19QVVJFX18qL3BvcHBlckdlbmVyYXRvcih7XG4gIGRlZmF1bHRNb2RpZmllcnM6IGRlZmF1bHRNb2RpZmllcnNcbn0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciwgcG9wcGVyR2VuZXJhdG9yLCBkZWZhdWx0TW9kaWZpZXJzLCBkZXRlY3RPdmVyZmxvdyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciBhcyBjcmVhdGVQb3BwZXJMaXRlIH0gZnJvbSBcIi4vcG9wcGVyLWxpdGUuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgKiBmcm9tIFwiLi9tb2RpZmllcnMvaW5kZXguanNcIjsiLCJpbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IHsgdmFyaWF0aW9uUGxhY2VtZW50cywgYmFzZVBsYWNlbWVudHMsIHBsYWNlbWVudHMgYXMgYWxsUGxhY2VtZW50cyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wdXRlQXV0b1BsYWNlbWVudChzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5ID0gX29wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zID0gX29wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPSBfb3B0aW9ucy5hbGxvd2VkQXV0b1BsYWNlbWVudHMsXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHMgPSBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPT09IHZvaWQgMCA/IGFsbFBsYWNlbWVudHMgOiBfb3B0aW9ucyRhbGxvd2VkQXV0b1A7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KTtcbiAgdmFyIHBsYWNlbWVudHMgPSB2YXJpYXRpb24gPyBmbGlwVmFyaWF0aW9ucyA/IHZhcmlhdGlvblBsYWNlbWVudHMgOiB2YXJpYXRpb25QbGFjZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgcmV0dXJuIGdldFZhcmlhdGlvbihwbGFjZW1lbnQpID09PSB2YXJpYXRpb247XG4gIH0pIDogYmFzZVBsYWNlbWVudHM7XG4gIHZhciBhbGxvd2VkUGxhY2VtZW50cyA9IHBsYWNlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWxsb3dlZEF1dG9QbGFjZW1lbnRzLmluZGV4T2YocGxhY2VtZW50KSA+PSAwO1xuICB9KTtcblxuICBpZiAoYWxsb3dlZFBsYWNlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgYWxsb3dlZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogVGhlIGBhbGxvd2VkQXV0b1BsYWNlbWVudHNgIG9wdGlvbiBkaWQgbm90IGFsbG93IGFueScsICdwbGFjZW1lbnRzLiBFbnN1cmUgdGhlIGBwbGFjZW1lbnRgIG9wdGlvbiBtYXRjaGVzIHRoZSB2YXJpYXRpb24nLCAnb2YgdGhlIGFsbG93ZWQgcGxhY2VtZW50cy4nLCAnRm9yIGV4YW1wbGUsIFwiYXV0b1wiIGNhbm5vdCBiZSB1c2VkIHRvIGFsbG93IFwiYm90dG9tLXN0YXJ0XCIuJywgJ1VzZSBcImF1dG8tc3RhcnRcIiBpbnN0ZWFkLiddLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXR5cGVdOiBGbG93IHNlZW1zIHRvIGhhdmUgcHJvYmxlbXMgd2l0aCB0d28gYXJyYXkgdW5pb25zLi4uXG5cblxuICB2YXIgb3ZlcmZsb3dzID0gYWxsb3dlZFBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSlbZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpXTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvdmVyZmxvd3MpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gb3ZlcmZsb3dzW2FdIC0gb3ZlcmZsb3dzW2JdO1xuICB9KTtcbn0iLCJpbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudCBmcm9tIFwiLi9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCwgc3RhcnQsIGVuZCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcHV0ZU9mZnNldHMoX3JlZikge1xuICB2YXIgcmVmZXJlbmNlID0gX3JlZi5yZWZlcmVuY2UsXG4gICAgICBlbGVtZW50ID0gX3JlZi5lbGVtZW50LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZi5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50ID8gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIHZhcmlhdGlvbiA9IHBsYWNlbWVudCA/IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIGNvbW1vblggPSByZWZlcmVuY2UueCArIHJlZmVyZW5jZS53aWR0aCAvIDIgLSBlbGVtZW50LndpZHRoIC8gMjtcbiAgdmFyIGNvbW1vblkgPSByZWZlcmVuY2UueSArIHJlZmVyZW5jZS5oZWlnaHQgLyAyIC0gZWxlbWVudC5oZWlnaHQgLyAyO1xuICB2YXIgb2Zmc2V0cztcblxuICBzd2l0Y2ggKGJhc2VQbGFjZW1lbnQpIHtcbiAgICBjYXNlIHRvcDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IGNvbW1vblgsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55IC0gZWxlbWVudC5oZWlnaHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgYm90dG9tOlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogY29tbW9uWCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnkgKyByZWZlcmVuY2UuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHJpZ2h0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLnggKyByZWZlcmVuY2Uud2lkdGgsXG4gICAgICAgIHk6IGNvbW1vbllcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgbGVmdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54IC0gZWxlbWVudC53aWR0aCxcbiAgICAgICAgeTogY29tbW9uWVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54LFxuICAgICAgICB5OiByZWZlcmVuY2UueVxuICAgICAgfTtcbiAgfVxuXG4gIHZhciBtYWluQXhpcyA9IGJhc2VQbGFjZW1lbnQgPyBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCkgOiBudWxsO1xuXG4gIGlmIChtYWluQXhpcyAhPSBudWxsKSB7XG4gICAgdmFyIGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICBzd2l0Y2ggKHZhcmlhdGlvbikge1xuICAgICAgY2FzZSBzdGFydDpcbiAgICAgICAgb2Zmc2V0c1ttYWluQXhpc10gPSBvZmZzZXRzW21haW5BeGlzXSAtIChyZWZlcmVuY2VbbGVuXSAvIDIgLSBlbGVtZW50W2xlbl0gLyAyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgZW5kOlxuICAgICAgICBvZmZzZXRzW21haW5BeGlzXSA9IG9mZnNldHNbbWFpbkF4aXNdICsgKHJlZmVyZW5jZVtsZW5dIC8gMiAtIGVsZW1lbnRbbGVuXSAvIDIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0cztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmbikge1xuICB2YXIgcGVuZGluZztcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXBlbmRpbmcpIHtcbiAgICAgIHBlbmRpbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwZW5kaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlc29sdmUoZm4oKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBlbmRpbmc7XG4gIH07XG59IiwiaW1wb3J0IGdldENsaXBwaW5nUmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldENsaXBwaW5nUmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuL2NvbXB1dGVPZmZzZXRzLmpzXCI7XG5pbXBvcnQgcmVjdFRvQ2xpZW50UmVjdCBmcm9tIFwiLi9yZWN0VG9DbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgeyBjbGlwcGluZ1BhcmVudHMsIHJlZmVyZW5jZSwgcG9wcGVyLCBib3R0b20sIHRvcCwgcmlnaHQsIGJhc2VQbGFjZW1lbnRzLCB2aWV3cG9ydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IHsgaXNFbGVtZW50IH0gZnJvbSBcIi4uL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgbWVyZ2VQYWRkaW5nT2JqZWN0IGZyb20gXCIuL21lcmdlUGFkZGluZ09iamVjdC5qc1wiO1xuaW1wb3J0IGV4cGFuZFRvSGFzaE1hcCBmcm9tIFwiLi9leHBhbmRUb0hhc2hNYXAuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIF9vcHRpb25zJHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zJHBsYWNlbWVudCA9PT0gdm9pZCAwID8gc3RhdGUucGxhY2VtZW50IDogX29wdGlvbnMkcGxhY2VtZW50LFxuICAgICAgX29wdGlvbnMkc3RyYXRlZ3kgPSBfb3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIHN0cmF0ZWd5ID0gX29wdGlvbnMkc3RyYXRlZ3kgPT09IHZvaWQgMCA/IHN0YXRlLnN0cmF0ZWd5IDogX29wdGlvbnMkc3RyYXRlZ3ksXG4gICAgICBfb3B0aW9ucyRib3VuZGFyeSA9IF9vcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgYm91bmRhcnkgPSBfb3B0aW9ucyRib3VuZGFyeSA9PT0gdm9pZCAwID8gY2xpcHBpbmdQYXJlbnRzIDogX29wdGlvbnMkYm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRyb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucyRyb290Qm91bmRhcnkgPT09IHZvaWQgMCA/IHZpZXdwb3J0IDogX29wdGlvbnMkcm9vdEJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkZWxlbWVudENvbnRlID0gX29wdGlvbnMuZWxlbWVudENvbnRleHQsXG4gICAgICBlbGVtZW50Q29udGV4dCA9IF9vcHRpb25zJGVsZW1lbnRDb250ZSA9PT0gdm9pZCAwID8gcG9wcGVyIDogX29wdGlvbnMkZWxlbWVudENvbnRlLFxuICAgICAgX29wdGlvbnMkYWx0Qm91bmRhcnkgPSBfb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gX29wdGlvbnMkYWx0Qm91bmRhcnkgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkYWx0Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIHBhZGRpbmcgPSBfb3B0aW9ucyRwYWRkaW5nID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkcGFkZGluZztcbiAgdmFyIHBhZGRpbmdPYmplY3QgPSBtZXJnZVBhZGRpbmdPYmplY3QodHlwZW9mIHBhZGRpbmcgIT09ICdudW1iZXInID8gcGFkZGluZyA6IGV4cGFuZFRvSGFzaE1hcChwYWRkaW5nLCBiYXNlUGxhY2VtZW50cykpO1xuICB2YXIgYWx0Q29udGV4dCA9IGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgPyByZWZlcmVuY2UgOiBwb3BwZXI7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW2FsdEJvdW5kYXJ5ID8gYWx0Q29udGV4dCA6IGVsZW1lbnRDb250ZXh0XTtcbiAgdmFyIGNsaXBwaW5nQ2xpZW50UmVjdCA9IGdldENsaXBwaW5nUmVjdChpc0VsZW1lbnQoZWxlbWVudCkgPyBlbGVtZW50IDogZWxlbWVudC5jb250ZXh0RWxlbWVudCB8fCBnZXREb2N1bWVudEVsZW1lbnQoc3RhdGUuZWxlbWVudHMucG9wcGVyKSwgYm91bmRhcnksIHJvb3RCb3VuZGFyeSwgc3RyYXRlZ3kpO1xuICB2YXIgcmVmZXJlbmNlQ2xpZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChzdGF0ZS5lbGVtZW50cy5yZWZlcmVuY2UpO1xuICB2YXIgcG9wcGVyT2Zmc2V0cyA9IGNvbXB1dGVPZmZzZXRzKHtcbiAgICByZWZlcmVuY2U6IHJlZmVyZW5jZUNsaWVudFJlY3QsXG4gICAgZWxlbWVudDogcG9wcGVyUmVjdCxcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICB9KTtcbiAgdmFyIHBvcHBlckNsaWVudFJlY3QgPSByZWN0VG9DbGllbnRSZWN0KE9iamVjdC5hc3NpZ24oe30sIHBvcHBlclJlY3QsIHBvcHBlck9mZnNldHMpKTtcbiAgdmFyIGVsZW1lbnRDbGllbnRSZWN0ID0gZWxlbWVudENvbnRleHQgPT09IHBvcHBlciA/IHBvcHBlckNsaWVudFJlY3QgOiByZWZlcmVuY2VDbGllbnRSZWN0OyAvLyBwb3NpdGl2ZSA9IG92ZXJmbG93aW5nIHRoZSBjbGlwcGluZyByZWN0XG4gIC8vIDAgb3IgbmVnYXRpdmUgPSB3aXRoaW4gdGhlIGNsaXBwaW5nIHJlY3RcblxuICB2YXIgb3ZlcmZsb3dPZmZzZXRzID0ge1xuICAgIHRvcDogY2xpcHBpbmdDbGllbnRSZWN0LnRvcCAtIGVsZW1lbnRDbGllbnRSZWN0LnRvcCArIHBhZGRpbmdPYmplY3QudG9wLFxuICAgIGJvdHRvbTogZWxlbWVudENsaWVudFJlY3QuYm90dG9tIC0gY2xpcHBpbmdDbGllbnRSZWN0LmJvdHRvbSArIHBhZGRpbmdPYmplY3QuYm90dG9tLFxuICAgIGxlZnQ6IGNsaXBwaW5nQ2xpZW50UmVjdC5sZWZ0IC0gZWxlbWVudENsaWVudFJlY3QubGVmdCArIHBhZGRpbmdPYmplY3QubGVmdCxcbiAgICByaWdodDogZWxlbWVudENsaWVudFJlY3QucmlnaHQgLSBjbGlwcGluZ0NsaWVudFJlY3QucmlnaHQgKyBwYWRkaW5nT2JqZWN0LnJpZ2h0XG4gIH07XG4gIHZhciBvZmZzZXREYXRhID0gc3RhdGUubW9kaWZpZXJzRGF0YS5vZmZzZXQ7IC8vIE9mZnNldHMgY2FuIGJlIGFwcGxpZWQgb25seSB0byB0aGUgcG9wcGVyIGVsZW1lbnRcblxuICBpZiAoZWxlbWVudENvbnRleHQgPT09IHBvcHBlciAmJiBvZmZzZXREYXRhKSB7XG4gICAgdmFyIG9mZnNldCA9IG9mZnNldERhdGFbcGxhY2VtZW50XTtcbiAgICBPYmplY3Qua2V5cyhvdmVyZmxvd09mZnNldHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIG11bHRpcGx5ID0gW3JpZ2h0LCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gMSA6IC0xO1xuICAgICAgdmFyIGF4aXMgPSBbdG9wLCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gJ3knIDogJ3gnO1xuICAgICAgb3ZlcmZsb3dPZmZzZXRzW2tleV0gKz0gb2Zmc2V0W2F4aXNdICogbXVsdGlwbHk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gb3ZlcmZsb3dPZmZzZXRzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4cGFuZFRvSGFzaE1hcCh2YWx1ZSwga2V5cykge1xuICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGhhc2hNYXAsIGtleSkge1xuICAgIGhhc2hNYXBba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiBoYXNoTWFwO1xuICB9LCB7fSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0KHN0cikge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gW10uY29uY2F0KGFyZ3MpLnJlZHVjZShmdW5jdGlvbiAocCwgYykge1xuICAgIHJldHVybiBwLnJlcGxhY2UoLyVzLywgYyk7XG4gIH0sIHN0cik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QWx0QXhpcyhheGlzKSB7XG4gIHJldHVybiBheGlzID09PSAneCcgPyAneScgOiAneCc7XG59IiwiaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEZyZXNoU2lkZU9iamVjdCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIGxlZnQ6IDBcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgPj0gMCA/ICd4JyA6ICd5Jztcbn0iLCJ2YXIgaGFzaCA9IHtcbiAgbGVmdDogJ3JpZ2h0JyxcbiAgcmlnaHQ6ICdsZWZ0JyxcbiAgYm90dG9tOiAndG9wJyxcbiAgdG9wOiAnYm90dG9tJ1xufTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICB9KTtcbn0iLCJ2YXIgaGFzaCA9IHtcbiAgc3RhcnQ6ICdlbmQnLFxuICBlbmQ6ICdzdGFydCdcbn07XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9zdGFydHxlbmQvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG59IiwiZXhwb3J0IHZhciBtYXggPSBNYXRoLm1heDtcbmV4cG9ydCB2YXIgbWluID0gTWF0aC5taW47XG5leHBvcnQgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZUJ5TmFtZShtb2RpZmllcnMpIHtcbiAgdmFyIG1lcmdlZCA9IG1vZGlmaWVycy5yZWR1Y2UoZnVuY3Rpb24gKG1lcmdlZCwgY3VycmVudCkge1xuICAgIHZhciBleGlzdGluZyA9IG1lcmdlZFtjdXJyZW50Lm5hbWVdO1xuICAgIG1lcmdlZFtjdXJyZW50Lm5hbWVdID0gZXhpc3RpbmcgPyBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZywgY3VycmVudCwge1xuICAgICAgb3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgZXhpc3Rpbmcub3B0aW9ucywgY3VycmVudC5vcHRpb25zKSxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLmRhdGEsIGN1cnJlbnQuZGF0YSlcbiAgICB9KSA6IGN1cnJlbnQ7XG4gICAgcmV0dXJuIG1lcmdlZDtcbiAgfSwge30pOyAvLyBJRTExIGRvZXMgbm90IHN1cHBvcnQgT2JqZWN0LnZhbHVlc1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhtZXJnZWQpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIG1lcmdlZFtrZXldO1xuICB9KTtcbn0iLCJpbXBvcnQgZ2V0RnJlc2hTaWRlT2JqZWN0IGZyb20gXCIuL2dldEZyZXNoU2lkZU9iamVjdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VQYWRkaW5nT2JqZWN0KHBhZGRpbmdPYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGdldEZyZXNoU2lkZU9iamVjdCgpLCBwYWRkaW5nT2JqZWN0KTtcbn0iLCJpbXBvcnQgeyBtb2RpZmllclBoYXNlcyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiOyAvLyBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ5ODc1MjU1XG5cbmZ1bmN0aW9uIG9yZGVyKG1vZGlmaWVycykge1xuICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICB2YXIgdmlzaXRlZCA9IG5ldyBTZXQoKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBtYXAuc2V0KG1vZGlmaWVyLm5hbWUsIG1vZGlmaWVyKTtcbiAgfSk7IC8vIE9uIHZpc2l0aW5nIG9iamVjdCwgY2hlY2sgZm9yIGl0cyBkZXBlbmRlbmNpZXMgYW5kIHZpc2l0IHRoZW0gcmVjdXJzaXZlbHlcblxuICBmdW5jdGlvbiBzb3J0KG1vZGlmaWVyKSB7XG4gICAgdmlzaXRlZC5hZGQobW9kaWZpZXIubmFtZSk7XG4gICAgdmFyIHJlcXVpcmVzID0gW10uY29uY2F0KG1vZGlmaWVyLnJlcXVpcmVzIHx8IFtdLCBtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzIHx8IFtdKTtcbiAgICByZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXApIHtcbiAgICAgIGlmICghdmlzaXRlZC5oYXMoZGVwKSkge1xuICAgICAgICB2YXIgZGVwTW9kaWZpZXIgPSBtYXAuZ2V0KGRlcCk7XG5cbiAgICAgICAgaWYgKGRlcE1vZGlmaWVyKSB7XG4gICAgICAgICAgc29ydChkZXBNb2RpZmllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXN1bHQucHVzaChtb2RpZmllcik7XG4gIH1cblxuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBpZiAoIXZpc2l0ZWQuaGFzKG1vZGlmaWVyLm5hbWUpKSB7XG4gICAgICAvLyBjaGVjayBmb3IgdmlzaXRlZCBvYmplY3RcbiAgICAgIHNvcnQobW9kaWZpZXIpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9yZGVyTW9kaWZpZXJzKG1vZGlmaWVycykge1xuICAvLyBvcmRlciBiYXNlZCBvbiBkZXBlbmRlbmNpZXNcbiAgdmFyIG9yZGVyZWRNb2RpZmllcnMgPSBvcmRlcihtb2RpZmllcnMpOyAvLyBvcmRlciBiYXNlZCBvbiBwaGFzZVxuXG4gIHJldHVybiBtb2RpZmllclBoYXNlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGhhc2UpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLmZpbHRlcihmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgIHJldHVybiBtb2RpZmllci5waGFzZSA9PT0gcGhhc2U7XG4gICAgfSkpO1xuICB9LCBbXSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVjdFRvQ2xpZW50UmVjdChyZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZWN0LCB7XG4gICAgbGVmdDogcmVjdC54LFxuICAgIHRvcDogcmVjdC55LFxuICAgIHJpZ2h0OiByZWN0LnggKyByZWN0LndpZHRoLFxuICAgIGJvdHRvbTogcmVjdC55ICsgcmVjdC5oZWlnaHRcbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5pcXVlQnkoYXJyLCBmbikge1xuICB2YXIgaWRlbnRpZmllcnMgPSBuZXcgU2V0KCk7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBmbihpdGVtKTtcblxuICAgIGlmICghaWRlbnRpZmllcnMuaGFzKGlkZW50aWZpZXIpKSB7XG4gICAgICBpZGVudGlmaWVycy5hZGQoaWRlbnRpZmllcik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVBU3RyaW5nKCkge1xuICB2YXIgdWFEYXRhID0gbmF2aWdhdG9yLnVzZXJBZ2VudERhdGE7XG5cbiAgaWYgKHVhRGF0YSAhPSBudWxsICYmIHVhRGF0YS5icmFuZHMpIHtcbiAgICByZXR1cm4gdWFEYXRhLmJyYW5kcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLmJyYW5kICsgXCIvXCIgKyBpdGVtLnZlcnNpb247XG4gICAgfSkuam9pbignICcpO1xuICB9XG5cbiAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQ7XG59IiwiaW1wb3J0IGZvcm1hdCBmcm9tIFwiLi9mb3JtYXQuanNcIjtcbmltcG9ydCB7IG1vZGlmaWVyUGhhc2VzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG52YXIgSU5WQUxJRF9NT0RJRklFUl9FUlJPUiA9ICdQb3BwZXI6IG1vZGlmaWVyIFwiJXNcIiBwcm92aWRlZCBhbiBpbnZhbGlkICVzIHByb3BlcnR5LCBleHBlY3RlZCAlcyBidXQgZ290ICVzJztcbnZhciBNSVNTSU5HX0RFUEVOREVOQ1lfRVJST1IgPSAnUG9wcGVyOiBtb2RpZmllciBcIiVzXCIgcmVxdWlyZXMgXCIlc1wiLCBidXQgXCIlc1wiIG1vZGlmaWVyIGlzIG5vdCBhdmFpbGFibGUnO1xudmFyIFZBTElEX1BST1BFUlRJRVMgPSBbJ25hbWUnLCAnZW5hYmxlZCcsICdwaGFzZScsICdmbicsICdlZmZlY3QnLCAncmVxdWlyZXMnLCAnb3B0aW9ucyddO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmFsaWRhdGVNb2RpZmllcnMobW9kaWZpZXJzKSB7XG4gIG1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIFtdLmNvbmNhdChPYmplY3Qua2V5cyhtb2RpZmllciksIFZBTElEX1BST1BFUlRJRVMpIC8vIElFMTEtY29tcGF0aWJsZSByZXBsYWNlbWVudCBmb3IgYG5ldyBTZXQoaXRlcmFibGUpYFxuICAgIC5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgc2VsZikge1xuICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5uYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgU3RyaW5nKG1vZGlmaWVyLm5hbWUpLCAnXCJuYW1lXCInLCAnXCJzdHJpbmdcIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLm5hbWUpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlbmFibGVkJzpcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZGlmaWVyLmVuYWJsZWQgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZW5hYmxlZFwiJywgJ1wiYm9vbGVhblwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIuZW5hYmxlZCkgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3BoYXNlJzpcbiAgICAgICAgICBpZiAobW9kaWZpZXJQaGFzZXMuaW5kZXhPZihtb2RpZmllci5waGFzZSkgPCAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJwaGFzZVwiJywgXCJlaXRoZXIgXCIgKyBtb2RpZmllclBoYXNlcy5qb2luKCcsICcpLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5waGFzZSkgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2ZuJzpcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZGlmaWVyLmZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJmblwiJywgJ1wiZnVuY3Rpb25cIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLmZuKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZWZmZWN0JzpcbiAgICAgICAgICBpZiAobW9kaWZpZXIuZWZmZWN0ICE9IG51bGwgJiYgdHlwZW9mIG1vZGlmaWVyLmVmZmVjdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZWZmZWN0XCInLCAnXCJmdW5jdGlvblwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIuZm4pICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZXF1aXJlcyc6XG4gICAgICAgICAgaWYgKG1vZGlmaWVyLnJlcXVpcmVzICE9IG51bGwgJiYgIUFycmF5LmlzQXJyYXkobW9kaWZpZXIucmVxdWlyZXMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJyZXF1aXJlc1wiJywgJ1wiYXJyYXlcIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLnJlcXVpcmVzKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVxdWlyZXNJZkV4aXN0cyc6XG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG1vZGlmaWVyLnJlcXVpcmVzSWZFeGlzdHMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJyZXF1aXJlc0lmRXhpc3RzXCInLCAnXCJhcnJheVwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cykgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ29wdGlvbnMnOlxuICAgICAgICBjYXNlICdkYXRhJzpcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQb3BwZXJKUzogYW4gaW52YWxpZCBwcm9wZXJ0eSBoYXMgYmVlbiBwcm92aWRlZCB0byB0aGUgXFxcIlwiICsgbW9kaWZpZXIubmFtZSArIFwiXFxcIiBtb2RpZmllciwgdmFsaWQgcHJvcGVydGllcyBhcmUgXCIgKyBWQUxJRF9QUk9QRVJUSUVTLm1hcChmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgcmV0dXJuIFwiXFxcIlwiICsgcyArIFwiXFxcIlwiO1xuICAgICAgICAgIH0pLmpvaW4oJywgJykgKyBcIjsgYnV0IFxcXCJcIiArIGtleSArIFwiXFxcIiB3YXMgcHJvdmlkZWQuXCIpO1xuICAgICAgfVxuXG4gICAgICBtb2RpZmllci5yZXF1aXJlcyAmJiBtb2RpZmllci5yZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXF1aXJlbWVudCkge1xuICAgICAgICBpZiAobW9kaWZpZXJzLmZpbmQoZnVuY3Rpb24gKG1vZCkge1xuICAgICAgICAgIHJldHVybiBtb2QubmFtZSA9PT0gcmVxdWlyZW1lbnQ7XG4gICAgICAgIH0pID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChNSVNTSU5HX0RFUEVOREVOQ1lfRVJST1IsIFN0cmluZyhtb2RpZmllci5uYW1lKSwgcmVxdWlyZW1lbnQsIHJlcXVpcmVtZW50KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0iLCJpbXBvcnQgeyBtYXggYXMgbWF0aE1heCwgbWluIGFzIG1hdGhNaW4gfSBmcm9tIFwiLi9tYXRoLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gd2l0aGluKG1pbiwgdmFsdWUsIG1heCkge1xuICByZXR1cm4gbWF0aE1heChtaW4sIG1hdGhNaW4odmFsdWUsIG1heCkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhpbk1heENsYW1wKG1pbiwgdmFsdWUsIG1heCkge1xuICB2YXIgdiA9IHdpdGhpbihtaW4sIHZhbHVlLCBtYXgpO1xuICByZXR1cm4gdiA+IG1heCA/IG1heCA6IHY7XG59IiwiY29uc3QgaW5kZXhDb3VudGVyID0gKCkgPT4ge1xyXG4gICAgbGV0IGN1cnJJbmRleCA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoKXtcclxuICAgICAgICByZXR1cm4gY3VyckluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudEluZGV4KCkge1xyXG4gICAgICAgIGN1cnJJbmRleCA9IGN1cnJJbmRleCArIDE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge2dldEluZGV4LCBpbmNyZW1lbnRJbmRleH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluZGV4Q291bnRlcjsiLCJpbXBvcnQgaW5kZXhDb3VudGVyIGZyb20gJy4vaGVscGVyLmpzJztcclxuXHJcbmNvbnN0IHByb2plY3QgPSAobmFtZSwgdGFza3MgPSBbXSwgaW5kZXgpID0+IHtcclxuICAgIGxldCBjdXJyVGFza0luZGV4ID0gaW5kZXhDb3VudGVyKCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VGFza3MoKXtcclxuICAgICAgICByZXR1cm4gdGFza3M7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0TmFtZShuZXdOYW1lKXtcclxuICAgICAgICBuYW1lID0gbmV3TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRJbmRleChuZXdJbmRleCl7XHJcbiAgICAgICAgaW5kZXggPSBuZXdJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvL25lZWQgdG8gc2V0IGEgdW5pcXVlIGluZGV4IGZvciB0YXNrIGFmdGVyIGl0J3MgY3JlYXRlZFxyXG4gICAgZnVuY3Rpb24gYWRkVGFzayh0YXNrKXtcclxuICAgICAgICB0YXNrLnNldEluZGV4KGN1cnJUYXNrSW5kZXguZ2V0SW5kZXgoKSk7XHJcbiAgICAgICAgdGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgICBjdXJyVGFza0luZGV4LmluY3JlbWVudEluZGV4KCk7XHJcbiAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICB9XHJcblxyXG4gICAgLy9yZW1vdmVzIHRoZSB0YXNrIGZyb20gdGhlIHRhc2sgYXJyYXlcclxuICAgIGZ1bmN0aW9uIHJlbW92ZVRhc2sodGFza0luZGV4KXtcclxuICAgICAgICB0YXNrcy5zcGxpY2UodGFza0luZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2dldE5hbWUsIGdldEluZGV4LCBnZXRUYXNrcywgc2V0TmFtZSwgc2V0SW5kZXgsIGFkZFRhc2ssIHJlbW92ZVRhc2t9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb2plY3Q7IiwiaW1wb3J0IGluZGV4Q291bnRlciBmcm9tICcuL2hlbHBlci5qcyc7XHJcbi8vcHJvamVjdHMgY29udGFpbiB0YXNrcywgdGFza3MgY29udGFpbiBzdWJ0YXNrc1xyXG4vL2ZvciBub3csIHdlJ2xsIGZvbGxvdyB0aGF0IGhpZXJhY2h5XHJcblxyXG5jb25zdCBzdG9yYWdlID0gKCgpID0+IHtcclxuICAgIC8vdGhlIGRlZmF1bHQgcHJvamVjdHMgdGhhdCBjYW4ndCBiZSByZW1vdmVkXHJcbiAgICBjb25zdCBhbGxQcm9qZWN0cyA9IFtdO1xyXG4gICAgbGV0IGN1cnJQcm9qZWN0SW5kZXggPSBpbmRleENvdW50ZXIoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3Qpe1xyXG4gICAgICAgIHByb2plY3Quc2V0SW5kZXgoY3VyclByb2plY3RJbmRleC5nZXRJbmRleCgpKTtcclxuICAgICAgICBjdXJyUHJvamVjdEluZGV4LmluY3JlbWVudEluZGV4KCk7XHJcbiAgICAgICAgYWxsUHJvamVjdHMucHVzaChwcm9qZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qZWN0KHByb2plY3RJbmRleCl7XHJcbiAgICAgICAgYWxsUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYocHJvamVjdC5nZXRJbmRleCgpID09PSBwcm9qZWN0SW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgYWxsUHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHthbGxQcm9qZWN0cywgYWRkUHJvamVjdCwgcmVtb3ZlUHJvamVjdH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yYWdlO1xyXG5cclxuIiwiY29uc3Qgc3VidGFzayA9IChcclxuICAgIG5hbWUsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGluZGV4KSA9PlxyXG57XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0SW5kZXgobmV3SW5kZXgpe1xyXG4gICAgICAgIGluZGV4ID0gbmV3SW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoKXtcclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oKXtcclxuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TmFtZSgpe1xyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7Z2V0SW5kZXgsIGdldE5hbWUsIGdldERlc2NyaXB0aW9uLCBzZXRJbmRleH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN1YnRhc2s7IiwiaW1wb3J0IGluZGV4Q291bnRlciBmcm9tICcuL2hlbHBlci5qcyc7XHJcblxyXG5jb25zdCB0YXNrID0gKFxyXG4gICAgbmFtZSxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgZHVlRGF0ZSxcclxuICAgIGVzdGltYXRlZENvbXBsZXRpb25UaW1lLFxyXG4gICAgcHJpb3JpdHksXHJcbiAgICBzdWJ0YXNrcyA9IFtdLFxyXG4gICAgaW5kZXgpID0+XHJcbntcclxuXHJcbiAgICBsZXQgY3VyclN1YnRhc2tJbmRleCA9IGluZGV4Q291bnRlcigpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBnZXROYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oKXtcclxuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RHVlRGF0ZSgpe1xyXG4gICAgICAgIHJldHVybiBkdWVEYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEVzdGltYXRlZFRpbWUoKXtcclxuICAgICAgICByZXR1cm4gZXN0aW1hdGVkQ29tcGxldGlvblRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoKXtcclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UHJpb3JpdHkoKXtcclxuICAgICAgICByZXR1cm4gcHJpb3JpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0TmFtZShuZXdOYW1lKXtcclxuICAgICAgICBuYW1lID0gbmV3TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXREZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbil7XHJcbiAgICAgICAgZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQcmlvcml0eShuZXdQcmlvcml0eSl7XHJcbiAgICAgICAgcHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXREdWVEYXRlKG5ld0R1ZURhdGUpe1xyXG4gICAgICAgIGR1ZURhdGUgPSBuZXdEdWVEYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldEVzdGltYXRlZFRpbWUobmV3RXN0VGltZSl7XHJcbiAgICAgICAgZXN0aW1hdGVkQ29tcGxldGlvblRpbWUgPSBuZXdFc3RUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldEluZGV4KHRhc2tJbmRleCl7XHJcbiAgICAgICAgaW5kZXggPSB0YXNrSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U3VidGFza3MoKXtcclxuICAgICAgICByZXR1cm4gc3VidGFza3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy9uZWVkIHRvIHNldCBhIHVuaXF1ZSBpbmRleCBmb3Igc3VidGFzayBhZnRlciBpdCdzIGNyZWF0ZWRcclxuICAgIGZ1bmN0aW9uIGFkZFN1YnRhc2soc3VidGFza09iail7XHJcbiAgICAgICAgc3VidGFza09iai5zZXRJbmRleChjdXJyU3VidGFza0luZGV4LmdldEluZGV4KCkpO1xyXG4gICAgICAgIHN1YnRhc2tzLnB1c2goc3VidGFza09iaik7XHJcbiAgICAgICAgY3VyclN1YnRhc2tJbmRleC5pbmNyZW1lbnRJbmRleCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVN1YnRhc2soaW5kZXgpe1xyXG4gICAgICAgIHN1YnRhc2tzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZWRpdFN1YnRhc2soc3VidGFza09iail7XHJcbiAgICAgICAgc3VidGFza3MuZm9yRWFjaCgoc3VidGFzaywgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZihzdWJ0YXNrLmluZGV4ID09PSBpbmRleCl7XHJcbiAgICAgICAgICAgICAgICBzdWJ0YXNrc1tpXSA9IHN1YnRhc2tPYmo7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7Z2V0TmFtZSwgZ2V0RGVzY3JpcHRpb24sIGdldER1ZURhdGUsIGdldEVzdGltYXRlZFRpbWUsIGdldEluZGV4LCBnZXRQcmlvcml0eSwgZ2V0U3VidGFza3MsXHJcbiAgICAgICAgICAgIHNldE5hbWUsIHNldFByaW9yaXR5LCBzZXREZXNjcmlwdGlvbiwgc2V0RHVlRGF0ZSwgc2V0RXN0aW1hdGVkVGltZSwgc2V0SW5kZXgsIGFkZFN1YnRhc2ssIHJlbW92ZVN1YnRhc2t9O1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2s7IiwiLy9jb250YWlucyBhbGwgRE9NIE1hbmlwdWxhdGlvbiB0aGF0J3MgbmVlZGVkIGZvciB0YXNrc1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xyXG5pbXBvcnQgdGFzayBmcm9tICcuL3Rhc2suanMnO1xyXG5pbXBvcnQgc3VidGFzayBmcm9tICcuL3N1YnRhc2suanMnO1xyXG5pbXBvcnQgeyBjcmVhdGVQb3BwZXIgfSBmcm9tICdAcG9wcGVyanMvY29yZSc7XHJcbmltcG9ydCBEYXRlcGlja2VyIGZyb20gJ3ZhbmlsbGFqcy1kYXRlcGlja2VyL0RhdGVwaWNrZXInO1xyXG5pbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3QuanMnO1xyXG5cclxuLy9lYWNoIGRvbSBlbGVtZW50IGhhcyBhIGRhdGEgaW5kZXggdGhhdCdzIGFsc28gaW4gdGhlIHN0b3JhZ2VcclxuLy90aGVzZSAnZGF0YS1pbmRleCcgYXR0cmlidXRlcyBhcmUgdXNlZCB0byByZWZlcmVuY2UgdGhlIHN0b3JhZ2UgYXJyYXlzXHJcblxyXG4vLyBIVE1MIEhFTFBFUiBGVU5DVElPTlNcclxuZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKGVsZW1lbnQsIGNsYXNzZXMsIGlkZW50aWZpZXIsIGNoaWxkRWxlbWVudHMsIGN1c3RvbUF0dHJpYnV0ZSl7XHJcbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuICAgIGlmKGNsYXNzZXMpe1xyXG4gICAgICAgIGNsYXNzZXMuZm9yRWFjaChpdGVtID0+IG5vZGUuY2xhc3NMaXN0LmFkZChpdGVtKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoaWRlbnRpZmllcil7XHJcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJyxpZGVudGlmaWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihjaGlsZEVsZW1lbnRzKXtcclxuICAgICAgICBjaGlsZEVsZW1lbnRzLmZvckVhY2goaXRlbSA9PiBub2RlLmFwcGVuZENoaWxkKGl0ZW0pKVxyXG4gICAgfVxyXG5cclxuICAgIGlmKGN1c3RvbUF0dHJpYnV0ZSl7XHJcbiAgICAgICAgaWYoY3VzdG9tQXR0cmlidXRlLmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShjdXN0b21BdHRyaWJ1dGVbMF0sIGN1c3RvbUF0dHJpYnV0ZVsxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUYWcoZWxlbWVudCwgdGV4dCwgY2xhc3NlcywgaWRlbnRpZmllcil7XHJcbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuICAgIGlmKGNsYXNzZXMpe1xyXG4gICAgICAgIGNsYXNzZXMuZm9yRWFjaChpdGVtID0+IG5vZGUuY2xhc3NMaXN0LmFkZChpdGVtKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoaWRlbnRpZmllcil7XHJcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJyxpZGVudGlmaWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZih0ZXh0KXtcclxuICAgICAgICBub2RlLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSW5wdXQodHlwZSwgY2xhc3NlcywgaWRlbnRpZmllciwgcGxhY2Vob2xkZXIsIGlzUmVxdWlyZWQsIGlzQXV0b0ZvY3VzKXtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIHR5cGUpO1xyXG4gICAgaWYoaWRlbnRpZmllcil7XHJcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsIGlkZW50aWZpZXIpO1xyXG4gICAgfVxyXG4gICAgaWYocGxhY2Vob2xkZXIpe1xyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlcik7XHJcbiAgICB9XHJcbiAgICBpZihjbGFzc2VzKXtcclxuICAgICAgICBjbGFzc2VzLmZvckVhY2goaXRlbSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoaXRlbSkpO1xyXG4gICAgfVxyXG4gICAgaWYoaXNSZXF1aXJlZCA/IGlucHV0LnJlcXVpcmVkID0gdHJ1ZSA6IGlucHV0LnJlcXVpcmVkID0gZmFsc2UpO1xyXG4gICAgaWYoaXNBdXRvRm9jdXMgPyBpbnB1dC5hdXRvZm9jdXMgPSB0cnVlIDogaW5wdXQuYXV0b2ZvY3VzID0gZmFsc2UpO1xyXG4gICAgcmV0dXJuIGlucHV0O1xyXG59XHJcblxyXG5jb25zdCBza2lwID0gKG51bSkgPT4gbmV3IEFycmF5KG51bSk7XHJcbi8vIEVORCBIVE1MIEhFTFBFUiBGVU5DVElPTlNcclxuXHJcblxyXG5jb25zdCB1aSA9ICgoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBpbml0aWFsUmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3QgYm9keUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgdGVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSBuZXcgRGF0ZXBpY2tlcih0ZXN0LCB7XHJcbiAgICAgICAgICAgIC8vIC4uLm9wdGlvbnNcclxuICAgICAgICAgIH0pOyBcclxuLyogICAgICAgICBhZGRNb3RpdmF0aW9uYWxNZXNzYWdlKCkucmVuZGVyRGVmYXVsdE1lc3NhZ2VzKCk7ICovXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gY3JlYXRlRE9NQ29udGFpbmVyKCk7XHJcbiAgICAgICAgY29uc3QgaW5ib3hQcm9qZWN0ID0gc3RvcmFnZS5hbGxQcm9qZWN0cy5maWx0ZXIocHJvamVjdCA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gJ0luYm94JylbMF07XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gY3JlYXRlRE9NUHJvamVjdEhlYWRlcihpbmJveFByb2plY3QpO1xyXG4gICAgICAgIGNvbnN0IGFkZFRhc2tEaXYgPSBjcmVhdGVET01BZGRUYXNrKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9qZWN0LmdldE5hbWUoKSA9PT0gJ0luYm94Jyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrcyA9IHByb2plY3QuZ2V0VGFza3MoKVxyXG4gICAgICAgICAgICAgICAgYWRkQWxsVGFza3NET00oY29udGFpbmVyRGl2LCB0YXNrcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChhZGRUYXNrRGl2KTtcclxuICAgICAgICBib2R5RWxlbS5hcHBlbmRDaGlsZChjb250YWluZXJEaXYpOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL2VudGlyZSBjb250YWluZXIgdGhhdCBob2xkcyBhbGwgdGhlIHRhc2tzLCB1bmlxdWUgaWQgaXMgY29udGFpbmVyXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVET01Db250YWluZXIoKXtcclxuICAgICAgICByZXR1cm4gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBza2lwKDEpLCAnY29udGFpbmVyJywgLi4uc2tpcCgyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy90aGUgdGV4dCB0aGF0IGNvbnRhaW5zIHRoZSBwcm9qZWN0IG5hbWVcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZURPTVByb2plY3RIZWFkZXIocHJvamVjdCl7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gY3JlYXRlVGFnKCdoMScsIHByb2plY3QuZ2V0TmFtZSgpLCBbJ2hlYWRlci10eXBlJ10sIHNraXAoMSkpO1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVDb250YWluZXIoJ2RpdicsIHNraXAoMSksICdwcm9qZWN0LWhlYWRlcicsIFtoZWFkZXJdLCBbJ2RhdGEtaW5kZXgnLCBwcm9qZWN0LmdldEluZGV4KCldKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NyZWF0ZXMgdGhlIGRpdiB0aGF0IHdoZW4gY2xpY2tlZCwgdGhlIGFkZCBuZXcgdGFzayBmb3JtIGFwcGVhcnNcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZURPTUFkZFRhc2soKXtcclxuICAgICAgICBjb25zdCBwbHVzSWNvbiA9IGNyZWF0ZVRhZygnaScsIHNraXAoMSksIFsnZmEnLCdmYS1wbHVzJ10sIHNraXAoMSkpO1xyXG4gICAgICAgIGNvbnN0IGFkZFRhc2tUZXh0ID0gY3JlYXRlVGFnKCdkaXYnLCAnQWRkIFRhc2snLCBbJ2FkZC10YXNrLXRleHQnXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgY29uc3QgYWRkVGFza0RpdiA9IGNyZWF0ZUNvbnRhaW5lcignZGl2Jywgc2tpcCgxKSwgJ2FkZC10YXNrLWNsaWNrYWJsZS1kaXYnLCBbcGx1c0ljb24sIGFkZFRhc2tUZXh0XSwgc2tpcCgxKSk7XHJcbiAgICAgICAgYWRkVGFza0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgY29uc3QgYWRkVGFza0Zvcm0gPSBjcmVhdGVET01UYXNrRm9ybSgnYWRkJyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRUYXNrRm9ybSk7XHJcbiAgICAgICAgICAgIGFkZFRhc2tEaXYucmVtb3ZlKCk7XHJcbiAgICAgICAgfSwge29uY2U6IHRydWV9KVxyXG5cclxuICAgICAgICByZXR1cm4gYWRkVGFza0RpdjtcclxuICAgIH1cclxuXHJcbiAgICAvL2NyZWF0ZXMgdGhlIGZvcm0gdGhhdCB3aGVuIHN1Ym1pdHRlZCwgYWRkcyBhIG5ldyB0YXNrIHRvIHRoZSBkb21cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZURPTVRhc2tGb3JtKHR5cGUpe1xyXG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGNyZWF0ZUlucHV0KCd0ZXh0Jywgc2tpcCgxKSwgJ25hbWUnLCAnTmFtZScsIHRydWUsIHRydWUpO1xyXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBjcmVhdGVJbnB1dCgndGV4dCcsIHNraXAoMSksICdkZXNjcmlwdGlvbicsICdEZXNjcmlwdGlvbicsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcHJpb3JpdHlEaXYgPSBnZXRQb3BvdmVySWNvbnMoJ3ByaW9yaXR5LWJ0bicsICdmYS1mbGFnJywgJ1ByaW9yaXR5Jyk7XHJcbiAgICAgICAgY29uc3QgZHVlRGF0ZURpdiA9IGdldFBvcG92ZXJJY29ucygnZHVlLWRhdGUtYnRuJywgJ2ZhLWNhbGVuZGFyJywnRHVlIERhdGUnKTtcclxuICAgICAgICBjb25zdCBlc3RpbWF0ZWRUaW1lRGl2ID0gZ2V0UG9wb3Zlckljb25zKCdlc3QtY29tcGxldGlvbi10aW1lLWJ0bicsICdmYS1jbG9jaycsICdFc3QgVGltZScpOyAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcG9wb3ZlckNvbnRhaW5lciA9IGNyZWF0ZUNvbnRhaW5lcignZGl2JywgWydwb3BvdmVyLWljb25zLWRpdiddLCBza2lwKDEpLCBbcHJpb3JpdHlEaXYsIGR1ZURhdGVEaXYsIGVzdGltYXRlZFRpbWVEaXZdLCBza2lwKDEpKTtcclxuIFxyXG4gICAgICAgIGFkZFByaW9yaXR5UG9wb3ZlckV2ZW50TGlzdGVuZXIocHJpb3JpdHlEaXYsIHBvcG92ZXJDb250YWluZXIpO1xyXG4gICAgICAgIGFkZER1ZURhdGVQb3BvdmVyRXZlbnRMaXN0ZW5lcihkdWVEYXRlRGl2LCBwb3BvdmVyQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgLy9idXR0b25zIGZvciBmb3JtIGFjdGlvbnNcclxuICAgICAgICBjb25zdCBjYW5jZWxCdG4gPSBjcmVhdGVUYWcoJ2J1dHRvbicsJ0NhbmNlbCcsIHNraXAoMSksICdjYW5jZWwtdGFzay1mb3JtJyk7XHJcbiAgICAgICAgY29uc3Qgc3VibWl0QnRuID0gY3JlYXRlVGFnKCdidXR0b24nLCdDb25maXJtJywgc2tpcCgxKSwgJ3N1Ym1pdC10YXNrLWZvcm0nKTtcclxuICAgICAgICBjb25zdCBmb3JtQWN0aW9uQnRuc0NvbnRhaW5lciA9IGNyZWF0ZUNvbnRhaW5lcignZGl2Jywgc2tpcCgxKSwgJ2Zvcm0tYWN0aW9ucy1kaXYnLCBbY2FuY2VsQnRuLCBzdWJtaXRCdG5dKTtcclxuXHJcbiAgICAgICAgY29uc3QgZm9ybSA9IGNyZWF0ZUNvbnRhaW5lcignZGl2Jywgc2tpcCgxKSwgJ3Rhc2stZm9ybScsIFtuYW1lSW5wdXQsIGRlc2NyaXB0aW9uSW5wdXQsIHBvcG92ZXJDb250YWluZXIsIGZvcm1BY3Rpb25CdG5zQ29udGFpbmVyXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9hZGQgYWxsIGJ1dHRvbiBmdW5jdGlvbmFsaXRpZXNcclxuICAgICAgICBpZih0eXBlID09PSAnYWRkJyl7XHJcbiAgICAgICAgICAgIGFkZENhbmNlbEFkZFRhc2tCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgICAgIGFkZFN1Ym1pdEFkZFRhc2tCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHlwZSA9PT0gJ2VkaXQnKXtcclxuICAgICAgICAgICAgYWRkQ2FuY2VsRWRpdFRhc2tCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgICAgIGFkZFN1Ym1pdEVkaXRUYXNrRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtO1xyXG5cclxuICAgICAgICAvL2ZvciBwcmlvcml0eSwgZHVlIGRhdGUsIGFuZCBlc3RpbWF0ZWQgdGltZSBwb3BvdmVyc1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldFBvcG92ZXJJY29ucyhkaXZJZCwgaWNvbkNsYXNzLCB0ZXh0KXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJyxkaXZJZCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLWZvcm0taWNvbnMnKTtcclxuICAgICAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgY29uc3QgaWNvblRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnICcgKyB0ZXh0KTtcclxuICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1yZWd1bGFyJyxpY29uQ2xhc3MpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaWNvbik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpY29uVGV4dCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3doZW4gY2xpY2tpbmcgcHJpb3JpdHkgb3B0aW9ucyBkaXZcclxuICAgICAgICBmdW5jdGlvbiBhZGRQcmlvcml0eVBvcG92ZXJFdmVudExpc3RlbmVyKHByaW9yaXR5RGl2LCBwYXJlbnREaXYpe1xyXG4gICAgICAgICAgICBwcmlvcml0eURpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZihpc0FjdGl2ZShwcmlvcml0eURpdikpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUFjdGl2ZVBvcG92ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eTEgPSBnZXRQcmlvcml0eU9wdGlvbigxKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eTIgPSBnZXRQcmlvcml0eU9wdGlvbigyKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eTMgPSBnZXRQcmlvcml0eU9wdGlvbigzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eUNvbnRhaW5lciA9IGNyZWF0ZUNvbnRhaW5lcignZGl2JyxbJ3BvcG92ZXItY29udGFpbmVyJywnYWN0aXZlLXBvcG92ZXInXSwgJ3ByaW9yaXR5LW9wdGlvbnMnLCBbcHJpb3JpdHkxLCBwcmlvcml0eTIsIHByaW9yaXR5M10sIHNraXAoMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVBvcHBlcihwcmlvcml0eURpdiwgcHJpb3JpdHlDb250YWluZXIsIHtwbGFjZW1lbnQ6ICdib3R0b20nfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5Q29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvZ2dsZUFjdGl2ZShwcmlvcml0eURpdik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRQcmlvcml0eU9wdGlvbihwcmlvcml0eU51bWJlcil7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5T3B0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtZmxhZycsJ2ljb24nKTtcclxuICAgICAgICAgICAgc3dpdGNoKHByaW9yaXR5TnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LmFkZCgnaWNvbi1yZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LmFkZCgnaWNvbi15ZWxsb3cnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eUljb24uY2xhc3NMaXN0LmFkZCgnaWNvbi1ncmVlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGljb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyBQcmlvcml0eScpO1xyXG4gICAgICAgICAgICBwcmlvcml0eU9wdGlvbkRpdi5hcHBlbmRDaGlsZChwcmlvcml0eUljb24pO1xyXG4gICAgICAgICAgICBwcmlvcml0eU9wdGlvbkRpdi5hcHBlbmRDaGlsZChpY29uVGV4dCk7XHJcbiAgICAgICAgICAgIHByaW9yaXR5T3B0aW9uRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VQcmlvcml0eUljb24ocHJpb3JpdHlJY29uKTtcclxuICAgICAgICAgICAgICAgIGFkZFByaW9yaXR5RGF0YUF0dHJpYnV0ZShwcmlvcml0eU51bWJlcik7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmVQb3BvdmVycygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gcHJpb3JpdHlPcHRpb25EaXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VQcmlvcml0eUljb24obmV3UHJpb3JpdHlJY29uKXtcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHktYnRuJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9sZFByaW9yaXR5SWNvbiA9IHByaW9yaXR5QnRuLnF1ZXJ5U2VsZWN0b3IoJ2knKTtcclxuICAgICAgICAgICAgb2xkUHJpb3JpdHlJY29uLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld1ByaW9yaXR5SWNvbiwgb2xkUHJpb3JpdHlJY29uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFByaW9yaXR5RGF0YUF0dHJpYnV0ZShwcmlvcml0eU51bWJlcil7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5T3B0aW9uc0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eS1idG4nKTtcclxuICAgICAgICAgICAgcHJpb3JpdHlPcHRpb25zRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1wcmlvcml0eS1udW1iZXInLCBwcmlvcml0eU51bWJlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGREdWVEYXRlUG9wb3ZlckV2ZW50TGlzdGVuZXIoZHVlRGF0ZURpdiwgcGFyZW50RGl2KXtcclxuICAgICAgICAgICAgZHVlRGF0ZURpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmVQb3BvdmVycygpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbkhlbHBlciA9IGNyZWF0ZVRhZygnc3BhbicsIHNraXAoMSksIFsnYWN0aXZlLXBvcG92ZXInXS4gc2tpcCgxKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlSW5wdXQgPSBuZXcgRGF0ZXBpY2tlcihzcGFuSGVscGVyKTtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVBvcHBlcihkdWVEYXRlRGl2LCBzcGFuSGVscGVyLCB7cGxhY2VtZW50OiAnYm90dG9tJ30pO1xyXG4gICAgICAgICAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKHNwYW5IZWxwZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVja3MgaWYgZWxlbWVudCBoYXMgYWN0aXZlLXBvcG92ZXIgY2xhc3NcclxuICAgICAgICBmdW5jdGlvbiBpc0FjdGl2ZShlbGVtZW50KXtcclxuICAgICAgICAgICAgaWYoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZUFjdGl2ZShlbGVtZW50KXtcclxuICAgICAgICAgICAgaWYoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2lmIHRoZXJlJ3MgYW55IGFjdGl2ZSBwb3BvdmVycywgcmVtb3ZlIHRoZSBwb3BvdmVyXHJcbiAgICAgICAgLy9kZXRlcm1pbmVkIGJ5IGNsYXNzIG5hbWUgJ2FjdGl2ZS1wb3BvdmVyJ1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZUFjdGl2ZVBvcG92ZXJzKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVBvcG92ZXJzID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhY3RpdmUtcG9wb3ZlcicpKTtcclxuICAgICAgICAgICAgaWYoYWN0aXZlUG9wb3ZlcnMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVQb3BvdmVycy5mb3JFYWNoKHBvcG92ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9wb3Zlci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JlbW92ZXMgdGhlIGZvcm0gYW5kIGFkZHMgdGhlIGFkZCB0YXNrIHRleHQgYmFja1xyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENhbmNlbEFkZFRhc2tCdG5GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZURPTUFkZFRhc2soKSk7XHJcbiAgICAgICAgICAgIH0sIHtvbmNlOnRydWV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlcyB0aGUgZm9ybSBhbmQgYWRkcyB0aGUgdGFzayBkb21cclxuICAgICAgICAvL25lZWQgdG8gYWRkIGVycm9yIG1lc3NhZ2Ugb2Ygc29tZSBzb3J0IHdoZW4gdGhlcmUncyBubyB0ZXh0IGluIHRoZSBuYW1lIGZpZWxkXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3VibWl0QWRkVGFza0J0bkZ1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eU51bWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eS1idG4nKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpb3JpdHktbnVtYmVyJyk7XHJcbiAgICAgICAgICAgICAgICBpZihuYW1lRmllbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2plY3RJbmRleEluQXJyYXkgPSBzdG9yYWdlTG9va3Vwcy5nZXRQcm9qZWN0SW5kZXgoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGFzayA9IHRhc2sobmFtZUZpZWxkLCBkZXNjcmlwdGlvbkZpZWxkLCAnJywgJycsIHByaW9yaXR5TnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdUYXNrID0gc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0SW5kZXhJbkFycmF5XS5hZGRUYXNrKG5ld1Rhc2spO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGFza0RPTSA9IGNyZWF0ZURPTVRhc2sobmV3VGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkVGFza0VsZW0gPSBjcmVhdGVET01BZGRUYXNrKCk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmV3VGFza0RPTSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZFRhc2tFbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfSkgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRDYW5jZWxFZGl0VGFza0J0bkZ1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludmlzaWJsZVRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW52aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBpbnZpc2libGVUYXNrLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFN1Ym1pdEVkaXRUYXNrRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eU51bWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eS1idG4nKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpb3JpdHktbnVtYmVyJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZpc2libGVUYXNrRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihuYW1lRmllbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUYXNrRGF0YUluZGV4ID0gaW52aXNpYmxlVGFza0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXhJbkFycmF5ID0gc3RvcmFnZUxvb2t1cHMuZ2V0UHJvamVjdEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFza0luZGV4SW5BcnJheSA9IHN0b3JhZ2VMb29rdXBzLmdldFRhc2tJbmRleChwcm9qZWN0SW5kZXhJbkFycmF5LCBjdXJyZW50VGFza0RhdGFJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFRhc2sgPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RJbmRleEluQXJyYXldLmdldFRhc2tzKClbdGFza0luZGV4SW5BcnJheV07XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhc2suc2V0TmFtZShuYW1lRmllbGQpXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhc2suc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb25GaWVsZClcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFzay5zZXRQcmlvcml0eShwcmlvcml0eU51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza0RPTSA9IGNyZWF0ZURPTVRhc2soY3VycmVudFRhc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIGludmlzaWJsZVRhc2tFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1Rhc2tET00sIGludmlzaWJsZVRhc2tFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpbnZpc2libGVUYXNrRWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRE9NU3VidGFza0Zvcm0odHlwZSl7XHJcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gY3JlYXRlSW5wdXQoJ3RleHQnLCBza2lwKDEpLCAnbmFtZScsICdOYW1lJywgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGNyZWF0ZUlucHV0KCd0ZXh0Jywgc2tpcCgxKSwgJ2Rlc2NyaXB0aW9uJywgJ0Rlc2NyaXB0aW9uJywgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAvL2J1dHRvbnMgZm9yIGZvcm0gYWN0aW9uc1xyXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGNyZWF0ZVRhZygnYnV0dG9uJywnQ2FuY2VsJywgc2tpcCgxKSwgJ2NhbmNlbC10YXNrLWZvcm0nKTtcclxuICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBjcmVhdGVUYWcoJ2J1dHRvbicsJ0NvbmZpcm0nLCBza2lwKDEpLCAnc3VibWl0LXRhc2stZm9ybScpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1BY3Rpb25CdG5zQ29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBza2lwKDEpLCAnZm9ybS1hY3Rpb25zLWRpdicsIFtjYW5jZWxCdG4sIHN1Ym1pdEJ0bl0pO1xyXG5cclxuICAgICAgICBjb25zdCBmb3JtID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBza2lwKDEpLCAndGFzay1mb3JtJywgW25hbWVJbnB1dCwgZGVzY3JpcHRpb25JbnB1dCwgZm9ybUFjdGlvbkJ0bnNDb250YWluZXJdLCBza2lwKDEpKTtcclxuXHJcbiAgICAgICAgaWYodHlwZSA9PT0gJ2FkZCcpe1xyXG4gICAgICAgICAgICBhZGRDYW5jZWxBZGRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgICAgICBhZGRTdWJtaXRBZGRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGUgPT09ICdlZGl0Jyl7XHJcbiAgICAgICAgICAgIGFkZENhbmNlbEVkaXRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgICAgICBhZGRTdWJtaXRFZGl0VGFza0Z1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENhbmNlbEFkZFRhc2tCdG5GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3VibWl0QWRkVGFza0J0bkZ1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZihuYW1lRmllbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdTdWJ0YXNrID0gc3VidGFzayhuYW1lRmllbGQsIGRlc2NyaXB0aW9uRmllbGQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0QXJyYXlJbmRleCA9IHN0b3JhZ2VMb29rdXBzLmdldFByb2plY3RJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFUYXNrSW5kZXggPSBmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRUYXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIGRhdGFUYXNrSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUYXNrSW5TdG9yYWdlID0gc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0QXJyYXlJbmRleF0uZ2V0VGFza3MoKVt0YXNrQXJyYXlJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGRvZXNuJ3Qgd29ya1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUYXNrSW5TdG9yYWdlLmFkZFN1YnRhc2sobmV3U3VidGFzayk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tET00gPSBjcmVhdGVET01TdWJ0YXNrKG5ld1N1YnRhc2ssIGRhdGFUYXNrSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3VidGFza0RPTSwgZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENhbmNlbEVkaXRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgICAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW52aXNpYmxlVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIGludmlzaWJsZVRhc2suY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3VibWl0RWRpdFRhc2tGdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZpc2libGVUYXNrRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tEYXRhSW5kZXggPSBzdWJ0YXNrLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRGF0YUluZGV4ID0gc3VidGFzay5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1pbmRleCcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0QXJyYXlJbmRleCA9IHN0b3JhZ2VMb29rdXBzLmdldFByb2plY3RJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRUYXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIHRhc2tEYXRhSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRTdWJ0YXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIHRhc2tBcnJheUluZGV4LCBzdWJ0YXNrRGF0YUluZGV4KVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFN1YnRhc2sgPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RBcnJheUluZGV4XS5nZXRUYXNrcygpW3Rhc2tBcnJheUluZGV4XS5nZXRTdWJ0YXNrcygpW3N1YnRhc2tBcnJheUluZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb25GaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYobmFtZUZpZWxkKXtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3VidGFzay5zZXROYW1lKG5hbWVGaWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGVzY3JpcHRpb25GaWVsZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJ0YXNrLnNldERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uRmllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdTdWJ0YXNrRE9NID0gY3JlYXRlRE9NVGFzayhjdXJyZW50U3VidGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW52aXNpYmxlVGFza0VsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3VidGFza0RPTSwgaW52aXNpYmxlVGFza0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludmlzaWJsZVRhc2tFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlcyB0aGUgdGFzayBkb21cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZURPTVRhc2sodGFza09iail7XHJcbiAgICAgICAgY29uc3QgY29tcGxldGVUYXNrSWNvbiA9IGNyZWF0ZVRhZygnaScsc2tpcCgxKSwgWydmYS1yZWd1bGFyJywnZmEtY2lyY2xlJ10pO1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlVGFza0RpdiA9IGNyZWF0ZUNvbnRhaW5lcignZGl2JywgWydjb21wbGV0ZS10YXNrLWJ0biddLCBza2lwKDEpLCBbY29tcGxldGVUYXNrSWNvbl0sIHNraXAoMSkpO1xyXG5cclxuICAgICAgICBjb25zdCB0YXNrSW5mb3JtYXRpb25EaXYgPSBjcmVhdGVUYWcoJ2RpdicsIHRhc2tPYmouZ2V0TmFtZSgpLCBbJ3Rhc2stdGl0bGUnXSwgc2tpcCgxKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFkZFN1YnRhc2tJY29uID0gY3JlYXRlVGFnKCdpJywgc2tpcCgxKSwgWydmYS1zb2xpZCcsJ2ZhLXNxdWFyZS1wbHVzJ10sIHNraXAoMSkpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRJY29uID0gY3JlYXRlVGFnKCdpJywgc2tpcCgxKSwgWydmYS1zb2xpZCcsJ2ZhLXBlbi10by1zcXVhcmUnXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGNyZWF0ZVRhZygnaScsIHNraXAoMSksIFsnZmEtc29saWQnLCdmYS10cmFzaCddLCBza2lwKDEpKTsgICAgICBcclxuICAgICAgICBjb25zdCBpY29uQ29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBbJ2J1dHRvbi1pY29ucyddLCBza2lwKDEpLCBbYWRkU3VidGFza0ljb24sIGVkaXRJY29uLCBkZWxldGVJY29uXSwgc2tpcCgxKSk7XHJcblxyXG4gICAgICAgIGlmKHRhc2tPYmouZ2V0RXN0aW1hdGVkVGltZSgpKXtcclxuICAgICAgICAgICAgY29uc3QgdGFza0VzdGltYXRlZFRpbWUgPSBjcmVhdGVUYWcoJ2RpdicsYEVzdCBUaW1lOiAke3Rhc2tPYmouZ2V0RXN0aW1hdGVkVGltZSgpfWAsIFsndGFzay1lc3RpbWF0ZWQtdGltZSddLCBza2lwKDEpKTtcclxuICAgICAgICAgICAgdGFza0luZm9ybWF0aW9uRGl2LmFwcGVuZENoaWxkKHRhc2tFc3RpbWF0ZWRUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGFza09iai5nZXREZXNjcmlwdGlvbigpKXtcclxuICAgICAgICAgICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gY3JlYXRlVGFnKCdkaXYnLHRhc2tPYmouZ2V0RGVzY3JpcHRpb24oKSwgWyd0YXNrLWRlc2NyaXB0aW9uJ10sIHNraXAoMSkpO1xyXG4gICAgICAgICAgICB0YXNrSW5mb3JtYXRpb25EaXYuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRhc2tET00gPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIFsndGFzayddLCAnJywgW2NvbXBsZXRlVGFza0RpdiwgdGFza0luZm9ybWF0aW9uRGl2LCBpY29uQ29udGFpbmVyXSwgWydkYXRhLXRhc2staW5kZXgnLCB0YXNrT2JqLmdldEluZGV4KCldKTtcclxuICAgICAgICBcclxuICAgICAgICBhZGRQcmlvcml0eUNvbG9yKGNvbXBsZXRlVGFza0ljb24sIHRhc2tPYmouZ2V0UHJpb3JpdHkoKSk7XHJcbiAgICAgICAgYWRkQ29tcGxldGVUYXNrSWNvbkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICBhZGREZWxldGVJY29uRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIGFkZEVkaXRJY29uRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIGFkZFN1YnRhc2tJY29uRnVuY3Rpb25hbGl0eSgpO1xyXG5cclxuICAgICAgICAvL2NoYW5nZSB0aGUgYnVsbGV0IHBvaW50IGNvbG9yXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkUHJpb3JpdHlDb2xvcihpY29uLCBwcmlvcml0eU51bWJlcil7XHJcbiAgICAgICAgICAgIHN3aXRjaChwcmlvcml0eU51bWJlcil7XHJcbiAgICAgICAgICAgICAgICBjYXNlICcxJzpcclxuICAgICAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24tcmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICcyJzpcclxuICAgICAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24teWVsbG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICczJzpcclxuICAgICAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24tZ3JlZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfSAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1ha2VTb2xpZEljb24oaWNvbil7XHJcbiAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZSgnZmEtcmVndWxhcicpO1xyXG4gICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnaWNvbicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy91c2VmdWwgaGVscGVyIGZ1bmN0aW9ucyBmb3IgaWNvbiBvcGVyYXRpb25zXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0VGFza0Zyb21DaGlsZE5vZGUobm9kZSl7XHJcbiAgICAgICAgICAgIGlmKCFub2RlLmNsYXNzTGlzdC5jb250YWlucygndGFzaycpKXtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUoIW5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2snKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFN0b3JhZ2VQcm9qZWN0SW5kZXgoKXtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaGVhZGVyJykuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RBcnJheUluZGV4ID0gc3RvcmFnZS5hbGxQcm9qZWN0cy5maW5kSW5kZXgocHJvamVjdCA9PiBwcm9qZWN0LmdldEluZGV4KCkgPT0gcHJvamVjdEluZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2plY3RBcnJheUluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RvcmFnZVRhc2tJbmRleChwcm9qZWN0SW5kZXgsIHRhc2tFbGVtZW50KXtcclxuICAgICAgICAgICAgY29uc3QgdGFza0luZGV4ID0gdGFza0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKTtcclxuICAgICAgICAgICAgY29uc3QgdGFza0FycmF5SW5kZXggPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RJbmRleF0uZ2V0VGFza3MoKS5maW5kSW5kZXgodGFzayA9PiB0YXNrLmdldEluZGV4KCkgPT0gdGFza0luZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRhc2tBcnJheUluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9lbmQgdXNlZnVsIGhlbHBlciBmdW5jdGlvbnMgZm9yIGljb24gb3BlcmF0aW9uc1xyXG5cclxuICAgICAgICAvL2ZvciBjb21wbGV0aW5nIGEgdGFzayBhbmQgZGVsZXRpbmcgYSB0YXNrXHJcbiAgICAgICAgLy9jb21wbGV0ZSBhbmQgZGVsZXRlIHRhc2sgYXJlIHRoZSBzYW1lIGZ1bmN0aW9uYWxpdHkgZm9yIG5vd1xyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENvbXBsZXRlVGFza0ljb25GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIGNvbXBsZXRlVGFza0ljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZVJlbGV2YW50VGFza3NBbmRTdWJ0YXNrc0RPTSgpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlVGFza0Zyb21TdG9yYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB0YXNrRE9NLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBhZGREZWxldGVJY29uRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgICAgICBkZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVSZWxldmFudFRhc2tzQW5kU3VidGFza3NET00oKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZVRhc2tGcm9tU3RvcmFnZSgpO1xyXG4gICAgICAgICAgICAgICAgdGFza0RPTS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZW1vdmVUYXNrRnJvbVN0b3JhZ2UoKXtcclxuICAgICAgICAgICAgY29uc3Qgc3RvcmFnZVByb2plY3RJbmRleCA9IGdldFN0b3JhZ2VQcm9qZWN0SW5kZXgoKTtcclxuICAgICAgICAgICAgY29uc3Qgc3RvcmFnZVRhc2tJbmRleCA9IGdldFN0b3JhZ2VUYXNrSW5kZXgoc3RvcmFnZVByb2plY3RJbmRleCwgdGFza0RPTSk7XHJcbiAgICAgICAgICAgIC8vY2FsbHMgdGhlIHJlbW92ZSB0YXNrIGluIHByb2plY3QuanNcclxuICAgICAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0c1tzdG9yYWdlUHJvamVjdEluZGV4XS5yZW1vdmVUYXNrKHN0b3JhZ2VUYXNrSW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlUmVsZXZhbnRUYXNrc0FuZFN1YnRhc2tzRE9NKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IHRhc2tPYmouZ2V0SW5kZXgoKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsRE9NVG9SZW1vdmUgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXRhc2staW5kZXg9JyR7dGFza0luZGV4fSddYCkpO1xyXG4gICAgICAgICAgICBhbGxET01Ub1JlbW92ZS5mb3JFYWNoKG5vZGUgPT4ge3tcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH19KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9lbmQgZm9yIGNvbXBsZXRpbmcgYSB0YXNrIGFuZCBkZWxldGluZyBhIHRhc2tcclxuXHJcblxyXG4gICAgICAgIC8vZm9yIGVkaXRpbmcgYSB0YXNrXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkRWRpdEljb25GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIGVkaXRJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRWxlbWVudCA9IGdldFRhc2tGcm9tQ2hpbGROb2RlKGVkaXRJY29uKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tGb3JtID0gY3JlYXRlRE9NVGFza0Zvcm0oJ2VkaXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdG9yYWdlUHJvamVjdEluZGV4ID0gZ2V0U3RvcmFnZVByb2plY3RJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmFnZVRhc2tJbmRleCA9IGdldFN0b3JhZ2VUYXNrSW5kZXgoc3RvcmFnZVByb2plY3RJbmRleCwgdGFza0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFRhc2tPYmplY3QgPSBzdG9yYWdlLmFsbFByb2plY3RzW3N0b3JhZ2VQcm9qZWN0SW5kZXhdLmdldFRhc2tzKClbc3RvcmFnZVRhc2tJbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgdGFza0VsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFza0Zvcm0sIHRhc2tFbGVtZW50Lm5leHRTaWJsaW5nKTtcclxuICAgICAgICAgICAgICAgIHRhc2tFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCdpbnZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpLnZhbHVlID0gY3VycmVudFRhc2tPYmplY3QuZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWUgPSBjdXJyZW50VGFza09iamVjdC5nZXREZXNjcmlwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5LWJ0biA+IGknKTtcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRUYXNrT2JqZWN0LmdldFByaW9yaXR5KCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZFByaW9yaXR5Q29sb3IocHJpb3JpdHlJY29uLCBjdXJyZW50VGFza09iamVjdC5nZXRQcmlvcml0eSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBtYWtlU29saWRJY29uKHByaW9yaXR5SWNvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZW5kIGZvciBlZGl0aW5nIGEgdGFza1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRTdWJ0YXNrSWNvbkZ1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICAgICAgYWRkU3VidGFza0ljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0VsZW1lbnQgPSBnZXRUYXNrRnJvbUNoaWxkTm9kZShhZGRTdWJ0YXNrSWNvbik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRm9ybSA9IGNyZWF0ZURPTVN1YnRhc2tGb3JtKCdhZGQnKTtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2tGb3JtLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JywgdGFza0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKSk7XHJcbiAgICAgICAgICAgICAgICB0YXNrRWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzdWJ0YXNrRm9ybSwgdGFza0VsZW1lbnQubmV4dFNpYmxpbmcpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRhc2tET007XHJcbiAgICB9XHJcblxyXG4gICAgLy9jcmVhdGVzIHRoZSBzdWJ0YXNrIGRvbVxyXG4gICAgY29uc3QgY3JlYXRlRE9NU3VidGFzayA9IChzdWJ0YXNrT2JqLCBkYXRhVGFza0luZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29tcGxldGVUYXNrSWNvbiA9IGNyZWF0ZVRhZygnaScsc2tpcCgxKSwgWydmYS1yZWd1bGFyJywnZmEtY2lyY2xlJ10pO1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlVGFza0RpdiA9IGNyZWF0ZUNvbnRhaW5lcignZGl2JywgWydjb21wbGV0ZS10YXNrLWJ0biddLCBza2lwKDEpLCBbY29tcGxldGVUYXNrSWNvbl0sIHNraXAoMSkpO1xyXG5cclxuICAgICAgICBjb25zdCB0YXNrSW5mb3JtYXRpb24gPSBjcmVhdGVUYWcoJ2RpdicsIHN1YnRhc2tPYmouZ2V0TmFtZSgpLCBbJ3Rhc2stdGl0bGUnXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgaWYoc3VidGFza09iai5nZXREZXNjcmlwdGlvbigpKXtcclxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSAgY3JlYXRlVGFnKCdkaXYnLCBzdWJ0YXNrT2JqLmdldERlc2NyaXB0aW9uKCksIFsndGFzay1kZXNjcmlwdGlvbiddLCBza2lwKDEpKTtcclxuICAgICAgICAgICAgdGFza0luZm9ybWF0aW9uLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZWRpdEljb24gPSBjcmVhdGVUYWcoJ2knLCBza2lwKDEpLCBbJ2ZhLXNvbGlkJywnZmEtcGVuLXRvLXNxdWFyZSddLCBza2lwKDEpKTtcclxuICAgICAgICBjb25zdCBkZWxldGVJY29uID0gY3JlYXRlVGFnKCdpJywgc2tpcCgxKSwgWydmYS1zb2xpZCcsJ2ZhLXRyYXNoJ10sIHNraXAoMSkpOyAgICAgIFxyXG4gICAgICAgIGNvbnN0IGljb25Db250YWluZXIgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIFsnYnV0dG9uLWljb25zJ10sIHNraXAoMSksIFtlZGl0SWNvbiwgZGVsZXRlSWNvbl0sIHNraXAoMSkpOyAgICBcclxuXHJcbiAgICAgICAgY29uc3Qgc3VidGFzayA9IGNyZWF0ZUNvbnRhaW5lcignZGl2JywgWydzdWJ0YXNrJ10sICcnLCBbY29tcGxldGVUYXNrRGl2LCB0YXNrSW5mb3JtYXRpb24sIGljb25Db250YWluZXJdLCBza2lwKDEpKSBcclxuICAgICAgICBzdWJ0YXNrLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JywgZGF0YVRhc2tJbmRleCk7XHJcbiAgICAgICAgc3VidGFzay5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1pbmRleCcsIHN1YnRhc2tPYmouZ2V0SW5kZXgoKSk7XHJcblxyXG4gICAgICAgIGFkZENvbXBsZXRlVGFza0V2ZW50TGlzdGVuZXIoKTtcclxuICAgICAgICBhZGREZWxldGVUYXNrRXZlbnRMaXN0ZW5lcigpO1xyXG4gICAgICAgIGFkZEVkaXRUYXNrRXZlbnRMaXN0ZW5lcigpO1xyXG4gICAgICAgIHJldHVybiBzdWJ0YXNrO1xyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkQ29tcGxldGVUYXNrRXZlbnRMaXN0ZW5lcigpe1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tEYXRhSW5kZXggPSBzdWJ0YXNrLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRGF0YUluZGV4ID0gc3VidGFzay5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1pbmRleCcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0QXJyYXlJbmRleCA9IHN0b3JhZ2VMb29rdXBzLmdldFByb2plY3RJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRUYXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIHRhc2tEYXRhSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRTdWJ0YXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIHRhc2tBcnJheUluZGV4LCBzdWJ0YXNrRGF0YUluZGV4KVxyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0QXJyYXlJbmRleF0uZ2V0VGFza3MoKVt0YXNrRGF0YUluZGV4XS5yZW1vdmVTdWJ0YXNrKHN1YnRhc2tBcnJheUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2sucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGREZWxldGVUYXNrRXZlbnRMaXN0ZW5lcigpe1xyXG4gICAgICAgICAgICBkZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tEYXRhSW5kZXggPSBzdWJ0YXNrLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRGF0YUluZGV4ID0gc3VidGFzay5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1pbmRleCcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0QXJyYXlJbmRleCA9IHN0b3JhZ2VMb29rdXBzLmdldFByb2plY3RJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRUYXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIHRhc2tEYXRhSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRTdWJ0YXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIHRhc2tBcnJheUluZGV4LCBzdWJ0YXNrRGF0YUluZGV4KVxyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0QXJyYXlJbmRleF0uZ2V0VGFza3MoKVt0YXNrRGF0YUluZGV4XS5yZW1vdmVTdWJ0YXNrKHN1YnRhc2tBcnJheUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2sucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZEVkaXRUYXNrRXZlbnRMaXN0ZW5lcigpe1xyXG4gICAgICAgICAgICBlZGl0SWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzdWJ0YXNrLnNldEF0dHJpYnV0ZSgnaWQnLCdpbnZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tGb3JtID0gY3JlYXRlRE9NU3VidGFza0Zvcm0oJ2VkaXQnKTtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2sucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3VidGFza0Zvcm0sIHN1YnRhc2spO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9maW5kIHRoZSBhcnJheSBpbmRpY2llcyBvZiBwcm9qZWN0cywgdGFza3MsIGFuZCBzdWJ0YXNrc1xyXG4gICAgY29uc3Qgc3RvcmFnZUxvb2t1cHMgPSAoKCkgPT4ge1xyXG4gICAgICAgIC8vcmV0dXJucyBpbmRleCBvZiBwcm9qZWN0IGluIGFsbCBwcm9qZWN0cyBhcnJheVxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFByb2plY3RJbmRleCgpe1xyXG4gICAgICAgICAgICBsZXQgcHJvamVjdEluZGV4SW5BcnJheSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBwcm9qZWN0RGF0YUluZGV4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaGVhZGVyJykuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UuYWxsUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHByb2plY3QuZ2V0SW5kZXgoKSA9PSBwcm9qZWN0RGF0YUluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0SW5kZXhJbkFycmF5ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0SW5kZXhJbkFycmF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZXR1cm5zIGluZGV4IG9mIHRhc2sgaW4gYWxsIHRhc2tzIGFycmF5XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0VGFza0luZGV4KHByb2plY3RJbmRleCwgdGFza0RhdGFJbmRleCl7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdFRhc2tzID0gc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0SW5kZXhdLmdldFRhc2tzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvamVjdFRhc2tzLmZpbmRJbmRleCh0YXNrID0+IHRhc2suZ2V0SW5kZXgoKSA9PSB0YXNrRGF0YUluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFN1YnRhc2tJbmRleChwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgc3VidGFza0RhdGFJbmRleCl7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdFN1YnRhc2tzID0gc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0SW5kZXhdLmdldFRhc2tzKClbdGFza0luZGV4XS5nZXRTdWJ0YXNrcygpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFByb2plY3RTdWJ0YXNrcy5maW5kSW5kZXgoc3VidGFzayA9PiBzdWJ0YXNrLmdldEluZGV4KCkgPT0gc3VidGFza0RhdGFJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge2dldFByb2plY3RJbmRleCwgZ2V0VGFza0luZGV4LCBnZXRTdWJ0YXNrSW5kZXh9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8vYWRkcyBhbGwgZG9tIG9mIHRhc2tzIGFuZCBzdWJ0YXNrcyBpbiBhIHByb2plY3RcclxuICAgIGZ1bmN0aW9uIGFkZEFsbFRhc2tzRE9NKGNvbnRhaW5lciwgdGFza3Mpe1xyXG4gICAgICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVET01UYXNrKHRhc2spKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsU3VidGFza3MgPSB0YXNrLmdldFN1YnRhc2tzKCk7XHJcbiAgICAgICAgICAgIGFsbFN1YnRhc2tzLmZvckVhY2goc3VidGFzayA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3VidGFza0RPTShzdWJ0YXNrKS5nZXRET00oKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbGVhckFsbFRhc2tzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXJzJyk7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7aW5pdGlhbFJlbmRlciwgY2xlYXJBbGxUYXNrc307XHJcblxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdWk7XHJcblxyXG5cclxuLyogXHJcbi8vY3JlYXRlcyBET00gb2Ygb25lIHN1YnRhc2tcclxuY29uc3Qgc3VidGFza0RPTSA9IChzdWJ0YXNrT2JqKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdWJ0YXNrRGl2KCl7XHJcbiAgICAgICAgY29uc3Qgc3VidGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHN1YnRhc2tEaXYuY2xhc3NMaXN0LmFkZCgnc3VidGFzaycpO1xyXG4gICAgICAgIHJldHVybiBzdWJ0YXNrRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbXBsZXRlU3VidGFza0Rpdigpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZS10YXNrLWJ0bicpO1xyXG5cclxuICAgICAgICBjb25zdCBjaXJjbGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIGNpcmNsZUljb24uY2xhc3NMaXN0LmFkZCgnZmEtcmVndWxhcicsJ2ZhLWNpcmNsZScpO1xyXG5cclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoY2lyY2xlSWNvbik7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdWJ0YXNrVGl0bGVEaXYoc3VidGFza09iail7XHJcbiAgICAgICAgY29uc3QgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aXRsZURpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLXRpdGxlJyk7XHJcbiAgICAgICAgdGl0bGVEaXYuaW5uZXJUZXh0ID0gc3VidGFza09iai5nZXROYW1lKCk7XHJcbiAgICAgICAgcmV0dXJuIHRpdGxlRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN1YnRhc2tEZXNjcmlwdGlvbkRpdihzdWJ0YXNrT2JqKXtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGRlc2NyaXB0aW9uRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGVzY3JpcHRpb24nKTtcclxuICAgICAgICBkZXNjcmlwdGlvbkRpdi5pbm5lclRleHQgPSBzdWJ0YXNrT2JqLmdldERlc2NyaXB0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN1YnRhc2tCdXR0b25JY29ucygpIHtcclxuICAgICAgICBjb25zdCBidXR0b25zSWNvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGJ1dHRvbnNJY29uRGl2LmNsYXNzTGlzdC5hZGQoJ2J1dHRvbi1pY29ucycpO1xyXG5cclxuICAgICAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXBlbi10by1zcXVhcmUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtdHJhc2gnKTtcclxuXHJcbiAgICAgICAgYnV0dG9uc0ljb25EaXYuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgICAgIGJ1dHRvbnNJY29uRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xyXG4gICAgICAgIHJldHVybiBidXR0b25zSWNvbkRpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRET00oKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBjcmVhdGVTdWJ0YXNrRGl2KCk7XHJcbiAgICAgICAgY29uc3QgY29tcGxldGVTdWJ0YXNrRGl2ID0gY3JlYXRlQ29tcGxldGVTdWJ0YXNrRGl2KCk7XHJcbiAgICAgICAgY29uc3Qgc3VidGFza1RpdGxlRGl2ID0gY3JlYXRlU3VidGFza1RpdGxlRGl2KHN1YnRhc2tPYmopO1xyXG4gICAgICAgIGNvbnN0IHN1YnRhc2tEZXNjcmlwdGlvbkRpdiA9IGNyZWF0ZVN1YnRhc2tEZXNjcmlwdGlvbkRpdihzdWJ0YXNrT2JqKTtcclxuICAgICAgICBjb25zdCBzdWJ0YXNrQnRuSWNvbnMgPSBjcmVhdGVTdWJ0YXNrQnV0dG9uSWNvbnMoKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGNvbXBsZXRlU3VidGFza0Rpdik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tUaXRsZURpdik7XHJcbiAgICAgICAgc3VidGFza1RpdGxlRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tEZXNjcmlwdGlvbkRpdik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tCdG5JY29ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtnZXRET019O1xyXG59ICovXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLyogXHJcbmNvbnN0IHJlbmRlclRhc2tzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWRkTW90aXZhdGlvbmFsTWVzc2FnZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5ID0gW107XHJcbiAgICAgICAgY29uc3QgRE9NID0gbW90aXZhdGlvbmFsTWVzc2FnZURPTSgpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkZ1bmN0aW9uYWxpdHkgPSBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIC8vb2JqZWN0IGRlY2xhcmF0aW9uIGZvciBtb3RpdmF0aW9uYWwgbWVzc2FnZXNcclxuICAgICAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxNZXNzYWdlKGhlYWRlciwgbWVzc2FnZSwgYXV0aG9yID0gJycpe1xyXG4gICAgICAgICAgICByZXR1cm4ge2hlYWRlciwgbWVzc2FnZSwgYXV0aG9yfTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL3ByZXNldCBtZXRob2RzIGZvciBtb3RpdmF0aW9uYWwgbWVzc2FnZVxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZERlZmF1bHRNb3RpdmF0aW9uYWxNZXNzYWdlcygpIHtcclxuICAgICAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZTEgPSBtb3RpdmF0aW9uYWxNZXNzYWdlKCdNb3RpdmF0aW9uYWwgTWVzc2FnZScsJ1llc3RlcmRheSB5b3Ugc2FpZCB0b21vcnJvdywgc28ganVzdCBkbyBpdC4gRG9uXFwndCBsZXQgeW91ciBkcmVhbXMgYmUgZHJlYW1zLicsJ1NoaWEgTGFCZW91ZicpO1xyXG4gICAgICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlMiA9ICBtb3RpdmF0aW9uYWxNZXNzYWdlKCdNb3RpdmF0aW9uYWwgTWVzc2FnZScsXCJUaGUgbW9zdCBpbXBvcnRhbnQgaW52ZXN0bWVudCB5b3UgY2FuIG1ha2UgaXMgaW4geW91cnNlbGYuXCIsJ1dhcnJlbiBCdWZmZXR0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2UzID0gbW90aXZhdGlvbmFsTWVzc2FnZSgnUGVyc29uYWwgTWVzc2FnZScsJ1lvdSBjYW4gcGxheSBQb2tlbW9uIGlmIHlvdSBmaW5pc2ggY29kaW5nIHRoaXMgdG8tZG8gbGlzdC4nLCdCcnVjZScpO1xyXG4gICAgICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5LnB1c2gobW90aXZhdGlvbmFsTWVzc2FnZTMpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNob29zZU9uZU1vdGl2YXRpb25hbE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkubGVuZ3RoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXlbcmFuZG9tXTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBkZWxldGVNZXNzYWdlKGluZGV4KSB7XHJcbiAgICAgICAgICAgIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiByZW5kZXJEZWZhdWx0TWVzc2FnZXMoKSB7XHJcbiAgICAgICAgICAgIGFkZERlZmF1bHRNb3RpdmF0aW9uYWxNZXNzYWdlcygpO1xyXG4gICAgICAgICAgICBET00uY3JlYXRlTW90aXZhdGlvbmFsTWVzc2FnZShjaG9vc2VPbmVNb3RpdmF0aW9uYWxNZXNzYWdlKCkpO1xyXG4gICAgICAgICAgICBidG5GdW5jdGlvbmFsaXR5LmFkZEJ0bkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZXR1cm4ge3JlbmRlckRlZmF1bHRNZXNzYWdlcywgZGVsZXRlTWVzc2FnZX07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtyZW5kZXJEZWZhdWx0LCBjbGVhckFsbFRhc2tzfTtcclxufSAqL1xyXG4iLCJpbXBvcnQge2xhc3RJdGVtT2YsIHN0cmluZ1RvQXJyYXksIGlzSW5SYW5nZX0gZnJvbSAnLi9saWIvdXRpbHMuanMnO1xuaW1wb3J0IHt0b2RheSwgcmVndWxhcml6ZURhdGV9IGZyb20gJy4vbGliL2RhdGUuanMnO1xuaW1wb3J0IHtwYXJzZURhdGUsIGZvcm1hdERhdGV9IGZyb20gJy4vbGliL2RhdGUtZm9ybWF0LmpzJztcbmltcG9ydCB7aXNBY3RpdmVFbGVtZW50fSBmcm9tICcuL2xpYi9kb20uanMnO1xuaW1wb3J0IHtyZWdpc3Rlckxpc3RlbmVycywgdW5yZWdpc3Rlckxpc3RlbmVyc30gZnJvbSAnLi9saWIvZXZlbnQuanMnO1xuaW1wb3J0IHtsb2NhbGVzfSBmcm9tICcuL2kxOG4vYmFzZS1sb2NhbGVzLmpzJztcbmltcG9ydCBkZWZhdWx0T3B0aW9ucyBmcm9tICcuL29wdGlvbnMvZGVmYXVsdE9wdGlvbnMuanMnO1xuaW1wb3J0IHByb2Nlc3NPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9wcm9jZXNzT3B0aW9ucy5qcyc7XG5pbXBvcnQgUGlja2VyIGZyb20gJy4vcGlja2VyL1BpY2tlci5qcyc7XG5pbXBvcnQge3RyaWdnZXJEYXRlcGlja2VyRXZlbnR9IGZyb20gJy4vZXZlbnRzL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQge29uS2V5ZG93biwgb25Gb2N1cywgb25Nb3VzZWRvd24sIG9uQ2xpY2tJbnB1dCwgb25QYXN0ZX0gZnJvbSAnLi9ldmVudHMvaW5wdXRGaWVsZExpc3RlbmVycy5qcyc7XG5pbXBvcnQge29uQ2xpY2tPdXRzaWRlfSBmcm9tICcuL2V2ZW50cy9vdGhlckxpc3RlbmVycy5qcyc7XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeURhdGVzKGRhdGVzLCBjb25maWcpIHtcbiAgcmV0dXJuIGRhdGVzXG4gICAgLm1hcChkdCA9PiBmb3JtYXREYXRlKGR0LCBjb25maWcuZm9ybWF0LCBjb25maWcubG9jYWxlKSlcbiAgICAuam9pbihjb25maWcuZGF0ZURlbGltaXRlcik7XG59XG5cbi8vIHBhcnNlIGlucHV0IGRhdGVzIGFuZCBjcmVhdGUgYW4gYXJyYXkgb2YgdGltZSB2YWx1ZXMgZm9yIHNlbGVjdGlvblxuLy8gcmV0dXJucyB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG5vIHZhbGlkIGRhdGVzIGluIGlucHV0RGF0ZXNcbi8vIHdoZW4gb3JpZ0RhdGVzIChjdXJyZW50IHNlbGVjdGlvbikgaXMgcGFzc2VkLCB0aGUgZnVuY3Rpb24gd29ya3MgdG8gbWl4XG4vLyB0aGUgaW5wdXQgZGF0ZXMgaW50byB0aGUgY3VycmVudCBzZWxlY3Rpb25cbmZ1bmN0aW9uIHByb2Nlc3NJbnB1dERhdGVzKGRhdGVwaWNrZXIsIGlucHV0RGF0ZXMsIGNsZWFyID0gZmFsc2UpIHtcbiAgLy8gY29uc3Qge2NvbmZpZywgZGF0ZXM6IG9yaWdEYXRlcywgcmFuZ2VwaWNrZXJ9ID0gZGF0ZXBpY2tlcjtcbiAgY29uc3Qge2NvbmZpZywgZGF0ZXM6IG9yaWdEYXRlcywgcmFuZ2VTaWRlSW5kZXh9ID0gZGF0ZXBpY2tlcjtcbiAgaWYgKGlucHV0RGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gZW1wdHkgaW5wdXQgaXMgY29uc2lkZXJlZCB2YWxpZCB1bmxlc3Mgb3JpZ2lEYXRlcyBpcyBwYXNzZWRcbiAgICByZXR1cm4gY2xlYXIgPyBbXSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIGNvbnN0IHJhbmdlRW5kID0gcmFuZ2VwaWNrZXIgJiYgZGF0ZXBpY2tlciA9PT0gcmFuZ2VwaWNrZXIuZGF0ZXBpY2tlcnNbMV07XG4gIGxldCBuZXdEYXRlcyA9IGlucHV0RGF0ZXMucmVkdWNlKChkYXRlcywgZHQpID0+IHtcbiAgICBsZXQgZGF0ZSA9IHBhcnNlRGF0ZShkdCwgY29uZmlnLmZvcm1hdCwgY29uZmlnLmxvY2FsZSk7XG4gICAgaWYgKGRhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGRhdGVzO1xuICAgIH1cbiAgICAvLyBhZGp1c3QgdG8gMXN0IG9mIHRoZSBtb250aC9KYW4gMXN0IG9mIHRoZSB5ZWFyXG4gICAgLy8gb3IgdG8gdGhlIGxhc3QgZGF5IG9mIHRoZSBtb25oL0RlYyAzMXN0IG9mIHRoZSB5ZWFyIGlmIHRoZSBkYXRlcGlja2VyXG4gICAgLy8gaXMgdGhlIHJhbmdlLWVuZCBwaWNrZXIgb2YgYSByYW5nZXBpY2tlclxuICAgIGRhdGUgPSByZWd1bGFyaXplRGF0ZShkYXRlLCBjb25maWcucGlja0xldmVsLCByYW5nZVNpZGVJbmRleCk7XG4gICAgaWYgKFxuICAgICAgaXNJblJhbmdlKGRhdGUsIGNvbmZpZy5taW5EYXRlLCBjb25maWcubWF4RGF0ZSlcbiAgICAgICYmICFkYXRlcy5pbmNsdWRlcyhkYXRlKVxuICAgICAgJiYgIWNvbmZpZy5kYXRlc0Rpc2FibGVkLmluY2x1ZGVzKGRhdGUpXG4gICAgICAmJiAoY29uZmlnLnBpY2tMZXZlbCA+IDAgfHwgIWNvbmZpZy5kYXlzT2ZXZWVrRGlzYWJsZWQuaW5jbHVkZXMobmV3IERhdGUoZGF0ZSkuZ2V0RGF5KCkpKVxuICAgICkge1xuICAgICAgZGF0ZXMucHVzaChkYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGVzO1xuICB9LCBbXSk7XG4gIGlmIChuZXdEYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbmZpZy5tdWx0aWRhdGUgJiYgIWNsZWFyKSB7XG4gICAgLy8gZ2V0IHRoZSBzeW5tZXRyaWMgZGlmZmVyZW5jZSBiZXR3ZWVuIG9yaWdEYXRlcyBhbmQgbmV3RGF0ZXNcbiAgICBuZXdEYXRlcyA9IG5ld0RhdGVzLnJlZHVjZSgoZGF0ZXMsIGRhdGUpID0+IHtcbiAgICAgIGlmICghb3JpZ0RhdGVzLmluY2x1ZGVzKGRhdGUpKSB7XG4gICAgICAgIGRhdGVzLnB1c2goZGF0ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0ZXM7XG4gICAgfSwgb3JpZ0RhdGVzLmZpbHRlcihkYXRlID0+ICFuZXdEYXRlcy5pbmNsdWRlcyhkYXRlKSkpO1xuICB9XG4gIC8vIGRvIGxlbmd0aCBjaGVjayBhbHdheXMgYmVjYXVzZSB1c2VyIGNhbiBpbnB1dCBtdWx0aXBsZSBkYXRlcyByZWdhcmRsZXNzIG9mIHRoZSBtb2RlXG4gIHJldHVybiBjb25maWcubWF4TnVtYmVyT2ZEYXRlcyAmJiBuZXdEYXRlcy5sZW5ndGggPiBjb25maWcubWF4TnVtYmVyT2ZEYXRlc1xuICAgID8gbmV3RGF0ZXMuc2xpY2UoY29uZmlnLm1heE51bWJlck9mRGF0ZXMgKiAtMSlcbiAgICA6IG5ld0RhdGVzO1xufVxuXG4vLyByZWZyZXNoIHRoZSBVSSBlbGVtZW50c1xuLy8gbW9kZXM6IDE6IGlucHV0IG9ubHksIDIsIHBpY2tlciBvbmx5LCAzIGJvdGhcbmZ1bmN0aW9uIHJlZnJlc2hVSShkYXRlcGlja2VyLCBtb2RlID0gMywgcXVpY2tSZW5kZXIgPSB0cnVlKSB7XG4gIGNvbnN0IHtjb25maWcsIHBpY2tlciwgaW5wdXRGaWVsZH0gPSBkYXRlcGlja2VyO1xuICBpZiAobW9kZSAmIDIpIHtcbiAgICBjb25zdCBuZXdWaWV3ID0gcGlja2VyLmFjdGl2ZSA/IGNvbmZpZy5waWNrTGV2ZWwgOiBjb25maWcuc3RhcnRWaWV3O1xuICAgIHBpY2tlci51cGRhdGUoKS5jaGFuZ2VWaWV3KG5ld1ZpZXcpLnJlbmRlcihxdWlja1JlbmRlcik7XG4gIH1cbiAgaWYgKG1vZGUgJiAxICYmIGlucHV0RmllbGQpIHtcbiAgICBpbnB1dEZpZWxkLnZhbHVlID0gc3RyaW5naWZ5RGF0ZXMoZGF0ZXBpY2tlci5kYXRlcywgY29uZmlnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXREYXRlKGRhdGVwaWNrZXIsIGlucHV0RGF0ZXMsIG9wdGlvbnMpIHtcbiAgbGV0IHtjbGVhciwgcmVuZGVyLCBhdXRvaGlkZSwgcmV2ZXJ0fSA9IG9wdGlvbnM7XG4gIGlmIChyZW5kZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJlbmRlciA9IHRydWU7XG4gIH1cbiAgaWYgKCFyZW5kZXIpIHtcbiAgICBhdXRvaGlkZSA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKGF1dG9oaWRlID09PSB1bmRlZmluZWQpIHtcbiAgICBhdXRvaGlkZSA9IGRhdGVwaWNrZXIuY29uZmlnLmF1dG9oaWRlO1xuICB9XG5cbiAgY29uc3QgbmV3RGF0ZXMgPSBwcm9jZXNzSW5wdXREYXRlcyhkYXRlcGlja2VyLCBpbnB1dERhdGVzLCBjbGVhcik7XG4gIGlmICghbmV3RGF0ZXMgJiYgIXJldmVydCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobmV3RGF0ZXMgJiYgbmV3RGF0ZXMudG9TdHJpbmcoKSAhPT0gZGF0ZXBpY2tlci5kYXRlcy50b1N0cmluZygpKSB7XG4gICAgZGF0ZXBpY2tlci5kYXRlcyA9IG5ld0RhdGVzO1xuICAgIHJlZnJlc2hVSShkYXRlcGlja2VyLCByZW5kZXIgPyAzIDogMSk7XG4gICAgdHJpZ2dlckRhdGVwaWNrZXJFdmVudChkYXRlcGlja2VyLCAnY2hhbmdlRGF0ZScpO1xuICB9IGVsc2Uge1xuICAgIHJlZnJlc2hVSShkYXRlcGlja2VyLCAxKTtcbiAgfVxuXG4gIGlmIChhdXRvaGlkZSkge1xuICAgIGRhdGVwaWNrZXIuaGlkZSgpO1xuICB9XG59XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgZGF0ZSBwaWNrZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZXBpY2tlciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkYXRlIHBpY2tlclxuICAgKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtZW50IC0gZWxlbWVudCB0byBiaW5kIGEgZGF0ZSBwaWNrZXJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBbb3B0aW9uc10gLSBjb25maWcgb3B0aW9uc1xuICAgKiBAcGFyYW0gIHtEYXRlUmFuZ2VQaWNrZXJ9IFtyYW5nZXBpY2tlcl0gLSBEYXRlUmFuZ2VQaWNrZXIgaW5zdGFuY2UgdGhlXG4gICAqIGRhdGUgcGlja2VyIGJlbG9uZ3MgdG8uIFVzZSB0aGlzIG9ubHkgd2hlbiBjcmVhdGluZyBkYXRlIHBpY2tlciBhcyBhIHBhcnRcbiAgICogb2YgZGF0ZSByYW5nZSBwaWNrZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMgPSB7fSwgcmFuZ2VwaWNrZXIgPSB1bmRlZmluZWQpIHtcbiAgICBlbGVtZW50LmRhdGVwaWNrZXIgPSB0aGlzO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgYnV0dG9uQ2xhc3M6IChvcHRpb25zLmJ1dHRvbkNsYXNzICYmIFN0cmluZyhvcHRpb25zLmJ1dHRvbkNsYXNzKSkgfHwgJ2J1dHRvbicsXG4gICAgICBjb250YWluZXI6IG51bGwsXG4gICAgICBkZWZhdWx0Vmlld0RhdGU6IHRvZGF5KCksXG4gICAgICBtYXhEYXRlOiB1bmRlZmluZWQsXG4gICAgICBtaW5EYXRlOiB1bmRlZmluZWQsXG4gICAgfSwgcHJvY2Vzc09wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIHRoaXMpKTtcbiAgICAvLyBjb25maWd1cmUgYnkgdHlwZVxuICAgIGNvbnN0IGlubGluZSA9IHRoaXMuaW5saW5lID0gZWxlbWVudC50YWdOYW1lICE9PSAnSU5QVVQnO1xuICAgIGxldCBpbnB1dEZpZWxkO1xuICAgIGlmIChpbmxpbmUpIHtcbiAgICAgIGNvbmZpZy5jb250YWluZXIgPSBlbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5jb250YWluZXIpIHtcbiAgICAgICAgLy8gb21pdCBzdHJpbmcgdHlwZSBjaGVjayBiZWNhdXNlIGl0IGRvZXNuJ3QgZ3VhcmFudGVlIHRvIGF2b2lkIGVycm9yc1xuICAgICAgICAvLyAoaW52YWxpZCBzZWxlY3RvciBzdHJpbmcgY2F1c2VzIGFiZW5kIHdpdGggc3l0YXggZXJyb3IpXG4gICAgICAgIGNvbmZpZy5jb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICAgPyBvcHRpb25zLmNvbnRhaW5lclxuICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLmNvbnRhaW5lcik7XG4gICAgICB9XG4gICAgICBpbnB1dEZpZWxkID0gdGhpcy5pbnB1dEZpZWxkID0gZWxlbWVudDtcbiAgICAgIGlucHV0RmllbGQuY2xhc3NMaXN0LmFkZCgnZGF0ZXBpY2tlci1pbnB1dCcpO1xuICAgIH1cbiAgICBpZiAocmFuZ2VwaWNrZXIpIHtcbiAgICAgIC8vIGNoZWNrIHZhbGlkaXJ5XG4gICAgICBjb25zdCBpbmRleCA9IHJhbmdlcGlja2VyLmlucHV0cy5pbmRleE9mKGlucHV0RmllbGQpO1xuICAgICAgY29uc3QgZGF0ZXBpY2tlcnMgPSByYW5nZXBpY2tlci5kYXRlcGlja2VycztcbiAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiAxIHx8ICFBcnJheS5pc0FycmF5KGRhdGVwaWNrZXJzKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCByYW5nZXBpY2tlciBvYmplY3QuJyk7XG4gICAgICB9XG4gICAgICAvLyBhdHRhY2ggaXRhZWxmIHRvIHRoZSByYW5nZXBpY2tlciBoZXJlIHNvIHRoYXQgcHJvY2Vzc0lucHV0RGF0ZXMoKSBjYW5cbiAgICAgIC8vIGRldGVybWluZSBpZiB0aGlzIGlzIHRoZSByYW5nZS1lbmQgcGlja2VyIG9mIHRoZSByYW5nZXBpY2tlciB3aGlsZVxuICAgICAgLy8gc2V0dGluZyBpbml0YWwgdmFsdWVzIHdoZW4gcGlja0xldmVsID4gMFxuICAgICAgZGF0ZXBpY2tlcnNbaW5kZXhdID0gdGhpcztcbiAgICAgIC8vIGFkZCBnZXR0ZXIgZm9yIHJhbmdlcGlja2VyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3JhbmdlcGlja2VyJywge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIHJhbmdlcGlja2VyO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3JhbmdlU2lkZUluZGV4Jywge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gc2V0IHVwIGNvbmZpZ1xuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIE9iamVjdC5hc3NpZ24oY29uZmlnLCBwcm9jZXNzT3B0aW9ucyhvcHRpb25zLCB0aGlzKSk7XG5cbiAgICAvLyBzZXQgaW5pdGlhbCBkYXRlc1xuICAgIGxldCBpbml0aWFsRGF0ZXM7XG4gICAgaWYgKGlubGluZSkge1xuICAgICAgaW5pdGlhbERhdGVzID0gc3RyaW5nVG9BcnJheShlbGVtZW50LmRhdGFzZXQuZGF0ZSwgY29uZmlnLmRhdGVEZWxpbWl0ZXIpO1xuICAgICAgZGVsZXRlIGVsZW1lbnQuZGF0YXNldC5kYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbml0aWFsRGF0ZXMgPSBzdHJpbmdUb0FycmF5KGlucHV0RmllbGQudmFsdWUsIGNvbmZpZy5kYXRlRGVsaW1pdGVyKTtcbiAgICB9XG4gICAgdGhpcy5kYXRlcyA9IFtdO1xuICAgIC8vIHByb2Nlc3MgaW5pdGlhbCB2YWx1ZVxuICAgIGNvbnN0IGlucHV0RGF0ZVZhbHVlcyA9IHByb2Nlc3NJbnB1dERhdGVzKHRoaXMsIGluaXRpYWxEYXRlcyk7XG4gICAgaWYgKGlucHV0RGF0ZVZhbHVlcyAmJiBpbnB1dERhdGVWYWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5kYXRlcyA9IGlucHV0RGF0ZVZhbHVlcztcbiAgICB9XG4gICAgaWYgKGlucHV0RmllbGQpIHtcbiAgICAgIGlucHV0RmllbGQudmFsdWUgPSBzdHJpbmdpZnlEYXRlcyh0aGlzLmRhdGVzLCBjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IHBpY2tlciA9IHRoaXMucGlja2VyID0gbmV3IFBpY2tlcih0aGlzKTtcblxuICAgIGlmIChpbmxpbmUpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZXQgdXAgZXZlbnQgbGlzdGVuZXJzIGluIG90aGVyIG1vZGVzXG4gICAgICBjb25zdCBvbk1vdXNlZG93bkRvY3VtZW50ID0gb25DbGlja091dHNpZGUuYmluZChudWxsLCB0aGlzKTtcbiAgICAgIGNvbnN0IGxpc3RlbmVycyA9IFtcbiAgICAgICAgW2lucHV0RmllbGQsICdrZXlkb3duJywgb25LZXlkb3duLmJpbmQobnVsbCwgdGhpcyldLFxuICAgICAgICBbaW5wdXRGaWVsZCwgJ2ZvY3VzJywgb25Gb2N1cy5iaW5kKG51bGwsIHRoaXMpXSxcbiAgICAgICAgW2lucHV0RmllbGQsICdtb3VzZWRvd24nLCBvbk1vdXNlZG93bi5iaW5kKG51bGwsIHRoaXMpXSxcbiAgICAgICAgW2lucHV0RmllbGQsICdjbGljaycsIG9uQ2xpY2tJbnB1dC5iaW5kKG51bGwsIHRoaXMpXSxcbiAgICAgICAgW2lucHV0RmllbGQsICdwYXN0ZScsIG9uUGFzdGUuYmluZChudWxsLCB0aGlzKV0sXG4gICAgICAgIFtkb2N1bWVudCwgJ21vdXNlZG93bicsIG9uTW91c2Vkb3duRG9jdW1lbnRdLFxuICAgICAgICBbZG9jdW1lbnQsICd0b3VjaHN0YXJ0Jywgb25Nb3VzZWRvd25Eb2N1bWVudF0sXG4gICAgICAgIFt3aW5kb3csICdyZXNpemUnLCBwaWNrZXIucGxhY2UuYmluZChwaWNrZXIpXVxuICAgICAgXTtcbiAgICAgIHJlZ2lzdGVyTGlzdGVuZXJzKHRoaXMsIGxpc3RlbmVycyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBEYXRlIG9iamVjdCBvciB0aW1lIHZhbHVlIGluIGdpdmVuIGZvcm1hdCBhbmQgbGFuZ3VhZ2VcbiAgICogQHBhcmFtICB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSBkYXRlIG9yIHRpbWUgdmFsdWUgdG8gZm9ybWF0XG4gICAqIEBwYXJhbSAge1N0cmluZ3xPYmplY3R9IGZvcm1hdCAtIGZvcm1hdCBzdHJpbmcgb3Igb2JqZWN0IHRoYXQgY29udGFpbnNcbiAgICogdG9EaXNwbGF5KCkgY3VzdG9tIGZvcm1hdHRlciwgd2hvc2Ugc2lnbmF0dXJlIGlzXG4gICAqIC0gYXJnczpcbiAgICogICAtIGRhdGU6IHtEYXRlfSAtIERhdGUgaW5zdGFuY2Ugb2YgdGhlIGRhdGUgcGFzc2VkIHRvIHRoZSBtZXRob2RcbiAgICogICAtIGZvcm1hdDoge09iamVjdH0gLSB0aGUgZm9ybWF0IG9iamVjdCBwYXNzZWQgdG8gdGhlIG1ldGhvZFxuICAgKiAgIC0gbG9jYWxlOiB7T2JqZWN0fSAtIGxvY2FsZSBmb3IgdGhlIGxhbmd1YWdlIHNwZWNpZmllZCBieSBgbGFuZ2BcbiAgICogLSByZXR1cm46XG4gICAqICAgICB7U3RyaW5nfSBmb3JtYXR0ZWQgZGF0ZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IFtsYW5nPWVuXSAtIGxhbmd1YWdlIGNvZGUgZm9yIHRoZSBsb2NhbGUgdG8gdXNlXG4gICAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0dGVkIGRhdGVcbiAgICovXG4gIHN0YXRpYyBmb3JtYXREYXRlKGRhdGUsIGZvcm1hdCwgbGFuZykge1xuICAgIHJldHVybiBmb3JtYXREYXRlKGRhdGUsIGZvcm1hdCwgbGFuZyAmJiBsb2NhbGVzW2xhbmddIHx8IGxvY2FsZXMuZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIGRhdGUgc3RyaW5nXG4gICAqIEBwYXJhbSAge1N0cmluZ3xEYXRlfE51bWJlcn0gZGF0ZVN0ciAtIGRhdGUgc3RyaW5nLCBEYXRlIG9iamVjdCBvciB0aW1lXG4gICAqIHZhbHVlIHRvIHBhcnNlXG4gICAqIEBwYXJhbSAge1N0cmluZ3xPYmplY3R9IGZvcm1hdCAtIGZvcm1hdCBzdHJpbmcgb3Igb2JqZWN0IHRoYXQgY29udGFpbnNcbiAgICogdG9WYWx1ZSgpIGN1c3RvbSBwYXJzZXIsIHdob3NlIHNpZ25hdHVyZSBpc1xuICAgKiAtIGFyZ3M6XG4gICAqICAgLSBkYXRlU3RyOiB7U3RyaW5nfERhdGV8TnVtYmVyfSAtIHRoZSBkYXRlU3RyIHBhc3NlZCB0byB0aGUgbWV0aG9kXG4gICAqICAgLSBmb3JtYXQ6IHtPYmplY3R9IC0gdGhlIGZvcm1hdCBvYmplY3QgcGFzc2VkIHRvIHRoZSBtZXRob2RcbiAgICogICAtIGxvY2FsZToge09iamVjdH0gLSBsb2NhbGUgZm9yIHRoZSBsYW5ndWFnZSBzcGVjaWZpZWQgYnkgYGxhbmdgXG4gICAqIC0gcmV0dXJuOlxuICAgKiAgICAge0RhdGV8TnVtYmVyfSBwYXJzZWQgZGF0ZSBvciBpdHMgdGltZSB2YWx1ZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IFtsYW5nPWVuXSAtIGxhbmd1YWdlIGNvZGUgZm9yIHRoZSBsb2NhbGUgdG8gdXNlXG4gICAqIEByZXR1cm4ge051bWJlcn0gdGltZSB2YWx1ZSBvZiBwYXJzZWQgZGF0ZVxuICAgKi9cbiAgc3RhdGljIHBhcnNlRGF0ZShkYXRlU3RyLCBmb3JtYXQsIGxhbmcpIHtcbiAgICByZXR1cm4gcGFyc2VEYXRlKGRhdGVTdHIsIGZvcm1hdCwgbGFuZyAmJiBsb2NhbGVzW2xhbmddIHx8IGxvY2FsZXMuZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3R9IC0gSW5zdGFsbGVkIGxvY2FsZXMgaW4gYFtsYW5ndWFnZUNvZGVdOiBsb2NhbGVPYmplY3RgIGZvcm1hdFxuICAgKiBlbmA6X0VuZ2xpc2ggKFVTKV8gaXMgcHJlLWluc3RhbGxlZC5cbiAgICovXG4gIHN0YXRpYyBnZXQgbG9jYWxlcygpIHtcbiAgICByZXR1cm4gbG9jYWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn0gLSBXaGV0aGVyIHRoZSBwaWNrZXIgZWxlbWVudCBpcyBzaG93bi4gYHRydWVgIHdobmUgc2hvd25cbiAgICovXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuICEhKHRoaXMucGlja2VyICYmIHRoaXMucGlja2VyLmFjdGl2ZSk7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge0hUTUxEaXZFbGVtZW50fSAtIERPTSBvYmplY3Qgb2YgcGlja2VyIGVsZW1lbnRcbiAgICovXG4gIGdldCBwaWNrZXJFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnBpY2tlciA/IHRoaXMucGlja2VyLmVsZW1lbnQgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyB2YWx1ZXMgdG8gdGhlIGNvbmZpZyBvcHRpb25zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gY29uZmlnIG9wdGlvbnMgdG8gdXBkYXRlXG4gICAqL1xuICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBjb25zdCBwaWNrZXIgPSB0aGlzLnBpY2tlcjtcbiAgICBjb25zdCBuZXdPcHRpb25zID0gcHJvY2Vzc09wdGlvbnMob3B0aW9ucywgdGhpcyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBuZXdPcHRpb25zKTtcbiAgICBwaWNrZXIuc2V0T3B0aW9ucyhuZXdPcHRpb25zKTtcblxuICAgIHJlZnJlc2hVSSh0aGlzLCAzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHRoZSBwaWNrZXIgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBpZiAodGhpcy5pbnB1dEZpZWxkKSB7XG4gICAgICBpZiAodGhpcy5pbnB1dEZpZWxkLmRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghaXNBY3RpdmVFbGVtZW50KHRoaXMuaW5wdXRGaWVsZCkgJiYgIXRoaXMuY29uZmlnLmRpc2FibGVUb3VjaEtleWJvYXJkKSB7XG4gICAgICAgIHRoaXMuX3Nob3dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmlucHV0RmllbGQuZm9jdXMoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3Nob3dpbmc7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucGlja2VyLnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoZSBwaWNrZXIgZWxlbWVudFxuICAgKiBOb3QgYXZhaWxhYmxlIG9uIGlubGluZSBwaWNrZXJcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucGlja2VyLmhpZGUoKTtcbiAgICB0aGlzLnBpY2tlci51cGRhdGUoKS5jaGFuZ2VWaWV3KHRoaXMuY29uZmlnLnN0YXJ0VmlldykucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgRGF0ZXBpY2tlciBpbnN0YW5jZVxuICAgKiBAcmV0dXJuIHtEZXRlcGlja2VyfSAtIHRoZSBpbnN0YW5jZSBkZXN0cm95ZWRcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5oaWRlKCk7XG4gICAgdW5yZWdpc3Rlckxpc3RlbmVycyh0aGlzKTtcbiAgICB0aGlzLnBpY2tlci5kZXRhY2goKTtcbiAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICB0aGlzLmlucHV0RmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnZGF0ZXBpY2tlci1pbnB1dCcpO1xuICAgIH1cbiAgICBkZWxldGUgdGhpcy5lbGVtZW50LmRhdGVwaWNrZXI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzZWxlY3RlZCBkYXRlKHMpXG4gICAqXG4gICAqIFRoZSBtZXRob2QgcmV0dXJucyBhIERhdGUgb2JqZWN0IG9mIHNlbGVjdGVkIGRhdGUgYnkgZGVmYXVsdCwgYW5kIHJldHVybnNcbiAgICogYW4gYXJyYXkgb2Ygc2VsZWN0ZWQgZGF0ZXMgaW4gbXVsdGlkYXRlIG1vZGUuIElmIGZvcm1hdCBzdHJpbmcgaXMgcGFzc2VkLFxuICAgKiBpdCByZXR1cm5zIGRhdGUgc3RyaW5nKHMpIGZvcm1hdHRlZCBpbiBnaXZlbiBmb3JtYXQuXG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ30gW2Zvcm1hdF0gLSBGb3JtYXQgc3RyaW5nIHRvIHN0cmluZ2lmeSB0aGUgZGF0ZShzKVxuICAgKiBAcmV0dXJuIHtEYXRlfFN0cmluZ3xEYXRlW118U3RyaW5nW119IC0gc2VsZWN0ZWQgZGF0ZShzKSwgb3IgaWYgbm9uZSBpc1xuICAgKiBzZWxlY3RlZCwgZW1wdHkgYXJyYXkgaW4gbXVsdGlkYXRlIG1vZGUgYW5kIHVudGl0bGVkIGluIHNpZ2xlZGF0ZSBtb2RlXG4gICAqL1xuICBnZXREYXRlKGZvcm1hdCA9IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGNhbGxiYWNrID0gZm9ybWF0XG4gICAgICA/IGRhdGUgPT4gZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQsIHRoaXMuY29uZmlnLmxvY2FsZSlcbiAgICAgIDogZGF0ZSA9PiBuZXcgRGF0ZShkYXRlKTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5tdWx0aWRhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGVzLm1hcChjYWxsYmFjayk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLmRhdGVzWzBdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHNlbGVjdGVkIGRhdGUocylcbiAgICpcbiAgICogSW4gbXVsdGlkYXRlIG1vZGUsIHlvdSBjYW4gcGFzcyBtdWx0aXBsZSBkYXRlcyBhcyBhIHNlcmllcyBvZiBhcmd1bWVudHNcbiAgICogb3IgYW4gYXJyYXkuIChTaW5jZSBlYWNoIGRhdGUgaXMgcGFyc2VkIGluZGl2aWR1YWxseSwgdGhlIHR5cGUgb2YgdGhlXG4gICAqIGRhdGVzIGRvZXNuJ3QgaGF2ZSB0byBiZSB0aGUgc2FtZS4pXG4gICAqIFRoZSBnaXZlbiBkYXRlcyBhcmUgdXNlZCB0byB0b2dnbGUgdGhlIHNlbGVjdCBzdGF0dXMgb2YgZWFjaCBkYXRlLiBUaGVcbiAgICogbnVtYmVyIG9mIHNlbGVjdGVkIGRhdGVzIGlzIGtlcHQgZnJvbSBleGNlZWRpbmcgdGhlIGxlbmd0aCBzZXQgdG9cbiAgICogbWF4TnVtYmVyT2ZEYXRlcy5cbiAgICpcbiAgICogV2l0aCBjbGVhcjogdHJ1ZSBvcHRpb24sIHRoZSBtZXRob2QgY2FuIGJlIHVzZWQgdG8gY2xlYXIgdGhlIHNlbGVjdGlvblxuICAgKiBhbmQgdG8gcmVwbGFjZSB0aGUgc2VsZWN0aW9uIGluc3RlYWQgb2YgdG9nZ2xpbmcgaW4gbXVsdGlkYXRlIG1vZGUuXG4gICAqIElmIHRoZSBvcHRpb24gaXMgcGFzc2VkIHdpdGggbm8gZGF0ZSBhcmd1bWVudHMgb3IgYW4gZW1wdHkgZGF0ZXMgYXJyYXksXG4gICAqIGl0IHdvcmtzIGFzIFwiY2xlYXJcIiAoY2xlYXIgdGhlIHNlbGVjdGlvbiB0aGVuIHNldCBub3RoaW5nKSwgYW5kIGlmIHRoZVxuICAgKiBvcHRpb24gaXMgcGFzc2VkIHdpdGggbmV3IGRhdGVzIHRvIHNlbGVjdCwgaXQgd29ya3MgYXMgXCJyZXBsYWNlXCIgKGNsZWFyXG4gICAqIHRoZSBzZWxlY3Rpb24gdGhlbiBzZXQgdGhlIGdpdmVuIGRhdGVzKVxuICAgKlxuICAgKiBXaGVuIHJlbmRlcjogZmFsc2Ugb3B0aW9uIGlzIHVzZWQsIHRoZSBtZXRob2Qgb21pdHMgcmUtcmVuZGVyaW5nIHRoZVxuICAgKiBwaWNrZXIgZWxlbWVudC4gSW4gdGhpcyBjYXNlLCB5b3UgbmVlZCB0byBjYWxsIHJlZnJlc2goKSBtZXRob2QgbGF0ZXIgaW5cbiAgICogb3JkZXIgZm9yIHRoZSBwaWNrZXIgZWxlbWVudCB0byByZWZsZWN0IHRoZSBjaGFuZ2VzLiBUaGUgaW5wdXQgZmllbGQgaXNcbiAgICogcmVmcmVzaGVkIGFsd2F5cyByZWdhcmRsZXNzIG9mIHRoaXMgb3B0aW9uLlxuICAgKlxuICAgKiBXaGVuIGludmFsaWQgKHVucGFyc2FibGUsIHJlcGVhdGVkLCBkaXNhYmxlZCBvciBvdXQtb2YtcmFuZ2UpIGRhdGVzIGFyZVxuICAgKiBwYXNzZWQsIHRoZSBtZXRob2QgaWdub3JlcyB0aGVtIGFuZCBhcHBsaWVzIG9ubHkgdmFsaWQgb25lcy4gSW4gdGhlIGNhc2VcbiAgICogdGhhdCBhbGwgdGhlIGdpdmVuIGRhdGVzIGFyZSBpbnZhbGlkLCB3aGljaCBpcyBkaXN0aW5ndWlzaGVkIGZyb20gcGFzc2luZ1xuICAgKiBubyBkYXRlcywgdGhlIG1ldGhvZCBjb25zaWRlcnMgaXQgYXMgYW4gZXJyb3IgYW5kIGxlYXZlcyB0aGUgc2VsZWN0aW9uXG4gICAqIHVudG91Y2hlZC4gKFRoZSBpbnB1dCBmaWVsZCBhbHNvIHJlbWFpbnMgdW50b3VjaGVkIHVubGVzcyByZXZlcnQ6IHRydWVcbiAgICogb3B0aW9uIGlzIHVzZWQuKVxuICAgKlxuICAgKiBAcGFyYW0gey4uLihEYXRlfE51bWJlcnxTdHJpbmcpfEFycmF5fSBbZGF0ZXNdIC0gRGF0ZSBzdHJpbmdzLCBEYXRlXG4gICAqIG9iamVjdHMsIHRpbWUgdmFsdWVzIG9yIG1peCBvZiB0aG9zZSBmb3IgbmV3IHNlbGVjdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gZnVuY3Rpb24gb3B0aW9uc1xuICAgKiAtIGNsZWFyOiB7Ym9vbGVhbn0gLSBXaGV0aGVyIHRvIGNsZWFyIHRoZSBleGlzdGluZyBzZWxlY3Rpb25cbiAgICogICAgIGRlZnVhbHQ6IGZhbHNlXG4gICAqIC0gcmVuZGVyOiB7Ym9vbGVhbn0gLSBXaGV0aGVyIHRvIHJlLXJlbmRlciB0aGUgcGlja2VyIGVsZW1lbnRcbiAgICogICAgIGRlZmF1bHQ6IHRydWVcbiAgICogLSBhdXRvaGlkZToge2Jvb2xlYW59IC0gV2hldGhlciB0byBoaWRlIHRoZSBwaWNrZXIgZWxlbWVudCBhZnRlciByZS1yZW5kZXJcbiAgICogICAgIElnbm9yZWQgd2hlbiB1c2VkIHdpdGggcmVuZGVyOiBmYWxzZVxuICAgKiAgICAgZGVmYXVsdDogY29uZmlnLmF1dG9oaWRlXG4gICAqIC0gcmV2ZXJ0OiB7Ym9vbGVhbn0gLSBXaGV0aGVyIHRvIHJlZnJlc2ggdGhlIGlucHV0IGZpZWxkIHdoZW4gYWxsIHRoZVxuICAgKiAgICAgcGFzc2VkIGRhdGVzIGFyZSBpbnZhbGlkXG4gICAqICAgICBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgc2V0RGF0ZSguLi5hcmdzKSB7XG4gICAgY29uc3QgZGF0ZXMgPSBbLi4uYXJnc107XG4gICAgY29uc3Qgb3B0cyA9IHt9O1xuICAgIGNvbnN0IGxhc3RBcmcgPSBsYXN0SXRlbU9mKGFyZ3MpO1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiBsYXN0QXJnID09PSAnb2JqZWN0J1xuICAgICAgJiYgIUFycmF5LmlzQXJyYXkobGFzdEFyZylcbiAgICAgICYmICEobGFzdEFyZyBpbnN0YW5jZW9mIERhdGUpXG4gICAgICAmJiBsYXN0QXJnXG4gICAgKSB7XG4gICAgICBPYmplY3QuYXNzaWduKG9wdHMsIGRhdGVzLnBvcCgpKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dERhdGVzID0gQXJyYXkuaXNBcnJheShkYXRlc1swXSkgPyBkYXRlc1swXSA6IGRhdGVzO1xuICAgIHNldERhdGUodGhpcywgaW5wdXREYXRlcywgb3B0cyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBzZWxlY3RlZCBkYXRlKHMpIHdpdGggaW5wdXQgZmllbGQncyB2YWx1ZVxuICAgKiBOb3QgYXZhaWxhYmxlIG9uIGlubGluZSBwaWNrZXJcbiAgICpcbiAgICogVGhlIGlucHV0IGZpZWxkIHdpbGwgYmUgcmVmcmVzaGVkIHdpdGggcHJvcGVybHkgZm9ybWF0dGVkIGRhdGUgc3RyaW5nLlxuICAgKlxuICAgKiBJbiB0aGUgY2FzZSB0aGF0IGFsbCB0aGUgZW50ZXJlZCBkYXRlcyBhcmUgaW52YWxpZCAodW5wYXJzYWJsZSwgcmVwZWF0ZWQsXG4gICAqIGRpc2FibGVkIG9yIG91dC1vZi1yYW5nZSksIHdoaXhoIGlzIGRpc3Rpbmd1aXNoZWQgZnJvbSBlbXB0eSBpbnB1dCBmaWVsZCxcbiAgICogdGhlIG1ldGhvZCBsZWF2ZXMgdGhlIGlucHV0IGZpZWxkIHVudG91Y2hlZCBhcyB3ZWxsIGFzIHRoZSBzZWxlY3Rpb24gYnlcbiAgICogZGVmYXVsdC4gSWYgcmV2ZXJ0OiB0cnVlIG9wdGlvbiBpcyB1c2VkIGluIHRoaXMgY2FzZSwgdGhlIGlucHV0IGZpZWxkIGlzXG4gICAqIHJlZnJlc2hlZCB3aXRoIHRoZSBleGlzdGluZyBzZWxlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gW29wdGlvbnNdIC0gZnVuY3Rpb24gb3B0aW9uc1xuICAgKiAtIGF1dG9oaWRlOiB7Ym9vbGVhbn0gLSB3aGV0aGVyIHRvIGhpZGUgdGhlIHBpY2tlciBlbGVtZW50IGFmdGVyIHJlZnJlc2hcbiAgICogICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAqIC0gcmV2ZXJ0OiB7Ym9vbGVhbn0gLSBXaGV0aGVyIHRvIHJlZnJlc2ggdGhlIGlucHV0IGZpZWxkIHdoZW4gYWxsIHRoZVxuICAgKiAgICAgcGFzc2VkIGRhdGVzIGFyZSBpbnZhbGlkXG4gICAqICAgICBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgdXBkYXRlKG9wdGlvbnMgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpcy5pbmxpbmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbihvcHRpb25zIHx8IHt9LCB7Y2xlYXI6IHRydWUsIHJlbmRlcjogdHJ1ZX0pO1xuICAgIGNvbnN0IGlucHV0RGF0ZXMgPSBzdHJpbmdUb0FycmF5KHRoaXMuaW5wdXRGaWVsZC52YWx1ZSwgdGhpcy5jb25maWcuZGF0ZURlbGltaXRlcik7XG4gICAgc2V0RGF0ZSh0aGlzLCBpbnB1dERhdGVzLCBvcHRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoIHRoZSBwaWNrZXIgZWxlbWVudCBhbmQgdGhlIGFzc29jaWF0ZWQgaW5wdXQgZmllbGRcbiAgICogQHBhcmFtIHtTdHJpbmd9IFt0YXJnZXRdIC0gdGFyZ2V0IGl0ZW0gd2hlbiByZWZyZXNoaW5nIG9uZSBpdGVtIG9ubHlcbiAgICogJ3BpY2tlcicgb3IgJ2lucHV0J1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmb3JjZVJlbmRlcl0gLSB3aGV0aGVyIHRvIHJlLXJlbmRlciB0aGUgcGlja2VyIGVsZW1lbnRcbiAgICogcmVnYXJkbGVzcyBvZiBpdHMgc3RhdGUgaW5zdGVhZCBvZiBvcHRpbWl6ZWQgcmVmcmVzaFxuICAgKi9cbiAgcmVmcmVzaCh0YXJnZXQgPSB1bmRlZmluZWQsIGZvcmNlUmVuZGVyID0gZmFsc2UpIHtcbiAgICBpZiAodGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICBmb3JjZVJlbmRlciA9IHRhcmdldDtcbiAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBsZXQgbW9kZTtcbiAgICBpZiAodGFyZ2V0ID09PSAncGlja2VyJykge1xuICAgICAgbW9kZSA9IDI7XG4gICAgfSBlbHNlIGlmICh0YXJnZXQgPT09ICdpbnB1dCcpIHtcbiAgICAgIG1vZGUgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb2RlID0gMztcbiAgICB9XG4gICAgcmVmcmVzaFVJKHRoaXMsIG1vZGUsICFmb3JjZVJlbmRlcik7XG4gIH1cblxuICAvKipcbiAgICogRW50ZXIgZWRpdCBtb2RlXG4gICAqIE5vdCBhdmFpbGFibGUgb24gaW5saW5lIHBpY2tlciBvciB3aGVuIHRoZSBwaWNrZXIgZWxlbWVudCBpcyBoaWRkZW5cbiAgICovXG4gIGVudGVyRWRpdE1vZGUoKSB7XG4gICAgaWYgKHRoaXMuaW5saW5lIHx8ICF0aGlzLnBpY2tlci5hY3RpdmUgfHwgdGhpcy5lZGl0TW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcbiAgICB0aGlzLmlucHV0RmllbGQuY2xhc3NMaXN0LmFkZCgnaW4tZWRpdCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4aXQgZnJvbSBlZGl0IG1vZGVcbiAgICogTm90IGF2YWlsYWJsZSBvbiBpbmxpbmUgcGlja2VyXG4gICAqIEBwYXJhbSAge09iamVjdH0gW29wdGlvbnNdIC0gZnVuY3Rpb24gb3B0aW9uc1xuICAgKiAtIHVwZGF0ZToge2Jvb2xlYW59IC0gd2hldGhlciB0byBjYWxsIHVwZGF0ZSgpIGFmdGVyIGV4aXRpbmdcbiAgICogICAgIElmIGZhbHNlLCBpbnB1dCBmaWVsZCBpcyByZXZlcnQgdG8gdGhlIGV4aXN0aW5nIHNlbGVjdGlvblxuICAgKiAgICAgZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIGV4aXRFZGl0TW9kZShvcHRpb25zID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHRoaXMuaW5saW5lIHx8ICF0aGlzLmVkaXRNb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHt1cGRhdGU6IGZhbHNlfSwgb3B0aW9ucyk7XG4gICAgZGVsZXRlIHRoaXMuZWRpdE1vZGU7XG4gICAgdGhpcy5pbnB1dEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoJ2luLWVkaXQnKTtcbiAgICBpZiAob3B0cy51cGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlKG9wdHMpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtsaW1pdFRvUmFuZ2V9IGZyb20gJy4uL2xpYi91dGlscy5qcyc7XG5pbXBvcnQge2FkZE1vbnRocywgYWRkWWVhcnN9IGZyb20gJy4uL2xpYi9kYXRlLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyaWdnZXJEYXRlcGlja2VyRXZlbnQoZGF0ZXBpY2tlciwgdHlwZSkge1xuICBjb25zdCBkZXRhaWwgPSB7XG4gICAgZGF0ZTogZGF0ZXBpY2tlci5nZXREYXRlKCksXG4gICAgdmlld0RhdGU6IG5ldyBEYXRlKGRhdGVwaWNrZXIucGlja2VyLnZpZXdEYXRlKSxcbiAgICB2aWV3SWQ6IGRhdGVwaWNrZXIucGlja2VyLmN1cnJlbnRWaWV3LmlkLFxuICAgIGRhdGVwaWNrZXIsXG4gIH07XG4gIGRhdGVwaWNrZXIuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCh0eXBlLCB7ZGV0YWlsfSkpO1xufVxuXG4vLyBkaXJlY3Rpb246IC0xICh0byBwcmV2aW91cyksIDEgKHRvIG5leHQpXG5leHBvcnQgZnVuY3Rpb24gZ29Ub1ByZXZPck5leHQoZGF0ZXBpY2tlciwgZGlyZWN0aW9uKSB7XG4gIGNvbnN0IHttaW5EYXRlLCBtYXhEYXRlfSA9IGRhdGVwaWNrZXIuY29uZmlnO1xuICBjb25zdCB7Y3VycmVudFZpZXcsIHZpZXdEYXRlfSA9IGRhdGVwaWNrZXIucGlja2VyO1xuICBsZXQgbmV3Vmlld0RhdGU7XG4gIHN3aXRjaCAoY3VycmVudFZpZXcuaWQpIHtcbiAgICBjYXNlIDA6XG4gICAgICBuZXdWaWV3RGF0ZSA9IGFkZE1vbnRocyh2aWV3RGF0ZSwgZGlyZWN0aW9uKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTpcbiAgICAgIG5ld1ZpZXdEYXRlID0gYWRkWWVhcnModmlld0RhdGUsIGRpcmVjdGlvbik7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgbmV3Vmlld0RhdGUgPSBhZGRZZWFycyh2aWV3RGF0ZSwgZGlyZWN0aW9uICogY3VycmVudFZpZXcubmF2U3RlcCk7XG4gIH1cbiAgbmV3Vmlld0RhdGUgPSBsaW1pdFRvUmFuZ2UobmV3Vmlld0RhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBkYXRlcGlja2VyLnBpY2tlci5jaGFuZ2VGb2N1cyhuZXdWaWV3RGF0ZSkucmVuZGVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hWaWV3KGRhdGVwaWNrZXIpIHtcbiAgY29uc3Qgdmlld0lkID0gZGF0ZXBpY2tlci5waWNrZXIuY3VycmVudFZpZXcuaWQ7XG4gIGlmICh2aWV3SWQgPT09IGRhdGVwaWNrZXIuY29uZmlnLm1heFZpZXcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZGF0ZXBpY2tlci5waWNrZXIuY2hhbmdlVmlldyh2aWV3SWQgKyAxKS5yZW5kZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuZm9jdXMoZGF0ZXBpY2tlcikge1xuICBpZiAoZGF0ZXBpY2tlci5jb25maWcudXBkYXRlT25CbHVyKSB7XG4gICAgZGF0ZXBpY2tlci51cGRhdGUoe3JldmVydDogdHJ1ZX0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGVwaWNrZXIucmVmcmVzaCgnaW5wdXQnKTtcbiAgfVxuICBkYXRlcGlja2VyLmhpZGUoKTtcbn1cbiIsImltcG9ydCB7aXNJblJhbmdlfSBmcm9tICcuLi9saWIvdXRpbHMuanMnO1xuaW1wb3J0IHtpc0FjdGl2ZUVsZW1lbnR9IGZyb20gJy4uL2xpYi9kb20uanMnO1xuaW1wb3J0IHthZGREYXlzLCBhZGRNb250aHMsIGFkZFllYXJzLCBzdGFydE9mWWVhclBlcmlvZH0gZnJvbSAnLi4vbGliL2RhdGUuanMnO1xuaW1wb3J0IHtnb1RvUHJldk9yTmV4dCwgc3dpdGNoVmlldywgdW5mb2N1c30gZnJvbSAnLi9mdW5jdGlvbnMuanMnO1xuXG4vLyBGaW5kIHRoZSBjbG9zZXN0IGRhdGUgdGhhdCBkb2Vzbid0IG1lZXQgdGhlIGNvbmRpdGlvbiBmb3IgdW5hdmFpbGFibGUgZGF0ZVxuLy8gUmV0dXJucyB1bmRlZmluZWQgaWYgbm8gYXZhaWxhYmxlIGRhdGUgaXMgZm91bmRcbi8vIGFkZEZuOiBmdW5jdGlvbiB0byBjYWxjdWxhdGUgdGhlIG5leHQgZGF0ZVxuLy8gICAtIGFyZ3M6IHRpbWUgdmFsdWUsIGFtb3VudFxuLy8gaW5jcmVhc2U6IGFtb3VudCB0byBwYXNzIHRvIGFkZEZuXG4vLyB0ZXN0Rm46IGZ1bmN0aW9uIHRvIHRlc3QgdGhlIHVuYXZhaWxhYmxpdHkgb2YgdGhlIGRhdGVcbi8vICAgLSBhcmdzOiB0aW1lIHZhbHVlOyByZXR1bjogdHJ1ZSBpZiB1bmF2YWlsYWJsZVxuZnVuY3Rpb24gZmluZE5leHRBdmFpbGFibGVPbmUoZGF0ZSwgYWRkRm4sIGluY3JlYXNlLCB0ZXN0Rm4sIG1pbiwgbWF4KSB7XG4gIGlmICghaXNJblJhbmdlKGRhdGUsIG1pbiwgbWF4KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodGVzdEZuKGRhdGUpKSB7XG4gICAgY29uc3QgbmV3RGF0ZSA9IGFkZEZuKGRhdGUsIGluY3JlYXNlKTtcbiAgICByZXR1cm4gZmluZE5leHRBdmFpbGFibGVPbmUobmV3RGF0ZSwgYWRkRm4sIGluY3JlYXNlLCB0ZXN0Rm4sIG1pbiwgbWF4KTtcbiAgfVxuICByZXR1cm4gZGF0ZTtcbn1cblxuLy8gZGlyZWN0aW9uOiAtMSAobGVmdC91cCksIDEgKHJpZ2h0L2Rvd24pXG4vLyB2ZXJ0aWNhbDogdHJ1ZSBmb3IgdXAvZG93biwgZmFsc2UgZm9yIGxlZnQvcmlnaHRcbmZ1bmN0aW9uIG1vdmVCeUFycm93S2V5KGRhdGVwaWNrZXIsIGV2LCBkaXJlY3Rpb24sIHZlcnRpY2FsKSB7XG4gIGNvbnN0IHBpY2tlciA9IGRhdGVwaWNrZXIucGlja2VyO1xuICBjb25zdCBjdXJyZW50VmlldyA9IHBpY2tlci5jdXJyZW50VmlldztcbiAgY29uc3Qgc3RlcCA9IGN1cnJlbnRWaWV3LnN0ZXAgfHwgMTtcbiAgbGV0IHZpZXdEYXRlID0gcGlja2VyLnZpZXdEYXRlO1xuICBsZXQgYWRkRm47XG4gIGxldCB0ZXN0Rm47XG4gIHN3aXRjaCAoY3VycmVudFZpZXcuaWQpIHtcbiAgICBjYXNlIDA6XG4gICAgICBpZiAodmVydGljYWwpIHtcbiAgICAgICAgdmlld0RhdGUgPSBhZGREYXlzKHZpZXdEYXRlLCBkaXJlY3Rpb24gKiA3KTtcbiAgICAgIH0gZWxzZSBpZiAoZXYuY3RybEtleSB8fCBldi5tZXRhS2V5KSB7XG4gICAgICAgIHZpZXdEYXRlID0gYWRkWWVhcnModmlld0RhdGUsIGRpcmVjdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2aWV3RGF0ZSA9IGFkZERheXModmlld0RhdGUsIGRpcmVjdGlvbik7XG4gICAgICB9XG4gICAgICBhZGRGbiA9IGFkZERheXM7XG4gICAgICB0ZXN0Rm4gPSAoZGF0ZSkgPT4gY3VycmVudFZpZXcuZGlzYWJsZWQuaW5jbHVkZXMoZGF0ZSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDE6XG4gICAgICB2aWV3RGF0ZSA9IGFkZE1vbnRocyh2aWV3RGF0ZSwgdmVydGljYWwgPyBkaXJlY3Rpb24gKiA0IDogZGlyZWN0aW9uKTtcbiAgICAgIGFkZEZuID0gYWRkTW9udGhzO1xuICAgICAgdGVzdEZuID0gKGRhdGUpID0+IHtcbiAgICAgICAgY29uc3QgZHQgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgY29uc3Qge3llYXIsIGRpc2FibGVkfSA9IGN1cnJlbnRWaWV3O1xuICAgICAgICByZXR1cm4gZHQuZ2V0RnVsbFllYXIoKSA9PT0geWVhciAmJiBkaXNhYmxlZC5pbmNsdWRlcyhkdC5nZXRNb250aCgpKTtcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdmlld0RhdGUgPSBhZGRZZWFycyh2aWV3RGF0ZSwgZGlyZWN0aW9uICogKHZlcnRpY2FsID8gNCA6IDEpICogc3RlcCk7XG4gICAgICBhZGRGbiA9IGFkZFllYXJzO1xuICAgICAgdGVzdEZuID0gZGF0ZSA9PiBjdXJyZW50Vmlldy5kaXNhYmxlZC5pbmNsdWRlcyhzdGFydE9mWWVhclBlcmlvZChkYXRlLCBzdGVwKSk7XG4gIH1cbiAgdmlld0RhdGUgPSBmaW5kTmV4dEF2YWlsYWJsZU9uZShcbiAgICB2aWV3RGF0ZSxcbiAgICBhZGRGbixcbiAgICBkaXJlY3Rpb24gPCAwID8gLXN0ZXAgOiBzdGVwLFxuICAgIHRlc3RGbixcbiAgICBjdXJyZW50Vmlldy5taW5EYXRlLFxuICAgIGN1cnJlbnRWaWV3Lm1heERhdGVcbiAgKTtcbiAgaWYgKHZpZXdEYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICBwaWNrZXIuY2hhbmdlRm9jdXModmlld0RhdGUpLnJlbmRlcigpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbktleWRvd24oZGF0ZXBpY2tlciwgZXYpIHtcbiAgY29uc3Qga2V5ID0gZXYua2V5O1xuICBpZiAoa2V5ID09PSAnVGFiJykge1xuICAgIHVuZm9jdXMoZGF0ZXBpY2tlcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcGlja2VyID0gZGF0ZXBpY2tlci5waWNrZXI7XG4gIGNvbnN0IHtpZCwgaXNNaW5WaWV3fSA9IHBpY2tlci5jdXJyZW50VmlldztcbiAgaWYgKCFwaWNrZXIuYWN0aXZlKSB7XG4gICAgaWYgKGtleSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgIHBpY2tlci5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChrZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgZGF0ZXBpY2tlci51cGRhdGUoKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICBwaWNrZXIuc2hvdygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBlbHNlIGlmIChkYXRlcGlja2VyLmVkaXRNb2RlKSB7XG4gICAgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgZGF0ZXBpY2tlci5leGl0RWRpdE1vZGUoe3VwZGF0ZTogdHJ1ZSwgYXV0b2hpZGU6IGRhdGVwaWNrZXIuY29uZmlnLmF1dG9oaWRlfSk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICBwaWNrZXIuaGlkZSgpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgaWYgKGtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgIGlmIChldi5jdHJsS2V5IHx8IGV2Lm1ldGFLZXkpIHtcbiAgICAgICAgZ29Ub1ByZXZPck5leHQoZGF0ZXBpY2tlciwgLTEpO1xuICAgICAgfSBlbHNlIGlmIChldi5zaGlmdEtleSkge1xuICAgICAgICBkYXRlcGlja2VyLmVudGVyRWRpdE1vZGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW92ZUJ5QXJyb3dLZXkoZGF0ZXBpY2tlciwgZXYsIC0xLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1JpZ2h0Jykge1xuICAgICAgaWYgKGV2LmN0cmxLZXkgfHwgZXYubWV0YUtleSkge1xuICAgICAgICBnb1RvUHJldk9yTmV4dChkYXRlcGlja2VyLCAxKTtcbiAgICAgIH0gZWxzZSBpZiAoZXYuc2hpZnRLZXkpIHtcbiAgICAgICAgZGF0ZXBpY2tlci5lbnRlckVkaXRNb2RlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vdmVCeUFycm93S2V5KGRhdGVwaWNrZXIsIGV2LCAxLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd1VwJykge1xuICAgICAgaWYgKGV2LmN0cmxLZXkgfHwgZXYubWV0YUtleSkge1xuICAgICAgICBzd2l0Y2hWaWV3KGRhdGVwaWNrZXIpO1xuICAgICAgfSBlbHNlIGlmIChldi5zaGlmdEtleSkge1xuICAgICAgICBkYXRlcGlja2VyLmVudGVyRWRpdE1vZGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW92ZUJ5QXJyb3dLZXkoZGF0ZXBpY2tlciwgZXYsIC0xLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgIGlmIChldi5zaGlmdEtleSAmJiAhZXYuY3RybEtleSAmJiAhZXYubWV0YUtleSkge1xuICAgICAgICBkYXRlcGlja2VyLmVudGVyRWRpdE1vZGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbW92ZUJ5QXJyb3dLZXkoZGF0ZXBpY2tlciwgZXYsIDEsIHRydWUpO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBpZiAoaXNNaW5WaWV3KSB7XG4gICAgICAgIGRhdGVwaWNrZXIuc2V0RGF0ZShwaWNrZXIudmlld0RhdGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwaWNrZXIuY2hhbmdlVmlldyhpZCAtIDEpLnJlbmRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoa2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICBwaWNrZXIuaGlkZSgpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAga2V5ID09PSAnQmFja3NwYWNlJ1xuICAgICAgICB8fCBrZXkgPT09ICdEZWxldGUnXG4gICAgICAgIHx8IChrZXkubGVuZ3RoID09PSAxICYmICFldi5jdHJsS2V5ICYmICFldi5tZXRhS2V5KVxuICAgICAgKSB7XG4gICAgICAgIGRhdGVwaWNrZXIuZW50ZXJFZGl0TW9kZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBldi5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25Gb2N1cyhkYXRlcGlja2VyKSB7XG4gIGlmIChkYXRlcGlja2VyLmNvbmZpZy5zaG93T25Gb2N1cyAmJiAhZGF0ZXBpY2tlci5fc2hvd2luZykge1xuICAgIGRhdGVwaWNrZXIuc2hvdygpO1xuICB9XG59XG5cbi8vIGZvciB0aGUgcHJldmVudGlvbiBmb3IgZW50ZXJpbmcgZWRpdCBtb2RlIHdoaWxlIGdldHRpbmcgZm9jdXMgb24gY2xpY2tcbmV4cG9ydCBmdW5jdGlvbiBvbk1vdXNlZG93bihkYXRlcGlja2VyLCBldikge1xuICBjb25zdCBlbCA9IGV2LnRhcmdldDtcbiAgaWYgKGRhdGVwaWNrZXIucGlja2VyLmFjdGl2ZSB8fCBkYXRlcGlja2VyLmNvbmZpZy5zaG93T25DbGljaykge1xuICAgIGVsLl9hY3RpdmUgPSBpc0FjdGl2ZUVsZW1lbnQoZWwpO1xuICAgIGVsLl9jbGlja2luZyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZGVsZXRlIGVsLl9hY3RpdmU7XG4gICAgICBkZWxldGUgZWwuX2NsaWNraW5nO1xuICAgIH0sIDIwMDApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNsaWNrSW5wdXQoZGF0ZXBpY2tlciwgZXYpIHtcbiAgY29uc3QgZWwgPSBldi50YXJnZXQ7XG4gIGlmICghZWwuX2NsaWNraW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNsZWFyVGltZW91dChlbC5fY2xpY2tpbmcpO1xuICBkZWxldGUgZWwuX2NsaWNraW5nO1xuXG4gIGlmIChlbC5fYWN0aXZlKSB7XG4gICAgZGF0ZXBpY2tlci5lbnRlckVkaXRNb2RlKCk7XG4gIH1cbiAgZGVsZXRlIGVsLl9hY3RpdmU7XG5cbiAgaWYgKGRhdGVwaWNrZXIuY29uZmlnLnNob3dPbkNsaWNrKSB7XG4gICAgZGF0ZXBpY2tlci5zaG93KCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uUGFzdGUoZGF0ZXBpY2tlciwgZXYpIHtcbiAgaWYgKGV2LmNsaXBib2FyZERhdGEudHlwZXMuaW5jbHVkZXMoJ3RleHQvcGxhaW4nKSkge1xuICAgIGRhdGVwaWNrZXIuZW50ZXJFZGl0TW9kZSgpO1xuICB9XG59XG4iLCJpbXBvcnQge2lzQWN0aXZlRWxlbWVudH0gZnJvbSAnLi4vbGliL2RvbS5qcyc7XG5pbXBvcnQge2ZpbmRFbGVtZW50SW5FdmVudFBhdGh9IGZyb20gJy4uL2xpYi9ldmVudC5qcyc7XG5pbXBvcnQge3VuZm9jdXN9IGZyb20gJy4vZnVuY3Rpb25zLmpzJztcblxuLy8gZm9yIHRoZSBgZG9jdW1lbnRgIHRvIGRlbGVnYXRlIHRoZSBldmVudHMgZnJvbSBvdXRzaWRlIHRoZSBwaWNrZXIvaW5wdXQgZmllbGRcbmV4cG9ydCBmdW5jdGlvbiBvbkNsaWNrT3V0c2lkZShkYXRlcGlja2VyLCBldikge1xuICBjb25zdCB7ZWxlbWVudCwgcGlja2VyfSA9IGRhdGVwaWNrZXI7XG4gIC8vIGNoZWNrIGJvdGggcGlja2VyJ3MgYW5kIGlucHV0J3MgYWN0aXZlbmVzcyB0byBtYWtlIHVwZGF0ZU9uQmx1ciB3b3JrIGluXG4gIC8vIHRoZSBjYXNlcyB3aGVyZS4uLlxuICAvLyAtIHBpY2tlciBpcyBoaWRkZW4gYnkgRVNDIGtleSBwcmVzcyDihpIgaW5wdXQgc3RheXMgZm9jdXNlZFxuICAvLyAtIGlucHV0IGlzIHVuZm9jdXNlZCBieSBjbG9zaW5nIG1vYmlsZSBrZXlib2FyZCDihpIgcGlrZXIgaXMga2VwdCBzaG93blxuICBpZiAoIXBpY2tlci5hY3RpdmUgJiYgIWlzQWN0aXZlRWxlbWVudChlbGVtZW50KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBwaWNrZXJFbGVtID0gcGlja2VyLmVsZW1lbnQ7XG4gIGlmIChmaW5kRWxlbWVudEluRXZlbnRQYXRoKGV2LCBlbCA9PiBlbCA9PT0gZWxlbWVudCB8fCBlbCA9PT0gcGlja2VyRWxlbSkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdW5mb2N1cyhkYXRlcGlja2VyKTtcbn1cbiIsImltcG9ydCB7dG9kYXksIGFkZE1vbnRocywgYWRkWWVhcnN9IGZyb20gJy4uL2xpYi9kYXRlLmpzJztcbmltcG9ydCB7ZmluZEVsZW1lbnRJbkV2ZW50UGF0aH0gZnJvbSAnLi4vbGliL2V2ZW50LmpzJztcbmltcG9ydCB7Z29Ub1ByZXZPck5leHQsIHN3aXRjaFZpZXd9IGZyb20gJy4vZnVuY3Rpb25zLmpzJztcblxuZnVuY3Rpb24gZ29Ub1NlbGVjdGVkTW9udGhPclllYXIoZGF0ZXBpY2tlciwgc2VsZWN0aW9uKSB7XG4gIGNvbnN0IHBpY2tlciA9IGRhdGVwaWNrZXIucGlja2VyO1xuICBjb25zdCB2aWV3RGF0ZSA9IG5ldyBEYXRlKHBpY2tlci52aWV3RGF0ZSk7XG4gIGNvbnN0IHZpZXdJZCA9IHBpY2tlci5jdXJyZW50Vmlldy5pZDtcbiAgY29uc3QgbmV3RGF0ZSA9IHZpZXdJZCA9PT0gMVxuICAgID8gYWRkTW9udGhzKHZpZXdEYXRlLCBzZWxlY3Rpb24gLSB2aWV3RGF0ZS5nZXRNb250aCgpKVxuICAgIDogYWRkWWVhcnModmlld0RhdGUsIHNlbGVjdGlvbiAtIHZpZXdEYXRlLmdldEZ1bGxZZWFyKCkpO1xuXG4gIHBpY2tlci5jaGFuZ2VGb2N1cyhuZXdEYXRlKS5jaGFuZ2VWaWV3KHZpZXdJZCAtIDEpLnJlbmRlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25DbGlja1RvZGF5QnRuKGRhdGVwaWNrZXIpIHtcbiAgY29uc3QgcGlja2VyID0gZGF0ZXBpY2tlci5waWNrZXI7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gdG9kYXkoKTtcbiAgaWYgKGRhdGVwaWNrZXIuY29uZmlnLnRvZGF5QnRuTW9kZSA9PT0gMSkge1xuICAgIGlmIChkYXRlcGlja2VyLmNvbmZpZy5hdXRvaGlkZSkge1xuICAgICAgZGF0ZXBpY2tlci5zZXREYXRlKGN1cnJlbnREYXRlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGF0ZXBpY2tlci5zZXREYXRlKGN1cnJlbnREYXRlLCB7cmVuZGVyOiBmYWxzZX0pO1xuICAgIHBpY2tlci51cGRhdGUoKTtcbiAgfVxuICBpZiAocGlja2VyLnZpZXdEYXRlICE9PSBjdXJyZW50RGF0ZSkge1xuICAgIHBpY2tlci5jaGFuZ2VGb2N1cyhjdXJyZW50RGF0ZSk7XG4gIH1cbiAgcGlja2VyLmNoYW5nZVZpZXcoMCkucmVuZGVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNsaWNrQ2xlYXJCdG4oZGF0ZXBpY2tlcikge1xuICBkYXRlcGlja2VyLnNldERhdGUoe2NsZWFyOiB0cnVlfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNsaWNrVmlld1N3aXRjaChkYXRlcGlja2VyKSB7XG4gIHN3aXRjaFZpZXcoZGF0ZXBpY2tlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNsaWNrUHJldkJ0bihkYXRlcGlja2VyKSB7XG4gIGdvVG9QcmV2T3JOZXh0KGRhdGVwaWNrZXIsIC0xKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2xpY2tOZXh0QnRuKGRhdGVwaWNrZXIpIHtcbiAgZ29Ub1ByZXZPck5leHQoZGF0ZXBpY2tlciwgMSk7XG59XG5cbi8vIEZvciB0aGUgcGlja2VyJ3MgbWFpbiBibG9jayB0byBkZWxlZ2V0ZSB0aGUgZXZlbnRzIGZyb20gYGRhdGVwaWNrZXItY2VsbGBzXG5leHBvcnQgZnVuY3Rpb24gb25DbGlja1ZpZXcoZGF0ZXBpY2tlciwgZXYpIHtcbiAgY29uc3QgdGFyZ2V0ID0gZmluZEVsZW1lbnRJbkV2ZW50UGF0aChldiwgJy5kYXRlcGlja2VyLWNlbGwnKTtcbiAgaWYgKCF0YXJnZXQgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHtpZCwgaXNNaW5WaWV3fSA9IGRhdGVwaWNrZXIucGlja2VyLmN1cnJlbnRWaWV3O1xuICBpZiAoaXNNaW5WaWV3KSB7XG4gICAgZGF0ZXBpY2tlci5zZXREYXRlKE51bWJlcih0YXJnZXQuZGF0YXNldC5kYXRlKSk7XG4gIH0gZWxzZSBpZiAoaWQgPT09IDEpIHtcbiAgICBnb1RvU2VsZWN0ZWRNb250aE9yWWVhcihkYXRlcGlja2VyLCBOdW1iZXIodGFyZ2V0LmRhdGFzZXQubW9udGgpKTtcbiAgfSBlbHNlIHtcbiAgICBnb1RvU2VsZWN0ZWRNb250aE9yWWVhcihkYXRlcGlja2VyLCBOdW1iZXIodGFyZ2V0LmRhdGFzZXQueWVhcikpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk1vdXNlZG93blBpY2tlcihldikge1xuICBldi5wcmV2ZW50RGVmYXVsdCgpO1xufVxuIiwiLy8gZGVmYXVsdCBsb2NhbGVzXG5leHBvcnQgY29uc3QgbG9jYWxlcyA9IHtcbiAgZW46IHtcbiAgICBkYXlzOiBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXSxcbiAgICBkYXlzU2hvcnQ6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgICBkYXlzTWluOiBbXCJTdVwiLCBcIk1vXCIsIFwiVHVcIiwgXCJXZVwiLCBcIlRoXCIsIFwiRnJcIiwgXCJTYVwiXSxcbiAgICBtb250aHM6IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdLFxuICAgIG1vbnRoc1Nob3J0OiBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl0sXG4gICAgdG9kYXk6IFwiVG9kYXlcIixcbiAgICBjbGVhcjogXCJDbGVhclwiLFxuICAgIHRpdGxlRm9ybWF0OiBcIk1NIHlcIlxuICB9XG59O1xuIiwiaW1wb3J0IHtzdHJpcFRpbWUsIHRvZGF5fSBmcm9tICcuL2RhdGUuanMnO1xuaW1wb3J0IHtsYXN0SXRlbU9mfSBmcm9tICcuL3V0aWxzLmpzJztcblxuLy8gcGF0dGVybiBmb3IgZm9ybWF0IHBhcnRzXG5leHBvcnQgY29uc3QgcmVGb3JtYXRUb2tlbnMgPSAvZGQ/fEREP3xtbT98TU0/fHl5Pyg/Onl5KT8vO1xuLy8gcGF0dGVybiBmb3Igbm9uIGRhdGUgcGFydHNcbmV4cG9ydCBjb25zdCByZU5vbkRhdGVQYXJ0cyA9IC9bXFxzIS0vOi1AWy1gey1+5bm05pyI5pelXSsvO1xuLy8gY2FjaGUgZm9yIHBlcnNlZCBmb3JtYXRzXG5sZXQga25vd25Gb3JtYXRzID0ge307XG4vLyBwYXJzZSBmdW50aW9ucyBmb3IgZGF0ZSBwYXJ0c1xuY29uc3QgcGFyc2VGbnMgPSB7XG4gIHkoZGF0ZSwgeWVhcikge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKS5zZXRGdWxsWWVhcihwYXJzZUludCh5ZWFyLCAxMCkpO1xuICB9LFxuICBtKGRhdGUsIG1vbnRoLCBsb2NhbGUpIHtcbiAgICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgbGV0IG1vbnRoSW5kZXggPSBwYXJzZUludChtb250aCwgMTApIC0gMTtcblxuICAgIGlmIChpc05hTihtb250aEluZGV4KSkge1xuICAgICAgaWYgKCFtb250aCkge1xuICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtb250aE5hbWUgPSBtb250aC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgY29tcGFyZU5hbWVzID0gbmFtZSA9PiBuYW1lLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChtb250aE5hbWUpO1xuICAgICAgLy8gY29tcGFyZSB3aXRoIGJvdGggc2hvcnQgYW5kIGZ1bGwgbmFtZXMgYmVjYXVzZSBzb21lIGxvY2FsZXMgaGF2ZSBwZXJpb2RzXG4gICAgICAvLyBpbiB0aGUgc2hvcnQgbmFtZXMgKG5vdCBlcXVhbCB0byB0aGUgZmlyc3QgWCBsZXR0ZXJzIG9mIHRoZSBmdWxsIG5hbWVzKVxuICAgICAgbW9udGhJbmRleCA9IGxvY2FsZS5tb250aHNTaG9ydC5maW5kSW5kZXgoY29tcGFyZU5hbWVzKTtcbiAgICAgIGlmIChtb250aEluZGV4IDwgMCkge1xuICAgICAgICBtb250aEluZGV4ID0gbG9jYWxlLm1vbnRocy5maW5kSW5kZXgoY29tcGFyZU5hbWVzKTtcbiAgICAgIH1cbiAgICAgIGlmIChtb250aEluZGV4IDwgMCkge1xuICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5ld0RhdGUuc2V0TW9udGgobW9udGhJbmRleCk7XG4gICAgcmV0dXJuIG5ld0RhdGUuZ2V0TW9udGgoKSAhPT0gbm9ybWFsaXplTW9udGgobW9udGhJbmRleClcbiAgICAgID8gbmV3RGF0ZS5zZXREYXRlKDApXG4gICAgICA6IG5ld0RhdGUuZ2V0VGltZSgpO1xuICB9LFxuICBkKGRhdGUsIGRheSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKS5zZXREYXRlKHBhcnNlSW50KGRheSwgMTApKTtcbiAgfSxcbn07XG4vLyBmb3JtYXQgZnVuY3Rpb25zIGZvciBkYXRlIHBhcnRzXG5jb25zdCBmb3JtYXRGbnMgPSB7XG4gIGQoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERhdGUoKTtcbiAgfSxcbiAgZGQoZGF0ZSkge1xuICAgIHJldHVybiBwYWRaZXJvKGRhdGUuZ2V0RGF0ZSgpLCAyKTtcbiAgfSxcbiAgRChkYXRlLCBsb2NhbGUpIHtcbiAgICByZXR1cm4gbG9jYWxlLmRheXNTaG9ydFtkYXRlLmdldERheSgpXTtcbiAgfSxcbiAgREQoZGF0ZSwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5kYXlzW2RhdGUuZ2V0RGF5KCldO1xuICB9LFxuICBtKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgfSxcbiAgbW0oZGF0ZSkge1xuICAgIHJldHVybiBwYWRaZXJvKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpO1xuICB9LFxuICBNKGRhdGUsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUubW9udGhzU2hvcnRbZGF0ZS5nZXRNb250aCgpXTtcbiAgfSxcbiAgTU0oZGF0ZSwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5tb250aHNbZGF0ZS5nZXRNb250aCgpXTtcbiAgfSxcbiAgeShkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgfSxcbiAgeXkoZGF0ZSkge1xuICAgIHJldHVybiBwYWRaZXJvKGRhdGUuZ2V0RnVsbFllYXIoKSwgMikuc2xpY2UoLTIpO1xuICB9LFxuICB5eXl5KGRhdGUpIHtcbiAgICByZXR1cm4gcGFkWmVybyhkYXRlLmdldEZ1bGxZZWFyKCksIDQpO1xuICB9LFxufTtcblxuLy8gZ2V0IG1vbnRoIGluZGV4IGluIG5vcm1hbCByYW5nZSAoMCAtIDExKSBmcm9tIGFueSBudW1iZXJcbmZ1bmN0aW9uIG5vcm1hbGl6ZU1vbnRoKG1vbnRoSW5kZXgpIHtcbiAgcmV0dXJuIG1vbnRoSW5kZXggPiAtMSA/IG1vbnRoSW5kZXggJSAxMiA6IG5vcm1hbGl6ZU1vbnRoKG1vbnRoSW5kZXggKyAxMik7XG59XG5cbmZ1bmN0aW9uIHBhZFplcm8obnVtLCBsZW5ndGgpIHtcbiAgcmV0dXJuIG51bS50b1N0cmluZygpLnBhZFN0YXJ0KGxlbmd0aCwgJzAnKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VGb3JtYXRTdHJpbmcoZm9ybWF0KSB7XG4gIGlmICh0eXBlb2YgZm9ybWF0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSBmb3JtYXQuXCIpO1xuICB9XG4gIGlmIChmb3JtYXQgaW4ga25vd25Gb3JtYXRzKSB7XG4gICAgcmV0dXJuIGtub3duRm9ybWF0c1tmb3JtYXRdO1xuICB9XG5cbiAgLy8gc3ByaXQgdGhlIGZvcm1hdCBzdHJpbmcgaW50byBwYXJ0cyBhbmQgc2VwcmF0b3JzXG4gIGNvbnN0IHNlcGFyYXRvcnMgPSBmb3JtYXQuc3BsaXQocmVGb3JtYXRUb2tlbnMpO1xuICBjb25zdCBwYXJ0cyA9IGZvcm1hdC5tYXRjaChuZXcgUmVnRXhwKHJlRm9ybWF0VG9rZW5zLCAnZycpKTtcbiAgaWYgKHNlcGFyYXRvcnMubGVuZ3RoID09PSAwIHx8ICFwYXJ0cykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSBmb3JtYXQuXCIpO1xuICB9XG5cbiAgLy8gY29sbGVjdCBmb3JtYXQgZnVuY3Rpb25zIHVzZWQgaW4gdGhlIGZvcm1hdFxuICBjb25zdCBwYXJ0Rm9ybWF0dGVycyA9IHBhcnRzLm1hcCh0b2tlbiA9PiBmb3JtYXRGbnNbdG9rZW5dKTtcblxuICAvLyBjb2xsZWN0IHBhcnNlIGZ1bmN0aW9uIGtleXMgdXNlZCBpbiB0aGUgZm9ybWF0XG4gIC8vIGl0ZXJhdGUgb3ZlciBwYXJzZUZucycga2V5cyBpbiBvcmRlciB0byBrZWVwIHRoZSBvcmRlciBvZiB0aGUga2V5cy5cbiAgY29uc3QgcGFydFBhcnNlcktleXMgPSBPYmplY3Qua2V5cyhwYXJzZUZucykucmVkdWNlKChrZXlzLCBrZXkpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IHBhcnRzLmZpbmQocGFydCA9PiBwYXJ0WzBdICE9PSAnRCcgJiYgcGFydFswXS50b0xvd2VyQ2FzZSgpID09PSBrZXkpO1xuICAgIGlmICh0b2tlbikge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIGtub3duRm9ybWF0c1tmb3JtYXRdID0ge1xuICAgIHBhcnNlcihkYXRlU3RyLCBsb2NhbGUpIHtcbiAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGRhdGVTdHIuc3BsaXQocmVOb25EYXRlUGFydHMpLnJlZHVjZSgoZHRQYXJ0cywgcGFydCwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKHBhcnQubGVuZ3RoID4gMCAmJiBwYXJ0c1tpbmRleF0pIHtcbiAgICAgICAgICBjb25zdCB0b2tlbiA9IHBhcnRzW2luZGV4XVswXTtcbiAgICAgICAgICBpZiAodG9rZW4gPT09ICdNJykge1xuICAgICAgICAgICAgZHRQYXJ0cy5tID0gcGFydDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuICE9PSAnRCcpIHtcbiAgICAgICAgICAgIGR0UGFydHNbdG9rZW5dID0gcGFydDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGR0UGFydHM7XG4gICAgICB9LCB7fSk7XG5cbiAgICAgIC8vIGl0ZXJhdGUgb3ZlciBwYXJ0UGFyc2Vya2V5cyBzbyB0aGF0IHRoZSBwYXJzaW5nIGlzIG1hZGUgaW4gdGhlIG9kZXJcbiAgICAgIC8vIG9mIHllYXIsIG1vbnRoIGFuZCBkYXkgdG8gcHJldmVudCB0aGUgZGF5IHBhcnNlciBmcm9tIGNvcnJlY3RpbmcgbGFzdFxuICAgICAgLy8gZGF5IG9mIG1vbnRoIHdyb25nbHlcbiAgICAgIHJldHVybiBwYXJ0UGFyc2VyS2V5cy5yZWR1Y2UoKG9yaWdEYXRlLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IHBhcnNlRm5zW2tleV0ob3JpZ0RhdGUsIGRhdGVQYXJ0c1trZXldLCBsb2NhbGUpO1xuICAgICAgICAvLyBpbmdub3JlIHRoZSBwYXJ0IGZhaWxlZCB0byBwYXJzZVxuICAgICAgICByZXR1cm4gaXNOYU4obmV3RGF0ZSkgPyBvcmlnRGF0ZSA6IG5ld0RhdGU7XG4gICAgICB9LCB0b2RheSgpKTtcbiAgICB9LFxuICAgIGZvcm1hdHRlcihkYXRlLCBsb2NhbGUpIHtcbiAgICAgIGxldCBkYXRlU3RyID0gcGFydEZvcm1hdHRlcnMucmVkdWNlKChzdHIsIGZuLCBpbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gc3RyICs9IGAke3NlcGFyYXRvcnNbaW5kZXhdfSR7Zm4oZGF0ZSwgbG9jYWxlKX1gO1xuICAgICAgfSwgJycpO1xuICAgICAgLy8gc2VwYXJhdG9ycycgbGVuZ3RoIGlzIGFsd2F5cyBwYXJ0cycgbGVuZ3RoICsgMSxcbiAgICAgIHJldHVybiBkYXRlU3RyICs9IGxhc3RJdGVtT2Yoc2VwYXJhdG9ycyk7XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGF0ZShkYXRlU3RyLCBmb3JtYXQsIGxvY2FsZSkge1xuICBpZiAoZGF0ZVN0ciBpbnN0YW5jZW9mIERhdGUgfHwgdHlwZW9mIGRhdGVTdHIgPT09ICdudW1iZXInKSB7XG4gICAgY29uc3QgZGF0ZSA9IHN0cmlwVGltZShkYXRlU3RyKTtcbiAgICByZXR1cm4gaXNOYU4oZGF0ZSkgPyB1bmRlZmluZWQgOiBkYXRlO1xuICB9XG4gIGlmICghZGF0ZVN0cikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKGRhdGVTdHIgPT09ICd0b2RheScpIHtcbiAgICByZXR1cm4gdG9kYXkoKTtcbiAgfVxuXG4gIGlmIChmb3JtYXQgJiYgZm9ybWF0LnRvVmFsdWUpIHtcbiAgICBjb25zdCBkYXRlID0gZm9ybWF0LnRvVmFsdWUoZGF0ZVN0ciwgZm9ybWF0LCBsb2NhbGUpO1xuICAgIHJldHVybiBpc05hTihkYXRlKSA/IHVuZGVmaW5lZCA6IHN0cmlwVGltZShkYXRlKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZUZvcm1hdFN0cmluZyhmb3JtYXQpLnBhcnNlcihkYXRlU3RyLCBsb2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQsIGxvY2FsZSkge1xuICBpZiAoaXNOYU4oZGF0ZSkgfHwgKCFkYXRlICYmIGRhdGUgIT09IDApKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgY29uc3QgZGF0ZU9iaiA9IHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJyA/IG5ldyBEYXRlKGRhdGUpIDogZGF0ZTtcblxuICBpZiAoZm9ybWF0LnRvRGlzcGxheSkge1xuICAgIHJldHVybiBmb3JtYXQudG9EaXNwbGF5KGRhdGVPYmosIGZvcm1hdCwgbG9jYWxlKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZUZvcm1hdFN0cmluZyhmb3JtYXQpLmZvcm1hdHRlcihkYXRlT2JqLCBsb2NhbGUpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHN0cmlwVGltZSh0aW1lVmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWVWYWx1ZSkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2RheSgpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG59XG5cbi8vIEdldCB0aGUgdGltZSB2YWx1ZSBvZiB0aGUgc3RhcnQgb2YgZ2l2ZW4gZGF0ZSBvciB5ZWFyLCBtb250aCBhbmQgZGF5XG5leHBvcnQgZnVuY3Rpb24gZGF0ZVZhbHVlKC4uLmFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiB0b2RheSgpO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBzdHJpcFRpbWUoYXJnc1swXSk7XG4gIH1cblxuICAvLyB1c2Ugc2V0RnVsbFllYXIoKSB0byBrZWVwIDItZGlnaXQgeWVhciBmcm9tIGJlaW5nIG1hcHBlZCB0byAxOTAwLTE5OTlcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKDApO1xuICBuZXdEYXRlLnNldEZ1bGxZZWFyKC4uLmFyZ3MpO1xuICByZXR1cm4gbmV3RGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZERheXMoZGF0ZSwgYW1vdW50KSB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgcmV0dXJuIG5ld0RhdGUuc2V0RGF0ZShuZXdEYXRlLmdldERhdGUoKSArIGFtb3VudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRXZWVrcyhkYXRlLCBhbW91bnQpIHtcbiAgcmV0dXJuIGFkZERheXMoZGF0ZSwgYW1vdW50ICogNyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRNb250aHMoZGF0ZSwgYW1vdW50KSB7XG4gIC8vIElmIHRoZSBkYXkgb2YgdGhlIGRhdGUgaXMgbm90IGluIHRoZSBuZXcgbW9udGgsIHRoZSBsYXN0IGRheSBvZiB0aGUgbmV3XG4gIC8vIG1vbnRoIHdpbGwgYmUgcmV0dXJuZWQuIGUuZy4gSmFuIDMxICsgMSBtb250aCDihpIgRmViIDI4IChub3QgTWFyIDAzKVxuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gIGNvbnN0IG1vbnRoc1RvU2V0ID0gbmV3RGF0ZS5nZXRNb250aCgpICsgYW1vdW50O1xuICBsZXQgZXhwZWN0ZWRNb250aCA9IG1vbnRoc1RvU2V0ICUgMTI7XG4gIGlmIChleHBlY3RlZE1vbnRoIDwgMCkge1xuICAgIGV4cGVjdGVkTW9udGggKz0gMTI7XG4gIH1cblxuICBjb25zdCB0aW1lID0gbmV3RGF0ZS5zZXRNb250aChtb250aHNUb1NldCk7XG4gIHJldHVybiBuZXdEYXRlLmdldE1vbnRoKCkgIT09IGV4cGVjdGVkTW9udGggPyBuZXdEYXRlLnNldERhdGUoMCkgOiB0aW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkWWVhcnMoZGF0ZSwgYW1vdW50KSB7XG4gIC8vIElmIHRoZSBkYXRlIGlzIEZlYiAyOSBhbmQgdGhlIG5ldyB5ZWFyIGlzIG5vdCBhIGxlYXAgeWVhciwgRmViIDI4IG9mIHRoZVxuICAvLyBuZXcgeWVhciB3aWxsIGJlIHJldHVybmVkLlxuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gIGNvbnN0IGV4cGVjdGVkTW9udGggPSBuZXdEYXRlLmdldE1vbnRoKCk7XG4gIGNvbnN0IHRpbWUgPSBuZXdEYXRlLnNldEZ1bGxZZWFyKG5ld0RhdGUuZ2V0RnVsbFllYXIoKSArIGFtb3VudCk7XG4gIHJldHVybiBleHBlY3RlZE1vbnRoID09PSAxICYmIG5ld0RhdGUuZ2V0TW9udGgoKSA9PT0gMiA/IG5ld0RhdGUuc2V0RGF0ZSgwKSA6IHRpbWU7XG59XG5cbi8vIENhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgYmV0dHdlbiAyIGRheXMgb2YgdGhlIHdlZWtcbmZ1bmN0aW9uIGRheURpZmYoZGF5LCBmcm9tKSB7XG4gIHJldHVybiAoZGF5IC0gZnJvbSArIDcpICUgNztcbn1cblxuLy8gR2V0IHRoZSBkYXRlIG9mIHRoZSBzcGVjaWZpZWQgZGF5IG9mIHRoZSB3ZWVrIG9mIGdpdmVuIGJhc2UgZGF0ZVxuZXhwb3J0IGZ1bmN0aW9uIGRheU9mVGhlV2Vla09mKGJhc2VEYXRlLCBkYXlPZldlZWssIHdlZWtTdGFydCA9IDApIHtcbiAgY29uc3QgYmFzZURheSA9IG5ldyBEYXRlKGJhc2VEYXRlKS5nZXREYXkoKTtcbiAgcmV0dXJuIGFkZERheXMoYmFzZURhdGUsIGRheURpZmYoZGF5T2ZXZWVrLCB3ZWVrU3RhcnQpIC0gZGF5RGlmZihiYXNlRGF5LCB3ZWVrU3RhcnQpKTtcbn1cblxuLy8gR2V0IHRoZSBJU08gd2VlayBvZiBhIGRhdGVcbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrKGRhdGUpIHtcbiAgLy8gc3RhcnQgb2YgSVNPIHdlZWsgaXMgTW9uZGF5XG4gIGNvbnN0IHRodU9mVGhlV2VlayA9IGRheU9mVGhlV2Vla09mKGRhdGUsIDQsIDEpO1xuICAvLyAxc3Qgd2VlayA9PSB0aGUgd2VlayB3aGVyZSB0aGUgNHRoIG9mIEphbnVhcnkgaXMgaW5cbiAgY29uc3QgZmlyc3RUaHUgPSBkYXlPZlRoZVdlZWtPZihuZXcgRGF0ZSh0aHVPZlRoZVdlZWspLnNldE1vbnRoKDAsIDQpLCA0LCAxKTtcbiAgcmV0dXJuIE1hdGgucm91bmQoKHRodU9mVGhlV2VlayAtIGZpcnN0VGh1KSAvIDYwNDgwMDAwMCkgKyAxO1xufVxuXG4vLyBHZXQgdGhlIHN0YXJ0IHllYXIgb2YgdGhlIHBlcmlvZCBvZiB5ZWFycyB0aGF0IGluY2x1ZGVzIGdpdmVuIGRhdGVcbi8vIHllYXJzOiBsZW5ndGggb2YgdGhlIHllYXIgcGVyaW9kXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZlllYXJQZXJpb2QoZGF0ZSwgeWVhcnMpIHtcbiAgLyogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9ZZWFyX3plcm8jSVNPXzg2MDEgKi9cbiAgY29uc3QgeWVhciA9IG5ldyBEYXRlKGRhdGUpLmdldEZ1bGxZZWFyKCk7XG4gIHJldHVybiBNYXRoLmZsb29yKHllYXIgLyB5ZWFycykgKiB5ZWFycztcbn1cblxuLy8gQ29udmVydCBkYXRlIHRvIHRoZSBmaXJzdC9sYXN0IGRhdGUgb2YgdGhlIG1vbnRoL3llYXIgb2YgdGhlIGRhdGVcbmV4cG9ydCBmdW5jdGlvbiByZWd1bGFyaXplRGF0ZShkYXRlLCB0aW1lU3BhbiwgdXNlTGFzdERhdGUpIHtcbiAgaWYgKHRpbWVTcGFuICE9PSAxICYmIHRpbWVTcGFuICE9PSAyKSB7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICBpZiAodGltZVNwYW4gPT09IDEpIHtcbiAgICB1c2VMYXN0RGF0ZVxuICAgICAgPyBuZXdEYXRlLnNldE1vbnRoKG5ld0RhdGUuZ2V0TW9udGgoKSArIDEsIDApXG4gICAgICA6IG5ld0RhdGUuc2V0RGF0ZSgxKTtcbiAgfSBlbHNlIHtcbiAgICB1c2VMYXN0RGF0ZVxuICAgICAgPyBuZXdEYXRlLnNldEZ1bGxZZWFyKG5ld0RhdGUuZ2V0RnVsbFllYXIoKSArIDEsIDAsIDApXG4gICAgICA6IG5ld0RhdGUuc2V0TW9udGgoMCwgMSk7XG4gIH1cbiAgcmV0dXJuIG5ld0RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG59XG4iLCJjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuICByZXR1cm4gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGh0bWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50KGVsKSB7XG4gIHJldHVybiBlbC5wYXJlbnRFbGVtZW50XG4gICAgfHwgKGVsLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBTaGFkb3dSb290ID8gZWwucGFyZW50Tm9kZS5ob3N0IDogdW5kZWZpbmVkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWN0aXZlRWxlbWVudChlbCkge1xuICByZXR1cm4gZWwuZ2V0Um9vdE5vZGUoKS5hY3RpdmVFbGVtZW50ID09PSBlbDtcbn1cblxuLy8gZXF1aXZhbGVudCB0byBqUXVlcnkncyA6dmlzYmxlXG5leHBvcnQgZnVuY3Rpb24gaXNWaXNpYmxlKGVsKSB7XG4gIHJldHVybiAhIShlbC5vZmZzZXRXaWR0aCB8fCBlbC5vZmZzZXRIZWlnaHQgfHwgZWwuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZUVsZW1lbnQoZWwpIHtcbiAgaWYgKGVsLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBiYWNrIHVwIHRoZSBleGlzdGluZyBkaXNwbGF5IHNldHRpbmcgaW4gZGF0YS1zdHlsZS1kaXNwbGF5XG4gIGlmIChlbC5zdHlsZS5kaXNwbGF5KSB7XG4gICAgZWwuZGF0YXNldC5zdHlsZURpc3BsYXkgPSBlbC5zdHlsZS5kaXNwbGF5O1xuICB9XG4gIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RWxlbWVudChlbCkge1xuICBpZiAoZWwuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlbC5kYXRhc2V0LnN0eWxlRGlzcGxheSkge1xuICAgIC8vIHJlc3RvcmUgYmFja2VkLXVwIGRpc3BheSBwcm9wZXJ0eVxuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBlbC5kYXRhc2V0LnN0eWxlRGlzcGxheTtcbiAgICBkZWxldGUgZWwuZGF0YXNldC5zdHlsZURpc3BsYXk7XG4gIH0gZWxzZSB7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbXB0eUNoaWxkTm9kZXMoZWwpIHtcbiAgaWYgKGVsLmZpcnN0Q2hpbGQpIHtcbiAgICBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKTtcbiAgICBlbXB0eUNoaWxkTm9kZXMoZWwpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlQ2hpbGROb2RlcyhlbCwgbmV3Q2hpbGROb2Rlcykge1xuICBlbXB0eUNoaWxkTm9kZXMoZWwpO1xuICBpZiAobmV3Q2hpbGROb2RlcyBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICBlbC5hcHBlbmRDaGlsZChuZXdDaGlsZE5vZGVzKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbmV3Q2hpbGROb2RlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBlbC5hcHBlbmRDaGlsZChwYXJzZUhUTUwobmV3Q2hpbGROb2RlcykpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdDaGlsZE5vZGVzLmZvckVhY2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICBuZXdDaGlsZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH0pO1xuICB9XG59XG4iLCJjb25zdCBsaXN0ZW5lclJlZ2lzdHJ5ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHthZGRFdmVudExpc3RlbmVyLCByZW1vdmVFdmVudExpc3RlbmVyfSA9IEV2ZW50VGFyZ2V0LnByb3RvdHlwZTtcblxuLy8gUmVnaXN0ZXIgZXZlbnQgbGlzdGVuZXJzIHRvIGEga2V5IG9iamVjdFxuLy8gbGlzdGVuZXJzOiBhcnJheSBvZiBsaXN0ZW5lciBkZWZpbml0aW9ucztcbi8vICAgLSBlYWNoIGRlZmluaXRpb24gbXVzdCBiZSBhIGZsYXQgYXJyYXkgb2YgZXZlbnQgdGFyZ2V0IGFuZCB0aGUgYXJndW1lbnRzXG4vLyAgICAgdXNlZCB0byBjYWxsIGFkZEV2ZW50TGlzdGVuZXIoKSBvbiB0aGUgdGFyZ2V0XG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJMaXN0ZW5lcnMoa2V5T2JqLCBsaXN0ZW5lcnMpIHtcbiAgbGV0IHJlZ2lzdGVyZWQgPSBsaXN0ZW5lclJlZ2lzdHJ5LmdldChrZXlPYmopO1xuICBpZiAoIXJlZ2lzdGVyZWQpIHtcbiAgICByZWdpc3RlcmVkID0gW107XG4gICAgbGlzdGVuZXJSZWdpc3RyeS5zZXQoa2V5T2JqLCByZWdpc3RlcmVkKTtcbiAgfVxuICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICBhZGRFdmVudExpc3RlbmVyLmNhbGwoLi4ubGlzdGVuZXIpO1xuICAgIHJlZ2lzdGVyZWQucHVzaChsaXN0ZW5lcik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5yZWdpc3Rlckxpc3RlbmVycyhrZXlPYmopIHtcbiAgbGV0IGxpc3RlbmVycyA9IGxpc3RlbmVyUmVnaXN0cnkuZ2V0KGtleU9iaik7XG4gIGlmICghbGlzdGVuZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIuY2FsbCguLi5saXN0ZW5lcik7XG4gIH0pO1xuICBsaXN0ZW5lclJlZ2lzdHJ5LmRlbGV0ZShrZXlPYmopO1xufVxuXG4vLyBFdmVudC5jb21wb3NlZFBhdGgoKSBwb2x5ZmlsbCBmb3IgRWRnZVxuLy8gYmFzZWQgb24gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20va2xlaW5mcmV1bmQvZTk3ODdkNzM3NzZjMGUzNzUwZGNmY2RjODlmMTAwZWNcbmlmICghRXZlbnQucHJvdG90eXBlLmNvbXBvc2VkUGF0aCkge1xuICBjb25zdCBnZXRDb21wb3NlZFBhdGggPSAobm9kZSwgcGF0aCA9IFtdKSA9PiB7XG4gICAgcGF0aC5wdXNoKG5vZGUpO1xuXG4gICAgbGV0IHBhcmVudDtcbiAgICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfSBlbHNlIGlmIChub2RlLmhvc3QpIHsgLy8gU2hhZG93Um9vdFxuICAgICAgcGFyZW50ID0gbm9kZS5ob3N0O1xuICAgIH0gZWxzZSBpZiAobm9kZS5kZWZhdWx0VmlldykgeyAgLy8gRG9jdW1lbnRcbiAgICAgIHBhcmVudCA9IG5vZGUuZGVmYXVsdFZpZXc7XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnQgPyBnZXRDb21wb3NlZFBhdGgocGFyZW50LCBwYXRoKSA6IHBhdGg7XG4gIH07XG5cbiAgRXZlbnQucHJvdG90eXBlLmNvbXBvc2VkUGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2V0Q29tcG9zZWRQYXRoKHRoaXMudGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZmluZEZyb21QYXRoKHBhdGgsIGNyaXRlcmlhLCBjdXJyZW50VGFyZ2V0KSB7XG4gIGNvbnN0IFtub2RlLCAuLi5yZXN0XSA9IHBhdGg7XG4gIGlmIChjcml0ZXJpYShub2RlKSkge1xuICAgIHJldHVybiBub2RlO1xuICB9XG4gIGlmIChub2RlID09PSBjdXJyZW50VGFyZ2V0IHx8IG5vZGUudGFnTmFtZSA9PT0gJ0hUTUwnIHx8IHJlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gc3RvcCB3aGVuIHJlYWNoaW5nIGN1cnJlbnRUYXJnZXQgb3IgPGh0bWw+XG4gICAgcmV0dXJuO1xuICB9XG4gIHJldHVybiBmaW5kRnJvbVBhdGgocmVzdCwgY3JpdGVyaWEsIGN1cnJlbnRUYXJnZXQpO1xufVxuXG4vLyBTZWFyY2ggZm9yIHRoZSBhY3R1YWwgdGFyZ2V0IG9mIGEgZGVsZWdhdGVkIGV2ZW50XG5leHBvcnQgZnVuY3Rpb24gZmluZEVsZW1lbnRJbkV2ZW50UGF0aChldiwgc2VsZWN0b3IpIHtcbiAgY29uc3QgY3JpdGVyaWEgPSB0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbidcbiAgICA/IHNlbGVjdG9yXG4gICAgOiBlbCA9PiBlbCBpbnN0YW5jZW9mIEVsZW1lbnQgJiYgZWwubWF0Y2hlcyhzZWxlY3Rvcik7XG4gIHJldHVybiBmaW5kRnJvbVBhdGgoZXYuY29tcG9zZWRQYXRoKCksIGNyaXRlcmlhLCBldi5jdXJyZW50VGFyZ2V0KTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBoYXNQcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGFzdEl0ZW1PZihhcnIpIHtcbiAgcmV0dXJuIGFyclthcnIubGVuZ3RoIC0gMV07XG59XG5cbi8vIHB1c2ggb25seSB0aGUgaXRlbXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheVxuZXhwb3J0IGZ1bmN0aW9uIHB1c2hVbmlxdWUoYXJyLCAuLi5pdGVtcykge1xuICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaWYgKGFyci5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhcnIucHVzaChpdGVtKTtcbiAgfSk7XG4gIHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb0FycmF5KHN0ciwgc2VwYXJhdG9yKSB7XG4gIC8vIGNvbnZlcnQgZW1wdHkgc3RyaW5nIHRvIGFuIGVtcHR5IGFycmF5XG4gIHJldHVybiBzdHIgPyBzdHIuc3BsaXQoc2VwYXJhdG9yKSA6IFtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJblJhbmdlKHRlc3RWYWwsIG1pbiwgbWF4KSB7XG4gIGNvbnN0IG1pbk9LID0gbWluID09PSB1bmRlZmluZWQgfHwgdGVzdFZhbCA+PSBtaW47XG4gIGNvbnN0IG1heE9LID0gbWF4ID09PSB1bmRlZmluZWQgfHwgdGVzdFZhbCA8PSBtYXg7XG4gIHJldHVybiBtaW5PSyAmJiBtYXhPSztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbWl0VG9SYW5nZSh2YWwsIG1pbiwgbWF4KSB7XG4gIGlmICh2YWwgPCBtaW4pIHtcbiAgICByZXR1cm4gbWluO1xuICB9XG4gIGlmICh2YWwgPiBtYXgpIHtcbiAgICByZXR1cm4gbWF4O1xuICB9XG4gIHJldHVybiB2YWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYWdSZXBlYXQodGFnTmFtZSwgcmVwZWF0LCBhdHRyaWJ1dGVzID0ge30sIGluZGV4ID0gMCwgaHRtbCA9ICcnKSB7XG4gIGNvbnN0IG9wZW5UYWdTcmMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5yZWR1Y2UoKHNyYywgYXR0cikgPT4ge1xuICAgIGxldCB2YWwgPSBhdHRyaWJ1dGVzW2F0dHJdO1xuICAgIGlmICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YWwgPSB2YWwoaW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7c3JjfSAke2F0dHJ9PVwiJHt2YWx9XCJgO1xuICB9LCB0YWdOYW1lKTtcbiAgaHRtbCArPSBgPCR7b3BlblRhZ1NyY30+PC8ke3RhZ05hbWV9PmA7XG5cbiAgY29uc3QgbmV4dCA9IGluZGV4ICsgMTtcbiAgcmV0dXJuIG5leHQgPCByZXBlYXRcbiAgICA/IGNyZWF0ZVRhZ1JlcGVhdCh0YWdOYW1lLCByZXBlYXQsIGF0dHJpYnV0ZXMsIG5leHQsIGh0bWwpXG4gICAgOiBodG1sO1xufVxuXG4vLyBSZW1vdmUgdGhlIHNwYWNpbmcgc3Vycm91bmRpbmcgdGFncyBmb3IgSFRNTCBwYXJzZXIgbm90IHRvIGNyZWF0ZSB0ZXh0IG5vZGVzXG4vLyBiZWZvcmUvYWZ0ZXIgZWxlbWVudHNcbmV4cG9ydCBmdW5jdGlvbiBvcHRpbWl6ZVRlbXBsYXRlSFRNTChodG1sKSB7XG4gIHJldHVybiBodG1sLnJlcGxhY2UoLz5cXHMrL2csICc+JykucmVwbGFjZSgvXFxzKzwvLCAnPCcpO1xufVxuIiwiLy8gY29uZmlnIG9wdGlvbnMgdXBkYXRhYmxlIGJ5IHNldE9wdGlvbnMoKSBhbmQgdGhlaXIgZGVmYXVsdCB2YWx1ZXNcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICBhdXRvaGlkZTogZmFsc2UsXG4gIGJlZm9yZVNob3dEYXk6IG51bGwsXG4gIGJlZm9yZVNob3dEZWNhZGU6IG51bGwsXG4gIGJlZm9yZVNob3dNb250aDogbnVsbCxcbiAgYmVmb3JlU2hvd1llYXI6IG51bGwsXG4gIGNhbGVuZGFyV2Vla3M6IGZhbHNlLFxuICBjbGVhckJ0bjogZmFsc2UsXG4gIGRhdGVEZWxpbWl0ZXI6ICcsJyxcbiAgZGF0ZXNEaXNhYmxlZDogW10sXG4gIGRheXNPZldlZWtEaXNhYmxlZDogW10sXG4gIGRheXNPZldlZWtIaWdobGlnaHRlZDogW10sXG4gIGRlZmF1bHRWaWV3RGF0ZTogdW5kZWZpbmVkLCAvLyBwbGFjZWhvbGRlciwgZGVmYXVsdHMgdG8gdG9kYXkoKSBieSB0aGUgcHJvZ3JhbVxuICBkaXNhYmxlVG91Y2hLZXlib2FyZDogZmFsc2UsXG4gIGZvcm1hdDogJ21tL2RkL3l5eXknLFxuICBsYW5ndWFnZTogJ2VuJyxcbiAgbWF4RGF0ZTogbnVsbCxcbiAgbWF4TnVtYmVyT2ZEYXRlczogMSxcbiAgbWF4VmlldzogMyxcbiAgbWluRGF0ZTogbnVsbCxcbiAgbmV4dEFycm93OiAnwrsnLFxuICBvcmllbnRhdGlvbjogJ2F1dG8nLFxuICBwaWNrTGV2ZWw6IDAsXG4gIHByZXZBcnJvdzogJ8KrJyxcbiAgc2hvd0RheXNPZldlZWs6IHRydWUsXG4gIHNob3dPbkNsaWNrOiB0cnVlLFxuICBzaG93T25Gb2N1czogdHJ1ZSxcbiAgc3RhcnRWaWV3OiAwLFxuICB0aXRsZTogJycsXG4gIHRvZGF5QnRuOiBmYWxzZSxcbiAgdG9kYXlCdG5Nb2RlOiAwLFxuICB0b2RheUhpZ2hsaWdodDogZmFsc2UsXG4gIHVwZGF0ZU9uQmx1cjogdHJ1ZSxcbiAgd2Vla1N0YXJ0OiAwLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdE9wdGlvbnM7XG4iLCJpbXBvcnQge2hhc1Byb3BlcnR5LCBwdXNoVW5pcXVlfSBmcm9tICcuLi9saWIvdXRpbHMuanMnO1xuaW1wb3J0IHtkYXRlVmFsdWUsIHJlZ3VsYXJpemVEYXRlfSBmcm9tICcuLi9saWIvZGF0ZS5qcyc7XG5pbXBvcnQge3JlRm9ybWF0VG9rZW5zLCBwYXJzZURhdGV9IGZyb20gJy4uL2xpYi9kYXRlLWZvcm1hdC5qcyc7XG5pbXBvcnQge3BhcnNlSFRNTH0gZnJvbSAnLi4vbGliL2RvbS5qcyc7XG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9kZWZhdWx0T3B0aW9ucy5qcyc7XG5cbmNvbnN0IHtcbiAgbGFuZ3VhZ2U6IGRlZmF1bHRMYW5nLFxuICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gIHdlZWtTdGFydDogZGVmYXVsdFdlZWtTdGFydCxcbn0gPSBkZWZhdWx0T3B0aW9ucztcblxuLy8gUmVkdWNlciBmdW5jdGlvbiB0byBmaWx0ZXIgb3V0IGludmFsaWQgZGF5LW9mLXdlZWsgZnJvbSB0aGUgaW5wdXRcbmZ1bmN0aW9uIHNhbml0aXplRE9XKGRvdywgZGF5KSB7XG4gIHJldHVybiBkb3cubGVuZ3RoIDwgNiAmJiBkYXkgPj0gMCAmJiBkYXkgPCA3XG4gICAgPyBwdXNoVW5pcXVlKGRvdywgZGF5KVxuICAgIDogZG93O1xufVxuXG5mdW5jdGlvbiBjYWxjRW5kT2ZXZWVrKHN0YXJ0T2ZXZWVrKSB7XG4gIHJldHVybiAoc3RhcnRPZldlZWsgKyA2KSAlIDc7XG59XG5cbi8vIHZhbGlkYXRlIGlucHV0IGRhdGUuIGlmIGludmFsaWQsIGZhbGxiYWNrIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZVxuZnVuY3Rpb24gdmFsaWRhdGVEYXRlKHZhbHVlLCBmb3JtYXQsIGxvY2FsZSwgb3JpZ1ZhbHVlKSB7XG4gIGNvbnN0IGRhdGUgPSBwYXJzZURhdGUodmFsdWUsIGZvcm1hdCwgbG9jYWxlKTtcbiAgcmV0dXJuIGRhdGUgIT09IHVuZGVmaW5lZCA/IGRhdGUgOiBvcmlnVmFsdWU7XG59XG5cbi8vIFZhbGlkYXRlIHZpZXdJZC4gaWYgaW52YWxpZCwgZmFsbGJhY2sgdG8gdGhlIG9yaWdpbmFsIHZhbHVlXG5mdW5jdGlvbiB2YWxpZGF0ZVZpZXdJZCh2YWx1ZSwgb3JpZ1ZhbHVlLCBtYXggPSAzKSB7XG4gIGNvbnN0IHZpZXdJZCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gIHJldHVybiB2aWV3SWQgPj0gMCAmJiB2aWV3SWQgPD0gbWF4ID8gdmlld0lkIDogb3JpZ1ZhbHVlO1xufVxuXG4vLyBDcmVhdGUgRGF0ZXBpY2tlciBjb25maWd1cmF0aW9uIHRvIHNldFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvY2Vzc09wdGlvbnMob3B0aW9ucywgZGF0ZXBpY2tlcikge1xuICBjb25zdCBpbk9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgY29uc3QgY29uZmlnID0ge307XG4gIGNvbnN0IGxvY2FsZXMgPSBkYXRlcGlja2VyLmNvbnN0cnVjdG9yLmxvY2FsZXM7XG4gIGNvbnN0IHJhbmdlU2lkZUluZGV4ID0gZGF0ZXBpY2tlci5yYW5nZVNpZGVJbmRleDtcbiAgbGV0IHtcbiAgICBmb3JtYXQsXG4gICAgbGFuZ3VhZ2UsXG4gICAgbG9jYWxlLFxuICAgIG1heERhdGUsXG4gICAgbWF4VmlldyxcbiAgICBtaW5EYXRlLFxuICAgIHBpY2tMZXZlbCxcbiAgICBzdGFydFZpZXcsXG4gICAgd2Vla1N0YXJ0LFxuICB9ID0gZGF0ZXBpY2tlci5jb25maWcgfHwge307XG5cbiAgaWYgKGluT3B0cy5sYW5ndWFnZSkge1xuICAgIGxldCBsYW5nO1xuICAgIGlmIChpbk9wdHMubGFuZ3VhZ2UgIT09IGxhbmd1YWdlKSB7XG4gICAgICBpZiAobG9jYWxlc1tpbk9wdHMubGFuZ3VhZ2VdKSB7XG4gICAgICAgIGxhbmcgPSBpbk9wdHMubGFuZ3VhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDaGVjayBpZiBsYW5nYXVnZSArIHJlZ2lvbiB0YWcgY2FuIGZhbGxiYWNrIHRvIHRoZSBvbmUgd2l0aG91dFxuICAgICAgICAvLyByZWdpb24gKGUuZy4gZnItQ0Eg4oaSIGZyKVxuICAgICAgICBsYW5nID0gaW5PcHRzLmxhbmd1YWdlLnNwbGl0KCctJylbMF07XG4gICAgICAgIGlmIChsb2NhbGVzW2xhbmddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsYW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlIGluT3B0cy5sYW5ndWFnZTtcbiAgICBpZiAobGFuZykge1xuICAgICAgbGFuZ3VhZ2UgPSBjb25maWcubGFuZ3VhZ2UgPSBsYW5nO1xuXG4gICAgICAvLyB1cGRhdGUgbG9jYWxlIGFzIHdlbGwgd2hlbiB1cGRhdGluZyBsYW5ndWFnZVxuICAgICAgY29uc3Qgb3JpZ0xvY2FsZSA9IGxvY2FsZSB8fCBsb2NhbGVzW2RlZmF1bHRMYW5nXTtcbiAgICAgIC8vIHVzZSBkZWZhdWx0IGxhbmd1YWdlJ3MgcHJvcGVydGllcyBmb3IgdGhlIGZhbGxiYWNrXG4gICAgICBsb2NhbGUgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgICAgICB3ZWVrU3RhcnQ6IGRlZmF1bHRXZWVrU3RhcnRcbiAgICAgIH0sIGxvY2FsZXNbZGVmYXVsdExhbmddKTtcbiAgICAgIGlmIChsYW5ndWFnZSAhPT0gZGVmYXVsdExhbmcpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihsb2NhbGUsIGxvY2FsZXNbbGFuZ3VhZ2VdKTtcbiAgICAgIH1cbiAgICAgIGNvbmZpZy5sb2NhbGUgPSBsb2NhbGU7XG4gICAgICAvLyBpZiBmb3JtYXQgYW5kL29yIHdlZWtTdGFydCBhcmUgdGhlIHNhbWUgYXMgb2xkIGxvY2FsZSdzIGRlZmF1bHRzLFxuICAgICAgLy8gdXBkYXRlIHRoZW0gdG8gbmV3IGxvY2FsZSdzIGRlZmF1bHRzXG4gICAgICBpZiAoZm9ybWF0ID09PSBvcmlnTG9jYWxlLmZvcm1hdCkge1xuICAgICAgICBmb3JtYXQgPSBjb25maWcuZm9ybWF0ID0gbG9jYWxlLmZvcm1hdDtcbiAgICAgIH1cbiAgICAgIGlmICh3ZWVrU3RhcnQgPT09IG9yaWdMb2NhbGUud2Vla1N0YXJ0KSB7XG4gICAgICAgIHdlZWtTdGFydCA9IGNvbmZpZy53ZWVrU3RhcnQgPSBsb2NhbGUud2Vla1N0YXJ0O1xuICAgICAgICBjb25maWcud2Vla0VuZCA9IGNhbGNFbmRPZldlZWsobG9jYWxlLndlZWtTdGFydCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGluT3B0cy5mb3JtYXQpIHtcbiAgICBjb25zdCBoYXNUb0Rpc3BsYXkgPSB0eXBlb2YgaW5PcHRzLmZvcm1hdC50b0Rpc3BsYXkgPT09ICdmdW5jdGlvbic7XG4gICAgY29uc3QgaGFzVG9WYWx1ZSA9IHR5cGVvZiBpbk9wdHMuZm9ybWF0LnRvVmFsdWUgPT09ICdmdW5jdGlvbic7XG4gICAgY29uc3QgdmFsaWRGb3JtYXRTdHJpbmcgPSByZUZvcm1hdFRva2Vucy50ZXN0KGluT3B0cy5mb3JtYXQpO1xuICAgIGlmICgoaGFzVG9EaXNwbGF5ICYmIGhhc1RvVmFsdWUpIHx8IHZhbGlkRm9ybWF0U3RyaW5nKSB7XG4gICAgICBmb3JtYXQgPSBjb25maWcuZm9ybWF0ID0gaW5PcHRzLmZvcm1hdDtcbiAgICB9XG4gICAgZGVsZXRlIGluT3B0cy5mb3JtYXQ7XG4gIH1cblxuICAvLyoqKiBwaWNrIGxldmVsICoqKi8vXG4gIGxldCBuZXdQaWNrTGV2ZWwgPSBwaWNrTGV2ZWw7XG4gIGlmIChpbk9wdHMucGlja0xldmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICBuZXdQaWNrTGV2ZWwgPSB2YWxpZGF0ZVZpZXdJZChpbk9wdHMucGlja0xldmVsLCAyKTtcbiAgICBkZWxldGUgaW5PcHRzLnBpY2tMZXZlbDtcbiAgfVxuICBpZiAobmV3UGlja0xldmVsICE9PSBwaWNrTGV2ZWwpIHtcbiAgICBpZiAobmV3UGlja0xldmVsID4gcGlja0xldmVsKSB7XG4gICAgICAvLyBjb21wbGVtZW50IGN1cnJlbnQgbWluRGF0ZS9tYWREYXRlIHNvIHRoYXQgdGhlIGV4aXN0aW5nIHJhbmdlIHdpbGwgYmVcbiAgICAgIC8vIGV4cGFuZGVkIHRvIGZpdCB0aGUgbmV3IGxldmVsIGxhdGVyXG4gICAgICBpZiAoaW5PcHRzLm1pbkRhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpbk9wdHMubWluRGF0ZSA9IG1pbkRhdGU7XG4gICAgICB9XG4gICAgICBpZiAoaW5PcHRzLm1heERhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpbk9wdHMubWF4RGF0ZSA9IG1heERhdGU7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNvbXBsZW1lbnQgZGF0ZXNEaXNhYmxlZCBzbyB0aGF0IGl0IHdpbGwgYmUgcmVzZXQgbGF0ZXJcbiAgICBpZiAoIWluT3B0cy5kYXRlc0Rpc2FibGVkKSB7XG4gICAgICBpbk9wdHMuZGF0ZXNEaXNhYmxlZCA9IFtdO1xuICAgIH1cbiAgICBwaWNrTGV2ZWwgPSBjb25maWcucGlja0xldmVsID0gbmV3UGlja0xldmVsO1xuICB9XG5cbiAgLy8qKiogZGF0ZXMgKioqLy9cbiAgLy8gd2hpbGUgbWluIGFuZCBtYXhEYXRlIGZvciBcIm5vIGxpbWl0XCIgaW4gdGhlIG9wdGlvbnMgYXJlIGJldHRlciB0byBiZSBudWxsXG4gIC8vIChlc3BlY2lhbGx5IHdoZW4gdXBkYXRpbmcpLCB0aGUgb25lcyBpbiB0aGUgY29uZmlnIGhhdmUgdG8gYmUgdW5kZWZpbmVkXG4gIC8vIGJlY2F1c2UgbnVsbCBpcyB0cmVhdGVkIGFzIDAgKD0gdW5peCBlcG9jaCkgd2hlbiBjb21wYXJpbmcgd2l0aCB0aW1lIHZhbHVlXG4gIGxldCBtaW5EdCA9IG1pbkRhdGU7XG4gIGxldCBtYXhEdCA9IG1heERhdGU7XG4gIGlmIChpbk9wdHMubWluRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgZGVmYXVsdE1pbkR0ID0gZGF0ZVZhbHVlKDAsIDAsIDEpO1xuICAgIG1pbkR0ID0gaW5PcHRzLm1pbkRhdGUgPT09IG51bGxcbiAgICAgID8gZGVmYXVsdE1pbkR0ICAvLyBzZXQgMDAwMC0wMS0wMSB0byBwcmV2ZW50IG5lZ2F0aXZlIHZhbHVlcyBmb3IgeWVhclxuICAgICAgOiB2YWxpZGF0ZURhdGUoaW5PcHRzLm1pbkRhdGUsIGZvcm1hdCwgbG9jYWxlLCBtaW5EdCk7XG4gICAgaWYgKG1pbkR0ICE9PSBkZWZhdWx0TWluRHQpIHtcbiAgICAgIG1pbkR0ID0gcmVndWxhcml6ZURhdGUobWluRHQsIHBpY2tMZXZlbCwgZmFsc2UpO1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLm1pbkRhdGU7XG4gIH1cbiAgaWYgKGluT3B0cy5tYXhEYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICBtYXhEdCA9IGluT3B0cy5tYXhEYXRlID09PSBudWxsXG4gICAgICA/IHVuZGVmaW5lZFxuICAgICAgOiB2YWxpZGF0ZURhdGUoaW5PcHRzLm1heERhdGUsIGZvcm1hdCwgbG9jYWxlLCBtYXhEdCk7XG4gICAgaWYgKG1heER0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG1heER0ID0gcmVndWxhcml6ZURhdGUobWF4RHQsIHBpY2tMZXZlbCwgdHJ1ZSk7XG4gICAgfVxuICAgIGRlbGV0ZSBpbk9wdHMubWF4RGF0ZTtcbiAgfVxuICBpZiAobWF4RHQgPCBtaW5EdCkge1xuICAgIG1pbkRhdGUgPSBjb25maWcubWluRGF0ZSA9IG1heER0O1xuICAgIG1heERhdGUgPSBjb25maWcubWF4RGF0ZSA9IG1pbkR0O1xuICB9IGVsc2Uge1xuICAgIGlmIChtaW5EYXRlICE9PSBtaW5EdCkge1xuICAgICAgbWluRGF0ZSA9IGNvbmZpZy5taW5EYXRlID0gbWluRHQ7XG4gICAgfVxuICAgIGlmIChtYXhEYXRlICE9PSBtYXhEdCkge1xuICAgICAgbWF4RGF0ZSA9IGNvbmZpZy5tYXhEYXRlID0gbWF4RHQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKGluT3B0cy5kYXRlc0Rpc2FibGVkKSB7XG4gICAgY29uZmlnLmRhdGVzRGlzYWJsZWQgPSBpbk9wdHMuZGF0ZXNEaXNhYmxlZC5yZWR1Y2UoKGRhdGVzLCBkdCkgPT4ge1xuICAgICAgY29uc3QgZGF0ZSA9IHBhcnNlRGF0ZShkdCwgZm9ybWF0LCBsb2NhbGUpO1xuICAgICAgcmV0dXJuIGRhdGUgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHB1c2hVbmlxdWUoZGF0ZXMsIHJlZ3VsYXJpemVEYXRlKGRhdGUsIHBpY2tMZXZlbCwgcmFuZ2VTaWRlSW5kZXgpKVxuICAgICAgICA6IGRhdGVzO1xuICAgIH0sIFtdKTtcbiAgICBkZWxldGUgaW5PcHRzLmRhdGVzRGlzYWJsZWQ7XG4gIH1cbiAgaWYgKGluT3B0cy5kZWZhdWx0Vmlld0RhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IHZpZXdEYXRlID0gcGFyc2VEYXRlKGluT3B0cy5kZWZhdWx0Vmlld0RhdGUsIGZvcm1hdCwgbG9jYWxlKTtcbiAgICBpZiAodmlld0RhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uZmlnLmRlZmF1bHRWaWV3RGF0ZSA9IHZpZXdEYXRlO1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLmRlZmF1bHRWaWV3RGF0ZTtcbiAgfVxuXG4gIC8vKioqIGRheXMgb2Ygd2VlayAqKiovL1xuICBpZiAoaW5PcHRzLndlZWtTdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3Qgd2tTdGFydCA9IE51bWJlcihpbk9wdHMud2Vla1N0YXJ0KSAlIDc7XG4gICAgaWYgKCFpc05hTih3a1N0YXJ0KSkge1xuICAgICAgd2Vla1N0YXJ0ID0gY29uZmlnLndlZWtTdGFydCA9IHdrU3RhcnQ7XG4gICAgICBjb25maWcud2Vla0VuZCA9IGNhbGNFbmRPZldlZWsod2tTdGFydCk7XG4gICAgfVxuICAgIGRlbGV0ZSBpbk9wdHMud2Vla1N0YXJ0O1xuICB9XG4gIGlmIChpbk9wdHMuZGF5c09mV2Vla0Rpc2FibGVkKSB7XG4gICAgY29uZmlnLmRheXNPZldlZWtEaXNhYmxlZCA9IGluT3B0cy5kYXlzT2ZXZWVrRGlzYWJsZWQucmVkdWNlKHNhbml0aXplRE9XLCBbXSk7XG4gICAgZGVsZXRlIGluT3B0cy5kYXlzT2ZXZWVrRGlzYWJsZWQ7XG4gIH1cbiAgaWYgKGluT3B0cy5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQpIHtcbiAgICBjb25maWcuZGF5c09mV2Vla0hpZ2hsaWdodGVkID0gaW5PcHRzLmRheXNPZldlZWtIaWdobGlnaHRlZC5yZWR1Y2Uoc2FuaXRpemVET1csIFtdKTtcbiAgICBkZWxldGUgaW5PcHRzLmRheXNPZldlZWtIaWdobGlnaHRlZDtcbiAgfVxuXG4gIC8vKioqIG11bHRpIGRhdGUgKioqLy9cbiAgaWYgKGluT3B0cy5tYXhOdW1iZXJPZkRhdGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBtYXhOdW1iZXJPZkRhdGVzID0gcGFyc2VJbnQoaW5PcHRzLm1heE51bWJlck9mRGF0ZXMsIDEwKTtcbiAgICBpZiAobWF4TnVtYmVyT2ZEYXRlcyA+PSAwKSB7XG4gICAgICBjb25maWcubWF4TnVtYmVyT2ZEYXRlcyA9IG1heE51bWJlck9mRGF0ZXM7XG4gICAgICBjb25maWcubXVsdGlkYXRlID0gbWF4TnVtYmVyT2ZEYXRlcyAhPT0gMTtcbiAgICB9XG4gICAgZGVsZXRlIGluT3B0cy5tYXhOdW1iZXJPZkRhdGVzO1xuICB9XG4gIGlmIChpbk9wdHMuZGF0ZURlbGltaXRlcikge1xuICAgIGNvbmZpZy5kYXRlRGVsaW1pdGVyID0gU3RyaW5nKGluT3B0cy5kYXRlRGVsaW1pdGVyKTtcbiAgICBkZWxldGUgaW5PcHRzLmRhdGVEZWxpbWl0ZXI7XG4gIH1cblxuICAvLyoqKiB2aWV3ICoqKi8vXG4gIGxldCBuZXdNYXhWaWV3ID0gbWF4VmlldztcbiAgaWYgKGluT3B0cy5tYXhWaWV3ICE9PSB1bmRlZmluZWQpIHtcbiAgICBuZXdNYXhWaWV3ID0gdmFsaWRhdGVWaWV3SWQoaW5PcHRzLm1heFZpZXcsIG1heFZpZXcpO1xuICAgIGRlbGV0ZSBpbk9wdHMubWF4VmlldztcbiAgfVxuICAvLyBlbnN1cmUgbWF4IHZpZXcgPj0gcGljayBsZXZlbFxuICBuZXdNYXhWaWV3ID0gcGlja0xldmVsID4gbmV3TWF4VmlldyA/IHBpY2tMZXZlbCA6IG5ld01heFZpZXc7XG4gIGlmIChuZXdNYXhWaWV3ICE9PSBtYXhWaWV3KSB7XG4gICAgbWF4VmlldyA9IGNvbmZpZy5tYXhWaWV3ID0gbmV3TWF4VmlldztcbiAgfVxuXG4gIGxldCBuZXdTdGFydFZpZXcgPSBzdGFydFZpZXc7XG4gIGlmIChpbk9wdHMuc3RhcnRWaWV3ICE9PSB1bmRlZmluZWQpIHtcbiAgICBuZXdTdGFydFZpZXcgPSB2YWxpZGF0ZVZpZXdJZChpbk9wdHMuc3RhcnRWaWV3LCBuZXdTdGFydFZpZXcpO1xuICAgIGRlbGV0ZSBpbk9wdHMuc3RhcnRWaWV3O1xuICB9XG4gIC8vIGVuc3VyZSBwaWNrIGxldmVsIDw9IHN0YXJ0IHZpZXcgPD0gbWF4IHZpZXdcbiAgaWYgKG5ld1N0YXJ0VmlldyA8IHBpY2tMZXZlbCkge1xuICAgIG5ld1N0YXJ0VmlldyA9IHBpY2tMZXZlbDtcbiAgfSBlbHNlIGlmIChuZXdTdGFydFZpZXcgPiBtYXhWaWV3KSB7XG4gICAgbmV3U3RhcnRWaWV3ID0gbWF4VmlldztcbiAgfVxuICBpZiAobmV3U3RhcnRWaWV3ICE9PSBzdGFydFZpZXcpIHtcbiAgICBjb25maWcuc3RhcnRWaWV3ID0gbmV3U3RhcnRWaWV3O1xuICB9XG5cbiAgLy8qKiogdGVtcGxhdGUgKioqLy9cbiAgaWYgKGluT3B0cy5wcmV2QXJyb3cpIHtcbiAgICBjb25zdCBwcmV2QXJyb3cgPSBwYXJzZUhUTUwoaW5PcHRzLnByZXZBcnJvdyk7XG4gICAgaWYgKHByZXZBcnJvdy5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbmZpZy5wcmV2QXJyb3cgPSBwcmV2QXJyb3cuY2hpbGROb2RlcztcbiAgICB9XG4gICAgZGVsZXRlIGluT3B0cy5wcmV2QXJyb3c7XG4gIH1cbiAgaWYgKGluT3B0cy5uZXh0QXJyb3cpIHtcbiAgICBjb25zdCBuZXh0QXJyb3cgPSBwYXJzZUhUTUwoaW5PcHRzLm5leHRBcnJvdyk7XG4gICAgaWYgKG5leHRBcnJvdy5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbmZpZy5uZXh0QXJyb3cgPSBuZXh0QXJyb3cuY2hpbGROb2RlcztcbiAgICB9XG4gICAgZGVsZXRlIGluT3B0cy5uZXh0QXJyb3c7XG4gIH1cblxuICAvLyoqKiBtaXNjICoqKi8vXG4gIGlmIChpbk9wdHMuZGlzYWJsZVRvdWNoS2V5Ym9hcmQgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbmZpZy5kaXNhYmxlVG91Y2hLZXlib2FyZCA9ICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50ICYmICEhaW5PcHRzLmRpc2FibGVUb3VjaEtleWJvYXJkO1xuICAgIGRlbGV0ZSBpbk9wdHMuZGlzYWJsZVRvdWNoS2V5Ym9hcmQ7XG4gIH1cbiAgaWYgKGluT3B0cy5vcmllbnRhdGlvbikge1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gaW5PcHRzLm9yaWVudGF0aW9uLnRvTG93ZXJDYXNlKCkuc3BsaXQoL1xccysvZyk7XG4gICAgY29uZmlnLm9yaWVudGF0aW9uID0ge1xuICAgICAgeDogb3JpZW50YXRpb24uZmluZCh4ID0+ICh4ID09PSAnbGVmdCcgfHwgeCA9PT0gJ3JpZ2h0JykpIHx8ICdhdXRvJyxcbiAgICAgIHk6IG9yaWVudGF0aW9uLmZpbmQoeSA9PiAoeSA9PT0gJ3RvcCcgfHwgeSA9PT0gJ2JvdHRvbScpKSB8fCAnYXV0bycsXG4gICAgfTtcbiAgICBkZWxldGUgaW5PcHRzLm9yaWVudGF0aW9uO1xuICB9XG4gIGlmIChpbk9wdHMudG9kYXlCdG5Nb2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICBzd2l0Y2goaW5PcHRzLnRvZGF5QnRuTW9kZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgY2FzZSAxOlxuICAgICAgICBjb25maWcudG9kYXlCdG5Nb2RlID0gaW5PcHRzLnRvZGF5QnRuTW9kZTtcbiAgICB9XG4gICAgZGVsZXRlIGluT3B0cy50b2RheUJ0bk1vZGU7XG4gIH1cblxuICAvLyoqKiBjb3B5IHRoZSByZXN0ICoqKi8vXG4gIE9iamVjdC5rZXlzKGluT3B0cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKGluT3B0c1trZXldICE9PSB1bmRlZmluZWQgJiYgaGFzUHJvcGVydHkoZGVmYXVsdE9wdGlvbnMsIGtleSkpIHtcbiAgICAgIGNvbmZpZ1trZXldID0gaW5PcHRzW2tleV07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuIiwiaW1wb3J0IHtoYXNQcm9wZXJ0eSwgbGFzdEl0ZW1PZiwgaXNJblJhbmdlLCBsaW1pdFRvUmFuZ2V9IGZyb20gJy4uL2xpYi91dGlscy5qcyc7XG5pbXBvcnQge3RvZGF5fSBmcm9tICcuLi9saWIvZGF0ZS5qcyc7XG5pbXBvcnQge3BhcnNlSFRNTCwgZ2V0UGFyZW50LCBzaG93RWxlbWVudCwgaGlkZUVsZW1lbnQsIGVtcHR5Q2hpbGROb2Rlc30gZnJvbSAnLi4vbGliL2RvbS5qcyc7XG5pbXBvcnQge3JlZ2lzdGVyTGlzdGVuZXJzfSBmcm9tICcuLi9saWIvZXZlbnQuanMnO1xuaW1wb3J0IHBpY2tlclRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGVzL3BpY2tlclRlbXBsYXRlLmpzJztcbmltcG9ydCBEYXlzVmlldyBmcm9tICcuL3ZpZXdzL0RheXNWaWV3LmpzJztcbmltcG9ydCBNb250aHNWaWV3IGZyb20gJy4vdmlld3MvTW9udGhzVmlldy5qcyc7XG5pbXBvcnQgWWVhcnNWaWV3IGZyb20gJy4vdmlld3MvWWVhcnNWaWV3LmpzJztcbmltcG9ydCB7dHJpZ2dlckRhdGVwaWNrZXJFdmVudH0gZnJvbSAnLi4vZXZlbnRzL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQge1xuICBvbkNsaWNrVG9kYXlCdG4sXG4gIG9uQ2xpY2tDbGVhckJ0bixcbiAgb25DbGlja1ZpZXdTd2l0Y2gsXG4gIG9uQ2xpY2tQcmV2QnRuLFxuICBvbkNsaWNrTmV4dEJ0bixcbiAgb25DbGlja1ZpZXcsXG4gIG9uTW91c2Vkb3duUGlja2VyLFxufSBmcm9tICcuLi9ldmVudHMvcGlja2VyTGlzdGVuZXJzLmpzJztcblxuY29uc3Qgb3JpZW50Q2xhc3NlcyA9IFsnbGVmdCcsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJ10ucmVkdWNlKChvYmosIGtleSkgPT4ge1xuICBvYmpba2V5XSA9IGBkYXRlcGlja2VyLW9yaWVudC0ke2tleX1gO1xuICByZXR1cm4gb2JqO1xufSwge30pO1xuY29uc3QgdG9QeCA9IG51bSA9PiBudW0gPyBgJHtudW19cHhgIDogbnVtO1xuXG5mdW5jdGlvbiBwcm9jZXNzUGlja2VyT3B0aW9ucyhwaWNrZXIsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMudGl0bGUgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChvcHRpb25zLnRpdGxlKSB7XG4gICAgICBwaWNrZXIuY29udHJvbHMudGl0bGUudGV4dENvbnRlbnQgPSBvcHRpb25zLnRpdGxlO1xuICAgICAgc2hvd0VsZW1lbnQocGlja2VyLmNvbnRyb2xzLnRpdGxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGlja2VyLmNvbnRyb2xzLnRpdGxlLnRleHRDb250ZW50ID0gJyc7XG4gICAgICBoaWRlRWxlbWVudChwaWNrZXIuY29udHJvbHMudGl0bGUpO1xuICAgIH1cbiAgfVxuICBpZiAob3B0aW9ucy5wcmV2QXJyb3cpIHtcbiAgICBjb25zdCBwcmV2QnRuID0gcGlja2VyLmNvbnRyb2xzLnByZXZCdG47XG4gICAgZW1wdHlDaGlsZE5vZGVzKHByZXZCdG4pO1xuICAgIG9wdGlvbnMucHJldkFycm93LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHByZXZCdG4uYXBwZW5kQ2hpbGQobm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIH0pO1xuICB9XG4gIGlmIChvcHRpb25zLm5leHRBcnJvdykge1xuICAgIGNvbnN0IG5leHRCdG4gPSBwaWNrZXIuY29udHJvbHMubmV4dEJ0bjtcbiAgICBlbXB0eUNoaWxkTm9kZXMobmV4dEJ0bik7XG4gICAgb3B0aW9ucy5uZXh0QXJyb3cuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgbmV4dEJ0bi5hcHBlbmRDaGlsZChub2RlLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMubG9jYWxlKSB7XG4gICAgcGlja2VyLmNvbnRyb2xzLnRvZGF5QnRuLnRleHRDb250ZW50ID0gb3B0aW9ucy5sb2NhbGUudG9kYXk7XG4gICAgcGlja2VyLmNvbnRyb2xzLmNsZWFyQnRuLnRleHRDb250ZW50ID0gb3B0aW9ucy5sb2NhbGUuY2xlYXI7XG4gIH1cbiAgaWYgKG9wdGlvbnMudG9kYXlCdG4gIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChvcHRpb25zLnRvZGF5QnRuKSB7XG4gICAgICBzaG93RWxlbWVudChwaWNrZXIuY29udHJvbHMudG9kYXlCdG4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlRWxlbWVudChwaWNrZXIuY29udHJvbHMudG9kYXlCdG4pO1xuICAgIH1cbiAgfVxuICBpZiAoaGFzUHJvcGVydHkob3B0aW9ucywgJ21pbkRhdGUnKSB8fCBoYXNQcm9wZXJ0eShvcHRpb25zLCAnbWF4RGF0ZScpKSB7XG4gICAgY29uc3Qge21pbkRhdGUsIG1heERhdGV9ID0gcGlja2VyLmRhdGVwaWNrZXIuY29uZmlnO1xuICAgIHBpY2tlci5jb250cm9scy50b2RheUJ0bi5kaXNhYmxlZCA9ICFpc0luUmFuZ2UodG9kYXkoKSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuY2xlYXJCdG4gIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChvcHRpb25zLmNsZWFyQnRuKSB7XG4gICAgICBzaG93RWxlbWVudChwaWNrZXIuY29udHJvbHMuY2xlYXJCdG4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlRWxlbWVudChwaWNrZXIuY29udHJvbHMuY2xlYXJCdG4pO1xuICAgIH1cbiAgfVxufVxuXG4vLyBDb21wdXRlIHZpZXcgZGF0ZSB0byByZXNldCwgd2hpY2ggd2lsbCBiZS4uLlxuLy8gLSB0aGUgbGFzdCBpdGVtIG9mIHRoZSBzZWxlY3RlZCBkYXRlcyBvciBkZWZhdWx0Vmlld0RhdGUgaWYgbm8gc2VsZWN0aW9uXG4vLyAtIGxpbWl0dGVkIHRvIG1pbkRhdGUgb3IgbWF4RGF0ZSBpZiBpdCBleGNlZWRzIHRoZSByYW5nZVxuZnVuY3Rpb24gY29tcHV0ZVJlc2V0Vmlld0RhdGUoZGF0ZXBpY2tlcikge1xuICBjb25zdCB7ZGF0ZXMsIGNvbmZpZ30gPSBkYXRlcGlja2VyO1xuICBjb25zdCB2aWV3RGF0ZSA9IGRhdGVzLmxlbmd0aCA+IDAgPyBsYXN0SXRlbU9mKGRhdGVzKSA6IGNvbmZpZy5kZWZhdWx0Vmlld0RhdGU7XG4gIHJldHVybiBsaW1pdFRvUmFuZ2Uodmlld0RhdGUsIGNvbmZpZy5taW5EYXRlLCBjb25maWcubWF4RGF0ZSk7XG59XG5cbi8vIENoYW5nZSBjdXJyZW50IHZpZXcncyB2aWV3IGRhdGVcbmZ1bmN0aW9uIHNldFZpZXdEYXRlKHBpY2tlciwgbmV3RGF0ZSkge1xuICBjb25zdCBvbGRWaWV3RGF0ZSA9IG5ldyBEYXRlKHBpY2tlci52aWV3RGF0ZSk7XG4gIGNvbnN0IG5ld1ZpZXdEYXRlID0gbmV3IERhdGUobmV3RGF0ZSk7XG4gIGNvbnN0IHtpZCwgeWVhciwgZmlyc3QsIGxhc3R9ID0gcGlja2VyLmN1cnJlbnRWaWV3O1xuICBjb25zdCB2aWV3WWVhciA9IG5ld1ZpZXdEYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgcGlja2VyLnZpZXdEYXRlID0gbmV3RGF0ZTtcbiAgaWYgKHZpZXdZZWFyICE9PSBvbGRWaWV3RGF0ZS5nZXRGdWxsWWVhcigpKSB7XG4gICAgdHJpZ2dlckRhdGVwaWNrZXJFdmVudChwaWNrZXIuZGF0ZXBpY2tlciwgJ2NoYW5nZVllYXInKTtcbiAgfVxuICBpZiAobmV3Vmlld0RhdGUuZ2V0TW9udGgoKSAhPT0gb2xkVmlld0RhdGUuZ2V0TW9udGgoKSkge1xuICAgIHRyaWdnZXJEYXRlcGlja2VyRXZlbnQocGlja2VyLmRhdGVwaWNrZXIsICdjaGFuZ2VNb250aCcpO1xuICB9XG5cbiAgLy8gcmV0dXJuIHdoZXRoZXIgdGhlIG5ldyBkYXRlIGlzIGluIGRpZmZlcmVudCBwZXJpb2Qgb24gdGltZSBmcm9tIHRoZSBvbmVcbiAgLy8gZGlzcGxheWVkIGluIHRoZSBjdXJyZW50IHZpZXdcbiAgLy8gd2hlbiB0cnVlLCB0aGUgdmlldyBuZWVkcyB0byBiZSByZS1yZW5kZXJlZCBvbiB0aGUgbmV4dCBVSSByZWZyZXNoLlxuICBzd2l0Y2ggKGlkKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIG5ld0RhdGUgPCBmaXJzdCB8fCBuZXdEYXRlID4gbGFzdDtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gdmlld1llYXIgIT09IHllYXI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB2aWV3WWVhciA8IGZpcnN0IHx8IHZpZXdZZWFyID4gbGFzdDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUZXh0RGlyZWN0aW9uKGVsKSB7XG4gIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkuZGlyZWN0aW9uO1xufVxuXG4vLyBmaW5kIHRoZSBjbG9zZXQgc2Nyb2xsYWJsZSBhbmNlc3RvciBlbGVtbnQgdW5kZXIgdGhlIGJvZHlcbmZ1bmN0aW9uIGZpbmRTY3JvbGxQYXJlbnRzKGVsKSB7XG4gIGNvbnN0IHBhcmVudCA9IGdldFBhcmVudChlbCk7XG4gIGlmIChwYXJlbnQgPT09IGRvY3VtZW50LmJvZHkgfHwgIXBhcmVudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGNoZWNraW5nIG92ZXJmbG93IG9ubHkgaXMgZW5vdWdoIGJlY2F1c2UgY29tcHV0ZWQgb3ZlcmZsb3cgY2Fubm90IGJlXG4gIC8vIHZpc2libGUgb3IgYSBjb21iaW5hdGlvbiBvZiB2aXNpYmxlIGFuZCBvdGhlciB3aGVuIGVpdGhlciBheGlzIGlzIHNldFxuICAvLyB0byBvdGhlciB0aGFuIHZpc2libGUuXG4gIC8vIChTZXR0aW5nIG9uZSBheGlzIHRvIG90aGVyIHRoYW4gJ3Zpc2libGUnIHdoaWxlIHRoZSBvdGhlciBpcyAndmlzaWJsZSdcbiAgLy8gcmVzdWx0cyBpbiB0aGUgb3RoZXIgYXhpcyB0dXJuaW5nIHRvICdhdXRvJylcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHBhcmVudCkub3ZlcmZsb3cgIT09ICd2aXNpYmxlJ1xuICAgID8gcGFyZW50XG4gICAgOiBmaW5kU2Nyb2xsUGFyZW50cyhwYXJlbnQpO1xufVxuXG4vLyBDbGFzcyByZXByZXNlbnRpbmcgdGhlIHBpY2tlciBVSVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGlja2VyIHtcbiAgY29uc3RydWN0b3IoZGF0ZXBpY2tlcikge1xuICAgIGNvbnN0IHtjb25maWd9ID0gdGhpcy5kYXRlcGlja2VyID0gZGF0ZXBpY2tlcjtcblxuICAgIGNvbnN0IHRlbXBsYXRlID0gcGlja2VyVGVtcGxhdGUucmVwbGFjZSgvJWJ1dHRvbkNsYXNzJS9nLCBjb25maWcuYnV0dG9uQ2xhc3MpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQgPSBwYXJzZUhUTUwodGVtcGxhdGUpLmZpcnN0Q2hpbGQ7XG4gICAgY29uc3QgW2hlYWRlciwgbWFpbiwgZm9vdGVyXSA9IGVsZW1lbnQuZmlyc3RDaGlsZC5jaGlsZHJlbjtcbiAgICBjb25zdCB0aXRsZSA9IGhlYWRlci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCBbcHJldkJ0biwgdmlld1N3aXRjaCwgbmV4dEJ0bl0gPSBoZWFkZXIubGFzdEVsZW1lbnRDaGlsZC5jaGlsZHJlbjtcbiAgICBjb25zdCBbdG9kYXlCdG4sIGNsZWFyQnRuXSA9IGZvb3Rlci5maXJzdENoaWxkLmNoaWxkcmVuO1xuICAgIGNvbnN0IGNvbnRyb2xzID0ge1xuICAgICAgdGl0bGUsXG4gICAgICBwcmV2QnRuLFxuICAgICAgdmlld1N3aXRjaCxcbiAgICAgIG5leHRCdG4sXG4gICAgICB0b2RheUJ0bixcbiAgICAgIGNsZWFyQnRuLFxuICAgIH07XG4gICAgdGhpcy5tYWluID0gbWFpbjtcbiAgICB0aGlzLmNvbnRyb2xzID0gY29udHJvbHM7XG5cbiAgICBjb25zdCBlbGVtZW50Q2xhc3MgPSBkYXRlcGlja2VyLmlubGluZSA/ICdpbmxpbmUnIDogJ2Ryb3Bkb3duJztcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYGRhdGVwaWNrZXItJHtlbGVtZW50Q2xhc3N9YCk7XG5cbiAgICBwcm9jZXNzUGlja2VyT3B0aW9ucyh0aGlzLCBjb25maWcpO1xuICAgIHRoaXMudmlld0RhdGUgPSBjb21wdXRlUmVzZXRWaWV3RGF0ZShkYXRlcGlja2VyKTtcblxuICAgIC8vIHNldCB1cCBldmVudCBsaXN0ZW5lcnNcbiAgICByZWdpc3Rlckxpc3RlbmVycyhkYXRlcGlja2VyLCBbXG4gICAgICBbZWxlbWVudCwgJ21vdXNlZG93bicsIG9uTW91c2Vkb3duUGlja2VyXSxcbiAgICAgIFttYWluLCAnY2xpY2snLCBvbkNsaWNrVmlldy5iaW5kKG51bGwsIGRhdGVwaWNrZXIpXSxcbiAgICAgIFtjb250cm9scy52aWV3U3dpdGNoLCAnY2xpY2snLCBvbkNsaWNrVmlld1N3aXRjaC5iaW5kKG51bGwsIGRhdGVwaWNrZXIpXSxcbiAgICAgIFtjb250cm9scy5wcmV2QnRuLCAnY2xpY2snLCBvbkNsaWNrUHJldkJ0bi5iaW5kKG51bGwsIGRhdGVwaWNrZXIpXSxcbiAgICAgIFtjb250cm9scy5uZXh0QnRuLCAnY2xpY2snLCBvbkNsaWNrTmV4dEJ0bi5iaW5kKG51bGwsIGRhdGVwaWNrZXIpXSxcbiAgICAgIFtjb250cm9scy50b2RheUJ0biwgJ2NsaWNrJywgb25DbGlja1RvZGF5QnRuLmJpbmQobnVsbCwgZGF0ZXBpY2tlcildLFxuICAgICAgW2NvbnRyb2xzLmNsZWFyQnRuLCAnY2xpY2snLCBvbkNsaWNrQ2xlYXJCdG4uYmluZChudWxsLCBkYXRlcGlja2VyKV0sXG4gICAgXSk7XG5cbiAgICAvLyBzZXQgdXAgdmlld3NcbiAgICB0aGlzLnZpZXdzID0gW1xuICAgICAgbmV3IERheXNWaWV3KHRoaXMpLFxuICAgICAgbmV3IE1vbnRoc1ZpZXcodGhpcyksXG4gICAgICBuZXcgWWVhcnNWaWV3KHRoaXMsIHtpZDogMiwgbmFtZTogJ3llYXJzJywgY2VsbENsYXNzOiAneWVhcicsIHN0ZXA6IDF9KSxcbiAgICAgIG5ldyBZZWFyc1ZpZXcodGhpcywge2lkOiAzLCBuYW1lOiAnZGVjYWRlcycsIGNlbGxDbGFzczogJ2RlY2FkZScsIHN0ZXA6IDEwfSksXG4gICAgXTtcbiAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdGhpcy52aWV3c1tjb25maWcuc3RhcnRWaWV3XTtcblxuICAgIHRoaXMuY3VycmVudFZpZXcucmVuZGVyKCk7XG4gICAgdGhpcy5tYWluLmFwcGVuZENoaWxkKHRoaXMuY3VycmVudFZpZXcuZWxlbWVudCk7XG4gICAgaWYgKGNvbmZpZy5jb250YWluZXIpIHtcbiAgICAgIGNvbmZpZy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0ZXBpY2tlci5pbnB1dEZpZWxkLmFmdGVyKHRoaXMuZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcHJvY2Vzc1BpY2tlck9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy52aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XG4gICAgICB2aWV3LmluaXQob3B0aW9ucywgZmFsc2UpO1xuICAgIH0pO1xuICAgIHRoaXMuY3VycmVudFZpZXcucmVuZGVyKCk7XG4gIH1cblxuICBkZXRhY2goKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7ZGF0ZXBpY2tlciwgZWxlbWVudH0gPSB0aGlzO1xuICAgIGlmIChkYXRlcGlja2VyLmlubGluZSkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZW5zdXJlIHBpY2tlcidzIGRpcmVjdGlvbiBtYXRjaGVzIGlucHV0J3NcbiAgICAgIGNvbnN0IGlucHV0RGlyZWN0aW9uID0gZ2V0VGV4dERpcmVjdGlvbihkYXRlcGlja2VyLmlucHV0RmllbGQpO1xuICAgICAgaWYgKGlucHV0RGlyZWN0aW9uICE9PSBnZXRUZXh0RGlyZWN0aW9uKGdldFBhcmVudChlbGVtZW50KSkpIHtcbiAgICAgICAgZWxlbWVudC5kaXIgPSBpbnB1dERpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5kaXIpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RpcicpO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50LnN0eWxlLnZpc2libGl0eSA9ICdoaWRkZW4nO1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIHRoaXMucGxhY2UoKTtcbiAgICAgIGVsZW1lbnQuc3R5bGUudmlzaWJsaXR5ID0gJyc7XG5cbiAgICAgIGlmIChkYXRlcGlja2VyLmNvbmZpZy5kaXNhYmxlVG91Y2hLZXlib2FyZCkge1xuICAgICAgICBkYXRlcGlja2VyLmlucHV0RmllbGQuYmx1cigpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdHJpZ2dlckRhdGVwaWNrZXJFdmVudChkYXRlcGlja2VyLCAnc2hvdycpO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGF0ZXBpY2tlci5leGl0RWRpdE1vZGUoKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB0cmlnZ2VyRGF0ZXBpY2tlckV2ZW50KHRoaXMuZGF0ZXBpY2tlciwgJ2hpZGUnKTtcbiAgfVxuXG4gIHBsYWNlKCkge1xuICAgIGNvbnN0IHtjbGFzc0xpc3QsIG9mZnNldFBhcmVudCwgc3R5bGV9ID0gdGhpcy5lbGVtZW50O1xuICAgIGNvbnN0IHtjb25maWcsIGlucHV0RmllbGR9ID0gdGhpcy5kYXRlcGlja2VyO1xuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoOiBjYWxlbmRhcldpZHRoLFxuICAgICAgaGVpZ2h0OiBjYWxlbmRhckhlaWdodCxcbiAgICB9ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHtcbiAgICAgIGxlZnQ6IGlucHV0TGVmdCxcbiAgICAgIHRvcDogaW5wdXRUb3AsXG4gICAgICByaWdodDogaW5wdXRSaWdodCxcbiAgICAgIGJvdHRvbTogaW5wdXRCb3R0b20sXG4gICAgICB3aWR0aDogaW5wdXRXaWR0aCxcbiAgICAgIGhlaWdodDogaW5wdXRIZWlnaHRcbiAgICB9ID0gaW5wdXRGaWVsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQge3g6IG9yaWVudFgsIHk6IG9yaWVudFl9ID0gY29uZmlnLm9yaWVudGF0aW9uO1xuICAgIGxldCBsZWZ0ID0gaW5wdXRMZWZ0O1xuICAgIGxldCB0b3AgPSBpbnB1dFRvcDtcblxuICAgIC8vIGNhbGljdWxhdGUgb2Zmc2V0TGVmdC9Ub3Agb2YgaW5wdXRGaWVsZFxuICAgIGlmIChvZmZzZXRQYXJlbnQgPT09IGRvY3VtZW50LmJvZHkgfHwgIW9mZnNldFBhcmVudCkge1xuICAgICAgbGVmdCArPSB3aW5kb3cuc2Nyb2xsWDtcbiAgICAgIHRvcCArPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgb2Zmc2V0UGFyZW50UmVjdCA9IG9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGxlZnQgLT0gb2Zmc2V0UGFyZW50UmVjdC5sZWZ0IC0gb2Zmc2V0UGFyZW50LnNjcm9sbExlZnQ7XG4gICAgICB0b3AgLT0gb2Zmc2V0UGFyZW50UmVjdC50b3AgLSBvZmZzZXRQYXJlbnQuc2Nyb2xsVG9wO1xuICAgIH1cblxuICAgIC8vIGNhbGljdWxhdGUgdGhlIGJvdW5kYXJpZXMgb2YgdGhlIHZpc2libGUgYXJlYSB0aGF0IGNvbnRhaW5zIGlucHV0RmllbGRcbiAgICBjb25zdCBzY3JvbGxQYXJlbnQgPSBmaW5kU2Nyb2xsUGFyZW50cyhpbnB1dEZpZWxkKTtcbiAgICBsZXQgc2Nyb2xsQXJlYUxlZnQgPSAwO1xuICAgIGxldCBzY3JvbGxBcmVhVG9wID0gMDtcbiAgICBsZXQge1xuICAgICAgY2xpZW50V2lkdGg6IHNjcm9sbEFyZWFSaWdodCxcbiAgICAgIGNsaWVudEhlaWdodDogc2Nyb2xsQXJlYUJvdHRvbSxcbiAgICB9ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgaWYgKHNjcm9sbFBhcmVudCkge1xuICAgICAgY29uc3Qgc2Nyb2xsUGFyZW50UmVjdCA9IHNjcm9sbFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmIChzY3JvbGxQYXJlbnRSZWN0LnRvcCA+IDApIHtcbiAgICAgICAgc2Nyb2xsQXJlYVRvcCA9IHNjcm9sbFBhcmVudFJlY3QudG9wO1xuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFBhcmVudFJlY3QubGVmdCA+IDApIHtcbiAgICAgICAgc2Nyb2xsQXJlYUxlZnQgPSBzY3JvbGxQYXJlbnRSZWN0LmxlZnQ7XG4gICAgICB9XG4gICAgICBpZiAoc2Nyb2xsUGFyZW50UmVjdC5yaWdodCA8IHNjcm9sbEFyZWFSaWdodCkge1xuICAgICAgICBzY3JvbGxBcmVhUmlnaHQgPSBzY3JvbGxQYXJlbnRSZWN0LnJpZ2h0O1xuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFBhcmVudFJlY3QuYm90dG9tIDwgc2Nyb2xsQXJlYUJvdHRvbSkge1xuICAgICAgICBzY3JvbGxBcmVhQm90dG9tID0gc2Nyb2xsUGFyZW50UmVjdC5ib3R0b207XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGV0ZXJtaW5lIHRoZSBob3Jpem9udGFsIG9yaWVudGF0aW9uIGFuZCBsZWZ0IHBvc2l0aW9uXG4gICAgbGV0IGFkanVzdG1lbnQgPSAwO1xuICAgIGlmIChvcmllbnRYID09PSAnYXV0bycpIHtcbiAgICAgIGlmIChpbnB1dExlZnQgPCBzY3JvbGxBcmVhTGVmdCkge1xuICAgICAgICBvcmllbnRYID0gJ2xlZnQnO1xuICAgICAgICBhZGp1c3RtZW50ID0gc2Nyb2xsQXJlYUxlZnQgLSBpbnB1dExlZnQ7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0TGVmdCArIGNhbGVuZGFyV2lkdGggPiBzY3JvbGxBcmVhUmlnaHQpIHtcbiAgICAgICAgb3JpZW50WCA9ICdyaWdodCc7XG4gICAgICAgIGlmIChzY3JvbGxBcmVhUmlnaHQgPCBpbnB1dFJpZ2h0KSB7XG4gICAgICAgICAgYWRqdXN0bWVudCA9IHNjcm9sbEFyZWFSaWdodCAtIGlucHV0UmlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZ2V0VGV4dERpcmVjdGlvbihpbnB1dEZpZWxkKSA9PT0gJ3J0bCcpIHtcbiAgICAgICAgb3JpZW50WCA9IGlucHV0UmlnaHQgLSBjYWxlbmRhcldpZHRoIDwgc2Nyb2xsQXJlYUxlZnQgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3JpZW50WCA9ICdsZWZ0JztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9yaWVudFggPT09ICdyaWdodCcpIHtcbiAgICAgIGxlZnQgKz0gaW5wdXRXaWR0aCAtIGNhbGVuZGFyV2lkdGg7XG4gICAgfVxuICAgIGxlZnQgKz0gYWRqdXN0bWVudDtcblxuICAgIC8vIGRldGVybWluZSB0aGUgdmVydGljYWwgb3JpZW50YXRpb24gYW5kIHRvcCBwb3NpdGlvblxuICAgIGlmIChvcmllbnRZID09PSAnYXV0bycpIHtcbiAgICAgIGlmIChpbnB1dFRvcCAtIGNhbGVuZGFySGVpZ2h0ID4gc2Nyb2xsQXJlYVRvcCkge1xuICAgICAgICBvcmllbnRZID0gaW5wdXRCb3R0b20gKyBjYWxlbmRhckhlaWdodCA+IHNjcm9sbEFyZWFCb3R0b20gPyAndG9wJyA6ICdib3R0b20nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3JpZW50WSA9ICdib3R0b20nO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3JpZW50WSA9PT0gJ3RvcCcpIHtcbiAgICAgIHRvcCAtPSBjYWxlbmRhckhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9wICs9IGlucHV0SGVpZ2h0O1xuICAgIH1cblxuICAgIGNsYXNzTGlzdC5yZW1vdmUoLi4uT2JqZWN0LnZhbHVlcyhvcmllbnRDbGFzc2VzKSk7XG4gICAgY2xhc3NMaXN0LmFkZChvcmllbnRDbGFzc2VzW29yaWVudFhdLCBvcmllbnRDbGFzc2VzW29yaWVudFldKTtcblxuICAgIHN0eWxlLmxlZnQgPSB0b1B4KGxlZnQpO1xuICAgIHN0eWxlLnRvcCA9IHRvUHgodG9wKTtcbiAgfVxuXG4gIHNldFZpZXdTd2l0Y2hMYWJlbChsYWJlbFRleHQpIHtcbiAgICB0aGlzLmNvbnRyb2xzLnZpZXdTd2l0Y2gudGV4dENvbnRlbnQgPSBsYWJlbFRleHQ7XG4gIH1cblxuICBzZXRQcmV2QnRuRGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLmNvbnRyb2xzLnByZXZCdG4uZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxuXG4gIHNldE5leHRCdG5EaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIHRoaXMuY29udHJvbHMubmV4dEJ0bi5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICB9XG5cbiAgY2hhbmdlVmlldyh2aWV3SWQpIHtcbiAgICBjb25zdCBvbGRWaWV3ID0gdGhpcy5jdXJyZW50VmlldztcbiAgICBjb25zdCBuZXdWaWV3ID0gIHRoaXMudmlld3Nbdmlld0lkXTtcbiAgICBpZiAobmV3Vmlldy5pZCAhPT0gb2xkVmlldy5pZCkge1xuICAgICAgdGhpcy5jdXJyZW50VmlldyA9IG5ld1ZpZXc7XG4gICAgICB0aGlzLl9yZW5kZXJNZXRob2QgPSAncmVuZGVyJztcbiAgICAgIHRyaWdnZXJEYXRlcGlja2VyRXZlbnQodGhpcy5kYXRlcGlja2VyLCAnY2hhbmdlVmlldycpO1xuICAgICAgdGhpcy5tYWluLnJlcGxhY2VDaGlsZChuZXdWaWV3LmVsZW1lbnQsIG9sZFZpZXcuZWxlbWVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gQ2hhbmdlIHRoZSBmb2N1c2VkIGRhdGUgKHZpZXcgZGF0ZSlcbiAgY2hhbmdlRm9jdXMobmV3Vmlld0RhdGUpIHtcbiAgICB0aGlzLl9yZW5kZXJNZXRob2QgPSBzZXRWaWV3RGF0ZSh0aGlzLCBuZXdWaWV3RGF0ZSkgPyAncmVuZGVyJyA6ICdyZWZyZXNoRm9jdXMnO1xuICAgIHRoaXMudmlld3MuZm9yRWFjaCgodmlldykgPT4ge1xuICAgICAgdmlldy51cGRhdGVGb2N1cygpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gQXBwbHkgdGhlIGNoYW5nZSBvZiB0aGUgc2VsZWN0ZWQgZGF0ZXNcbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IG5ld1ZpZXdEYXRlID0gY29tcHV0ZVJlc2V0Vmlld0RhdGUodGhpcy5kYXRlcGlja2VyKTtcbiAgICB0aGlzLl9yZW5kZXJNZXRob2QgPSBzZXRWaWV3RGF0ZSh0aGlzLCBuZXdWaWV3RGF0ZSkgPyAncmVuZGVyJyA6ICdyZWZyZXNoJztcbiAgICB0aGlzLnZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcbiAgICAgIHZpZXcudXBkYXRlRm9jdXMoKTtcbiAgICAgIHZpZXcudXBkYXRlU2VsZWN0aW9uKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBSZWZyZXNoIHRoZSBwaWNrZXIgVUlcbiAgcmVuZGVyKHF1aWNrUmVuZGVyID0gdHJ1ZSkge1xuICAgIGNvbnN0IHJlbmRlck1ldGhvZCA9IChxdWlja1JlbmRlciAmJiB0aGlzLl9yZW5kZXJNZXRob2QpIHx8ICdyZW5kZXInO1xuICAgIGRlbGV0ZSB0aGlzLl9yZW5kZXJNZXRob2Q7XG5cbiAgICB0aGlzLmN1cnJlbnRWaWV3W3JlbmRlck1ldGhvZF0oKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtjcmVhdGVUYWdSZXBlYXQsIG9wdGltaXplVGVtcGxhdGVIVE1MfSBmcm9tICcuLi8uLi9saWIvdXRpbHMuanMnO1xuXG5jb25zdCBjYWxlbmRhcldlZWtzVGVtcGxhdGUgPSBvcHRpbWl6ZVRlbXBsYXRlSFRNTChgPGRpdiBjbGFzcz1cImNhbGVuZGFyLXdlZWtzXCI+XG4gIDxkaXYgY2xhc3M9XCJkYXlzLW9mLXdlZWtcIj48c3BhbiBjbGFzcz1cImRvd1wiPjwvc3Bhbj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIndlZWtzXCI+JHtjcmVhdGVUYWdSZXBlYXQoJ3NwYW4nLCA2LCB7Y2xhc3M6ICd3ZWVrJ30pfTwvZGl2PlxuPC9kaXY+YCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNhbGVuZGFyV2Vla3NUZW1wbGF0ZTtcbiIsImltcG9ydCB7Y3JlYXRlVGFnUmVwZWF0LCBvcHRpbWl6ZVRlbXBsYXRlSFRNTH0gZnJvbSAnLi4vLi4vbGliL3V0aWxzLmpzJztcblxuY29uc3QgZGF5c1RlbXBsYXRlID0gb3B0aW1pemVUZW1wbGF0ZUhUTUwoYDxkaXYgY2xhc3M9XCJkYXlzXCI+XG4gIDxkaXYgY2xhc3M9XCJkYXlzLW9mLXdlZWtcIj4ke2NyZWF0ZVRhZ1JlcGVhdCgnc3BhbicsIDcsIHtjbGFzczogJ2Rvdyd9KX08L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItZ3JpZFwiPiR7Y3JlYXRlVGFnUmVwZWF0KCdzcGFuJywgNDIpfTwvZGl2PlxuPC9kaXY+YCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRheXNUZW1wbGF0ZTtcbiIsImltcG9ydCB7b3B0aW1pemVUZW1wbGF0ZUhUTUx9IGZyb20gJy4uLy4uL2xpYi91dGlscy5qcyc7XG5cbmNvbnN0IHBpY2tlclRlbXBsYXRlID0gb3B0aW1pemVUZW1wbGF0ZUhUTUwoYDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyXCI+XG4gIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLXBpY2tlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWhlYWRlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItdGl0bGVcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWNvbnRyb2xzXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJWJ1dHRvbkNsYXNzJSBwcmV2LWJ0blwiPjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiVidXR0b25DbGFzcyUgdmlldy1zd2l0Y2hcIj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIlYnV0dG9uQ2xhc3MlIG5leHQtYnRuXCI+PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1tYWluXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItZm9vdGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1jb250cm9sc1wiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiVidXR0b25DbGFzcyUgdG9kYXktYnRuXCI+PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJWJ1dHRvbkNsYXNzJSBjbGVhci1idG5cIj48L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmApO1xuXG5leHBvcnQgZGVmYXVsdCBwaWNrZXJUZW1wbGF0ZTtcbiIsImltcG9ydCB7aGFzUHJvcGVydHksIHB1c2hVbmlxdWV9IGZyb20gJy4uLy4uL2xpYi91dGlscy5qcyc7XG5pbXBvcnQge3RvZGF5LCBkYXRlVmFsdWUsIGFkZERheXMsIGFkZFdlZWtzLCBkYXlPZlRoZVdlZWtPZiwgZ2V0V2Vla30gZnJvbSAnLi4vLi4vbGliL2RhdGUuanMnO1xuaW1wb3J0IHtmb3JtYXREYXRlfSBmcm9tICcuLi8uLi9saWIvZGF0ZS1mb3JtYXQuanMnO1xuaW1wb3J0IHtwYXJzZUhUTUwsIHNob3dFbGVtZW50LCBoaWRlRWxlbWVudH0gZnJvbSAnLi4vLi4vbGliL2RvbS5qcyc7XG5pbXBvcnQgZGF5c1RlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9kYXlzVGVtcGxhdGUuanMnO1xuaW1wb3J0IGNhbGVuZGFyV2Vla3NUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvY2FsZW5kYXJXZWVrc1RlbXBsYXRlLmpzJztcbmltcG9ydCBWaWV3IGZyb20gJy4vVmlldy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERheXNWaWV3IGV4dGVuZHMgVmlldyB7XG4gIGNvbnN0cnVjdG9yKHBpY2tlcikge1xuICAgIHN1cGVyKHBpY2tlciwge1xuICAgICAgaWQ6IDAsXG4gICAgICBuYW1lOiAnZGF5cycsXG4gICAgICBjZWxsQ2xhc3M6ICdkYXknLFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdChvcHRpb25zLCBvbkNvbnN0cnVjdGlvbiA9IHRydWUpIHtcbiAgICBpZiAob25Db25zdHJ1Y3Rpb24pIHtcbiAgICAgIGNvbnN0IGlubmVyID0gcGFyc2VIVE1MKGRheXNUZW1wbGF0ZSkuZmlyc3RDaGlsZDtcbiAgICAgIHRoaXMuZG93ID0gaW5uZXIuZmlyc3RDaGlsZDtcbiAgICAgIHRoaXMuZ3JpZCA9IGlubmVyLmxhc3RDaGlsZDtcbiAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChpbm5lcik7XG4gICAgfVxuICAgIHN1cGVyLmluaXQob3B0aW9ucyk7XG4gIH1cblxuICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBsZXQgdXBkYXRlRE9XO1xuXG4gICAgaWYgKGhhc1Byb3BlcnR5KG9wdGlvbnMsICdtaW5EYXRlJykpIHtcbiAgICAgIHRoaXMubWluRGF0ZSA9IG9wdGlvbnMubWluRGF0ZTtcbiAgICB9XG4gICAgaWYgKGhhc1Byb3BlcnR5KG9wdGlvbnMsICdtYXhEYXRlJykpIHtcbiAgICAgIHRoaXMubWF4RGF0ZSA9IG9wdGlvbnMubWF4RGF0ZTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZGF0ZXNEaXNhYmxlZCkge1xuICAgICAgdGhpcy5kYXRlc0Rpc2FibGVkID0gb3B0aW9ucy5kYXRlc0Rpc2FibGVkO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kYXlzT2ZXZWVrRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZGF5c09mV2Vla0Rpc2FibGVkID0gb3B0aW9ucy5kYXlzT2ZXZWVrRGlzYWJsZWQ7XG4gICAgICB1cGRhdGVET1cgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQpIHtcbiAgICAgIHRoaXMuZGF5c09mV2Vla0hpZ2hsaWdodGVkID0gb3B0aW9ucy5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnRvZGF5SGlnaGxpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudG9kYXlIaWdobGlnaHQgPSBvcHRpb25zLnRvZGF5SGlnaGxpZ2h0O1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy53ZWVrU3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy53ZWVrU3RhcnQgPSBvcHRpb25zLndlZWtTdGFydDtcbiAgICAgIHRoaXMud2Vla0VuZCA9IG9wdGlvbnMud2Vla0VuZDtcbiAgICAgIHVwZGF0ZURPVyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxvY2FsZSkge1xuICAgICAgY29uc3QgbG9jYWxlID0gdGhpcy5sb2NhbGUgPSBvcHRpb25zLmxvY2FsZTtcbiAgICAgIHRoaXMuZGF5TmFtZXMgPSBsb2NhbGUuZGF5c01pbjtcbiAgICAgIHRoaXMuc3dpdGNoTGFiZWxGb3JtYXQgPSBsb2NhbGUudGl0bGVGb3JtYXQ7XG4gICAgICB1cGRhdGVET1cgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5iZWZvcmVTaG93RGF5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYmVmb3JlU2hvdyA9IHR5cGVvZiBvcHRpb25zLmJlZm9yZVNob3dEYXkgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBvcHRpb25zLmJlZm9yZVNob3dEYXlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuY2FsZW5kYXJXZWVrcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAob3B0aW9ucy5jYWxlbmRhcldlZWtzICYmICF0aGlzLmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgICAgY29uc3Qgd2Vla3NFbGVtID0gcGFyc2VIVE1MKGNhbGVuZGFyV2Vla3NUZW1wbGF0ZSkuZmlyc3RDaGlsZDtcbiAgICAgICAgdGhpcy5jYWxlbmRhcldlZWtzID0ge1xuICAgICAgICAgIGVsZW1lbnQ6IHdlZWtzRWxlbSxcbiAgICAgICAgICBkb3c6IHdlZWtzRWxlbS5maXJzdENoaWxkLFxuICAgICAgICAgIHdlZWtzOiB3ZWVrc0VsZW0ubGFzdENoaWxkLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHdlZWtzRWxlbSwgdGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNhbGVuZGFyV2Vla3MgJiYgIW9wdGlvbnMuY2FsZW5kYXJXZWVrcykge1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jYWxlbmRhcldlZWtzLmVsZW1lbnQpO1xuICAgICAgICB0aGlzLmNhbGVuZGFyV2Vla3MgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zaG93RGF5c09mV2VlayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAob3B0aW9ucy5zaG93RGF5c09mV2Vlaykge1xuICAgICAgICBzaG93RWxlbWVudCh0aGlzLmRvdyk7XG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgICAgICBzaG93RWxlbWVudCh0aGlzLmNhbGVuZGFyV2Vla3MuZG93KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlkZUVsZW1lbnQodGhpcy5kb3cpO1xuICAgICAgICBpZiAodGhpcy5jYWxlbmRhcldlZWtzKSB7XG4gICAgICAgICAgaGlkZUVsZW1lbnQodGhpcy5jYWxlbmRhcldlZWtzLmRvdyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgZGF5cy1vZi13ZWVrIHdoZW4gbG9jYWxlLCBkYXlzT2Z3ZWVrRGlzYWJsZWQgb3Igd2Vla1N0YXJ0IGlzIGNoYW5nZWRcbiAgICBpZiAodXBkYXRlRE9XKSB7XG4gICAgICBBcnJheS5mcm9tKHRoaXMuZG93LmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgZG93ID0gKHRoaXMud2Vla1N0YXJ0ICsgaW5kZXgpICUgNztcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSB0aGlzLmRheU5hbWVzW2Rvd107XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IHRoaXMuZGF5c09mV2Vla0Rpc2FibGVkLmluY2x1ZGVzKGRvdykgPyAnZG93IGRpc2FibGVkJyA6ICdkb3cnO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQXBwbHkgdXBkYXRlIG9uIHRoZSBmb2N1c2VkIGRhdGUgdG8gdmlldydzIHNldHRpbmdzXG4gIHVwZGF0ZUZvY3VzKCkge1xuICAgIGNvbnN0IHZpZXdEYXRlID0gbmV3IERhdGUodGhpcy5waWNrZXIudmlld0RhdGUpO1xuICAgIGNvbnN0IHZpZXdZZWFyID0gdmlld0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCB2aWV3TW9udGggPSB2aWV3RGF0ZS5nZXRNb250aCgpO1xuICAgIGNvbnN0IGZpcnN0T2ZNb250aCA9IGRhdGVWYWx1ZSh2aWV3WWVhciwgdmlld01vbnRoLCAxKTtcbiAgICBjb25zdCBzdGFydCA9IGRheU9mVGhlV2Vla09mKGZpcnN0T2ZNb250aCwgdGhpcy53ZWVrU3RhcnQsIHRoaXMud2Vla1N0YXJ0KTtcblxuICAgIHRoaXMuZmlyc3QgPSBmaXJzdE9mTW9udGg7XG4gICAgdGhpcy5sYXN0ID0gZGF0ZVZhbHVlKHZpZXdZZWFyLCB2aWV3TW9udGggKyAxLCAwKTtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5mb2N1c2VkID0gdGhpcy5waWNrZXIudmlld0RhdGU7XG4gIH1cblxuICAvLyBBcHBseSB1cGRhdGUgb24gdGhlIHNlbGVjdGVkIGRhdGVzIHRvIHZpZXcncyBzZXR0aW5nc1xuICB1cGRhdGVTZWxlY3Rpb24oKSB7XG4gICAgY29uc3Qge2RhdGVzLCByYW5nZXBpY2tlcn0gPSB0aGlzLnBpY2tlci5kYXRlcGlja2VyO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlcztcbiAgICBpZiAocmFuZ2VwaWNrZXIpIHtcbiAgICAgIHRoaXMucmFuZ2UgPSByYW5nZXBpY2tlci5kYXRlcztcbiAgICB9XG4gIH1cblxuICAgLy8gVXBkYXRlIHRoZSBlbnRpcmUgdmlldyBVSVxuICByZW5kZXIoKSB7XG4gICAgLy8gdXBkYXRlIHRvZGF5IG1hcmtlciBvbiBldmVyIHJlbmRlclxuICAgIHRoaXMudG9kYXkgPSB0aGlzLnRvZGF5SGlnaGxpZ2h0ID8gdG9kYXkoKSA6IHVuZGVmaW5lZDtcbiAgICAvLyByZWZyZXNoIGRpc2FibGVkIGRhdGVzIG9uIGV2ZXJ5IHJlbmRlciBpbiBvcmRlciB0byBjbGVhciB0aGUgb25lcyBhZGRlZFxuICAgIC8vIGJ5IGJlZm9yZVNob3cgaG9vayBhdCBwcmV2aW91cyByZW5kZXJcbiAgICB0aGlzLmRpc2FibGVkID0gWy4uLnRoaXMuZGF0ZXNEaXNhYmxlZF07XG5cbiAgICBjb25zdCBzd2l0Y2hMYWJlbCA9IGZvcm1hdERhdGUodGhpcy5mb2N1c2VkLCB0aGlzLnN3aXRjaExhYmVsRm9ybWF0LCB0aGlzLmxvY2FsZSk7XG4gICAgdGhpcy5waWNrZXIuc2V0Vmlld1N3aXRjaExhYmVsKHN3aXRjaExhYmVsKTtcbiAgICB0aGlzLnBpY2tlci5zZXRQcmV2QnRuRGlzYWJsZWQodGhpcy5maXJzdCA8PSB0aGlzLm1pbkRhdGUpO1xuICAgIHRoaXMucGlja2VyLnNldE5leHRCdG5EaXNhYmxlZCh0aGlzLmxhc3QgPj0gdGhpcy5tYXhEYXRlKTtcblxuICAgIGlmICh0aGlzLmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgIC8vIHN0YXJ0IG9mIHRoZSBVVEMgd2VlayAoTW9uZGF5KSBvZiB0aGUgMXN0IG9mIHRoZSBtb250aFxuICAgICAgY29uc3Qgc3RhcnRPZldlZWsgPSBkYXlPZlRoZVdlZWtPZih0aGlzLmZpcnN0LCAxLCAxKTtcbiAgICAgIEFycmF5LmZyb20odGhpcy5jYWxlbmRhcldlZWtzLndlZWtzLmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSBnZXRXZWVrKGFkZFdlZWtzKHN0YXJ0T2ZXZWVrLCBpbmRleCkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIEFycmF5LmZyb20odGhpcy5ncmlkLmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBhZGREYXlzKHRoaXMuc3RhcnQsIGluZGV4KTtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShjdXJyZW50KTtcbiAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF5KCk7XG5cbiAgICAgIGVsLmNsYXNzTmFtZSA9IGBkYXRlcGlja2VyLWNlbGwgJHt0aGlzLmNlbGxDbGFzc31gO1xuICAgICAgZWwuZGF0YXNldC5kYXRlID0gY3VycmVudDtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gZGF0ZS5nZXREYXRlKCk7XG5cbiAgICAgIGlmIChjdXJyZW50IDwgdGhpcy5maXJzdCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdwcmV2Jyk7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnQgPiB0aGlzLmxhc3QpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnbmV4dCcpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudG9kYXkgPT09IGN1cnJlbnQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgndG9kYXknKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50IDwgdGhpcy5taW5EYXRlIHx8IGN1cnJlbnQgPiB0aGlzLm1heERhdGUgfHwgdGhpcy5kaXNhYmxlZC5pbmNsdWRlcyhjdXJyZW50KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGF5c09mV2Vla0Rpc2FibGVkLmluY2x1ZGVzKGRheSkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgICAgcHVzaFVuaXF1ZSh0aGlzLmRpc2FibGVkLCBjdXJyZW50KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRheXNPZldlZWtIaWdobGlnaHRlZC5pbmNsdWRlcyhkYXkpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2hpZ2hsaWdodGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gdGhpcy5yYW5nZTtcbiAgICAgICAgaWYgKGN1cnJlbnQgPiByYW5nZVN0YXJ0ICYmIGN1cnJlbnQgPCByYW5nZUVuZCkge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IHJhbmdlU3RhcnQpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1zdGFydCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50ID09PSByYW5nZUVuZCkge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLWVuZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZC5pbmNsdWRlcyhjdXJyZW50KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmJlZm9yZVNob3cpIHtcbiAgICAgICAgdGhpcy5wZXJmb3JtQmVmb3JlSG9vayhlbCwgY3VycmVudCwgY3VycmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIHZpZXcgVUkgYnkgYXBwbHlpbmcgdGhlIGNoYW5nZXMgb2Ygc2VsZWN0ZWQgYW5kIGZvY3VzZWQgaXRlbXNcbiAgcmVmcmVzaCgpIHtcbiAgICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gdGhpcy5yYW5nZSB8fCBbXTtcbiAgICB0aGlzLmdyaWRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcucmFuZ2UsIC5yYW5nZS1zdGFydCwgLnJhbmdlLWVuZCwgLnNlbGVjdGVkLCAuZm9jdXNlZCcpXG4gICAgICAuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncmFuZ2UnLCAncmFuZ2Utc3RhcnQnLCAncmFuZ2UtZW5kJywgJ3NlbGVjdGVkJywgJ2ZvY3VzZWQnKTtcbiAgICAgIH0pO1xuICAgIEFycmF5LmZyb20odGhpcy5ncmlkLmNoaWxkcmVuKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudCA9IE51bWJlcihlbC5kYXRhc2V0LmRhdGUpO1xuICAgICAgY29uc3QgY2xhc3NMaXN0ID0gZWwuY2xhc3NMaXN0O1xuICAgICAgaWYgKGN1cnJlbnQgPiByYW5nZVN0YXJ0ICYmIGN1cnJlbnQgPCByYW5nZUVuZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZScpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHJhbmdlU3RhcnQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2Utc3RhcnQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ID09PSByYW5nZUVuZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1lbmQnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkLmluY2x1ZGVzKGN1cnJlbnQpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA9PT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgdmlldyBVSSBieSBhcHBseWluZyB0aGUgY2hhbmdlIG9mIGZvY3VzZWQgaXRlbVxuICByZWZyZXNoRm9jdXMoKSB7XG4gICAgY29uc3QgaW5kZXggPSBNYXRoLnJvdW5kKCh0aGlzLmZvY3VzZWQgLSB0aGlzLnN0YXJ0KSAvIDg2NDAwMDAwKTtcbiAgICB0aGlzLmdyaWQucXVlcnlTZWxlY3RvckFsbCgnLmZvY3VzZWQnKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnZm9jdXNlZCcpO1xuICAgIH0pO1xuICAgIHRoaXMuZ3JpZC5jaGlsZHJlbltpbmRleF0uY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICB9XG59XG4iLCJpbXBvcnQge2hhc1Byb3BlcnR5LCBwdXNoVW5pcXVlLCBjcmVhdGVUYWdSZXBlYXR9IGZyb20gJy4uLy4uL2xpYi91dGlscy5qcyc7XG5pbXBvcnQge2RhdGVWYWx1ZX0gZnJvbSAnLi4vLi4vbGliL2RhdGUuanMnO1xuaW1wb3J0IHtwYXJzZUhUTUx9IGZyb20gJy4uLy4uL2xpYi9kb20uanMnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3LmpzJztcblxuZnVuY3Rpb24gY29tcHV0ZU1vbnRoUmFuZ2UocmFuZ2UsIHRoaXNZZWFyKSB7XG4gIGlmICghcmFuZ2UgfHwgIXJhbmdlWzBdIHx8ICFyYW5nZVsxXSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IFtbc3RhcnRZLCBzdGFydE1dLCBbZW5kWSwgZW5kTV1dID0gcmFuZ2U7XG4gIGlmIChzdGFydFkgPiB0aGlzWWVhciB8fCBlbmRZIDwgdGhpc1llYXIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIFtcbiAgICBzdGFydFkgPT09IHRoaXNZZWFyID8gc3RhcnRNIDogLTEsXG4gICAgZW5kWSA9PT0gdGhpc1llYXIgPyBlbmRNIDogMTIsXG4gIF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnRoc1ZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgY29uc3RydWN0b3IocGlja2VyKSB7XG4gICAgc3VwZXIocGlja2VyLCB7XG4gICAgICBpZDogMSxcbiAgICAgIG5hbWU6ICdtb250aHMnLFxuICAgICAgY2VsbENsYXNzOiAnbW9udGgnLFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdChvcHRpb25zLCBvbkNvbnN0cnVjdGlvbiA9IHRydWUpIHtcbiAgICBpZiAob25Db25zdHJ1Y3Rpb24pIHtcbiAgICAgIHRoaXMuZ3JpZCA9IHRoaXMuZWxlbWVudDtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtb250aHMnLCAnZGF0ZXBpY2tlci1ncmlkJyk7XG4gICAgICB0aGlzLmdyaWQuYXBwZW5kQ2hpbGQocGFyc2VIVE1MKGNyZWF0ZVRhZ1JlcGVhdCgnc3BhbicsIDEyLCB7J2RhdGEtbW9udGgnOiBpeCA9PiBpeH0pKSk7XG4gICAgfVxuICAgIHN1cGVyLmluaXQob3B0aW9ucyk7XG4gIH1cblxuICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5sb2NhbGUpIHtcbiAgICAgIHRoaXMubW9udGhOYW1lcyA9IG9wdGlvbnMubG9jYWxlLm1vbnRoc1Nob3J0O1xuICAgIH1cbiAgICBpZiAoaGFzUHJvcGVydHkob3B0aW9ucywgJ21pbkRhdGUnKSkge1xuICAgICAgaWYgKG9wdGlvbnMubWluRGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubWluWWVhciA9IHRoaXMubWluTW9udGggPSB0aGlzLm1pbkRhdGUgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtaW5EYXRlT2JqID0gbmV3IERhdGUob3B0aW9ucy5taW5EYXRlKTtcbiAgICAgICAgdGhpcy5taW5ZZWFyID0gbWluRGF0ZU9iai5nZXRGdWxsWWVhcigpO1xuICAgICAgICB0aGlzLm1pbk1vbnRoID0gbWluRGF0ZU9iai5nZXRNb250aCgpO1xuICAgICAgICB0aGlzLm1pbkRhdGUgPSBtaW5EYXRlT2JqLnNldERhdGUoMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChoYXNQcm9wZXJ0eShvcHRpb25zLCAnbWF4RGF0ZScpKSB7XG4gICAgICBpZiAob3B0aW9ucy5tYXhEYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5tYXhZZWFyID0gdGhpcy5tYXhNb250aCA9IHRoaXMubWF4RGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1heERhdGVPYmogPSBuZXcgRGF0ZShvcHRpb25zLm1heERhdGUpO1xuICAgICAgICB0aGlzLm1heFllYXIgPSBtYXhEYXRlT2JqLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHRoaXMubWF4TW9udGggPSBtYXhEYXRlT2JqLmdldE1vbnRoKCk7XG4gICAgICAgIHRoaXMubWF4RGF0ZSA9IGRhdGVWYWx1ZSh0aGlzLm1heFllYXIsIHRoaXMubWF4TW9udGggKyAxLCAwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaXNNaW5WaWV3KSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRlc0Rpc2FibGVkKSB7XG4gICAgICAgIHRoaXMuZGF0ZXNEaXNhYmxlZCA9IG9wdGlvbnMuZGF0ZXNEaXNhYmxlZDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRlc0Rpc2FibGVkID0gW107XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmJlZm9yZVNob3dNb250aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmJlZm9yZVNob3cgPSB0eXBlb2Ygb3B0aW9ucy5iZWZvcmVTaG93TW9udGggPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBvcHRpb25zLmJlZm9yZVNob3dNb250aFxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgdmlldydzIHNldHRpbmdzIHRvIHJlZmxlY3QgdGhlIHZpZXdEYXRlIHNldCBvbiB0aGUgcGlja2VyXG4gIHVwZGF0ZUZvY3VzKCkge1xuICAgIGNvbnN0IHZpZXdEYXRlID0gbmV3IERhdGUodGhpcy5waWNrZXIudmlld0RhdGUpO1xuICAgIHRoaXMueWVhciA9IHZpZXdEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgdGhpcy5mb2N1c2VkID0gdmlld0RhdGUuZ2V0TW9udGgoKTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB2aWV3J3Mgc2V0dGluZ3MgdG8gcmVmbGVjdCB0aGUgc2VsZWN0ZWQgZGF0ZXNcbiAgdXBkYXRlU2VsZWN0aW9uKCkge1xuICAgIGNvbnN0IHtkYXRlcywgcmFuZ2VwaWNrZXJ9ID0gdGhpcy5waWNrZXIuZGF0ZXBpY2tlcjtcbiAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZXMucmVkdWNlKChzZWxlY3RlZCwgdGltZVZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZVZhbHVlKTtcbiAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgIGlmIChzZWxlY3RlZFt5ZWFyXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNlbGVjdGVkW3llYXJdID0gW21vbnRoXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHB1c2hVbmlxdWUoc2VsZWN0ZWRbeWVhcl0sIG1vbnRoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxlY3RlZDtcbiAgICB9LCB7fSk7XG4gICAgaWYgKHJhbmdlcGlja2VyICYmIHJhbmdlcGlja2VyLmRhdGVzKSB7XG4gICAgICB0aGlzLnJhbmdlID0gcmFuZ2VwaWNrZXIuZGF0ZXMubWFwKHRpbWVWYWx1ZSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lVmFsdWUpO1xuICAgICAgICByZXR1cm4gaXNOYU4oZGF0ZSkgPyB1bmRlZmluZWQgOiBbZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCldO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSBlbnRpcmUgdmlldyBVSVxuICByZW5kZXIoKSB7XG4gICAgLy8gcmVmcmVzaCBkaXNhYmxlZCBtb250aHMgb24gZXZlcnkgcmVuZGVyIGluIG9yZGVyIHRvIGNsZWFyIHRoZSBvbmVzIGFkZGVkXG4gICAgLy8gYnkgYmVmb3JlU2hvdyBob29rIGF0IHByZXZpb3VzIHJlbmRlclxuICAgIC8vIHRoaXMuZGlzYWJsZWQgPSBbLi4udGhpcy5kYXRlc0Rpc2FibGVkXTtcbiAgICB0aGlzLmRpc2FibGVkID0gdGhpcy5kYXRlc0Rpc2FibGVkLnJlZHVjZSgoYXJyLCBkaXNhYmxlZCkgPT4ge1xuICAgICAgY29uc3QgZHQgPSBuZXcgRGF0ZShkaXNhYmxlZCk7XG4gICAgICBpZiAodGhpcy55ZWFyID09PSBkdC5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgIGFyci5wdXNoKGR0LmdldE1vbnRoKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycjtcbiAgICB9LCBbXSk7XG5cbiAgICB0aGlzLnBpY2tlci5zZXRWaWV3U3dpdGNoTGFiZWwodGhpcy55ZWFyKTtcbiAgICB0aGlzLnBpY2tlci5zZXRQcmV2QnRuRGlzYWJsZWQodGhpcy55ZWFyIDw9IHRoaXMubWluWWVhcik7XG4gICAgdGhpcy5waWNrZXIuc2V0TmV4dEJ0bkRpc2FibGVkKHRoaXMueWVhciA+PSB0aGlzLm1heFllYXIpO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkW3RoaXMueWVhcl0gfHwgW107XG4gICAgY29uc3QgeXJPdXRPZlJhbmdlID0gdGhpcy55ZWFyIDwgdGhpcy5taW5ZZWFyIHx8IHRoaXMueWVhciA+IHRoaXMubWF4WWVhcjtcbiAgICBjb25zdCBpc01pblllYXIgPSB0aGlzLnllYXIgPT09IHRoaXMubWluWWVhcjtcbiAgICBjb25zdCBpc01heFllYXIgPSB0aGlzLnllYXIgPT09IHRoaXMubWF4WWVhcjtcbiAgICBjb25zdCByYW5nZSA9IGNvbXB1dGVNb250aFJhbmdlKHRoaXMucmFuZ2UsIHRoaXMueWVhcik7XG5cbiAgICBBcnJheS5mcm9tKHRoaXMuZ3JpZC5jaGlsZHJlbikuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjbGFzc0xpc3QgPSBlbC5jbGFzc0xpc3Q7XG4gICAgICBjb25zdCBkYXRlID0gZGF0ZVZhbHVlKHRoaXMueWVhciwgaW5kZXgsIDEpO1xuXG4gICAgICBlbC5jbGFzc05hbWUgPSBgZGF0ZXBpY2tlci1jZWxsICR7dGhpcy5jZWxsQ2xhc3N9YDtcbiAgICAgIGlmICh0aGlzLmlzTWluVmlldykge1xuICAgICAgICBlbC5kYXRhc2V0LmRhdGUgPSBkYXRlO1xuICAgICAgfVxuICAgICAgLy8gcmVzZXQgdGV4dCBvbiBldmVyeSByZW5kZXIgdG8gY2xlYXIgdGhlIGN1c3RvbSBjb250ZW50IHNldFxuICAgICAgLy8gYnkgYmVmb3JlU2hvdyBob29rIGF0IHByZXZpb3VzIHJlbmRlclxuICAgICAgZWwudGV4dENvbnRlbnQgPSB0aGlzLm1vbnRoTmFtZXNbaW5kZXhdO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHlyT3V0T2ZSYW5nZVxuICAgICAgICB8fCBpc01pblllYXIgJiYgaW5kZXggPCB0aGlzLm1pbk1vbnRoXG4gICAgICAgIHx8IGlzTWF4WWVhciAmJiBpbmRleCA+IHRoaXMubWF4TW9udGhcbiAgICAgICAgfHwgdGhpcy5kaXNhYmxlZC5pbmNsdWRlcyhpbmRleClcbiAgICAgICkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgIGNvbnN0IFtyYW5nZVN0YXJ0LCByYW5nZUVuZF0gPSByYW5nZTtcbiAgICAgICAgaWYgKGluZGV4ID4gcmFuZ2VTdGFydCAmJiBpbmRleCA8IHJhbmdlRW5kKSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT09IHJhbmdlU3RhcnQpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1zdGFydCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gcmFuZ2VFbmQpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1lbmQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdGVkLmluY2x1ZGVzKGluZGV4KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKGluZGV4ID09PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5iZWZvcmVTaG93KSB7XG4gICAgICAgIHRoaXMucGVyZm9ybUJlZm9yZUhvb2soZWwsIGluZGV4LCBkYXRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgdmlldyBVSSBieSBhcHBseWluZyB0aGUgY2hhbmdlcyBvZiBzZWxlY3RlZCBhbmQgZm9jdXNlZCBpdGVtc1xuICByZWZyZXNoKCkge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZFt0aGlzLnllYXJdIHx8IFtdO1xuICAgIGNvbnN0IFtyYW5nZVN0YXJ0LCByYW5nZUVuZF0gPSBjb21wdXRlTW9udGhSYW5nZSh0aGlzLnJhbmdlLCB0aGlzLnllYXIpIHx8IFtdO1xuICAgIHRoaXMuZ3JpZFxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYW5nZSwgLnJhbmdlLXN0YXJ0LCAucmFuZ2UtZW5kLCAuc2VsZWN0ZWQsIC5mb2N1c2VkJylcbiAgICAgIC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdyYW5nZScsICdyYW5nZS1zdGFydCcsICdyYW5nZS1lbmQnLCAnc2VsZWN0ZWQnLCAnZm9jdXNlZCcpO1xuICAgICAgfSk7XG4gICAgQXJyYXkuZnJvbSh0aGlzLmdyaWQuY2hpbGRyZW4pLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgY2xhc3NMaXN0ID0gZWwuY2xhc3NMaXN0O1xuICAgICAgaWYgKGluZGV4ID4gcmFuZ2VTdGFydCAmJiBpbmRleCA8IHJhbmdlRW5kKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlJyk7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggPT09IHJhbmdlU3RhcnQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2Utc3RhcnQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCA9PT0gcmFuZ2VFbmQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UtZW5kJyk7XG4gICAgICB9XG4gICAgICBpZiAoc2VsZWN0ZWQuaW5jbHVkZXMoaW5kZXgpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggPT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIHZpZXcgVUkgYnkgYXBwbHlpbmcgdGhlIGNoYW5nZSBvZiBmb2N1c2VkIGl0ZW1cbiAgcmVmcmVzaEZvY3VzKCkge1xuICAgIHRoaXMuZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9jdXNlZCcpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdmb2N1c2VkJyk7XG4gICAgfSk7XG4gICAgdGhpcy5ncmlkLmNoaWxkcmVuW3RoaXMuZm9jdXNlZF0uY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICB9XG59IiwiaW1wb3J0IHtwdXNoVW5pcXVlfSBmcm9tICcuLi8uLi9saWIvdXRpbHMuanMnO1xuaW1wb3J0IHtwYXJzZUhUTUwsIHJlcGxhY2VDaGlsZE5vZGVzfSBmcm9tICcuLi8uLi9saWIvZG9tLmpzJztcblxuLy8gQmFzZSBjbGFzcyBvZiB0aGUgdmlldyBjbGFzc2VzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcbiAgY29uc3RydWN0b3IocGlja2VyLCBjb25maWcpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZywge1xuICAgICAgcGlja2VyLFxuICAgICAgZWxlbWVudDogcGFyc2VIVE1MKGA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci12aWV3XCI+PC9kaXY+YCkuZmlyc3RDaGlsZCxcbiAgICAgIHNlbGVjdGVkOiBbXSxcbiAgICB9KTtcbiAgICB0aGlzLmluaXQodGhpcy5waWNrZXIuZGF0ZXBpY2tlci5jb25maWcpO1xuICB9XG5cbiAgaW5pdChvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMucGlja0xldmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaXNNaW5WaWV3ID0gdGhpcy5pZCA9PT0gb3B0aW9ucy5waWNrTGV2ZWw7XG4gICAgfVxuICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLnVwZGF0ZUZvY3VzKCk7XG4gICAgdGhpcy51cGRhdGVTZWxlY3Rpb24oKTtcbiAgfVxuXG4gIC8vIEV4ZWN1dGUgYmVmb3JlU2hvdygpIGNhbGxiYWNrIGFuZCBhcHBseSB0aGUgcmVzdWx0IHRvIHRoZSBlbGVtZW50XG4gIC8vIGFyZ3M6XG4gIC8vIC0gY3VycmVudCAtIGN1cnJlbnQgdmFsdWUgb24gdGhlIGl0ZXJhdGlvbiBvbiB2aWV3IHJlbmRlcmluZ1xuICAvLyAtIHRpbWVWYWx1ZSAtIHRpbWUgdmFsdWUgb2YgdGhlIGRhdGUgdG8gcGFzcyB0byBiZWZvcmVTaG93KClcbiAgcGVyZm9ybUJlZm9yZUhvb2soZWwsIGN1cnJlbnQsIHRpbWVWYWx1ZSkge1xuICAgIGxldCByZXN1bHQgPSB0aGlzLmJlZm9yZVNob3cobmV3IERhdGUodGltZVZhbHVlKSk7XG4gICAgc3dpdGNoICh0eXBlb2YgcmVzdWx0KSB7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmVzdWx0ID0ge2VuYWJsZWQ6IHJlc3VsdH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgcmVzdWx0ID0ge2NsYXNzZXM6IHJlc3VsdH07XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdC5lbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICBwdXNoVW5pcXVlKHRoaXMuZGlzYWJsZWQsIGN1cnJlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdC5jbGFzc2VzKSB7XG4gICAgICAgIGNvbnN0IGV4dHJhQ2xhc3NlcyA9IHJlc3VsdC5jbGFzc2VzLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4uZXh0cmFDbGFzc2VzKTtcbiAgICAgICAgaWYgKGV4dHJhQ2xhc3Nlcy5pbmNsdWRlcygnZGlzYWJsZWQnKSkge1xuICAgICAgICAgIHB1c2hVbmlxdWUodGhpcy5kaXNhYmxlZCwgY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQuY29udGVudCkge1xuICAgICAgICByZXBsYWNlQ2hpbGROb2RlcyhlbCwgcmVzdWx0LmNvbnRlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtoYXNQcm9wZXJ0eSwgcHVzaFVuaXF1ZSwgY3JlYXRlVGFnUmVwZWF0fSBmcm9tICcuLi8uLi9saWIvdXRpbHMuanMnO1xuaW1wb3J0IHtkYXRlVmFsdWUsIHN0YXJ0T2ZZZWFyUGVyaW9kfSBmcm9tICcuLi8uLi9saWIvZGF0ZS5qcyc7XG5pbXBvcnQge3BhcnNlSFRNTH0gZnJvbSAnLi4vLi4vbGliL2RvbS5qcyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcuanMnO1xuXG5mdW5jdGlvbiB0b1RpdGxlQ2FzZSh3b3JkKSB7XG4gIHJldHVybiBbLi4ud29yZF0ucmVkdWNlKChzdHIsIGNoLCBpeCkgPT4gc3RyICs9IGl4ID8gY2ggOiBjaC50b1VwcGVyQ2FzZSgpLCAnJyk7XG59XG5cbi8vIENsYXNzIHJlcHJlc2VudGluZyB0aGUgeWVhcnMgYW5kIGRlY2FkZXMgdmlldyBlbGVtZW50c1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWWVhcnNWaWV3IGV4dGVuZHMgVmlldyB7XG4gIGNvbnN0cnVjdG9yKHBpY2tlciwgY29uZmlnKSB7XG4gICAgc3VwZXIocGlja2VyLCBjb25maWcpO1xuICB9XG5cbiAgaW5pdChvcHRpb25zLCBvbkNvbnN0cnVjdGlvbiA9IHRydWUpIHtcbiAgICBpZiAob25Db25zdHJ1Y3Rpb24pIHtcbiAgICAgIHRoaXMubmF2U3RlcCA9IHRoaXMuc3RlcCAqIDEwO1xuICAgICAgdGhpcy5iZWZvcmVTaG93T3B0aW9uID0gYGJlZm9yZVNob3cke3RvVGl0bGVDYXNlKHRoaXMuY2VsbENsYXNzKX1gO1xuICAgICAgdGhpcy5ncmlkID0gdGhpcy5lbGVtZW50O1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5uYW1lLCAnZGF0ZXBpY2tlci1ncmlkJyk7XG4gICAgICB0aGlzLmdyaWQuYXBwZW5kQ2hpbGQocGFyc2VIVE1MKGNyZWF0ZVRhZ1JlcGVhdCgnc3BhbicsIDEyKSkpO1xuICAgIH1cbiAgICBzdXBlci5pbml0KG9wdGlvbnMpO1xuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKGhhc1Byb3BlcnR5KG9wdGlvbnMsICdtaW5EYXRlJykpIHtcbiAgICAgIGlmIChvcHRpb25zLm1pbkRhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm1pblllYXIgPSB0aGlzLm1pbkRhdGUgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1pblllYXIgPSBzdGFydE9mWWVhclBlcmlvZChvcHRpb25zLm1pbkRhdGUsIHRoaXMuc3RlcCk7XG4gICAgICAgIHRoaXMubWluRGF0ZSA9IGRhdGVWYWx1ZSh0aGlzLm1pblllYXIsIDAsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaGFzUHJvcGVydHkob3B0aW9ucywgJ21heERhdGUnKSkge1xuICAgICAgaWYgKG9wdGlvbnMubWF4RGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubWF4WWVhciA9IHRoaXMubWF4RGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWF4WWVhciA9IHN0YXJ0T2ZZZWFyUGVyaW9kKG9wdGlvbnMubWF4RGF0ZSwgdGhpcy5zdGVwKTtcbiAgICAgICAgdGhpcy5tYXhEYXRlID0gZGF0ZVZhbHVlKHRoaXMubWF4WWVhciwgMTEsIDMxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaXNNaW5WaWV3KSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRlc0Rpc2FibGVkKSB7XG4gICAgICAgIHRoaXMuZGF0ZXNEaXNhYmxlZCA9IG9wdGlvbnMuZGF0ZXNEaXNhYmxlZDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRlc0Rpc2FibGVkID0gW107XG4gICAgfVxuICAgIGlmIChvcHRpb25zW3RoaXMuYmVmb3JlU2hvd09wdGlvbl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgYmVmb3JlU2hvdyA9IG9wdGlvbnNbdGhpcy5iZWZvcmVTaG93T3B0aW9uXTtcbiAgICAgIHRoaXMuYmVmb3JlU2hvdyA9IHR5cGVvZiBiZWZvcmVTaG93ID09PSAnZnVuY3Rpb24nID8gYmVmb3JlU2hvdyA6IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgdmlldydzIHNldHRpbmdzIHRvIHJlZmxlY3QgdGhlIHZpZXdEYXRlIHNldCBvbiB0aGUgcGlja2VyXG4gIHVwZGF0ZUZvY3VzKCkge1xuICAgIGNvbnN0IHZpZXdEYXRlID0gbmV3IERhdGUodGhpcy5waWNrZXIudmlld0RhdGUpO1xuICAgIGNvbnN0IGZpcnN0ID0gc3RhcnRPZlllYXJQZXJpb2Qodmlld0RhdGUsIHRoaXMubmF2U3RlcCk7XG4gICAgY29uc3QgbGFzdCA9IGZpcnN0ICsgOSAqIHRoaXMuc3RlcDtcblxuICAgIHRoaXMuZmlyc3QgPSBmaXJzdDtcbiAgICB0aGlzLmxhc3QgPSBsYXN0O1xuICAgIHRoaXMuc3RhcnQgPSBmaXJzdCAtIHRoaXMuc3RlcDtcbiAgICB0aGlzLmZvY3VzZWQgPSBzdGFydE9mWWVhclBlcmlvZCh2aWV3RGF0ZSwgdGhpcy5zdGVwKTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB2aWV3J3Mgc2V0dGluZ3MgdG8gcmVmbGVjdCB0aGUgc2VsZWN0ZWQgZGF0ZXNcbiAgdXBkYXRlU2VsZWN0aW9uKCkge1xuICAgIGNvbnN0IHtkYXRlcywgcmFuZ2VwaWNrZXJ9ID0gdGhpcy5waWNrZXIuZGF0ZXBpY2tlcjtcbiAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZXMucmVkdWNlKCh5ZWFycywgdGltZVZhbHVlKSA9PiB7XG4gICAgICByZXR1cm4gcHVzaFVuaXF1ZSh5ZWFycywgc3RhcnRPZlllYXJQZXJpb2QodGltZVZhbHVlLCB0aGlzLnN0ZXApKTtcbiAgICB9LCBbXSk7XG4gICAgaWYgKHJhbmdlcGlja2VyICYmIHJhbmdlcGlja2VyLmRhdGVzKSB7XG4gICAgICB0aGlzLnJhbmdlID0gcmFuZ2VwaWNrZXIuZGF0ZXMubWFwKHRpbWVWYWx1ZSA9PiB7XG4gICAgICAgIGlmICh0aW1lVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBzdGFydE9mWWVhclBlcmlvZCh0aW1lVmFsdWUsIHRoaXMuc3RlcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgZW50aXJlIHZpZXcgVUlcbiAgcmVuZGVyKCkge1xuICAgIC8vIHJlZnJlc2ggZGlzYWJsZWQgeWVhcnMgb24gZXZlcnkgcmVuZGVyIGluIG9yZGVyIHRvIGNsZWFyIHRoZSBvbmVzIGFkZGVkXG4gICAgLy8gYnkgYmVmb3JlU2hvdyBob29rIGF0IHByZXZpb3VzIHJlbmRlclxuICAgIC8vIHRoaXMuZGlzYWJsZWQgPSBbLi4udGhpcy5kYXRlc0Rpc2FibGVkXTtcbiAgICB0aGlzLmRpc2FibGVkID0gdGhpcy5kYXRlc0Rpc2FibGVkLm1hcChkaXNhYmxlZCA9PiBuZXcgRGF0ZShkaXNhYmxlZCkuZ2V0RnVsbFllYXIoKSk7XG5cbiAgICB0aGlzLnBpY2tlci5zZXRWaWV3U3dpdGNoTGFiZWwoYCR7dGhpcy5maXJzdH0tJHt0aGlzLmxhc3R9YCk7XG4gICAgdGhpcy5waWNrZXIuc2V0UHJldkJ0bkRpc2FibGVkKHRoaXMuZmlyc3QgPD0gdGhpcy5taW5ZZWFyKTtcbiAgICB0aGlzLnBpY2tlci5zZXROZXh0QnRuRGlzYWJsZWQodGhpcy5sYXN0ID49IHRoaXMubWF4WWVhcik7XG5cbiAgICBBcnJheS5mcm9tKHRoaXMuZ3JpZC5jaGlsZHJlbikuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjbGFzc0xpc3QgPSBlbC5jbGFzc0xpc3Q7XG4gICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5zdGFydCArIChpbmRleCAqIHRoaXMuc3RlcCk7XG4gICAgICBjb25zdCBkYXRlID0gZGF0ZVZhbHVlKGN1cnJlbnQsIDAsIDEpO1xuXG4gICAgICBlbC5jbGFzc05hbWUgPSBgZGF0ZXBpY2tlci1jZWxsICR7dGhpcy5jZWxsQ2xhc3N9YDtcbiAgICAgIGlmICh0aGlzLmlzTWluVmlldykge1xuICAgICAgICBlbC5kYXRhc2V0LmRhdGUgPSBkYXRlO1xuICAgICAgfVxuICAgICAgZWwudGV4dENvbnRlbnQgPSBlbC5kYXRhc2V0LnllYXIgPSBjdXJyZW50O1xuXG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncHJldicpO1xuICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMTEpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnbmV4dCcpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPCB0aGlzLm1pblllYXIgfHwgY3VycmVudCA+IHRoaXMubWF4WWVhciB8fCB0aGlzLmRpc2FibGVkLmluY2x1ZGVzKGN1cnJlbnQpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gdGhpcy5yYW5nZTtcbiAgICAgICAgaWYgKGN1cnJlbnQgPiByYW5nZVN0YXJ0ICYmIGN1cnJlbnQgPCByYW5nZUVuZCkge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IHJhbmdlU3RhcnQpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1zdGFydCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50ID09PSByYW5nZUVuZCkge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLWVuZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZC5pbmNsdWRlcyhjdXJyZW50KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmJlZm9yZVNob3cpIHtcbiAgICAgICAgdGhpcy5wZXJmb3JtQmVmb3JlSG9vayhlbCwgY3VycmVudCwgZGF0ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIHZpZXcgVUkgYnkgYXBwbHlpbmcgdGhlIGNoYW5nZXMgb2Ygc2VsZWN0ZWQgYW5kIGZvY3VzZWQgaXRlbXNcbiAgcmVmcmVzaCgpIHtcbiAgICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gdGhpcy5yYW5nZSB8fCBbXTtcbiAgICB0aGlzLmdyaWRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcucmFuZ2UsIC5yYW5nZS1zdGFydCwgLnJhbmdlLWVuZCwgLnNlbGVjdGVkLCAuZm9jdXNlZCcpXG4gICAgICAuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncmFuZ2UnLCAncmFuZ2Utc3RhcnQnLCAncmFuZ2UtZW5kJywgJ3NlbGVjdGVkJywgJ2ZvY3VzZWQnKTtcbiAgICAgIH0pO1xuICAgIEFycmF5LmZyb20odGhpcy5ncmlkLmNoaWxkcmVuKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudCA9IE51bWJlcihlbC50ZXh0Q29udGVudCk7XG4gICAgICBjb25zdCBjbGFzc0xpc3QgPSBlbC5jbGFzc0xpc3Q7XG4gICAgICBpZiAoY3VycmVudCA+IHJhbmdlU3RhcnQgJiYgY3VycmVudCA8IHJhbmdlRW5kKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlJyk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA9PT0gcmFuZ2VTdGFydCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1zdGFydCcpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHJhbmdlRW5kKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLWVuZCcpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQuaW5jbHVkZXMoY3VycmVudCkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ID09PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSB2aWV3IFVJIGJ5IGFwcGx5aW5nIHRoZSBjaGFuZ2Ugb2YgZm9jdXNlZCBpdGVtXG4gIHJlZnJlc2hGb2N1cygpIHtcbiAgICBjb25zdCBpbmRleCA9IE1hdGgucm91bmQoKHRoaXMuZm9jdXNlZCAtIHRoaXMuc3RhcnQpIC8gdGhpcy5zdGVwKTtcbiAgICB0aGlzLmdyaWQucXVlcnlTZWxlY3RvckFsbCgnLmZvY3VzZWQnKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnZm9jdXNlZCcpO1xuICAgIH0pO1xuICAgIHRoaXMuZ3JpZC5jaGlsZHJlbltpbmRleF0uY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vcmVuZGVyIGluYm94XHJcbmltcG9ydCBVSSBmcm9tICcuL3VpLmpzJztcclxuaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0LmpzJztcclxuaW1wb3J0IHRhc2sgZnJvbSAnLi90YXNrLmpzJ1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xyXG5cclxuKCgpID0+IHtcclxuICAgIHJlbmRlckRlZmF1bHRQcm9qZWN0cygpO1xyXG5cclxuICAgIFVJLmluaXRpYWxSZW5kZXIoKTtcclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJEZWZhdWx0UHJvamVjdHMoKXtcclxuICAgICAgICBsZXQgaW5ib3ggPSBwcm9qZWN0KCdJbmJveCcpO1xyXG4gICAgICAgIGxldCB0b2RheSA9IHByb2plY3QoJ1RvZGF5Jyk7XHJcbiAgICAgICAgbGV0IHRoaXN3ZWVrID0gcHJvamVjdCgnVGhpcyBXZWVrJyk7XHJcbiAgICAgICAgbGV0IGhhdmVGdW4gPSB0YXNrKFwiSGF2ZSBGdW5cIixcIkxlYXJuIGEgbG90IHdoaWxlIGhhdmluZyBmdW5cIik7XHJcbiAgICAgICAgc3RvcmFnZS5hZGRQcm9qZWN0KGluYm94KTtcclxuICAgICAgICBpbmJveC5hZGRUYXNrKGhhdmVGdW4pO1xyXG4gICAgICAgIHN0b3JhZ2UuYWRkUHJvamVjdCh0b2RheSk7XHJcbiAgICAgICAgc3RvcmFnZS5hZGRQcm9qZWN0KHRoaXN3ZWVrKTtcclxuICAgIH1cclxuXHJcblxyXG59KSgpO1xyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9