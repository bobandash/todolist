/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (project = (name, tasks = [], index) => {
    function getName(){
        return name;
    }

    function getIndex() {
        return index;
    }

    function setIndex(index){
        return index;
    }

    function setName(newName){
        name = newName;
    }

    function addTask(task){
        tasks.push(task);
    }

    function removeSection(section){
    }

    return {getName, getIndex, setIndex, setName, addSection, removeSection}
});


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
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ "./src/project.js");


//projects contain tasks, tasks contain subtasks
//for now, we'll follow that hierachy

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (storage = (() => {
    //the default projects that can't be removed
    const allProjects = [];

    let currProjectIndex = indexCounter();
/*     let currSectionIndex = indexCounter(); */
    let currTaskIndex = indexCounter();
    let currSubtaskIndex = indexCounter();
    renderDefaultProjects();

    function renderDefaultProjects(){
        let inbox = (0,_project_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Inbox');
        let today = (0,_project_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Today');
        let thisweek = (0,_project_js__WEBPACK_IMPORTED_MODULE_0__["default"])('This Week');
        addProject(inbox);
        addProject(today);
        addProject(thisweek);
    }

    function addProject(project){
        allProjects.push(project);
        project.setIndex(currProjectIndex.currIndex);
        currProjectIndex.incrementIndex();
    }

    function removeProject(projectIndex){
        allProjects.forEach((project, index) => {
            if(project.getIndex() === projectIndex){
                allProjects.splice(index, 1);
            }
        })
    }




    return {allSections, allProjects, allTasks, currProjectIndex, currSectionIndex, currTaskIndex, currSubtaskIndex};
})());



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
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
//render inbox



(() => {
    allProjects.push()

    const render = renderTasks();
    render.renderDefault([],[]);
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QmtDO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVEQUFPO0FBQzNCLG9CQUFvQix1REFBTztBQUMzQix1QkFBdUIsdURBQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDLEdBQUcsRUFBQztBQUNMOzs7Ozs7O1VDM0NBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDbUM7QUFDQTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHByb2plY3QgPSAobmFtZSwgdGFza3MgPSBbXSwgaW5kZXgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0SW5kZXgoaW5kZXgpe1xyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXROYW1lKG5ld05hbWUpe1xyXG4gICAgICAgIG5hbWUgPSBuZXdOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFRhc2sodGFzayl7XHJcbiAgICAgICAgdGFza3MucHVzaCh0YXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVTZWN0aW9uKHNlY3Rpb24pe1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7Z2V0TmFtZSwgZ2V0SW5kZXgsIHNldEluZGV4LCBzZXROYW1lLCBhZGRTZWN0aW9uLCByZW1vdmVTZWN0aW9ufVxyXG59XHJcbiIsImltcG9ydCBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XHJcblxyXG4vL3Byb2plY3RzIGNvbnRhaW4gdGFza3MsIHRhc2tzIGNvbnRhaW4gc3VidGFza3NcclxuLy9mb3Igbm93LCB3ZSdsbCBmb2xsb3cgdGhhdCBoaWVyYWNoeVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RvcmFnZSA9ICgoKSA9PiB7XHJcbiAgICAvL3RoZSBkZWZhdWx0IHByb2plY3RzIHRoYXQgY2FuJ3QgYmUgcmVtb3ZlZFxyXG4gICAgY29uc3QgYWxsUHJvamVjdHMgPSBbXTtcclxuXHJcbiAgICBsZXQgY3VyclByb2plY3RJbmRleCA9IGluZGV4Q291bnRlcigpO1xyXG4vKiAgICAgbGV0IGN1cnJTZWN0aW9uSW5kZXggPSBpbmRleENvdW50ZXIoKTsgKi9cclxuICAgIGxldCBjdXJyVGFza0luZGV4ID0gaW5kZXhDb3VudGVyKCk7XHJcbiAgICBsZXQgY3VyclN1YnRhc2tJbmRleCA9IGluZGV4Q291bnRlcigpO1xyXG4gICAgcmVuZGVyRGVmYXVsdFByb2plY3RzKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyRGVmYXVsdFByb2plY3RzKCl7XHJcbiAgICAgICAgbGV0IGluYm94ID0gcHJvamVjdCgnSW5ib3gnKTtcclxuICAgICAgICBsZXQgdG9kYXkgPSBwcm9qZWN0KCdUb2RheScpO1xyXG4gICAgICAgIGxldCB0aGlzd2VlayA9IHByb2plY3QoJ1RoaXMgV2VlaycpO1xyXG4gICAgICAgIGFkZFByb2plY3QoaW5ib3gpO1xyXG4gICAgICAgIGFkZFByb2plY3QodG9kYXkpO1xyXG4gICAgICAgIGFkZFByb2plY3QodGhpc3dlZWspO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3QocHJvamVjdCl7XHJcbiAgICAgICAgYWxsUHJvamVjdHMucHVzaChwcm9qZWN0KTtcclxuICAgICAgICBwcm9qZWN0LnNldEluZGV4KGN1cnJQcm9qZWN0SW5kZXguY3VyckluZGV4KTtcclxuICAgICAgICBjdXJyUHJvamVjdEluZGV4LmluY3JlbWVudEluZGV4KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0SW5kZXgpe1xyXG4gICAgICAgIGFsbFByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2plY3QuZ2V0SW5kZXgoKSA9PT0gcHJvamVjdEluZGV4KXtcclxuICAgICAgICAgICAgICAgIGFsbFByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIHJldHVybiB7YWxsU2VjdGlvbnMsIGFsbFByb2plY3RzLCBhbGxUYXNrcywgY3VyclByb2plY3RJbmRleCwgY3VyclNlY3Rpb25JbmRleCwgY3VyclRhc2tJbmRleCwgY3VyclN1YnRhc2tJbmRleH07XHJcbn0pKCk7XHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vcmVuZGVyIGluYm94XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZS5qcyc7XHJcbmltcG9ydCBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gICAgYWxsUHJvamVjdHMucHVzaCgpXHJcblxyXG4gICAgY29uc3QgcmVuZGVyID0gcmVuZGVyVGFza3MoKTtcclxuICAgIHJlbmRlci5yZW5kZXJEZWZhdWx0KFtdLFtdKTtcclxufSkoKTtcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==