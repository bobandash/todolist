/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/motivationalMessage.js":
/*!************************************!*\
  !*** ./src/motivationalMessage.js ***!
  \************************************/
/***/ (() => {

const motivationalMessageDOM = () => {
    function createMotivationalMessage(motivationalMessageObj){
        const body = document.querySelector('body');
        const parentDiv = motivationalMessageContainer();
        parentDiv.appendChild(motivationalMessageHeader(motivationalMessageObj.header));
        parentDiv.appendChild(motivationalMessage(motivationalMessageObj.message));
        parentDiv.appendChild(motivationalAuthor(motivationalMessageObj.author));
        body.appendChild(parentDiv);
    }


    function motivationalMessageContainer(){
        const container = document.createElement('div');
        container.classList.add('content-margin');
        container.setAttribute('id','motivational-message');
        return container;
    }

    function motivationalMessageHeader(headerText) {
        const headerDiv = document.createElement('div');
        headerDiv.setAttribute('id','motivational-message-header');

        const invisibleButtonsDiv = buttonsDiv(false);
        invisibleButtonsDiv.classList.add('invisible-elements');

        const visibleButtonsDiv = buttonsDiv(true);

        const motivationalMessage = document.createElement('p');
        motivationalMessage.innerText = headerText;

        headerDiv.appendChild(invisibleButtonsDiv);
        headerDiv.appendChild(motivationalMessage);
        headerDiv.appendChild(visibleButtonsDiv);

        return headerDiv;
    }

    function buttonsDiv(isVisible) {
        const buttonsDiv = document.createElement('div');
        
        const settingsBtn = document.createElement('button');
        const settingsIcon = document.createElement('i');
        settingsIcon.classList.add('fa-solid');
        settingsIcon.classList.add('fa-gear');
        settingsBtn.appendChild(settingsIcon);

        const closeBtn = document.createElement('button');
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fa-solid');
        closeIcon.classList.add('fa-x');
        closeBtn.appendChild(closeIcon);

        buttonsDiv.appendChild(settingsBtn);
        buttonsDiv.appendChild(closeBtn);

        if(isVisible){
            settingsBtn.setAttribute('id','motivational-message-settings-btn');
            closeBtn.setAttribute('id', 'motivational-message-close-btn');     
        }
        else {
            buttonsDiv.classList.add('invisible-elements');
        }

        return buttonsDiv;
    }

    function motivationalMessage(message) {
        const messageParagraph = document.createElement('p');
        messageParagraph.innerText = message;
        return messageParagraph;
    }

    function motivationalAuthor(author) {
        const messageAuthor = document.createElement('p');
        messageAuthor.innerText = author;
        return messageAuthor;        
    }

    return {createMotivationalMessage};
}

const motivationalMessageDOMFunctionality = () => {
    function addSettingBtnFunctionality(){
        const settingBtn = document.getElementById('motivational-message-settings-btn');
    }
    
    function createModalForm() {
        
    }

    function addCloseBtnFunctionality() {
        const closeBtn = document.getElementById('motivational-message-close-btn');
        closeBtn.addEventListener('click', function() {
            const motivationalMessageDiv = document.getElementById('motivational-message');
            motivationalMessageDiv.remove();
        })  
    }

    function addBtnFunctionality() {
        addCloseBtnFunctionality();
        addSettingBtnFunctionality();
    }

    return {addBtnFunctionality};
}

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _motivationalMessage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./motivationalMessage.js */ "./src/motivationalMessage.js");
/* harmony import */ var _motivationalMessage_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_motivationalMessage_js__WEBPACK_IMPORTED_MODULE_0__);



//render inbox
const initialRender = (() => {
    const motivationalMessages = (0,_motivationalMessage_js__WEBPACK_IMPORTED_MODULE_0__.addMotivationalMessage)();
    motivationalMessages.renderDefaultMessages();
})();

const createTaskDOM = () => {
    const elemContainerDOM = () => {
        const containerDiv = document.createElement('div');
        containerDiv.setAttribute('id','content-margin');
        return containerDiv;
    }
    
    const mainHeaderDOM = () => {
        function containerDiv(){
            const headerDiv = document.createElement('div');
            headerDiv.setAttribute('id','inbox-header');
            
            return headerDiv;
        }
    
        function headingText() {
            const heading = document.createElement('h1');
            heading.classList.add('header-type');
            heading.innerText = Inbox;
            return heading;
        }
    
        function headerIcons() {
            const headerIconDiv = document.createElement('div');
            headerIconDiv.classList.add('header-icon');
    
            const folderIcon = document.createElement('i');
            folderIcon.classList.add('fa-sold','fa-folder-plus');
    
            const taskIcon = document.createElement('i');
            taskIcon.classList.add('fa-solid','fa-square-plus');
    
            headerIconDiv.appendChild(folderIcon);
            headerIconDiv.appendChild(taskIcon);
    
            return headerIconDiv;
        }
    
        function getHeaderDOM() {
            const container = containerDiv();
            const header = headingText();
            const headerIconsDiv = headerIcons();
            container.appendChild(header);
            container.appendChild(headerIconsDiv);
            return container;
        }
    
        return {getHeaderDOM};
    }
}


