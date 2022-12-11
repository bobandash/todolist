/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    function incrementIndex() {
        currIndex = currIndex + 1;
    }
    return {currIndex, incrementIndex};
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

    function setIndex(index){
        return index;
    }

    //need to set a unique index for task after it's created
    function addTask(task){
        task.setIndex(currTaskIndex.getIndex());
        tasks.push(task);
        currTaskIndex.incrementIndex();
    }

    function removeTask(taskIndex){
        tasks.forEach((task, index) => {
            if(task.getIndex() === taskIndex){
                tasks.splice(index, 1);
            }
        })
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
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper.js */ "./src/helper.js");


//projects contain tasks, tasks contain subtasks
//for now, we'll follow that hierachy

const storage = (() => {
    //the default projects that can't be removed
    const allProjects = [];
    let currProjectIndex = (0,_helper_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

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

    return {allProjects, addProject, removeProject};
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (storage);



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
//contains all DOM Manipulation that's needed for tasks



const ui = (() => {
    function initialRender(){
        const bodyElem = document.querySelector('body');
/*         addMotivationalMessage().renderDefaultMessages(); */
        const containerDiv = containerDOM().getDOM();
        const header = projectHeaderDOM('Inbox').getDOM();
        const addTaskDiv = addTaskDivDOM().getDOM();
        containerDiv.appendChild(header);
        containerDiv.appendChild(addTaskDiv);
        bodyElem.appendChild(containerDiv);
        _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects.forEach(project => {
            if(project.getName() === 'Inbox'){
                const tasks = project.getTasks()
                addAllTasksDOM(containerDiv, tasks);
            }
        })
        
    }

    //create the container to put all tasks, the add task button, and project header in
    //unique id is container
    const containerDOM = () => {
        function getDOM(){
            const containerDiv = document.createElement('div');
            containerDiv.setAttribute('id','container');
            return containerDiv;
        }
        return {getDOM};
    }
    
    //the project header
    //unique id is inbox-header
    const projectHeaderDOM = (headerName) => {
        function containerDiv(){
            const headerDiv = document.createElement('div');
            headerDiv.setAttribute('id','inbox-header');
            return headerDiv;
        }
    
        function headingText() {
            const heading = document.createElement('h1');
            heading.classList.add('header-type');
            heading.innerText = headerName;
            return heading;
        }
    
        function getDOM() {
            const container = containerDiv();
            const header = headingText();
            container.appendChild(header);
            return container;
        }
    
        return {getDOM};
    }

    //div that when you click, the add task form appears
    //unique id is add-task-clickable-div
    const addTaskDivDOM = () => {
        function container() {
            const containerDiv = document.createElement('div');
            containerDiv.setAttribute('id', 'add-task-clickable-div');
            return containerDiv;
        }

        function plusIcon() {
            const icon = document.createElement('i');
            icon.classList.add('fa','fa-plus');
            return icon;
        }

        function addTaskText(){
            const addTaskDiv = document.createElement('div');
            addTaskDiv.innerText = 'Add Task';
            addTaskDiv.classList.add('add-task-text');
            return addTaskDiv;
        }

        function getDOM(){
            const containerDiv = container();
            const plusIconElem = plusIcon();
            const addTaskTextElem = addTaskText();
            containerDiv.appendChild(plusIconElem);
            containerDiv.appendChild(addTaskTextElem);
            containerDiv.addEventListener('click', function(){
                const container = document.getElementById('container');
                const addTaskForm = addTaskFormDOM().getDOM();
                container.appendChild(addTaskForm);
            }, {once: true})
            return containerDiv;
        }

        return {getDOM};
    }

    const addTaskFormDOM = () => {
        function getDOM(){
            const container = getContainer();
            const form = getForm();
            const formActions = getFormActions();

            container.appendChild(form);
            container.appendChild(formActions);
            return container;
        }
        
        function getContainer(){
            const container = document.createElement('div');
            container.setAttribute('id','add-task-form-container');
            return container;
        }

        function getForm(){
            const form = document.createElement('form');
            form.setAttribute('id','add-task-form');

            const nameInput = createInput('text', 'name', 'Name', true);
            const descriptionInput = createInput('text', 'description', 'Description', false);

            const popoverDiv = document.createElement('div');
            popoverDiv.classList.add('popover-icons-div');
            const priorityDiv = getPopoverIcons('priority-btn', 'fa-flag', 'Priority');
            const dueDateDiv = getPopoverIcons('due-date-btn', 'fa-calendar','Due Date');
            const estimatedTimeDiv = getPopoverIcons('est-completion-time-btn', 'fa-clock', 'Est Time');
            popoverDiv.appendChild(priorityDiv);
            popoverDiv.appendChild(dueDateDiv);
            popoverDiv.appendChild(estimatedTimeDiv);

            
            function getPopoverIcons(divId, iconClass, text){
                const containerDiv = document.createElement('div');
                containerDiv.setAttribute('id',divId);
                const icon = document.createElement('i');
                const iconText = document.createTextNode(' ' + text);
                icon.classList.add('fa-regular',iconClass);
                containerDiv.appendChild(icon);
                containerDiv.appendChild(iconText);
                return containerDiv;
            }

            form.appendChild(nameInput);
            form.appendChild(descriptionInput);
            form.appendChild(popoverDiv);
            return form;
        }

        function getFormActions(){
            const containerDiv = document.createElement('div');
            containerDiv.setAttribute('id','form-actions-div');

            const cancelBtn = document.createElement('button');
            cancelBtn.setAttribute('id','cancel-add-task-form');
            cancelBtn.innerText = 'Cancel';

            const submitBtn = document.createElement('button');
            submitBtn.setAttribute('id','add-task-submit-button');
            submitBtn.innerText = 'Add Task';

            containerDiv.appendChild(cancelBtn);
            containerDiv.appendChild(submitBtn);

            return containerDiv;
        }

        function createInput(type, id, placeholder, isRequired){
            const input = document.createElement('input');
            input.setAttribute('type', type);
            input.setAttribute('id', id);
            input.setAttribute('placeholder', placeholder);
            if(isRequired ? input.required = true : input.required = false);
            return input;
        }

        return {getDOM};
    }

    //creates DOM of one task
    const taskDOM = (taskObj) => {
        function createContainerDiv(){
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            return taskDiv;
        }
    
        function createTaskBtnDiv(){
            const completeTaskDiv = document.createElement('div');
            completeTaskDiv.classList.add('complete-task-btn');
    
            const completeTaskIcon = document.createElement('i');
            completeTaskIcon.classList.add('fa-regular','fa-circle');
            completeTaskDiv.appendChild(completeTaskIcon);
            return completeTaskDiv;
        }
    
        function createTaskTitleDiv(taskObj){
            const taskTitleDiv = document.createElement('div');
            taskTitleDiv.classList.add('task-title');
            taskTitleDiv.innerText = taskObj.getName();
            return taskTitleDiv;
        }
    
        function createTaskDescriptionDiv(taskObj){
            const taskDescriptionDiv = document.createElement('div');
            taskDescriptionDiv.classList.add('task-description');
            taskDescriptionDiv.innerText = taskObj.getDescription();
            return taskDescriptionDiv;
        }
    
        function createTaskButtonsDiv(){
            const buttonIconsDiv = document.createElement('div');
            buttonIconsDiv.classList.add('button-icons');
    
            const plusIcon = document.createElement('i');
            plusIcon.classList.add('fa-solid','fa-square-plus');
    
            const editIcon = document.createElement('i');
            editIcon.classList.add('fa-solid','fa-pen-to-square');
    
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa-solid','fa-trash');
    
            buttonIconsDiv.appendChild(plusIcon);
            buttonIconsDiv.appendChild(editIcon);
            buttonIconsDiv.appendChild(deleteIcon);
            return buttonIconsDiv;
        }
    
        function createEstimatedTimeDiv(taskObj){
            const estimatedTimeDiv = document.createElement('div');
            estimatedTimeDiv.classList.add('task-estimated-time');
            estimatedTimeDiv.innerText = `Est Time: ${taskObj.getEstimatedTime()}`;
            return estimatedTimeDiv;
        }
    
        function getDOM(){
            const containerDiv = createContainerDiv();
            const buttonsDiv = createTaskBtnDiv();
            const titleDiv = createTaskTitleDiv(taskObj);
            const taskButtons = createTaskButtonsDiv();
            if(taskObj.getEstimatedTime()){
                const taskEstimatedTime = createEstimatedTimeDiv(taskObj);
                titleDiv.appendChild(taskEstimatedTime);
            }
            if(taskObj.getDescription()){
                const taskDescription = createTaskDescriptionDiv(taskObj);
                titleDiv.appendChild(taskDescription);
            }
    
            containerDiv.appendChild(buttonsDiv);
            containerDiv.appendChild(titleDiv);
            containerDiv.appendChild(taskButtons);
    
            return containerDiv;
        }
    
        return {getDOM};
    }

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
            const subtaskBtnIcons = createSubtaskButtonIcons();
    
            containerDiv.appendChild(completeSubtaskDiv);
            containerDiv.appendChild(subtaskTitleDiv);
            containerDiv.appendChild(subtaskBtnIcons);
    
            return containerDiv;
        }
    
        return {getDOM};
    }

    //adds all dom of tasks and subtasks in a project
    function addAllTasksDOM(container, tasks){
        tasks.forEach(task => {
            container.appendChild(taskDOM(task).getDOM());
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

})()

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
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ui);


/* const motivationalMessageDOM = () => {
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
 */
/* 
    //need to clean this up
    //add all tasks and tasks with sections
    function addSectionsTasksDOM(parentDiv, allSectionsArray){
        allSectionsArray.forEach(section => {
            const sectionDOM = createSectionDOM(section).getSectionDOM();
            section.tasks.forEach(task => {
                const taskDOM = createTaskDOM(task).getTaskDOM();
                sectionDOM.appendChild(taskDOM);
                task.subtasks.forEach(subtask => {
                    const subtaskDOM = createSubtaskDOM(subtask).getSubtaskDOM();
                    parentDiv.appendChild(subtaskDOM);
                })
            })
            parentDiv.appendChild(sectionDOM);    
        })
    }
 */
/* 
    const createSectionDOM = (sectionObj) => {
        function createSectionDiv(){
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section');
            return sectionDiv;
        }
    
        function createSectionHeader(sectionObj){
            const sectionHeaderDiv = document.createElement('div');
            sectionHeaderDiv.classList.add('section-header');
    
            const sectionTitle = document.createElement('section-title');
            sectionTitle.classList.add('section-title');
            sectionTitle.innerText = sectionObj.name;
    
            const sectionDropdownContainer = document.createElement('div');
            sectionDropdownContainer.classList.add('section-dropdown');
            
            const dropdownIcon = document.createElement('i');
            dropdownIcon.classList.add('fa-sold','fa-caret-down');
            sectionDropdownContainer.appendChild(dropdownIcon);
            sectionHeaderDiv.appendChild(sectionTitle);
            sectionHeaderDiv.appendChild(sectionDropdownContainer);
            return sectionHeaderDiv;
        }
    
        function getSectionDOM(){
            const sectionDiv = createSectionDiv();
            sectionDiv.appendChild(createSectionHeader(sectionObj));
            return sectionDiv;
        }
    
        return {getSectionDOM};
    } */

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
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
//render inbox




(() => {
    renderDefaultProjects();
    _ui_js__WEBPACK_IMPORTED_MODULE_0__["default"].initialRender();

    function renderDefaultProjects(){
        let inbox = (0,_project_js__WEBPACK_IMPORTED_MODULE_1__["default"])('Inbox');
        let today = (0,_project_js__WEBPACK_IMPORTED_MODULE_1__["default"])('Today');
        let thisweek = (0,_project_js__WEBPACK_IMPORTED_MODULE_1__["default"])('This Week');
        _storage_js__WEBPACK_IMPORTED_MODULE_2__["default"].addProject(inbox);
        _storage_js__WEBPACK_IMPORTED_MODULE_2__["default"].addProject(today);
        _storage_js__WEBPACK_IMPORTED_MODULE_2__["default"].addProject(thisweek);
    }


})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsaUVBQWUsWUFBWTs7Ozs7Ozs7Ozs7Ozs7O0FDUlk7QUFDdkM7QUFDQTtBQUNBLHdCQUF3QixzREFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsaUVBQWUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7OztBQzNDYTtBQUNJO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixzREFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxPQUFPLEVBQUM7QUFDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDbUM7QUFDTztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RDtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVFQUEyQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxHQUFHLFdBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCwyQkFBMkI7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsRUFBRSxFQUFDO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixNQUFNOzs7Ozs7VUNsaUJOO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ3lCO0FBQ1U7QUFDQTtBQUNuQztBQUNBO0FBQ0E7QUFDQSxJQUFJLDREQUFnQjtBQUNwQjtBQUNBO0FBQ0Esb0JBQW9CLHVEQUFPO0FBQzNCLG9CQUFvQix1REFBTztBQUMzQix1QkFBdUIsdURBQU87QUFDOUIsUUFBUSw4REFBa0I7QUFDMUIsUUFBUSw4REFBa0I7QUFDMUIsUUFBUSw4REFBa0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3VpLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGluZGV4Q291bnRlciA9ICgpID0+IHtcclxuICAgIGxldCBjdXJySW5kZXggPSAwO1xyXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50SW5kZXgoKSB7XHJcbiAgICAgICAgY3VyckluZGV4ID0gY3VyckluZGV4ICsgMTtcclxuICAgIH1cclxuICAgIHJldHVybiB7Y3VyckluZGV4LCBpbmNyZW1lbnRJbmRleH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluZGV4Q291bnRlcjsiLCJpbXBvcnQgaW5kZXhDb3VudGVyIGZyb20gJy4vaGVscGVyLmpzJztcclxuXHJcbmNvbnN0IHByb2plY3QgPSAobmFtZSwgdGFza3MgPSBbXSwgaW5kZXgpID0+IHtcclxuICAgIGxldCBjdXJyVGFza0luZGV4ID0gaW5kZXhDb3VudGVyKCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VGFza3MoKXtcclxuICAgICAgICByZXR1cm4gdGFza3M7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0TmFtZShuZXdOYW1lKXtcclxuICAgICAgICBuYW1lID0gbmV3TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRJbmRleChpbmRleCl7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8vbmVlZCB0byBzZXQgYSB1bmlxdWUgaW5kZXggZm9yIHRhc2sgYWZ0ZXIgaXQncyBjcmVhdGVkXHJcbiAgICBmdW5jdGlvbiBhZGRUYXNrKHRhc2spe1xyXG4gICAgICAgIHRhc2suc2V0SW5kZXgoY3VyclRhc2tJbmRleC5nZXRJbmRleCgpKTtcclxuICAgICAgICB0YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgICAgIGN1cnJUYXNrSW5kZXguaW5jcmVtZW50SW5kZXgoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVUYXNrKHRhc2tJbmRleCl7XHJcbiAgICAgICAgdGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYodGFzay5nZXRJbmRleCgpID09PSB0YXNrSW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgdGFza3Muc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtnZXROYW1lLCBnZXRJbmRleCwgZ2V0VGFza3MsIHNldE5hbWUsIHNldEluZGV4LCBhZGRUYXNrLCByZW1vdmVUYXNrfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0OyIsImltcG9ydCBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XHJcbmltcG9ydCBpbmRleENvdW50ZXIgZnJvbSAnLi9oZWxwZXIuanMnO1xyXG4vL3Byb2plY3RzIGNvbnRhaW4gdGFza3MsIHRhc2tzIGNvbnRhaW4gc3VidGFza3NcclxuLy9mb3Igbm93LCB3ZSdsbCBmb2xsb3cgdGhhdCBoaWVyYWNoeVxyXG5cclxuY29uc3Qgc3RvcmFnZSA9ICgoKSA9PiB7XHJcbiAgICAvL3RoZSBkZWZhdWx0IHByb2plY3RzIHRoYXQgY2FuJ3QgYmUgcmVtb3ZlZFxyXG4gICAgY29uc3QgYWxsUHJvamVjdHMgPSBbXTtcclxuICAgIGxldCBjdXJyUHJvamVjdEluZGV4ID0gaW5kZXhDb3VudGVyKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChwcm9qZWN0KXtcclxuICAgICAgICBhbGxQcm9qZWN0cy5wdXNoKHByb2plY3QpO1xyXG4gICAgICAgIHByb2plY3Quc2V0SW5kZXgoY3VyclByb2plY3RJbmRleC5jdXJySW5kZXgpO1xyXG4gICAgICAgIGN1cnJQcm9qZWN0SW5kZXguaW5jcmVtZW50SW5kZXgoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qZWN0KHByb2plY3RJbmRleCl7XHJcbiAgICAgICAgYWxsUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYocHJvamVjdC5nZXRJbmRleCgpID09PSBwcm9qZWN0SW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgYWxsUHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHthbGxQcm9qZWN0cywgYWRkUHJvamVjdCwgcmVtb3ZlUHJvamVjdH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yYWdlO1xyXG5cclxuIiwiLy9jb250YWlucyBhbGwgRE9NIE1hbmlwdWxhdGlvbiB0aGF0J3MgbmVlZGVkIGZvciB0YXNrc1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xyXG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tIFwicmVhY3QtZGF0ZXBpY2tlclwiO1xyXG5cclxuY29uc3QgdWkgPSAoKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gaW5pdGlhbFJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IGJvZHlFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4vKiAgICAgICAgIGFkZE1vdGl2YXRpb25hbE1lc3NhZ2UoKS5yZW5kZXJEZWZhdWx0TWVzc2FnZXMoKTsgKi9cclxuICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBjb250YWluZXJET00oKS5nZXRET00oKTtcclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBwcm9qZWN0SGVhZGVyRE9NKCdJbmJveCcpLmdldERPTSgpO1xyXG4gICAgICAgIGNvbnN0IGFkZFRhc2tEaXYgPSBhZGRUYXNrRGl2RE9NKCkuZ2V0RE9NKCk7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGFkZFRhc2tEaXYpO1xyXG4gICAgICAgIGJvZHlFbGVtLmFwcGVuZENoaWxkKGNvbnRhaW5lckRpdik7XHJcbiAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9qZWN0LmdldE5hbWUoKSA9PT0gJ0luYm94Jyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrcyA9IHByb2plY3QuZ2V0VGFza3MoKVxyXG4gICAgICAgICAgICAgICAgYWRkQWxsVGFza3NET00oY29udGFpbmVyRGl2LCB0YXNrcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlIHRoZSBjb250YWluZXIgdG8gcHV0IGFsbCB0YXNrcywgdGhlIGFkZCB0YXNrIGJ1dHRvbiwgYW5kIHByb2plY3QgaGVhZGVyIGluXHJcbiAgICAvL3VuaXF1ZSBpZCBpcyBjb250YWluZXJcclxuICAgIGNvbnN0IGNvbnRhaW5lckRPTSA9ICgpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBnZXRET00oKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywnY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7Z2V0RE9NfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy90aGUgcHJvamVjdCBoZWFkZXJcclxuICAgIC8vdW5pcXVlIGlkIGlzIGluYm94LWhlYWRlclxyXG4gICAgY29uc3QgcHJvamVjdEhlYWRlckRPTSA9IChoZWFkZXJOYW1lKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gY29udGFpbmVyRGl2KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBoZWFkZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsJ2luYm94LWhlYWRlcicpO1xyXG4gICAgICAgICAgICByZXR1cm4gaGVhZGVyRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGhlYWRpbmdUZXh0KCkge1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcclxuICAgICAgICAgICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkZXItdHlwZScpO1xyXG4gICAgICAgICAgICBoZWFkaW5nLmlubmVyVGV4dCA9IGhlYWRlck5hbWU7XHJcbiAgICAgICAgICAgIHJldHVybiBoZWFkaW5nO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERPTSgpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyRGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGhlYWRpbmdUZXh0KCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHJldHVybiB7Z2V0RE9NfTtcclxuICAgIH1cclxuXHJcbiAgICAvL2RpdiB0aGF0IHdoZW4geW91IGNsaWNrLCB0aGUgYWRkIHRhc2sgZm9ybSBhcHBlYXJzXHJcbiAgICAvL3VuaXF1ZSBpZCBpcyBhZGQtdGFzay1jbGlja2FibGUtZGl2XHJcbiAgICBjb25zdCBhZGRUYXNrRGl2RE9NID0gKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNvbnRhaW5lcigpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FkZC10YXNrLWNsaWNrYWJsZS1kaXYnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHBsdXNJY29uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhJywnZmEtcGx1cycpO1xyXG4gICAgICAgICAgICByZXR1cm4gaWNvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFRhc2tUZXh0KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgYWRkVGFza0Rpdi5pbm5lclRleHQgPSAnQWRkIFRhc2snO1xyXG4gICAgICAgICAgICBhZGRUYXNrRGl2LmNsYXNzTGlzdC5hZGQoJ2FkZC10YXNrLXRleHQnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFkZFRhc2tEaXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRET00oKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gY29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsdXNJY29uRWxlbSA9IHBsdXNJY29uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhc2tUZXh0RWxlbSA9IGFkZFRhc2tUZXh0KCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChwbHVzSWNvbkVsZW0pO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoYWRkVGFza1RleHRFbGVtKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZFRhc2tGb3JtID0gYWRkVGFza0Zvcm1ET00oKS5nZXRET00oKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRUYXNrRm9ybSk7XHJcbiAgICAgICAgICAgIH0sIHtvbmNlOiB0cnVlfSlcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7Z2V0RE9NfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhZGRUYXNrRm9ybURPTSA9ICgpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBnZXRET00oKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBnZXRGb3JtKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1BY3Rpb25zID0gZ2V0Rm9ybUFjdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1BY3Rpb25zKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0Q29udGFpbmVyKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsJ2FkZC10YXNrLWZvcm0tY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRGb3JtKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdpZCcsJ2FkZC10YXNrLWZvcm0nKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGNyZWF0ZUlucHV0KCd0ZXh0JywgJ25hbWUnLCAnTmFtZScsIHRydWUpO1xyXG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gY3JlYXRlSW5wdXQoJ3RleHQnLCAnZGVzY3JpcHRpb24nLCAnRGVzY3JpcHRpb24nLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwb3BvdmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHBvcG92ZXJEaXYuY2xhc3NMaXN0LmFkZCgncG9wb3Zlci1pY29ucy1kaXYnKTtcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlEaXYgPSBnZXRQb3BvdmVySWNvbnMoJ3ByaW9yaXR5LWJ0bicsICdmYS1mbGFnJywgJ1ByaW9yaXR5Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGVEaXYgPSBnZXRQb3BvdmVySWNvbnMoJ2R1ZS1kYXRlLWJ0bicsICdmYS1jYWxlbmRhcicsJ0R1ZSBEYXRlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVzdGltYXRlZFRpbWVEaXYgPSBnZXRQb3BvdmVySWNvbnMoJ2VzdC1jb21wbGV0aW9uLXRpbWUtYnRuJywgJ2ZhLWNsb2NrJywgJ0VzdCBUaW1lJyk7XHJcbiAgICAgICAgICAgIHBvcG92ZXJEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlEaXYpO1xyXG4gICAgICAgICAgICBwb3BvdmVyRGl2LmFwcGVuZENoaWxkKGR1ZURhdGVEaXYpO1xyXG4gICAgICAgICAgICBwb3BvdmVyRGl2LmFwcGVuZENoaWxkKGVzdGltYXRlZFRpbWVEaXYpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFBvcG92ZXJJY29ucyhkaXZJZCwgaWNvbkNsYXNzLCB0ZXh0KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLGRpdklkKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgJyArIHRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1yZWd1bGFyJyxpY29uQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGljb24pO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGljb25UZXh0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbklucHV0KTtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChwb3BvdmVyRGl2KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRGb3JtQWN0aW9ucygpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCdmb3JtLWFjdGlvbnMtZGl2Jyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCdjYW5jZWwtYWRkLXRhc2stZm9ybScpO1xyXG4gICAgICAgICAgICBjYW5jZWxCdG4uaW5uZXJUZXh0ID0gJ0NhbmNlbCc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgc3VibWl0QnRuLnNldEF0dHJpYnV0ZSgnaWQnLCdhZGQtdGFzay1zdWJtaXQtYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5pbm5lclRleHQgPSAnQWRkIFRhc2snO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChzdWJtaXRCdG4pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUlucHV0KHR5cGUsIGlkLCBwbGFjZWhvbGRlciwgaXNSZXF1aXJlZCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgdHlwZSk7XHJcbiAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcbiAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlcik7XHJcbiAgICAgICAgICAgIGlmKGlzUmVxdWlyZWQgPyBpbnB1dC5yZXF1aXJlZCA9IHRydWUgOiBpbnB1dC5yZXF1aXJlZCA9IGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019O1xyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlcyBET00gb2Ygb25lIHRhc2tcclxuICAgIGNvbnN0IHRhc2tET00gPSAodGFza09iaikgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lckRpdigpe1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFzaycpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFza0RpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVUYXNrQnRuRGl2KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlVGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tEaXYuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUtdGFzay1idG4nKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBjb21wbGV0ZVRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXJlZ3VsYXInLCdmYS1jaXJjbGUnKTtcclxuICAgICAgICAgICAgY29tcGxldGVUYXNrRGl2LmFwcGVuZENoaWxkKGNvbXBsZXRlVGFza0ljb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcGxldGVUYXNrRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tUaXRsZURpdih0YXNrT2JqKXtcclxuICAgICAgICAgICAgY29uc3QgdGFza1RpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRhc2tUaXRsZURpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLXRpdGxlJyk7XHJcbiAgICAgICAgICAgIHRhc2tUaXRsZURpdi5pbm5lclRleHQgPSB0YXNrT2JqLmdldE5hbWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRhc2tUaXRsZURpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVUYXNrRGVzY3JpcHRpb25EaXYodGFza09iail7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0YXNrRGVzY3JpcHRpb25EaXYuY2xhc3NMaXN0LmFkZCgndGFzay1kZXNjcmlwdGlvbicpO1xyXG4gICAgICAgICAgICB0YXNrRGVzY3JpcHRpb25EaXYuaW5uZXJUZXh0ID0gdGFza09iai5nZXREZXNjcmlwdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFza0Rlc2NyaXB0aW9uRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tCdXR0b25zRGl2KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbkljb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGJ1dHRvbkljb25zRGl2LmNsYXNzTGlzdC5hZGQoJ2J1dHRvbi1pY29ucycpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHBsdXNJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBwbHVzSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXNxdWFyZS1wbHVzJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtcGVuLXRvLXNxdWFyZScpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGRlbGV0ZUljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS10cmFzaCcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGJ1dHRvbkljb25zRGl2LmFwcGVuZENoaWxkKHBsdXNJY29uKTtcclxuICAgICAgICAgICAgYnV0dG9uSWNvbnNEaXYuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgICAgICAgICBidXR0b25JY29uc0Rpdi5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbkljb25zRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUVzdGltYXRlZFRpbWVEaXYodGFza09iail7XHJcbiAgICAgICAgICAgIGNvbnN0IGVzdGltYXRlZFRpbWVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZXN0aW1hdGVkVGltZURpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLWVzdGltYXRlZC10aW1lJyk7XHJcbiAgICAgICAgICAgIGVzdGltYXRlZFRpbWVEaXYuaW5uZXJUZXh0ID0gYEVzdCBUaW1lOiAke3Rhc2tPYmouZ2V0RXN0aW1hdGVkVGltZSgpfWA7XHJcbiAgICAgICAgICAgIHJldHVybiBlc3RpbWF0ZWRUaW1lRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBjcmVhdGVDb250YWluZXJEaXYoKTtcclxuICAgICAgICAgICAgY29uc3QgYnV0dG9uc0RpdiA9IGNyZWF0ZVRhc2tCdG5EaXYoKTtcclxuICAgICAgICAgICAgY29uc3QgdGl0bGVEaXYgPSBjcmVhdGVUYXNrVGl0bGVEaXYodGFza09iaik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tCdXR0b25zID0gY3JlYXRlVGFza0J1dHRvbnNEaXYoKTtcclxuICAgICAgICAgICAgaWYodGFza09iai5nZXRFc3RpbWF0ZWRUaW1lKCkpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0VzdGltYXRlZFRpbWUgPSBjcmVhdGVFc3RpbWF0ZWRUaW1lRGl2KHRhc2tPYmopO1xyXG4gICAgICAgICAgICAgICAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQodGFza0VzdGltYXRlZFRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRhc2tPYmouZ2V0RGVzY3JpcHRpb24oKSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBjcmVhdGVUYXNrRGVzY3JpcHRpb25EaXYodGFza09iaik7XHJcbiAgICAgICAgICAgICAgICB0aXRsZURpdi5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGJ1dHRvbnNEaXYpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGFza0J1dHRvbnMpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019O1xyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlcyBET00gb2Ygb25lIHN1YnRhc2tcclxuICAgIGNvbnN0IHN1YnRhc2tET00gPSAoc3VidGFza09iaikgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVN1YnRhc2tEaXYoKXtcclxuICAgICAgICAgICAgY29uc3Qgc3VidGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBzdWJ0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3N1YnRhc2snKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YnRhc2tEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ29tcGxldGVTdWJ0YXNrRGl2KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUtdGFzay1idG4nKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBjaXJjbGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBjaXJjbGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXJlZ3VsYXInLCdmYS1jaXJjbGUnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoY2lyY2xlSWNvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU3VidGFza1RpdGxlRGl2KHN1YnRhc2tPYmope1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0aXRsZURpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLXRpdGxlJyk7XHJcbiAgICAgICAgICAgIHRpdGxlRGl2LmlubmVyVGV4dCA9IHN1YnRhc2tPYmouZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGl0bGVEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU3VidGFza0J1dHRvbkljb25zKCkge1xyXG4gICAgICAgICAgICBjb25zdCBidXR0b25zSWNvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBidXR0b25zSWNvbkRpdi5jbGFzc0xpc3QuYWRkKCdidXR0b24taWNvbnMnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1wZW4tdG8tc3F1YXJlJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXRyYXNoJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgYnV0dG9uc0ljb25EaXYuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgICAgICAgICBidXR0b25zSWNvbkRpdi5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbnNJY29uRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBjcmVhdGVTdWJ0YXNrRGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlU3VidGFza0RpdiA9IGNyZWF0ZUNvbXBsZXRlU3VidGFza0RpdigpO1xyXG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrVGl0bGVEaXYgPSBjcmVhdGVTdWJ0YXNrVGl0bGVEaXYoc3VidGFza09iaik7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tCdG5JY29ucyA9IGNyZWF0ZVN1YnRhc2tCdXR0b25JY29ucygpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChjb21wbGV0ZVN1YnRhc2tEaXYpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoc3VidGFza1RpdGxlRGl2KTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tCdG5JY29ucyk7XHJcbiAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZXR1cm4ge2dldERPTX07XHJcbiAgICB9XHJcblxyXG4gICAgLy9hZGRzIGFsbCBkb20gb2YgdGFza3MgYW5kIHN1YnRhc2tzIGluIGEgcHJvamVjdFxyXG4gICAgZnVuY3Rpb24gYWRkQWxsVGFza3NET00oY29udGFpbmVyLCB0YXNrcyl7XHJcbiAgICAgICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tET00odGFzaykuZ2V0RE9NKCkpO1xyXG4gICAgICAgICAgICBjb25zdCBhbGxTdWJ0YXNrcyA9IHRhc2suZ2V0U3VidGFza3MoKTtcclxuICAgICAgICAgICAgYWxsU3VidGFza3MuZm9yRWFjaChzdWJ0YXNrID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJ0YXNrRE9NKHN1YnRhc2spLmdldERPTSgpKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsZWFyQWxsVGFza3MgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcnMnKTtcclxuICAgICAgICBjb250YWluZXJEaXYucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtpbml0aWFsUmVuZGVyLCBjbGVhckFsbFRhc2tzfTtcclxuXHJcbn0pKClcclxuXHJcbmNvbnN0IHJlbmRlclRhc2tzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWRkTW90aXZhdGlvbmFsTWVzc2FnZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5ID0gW107XHJcbiAgICAgICAgY29uc3QgRE9NID0gbW90aXZhdGlvbmFsTWVzc2FnZURPTSgpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkZ1bmN0aW9uYWxpdHkgPSBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIC8vb2JqZWN0IGRlY2xhcmF0aW9uIGZvciBtb3RpdmF0aW9uYWwgbWVzc2FnZXNcclxuICAgICAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxNZXNzYWdlKGhlYWRlciwgbWVzc2FnZSwgYXV0aG9yID0gJycpe1xyXG4gICAgICAgICAgICByZXR1cm4ge2hlYWRlciwgbWVzc2FnZSwgYXV0aG9yfTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL3ByZXNldCBtZXRob2RzIGZvciBtb3RpdmF0aW9uYWwgbWVzc2FnZVxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZERlZmF1bHRNb3RpdmF0aW9uYWxNZXNzYWdlcygpIHtcclxuICAgICAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZTEgPSBtb3RpdmF0aW9uYWxNZXNzYWdlKCdNb3RpdmF0aW9uYWwgTWVzc2FnZScsJ1llc3RlcmRheSB5b3Ugc2FpZCB0b21vcnJvdywgc28ganVzdCBkbyBpdC4gRG9uXFwndCBsZXQgeW91ciBkcmVhbXMgYmUgZHJlYW1zLicsJ1NoaWEgTGFCZW91ZicpO1xyXG4gICAgICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlMiA9ICBtb3RpdmF0aW9uYWxNZXNzYWdlKCdNb3RpdmF0aW9uYWwgTWVzc2FnZScsXCJUaGUgbW9zdCBpbXBvcnRhbnQgaW52ZXN0bWVudCB5b3UgY2FuIG1ha2UgaXMgaW4geW91cnNlbGYuXCIsJ1dhcnJlbiBCdWZmZXR0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2UzID0gbW90aXZhdGlvbmFsTWVzc2FnZSgnUGVyc29uYWwgTWVzc2FnZScsJ1lvdSBjYW4gcGxheSBQb2tlbW9uIGlmIHlvdSBmaW5pc2ggY29kaW5nIHRoaXMgdG8tZG8gbGlzdC4nLCdCcnVjZScpO1xyXG4gICAgICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5LnB1c2gobW90aXZhdGlvbmFsTWVzc2FnZTMpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNob29zZU9uZU1vdGl2YXRpb25hbE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkubGVuZ3RoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXlbcmFuZG9tXTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBkZWxldGVNZXNzYWdlKGluZGV4KSB7XHJcbiAgICAgICAgICAgIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiByZW5kZXJEZWZhdWx0TWVzc2FnZXMoKSB7XHJcbiAgICAgICAgICAgIGFkZERlZmF1bHRNb3RpdmF0aW9uYWxNZXNzYWdlcygpO1xyXG4gICAgICAgICAgICBET00uY3JlYXRlTW90aXZhdGlvbmFsTWVzc2FnZShjaG9vc2VPbmVNb3RpdmF0aW9uYWxNZXNzYWdlKCkpO1xyXG4gICAgICAgICAgICBidG5GdW5jdGlvbmFsaXR5LmFkZEJ0bkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZXR1cm4ge3JlbmRlckRlZmF1bHRNZXNzYWdlcywgZGVsZXRlTWVzc2FnZX07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIHtyZW5kZXJEZWZhdWx0LCBjbGVhckFsbFRhc2tzfTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB1aTtcclxuXHJcblxyXG4vKiBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NID0gKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlTW90aXZhdGlvbmFsTWVzc2FnZShtb3RpdmF0aW9uYWxNZXNzYWdlT2JqKXtcclxuICAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgICAgIGNvbnN0IHBhcmVudERpdiA9IG1vdGl2YXRpb25hbE1lc3NhZ2VDb250YWluZXIoKTtcclxuICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsTWVzc2FnZUhlYWRlcihtb3RpdmF0aW9uYWxNZXNzYWdlT2JqLmhlYWRlcikpO1xyXG4gICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChtb3RpdmF0aW9uYWxNZXNzYWdlKG1vdGl2YXRpb25hbE1lc3NhZ2VPYmoubWVzc2FnZSkpO1xyXG4gICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChtb3RpdmF0aW9uYWxBdXRob3IobW90aXZhdGlvbmFsTWVzc2FnZU9iai5hdXRob3IpKTtcclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHBhcmVudERpdik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbE1lc3NhZ2VDb250YWluZXIoKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGVudC1tYXJnaW4nKTtcclxuICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsJ21vdGl2YXRpb25hbC1tZXNzYWdlJyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxNZXNzYWdlSGVhZGVyKGhlYWRlclRleHQpIHtcclxuICAgICAgICBjb25zdCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBoZWFkZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsJ21vdGl2YXRpb25hbC1tZXNzYWdlLWhlYWRlcicpO1xyXG5cclxuICAgICAgICBjb25zdCBpbnZpc2libGVCdXR0b25zRGl2ID0gYnV0dG9uc0RpdihmYWxzZSk7XHJcbiAgICAgICAgaW52aXNpYmxlQnV0dG9uc0Rpdi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUtZWxlbWVudHMnKTtcclxuXHJcbiAgICAgICAgY29uc3QgdmlzaWJsZUJ1dHRvbnNEaXYgPSBidXR0b25zRGl2KHRydWUpO1xyXG5cclxuICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIG1vdGl2YXRpb25hbE1lc3NhZ2UuaW5uZXJUZXh0ID0gaGVhZGVyVGV4dDtcclxuXHJcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKGludmlzaWJsZUJ1dHRvbnNEaXYpO1xyXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChtb3RpdmF0aW9uYWxNZXNzYWdlKTtcclxuICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQodmlzaWJsZUJ1dHRvbnNEaXYpO1xyXG5cclxuICAgICAgICByZXR1cm4gaGVhZGVyRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJ1dHRvbnNEaXYoaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIHNldHRpbmdzSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcpO1xyXG4gICAgICAgIHNldHRpbmdzSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1nZWFyJyk7XHJcbiAgICAgICAgc2V0dGluZ3NCdG4uYXBwZW5kQ2hpbGQoc2V0dGluZ3NJY29uKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBjb25zdCBjbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XHJcbiAgICAgICAgY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXgnKTtcclxuICAgICAgICBjbG9zZUJ0bi5hcHBlbmRDaGlsZChjbG9zZUljb24pO1xyXG5cclxuICAgICAgICBidXR0b25zRGl2LmFwcGVuZENoaWxkKHNldHRpbmdzQnRuKTtcclxuICAgICAgICBidXR0b25zRGl2LmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcclxuXHJcbiAgICAgICAgaWYoaXNWaXNpYmxlKXtcclxuICAgICAgICAgICAgc2V0dGluZ3NCdG4uc2V0QXR0cmlidXRlKCdpZCcsJ21vdGl2YXRpb25hbC1tZXNzYWdlLXNldHRpbmdzLWJ0bicpO1xyXG4gICAgICAgICAgICBjbG9zZUJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21vdGl2YXRpb25hbC1tZXNzYWdlLWNsb3NlLWJ0bicpOyAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZS1lbGVtZW50cycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbnNEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZVBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBtZXNzYWdlUGFyYWdyYXBoLmlubmVyVGV4dCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VQYXJhZ3JhcGg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsQXV0aG9yKGF1dGhvcikge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VBdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbWVzc2FnZUF1dGhvci5pbm5lclRleHQgPSBhdXRob3I7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VBdXRob3I7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2NyZWF0ZU1vdGl2YXRpb25hbE1lc3NhZ2V9O1xyXG59XHJcblxyXG5jb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NRnVuY3Rpb25hbGl0eSA9ICgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGFkZFNldHRpbmdCdG5GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1zZXR0aW5ncy1idG4nKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTW9kYWxGb3JtKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZENsb3NlQnRuRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1jbG9zZS1idG4nKTtcclxuICAgICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdGl2YXRpb25hbC1tZXNzYWdlJyk7XHJcbiAgICAgICAgICAgIG1vdGl2YXRpb25hbE1lc3NhZ2VEaXYucmVtb3ZlKCk7XHJcbiAgICAgICAgfSkgIFxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEJ0bkZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICAgICAgYWRkQ2xvc2VCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgYWRkU2V0dGluZ0J0bkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2FkZEJ0bkZ1bmN0aW9uYWxpdHl9O1xyXG59XHJcbiAqL1xyXG4vKiBcclxuICAgIC8vbmVlZCB0byBjbGVhbiB0aGlzIHVwXHJcbiAgICAvL2FkZCBhbGwgdGFza3MgYW5kIHRhc2tzIHdpdGggc2VjdGlvbnNcclxuICAgIGZ1bmN0aW9uIGFkZFNlY3Rpb25zVGFza3NET00ocGFyZW50RGl2LCBhbGxTZWN0aW9uc0FycmF5KXtcclxuICAgICAgICBhbGxTZWN0aW9uc0FycmF5LmZvckVhY2goc2VjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25ET00gPSBjcmVhdGVTZWN0aW9uRE9NKHNlY3Rpb24pLmdldFNlY3Rpb25ET00oKTtcclxuICAgICAgICAgICAgc2VjdGlvbi50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0RPTSA9IGNyZWF0ZVRhc2tET00odGFzaykuZ2V0VGFza0RPTSgpO1xyXG4gICAgICAgICAgICAgICAgc2VjdGlvbkRPTS5hcHBlbmRDaGlsZCh0YXNrRE9NKTtcclxuICAgICAgICAgICAgICAgIHRhc2suc3VidGFza3MuZm9yRWFjaChzdWJ0YXNrID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRE9NID0gY3JlYXRlU3VidGFza0RPTShzdWJ0YXNrKS5nZXRTdWJ0YXNrRE9NKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKHN1YnRhc2tET00pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKHNlY3Rpb25ET00pOyAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gKi9cclxuLyogXHJcbiAgICBjb25zdCBjcmVhdGVTZWN0aW9uRE9NID0gKHNlY3Rpb25PYmopID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTZWN0aW9uRGl2KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgc2VjdGlvbkRpdi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWN0aW9uRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVNlY3Rpb25IZWFkZXIoc2VjdGlvbk9iail7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25IZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgc2VjdGlvbkhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLWhlYWRlcicpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24tdGl0bGUnKTtcclxuICAgICAgICAgICAgc2VjdGlvblRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24tdGl0bGUnKTtcclxuICAgICAgICAgICAgc2VjdGlvblRpdGxlLmlubmVyVGV4dCA9IHNlY3Rpb25PYmoubmFtZTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uRHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgc2VjdGlvbkRyb3Bkb3duQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24tZHJvcGRvd24nKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgZHJvcGRvd25JY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGQnLCdmYS1jYXJldC1kb3duJyk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25Ecm9wZG93bkNvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wZG93bkljb24pO1xyXG4gICAgICAgICAgICBzZWN0aW9uSGVhZGVyRGl2LmFwcGVuZENoaWxkKHNlY3Rpb25UaXRsZSk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25IZWFkZXJEaXYuYXBwZW5kQ2hpbGQoc2VjdGlvbkRyb3Bkb3duQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25IZWFkZXJEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0U2VjdGlvbkRPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uRGl2ID0gY3JlYXRlU2VjdGlvbkRpdigpO1xyXG4gICAgICAgICAgICBzZWN0aW9uRGl2LmFwcGVuZENoaWxkKGNyZWF0ZVNlY3Rpb25IZWFkZXIoc2VjdGlvbk9iaikpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VjdGlvbkRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZXR1cm4ge2dldFNlY3Rpb25ET019O1xyXG4gICAgfSAqLyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy9yZW5kZXIgaW5ib3hcclxuaW1wb3J0IFVJIGZyb20gJy4vdWkuanMnO1xyXG5pbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3QuanMnO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xyXG5cclxuKCgpID0+IHtcclxuICAgIHJlbmRlckRlZmF1bHRQcm9qZWN0cygpO1xyXG4gICAgVUkuaW5pdGlhbFJlbmRlcigpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlckRlZmF1bHRQcm9qZWN0cygpe1xyXG4gICAgICAgIGxldCBpbmJveCA9IHByb2plY3QoJ0luYm94Jyk7XHJcbiAgICAgICAgbGV0IHRvZGF5ID0gcHJvamVjdCgnVG9kYXknKTtcclxuICAgICAgICBsZXQgdGhpc3dlZWsgPSBwcm9qZWN0KCdUaGlzIFdlZWsnKTtcclxuICAgICAgICBzdG9yYWdlLmFkZFByb2plY3QoaW5ib3gpO1xyXG4gICAgICAgIHN0b3JhZ2UuYWRkUHJvamVjdCh0b2RheSk7XHJcbiAgICAgICAgc3RvcmFnZS5hZGRQcm9qZWN0KHRoaXN3ZWVrKTtcclxuICAgIH1cclxuXHJcblxyXG59KSgpO1xyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9