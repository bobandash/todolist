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
        const todayNav = document.querySelector('a[data-project-index="1"]');
        const thisWeekNav = document.querySelector('a[data-project-index="2"]');
        
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsaUVBQWUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7O0FDakNpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHNEQUFZO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUZuQjtBQUNtQztBQUNOO0FBQ007QUFDVztBQUNXO0FBQ3RCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHNFQUEwQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUVBQTJCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLHVEQUFPO0FBQ2hELHdCQUF3Qiw4REFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLCtEQUFtQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsR0FBRyxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDREQUFZLGtDQUFrQyxvQkFBb0I7QUFDdEY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuR0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlEQTtBQUNBLE9BQU8sdUNBQXVDOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QUFPO0FBQzNCLHVCQUF1Qix1REFBTztBQUM5QixzQkFBc0Isb0RBQUk7QUFDMUIsUUFBUSw4REFBa0I7QUFDMUI7QUFDQSxRQUFRLDhEQUFrQjtBQUMxQixRQUFRLDhEQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9jcmVhdGVQb3BwZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2NvbnRhaW5zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldENsaXBwaW5nUmVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q29tcG9zaXRlUmVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRFbGVtZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXREb2N1bWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXROb2RlTmFtZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRQYXJlbnROb2RlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRTY3JvbGxQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFZpZXdwb3J0UmVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0V2luZG93LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3dTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFdpbmRvd1Njcm9sbEJhclguanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2luc3RhbmNlT2YuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzTGF5b3V0Vmlld3BvcnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzU2Nyb2xsUGFyZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pc1RhYmxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvbGlzdFNjcm9sbFBhcmVudHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZW51bXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9hcnJvdy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvY29tcHV0ZVN0eWxlcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2ZsaXAuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2hpZGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9vZmZzZXQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL3BvcHBlck9mZnNldHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL3ByZXZlbnRPdmVyZmxvdy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9wb3BwZXItbGl0ZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9wb3BwZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvY29tcHV0ZUF1dG9QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvY29tcHV0ZU9mZnNldHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZXhwYW5kVG9IYXNoTWFwLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2Zvcm1hdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRBbHRBeGlzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0RnJlc2hTaWRlT2JqZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRPcHBvc2l0ZVBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRWYXJpYXRpb24uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWF0aC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9tZXJnZUJ5TmFtZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9tZXJnZVBhZGRpbmdPYmplY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvb3JkZXJNb2RpZmllcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvcmVjdFRvQ2xpZW50UmVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy91bmlxdWVCeS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy91c2VyQWdlbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvdmFsaWRhdGVNb2RpZmllcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvd2l0aGluLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaGVscGVyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdWJ0YXNrLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3VpLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvRGF0ZXBpY2tlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2V2ZW50cy9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9ldmVudHMvaW5wdXRGaWVsZExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2V2ZW50cy9vdGhlckxpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2V2ZW50cy9waWNrZXJMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9pMThuL2Jhc2UtbG9jYWxlcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2xpYi9kYXRlLWZvcm1hdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2xpYi9kYXRlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvbGliL2RvbS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2xpYi9ldmVudC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL29wdGlvbnMvZGVmYXVsdE9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9vcHRpb25zL3Byb2Nlc3NPcHRpb25zLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvcGlja2VyL1BpY2tlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL3BpY2tlci90ZW1wbGF0ZXMvY2FsZW5kYXJXZWVrc1RlbXBsYXRlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvcGlja2VyL3RlbXBsYXRlcy9kYXlzVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9waWNrZXIvdGVtcGxhdGVzL3BpY2tlclRlbXBsYXRlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvcGlja2VyL3ZpZXdzL0RheXNWaWV3LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvdmFuaWxsYWpzLWRhdGVwaWNrZXIvanMvcGlja2VyL3ZpZXdzL01vbnRoc1ZpZXcuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy92YW5pbGxhanMtZGF0ZXBpY2tlci9qcy9waWNrZXIvdmlld3MvVmlldy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3ZhbmlsbGFqcy1kYXRlcGlja2VyL2pzL3BpY2tlci92aWV3cy9ZZWFyc1ZpZXcuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdldENvbXBvc2l0ZVJlY3QgZnJvbSBcIi4vZG9tLXV0aWxzL2dldENvbXBvc2l0ZVJlY3QuanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzXCI7XG5pbXBvcnQgbGlzdFNjcm9sbFBhcmVudHMgZnJvbSBcIi4vZG9tLXV0aWxzL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2RvbS11dGlscy9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgb3JkZXJNb2RpZmllcnMgZnJvbSBcIi4vdXRpbHMvb3JkZXJNb2RpZmllcnMuanNcIjtcbmltcG9ydCBkZWJvdW5jZSBmcm9tIFwiLi91dGlscy9kZWJvdW5jZS5qc1wiO1xuaW1wb3J0IHZhbGlkYXRlTW9kaWZpZXJzIGZyb20gXCIuL3V0aWxzL3ZhbGlkYXRlTW9kaWZpZXJzLmpzXCI7XG5pbXBvcnQgdW5pcXVlQnkgZnJvbSBcIi4vdXRpbHMvdW5pcXVlQnkuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBtZXJnZUJ5TmFtZSBmcm9tIFwiLi91dGlscy9tZXJnZUJ5TmFtZS5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgeyBpc0VsZW1lbnQgfSBmcm9tIFwiLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuL2VudW1zLmpzXCI7XG52YXIgSU5WQUxJRF9FTEVNRU5UX0VSUk9SID0gJ1BvcHBlcjogSW52YWxpZCByZWZlcmVuY2Ugb3IgcG9wcGVyIGFyZ3VtZW50IHByb3ZpZGVkLiBUaGV5IG11c3QgYmUgZWl0aGVyIGEgRE9NIGVsZW1lbnQgb3IgdmlydHVhbCBlbGVtZW50Lic7XG52YXIgSU5GSU5JVEVfTE9PUF9FUlJPUiA9ICdQb3BwZXI6IEFuIGluZmluaXRlIGxvb3AgaW4gdGhlIG1vZGlmaWVycyBjeWNsZSBoYXMgYmVlbiBkZXRlY3RlZCEgVGhlIGN5Y2xlIGhhcyBiZWVuIGludGVycnVwdGVkIHRvIHByZXZlbnQgYSBicm93c2VyIGNyYXNoLic7XG52YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICBtb2RpZmllcnM6IFtdLFxuICBzdHJhdGVneTogJ2Fic29sdXRlJ1xufTtcblxuZnVuY3Rpb24gYXJlVmFsaWRFbGVtZW50cygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiAhYXJncy5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuICEoZWxlbWVudCAmJiB0eXBlb2YgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHBlckdlbmVyYXRvcihnZW5lcmF0b3JPcHRpb25zKSB7XG4gIGlmIChnZW5lcmF0b3JPcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBnZW5lcmF0b3JPcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX2dlbmVyYXRvck9wdGlvbnMgPSBnZW5lcmF0b3JPcHRpb25zLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmID0gX2dlbmVyYXRvck9wdGlvbnMuZGVmYXVsdE1vZGlmaWVycyxcbiAgICAgIGRlZmF1bHRNb2RpZmllcnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYgPT09IHZvaWQgMCA/IFtdIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmMiA9IF9nZW5lcmF0b3JPcHRpb25zLmRlZmF1bHRPcHRpb25zLFxuICAgICAgZGVmYXVsdE9wdGlvbnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyID09PSB2b2lkIDAgPyBERUZBVUxUX09QVElPTlMgOiBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyO1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUG9wcGVyKHJlZmVyZW5jZSwgcG9wcGVyLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIH1cblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICBvcmRlcmVkTW9kaWZpZXJzOiBbXSxcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgZGVmYXVsdE9wdGlvbnMpLFxuICAgICAgbW9kaWZpZXJzRGF0YToge30sXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICByZWZlcmVuY2U6IHJlZmVyZW5jZSxcbiAgICAgICAgcG9wcGVyOiBwb3BwZXJcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9O1xuICAgIHZhciBlZmZlY3RDbGVhbnVwRm5zID0gW107XG4gICAgdmFyIGlzRGVzdHJveWVkID0gZmFsc2U7XG4gICAgdmFyIGluc3RhbmNlID0ge1xuICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgc2V0T3B0aW9uczogZnVuY3Rpb24gc2V0T3B0aW9ucyhzZXRPcHRpb25zQWN0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIHNldE9wdGlvbnNBY3Rpb24gPT09ICdmdW5jdGlvbicgPyBzZXRPcHRpb25zQWN0aW9uKHN0YXRlLm9wdGlvbnMpIDogc2V0T3B0aW9uc0FjdGlvbjtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBzdGF0ZS5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIHN0YXRlLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBzdGF0ZS5zY3JvbGxQYXJlbnRzID0ge1xuICAgICAgICAgIHJlZmVyZW5jZTogaXNFbGVtZW50KHJlZmVyZW5jZSkgPyBsaXN0U2Nyb2xsUGFyZW50cyhyZWZlcmVuY2UpIDogcmVmZXJlbmNlLmNvbnRleHRFbGVtZW50ID8gbGlzdFNjcm9sbFBhcmVudHMocmVmZXJlbmNlLmNvbnRleHRFbGVtZW50KSA6IFtdLFxuICAgICAgICAgIHBvcHBlcjogbGlzdFNjcm9sbFBhcmVudHMocG9wcGVyKVxuICAgICAgICB9OyAvLyBPcmRlcnMgdGhlIG1vZGlmaWVycyBiYXNlZCBvbiB0aGVpciBkZXBlbmRlbmNpZXMgYW5kIGBwaGFzZWBcbiAgICAgICAgLy8gcHJvcGVydGllc1xuXG4gICAgICAgIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXJNb2RpZmllcnMobWVyZ2VCeU5hbWUoW10uY29uY2F0KGRlZmF1bHRNb2RpZmllcnMsIHN0YXRlLm9wdGlvbnMubW9kaWZpZXJzKSkpOyAvLyBTdHJpcCBvdXQgZGlzYWJsZWQgbW9kaWZpZXJzXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyZWRNb2RpZmllcnMuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgcmV0dXJuIG0uZW5hYmxlZDtcbiAgICAgICAgfSk7IC8vIFZhbGlkYXRlIHRoZSBwcm92aWRlZCBtb2RpZmllcnMgc28gdGhhdCB0aGUgY29uc3VtZXIgd2lsbCBnZXQgd2FybmVkXG4gICAgICAgIC8vIGlmIG9uZSBvZiB0aGUgbW9kaWZpZXJzIGlzIGludmFsaWQgZm9yIGFueSByZWFzb25cblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgdmFyIG1vZGlmaWVycyA9IHVuaXF1ZUJ5KFtdLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLCBzdGF0ZS5vcHRpb25zLm1vZGlmaWVycyksIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IF9yZWYubmFtZTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkYXRlTW9kaWZpZXJzKG1vZGlmaWVycyk7XG5cbiAgICAgICAgICBpZiAoZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5vcHRpb25zLnBsYWNlbWVudCkgPT09IGF1dG8pIHtcbiAgICAgICAgICAgIHZhciBmbGlwTW9kaWZpZXIgPSBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZpbmQoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgICAgICAgIHZhciBuYW1lID0gX3JlZjIubmFtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5hbWUgPT09ICdmbGlwJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWZsaXBNb2RpZmllcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBcImF1dG9cIiBwbGFjZW1lbnRzIHJlcXVpcmUgdGhlIFwiZmxpcFwiIG1vZGlmaWVyIGJlJywgJ3ByZXNlbnQgYW5kIGVuYWJsZWQgdG8gd29yay4nXS5qb2luKCcgJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUocG9wcGVyKSxcbiAgICAgICAgICAgICAgbWFyZ2luVG9wID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luVG9wLFxuICAgICAgICAgICAgICBtYXJnaW5SaWdodCA9IF9nZXRDb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0LFxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b20gPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5Cb3R0b20sXG4gICAgICAgICAgICAgIG1hcmdpbkxlZnQgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5MZWZ0OyAvLyBXZSBubyBsb25nZXIgdGFrZSBpbnRvIGFjY291bnQgYG1hcmdpbnNgIG9uIHRoZSBwb3BwZXIsIGFuZCBpdCBjYW5cbiAgICAgICAgICAvLyBjYXVzZSBidWdzIHdpdGggcG9zaXRpb25pbmcsIHNvIHdlJ2xsIHdhcm4gdGhlIGNvbnN1bWVyXG5cblxuICAgICAgICAgIGlmIChbbWFyZ2luVG9wLCBtYXJnaW5SaWdodCwgbWFyZ2luQm90dG9tLCBtYXJnaW5MZWZ0XS5zb21lKGZ1bmN0aW9uIChtYXJnaW4pIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG1hcmdpbik7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihbJ1BvcHBlcjogQ1NTIFwibWFyZ2luXCIgc3R5bGVzIGNhbm5vdCBiZSB1c2VkIHRvIGFwcGx5IHBhZGRpbmcnLCAnYmV0d2VlbiB0aGUgcG9wcGVyIGFuZCBpdHMgcmVmZXJlbmNlIGVsZW1lbnQgb3IgYm91bmRhcnkuJywgJ1RvIHJlcGxpY2F0ZSBtYXJnaW4sIHVzZSB0aGUgYG9mZnNldGAgbW9kaWZpZXIsIGFzIHdlbGwgYXMnLCAndGhlIGBwYWRkaW5nYCBvcHRpb24gaW4gdGhlIGBwcmV2ZW50T3ZlcmZsb3dgIGFuZCBgZmxpcGAnLCAnbW9kaWZpZXJzLiddLmpvaW4oJyAnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcnVuTW9kaWZpZXJFZmZlY3RzKCk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICAvLyBTeW5jIHVwZGF0ZSDigJMgaXQgd2lsbCBhbHdheXMgYmUgZXhlY3V0ZWQsIGV2ZW4gaWYgbm90IG5lY2Vzc2FyeS4gVGhpc1xuICAgICAgLy8gaXMgdXNlZnVsIGZvciBsb3cgZnJlcXVlbmN5IHVwZGF0ZXMgd2hlcmUgc3luYyBiZWhhdmlvciBzaW1wbGlmaWVzIHRoZVxuICAgICAgLy8gbG9naWMuXG4gICAgICAvLyBGb3IgaGlnaCBmcmVxdWVuY3kgdXBkYXRlcyAoZS5nLiBgcmVzaXplYCBhbmQgYHNjcm9sbGAgZXZlbnRzKSwgYWx3YXlzXG4gICAgICAvLyBwcmVmZXIgdGhlIGFzeW5jIFBvcHBlciN1cGRhdGUgbWV0aG9kXG4gICAgICBmb3JjZVVwZGF0ZTogZnVuY3Rpb24gZm9yY2VVcGRhdGUoKSB7XG4gICAgICAgIGlmIChpc0Rlc3Ryb3llZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfc3RhdGUkZWxlbWVudHMgPSBzdGF0ZS5lbGVtZW50cyxcbiAgICAgICAgICAgIHJlZmVyZW5jZSA9IF9zdGF0ZSRlbGVtZW50cy5yZWZlcmVuY2UsXG4gICAgICAgICAgICBwb3BwZXIgPSBfc3RhdGUkZWxlbWVudHMucG9wcGVyOyAvLyBEb24ndCBwcm9jZWVkIGlmIGByZWZlcmVuY2VgIG9yIGBwb3BwZXJgIGFyZSBub3QgdmFsaWQgZWxlbWVudHNcbiAgICAgICAgLy8gYW55bW9yZVxuXG4gICAgICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKElOVkFMSURfRUxFTUVOVF9FUlJPUik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFN0b3JlIHRoZSByZWZlcmVuY2UgYW5kIHBvcHBlciByZWN0cyB0byBiZSByZWFkIGJ5IG1vZGlmaWVyc1xuXG5cbiAgICAgICAgc3RhdGUucmVjdHMgPSB7XG4gICAgICAgICAgcmVmZXJlbmNlOiBnZXRDb21wb3NpdGVSZWN0KHJlZmVyZW5jZSwgZ2V0T2Zmc2V0UGFyZW50KHBvcHBlciksIHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3kgPT09ICdmaXhlZCcpLFxuICAgICAgICAgIHBvcHBlcjogZ2V0TGF5b3V0UmVjdChwb3BwZXIpXG4gICAgICAgIH07IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIHJlc2V0IHRoZSBjdXJyZW50IHVwZGF0ZSBjeWNsZS4gVGhlXG4gICAgICAgIC8vIG1vc3QgY29tbW9uIHVzZSBjYXNlIGZvciB0aGlzIGlzIHRoZSBgZmxpcGAgbW9kaWZpZXIgY2hhbmdpbmcgdGhlXG4gICAgICAgIC8vIHBsYWNlbWVudCwgd2hpY2ggdGhlbiBuZWVkcyB0byByZS1ydW4gYWxsIHRoZSBtb2RpZmllcnMsIGJlY2F1c2UgdGhlXG4gICAgICAgIC8vIGxvZ2ljIHdhcyBwcmV2aW91c2x5IHJhbiBmb3IgdGhlIHByZXZpb3VzIHBsYWNlbWVudCBhbmQgaXMgdGhlcmVmb3JlXG4gICAgICAgIC8vIHN0YWxlL2luY29ycmVjdFxuXG4gICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLnBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50OyAvLyBPbiBlYWNoIHVwZGF0ZSBjeWNsZSwgdGhlIGBtb2RpZmllcnNEYXRhYCBwcm9wZXJ0eSBmb3IgZWFjaCBtb2RpZmllclxuICAgICAgICAvLyBpcyBmaWxsZWQgd2l0aCB0aGUgaW5pdGlhbCBkYXRhIHNwZWNpZmllZCBieSB0aGUgbW9kaWZpZXIuIFRoaXMgbWVhbnNcbiAgICAgICAgLy8gaXQgZG9lc24ndCBwZXJzaXN0IGFuZCBpcyBmcmVzaCBvbiBlYWNoIHVwZGF0ZS5cbiAgICAgICAgLy8gVG8gZW5zdXJlIHBlcnNpc3RlbnQgZGF0YSwgdXNlIGAke25hbWV9I3BlcnNpc3RlbnRgXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5tb2RpZmllcnNEYXRhW21vZGlmaWVyLm5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kaWZpZXIuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgX19kZWJ1Z19sb29wc19fID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBfX2RlYnVnX2xvb3BzX18gKz0gMTtcblxuICAgICAgICAgICAgaWYgKF9fZGVidWdfbG9vcHNfXyA+IDEwMCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKElORklOSVRFX0xPT1BfRVJST1IpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RhdGUucmVzZXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIF9zdGF0ZSRvcmRlcmVkTW9kaWZpZSA9IHN0YXRlLm9yZGVyZWRNb2RpZmllcnNbaW5kZXhdLFxuICAgICAgICAgICAgICBmbiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5mbixcbiAgICAgICAgICAgICAgX3N0YXRlJG9yZGVyZWRNb2RpZmllMiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5vcHRpb25zLFxuICAgICAgICAgICAgICBfb3B0aW9ucyA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIgPT09IHZvaWQgMCA/IHt9IDogX3N0YXRlJG9yZGVyZWRNb2RpZmllMixcbiAgICAgICAgICAgICAgbmFtZSA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5uYW1lO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc3RhdGUgPSBmbih7XG4gICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgICAgb3B0aW9uczogX29wdGlvbnMsXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxuICAgICAgICAgICAgfSkgfHwgc3RhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gQXN5bmMgYW5kIG9wdGltaXN0aWNhbGx5IG9wdGltaXplZCB1cGRhdGUg4oCTIGl0IHdpbGwgbm90IGJlIGV4ZWN1dGVkIGlmXG4gICAgICAvLyBub3QgbmVjZXNzYXJ5IChkZWJvdW5jZWQgdG8gcnVuIGF0IG1vc3Qgb25jZS1wZXItdGljaylcbiAgICAgIHVwZGF0ZTogZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICBpbnN0YW5jZS5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgIHJlc29sdmUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBpc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihJTlZBTElEX0VMRU1FTlRfRVJST1IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgaW5zdGFuY2Uuc2V0T3B0aW9ucyhvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgaWYgKCFpc0Rlc3Ryb3llZCAmJiBvcHRpb25zLm9uRmlyc3RVcGRhdGUpIHtcbiAgICAgICAgb3B0aW9ucy5vbkZpcnN0VXBkYXRlKHN0YXRlKTtcbiAgICAgIH1cbiAgICB9KTsgLy8gTW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSBiZWZvcmUgdGhlIGZpcnN0XG4gICAgLy8gdXBkYXRlIGN5Y2xlIHJ1bnMuIFRoZXkgd2lsbCBiZSBleGVjdXRlZCBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgdXBkYXRlXG4gICAgLy8gY3ljbGUuIFRoaXMgaXMgdXNlZnVsIHdoZW4gYSBtb2RpZmllciBhZGRzIHNvbWUgcGVyc2lzdGVudCBkYXRhIHRoYXRcbiAgICAvLyBvdGhlciBtb2RpZmllcnMgbmVlZCB0byB1c2UsIGJ1dCB0aGUgbW9kaWZpZXIgaXMgcnVuIGFmdGVyIHRoZSBkZXBlbmRlbnRcbiAgICAvLyBvbmUuXG5cbiAgICBmdW5jdGlvbiBydW5Nb2RpZmllckVmZmVjdHMoKSB7XG4gICAgICBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICAgIHZhciBuYW1lID0gX3JlZjMubmFtZSxcbiAgICAgICAgICAgIF9yZWYzJG9wdGlvbnMgPSBfcmVmMy5vcHRpb25zLFxuICAgICAgICAgICAgb3B0aW9ucyA9IF9yZWYzJG9wdGlvbnMgPT09IHZvaWQgMCA/IHt9IDogX3JlZjMkb3B0aW9ucyxcbiAgICAgICAgICAgIGVmZmVjdCA9IF9yZWYzLmVmZmVjdDtcblxuICAgICAgICBpZiAodHlwZW9mIGVmZmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBjbGVhbnVwRm4gPSBlZmZlY3Qoe1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBub29wRm4gPSBmdW5jdGlvbiBub29wRm4oKSB7fTtcblxuICAgICAgICAgIGVmZmVjdENsZWFudXBGbnMucHVzaChjbGVhbnVwRm4gfHwgbm9vcEZuKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpIHtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICB9KTtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMgPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG59XG5leHBvcnQgdmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3IoKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBkZXRlY3RPdmVyZmxvdyB9OyIsImltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhaW5zKHBhcmVudCwgY2hpbGQpIHtcbiAgdmFyIHJvb3ROb2RlID0gY2hpbGQuZ2V0Um9vdE5vZGUgJiYgY2hpbGQuZ2V0Um9vdE5vZGUoKTsgLy8gRmlyc3QsIGF0dGVtcHQgd2l0aCBmYXN0ZXIgbmF0aXZlIG1ldGhvZFxuXG4gIGlmIChwYXJlbnQuY29udGFpbnMoY2hpbGQpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gdGhlbiBmYWxsYmFjayB0byBjdXN0b20gaW1wbGVtZW50YXRpb24gd2l0aCBTaGFkb3cgRE9NIHN1cHBvcnRcbiAgZWxzZSBpZiAocm9vdE5vZGUgJiYgaXNTaGFkb3dSb290KHJvb3ROb2RlKSkge1xuICAgICAgdmFyIG5leHQgPSBjaGlsZDtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAobmV4dCAmJiBwYXJlbnQuaXNTYW1lTm9kZShuZXh0KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXTogbmVlZCBhIGJldHRlciB3YXkgdG8gaGFuZGxlIHRoaXMuLi5cblxuXG4gICAgICAgIG5leHQgPSBuZXh0LnBhcmVudE5vZGUgfHwgbmV4dC5ob3N0O1xuICAgICAgfSB3aGlsZSAobmV4dCk7XG4gICAgfSAvLyBHaXZlIHVwLCB0aGUgcmVzdWx0IGlzIGZhbHNlXG5cblxuICByZXR1cm4gZmFsc2U7XG59IiwiaW1wb3J0IHsgaXNFbGVtZW50LCBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc0xheW91dFZpZXdwb3J0IGZyb20gXCIuL2lzTGF5b3V0Vmlld3BvcnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50LCBpbmNsdWRlU2NhbGUsIGlzRml4ZWRTdHJhdGVneSkge1xuICBpZiAoaW5jbHVkZVNjYWxlID09PSB2b2lkIDApIHtcbiAgICBpbmNsdWRlU2NhbGUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc0ZpeGVkU3RyYXRlZ3kgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWRTdHJhdGVneSA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIGNsaWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc2NhbGVYID0gMTtcbiAgdmFyIHNjYWxlWSA9IDE7XG5cbiAgaWYgKGluY2x1ZGVTY2FsZSAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgc2NhbGVYID0gZWxlbWVudC5vZmZzZXRXaWR0aCA+IDAgPyByb3VuZChjbGllbnRSZWN0LndpZHRoKSAvIGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgMSA6IDE7XG4gICAgc2NhbGVZID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgPiAwID8gcm91bmQoY2xpZW50UmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMSA6IDE7XG4gIH1cblxuICB2YXIgX3JlZiA9IGlzRWxlbWVudChlbGVtZW50KSA/IGdldFdpbmRvdyhlbGVtZW50KSA6IHdpbmRvdyxcbiAgICAgIHZpc3VhbFZpZXdwb3J0ID0gX3JlZi52aXN1YWxWaWV3cG9ydDtcblxuICB2YXIgYWRkVmlzdWFsT2Zmc2V0cyA9ICFpc0xheW91dFZpZXdwb3J0KCkgJiYgaXNGaXhlZFN0cmF0ZWd5O1xuICB2YXIgeCA9IChjbGllbnRSZWN0LmxlZnQgKyAoYWRkVmlzdWFsT2Zmc2V0cyAmJiB2aXN1YWxWaWV3cG9ydCA/IHZpc3VhbFZpZXdwb3J0Lm9mZnNldExlZnQgOiAwKSkgLyBzY2FsZVg7XG4gIHZhciB5ID0gKGNsaWVudFJlY3QudG9wICsgKGFkZFZpc3VhbE9mZnNldHMgJiYgdmlzdWFsVmlld3BvcnQgPyB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3AgOiAwKSkgLyBzY2FsZVk7XG4gIHZhciB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGggLyBzY2FsZVg7XG4gIHZhciBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodCAvIHNjYWxlWTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgdG9wOiB5LFxuICAgIHJpZ2h0OiB4ICsgd2lkdGgsXG4gICAgYm90dG9tOiB5ICsgaGVpZ2h0LFxuICAgIGxlZnQ6IHgsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiaW1wb3J0IHsgdmlld3BvcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRWaWV3cG9ydFJlY3QgZnJvbSBcIi4vZ2V0Vmlld3BvcnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRSZWN0IGZyb20gXCIuL2dldERvY3VtZW50UmVjdC5qc1wiO1xuaW1wb3J0IGxpc3RTY3JvbGxQYXJlbnRzIGZyb20gXCIuL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgY29udGFpbnMgZnJvbSBcIi4vY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHJlY3RUb0NsaWVudFJlY3QgZnJvbSBcIi4uL3V0aWxzL3JlY3RUb0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCB7IG1heCwgbWluIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcblxuZnVuY3Rpb24gZ2V0SW5uZXJCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgZmFsc2UsIHN0cmF0ZWd5ID09PSAnZml4ZWQnKTtcbiAgcmVjdC50b3AgPSByZWN0LnRvcCArIGVsZW1lbnQuY2xpZW50VG9wO1xuICByZWN0LmxlZnQgPSByZWN0LmxlZnQgKyBlbGVtZW50LmNsaWVudExlZnQ7XG4gIHJlY3QuYm90dG9tID0gcmVjdC50b3AgKyBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgcmVjdC5yaWdodCA9IHJlY3QubGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIHJlY3Qud2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICByZWN0LmhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICByZWN0LnggPSByZWN0LmxlZnQ7XG4gIHJlY3QueSA9IHJlY3QudG9wO1xuICByZXR1cm4gcmVjdDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgY2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KSB7XG4gIHJldHVybiBjbGlwcGluZ1BhcmVudCA9PT0gdmlld3BvcnQgPyByZWN0VG9DbGllbnRSZWN0KGdldFZpZXdwb3J0UmVjdChlbGVtZW50LCBzdHJhdGVneSkpIDogaXNFbGVtZW50KGNsaXBwaW5nUGFyZW50KSA/IGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSkgOiByZWN0VG9DbGllbnRSZWN0KGdldERvY3VtZW50UmVjdChnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkpKTtcbn0gLy8gQSBcImNsaXBwaW5nIHBhcmVudFwiIGlzIGFuIG92ZXJmbG93YWJsZSBjb250YWluZXIgd2l0aCB0aGUgY2hhcmFjdGVyaXN0aWMgb2Zcbi8vIGNsaXBwaW5nIChvciBoaWRpbmcpIG92ZXJmbG93aW5nIGVsZW1lbnRzIHdpdGggYSBwb3NpdGlvbiBkaWZmZXJlbnQgZnJvbVxuLy8gYGluaXRpYWxgXG5cblxuZnVuY3Rpb24gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIHtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IGxpc3RTY3JvbGxQYXJlbnRzKGdldFBhcmVudE5vZGUoZWxlbWVudCkpO1xuICB2YXIgY2FuRXNjYXBlQ2xpcHBpbmcgPSBbJ2Fic29sdXRlJywgJ2ZpeGVkJ10uaW5kZXhPZihnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uKSA+PSAwO1xuICB2YXIgY2xpcHBlckVsZW1lbnQgPSBjYW5Fc2NhcGVDbGlwcGluZyAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpID8gZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQpIDogZWxlbWVudDtcblxuICBpZiAoIWlzRWxlbWVudChjbGlwcGVyRWxlbWVudCkpIHtcbiAgICByZXR1cm4gW107XG4gIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzE0MTRcblxuXG4gIHJldHVybiBjbGlwcGluZ1BhcmVudHMuZmlsdGVyKGZ1bmN0aW9uIChjbGlwcGluZ1BhcmVudCkge1xuICAgIHJldHVybiBpc0VsZW1lbnQoY2xpcHBpbmdQYXJlbnQpICYmIGNvbnRhaW5zKGNsaXBwaW5nUGFyZW50LCBjbGlwcGVyRWxlbWVudCkgJiYgZ2V0Tm9kZU5hbWUoY2xpcHBpbmdQYXJlbnQpICE9PSAnYm9keSc7XG4gIH0pO1xufSAvLyBHZXRzIHRoZSBtYXhpbXVtIGFyZWEgdGhhdCB0aGUgZWxlbWVudCBpcyB2aXNpYmxlIGluIGR1ZSB0byBhbnkgbnVtYmVyIG9mXG4vLyBjbGlwcGluZyBwYXJlbnRzXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q2xpcHBpbmdSZWN0KGVsZW1lbnQsIGJvdW5kYXJ5LCByb290Qm91bmRhcnksIHN0cmF0ZWd5KSB7XG4gIHZhciBtYWluQ2xpcHBpbmdQYXJlbnRzID0gYm91bmRhcnkgPT09ICdjbGlwcGluZ1BhcmVudHMnID8gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIDogW10uY29uY2F0KGJvdW5kYXJ5KTtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IFtdLmNvbmNhdChtYWluQ2xpcHBpbmdQYXJlbnRzLCBbcm9vdEJvdW5kYXJ5XSk7XG4gIHZhciBmaXJzdENsaXBwaW5nUGFyZW50ID0gY2xpcHBpbmdQYXJlbnRzWzBdO1xuICB2YXIgY2xpcHBpbmdSZWN0ID0gY2xpcHBpbmdQYXJlbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjUmVjdCwgY2xpcHBpbmdQYXJlbnQpIHtcbiAgICB2YXIgcmVjdCA9IGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSk7XG4gICAgYWNjUmVjdC50b3AgPSBtYXgocmVjdC50b3AsIGFjY1JlY3QudG9wKTtcbiAgICBhY2NSZWN0LnJpZ2h0ID0gbWluKHJlY3QucmlnaHQsIGFjY1JlY3QucmlnaHQpO1xuICAgIGFjY1JlY3QuYm90dG9tID0gbWluKHJlY3QuYm90dG9tLCBhY2NSZWN0LmJvdHRvbSk7XG4gICAgYWNjUmVjdC5sZWZ0ID0gbWF4KHJlY3QubGVmdCwgYWNjUmVjdC5sZWZ0KTtcbiAgICByZXR1cm4gYWNjUmVjdDtcbiAgfSwgZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgZmlyc3RDbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpKTtcbiAgY2xpcHBpbmdSZWN0LndpZHRoID0gY2xpcHBpbmdSZWN0LnJpZ2h0IC0gY2xpcHBpbmdSZWN0LmxlZnQ7XG4gIGNsaXBwaW5nUmVjdC5oZWlnaHQgPSBjbGlwcGluZ1JlY3QuYm90dG9tIC0gY2xpcHBpbmdSZWN0LnRvcDtcbiAgY2xpcHBpbmdSZWN0LnggPSBjbGlwcGluZ1JlY3QubGVmdDtcbiAgY2xpcHBpbmdSZWN0LnkgPSBjbGlwcGluZ1JlY3QudG9wO1xuICByZXR1cm4gY2xpcHBpbmdSZWN0O1xufSIsImltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZVNjcm9sbCBmcm9tIFwiLi9nZXROb2RlU2Nyb2xsLmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGlzU2Nyb2xsUGFyZW50IGZyb20gXCIuL2lzU2Nyb2xsUGFyZW50LmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5cbmZ1bmN0aW9uIGlzRWxlbWVudFNjYWxlZChlbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNjYWxlWCA9IHJvdW5kKHJlY3Qud2lkdGgpIC8gZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAxO1xuICB2YXIgc2NhbGVZID0gcm91bmQocmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMTtcbiAgcmV0dXJuIHNjYWxlWCAhPT0gMSB8fCBzY2FsZVkgIT09IDE7XG59IC8vIFJldHVybnMgdGhlIGNvbXBvc2l0ZSByZWN0IG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gaXRzIG9mZnNldFBhcmVudC5cbi8vIENvbXBvc2l0ZSBtZWFucyBpdCB0YWtlcyBpbnRvIGFjY291bnQgdHJhbnNmb3JtcyBhcyB3ZWxsIGFzIGxheW91dC5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wb3NpdGVSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnQsIGlzRml4ZWQpIHtcbiAgaWYgKGlzRml4ZWQgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBpc09mZnNldFBhcmVudEFuRWxlbWVudCA9IGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KTtcbiAgdmFyIG9mZnNldFBhcmVudElzU2NhbGVkID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpICYmIGlzRWxlbWVudFNjYWxlZChvZmZzZXRQYXJlbnQpO1xuICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnRJc1NjYWxlZCwgaXNGaXhlZCk7XG4gIHZhciBzY3JvbGwgPSB7XG4gICAgc2Nyb2xsTGVmdDogMCxcbiAgICBzY3JvbGxUb3A6IDBcbiAgfTtcbiAgdmFyIG9mZnNldHMgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50IHx8ICFpc09mZnNldFBhcmVudEFuRWxlbWVudCAmJiAhaXNGaXhlZCkge1xuICAgIGlmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpICE9PSAnYm9keScgfHwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMDc4XG4gICAgaXNTY3JvbGxQYXJlbnQoZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgc2Nyb2xsID0gZ2V0Tm9kZVNjcm9sbChvZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICAgIGlmIChpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgIG9mZnNldHMgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50LCB0cnVlKTtcbiAgICAgIG9mZnNldHMueCArPSBvZmZzZXRQYXJlbnQuY2xpZW50TGVmdDtcbiAgICAgIG9mZnNldHMueSArPSBvZmZzZXRQYXJlbnQuY2xpZW50VG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBvZmZzZXRzLnggPSBnZXRXaW5kb3dTY3JvbGxCYXJYKGRvY3VtZW50RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyBzY3JvbGwuc2Nyb2xsTGVmdCAtIG9mZnNldHMueCxcbiAgICB5OiByZWN0LnRvcCArIHNjcm9sbC5zY3JvbGxUb3AgLSBvZmZzZXRzLnksXG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICB9O1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGdldFdpbmRvdyhlbGVtZW50KS5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufSIsImltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSB7XG4gIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl06IGFzc3VtZSBib2R5IGlzIGFsd2F5cyBhdmFpbGFibGVcbiAgcmV0dXJuICgoaXNFbGVtZW50KGVsZW1lbnQpID8gZWxlbWVudC5vd25lckRvY3VtZW50IDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gIGVsZW1lbnQuZG9jdW1lbnQpIHx8IHdpbmRvdy5kb2N1bWVudCkuZG9jdW1lbnRFbGVtZW50O1xufSIsImltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbC5qc1wiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjsgLy8gR2V0cyB0aGUgZW50aXJlIHNpemUgb2YgdGhlIHNjcm9sbGFibGUgZG9jdW1lbnQgYXJlYSwgZXZlbiBleHRlbmRpbmcgb3V0c2lkZVxuLy8gb2YgdGhlIGA8aHRtbD5gIGFuZCBgPGJvZHk+YCByZWN0IGJvdW5kcyBpZiBob3Jpem9udGFsbHkgc2Nyb2xsYWJsZVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXREb2N1bWVudFJlY3QoZWxlbWVudCkge1xuICB2YXIgX2VsZW1lbnQkb3duZXJEb2N1bWVuO1xuXG4gIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgd2luU2Nyb2xsID0gZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpO1xuICB2YXIgYm9keSA9IChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keTtcbiAgdmFyIHdpZHRoID0gbWF4KGh0bWwuc2Nyb2xsV2lkdGgsIGh0bWwuY2xpZW50V2lkdGgsIGJvZHkgPyBib2R5LnNjcm9sbFdpZHRoIDogMCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKTtcbiAgdmFyIGhlaWdodCA9IG1heChodG1sLnNjcm9sbEhlaWdodCwgaHRtbC5jbGllbnRIZWlnaHQsIGJvZHkgPyBib2R5LnNjcm9sbEhlaWdodCA6IDAsIGJvZHkgPyBib2R5LmNsaWVudEhlaWdodCA6IDApO1xuICB2YXIgeCA9IC13aW5TY3JvbGwuc2Nyb2xsTGVmdCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCk7XG4gIHZhciB5ID0gLXdpblNjcm9sbC5zY3JvbGxUb3A7XG5cbiAgaWYgKGdldENvbXB1dGVkU3R5bGUoYm9keSB8fCBodG1sKS5kaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgeCArPSBtYXgoaHRtbC5jbGllbnRXaWR0aCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKSAtIHdpZHRoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRTY3JvbGwoZWxlbWVudCkge1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IGVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICBzY3JvbGxUb3A6IGVsZW1lbnQuc2Nyb2xsVG9wXG4gIH07XG59IiwiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjsgLy8gUmV0dXJucyB0aGUgbGF5b3V0IHJlY3Qgb2YgYW4gZWxlbWVudCByZWxhdGl2ZSB0byBpdHMgb2Zmc2V0UGFyZW50LiBMYXlvdXRcbi8vIG1lYW5zIGl0IGRvZXNuJ3QgdGFrZSBpbnRvIGFjY291bnQgdHJhbnNmb3Jtcy5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TGF5b3V0UmVjdChlbGVtZW50KSB7XG4gIHZhciBjbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpOyAvLyBVc2UgdGhlIGNsaWVudFJlY3Qgc2l6ZXMgaWYgaXQncyBub3QgYmVlbiB0cmFuc2Zvcm1lZC5cbiAgLy8gRml4ZXMgaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMjIzXG5cbiAgdmFyIHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gIGlmIChNYXRoLmFicyhjbGllbnRSZWN0LndpZHRoIC0gd2lkdGgpIDw9IDEpIHtcbiAgICB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGg7XG4gIH1cblxuICBpZiAoTWF0aC5hYnMoY2xpZW50UmVjdC5oZWlnaHQgLSBoZWlnaHQpIDw9IDEpIHtcbiAgICBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogZWxlbWVudC5vZmZzZXRMZWZ0LFxuICAgIHk6IGVsZW1lbnQub2Zmc2V0VG9wLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVOYW1lKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgPyAoZWxlbWVudC5ub2RlTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKSA6IG51bGw7XG59IiwiaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldEhUTUxFbGVtZW50U2Nyb2xsIGZyb20gXCIuL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlU2Nyb2xsKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IGdldFdpbmRvdyhub2RlKSB8fCAhaXNIVE1MRWxlbWVudChub2RlKSkge1xuICAgIHJldHVybiBnZXRXaW5kb3dTY3JvbGwobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50U2Nyb2xsKG5vZGUpO1xuICB9XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGlzVGFibGVFbGVtZW50IGZyb20gXCIuL2lzVGFibGVFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgZ2V0VUFTdHJpbmcgZnJvbSBcIi4uL3V0aWxzL3VzZXJBZ2VudC5qc1wiO1xuXG5mdW5jdGlvbiBnZXRUcnVlT2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvODM3XG4gIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50Lm9mZnNldFBhcmVudDtcbn0gLy8gYC5vZmZzZXRQYXJlbnRgIHJlcG9ydHMgYG51bGxgIGZvciBmaXhlZCBlbGVtZW50cywgd2hpbGUgYWJzb2x1dGUgZWxlbWVudHNcbi8vIHJldHVybiB0aGUgY29udGFpbmluZyBibG9ja1xuXG5cbmZ1bmN0aW9uIGdldENvbnRhaW5pbmdCbG9jayhlbGVtZW50KSB7XG4gIHZhciBpc0ZpcmVmb3ggPSAvZmlyZWZveC9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG4gIHZhciBpc0lFID0gL1RyaWRlbnQvaS50ZXN0KGdldFVBU3RyaW5nKCkpO1xuXG4gIGlmIChpc0lFICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAvLyBJbiBJRSA5LCAxMCBhbmQgMTEgZml4ZWQgZWxlbWVudHMgY29udGFpbmluZyBibG9jayBpcyBhbHdheXMgZXN0YWJsaXNoZWQgYnkgdGhlIHZpZXdwb3J0XG4gICAgdmFyIGVsZW1lbnRDc3MgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgaWYgKGVsZW1lbnRDc3MucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7XG5cbiAgaWYgKGlzU2hhZG93Um9vdChjdXJyZW50Tm9kZSkpIHtcbiAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLmhvc3Q7XG4gIH1cblxuICB3aGlsZSAoaXNIVE1MRWxlbWVudChjdXJyZW50Tm9kZSkgJiYgWydodG1sJywgJ2JvZHknXS5pbmRleE9mKGdldE5vZGVOYW1lKGN1cnJlbnROb2RlKSkgPCAwKSB7XG4gICAgdmFyIGNzcyA9IGdldENvbXB1dGVkU3R5bGUoY3VycmVudE5vZGUpOyAvLyBUaGlzIGlzIG5vbi1leGhhdXN0aXZlIGJ1dCBjb3ZlcnMgdGhlIG1vc3QgY29tbW9uIENTUyBwcm9wZXJ0aWVzIHRoYXRcbiAgICAvLyBjcmVhdGUgYSBjb250YWluaW5nIGJsb2NrLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9Db250YWluaW5nX2Jsb2NrI2lkZW50aWZ5aW5nX3RoZV9jb250YWluaW5nX2Jsb2NrXG5cbiAgICBpZiAoY3NzLnRyYW5zZm9ybSAhPT0gJ25vbmUnIHx8IGNzcy5wZXJzcGVjdGl2ZSAhPT0gJ25vbmUnIHx8IGNzcy5jb250YWluID09PSAncGFpbnQnIHx8IFsndHJhbnNmb3JtJywgJ3BlcnNwZWN0aXZlJ10uaW5kZXhPZihjc3Mud2lsbENoYW5nZSkgIT09IC0xIHx8IGlzRmlyZWZveCAmJiBjc3Mud2lsbENoYW5nZSA9PT0gJ2ZpbHRlcicgfHwgaXNGaXJlZm94ICYmIGNzcy5maWx0ZXIgJiYgY3NzLmZpbHRlciAhPT0gJ25vbmUnKSB7XG4gICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn0gLy8gR2V0cyB0aGUgY2xvc2VzdCBhbmNlc3RvciBwb3NpdGlvbmVkIGVsZW1lbnQuIEhhbmRsZXMgc29tZSBlZGdlIGNhc2VzLFxuLy8gc3VjaCBhcyB0YWJsZSBhbmNlc3RvcnMgYW5kIGNyb3NzIGJyb3dzZXIgYnVncy5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KGVsZW1lbnQpO1xuICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0VHJ1ZU9mZnNldFBhcmVudChlbGVtZW50KTtcblxuICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIGlzVGFibGVFbGVtZW50KG9mZnNldFBhcmVudCkgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgIG9mZnNldFBhcmVudCA9IGdldFRydWVPZmZzZXRQYXJlbnQob2Zmc2V0UGFyZW50KTtcbiAgfVxuXG4gIGlmIChvZmZzZXRQYXJlbnQgJiYgKGdldE5vZGVOYW1lKG9mZnNldFBhcmVudCkgPT09ICdodG1sJyB8fCBnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpID09PSAnYm9keScgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCBnZXRDb250YWluaW5nQmxvY2soZWxlbWVudCkgfHwgd2luZG93O1xufSIsImltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhcmVudE5vZGUoZWxlbWVudCkge1xuICBpZiAoZ2V0Tm9kZU5hbWUoZWxlbWVudCkgPT09ICdodG1sJykge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuICgvLyB0aGlzIGlzIGEgcXVpY2tlciAoYnV0IGxlc3MgdHlwZSBzYWZlKSB3YXkgdG8gc2F2ZSBxdWl0ZSBzb21lIGJ5dGVzIGZyb20gdGhlIGJ1bmRsZVxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl1cbiAgICAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICBlbGVtZW50LmFzc2lnbmVkU2xvdCB8fCAvLyBzdGVwIGludG8gdGhlIHNoYWRvdyBET00gb2YgdGhlIHBhcmVudCBvZiBhIHNsb3R0ZWQgbm9kZVxuICAgIGVsZW1lbnQucGFyZW50Tm9kZSB8fCAoIC8vIERPTSBFbGVtZW50IGRldGVjdGVkXG4gICAgaXNTaGFkb3dSb290KGVsZW1lbnQpID8gZWxlbWVudC5ob3N0IDogbnVsbCkgfHwgLy8gU2hhZG93Um9vdCBkZXRlY3RlZFxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBIVE1MRWxlbWVudCBpcyBhIE5vZGVcbiAgICBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkgLy8gZmFsbGJhY2tcblxuICApO1xufSIsImltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50KG5vZGUpIHtcbiAgaWYgKFsnaHRtbCcsICdib2R5JywgJyNkb2N1bWVudCddLmluZGV4T2YoZ2V0Tm9kZU5hbWUobm9kZSkpID49IDApIHtcbiAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBhc3N1bWUgYm9keSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gICAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgaWYgKGlzSFRNTEVsZW1lbnQobm9kZSkgJiYgaXNTY3JvbGxQYXJlbnQobm9kZSkpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHJldHVybiBnZXRTY3JvbGxQYXJlbnQoZ2V0UGFyZW50Tm9kZShub2RlKSk7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgaXNMYXlvdXRWaWV3cG9ydCBmcm9tIFwiLi9pc0xheW91dFZpZXdwb3J0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRWaWV3cG9ydFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgdmFyIGh0bWwgPSBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCk7XG4gIHZhciB2aXN1YWxWaWV3cG9ydCA9IHdpbi52aXN1YWxWaWV3cG9ydDtcbiAgdmFyIHdpZHRoID0gaHRtbC5jbGllbnRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGh0bWwuY2xpZW50SGVpZ2h0O1xuICB2YXIgeCA9IDA7XG4gIHZhciB5ID0gMDtcblxuICBpZiAodmlzdWFsVmlld3BvcnQpIHtcbiAgICB3aWR0aCA9IHZpc3VhbFZpZXdwb3J0LndpZHRoO1xuICAgIGhlaWdodCA9IHZpc3VhbFZpZXdwb3J0LmhlaWdodDtcbiAgICB2YXIgbGF5b3V0Vmlld3BvcnQgPSBpc0xheW91dFZpZXdwb3J0KCk7XG5cbiAgICBpZiAobGF5b3V0Vmlld3BvcnQgfHwgIWxheW91dFZpZXdwb3J0ICYmIHN0cmF0ZWd5ID09PSAnZml4ZWQnKSB7XG4gICAgICB4ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdDtcbiAgICAgIHkgPSB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3A7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCksXG4gICAgeTogeVxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvdyhub2RlKSB7XG4gIGlmIChub2RlID09IG51bGwpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgaWYgKG5vZGUudG9TdHJpbmcoKSAhPT0gJ1tvYmplY3QgV2luZG93XScpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICByZXR1cm4gb3duZXJEb2N1bWVudCA/IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93IDogd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvd1Njcm9sbChub2RlKSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3cobm9kZSk7XG4gIHZhciBzY3JvbGxMZWZ0ID0gd2luLnBhZ2VYT2Zmc2V0O1xuICB2YXIgc2Nyb2xsVG9wID0gd2luLnBhZ2VZT2Zmc2V0O1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgfTtcbn0iLCJpbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGwgZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpIHtcbiAgLy8gSWYgPGh0bWw+IGhhcyBhIENTUyB3aWR0aCBncmVhdGVyIHRoYW4gdGhlIHZpZXdwb3J0LCB0aGVuIHRoaXMgd2lsbCBiZVxuICAvLyBpbmNvcnJlY3QgZm9yIFJUTC5cbiAgLy8gUG9wcGVyIDEgaXMgYnJva2VuIGluIHRoaXMgY2FzZSBhbmQgbmV2ZXIgaGFkIGEgYnVnIHJlcG9ydCBzbyBsZXQncyBhc3N1bWVcbiAgLy8gaXQncyBub3QgYW4gaXNzdWUuIEkgZG9uJ3QgdGhpbmsgYW55b25lIGV2ZXIgc3BlY2lmaWVzIHdpZHRoIG9uIDxodG1sPlxuICAvLyBhbnl3YXkuXG4gIC8vIEJyb3dzZXJzIHdoZXJlIHRoZSBsZWZ0IHNjcm9sbGJhciBkb2Vzbid0IGNhdXNlIGFuIGlzc3VlIHJlcG9ydCBgMGAgZm9yXG4gIC8vIHRoaXMgKGUuZy4gRWRnZSAyMDE5LCBJRTExLCBTYWZhcmkpXG4gIHJldHVybiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpKS5sZWZ0ICsgZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpLnNjcm9sbExlZnQ7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcblxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuRWxlbWVudDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBpc0hUTUxFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuSFRNTEVsZW1lbnQ7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGlzU2hhZG93Um9vdChub2RlKSB7XG4gIC8vIElFIDExIGhhcyBubyBTaGFkb3dSb290XG4gIGlmICh0eXBlb2YgU2hhZG93Um9vdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgT3duRWxlbWVudCA9IGdldFdpbmRvdyhub2RlKS5TaGFkb3dSb290O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q7XG59XG5cbmV4cG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH07IiwiaW1wb3J0IGdldFVBU3RyaW5nIGZyb20gXCIuLi91dGlscy91c2VyQWdlbnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTGF5b3V0Vmlld3BvcnQoKSB7XG4gIHJldHVybiAhL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChnZXRVQVN0cmluZygpKTtcbn0iLCJpbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1Njcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIEZpcmVmb3ggd2FudHMgdXMgdG8gY2hlY2sgYC14YCBhbmQgYC15YCB2YXJpYXRpb25zIGFzIHdlbGxcbiAgdmFyIF9nZXRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSxcbiAgICAgIG92ZXJmbG93ID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3csXG4gICAgICBvdmVyZmxvd1ggPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1gsXG4gICAgICBvdmVyZmxvd1kgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1k7XG5cbiAgcmV0dXJuIC9hdXRvfHNjcm9sbHxvdmVybGF5fGhpZGRlbi8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCk7XG59IiwiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1RhYmxlRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBbJ3RhYmxlJywgJ3RkJywgJ3RoJ10uaW5kZXhPZihnZXROb2RlTmFtZShlbGVtZW50KSkgPj0gMDtcbn0iLCJpbXBvcnQgZ2V0U2Nyb2xsUGFyZW50IGZyb20gXCIuL2dldFNjcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuLypcbmdpdmVuIGEgRE9NIGVsZW1lbnQsIHJldHVybiB0aGUgbGlzdCBvZiBhbGwgc2Nyb2xsIHBhcmVudHMsIHVwIHRoZSBsaXN0IG9mIGFuY2Vzb3JzXG51bnRpbCB3ZSBnZXQgdG8gdGhlIHRvcCB3aW5kb3cgb2JqZWN0LiBUaGlzIGxpc3QgaXMgd2hhdCB3ZSBhdHRhY2ggc2Nyb2xsIGxpc3RlbmVyc1xudG8sIGJlY2F1c2UgaWYgYW55IG9mIHRoZXNlIHBhcmVudCBlbGVtZW50cyBzY3JvbGwsIHdlJ2xsIG5lZWQgdG8gcmUtY2FsY3VsYXRlIHRoZVxucmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvbi5cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpc3RTY3JvbGxQYXJlbnRzKGVsZW1lbnQsIGxpc3QpIHtcbiAgdmFyIF9lbGVtZW50JG93bmVyRG9jdW1lbjtcblxuICBpZiAobGlzdCA9PT0gdm9pZCAwKSB7XG4gICAgbGlzdCA9IFtdO1xuICB9XG5cbiAgdmFyIHNjcm9sbFBhcmVudCA9IGdldFNjcm9sbFBhcmVudChlbGVtZW50KTtcbiAgdmFyIGlzQm9keSA9IHNjcm9sbFBhcmVudCA9PT0gKChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keSk7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coc2Nyb2xsUGFyZW50KTtcbiAgdmFyIHRhcmdldCA9IGlzQm9keSA/IFt3aW5dLmNvbmNhdCh3aW4udmlzdWFsVmlld3BvcnQgfHwgW10sIGlzU2Nyb2xsUGFyZW50KHNjcm9sbFBhcmVudCkgPyBzY3JvbGxQYXJlbnQgOiBbXSkgOiBzY3JvbGxQYXJlbnQ7XG4gIHZhciB1cGRhdGVkTGlzdCA9IGxpc3QuY29uY2F0KHRhcmdldCk7XG4gIHJldHVybiBpc0JvZHkgPyB1cGRhdGVkTGlzdCA6IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBpc0JvZHkgdGVsbHMgdXMgdGFyZ2V0IHdpbGwgYmUgYW4gSFRNTEVsZW1lbnQgaGVyZVxuICB1cGRhdGVkTGlzdC5jb25jYXQobGlzdFNjcm9sbFBhcmVudHMoZ2V0UGFyZW50Tm9kZSh0YXJnZXQpKSk7XG59IiwiZXhwb3J0IHZhciB0b3AgPSAndG9wJztcbmV4cG9ydCB2YXIgYm90dG9tID0gJ2JvdHRvbSc7XG5leHBvcnQgdmFyIHJpZ2h0ID0gJ3JpZ2h0JztcbmV4cG9ydCB2YXIgbGVmdCA9ICdsZWZ0JztcbmV4cG9ydCB2YXIgYXV0byA9ICdhdXRvJztcbmV4cG9ydCB2YXIgYmFzZVBsYWNlbWVudHMgPSBbdG9wLCBib3R0b20sIHJpZ2h0LCBsZWZ0XTtcbmV4cG9ydCB2YXIgc3RhcnQgPSAnc3RhcnQnO1xuZXhwb3J0IHZhciBlbmQgPSAnZW5kJztcbmV4cG9ydCB2YXIgY2xpcHBpbmdQYXJlbnRzID0gJ2NsaXBwaW5nUGFyZW50cyc7XG5leHBvcnQgdmFyIHZpZXdwb3J0ID0gJ3ZpZXdwb3J0JztcbmV4cG9ydCB2YXIgcG9wcGVyID0gJ3BvcHBlcic7XG5leHBvcnQgdmFyIHJlZmVyZW5jZSA9ICdyZWZlcmVuY2UnO1xuZXhwb3J0IHZhciB2YXJpYXRpb25QbGFjZW1lbnRzID0gLyojX19QVVJFX18qL2Jhc2VQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG59LCBbXSk7XG5leHBvcnQgdmFyIHBsYWNlbWVudHMgPSAvKiNfX1BVUkVfXyovW10uY29uY2F0KGJhc2VQbGFjZW1lbnRzLCBbYXV0b10pLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCwgcGxhY2VtZW50ICsgXCItXCIgKyBzdGFydCwgcGxhY2VtZW50ICsgXCItXCIgKyBlbmRdKTtcbn0sIFtdKTsgLy8gbW9kaWZpZXJzIHRoYXQgbmVlZCB0byByZWFkIHRoZSBET01cblxuZXhwb3J0IHZhciBiZWZvcmVSZWFkID0gJ2JlZm9yZVJlYWQnO1xuZXhwb3J0IHZhciByZWFkID0gJ3JlYWQnO1xuZXhwb3J0IHZhciBhZnRlclJlYWQgPSAnYWZ0ZXJSZWFkJzsgLy8gcHVyZS1sb2dpYyBtb2RpZmllcnNcblxuZXhwb3J0IHZhciBiZWZvcmVNYWluID0gJ2JlZm9yZU1haW4nO1xuZXhwb3J0IHZhciBtYWluID0gJ21haW4nO1xuZXhwb3J0IHZhciBhZnRlck1haW4gPSAnYWZ0ZXJNYWluJzsgLy8gbW9kaWZpZXIgd2l0aCB0aGUgcHVycG9zZSB0byB3cml0ZSB0byB0aGUgRE9NIChvciB3cml0ZSBpbnRvIGEgZnJhbWV3b3JrIHN0YXRlKVxuXG5leHBvcnQgdmFyIGJlZm9yZVdyaXRlID0gJ2JlZm9yZVdyaXRlJztcbmV4cG9ydCB2YXIgd3JpdGUgPSAnd3JpdGUnO1xuZXhwb3J0IHZhciBhZnRlcldyaXRlID0gJ2FmdGVyV3JpdGUnO1xuZXhwb3J0IHZhciBtb2RpZmllclBoYXNlcyA9IFtiZWZvcmVSZWFkLCByZWFkLCBhZnRlclJlYWQsIGJlZm9yZU1haW4sIG1haW4sIGFmdGVyTWFpbiwgYmVmb3JlV3JpdGUsIHdyaXRlLCBhZnRlcldyaXRlXTsiLCJpbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4uL2RvbS11dGlscy9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiOyAvLyBUaGlzIG1vZGlmaWVyIHRha2VzIHRoZSBzdHlsZXMgcHJlcGFyZWQgYnkgdGhlIGBjb21wdXRlU3R5bGVzYCBtb2RpZmllclxuLy8gYW5kIGFwcGxpZXMgdGhlbSB0byB0aGUgSFRNTEVsZW1lbnRzIHN1Y2ggYXMgcG9wcGVyIGFuZCBhcnJvd1xuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGU7XG4gIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIHN0eWxlID0gc3RhdGUuc3R5bGVzW25hbWVdIHx8IHt9O1xuICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW25hbWVdOyAvLyBhcnJvdyBpcyBvcHRpb25hbCArIHZpcnR1YWwgZWxlbWVudHNcblxuICAgIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAhZ2V0Tm9kZU5hbWUoZWxlbWVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIEZsb3cgZG9lc24ndCBzdXBwb3J0IHRvIGV4dGVuZCB0aGlzIHByb3BlcnR5LCBidXQgaXQncyB0aGUgbW9zdFxuICAgIC8vIGVmZmVjdGl2ZSB3YXkgdG8gYXBwbHkgc3R5bGVzIHRvIGFuIEhUTUxFbGVtZW50XG4gICAgLy8gJEZsb3dGaXhNZVtjYW5ub3Qtd3JpdGVdXG5cblxuICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgc3R5bGUpO1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlO1xuICB2YXIgaW5pdGlhbFN0eWxlcyA9IHtcbiAgICBwb3BwZXI6IHtcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgbGVmdDogJzAnLFxuICAgICAgdG9wOiAnMCcsXG4gICAgICBtYXJnaW46ICcwJ1xuICAgIH0sXG4gICAgYXJyb3c6IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgfSxcbiAgICByZWZlcmVuY2U6IHt9XG4gIH07XG4gIE9iamVjdC5hc3NpZ24oc3RhdGUuZWxlbWVudHMucG9wcGVyLnN0eWxlLCBpbml0aWFsU3R5bGVzLnBvcHBlcik7XG4gIHN0YXRlLnN0eWxlcyA9IGluaXRpYWxTdHlsZXM7XG5cbiAgaWYgKHN0YXRlLmVsZW1lbnRzLmFycm93KSB7XG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZS5lbGVtZW50cy5hcnJvdy5zdHlsZSwgaW5pdGlhbFN0eWxlcy5hcnJvdyk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIE9iamVjdC5rZXlzKHN0YXRlLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW25hbWVdO1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBzdGF0ZS5hdHRyaWJ1dGVzW25hbWVdIHx8IHt9O1xuICAgICAgdmFyIHN0eWxlUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHN0YXRlLnN0eWxlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IHN0YXRlLnN0eWxlc1tuYW1lXSA6IGluaXRpYWxTdHlsZXNbbmFtZV0pOyAvLyBTZXQgYWxsIHZhbHVlcyB0byBhbiBlbXB0eSBzdHJpbmcgdG8gdW5zZXQgdGhlbVxuXG4gICAgICB2YXIgc3R5bGUgPSBzdHlsZVByb3BlcnRpZXMucmVkdWNlKGZ1bmN0aW9uIChzdHlsZSwgcHJvcGVydHkpIHtcbiAgICAgICAgc3R5bGVbcHJvcGVydHldID0gJyc7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgIH0sIHt9KTsgLy8gYXJyb3cgaXMgb3B0aW9uYWwgKyB2aXJ0dWFsIGVsZW1lbnRzXG5cbiAgICAgIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAhZ2V0Tm9kZU5hbWUoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdhcHBseVN0eWxlcycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogYXBwbHlTdHlsZXMsXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydjb21wdXRlU3R5bGVzJ11cbn07IiwiaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qc1wiO1xuaW1wb3J0IGNvbnRhaW5zIGZyb20gXCIuLi9kb20tdXRpbHMvY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgd2l0aGluIH0gZnJvbSBcIi4uL3V0aWxzL3dpdGhpbi5qc1wiO1xuaW1wb3J0IG1lcmdlUGFkZGluZ09iamVjdCBmcm9tIFwiLi4vdXRpbHMvbWVyZ2VQYWRkaW5nT2JqZWN0LmpzXCI7XG5pbXBvcnQgZXhwYW5kVG9IYXNoTWFwIGZyb20gXCIuLi91dGlscy9leHBhbmRUb0hhc2hNYXAuanNcIjtcbmltcG9ydCB7IGxlZnQsIHJpZ2h0LCBiYXNlUGxhY2VtZW50cywgdG9wLCBib3R0b20gfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgdG9QYWRkaW5nT2JqZWN0ID0gZnVuY3Rpb24gdG9QYWRkaW5nT2JqZWN0KHBhZGRpbmcsIHN0YXRlKSB7XG4gIHBhZGRpbmcgPSB0eXBlb2YgcGFkZGluZyA9PT0gJ2Z1bmN0aW9uJyA/IHBhZGRpbmcoT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVjdHMsIHtcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KSkgOiBwYWRkaW5nO1xuICByZXR1cm4gbWVyZ2VQYWRkaW5nT2JqZWN0KHR5cGVvZiBwYWRkaW5nICE9PSAnbnVtYmVyJyA/IHBhZGRpbmcgOiBleHBhbmRUb0hhc2hNYXAocGFkZGluZywgYmFzZVBsYWNlbWVudHMpKTtcbn07XG5cbmZ1bmN0aW9uIGFycm93KF9yZWYpIHtcbiAgdmFyIF9zdGF0ZSRtb2RpZmllcnNEYXRhJDtcblxuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gIHZhciBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5hcnJvdztcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpO1xuICB2YXIgYXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGlzVmVydGljYWwgPSBbbGVmdCwgcmlnaHRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMDtcbiAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgaWYgKCFhcnJvd0VsZW1lbnQgfHwgIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcGFkZGluZ09iamVjdCA9IHRvUGFkZGluZ09iamVjdChvcHRpb25zLnBhZGRpbmcsIHN0YXRlKTtcbiAgdmFyIGFycm93UmVjdCA9IGdldExheW91dFJlY3QoYXJyb3dFbGVtZW50KTtcbiAgdmFyIG1pblByb3AgPSBheGlzID09PSAneScgPyB0b3AgOiBsZWZ0O1xuICB2YXIgbWF4UHJvcCA9IGF4aXMgPT09ICd5JyA/IGJvdHRvbSA6IHJpZ2h0O1xuICB2YXIgZW5kRGlmZiA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtsZW5dICsgc3RhdGUucmVjdHMucmVmZXJlbmNlW2F4aXNdIC0gcG9wcGVyT2Zmc2V0c1theGlzXSAtIHN0YXRlLnJlY3RzLnBvcHBlcltsZW5dO1xuICB2YXIgc3RhcnREaWZmID0gcG9wcGVyT2Zmc2V0c1theGlzXSAtIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXTtcbiAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KGFycm93RWxlbWVudCk7XG4gIHZhciBjbGllbnRTaXplID0gYXJyb3dPZmZzZXRQYXJlbnQgPyBheGlzID09PSAneScgPyBhcnJvd09mZnNldFBhcmVudC5jbGllbnRIZWlnaHQgfHwgMCA6IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudFdpZHRoIHx8IDAgOiAwO1xuICB2YXIgY2VudGVyVG9SZWZlcmVuY2UgPSBlbmREaWZmIC8gMiAtIHN0YXJ0RGlmZiAvIDI7IC8vIE1ha2Ugc3VyZSB0aGUgYXJyb3cgZG9lc24ndCBvdmVyZmxvdyB0aGUgcG9wcGVyIGlmIHRoZSBjZW50ZXIgcG9pbnQgaXNcbiAgLy8gb3V0c2lkZSBvZiB0aGUgcG9wcGVyIGJvdW5kc1xuXG4gIHZhciBtaW4gPSBwYWRkaW5nT2JqZWN0W21pblByb3BdO1xuICB2YXIgbWF4ID0gY2xpZW50U2l6ZSAtIGFycm93UmVjdFtsZW5dIC0gcGFkZGluZ09iamVjdFttYXhQcm9wXTtcbiAgdmFyIGNlbnRlciA9IGNsaWVudFNpemUgLyAyIC0gYXJyb3dSZWN0W2xlbl0gLyAyICsgY2VudGVyVG9SZWZlcmVuY2U7XG4gIHZhciBvZmZzZXQgPSB3aXRoaW4obWluLCBjZW50ZXIsIG1heCk7IC8vIFByZXZlbnRzIGJyZWFraW5nIHN5bnRheCBoaWdobGlnaHRpbmcuLi5cblxuICB2YXIgYXhpc1Byb3AgPSBheGlzO1xuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gKF9zdGF0ZSRtb2RpZmllcnNEYXRhJCA9IHt9LCBfc3RhdGUkbW9kaWZpZXJzRGF0YSRbYXhpc1Byb3BdID0gb2Zmc2V0LCBfc3RhdGUkbW9kaWZpZXJzRGF0YSQuY2VudGVyT2Zmc2V0ID0gb2Zmc2V0IC0gY2VudGVyLCBfc3RhdGUkbW9kaWZpZXJzRGF0YSQpO1xufVxuXG5mdW5jdGlvbiBlZmZlY3QoX3JlZjIpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjIuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjIub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJGVsZW1lbnQgPSBvcHRpb25zLmVsZW1lbnQsXG4gICAgICBhcnJvd0VsZW1lbnQgPSBfb3B0aW9ucyRlbGVtZW50ID09PSB2b2lkIDAgPyAnW2RhdGEtcG9wcGVyLWFycm93XScgOiBfb3B0aW9ucyRlbGVtZW50O1xuXG4gIGlmIChhcnJvd0VsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfSAvLyBDU1Mgc2VsZWN0b3JcblxuXG4gIGlmICh0eXBlb2YgYXJyb3dFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLnBvcHBlci5xdWVyeVNlbGVjdG9yKGFycm93RWxlbWVudCk7XG5cbiAgICBpZiAoIWFycm93RWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoIWlzSFRNTEVsZW1lbnQoYXJyb3dFbGVtZW50KSkge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhcnJvd1wiIGVsZW1lbnQgbXVzdCBiZSBhbiBIVE1MRWxlbWVudCAobm90IGFuIFNWR0VsZW1lbnQpLicsICdUbyB1c2UgYW4gU1ZHIGFycm93LCB3cmFwIGl0IGluIGFuIEhUTUxFbGVtZW50IHRoYXQgd2lsbCBiZSB1c2VkIGFzJywgJ3RoZSBhcnJvdy4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29udGFpbnMoc3RhdGUuZWxlbWVudHMucG9wcGVyLCBhcnJvd0VsZW1lbnQpKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhcnJvd1wiIG1vZGlmaWVyXFwncyBgZWxlbWVudGAgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBwb3BwZXInLCAnZWxlbWVudC4nXS5qb2luKCcgJykpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHN0YXRlLmVsZW1lbnRzLmFycm93ID0gYXJyb3dFbGVtZW50O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYXJyb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogYXJyb3csXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J11cbn07IiwiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBlbmQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbnZhciB1bnNldFNpZGVzID0ge1xuICB0b3A6ICdhdXRvJyxcbiAgcmlnaHQ6ICdhdXRvJyxcbiAgYm90dG9tOiAnYXV0bycsXG4gIGxlZnQ6ICdhdXRvJ1xufTsgLy8gUm91bmQgdGhlIG9mZnNldHMgdG8gdGhlIG5lYXJlc3Qgc3VpdGFibGUgc3VicGl4ZWwgYmFzZWQgb24gdGhlIERQUi5cbi8vIFpvb21pbmcgY2FuIGNoYW5nZSB0aGUgRFBSLCBidXQgaXQgc2VlbXMgdG8gcmVwb3J0IGEgdmFsdWUgdGhhdCB3aWxsXG4vLyBjbGVhbmx5IGRpdmlkZSB0aGUgdmFsdWVzIGludG8gdGhlIGFwcHJvcHJpYXRlIHN1YnBpeGVscy5cblxuZnVuY3Rpb24gcm91bmRPZmZzZXRzQnlEUFIoX3JlZikge1xuICB2YXIgeCA9IF9yZWYueCxcbiAgICAgIHkgPSBfcmVmLnk7XG4gIHZhciB3aW4gPSB3aW5kb3c7XG4gIHZhciBkcHIgPSB3aW4uZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICByZXR1cm4ge1xuICAgIHg6IHJvdW5kKHggKiBkcHIpIC8gZHByIHx8IDAsXG4gICAgeTogcm91bmQoeSAqIGRwcikgLyBkcHIgfHwgMFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9TdHlsZXMoX3JlZjIpIHtcbiAgdmFyIF9PYmplY3QkYXNzaWduMjtcblxuICB2YXIgcG9wcGVyID0gX3JlZjIucG9wcGVyLFxuICAgICAgcG9wcGVyUmVjdCA9IF9yZWYyLnBvcHBlclJlY3QsXG4gICAgICBwbGFjZW1lbnQgPSBfcmVmMi5wbGFjZW1lbnQsXG4gICAgICB2YXJpYXRpb24gPSBfcmVmMi52YXJpYXRpb24sXG4gICAgICBvZmZzZXRzID0gX3JlZjIub2Zmc2V0cyxcbiAgICAgIHBvc2l0aW9uID0gX3JlZjIucG9zaXRpb24sXG4gICAgICBncHVBY2NlbGVyYXRpb24gPSBfcmVmMi5ncHVBY2NlbGVyYXRpb24sXG4gICAgICBhZGFwdGl2ZSA9IF9yZWYyLmFkYXB0aXZlLFxuICAgICAgcm91bmRPZmZzZXRzID0gX3JlZjIucm91bmRPZmZzZXRzLFxuICAgICAgaXNGaXhlZCA9IF9yZWYyLmlzRml4ZWQ7XG4gIHZhciBfb2Zmc2V0cyR4ID0gb2Zmc2V0cy54LFxuICAgICAgeCA9IF9vZmZzZXRzJHggPT09IHZvaWQgMCA/IDAgOiBfb2Zmc2V0cyR4LFxuICAgICAgX29mZnNldHMkeSA9IG9mZnNldHMueSxcbiAgICAgIHkgPSBfb2Zmc2V0cyR5ID09PSB2b2lkIDAgPyAwIDogX29mZnNldHMkeTtcblxuICB2YXIgX3JlZjMgPSB0eXBlb2Ygcm91bmRPZmZzZXRzID09PSAnZnVuY3Rpb24nID8gcm91bmRPZmZzZXRzKHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfSkgOiB7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG5cbiAgeCA9IF9yZWYzLng7XG4gIHkgPSBfcmVmMy55O1xuICB2YXIgaGFzWCA9IG9mZnNldHMuaGFzT3duUHJvcGVydHkoJ3gnKTtcbiAgdmFyIGhhc1kgPSBvZmZzZXRzLmhhc093blByb3BlcnR5KCd5Jyk7XG4gIHZhciBzaWRlWCA9IGxlZnQ7XG4gIHZhciBzaWRlWSA9IHRvcDtcbiAgdmFyIHdpbiA9IHdpbmRvdztcblxuICBpZiAoYWRhcHRpdmUpIHtcbiAgICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KHBvcHBlcik7XG4gICAgdmFyIGhlaWdodFByb3AgPSAnY2xpZW50SGVpZ2h0JztcbiAgICB2YXIgd2lkdGhQcm9wID0gJ2NsaWVudFdpZHRoJztcblxuICAgIGlmIChvZmZzZXRQYXJlbnQgPT09IGdldFdpbmRvdyhwb3BwZXIpKSB7XG4gICAgICBvZmZzZXRQYXJlbnQgPSBnZXREb2N1bWVudEVsZW1lbnQocG9wcGVyKTtcblxuICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiAhPT0gJ3N0YXRpYycgJiYgcG9zaXRpb24gPT09ICdhYnNvbHV0ZScpIHtcbiAgICAgICAgaGVpZ2h0UHJvcCA9ICdzY3JvbGxIZWlnaHQnO1xuICAgICAgICB3aWR0aFByb3AgPSAnc2Nyb2xsV2lkdGgnO1xuICAgICAgfVxuICAgIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FzdF06IGZvcmNlIHR5cGUgcmVmaW5lbWVudCwgd2UgY29tcGFyZSBvZmZzZXRQYXJlbnQgd2l0aCB3aW5kb3cgYWJvdmUsIGJ1dCBGbG93IGRvZXNuJ3QgZGV0ZWN0IGl0XG5cblxuICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudDtcblxuICAgIGlmIChwbGFjZW1lbnQgPT09IHRvcCB8fCAocGxhY2VtZW50ID09PSBsZWZ0IHx8IHBsYWNlbWVudCA9PT0gcmlnaHQpICYmIHZhcmlhdGlvbiA9PT0gZW5kKSB7XG4gICAgICBzaWRlWSA9IGJvdHRvbTtcbiAgICAgIHZhciBvZmZzZXRZID0gaXNGaXhlZCAmJiBvZmZzZXRQYXJlbnQgPT09IHdpbiAmJiB3aW4udmlzdWFsVmlld3BvcnQgPyB3aW4udmlzdWFsVmlld3BvcnQuaGVpZ2h0IDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gICAgICBvZmZzZXRQYXJlbnRbaGVpZ2h0UHJvcF07XG4gICAgICB5IC09IG9mZnNldFkgLSBwb3BwZXJSZWN0LmhlaWdodDtcbiAgICAgIHkgKj0gZ3B1QWNjZWxlcmF0aW9uID8gMSA6IC0xO1xuICAgIH1cblxuICAgIGlmIChwbGFjZW1lbnQgPT09IGxlZnQgfHwgKHBsYWNlbWVudCA9PT0gdG9wIHx8IHBsYWNlbWVudCA9PT0gYm90dG9tKSAmJiB2YXJpYXRpb24gPT09IGVuZCkge1xuICAgICAgc2lkZVggPSByaWdodDtcbiAgICAgIHZhciBvZmZzZXRYID0gaXNGaXhlZCAmJiBvZmZzZXRQYXJlbnQgPT09IHdpbiAmJiB3aW4udmlzdWFsVmlld3BvcnQgPyB3aW4udmlzdWFsVmlld3BvcnQud2lkdGggOiAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICAgIG9mZnNldFBhcmVudFt3aWR0aFByb3BdO1xuICAgICAgeCAtPSBvZmZzZXRYIC0gcG9wcGVyUmVjdC53aWR0aDtcbiAgICAgIHggKj0gZ3B1QWNjZWxlcmF0aW9uID8gMSA6IC0xO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb21tb25TdHlsZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICBwb3NpdGlvbjogcG9zaXRpb25cbiAgfSwgYWRhcHRpdmUgJiYgdW5zZXRTaWRlcyk7XG5cbiAgdmFyIF9yZWY0ID0gcm91bmRPZmZzZXRzID09PSB0cnVlID8gcm91bmRPZmZzZXRzQnlEUFIoe1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9KSA6IHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcblxuICB4ID0gX3JlZjQueDtcbiAgeSA9IF9yZWY0Lnk7XG5cbiAgaWYgKGdwdUFjY2VsZXJhdGlvbikge1xuICAgIHZhciBfT2JqZWN0JGFzc2lnbjtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIChfT2JqZWN0JGFzc2lnbiA9IHt9LCBfT2JqZWN0JGFzc2lnbltzaWRlWV0gPSBoYXNZID8gJzAnIDogJycsIF9PYmplY3QkYXNzaWduW3NpZGVYXSA9IGhhc1ggPyAnMCcgOiAnJywgX09iamVjdCRhc3NpZ24udHJhbnNmb3JtID0gKHdpbi5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpIDw9IDEgPyBcInRyYW5zbGF0ZShcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4KVwiIDogXCJ0cmFuc2xhdGUzZChcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4LCAwKVwiLCBfT2JqZWN0JGFzc2lnbikpO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywgKF9PYmplY3QkYXNzaWduMiA9IHt9LCBfT2JqZWN0JGFzc2lnbjJbc2lkZVldID0gaGFzWSA/IHkgKyBcInB4XCIgOiAnJywgX09iamVjdCRhc3NpZ24yW3NpZGVYXSA9IGhhc1ggPyB4ICsgXCJweFwiIDogJycsIF9PYmplY3QkYXNzaWduMi50cmFuc2Zvcm0gPSAnJywgX09iamVjdCRhc3NpZ24yKSk7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZXMoX3JlZjUpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjUuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjUub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJGdwdUFjY2VsZXJhdCA9IG9wdGlvbnMuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX29wdGlvbnMkZ3B1QWNjZWxlcmF0ID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkZ3B1QWNjZWxlcmF0LFxuICAgICAgX29wdGlvbnMkYWRhcHRpdmUgPSBvcHRpb25zLmFkYXB0aXZlLFxuICAgICAgYWRhcHRpdmUgPSBfb3B0aW9ucyRhZGFwdGl2ZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFkYXB0aXZlLFxuICAgICAgX29wdGlvbnMkcm91bmRPZmZzZXRzID0gb3B0aW9ucy5yb3VuZE9mZnNldHMsXG4gICAgICByb3VuZE9mZnNldHMgPSBfb3B0aW9ucyRyb3VuZE9mZnNldHMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRyb3VuZE9mZnNldHM7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIHZhciB0cmFuc2l0aW9uUHJvcGVydHkgPSBnZXRDb21wdXRlZFN0eWxlKHN0YXRlLmVsZW1lbnRzLnBvcHBlcikudHJhbnNpdGlvblByb3BlcnR5IHx8ICcnO1xuXG4gICAgaWYgKGFkYXB0aXZlICYmIFsndHJhbnNmb3JtJywgJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddLnNvbWUoZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gdHJhbnNpdGlvblByb3BlcnR5LmluZGV4T2YocHJvcGVydHkpID49IDA7XG4gICAgfSkpIHtcbiAgICAgIGNvbnNvbGUud2FybihbJ1BvcHBlcjogRGV0ZWN0ZWQgQ1NTIHRyYW5zaXRpb25zIG9uIGF0IGxlYXN0IG9uZSBvZiB0aGUgZm9sbG93aW5nJywgJ0NTUyBwcm9wZXJ0aWVzOiBcInRyYW5zZm9ybVwiLCBcInRvcFwiLCBcInJpZ2h0XCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLicsICdcXG5cXG4nLCAnRGlzYWJsZSB0aGUgXCJjb21wdXRlU3R5bGVzXCIgbW9kaWZpZXJcXCdzIGBhZGFwdGl2ZWAgb3B0aW9uIHRvIGFsbG93JywgJ2ZvciBzbW9vdGggdHJhbnNpdGlvbnMsIG9yIHJlbW92ZSB0aGVzZSBwcm9wZXJ0aWVzIGZyb20gdGhlIENTUycsICd0cmFuc2l0aW9uIGRlY2xhcmF0aW9uIG9uIHRoZSBwb3BwZXIgZWxlbWVudCBpZiBvbmx5IHRyYW5zaXRpb25pbmcnLCAnb3BhY2l0eSBvciBiYWNrZ3JvdW5kLWNvbG9yIGZvciBleGFtcGxlLicsICdcXG5cXG4nLCAnV2UgcmVjb21tZW5kIHVzaW5nIHRoZSBwb3BwZXIgZWxlbWVudCBhcyBhIHdyYXBwZXIgYXJvdW5kIGFuIGlubmVyJywgJ2VsZW1lbnQgdGhhdCBjYW4gaGF2ZSBhbnkgQ1NTIHByb3BlcnR5IHRyYW5zaXRpb25lZCBmb3IgYW5pbWF0aW9ucy4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb21tb25TdHlsZXMgPSB7XG4gICAgcGxhY2VtZW50OiBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCksXG4gICAgdmFyaWF0aW9uOiBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KSxcbiAgICBwb3BwZXI6IHN0YXRlLmVsZW1lbnRzLnBvcHBlcixcbiAgICBwb3BwZXJSZWN0OiBzdGF0ZS5yZWN0cy5wb3BwZXIsXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiBncHVBY2NlbGVyYXRpb24sXG4gICAgaXNGaXhlZDogc3RhdGUub3B0aW9ucy5zdHJhdGVneSA9PT0gJ2ZpeGVkJ1xuICB9O1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdHlsZXMucG9wcGVyLCBtYXBUb1N0eWxlcyhPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIHtcbiAgICAgIG9mZnNldHM6IHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyxcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgYWRhcHRpdmU6IGFkYXB0aXZlLFxuICAgICAgcm91bmRPZmZzZXRzOiByb3VuZE9mZnNldHNcbiAgICB9KSkpO1xuICB9XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEuYXJyb3cgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5hcnJvdyA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnN0eWxlcy5hcnJvdywgbWFwVG9TdHlsZXMoT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCB7XG4gICAgICBvZmZzZXRzOiBzdGF0ZS5tb2RpZmllcnNEYXRhLmFycm93LFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBhZGFwdGl2ZTogZmFsc2UsXG4gICAgICByb3VuZE9mZnNldHM6IHJvdW5kT2Zmc2V0c1xuICAgIH0pKSk7XG4gIH1cblxuICBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyLCB7XG4gICAgJ2RhdGEtcG9wcGVyLXBsYWNlbWVudCc6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2NvbXB1dGVTdHlsZXMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ2JlZm9yZVdyaXRlJyxcbiAgZm46IGNvbXB1dGVTdHlsZXMsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgcGFzc2l2ZSA9IHtcbiAgcGFzc2l2ZTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIGluc3RhbmNlID0gX3JlZi5pbnN0YW5jZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRzY3JvbGwgPSBvcHRpb25zLnNjcm9sbCxcbiAgICAgIHNjcm9sbCA9IF9vcHRpb25zJHNjcm9sbCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHNjcm9sbCxcbiAgICAgIF9vcHRpb25zJHJlc2l6ZSA9IG9wdGlvbnMucmVzaXplLFxuICAgICAgcmVzaXplID0gX29wdGlvbnMkcmVzaXplID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcmVzaXplO1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KHN0YXRlLmVsZW1lbnRzLnBvcHBlcik7XG4gIHZhciBzY3JvbGxQYXJlbnRzID0gW10uY29uY2F0KHN0YXRlLnNjcm9sbFBhcmVudHMucmVmZXJlbmNlLCBzdGF0ZS5zY3JvbGxQYXJlbnRzLnBvcHBlcik7XG5cbiAgaWYgKHNjcm9sbCkge1xuICAgIHNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAoc2Nyb2xsUGFyZW50KSB7XG4gICAgICBzY3JvbGxQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChyZXNpemUpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JvbGxQYXJlbnQpIHtcbiAgICAgICAgc2Nyb2xsUGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVzaXplKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdldmVudExpc3RlbmVycycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogZnVuY3Rpb24gZm4oKSB7fSxcbiAgZWZmZWN0OiBlZmZlY3QsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCBnZXRPcHBvc2l0ZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0T3Bwb3NpdGVQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4uL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgY29tcHV0ZUF1dG9QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2NvbXB1dGVBdXRvUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyBib3R0b20sIHRvcCwgc3RhcnQsIHJpZ2h0LCBsZWZ0LCBhdXRvIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuLi91dGlscy9nZXRWYXJpYXRpb24uanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5mdW5jdGlvbiBnZXRFeHBhbmRlZEZhbGxiYWNrUGxhY2VtZW50cyhwbGFjZW1lbnQpIHtcbiAgaWYgKGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0bykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBvcHBvc2l0ZVBsYWNlbWVudCA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG4gIHJldHVybiBbZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQocGxhY2VtZW50KSwgb3Bwb3NpdGVQbGFjZW1lbnQsIGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KG9wcG9zaXRlUGxhY2VtZW50KV07XG59XG5cbmZ1bmN0aW9uIGZsaXAoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0uX3NraXApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX29wdGlvbnMkbWFpbkF4aXMgPSBvcHRpb25zLm1haW5BeGlzLFxuICAgICAgY2hlY2tNYWluQXhpcyA9IF9vcHRpb25zJG1haW5BeGlzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkbWFpbkF4aXMsXG4gICAgICBfb3B0aW9ucyRhbHRBeGlzID0gb3B0aW9ucy5hbHRBeGlzLFxuICAgICAgY2hlY2tBbHRBeGlzID0gX29wdGlvbnMkYWx0QXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBzcGVjaWZpZWRGYWxsYmFja1BsYWNlbWVudHMgPSBvcHRpb25zLmZhbGxiYWNrUGxhY2VtZW50cyxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9IG9wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBmbGlwVmFyaWF0aW9ucyA9IF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGZsaXBWYXJpYXRpbyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50cyA9IG9wdGlvbnMuYWxsb3dlZEF1dG9QbGFjZW1lbnRzO1xuICB2YXIgcHJlZmVycmVkUGxhY2VtZW50ID0gc3RhdGUub3B0aW9ucy5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwcmVmZXJyZWRQbGFjZW1lbnQpO1xuICB2YXIgaXNCYXNlUGxhY2VtZW50ID0gYmFzZVBsYWNlbWVudCA9PT0gcHJlZmVycmVkUGxhY2VtZW50O1xuICB2YXIgZmFsbGJhY2tQbGFjZW1lbnRzID0gc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzIHx8IChpc0Jhc2VQbGFjZW1lbnQgfHwgIWZsaXBWYXJpYXRpb25zID8gW2dldE9wcG9zaXRlUGxhY2VtZW50KHByZWZlcnJlZFBsYWNlbWVudCldIDogZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocHJlZmVycmVkUGxhY2VtZW50KSk7XG4gIHZhciBwbGFjZW1lbnRzID0gW3ByZWZlcnJlZFBsYWNlbWVudF0uY29uY2F0KGZhbGxiYWNrUGxhY2VtZW50cykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIHJldHVybiBhY2MuY29uY2F0KGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0byA/IGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zOiBmbGlwVmFyaWF0aW9ucyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50czogYWxsb3dlZEF1dG9QbGFjZW1lbnRzXG4gICAgfSkgOiBwbGFjZW1lbnQpO1xuICB9LCBbXSk7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIGNoZWNrc01hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIG1ha2VGYWxsYmFja0NoZWNrcyA9IHRydWU7XG4gIHZhciBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRzWzBdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwbGFjZW1lbnQgPSBwbGFjZW1lbnRzW2ldO1xuXG4gICAgdmFyIF9iYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuXG4gICAgdmFyIGlzU3RhcnRWYXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA9PT0gc3RhcnQ7XG4gICAgdmFyIGlzVmVydGljYWwgPSBbdG9wLCBib3R0b21dLmluZGV4T2YoX2Jhc2VQbGFjZW1lbnQpID49IDA7XG4gICAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG4gICAgdmFyIG92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeTogYWx0Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSk7XG4gICAgdmFyIG1haW5WYXJpYXRpb25TaWRlID0gaXNWZXJ0aWNhbCA/IGlzU3RhcnRWYXJpYXRpb24gPyByaWdodCA6IGxlZnQgOiBpc1N0YXJ0VmFyaWF0aW9uID8gYm90dG9tIDogdG9wO1xuXG4gICAgaWYgKHJlZmVyZW5jZVJlY3RbbGVuXSA+IHBvcHBlclJlY3RbbGVuXSkge1xuICAgICAgbWFpblZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgfVxuXG4gICAgdmFyIGFsdFZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgdmFyIGNoZWNrcyA9IFtdO1xuXG4gICAgaWYgKGNoZWNrTWFpbkF4aXMpIHtcbiAgICAgIGNoZWNrcy5wdXNoKG92ZXJmbG93W19iYXNlUGxhY2VtZW50XSA8PSAwKTtcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tBbHRBeGlzKSB7XG4gICAgICBjaGVja3MucHVzaChvdmVyZmxvd1ttYWluVmFyaWF0aW9uU2lkZV0gPD0gMCwgb3ZlcmZsb3dbYWx0VmFyaWF0aW9uU2lkZV0gPD0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrcy5ldmVyeShmdW5jdGlvbiAoY2hlY2spIHtcbiAgICAgIHJldHVybiBjaGVjaztcbiAgICB9KSkge1xuICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50O1xuICAgICAgbWFrZUZhbGxiYWNrQ2hlY2tzID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjaGVja3NNYXAuc2V0KHBsYWNlbWVudCwgY2hlY2tzKTtcbiAgfVxuXG4gIGlmIChtYWtlRmFsbGJhY2tDaGVja3MpIHtcbiAgICAvLyBgMmAgbWF5IGJlIGRlc2lyZWQgaW4gc29tZSBjYXNlcyDigJMgcmVzZWFyY2ggbGF0ZXJcbiAgICB2YXIgbnVtYmVyT2ZDaGVja3MgPSBmbGlwVmFyaWF0aW9ucyA/IDMgOiAxO1xuXG4gICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoX2kpIHtcbiAgICAgIHZhciBmaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50cy5maW5kKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICAgICAgdmFyIGNoZWNrcyA9IGNoZWNrc01hcC5nZXQocGxhY2VtZW50KTtcblxuICAgICAgICBpZiAoY2hlY2tzKSB7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrcy5zbGljZSgwLCBfaSkuZXZlcnkoZnVuY3Rpb24gKGNoZWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZml0dGluZ1BsYWNlbWVudCkge1xuICAgICAgICBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBmaXR0aW5nUGxhY2VtZW50O1xuICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBfaSA9IG51bWJlck9mQ2hlY2tzOyBfaSA+IDA7IF9pLS0pIHtcbiAgICAgIHZhciBfcmV0ID0gX2xvb3AoX2kpO1xuXG4gICAgICBpZiAoX3JldCA9PT0gXCJicmVha1wiKSBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUucGxhY2VtZW50ICE9PSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQpIHtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdLl9za2lwID0gdHJ1ZTtcbiAgICBzdGF0ZS5wbGFjZW1lbnQgPSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQ7XG4gICAgc3RhdGUucmVzZXQgPSB0cnVlO1xuICB9XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdmbGlwJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IGZsaXAsXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsnb2Zmc2V0J10sXG4gIGRhdGE6IHtcbiAgICBfc2tpcDogZmFsc2VcbiAgfVxufTsiLCJpbXBvcnQgeyB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcblxuZnVuY3Rpb24gZ2V0U2lkZU9mZnNldHMob3ZlcmZsb3csIHJlY3QsIHByZXZlbnRlZE9mZnNldHMpIHtcbiAgaWYgKHByZXZlbnRlZE9mZnNldHMgPT09IHZvaWQgMCkge1xuICAgIHByZXZlbnRlZE9mZnNldHMgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcDogb3ZlcmZsb3cudG9wIC0gcmVjdC5oZWlnaHQgLSBwcmV2ZW50ZWRPZmZzZXRzLnksXG4gICAgcmlnaHQ6IG92ZXJmbG93LnJpZ2h0IC0gcmVjdC53aWR0aCArIHByZXZlbnRlZE9mZnNldHMueCxcbiAgICBib3R0b206IG92ZXJmbG93LmJvdHRvbSAtIHJlY3QuaGVpZ2h0ICsgcHJldmVudGVkT2Zmc2V0cy55LFxuICAgIGxlZnQ6IG92ZXJmbG93LmxlZnQgLSByZWN0LndpZHRoIC0gcHJldmVudGVkT2Zmc2V0cy54XG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChvdmVyZmxvdykge1xuICByZXR1cm4gW3RvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdF0uc29tZShmdW5jdGlvbiAoc2lkZSkge1xuICAgIHJldHVybiBvdmVyZmxvd1tzaWRlXSA+PSAwO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZShfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBwcmV2ZW50ZWRPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wcmV2ZW50T3ZlcmZsb3c7XG4gIHZhciByZWZlcmVuY2VPdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgZWxlbWVudENvbnRleHQ6ICdyZWZlcmVuY2UnXG4gIH0pO1xuICB2YXIgcG9wcGVyQWx0T3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGFsdEJvdW5kYXJ5OiB0cnVlXG4gIH0pO1xuICB2YXIgcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzID0gZ2V0U2lkZU9mZnNldHMocmVmZXJlbmNlT3ZlcmZsb3csIHJlZmVyZW5jZVJlY3QpO1xuICB2YXIgcG9wcGVyRXNjYXBlT2Zmc2V0cyA9IGdldFNpZGVPZmZzZXRzKHBvcHBlckFsdE92ZXJmbG93LCBwb3BwZXJSZWN0LCBwcmV2ZW50ZWRPZmZzZXRzKTtcbiAgdmFyIGlzUmVmZXJlbmNlSGlkZGVuID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyk7XG4gIHZhciBoYXNQb3BwZXJFc2NhcGVkID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHBvcHBlckVzY2FwZU9mZnNldHMpO1xuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0ge1xuICAgIHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0czogcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzLFxuICAgIHBvcHBlckVzY2FwZU9mZnNldHM6IHBvcHBlckVzY2FwZU9mZnNldHMsXG4gICAgaXNSZWZlcmVuY2VIaWRkZW46IGlzUmVmZXJlbmNlSGlkZGVuLFxuICAgIGhhc1BvcHBlckVzY2FwZWQ6IGhhc1BvcHBlckVzY2FwZWRcbiAgfTtcbiAgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciwge1xuICAgICdkYXRhLXBvcHBlci1yZWZlcmVuY2UtaGlkZGVuJzogaXNSZWZlcmVuY2VIaWRkZW4sXG4gICAgJ2RhdGEtcG9wcGVyLWVzY2FwZWQnOiBoYXNQb3BwZXJFc2NhcGVkXG4gIH0pO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnaGlkZScsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J10sXG4gIGZuOiBoaWRlXG59OyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgYXBwbHlTdHlsZXMgfSBmcm9tIFwiLi9hcHBseVN0eWxlcy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBhcnJvdyB9IGZyb20gXCIuL2Fycm93LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNvbXB1dGVTdHlsZXMgfSBmcm9tIFwiLi9jb21wdXRlU3R5bGVzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZmxpcCB9IGZyb20gXCIuL2ZsaXAuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgaGlkZSB9IGZyb20gXCIuL2hpZGUuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgb2Zmc2V0IH0gZnJvbSBcIi4vb2Zmc2V0LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBvcHBlck9mZnNldHMgfSBmcm9tIFwiLi9wb3BwZXJPZmZzZXRzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHByZXZlbnRPdmVyZmxvdyB9IGZyb20gXCIuL3ByZXZlbnRPdmVyZmxvdy5qc1wiOyIsImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBwbGFjZW1lbnRzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlQW5kU2tpZGRpbmdUb1hZKHBsYWNlbWVudCwgcmVjdHMsIG9mZnNldCkge1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgdmFyIGludmVydERpc3RhbmNlID0gW2xlZnQsIHRvcF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwID8gLTEgOiAxO1xuXG4gIHZhciBfcmVmID0gdHlwZW9mIG9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IG9mZnNldChPYmplY3QuYXNzaWduKHt9LCByZWN0cywge1xuICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gIH0pKSA6IG9mZnNldCxcbiAgICAgIHNraWRkaW5nID0gX3JlZlswXSxcbiAgICAgIGRpc3RhbmNlID0gX3JlZlsxXTtcblxuICBza2lkZGluZyA9IHNraWRkaW5nIHx8IDA7XG4gIGRpc3RhbmNlID0gKGRpc3RhbmNlIHx8IDApICogaW52ZXJ0RGlzdGFuY2U7XG4gIHJldHVybiBbbGVmdCwgcmlnaHRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMCA/IHtcbiAgICB4OiBkaXN0YW5jZSxcbiAgICB5OiBza2lkZGluZ1xuICB9IDoge1xuICAgIHg6IHNraWRkaW5nLFxuICAgIHk6IGRpc3RhbmNlXG4gIH07XG59XG5cbmZ1bmN0aW9uIG9mZnNldChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmMi5vcHRpb25zLFxuICAgICAgbmFtZSA9IF9yZWYyLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRvZmZzZXQgPSBvcHRpb25zLm9mZnNldCxcbiAgICAgIG9mZnNldCA9IF9vcHRpb25zJG9mZnNldCA9PT0gdm9pZCAwID8gWzAsIDBdIDogX29wdGlvbnMkb2Zmc2V0O1xuICB2YXIgZGF0YSA9IHBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGlzdGFuY2VBbmRTa2lkZGluZ1RvWFkocGxhY2VtZW50LCBzdGF0ZS5yZWN0cywgb2Zmc2V0KTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHZhciBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQgPSBkYXRhW3N0YXRlLnBsYWNlbWVudF0sXG4gICAgICB4ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50LngsXG4gICAgICB5ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50Lnk7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyAhPSBudWxsKSB7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLnggKz0geDtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMueSArPSB5O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdvZmZzZXQnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIGZuOiBvZmZzZXRcbn07IiwiaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuLi91dGlscy9jb21wdXRlT2Zmc2V0cy5qc1wiO1xuXG5mdW5jdGlvbiBwb3BwZXJPZmZzZXRzKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIC8vIE9mZnNldHMgYXJlIHRoZSBhY3R1YWwgcG9zaXRpb24gdGhlIHBvcHBlciBuZWVkcyB0byBoYXZlIHRvIGJlXG4gIC8vIHByb3Blcmx5IHBvc2l0aW9uZWQgbmVhciBpdHMgcmVmZXJlbmNlIGVsZW1lbnRcbiAgLy8gVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBwbGFjZW1lbnQsIGFuZCB3aWxsIGJlIGFkanVzdGVkIGJ5XG4gIC8vIHRoZSBtb2RpZmllcnMgaW4gdGhlIG5leHQgc3RlcFxuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gY29tcHV0ZU9mZnNldHMoe1xuICAgIHJlZmVyZW5jZTogc3RhdGUucmVjdHMucmVmZXJlbmNlLFxuICAgIGVsZW1lbnQ6IHN0YXRlLnJlY3RzLnBvcHBlcixcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3BvcHBlck9mZnNldHMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3JlYWQnLFxuICBmbjogcG9wcGVyT2Zmc2V0cyxcbiAgZGF0YToge31cbn07IiwiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBzdGFydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldEFsdEF4aXMgZnJvbSBcIi4uL3V0aWxzL2dldEFsdEF4aXMuanNcIjtcbmltcG9ydCB7IHdpdGhpbiwgd2l0aGluTWF4Q2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvd2l0aGluLmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldEZyZXNoU2lkZU9iamVjdCBmcm9tIFwiLi4vdXRpbHMvZ2V0RnJlc2hTaWRlT2JqZWN0LmpzXCI7XG5pbXBvcnQgeyBtaW4gYXMgbWF0aE1pbiwgbWF4IGFzIG1hdGhNYXggfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuXG5mdW5jdGlvbiBwcmV2ZW50T3ZlcmZsb3coX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRtYWluQXhpcyA9IG9wdGlvbnMubWFpbkF4aXMsXG4gICAgICBjaGVja01haW5BeGlzID0gX29wdGlvbnMkbWFpbkF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRtYWluQXhpcyxcbiAgICAgIF9vcHRpb25zJGFsdEF4aXMgPSBvcHRpb25zLmFsdEF4aXMsXG4gICAgICBjaGVja0FsdEF4aXMgPSBfb3B0aW9ucyRhbHRBeGlzID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBfb3B0aW9ucyR0ZXRoZXIgPSBvcHRpb25zLnRldGhlcixcbiAgICAgIHRldGhlciA9IF9vcHRpb25zJHRldGhlciA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHRldGhlcixcbiAgICAgIF9vcHRpb25zJHRldGhlck9mZnNldCA9IG9wdGlvbnMudGV0aGVyT2Zmc2V0LFxuICAgICAgdGV0aGVyT2Zmc2V0ID0gX29wdGlvbnMkdGV0aGVyT2Zmc2V0ID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkdGV0aGVyT2Zmc2V0O1xuICB2YXIgb3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgIGFsdEJvdW5kYXJ5OiBhbHRCb3VuZGFyeVxuICB9KTtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9ICF2YXJpYXRpb247XG4gIHZhciBtYWluQXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGFsdEF4aXMgPSBnZXRBbHRBeGlzKG1haW5BeGlzKTtcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIHRldGhlck9mZnNldFZhbHVlID0gdHlwZW9mIHRldGhlck9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IHRldGhlck9mZnNldChPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZWN0cywge1xuICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gIH0pKSA6IHRldGhlck9mZnNldDtcbiAgdmFyIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZSA9IHR5cGVvZiB0ZXRoZXJPZmZzZXRWYWx1ZSA9PT0gJ251bWJlcicgPyB7XG4gICAgbWFpbkF4aXM6IHRldGhlck9mZnNldFZhbHVlLFxuICAgIGFsdEF4aXM6IHRldGhlck9mZnNldFZhbHVlXG4gIH0gOiBPYmplY3QuYXNzaWduKHtcbiAgICBtYWluQXhpczogMCxcbiAgICBhbHRBeGlzOiAwXG4gIH0sIHRldGhlck9mZnNldFZhbHVlKTtcbiAgdmFyIG9mZnNldE1vZGlmaWVyU3RhdGUgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldCA/IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0W3N0YXRlLnBsYWNlbWVudF0gOiBudWxsO1xuICB2YXIgZGF0YSA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcblxuICBpZiAoIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY2hlY2tNYWluQXhpcykge1xuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQ7XG5cbiAgICB2YXIgbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgICB2YXIgYWx0U2lkZSA9IG1haW5BeGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgICB2YXIgbGVuID0gbWFpbkF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICB2YXIgb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1ttYWluQXhpc107XG4gICAgdmFyIG1pbiA9IG9mZnNldCArIG92ZXJmbG93W21haW5TaWRlXTtcbiAgICB2YXIgbWF4ID0gb2Zmc2V0IC0gb3ZlcmZsb3dbYWx0U2lkZV07XG4gICAgdmFyIGFkZGl0aXZlID0gdGV0aGVyID8gLXBvcHBlclJlY3RbbGVuXSAvIDIgOiAwO1xuICAgIHZhciBtaW5MZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gcmVmZXJlbmNlUmVjdFtsZW5dIDogcG9wcGVyUmVjdFtsZW5dO1xuICAgIHZhciBtYXhMZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gLXBvcHBlclJlY3RbbGVuXSA6IC1yZWZlcmVuY2VSZWN0W2xlbl07IC8vIFdlIG5lZWQgdG8gaW5jbHVkZSB0aGUgYXJyb3cgaW4gdGhlIGNhbGN1bGF0aW9uIHNvIHRoZSBhcnJvdyBkb2Vzbid0IGdvXG4gICAgLy8gb3V0c2lkZSB0aGUgcmVmZXJlbmNlIGJvdW5kc1xuXG4gICAgdmFyIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93O1xuICAgIHZhciBhcnJvd1JlY3QgPSB0ZXRoZXIgJiYgYXJyb3dFbGVtZW50ID8gZ2V0TGF5b3V0UmVjdChhcnJvd0VsZW1lbnQpIDoge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDBcbiAgICB9O1xuICAgIHZhciBhcnJvd1BhZGRpbmdPYmplY3QgPSBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10gPyBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10ucGFkZGluZyA6IGdldEZyZXNoU2lkZU9iamVjdCgpO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNaW4gPSBhcnJvd1BhZGRpbmdPYmplY3RbbWFpblNpZGVdO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNYXggPSBhcnJvd1BhZGRpbmdPYmplY3RbYWx0U2lkZV07IC8vIElmIHRoZSByZWZlcmVuY2UgbGVuZ3RoIGlzIHNtYWxsZXIgdGhhbiB0aGUgYXJyb3cgbGVuZ3RoLCB3ZSBkb24ndCB3YW50XG4gICAgLy8gdG8gaW5jbHVkZSBpdHMgZnVsbCBzaXplIGluIHRoZSBjYWxjdWxhdGlvbi4gSWYgdGhlIHJlZmVyZW5jZSBpcyBzbWFsbFxuICAgIC8vIGFuZCBuZWFyIHRoZSBlZGdlIG9mIGEgYm91bmRhcnksIHRoZSBwb3BwZXIgY2FuIG92ZXJmbG93IGV2ZW4gaWYgdGhlXG4gICAgLy8gcmVmZXJlbmNlIGlzIG5vdCBvdmVyZmxvd2luZyBhcyB3ZWxsIChlLmcuIHZpcnR1YWwgZWxlbWVudHMgd2l0aCBub1xuICAgIC8vIHdpZHRoIG9yIGhlaWdodClcblxuICAgIHZhciBhcnJvd0xlbiA9IHdpdGhpbigwLCByZWZlcmVuY2VSZWN0W2xlbl0sIGFycm93UmVjdFtsZW5dKTtcbiAgICB2YXIgbWluT2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gcmVmZXJlbmNlUmVjdFtsZW5dIC8gMiAtIGFkZGl0aXZlIC0gYXJyb3dMZW4gLSBhcnJvd1BhZGRpbmdNaW4gLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXMgOiBtaW5MZW4gLSBhcnJvd0xlbiAtIGFycm93UGFkZGluZ01pbiAtIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcztcbiAgICB2YXIgbWF4T2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gLXJlZmVyZW5jZVJlY3RbbGVuXSAvIDIgKyBhZGRpdGl2ZSArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzIDogbWF4TGVuICsgYXJyb3dMZW4gKyBhcnJvd1BhZGRpbmdNYXggKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXM7XG4gICAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3cgJiYgZ2V0T2Zmc2V0UGFyZW50KHN0YXRlLmVsZW1lbnRzLmFycm93KTtcbiAgICB2YXIgY2xpZW50T2Zmc2V0ID0gYXJyb3dPZmZzZXRQYXJlbnQgPyBtYWluQXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50VG9wIHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRMZWZ0IHx8IDAgOiAwO1xuICAgIHZhciBvZmZzZXRNb2RpZmllclZhbHVlID0gKF9vZmZzZXRNb2RpZmllclN0YXRlJCA9IG9mZnNldE1vZGlmaWVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IG9mZnNldE1vZGlmaWVyU3RhdGVbbWFpbkF4aXNdKSAhPSBudWxsID8gX29mZnNldE1vZGlmaWVyU3RhdGUkIDogMDtcbiAgICB2YXIgdGV0aGVyTWluID0gb2Zmc2V0ICsgbWluT2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZSAtIGNsaWVudE9mZnNldDtcbiAgICB2YXIgdGV0aGVyTWF4ID0gb2Zmc2V0ICsgbWF4T2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZTtcbiAgICB2YXIgcHJldmVudGVkT2Zmc2V0ID0gd2l0aGluKHRldGhlciA/IG1hdGhNaW4obWluLCB0ZXRoZXJNaW4pIDogbWluLCBvZmZzZXQsIHRldGhlciA/IG1hdGhNYXgobWF4LCB0ZXRoZXJNYXgpIDogbWF4KTtcbiAgICBwb3BwZXJPZmZzZXRzW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldDtcbiAgICBkYXRhW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldCAtIG9mZnNldDtcbiAgfVxuXG4gIGlmIChjaGVja0FsdEF4aXMpIHtcbiAgICB2YXIgX29mZnNldE1vZGlmaWVyU3RhdGUkMjtcblxuICAgIHZhciBfbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3gnID8gdG9wIDogbGVmdDtcblxuICAgIHZhciBfYWx0U2lkZSA9IG1haW5BeGlzID09PSAneCcgPyBib3R0b20gOiByaWdodDtcblxuICAgIHZhciBfb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1thbHRBeGlzXTtcblxuICAgIHZhciBfbGVuID0gYWx0QXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgdmFyIF9taW4gPSBfb2Zmc2V0ICsgb3ZlcmZsb3dbX21haW5TaWRlXTtcblxuICAgIHZhciBfbWF4ID0gX29mZnNldCAtIG92ZXJmbG93W19hbHRTaWRlXTtcblxuICAgIHZhciBpc09yaWdpblNpZGUgPSBbdG9wLCBsZWZ0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcblxuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyID0gb2Zmc2V0TW9kaWZpZXJTdGF0ZSA9PSBudWxsID8gdm9pZCAwIDogb2Zmc2V0TW9kaWZpZXJTdGF0ZVthbHRBeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJDIgOiAwO1xuXG4gICAgdmFyIF90ZXRoZXJNaW4gPSBpc09yaWdpblNpZGUgPyBfbWluIDogX29mZnNldCAtIHJlZmVyZW5jZVJlY3RbX2xlbl0gLSBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcztcblxuICAgIHZhciBfdGV0aGVyTWF4ID0gaXNPcmlnaW5TaWRlID8gX29mZnNldCArIHJlZmVyZW5jZVJlY3RbX2xlbl0gKyBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcyA6IF9tYXg7XG5cbiAgICB2YXIgX3ByZXZlbnRlZE9mZnNldCA9IHRldGhlciAmJiBpc09yaWdpblNpZGUgPyB3aXRoaW5NYXhDbGFtcChfdGV0aGVyTWluLCBfb2Zmc2V0LCBfdGV0aGVyTWF4KSA6IHdpdGhpbih0ZXRoZXIgPyBfdGV0aGVyTWluIDogX21pbiwgX29mZnNldCwgdGV0aGVyID8gX3RldGhlck1heCA6IF9tYXgpO1xuXG4gICAgcG9wcGVyT2Zmc2V0c1thbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQ7XG4gICAgZGF0YVthbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQgLSBfb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdwcmV2ZW50T3ZlcmZsb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogcHJldmVudE92ZXJmbG93LFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddXG59OyIsImltcG9ydCB7IHBvcHBlckdlbmVyYXRvciwgZGV0ZWN0T3ZlcmZsb3cgfSBmcm9tIFwiLi9jcmVhdGVQb3BwZXIuanNcIjtcbmltcG9ydCBldmVudExpc3RlbmVycyBmcm9tIFwiLi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmltcG9ydCBwb3BwZXJPZmZzZXRzIGZyb20gXCIuL21vZGlmaWVycy9wb3BwZXJPZmZzZXRzLmpzXCI7XG5pbXBvcnQgY29tcHV0ZVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvY29tcHV0ZVN0eWxlcy5qc1wiO1xuaW1wb3J0IGFwcGx5U3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9hcHBseVN0eWxlcy5qc1wiO1xudmFyIGRlZmF1bHRNb2RpZmllcnMgPSBbZXZlbnRMaXN0ZW5lcnMsIHBvcHBlck9mZnNldHMsIGNvbXB1dGVTdHlsZXMsIGFwcGx5U3R5bGVzXTtcbnZhciBjcmVhdGVQb3BwZXIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKHtcbiAgZGVmYXVsdE1vZGlmaWVyczogZGVmYXVsdE1vZGlmaWVyc1xufSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgY3JlYXRlUG9wcGVyLCBwb3BwZXJHZW5lcmF0b3IsIGRlZmF1bHRNb2RpZmllcnMsIGRldGVjdE92ZXJmbG93IH07IiwiaW1wb3J0IHsgcG9wcGVyR2VuZXJhdG9yLCBkZXRlY3RPdmVyZmxvdyB9IGZyb20gXCIuL2NyZWF0ZVBvcHBlci5qc1wiO1xuaW1wb3J0IGV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL21vZGlmaWVycy9ldmVudExpc3RlbmVycy5qc1wiO1xuaW1wb3J0IHBvcHBlck9mZnNldHMgZnJvbSBcIi4vbW9kaWZpZXJzL3BvcHBlck9mZnNldHMuanNcIjtcbmltcG9ydCBjb21wdXRlU3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzXCI7XG5pbXBvcnQgYXBwbHlTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzXCI7XG5pbXBvcnQgb2Zmc2V0IGZyb20gXCIuL21vZGlmaWVycy9vZmZzZXQuanNcIjtcbmltcG9ydCBmbGlwIGZyb20gXCIuL21vZGlmaWVycy9mbGlwLmpzXCI7XG5pbXBvcnQgcHJldmVudE92ZXJmbG93IGZyb20gXCIuL21vZGlmaWVycy9wcmV2ZW50T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBhcnJvdyBmcm9tIFwiLi9tb2RpZmllcnMvYXJyb3cuanNcIjtcbmltcG9ydCBoaWRlIGZyb20gXCIuL21vZGlmaWVycy9oaWRlLmpzXCI7XG52YXIgZGVmYXVsdE1vZGlmaWVycyA9IFtldmVudExpc3RlbmVycywgcG9wcGVyT2Zmc2V0cywgY29tcHV0ZVN0eWxlcywgYXBwbHlTdHlsZXMsIG9mZnNldCwgZmxpcCwgcHJldmVudE92ZXJmbG93LCBhcnJvdywgaGlkZV07XG52YXIgY3JlYXRlUG9wcGVyID0gLyojX19QVVJFX18qL3BvcHBlckdlbmVyYXRvcih7XG4gIGRlZmF1bHRNb2RpZmllcnM6IGRlZmF1bHRNb2RpZmllcnNcbn0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciwgcG9wcGVyR2VuZXJhdG9yLCBkZWZhdWx0TW9kaWZpZXJzLCBkZXRlY3RPdmVyZmxvdyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciBhcyBjcmVhdGVQb3BwZXJMaXRlIH0gZnJvbSBcIi4vcG9wcGVyLWxpdGUuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgKiBmcm9tIFwiLi9tb2RpZmllcnMvaW5kZXguanNcIjsiLCJpbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IHsgdmFyaWF0aW9uUGxhY2VtZW50cywgYmFzZVBsYWNlbWVudHMsIHBsYWNlbWVudHMgYXMgYWxsUGxhY2VtZW50cyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wdXRlQXV0b1BsYWNlbWVudChzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5ID0gX29wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zID0gX29wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPSBfb3B0aW9ucy5hbGxvd2VkQXV0b1BsYWNlbWVudHMsXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHMgPSBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPT09IHZvaWQgMCA/IGFsbFBsYWNlbWVudHMgOiBfb3B0aW9ucyRhbGxvd2VkQXV0b1A7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KTtcbiAgdmFyIHBsYWNlbWVudHMgPSB2YXJpYXRpb24gPyBmbGlwVmFyaWF0aW9ucyA/IHZhcmlhdGlvblBsYWNlbWVudHMgOiB2YXJpYXRpb25QbGFjZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgcmV0dXJuIGdldFZhcmlhdGlvbihwbGFjZW1lbnQpID09PSB2YXJpYXRpb247XG4gIH0pIDogYmFzZVBsYWNlbWVudHM7XG4gIHZhciBhbGxvd2VkUGxhY2VtZW50cyA9IHBsYWNlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWxsb3dlZEF1dG9QbGFjZW1lbnRzLmluZGV4T2YocGxhY2VtZW50KSA+PSAwO1xuICB9KTtcblxuICBpZiAoYWxsb3dlZFBsYWNlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgYWxsb3dlZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogVGhlIGBhbGxvd2VkQXV0b1BsYWNlbWVudHNgIG9wdGlvbiBkaWQgbm90IGFsbG93IGFueScsICdwbGFjZW1lbnRzLiBFbnN1cmUgdGhlIGBwbGFjZW1lbnRgIG9wdGlvbiBtYXRjaGVzIHRoZSB2YXJpYXRpb24nLCAnb2YgdGhlIGFsbG93ZWQgcGxhY2VtZW50cy4nLCAnRm9yIGV4YW1wbGUsIFwiYXV0b1wiIGNhbm5vdCBiZSB1c2VkIHRvIGFsbG93IFwiYm90dG9tLXN0YXJ0XCIuJywgJ1VzZSBcImF1dG8tc3RhcnRcIiBpbnN0ZWFkLiddLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXR5cGVdOiBGbG93IHNlZW1zIHRvIGhhdmUgcHJvYmxlbXMgd2l0aCB0d28gYXJyYXkgdW5pb25zLi4uXG5cblxuICB2YXIgb3ZlcmZsb3dzID0gYWxsb3dlZFBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSlbZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpXTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvdmVyZmxvd3MpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gb3ZlcmZsb3dzW2FdIC0gb3ZlcmZsb3dzW2JdO1xuICB9KTtcbn0iLCJpbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudCBmcm9tIFwiLi9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCwgc3RhcnQsIGVuZCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcHV0ZU9mZnNldHMoX3JlZikge1xuICB2YXIgcmVmZXJlbmNlID0gX3JlZi5yZWZlcmVuY2UsXG4gICAgICBlbGVtZW50ID0gX3JlZi5lbGVtZW50LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZi5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50ID8gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIHZhcmlhdGlvbiA9IHBsYWNlbWVudCA/IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIGNvbW1vblggPSByZWZlcmVuY2UueCArIHJlZmVyZW5jZS53aWR0aCAvIDIgLSBlbGVtZW50LndpZHRoIC8gMjtcbiAgdmFyIGNvbW1vblkgPSByZWZlcmVuY2UueSArIHJlZmVyZW5jZS5oZWlnaHQgLyAyIC0gZWxlbWVudC5oZWlnaHQgLyAyO1xuICB2YXIgb2Zmc2V0cztcblxuICBzd2l0Y2ggKGJhc2VQbGFjZW1lbnQpIHtcbiAgICBjYXNlIHRvcDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IGNvbW1vblgsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55IC0gZWxlbWVudC5oZWlnaHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgYm90dG9tOlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogY29tbW9uWCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnkgKyByZWZlcmVuY2UuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHJpZ2h0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLnggKyByZWZlcmVuY2Uud2lkdGgsXG4gICAgICAgIHk6IGNvbW1vbllcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgbGVmdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54IC0gZWxlbWVudC53aWR0aCxcbiAgICAgICAgeTogY29tbW9uWVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54LFxuICAgICAgICB5OiByZWZlcmVuY2UueVxuICAgICAgfTtcbiAgfVxuXG4gIHZhciBtYWluQXhpcyA9IGJhc2VQbGFjZW1lbnQgPyBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCkgOiBudWxsO1xuXG4gIGlmIChtYWluQXhpcyAhPSBudWxsKSB7XG4gICAgdmFyIGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICBzd2l0Y2ggKHZhcmlhdGlvbikge1xuICAgICAgY2FzZSBzdGFydDpcbiAgICAgICAgb2Zmc2V0c1ttYWluQXhpc10gPSBvZmZzZXRzW21haW5BeGlzXSAtIChyZWZlcmVuY2VbbGVuXSAvIDIgLSBlbGVtZW50W2xlbl0gLyAyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgZW5kOlxuICAgICAgICBvZmZzZXRzW21haW5BeGlzXSA9IG9mZnNldHNbbWFpbkF4aXNdICsgKHJlZmVyZW5jZVtsZW5dIC8gMiAtIGVsZW1lbnRbbGVuXSAvIDIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0cztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmbikge1xuICB2YXIgcGVuZGluZztcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXBlbmRpbmcpIHtcbiAgICAgIHBlbmRpbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwZW5kaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlc29sdmUoZm4oKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBlbmRpbmc7XG4gIH07XG59IiwiaW1wb3J0IGdldENsaXBwaW5nUmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldENsaXBwaW5nUmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuL2NvbXB1dGVPZmZzZXRzLmpzXCI7XG5pbXBvcnQgcmVjdFRvQ2xpZW50UmVjdCBmcm9tIFwiLi9yZWN0VG9DbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgeyBjbGlwcGluZ1BhcmVudHMsIHJlZmVyZW5jZSwgcG9wcGVyLCBib3R0b20sIHRvcCwgcmlnaHQsIGJhc2VQbGFjZW1lbnRzLCB2aWV3cG9ydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IHsgaXNFbGVtZW50IH0gZnJvbSBcIi4uL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgbWVyZ2VQYWRkaW5nT2JqZWN0IGZyb20gXCIuL21lcmdlUGFkZGluZ09iamVjdC5qc1wiO1xuaW1wb3J0IGV4cGFuZFRvSGFzaE1hcCBmcm9tIFwiLi9leHBhbmRUb0hhc2hNYXAuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIF9vcHRpb25zJHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zJHBsYWNlbWVudCA9PT0gdm9pZCAwID8gc3RhdGUucGxhY2VtZW50IDogX29wdGlvbnMkcGxhY2VtZW50LFxuICAgICAgX29wdGlvbnMkc3RyYXRlZ3kgPSBfb3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIHN0cmF0ZWd5ID0gX29wdGlvbnMkc3RyYXRlZ3kgPT09IHZvaWQgMCA/IHN0YXRlLnN0cmF0ZWd5IDogX29wdGlvbnMkc3RyYXRlZ3ksXG4gICAgICBfb3B0aW9ucyRib3VuZGFyeSA9IF9vcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgYm91bmRhcnkgPSBfb3B0aW9ucyRib3VuZGFyeSA9PT0gdm9pZCAwID8gY2xpcHBpbmdQYXJlbnRzIDogX29wdGlvbnMkYm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRyb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucyRyb290Qm91bmRhcnkgPT09IHZvaWQgMCA/IHZpZXdwb3J0IDogX29wdGlvbnMkcm9vdEJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkZWxlbWVudENvbnRlID0gX29wdGlvbnMuZWxlbWVudENvbnRleHQsXG4gICAgICBlbGVtZW50Q29udGV4dCA9IF9vcHRpb25zJGVsZW1lbnRDb250ZSA9PT0gdm9pZCAwID8gcG9wcGVyIDogX29wdGlvbnMkZWxlbWVudENvbnRlLFxuICAgICAgX29wdGlvbnMkYWx0Qm91bmRhcnkgPSBfb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gX29wdGlvbnMkYWx0Qm91bmRhcnkgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkYWx0Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIHBhZGRpbmcgPSBfb3B0aW9ucyRwYWRkaW5nID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkcGFkZGluZztcbiAgdmFyIHBhZGRpbmdPYmplY3QgPSBtZXJnZVBhZGRpbmdPYmplY3QodHlwZW9mIHBhZGRpbmcgIT09ICdudW1iZXInID8gcGFkZGluZyA6IGV4cGFuZFRvSGFzaE1hcChwYWRkaW5nLCBiYXNlUGxhY2VtZW50cykpO1xuICB2YXIgYWx0Q29udGV4dCA9IGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgPyByZWZlcmVuY2UgOiBwb3BwZXI7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW2FsdEJvdW5kYXJ5ID8gYWx0Q29udGV4dCA6IGVsZW1lbnRDb250ZXh0XTtcbiAgdmFyIGNsaXBwaW5nQ2xpZW50UmVjdCA9IGdldENsaXBwaW5nUmVjdChpc0VsZW1lbnQoZWxlbWVudCkgPyBlbGVtZW50IDogZWxlbWVudC5jb250ZXh0RWxlbWVudCB8fCBnZXREb2N1bWVudEVsZW1lbnQoc3RhdGUuZWxlbWVudHMucG9wcGVyKSwgYm91bmRhcnksIHJvb3RCb3VuZGFyeSwgc3RyYXRlZ3kpO1xuICB2YXIgcmVmZXJlbmNlQ2xpZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChzdGF0ZS5lbGVtZW50cy5yZWZlcmVuY2UpO1xuICB2YXIgcG9wcGVyT2Zmc2V0cyA9IGNvbXB1dGVPZmZzZXRzKHtcbiAgICByZWZlcmVuY2U6IHJlZmVyZW5jZUNsaWVudFJlY3QsXG4gICAgZWxlbWVudDogcG9wcGVyUmVjdCxcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICB9KTtcbiAgdmFyIHBvcHBlckNsaWVudFJlY3QgPSByZWN0VG9DbGllbnRSZWN0KE9iamVjdC5hc3NpZ24oe30sIHBvcHBlclJlY3QsIHBvcHBlck9mZnNldHMpKTtcbiAgdmFyIGVsZW1lbnRDbGllbnRSZWN0ID0gZWxlbWVudENvbnRleHQgPT09IHBvcHBlciA/IHBvcHBlckNsaWVudFJlY3QgOiByZWZlcmVuY2VDbGllbnRSZWN0OyAvLyBwb3NpdGl2ZSA9IG92ZXJmbG93aW5nIHRoZSBjbGlwcGluZyByZWN0XG4gIC8vIDAgb3IgbmVnYXRpdmUgPSB3aXRoaW4gdGhlIGNsaXBwaW5nIHJlY3RcblxuICB2YXIgb3ZlcmZsb3dPZmZzZXRzID0ge1xuICAgIHRvcDogY2xpcHBpbmdDbGllbnRSZWN0LnRvcCAtIGVsZW1lbnRDbGllbnRSZWN0LnRvcCArIHBhZGRpbmdPYmplY3QudG9wLFxuICAgIGJvdHRvbTogZWxlbWVudENsaWVudFJlY3QuYm90dG9tIC0gY2xpcHBpbmdDbGllbnRSZWN0LmJvdHRvbSArIHBhZGRpbmdPYmplY3QuYm90dG9tLFxuICAgIGxlZnQ6IGNsaXBwaW5nQ2xpZW50UmVjdC5sZWZ0IC0gZWxlbWVudENsaWVudFJlY3QubGVmdCArIHBhZGRpbmdPYmplY3QubGVmdCxcbiAgICByaWdodDogZWxlbWVudENsaWVudFJlY3QucmlnaHQgLSBjbGlwcGluZ0NsaWVudFJlY3QucmlnaHQgKyBwYWRkaW5nT2JqZWN0LnJpZ2h0XG4gIH07XG4gIHZhciBvZmZzZXREYXRhID0gc3RhdGUubW9kaWZpZXJzRGF0YS5vZmZzZXQ7IC8vIE9mZnNldHMgY2FuIGJlIGFwcGxpZWQgb25seSB0byB0aGUgcG9wcGVyIGVsZW1lbnRcblxuICBpZiAoZWxlbWVudENvbnRleHQgPT09IHBvcHBlciAmJiBvZmZzZXREYXRhKSB7XG4gICAgdmFyIG9mZnNldCA9IG9mZnNldERhdGFbcGxhY2VtZW50XTtcbiAgICBPYmplY3Qua2V5cyhvdmVyZmxvd09mZnNldHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIG11bHRpcGx5ID0gW3JpZ2h0LCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gMSA6IC0xO1xuICAgICAgdmFyIGF4aXMgPSBbdG9wLCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gJ3knIDogJ3gnO1xuICAgICAgb3ZlcmZsb3dPZmZzZXRzW2tleV0gKz0gb2Zmc2V0W2F4aXNdICogbXVsdGlwbHk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gb3ZlcmZsb3dPZmZzZXRzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4cGFuZFRvSGFzaE1hcCh2YWx1ZSwga2V5cykge1xuICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGhhc2hNYXAsIGtleSkge1xuICAgIGhhc2hNYXBba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiBoYXNoTWFwO1xuICB9LCB7fSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0KHN0cikge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gW10uY29uY2F0KGFyZ3MpLnJlZHVjZShmdW5jdGlvbiAocCwgYykge1xuICAgIHJldHVybiBwLnJlcGxhY2UoLyVzLywgYyk7XG4gIH0sIHN0cik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QWx0QXhpcyhheGlzKSB7XG4gIHJldHVybiBheGlzID09PSAneCcgPyAneScgOiAneCc7XG59IiwiaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEZyZXNoU2lkZU9iamVjdCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIGxlZnQ6IDBcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgPj0gMCA/ICd4JyA6ICd5Jztcbn0iLCJ2YXIgaGFzaCA9IHtcbiAgbGVmdDogJ3JpZ2h0JyxcbiAgcmlnaHQ6ICdsZWZ0JyxcbiAgYm90dG9tOiAndG9wJyxcbiAgdG9wOiAnYm90dG9tJ1xufTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICB9KTtcbn0iLCJ2YXIgaGFzaCA9IHtcbiAgc3RhcnQ6ICdlbmQnLFxuICBlbmQ6ICdzdGFydCdcbn07XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9zdGFydHxlbmQvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG59IiwiZXhwb3J0IHZhciBtYXggPSBNYXRoLm1heDtcbmV4cG9ydCB2YXIgbWluID0gTWF0aC5taW47XG5leHBvcnQgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZUJ5TmFtZShtb2RpZmllcnMpIHtcbiAgdmFyIG1lcmdlZCA9IG1vZGlmaWVycy5yZWR1Y2UoZnVuY3Rpb24gKG1lcmdlZCwgY3VycmVudCkge1xuICAgIHZhciBleGlzdGluZyA9IG1lcmdlZFtjdXJyZW50Lm5hbWVdO1xuICAgIG1lcmdlZFtjdXJyZW50Lm5hbWVdID0gZXhpc3RpbmcgPyBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZywgY3VycmVudCwge1xuICAgICAgb3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgZXhpc3Rpbmcub3B0aW9ucywgY3VycmVudC5vcHRpb25zKSxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLmRhdGEsIGN1cnJlbnQuZGF0YSlcbiAgICB9KSA6IGN1cnJlbnQ7XG4gICAgcmV0dXJuIG1lcmdlZDtcbiAgfSwge30pOyAvLyBJRTExIGRvZXMgbm90IHN1cHBvcnQgT2JqZWN0LnZhbHVlc1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhtZXJnZWQpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIG1lcmdlZFtrZXldO1xuICB9KTtcbn0iLCJpbXBvcnQgZ2V0RnJlc2hTaWRlT2JqZWN0IGZyb20gXCIuL2dldEZyZXNoU2lkZU9iamVjdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VQYWRkaW5nT2JqZWN0KHBhZGRpbmdPYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGdldEZyZXNoU2lkZU9iamVjdCgpLCBwYWRkaW5nT2JqZWN0KTtcbn0iLCJpbXBvcnQgeyBtb2RpZmllclBoYXNlcyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiOyAvLyBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ5ODc1MjU1XG5cbmZ1bmN0aW9uIG9yZGVyKG1vZGlmaWVycykge1xuICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICB2YXIgdmlzaXRlZCA9IG5ldyBTZXQoKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBtYXAuc2V0KG1vZGlmaWVyLm5hbWUsIG1vZGlmaWVyKTtcbiAgfSk7IC8vIE9uIHZpc2l0aW5nIG9iamVjdCwgY2hlY2sgZm9yIGl0cyBkZXBlbmRlbmNpZXMgYW5kIHZpc2l0IHRoZW0gcmVjdXJzaXZlbHlcblxuICBmdW5jdGlvbiBzb3J0KG1vZGlmaWVyKSB7XG4gICAgdmlzaXRlZC5hZGQobW9kaWZpZXIubmFtZSk7XG4gICAgdmFyIHJlcXVpcmVzID0gW10uY29uY2F0KG1vZGlmaWVyLnJlcXVpcmVzIHx8IFtdLCBtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzIHx8IFtdKTtcbiAgICByZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXApIHtcbiAgICAgIGlmICghdmlzaXRlZC5oYXMoZGVwKSkge1xuICAgICAgICB2YXIgZGVwTW9kaWZpZXIgPSBtYXAuZ2V0KGRlcCk7XG5cbiAgICAgICAgaWYgKGRlcE1vZGlmaWVyKSB7XG4gICAgICAgICAgc29ydChkZXBNb2RpZmllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXN1bHQucHVzaChtb2RpZmllcik7XG4gIH1cblxuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBpZiAoIXZpc2l0ZWQuaGFzKG1vZGlmaWVyLm5hbWUpKSB7XG4gICAgICAvLyBjaGVjayBmb3IgdmlzaXRlZCBvYmplY3RcbiAgICAgIHNvcnQobW9kaWZpZXIpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9yZGVyTW9kaWZpZXJzKG1vZGlmaWVycykge1xuICAvLyBvcmRlciBiYXNlZCBvbiBkZXBlbmRlbmNpZXNcbiAgdmFyIG9yZGVyZWRNb2RpZmllcnMgPSBvcmRlcihtb2RpZmllcnMpOyAvLyBvcmRlciBiYXNlZCBvbiBwaGFzZVxuXG4gIHJldHVybiBtb2RpZmllclBoYXNlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGhhc2UpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLmZpbHRlcihmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgIHJldHVybiBtb2RpZmllci5waGFzZSA9PT0gcGhhc2U7XG4gICAgfSkpO1xuICB9LCBbXSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVjdFRvQ2xpZW50UmVjdChyZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZWN0LCB7XG4gICAgbGVmdDogcmVjdC54LFxuICAgIHRvcDogcmVjdC55LFxuICAgIHJpZ2h0OiByZWN0LnggKyByZWN0LndpZHRoLFxuICAgIGJvdHRvbTogcmVjdC55ICsgcmVjdC5oZWlnaHRcbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5pcXVlQnkoYXJyLCBmbikge1xuICB2YXIgaWRlbnRpZmllcnMgPSBuZXcgU2V0KCk7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBmbihpdGVtKTtcblxuICAgIGlmICghaWRlbnRpZmllcnMuaGFzKGlkZW50aWZpZXIpKSB7XG4gICAgICBpZGVudGlmaWVycy5hZGQoaWRlbnRpZmllcik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVBU3RyaW5nKCkge1xuICB2YXIgdWFEYXRhID0gbmF2aWdhdG9yLnVzZXJBZ2VudERhdGE7XG5cbiAgaWYgKHVhRGF0YSAhPSBudWxsICYmIHVhRGF0YS5icmFuZHMpIHtcbiAgICByZXR1cm4gdWFEYXRhLmJyYW5kcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLmJyYW5kICsgXCIvXCIgKyBpdGVtLnZlcnNpb247XG4gICAgfSkuam9pbignICcpO1xuICB9XG5cbiAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQ7XG59IiwiaW1wb3J0IGZvcm1hdCBmcm9tIFwiLi9mb3JtYXQuanNcIjtcbmltcG9ydCB7IG1vZGlmaWVyUGhhc2VzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG52YXIgSU5WQUxJRF9NT0RJRklFUl9FUlJPUiA9ICdQb3BwZXI6IG1vZGlmaWVyIFwiJXNcIiBwcm92aWRlZCBhbiBpbnZhbGlkICVzIHByb3BlcnR5LCBleHBlY3RlZCAlcyBidXQgZ290ICVzJztcbnZhciBNSVNTSU5HX0RFUEVOREVOQ1lfRVJST1IgPSAnUG9wcGVyOiBtb2RpZmllciBcIiVzXCIgcmVxdWlyZXMgXCIlc1wiLCBidXQgXCIlc1wiIG1vZGlmaWVyIGlzIG5vdCBhdmFpbGFibGUnO1xudmFyIFZBTElEX1BST1BFUlRJRVMgPSBbJ25hbWUnLCAnZW5hYmxlZCcsICdwaGFzZScsICdmbicsICdlZmZlY3QnLCAncmVxdWlyZXMnLCAnb3B0aW9ucyddO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmFsaWRhdGVNb2RpZmllcnMobW9kaWZpZXJzKSB7XG4gIG1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIFtdLmNvbmNhdChPYmplY3Qua2V5cyhtb2RpZmllciksIFZBTElEX1BST1BFUlRJRVMpIC8vIElFMTEtY29tcGF0aWJsZSByZXBsYWNlbWVudCBmb3IgYG5ldyBTZXQoaXRlcmFibGUpYFxuICAgIC5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgc2VsZikge1xuICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5uYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgU3RyaW5nKG1vZGlmaWVyLm5hbWUpLCAnXCJuYW1lXCInLCAnXCJzdHJpbmdcIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLm5hbWUpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlbmFibGVkJzpcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZGlmaWVyLmVuYWJsZWQgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZW5hYmxlZFwiJywgJ1wiYm9vbGVhblwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIuZW5hYmxlZCkgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3BoYXNlJzpcbiAgICAgICAgICBpZiAobW9kaWZpZXJQaGFzZXMuaW5kZXhPZihtb2RpZmllci5waGFzZSkgPCAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJwaGFzZVwiJywgXCJlaXRoZXIgXCIgKyBtb2RpZmllclBoYXNlcy5qb2luKCcsICcpLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5waGFzZSkgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2ZuJzpcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZGlmaWVyLmZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJmblwiJywgJ1wiZnVuY3Rpb25cIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLmZuKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZWZmZWN0JzpcbiAgICAgICAgICBpZiAobW9kaWZpZXIuZWZmZWN0ICE9IG51bGwgJiYgdHlwZW9mIG1vZGlmaWVyLmVmZmVjdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZWZmZWN0XCInLCAnXCJmdW5jdGlvblwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIuZm4pICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZXF1aXJlcyc6XG4gICAgICAgICAgaWYgKG1vZGlmaWVyLnJlcXVpcmVzICE9IG51bGwgJiYgIUFycmF5LmlzQXJyYXkobW9kaWZpZXIucmVxdWlyZXMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJyZXF1aXJlc1wiJywgJ1wiYXJyYXlcIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLnJlcXVpcmVzKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVxdWlyZXNJZkV4aXN0cyc6XG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG1vZGlmaWVyLnJlcXVpcmVzSWZFeGlzdHMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJyZXF1aXJlc0lmRXhpc3RzXCInLCAnXCJhcnJheVwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cykgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ29wdGlvbnMnOlxuICAgICAgICBjYXNlICdkYXRhJzpcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQb3BwZXJKUzogYW4gaW52YWxpZCBwcm9wZXJ0eSBoYXMgYmVlbiBwcm92aWRlZCB0byB0aGUgXFxcIlwiICsgbW9kaWZpZXIubmFtZSArIFwiXFxcIiBtb2RpZmllciwgdmFsaWQgcHJvcGVydGllcyBhcmUgXCIgKyBWQUxJRF9QUk9QRVJUSUVTLm1hcChmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgcmV0dXJuIFwiXFxcIlwiICsgcyArIFwiXFxcIlwiO1xuICAgICAgICAgIH0pLmpvaW4oJywgJykgKyBcIjsgYnV0IFxcXCJcIiArIGtleSArIFwiXFxcIiB3YXMgcHJvdmlkZWQuXCIpO1xuICAgICAgfVxuXG4gICAgICBtb2RpZmllci5yZXF1aXJlcyAmJiBtb2RpZmllci5yZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXF1aXJlbWVudCkge1xuICAgICAgICBpZiAobW9kaWZpZXJzLmZpbmQoZnVuY3Rpb24gKG1vZCkge1xuICAgICAgICAgIHJldHVybiBtb2QubmFtZSA9PT0gcmVxdWlyZW1lbnQ7XG4gICAgICAgIH0pID09IG51bGwpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChNSVNTSU5HX0RFUEVOREVOQ1lfRVJST1IsIFN0cmluZyhtb2RpZmllci5uYW1lKSwgcmVxdWlyZW1lbnQsIHJlcXVpcmVtZW50KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0iLCJpbXBvcnQgeyBtYXggYXMgbWF0aE1heCwgbWluIGFzIG1hdGhNaW4gfSBmcm9tIFwiLi9tYXRoLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gd2l0aGluKG1pbiwgdmFsdWUsIG1heCkge1xuICByZXR1cm4gbWF0aE1heChtaW4sIG1hdGhNaW4odmFsdWUsIG1heCkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhpbk1heENsYW1wKG1pbiwgdmFsdWUsIG1heCkge1xuICB2YXIgdiA9IHdpdGhpbihtaW4sIHZhbHVlLCBtYXgpO1xuICByZXR1cm4gdiA+IG1heCA/IG1heCA6IHY7XG59IiwiY29uc3QgaW5kZXhDb3VudGVyID0gKCkgPT4ge1xyXG4gICAgbGV0IGN1cnJJbmRleCA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoKXtcclxuICAgICAgICByZXR1cm4gY3VyckluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudEluZGV4KCkge1xyXG4gICAgICAgIGN1cnJJbmRleCA9IGN1cnJJbmRleCArIDE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge2dldEluZGV4LCBpbmNyZW1lbnRJbmRleH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluZGV4Q291bnRlcjsiLCJpbXBvcnQgaW5kZXhDb3VudGVyIGZyb20gJy4vaGVscGVyLmpzJztcclxuXHJcbmNvbnN0IHByb2plY3QgPSAobmFtZSwgdGFza3MgPSBbXSwgaW5kZXgpID0+IHtcclxuICAgIGxldCBjdXJyVGFza0luZGV4ID0gaW5kZXhDb3VudGVyKCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VGFza3MoKXtcclxuICAgICAgICByZXR1cm4gdGFza3M7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0TmFtZShuZXdOYW1lKXtcclxuICAgICAgICBuYW1lID0gbmV3TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRJbmRleChuZXdJbmRleCl7XHJcbiAgICAgICAgaW5kZXggPSBuZXdJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvL25lZWQgdG8gc2V0IGEgdW5pcXVlIGluZGV4IGZvciB0YXNrIGFmdGVyIGl0J3MgY3JlYXRlZFxyXG4gICAgZnVuY3Rpb24gYWRkVGFzayh0YXNrKXtcclxuICAgICAgICB0YXNrLnNldEluZGV4KGN1cnJUYXNrSW5kZXguZ2V0SW5kZXgoKSk7XHJcbiAgICAgICAgdGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgICBjdXJyVGFza0luZGV4LmluY3JlbWVudEluZGV4KCk7XHJcbiAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICB9XHJcblxyXG4gICAgLy9yZW1vdmVzIHRoZSB0YXNrIGZyb20gdGhlIHRhc2sgYXJyYXlcclxuICAgIGZ1bmN0aW9uIHJlbW92ZVRhc2sodGFza0luZGV4KXtcclxuICAgICAgICB0YXNrcy5zcGxpY2UodGFza0luZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2dldE5hbWUsIGdldEluZGV4LCBnZXRUYXNrcywgc2V0TmFtZSwgc2V0SW5kZXgsIGFkZFRhc2ssIHJlbW92ZVRhc2t9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb2plY3Q7IiwiaW1wb3J0IGluZGV4Q291bnRlciBmcm9tICcuL2hlbHBlci5qcyc7XHJcbi8vcHJvamVjdHMgY29udGFpbiB0YXNrcywgdGFza3MgY29udGFpbiBzdWJ0YXNrc1xyXG4vL2ZvciBub3csIHdlJ2xsIGZvbGxvdyB0aGF0IGhpZXJhY2h5XHJcblxyXG5jb25zdCBzdG9yYWdlID0gKCgpID0+IHtcclxuICAgIC8vdGhlIGRlZmF1bHQgcHJvamVjdHMgdGhhdCBjYW4ndCBiZSByZW1vdmVkXHJcbiAgICBjb25zdCBhbGxQcm9qZWN0cyA9IFtdO1xyXG4gICAgbGV0IGN1cnJQcm9qZWN0SW5kZXggPSBpbmRleENvdW50ZXIoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3Qpe1xyXG4gICAgICAgIHByb2plY3Quc2V0SW5kZXgoY3VyclByb2plY3RJbmRleC5nZXRJbmRleCgpKTtcclxuICAgICAgICBjdXJyUHJvamVjdEluZGV4LmluY3JlbWVudEluZGV4KCk7XHJcbiAgICAgICAgYWxsUHJvamVjdHMucHVzaChwcm9qZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qZWN0KHByb2plY3RJbmRleCl7XHJcbiAgICAgICAgYWxsUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYocHJvamVjdC5nZXRJbmRleCgpID09PSBwcm9qZWN0SW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgYWxsUHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHthbGxQcm9qZWN0cywgYWRkUHJvamVjdCwgcmVtb3ZlUHJvamVjdH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yYWdlO1xyXG5cclxuIiwiY29uc3Qgc3VidGFzayA9IChcclxuICAgIG5hbWUsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGluZGV4KSA9PlxyXG57XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0SW5kZXgobmV3SW5kZXgpe1xyXG4gICAgICAgIGluZGV4ID0gbmV3SW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoKXtcclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oKXtcclxuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TmFtZSgpe1xyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldE5hbWUobmV3TmFtZSl7XHJcbiAgICAgICAgbmFtZSA9IG5ld05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0RGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pe1xyXG4gICAgICAgIGRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtnZXRJbmRleCwgZ2V0TmFtZSwgZ2V0RGVzY3JpcHRpb24sIHNldEluZGV4LCBzZXROYW1lLCBzZXREZXNjcmlwdGlvbn07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN1YnRhc2s7IiwiaW1wb3J0IGluZGV4Q291bnRlciBmcm9tICcuL2hlbHBlci5qcyc7XHJcblxyXG5jb25zdCB0YXNrID0gKFxyXG4gICAgbmFtZSxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgZHVlRGF0ZSxcclxuICAgIGVzdGltYXRlZENvbXBsZXRpb25UaW1lLFxyXG4gICAgcHJpb3JpdHksXHJcbiAgICBzdWJ0YXNrcyA9IFtdLFxyXG4gICAgaW5kZXgpID0+XHJcbntcclxuXHJcbiAgICBsZXQgY3VyclN1YnRhc2tJbmRleCA9IGluZGV4Q291bnRlcigpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBnZXROYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oKXtcclxuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RHVlRGF0ZSgpe1xyXG4gICAgICAgIHJldHVybiBkdWVEYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEVzdGltYXRlZFRpbWUoKXtcclxuICAgICAgICByZXR1cm4gZXN0aW1hdGVkQ29tcGxldGlvblRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoKXtcclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UHJpb3JpdHkoKXtcclxuICAgICAgICByZXR1cm4gcHJpb3JpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0TmFtZShuZXdOYW1lKXtcclxuICAgICAgICBuYW1lID0gbmV3TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXREZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbil7XHJcbiAgICAgICAgZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQcmlvcml0eShuZXdQcmlvcml0eSl7XHJcbiAgICAgICAgcHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXREdWVEYXRlKG5ld0R1ZURhdGUpe1xyXG4gICAgICAgIGR1ZURhdGUgPSBuZXdEdWVEYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldEVzdGltYXRlZFRpbWUobmV3RXN0VGltZSl7XHJcbiAgICAgICAgZXN0aW1hdGVkQ29tcGxldGlvblRpbWUgPSBuZXdFc3RUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldEluZGV4KHRhc2tJbmRleCl7XHJcbiAgICAgICAgaW5kZXggPSB0YXNrSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U3VidGFza3MoKXtcclxuICAgICAgICByZXR1cm4gc3VidGFza3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy9uZWVkIHRvIHNldCBhIHVuaXF1ZSBpbmRleCBmb3Igc3VidGFzayBhZnRlciBpdCdzIGNyZWF0ZWRcclxuICAgIGZ1bmN0aW9uIGFkZFN1YnRhc2soc3VidGFza09iail7XHJcbiAgICAgICAgc3VidGFza09iai5zZXRJbmRleChjdXJyU3VidGFza0luZGV4LmdldEluZGV4KCkpO1xyXG4gICAgICAgIHN1YnRhc2tzLnB1c2goc3VidGFza09iaik7XHJcbiAgICAgICAgY3VyclN1YnRhc2tJbmRleC5pbmNyZW1lbnRJbmRleCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVN1YnRhc2soaW5kZXgpe1xyXG4gICAgICAgIHN1YnRhc2tzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZWRpdFN1YnRhc2soc3VidGFza09iail7XHJcbiAgICAgICAgc3VidGFza3MuZm9yRWFjaCgoc3VidGFzaywgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZihzdWJ0YXNrLmluZGV4ID09PSBpbmRleCl7XHJcbiAgICAgICAgICAgICAgICBzdWJ0YXNrc1tpXSA9IHN1YnRhc2tPYmo7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7Z2V0TmFtZSwgZ2V0RGVzY3JpcHRpb24sIGdldER1ZURhdGUsIGdldEVzdGltYXRlZFRpbWUsIGdldEluZGV4LCBnZXRQcmlvcml0eSwgZ2V0U3VidGFza3MsXHJcbiAgICAgICAgICAgIHNldE5hbWUsIHNldFByaW9yaXR5LCBzZXREZXNjcmlwdGlvbiwgc2V0RHVlRGF0ZSwgc2V0RXN0aW1hdGVkVGltZSwgc2V0SW5kZXgsIGFkZFN1YnRhc2ssIHJlbW92ZVN1YnRhc2t9O1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2s7IiwiLy9jb250YWlucyBhbGwgRE9NIE1hbmlwdWxhdGlvbiB0aGF0J3MgbmVlZGVkIGZvciB0YXNrc1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xyXG5pbXBvcnQgdGFzayBmcm9tICcuL3Rhc2suanMnO1xyXG5pbXBvcnQgc3VidGFzayBmcm9tICcuL3N1YnRhc2suanMnO1xyXG5pbXBvcnQgeyBjcmVhdGVQb3BwZXIgfSBmcm9tICdAcG9wcGVyanMvY29yZSc7XHJcbmltcG9ydCBEYXRlcGlja2VyIGZyb20gJ3ZhbmlsbGFqcy1kYXRlcGlja2VyL0RhdGVwaWNrZXInO1xyXG5pbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3QuanMnO1xyXG5cclxuLy9lYWNoIGRvbSBlbGVtZW50IGhhcyBhIGRhdGEgaW5kZXggdGhhdCdzIGFsc28gaW4gdGhlIHN0b3JhZ2VcclxuLy90aGVzZSAnZGF0YS1pbmRleCcgYXR0cmlidXRlcyBhcmUgdXNlZCB0byByZWZlcmVuY2UgdGhlIHN0b3JhZ2UgYXJyYXlzXHJcblxyXG4vLyBIVE1MIEhFTFBFUiBGVU5DVElPTlNcclxuZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKGVsZW1lbnQsIGNsYXNzZXMsIGlkZW50aWZpZXIsIGNoaWxkRWxlbWVudHMsIGN1c3RvbUF0dHJpYnV0ZSl7XHJcbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuICAgIGlmKGNsYXNzZXMpe1xyXG4gICAgICAgIGNsYXNzZXMuZm9yRWFjaChpdGVtID0+IG5vZGUuY2xhc3NMaXN0LmFkZChpdGVtKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoaWRlbnRpZmllcil7XHJcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJyxpZGVudGlmaWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZihjaGlsZEVsZW1lbnRzKXtcclxuICAgICAgICBjaGlsZEVsZW1lbnRzLmZvckVhY2goaXRlbSA9PiBub2RlLmFwcGVuZENoaWxkKGl0ZW0pKVxyXG4gICAgfVxyXG5cclxuICAgIGlmKGN1c3RvbUF0dHJpYnV0ZSl7XHJcbiAgICAgICAgaWYoY3VzdG9tQXR0cmlidXRlLmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShjdXN0b21BdHRyaWJ1dGVbMF0sIGN1c3RvbUF0dHJpYnV0ZVsxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUYWcoZWxlbWVudCwgdGV4dCwgY2xhc3NlcywgaWRlbnRpZmllcil7XHJcbiAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuICAgIGlmKGNsYXNzZXMpe1xyXG4gICAgICAgIGNsYXNzZXMuZm9yRWFjaChpdGVtID0+IG5vZGUuY2xhc3NMaXN0LmFkZChpdGVtKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoaWRlbnRpZmllcil7XHJcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2lkJyxpZGVudGlmaWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZih0ZXh0KXtcclxuICAgICAgICBub2RlLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSW5wdXQodHlwZSwgY2xhc3NlcywgaWRlbnRpZmllciwgcGxhY2Vob2xkZXIsIGlzUmVxdWlyZWQsIGlzQXV0b0ZvY3VzKXtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIHR5cGUpO1xyXG4gICAgaWYoaWRlbnRpZmllcil7XHJcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsIGlkZW50aWZpZXIpO1xyXG4gICAgfVxyXG4gICAgaWYocGxhY2Vob2xkZXIpe1xyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlcik7XHJcbiAgICB9XHJcbiAgICBpZihjbGFzc2VzKXtcclxuICAgICAgICBjbGFzc2VzLmZvckVhY2goaXRlbSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoaXRlbSkpO1xyXG4gICAgfVxyXG4gICAgaWYoaXNSZXF1aXJlZCA/IGlucHV0LnJlcXVpcmVkID0gdHJ1ZSA6IGlucHV0LnJlcXVpcmVkID0gZmFsc2UpO1xyXG4gICAgaWYoaXNBdXRvRm9jdXMgPyBpbnB1dC5hdXRvZm9jdXMgPSB0cnVlIDogaW5wdXQuYXV0b2ZvY3VzID0gZmFsc2UpO1xyXG4gICAgcmV0dXJuIGlucHV0O1xyXG59XHJcblxyXG5jb25zdCBza2lwID0gKG51bSkgPT4gbmV3IEFycmF5KG51bSk7XHJcbi8vIEVORCBIVE1MIEhFTFBFUiBGVU5DVElPTlNcclxuXHJcblxyXG5jb25zdCB1aSA9ICgoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBpbml0aWFsUmVuZGVyKCl7XHJcbiAgICAgICAgYWRkSGFtYnVyZ2VyTWVudUJ0bkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICBhZGRIYW1idXJnZXJOYXZJdGVtc0Z1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICByZW5kZXJJbmJveCgpO1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlckluYm94KCl7XHJcbiAgICAgICAgY29uc3QgYm9keUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gY3JlYXRlRE9NQ29udGFpbmVyKCk7XHJcbiAgICAgICAgY29uc3QgaW5ib3hQcm9qZWN0ID0gc3RvcmFnZS5hbGxQcm9qZWN0cy5maWx0ZXIocHJvamVjdCA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gJ0luYm94JylbMF07XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gY3JlYXRlRE9NUHJvamVjdEhlYWRlcihpbmJveFByb2plY3QpO1xyXG4gICAgICAgIGNvbnN0IGFkZFRhc2tEaXYgPSBjcmVhdGVET01BZGRUYXNrKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9qZWN0LmdldE5hbWUoKSA9PT0gJ0luYm94Jyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrcyA9IHByb2plY3QuZ2V0VGFza3MoKVxyXG4gICAgICAgICAgICAgICAgYWRkQWxsVGFza3NET00oY29udGFpbmVyRGl2LCB0YXNrcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChhZGRUYXNrRGl2KTtcclxuICAgICAgICBib2R5RWxlbS5hcHBlbmRDaGlsZChjb250YWluZXJEaXYpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkSGFtYnVyZ2VyTWVudUJ0bkZ1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICBjb25zdCBoYW1idXJnZXJNZW51QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vYmlsZS1wb3AtaWNvbicpO1xyXG4gICAgICAgIGhhbWJ1cmdlck1lbnVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hhbWJ1cmdlci1tZW51Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICAgICAgICAgIGlmKHNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlJykpe1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ29wYXF1ZS1iYWNrZ3JvdW5kJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnb3BhcXVlLWJhY2tncm91bmQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkSGFtYnVyZ2VyTmF2SXRlbXNGdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgYWRkRGVmYXVsdEhhbWJ1cmdlck5hdkl0ZW1zRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIGFkZFByb2plY3RGdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9hZHMgZGVmYXVsdCBuYXYgZnVuY3Rpb25hbGl0aWVzIGZvciBpbmJveCwgdG9kYXksIGFuZCB0aGlzIHdlZWtcclxuICAgIGZ1bmN0aW9uIGFkZERlZmF1bHRIYW1idXJnZXJOYXZJdGVtc0Z1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICBjb25zdCBpbmJveE5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FbZGF0YS1wcm9qZWN0LWluZGV4PVwiMFwiXScpO1xyXG4gICAgICAgIGNvbnN0IHRvZGF5TmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtkYXRhLXByb2plY3QtaW5kZXg9XCIxXCJdJyk7XHJcbiAgICAgICAgY29uc3QgdGhpc1dlZWtOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhW2RhdGEtcHJvamVjdC1pbmRleD1cIjJcIl0nKTtcclxuICAgICAgICBcclxuICAgICAgICBpbmJveE5hdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZW5kZXJJbmJveCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9jcmVhdGVzIG5ldyBwcm9qZWN0cyBmcm9tIGNsaWNraW5nIG9uIHRoZSBzaWRlYmFyIGFuZCB0eXBpbmcgaW4gYSBwcm9qZWN0IG5hbWVcclxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3RGdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QtYnV0dG9uJyk7XHJcbiAgICAgICAgYWRkUHJvamVjdE5vZGVGdW5jdGlvbmFsaXR5KGFkZFByb2plY3ROb2RlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQWRkUHJvamVjdFRleHQoKXtcclxuICAgICAgICAgICAgY29uc3QgYWRkUHJvamVjdExpbmsgPSBjcmVhdGVUYWcoJ2EnLCcrIEFkZCBQcm9qZWN0cycsIC4uLnNraXAoMykpXHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBjcmVhdGVDb250YWluZXIoJ2xpJywgc2tpcCgxKSwgJ2FkZC1wcm9qZWN0LWJ1dHRvbicsIFthZGRQcm9qZWN0TGlua10sIHNraXAoMSkpO1xyXG4gICAgICAgICAgICBhZGRQcm9qZWN0Tm9kZUZ1bmN0aW9uYWxpdHkoYWRkUHJvamVjdEJ0bik7XHJcbiAgICAgICAgICAgIHJldHVybiBhZGRQcm9qZWN0QnRuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkUHJvamVjdE5vZGVGdW5jdGlvbmFsaXR5KGFkZFByb2plY3ROb2RlKXtcclxuICAgICAgICAgICAgYWRkUHJvamVjdE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY3JlYXRlQWRkUHJvamVjdEZvcm0oKSwgYWRkUHJvamVjdE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdE5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVBZGRQcm9qZWN0Rm9ybSgpe1xyXG4gICAgICAgICAgICBjb25zdCBhZGRQcm9qZWN0SW5wdXQgPSBjcmVhdGVJbnB1dCgndGV4dCcsIHNraXAoMSksICdhZGQtcHJvamVjdC1uYW1lJywgc2tpcCgxKSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpcm1JY29uID0gY3JlYXRlVGFnKCdpJyxza2lwKDEpLFsnZmEtc29saWQnLCdmYS1zaGFycCcsJ2ZhLWNoZWNrJ10sIHNraXAoMSkpO1xyXG4gICAgICAgICAgICBjb25zdCBjYW5jZWxJY29uID0gY3JlYXRlVGFnKCdpJyxza2lwKDEpLFsnZmEtc29saWQnLCdmYS1zaGFycCcsJ2ZhLXgnXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpcm1EaXYgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIHNraXAoMSksICdjb25maXJtLWFkZC1wcm9qZWN0JywgW2NvbmZpcm1JY29uXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbERpdiA9IGNyZWF0ZUNvbnRhaW5lcignZGl2Jywgc2tpcCgxKSwgJ2NhbmNlbC1hZGQtcHJvamVjdCcsIFtjYW5jZWxJY29uXSwgc2tpcCgxKSk7ICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZm9ybSA9IGNyZWF0ZUNvbnRhaW5lcignZm9ybScsIHNraXAoMSksICdhZGQtcHJvamVjdC1mb3JtJywgW2FkZFByb2plY3RJbnB1dCwgY29uZmlybURpdiwgY2FuY2VsRGl2XSwgc2tpcCgxKSk7XHJcblxyXG4gICAgICAgICAgICBhZGRDYW5jZWxCdG5Gb3JtRnVuY3Rpb25hbGl0eShjYW5jZWxEaXYpO1xyXG4gICAgICAgICAgICBhZGRDb25maXJtQnRuRm9ybUZ1bmN0aW9uYWxpdHkoZm9ybSwgY29uZmlybURpdiwgYWRkUHJvamVjdElucHV0KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkQ2FuY2VsQnRuRm9ybUZ1bmN0aW9uYWxpdHkoY2FuY2VsRGl2KXtcclxuICAgICAgICAgICAgY2FuY2VsRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1wcm9qZWN0LWZvcm0nKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZFByb2plY3RUZXh0ID0gY3JlYXRlQWRkUHJvamVjdFRleHQoKTtcclxuICAgICAgICAgICAgICAgIGZvcm0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYWRkUHJvamVjdFRleHQsIGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENvbmZpcm1CdG5Gb3JtRnVuY3Rpb25hbGl0eShmb3JtLCBjb25maXJtRGl2LCBwcm9qZWN0TmFtZUlucHV0KXtcclxuICAgICAgICAgICAgY29uZmlybURpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNyZWF0ZU5ld1Byb2plY3QpXHJcbiAgICAgICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50LmtleSA9PT0gJ0VudGVyJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTmV3UHJvamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlTmV3UHJvamVjdCgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QtZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdE5hbWVJbnB1dC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZihwcm9qZWN0TmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdQcm9qZWN0ID0gcHJvamVjdChwcm9qZWN0TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JhZ2UuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdExpbmsgPSBjcmVhdGVQcm9qZWN0Tm9kZShuZXdQcm9qZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkUHJvamVjdFRleHQgPSBjcmVhdGVBZGRQcm9qZWN0VGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHByb2plY3RMaW5rLCBmb3JtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhZGRQcm9qZWN0VGV4dCwgZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9lbGVtZW50IHRoYXQgY29udGFpbnMgcHJvamVjdCBuYW1lLCBpZiBjbGlja2VkIG9uIHRoZW4gY2xlYXIgYWxsIHRhc2tzIGFuZCBsb2FkIHRoZSByZWxldmFudCB0YXNrc1xyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3ROb2RlKHByb2plY3RPYmplY3Qpe1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICAgICAgcHJvamVjdExpbmsuaW5uZXJUZXh0ID0gcHJvamVjdE9iamVjdC5nZXROYW1lKCk7XHJcbiAgICAgICAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JywgcHJvamVjdE9iamVjdC5nZXRJbmRleCgpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaW5rQ29udGFpbmVyID0gY3JlYXRlQ29udGFpbmVyKCdsaScsIHNraXAoMSksIHNraXAoMSksIFtwcm9qZWN0TGlua10sIHNraXAoMSkpO1xyXG4gICAgICAgICAgICBwcm9qZWN0TGlua0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0TGluayk7XHJcbiAgICAgICAgICAgIGFkZFByb2plY3RMaW5rRXZlbnRMaXN0ZW5lcigpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkUHJvamVjdExpbmtFdmVudExpc3RlbmVyKCl7XHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlua0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFByb2plY3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFkZFByb2plY3QoKXtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckFsbFRhc2tzRE9NKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZURPTVByb2plY3RIZWFkZXIocHJvamVjdE9iamVjdCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXhBcnJheSA9IHN0b3JhZ2VMb29rdXBzLmdldFByb2plY3RJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGV2YW50VGFza3MgPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RJbmRleEFycmF5XS5nZXRUYXNrcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZEFsbFRhc2tzRE9NKGNvbnRhaW5lciwgcmVsZXZhbnRUYXNrcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZURPTUFkZFRhc2soKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdExpbmtDb250YWluZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vZW50aXJlIGNvbnRhaW5lciB0aGF0IGhvbGRzIGFsbCB0aGUgdGFza3MsIHVuaXF1ZSBpZCBpcyBjb250YWluZXJcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZURPTUNvbnRhaW5lcigpe1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVDb250YWluZXIoJ2RpdicsIHNraXAoMSksICdjb250YWluZXInLCAuLi5za2lwKDIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3RoZSB0ZXh0IHRoYXQgY29udGFpbnMgdGhlIHByb2plY3QgbmFtZVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRE9NUHJvamVjdEhlYWRlcihwcm9qZWN0KXtcclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBjcmVhdGVUYWcoJ2gxJywgcHJvamVjdC5nZXROYW1lKCksIFsnaGVhZGVyLXR5cGUnXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUNvbnRhaW5lcignZGl2Jywgc2tpcCgxKSwgJ3Byb2plY3QtaGVhZGVyJywgW2hlYWRlcl0sIFsnZGF0YS1wcm9qZWN0LWluZGV4JywgcHJvamVjdC5nZXRJbmRleCgpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jcmVhdGVzIHRoZSBkaXYgdGhhdCB3aGVuIGNsaWNrZWQsIHRoZSBhZGQgbmV3IHRhc2sgZm9ybSBhcHBlYXJzXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVET01BZGRUYXNrKCl7XHJcbiAgICAgICAgY29uc3QgcGx1c0ljb24gPSBjcmVhdGVUYWcoJ2knLCBza2lwKDEpLCBbJ2ZhJywnZmEtcGx1cycsICdwb2ludGVyJ10sIHNraXAoMSkpO1xyXG4gICAgICAgIGNvbnN0IGFkZFRhc2tUZXh0ID0gY3JlYXRlVGFnKCdkaXYnLCAnQWRkIFRhc2snLCBbJ2FkZC10YXNrLXRleHQnXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgY29uc3QgYWRkVGFza0RpdiA9IGNyZWF0ZUNvbnRhaW5lcignZGl2JywgWydwb2ludGVyJ10sICdhZGQtdGFzay1jbGlja2FibGUtZGl2JywgW3BsdXNJY29uLCBhZGRUYXNrVGV4dF0sIHNraXAoMSkpO1xyXG4gICAgICAgIGFkZFRhc2tEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihoYXNGb3JtKCkpe1xyXG4gICAgICAgICAgICAgICAgcmV2ZXJ0Rm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgY29uc3QgYWRkVGFza0Zvcm0gPSBjcmVhdGVET01UYXNrRm9ybSgnYWRkJyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRUYXNrRm9ybSk7XHJcbiAgICAgICAgICAgIGFkZFRhc2tEaXYucmVtb3ZlKCk7XHJcbiAgICAgICAgfSwge29uY2U6IHRydWV9KVxyXG5cclxuICAgICAgICByZXR1cm4gYWRkVGFza0RpdjtcclxuICAgIH1cclxuXHJcbiAgICAvL3N0eWxpc3RpYyBkZWNpc2lvbiB0byBvbmx5IGhhdmUgb25lIGZvcm0gZGlzcGxheSBhdCBhIHRpbWUgaW4gdG8gZG8gbGlzdFxyXG4gICAgLy9oZWxwZXIgZnVuY3Rpb25zIGZvciBmb3Jtc1xyXG4gICAgZnVuY3Rpb24gaGFzRm9ybSgpe1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWZvcm0nKSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy9yZW1vdmVzIHRoZSBleGlzdGluZyBmb3JtIGFuZCBmb3IgZWRpdCBmb3JtcywgcmVtb3ZlIHRoZSBpbnZpc2libGUgaWQgZnJvbSB0YXNrL3N1YnRhc2tcclxuICAgIGZ1bmN0aW9uIHJldmVydEZvcm0oKXtcclxuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybScpO1xyXG4gICAgICAgIGNvbnN0IGludmlzaWJsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW52aXNpYmxlJyk7XHJcbiAgICAgICAgY29uc3QgYWRkVGFza0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1jbGlja2FibGUtZGl2Jyk7XHJcbiAgICAgICAgaWYoaW52aXNpYmxlRWxlbWVudCl7XHJcbiAgICAgICAgICAgIGludmlzaWJsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighYWRkVGFza0Rpdil7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZURPTUFkZFRhc2soKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcm0ucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jcmVhdGVzIHRoZSBmb3JtIHRoYXQgd2hlbiBzdWJtaXR0ZWQsIGFkZHMgYSBuZXcgdGFzayB0byB0aGUgZG9tXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVET01UYXNrRm9ybSh0eXBlKXtcclxuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBjcmVhdGVJbnB1dCgndGV4dCcsIHNraXAoMSksICduYW1lJywgJ05hbWUnLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gY3JlYXRlSW5wdXQoJ3RleHQnLCBza2lwKDEpLCAnZGVzY3JpcHRpb24nLCAnRGVzY3JpcHRpb24nLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHByaW9yaXR5RGl2ID0gZ2V0UG9wb3Zlckljb25zKCdwcmlvcml0eS1idG4nLCAnZmEtZmxhZycsICdQcmlvcml0eScpO1xyXG4gICAgICAgIGNvbnN0IGR1ZURhdGVEaXYgPSBnZXRQb3BvdmVySWNvbnMoJ2R1ZS1kYXRlLWJ0bicsICdmYS1jYWxlbmRhcicsJ0R1ZSBEYXRlJyk7XHJcbiAgICAgICAgY29uc3QgZXN0aW1hdGVkVGltZURpdiA9IGdldFBvcG92ZXJJY29ucygnZXN0LWNvbXBsZXRpb24tdGltZS1idG4nLCAnZmEtY2xvY2snLCAnRXN0IFRpbWUnKTsgICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHBvcG92ZXJDb250YWluZXIgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIFsncG9wb3Zlci1pY29ucy1kaXYnXSwgc2tpcCgxKSwgW3ByaW9yaXR5RGl2LCBkdWVEYXRlRGl2LCBlc3RpbWF0ZWRUaW1lRGl2XSwgc2tpcCgxKSk7XHJcbiBcclxuICAgICAgICBhZGRQcmlvcml0eVBvcG92ZXJFdmVudExpc3RlbmVyKHByaW9yaXR5RGl2LCBwb3BvdmVyQ29udGFpbmVyKTtcclxuICAgICAgICBhZGREdWVEYXRlUG9wb3ZlckV2ZW50TGlzdGVuZXIoZHVlRGF0ZURpdiwgcG9wb3ZlckNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIC8vYnV0dG9ucyBmb3IgZm9ybSBhY3Rpb25zXHJcbiAgICAgICAgY29uc3QgY2FuY2VsQnRuID0gY3JlYXRlVGFnKCdidXR0b24nLCdDYW5jZWwnLCBza2lwKDEpLCAnY2FuY2VsLXRhc2stZm9ybScpO1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGNyZWF0ZVRhZygnYnV0dG9uJywnQ29uZmlybScsIHNraXAoMSksICdzdWJtaXQtdGFzay1mb3JtJyk7XHJcbiAgICAgICAgY29uc3QgZm9ybUFjdGlvbkJ0bnNDb250YWluZXIgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIHNraXAoMSksICdmb3JtLWFjdGlvbnMtZGl2JywgW2NhbmNlbEJ0biwgc3VibWl0QnRuXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZvcm0gPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIHNraXAoMSksICd0YXNrLWZvcm0nLCBbbmFtZUlucHV0LCBkZXNjcmlwdGlvbklucHV0LCBwb3BvdmVyQ29udGFpbmVyLCBmb3JtQWN0aW9uQnRuc0NvbnRhaW5lcl0sIHNraXAoMSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vYWRkIGFsbCBidXR0b24gZnVuY3Rpb25hbGl0aWVzXHJcbiAgICAgICAgaWYodHlwZSA9PT0gJ2FkZCcpe1xyXG4gICAgICAgICAgICBhZGRDYW5jZWxBZGRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgICAgICBhZGRTdWJtaXRBZGRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGUgPT09ICdlZGl0Jyl7XHJcbiAgICAgICAgICAgIGFkZENhbmNlbEVkaXRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgICAgICBhZGRTdWJtaXRFZGl0VGFza0Z1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZm9ybTtcclxuXHJcbiAgICAgICAgLy9mb3IgcHJpb3JpdHksIGR1ZSBkYXRlLCBhbmQgZXN0aW1hdGVkIHRpbWUgcG9wb3ZlcnNcclxuICAgICAgICBmdW5jdGlvbiBnZXRQb3BvdmVySWNvbnMoZGl2SWQsIGljb25DbGFzcywgdGV4dCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsZGl2SWQpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1mb3JtLWljb25zJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnICsgdGV4dCk7XHJcbiAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtcmVndWxhcicsaWNvbkNsYXNzKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGljb24pO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaWNvblRleHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy93aGVuIGNsaWNraW5nIHByaW9yaXR5IG9wdGlvbnMgZGl2XHJcbiAgICAgICAgZnVuY3Rpb24gYWRkUHJpb3JpdHlQb3BvdmVyRXZlbnRMaXN0ZW5lcihwcmlvcml0eURpdiwgcGFyZW50RGl2KXtcclxuICAgICAgICAgICAgcHJpb3JpdHlEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYoaXNBY3RpdmUocHJpb3JpdHlEaXYpKXtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmVQb3BvdmVycygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkxID0gZ2V0UHJpb3JpdHlPcHRpb24oMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkyID0gZ2V0UHJpb3JpdHlPcHRpb24oMik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkzID0gZ2V0UHJpb3JpdHlPcHRpb24oMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlDb250YWluZXIgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsWydwb3BvdmVyLWNvbnRhaW5lcicsJ2FjdGl2ZS1wb3BvdmVyJ10sICdwcmlvcml0eS1vcHRpb25zJywgW3ByaW9yaXR5MSwgcHJpb3JpdHkyLCBwcmlvcml0eTNdLCBza2lwKDEpKTtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVQb3BwZXIocHJpb3JpdHlEaXYsIHByaW9yaXR5Q29udGFpbmVyLCB7cGxhY2VtZW50OiAnYm90dG9tJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChwcmlvcml0eUNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVBY3RpdmUocHJpb3JpdHlEaXYpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0UHJpb3JpdHlPcHRpb24ocHJpb3JpdHlOdW1iZXIpe1xyXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eU9wdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIHByaW9yaXR5SWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLWZsYWcnLCdpY29uJyk7XHJcbiAgICAgICAgICAgIHN3aXRjaChwcmlvcml0eU51bWJlcil7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24tcmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24teWVsbG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHlJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24tZ3JlZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBpY29uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgUHJpb3JpdHknKTtcclxuICAgICAgICAgICAgcHJpb3JpdHlPcHRpb25EaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlJY29uKTtcclxuICAgICAgICAgICAgcHJpb3JpdHlPcHRpb25EaXYuYXBwZW5kQ2hpbGQoaWNvblRleHQpO1xyXG4gICAgICAgICAgICBwcmlvcml0eU9wdGlvbkRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlUHJpb3JpdHlJY29uKHByaW9yaXR5SWNvbik7XHJcbiAgICAgICAgICAgICAgICBhZGRQcmlvcml0eURhdGFBdHRyaWJ1dGUocHJpb3JpdHlOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlUG9wb3ZlcnMoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIHByaW9yaXR5T3B0aW9uRGl2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlUHJpb3JpdHlJY29uKG5ld1ByaW9yaXR5SWNvbil7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5LWJ0bicpO1xyXG4gICAgICAgICAgICBjb25zdCBvbGRQcmlvcml0eUljb24gPSBwcmlvcml0eUJ0bi5xdWVyeVNlbGVjdG9yKCdpJyk7XHJcbiAgICAgICAgICAgIG9sZFByaW9yaXR5SWNvbi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdQcmlvcml0eUljb24sIG9sZFByaW9yaXR5SWNvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRQcmlvcml0eURhdGFBdHRyaWJ1dGUocHJpb3JpdHlOdW1iZXIpe1xyXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eU9wdGlvbnNEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHktYnRuJyk7XHJcbiAgICAgICAgICAgIHByaW9yaXR5T3B0aW9uc0Rpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpb3JpdHktbnVtYmVyJywgcHJpb3JpdHlOdW1iZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkRHVlRGF0ZVBvcG92ZXJFdmVudExpc3RlbmVyKGR1ZURhdGVEaXYsIHBhcmVudERpdil7XHJcbiAgICAgICAgICAgIGR1ZURhdGVEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlUG9wb3ZlcnMoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW5IZWxwZXIgPSBjcmVhdGVUYWcoJ3NwYW4nLCBza2lwKDEpLCBbJ2FjdGl2ZS1wb3BvdmVyJ10uIHNraXAoMSkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZUlucHV0ID0gbmV3IERhdGVwaWNrZXIoc3BhbkhlbHBlcik7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQb3BwZXIoZHVlRGF0ZURpdiwgc3BhbkhlbHBlciwge3BsYWNlbWVudDogJ2JvdHRvbSd9KTtcclxuICAgICAgICAgICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChzcGFuSGVscGVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY2hlY2tzIGlmIGVsZW1lbnQgaGFzIGFjdGl2ZS1wb3BvdmVyIGNsYXNzXHJcbiAgICAgICAgZnVuY3Rpb24gaXNBY3RpdmUoZWxlbWVudCl7XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVBY3RpdmUoZWxlbWVudCl7XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pZiB0aGVyZSdzIGFueSBhY3RpdmUgcG9wb3ZlcnMsIHJlbW92ZSB0aGUgcG9wb3ZlclxyXG4gICAgICAgIC8vZGV0ZXJtaW5lZCBieSBjbGFzcyBuYW1lICdhY3RpdmUtcG9wb3ZlcidcclxuICAgICAgICBmdW5jdGlvbiByZW1vdmVBY3RpdmVQb3BvdmVycygpe1xyXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVQb3BvdmVycyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWN0aXZlLXBvcG92ZXInKSk7XHJcbiAgICAgICAgICAgIGlmKGFjdGl2ZVBvcG92ZXJzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlUG9wb3ZlcnMuZm9yRWFjaChwb3BvdmVyID0+IHtcclxuICAgICAgICAgICAgICAgIHBvcG92ZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZW1vdmVzIHRoZSBmb3JtIGFuZCBhZGRzIHRoZSBhZGQgdGFzayB0ZXh0IGJhY2tcclxuICAgICAgICBmdW5jdGlvbiBhZGRDYW5jZWxBZGRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgICAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgZm9ybS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVET01BZGRUYXNrKCkpO1xyXG4gICAgICAgICAgICB9LCB7b25jZTp0cnVlfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JlbW92ZXMgdGhlIGZvcm0gYW5kIGFkZHMgdGhlIHRhc2sgZG9tXHJcbiAgICAgICAgLy9uZWVkIHRvIGFkZCBlcnJvciBtZXNzYWdlIG9mIHNvbWUgc29ydCB3aGVuIHRoZXJlJ3Mgbm8gdGV4dCBpbiB0aGUgbmFtZSBmaWVsZFxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFN1Ym1pdEFkZFRhc2tCdG5GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb25GaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHktYnRuJykuZ2V0QXR0cmlidXRlKCdkYXRhLXByaW9yaXR5LW51bWJlcicpO1xyXG4gICAgICAgICAgICAgICAgaWYobmFtZUZpZWxkKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9qZWN0SW5kZXhJbkFycmF5ID0gc3RvcmFnZUxvb2t1cHMuZ2V0UHJvamVjdEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Rhc2sgPSB0YXNrKG5hbWVGaWVsZCwgZGVzY3JpcHRpb25GaWVsZCwgJycsICcnLCBwcmlvcml0eU51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VGFzayA9IHN0b3JhZ2UuYWxsUHJvamVjdHNbcHJvamVjdEluZGV4SW5BcnJheV0uYWRkVGFzayhuZXdUYXNrKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Rhc2tET00gPSBjcmVhdGVET01UYXNrKG5ld1Rhc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZFRhc2tFbGVtID0gY3JlYXRlRE9NQWRkVGFzaygpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5ld1Rhc2tET00pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRUYXNrRWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0pICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkQ2FuY2VsRWRpdFRhc2tCdG5GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZpc2libGVUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgaW52aXNpYmxlVGFzay5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3VibWl0RWRpdFRhc2tGdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5TnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5LWJ0bicpLmdldEF0dHJpYnV0ZSgnZGF0YS1wcmlvcml0eS1udW1iZXInKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludmlzaWJsZVRhc2tFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKG5hbWVGaWVsZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFRhc2tEYXRhSW5kZXggPSBpbnZpc2libGVUYXNrRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RJbmRleEluQXJyYXkgPSBzdG9yYWdlTG9va3Vwcy5nZXRQcm9qZWN0SW5kZXgoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrSW5kZXhJbkFycmF5ID0gc3RvcmFnZUxvb2t1cHMuZ2V0VGFza0luZGV4KHByb2plY3RJbmRleEluQXJyYXksIGN1cnJlbnRUYXNrRGF0YUluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VGFzayA9IHN0b3JhZ2UuYWxsUHJvamVjdHNbcHJvamVjdEluZGV4SW5BcnJheV0uZ2V0VGFza3MoKVt0YXNrSW5kZXhJbkFycmF5XTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFzay5zZXROYW1lKG5hbWVGaWVsZClcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFzay5zZXREZXNjcmlwdGlvbihkZXNjcmlwdGlvbkZpZWxkKVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUYXNrLnNldFByaW9yaXR5KHByaW9yaXR5TnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrRE9NID0gY3JlYXRlRE9NVGFzayhjdXJyZW50VGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW52aXNpYmxlVGFza0VsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3VGFza0RPTSwgaW52aXNpYmxlVGFza0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGludmlzaWJsZVRhc2tFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVET01TdWJ0YXNrRm9ybSh0eXBlKXtcclxuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBjcmVhdGVJbnB1dCgndGV4dCcsIHNraXAoMSksICduYW1lJywgJ05hbWUnLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gY3JlYXRlSW5wdXQoJ3RleHQnLCBza2lwKDEpLCAnZGVzY3JpcHRpb24nLCAnRGVzY3JpcHRpb24nLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIC8vYnV0dG9ucyBmb3IgZm9ybSBhY3Rpb25zXHJcbiAgICAgICAgY29uc3QgY2FuY2VsQnRuID0gY3JlYXRlVGFnKCdidXR0b24nLCdDYW5jZWwnLCBza2lwKDEpLCAnY2FuY2VsLXRhc2stZm9ybScpO1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGNyZWF0ZVRhZygnYnV0dG9uJywnQ29uZmlybScsIHNraXAoMSksICdzdWJtaXQtdGFzay1mb3JtJyk7XHJcbiAgICAgICAgY29uc3QgZm9ybUFjdGlvbkJ0bnNDb250YWluZXIgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIHNraXAoMSksICdmb3JtLWFjdGlvbnMtZGl2JywgW2NhbmNlbEJ0biwgc3VibWl0QnRuXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZvcm0gPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIHNraXAoMSksICd0YXNrLWZvcm0nLCBbbmFtZUlucHV0LCBkZXNjcmlwdGlvbklucHV0LCBmb3JtQWN0aW9uQnRuc0NvbnRhaW5lcl0sIHNraXAoMSkpO1xyXG5cclxuICAgICAgICBpZih0eXBlID09PSAnYWRkJyl7XHJcbiAgICAgICAgICAgIGFkZENhbmNlbEFkZFRhc2tCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgICAgIGFkZFN1Ym1pdEFkZFRhc2tCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHlwZSA9PT0gJ2VkaXQnKXtcclxuICAgICAgICAgICAgYWRkQ2FuY2VsRWRpdFRhc2tCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgICAgIGFkZFN1Ym1pdEVkaXRUYXNrRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG5cclxuICAgICAgICByZXR1cm4gZm9ybTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkQ2FuY2VsQWRkVGFza0J0bkZ1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRTdWJtaXRBZGRUYXNrQnRuRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmKG5hbWVGaWVsZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1N1YnRhc2sgPSBzdWJ0YXNrKG5hbWVGaWVsZCwgZGVzY3JpcHRpb25GaWVsZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RBcnJheUluZGV4ID0gc3RvcmFnZUxvb2t1cHMuZ2V0UHJvamVjdEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YVRhc2tJbmRleCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrQXJyYXlJbmRleCA9IHN0b3JhZ2VMb29rdXBzLmdldFRhc2tJbmRleChwcm9qZWN0QXJyYXlJbmRleCwgZGF0YVRhc2tJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFRhc2tJblN0b3JhZ2UgPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RBcnJheUluZGV4XS5nZXRUYXNrcygpW3Rhc2tBcnJheUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFza0luU3RvcmFnZS5hZGRTdWJ0YXNrKG5ld1N1YnRhc2spO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRE9NID0gY3JlYXRlRE9NU3VidGFzayhuZXdTdWJ0YXNrLCBkYXRhVGFza0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN1YnRhc2tET00sIGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRDYW5jZWxFZGl0VGFza0J0bkZ1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludmlzaWJsZVRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW52aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBpbnZpc2libGVUYXNrLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcclxuICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRTdWJtaXRFZGl0VGFza0Z1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludmlzaWJsZVRhc2tFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0RhdGFJbmRleCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tEYXRhSW5kZXggPSBmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLWluZGV4Jyk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RBcnJheUluZGV4ID0gc3RvcmFnZUxvb2t1cHMuZ2V0UHJvamVjdEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrQXJyYXlJbmRleCA9IHN0b3JhZ2VMb29rdXBzLmdldFRhc2tJbmRleChwcm9qZWN0QXJyYXlJbmRleCwgdGFza0RhdGFJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrQXJyYXlJbmRleCA9IHN0b3JhZ2VMb29rdXBzLmdldFN1YnRhc2tJbmRleChwcm9qZWN0QXJyYXlJbmRleCwgdGFza0FycmF5SW5kZXgsIHN1YnRhc2tEYXRhSW5kZXgpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U3VidGFzayA9IHN0b3JhZ2UuYWxsUHJvamVjdHNbcHJvamVjdEFycmF5SW5kZXhdLmdldFRhc2tzKClbdGFza0FycmF5SW5kZXhdLmdldFN1YnRhc2tzKClbc3VidGFza0FycmF5SW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZihuYW1lRmllbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJ0YXNrLnNldE5hbWUobmFtZUZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkZXNjcmlwdGlvbkZpZWxkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN1YnRhc2suc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb25GaWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1N1YnRhc2tET00gPSBjcmVhdGVET01TdWJ0YXNrKGN1cnJlbnRTdWJ0YXNrKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnZpc2libGVUYXNrRWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTdWJ0YXNrRE9NLCBpbnZpc2libGVUYXNrRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW52aXNpYmxlVGFza0VsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy9jcmVhdGVzIHRoZSB0YXNrIGRvbVxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRE9NVGFzayh0YXNrT2JqKXtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZVRhc2tJY29uID0gY3JlYXRlVGFnKCdpJyxza2lwKDEpLCBbJ2ZhLXJlZ3VsYXInLCdmYS1jaXJjbGUnLCAncG9pbnRlciddKTtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZVRhc2tEaXYgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIFsnY29tcGxldGUtdGFzay1idG4nXSwgc2tpcCgxKSwgW2NvbXBsZXRlVGFza0ljb25dLCBza2lwKDEpKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFza0luZm9ybWF0aW9uRGl2ID0gY3JlYXRlVGFnKCdkaXYnLCB0YXNrT2JqLmdldE5hbWUoKSwgWyd0YXNrLXRpdGxlJ10sIHNraXAoMSkpO1xyXG5cclxuICAgICAgICBjb25zdCBhZGRTdWJ0YXNrSWNvbiA9IGNyZWF0ZVRhZygnaScsIHNraXAoMSksIFsnZmEtc29saWQnLCdmYS1zcXVhcmUtcGx1cycsICdwb2ludGVyJ10sIHNraXAoMSkpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRJY29uID0gY3JlYXRlVGFnKCdpJywgc2tpcCgxKSwgWydmYS1zb2xpZCcsJ2ZhLXBlbi10by1zcXVhcmUnLCAncG9pbnRlciddLCBza2lwKDEpKTtcclxuICAgICAgICBjb25zdCBkZWxldGVJY29uID0gY3JlYXRlVGFnKCdpJywgc2tpcCgxKSwgWydmYS1zb2xpZCcsJ2ZhLXRyYXNoJywgJ3BvaW50ZXInXSwgc2tpcCgxKSk7ICAgICAgXHJcbiAgICAgICAgY29uc3QgaWNvbkNvbnRhaW5lciA9IGNyZWF0ZUNvbnRhaW5lcignZGl2JywgWydidXR0b24taWNvbnMnXSwgc2tpcCgxKSwgW2FkZFN1YnRhc2tJY29uLCBlZGl0SWNvbiwgZGVsZXRlSWNvbl0sIHNraXAoMSkpO1xyXG5cclxuICAgICAgICBpZih0YXNrT2JqLmdldEVzdGltYXRlZFRpbWUoKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tFc3RpbWF0ZWRUaW1lID0gY3JlYXRlVGFnKCdkaXYnLGBFc3QgVGltZTogJHt0YXNrT2JqLmdldEVzdGltYXRlZFRpbWUoKX1gLCBbJ3Rhc2stZXN0aW1hdGVkLXRpbWUnXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgICAgIHRhc2tJbmZvcm1hdGlvbkRpdi5hcHBlbmRDaGlsZCh0YXNrRXN0aW1hdGVkVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRhc2tPYmouZ2V0RGVzY3JpcHRpb24oKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGNyZWF0ZVRhZygnZGl2Jyx0YXNrT2JqLmdldERlc2NyaXB0aW9uKCksIFsndGFzay1kZXNjcmlwdGlvbiddLCBza2lwKDEpKTtcclxuICAgICAgICAgICAgdGFza0luZm9ybWF0aW9uRGl2LmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0YXNrRE9NID0gY3JlYXRlQ29udGFpbmVyKCdkaXYnLCBbJ3Rhc2snXSwgJycsIFtjb21wbGV0ZVRhc2tEaXYsIHRhc2tJbmZvcm1hdGlvbkRpdiwgaWNvbkNvbnRhaW5lcl0sIFsnZGF0YS10YXNrLWluZGV4JywgdGFza09iai5nZXRJbmRleCgpXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYWRkUHJpb3JpdHlDb2xvcihjb21wbGV0ZVRhc2tJY29uLCB0YXNrT2JqLmdldFByaW9yaXR5KCkpO1xyXG4gICAgICAgIGFkZENvbXBsZXRlVGFza0ljb25GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgYWRkRGVsZXRlSWNvbkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICBhZGRFZGl0SWNvbkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICBhZGRTdWJ0YXNrSWNvbkZ1bmN0aW9uYWxpdHkoKTtcclxuXHJcbiAgICAgICAgLy9jaGFuZ2UgdGhlIGJ1bGxldCBwb2ludCBjb2xvclxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFByaW9yaXR5Q29sb3IoaWNvbiwgcHJpb3JpdHlOdW1iZXIpe1xyXG4gICAgICAgICAgICBzd2l0Y2gocHJpb3JpdHlOdW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnMSc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uLXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnMic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uLXllbGxvdycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnMyc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uLWdyZWVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBtYWtlU29saWRJY29uKGljb24pe1xyXG4gICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLXJlZ3VsYXInKTtcclxuICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ljb24nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vdXNlZnVsIGhlbHBlciBmdW5jdGlvbnMgZm9yIGljb24gb3BlcmF0aW9uc1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldFRhc2tGcm9tQ2hpbGROb2RlKG5vZGUpe1xyXG4gICAgICAgICAgICBpZighbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2snKSl7XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdoaWxlKCFub2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrJykpe1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRTdG9yYWdlUHJvamVjdEluZGV4KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWhlYWRlcicpLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RBcnJheUluZGV4ID0gc3RvcmFnZS5hbGxQcm9qZWN0cy5maW5kSW5kZXgocHJvamVjdCA9PiBwcm9qZWN0LmdldEluZGV4KCkgPT0gcHJvamVjdEluZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2plY3RBcnJheUluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RvcmFnZVRhc2tJbmRleChwcm9qZWN0SW5kZXgsIHRhc2tFbGVtZW50KXtcclxuICAgICAgICAgICAgY29uc3QgdGFza0luZGV4ID0gdGFza0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKTtcclxuICAgICAgICAgICAgY29uc3QgdGFza0FycmF5SW5kZXggPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RJbmRleF0uZ2V0VGFza3MoKS5maW5kSW5kZXgodGFzayA9PiB0YXNrLmdldEluZGV4KCkgPT0gdGFza0luZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRhc2tBcnJheUluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9lbmQgdXNlZnVsIGhlbHBlciBmdW5jdGlvbnMgZm9yIGljb24gb3BlcmF0aW9uc1xyXG5cclxuICAgICAgICAvL2ZvciBjb21wbGV0aW5nIGEgdGFzayBhbmQgZGVsZXRpbmcgYSB0YXNrXHJcbiAgICAgICAgLy9jb21wbGV0ZSBhbmQgZGVsZXRlIHRhc2sgYXJlIHRoZSBzYW1lIGZ1bmN0aW9uYWxpdHkgZm9yIG5vd1xyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENvbXBsZXRlVGFza0ljb25GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIGNvbXBsZXRlVGFza0ljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZVJlbGV2YW50VGFza3NBbmRTdWJ0YXNrc0RPTSgpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlVGFza0Zyb21TdG9yYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB0YXNrRE9NLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBhZGREZWxldGVJY29uRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgICAgICBkZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVSZWxldmFudFRhc2tzQW5kU3VidGFza3NET00oKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZVRhc2tGcm9tU3RvcmFnZSgpO1xyXG4gICAgICAgICAgICAgICAgdGFza0RPTS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZW1vdmVUYXNrRnJvbVN0b3JhZ2UoKXtcclxuICAgICAgICAgICAgY29uc3Qgc3RvcmFnZVByb2plY3RJbmRleCA9IGdldFN0b3JhZ2VQcm9qZWN0SW5kZXgoKTtcclxuICAgICAgICAgICAgY29uc3Qgc3RvcmFnZVRhc2tJbmRleCA9IGdldFN0b3JhZ2VUYXNrSW5kZXgoc3RvcmFnZVByb2plY3RJbmRleCwgdGFza0RPTSk7XHJcbiAgICAgICAgICAgIC8vY2FsbHMgdGhlIHJlbW92ZSB0YXNrIGluIHByb2plY3QuanNcclxuICAgICAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0c1tzdG9yYWdlUHJvamVjdEluZGV4XS5yZW1vdmVUYXNrKHN0b3JhZ2VUYXNrSW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlUmVsZXZhbnRUYXNrc0FuZFN1YnRhc2tzRE9NKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IHRhc2tPYmouZ2V0SW5kZXgoKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsRE9NVG9SZW1vdmUgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXRhc2staW5kZXg9JyR7dGFza0luZGV4fSddYCkpO1xyXG4gICAgICAgICAgICBhbGxET01Ub1JlbW92ZS5mb3JFYWNoKG5vZGUgPT4ge3tcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH19KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9lbmQgZm9yIGNvbXBsZXRpbmcgYSB0YXNrIGFuZCBkZWxldGluZyBhIHRhc2tcclxuXHJcblxyXG4gICAgICAgIC8vZm9yIGVkaXRpbmcgYSB0YXNrXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkRWRpdEljb25GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgICAgIGVkaXRJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZihoYXNGb3JtKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldmVydEZvcm0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tFbGVtZW50ID0gZ2V0VGFza0Zyb21DaGlsZE5vZGUoZWRpdEljb24pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0Zvcm0gPSBjcmVhdGVET01UYXNrRm9ybSgnZWRpdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JhZ2VQcm9qZWN0SW5kZXggPSBnZXRTdG9yYWdlUHJvamVjdEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdG9yYWdlVGFza0luZGV4ID0gZ2V0U3RvcmFnZVRhc2tJbmRleChzdG9yYWdlUHJvamVjdEluZGV4LCB0YXNrRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VGFza09iamVjdCA9IHN0b3JhZ2UuYWxsUHJvamVjdHNbc3RvcmFnZVByb2plY3RJbmRleF0uZ2V0VGFza3MoKVtzdG9yYWdlVGFza0luZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICB0YXNrRWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YXNrRm9ybSwgdGFza0VsZW1lbnQubmV4dFNpYmxpbmcpO1xyXG4gICAgICAgICAgICAgICAgdGFza0VsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsJ2ludmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWUgPSBjdXJyZW50VGFza09iamVjdC5nZXROYW1lKCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKS52YWx1ZSA9IGN1cnJlbnRUYXNrT2JqZWN0LmdldERlc2NyaXB0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHktYnRuID4gaScpO1xyXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudFRhc2tPYmplY3QuZ2V0UHJpb3JpdHkoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkUHJpb3JpdHlDb2xvcihwcmlvcml0eUljb24sIGN1cnJlbnRUYXNrT2JqZWN0LmdldFByaW9yaXR5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1ha2VTb2xpZEljb24ocHJpb3JpdHlJY29uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9lbmQgZm9yIGVkaXRpbmcgYSB0YXNrXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFN1YnRhc2tJY29uRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgICAgICBhZGRTdWJ0YXNrSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZihoYXNGb3JtKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldmVydEZvcm0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTdWJ0YXNrT3JUYXNrID0gZ2V0TGFzdFJlbGV2YW50VGFza0VsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tGb3JtID0gY3JlYXRlRE9NU3VidGFza0Zvcm0oJ2FkZCcpO1xyXG4gICAgICAgICAgICAgICAgc3VidGFza0Zvcm0uc2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnLCB0YXNrRE9NLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JykpO1xyXG4gICAgICAgICAgICAgICAgbGFzdFN1YnRhc2tPclRhc2sucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3VidGFza0Zvcm0sIGxhc3RTdWJ0YXNrT3JUYXNrLm5leHRTaWJsaW5nKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZ2V0IGxhc3Qgc3VidGFzayBvciB0YXNrIGVsZW1lbnQgdGhhdCBoYXMgdGhlIHNhbWUgdGFzayBpbmRleFxyXG4gICAgICAgIC8vc3VidGFzayBmb3JtIHNob3VsZCBiZSBhcHBlbmRlZCBhdCB0aGUgbGFzdCBzdWJ0YXNrIG9mIHRoZSBkb21cclxuICAgICAgICAvL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldExhc3RSZWxldmFudFRhc2tFbGVtZW50KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbEVsZW1lbnRzV2l0aERhdGFUYXNrSW5kZXggPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXRhc2staW5kZXg9JyR7dGFza09iai5nZXRJbmRleCgpfSddYCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWxsRWxlbWVudHNXaXRoRGF0YVRhc2tJbmRleFthbGxFbGVtZW50c1dpdGhEYXRhVGFza0luZGV4Lmxlbmd0aC0xXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0YXNrRE9NO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlcyB0aGUgc3VidGFzayBkb21cclxuICAgIGNvbnN0IGNyZWF0ZURPTVN1YnRhc2sgPSAoc3VidGFza09iaiwgZGF0YVRhc2tJbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlVGFza0ljb24gPSBjcmVhdGVUYWcoJ2knLHNraXAoMSksIFsnZmEtcmVndWxhcicsJ2ZhLWNpcmNsZScsICdwb2ludGVyJ10pO1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlVGFza0RpdiA9IGNyZWF0ZUNvbnRhaW5lcignZGl2JywgWydjb21wbGV0ZS10YXNrLWJ0biddLCBza2lwKDEpLCBbY29tcGxldGVUYXNrSWNvbl0sIHNraXAoMSkpO1xyXG5cclxuICAgICAgICBjb25zdCB0YXNrSW5mb3JtYXRpb24gPSBjcmVhdGVUYWcoJ2RpdicsIHN1YnRhc2tPYmouZ2V0TmFtZSgpLCBbJ3Rhc2stdGl0bGUnXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgaWYoc3VidGFza09iai5nZXREZXNjcmlwdGlvbigpKXtcclxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBjcmVhdGVUYWcoJ2RpdicsIHN1YnRhc2tPYmouZ2V0RGVzY3JpcHRpb24oKSwgWyd0YXNrLWRlc2NyaXB0aW9uJ10sIHNraXAoMSkpO1xyXG4gICAgICAgICAgICB0YXNrSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBlZGl0SWNvbiA9IGNyZWF0ZVRhZygnaScsIHNraXAoMSksIFsnZmEtc29saWQnLCdmYS1wZW4tdG8tc3F1YXJlJywgJ3BvaW50ZXInXSwgc2tpcCgxKSk7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGNyZWF0ZVRhZygnaScsIHNraXAoMSksIFsnZmEtc29saWQnLCdmYS10cmFzaCcsICdwb2ludGVyJ10sIHNraXAoMSkpOyAgICAgIFxyXG4gICAgICAgIGNvbnN0IGljb25Db250YWluZXIgPSBjcmVhdGVDb250YWluZXIoJ2RpdicsIFsnYnV0dG9uLWljb25zJ10sIHNraXAoMSksIFtlZGl0SWNvbiwgZGVsZXRlSWNvbl0sIHNraXAoMSkpOyAgICBcclxuXHJcbiAgICAgICAgY29uc3Qgc3VidGFzayA9IGNyZWF0ZUNvbnRhaW5lcignZGl2JywgWydzdWJ0YXNrJ10sICcnLCBbY29tcGxldGVUYXNrRGl2LCB0YXNrSW5mb3JtYXRpb24sIGljb25Db250YWluZXJdLCBza2lwKDEpKSBcclxuICAgICAgICBzdWJ0YXNrLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JywgZGF0YVRhc2tJbmRleCk7XHJcbiAgICAgICAgc3VidGFzay5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1pbmRleCcsIHN1YnRhc2tPYmouZ2V0SW5kZXgoKSk7XHJcblxyXG4gICAgICAgIGFkZENvbXBsZXRlVGFza0V2ZW50TGlzdGVuZXIoKTtcclxuICAgICAgICBhZGREZWxldGVUYXNrRXZlbnRMaXN0ZW5lcigpO1xyXG4gICAgICAgIGFkZEVkaXRUYXNrRXZlbnRMaXN0ZW5lcigpO1xyXG4gICAgICAgIHJldHVybiBzdWJ0YXNrO1xyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkQ29tcGxldGVUYXNrRXZlbnRMaXN0ZW5lcigpe1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tEYXRhSW5kZXggPSBzdWJ0YXNrLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRGF0YUluZGV4ID0gc3VidGFzay5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1pbmRleCcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0QXJyYXlJbmRleCA9IHN0b3JhZ2VMb29rdXBzLmdldFByb2plY3RJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRUYXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIHRhc2tEYXRhSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRTdWJ0YXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIHRhc2tBcnJheUluZGV4LCBzdWJ0YXNrRGF0YUluZGV4KVxyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0QXJyYXlJbmRleF0uZ2V0VGFza3MoKVt0YXNrRGF0YUluZGV4XS5yZW1vdmVTdWJ0YXNrKHN1YnRhc2tBcnJheUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2sucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGREZWxldGVUYXNrRXZlbnRMaXN0ZW5lcigpe1xyXG4gICAgICAgICAgICBkZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tEYXRhSW5kZXggPSBzdWJ0YXNrLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRGF0YUluZGV4ID0gc3VidGFzay5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1pbmRleCcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0QXJyYXlJbmRleCA9IHN0b3JhZ2VMb29rdXBzLmdldFByb2plY3RJbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRUYXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIHRhc2tEYXRhSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0FycmF5SW5kZXggPSBzdG9yYWdlTG9va3Vwcy5nZXRTdWJ0YXNrSW5kZXgocHJvamVjdEFycmF5SW5kZXgsIHRhc2tBcnJheUluZGV4LCBzdWJ0YXNrRGF0YUluZGV4KVxyXG4gICAgICAgICAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0QXJyYXlJbmRleF0uZ2V0VGFza3MoKVt0YXNrRGF0YUluZGV4XS5yZW1vdmVTdWJ0YXNrKHN1YnRhc2tBcnJheUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2sucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZEVkaXRUYXNrRXZlbnRMaXN0ZW5lcigpe1xyXG4gICAgICAgICAgICBlZGl0SWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZihoYXNGb3JtKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldmVydEZvcm0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN1YnRhc2suc2V0QXR0cmlidXRlKCdpZCcsJ2ludmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0Zvcm0gPSBjcmVhdGVET01TdWJ0YXNrRm9ybSgnZWRpdCcpO1xyXG4gICAgICAgICAgICAgICAgc3VidGFza0Zvcm0uc2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnLCBkYXRhVGFza0luZGV4KTtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2tGb3JtLnNldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLWluZGV4Jywgc3VidGFza09iai5nZXRJbmRleCgpKTtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2sucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3VidGFza0Zvcm0sIHN1YnRhc2spO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKS52YWx1ZSA9IHN1YnRhc2tPYmouZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWUgPSBzdWJ0YXNrT2JqLmdldERlc2NyaXB0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL2FkZHMgYWxsIGRvbSBvZiB0YXNrcyBhbmQgc3VidGFza3MgaW4gYSBwcm9qZWN0XHJcbiAgICBmdW5jdGlvbiBhZGRBbGxUYXNrc0RPTShjb250YWluZXIsIHRhc2tzKXtcclxuICAgICAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRE9NVGFzayh0YXNrKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbFN1YnRhc2tzID0gdGFzay5nZXRTdWJ0YXNrcygpO1xyXG4gICAgICAgICAgICBhbGxTdWJ0YXNrcy5mb3JFYWNoKHN1YnRhc2sgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZURPTVN1YnRhc2soc3VidGFzaywgdGFzay5nZXRJbmRleCgpKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbGVhckFsbFRhc2tzRE9NID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgICAgICB3aGlsZShjb250YWluZXJEaXYuZmlyc3RDaGlsZCl7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5yZW1vdmVDaGlsZChjb250YWluZXJEaXYuZmlyc3RDaGlsZCk7ICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vZmluZCB0aGUgYXJyYXkgaW5kaWNpZXMgb2YgcHJvamVjdHMsIHRhc2tzLCBhbmQgc3VidGFza3NcclxuICAgIGNvbnN0IHN0b3JhZ2VMb29rdXBzID0gKCgpID0+IHtcclxuICAgICAgICAvL3JldHVybnMgaW5kZXggb2YgcHJvamVjdCBpbiBhbGwgcHJvamVjdHMgYXJyYXlcclxuICAgICAgICBmdW5jdGlvbiBnZXRQcm9qZWN0SW5kZXgoKXtcclxuICAgICAgICAgICAgbGV0IHByb2plY3RJbmRleEluQXJyYXkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcHJvamVjdERhdGFJbmRleCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWhlYWRlcicpLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4Jyk7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UuYWxsUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHByb2plY3QuZ2V0SW5kZXgoKSA9PSBwcm9qZWN0RGF0YUluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0SW5kZXhJbkFycmF5ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0SW5kZXhJbkFycmF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZXR1cm5zIGluZGV4IG9mIHRhc2sgaW4gYWxsIHRhc2tzIGFycmF5XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0VGFza0luZGV4KHByb2plY3RJbmRleCwgdGFza0RhdGFJbmRleCl7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdFRhc2tzID0gc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0SW5kZXhdLmdldFRhc2tzKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvamVjdFRhc2tzLmZpbmRJbmRleCh0YXNrID0+IHRhc2suZ2V0SW5kZXgoKSA9PSB0YXNrRGF0YUluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFN1YnRhc2tJbmRleChwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgc3VidGFza0RhdGFJbmRleCl7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdFN1YnRhc2tzID0gc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0SW5kZXhdLmdldFRhc2tzKClbdGFza0luZGV4XS5nZXRTdWJ0YXNrcygpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFByb2plY3RTdWJ0YXNrcy5maW5kSW5kZXgoc3VidGFzayA9PiBzdWJ0YXNrLmdldEluZGV4KCkgPT0gc3VidGFza0RhdGFJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge2dldFByb2plY3RJbmRleCwgZ2V0VGFza0luZGV4LCBnZXRTdWJ0YXNrSW5kZXh9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHJldHVybiB7aW5pdGlhbFJlbmRlcn07XHJcblxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdWk7IiwiaW1wb3J0IHtsYXN0SXRlbU9mLCBzdHJpbmdUb0FycmF5LCBpc0luUmFuZ2V9IGZyb20gJy4vbGliL3V0aWxzLmpzJztcbmltcG9ydCB7dG9kYXksIHJlZ3VsYXJpemVEYXRlfSBmcm9tICcuL2xpYi9kYXRlLmpzJztcbmltcG9ydCB7cGFyc2VEYXRlLCBmb3JtYXREYXRlfSBmcm9tICcuL2xpYi9kYXRlLWZvcm1hdC5qcyc7XG5pbXBvcnQge2lzQWN0aXZlRWxlbWVudH0gZnJvbSAnLi9saWIvZG9tLmpzJztcbmltcG9ydCB7cmVnaXN0ZXJMaXN0ZW5lcnMsIHVucmVnaXN0ZXJMaXN0ZW5lcnN9IGZyb20gJy4vbGliL2V2ZW50LmpzJztcbmltcG9ydCB7bG9jYWxlc30gZnJvbSAnLi9pMThuL2Jhc2UtbG9jYWxlcy5qcyc7XG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL2RlZmF1bHRPcHRpb25zLmpzJztcbmltcG9ydCBwcm9jZXNzT3B0aW9ucyBmcm9tICcuL29wdGlvbnMvcHJvY2Vzc09wdGlvbnMuanMnO1xuaW1wb3J0IFBpY2tlciBmcm9tICcuL3BpY2tlci9QaWNrZXIuanMnO1xuaW1wb3J0IHt0cmlnZ2VyRGF0ZXBpY2tlckV2ZW50fSBmcm9tICcuL2V2ZW50cy9mdW5jdGlvbnMuanMnO1xuaW1wb3J0IHtvbktleWRvd24sIG9uRm9jdXMsIG9uTW91c2Vkb3duLCBvbkNsaWNrSW5wdXQsIG9uUGFzdGV9IGZyb20gJy4vZXZlbnRzL2lucHV0RmllbGRMaXN0ZW5lcnMuanMnO1xuaW1wb3J0IHtvbkNsaWNrT3V0c2lkZX0gZnJvbSAnLi9ldmVudHMvb3RoZXJMaXN0ZW5lcnMuanMnO1xuXG5mdW5jdGlvbiBzdHJpbmdpZnlEYXRlcyhkYXRlcywgY29uZmlnKSB7XG4gIHJldHVybiBkYXRlc1xuICAgIC5tYXAoZHQgPT4gZm9ybWF0RGF0ZShkdCwgY29uZmlnLmZvcm1hdCwgY29uZmlnLmxvY2FsZSkpXG4gICAgLmpvaW4oY29uZmlnLmRhdGVEZWxpbWl0ZXIpO1xufVxuXG4vLyBwYXJzZSBpbnB1dCBkYXRlcyBhbmQgY3JlYXRlIGFuIGFycmF5IG9mIHRpbWUgdmFsdWVzIGZvciBzZWxlY3Rpb25cbi8vIHJldHVybnMgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBubyB2YWxpZCBkYXRlcyBpbiBpbnB1dERhdGVzXG4vLyB3aGVuIG9yaWdEYXRlcyAoY3VycmVudCBzZWxlY3Rpb24pIGlzIHBhc3NlZCwgdGhlIGZ1bmN0aW9uIHdvcmtzIHRvIG1peFxuLy8gdGhlIGlucHV0IGRhdGVzIGludG8gdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5mdW5jdGlvbiBwcm9jZXNzSW5wdXREYXRlcyhkYXRlcGlja2VyLCBpbnB1dERhdGVzLCBjbGVhciA9IGZhbHNlKSB7XG4gIC8vIGNvbnN0IHtjb25maWcsIGRhdGVzOiBvcmlnRGF0ZXMsIHJhbmdlcGlja2VyfSA9IGRhdGVwaWNrZXI7XG4gIGNvbnN0IHtjb25maWcsIGRhdGVzOiBvcmlnRGF0ZXMsIHJhbmdlU2lkZUluZGV4fSA9IGRhdGVwaWNrZXI7XG4gIGlmIChpbnB1dERhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIGVtcHR5IGlucHV0IGlzIGNvbnNpZGVyZWQgdmFsaWQgdW5sZXNzIG9yaWdpRGF0ZXMgaXMgcGFzc2VkXG4gICAgcmV0dXJuIGNsZWFyID8gW10gOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBjb25zdCByYW5nZUVuZCA9IHJhbmdlcGlja2VyICYmIGRhdGVwaWNrZXIgPT09IHJhbmdlcGlja2VyLmRhdGVwaWNrZXJzWzFdO1xuICBsZXQgbmV3RGF0ZXMgPSBpbnB1dERhdGVzLnJlZHVjZSgoZGF0ZXMsIGR0KSA9PiB7XG4gICAgbGV0IGRhdGUgPSBwYXJzZURhdGUoZHQsIGNvbmZpZy5mb3JtYXQsIGNvbmZpZy5sb2NhbGUpO1xuICAgIGlmIChkYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBkYXRlcztcbiAgICB9XG4gICAgLy8gYWRqdXN0IHRvIDFzdCBvZiB0aGUgbW9udGgvSmFuIDFzdCBvZiB0aGUgeWVhclxuICAgIC8vIG9yIHRvIHRoZSBsYXN0IGRheSBvZiB0aGUgbW9uaC9EZWMgMzFzdCBvZiB0aGUgeWVhciBpZiB0aGUgZGF0ZXBpY2tlclxuICAgIC8vIGlzIHRoZSByYW5nZS1lbmQgcGlja2VyIG9mIGEgcmFuZ2VwaWNrZXJcbiAgICBkYXRlID0gcmVndWxhcml6ZURhdGUoZGF0ZSwgY29uZmlnLnBpY2tMZXZlbCwgcmFuZ2VTaWRlSW5kZXgpO1xuICAgIGlmIChcbiAgICAgIGlzSW5SYW5nZShkYXRlLCBjb25maWcubWluRGF0ZSwgY29uZmlnLm1heERhdGUpXG4gICAgICAmJiAhZGF0ZXMuaW5jbHVkZXMoZGF0ZSlcbiAgICAgICYmICFjb25maWcuZGF0ZXNEaXNhYmxlZC5pbmNsdWRlcyhkYXRlKVxuICAgICAgJiYgKGNvbmZpZy5waWNrTGV2ZWwgPiAwIHx8ICFjb25maWcuZGF5c09mV2Vla0Rpc2FibGVkLmluY2x1ZGVzKG5ldyBEYXRlKGRhdGUpLmdldERheSgpKSlcbiAgICApIHtcbiAgICAgIGRhdGVzLnB1c2goZGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRlcztcbiAgfSwgW10pO1xuICBpZiAobmV3RGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb25maWcubXVsdGlkYXRlICYmICFjbGVhcikge1xuICAgIC8vIGdldCB0aGUgc3lubWV0cmljIGRpZmZlcmVuY2UgYmV0d2VlbiBvcmlnRGF0ZXMgYW5kIG5ld0RhdGVzXG4gICAgbmV3RGF0ZXMgPSBuZXdEYXRlcy5yZWR1Y2UoKGRhdGVzLCBkYXRlKSA9PiB7XG4gICAgICBpZiAoIW9yaWdEYXRlcy5pbmNsdWRlcyhkYXRlKSkge1xuICAgICAgICBkYXRlcy5wdXNoKGRhdGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRhdGVzO1xuICAgIH0sIG9yaWdEYXRlcy5maWx0ZXIoZGF0ZSA9PiAhbmV3RGF0ZXMuaW5jbHVkZXMoZGF0ZSkpKTtcbiAgfVxuICAvLyBkbyBsZW5ndGggY2hlY2sgYWx3YXlzIGJlY2F1c2UgdXNlciBjYW4gaW5wdXQgbXVsdGlwbGUgZGF0ZXMgcmVnYXJkbGVzcyBvZiB0aGUgbW9kZVxuICByZXR1cm4gY29uZmlnLm1heE51bWJlck9mRGF0ZXMgJiYgbmV3RGF0ZXMubGVuZ3RoID4gY29uZmlnLm1heE51bWJlck9mRGF0ZXNcbiAgICA/IG5ld0RhdGVzLnNsaWNlKGNvbmZpZy5tYXhOdW1iZXJPZkRhdGVzICogLTEpXG4gICAgOiBuZXdEYXRlcztcbn1cblxuLy8gcmVmcmVzaCB0aGUgVUkgZWxlbWVudHNcbi8vIG1vZGVzOiAxOiBpbnB1dCBvbmx5LCAyLCBwaWNrZXIgb25seSwgMyBib3RoXG5mdW5jdGlvbiByZWZyZXNoVUkoZGF0ZXBpY2tlciwgbW9kZSA9IDMsIHF1aWNrUmVuZGVyID0gdHJ1ZSkge1xuICBjb25zdCB7Y29uZmlnLCBwaWNrZXIsIGlucHV0RmllbGR9ID0gZGF0ZXBpY2tlcjtcbiAgaWYgKG1vZGUgJiAyKSB7XG4gICAgY29uc3QgbmV3VmlldyA9IHBpY2tlci5hY3RpdmUgPyBjb25maWcucGlja0xldmVsIDogY29uZmlnLnN0YXJ0VmlldztcbiAgICBwaWNrZXIudXBkYXRlKCkuY2hhbmdlVmlldyhuZXdWaWV3KS5yZW5kZXIocXVpY2tSZW5kZXIpO1xuICB9XG4gIGlmIChtb2RlICYgMSAmJiBpbnB1dEZpZWxkKSB7XG4gICAgaW5wdXRGaWVsZC52YWx1ZSA9IHN0cmluZ2lmeURhdGVzKGRhdGVwaWNrZXIuZGF0ZXMsIGNvbmZpZyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0RGF0ZShkYXRlcGlja2VyLCBpbnB1dERhdGVzLCBvcHRpb25zKSB7XG4gIGxldCB7Y2xlYXIsIHJlbmRlciwgYXV0b2hpZGUsIHJldmVydH0gPSBvcHRpb25zO1xuICBpZiAocmVuZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICByZW5kZXIgPSB0cnVlO1xuICB9XG4gIGlmICghcmVuZGVyKSB7XG4gICAgYXV0b2hpZGUgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChhdXRvaGlkZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXV0b2hpZGUgPSBkYXRlcGlja2VyLmNvbmZpZy5hdXRvaGlkZTtcbiAgfVxuXG4gIGNvbnN0IG5ld0RhdGVzID0gcHJvY2Vzc0lucHV0RGF0ZXMoZGF0ZXBpY2tlciwgaW5wdXREYXRlcywgY2xlYXIpO1xuICBpZiAoIW5ld0RhdGVzICYmICFyZXZlcnQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKG5ld0RhdGVzICYmIG5ld0RhdGVzLnRvU3RyaW5nKCkgIT09IGRhdGVwaWNrZXIuZGF0ZXMudG9TdHJpbmcoKSkge1xuICAgIGRhdGVwaWNrZXIuZGF0ZXMgPSBuZXdEYXRlcztcbiAgICByZWZyZXNoVUkoZGF0ZXBpY2tlciwgcmVuZGVyID8gMyA6IDEpO1xuICAgIHRyaWdnZXJEYXRlcGlja2VyRXZlbnQoZGF0ZXBpY2tlciwgJ2NoYW5nZURhdGUnKTtcbiAgfSBlbHNlIHtcbiAgICByZWZyZXNoVUkoZGF0ZXBpY2tlciwgMSk7XG4gIH1cblxuICBpZiAoYXV0b2hpZGUpIHtcbiAgICBkYXRlcGlja2VyLmhpZGUoKTtcbiAgfVxufVxuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIGRhdGUgcGlja2VyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVwaWNrZXIge1xuICAvKipcbiAgICogQ3JlYXRlIGEgZGF0ZSBwaWNrZXJcbiAgICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCAtIGVsZW1lbnQgdG8gYmluZCBhIGRhdGUgcGlja2VyXG4gICAqIEBwYXJhbSAge09iamVjdH0gW29wdGlvbnNdIC0gY29uZmlnIG9wdGlvbnNcbiAgICogQHBhcmFtICB7RGF0ZVJhbmdlUGlja2VyfSBbcmFuZ2VwaWNrZXJdIC0gRGF0ZVJhbmdlUGlja2VyIGluc3RhbmNlIHRoZVxuICAgKiBkYXRlIHBpY2tlciBiZWxvbmdzIHRvLiBVc2UgdGhpcyBvbmx5IHdoZW4gY3JlYXRpbmcgZGF0ZSBwaWNrZXIgYXMgYSBwYXJ0XG4gICAqIG9mIGRhdGUgcmFuZ2UgcGlja2VyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zID0ge30sIHJhbmdlcGlja2VyID0gdW5kZWZpbmVkKSB7XG4gICAgZWxlbWVudC5kYXRlcGlja2VyID0gdGhpcztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGJ1dHRvbkNsYXNzOiAob3B0aW9ucy5idXR0b25DbGFzcyAmJiBTdHJpbmcob3B0aW9ucy5idXR0b25DbGFzcykpIHx8ICdidXR0b24nLFxuICAgICAgY29udGFpbmVyOiBudWxsLFxuICAgICAgZGVmYXVsdFZpZXdEYXRlOiB0b2RheSgpLFxuICAgICAgbWF4RGF0ZTogdW5kZWZpbmVkLFxuICAgICAgbWluRGF0ZTogdW5kZWZpbmVkLFxuICAgIH0sIHByb2Nlc3NPcHRpb25zKGRlZmF1bHRPcHRpb25zLCB0aGlzKSk7XG4gICAgLy8gY29uZmlndXJlIGJ5IHR5cGVcbiAgICBjb25zdCBpbmxpbmUgPSB0aGlzLmlubGluZSA9IGVsZW1lbnQudGFnTmFtZSAhPT0gJ0lOUFVUJztcbiAgICBsZXQgaW5wdXRGaWVsZDtcbiAgICBpZiAoaW5saW5lKSB7XG4gICAgICBjb25maWcuY29udGFpbmVyID0gZWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9wdGlvbnMuY29udGFpbmVyKSB7XG4gICAgICAgIC8vIG9taXQgc3RyaW5nIHR5cGUgY2hlY2sgYmVjYXVzZSBpdCBkb2Vzbid0IGd1YXJhbnRlZSB0byBhdm9pZCBlcnJvcnNcbiAgICAgICAgLy8gKGludmFsaWQgc2VsZWN0b3Igc3RyaW5nIGNhdXNlcyBhYmVuZCB3aXRoIHN5dGF4IGVycm9yKVxuICAgICAgICBjb25maWcuY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICAgICAgID8gb3B0aW9ucy5jb250YWluZXJcbiAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5jb250YWluZXIpO1xuICAgICAgfVxuICAgICAgaW5wdXRGaWVsZCA9IHRoaXMuaW5wdXRGaWVsZCA9IGVsZW1lbnQ7XG4gICAgICBpbnB1dEZpZWxkLmNsYXNzTGlzdC5hZGQoJ2RhdGVwaWNrZXItaW5wdXQnKTtcbiAgICB9XG4gICAgaWYgKHJhbmdlcGlja2VyKSB7XG4gICAgICAvLyBjaGVjayB2YWxpZGlyeVxuICAgICAgY29uc3QgaW5kZXggPSByYW5nZXBpY2tlci5pbnB1dHMuaW5kZXhPZihpbnB1dEZpZWxkKTtcbiAgICAgIGNvbnN0IGRhdGVwaWNrZXJzID0gcmFuZ2VwaWNrZXIuZGF0ZXBpY2tlcnM7XG4gICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gMSB8fCAhQXJyYXkuaXNBcnJheShkYXRlcGlja2VycykpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgcmFuZ2VwaWNrZXIgb2JqZWN0LicpO1xuICAgICAgfVxuICAgICAgLy8gYXR0YWNoIGl0YWVsZiB0byB0aGUgcmFuZ2VwaWNrZXIgaGVyZSBzbyB0aGF0IHByb2Nlc3NJbnB1dERhdGVzKCkgY2FuXG4gICAgICAvLyBkZXRlcm1pbmUgaWYgdGhpcyBpcyB0aGUgcmFuZ2UtZW5kIHBpY2tlciBvZiB0aGUgcmFuZ2VwaWNrZXIgd2hpbGVcbiAgICAgIC8vIHNldHRpbmcgaW5pdGFsIHZhbHVlcyB3aGVuIHBpY2tMZXZlbCA+IDBcbiAgICAgIGRhdGVwaWNrZXJzW2luZGV4XSA9IHRoaXM7XG4gICAgICAvLyBhZGQgZ2V0dGVyIGZvciByYW5nZXBpY2tlclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyYW5nZXBpY2tlcicsIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiByYW5nZXBpY2tlcjtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyYW5nZVNpZGVJbmRleCcsIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHNldCB1cCBjb25maWdcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICBPYmplY3QuYXNzaWduKGNvbmZpZywgcHJvY2Vzc09wdGlvbnMob3B0aW9ucywgdGhpcykpO1xuXG4gICAgLy8gc2V0IGluaXRpYWwgZGF0ZXNcbiAgICBsZXQgaW5pdGlhbERhdGVzO1xuICAgIGlmIChpbmxpbmUpIHtcbiAgICAgIGluaXRpYWxEYXRlcyA9IHN0cmluZ1RvQXJyYXkoZWxlbWVudC5kYXRhc2V0LmRhdGUsIGNvbmZpZy5kYXRlRGVsaW1pdGVyKTtcbiAgICAgIGRlbGV0ZSBlbGVtZW50LmRhdGFzZXQuZGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdGlhbERhdGVzID0gc3RyaW5nVG9BcnJheShpbnB1dEZpZWxkLnZhbHVlLCBjb25maWcuZGF0ZURlbGltaXRlcik7XG4gICAgfVxuICAgIHRoaXMuZGF0ZXMgPSBbXTtcbiAgICAvLyBwcm9jZXNzIGluaXRpYWwgdmFsdWVcbiAgICBjb25zdCBpbnB1dERhdGVWYWx1ZXMgPSBwcm9jZXNzSW5wdXREYXRlcyh0aGlzLCBpbml0aWFsRGF0ZXMpO1xuICAgIGlmIChpbnB1dERhdGVWYWx1ZXMgJiYgaW5wdXREYXRlVmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZGF0ZXMgPSBpbnB1dERhdGVWYWx1ZXM7XG4gICAgfVxuICAgIGlmIChpbnB1dEZpZWxkKSB7XG4gICAgICBpbnB1dEZpZWxkLnZhbHVlID0gc3RyaW5naWZ5RGF0ZXModGhpcy5kYXRlcywgY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwaWNrZXIgPSB0aGlzLnBpY2tlciA9IG5ldyBQaWNrZXIodGhpcyk7XG5cbiAgICBpZiAoaW5saW5lKSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2V0IHVwIGV2ZW50IGxpc3RlbmVycyBpbiBvdGhlciBtb2Rlc1xuICAgICAgY29uc3Qgb25Nb3VzZWRvd25Eb2N1bWVudCA9IG9uQ2xpY2tPdXRzaWRlLmJpbmQobnVsbCwgdGhpcyk7XG4gICAgICBjb25zdCBsaXN0ZW5lcnMgPSBbXG4gICAgICAgIFtpbnB1dEZpZWxkLCAna2V5ZG93bicsIG9uS2V5ZG93bi5iaW5kKG51bGwsIHRoaXMpXSxcbiAgICAgICAgW2lucHV0RmllbGQsICdmb2N1cycsIG9uRm9jdXMuYmluZChudWxsLCB0aGlzKV0sXG4gICAgICAgIFtpbnB1dEZpZWxkLCAnbW91c2Vkb3duJywgb25Nb3VzZWRvd24uYmluZChudWxsLCB0aGlzKV0sXG4gICAgICAgIFtpbnB1dEZpZWxkLCAnY2xpY2snLCBvbkNsaWNrSW5wdXQuYmluZChudWxsLCB0aGlzKV0sXG4gICAgICAgIFtpbnB1dEZpZWxkLCAncGFzdGUnLCBvblBhc3RlLmJpbmQobnVsbCwgdGhpcyldLFxuICAgICAgICBbZG9jdW1lbnQsICdtb3VzZWRvd24nLCBvbk1vdXNlZG93bkRvY3VtZW50XSxcbiAgICAgICAgW2RvY3VtZW50LCAndG91Y2hzdGFydCcsIG9uTW91c2Vkb3duRG9jdW1lbnRdLFxuICAgICAgICBbd2luZG93LCAncmVzaXplJywgcGlja2VyLnBsYWNlLmJpbmQocGlja2VyKV1cbiAgICAgIF07XG4gICAgICByZWdpc3Rlckxpc3RlbmVycyh0aGlzLCBsaXN0ZW5lcnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgRGF0ZSBvYmplY3Qgb3IgdGltZSB2YWx1ZSBpbiBnaXZlbiBmb3JtYXQgYW5kIGxhbmd1YWdlXG4gICAqIEBwYXJhbSAge0RhdGV8TnVtYmVyfSBkYXRlIC0gZGF0ZSBvciB0aW1lIHZhbHVlIHRvIGZvcm1hdFxuICAgKiBAcGFyYW0gIHtTdHJpbmd8T2JqZWN0fSBmb3JtYXQgLSBmb3JtYXQgc3RyaW5nIG9yIG9iamVjdCB0aGF0IGNvbnRhaW5zXG4gICAqIHRvRGlzcGxheSgpIGN1c3RvbSBmb3JtYXR0ZXIsIHdob3NlIHNpZ25hdHVyZSBpc1xuICAgKiAtIGFyZ3M6XG4gICAqICAgLSBkYXRlOiB7RGF0ZX0gLSBEYXRlIGluc3RhbmNlIG9mIHRoZSBkYXRlIHBhc3NlZCB0byB0aGUgbWV0aG9kXG4gICAqICAgLSBmb3JtYXQ6IHtPYmplY3R9IC0gdGhlIGZvcm1hdCBvYmplY3QgcGFzc2VkIHRvIHRoZSBtZXRob2RcbiAgICogICAtIGxvY2FsZToge09iamVjdH0gLSBsb2NhbGUgZm9yIHRoZSBsYW5ndWFnZSBzcGVjaWZpZWQgYnkgYGxhbmdgXG4gICAqIC0gcmV0dXJuOlxuICAgKiAgICAge1N0cmluZ30gZm9ybWF0dGVkIGRhdGVcbiAgICogQHBhcmFtICB7U3RyaW5nfSBbbGFuZz1lbl0gLSBsYW5ndWFnZSBjb2RlIGZvciB0aGUgbG9jYWxlIHRvIHVzZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdHRlZCBkYXRlXG4gICAqL1xuICBzdGF0aWMgZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQsIGxhbmcpIHtcbiAgICByZXR1cm4gZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQsIGxhbmcgJiYgbG9jYWxlc1tsYW5nXSB8fCBsb2NhbGVzLmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBkYXRlIHN0cmluZ1xuICAgKiBAcGFyYW0gIHtTdHJpbmd8RGF0ZXxOdW1iZXJ9IGRhdGVTdHIgLSBkYXRlIHN0cmluZywgRGF0ZSBvYmplY3Qgb3IgdGltZVxuICAgKiB2YWx1ZSB0byBwYXJzZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd8T2JqZWN0fSBmb3JtYXQgLSBmb3JtYXQgc3RyaW5nIG9yIG9iamVjdCB0aGF0IGNvbnRhaW5zXG4gICAqIHRvVmFsdWUoKSBjdXN0b20gcGFyc2VyLCB3aG9zZSBzaWduYXR1cmUgaXNcbiAgICogLSBhcmdzOlxuICAgKiAgIC0gZGF0ZVN0cjoge1N0cmluZ3xEYXRlfE51bWJlcn0gLSB0aGUgZGF0ZVN0ciBwYXNzZWQgdG8gdGhlIG1ldGhvZFxuICAgKiAgIC0gZm9ybWF0OiB7T2JqZWN0fSAtIHRoZSBmb3JtYXQgb2JqZWN0IHBhc3NlZCB0byB0aGUgbWV0aG9kXG4gICAqICAgLSBsb2NhbGU6IHtPYmplY3R9IC0gbG9jYWxlIGZvciB0aGUgbGFuZ3VhZ2Ugc3BlY2lmaWVkIGJ5IGBsYW5nYFxuICAgKiAtIHJldHVybjpcbiAgICogICAgIHtEYXRlfE51bWJlcn0gcGFyc2VkIGRhdGUgb3IgaXRzIHRpbWUgdmFsdWVcbiAgICogQHBhcmFtICB7U3RyaW5nfSBbbGFuZz1lbl0gLSBsYW5ndWFnZSBjb2RlIGZvciB0aGUgbG9jYWxlIHRvIHVzZVxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRpbWUgdmFsdWUgb2YgcGFyc2VkIGRhdGVcbiAgICovXG4gIHN0YXRpYyBwYXJzZURhdGUoZGF0ZVN0ciwgZm9ybWF0LCBsYW5nKSB7XG4gICAgcmV0dXJuIHBhcnNlRGF0ZShkYXRlU3RyLCBmb3JtYXQsIGxhbmcgJiYgbG9jYWxlc1tsYW5nXSB8fCBsb2NhbGVzLmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0fSAtIEluc3RhbGxlZCBsb2NhbGVzIGluIGBbbGFuZ3VhZ2VDb2RlXTogbG9jYWxlT2JqZWN0YCBmb3JtYXRcbiAgICogZW5gOl9FbmdsaXNoIChVUylfIGlzIHByZS1pbnN0YWxsZWQuXG4gICAqL1xuICBzdGF0aWMgZ2V0IGxvY2FsZXMoKSB7XG4gICAgcmV0dXJuIGxvY2FsZXM7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge0Jvb2xlYW59IC0gV2hldGhlciB0aGUgcGlja2VyIGVsZW1lbnQgaXMgc2hvd24uIGB0cnVlYCB3aG5lIHNob3duXG4gICAqL1xuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiAhISh0aGlzLnBpY2tlciAmJiB0aGlzLnBpY2tlci5hY3RpdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gLSBET00gb2JqZWN0IG9mIHBpY2tlciBlbGVtZW50XG4gICAqL1xuICBnZXQgcGlja2VyRWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXIgPyB0aGlzLnBpY2tlci5lbGVtZW50IDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgdmFsdWVzIHRvIHRoZSBjb25maWcgb3B0aW9uc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGNvbmZpZyBvcHRpb25zIHRvIHVwZGF0ZVxuICAgKi9cbiAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgY29uc3QgcGlja2VyID0gdGhpcy5waWNrZXI7XG4gICAgY29uc3QgbmV3T3B0aW9ucyA9IHByb2Nlc3NPcHRpb25zKG9wdGlvbnMsIHRoaXMpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgbmV3T3B0aW9ucyk7XG4gICAgcGlja2VyLnNldE9wdGlvbnMobmV3T3B0aW9ucyk7XG5cbiAgICByZWZyZXNoVUkodGhpcywgMyk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGUgcGlja2VyIGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuaW5wdXRGaWVsZCkge1xuICAgICAgaWYgKHRoaXMuaW5wdXRGaWVsZC5kaXNhYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWlzQWN0aXZlRWxlbWVudCh0aGlzLmlucHV0RmllbGQpICYmICF0aGlzLmNvbmZpZy5kaXNhYmxlVG91Y2hLZXlib2FyZCkge1xuICAgICAgICB0aGlzLl9zaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbnB1dEZpZWxkLmZvY3VzKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9zaG93aW5nO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnBpY2tlci5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZSB0aGUgcGlja2VyIGVsZW1lbnRcbiAgICogTm90IGF2YWlsYWJsZSBvbiBpbmxpbmUgcGlja2VyXG4gICAqL1xuICBoaWRlKCkge1xuICAgIGlmICh0aGlzLmlubGluZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBpY2tlci5oaWRlKCk7XG4gICAgdGhpcy5waWNrZXIudXBkYXRlKCkuY2hhbmdlVmlldyh0aGlzLmNvbmZpZy5zdGFydFZpZXcpLnJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIERhdGVwaWNrZXIgaW5zdGFuY2VcbiAgICogQHJldHVybiB7RGV0ZXBpY2tlcn0gLSB0aGUgaW5zdGFuY2UgZGVzdHJveWVkXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMuaGlkZSgpO1xuICAgIHVucmVnaXN0ZXJMaXN0ZW5lcnModGhpcyk7XG4gICAgdGhpcy5waWNrZXIuZGV0YWNoKCk7XG4gICAgaWYgKCF0aGlzLmlubGluZSkge1xuICAgICAgdGhpcy5pbnB1dEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoJ2RhdGVwaWNrZXItaW5wdXQnKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMuZWxlbWVudC5kYXRlcGlja2VyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2VsZWN0ZWQgZGF0ZShzKVxuICAgKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgYSBEYXRlIG9iamVjdCBvZiBzZWxlY3RlZCBkYXRlIGJ5IGRlZmF1bHQsIGFuZCByZXR1cm5zXG4gICAqIGFuIGFycmF5IG9mIHNlbGVjdGVkIGRhdGVzIGluIG11bHRpZGF0ZSBtb2RlLiBJZiBmb3JtYXQgc3RyaW5nIGlzIHBhc3NlZCxcbiAgICogaXQgcmV0dXJucyBkYXRlIHN0cmluZyhzKSBmb3JtYXR0ZWQgaW4gZ2l2ZW4gZm9ybWF0LlxuICAgKlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IFtmb3JtYXRdIC0gRm9ybWF0IHN0cmluZyB0byBzdHJpbmdpZnkgdGhlIGRhdGUocylcbiAgICogQHJldHVybiB7RGF0ZXxTdHJpbmd8RGF0ZVtdfFN0cmluZ1tdfSAtIHNlbGVjdGVkIGRhdGUocyksIG9yIGlmIG5vbmUgaXNcbiAgICogc2VsZWN0ZWQsIGVtcHR5IGFycmF5IGluIG11bHRpZGF0ZSBtb2RlIGFuZCB1bnRpdGxlZCBpbiBzaWdsZWRhdGUgbW9kZVxuICAgKi9cbiAgZ2V0RGF0ZShmb3JtYXQgPSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBjYWxsYmFjayA9IGZvcm1hdFxuICAgICAgPyBkYXRlID0+IGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0LCB0aGlzLmNvbmZpZy5sb2NhbGUpXG4gICAgICA6IGRhdGUgPT4gbmV3IERhdGUoZGF0ZSk7XG5cbiAgICBpZiAodGhpcy5jb25maWcubXVsdGlkYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRlcy5tYXAoY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5kYXRlc1swXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBzZWxlY3RlZCBkYXRlKHMpXG4gICAqXG4gICAqIEluIG11bHRpZGF0ZSBtb2RlLCB5b3UgY2FuIHBhc3MgbXVsdGlwbGUgZGF0ZXMgYXMgYSBzZXJpZXMgb2YgYXJndW1lbnRzXG4gICAqIG9yIGFuIGFycmF5LiAoU2luY2UgZWFjaCBkYXRlIGlzIHBhcnNlZCBpbmRpdmlkdWFsbHksIHRoZSB0eXBlIG9mIHRoZVxuICAgKiBkYXRlcyBkb2Vzbid0IGhhdmUgdG8gYmUgdGhlIHNhbWUuKVxuICAgKiBUaGUgZ2l2ZW4gZGF0ZXMgYXJlIHVzZWQgdG8gdG9nZ2xlIHRoZSBzZWxlY3Qgc3RhdHVzIG9mIGVhY2ggZGF0ZS4gVGhlXG4gICAqIG51bWJlciBvZiBzZWxlY3RlZCBkYXRlcyBpcyBrZXB0IGZyb20gZXhjZWVkaW5nIHRoZSBsZW5ndGggc2V0IHRvXG4gICAqIG1heE51bWJlck9mRGF0ZXMuXG4gICAqXG4gICAqIFdpdGggY2xlYXI6IHRydWUgb3B0aW9uLCB0aGUgbWV0aG9kIGNhbiBiZSB1c2VkIHRvIGNsZWFyIHRoZSBzZWxlY3Rpb25cbiAgICogYW5kIHRvIHJlcGxhY2UgdGhlIHNlbGVjdGlvbiBpbnN0ZWFkIG9mIHRvZ2dsaW5nIGluIG11bHRpZGF0ZSBtb2RlLlxuICAgKiBJZiB0aGUgb3B0aW9uIGlzIHBhc3NlZCB3aXRoIG5vIGRhdGUgYXJndW1lbnRzIG9yIGFuIGVtcHR5IGRhdGVzIGFycmF5LFxuICAgKiBpdCB3b3JrcyBhcyBcImNsZWFyXCIgKGNsZWFyIHRoZSBzZWxlY3Rpb24gdGhlbiBzZXQgbm90aGluZyksIGFuZCBpZiB0aGVcbiAgICogb3B0aW9uIGlzIHBhc3NlZCB3aXRoIG5ldyBkYXRlcyB0byBzZWxlY3QsIGl0IHdvcmtzIGFzIFwicmVwbGFjZVwiIChjbGVhclxuICAgKiB0aGUgc2VsZWN0aW9uIHRoZW4gc2V0IHRoZSBnaXZlbiBkYXRlcylcbiAgICpcbiAgICogV2hlbiByZW5kZXI6IGZhbHNlIG9wdGlvbiBpcyB1c2VkLCB0aGUgbWV0aG9kIG9taXRzIHJlLXJlbmRlcmluZyB0aGVcbiAgICogcGlja2VyIGVsZW1lbnQuIEluIHRoaXMgY2FzZSwgeW91IG5lZWQgdG8gY2FsbCByZWZyZXNoKCkgbWV0aG9kIGxhdGVyIGluXG4gICAqIG9yZGVyIGZvciB0aGUgcGlja2VyIGVsZW1lbnQgdG8gcmVmbGVjdCB0aGUgY2hhbmdlcy4gVGhlIGlucHV0IGZpZWxkIGlzXG4gICAqIHJlZnJlc2hlZCBhbHdheXMgcmVnYXJkbGVzcyBvZiB0aGlzIG9wdGlvbi5cbiAgICpcbiAgICogV2hlbiBpbnZhbGlkICh1bnBhcnNhYmxlLCByZXBlYXRlZCwgZGlzYWJsZWQgb3Igb3V0LW9mLXJhbmdlKSBkYXRlcyBhcmVcbiAgICogcGFzc2VkLCB0aGUgbWV0aG9kIGlnbm9yZXMgdGhlbSBhbmQgYXBwbGllcyBvbmx5IHZhbGlkIG9uZXMuIEluIHRoZSBjYXNlXG4gICAqIHRoYXQgYWxsIHRoZSBnaXZlbiBkYXRlcyBhcmUgaW52YWxpZCwgd2hpY2ggaXMgZGlzdGluZ3Vpc2hlZCBmcm9tIHBhc3NpbmdcbiAgICogbm8gZGF0ZXMsIHRoZSBtZXRob2QgY29uc2lkZXJzIGl0IGFzIGFuIGVycm9yIGFuZCBsZWF2ZXMgdGhlIHNlbGVjdGlvblxuICAgKiB1bnRvdWNoZWQuIChUaGUgaW5wdXQgZmllbGQgYWxzbyByZW1haW5zIHVudG91Y2hlZCB1bmxlc3MgcmV2ZXJ0OiB0cnVlXG4gICAqIG9wdGlvbiBpcyB1c2VkLilcbiAgICpcbiAgICogQHBhcmFtIHsuLi4oRGF0ZXxOdW1iZXJ8U3RyaW5nKXxBcnJheX0gW2RhdGVzXSAtIERhdGUgc3RyaW5ncywgRGF0ZVxuICAgKiBvYmplY3RzLCB0aW1lIHZhbHVlcyBvciBtaXggb2YgdGhvc2UgZm9yIG5ldyBzZWxlY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGZ1bmN0aW9uIG9wdGlvbnNcbiAgICogLSBjbGVhcjoge2Jvb2xlYW59IC0gV2hldGhlciB0byBjbGVhciB0aGUgZXhpc3Rpbmcgc2VsZWN0aW9uXG4gICAqICAgICBkZWZ1YWx0OiBmYWxzZVxuICAgKiAtIHJlbmRlcjoge2Jvb2xlYW59IC0gV2hldGhlciB0byByZS1yZW5kZXIgdGhlIHBpY2tlciBlbGVtZW50XG4gICAqICAgICBkZWZhdWx0OiB0cnVlXG4gICAqIC0gYXV0b2hpZGU6IHtib29sZWFufSAtIFdoZXRoZXIgdG8gaGlkZSB0aGUgcGlja2VyIGVsZW1lbnQgYWZ0ZXIgcmUtcmVuZGVyXG4gICAqICAgICBJZ25vcmVkIHdoZW4gdXNlZCB3aXRoIHJlbmRlcjogZmFsc2VcbiAgICogICAgIGRlZmF1bHQ6IGNvbmZpZy5hdXRvaGlkZVxuICAgKiAtIHJldmVydDoge2Jvb2xlYW59IC0gV2hldGhlciB0byByZWZyZXNoIHRoZSBpbnB1dCBmaWVsZCB3aGVuIGFsbCB0aGVcbiAgICogICAgIHBhc3NlZCBkYXRlcyBhcmUgaW52YWxpZFxuICAgKiAgICAgZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIHNldERhdGUoLi4uYXJncykge1xuICAgIGNvbnN0IGRhdGVzID0gWy4uLmFyZ3NdO1xuICAgIGNvbnN0IG9wdHMgPSB7fTtcbiAgICBjb25zdCBsYXN0QXJnID0gbGFzdEl0ZW1PZihhcmdzKTtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgbGFzdEFyZyA9PT0gJ29iamVjdCdcbiAgICAgICYmICFBcnJheS5pc0FycmF5KGxhc3RBcmcpXG4gICAgICAmJiAhKGxhc3RBcmcgaW5zdGFuY2VvZiBEYXRlKVxuICAgICAgJiYgbGFzdEFyZ1xuICAgICkge1xuICAgICAgT2JqZWN0LmFzc2lnbihvcHRzLCBkYXRlcy5wb3AoKSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5wdXREYXRlcyA9IEFycmF5LmlzQXJyYXkoZGF0ZXNbMF0pID8gZGF0ZXNbMF0gOiBkYXRlcztcbiAgICBzZXREYXRlKHRoaXMsIGlucHV0RGF0ZXMsIG9wdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgc2VsZWN0ZWQgZGF0ZShzKSB3aXRoIGlucHV0IGZpZWxkJ3MgdmFsdWVcbiAgICogTm90IGF2YWlsYWJsZSBvbiBpbmxpbmUgcGlja2VyXG4gICAqXG4gICAqIFRoZSBpbnB1dCBmaWVsZCB3aWxsIGJlIHJlZnJlc2hlZCB3aXRoIHByb3Blcmx5IGZvcm1hdHRlZCBkYXRlIHN0cmluZy5cbiAgICpcbiAgICogSW4gdGhlIGNhc2UgdGhhdCBhbGwgdGhlIGVudGVyZWQgZGF0ZXMgYXJlIGludmFsaWQgKHVucGFyc2FibGUsIHJlcGVhdGVkLFxuICAgKiBkaXNhYmxlZCBvciBvdXQtb2YtcmFuZ2UpLCB3aGl4aCBpcyBkaXN0aW5ndWlzaGVkIGZyb20gZW1wdHkgaW5wdXQgZmllbGQsXG4gICAqIHRoZSBtZXRob2QgbGVhdmVzIHRoZSBpbnB1dCBmaWVsZCB1bnRvdWNoZWQgYXMgd2VsbCBhcyB0aGUgc2VsZWN0aW9uIGJ5XG4gICAqIGRlZmF1bHQuIElmIHJldmVydDogdHJ1ZSBvcHRpb24gaXMgdXNlZCBpbiB0aGlzIGNhc2UsIHRoZSBpbnB1dCBmaWVsZCBpc1xuICAgKiByZWZyZXNoZWQgd2l0aCB0aGUgZXhpc3Rpbmcgc2VsZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zXSAtIGZ1bmN0aW9uIG9wdGlvbnNcbiAgICogLSBhdXRvaGlkZToge2Jvb2xlYW59IC0gd2hldGhlciB0byBoaWRlIHRoZSBwaWNrZXIgZWxlbWVudCBhZnRlciByZWZyZXNoXG4gICAqICAgICBkZWZhdWx0OiBmYWxzZVxuICAgKiAtIHJldmVydDoge2Jvb2xlYW59IC0gV2hldGhlciB0byByZWZyZXNoIHRoZSBpbnB1dCBmaWVsZCB3aGVuIGFsbCB0aGVcbiAgICogICAgIHBhc3NlZCBkYXRlcyBhcmUgaW52YWxpZFxuICAgKiAgICAgZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIHVwZGF0ZShvcHRpb25zID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucyB8fCB7fSwge2NsZWFyOiB0cnVlLCByZW5kZXI6IHRydWV9KTtcbiAgICBjb25zdCBpbnB1dERhdGVzID0gc3RyaW5nVG9BcnJheSh0aGlzLmlucHV0RmllbGQudmFsdWUsIHRoaXMuY29uZmlnLmRhdGVEZWxpbWl0ZXIpO1xuICAgIHNldERhdGUodGhpcywgaW5wdXREYXRlcywgb3B0cyk7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCB0aGUgcGlja2VyIGVsZW1lbnQgYW5kIHRoZSBhc3NvY2lhdGVkIGlucHV0IGZpZWxkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbdGFyZ2V0XSAtIHRhcmdldCBpdGVtIHdoZW4gcmVmcmVzaGluZyBvbmUgaXRlbSBvbmx5XG4gICAqICdwaWNrZXInIG9yICdpbnB1dCdcbiAgICogQHBhcmFtIHtCb29sZWFufSBbZm9yY2VSZW5kZXJdIC0gd2hldGhlciB0byByZS1yZW5kZXIgdGhlIHBpY2tlciBlbGVtZW50XG4gICAqIHJlZ2FyZGxlc3Mgb2YgaXRzIHN0YXRlIGluc3RlYWQgb2Ygb3B0aW1pemVkIHJlZnJlc2hcbiAgICovXG4gIHJlZnJlc2godGFyZ2V0ID0gdW5kZWZpbmVkLCBmb3JjZVJlbmRlciA9IGZhbHNlKSB7XG4gICAgaWYgKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnc3RyaW5nJykge1xuICAgICAgZm9yY2VSZW5kZXIgPSB0YXJnZXQ7XG4gICAgICB0YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgbGV0IG1vZGU7XG4gICAgaWYgKHRhcmdldCA9PT0gJ3BpY2tlcicpIHtcbiAgICAgIG1vZGUgPSAyO1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09PSAnaW5wdXQnKSB7XG4gICAgICBtb2RlID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW9kZSA9IDM7XG4gICAgfVxuICAgIHJlZnJlc2hVSSh0aGlzLCBtb2RlLCAhZm9yY2VSZW5kZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVudGVyIGVkaXQgbW9kZVxuICAgKiBOb3QgYXZhaWxhYmxlIG9uIGlubGluZSBwaWNrZXIgb3Igd2hlbiB0aGUgcGlja2VyIGVsZW1lbnQgaXMgaGlkZGVuXG4gICAqL1xuICBlbnRlckVkaXRNb2RlKCkge1xuICAgIGlmICh0aGlzLmlubGluZSB8fCAhdGhpcy5waWNrZXIuYWN0aXZlIHx8IHRoaXMuZWRpdE1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5lZGl0TW9kZSA9IHRydWU7XG4gICAgdGhpcy5pbnB1dEZpZWxkLmNsYXNzTGlzdC5hZGQoJ2luLWVkaXQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGl0IGZyb20gZWRpdCBtb2RlXG4gICAqIE5vdCBhdmFpbGFibGUgb24gaW5saW5lIHBpY2tlclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zXSAtIGZ1bmN0aW9uIG9wdGlvbnNcbiAgICogLSB1cGRhdGU6IHtib29sZWFufSAtIHdoZXRoZXIgdG8gY2FsbCB1cGRhdGUoKSBhZnRlciBleGl0aW5nXG4gICAqICAgICBJZiBmYWxzZSwgaW5wdXQgZmllbGQgaXMgcmV2ZXJ0IHRvIHRoZSBleGlzdGluZyBzZWxlY3Rpb25cbiAgICogICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBleGl0RWRpdE1vZGUob3B0aW9ucyA9IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLmlubGluZSB8fCAhdGhpcy5lZGl0TW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7dXBkYXRlOiBmYWxzZX0sIG9wdGlvbnMpO1xuICAgIGRlbGV0ZSB0aGlzLmVkaXRNb2RlO1xuICAgIHRoaXMuaW5wdXRGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCdpbi1lZGl0Jyk7XG4gICAgaWYgKG9wdHMudXBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZShvcHRzKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7bGltaXRUb1JhbmdlfSBmcm9tICcuLi9saWIvdXRpbHMuanMnO1xuaW1wb3J0IHthZGRNb250aHMsIGFkZFllYXJzfSBmcm9tICcuLi9saWIvZGF0ZS5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmlnZ2VyRGF0ZXBpY2tlckV2ZW50KGRhdGVwaWNrZXIsIHR5cGUpIHtcbiAgY29uc3QgZGV0YWlsID0ge1xuICAgIGRhdGU6IGRhdGVwaWNrZXIuZ2V0RGF0ZSgpLFxuICAgIHZpZXdEYXRlOiBuZXcgRGF0ZShkYXRlcGlja2VyLnBpY2tlci52aWV3RGF0ZSksXG4gICAgdmlld0lkOiBkYXRlcGlja2VyLnBpY2tlci5jdXJyZW50Vmlldy5pZCxcbiAgICBkYXRlcGlja2VyLFxuICB9O1xuICBkYXRlcGlja2VyLmVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQodHlwZSwge2RldGFpbH0pKTtcbn1cblxuLy8gZGlyZWN0aW9uOiAtMSAodG8gcHJldmlvdXMpLCAxICh0byBuZXh0KVxuZXhwb3J0IGZ1bmN0aW9uIGdvVG9QcmV2T3JOZXh0KGRhdGVwaWNrZXIsIGRpcmVjdGlvbikge1xuICBjb25zdCB7bWluRGF0ZSwgbWF4RGF0ZX0gPSBkYXRlcGlja2VyLmNvbmZpZztcbiAgY29uc3Qge2N1cnJlbnRWaWV3LCB2aWV3RGF0ZX0gPSBkYXRlcGlja2VyLnBpY2tlcjtcbiAgbGV0IG5ld1ZpZXdEYXRlO1xuICBzd2l0Y2ggKGN1cnJlbnRWaWV3LmlkKSB7XG4gICAgY2FzZSAwOlxuICAgICAgbmV3Vmlld0RhdGUgPSBhZGRNb250aHModmlld0RhdGUsIGRpcmVjdGlvbik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDE6XG4gICAgICBuZXdWaWV3RGF0ZSA9IGFkZFllYXJzKHZpZXdEYXRlLCBkaXJlY3Rpb24pO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIG5ld1ZpZXdEYXRlID0gYWRkWWVhcnModmlld0RhdGUsIGRpcmVjdGlvbiAqIGN1cnJlbnRWaWV3Lm5hdlN0ZXApO1xuICB9XG4gIG5ld1ZpZXdEYXRlID0gbGltaXRUb1JhbmdlKG5ld1ZpZXdEYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgZGF0ZXBpY2tlci5waWNrZXIuY2hhbmdlRm9jdXMobmV3Vmlld0RhdGUpLnJlbmRlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoVmlldyhkYXRlcGlja2VyKSB7XG4gIGNvbnN0IHZpZXdJZCA9IGRhdGVwaWNrZXIucGlja2VyLmN1cnJlbnRWaWV3LmlkO1xuICBpZiAodmlld0lkID09PSBkYXRlcGlja2VyLmNvbmZpZy5tYXhWaWV3KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRhdGVwaWNrZXIucGlja2VyLmNoYW5nZVZpZXcodmlld0lkICsgMSkucmVuZGVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmZvY3VzKGRhdGVwaWNrZXIpIHtcbiAgaWYgKGRhdGVwaWNrZXIuY29uZmlnLnVwZGF0ZU9uQmx1cikge1xuICAgIGRhdGVwaWNrZXIudXBkYXRlKHtyZXZlcnQ6IHRydWV9KTtcbiAgfSBlbHNlIHtcbiAgICBkYXRlcGlja2VyLnJlZnJlc2goJ2lucHV0Jyk7XG4gIH1cbiAgZGF0ZXBpY2tlci5oaWRlKCk7XG59XG4iLCJpbXBvcnQge2lzSW5SYW5nZX0gZnJvbSAnLi4vbGliL3V0aWxzLmpzJztcbmltcG9ydCB7aXNBY3RpdmVFbGVtZW50fSBmcm9tICcuLi9saWIvZG9tLmpzJztcbmltcG9ydCB7YWRkRGF5cywgYWRkTW9udGhzLCBhZGRZZWFycywgc3RhcnRPZlllYXJQZXJpb2R9IGZyb20gJy4uL2xpYi9kYXRlLmpzJztcbmltcG9ydCB7Z29Ub1ByZXZPck5leHQsIHN3aXRjaFZpZXcsIHVuZm9jdXN9IGZyb20gJy4vZnVuY3Rpb25zLmpzJztcblxuLy8gRmluZCB0aGUgY2xvc2VzdCBkYXRlIHRoYXQgZG9lc24ndCBtZWV0IHRoZSBjb25kaXRpb24gZm9yIHVuYXZhaWxhYmxlIGRhdGVcbi8vIFJldHVybnMgdW5kZWZpbmVkIGlmIG5vIGF2YWlsYWJsZSBkYXRlIGlzIGZvdW5kXG4vLyBhZGRGbjogZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHRoZSBuZXh0IGRhdGVcbi8vICAgLSBhcmdzOiB0aW1lIHZhbHVlLCBhbW91bnRcbi8vIGluY3JlYXNlOiBhbW91bnQgdG8gcGFzcyB0byBhZGRGblxuLy8gdGVzdEZuOiBmdW5jdGlvbiB0byB0ZXN0IHRoZSB1bmF2YWlsYWJsaXR5IG9mIHRoZSBkYXRlXG4vLyAgIC0gYXJnczogdGltZSB2YWx1ZTsgcmV0dW46IHRydWUgaWYgdW5hdmFpbGFibGVcbmZ1bmN0aW9uIGZpbmROZXh0QXZhaWxhYmxlT25lKGRhdGUsIGFkZEZuLCBpbmNyZWFzZSwgdGVzdEZuLCBtaW4sIG1heCkge1xuICBpZiAoIWlzSW5SYW5nZShkYXRlLCBtaW4sIG1heCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHRlc3RGbihkYXRlKSkge1xuICAgIGNvbnN0IG5ld0RhdGUgPSBhZGRGbihkYXRlLCBpbmNyZWFzZSk7XG4gICAgcmV0dXJuIGZpbmROZXh0QXZhaWxhYmxlT25lKG5ld0RhdGUsIGFkZEZuLCBpbmNyZWFzZSwgdGVzdEZuLCBtaW4sIG1heCk7XG4gIH1cbiAgcmV0dXJuIGRhdGU7XG59XG5cbi8vIGRpcmVjdGlvbjogLTEgKGxlZnQvdXApLCAxIChyaWdodC9kb3duKVxuLy8gdmVydGljYWw6IHRydWUgZm9yIHVwL2Rvd24sIGZhbHNlIGZvciBsZWZ0L3JpZ2h0XG5mdW5jdGlvbiBtb3ZlQnlBcnJvd0tleShkYXRlcGlja2VyLCBldiwgZGlyZWN0aW9uLCB2ZXJ0aWNhbCkge1xuICBjb25zdCBwaWNrZXIgPSBkYXRlcGlja2VyLnBpY2tlcjtcbiAgY29uc3QgY3VycmVudFZpZXcgPSBwaWNrZXIuY3VycmVudFZpZXc7XG4gIGNvbnN0IHN0ZXAgPSBjdXJyZW50Vmlldy5zdGVwIHx8IDE7XG4gIGxldCB2aWV3RGF0ZSA9IHBpY2tlci52aWV3RGF0ZTtcbiAgbGV0IGFkZEZuO1xuICBsZXQgdGVzdEZuO1xuICBzd2l0Y2ggKGN1cnJlbnRWaWV3LmlkKSB7XG4gICAgY2FzZSAwOlxuICAgICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICAgIHZpZXdEYXRlID0gYWRkRGF5cyh2aWV3RGF0ZSwgZGlyZWN0aW9uICogNyk7XG4gICAgICB9IGVsc2UgaWYgKGV2LmN0cmxLZXkgfHwgZXYubWV0YUtleSkge1xuICAgICAgICB2aWV3RGF0ZSA9IGFkZFllYXJzKHZpZXdEYXRlLCBkaXJlY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmlld0RhdGUgPSBhZGREYXlzKHZpZXdEYXRlLCBkaXJlY3Rpb24pO1xuICAgICAgfVxuICAgICAgYWRkRm4gPSBhZGREYXlzO1xuICAgICAgdGVzdEZuID0gKGRhdGUpID0+IGN1cnJlbnRWaWV3LmRpc2FibGVkLmluY2x1ZGVzKGRhdGUpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgdmlld0RhdGUgPSBhZGRNb250aHModmlld0RhdGUsIHZlcnRpY2FsID8gZGlyZWN0aW9uICogNCA6IGRpcmVjdGlvbik7XG4gICAgICBhZGRGbiA9IGFkZE1vbnRocztcbiAgICAgIHRlc3RGbiA9IChkYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGR0ID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIGNvbnN0IHt5ZWFyLCBkaXNhYmxlZH0gPSBjdXJyZW50VmlldztcbiAgICAgICAgcmV0dXJuIGR0LmdldEZ1bGxZZWFyKCkgPT09IHllYXIgJiYgZGlzYWJsZWQuaW5jbHVkZXMoZHQuZ2V0TW9udGgoKSk7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHZpZXdEYXRlID0gYWRkWWVhcnModmlld0RhdGUsIGRpcmVjdGlvbiAqICh2ZXJ0aWNhbCA/IDQgOiAxKSAqIHN0ZXApO1xuICAgICAgYWRkRm4gPSBhZGRZZWFycztcbiAgICAgIHRlc3RGbiA9IGRhdGUgPT4gY3VycmVudFZpZXcuZGlzYWJsZWQuaW5jbHVkZXMoc3RhcnRPZlllYXJQZXJpb2QoZGF0ZSwgc3RlcCkpO1xuICB9XG4gIHZpZXdEYXRlID0gZmluZE5leHRBdmFpbGFibGVPbmUoXG4gICAgdmlld0RhdGUsXG4gICAgYWRkRm4sXG4gICAgZGlyZWN0aW9uIDwgMCA/IC1zdGVwIDogc3RlcCxcbiAgICB0ZXN0Rm4sXG4gICAgY3VycmVudFZpZXcubWluRGF0ZSxcbiAgICBjdXJyZW50Vmlldy5tYXhEYXRlXG4gICk7XG4gIGlmICh2aWV3RGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcGlja2VyLmNoYW5nZUZvY3VzKHZpZXdEYXRlKS5yZW5kZXIoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb25LZXlkb3duKGRhdGVwaWNrZXIsIGV2KSB7XG4gIGNvbnN0IGtleSA9IGV2LmtleTtcbiAgaWYgKGtleSA9PT0gJ1RhYicpIHtcbiAgICB1bmZvY3VzKGRhdGVwaWNrZXIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHBpY2tlciA9IGRhdGVwaWNrZXIucGlja2VyO1xuICBjb25zdCB7aWQsIGlzTWluVmlld30gPSBwaWNrZXIuY3VycmVudFZpZXc7XG4gIGlmICghcGlja2VyLmFjdGl2ZSkge1xuICAgIGlmIChrZXkgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICBwaWNrZXIuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoa2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGRhdGVwaWNrZXIudXBkYXRlKCk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgcGlja2VyLnNob3coKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZGF0ZXBpY2tlci5lZGl0TW9kZSkge1xuICAgIGlmIChrZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIGRhdGVwaWNrZXIuZXhpdEVkaXRNb2RlKHt1cGRhdGU6IHRydWUsIGF1dG9oaWRlOiBkYXRlcGlja2VyLmNvbmZpZy5hdXRvaGlkZX0pO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgcGlja2VyLmhpZGUoKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIGlmIChrZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICBpZiAoZXYuY3RybEtleSB8fCBldi5tZXRhS2V5KSB7XG4gICAgICAgIGdvVG9QcmV2T3JOZXh0KGRhdGVwaWNrZXIsIC0xKTtcbiAgICAgIH0gZWxzZSBpZiAoZXYuc2hpZnRLZXkpIHtcbiAgICAgICAgZGF0ZXBpY2tlci5lbnRlckVkaXRNb2RlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vdmVCeUFycm93S2V5KGRhdGVwaWNrZXIsIGV2LCAtMSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgIGlmIChldi5jdHJsS2V5IHx8IGV2Lm1ldGFLZXkpIHtcbiAgICAgICAgZ29Ub1ByZXZPck5leHQoZGF0ZXBpY2tlciwgMSk7XG4gICAgICB9IGVsc2UgaWYgKGV2LnNoaWZ0S2V5KSB7XG4gICAgICAgIGRhdGVwaWNrZXIuZW50ZXJFZGl0TW9kZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb3ZlQnlBcnJvd0tleShkYXRlcGlja2VyLCBldiwgMSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dVcCcpIHtcbiAgICAgIGlmIChldi5jdHJsS2V5IHx8IGV2Lm1ldGFLZXkpIHtcbiAgICAgICAgc3dpdGNoVmlldyhkYXRlcGlja2VyKTtcbiAgICAgIH0gZWxzZSBpZiAoZXYuc2hpZnRLZXkpIHtcbiAgICAgICAgZGF0ZXBpY2tlci5lbnRlckVkaXRNb2RlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vdmVCeUFycm93S2V5KGRhdGVwaWNrZXIsIGV2LCAtMSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICBpZiAoZXYuc2hpZnRLZXkgJiYgIWV2LmN0cmxLZXkgJiYgIWV2Lm1ldGFLZXkpIHtcbiAgICAgICAgZGF0ZXBpY2tlci5lbnRlckVkaXRNb2RlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG1vdmVCeUFycm93S2V5KGRhdGVwaWNrZXIsIGV2LCAxLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJykge1xuICAgICAgaWYgKGlzTWluVmlldykge1xuICAgICAgICBkYXRlcGlja2VyLnNldERhdGUocGlja2VyLnZpZXdEYXRlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcGlja2VyLmNoYW5nZVZpZXcoaWQgLSAxKS5yZW5kZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgcGlja2VyLmhpZGUoKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGtleSA9PT0gJ0JhY2tzcGFjZSdcbiAgICAgICAgfHwga2V5ID09PSAnRGVsZXRlJ1xuICAgICAgICB8fCAoa2V5Lmxlbmd0aCA9PT0gMSAmJiAhZXYuY3RybEtleSAmJiAhZXYubWV0YUtleSlcbiAgICAgICkge1xuICAgICAgICBkYXRlcGlja2VyLmVudGVyRWRpdE1vZGUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgZXYucHJldmVudERlZmF1bHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uRm9jdXMoZGF0ZXBpY2tlcikge1xuICBpZiAoZGF0ZXBpY2tlci5jb25maWcuc2hvd09uRm9jdXMgJiYgIWRhdGVwaWNrZXIuX3Nob3dpbmcpIHtcbiAgICBkYXRlcGlja2VyLnNob3coKTtcbiAgfVxufVxuXG4vLyBmb3IgdGhlIHByZXZlbnRpb24gZm9yIGVudGVyaW5nIGVkaXQgbW9kZSB3aGlsZSBnZXR0aW5nIGZvY3VzIG9uIGNsaWNrXG5leHBvcnQgZnVuY3Rpb24gb25Nb3VzZWRvd24oZGF0ZXBpY2tlciwgZXYpIHtcbiAgY29uc3QgZWwgPSBldi50YXJnZXQ7XG4gIGlmIChkYXRlcGlja2VyLnBpY2tlci5hY3RpdmUgfHwgZGF0ZXBpY2tlci5jb25maWcuc2hvd09uQ2xpY2spIHtcbiAgICBlbC5fYWN0aXZlID0gaXNBY3RpdmVFbGVtZW50KGVsKTtcbiAgICBlbC5fY2xpY2tpbmcgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRlbGV0ZSBlbC5fYWN0aXZlO1xuICAgICAgZGVsZXRlIGVsLl9jbGlja2luZztcbiAgICB9LCAyMDAwKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb25DbGlja0lucHV0KGRhdGVwaWNrZXIsIGV2KSB7XG4gIGNvbnN0IGVsID0gZXYudGFyZ2V0O1xuICBpZiAoIWVsLl9jbGlja2luZykge1xuICAgIHJldHVybjtcbiAgfVxuICBjbGVhclRpbWVvdXQoZWwuX2NsaWNraW5nKTtcbiAgZGVsZXRlIGVsLl9jbGlja2luZztcblxuICBpZiAoZWwuX2FjdGl2ZSkge1xuICAgIGRhdGVwaWNrZXIuZW50ZXJFZGl0TW9kZSgpO1xuICB9XG4gIGRlbGV0ZSBlbC5fYWN0aXZlO1xuXG4gIGlmIChkYXRlcGlja2VyLmNvbmZpZy5zaG93T25DbGljaykge1xuICAgIGRhdGVwaWNrZXIuc2hvdygpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvblBhc3RlKGRhdGVwaWNrZXIsIGV2KSB7XG4gIGlmIChldi5jbGlwYm9hcmREYXRhLnR5cGVzLmluY2x1ZGVzKCd0ZXh0L3BsYWluJykpIHtcbiAgICBkYXRlcGlja2VyLmVudGVyRWRpdE1vZGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtpc0FjdGl2ZUVsZW1lbnR9IGZyb20gJy4uL2xpYi9kb20uanMnO1xuaW1wb3J0IHtmaW5kRWxlbWVudEluRXZlbnRQYXRofSBmcm9tICcuLi9saWIvZXZlbnQuanMnO1xuaW1wb3J0IHt1bmZvY3VzfSBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5cbi8vIGZvciB0aGUgYGRvY3VtZW50YCB0byBkZWxlZ2F0ZSB0aGUgZXZlbnRzIGZyb20gb3V0c2lkZSB0aGUgcGlja2VyL2lucHV0IGZpZWxkXG5leHBvcnQgZnVuY3Rpb24gb25DbGlja091dHNpZGUoZGF0ZXBpY2tlciwgZXYpIHtcbiAgY29uc3Qge2VsZW1lbnQsIHBpY2tlcn0gPSBkYXRlcGlja2VyO1xuICAvLyBjaGVjayBib3RoIHBpY2tlcidzIGFuZCBpbnB1dCdzIGFjdGl2ZW5lc3MgdG8gbWFrZSB1cGRhdGVPbkJsdXIgd29yayBpblxuICAvLyB0aGUgY2FzZXMgd2hlcmUuLi5cbiAgLy8gLSBwaWNrZXIgaXMgaGlkZGVuIGJ5IEVTQyBrZXkgcHJlc3Mg4oaSIGlucHV0IHN0YXlzIGZvY3VzZWRcbiAgLy8gLSBpbnB1dCBpcyB1bmZvY3VzZWQgYnkgY2xvc2luZyBtb2JpbGUga2V5Ym9hcmQg4oaSIHBpa2VyIGlzIGtlcHQgc2hvd25cbiAgaWYgKCFwaWNrZXIuYWN0aXZlICYmICFpc0FjdGl2ZUVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGlja2VyRWxlbSA9IHBpY2tlci5lbGVtZW50O1xuICBpZiAoZmluZEVsZW1lbnRJbkV2ZW50UGF0aChldiwgZWwgPT4gZWwgPT09IGVsZW1lbnQgfHwgZWwgPT09IHBpY2tlckVsZW0pKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHVuZm9jdXMoZGF0ZXBpY2tlcik7XG59XG4iLCJpbXBvcnQge3RvZGF5LCBhZGRNb250aHMsIGFkZFllYXJzfSBmcm9tICcuLi9saWIvZGF0ZS5qcyc7XG5pbXBvcnQge2ZpbmRFbGVtZW50SW5FdmVudFBhdGh9IGZyb20gJy4uL2xpYi9ldmVudC5qcyc7XG5pbXBvcnQge2dvVG9QcmV2T3JOZXh0LCBzd2l0Y2hWaWV3fSBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5cbmZ1bmN0aW9uIGdvVG9TZWxlY3RlZE1vbnRoT3JZZWFyKGRhdGVwaWNrZXIsIHNlbGVjdGlvbikge1xuICBjb25zdCBwaWNrZXIgPSBkYXRlcGlja2VyLnBpY2tlcjtcbiAgY29uc3Qgdmlld0RhdGUgPSBuZXcgRGF0ZShwaWNrZXIudmlld0RhdGUpO1xuICBjb25zdCB2aWV3SWQgPSBwaWNrZXIuY3VycmVudFZpZXcuaWQ7XG4gIGNvbnN0IG5ld0RhdGUgPSB2aWV3SWQgPT09IDFcbiAgICA/IGFkZE1vbnRocyh2aWV3RGF0ZSwgc2VsZWN0aW9uIC0gdmlld0RhdGUuZ2V0TW9udGgoKSlcbiAgICA6IGFkZFllYXJzKHZpZXdEYXRlLCBzZWxlY3Rpb24gLSB2aWV3RGF0ZS5nZXRGdWxsWWVhcigpKTtcblxuICBwaWNrZXIuY2hhbmdlRm9jdXMobmV3RGF0ZSkuY2hhbmdlVmlldyh2aWV3SWQgLSAxKS5yZW5kZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2xpY2tUb2RheUJ0bihkYXRlcGlja2VyKSB7XG4gIGNvbnN0IHBpY2tlciA9IGRhdGVwaWNrZXIucGlja2VyO1xuICBjb25zdCBjdXJyZW50RGF0ZSA9IHRvZGF5KCk7XG4gIGlmIChkYXRlcGlja2VyLmNvbmZpZy50b2RheUJ0bk1vZGUgPT09IDEpIHtcbiAgICBpZiAoZGF0ZXBpY2tlci5jb25maWcuYXV0b2hpZGUpIHtcbiAgICAgIGRhdGVwaWNrZXIuc2V0RGF0ZShjdXJyZW50RGF0ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRhdGVwaWNrZXIuc2V0RGF0ZShjdXJyZW50RGF0ZSwge3JlbmRlcjogZmFsc2V9KTtcbiAgICBwaWNrZXIudXBkYXRlKCk7XG4gIH1cbiAgaWYgKHBpY2tlci52aWV3RGF0ZSAhPT0gY3VycmVudERhdGUpIHtcbiAgICBwaWNrZXIuY2hhbmdlRm9jdXMoY3VycmVudERhdGUpO1xuICB9XG4gIHBpY2tlci5jaGFuZ2VWaWV3KDApLnJlbmRlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25DbGlja0NsZWFyQnRuKGRhdGVwaWNrZXIpIHtcbiAgZGF0ZXBpY2tlci5zZXREYXRlKHtjbGVhcjogdHJ1ZX0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25DbGlja1ZpZXdTd2l0Y2goZGF0ZXBpY2tlcikge1xuICBzd2l0Y2hWaWV3KGRhdGVwaWNrZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25DbGlja1ByZXZCdG4oZGF0ZXBpY2tlcikge1xuICBnb1RvUHJldk9yTmV4dChkYXRlcGlja2VyLCAtMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNsaWNrTmV4dEJ0bihkYXRlcGlja2VyKSB7XG4gIGdvVG9QcmV2T3JOZXh0KGRhdGVwaWNrZXIsIDEpO1xufVxuXG4vLyBGb3IgdGhlIHBpY2tlcidzIG1haW4gYmxvY2sgdG8gZGVsZWdldGUgdGhlIGV2ZW50cyBmcm9tIGBkYXRlcGlja2VyLWNlbGxgc1xuZXhwb3J0IGZ1bmN0aW9uIG9uQ2xpY2tWaWV3KGRhdGVwaWNrZXIsIGV2KSB7XG4gIGNvbnN0IHRhcmdldCA9IGZpbmRFbGVtZW50SW5FdmVudFBhdGgoZXYsICcuZGF0ZXBpY2tlci1jZWxsJyk7XG4gIGlmICghdGFyZ2V0IHx8IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB7aWQsIGlzTWluVmlld30gPSBkYXRlcGlja2VyLnBpY2tlci5jdXJyZW50VmlldztcbiAgaWYgKGlzTWluVmlldykge1xuICAgIGRhdGVwaWNrZXIuc2V0RGF0ZShOdW1iZXIodGFyZ2V0LmRhdGFzZXQuZGF0ZSkpO1xuICB9IGVsc2UgaWYgKGlkID09PSAxKSB7XG4gICAgZ29Ub1NlbGVjdGVkTW9udGhPclllYXIoZGF0ZXBpY2tlciwgTnVtYmVyKHRhcmdldC5kYXRhc2V0Lm1vbnRoKSk7XG4gIH0gZWxzZSB7XG4gICAgZ29Ub1NlbGVjdGVkTW9udGhPclllYXIoZGF0ZXBpY2tlciwgTnVtYmVyKHRhcmdldC5kYXRhc2V0LnllYXIpKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb25Nb3VzZWRvd25QaWNrZXIoZXYpIHtcbiAgZXYucHJldmVudERlZmF1bHQoKTtcbn1cbiIsIi8vIGRlZmF1bHQgbG9jYWxlc1xuZXhwb3J0IGNvbnN0IGxvY2FsZXMgPSB7XG4gIGVuOiB7XG4gICAgZGF5czogW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl0sXG4gICAgZGF5c1Nob3J0OiBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl0sXG4gICAgZGF5c01pbjogW1wiU3VcIiwgXCJNb1wiLCBcIlR1XCIsIFwiV2VcIiwgXCJUaFwiLCBcIkZyXCIsIFwiU2FcIl0sXG4gICAgbW9udGhzOiBbXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXSxcbiAgICBtb250aHNTaG9ydDogW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdLFxuICAgIHRvZGF5OiBcIlRvZGF5XCIsXG4gICAgY2xlYXI6IFwiQ2xlYXJcIixcbiAgICB0aXRsZUZvcm1hdDogXCJNTSB5XCJcbiAgfVxufTtcbiIsImltcG9ydCB7c3RyaXBUaW1lLCB0b2RheX0gZnJvbSAnLi9kYXRlLmpzJztcbmltcG9ydCB7bGFzdEl0ZW1PZn0gZnJvbSAnLi91dGlscy5qcyc7XG5cbi8vIHBhdHRlcm4gZm9yIGZvcm1hdCBwYXJ0c1xuZXhwb3J0IGNvbnN0IHJlRm9ybWF0VG9rZW5zID0gL2RkP3xERD98bW0/fE1NP3x5eT8oPzp5eSk/Lztcbi8vIHBhdHRlcm4gZm9yIG5vbiBkYXRlIHBhcnRzXG5leHBvcnQgY29uc3QgcmVOb25EYXRlUGFydHMgPSAvW1xccyEtLzotQFstYHstfuW5tOaciOaXpV0rLztcbi8vIGNhY2hlIGZvciBwZXJzZWQgZm9ybWF0c1xubGV0IGtub3duRm9ybWF0cyA9IHt9O1xuLy8gcGFyc2UgZnVudGlvbnMgZm9yIGRhdGUgcGFydHNcbmNvbnN0IHBhcnNlRm5zID0ge1xuICB5KGRhdGUsIHllYXIpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSkuc2V0RnVsbFllYXIocGFyc2VJbnQoeWVhciwgMTApKTtcbiAgfSxcbiAgbShkYXRlLCBtb250aCwgbG9jYWxlKSB7XG4gICAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIGxldCBtb250aEluZGV4ID0gcGFyc2VJbnQobW9udGgsIDEwKSAtIDE7XG5cbiAgICBpZiAoaXNOYU4obW9udGhJbmRleCkpIHtcbiAgICAgIGlmICghbW9udGgpIHtcbiAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbW9udGhOYW1lID0gbW9udGgudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IGNvbXBhcmVOYW1lcyA9IG5hbWUgPT4gbmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgobW9udGhOYW1lKTtcbiAgICAgIC8vIGNvbXBhcmUgd2l0aCBib3RoIHNob3J0IGFuZCBmdWxsIG5hbWVzIGJlY2F1c2Ugc29tZSBsb2NhbGVzIGhhdmUgcGVyaW9kc1xuICAgICAgLy8gaW4gdGhlIHNob3J0IG5hbWVzIChub3QgZXF1YWwgdG8gdGhlIGZpcnN0IFggbGV0dGVycyBvZiB0aGUgZnVsbCBuYW1lcylcbiAgICAgIG1vbnRoSW5kZXggPSBsb2NhbGUubW9udGhzU2hvcnQuZmluZEluZGV4KGNvbXBhcmVOYW1lcyk7XG4gICAgICBpZiAobW9udGhJbmRleCA8IDApIHtcbiAgICAgICAgbW9udGhJbmRleCA9IGxvY2FsZS5tb250aHMuZmluZEluZGV4KGNvbXBhcmVOYW1lcyk7XG4gICAgICB9XG4gICAgICBpZiAobW9udGhJbmRleCA8IDApIHtcbiAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdEYXRlLnNldE1vbnRoKG1vbnRoSW5kZXgpO1xuICAgIHJldHVybiBuZXdEYXRlLmdldE1vbnRoKCkgIT09IG5vcm1hbGl6ZU1vbnRoKG1vbnRoSW5kZXgpXG4gICAgICA/IG5ld0RhdGUuc2V0RGF0ZSgwKVxuICAgICAgOiBuZXdEYXRlLmdldFRpbWUoKTtcbiAgfSxcbiAgZChkYXRlLCBkYXkpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSkuc2V0RGF0ZShwYXJzZUludChkYXksIDEwKSk7XG4gIH0sXG59O1xuLy8gZm9ybWF0IGZ1bmN0aW9ucyBmb3IgZGF0ZSBwYXJ0c1xuY29uc3QgZm9ybWF0Rm5zID0ge1xuICBkKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCk7XG4gIH0sXG4gIGRkKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkWmVybyhkYXRlLmdldERhdGUoKSwgMik7XG4gIH0sXG4gIEQoZGF0ZSwgbG9jYWxlKSB7XG4gICAgcmV0dXJuIGxvY2FsZS5kYXlzU2hvcnRbZGF0ZS5nZXREYXkoKV07XG4gIH0sXG4gIEREKGRhdGUsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUuZGF5c1tkYXRlLmdldERheSgpXTtcbiAgfSxcbiAgbShkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gIH0sXG4gIG1tKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkWmVybyhkYXRlLmdldE1vbnRoKCkgKyAxLCAyKTtcbiAgfSxcbiAgTShkYXRlLCBsb2NhbGUpIHtcbiAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1Nob3J0W2RhdGUuZ2V0TW9udGgoKV07XG4gIH0sXG4gIE1NKGRhdGUsIGxvY2FsZSkge1xuICAgIHJldHVybiBsb2NhbGUubW9udGhzW2RhdGUuZ2V0TW9udGgoKV07XG4gIH0sXG4gIHkoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIH0sXG4gIHl5KGRhdGUpIHtcbiAgICByZXR1cm4gcGFkWmVybyhkYXRlLmdldEZ1bGxZZWFyKCksIDIpLnNsaWNlKC0yKTtcbiAgfSxcbiAgeXl5eShkYXRlKSB7XG4gICAgcmV0dXJuIHBhZFplcm8oZGF0ZS5nZXRGdWxsWWVhcigpLCA0KTtcbiAgfSxcbn07XG5cbi8vIGdldCBtb250aCBpbmRleCBpbiBub3JtYWwgcmFuZ2UgKDAgLSAxMSkgZnJvbSBhbnkgbnVtYmVyXG5mdW5jdGlvbiBub3JtYWxpemVNb250aChtb250aEluZGV4KSB7XG4gIHJldHVybiBtb250aEluZGV4ID4gLTEgPyBtb250aEluZGV4ICUgMTIgOiBub3JtYWxpemVNb250aChtb250aEluZGV4ICsgMTIpO1xufVxuXG5mdW5jdGlvbiBwYWRaZXJvKG51bSwgbGVuZ3RoKSB7XG4gIHJldHVybiBudW0udG9TdHJpbmcoKS5wYWRTdGFydChsZW5ndGgsICcwJyk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRm9ybWF0U3RyaW5nKGZvcm1hdCkge1xuICBpZiAodHlwZW9mIGZvcm1hdCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGUgZm9ybWF0LlwiKTtcbiAgfVxuICBpZiAoZm9ybWF0IGluIGtub3duRm9ybWF0cykge1xuICAgIHJldHVybiBrbm93bkZvcm1hdHNbZm9ybWF0XTtcbiAgfVxuXG4gIC8vIHNwcml0IHRoZSBmb3JtYXQgc3RyaW5nIGludG8gcGFydHMgYW5kIHNlcHJhdG9yc1xuICBjb25zdCBzZXBhcmF0b3JzID0gZm9ybWF0LnNwbGl0KHJlRm9ybWF0VG9rZW5zKTtcbiAgY29uc3QgcGFydHMgPSBmb3JtYXQubWF0Y2gobmV3IFJlZ0V4cChyZUZvcm1hdFRva2VucywgJ2cnKSk7XG4gIGlmIChzZXBhcmF0b3JzLmxlbmd0aCA9PT0gMCB8fCAhcGFydHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGUgZm9ybWF0LlwiKTtcbiAgfVxuXG4gIC8vIGNvbGxlY3QgZm9ybWF0IGZ1bmN0aW9ucyB1c2VkIGluIHRoZSBmb3JtYXRcbiAgY29uc3QgcGFydEZvcm1hdHRlcnMgPSBwYXJ0cy5tYXAodG9rZW4gPT4gZm9ybWF0Rm5zW3Rva2VuXSk7XG5cbiAgLy8gY29sbGVjdCBwYXJzZSBmdW5jdGlvbiBrZXlzIHVzZWQgaW4gdGhlIGZvcm1hdFxuICAvLyBpdGVyYXRlIG92ZXIgcGFyc2VGbnMnIGtleXMgaW4gb3JkZXIgdG8ga2VlcCB0aGUgb3JkZXIgb2YgdGhlIGtleXMuXG4gIGNvbnN0IHBhcnRQYXJzZXJLZXlzID0gT2JqZWN0LmtleXMocGFyc2VGbnMpLnJlZHVjZSgoa2V5cywga2V5KSA9PiB7XG4gICAgY29uc3QgdG9rZW4gPSBwYXJ0cy5maW5kKHBhcnQgPT4gcGFydFswXSAhPT0gJ0QnICYmIHBhcnRbMF0udG9Mb3dlckNhc2UoKSA9PT0ga2V5KTtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cztcbiAgfSwgW10pO1xuXG4gIHJldHVybiBrbm93bkZvcm1hdHNbZm9ybWF0XSA9IHtcbiAgICBwYXJzZXIoZGF0ZVN0ciwgbG9jYWxlKSB7XG4gICAgICBjb25zdCBkYXRlUGFydHMgPSBkYXRlU3RyLnNwbGl0KHJlTm9uRGF0ZVBhcnRzKS5yZWR1Y2UoKGR0UGFydHMsIHBhcnQsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChwYXJ0Lmxlbmd0aCA+IDAgJiYgcGFydHNbaW5kZXhdKSB7XG4gICAgICAgICAgY29uc3QgdG9rZW4gPSBwYXJ0c1tpbmRleF1bMF07XG4gICAgICAgICAgaWYgKHRva2VuID09PSAnTScpIHtcbiAgICAgICAgICAgIGR0UGFydHMubSA9IHBhcnQ7XG4gICAgICAgICAgfSBlbHNlIGlmICh0b2tlbiAhPT0gJ0QnKSB7XG4gICAgICAgICAgICBkdFBhcnRzW3Rva2VuXSA9IHBhcnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkdFBhcnRzO1xuICAgICAgfSwge30pO1xuXG4gICAgICAvLyBpdGVyYXRlIG92ZXIgcGFydFBhcnNlcmtleXMgc28gdGhhdCB0aGUgcGFyc2luZyBpcyBtYWRlIGluIHRoZSBvZGVyXG4gICAgICAvLyBvZiB5ZWFyLCBtb250aCBhbmQgZGF5IHRvIHByZXZlbnQgdGhlIGRheSBwYXJzZXIgZnJvbSBjb3JyZWN0aW5nIGxhc3RcbiAgICAgIC8vIGRheSBvZiBtb250aCB3cm9uZ2x5XG4gICAgICByZXR1cm4gcGFydFBhcnNlcktleXMucmVkdWNlKChvcmlnRGF0ZSwga2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGUgPSBwYXJzZUZuc1trZXldKG9yaWdEYXRlLCBkYXRlUGFydHNba2V5XSwgbG9jYWxlKTtcbiAgICAgICAgLy8gaW5nbm9yZSB0aGUgcGFydCBmYWlsZWQgdG8gcGFyc2VcbiAgICAgICAgcmV0dXJuIGlzTmFOKG5ld0RhdGUpID8gb3JpZ0RhdGUgOiBuZXdEYXRlO1xuICAgICAgfSwgdG9kYXkoKSk7XG4gICAgfSxcbiAgICBmb3JtYXR0ZXIoZGF0ZSwgbG9jYWxlKSB7XG4gICAgICBsZXQgZGF0ZVN0ciA9IHBhcnRGb3JtYXR0ZXJzLnJlZHVjZSgoc3RyLCBmbiwgaW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuIHN0ciArPSBgJHtzZXBhcmF0b3JzW2luZGV4XX0ke2ZuKGRhdGUsIGxvY2FsZSl9YDtcbiAgICAgIH0sICcnKTtcbiAgICAgIC8vIHNlcGFyYXRvcnMnIGxlbmd0aCBpcyBhbHdheXMgcGFydHMnIGxlbmd0aCArIDEsXG4gICAgICByZXR1cm4gZGF0ZVN0ciArPSBsYXN0SXRlbU9mKHNlcGFyYXRvcnMpO1xuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURhdGUoZGF0ZVN0ciwgZm9ybWF0LCBsb2NhbGUpIHtcbiAgaWYgKGRhdGVTdHIgaW5zdGFuY2VvZiBEYXRlIHx8IHR5cGVvZiBkYXRlU3RyID09PSAnbnVtYmVyJykge1xuICAgIGNvbnN0IGRhdGUgPSBzdHJpcFRpbWUoZGF0ZVN0cik7XG4gICAgcmV0dXJuIGlzTmFOKGRhdGUpID8gdW5kZWZpbmVkIDogZGF0ZTtcbiAgfVxuICBpZiAoIWRhdGVTdHIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGlmIChkYXRlU3RyID09PSAndG9kYXknKSB7XG4gICAgcmV0dXJuIHRvZGF5KCk7XG4gIH1cblxuICBpZiAoZm9ybWF0ICYmIGZvcm1hdC50b1ZhbHVlKSB7XG4gICAgY29uc3QgZGF0ZSA9IGZvcm1hdC50b1ZhbHVlKGRhdGVTdHIsIGZvcm1hdCwgbG9jYWxlKTtcbiAgICByZXR1cm4gaXNOYU4oZGF0ZSkgPyB1bmRlZmluZWQgOiBzdHJpcFRpbWUoZGF0ZSk7XG4gIH1cblxuICByZXR1cm4gcGFyc2VGb3JtYXRTdHJpbmcoZm9ybWF0KS5wYXJzZXIoZGF0ZVN0ciwgbG9jYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0LCBsb2NhbGUpIHtcbiAgaWYgKGlzTmFOKGRhdGUpIHx8ICghZGF0ZSAmJiBkYXRlICE9PSAwKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGNvbnN0IGRhdGVPYmogPSB0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicgPyBuZXcgRGF0ZShkYXRlKSA6IGRhdGU7XG5cbiAgaWYgKGZvcm1hdC50b0Rpc3BsYXkpIHtcbiAgICByZXR1cm4gZm9ybWF0LnRvRGlzcGxheShkYXRlT2JqLCBmb3JtYXQsIGxvY2FsZSk7XG4gIH1cblxuICByZXR1cm4gcGFyc2VGb3JtYXRTdHJpbmcoZm9ybWF0KS5mb3JtYXR0ZXIoZGF0ZU9iaiwgbG9jYWxlKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBzdHJpcFRpbWUodGltZVZhbHVlKSB7XG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lVmFsdWUpLnNldEhvdXJzKDAsIDAsIDAsIDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9kYXkoKSB7XG4gIHJldHVybiBuZXcgRGF0ZSgpLnNldEhvdXJzKDAsIDAsIDAsIDApO1xufVxuXG4vLyBHZXQgdGhlIHRpbWUgdmFsdWUgb2YgdGhlIHN0YXJ0IG9mIGdpdmVuIGRhdGUgb3IgeWVhciwgbW9udGggYW5kIGRheVxuZXhwb3J0IGZ1bmN0aW9uIGRhdGVWYWx1ZSguLi5hcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gdG9kYXkoKTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gc3RyaXBUaW1lKGFyZ3NbMF0pO1xuICB9XG5cbiAgLy8gdXNlIHNldEZ1bGxZZWFyKCkgdG8ga2VlcCAyLWRpZ2l0IHllYXIgZnJvbSBiZWluZyBtYXBwZWQgdG8gMTkwMC0xOTk5XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgbmV3RGF0ZS5zZXRGdWxsWWVhciguLi5hcmdzKTtcbiAgcmV0dXJuIG5ld0RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGREYXlzKGRhdGUsIGFtb3VudCkge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gIHJldHVybiBuZXdEYXRlLnNldERhdGUobmV3RGF0ZS5nZXREYXRlKCkgKyBhbW91bnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkV2Vla3MoZGF0ZSwgYW1vdW50KSB7XG4gIHJldHVybiBhZGREYXlzKGRhdGUsIGFtb3VudCAqIDcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTW9udGhzKGRhdGUsIGFtb3VudCkge1xuICAvLyBJZiB0aGUgZGF5IG9mIHRoZSBkYXRlIGlzIG5vdCBpbiB0aGUgbmV3IG1vbnRoLCB0aGUgbGFzdCBkYXkgb2YgdGhlIG5ld1xuICAvLyBtb250aCB3aWxsIGJlIHJldHVybmVkLiBlLmcuIEphbiAzMSArIDEgbW9udGgg4oaSIEZlYiAyOCAobm90IE1hciAwMylcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICBjb25zdCBtb250aHNUb1NldCA9IG5ld0RhdGUuZ2V0TW9udGgoKSArIGFtb3VudDtcbiAgbGV0IGV4cGVjdGVkTW9udGggPSBtb250aHNUb1NldCAlIDEyO1xuICBpZiAoZXhwZWN0ZWRNb250aCA8IDApIHtcbiAgICBleHBlY3RlZE1vbnRoICs9IDEyO1xuICB9XG5cbiAgY29uc3QgdGltZSA9IG5ld0RhdGUuc2V0TW9udGgobW9udGhzVG9TZXQpO1xuICByZXR1cm4gbmV3RGF0ZS5nZXRNb250aCgpICE9PSBleHBlY3RlZE1vbnRoID8gbmV3RGF0ZS5zZXREYXRlKDApIDogdGltZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFllYXJzKGRhdGUsIGFtb3VudCkge1xuICAvLyBJZiB0aGUgZGF0ZSBpcyBGZWIgMjkgYW5kIHRoZSBuZXcgeWVhciBpcyBub3QgYSBsZWFwIHllYXIsIEZlYiAyOCBvZiB0aGVcbiAgLy8gbmV3IHllYXIgd2lsbCBiZSByZXR1cm5lZC5cbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICBjb25zdCBleHBlY3RlZE1vbnRoID0gbmV3RGF0ZS5nZXRNb250aCgpO1xuICBjb25zdCB0aW1lID0gbmV3RGF0ZS5zZXRGdWxsWWVhcihuZXdEYXRlLmdldEZ1bGxZZWFyKCkgKyBhbW91bnQpO1xuICByZXR1cm4gZXhwZWN0ZWRNb250aCA9PT0gMSAmJiBuZXdEYXRlLmdldE1vbnRoKCkgPT09IDIgPyBuZXdEYXRlLnNldERhdGUoMCkgOiB0aW1lO1xufVxuXG4vLyBDYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGJldHR3ZW4gMiBkYXlzIG9mIHRoZSB3ZWVrXG5mdW5jdGlvbiBkYXlEaWZmKGRheSwgZnJvbSkge1xuICByZXR1cm4gKGRheSAtIGZyb20gKyA3KSAlIDc7XG59XG5cbi8vIEdldCB0aGUgZGF0ZSBvZiB0aGUgc3BlY2lmaWVkIGRheSBvZiB0aGUgd2VlayBvZiBnaXZlbiBiYXNlIGRhdGVcbmV4cG9ydCBmdW5jdGlvbiBkYXlPZlRoZVdlZWtPZihiYXNlRGF0ZSwgZGF5T2ZXZWVrLCB3ZWVrU3RhcnQgPSAwKSB7XG4gIGNvbnN0IGJhc2VEYXkgPSBuZXcgRGF0ZShiYXNlRGF0ZSkuZ2V0RGF5KCk7XG4gIHJldHVybiBhZGREYXlzKGJhc2VEYXRlLCBkYXlEaWZmKGRheU9mV2Vlaywgd2Vla1N0YXJ0KSAtIGRheURpZmYoYmFzZURheSwgd2Vla1N0YXJ0KSk7XG59XG5cbi8vIEdldCB0aGUgSVNPIHdlZWsgb2YgYSBkYXRlXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2VlayhkYXRlKSB7XG4gIC8vIHN0YXJ0IG9mIElTTyB3ZWVrIGlzIE1vbmRheVxuICBjb25zdCB0aHVPZlRoZVdlZWsgPSBkYXlPZlRoZVdlZWtPZihkYXRlLCA0LCAxKTtcbiAgLy8gMXN0IHdlZWsgPT0gdGhlIHdlZWsgd2hlcmUgdGhlIDR0aCBvZiBKYW51YXJ5IGlzIGluXG4gIGNvbnN0IGZpcnN0VGh1ID0gZGF5T2ZUaGVXZWVrT2YobmV3IERhdGUodGh1T2ZUaGVXZWVrKS5zZXRNb250aCgwLCA0KSwgNCwgMSk7XG4gIHJldHVybiBNYXRoLnJvdW5kKCh0aHVPZlRoZVdlZWsgLSBmaXJzdFRodSkgLyA2MDQ4MDAwMDApICsgMTtcbn1cblxuLy8gR2V0IHRoZSBzdGFydCB5ZWFyIG9mIHRoZSBwZXJpb2Qgb2YgeWVhcnMgdGhhdCBpbmNsdWRlcyBnaXZlbiBkYXRlXG4vLyB5ZWFyczogbGVuZ3RoIG9mIHRoZSB5ZWFyIHBlcmlvZFxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZZZWFyUGVyaW9kKGRhdGUsIHllYXJzKSB7XG4gIC8qIEBzZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvWWVhcl96ZXJvI0lTT184NjAxICovXG4gIGNvbnN0IHllYXIgPSBuZXcgRGF0ZShkYXRlKS5nZXRGdWxsWWVhcigpO1xuICByZXR1cm4gTWF0aC5mbG9vcih5ZWFyIC8geWVhcnMpICogeWVhcnM7XG59XG5cbi8vIENvbnZlcnQgZGF0ZSB0byB0aGUgZmlyc3QvbGFzdCBkYXRlIG9mIHRoZSBtb250aC95ZWFyIG9mIHRoZSBkYXRlXG5leHBvcnQgZnVuY3Rpb24gcmVndWxhcml6ZURhdGUoZGF0ZSwgdGltZVNwYW4sIHVzZUxhc3REYXRlKSB7XG4gIGlmICh0aW1lU3BhbiAhPT0gMSAmJiB0aW1lU3BhbiAhPT0gMikge1xuICAgIHJldHVybiBkYXRlO1xuICB9XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgaWYgKHRpbWVTcGFuID09PSAxKSB7XG4gICAgdXNlTGFzdERhdGVcbiAgICAgID8gbmV3RGF0ZS5zZXRNb250aChuZXdEYXRlLmdldE1vbnRoKCkgKyAxLCAwKVxuICAgICAgOiBuZXdEYXRlLnNldERhdGUoMSk7XG4gIH0gZWxzZSB7XG4gICAgdXNlTGFzdERhdGVcbiAgICAgID8gbmV3RGF0ZS5zZXRGdWxsWWVhcihuZXdEYXRlLmdldEZ1bGxZZWFyKCkgKyAxLCAwLCAwKVxuICAgICAgOiBuZXdEYXRlLnNldE1vbnRoKDAsIDEpO1xuICB9XG4gIHJldHVybiBuZXdEYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xufVxuIiwiY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWwpIHtcbiAgcmV0dXJuIHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChodG1sKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcmVudChlbCkge1xuICByZXR1cm4gZWwucGFyZW50RWxlbWVudFxuICAgIHx8IChlbC5wYXJlbnROb2RlIGluc3RhbmNlb2YgU2hhZG93Um9vdCA/IGVsLnBhcmVudE5vZGUuaG9zdCA6IHVuZGVmaW5lZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FjdGl2ZUVsZW1lbnQoZWwpIHtcbiAgcmV0dXJuIGVsLmdldFJvb3ROb2RlKCkuYWN0aXZlRWxlbWVudCA9PT0gZWw7XG59XG5cbi8vIGVxdWl2YWxlbnQgdG8galF1ZXJ5J3MgOnZpc2JsZVxuZXhwb3J0IGZ1bmN0aW9uIGlzVmlzaWJsZShlbCkge1xuICByZXR1cm4gISEoZWwub2Zmc2V0V2lkdGggfHwgZWwub2Zmc2V0SGVpZ2h0IHx8IGVsLmdldENsaWVudFJlY3RzKCkubGVuZ3RoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsKSB7XG4gIGlmIChlbC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gYmFjayB1cCB0aGUgZXhpc3RpbmcgZGlzcGxheSBzZXR0aW5nIGluIGRhdGEtc3R5bGUtZGlzcGxheVxuICBpZiAoZWwuc3R5bGUuZGlzcGxheSkge1xuICAgIGVsLmRhdGFzZXQuc3R5bGVEaXNwbGF5ID0gZWwuc3R5bGUuZGlzcGxheTtcbiAgfVxuICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0VsZW1lbnQoZWwpIHtcbiAgaWYgKGVsLnN0eWxlLmRpc3BsYXkgIT09ICdub25lJykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZWwuZGF0YXNldC5zdHlsZURpc3BsYXkpIHtcbiAgICAvLyByZXN0b3JlIGJhY2tlZC11cCBkaXNwYXkgcHJvcGVydHlcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gZWwuZGF0YXNldC5zdHlsZURpc3BsYXk7XG4gICAgZGVsZXRlIGVsLmRhdGFzZXQuc3R5bGVEaXNwbGF5O1xuICB9IGVsc2Uge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1wdHlDaGlsZE5vZGVzKGVsKSB7XG4gIGlmIChlbC5maXJzdENoaWxkKSB7XG4gICAgZWwucmVtb3ZlQ2hpbGQoZWwuZmlyc3RDaGlsZCk7XG4gICAgZW1wdHlDaGlsZE5vZGVzKGVsKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUNoaWxkTm9kZXMoZWwsIG5ld0NoaWxkTm9kZXMpIHtcbiAgZW1wdHlDaGlsZE5vZGVzKGVsKTtcbiAgaWYgKG5ld0NoaWxkTm9kZXMgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgZWwuYXBwZW5kQ2hpbGQobmV3Q2hpbGROb2Rlcyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5ld0NoaWxkTm9kZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgZWwuYXBwZW5kQ2hpbGQocGFyc2VIVE1MKG5ld0NoaWxkTm9kZXMpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbmV3Q2hpbGROb2Rlcy5mb3JFYWNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbmV3Q2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBlbC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiY29uc3QgbGlzdGVuZXJSZWdpc3RyeSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB7YWRkRXZlbnRMaXN0ZW5lciwgcmVtb3ZlRXZlbnRMaXN0ZW5lcn0gPSBFdmVudFRhcmdldC5wcm90b3R5cGU7XG5cbi8vIFJlZ2lzdGVyIGV2ZW50IGxpc3RlbmVycyB0byBhIGtleSBvYmplY3Rcbi8vIGxpc3RlbmVyczogYXJyYXkgb2YgbGlzdGVuZXIgZGVmaW5pdGlvbnM7XG4vLyAgIC0gZWFjaCBkZWZpbml0aW9uIG11c3QgYmUgYSBmbGF0IGFycmF5IG9mIGV2ZW50IHRhcmdldCBhbmQgdGhlIGFyZ3VtZW50c1xuLy8gICAgIHVzZWQgdG8gY2FsbCBhZGRFdmVudExpc3RlbmVyKCkgb24gdGhlIHRhcmdldFxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTGlzdGVuZXJzKGtleU9iaiwgbGlzdGVuZXJzKSB7XG4gIGxldCByZWdpc3RlcmVkID0gbGlzdGVuZXJSZWdpc3RyeS5nZXQoa2V5T2JqKTtcbiAgaWYgKCFyZWdpc3RlcmVkKSB7XG4gICAgcmVnaXN0ZXJlZCA9IFtdO1xuICAgIGxpc3RlbmVyUmVnaXN0cnkuc2V0KGtleU9iaiwgcmVnaXN0ZXJlZCk7XG4gIH1cbiAgbGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lci5jYWxsKC4uLmxpc3RlbmVyKTtcbiAgICByZWdpc3RlcmVkLnB1c2gobGlzdGVuZXIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVucmVnaXN0ZXJMaXN0ZW5lcnMoa2V5T2JqKSB7XG4gIGxldCBsaXN0ZW5lcnMgPSBsaXN0ZW5lclJlZ2lzdHJ5LmdldChrZXlPYmopO1xuICBpZiAoIWxpc3RlbmVycykge1xuICAgIHJldHVybjtcbiAgfVxuICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICByZW1vdmVFdmVudExpc3RlbmVyLmNhbGwoLi4ubGlzdGVuZXIpO1xuICB9KTtcbiAgbGlzdGVuZXJSZWdpc3RyeS5kZWxldGUoa2V5T2JqKTtcbn1cblxuLy8gRXZlbnQuY29tcG9zZWRQYXRoKCkgcG9seWZpbGwgZm9yIEVkZ2Vcbi8vIGJhc2VkIG9uIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2tsZWluZnJldW5kL2U5Nzg3ZDczNzc2YzBlMzc1MGRjZmNkYzg5ZjEwMGVjXG5pZiAoIUV2ZW50LnByb3RvdHlwZS5jb21wb3NlZFBhdGgpIHtcbiAgY29uc3QgZ2V0Q29tcG9zZWRQYXRoID0gKG5vZGUsIHBhdGggPSBbXSkgPT4ge1xuICAgIHBhdGgucHVzaChub2RlKTtcblxuICAgIGxldCBwYXJlbnQ7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH0gZWxzZSBpZiAobm9kZS5ob3N0KSB7IC8vIFNoYWRvd1Jvb3RcbiAgICAgIHBhcmVudCA9IG5vZGUuaG9zdDtcbiAgICB9IGVsc2UgaWYgKG5vZGUuZGVmYXVsdFZpZXcpIHsgIC8vIERvY3VtZW50XG4gICAgICBwYXJlbnQgPSBub2RlLmRlZmF1bHRWaWV3O1xuICAgIH1cbiAgICByZXR1cm4gcGFyZW50ID8gZ2V0Q29tcG9zZWRQYXRoKHBhcmVudCwgcGF0aCkgOiBwYXRoO1xuICB9O1xuXG4gIEV2ZW50LnByb3RvdHlwZS5jb21wb3NlZFBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdldENvbXBvc2VkUGF0aCh0aGlzLnRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGZpbmRGcm9tUGF0aChwYXRoLCBjcml0ZXJpYSwgY3VycmVudFRhcmdldCkge1xuICBjb25zdCBbbm9kZSwgLi4ucmVzdF0gPSBwYXRoO1xuICBpZiAoY3JpdGVyaWEobm9kZSkpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICBpZiAobm9kZSA9PT0gY3VycmVudFRhcmdldCB8fCBub2RlLnRhZ05hbWUgPT09ICdIVE1MJyB8fCByZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIHN0b3Agd2hlbiByZWFjaGluZyBjdXJyZW50VGFyZ2V0IG9yIDxodG1sPlxuICAgIHJldHVybjtcbiAgfVxuICByZXR1cm4gZmluZEZyb21QYXRoKHJlc3QsIGNyaXRlcmlhLCBjdXJyZW50VGFyZ2V0KTtcbn1cblxuLy8gU2VhcmNoIGZvciB0aGUgYWN0dWFsIHRhcmdldCBvZiBhIGRlbGVnYXRlZCBldmVudFxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRFbGVtZW50SW5FdmVudFBhdGgoZXYsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IGNyaXRlcmlhID0gdHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nXG4gICAgPyBzZWxlY3RvclxuICAgIDogZWwgPT4gZWwgaW5zdGFuY2VvZiBFbGVtZW50ICYmIGVsLm1hdGNoZXMoc2VsZWN0b3IpO1xuICByZXR1cm4gZmluZEZyb21QYXRoKGV2LmNvbXBvc2VkUGF0aCgpLCBjcml0ZXJpYSwgZXYuY3VycmVudFRhcmdldCk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaGFzUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3RJdGVtT2YoYXJyKSB7XG4gIHJldHVybiBhcnJbYXJyLmxlbmd0aCAtIDFdO1xufVxuXG4vLyBwdXNoIG9ubHkgdGhlIGl0ZW1zIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiBwdXNoVW5pcXVlKGFyciwgLi4uaXRlbXMpIHtcbiAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmIChhcnIuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXJyLnB1c2goaXRlbSk7XG4gIH0pO1xuICByZXR1cm4gYXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9BcnJheShzdHIsIHNlcGFyYXRvcikge1xuICAvLyBjb252ZXJ0IGVtcHR5IHN0cmluZyB0byBhbiBlbXB0eSBhcnJheVxuICByZXR1cm4gc3RyID8gc3RyLnNwbGl0KHNlcGFyYXRvcikgOiBbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5SYW5nZSh0ZXN0VmFsLCBtaW4sIG1heCkge1xuICBjb25zdCBtaW5PSyA9IG1pbiA9PT0gdW5kZWZpbmVkIHx8IHRlc3RWYWwgPj0gbWluO1xuICBjb25zdCBtYXhPSyA9IG1heCA9PT0gdW5kZWZpbmVkIHx8IHRlc3RWYWwgPD0gbWF4O1xuICByZXR1cm4gbWluT0sgJiYgbWF4T0s7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW1pdFRvUmFuZ2UodmFsLCBtaW4sIG1heCkge1xuICBpZiAodmFsIDwgbWluKSB7XG4gICAgcmV0dXJuIG1pbjtcbiAgfVxuICBpZiAodmFsID4gbWF4KSB7XG4gICAgcmV0dXJuIG1heDtcbiAgfVxuICByZXR1cm4gdmFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGFnUmVwZWF0KHRhZ05hbWUsIHJlcGVhdCwgYXR0cmlidXRlcyA9IHt9LCBpbmRleCA9IDAsIGh0bWwgPSAnJykge1xuICBjb25zdCBvcGVuVGFnU3JjID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykucmVkdWNlKChzcmMsIGF0dHIpID0+IHtcbiAgICBsZXQgdmFsID0gYXR0cmlidXRlc1thdHRyXTtcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsID0gdmFsKGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGAke3NyY30gJHthdHRyfT1cIiR7dmFsfVwiYDtcbiAgfSwgdGFnTmFtZSk7XG4gIGh0bWwgKz0gYDwke29wZW5UYWdTcmN9PjwvJHt0YWdOYW1lfT5gO1xuXG4gIGNvbnN0IG5leHQgPSBpbmRleCArIDE7XG4gIHJldHVybiBuZXh0IDwgcmVwZWF0XG4gICAgPyBjcmVhdGVUYWdSZXBlYXQodGFnTmFtZSwgcmVwZWF0LCBhdHRyaWJ1dGVzLCBuZXh0LCBodG1sKVxuICAgIDogaHRtbDtcbn1cblxuLy8gUmVtb3ZlIHRoZSBzcGFjaW5nIHN1cnJvdW5kaW5nIHRhZ3MgZm9yIEhUTUwgcGFyc2VyIG5vdCB0byBjcmVhdGUgdGV4dCBub2Rlc1xuLy8gYmVmb3JlL2FmdGVyIGVsZW1lbnRzXG5leHBvcnQgZnVuY3Rpb24gb3B0aW1pemVUZW1wbGF0ZUhUTUwoaHRtbCkge1xuICByZXR1cm4gaHRtbC5yZXBsYWNlKC8+XFxzKy9nLCAnPicpLnJlcGxhY2UoL1xccys8LywgJzwnKTtcbn1cbiIsIi8vIGNvbmZpZyBvcHRpb25zIHVwZGF0YWJsZSBieSBzZXRPcHRpb25zKCkgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgYXV0b2hpZGU6IGZhbHNlLFxuICBiZWZvcmVTaG93RGF5OiBudWxsLFxuICBiZWZvcmVTaG93RGVjYWRlOiBudWxsLFxuICBiZWZvcmVTaG93TW9udGg6IG51bGwsXG4gIGJlZm9yZVNob3dZZWFyOiBudWxsLFxuICBjYWxlbmRhcldlZWtzOiBmYWxzZSxcbiAgY2xlYXJCdG46IGZhbHNlLFxuICBkYXRlRGVsaW1pdGVyOiAnLCcsXG4gIGRhdGVzRGlzYWJsZWQ6IFtdLFxuICBkYXlzT2ZXZWVrRGlzYWJsZWQ6IFtdLFxuICBkYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQ6IFtdLFxuICBkZWZhdWx0Vmlld0RhdGU6IHVuZGVmaW5lZCwgLy8gcGxhY2Vob2xkZXIsIGRlZmF1bHRzIHRvIHRvZGF5KCkgYnkgdGhlIHByb2dyYW1cbiAgZGlzYWJsZVRvdWNoS2V5Ym9hcmQ6IGZhbHNlLFxuICBmb3JtYXQ6ICdtbS9kZC95eXl5JyxcbiAgbGFuZ3VhZ2U6ICdlbicsXG4gIG1heERhdGU6IG51bGwsXG4gIG1heE51bWJlck9mRGF0ZXM6IDEsXG4gIG1heFZpZXc6IDMsXG4gIG1pbkRhdGU6IG51bGwsXG4gIG5leHRBcnJvdzogJ8K7JyxcbiAgb3JpZW50YXRpb246ICdhdXRvJyxcbiAgcGlja0xldmVsOiAwLFxuICBwcmV2QXJyb3c6ICfCqycsXG4gIHNob3dEYXlzT2ZXZWVrOiB0cnVlLFxuICBzaG93T25DbGljazogdHJ1ZSxcbiAgc2hvd09uRm9jdXM6IHRydWUsXG4gIHN0YXJ0VmlldzogMCxcbiAgdGl0bGU6ICcnLFxuICB0b2RheUJ0bjogZmFsc2UsXG4gIHRvZGF5QnRuTW9kZTogMCxcbiAgdG9kYXlIaWdobGlnaHQ6IGZhbHNlLFxuICB1cGRhdGVPbkJsdXI6IHRydWUsXG4gIHdlZWtTdGFydDogMCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRPcHRpb25zO1xuIiwiaW1wb3J0IHtoYXNQcm9wZXJ0eSwgcHVzaFVuaXF1ZX0gZnJvbSAnLi4vbGliL3V0aWxzLmpzJztcbmltcG9ydCB7ZGF0ZVZhbHVlLCByZWd1bGFyaXplRGF0ZX0gZnJvbSAnLi4vbGliL2RhdGUuanMnO1xuaW1wb3J0IHtyZUZvcm1hdFRva2VucywgcGFyc2VEYXRlfSBmcm9tICcuLi9saWIvZGF0ZS1mb3JtYXQuanMnO1xuaW1wb3J0IHtwYXJzZUhUTUx9IGZyb20gJy4uL2xpYi9kb20uanMnO1xuaW1wb3J0IGRlZmF1bHRPcHRpb25zIGZyb20gJy4vZGVmYXVsdE9wdGlvbnMuanMnO1xuXG5jb25zdCB7XG4gIGxhbmd1YWdlOiBkZWZhdWx0TGFuZyxcbiAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICB3ZWVrU3RhcnQ6IGRlZmF1bHRXZWVrU3RhcnQsXG59ID0gZGVmYXVsdE9wdGlvbnM7XG5cbi8vIFJlZHVjZXIgZnVuY3Rpb24gdG8gZmlsdGVyIG91dCBpbnZhbGlkIGRheS1vZi13ZWVrIGZyb20gdGhlIGlucHV0XG5mdW5jdGlvbiBzYW5pdGl6ZURPVyhkb3csIGRheSkge1xuICByZXR1cm4gZG93Lmxlbmd0aCA8IDYgJiYgZGF5ID49IDAgJiYgZGF5IDwgN1xuICAgID8gcHVzaFVuaXF1ZShkb3csIGRheSlcbiAgICA6IGRvdztcbn1cblxuZnVuY3Rpb24gY2FsY0VuZE9mV2VlayhzdGFydE9mV2Vlaykge1xuICByZXR1cm4gKHN0YXJ0T2ZXZWVrICsgNikgJSA3O1xufVxuXG4vLyB2YWxpZGF0ZSBpbnB1dCBkYXRlLiBpZiBpbnZhbGlkLCBmYWxsYmFjayB0byB0aGUgb3JpZ2luYWwgdmFsdWVcbmZ1bmN0aW9uIHZhbGlkYXRlRGF0ZSh2YWx1ZSwgZm9ybWF0LCBsb2NhbGUsIG9yaWdWYWx1ZSkge1xuICBjb25zdCBkYXRlID0gcGFyc2VEYXRlKHZhbHVlLCBmb3JtYXQsIGxvY2FsZSk7XG4gIHJldHVybiBkYXRlICE9PSB1bmRlZmluZWQgPyBkYXRlIDogb3JpZ1ZhbHVlO1xufVxuXG4vLyBWYWxpZGF0ZSB2aWV3SWQuIGlmIGludmFsaWQsIGZhbGxiYWNrIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZVxuZnVuY3Rpb24gdmFsaWRhdGVWaWV3SWQodmFsdWUsIG9yaWdWYWx1ZSwgbWF4ID0gMykge1xuICBjb25zdCB2aWV3SWQgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICByZXR1cm4gdmlld0lkID49IDAgJiYgdmlld0lkIDw9IG1heCA/IHZpZXdJZCA6IG9yaWdWYWx1ZTtcbn1cblxuLy8gQ3JlYXRlIERhdGVwaWNrZXIgY29uZmlndXJhdGlvbiB0byBzZXRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb2Nlc3NPcHRpb25zKG9wdGlvbnMsIGRhdGVwaWNrZXIpIHtcbiAgY29uc3QgaW5PcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG4gIGNvbnN0IGNvbmZpZyA9IHt9O1xuICBjb25zdCBsb2NhbGVzID0gZGF0ZXBpY2tlci5jb25zdHJ1Y3Rvci5sb2NhbGVzO1xuICBjb25zdCByYW5nZVNpZGVJbmRleCA9IGRhdGVwaWNrZXIucmFuZ2VTaWRlSW5kZXg7XG4gIGxldCB7XG4gICAgZm9ybWF0LFxuICAgIGxhbmd1YWdlLFxuICAgIGxvY2FsZSxcbiAgICBtYXhEYXRlLFxuICAgIG1heFZpZXcsXG4gICAgbWluRGF0ZSxcbiAgICBwaWNrTGV2ZWwsXG4gICAgc3RhcnRWaWV3LFxuICAgIHdlZWtTdGFydCxcbiAgfSA9IGRhdGVwaWNrZXIuY29uZmlnIHx8IHt9O1xuXG4gIGlmIChpbk9wdHMubGFuZ3VhZ2UpIHtcbiAgICBsZXQgbGFuZztcbiAgICBpZiAoaW5PcHRzLmxhbmd1YWdlICE9PSBsYW5ndWFnZSkge1xuICAgICAgaWYgKGxvY2FsZXNbaW5PcHRzLmxhbmd1YWdlXSkge1xuICAgICAgICBsYW5nID0gaW5PcHRzLmxhbmd1YWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgbGFuZ2F1Z2UgKyByZWdpb24gdGFnIGNhbiBmYWxsYmFjayB0byB0aGUgb25lIHdpdGhvdXRcbiAgICAgICAgLy8gcmVnaW9uIChlLmcuIGZyLUNBIOKGkiBmcilcbiAgICAgICAgbGFuZyA9IGluT3B0cy5sYW5ndWFnZS5zcGxpdCgnLScpWzBdO1xuICAgICAgICBpZiAobG9jYWxlc1tsYW5nXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGFuZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZSBpbk9wdHMubGFuZ3VhZ2U7XG4gICAgaWYgKGxhbmcpIHtcbiAgICAgIGxhbmd1YWdlID0gY29uZmlnLmxhbmd1YWdlID0gbGFuZztcblxuICAgICAgLy8gdXBkYXRlIGxvY2FsZSBhcyB3ZWxsIHdoZW4gdXBkYXRpbmcgbGFuZ3VhZ2VcbiAgICAgIGNvbnN0IG9yaWdMb2NhbGUgPSBsb2NhbGUgfHwgbG9jYWxlc1tkZWZhdWx0TGFuZ107XG4gICAgICAvLyB1c2UgZGVmYXVsdCBsYW5ndWFnZSdzIHByb3BlcnRpZXMgZm9yIHRoZSBmYWxsYmFja1xuICAgICAgbG9jYWxlID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICAgICAgd2Vla1N0YXJ0OiBkZWZhdWx0V2Vla1N0YXJ0XG4gICAgICB9LCBsb2NhbGVzW2RlZmF1bHRMYW5nXSk7XG4gICAgICBpZiAobGFuZ3VhZ2UgIT09IGRlZmF1bHRMYW5nKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24obG9jYWxlLCBsb2NhbGVzW2xhbmd1YWdlXSk7XG4gICAgICB9XG4gICAgICBjb25maWcubG9jYWxlID0gbG9jYWxlO1xuICAgICAgLy8gaWYgZm9ybWF0IGFuZC9vciB3ZWVrU3RhcnQgYXJlIHRoZSBzYW1lIGFzIG9sZCBsb2NhbGUncyBkZWZhdWx0cyxcbiAgICAgIC8vIHVwZGF0ZSB0aGVtIHRvIG5ldyBsb2NhbGUncyBkZWZhdWx0c1xuICAgICAgaWYgKGZvcm1hdCA9PT0gb3JpZ0xvY2FsZS5mb3JtYXQpIHtcbiAgICAgICAgZm9ybWF0ID0gY29uZmlnLmZvcm1hdCA9IGxvY2FsZS5mb3JtYXQ7XG4gICAgICB9XG4gICAgICBpZiAod2Vla1N0YXJ0ID09PSBvcmlnTG9jYWxlLndlZWtTdGFydCkge1xuICAgICAgICB3ZWVrU3RhcnQgPSBjb25maWcud2Vla1N0YXJ0ID0gbG9jYWxlLndlZWtTdGFydDtcbiAgICAgICAgY29uZmlnLndlZWtFbmQgPSBjYWxjRW5kT2ZXZWVrKGxvY2FsZS53ZWVrU3RhcnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbk9wdHMuZm9ybWF0KSB7XG4gICAgY29uc3QgaGFzVG9EaXNwbGF5ID0gdHlwZW9mIGluT3B0cy5mb3JtYXQudG9EaXNwbGF5ID09PSAnZnVuY3Rpb24nO1xuICAgIGNvbnN0IGhhc1RvVmFsdWUgPSB0eXBlb2YgaW5PcHRzLmZvcm1hdC50b1ZhbHVlID09PSAnZnVuY3Rpb24nO1xuICAgIGNvbnN0IHZhbGlkRm9ybWF0U3RyaW5nID0gcmVGb3JtYXRUb2tlbnMudGVzdChpbk9wdHMuZm9ybWF0KTtcbiAgICBpZiAoKGhhc1RvRGlzcGxheSAmJiBoYXNUb1ZhbHVlKSB8fCB2YWxpZEZvcm1hdFN0cmluZykge1xuICAgICAgZm9ybWF0ID0gY29uZmlnLmZvcm1hdCA9IGluT3B0cy5mb3JtYXQ7XG4gICAgfVxuICAgIGRlbGV0ZSBpbk9wdHMuZm9ybWF0O1xuICB9XG5cbiAgLy8qKiogcGljayBsZXZlbCAqKiovL1xuICBsZXQgbmV3UGlja0xldmVsID0gcGlja0xldmVsO1xuICBpZiAoaW5PcHRzLnBpY2tMZXZlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbmV3UGlja0xldmVsID0gdmFsaWRhdGVWaWV3SWQoaW5PcHRzLnBpY2tMZXZlbCwgMik7XG4gICAgZGVsZXRlIGluT3B0cy5waWNrTGV2ZWw7XG4gIH1cbiAgaWYgKG5ld1BpY2tMZXZlbCAhPT0gcGlja0xldmVsKSB7XG4gICAgaWYgKG5ld1BpY2tMZXZlbCA+IHBpY2tMZXZlbCkge1xuICAgICAgLy8gY29tcGxlbWVudCBjdXJyZW50IG1pbkRhdGUvbWFkRGF0ZSBzbyB0aGF0IHRoZSBleGlzdGluZyByYW5nZSB3aWxsIGJlXG4gICAgICAvLyBleHBhbmRlZCB0byBmaXQgdGhlIG5ldyBsZXZlbCBsYXRlclxuICAgICAgaWYgKGluT3B0cy5taW5EYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaW5PcHRzLm1pbkRhdGUgPSBtaW5EYXRlO1xuICAgICAgfVxuICAgICAgaWYgKGluT3B0cy5tYXhEYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaW5PcHRzLm1heERhdGUgPSBtYXhEYXRlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBjb21wbGVtZW50IGRhdGVzRGlzYWJsZWQgc28gdGhhdCBpdCB3aWxsIGJlIHJlc2V0IGxhdGVyXG4gICAgaWYgKCFpbk9wdHMuZGF0ZXNEaXNhYmxlZCkge1xuICAgICAgaW5PcHRzLmRhdGVzRGlzYWJsZWQgPSBbXTtcbiAgICB9XG4gICAgcGlja0xldmVsID0gY29uZmlnLnBpY2tMZXZlbCA9IG5ld1BpY2tMZXZlbDtcbiAgfVxuXG4gIC8vKioqIGRhdGVzICoqKi8vXG4gIC8vIHdoaWxlIG1pbiBhbmQgbWF4RGF0ZSBmb3IgXCJubyBsaW1pdFwiIGluIHRoZSBvcHRpb25zIGFyZSBiZXR0ZXIgdG8gYmUgbnVsbFxuICAvLyAoZXNwZWNpYWxseSB3aGVuIHVwZGF0aW5nKSwgdGhlIG9uZXMgaW4gdGhlIGNvbmZpZyBoYXZlIHRvIGJlIHVuZGVmaW5lZFxuICAvLyBiZWNhdXNlIG51bGwgaXMgdHJlYXRlZCBhcyAwICg9IHVuaXggZXBvY2gpIHdoZW4gY29tcGFyaW5nIHdpdGggdGltZSB2YWx1ZVxuICBsZXQgbWluRHQgPSBtaW5EYXRlO1xuICBsZXQgbWF4RHQgPSBtYXhEYXRlO1xuICBpZiAoaW5PcHRzLm1pbkRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGRlZmF1bHRNaW5EdCA9IGRhdGVWYWx1ZSgwLCAwLCAxKTtcbiAgICBtaW5EdCA9IGluT3B0cy5taW5EYXRlID09PSBudWxsXG4gICAgICA/IGRlZmF1bHRNaW5EdCAgLy8gc2V0IDAwMDAtMDEtMDEgdG8gcHJldmVudCBuZWdhdGl2ZSB2YWx1ZXMgZm9yIHllYXJcbiAgICAgIDogdmFsaWRhdGVEYXRlKGluT3B0cy5taW5EYXRlLCBmb3JtYXQsIGxvY2FsZSwgbWluRHQpO1xuICAgIGlmIChtaW5EdCAhPT0gZGVmYXVsdE1pbkR0KSB7XG4gICAgICBtaW5EdCA9IHJlZ3VsYXJpemVEYXRlKG1pbkR0LCBwaWNrTGV2ZWwsIGZhbHNlKTtcbiAgICB9XG4gICAgZGVsZXRlIGluT3B0cy5taW5EYXRlO1xuICB9XG4gIGlmIChpbk9wdHMubWF4RGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbWF4RHQgPSBpbk9wdHMubWF4RGF0ZSA9PT0gbnVsbFxuICAgICAgPyB1bmRlZmluZWRcbiAgICAgIDogdmFsaWRhdGVEYXRlKGluT3B0cy5tYXhEYXRlLCBmb3JtYXQsIGxvY2FsZSwgbWF4RHQpO1xuICAgIGlmIChtYXhEdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBtYXhEdCA9IHJlZ3VsYXJpemVEYXRlKG1heER0LCBwaWNrTGV2ZWwsIHRydWUpO1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLm1heERhdGU7XG4gIH1cbiAgaWYgKG1heER0IDwgbWluRHQpIHtcbiAgICBtaW5EYXRlID0gY29uZmlnLm1pbkRhdGUgPSBtYXhEdDtcbiAgICBtYXhEYXRlID0gY29uZmlnLm1heERhdGUgPSBtaW5EdDtcbiAgfSBlbHNlIHtcbiAgICBpZiAobWluRGF0ZSAhPT0gbWluRHQpIHtcbiAgICAgIG1pbkRhdGUgPSBjb25maWcubWluRGF0ZSA9IG1pbkR0O1xuICAgIH1cbiAgICBpZiAobWF4RGF0ZSAhPT0gbWF4RHQpIHtcbiAgICAgIG1heERhdGUgPSBjb25maWcubWF4RGF0ZSA9IG1heER0O1xuICAgIH1cbiAgfVxuXG4gIGlmIChpbk9wdHMuZGF0ZXNEaXNhYmxlZCkge1xuICAgIGNvbmZpZy5kYXRlc0Rpc2FibGVkID0gaW5PcHRzLmRhdGVzRGlzYWJsZWQucmVkdWNlKChkYXRlcywgZHQpID0+IHtcbiAgICAgIGNvbnN0IGRhdGUgPSBwYXJzZURhdGUoZHQsIGZvcm1hdCwgbG9jYWxlKTtcbiAgICAgIHJldHVybiBkYXRlICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBwdXNoVW5pcXVlKGRhdGVzLCByZWd1bGFyaXplRGF0ZShkYXRlLCBwaWNrTGV2ZWwsIHJhbmdlU2lkZUluZGV4KSlcbiAgICAgICAgOiBkYXRlcztcbiAgICB9LCBbXSk7XG4gICAgZGVsZXRlIGluT3B0cy5kYXRlc0Rpc2FibGVkO1xuICB9XG4gIGlmIChpbk9wdHMuZGVmYXVsdFZpZXdEYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCB2aWV3RGF0ZSA9IHBhcnNlRGF0ZShpbk9wdHMuZGVmYXVsdFZpZXdEYXRlLCBmb3JtYXQsIGxvY2FsZSk7XG4gICAgaWYgKHZpZXdEYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbmZpZy5kZWZhdWx0Vmlld0RhdGUgPSB2aWV3RGF0ZTtcbiAgICB9XG4gICAgZGVsZXRlIGluT3B0cy5kZWZhdWx0Vmlld0RhdGU7XG4gIH1cblxuICAvLyoqKiBkYXlzIG9mIHdlZWsgKioqLy9cbiAgaWYgKGluT3B0cy53ZWVrU3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IHdrU3RhcnQgPSBOdW1iZXIoaW5PcHRzLndlZWtTdGFydCkgJSA3O1xuICAgIGlmICghaXNOYU4od2tTdGFydCkpIHtcbiAgICAgIHdlZWtTdGFydCA9IGNvbmZpZy53ZWVrU3RhcnQgPSB3a1N0YXJ0O1xuICAgICAgY29uZmlnLndlZWtFbmQgPSBjYWxjRW5kT2ZXZWVrKHdrU3RhcnQpO1xuICAgIH1cbiAgICBkZWxldGUgaW5PcHRzLndlZWtTdGFydDtcbiAgfVxuICBpZiAoaW5PcHRzLmRheXNPZldlZWtEaXNhYmxlZCkge1xuICAgIGNvbmZpZy5kYXlzT2ZXZWVrRGlzYWJsZWQgPSBpbk9wdHMuZGF5c09mV2Vla0Rpc2FibGVkLnJlZHVjZShzYW5pdGl6ZURPVywgW10pO1xuICAgIGRlbGV0ZSBpbk9wdHMuZGF5c09mV2Vla0Rpc2FibGVkO1xuICB9XG4gIGlmIChpbk9wdHMuZGF5c09mV2Vla0hpZ2hsaWdodGVkKSB7XG4gICAgY29uZmlnLmRheXNPZldlZWtIaWdobGlnaHRlZCA9IGluT3B0cy5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQucmVkdWNlKHNhbml0aXplRE9XLCBbXSk7XG4gICAgZGVsZXRlIGluT3B0cy5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQ7XG4gIH1cblxuICAvLyoqKiBtdWx0aSBkYXRlICoqKi8vXG4gIGlmIChpbk9wdHMubWF4TnVtYmVyT2ZEYXRlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbWF4TnVtYmVyT2ZEYXRlcyA9IHBhcnNlSW50KGluT3B0cy5tYXhOdW1iZXJPZkRhdGVzLCAxMCk7XG4gICAgaWYgKG1heE51bWJlck9mRGF0ZXMgPj0gMCkge1xuICAgICAgY29uZmlnLm1heE51bWJlck9mRGF0ZXMgPSBtYXhOdW1iZXJPZkRhdGVzO1xuICAgICAgY29uZmlnLm11bHRpZGF0ZSA9IG1heE51bWJlck9mRGF0ZXMgIT09IDE7XG4gICAgfVxuICAgIGRlbGV0ZSBpbk9wdHMubWF4TnVtYmVyT2ZEYXRlcztcbiAgfVxuICBpZiAoaW5PcHRzLmRhdGVEZWxpbWl0ZXIpIHtcbiAgICBjb25maWcuZGF0ZURlbGltaXRlciA9IFN0cmluZyhpbk9wdHMuZGF0ZURlbGltaXRlcik7XG4gICAgZGVsZXRlIGluT3B0cy5kYXRlRGVsaW1pdGVyO1xuICB9XG5cbiAgLy8qKiogdmlldyAqKiovL1xuICBsZXQgbmV3TWF4VmlldyA9IG1heFZpZXc7XG4gIGlmIChpbk9wdHMubWF4VmlldyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbmV3TWF4VmlldyA9IHZhbGlkYXRlVmlld0lkKGluT3B0cy5tYXhWaWV3LCBtYXhWaWV3KTtcbiAgICBkZWxldGUgaW5PcHRzLm1heFZpZXc7XG4gIH1cbiAgLy8gZW5zdXJlIG1heCB2aWV3ID49IHBpY2sgbGV2ZWxcbiAgbmV3TWF4VmlldyA9IHBpY2tMZXZlbCA+IG5ld01heFZpZXcgPyBwaWNrTGV2ZWwgOiBuZXdNYXhWaWV3O1xuICBpZiAobmV3TWF4VmlldyAhPT0gbWF4Vmlldykge1xuICAgIG1heFZpZXcgPSBjb25maWcubWF4VmlldyA9IG5ld01heFZpZXc7XG4gIH1cblxuICBsZXQgbmV3U3RhcnRWaWV3ID0gc3RhcnRWaWV3O1xuICBpZiAoaW5PcHRzLnN0YXJ0VmlldyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbmV3U3RhcnRWaWV3ID0gdmFsaWRhdGVWaWV3SWQoaW5PcHRzLnN0YXJ0VmlldywgbmV3U3RhcnRWaWV3KTtcbiAgICBkZWxldGUgaW5PcHRzLnN0YXJ0VmlldztcbiAgfVxuICAvLyBlbnN1cmUgcGljayBsZXZlbCA8PSBzdGFydCB2aWV3IDw9IG1heCB2aWV3XG4gIGlmIChuZXdTdGFydFZpZXcgPCBwaWNrTGV2ZWwpIHtcbiAgICBuZXdTdGFydFZpZXcgPSBwaWNrTGV2ZWw7XG4gIH0gZWxzZSBpZiAobmV3U3RhcnRWaWV3ID4gbWF4Vmlldykge1xuICAgIG5ld1N0YXJ0VmlldyA9IG1heFZpZXc7XG4gIH1cbiAgaWYgKG5ld1N0YXJ0VmlldyAhPT0gc3RhcnRWaWV3KSB7XG4gICAgY29uZmlnLnN0YXJ0VmlldyA9IG5ld1N0YXJ0VmlldztcbiAgfVxuXG4gIC8vKioqIHRlbXBsYXRlICoqKi8vXG4gIGlmIChpbk9wdHMucHJldkFycm93KSB7XG4gICAgY29uc3QgcHJldkFycm93ID0gcGFyc2VIVE1MKGluT3B0cy5wcmV2QXJyb3cpO1xuICAgIGlmIChwcmV2QXJyb3cuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25maWcucHJldkFycm93ID0gcHJldkFycm93LmNoaWxkTm9kZXM7XG4gICAgfVxuICAgIGRlbGV0ZSBpbk9wdHMucHJldkFycm93O1xuICB9XG4gIGlmIChpbk9wdHMubmV4dEFycm93KSB7XG4gICAgY29uc3QgbmV4dEFycm93ID0gcGFyc2VIVE1MKGluT3B0cy5uZXh0QXJyb3cpO1xuICAgIGlmIChuZXh0QXJyb3cuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25maWcubmV4dEFycm93ID0gbmV4dEFycm93LmNoaWxkTm9kZXM7XG4gICAgfVxuICAgIGRlbGV0ZSBpbk9wdHMubmV4dEFycm93O1xuICB9XG5cbiAgLy8qKiogbWlzYyAqKiovL1xuICBpZiAoaW5PcHRzLmRpc2FibGVUb3VjaEtleWJvYXJkICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25maWcuZGlzYWJsZVRvdWNoS2V5Ym9hcmQgPSAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudCAmJiAhIWluT3B0cy5kaXNhYmxlVG91Y2hLZXlib2FyZDtcbiAgICBkZWxldGUgaW5PcHRzLmRpc2FibGVUb3VjaEtleWJvYXJkO1xuICB9XG4gIGlmIChpbk9wdHMub3JpZW50YXRpb24pIHtcbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IGluT3B0cy5vcmllbnRhdGlvbi50b0xvd2VyQ2FzZSgpLnNwbGl0KC9cXHMrL2cpO1xuICAgIGNvbmZpZy5vcmllbnRhdGlvbiA9IHtcbiAgICAgIHg6IG9yaWVudGF0aW9uLmZpbmQoeCA9PiAoeCA9PT0gJ2xlZnQnIHx8IHggPT09ICdyaWdodCcpKSB8fCAnYXV0bycsXG4gICAgICB5OiBvcmllbnRhdGlvbi5maW5kKHkgPT4gKHkgPT09ICd0b3AnIHx8IHkgPT09ICdib3R0b20nKSkgfHwgJ2F1dG8nLFxuICAgIH07XG4gICAgZGVsZXRlIGluT3B0cy5vcmllbnRhdGlvbjtcbiAgfVxuICBpZiAoaW5PcHRzLnRvZGF5QnRuTW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgc3dpdGNoKGluT3B0cy50b2RheUJ0bk1vZGUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgY29uZmlnLnRvZGF5QnRuTW9kZSA9IGluT3B0cy50b2RheUJ0bk1vZGU7XG4gICAgfVxuICAgIGRlbGV0ZSBpbk9wdHMudG9kYXlCdG5Nb2RlO1xuICB9XG5cbiAgLy8qKiogY29weSB0aGUgcmVzdCAqKiovL1xuICBPYmplY3Qua2V5cyhpbk9wdHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChpbk9wdHNba2V5XSAhPT0gdW5kZWZpbmVkICYmIGhhc1Byb3BlcnR5KGRlZmF1bHRPcHRpb25zLCBrZXkpKSB7XG4gICAgICBjb25maWdba2V5XSA9IGluT3B0c1trZXldO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCB7aGFzUHJvcGVydHksIGxhc3RJdGVtT2YsIGlzSW5SYW5nZSwgbGltaXRUb1JhbmdlfSBmcm9tICcuLi9saWIvdXRpbHMuanMnO1xuaW1wb3J0IHt0b2RheX0gZnJvbSAnLi4vbGliL2RhdGUuanMnO1xuaW1wb3J0IHtwYXJzZUhUTUwsIGdldFBhcmVudCwgc2hvd0VsZW1lbnQsIGhpZGVFbGVtZW50LCBlbXB0eUNoaWxkTm9kZXN9IGZyb20gJy4uL2xpYi9kb20uanMnO1xuaW1wb3J0IHtyZWdpc3Rlckxpc3RlbmVyc30gZnJvbSAnLi4vbGliL2V2ZW50LmpzJztcbmltcG9ydCBwaWNrZXJUZW1wbGF0ZSBmcm9tICcuL3RlbXBsYXRlcy9waWNrZXJUZW1wbGF0ZS5qcyc7XG5pbXBvcnQgRGF5c1ZpZXcgZnJvbSAnLi92aWV3cy9EYXlzVmlldy5qcyc7XG5pbXBvcnQgTW9udGhzVmlldyBmcm9tICcuL3ZpZXdzL01vbnRoc1ZpZXcuanMnO1xuaW1wb3J0IFllYXJzVmlldyBmcm9tICcuL3ZpZXdzL1llYXJzVmlldy5qcyc7XG5pbXBvcnQge3RyaWdnZXJEYXRlcGlja2VyRXZlbnR9IGZyb20gJy4uL2V2ZW50cy9mdW5jdGlvbnMuanMnO1xuaW1wb3J0IHtcbiAgb25DbGlja1RvZGF5QnRuLFxuICBvbkNsaWNrQ2xlYXJCdG4sXG4gIG9uQ2xpY2tWaWV3U3dpdGNoLFxuICBvbkNsaWNrUHJldkJ0bixcbiAgb25DbGlja05leHRCdG4sXG4gIG9uQ2xpY2tWaWV3LFxuICBvbk1vdXNlZG93blBpY2tlcixcbn0gZnJvbSAnLi4vZXZlbnRzL3BpY2tlckxpc3RlbmVycy5qcyc7XG5cbmNvbnN0IG9yaWVudENsYXNzZXMgPSBbJ2xlZnQnLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbSddLnJlZHVjZSgob2JqLCBrZXkpID0+IHtcbiAgb2JqW2tleV0gPSBgZGF0ZXBpY2tlci1vcmllbnQtJHtrZXl9YDtcbiAgcmV0dXJuIG9iajtcbn0sIHt9KTtcbmNvbnN0IHRvUHggPSBudW0gPT4gbnVtID8gYCR7bnVtfXB4YCA6IG51bTtcblxuZnVuY3Rpb24gcHJvY2Vzc1BpY2tlck9wdGlvbnMocGlja2VyLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zLnRpdGxlICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAob3B0aW9ucy50aXRsZSkge1xuICAgICAgcGlja2VyLmNvbnRyb2xzLnRpdGxlLnRleHRDb250ZW50ID0gb3B0aW9ucy50aXRsZTtcbiAgICAgIHNob3dFbGVtZW50KHBpY2tlci5jb250cm9scy50aXRsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBpY2tlci5jb250cm9scy50aXRsZS50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgaGlkZUVsZW1lbnQocGlja2VyLmNvbnRyb2xzLnRpdGxlKTtcbiAgICB9XG4gIH1cbiAgaWYgKG9wdGlvbnMucHJldkFycm93KSB7XG4gICAgY29uc3QgcHJldkJ0biA9IHBpY2tlci5jb250cm9scy5wcmV2QnRuO1xuICAgIGVtcHR5Q2hpbGROb2RlcyhwcmV2QnRuKTtcbiAgICBvcHRpb25zLnByZXZBcnJvdy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBwcmV2QnRuLmFwcGVuZENoaWxkKG5vZGUuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB9KTtcbiAgfVxuICBpZiAob3B0aW9ucy5uZXh0QXJyb3cpIHtcbiAgICBjb25zdCBuZXh0QnRuID0gcGlja2VyLmNvbnRyb2xzLm5leHRCdG47XG4gICAgZW1wdHlDaGlsZE5vZGVzKG5leHRCdG4pO1xuICAgIG9wdGlvbnMubmV4dEFycm93LmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIG5leHRCdG4uYXBwZW5kQ2hpbGQobm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIH0pO1xuICB9XG4gIGlmIChvcHRpb25zLmxvY2FsZSkge1xuICAgIHBpY2tlci5jb250cm9scy50b2RheUJ0bi50ZXh0Q29udGVudCA9IG9wdGlvbnMubG9jYWxlLnRvZGF5O1xuICAgIHBpY2tlci5jb250cm9scy5jbGVhckJ0bi50ZXh0Q29udGVudCA9IG9wdGlvbnMubG9jYWxlLmNsZWFyO1xuICB9XG4gIGlmIChvcHRpb25zLnRvZGF5QnRuICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAob3B0aW9ucy50b2RheUJ0bikge1xuICAgICAgc2hvd0VsZW1lbnQocGlja2VyLmNvbnRyb2xzLnRvZGF5QnRuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUVsZW1lbnQocGlja2VyLmNvbnRyb2xzLnRvZGF5QnRuKTtcbiAgICB9XG4gIH1cbiAgaWYgKGhhc1Byb3BlcnR5KG9wdGlvbnMsICdtaW5EYXRlJykgfHwgaGFzUHJvcGVydHkob3B0aW9ucywgJ21heERhdGUnKSkge1xuICAgIGNvbnN0IHttaW5EYXRlLCBtYXhEYXRlfSA9IHBpY2tlci5kYXRlcGlja2VyLmNvbmZpZztcbiAgICBwaWNrZXIuY29udHJvbHMudG9kYXlCdG4uZGlzYWJsZWQgPSAhaXNJblJhbmdlKHRvZGF5KCksIG1pbkRhdGUsIG1heERhdGUpO1xuICB9XG4gIGlmIChvcHRpb25zLmNsZWFyQnRuICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAob3B0aW9ucy5jbGVhckJ0bikge1xuICAgICAgc2hvd0VsZW1lbnQocGlja2VyLmNvbnRyb2xzLmNsZWFyQnRuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUVsZW1lbnQocGlja2VyLmNvbnRyb2xzLmNsZWFyQnRuKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gQ29tcHV0ZSB2aWV3IGRhdGUgdG8gcmVzZXQsIHdoaWNoIHdpbGwgYmUuLi5cbi8vIC0gdGhlIGxhc3QgaXRlbSBvZiB0aGUgc2VsZWN0ZWQgZGF0ZXMgb3IgZGVmYXVsdFZpZXdEYXRlIGlmIG5vIHNlbGVjdGlvblxuLy8gLSBsaW1pdHRlZCB0byBtaW5EYXRlIG9yIG1heERhdGUgaWYgaXQgZXhjZWVkcyB0aGUgcmFuZ2VcbmZ1bmN0aW9uIGNvbXB1dGVSZXNldFZpZXdEYXRlKGRhdGVwaWNrZXIpIHtcbiAgY29uc3Qge2RhdGVzLCBjb25maWd9ID0gZGF0ZXBpY2tlcjtcbiAgY29uc3Qgdmlld0RhdGUgPSBkYXRlcy5sZW5ndGggPiAwID8gbGFzdEl0ZW1PZihkYXRlcykgOiBjb25maWcuZGVmYXVsdFZpZXdEYXRlO1xuICByZXR1cm4gbGltaXRUb1JhbmdlKHZpZXdEYXRlLCBjb25maWcubWluRGF0ZSwgY29uZmlnLm1heERhdGUpO1xufVxuXG4vLyBDaGFuZ2UgY3VycmVudCB2aWV3J3MgdmlldyBkYXRlXG5mdW5jdGlvbiBzZXRWaWV3RGF0ZShwaWNrZXIsIG5ld0RhdGUpIHtcbiAgY29uc3Qgb2xkVmlld0RhdGUgPSBuZXcgRGF0ZShwaWNrZXIudmlld0RhdGUpO1xuICBjb25zdCBuZXdWaWV3RGF0ZSA9IG5ldyBEYXRlKG5ld0RhdGUpO1xuICBjb25zdCB7aWQsIHllYXIsIGZpcnN0LCBsYXN0fSA9IHBpY2tlci5jdXJyZW50VmlldztcbiAgY29uc3Qgdmlld1llYXIgPSBuZXdWaWV3RGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIHBpY2tlci52aWV3RGF0ZSA9IG5ld0RhdGU7XG4gIGlmICh2aWV3WWVhciAhPT0gb2xkVmlld0RhdGUuZ2V0RnVsbFllYXIoKSkge1xuICAgIHRyaWdnZXJEYXRlcGlja2VyRXZlbnQocGlja2VyLmRhdGVwaWNrZXIsICdjaGFuZ2VZZWFyJyk7XG4gIH1cbiAgaWYgKG5ld1ZpZXdEYXRlLmdldE1vbnRoKCkgIT09IG9sZFZpZXdEYXRlLmdldE1vbnRoKCkpIHtcbiAgICB0cmlnZ2VyRGF0ZXBpY2tlckV2ZW50KHBpY2tlci5kYXRlcGlja2VyLCAnY2hhbmdlTW9udGgnKTtcbiAgfVxuXG4gIC8vIHJldHVybiB3aGV0aGVyIHRoZSBuZXcgZGF0ZSBpcyBpbiBkaWZmZXJlbnQgcGVyaW9kIG9uIHRpbWUgZnJvbSB0aGUgb25lXG4gIC8vIGRpc3BsYXllZCBpbiB0aGUgY3VycmVudCB2aWV3XG4gIC8vIHdoZW4gdHJ1ZSwgdGhlIHZpZXcgbmVlZHMgdG8gYmUgcmUtcmVuZGVyZWQgb24gdGhlIG5leHQgVUkgcmVmcmVzaC5cbiAgc3dpdGNoIChpZCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBuZXdEYXRlIDwgZmlyc3QgfHwgbmV3RGF0ZSA+IGxhc3Q7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHZpZXdZZWFyICE9PSB5ZWFyO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdmlld1llYXIgPCBmaXJzdCB8fCB2aWV3WWVhciA+IGxhc3Q7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGV4dERpcmVjdGlvbihlbCkge1xuICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmRpcmVjdGlvbjtcbn1cblxuLy8gZmluZCB0aGUgY2xvc2V0IHNjcm9sbGFibGUgYW5jZXN0b3IgZWxlbW50IHVuZGVyIHRoZSBib2R5XG5mdW5jdGlvbiBmaW5kU2Nyb2xsUGFyZW50cyhlbCkge1xuICBjb25zdCBwYXJlbnQgPSBnZXRQYXJlbnQoZWwpO1xuICBpZiAocGFyZW50ID09PSBkb2N1bWVudC5ib2R5IHx8ICFwYXJlbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBjaGVja2luZyBvdmVyZmxvdyBvbmx5IGlzIGVub3VnaCBiZWNhdXNlIGNvbXB1dGVkIG92ZXJmbG93IGNhbm5vdCBiZVxuICAvLyB2aXNpYmxlIG9yIGEgY29tYmluYXRpb24gb2YgdmlzaWJsZSBhbmQgb3RoZXIgd2hlbiBlaXRoZXIgYXhpcyBpcyBzZXRcbiAgLy8gdG8gb3RoZXIgdGhhbiB2aXNpYmxlLlxuICAvLyAoU2V0dGluZyBvbmUgYXhpcyB0byBvdGhlciB0aGFuICd2aXNpYmxlJyB3aGlsZSB0aGUgb3RoZXIgaXMgJ3Zpc2libGUnXG4gIC8vIHJlc3VsdHMgaW4gdGhlIG90aGVyIGF4aXMgdHVybmluZyB0byAnYXV0bycpXG4gIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnQpLm92ZXJmbG93ICE9PSAndmlzaWJsZSdcbiAgICA/IHBhcmVudFxuICAgIDogZmluZFNjcm9sbFBhcmVudHMocGFyZW50KTtcbn1cblxuLy8gQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBwaWNrZXIgVUlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpY2tlciB7XG4gIGNvbnN0cnVjdG9yKGRhdGVwaWNrZXIpIHtcbiAgICBjb25zdCB7Y29uZmlnfSA9IHRoaXMuZGF0ZXBpY2tlciA9IGRhdGVwaWNrZXI7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHBpY2tlclRlbXBsYXRlLnJlcGxhY2UoLyVidXR0b25DbGFzcyUvZywgY29uZmlnLmJ1dHRvbkNsYXNzKTtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50ID0gcGFyc2VIVE1MKHRlbXBsYXRlKS5maXJzdENoaWxkO1xuICAgIGNvbnN0IFtoZWFkZXIsIG1haW4sIGZvb3Rlcl0gPSBlbGVtZW50LmZpcnN0Q2hpbGQuY2hpbGRyZW47XG4gICAgY29uc3QgdGl0bGUgPSBoZWFkZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgW3ByZXZCdG4sIHZpZXdTd2l0Y2gsIG5leHRCdG5dID0gaGVhZGVyLmxhc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW47XG4gICAgY29uc3QgW3RvZGF5QnRuLCBjbGVhckJ0bl0gPSBmb290ZXIuZmlyc3RDaGlsZC5jaGlsZHJlbjtcbiAgICBjb25zdCBjb250cm9scyA9IHtcbiAgICAgIHRpdGxlLFxuICAgICAgcHJldkJ0bixcbiAgICAgIHZpZXdTd2l0Y2gsXG4gICAgICBuZXh0QnRuLFxuICAgICAgdG9kYXlCdG4sXG4gICAgICBjbGVhckJ0bixcbiAgICB9O1xuICAgIHRoaXMubWFpbiA9IG1haW47XG4gICAgdGhpcy5jb250cm9scyA9IGNvbnRyb2xzO1xuXG4gICAgY29uc3QgZWxlbWVudENsYXNzID0gZGF0ZXBpY2tlci5pbmxpbmUgPyAnaW5saW5lJyA6ICdkcm9wZG93bic7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGBkYXRlcGlja2VyLSR7ZWxlbWVudENsYXNzfWApO1xuXG4gICAgcHJvY2Vzc1BpY2tlck9wdGlvbnModGhpcywgY29uZmlnKTtcbiAgICB0aGlzLnZpZXdEYXRlID0gY29tcHV0ZVJlc2V0Vmlld0RhdGUoZGF0ZXBpY2tlcik7XG5cbiAgICAvLyBzZXQgdXAgZXZlbnQgbGlzdGVuZXJzXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcnMoZGF0ZXBpY2tlciwgW1xuICAgICAgW2VsZW1lbnQsICdtb3VzZWRvd24nLCBvbk1vdXNlZG93blBpY2tlcl0sXG4gICAgICBbbWFpbiwgJ2NsaWNrJywgb25DbGlja1ZpZXcuYmluZChudWxsLCBkYXRlcGlja2VyKV0sXG4gICAgICBbY29udHJvbHMudmlld1N3aXRjaCwgJ2NsaWNrJywgb25DbGlja1ZpZXdTd2l0Y2guYmluZChudWxsLCBkYXRlcGlja2VyKV0sXG4gICAgICBbY29udHJvbHMucHJldkJ0biwgJ2NsaWNrJywgb25DbGlja1ByZXZCdG4uYmluZChudWxsLCBkYXRlcGlja2VyKV0sXG4gICAgICBbY29udHJvbHMubmV4dEJ0biwgJ2NsaWNrJywgb25DbGlja05leHRCdG4uYmluZChudWxsLCBkYXRlcGlja2VyKV0sXG4gICAgICBbY29udHJvbHMudG9kYXlCdG4sICdjbGljaycsIG9uQ2xpY2tUb2RheUJ0bi5iaW5kKG51bGwsIGRhdGVwaWNrZXIpXSxcbiAgICAgIFtjb250cm9scy5jbGVhckJ0biwgJ2NsaWNrJywgb25DbGlja0NsZWFyQnRuLmJpbmQobnVsbCwgZGF0ZXBpY2tlcildLFxuICAgIF0pO1xuXG4gICAgLy8gc2V0IHVwIHZpZXdzXG4gICAgdGhpcy52aWV3cyA9IFtcbiAgICAgIG5ldyBEYXlzVmlldyh0aGlzKSxcbiAgICAgIG5ldyBNb250aHNWaWV3KHRoaXMpLFxuICAgICAgbmV3IFllYXJzVmlldyh0aGlzLCB7aWQ6IDIsIG5hbWU6ICd5ZWFycycsIGNlbGxDbGFzczogJ3llYXInLCBzdGVwOiAxfSksXG4gICAgICBuZXcgWWVhcnNWaWV3KHRoaXMsIHtpZDogMywgbmFtZTogJ2RlY2FkZXMnLCBjZWxsQ2xhc3M6ICdkZWNhZGUnLCBzdGVwOiAxMH0pLFxuICAgIF07XG4gICAgdGhpcy5jdXJyZW50VmlldyA9IHRoaXMudmlld3NbY29uZmlnLnN0YXJ0Vmlld107XG5cbiAgICB0aGlzLmN1cnJlbnRWaWV3LnJlbmRlcigpO1xuICAgIHRoaXMubWFpbi5hcHBlbmRDaGlsZCh0aGlzLmN1cnJlbnRWaWV3LmVsZW1lbnQpO1xuICAgIGlmIChjb25maWcuY29udGFpbmVyKSB7XG4gICAgICBjb25maWcuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVwaWNrZXIuaW5wdXRGaWVsZC5hZnRlcih0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHByb2Nlc3NQaWNrZXJPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMudmlld3MuZm9yRWFjaCgodmlldykgPT4ge1xuICAgICAgdmlldy5pbml0KG9wdGlvbnMsIGZhbHNlKTtcbiAgICB9KTtcbiAgICB0aGlzLmN1cnJlbnRWaWV3LnJlbmRlcigpO1xuICB9XG5cbiAgZGV0YWNoKCkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge2RhdGVwaWNrZXIsIGVsZW1lbnR9ID0gdGhpcztcbiAgICBpZiAoZGF0ZXBpY2tlci5pbmxpbmUpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVuc3VyZSBwaWNrZXIncyBkaXJlY3Rpb24gbWF0Y2hlcyBpbnB1dCdzXG4gICAgICBjb25zdCBpbnB1dERpcmVjdGlvbiA9IGdldFRleHREaXJlY3Rpb24oZGF0ZXBpY2tlci5pbnB1dEZpZWxkKTtcbiAgICAgIGlmIChpbnB1dERpcmVjdGlvbiAhPT0gZ2V0VGV4dERpcmVjdGlvbihnZXRQYXJlbnQoZWxlbWVudCkpKSB7XG4gICAgICAgIGVsZW1lbnQuZGlyID0gaW5wdXREaXJlY3Rpb247XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQuZGlyKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkaXInKTtcbiAgICAgIH1cblxuICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmxpdHkgPSAnaGlkZGVuJztcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB0aGlzLnBsYWNlKCk7XG4gICAgICBlbGVtZW50LnN0eWxlLnZpc2libGl0eSA9ICcnO1xuXG4gICAgICBpZiAoZGF0ZXBpY2tlci5jb25maWcuZGlzYWJsZVRvdWNoS2V5Ym9hcmQpIHtcbiAgICAgICAgZGF0ZXBpY2tlci5pbnB1dEZpZWxkLmJsdXIoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHRyaWdnZXJEYXRlcGlja2VyRXZlbnQoZGF0ZXBpY2tlciwgJ3Nob3cnKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRhdGVwaWNrZXIuZXhpdEVkaXRNb2RlKCk7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgdHJpZ2dlckRhdGVwaWNrZXJFdmVudCh0aGlzLmRhdGVwaWNrZXIsICdoaWRlJyk7XG4gIH1cblxuICBwbGFjZSgpIHtcbiAgICBjb25zdCB7Y2xhc3NMaXN0LCBvZmZzZXRQYXJlbnQsIHN0eWxlfSA9IHRoaXMuZWxlbWVudDtcbiAgICBjb25zdCB7Y29uZmlnLCBpbnB1dEZpZWxkfSA9IHRoaXMuZGF0ZXBpY2tlcjtcbiAgICBjb25zdCB7XG4gICAgICB3aWR0aDogY2FsZW5kYXJXaWR0aCxcbiAgICAgIGhlaWdodDogY2FsZW5kYXJIZWlnaHQsXG4gICAgfSA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB7XG4gICAgICBsZWZ0OiBpbnB1dExlZnQsXG4gICAgICB0b3A6IGlucHV0VG9wLFxuICAgICAgcmlnaHQ6IGlucHV0UmlnaHQsXG4gICAgICBib3R0b206IGlucHV0Qm90dG9tLFxuICAgICAgd2lkdGg6IGlucHV0V2lkdGgsXG4gICAgICBoZWlnaHQ6IGlucHV0SGVpZ2h0XG4gICAgfSA9IGlucHV0RmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IHt4OiBvcmllbnRYLCB5OiBvcmllbnRZfSA9IGNvbmZpZy5vcmllbnRhdGlvbjtcbiAgICBsZXQgbGVmdCA9IGlucHV0TGVmdDtcbiAgICBsZXQgdG9wID0gaW5wdXRUb3A7XG5cbiAgICAvLyBjYWxpY3VsYXRlIG9mZnNldExlZnQvVG9wIG9mIGlucHV0RmllbGRcbiAgICBpZiAob2Zmc2V0UGFyZW50ID09PSBkb2N1bWVudC5ib2R5IHx8ICFvZmZzZXRQYXJlbnQpIHtcbiAgICAgIGxlZnQgKz0gd2luZG93LnNjcm9sbFg7XG4gICAgICB0b3AgKz0gd2luZG93LnNjcm9sbFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9mZnNldFBhcmVudFJlY3QgPSBvZmZzZXRQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBsZWZ0IC09IG9mZnNldFBhcmVudFJlY3QubGVmdCAtIG9mZnNldFBhcmVudC5zY3JvbGxMZWZ0O1xuICAgICAgdG9wIC09IG9mZnNldFBhcmVudFJlY3QudG9wIC0gb2Zmc2V0UGFyZW50LnNjcm9sbFRvcDtcbiAgICB9XG5cbiAgICAvLyBjYWxpY3VsYXRlIHRoZSBib3VuZGFyaWVzIG9mIHRoZSB2aXNpYmxlIGFyZWEgdGhhdCBjb250YWlucyBpbnB1dEZpZWxkXG4gICAgY29uc3Qgc2Nyb2xsUGFyZW50ID0gZmluZFNjcm9sbFBhcmVudHMoaW5wdXRGaWVsZCk7XG4gICAgbGV0IHNjcm9sbEFyZWFMZWZ0ID0gMDtcbiAgICBsZXQgc2Nyb2xsQXJlYVRvcCA9IDA7XG4gICAgbGV0IHtcbiAgICAgIGNsaWVudFdpZHRoOiBzY3JvbGxBcmVhUmlnaHQsXG4gICAgICBjbGllbnRIZWlnaHQ6IHNjcm9sbEFyZWFCb3R0b20sXG4gICAgfSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIGlmIChzY3JvbGxQYXJlbnQpIHtcbiAgICAgIGNvbnN0IHNjcm9sbFBhcmVudFJlY3QgPSBzY3JvbGxQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoc2Nyb2xsUGFyZW50UmVjdC50b3AgPiAwKSB7XG4gICAgICAgIHNjcm9sbEFyZWFUb3AgPSBzY3JvbGxQYXJlbnRSZWN0LnRvcDtcbiAgICAgIH1cbiAgICAgIGlmIChzY3JvbGxQYXJlbnRSZWN0LmxlZnQgPiAwKSB7XG4gICAgICAgIHNjcm9sbEFyZWFMZWZ0ID0gc2Nyb2xsUGFyZW50UmVjdC5sZWZ0O1xuICAgICAgfVxuICAgICAgaWYgKHNjcm9sbFBhcmVudFJlY3QucmlnaHQgPCBzY3JvbGxBcmVhUmlnaHQpIHtcbiAgICAgICAgc2Nyb2xsQXJlYVJpZ2h0ID0gc2Nyb2xsUGFyZW50UmVjdC5yaWdodDtcbiAgICAgIH1cbiAgICAgIGlmIChzY3JvbGxQYXJlbnRSZWN0LmJvdHRvbSA8IHNjcm9sbEFyZWFCb3R0b20pIHtcbiAgICAgICAgc2Nyb2xsQXJlYUJvdHRvbSA9IHNjcm9sbFBhcmVudFJlY3QuYm90dG9tO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRldGVybWluZSB0aGUgaG9yaXpvbnRhbCBvcmllbnRhdGlvbiBhbmQgbGVmdCBwb3NpdGlvblxuICAgIGxldCBhZGp1c3RtZW50ID0gMDtcbiAgICBpZiAob3JpZW50WCA9PT0gJ2F1dG8nKSB7XG4gICAgICBpZiAoaW5wdXRMZWZ0IDwgc2Nyb2xsQXJlYUxlZnQpIHtcbiAgICAgICAgb3JpZW50WCA9ICdsZWZ0JztcbiAgICAgICAgYWRqdXN0bWVudCA9IHNjcm9sbEFyZWFMZWZ0IC0gaW5wdXRMZWZ0O1xuICAgICAgfSBlbHNlIGlmIChpbnB1dExlZnQgKyBjYWxlbmRhcldpZHRoID4gc2Nyb2xsQXJlYVJpZ2h0KSB7XG4gICAgICAgIG9yaWVudFggPSAncmlnaHQnO1xuICAgICAgICBpZiAoc2Nyb2xsQXJlYVJpZ2h0IDwgaW5wdXRSaWdodCkge1xuICAgICAgICAgIGFkanVzdG1lbnQgPSBzY3JvbGxBcmVhUmlnaHQgLSBpbnB1dFJpZ2h0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGdldFRleHREaXJlY3Rpb24oaW5wdXRGaWVsZCkgPT09ICdydGwnKSB7XG4gICAgICAgIG9yaWVudFggPSBpbnB1dFJpZ2h0IC0gY2FsZW5kYXJXaWR0aCA8IHNjcm9sbEFyZWFMZWZ0ID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9yaWVudFggPSAnbGVmdCc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcmllbnRYID09PSAncmlnaHQnKSB7XG4gICAgICBsZWZ0ICs9IGlucHV0V2lkdGggLSBjYWxlbmRhcldpZHRoO1xuICAgIH1cbiAgICBsZWZ0ICs9IGFkanVzdG1lbnQ7XG5cbiAgICAvLyBkZXRlcm1pbmUgdGhlIHZlcnRpY2FsIG9yaWVudGF0aW9uIGFuZCB0b3AgcG9zaXRpb25cbiAgICBpZiAob3JpZW50WSA9PT0gJ2F1dG8nKSB7XG4gICAgICBpZiAoaW5wdXRUb3AgLSBjYWxlbmRhckhlaWdodCA+IHNjcm9sbEFyZWFUb3ApIHtcbiAgICAgICAgb3JpZW50WSA9IGlucHV0Qm90dG9tICsgY2FsZW5kYXJIZWlnaHQgPiBzY3JvbGxBcmVhQm90dG9tID8gJ3RvcCcgOiAnYm90dG9tJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9yaWVudFkgPSAnYm90dG9tJztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9yaWVudFkgPT09ICd0b3AnKSB7XG4gICAgICB0b3AgLT0gY2FsZW5kYXJIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvcCArPSBpbnB1dEhlaWdodDtcbiAgICB9XG5cbiAgICBjbGFzc0xpc3QucmVtb3ZlKC4uLk9iamVjdC52YWx1ZXMob3JpZW50Q2xhc3NlcykpO1xuICAgIGNsYXNzTGlzdC5hZGQob3JpZW50Q2xhc3Nlc1tvcmllbnRYXSwgb3JpZW50Q2xhc3Nlc1tvcmllbnRZXSk7XG5cbiAgICBzdHlsZS5sZWZ0ID0gdG9QeChsZWZ0KTtcbiAgICBzdHlsZS50b3AgPSB0b1B4KHRvcCk7XG4gIH1cblxuICBzZXRWaWV3U3dpdGNoTGFiZWwobGFiZWxUZXh0KSB7XG4gICAgdGhpcy5jb250cm9scy52aWV3U3dpdGNoLnRleHRDb250ZW50ID0gbGFiZWxUZXh0O1xuICB9XG5cbiAgc2V0UHJldkJ0bkRpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5jb250cm9scy5wcmV2QnRuLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICBzZXROZXh0QnRuRGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLmNvbnRyb2xzLm5leHRCdG4uZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgfVxuXG4gIGNoYW5nZVZpZXcodmlld0lkKSB7XG4gICAgY29uc3Qgb2xkVmlldyA9IHRoaXMuY3VycmVudFZpZXc7XG4gICAgY29uc3QgbmV3VmlldyA9ICB0aGlzLnZpZXdzW3ZpZXdJZF07XG4gICAgaWYgKG5ld1ZpZXcuaWQgIT09IG9sZFZpZXcuaWQpIHtcbiAgICAgIHRoaXMuY3VycmVudFZpZXcgPSBuZXdWaWV3O1xuICAgICAgdGhpcy5fcmVuZGVyTWV0aG9kID0gJ3JlbmRlcic7XG4gICAgICB0cmlnZ2VyRGF0ZXBpY2tlckV2ZW50KHRoaXMuZGF0ZXBpY2tlciwgJ2NoYW5nZVZpZXcnKTtcbiAgICAgIHRoaXMubWFpbi5yZXBsYWNlQ2hpbGQobmV3Vmlldy5lbGVtZW50LCBvbGRWaWV3LmVsZW1lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIENoYW5nZSB0aGUgZm9jdXNlZCBkYXRlICh2aWV3IGRhdGUpXG4gIGNoYW5nZUZvY3VzKG5ld1ZpZXdEYXRlKSB7XG4gICAgdGhpcy5fcmVuZGVyTWV0aG9kID0gc2V0Vmlld0RhdGUodGhpcywgbmV3Vmlld0RhdGUpID8gJ3JlbmRlcicgOiAncmVmcmVzaEZvY3VzJztcbiAgICB0aGlzLnZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcbiAgICAgIHZpZXcudXBkYXRlRm9jdXMoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIEFwcGx5IHRoZSBjaGFuZ2Ugb2YgdGhlIHNlbGVjdGVkIGRhdGVzXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBuZXdWaWV3RGF0ZSA9IGNvbXB1dGVSZXNldFZpZXdEYXRlKHRoaXMuZGF0ZXBpY2tlcik7XG4gICAgdGhpcy5fcmVuZGVyTWV0aG9kID0gc2V0Vmlld0RhdGUodGhpcywgbmV3Vmlld0RhdGUpID8gJ3JlbmRlcicgOiAncmVmcmVzaCc7XG4gICAgdGhpcy52aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XG4gICAgICB2aWV3LnVwZGF0ZUZvY3VzKCk7XG4gICAgICB2aWV3LnVwZGF0ZVNlbGVjdGlvbigpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gUmVmcmVzaCB0aGUgcGlja2VyIFVJXG4gIHJlbmRlcihxdWlja1JlbmRlciA9IHRydWUpIHtcbiAgICBjb25zdCByZW5kZXJNZXRob2QgPSAocXVpY2tSZW5kZXIgJiYgdGhpcy5fcmVuZGVyTWV0aG9kKSB8fCAncmVuZGVyJztcbiAgICBkZWxldGUgdGhpcy5fcmVuZGVyTWV0aG9kO1xuXG4gICAgdGhpcy5jdXJyZW50Vmlld1tyZW5kZXJNZXRob2RdKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7Y3JlYXRlVGFnUmVwZWF0LCBvcHRpbWl6ZVRlbXBsYXRlSFRNTH0gZnJvbSAnLi4vLi4vbGliL3V0aWxzLmpzJztcblxuY29uc3QgY2FsZW5kYXJXZWVrc1RlbXBsYXRlID0gb3B0aW1pemVUZW1wbGF0ZUhUTUwoYDxkaXYgY2xhc3M9XCJjYWxlbmRhci13ZWVrc1wiPlxuICA8ZGl2IGNsYXNzPVwiZGF5cy1vZi13ZWVrXCI+PHNwYW4gY2xhc3M9XCJkb3dcIj48L3NwYW4+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ3ZWVrc1wiPiR7Y3JlYXRlVGFnUmVwZWF0KCdzcGFuJywgNiwge2NsYXNzOiAnd2Vlayd9KX08L2Rpdj5cbjwvZGl2PmApO1xuXG5leHBvcnQgZGVmYXVsdCBjYWxlbmRhcldlZWtzVGVtcGxhdGU7XG4iLCJpbXBvcnQge2NyZWF0ZVRhZ1JlcGVhdCwgb3B0aW1pemVUZW1wbGF0ZUhUTUx9IGZyb20gJy4uLy4uL2xpYi91dGlscy5qcyc7XG5cbmNvbnN0IGRheXNUZW1wbGF0ZSA9IG9wdGltaXplVGVtcGxhdGVIVE1MKGA8ZGl2IGNsYXNzPVwiZGF5c1wiPlxuICA8ZGl2IGNsYXNzPVwiZGF5cy1vZi13ZWVrXCI+JHtjcmVhdGVUYWdSZXBlYXQoJ3NwYW4nLCA3LCB7Y2xhc3M6ICdkb3cnfSl9PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWdyaWRcIj4ke2NyZWF0ZVRhZ1JlcGVhdCgnc3BhbicsIDQyKX08L2Rpdj5cbjwvZGl2PmApO1xuXG5leHBvcnQgZGVmYXVsdCBkYXlzVGVtcGxhdGU7XG4iLCJpbXBvcnQge29wdGltaXplVGVtcGxhdGVIVE1MfSBmcm9tICcuLi8uLi9saWIvdXRpbHMuanMnO1xuXG5jb25zdCBwaWNrZXJUZW1wbGF0ZSA9IG9wdGltaXplVGVtcGxhdGVIVE1MKGA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlclwiPlxuICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1waWNrZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1oZWFkZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLXRpdGxlXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1jb250cm9sc1wiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiVidXR0b25DbGFzcyUgcHJldi1idG5cIj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIlYnV0dG9uQ2xhc3MlIHZpZXctc3dpdGNoXCI+PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJWJ1dHRvbkNsYXNzJSBuZXh0LWJ0blwiPjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItbWFpblwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWZvb3RlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItY29udHJvbHNcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIlYnV0dG9uQ2xhc3MlIHRvZGF5LWJ0blwiPjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiVidXR0b25DbGFzcyUgY2xlYXItYnRuXCI+PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5gKTtcblxuZXhwb3J0IGRlZmF1bHQgcGlja2VyVGVtcGxhdGU7XG4iLCJpbXBvcnQge2hhc1Byb3BlcnR5LCBwdXNoVW5pcXVlfSBmcm9tICcuLi8uLi9saWIvdXRpbHMuanMnO1xuaW1wb3J0IHt0b2RheSwgZGF0ZVZhbHVlLCBhZGREYXlzLCBhZGRXZWVrcywgZGF5T2ZUaGVXZWVrT2YsIGdldFdlZWt9IGZyb20gJy4uLy4uL2xpYi9kYXRlLmpzJztcbmltcG9ydCB7Zm9ybWF0RGF0ZX0gZnJvbSAnLi4vLi4vbGliL2RhdGUtZm9ybWF0LmpzJztcbmltcG9ydCB7cGFyc2VIVE1MLCBzaG93RWxlbWVudCwgaGlkZUVsZW1lbnR9IGZyb20gJy4uLy4uL2xpYi9kb20uanMnO1xuaW1wb3J0IGRheXNUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvZGF5c1RlbXBsYXRlLmpzJztcbmltcG9ydCBjYWxlbmRhcldlZWtzVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL2NhbGVuZGFyV2Vla3NUZW1wbGF0ZS5qcyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXlzVmlldyBleHRlbmRzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihwaWNrZXIpIHtcbiAgICBzdXBlcihwaWNrZXIsIHtcbiAgICAgIGlkOiAwLFxuICAgICAgbmFtZTogJ2RheXMnLFxuICAgICAgY2VsbENsYXNzOiAnZGF5JyxcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQob3B0aW9ucywgb25Db25zdHJ1Y3Rpb24gPSB0cnVlKSB7XG4gICAgaWYgKG9uQ29uc3RydWN0aW9uKSB7XG4gICAgICBjb25zdCBpbm5lciA9IHBhcnNlSFRNTChkYXlzVGVtcGxhdGUpLmZpcnN0Q2hpbGQ7XG4gICAgICB0aGlzLmRvdyA9IGlubmVyLmZpcnN0Q2hpbGQ7XG4gICAgICB0aGlzLmdyaWQgPSBpbm5lci5sYXN0Q2hpbGQ7XG4gICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuICAgIH1cbiAgICBzdXBlci5pbml0KG9wdGlvbnMpO1xuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgbGV0IHVwZGF0ZURPVztcblxuICAgIGlmIChoYXNQcm9wZXJ0eShvcHRpb25zLCAnbWluRGF0ZScpKSB7XG4gICAgICB0aGlzLm1pbkRhdGUgPSBvcHRpb25zLm1pbkRhdGU7XG4gICAgfVxuICAgIGlmIChoYXNQcm9wZXJ0eShvcHRpb25zLCAnbWF4RGF0ZScpKSB7XG4gICAgICB0aGlzLm1heERhdGUgPSBvcHRpb25zLm1heERhdGU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmRhdGVzRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZGF0ZXNEaXNhYmxlZCA9IG9wdGlvbnMuZGF0ZXNEaXNhYmxlZDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZGF5c09mV2Vla0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmRheXNPZldlZWtEaXNhYmxlZCA9IG9wdGlvbnMuZGF5c09mV2Vla0Rpc2FibGVkO1xuICAgICAgdXBkYXRlRE9XID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZGF5c09mV2Vla0hpZ2hsaWdodGVkKSB7XG4gICAgICB0aGlzLmRheXNPZldlZWtIaWdobGlnaHRlZCA9IG9wdGlvbnMuZGF5c09mV2Vla0hpZ2hsaWdodGVkO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy50b2RheUhpZ2hsaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnRvZGF5SGlnaGxpZ2h0ID0gb3B0aW9ucy50b2RheUhpZ2hsaWdodDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMud2Vla1N0YXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMud2Vla1N0YXJ0ID0gb3B0aW9ucy53ZWVrU3RhcnQ7XG4gICAgICB0aGlzLndlZWtFbmQgPSBvcHRpb25zLndlZWtFbmQ7XG4gICAgICB1cGRhdGVET1cgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5sb2NhbGUpIHtcbiAgICAgIGNvbnN0IGxvY2FsZSA9IHRoaXMubG9jYWxlID0gb3B0aW9ucy5sb2NhbGU7XG4gICAgICB0aGlzLmRheU5hbWVzID0gbG9jYWxlLmRheXNNaW47XG4gICAgICB0aGlzLnN3aXRjaExhYmVsRm9ybWF0ID0gbG9jYWxlLnRpdGxlRm9ybWF0O1xuICAgICAgdXBkYXRlRE9XID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuYmVmb3JlU2hvd0RheSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmJlZm9yZVNob3cgPSB0eXBlb2Ygb3B0aW9ucy5iZWZvcmVTaG93RGF5ID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gb3B0aW9ucy5iZWZvcmVTaG93RGF5XG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmNhbGVuZGFyV2Vla3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG9wdGlvbnMuY2FsZW5kYXJXZWVrcyAmJiAhdGhpcy5jYWxlbmRhcldlZWtzKSB7XG4gICAgICAgIGNvbnN0IHdlZWtzRWxlbSA9IHBhcnNlSFRNTChjYWxlbmRhcldlZWtzVGVtcGxhdGUpLmZpcnN0Q2hpbGQ7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJXZWVrcyA9IHtcbiAgICAgICAgICBlbGVtZW50OiB3ZWVrc0VsZW0sXG4gICAgICAgICAgZG93OiB3ZWVrc0VsZW0uZmlyc3RDaGlsZCxcbiAgICAgICAgICB3ZWVrczogd2Vla3NFbGVtLmxhc3RDaGlsZCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbGVtZW50Lmluc2VydEJlZm9yZSh3ZWVrc0VsZW0sIHRoaXMuZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jYWxlbmRhcldlZWtzICYmICFvcHRpb25zLmNhbGVuZGFyV2Vla3MpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuY2FsZW5kYXJXZWVrcy5lbGVtZW50KTtcbiAgICAgICAgdGhpcy5jYWxlbmRhcldlZWtzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2hvd0RheXNPZldlZWsgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG9wdGlvbnMuc2hvd0RheXNPZldlZWspIHtcbiAgICAgICAgc2hvd0VsZW1lbnQodGhpcy5kb3cpO1xuICAgICAgICBpZiAodGhpcy5jYWxlbmRhcldlZWtzKSB7XG4gICAgICAgICAgc2hvd0VsZW1lbnQodGhpcy5jYWxlbmRhcldlZWtzLmRvdyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhpZGVFbGVtZW50KHRoaXMuZG93KTtcbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXJXZWVrcykge1xuICAgICAgICAgIGhpZGVFbGVtZW50KHRoaXMuY2FsZW5kYXJXZWVrcy5kb3cpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGRheXMtb2Ytd2VlayB3aGVuIGxvY2FsZSwgZGF5c09md2Vla0Rpc2FibGVkIG9yIHdlZWtTdGFydCBpcyBjaGFuZ2VkXG4gICAgaWYgKHVwZGF0ZURPVykge1xuICAgICAgQXJyYXkuZnJvbSh0aGlzLmRvdy5jaGlsZHJlbikuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGRvdyA9ICh0aGlzLndlZWtTdGFydCArIGluZGV4KSAlIDc7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gdGhpcy5kYXlOYW1lc1tkb3ddO1xuICAgICAgICBlbC5jbGFzc05hbWUgPSB0aGlzLmRheXNPZldlZWtEaXNhYmxlZC5pbmNsdWRlcyhkb3cpID8gJ2RvdyBkaXNhYmxlZCcgOiAnZG93JztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFwcGx5IHVwZGF0ZSBvbiB0aGUgZm9jdXNlZCBkYXRlIHRvIHZpZXcncyBzZXR0aW5nc1xuICB1cGRhdGVGb2N1cygpIHtcbiAgICBjb25zdCB2aWV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMucGlja2VyLnZpZXdEYXRlKTtcbiAgICBjb25zdCB2aWV3WWVhciA9IHZpZXdEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3Qgdmlld01vbnRoID0gdmlld0RhdGUuZ2V0TW9udGgoKTtcbiAgICBjb25zdCBmaXJzdE9mTW9udGggPSBkYXRlVmFsdWUodmlld1llYXIsIHZpZXdNb250aCwgMSk7XG4gICAgY29uc3Qgc3RhcnQgPSBkYXlPZlRoZVdlZWtPZihmaXJzdE9mTW9udGgsIHRoaXMud2Vla1N0YXJ0LCB0aGlzLndlZWtTdGFydCk7XG5cbiAgICB0aGlzLmZpcnN0ID0gZmlyc3RPZk1vbnRoO1xuICAgIHRoaXMubGFzdCA9IGRhdGVWYWx1ZSh2aWV3WWVhciwgdmlld01vbnRoICsgMSwgMCk7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuZm9jdXNlZCA9IHRoaXMucGlja2VyLnZpZXdEYXRlO1xuICB9XG5cbiAgLy8gQXBwbHkgdXBkYXRlIG9uIHRoZSBzZWxlY3RlZCBkYXRlcyB0byB2aWV3J3Mgc2V0dGluZ3NcbiAgdXBkYXRlU2VsZWN0aW9uKCkge1xuICAgIGNvbnN0IHtkYXRlcywgcmFuZ2VwaWNrZXJ9ID0gdGhpcy5waWNrZXIuZGF0ZXBpY2tlcjtcbiAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZXM7XG4gICAgaWYgKHJhbmdlcGlja2VyKSB7XG4gICAgICB0aGlzLnJhbmdlID0gcmFuZ2VwaWNrZXIuZGF0ZXM7XG4gICAgfVxuICB9XG5cbiAgIC8vIFVwZGF0ZSB0aGUgZW50aXJlIHZpZXcgVUlcbiAgcmVuZGVyKCkge1xuICAgIC8vIHVwZGF0ZSB0b2RheSBtYXJrZXIgb24gZXZlciByZW5kZXJcbiAgICB0aGlzLnRvZGF5ID0gdGhpcy50b2RheUhpZ2hsaWdodCA/IHRvZGF5KCkgOiB1bmRlZmluZWQ7XG4gICAgLy8gcmVmcmVzaCBkaXNhYmxlZCBkYXRlcyBvbiBldmVyeSByZW5kZXIgaW4gb3JkZXIgdG8gY2xlYXIgdGhlIG9uZXMgYWRkZWRcbiAgICAvLyBieSBiZWZvcmVTaG93IGhvb2sgYXQgcHJldmlvdXMgcmVuZGVyXG4gICAgdGhpcy5kaXNhYmxlZCA9IFsuLi50aGlzLmRhdGVzRGlzYWJsZWRdO1xuXG4gICAgY29uc3Qgc3dpdGNoTGFiZWwgPSBmb3JtYXREYXRlKHRoaXMuZm9jdXNlZCwgdGhpcy5zd2l0Y2hMYWJlbEZvcm1hdCwgdGhpcy5sb2NhbGUpO1xuICAgIHRoaXMucGlja2VyLnNldFZpZXdTd2l0Y2hMYWJlbChzd2l0Y2hMYWJlbCk7XG4gICAgdGhpcy5waWNrZXIuc2V0UHJldkJ0bkRpc2FibGVkKHRoaXMuZmlyc3QgPD0gdGhpcy5taW5EYXRlKTtcbiAgICB0aGlzLnBpY2tlci5zZXROZXh0QnRuRGlzYWJsZWQodGhpcy5sYXN0ID49IHRoaXMubWF4RGF0ZSk7XG5cbiAgICBpZiAodGhpcy5jYWxlbmRhcldlZWtzKSB7XG4gICAgICAvLyBzdGFydCBvZiB0aGUgVVRDIHdlZWsgKE1vbmRheSkgb2YgdGhlIDFzdCBvZiB0aGUgbW9udGhcbiAgICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gZGF5T2ZUaGVXZWVrT2YodGhpcy5maXJzdCwgMSwgMSk7XG4gICAgICBBcnJheS5mcm9tKHRoaXMuY2FsZW5kYXJXZWVrcy53ZWVrcy5jaGlsZHJlbikuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gZ2V0V2VlayhhZGRXZWVrcyhzdGFydE9mV2VlaywgaW5kZXgpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBBcnJheS5mcm9tKHRoaXMuZ3JpZC5jaGlsZHJlbikuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBjbGFzc0xpc3QgPSBlbC5jbGFzc0xpc3Q7XG4gICAgICBjb25zdCBjdXJyZW50ID0gYWRkRGF5cyh0aGlzLnN0YXJ0LCBpbmRleCk7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoY3VycmVudCk7XG4gICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERheSgpO1xuXG4gICAgICBlbC5jbGFzc05hbWUgPSBgZGF0ZXBpY2tlci1jZWxsICR7dGhpcy5jZWxsQ2xhc3N9YDtcbiAgICAgIGVsLmRhdGFzZXQuZGF0ZSA9IGN1cnJlbnQ7XG4gICAgICBlbC50ZXh0Q29udGVudCA9IGRhdGUuZ2V0RGF0ZSgpO1xuXG4gICAgICBpZiAoY3VycmVudCA8IHRoaXMuZmlyc3QpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncHJldicpO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50ID4gdGhpcy5sYXN0KSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ25leHQnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRvZGF5ID09PSBjdXJyZW50KSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3RvZGF5Jyk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA8IHRoaXMubWluRGF0ZSB8fCBjdXJyZW50ID4gdGhpcy5tYXhEYXRlIHx8IHRoaXMuZGlzYWJsZWQuaW5jbHVkZXMoY3VycmVudCkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRheXNPZldlZWtEaXNhYmxlZC5pbmNsdWRlcyhkYXkpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHB1c2hVbmlxdWUodGhpcy5kaXNhYmxlZCwgY3VycmVudCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kYXlzT2ZXZWVrSGlnaGxpZ2h0ZWQuaW5jbHVkZXMoZGF5KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdoaWdobGlnaHRlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgY29uc3QgW3JhbmdlU3RhcnQsIHJhbmdlRW5kXSA9IHRoaXMucmFuZ2U7XG4gICAgICAgIGlmIChjdXJyZW50ID4gcmFuZ2VTdGFydCAmJiBjdXJyZW50IDwgcmFuZ2VFbmQpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50ID09PSByYW5nZVN0YXJ0KSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2Utc3RhcnQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudCA9PT0gcmFuZ2VFbmQpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1lbmQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQuaW5jbHVkZXMoY3VycmVudCkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ID09PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5iZWZvcmVTaG93KSB7XG4gICAgICAgIHRoaXMucGVyZm9ybUJlZm9yZUhvb2soZWwsIGN1cnJlbnQsIGN1cnJlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSB2aWV3IFVJIGJ5IGFwcGx5aW5nIHRoZSBjaGFuZ2VzIG9mIHNlbGVjdGVkIGFuZCBmb2N1c2VkIGl0ZW1zXG4gIHJlZnJlc2goKSB7XG4gICAgY29uc3QgW3JhbmdlU3RhcnQsIHJhbmdlRW5kXSA9IHRoaXMucmFuZ2UgfHwgW107XG4gICAgdGhpcy5ncmlkXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgnLnJhbmdlLCAucmFuZ2Utc3RhcnQsIC5yYW5nZS1lbmQsIC5zZWxlY3RlZCwgLmZvY3VzZWQnKVxuICAgICAgLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3JhbmdlJywgJ3JhbmdlLXN0YXJ0JywgJ3JhbmdlLWVuZCcsICdzZWxlY3RlZCcsICdmb2N1c2VkJyk7XG4gICAgICB9KTtcbiAgICBBcnJheS5mcm9tKHRoaXMuZ3JpZC5jaGlsZHJlbikuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBOdW1iZXIoZWwuZGF0YXNldC5kYXRlKTtcbiAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgICAgIGlmIChjdXJyZW50ID4gcmFuZ2VTdGFydCAmJiBjdXJyZW50IDwgcmFuZ2VFbmQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ID09PSByYW5nZVN0YXJ0KSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLXN0YXJ0Jyk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA9PT0gcmFuZ2VFbmQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UtZW5kJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZC5pbmNsdWRlcyhjdXJyZW50KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMuZm9jdXNlZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIHZpZXcgVUkgYnkgYXBwbHlpbmcgdGhlIGNoYW5nZSBvZiBmb2N1c2VkIGl0ZW1cbiAgcmVmcmVzaEZvY3VzKCkge1xuICAgIGNvbnN0IGluZGV4ID0gTWF0aC5yb3VuZCgodGhpcy5mb2N1c2VkIC0gdGhpcy5zdGFydCkgLyA4NjQwMDAwMCk7XG4gICAgdGhpcy5ncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb2N1c2VkJykuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZvY3VzZWQnKTtcbiAgICB9KTtcbiAgICB0aGlzLmdyaWQuY2hpbGRyZW5baW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtoYXNQcm9wZXJ0eSwgcHVzaFVuaXF1ZSwgY3JlYXRlVGFnUmVwZWF0fSBmcm9tICcuLi8uLi9saWIvdXRpbHMuanMnO1xuaW1wb3J0IHtkYXRlVmFsdWV9IGZyb20gJy4uLy4uL2xpYi9kYXRlLmpzJztcbmltcG9ydCB7cGFyc2VIVE1MfSBmcm9tICcuLi8uLi9saWIvZG9tLmpzJztcbmltcG9ydCBWaWV3IGZyb20gJy4vVmlldy5qcyc7XG5cbmZ1bmN0aW9uIGNvbXB1dGVNb250aFJhbmdlKHJhbmdlLCB0aGlzWWVhcikge1xuICBpZiAoIXJhbmdlIHx8ICFyYW5nZVswXSB8fCAhcmFuZ2VbMV0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBbW3N0YXJ0WSwgc3RhcnRNXSwgW2VuZFksIGVuZE1dXSA9IHJhbmdlO1xuICBpZiAoc3RhcnRZID4gdGhpc1llYXIgfHwgZW5kWSA8IHRoaXNZZWFyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJldHVybiBbXG4gICAgc3RhcnRZID09PSB0aGlzWWVhciA/IHN0YXJ0TSA6IC0xLFxuICAgIGVuZFkgPT09IHRoaXNZZWFyID8gZW5kTSA6IDEyLFxuICBdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb250aHNWaWV3IGV4dGVuZHMgVmlldyB7XG4gIGNvbnN0cnVjdG9yKHBpY2tlcikge1xuICAgIHN1cGVyKHBpY2tlciwge1xuICAgICAgaWQ6IDEsXG4gICAgICBuYW1lOiAnbW9udGhzJyxcbiAgICAgIGNlbGxDbGFzczogJ21vbnRoJyxcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQob3B0aW9ucywgb25Db25zdHJ1Y3Rpb24gPSB0cnVlKSB7XG4gICAgaWYgKG9uQ29uc3RydWN0aW9uKSB7XG4gICAgICB0aGlzLmdyaWQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbW9udGhzJywgJ2RhdGVwaWNrZXItZ3JpZCcpO1xuICAgICAgdGhpcy5ncmlkLmFwcGVuZENoaWxkKHBhcnNlSFRNTChjcmVhdGVUYWdSZXBlYXQoJ3NwYW4nLCAxMiwgeydkYXRhLW1vbnRoJzogaXggPT4gaXh9KSkpO1xuICAgIH1cbiAgICBzdXBlci5pbml0KG9wdGlvbnMpO1xuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMubG9jYWxlKSB7XG4gICAgICB0aGlzLm1vbnRoTmFtZXMgPSBvcHRpb25zLmxvY2FsZS5tb250aHNTaG9ydDtcbiAgICB9XG4gICAgaWYgKGhhc1Byb3BlcnR5KG9wdGlvbnMsICdtaW5EYXRlJykpIHtcbiAgICAgIGlmIChvcHRpb25zLm1pbkRhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm1pblllYXIgPSB0aGlzLm1pbk1vbnRoID0gdGhpcy5taW5EYXRlID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWluRGF0ZU9iaiA9IG5ldyBEYXRlKG9wdGlvbnMubWluRGF0ZSk7XG4gICAgICAgIHRoaXMubWluWWVhciA9IG1pbkRhdGVPYmouZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdGhpcy5taW5Nb250aCA9IG1pbkRhdGVPYmouZ2V0TW9udGgoKTtcbiAgICAgICAgdGhpcy5taW5EYXRlID0gbWluRGF0ZU9iai5zZXREYXRlKDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaGFzUHJvcGVydHkob3B0aW9ucywgJ21heERhdGUnKSkge1xuICAgICAgaWYgKG9wdGlvbnMubWF4RGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubWF4WWVhciA9IHRoaXMubWF4TW9udGggPSB0aGlzLm1heERhdGUgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXhEYXRlT2JqID0gbmV3IERhdGUob3B0aW9ucy5tYXhEYXRlKTtcbiAgICAgICAgdGhpcy5tYXhZZWFyID0gbWF4RGF0ZU9iai5nZXRGdWxsWWVhcigpO1xuICAgICAgICB0aGlzLm1heE1vbnRoID0gbWF4RGF0ZU9iai5nZXRNb250aCgpO1xuICAgICAgICB0aGlzLm1heERhdGUgPSBkYXRlVmFsdWUodGhpcy5tYXhZZWFyLCB0aGlzLm1heE1vbnRoICsgMSwgMCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmlzTWluVmlldykge1xuICAgICAgaWYgKG9wdGlvbnMuZGF0ZXNEaXNhYmxlZCkge1xuICAgICAgICB0aGlzLmRhdGVzRGlzYWJsZWQgPSBvcHRpb25zLmRhdGVzRGlzYWJsZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0ZXNEaXNhYmxlZCA9IFtdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5iZWZvcmVTaG93TW9udGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5iZWZvcmVTaG93ID0gdHlwZW9mIG9wdGlvbnMuYmVmb3JlU2hvd01vbnRoID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gb3B0aW9ucy5iZWZvcmVTaG93TW9udGhcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIHZpZXcncyBzZXR0aW5ncyB0byByZWZsZWN0IHRoZSB2aWV3RGF0ZSBzZXQgb24gdGhlIHBpY2tlclxuICB1cGRhdGVGb2N1cygpIHtcbiAgICBjb25zdCB2aWV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMucGlja2VyLnZpZXdEYXRlKTtcbiAgICB0aGlzLnllYXIgPSB2aWV3RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIHRoaXMuZm9jdXNlZCA9IHZpZXdEYXRlLmdldE1vbnRoKCk7XG4gIH1cblxuICAvLyBVcGRhdGUgdmlldydzIHNldHRpbmdzIHRvIHJlZmxlY3QgdGhlIHNlbGVjdGVkIGRhdGVzXG4gIHVwZGF0ZVNlbGVjdGlvbigpIHtcbiAgICBjb25zdCB7ZGF0ZXMsIHJhbmdlcGlja2VyfSA9IHRoaXMucGlja2VyLmRhdGVwaWNrZXI7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGRhdGVzLnJlZHVjZSgoc2VsZWN0ZWQsIHRpbWVWYWx1ZSkgPT4ge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRpbWVWYWx1ZSk7XG4gICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICBpZiAoc2VsZWN0ZWRbeWVhcl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzZWxlY3RlZFt5ZWFyXSA9IFttb250aF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwdXNoVW5pcXVlKHNlbGVjdGVkW3llYXJdLCBtb250aCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gICAgfSwge30pO1xuICAgIGlmIChyYW5nZXBpY2tlciAmJiByYW5nZXBpY2tlci5kYXRlcykge1xuICAgICAgdGhpcy5yYW5nZSA9IHJhbmdlcGlja2VyLmRhdGVzLm1hcCh0aW1lVmFsdWUgPT4ge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZVZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGlzTmFOKGRhdGUpID8gdW5kZWZpbmVkIDogW2RhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgZW50aXJlIHZpZXcgVUlcbiAgcmVuZGVyKCkge1xuICAgIC8vIHJlZnJlc2ggZGlzYWJsZWQgbW9udGhzIG9uIGV2ZXJ5IHJlbmRlciBpbiBvcmRlciB0byBjbGVhciB0aGUgb25lcyBhZGRlZFxuICAgIC8vIGJ5IGJlZm9yZVNob3cgaG9vayBhdCBwcmV2aW91cyByZW5kZXJcbiAgICAvLyB0aGlzLmRpc2FibGVkID0gWy4uLnRoaXMuZGF0ZXNEaXNhYmxlZF07XG4gICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMuZGF0ZXNEaXNhYmxlZC5yZWR1Y2UoKGFyciwgZGlzYWJsZWQpID0+IHtcbiAgICAgIGNvbnN0IGR0ID0gbmV3IERhdGUoZGlzYWJsZWQpO1xuICAgICAgaWYgKHRoaXMueWVhciA9PT0gZHQuZ2V0RnVsbFllYXIoKSkge1xuICAgICAgICBhcnIucHVzaChkdC5nZXRNb250aCgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSwgW10pO1xuXG4gICAgdGhpcy5waWNrZXIuc2V0Vmlld1N3aXRjaExhYmVsKHRoaXMueWVhcik7XG4gICAgdGhpcy5waWNrZXIuc2V0UHJldkJ0bkRpc2FibGVkKHRoaXMueWVhciA8PSB0aGlzLm1pblllYXIpO1xuICAgIHRoaXMucGlja2VyLnNldE5leHRCdG5EaXNhYmxlZCh0aGlzLnllYXIgPj0gdGhpcy5tYXhZZWFyKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZFt0aGlzLnllYXJdIHx8IFtdO1xuICAgIGNvbnN0IHlyT3V0T2ZSYW5nZSA9IHRoaXMueWVhciA8IHRoaXMubWluWWVhciB8fCB0aGlzLnllYXIgPiB0aGlzLm1heFllYXI7XG4gICAgY29uc3QgaXNNaW5ZZWFyID0gdGhpcy55ZWFyID09PSB0aGlzLm1pblllYXI7XG4gICAgY29uc3QgaXNNYXhZZWFyID0gdGhpcy55ZWFyID09PSB0aGlzLm1heFllYXI7XG4gICAgY29uc3QgcmFuZ2UgPSBjb21wdXRlTW9udGhSYW5nZSh0aGlzLnJhbmdlLCB0aGlzLnllYXIpO1xuXG4gICAgQXJyYXkuZnJvbSh0aGlzLmdyaWQuY2hpbGRyZW4pLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgY2xhc3NMaXN0ID0gZWwuY2xhc3NMaXN0O1xuICAgICAgY29uc3QgZGF0ZSA9IGRhdGVWYWx1ZSh0aGlzLnllYXIsIGluZGV4LCAxKTtcblxuICAgICAgZWwuY2xhc3NOYW1lID0gYGRhdGVwaWNrZXItY2VsbCAke3RoaXMuY2VsbENsYXNzfWA7XG4gICAgICBpZiAodGhpcy5pc01pblZpZXcpIHtcbiAgICAgICAgZWwuZGF0YXNldC5kYXRlID0gZGF0ZTtcbiAgICAgIH1cbiAgICAgIC8vIHJlc2V0IHRleHQgb24gZXZlcnkgcmVuZGVyIHRvIGNsZWFyIHRoZSBjdXN0b20gY29udGVudCBzZXRcbiAgICAgIC8vIGJ5IGJlZm9yZVNob3cgaG9vayBhdCBwcmV2aW91cyByZW5kZXJcbiAgICAgIGVsLnRleHRDb250ZW50ID0gdGhpcy5tb250aE5hbWVzW2luZGV4XTtcblxuICAgICAgaWYgKFxuICAgICAgICB5ck91dE9mUmFuZ2VcbiAgICAgICAgfHwgaXNNaW5ZZWFyICYmIGluZGV4IDwgdGhpcy5taW5Nb250aFxuICAgICAgICB8fCBpc01heFllYXIgJiYgaW5kZXggPiB0aGlzLm1heE1vbnRoXG4gICAgICAgIHx8IHRoaXMuZGlzYWJsZWQuaW5jbHVkZXMoaW5kZXgpXG4gICAgICApIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gcmFuZ2U7XG4gICAgICAgIGlmIChpbmRleCA+IHJhbmdlU3RhcnQgJiYgaW5kZXggPCByYW5nZUVuZCkge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSByYW5nZVN0YXJ0KSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2Utc3RhcnQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT09IHJhbmdlRW5kKSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2UtZW5kJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZWxlY3RlZC5pbmNsdWRlcyhpbmRleCkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYmVmb3JlU2hvdykge1xuICAgICAgICB0aGlzLnBlcmZvcm1CZWZvcmVIb29rKGVsLCBpbmRleCwgZGF0ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIHZpZXcgVUkgYnkgYXBwbHlpbmcgdGhlIGNoYW5nZXMgb2Ygc2VsZWN0ZWQgYW5kIGZvY3VzZWQgaXRlbXNcbiAgcmVmcmVzaCgpIHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRbdGhpcy55ZWFyXSB8fCBbXTtcbiAgICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gY29tcHV0ZU1vbnRoUmFuZ2UodGhpcy5yYW5nZSwgdGhpcy55ZWFyKSB8fCBbXTtcbiAgICB0aGlzLmdyaWRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcucmFuZ2UsIC5yYW5nZS1zdGFydCwgLnJhbmdlLWVuZCwgLnNlbGVjdGVkLCAuZm9jdXNlZCcpXG4gICAgICAuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncmFuZ2UnLCAncmFuZ2Utc3RhcnQnLCAncmFuZ2UtZW5kJywgJ3NlbGVjdGVkJywgJ2ZvY3VzZWQnKTtcbiAgICAgIH0pO1xuICAgIEFycmF5LmZyb20odGhpcy5ncmlkLmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgICAgIGlmIChpbmRleCA+IHJhbmdlU3RhcnQgJiYgaW5kZXggPCByYW5nZUVuZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZScpO1xuICAgICAgfVxuICAgICAgaWYgKGluZGV4ID09PSByYW5nZVN0YXJ0KSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLXN0YXJ0Jyk7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggPT09IHJhbmdlRW5kKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3JhbmdlLWVuZCcpO1xuICAgICAgfVxuICAgICAgaWYgKHNlbGVjdGVkLmluY2x1ZGVzKGluZGV4KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKGluZGV4ID09PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSB2aWV3IFVJIGJ5IGFwcGx5aW5nIHRoZSBjaGFuZ2Ugb2YgZm9jdXNlZCBpdGVtXG4gIHJlZnJlc2hGb2N1cygpIHtcbiAgICB0aGlzLmdyaWQucXVlcnlTZWxlY3RvckFsbCgnLmZvY3VzZWQnKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnZm9jdXNlZCcpO1xuICAgIH0pO1xuICAgIHRoaXMuZ3JpZC5jaGlsZHJlblt0aGlzLmZvY3VzZWRdLmNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgfVxufSIsImltcG9ydCB7cHVzaFVuaXF1ZX0gZnJvbSAnLi4vLi4vbGliL3V0aWxzLmpzJztcbmltcG9ydCB7cGFyc2VIVE1MLCByZXBsYWNlQ2hpbGROb2Rlc30gZnJvbSAnLi4vLi4vbGliL2RvbS5qcyc7XG5cbi8vIEJhc2UgY2xhc3Mgb2YgdGhlIHZpZXcgY2xhc3Nlc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIGNvbnN0cnVjdG9yKHBpY2tlciwgY29uZmlnKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcsIHtcbiAgICAgIHBpY2tlcixcbiAgICAgIGVsZW1lbnQ6IHBhcnNlSFRNTChgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItdmlld1wiPjwvZGl2PmApLmZpcnN0Q2hpbGQsXG4gICAgICBzZWxlY3RlZDogW10sXG4gICAgfSk7XG4gICAgdGhpcy5pbml0KHRoaXMucGlja2VyLmRhdGVwaWNrZXIuY29uZmlnKTtcbiAgfVxuXG4gIGluaXQob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLnBpY2tMZXZlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmlzTWluVmlldyA9IHRoaXMuaWQgPT09IG9wdGlvbnMucGlja0xldmVsO1xuICAgIH1cbiAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy51cGRhdGVGb2N1cygpO1xuICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uKCk7XG4gIH1cblxuICAvLyBFeGVjdXRlIGJlZm9yZVNob3coKSBjYWxsYmFjayBhbmQgYXBwbHkgdGhlIHJlc3VsdCB0byB0aGUgZWxlbWVudFxuICAvLyBhcmdzOlxuICAvLyAtIGN1cnJlbnQgLSBjdXJyZW50IHZhbHVlIG9uIHRoZSBpdGVyYXRpb24gb24gdmlldyByZW5kZXJpbmdcbiAgLy8gLSB0aW1lVmFsdWUgLSB0aW1lIHZhbHVlIG9mIHRoZSBkYXRlIHRvIHBhc3MgdG8gYmVmb3JlU2hvdygpXG4gIHBlcmZvcm1CZWZvcmVIb29rKGVsLCBjdXJyZW50LCB0aW1lVmFsdWUpIHtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5iZWZvcmVTaG93KG5ldyBEYXRlKHRpbWVWYWx1ZSkpO1xuICAgIHN3aXRjaCAodHlwZW9mIHJlc3VsdCkge1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJlc3VsdCA9IHtlbmFibGVkOiByZXN1bHR9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJlc3VsdCA9IHtjbGFzc2VzOiByZXN1bHR9O1xuICAgIH1cblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIGlmIChyZXN1bHQuZW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgICAgcHVzaFVuaXF1ZSh0aGlzLmRpc2FibGVkLCBjdXJyZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQuY2xhc3Nlcykge1xuICAgICAgICBjb25zdCBleHRyYUNsYXNzZXMgPSByZXN1bHQuY2xhc3Nlcy5zcGxpdCgvXFxzKy8pO1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKC4uLmV4dHJhQ2xhc3Nlcyk7XG4gICAgICAgIGlmIChleHRyYUNsYXNzZXMuaW5jbHVkZXMoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICBwdXNoVW5pcXVlKHRoaXMuZGlzYWJsZWQsIGN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0LmNvbnRlbnQpIHtcbiAgICAgICAgcmVwbGFjZUNoaWxkTm9kZXMoZWwsIHJlc3VsdC5jb250ZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7aGFzUHJvcGVydHksIHB1c2hVbmlxdWUsIGNyZWF0ZVRhZ1JlcGVhdH0gZnJvbSAnLi4vLi4vbGliL3V0aWxzLmpzJztcbmltcG9ydCB7ZGF0ZVZhbHVlLCBzdGFydE9mWWVhclBlcmlvZH0gZnJvbSAnLi4vLi4vbGliL2RhdGUuanMnO1xuaW1wb3J0IHtwYXJzZUhUTUx9IGZyb20gJy4uLy4uL2xpYi9kb20uanMnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3LmpzJztcblxuZnVuY3Rpb24gdG9UaXRsZUNhc2Uod29yZCkge1xuICByZXR1cm4gWy4uLndvcmRdLnJlZHVjZSgoc3RyLCBjaCwgaXgpID0+IHN0ciArPSBpeCA/IGNoIDogY2gudG9VcHBlckNhc2UoKSwgJycpO1xufVxuXG4vLyBDbGFzcyByZXByZXNlbnRpbmcgdGhlIHllYXJzIGFuZCBkZWNhZGVzIHZpZXcgZWxlbWVudHNcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFllYXJzVmlldyBleHRlbmRzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihwaWNrZXIsIGNvbmZpZykge1xuICAgIHN1cGVyKHBpY2tlciwgY29uZmlnKTtcbiAgfVxuXG4gIGluaXQob3B0aW9ucywgb25Db25zdHJ1Y3Rpb24gPSB0cnVlKSB7XG4gICAgaWYgKG9uQ29uc3RydWN0aW9uKSB7XG4gICAgICB0aGlzLm5hdlN0ZXAgPSB0aGlzLnN0ZXAgKiAxMDtcbiAgICAgIHRoaXMuYmVmb3JlU2hvd09wdGlvbiA9IGBiZWZvcmVTaG93JHt0b1RpdGxlQ2FzZSh0aGlzLmNlbGxDbGFzcyl9YDtcbiAgICAgIHRoaXMuZ3JpZCA9IHRoaXMuZWxlbWVudDtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMubmFtZSwgJ2RhdGVwaWNrZXItZ3JpZCcpO1xuICAgICAgdGhpcy5ncmlkLmFwcGVuZENoaWxkKHBhcnNlSFRNTChjcmVhdGVUYWdSZXBlYXQoJ3NwYW4nLCAxMikpKTtcbiAgICB9XG4gICAgc3VwZXIuaW5pdChvcHRpb25zKTtcbiAgfVxuXG4gIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChoYXNQcm9wZXJ0eShvcHRpb25zLCAnbWluRGF0ZScpKSB7XG4gICAgICBpZiAob3B0aW9ucy5taW5EYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5taW5ZZWFyID0gdGhpcy5taW5EYXRlID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5taW5ZZWFyID0gc3RhcnRPZlllYXJQZXJpb2Qob3B0aW9ucy5taW5EYXRlLCB0aGlzLnN0ZXApO1xuICAgICAgICB0aGlzLm1pbkRhdGUgPSBkYXRlVmFsdWUodGhpcy5taW5ZZWFyLCAwLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGhhc1Byb3BlcnR5KG9wdGlvbnMsICdtYXhEYXRlJykpIHtcbiAgICAgIGlmIChvcHRpb25zLm1heERhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm1heFllYXIgPSB0aGlzLm1heERhdGUgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1heFllYXIgPSBzdGFydE9mWWVhclBlcmlvZChvcHRpb25zLm1heERhdGUsIHRoaXMuc3RlcCk7XG4gICAgICAgIHRoaXMubWF4RGF0ZSA9IGRhdGVWYWx1ZSh0aGlzLm1heFllYXIsIDExLCAzMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmlzTWluVmlldykge1xuICAgICAgaWYgKG9wdGlvbnMuZGF0ZXNEaXNhYmxlZCkge1xuICAgICAgICB0aGlzLmRhdGVzRGlzYWJsZWQgPSBvcHRpb25zLmRhdGVzRGlzYWJsZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0ZXNEaXNhYmxlZCA9IFtdO1xuICAgIH1cbiAgICBpZiAob3B0aW9uc1t0aGlzLmJlZm9yZVNob3dPcHRpb25dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGJlZm9yZVNob3cgPSBvcHRpb25zW3RoaXMuYmVmb3JlU2hvd09wdGlvbl07XG4gICAgICB0aGlzLmJlZm9yZVNob3cgPSB0eXBlb2YgYmVmb3JlU2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGJlZm9yZVNob3cgOiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIHZpZXcncyBzZXR0aW5ncyB0byByZWZsZWN0IHRoZSB2aWV3RGF0ZSBzZXQgb24gdGhlIHBpY2tlclxuICB1cGRhdGVGb2N1cygpIHtcbiAgICBjb25zdCB2aWV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMucGlja2VyLnZpZXdEYXRlKTtcbiAgICBjb25zdCBmaXJzdCA9IHN0YXJ0T2ZZZWFyUGVyaW9kKHZpZXdEYXRlLCB0aGlzLm5hdlN0ZXApO1xuICAgIGNvbnN0IGxhc3QgPSBmaXJzdCArIDkgKiB0aGlzLnN0ZXA7XG5cbiAgICB0aGlzLmZpcnN0ID0gZmlyc3Q7XG4gICAgdGhpcy5sYXN0ID0gbGFzdDtcbiAgICB0aGlzLnN0YXJ0ID0gZmlyc3QgLSB0aGlzLnN0ZXA7XG4gICAgdGhpcy5mb2N1c2VkID0gc3RhcnRPZlllYXJQZXJpb2Qodmlld0RhdGUsIHRoaXMuc3RlcCk7XG4gIH1cblxuICAvLyBVcGRhdGUgdmlldydzIHNldHRpbmdzIHRvIHJlZmxlY3QgdGhlIHNlbGVjdGVkIGRhdGVzXG4gIHVwZGF0ZVNlbGVjdGlvbigpIHtcbiAgICBjb25zdCB7ZGF0ZXMsIHJhbmdlcGlja2VyfSA9IHRoaXMucGlja2VyLmRhdGVwaWNrZXI7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGRhdGVzLnJlZHVjZSgoeWVhcnMsIHRpbWVWYWx1ZSkgPT4ge1xuICAgICAgcmV0dXJuIHB1c2hVbmlxdWUoeWVhcnMsIHN0YXJ0T2ZZZWFyUGVyaW9kKHRpbWVWYWx1ZSwgdGhpcy5zdGVwKSk7XG4gICAgfSwgW10pO1xuICAgIGlmIChyYW5nZXBpY2tlciAmJiByYW5nZXBpY2tlci5kYXRlcykge1xuICAgICAgdGhpcy5yYW5nZSA9IHJhbmdlcGlja2VyLmRhdGVzLm1hcCh0aW1lVmFsdWUgPT4ge1xuICAgICAgICBpZiAodGltZVZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gc3RhcnRPZlllYXJQZXJpb2QodGltZVZhbHVlLCB0aGlzLnN0ZXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIGVudGlyZSB2aWV3IFVJXG4gIHJlbmRlcigpIHtcbiAgICAvLyByZWZyZXNoIGRpc2FibGVkIHllYXJzIG9uIGV2ZXJ5IHJlbmRlciBpbiBvcmRlciB0byBjbGVhciB0aGUgb25lcyBhZGRlZFxuICAgIC8vIGJ5IGJlZm9yZVNob3cgaG9vayBhdCBwcmV2aW91cyByZW5kZXJcbiAgICAvLyB0aGlzLmRpc2FibGVkID0gWy4uLnRoaXMuZGF0ZXNEaXNhYmxlZF07XG4gICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMuZGF0ZXNEaXNhYmxlZC5tYXAoZGlzYWJsZWQgPT4gbmV3IERhdGUoZGlzYWJsZWQpLmdldEZ1bGxZZWFyKCkpO1xuXG4gICAgdGhpcy5waWNrZXIuc2V0Vmlld1N3aXRjaExhYmVsKGAke3RoaXMuZmlyc3R9LSR7dGhpcy5sYXN0fWApO1xuICAgIHRoaXMucGlja2VyLnNldFByZXZCdG5EaXNhYmxlZCh0aGlzLmZpcnN0IDw9IHRoaXMubWluWWVhcik7XG4gICAgdGhpcy5waWNrZXIuc2V0TmV4dEJ0bkRpc2FibGVkKHRoaXMubGFzdCA+PSB0aGlzLm1heFllYXIpO1xuXG4gICAgQXJyYXkuZnJvbSh0aGlzLmdyaWQuY2hpbGRyZW4pLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgY2xhc3NMaXN0ID0gZWwuY2xhc3NMaXN0O1xuICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuc3RhcnQgKyAoaW5kZXggKiB0aGlzLnN0ZXApO1xuICAgICAgY29uc3QgZGF0ZSA9IGRhdGVWYWx1ZShjdXJyZW50LCAwLCAxKTtcblxuICAgICAgZWwuY2xhc3NOYW1lID0gYGRhdGVwaWNrZXItY2VsbCAke3RoaXMuY2VsbENsYXNzfWA7XG4gICAgICBpZiAodGhpcy5pc01pblZpZXcpIHtcbiAgICAgICAgZWwuZGF0YXNldC5kYXRlID0gZGF0ZTtcbiAgICAgIH1cbiAgICAgIGVsLnRleHRDb250ZW50ID0gZWwuZGF0YXNldC55ZWFyID0gY3VycmVudDtcblxuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3ByZXYnKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IDExKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ25leHQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50IDwgdGhpcy5taW5ZZWFyIHx8IGN1cnJlbnQgPiB0aGlzLm1heFllYXIgfHwgdGhpcy5kaXNhYmxlZC5pbmNsdWRlcyhjdXJyZW50KSkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgY29uc3QgW3JhbmdlU3RhcnQsIHJhbmdlRW5kXSA9IHRoaXMucmFuZ2U7XG4gICAgICAgIGlmIChjdXJyZW50ID4gcmFuZ2VTdGFydCAmJiBjdXJyZW50IDwgcmFuZ2VFbmQpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50ID09PSByYW5nZVN0YXJ0KSB7XG4gICAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2Utc3RhcnQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudCA9PT0gcmFuZ2VFbmQpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1lbmQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQuaW5jbHVkZXMoY3VycmVudCkpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ID09PSB0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5iZWZvcmVTaG93KSB7XG4gICAgICAgIHRoaXMucGVyZm9ybUJlZm9yZUhvb2soZWwsIGN1cnJlbnQsIGRhdGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSB2aWV3IFVJIGJ5IGFwcGx5aW5nIHRoZSBjaGFuZ2VzIG9mIHNlbGVjdGVkIGFuZCBmb2N1c2VkIGl0ZW1zXG4gIHJlZnJlc2goKSB7XG4gICAgY29uc3QgW3JhbmdlU3RhcnQsIHJhbmdlRW5kXSA9IHRoaXMucmFuZ2UgfHwgW107XG4gICAgdGhpcy5ncmlkXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgnLnJhbmdlLCAucmFuZ2Utc3RhcnQsIC5yYW5nZS1lbmQsIC5zZWxlY3RlZCwgLmZvY3VzZWQnKVxuICAgICAgLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3JhbmdlJywgJ3JhbmdlLXN0YXJ0JywgJ3JhbmdlLWVuZCcsICdzZWxlY3RlZCcsICdmb2N1c2VkJyk7XG4gICAgICB9KTtcbiAgICBBcnJheS5mcm9tKHRoaXMuZ3JpZC5jaGlsZHJlbikuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBOdW1iZXIoZWwudGV4dENvbnRlbnQpO1xuICAgICAgY29uc3QgY2xhc3NMaXN0ID0gZWwuY2xhc3NMaXN0O1xuICAgICAgaWYgKGN1cnJlbnQgPiByYW5nZVN0YXJ0ICYmIGN1cnJlbnQgPCByYW5nZUVuZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZScpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHJhbmdlU3RhcnQpIHtcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgncmFuZ2Utc3RhcnQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50ID09PSByYW5nZUVuZCkge1xuICAgICAgICBjbGFzc0xpc3QuYWRkKCdyYW5nZS1lbmQnKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkLmluY2x1ZGVzKGN1cnJlbnQpKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA9PT0gdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgdmlldyBVSSBieSBhcHBseWluZyB0aGUgY2hhbmdlIG9mIGZvY3VzZWQgaXRlbVxuICByZWZyZXNoRm9jdXMoKSB7XG4gICAgY29uc3QgaW5kZXggPSBNYXRoLnJvdW5kKCh0aGlzLmZvY3VzZWQgLSB0aGlzLnN0YXJ0KSAvIHRoaXMuc3RlcCk7XG4gICAgdGhpcy5ncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb2N1c2VkJykuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZvY3VzZWQnKTtcbiAgICB9KTtcbiAgICB0aGlzLmdyaWQuY2hpbGRyZW5baW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL3JlbmRlciBpbmJveFxyXG5pbXBvcnQgVUkgZnJvbSAnLi91aS5qcyc7XHJcbmltcG9ydCBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XHJcbmltcG9ydCB0YXNrIGZyb20gJy4vdGFzay5qcydcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlLmpzJztcclxuXHJcbigoKSA9PiB7XHJcbiAgICByZW5kZXJEZWZhdWx0UHJvamVjdHMoKTtcclxuXHJcbiAgICBVSS5pbml0aWFsUmVuZGVyKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyRGVmYXVsdFByb2plY3RzKCl7XHJcbiAgICAgICAgbGV0IGluYm94ID0gcHJvamVjdCgnSW5ib3gnKTtcclxuICAgICAgICBsZXQgdG9kYXkgPSBwcm9qZWN0KCdUb2RheScpO1xyXG4gICAgICAgIGxldCB0aGlzd2VlayA9IHByb2plY3QoJ1RoaXMgV2VlaycpO1xyXG4gICAgICAgIGxldCBoYXZlRnVuID0gdGFzayhcIkhhdmUgRnVuXCIsXCJMZWFybiBhIGxvdCB3aGlsZSBoYXZpbmcgZnVuXCIpO1xyXG4gICAgICAgIHN0b3JhZ2UuYWRkUHJvamVjdChpbmJveCk7XHJcbiAgICAgICAgaW5ib3guYWRkVGFzayhoYXZlRnVuKTtcclxuICAgICAgICBzdG9yYWdlLmFkZFByb2plY3QodG9kYXkpO1xyXG4gICAgICAgIHN0b3JhZ2UuYWRkUHJvamVjdCh0aGlzd2Vlayk7XHJcbiAgICB9XHJcblxyXG5cclxufSkoKTtcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==