/* 
<div class = "section">
    <div class = "section-header">
        <h2 class = "section-title">Hello my name is Bruce</h2>
        <div class = "section-dropdown"><i class="fa-solid fa-caret-down"></i></div>
    </div>
    <div class = "task">
        <div class = "complete-task-btn">
            <i class="fa-regular fa-circle"></i>
        </div>
        <div class = "task-title">Do something that works Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex reprehenderit optio excepturi saepe dolore voluptatibus recusandae iure quaerat dicta non!
        <div class = "task-description">tst</div>
        </div>
        <div class = "button-icons">
            <i class="fa-solid fa-square-plus"></i>
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>
    <div class = "subtask">
        <div class = "complete-task-btn">
            <i class="fa-regular fa-circle"></i>
        </div>
        <div class = "task-title">Do something that works Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex reprehenderit optio excepturi saepe dolore voluptatibus recusandae iure quaerat dicta non!</div>
        <div class = "button-icons">
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>            
</div>
</div>
 */
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOzs7Ozs7O1VDM0lBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ04rRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQywrRUFBc0I7QUFDdkQ7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb3RpdmF0aW9uYWxNZXNzYWdlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZURPTSA9ICgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vdGl2YXRpb25hbE1lc3NhZ2UobW90aXZhdGlvbmFsTWVzc2FnZU9iail7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICAgICAgICBjb25zdCBwYXJlbnREaXYgPSBtb3RpdmF0aW9uYWxNZXNzYWdlQ29udGFpbmVyKCk7XHJcbiAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKG1vdGl2YXRpb25hbE1lc3NhZ2VIZWFkZXIobW90aXZhdGlvbmFsTWVzc2FnZU9iai5oZWFkZXIpKTtcclxuICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsTWVzc2FnZShtb3RpdmF0aW9uYWxNZXNzYWdlT2JqLm1lc3NhZ2UpKTtcclxuICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsQXV0aG9yKG1vdGl2YXRpb25hbE1lc3NhZ2VPYmouYXV0aG9yKSk7XHJcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChwYXJlbnREaXYpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxNZXNzYWdlQ29udGFpbmVyKCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtbWFyZ2luJyk7XHJcbiAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCdtb3RpdmF0aW9uYWwtbWVzc2FnZScpO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZUhlYWRlcihoZWFkZXJUZXh0KSB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaGVhZGVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1oZWFkZXInKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW52aXNpYmxlQnV0dG9uc0RpdiA9IGJ1dHRvbnNEaXYoZmFsc2UpO1xyXG4gICAgICAgIGludmlzaWJsZUJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlLWVsZW1lbnRzJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHZpc2libGVCdXR0b25zRGl2ID0gYnV0dG9uc0Rpdih0cnVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlLmlubmVyVGV4dCA9IGhlYWRlclRleHQ7XHJcblxyXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChpbnZpc2libGVCdXR0b25zRGl2KTtcclxuICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsTWVzc2FnZSk7XHJcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKHZpc2libGVCdXR0b25zRGl2KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhlYWRlckRpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBidXR0b25zRGl2KGlzVmlzaWJsZSkge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBzZXR0aW5nc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBzZXR0aW5nc0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnKTtcclxuICAgICAgICBzZXR0aW5nc0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtZ2VhcicpO1xyXG4gICAgICAgIHNldHRpbmdzQnRuLmFwcGVuZENoaWxkKHNldHRpbmdzSWNvbik7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3QgY2xvc2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcpO1xyXG4gICAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS14Jyk7XHJcbiAgICAgICAgY2xvc2VCdG4uYXBwZW5kQ2hpbGQoY2xvc2VJY29uKTtcclxuXHJcbiAgICAgICAgYnV0dG9uc0Rpdi5hcHBlbmRDaGlsZChzZXR0aW5nc0J0bik7XHJcbiAgICAgICAgYnV0dG9uc0Rpdi5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XHJcblxyXG4gICAgICAgIGlmKGlzVmlzaWJsZSl7XHJcbiAgICAgICAgICAgIHNldHRpbmdzQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1zZXR0aW5ncy1idG4nKTtcclxuICAgICAgICAgICAgY2xvc2VCdG4uc2V0QXR0cmlidXRlKCdpZCcsICdtb3RpdmF0aW9uYWwtbWVzc2FnZS1jbG9zZS1idG4nKTsgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYnV0dG9uc0Rpdi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUtZWxlbWVudHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidXR0b25zRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbWVzc2FnZVBhcmFncmFwaC5pbm5lclRleHQgPSBtZXNzYWdlO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlUGFyYWdyYXBoO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbEF1dGhvcihhdXRob3IpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlQXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIG1lc3NhZ2VBdXRob3IuaW5uZXJUZXh0ID0gYXV0aG9yO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlQXV0aG9yOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtjcmVhdGVNb3RpdmF0aW9uYWxNZXNzYWdlfTtcclxufVxyXG5cclxuY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZURPTUZ1bmN0aW9uYWxpdHkgPSAoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBhZGRTZXR0aW5nQnRuRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW90aXZhdGlvbmFsLW1lc3NhZ2Utc2V0dGluZ3MtYnRuJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vZGFsRm9ybSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDbG9zZUJ0bkZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW90aXZhdGlvbmFsLW1lc3NhZ2UtY2xvc2UtYnRuJyk7XHJcbiAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3RpdmF0aW9uYWwtbWVzc2FnZScpO1xyXG4gICAgICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlRGl2LnJlbW92ZSgpO1xyXG4gICAgICAgIH0pICBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRCdG5GdW5jdGlvbmFsaXR5KCkge1xyXG4gICAgICAgIGFkZENsb3NlQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIGFkZFNldHRpbmdCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHthZGRCdG5GdW5jdGlvbmFsaXR5fTtcclxufVxyXG5cclxuY29uc3QgYWRkTW90aXZhdGlvbmFsTWVzc2FnZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IERPTSA9IG1vdGl2YXRpb25hbE1lc3NhZ2VET00oKTtcclxuICAgIGNvbnN0IGJ0bkZ1bmN0aW9uYWxpdHkgPSBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgLy9vYmplY3QgZGVjbGFyYXRpb24gZm9yIG1vdGl2YXRpb25hbCBtZXNzYWdlc1xyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZShoZWFkZXIsIG1lc3NhZ2UsIGF1dGhvciA9ICcnKXtcclxuICAgICAgICByZXR1cm4ge2hlYWRlciwgbWVzc2FnZSwgYXV0aG9yfTtcclxuICAgIH1cclxuXHJcbiAgICAvL3ByZXNldCBtZXRob2RzIGZvciBtb3RpdmF0aW9uYWwgbWVzc2FnZVxyXG4gICAgZnVuY3Rpb24gYWRkRGVmYXVsdE1vdGl2YXRpb25hbE1lc3NhZ2VzKCkge1xyXG4gICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2UxID0gbW90aXZhdGlvbmFsTWVzc2FnZSgnTW90aXZhdGlvbmFsIE1lc3NhZ2UnLCdZZXN0ZXJkYXkgeW91IHNhaWQgdG9tb3Jyb3csIHNvIGp1c3QgZG8gaXQuIERvblxcJ3QgbGV0IHlvdXIgZHJlYW1zIGJlIGRyZWFtcy4nLCdTaGlhIExhQmVvdWYnKTtcclxuICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlMiA9ICBtb3RpdmF0aW9uYWxNZXNzYWdlKCdNb3RpdmF0aW9uYWwgTWVzc2FnZScsXCJUaGUgbW9zdCBpbXBvcnRhbnQgaW52ZXN0bWVudCB5b3UgY2FuIG1ha2UgaXMgaW4geW91cnNlbGYuXCIsJ1dhcnJlbiBCdWZmZXR0Jyk7XHJcbiAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZTMgPSBtb3RpdmF0aW9uYWxNZXNzYWdlKCdQZXJzb25hbCBNZXNzYWdlJywnWW91IGNhbiBwbGF5IFBva2Vtb24gaWYgeW91IGZpbmlzaCBjb2RpbmcgdGhpcyB0by1kbyBsaXN0LicsJ0JydWNlJyk7XHJcbiAgICAgICAgbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheS5wdXNoKG1vdGl2YXRpb25hbE1lc3NhZ2UzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaG9vc2VPbmVNb3RpdmF0aW9uYWxNZXNzYWdlKCkge1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkubGVuZ3RoKTtcclxuICAgICAgICByZXR1cm4gbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheVtyYW5kb21dO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZU1lc3NhZ2UoaW5kZXgpIHtcclxuICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyRGVmYXVsdE1lc3NhZ2VzKCkge1xyXG4gICAgICAgIGFkZERlZmF1bHRNb3RpdmF0aW9uYWxNZXNzYWdlcygpO1xyXG4gICAgICAgIERPTS5jcmVhdGVNb3RpdmF0aW9uYWxNZXNzYWdlKGNob29zZU9uZU1vdGl2YXRpb25hbE1lc3NhZ2UoKSk7XHJcbiAgICAgICAgYnRuRnVuY3Rpb25hbGl0eS5hZGRCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtyZW5kZXJEZWZhdWx0TWVzc2FnZXMsIGRlbGV0ZU1lc3NhZ2V9O1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2FkZE1vdGl2YXRpb25hbE1lc3NhZ2V9IGZyb20gJy4vbW90aXZhdGlvbmFsTWVzc2FnZS5qcydcclxuXHJcblxyXG4vL3JlbmRlciBpbmJveFxyXG5jb25zdCBpbml0aWFsUmVuZGVyID0gKCgpID0+IHtcclxuICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2VzID0gYWRkTW90aXZhdGlvbmFsTWVzc2FnZSgpO1xyXG4gICAgbW90aXZhdGlvbmFsTWVzc2FnZXMucmVuZGVyRGVmYXVsdE1lc3NhZ2VzKCk7XHJcbn0pKCk7XHJcblxyXG5jb25zdCBjcmVhdGVUYXNrRE9NID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZWxlbUNvbnRhaW5lckRPTSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb250YWluZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsJ2NvbnRlbnQtbWFyZ2luJyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgbWFpbkhlYWRlckRPTSA9ICgpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjb250YWluZXJEaXYoKXtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywnaW5ib3gtaGVhZGVyJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gaGVhZGVyRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGhlYWRpbmdUZXh0KCkge1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcclxuICAgICAgICAgICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkZXItdHlwZScpO1xyXG4gICAgICAgICAgICBoZWFkaW5nLmlubmVyVGV4dCA9IEluYm94O1xyXG4gICAgICAgICAgICByZXR1cm4gaGVhZGluZztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBoZWFkZXJJY29ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVySWNvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBoZWFkZXJJY29uRGl2LmNsYXNzTGlzdC5hZGQoJ2hlYWRlci1pY29uJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgZm9sZGVySWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgZm9sZGVySWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xkJywnZmEtZm9sZGVyLXBsdXMnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCB0YXNrSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1zcXVhcmUtcGx1cycpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGhlYWRlckljb25EaXYuYXBwZW5kQ2hpbGQoZm9sZGVySWNvbik7XHJcbiAgICAgICAgICAgIGhlYWRlckljb25EaXYuYXBwZW5kQ2hpbGQodGFza0ljb24pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJJY29uRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEhlYWRlckRPTSgpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyRGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGhlYWRpbmdUZXh0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckljb25zRGl2ID0gaGVhZGVySWNvbnMoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXJJY29uc0Rpdik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtnZXRIZWFkZXJET019O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyogXHJcbjxkaXYgY2xhc3MgPSBcInNlY3Rpb25cIj5cclxuICAgIDxkaXYgY2xhc3MgPSBcInNlY3Rpb24taGVhZGVyXCI+XHJcbiAgICAgICAgPGgyIGNsYXNzID0gXCJzZWN0aW9uLXRpdGxlXCI+SGVsbG8gbXkgbmFtZSBpcyBCcnVjZTwvaDI+XHJcbiAgICAgICAgPGRpdiBjbGFzcyA9IFwic2VjdGlvbi1kcm9wZG93blwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2FyZXQtZG93blwiPjwvaT48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcyA9IFwidGFza1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcImNvbXBsZXRlLXRhc2stYnRuXCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1jaXJjbGVcIj48L2k+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcyA9IFwidGFzay10aXRsZVwiPkRvIHNvbWV0aGluZyB0aGF0IHdvcmtzIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEV4IHJlcHJlaGVuZGVyaXQgb3B0aW8gZXhjZXB0dXJpIHNhZXBlIGRvbG9yZSB2b2x1cHRhdGlidXMgcmVjdXNhbmRhZSBpdXJlIHF1YWVyYXQgZGljdGEgbm9uIVxyXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcInRhc2stZGVzY3JpcHRpb25cIj50c3Q8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzID0gXCJidXR0b24taWNvbnNcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1zcXVhcmUtcGx1c1wiPjwvaT5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlXCI+PC9pPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoXCI+PC9pPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzID0gXCJzdWJ0YXNrXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcyA9IFwiY29tcGxldGUtdGFzay1idG5cIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLWNpcmNsZVwiPjwvaT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzID0gXCJ0YXNrLXRpdGxlXCI+RG8gc29tZXRoaW5nIHRoYXQgd29ya3MgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gRXggcmVwcmVoZW5kZXJpdCBvcHRpbyBleGNlcHR1cmkgc2FlcGUgZG9sb3JlIHZvbHVwdGF0aWJ1cyByZWN1c2FuZGFlIGl1cmUgcXVhZXJhdCBkaWN0YSBub24hPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcyA9IFwiYnV0dG9uLWljb25zXCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiPjwvaT5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaFwiPjwvaT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PiAgICAgICAgICAgIFxyXG48L2Rpdj5cclxuPC9kaXY+XHJcbiAqLyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==