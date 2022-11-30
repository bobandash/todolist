/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/motivationalMessage.js":
/*!************************************!*\
  !*** ./src/motivationalMessage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addMotivationalMessage": () => (/* binding */ addMotivationalMessage)
/* harmony export */ });
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




/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "project": () => (/* binding */ project),
/* harmony export */   "section": () => (/* binding */ section),
/* harmony export */   "storage": () => (/* binding */ storage),
/* harmony export */   "subtask": () => (/* binding */ subtask),
/* harmony export */   "task": () => (/* binding */ task),
/* harmony export */   "taskIndex": () => (/* binding */ taskIndex)
/* harmony export */ });
/* harmony import */ var _taskDOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskDOM.js */ "./src/taskDOM.js");
//js file contains the everything related to tasks
//task object and subtask object to create


//projects contain sections, sections contain tasks, tasks contain subtasks
//some tasks don't have sections
//project by default is inbox
const storage = () => {
    const allProjects = [];
    const allSections = [];
    const allTasks = [];
    return {allSections, allProjects, allTasks};
}

const taskIndex = () => {
    let taskIndex = 0;
    function incrementIndex(){
        taskIndex++;
    }
    function getIndex(){
        return taskIndex;
    }
    return {incrementIndex, getIndex};
}

const project = (name, sections = []) => {
    function getName(){
        return name;
    }

    function changeName(newName){
        name = newName;
    }

    function addSection(section){
        sections.push(section);
    }

    function removeSection(section){
    }

    return {getName, changeName, addSection, removeSection}
}

const section = (name, index, tasks = []) => {
    return {name, index, tasks};
}

const task = (
    name,
    description,
    index,
    dueDate = '',
    estimatedTime = '',
    priority = '',
    project = '',
    section = '',
    subtasks = []) =>
{
    let currSubtaskIndex = 0;

    function incrementSubtaskIndex(){
        currSubtaskIndex++;
    }

    function getName(){
        return name;
    }

    function getDescription(){
        return description;
    }
    
    function getSection(){
        return section;
    }

    function getEstimatedTime(){
        return estimatedTime;
    }

    function addSubtask(subtaskObj){
        subtaskObj.setIndex(currSubtaskIndex);
        subtasks.push(subtaskObj);
        incrementSubtaskIndex;
    }

    function editSubtask(subtaskObj){
        subtasks.forEach((subtask, i) => {
            if(subtask.index === index){
                subtasks[i] = subtaskObj;
                return;
            }
        })
    }

    function removeSubtask(index){
        subtasks.forEach((subtask, i) => {
            if(subtask.index === index){
                subtasks.splice(i, 1);
                return;
            }
        })
    }

    //pretty sure there's a better way to do this
    function editTask(newTaskObj) {
        name = newTaskObj.name;
        description = newTaskObj.description;
        dueDate = newTaskObj.dueDate;
        estimatedTime = newTaskObj.estimatedTime;
        priority = newTaskObj.priority;
        project = newTaskObj.project;
    }

    return {index, subtasks, addSubtask, removeSubtask, editSubtask, editTask, getSection, getName, getDescription, getEstimatedTime};
}

const subtask = (
    name,
    description,
    dueDate = '',
    estimatedTime = '',
    priority = '') =>
{
    let index = 0;
    function setIndex(newIndex){
        index = newIndex;
    }

    function getIndex(){
        return index;
    }

    function editSubtask(subtaskObj){
        name = subtaskObj.name;
        description = subtaskObj.description;
        dueDate = subtaskObj.dueDate;
        estimatedTime = subtaskObj.estimatedTime;
        priority = subtaskObj.priority;
    }

    function getName(){
        return name;
    }

    return {editSubtask, setIndex, getIndex, getName};
}








/***/ }),

/***/ "./src/taskDOM.js":
/*!************************!*\
  !*** ./src/taskDOM.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderTasks": () => (/* binding */ renderTasks)
/* harmony export */ });
/* harmony import */ var _motivationalMessage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./motivationalMessage.js */ "./src/motivationalMessage.js");




//contains all DOM Manipulation that's needed for tasks
const renderTasks = () => {
    const renderDefault = (allSectionsArray, allTasksArray) => {
        const bodyElem = document.querySelector('body');
        (0,_motivationalMessage_js__WEBPACK_IMPORTED_MODULE_0__.addMotivationalMessage)().renderDefaultMessages();
        const containerDiv = createContainerDOM().containerDOM();
        const header = createHeaderDOM().getHeaderDOM();
        containerDiv.appendChild(header);
        bodyElem.appendChild(containerDiv);
        addSectionsTasksDOM(containerDiv, allSectionsArray);
        addNoSectionsTasksDOM(containerDiv, allTasksArray);
    }

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

    function addNoSectionsTasksDOM(parentDiv, allTasksArray){
        const noSectionTasksArray = allTasksArray.filter(task => !task.getSection());
        noSectionTasksArray.forEach(task => {
            const taskDOM = createTaskDOM(task).getTaskDOM();
            parentDiv.appendChild(taskDOM);
            const allSubtasks = task.subtasks;
            allSubtasks.forEach(subtask => {
                const subtaskDOM = createSubtaskDOM(subtask).getSubtaskDOM();
                parentDiv.appendChild(subtaskDOM);
            })
        })
    }
    

    const clearAllTasks = () => {
        const containerDiv = document.getElementById('content-margin');
        containerDiv.remove();
    }

    return {renderDefault, clearAllTasks};
}



const createContainerDOM = () => {
    function containerDOM(){
        const containerDiv = document.createElement('div');
        containerDiv.setAttribute('id','content-margin');
        return containerDiv;
    }
    return {containerDOM};
}

const createHeaderDOM = (headerName) => {
    function containerDiv(){
        const headerDiv = document.createElement('div');
        headerDiv.setAttribute('id','inbox-header');
        return headerDiv;
    }

    function headingText() {
        const heading = document.createElement('h1');
        heading.classList.add('header-type');
        heading.innerText = 'Inbox';
        return heading;
    }

    function headerIcons() {
        const headerIconDiv = document.createElement('div');
        headerIconDiv.classList.add('header-icon');

        const folderIcon = document.createElement('i');
        folderIcon.classList.add('fa-solid','fa-folder-plus');

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
}

const createTaskDOM = (taskObj) => {
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

    function getTaskDOM(){
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

    return {getTaskDOM};
}

const createSubtaskDOM = (subtaskObj) => {
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

    function getSubtaskDOM(){
        const containerDiv = createSubtaskDiv();
        const completeSubtaskDiv = createCompleteSubtaskDiv();
        const subtaskTitleDiv = createSubtaskTitleDiv(subtaskObj);
        const subtaskBtnIcons = createSubtaskButtonIcons();

        containerDiv.appendChild(completeSubtaskDiv);
        containerDiv.appendChild(subtaskTitleDiv);
        containerDiv.appendChild(subtaskBtnIcons);

        return containerDiv;
    }

    return {getSubtaskDOM};
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
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ "./src/task.js");
/* harmony import */ var _taskDOM_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskDOM.js */ "./src/taskDOM.js");



//render inbox
(() => {
    const currTaskIndex = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.taskIndex)();
    const render = (0,_taskDOM_js__WEBPACK_IMPORTED_MODULE_1__.renderTasks)();
    const allTasks = [];
    const subtask1 = [(0,_task_js__WEBPACK_IMPORTED_MODULE_0__.subtask)('Do something', 'Small Description'),(0,_task_js__WEBPACK_IMPORTED_MODULE_0__.subtask)('Do something', 'Small Description')];
    const task1Test = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('Do something','Small Description',1,'12/31/2021','2 hr 40 min', undefined, undefined, undefined, subtask1);
    const task2Test = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('Do something','Small Description',1,'12/31/2021','2 hr 40 min');
    allTasks.push(task1Test, task2Test);
    render.renderDefault([],allTasks);
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNnQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0loQztBQUNBO0FBQ3lDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDNkQ7QUFDN0Q7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekpBO0FBQ0E7QUFDK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0VBQXNCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCwyQkFBMkI7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNxQjs7Ozs7OztVQzNSckI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOOEU7QUFDckM7QUFDekM7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1EQUFTO0FBQ25DLG1CQUFtQix3REFBVztBQUM5QjtBQUNBLHNCQUFzQixpREFBTyxzQ0FBc0MsaURBQU87QUFDMUUsc0JBQXNCLDhDQUFJO0FBQzFCLHNCQUFzQiw4Q0FBSTtBQUMxQjtBQUNBO0FBQ0EsQ0FBQztBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb3RpdmF0aW9uYWxNZXNzYWdlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2tET00uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZURPTSA9ICgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vdGl2YXRpb25hbE1lc3NhZ2UobW90aXZhdGlvbmFsTWVzc2FnZU9iail7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICAgICAgICBjb25zdCBwYXJlbnREaXYgPSBtb3RpdmF0aW9uYWxNZXNzYWdlQ29udGFpbmVyKCk7XHJcbiAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKG1vdGl2YXRpb25hbE1lc3NhZ2VIZWFkZXIobW90aXZhdGlvbmFsTWVzc2FnZU9iai5oZWFkZXIpKTtcclxuICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsTWVzc2FnZShtb3RpdmF0aW9uYWxNZXNzYWdlT2JqLm1lc3NhZ2UpKTtcclxuICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsQXV0aG9yKG1vdGl2YXRpb25hbE1lc3NhZ2VPYmouYXV0aG9yKSk7XHJcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChwYXJlbnREaXYpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxNZXNzYWdlQ29udGFpbmVyKCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtbWFyZ2luJyk7XHJcbiAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCdtb3RpdmF0aW9uYWwtbWVzc2FnZScpO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZUhlYWRlcihoZWFkZXJUZXh0KSB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaGVhZGVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1oZWFkZXInKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW52aXNpYmxlQnV0dG9uc0RpdiA9IGJ1dHRvbnNEaXYoZmFsc2UpO1xyXG4gICAgICAgIGludmlzaWJsZUJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlLWVsZW1lbnRzJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHZpc2libGVCdXR0b25zRGl2ID0gYnV0dG9uc0Rpdih0cnVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlLmlubmVyVGV4dCA9IGhlYWRlclRleHQ7XHJcblxyXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChpbnZpc2libGVCdXR0b25zRGl2KTtcclxuICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsTWVzc2FnZSk7XHJcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKHZpc2libGVCdXR0b25zRGl2KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhlYWRlckRpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBidXR0b25zRGl2KGlzVmlzaWJsZSkge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBzZXR0aW5nc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBzZXR0aW5nc0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnKTtcclxuICAgICAgICBzZXR0aW5nc0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtZ2VhcicpO1xyXG4gICAgICAgIHNldHRpbmdzQnRuLmFwcGVuZENoaWxkKHNldHRpbmdzSWNvbik7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3QgY2xvc2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcpO1xyXG4gICAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS14Jyk7XHJcbiAgICAgICAgY2xvc2VCdG4uYXBwZW5kQ2hpbGQoY2xvc2VJY29uKTtcclxuXHJcbiAgICAgICAgYnV0dG9uc0Rpdi5hcHBlbmRDaGlsZChzZXR0aW5nc0J0bik7XHJcbiAgICAgICAgYnV0dG9uc0Rpdi5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XHJcblxyXG4gICAgICAgIGlmKGlzVmlzaWJsZSl7XHJcbiAgICAgICAgICAgIHNldHRpbmdzQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1zZXR0aW5ncy1idG4nKTtcclxuICAgICAgICAgICAgY2xvc2VCdG4uc2V0QXR0cmlidXRlKCdpZCcsICdtb3RpdmF0aW9uYWwtbWVzc2FnZS1jbG9zZS1idG4nKTsgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYnV0dG9uc0Rpdi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUtZWxlbWVudHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidXR0b25zRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbWVzc2FnZVBhcmFncmFwaC5pbm5lclRleHQgPSBtZXNzYWdlO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlUGFyYWdyYXBoO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbEF1dGhvcihhdXRob3IpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlQXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIG1lc3NhZ2VBdXRob3IuaW5uZXJUZXh0ID0gYXV0aG9yO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlQXV0aG9yOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtjcmVhdGVNb3RpdmF0aW9uYWxNZXNzYWdlfTtcclxufVxyXG5cclxuY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZURPTUZ1bmN0aW9uYWxpdHkgPSAoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBhZGRTZXR0aW5nQnRuRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW90aXZhdGlvbmFsLW1lc3NhZ2Utc2V0dGluZ3MtYnRuJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vZGFsRm9ybSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDbG9zZUJ0bkZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW90aXZhdGlvbmFsLW1lc3NhZ2UtY2xvc2UtYnRuJyk7XHJcbiAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3RpdmF0aW9uYWwtbWVzc2FnZScpO1xyXG4gICAgICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlRGl2LnJlbW92ZSgpO1xyXG4gICAgICAgIH0pICBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRCdG5GdW5jdGlvbmFsaXR5KCkge1xyXG4gICAgICAgIGFkZENsb3NlQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIGFkZFNldHRpbmdCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHthZGRCdG5GdW5jdGlvbmFsaXR5fTtcclxufVxyXG5cclxuY29uc3QgYWRkTW90aXZhdGlvbmFsTWVzc2FnZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IERPTSA9IG1vdGl2YXRpb25hbE1lc3NhZ2VET00oKTtcclxuICAgIGNvbnN0IGJ0bkZ1bmN0aW9uYWxpdHkgPSBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgLy9vYmplY3QgZGVjbGFyYXRpb24gZm9yIG1vdGl2YXRpb25hbCBtZXNzYWdlc1xyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZShoZWFkZXIsIG1lc3NhZ2UsIGF1dGhvciA9ICcnKXtcclxuICAgICAgICByZXR1cm4ge2hlYWRlciwgbWVzc2FnZSwgYXV0aG9yfTtcclxuICAgIH1cclxuXHJcbiAgICAvL3ByZXNldCBtZXRob2RzIGZvciBtb3RpdmF0aW9uYWwgbWVzc2FnZVxyXG4gICAgZnVuY3Rpb24gYWRkRGVmYXVsdE1vdGl2YXRpb25hbE1lc3NhZ2VzKCkge1xyXG4gICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2UxID0gbW90aXZhdGlvbmFsTWVzc2FnZSgnTW90aXZhdGlvbmFsIE1lc3NhZ2UnLCdZZXN0ZXJkYXkgeW91IHNhaWQgdG9tb3Jyb3csIHNvIGp1c3QgZG8gaXQuIERvblxcJ3QgbGV0IHlvdXIgZHJlYW1zIGJlIGRyZWFtcy4nLCdTaGlhIExhQmVvdWYnKTtcclxuICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlMiA9ICBtb3RpdmF0aW9uYWxNZXNzYWdlKCdNb3RpdmF0aW9uYWwgTWVzc2FnZScsXCJUaGUgbW9zdCBpbXBvcnRhbnQgaW52ZXN0bWVudCB5b3UgY2FuIG1ha2UgaXMgaW4geW91cnNlbGYuXCIsJ1dhcnJlbiBCdWZmZXR0Jyk7XHJcbiAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZTMgPSBtb3RpdmF0aW9uYWxNZXNzYWdlKCdQZXJzb25hbCBNZXNzYWdlJywnWW91IGNhbiBwbGF5IFBva2Vtb24gaWYgeW91IGZpbmlzaCBjb2RpbmcgdGhpcyB0by1kbyBsaXN0LicsJ0JydWNlJyk7XHJcbiAgICAgICAgbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheS5wdXNoKG1vdGl2YXRpb25hbE1lc3NhZ2UzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaG9vc2VPbmVNb3RpdmF0aW9uYWxNZXNzYWdlKCkge1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkubGVuZ3RoKTtcclxuICAgICAgICByZXR1cm4gbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheVtyYW5kb21dO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZU1lc3NhZ2UoaW5kZXgpIHtcclxuICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyRGVmYXVsdE1lc3NhZ2VzKCkge1xyXG4gICAgICAgIGFkZERlZmF1bHRNb3RpdmF0aW9uYWxNZXNzYWdlcygpO1xyXG4gICAgICAgIERPTS5jcmVhdGVNb3RpdmF0aW9uYWxNZXNzYWdlKGNob29zZU9uZU1vdGl2YXRpb25hbE1lc3NhZ2UoKSk7XHJcbiAgICAgICAgYnRuRnVuY3Rpb25hbGl0eS5hZGRCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtyZW5kZXJEZWZhdWx0TWVzc2FnZXMsIGRlbGV0ZU1lc3NhZ2V9O1xyXG59XHJcblxyXG5leHBvcnQge2FkZE1vdGl2YXRpb25hbE1lc3NhZ2V9O1xyXG4iLCIvL2pzIGZpbGUgY29udGFpbnMgdGhlIGV2ZXJ5dGhpbmcgcmVsYXRlZCB0byB0YXNrc1xyXG4vL3Rhc2sgb2JqZWN0IGFuZCBzdWJ0YXNrIG9iamVjdCB0byBjcmVhdGVcclxuaW1wb3J0IHtyZW5kZXJUYXNrc30gZnJvbSAnLi90YXNrRE9NLmpzJztcclxuXHJcbi8vcHJvamVjdHMgY29udGFpbiBzZWN0aW9ucywgc2VjdGlvbnMgY29udGFpbiB0YXNrcywgdGFza3MgY29udGFpbiBzdWJ0YXNrc1xyXG4vL3NvbWUgdGFza3MgZG9uJ3QgaGF2ZSBzZWN0aW9uc1xyXG4vL3Byb2plY3QgYnkgZGVmYXVsdCBpcyBpbmJveFxyXG5jb25zdCBzdG9yYWdlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWxsUHJvamVjdHMgPSBbXTtcclxuICAgIGNvbnN0IGFsbFNlY3Rpb25zID0gW107XHJcbiAgICBjb25zdCBhbGxUYXNrcyA9IFtdO1xyXG4gICAgcmV0dXJuIHthbGxTZWN0aW9ucywgYWxsUHJvamVjdHMsIGFsbFRhc2tzfTtcclxufVxyXG5cclxuY29uc3QgdGFza0luZGV4ID0gKCkgPT4ge1xyXG4gICAgbGV0IHRhc2tJbmRleCA9IDA7XHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRJbmRleCgpe1xyXG4gICAgICAgIHRhc2tJbmRleCsrO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoKXtcclxuICAgICAgICByZXR1cm4gdGFza0luZGV4O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtpbmNyZW1lbnRJbmRleCwgZ2V0SW5kZXh9O1xyXG59XHJcblxyXG5jb25zdCBwcm9qZWN0ID0gKG5hbWUsIHNlY3Rpb25zID0gW10pID0+IHtcclxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VOYW1lKG5ld05hbWUpe1xyXG4gICAgICAgIG5hbWUgPSBuZXdOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFNlY3Rpb24oc2VjdGlvbil7XHJcbiAgICAgICAgc2VjdGlvbnMucHVzaChzZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVTZWN0aW9uKHNlY3Rpb24pe1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7Z2V0TmFtZSwgY2hhbmdlTmFtZSwgYWRkU2VjdGlvbiwgcmVtb3ZlU2VjdGlvbn1cclxufVxyXG5cclxuY29uc3Qgc2VjdGlvbiA9IChuYW1lLCBpbmRleCwgdGFza3MgPSBbXSkgPT4ge1xyXG4gICAgcmV0dXJuIHtuYW1lLCBpbmRleCwgdGFza3N9O1xyXG59XHJcblxyXG5jb25zdCB0YXNrID0gKFxyXG4gICAgbmFtZSxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgaW5kZXgsXHJcbiAgICBkdWVEYXRlID0gJycsXHJcbiAgICBlc3RpbWF0ZWRUaW1lID0gJycsXHJcbiAgICBwcmlvcml0eSA9ICcnLFxyXG4gICAgcHJvamVjdCA9ICcnLFxyXG4gICAgc2VjdGlvbiA9ICcnLFxyXG4gICAgc3VidGFza3MgPSBbXSkgPT5cclxue1xyXG4gICAgbGV0IGN1cnJTdWJ0YXNrSW5kZXggPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudFN1YnRhc2tJbmRleCgpe1xyXG4gICAgICAgIGN1cnJTdWJ0YXNrSW5kZXgrKztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXROYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oKXtcclxuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGdldFNlY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gc2VjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRFc3RpbWF0ZWRUaW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIGVzdGltYXRlZFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkU3VidGFzayhzdWJ0YXNrT2JqKXtcclxuICAgICAgICBzdWJ0YXNrT2JqLnNldEluZGV4KGN1cnJTdWJ0YXNrSW5kZXgpO1xyXG4gICAgICAgIHN1YnRhc2tzLnB1c2goc3VidGFza09iaik7XHJcbiAgICAgICAgaW5jcmVtZW50U3VidGFza0luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVkaXRTdWJ0YXNrKHN1YnRhc2tPYmope1xyXG4gICAgICAgIHN1YnRhc2tzLmZvckVhY2goKHN1YnRhc2ssIGkpID0+IHtcclxuICAgICAgICAgICAgaWYoc3VidGFzay5pbmRleCA9PT0gaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgc3VidGFza3NbaV0gPSBzdWJ0YXNrT2JqO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVTdWJ0YXNrKGluZGV4KXtcclxuICAgICAgICBzdWJ0YXNrcy5mb3JFYWNoKChzdWJ0YXNrLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHN1YnRhc2suaW5kZXggPT09IGluZGV4KXtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9wcmV0dHkgc3VyZSB0aGVyZSdzIGEgYmV0dGVyIHdheSB0byBkbyB0aGlzXHJcbiAgICBmdW5jdGlvbiBlZGl0VGFzayhuZXdUYXNrT2JqKSB7XHJcbiAgICAgICAgbmFtZSA9IG5ld1Rhc2tPYmoubmFtZTtcclxuICAgICAgICBkZXNjcmlwdGlvbiA9IG5ld1Rhc2tPYmouZGVzY3JpcHRpb247XHJcbiAgICAgICAgZHVlRGF0ZSA9IG5ld1Rhc2tPYmouZHVlRGF0ZTtcclxuICAgICAgICBlc3RpbWF0ZWRUaW1lID0gbmV3VGFza09iai5lc3RpbWF0ZWRUaW1lO1xyXG4gICAgICAgIHByaW9yaXR5ID0gbmV3VGFza09iai5wcmlvcml0eTtcclxuICAgICAgICBwcm9qZWN0ID0gbmV3VGFza09iai5wcm9qZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7aW5kZXgsIHN1YnRhc2tzLCBhZGRTdWJ0YXNrLCByZW1vdmVTdWJ0YXNrLCBlZGl0U3VidGFzaywgZWRpdFRhc2ssIGdldFNlY3Rpb24sIGdldE5hbWUsIGdldERlc2NyaXB0aW9uLCBnZXRFc3RpbWF0ZWRUaW1lfTtcclxufVxyXG5cclxuY29uc3Qgc3VidGFzayA9IChcclxuICAgIG5hbWUsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGR1ZURhdGUgPSAnJyxcclxuICAgIGVzdGltYXRlZFRpbWUgPSAnJyxcclxuICAgIHByaW9yaXR5ID0gJycpID0+XHJcbntcclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBmdW5jdGlvbiBzZXRJbmRleChuZXdJbmRleCl7XHJcbiAgICAgICAgaW5kZXggPSBuZXdJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleCgpe1xyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlZGl0U3VidGFzayhzdWJ0YXNrT2JqKXtcclxuICAgICAgICBuYW1lID0gc3VidGFza09iai5uYW1lO1xyXG4gICAgICAgIGRlc2NyaXB0aW9uID0gc3VidGFza09iai5kZXNjcmlwdGlvbjtcclxuICAgICAgICBkdWVEYXRlID0gc3VidGFza09iai5kdWVEYXRlO1xyXG4gICAgICAgIGVzdGltYXRlZFRpbWUgPSBzdWJ0YXNrT2JqLmVzdGltYXRlZFRpbWU7XHJcbiAgICAgICAgcHJpb3JpdHkgPSBzdWJ0YXNrT2JqLnByaW9yaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2VkaXRTdWJ0YXNrLCBzZXRJbmRleCwgZ2V0SW5kZXgsIGdldE5hbWV9O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHtzdG9yYWdlLCB0YXNrSW5kZXgsIHNlY3Rpb24sIHByb2plY3QsIHRhc2ssIHN1YnRhc2t9O1xyXG5cclxuXHJcblxyXG4iLCJcclxuXHJcbmltcG9ydCB7YWRkTW90aXZhdGlvbmFsTWVzc2FnZX0gZnJvbSAnLi9tb3RpdmF0aW9uYWxNZXNzYWdlLmpzJ1xyXG5cclxuLy9jb250YWlucyBhbGwgRE9NIE1hbmlwdWxhdGlvbiB0aGF0J3MgbmVlZGVkIGZvciB0YXNrc1xyXG5jb25zdCByZW5kZXJUYXNrcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJlbmRlckRlZmF1bHQgPSAoYWxsU2VjdGlvbnNBcnJheSwgYWxsVGFza3NBcnJheSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJvZHlFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgICAgIGFkZE1vdGl2YXRpb25hbE1lc3NhZ2UoKS5yZW5kZXJEZWZhdWx0TWVzc2FnZXMoKTtcclxuICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBjcmVhdGVDb250YWluZXJET00oKS5jb250YWluZXJET00oKTtcclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXJET00oKS5nZXRIZWFkZXJET00oKTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgICAgICBib2R5RWxlbS5hcHBlbmRDaGlsZChjb250YWluZXJEaXYpO1xyXG4gICAgICAgIGFkZFNlY3Rpb25zVGFza3NET00oY29udGFpbmVyRGl2LCBhbGxTZWN0aW9uc0FycmF5KTtcclxuICAgICAgICBhZGROb1NlY3Rpb25zVGFza3NET00oY29udGFpbmVyRGl2LCBhbGxUYXNrc0FycmF5KTtcclxuICAgIH1cclxuXHJcbiAgICAvL25lZWQgdG8gY2xlYW4gdGhpcyB1cFxyXG4gICAgLy9hZGQgYWxsIHRhc2tzIGFuZCB0YXNrcyB3aXRoIHNlY3Rpb25zXHJcbiAgICBmdW5jdGlvbiBhZGRTZWN0aW9uc1Rhc2tzRE9NKHBhcmVudERpdiwgYWxsU2VjdGlvbnNBcnJheSl7XHJcbiAgICAgICAgYWxsU2VjdGlvbnNBcnJheS5mb3JFYWNoKHNlY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uRE9NID0gY3JlYXRlU2VjdGlvbkRPTShzZWN0aW9uKS5nZXRTZWN0aW9uRE9NKCk7XHJcbiAgICAgICAgICAgIHNlY3Rpb24udGFza3MuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tET00gPSBjcmVhdGVUYXNrRE9NKHRhc2spLmdldFRhc2tET00oKTtcclxuICAgICAgICAgICAgICAgIHNlY3Rpb25ET00uYXBwZW5kQ2hpbGQodGFza0RPTSk7XHJcbiAgICAgICAgICAgICAgICB0YXNrLnN1YnRhc2tzLmZvckVhY2goc3VidGFzayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0RPTSA9IGNyZWF0ZVN1YnRhc2tET00oc3VidGFzaykuZ2V0U3VidGFza0RPTSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChzdWJ0YXNrRE9NKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChzZWN0aW9uRE9NKTsgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGROb1NlY3Rpb25zVGFza3NET00ocGFyZW50RGl2LCBhbGxUYXNrc0FycmF5KXtcclxuICAgICAgICBjb25zdCBub1NlY3Rpb25UYXNrc0FycmF5ID0gYWxsVGFza3NBcnJheS5maWx0ZXIodGFzayA9PiAhdGFzay5nZXRTZWN0aW9uKCkpO1xyXG4gICAgICAgIG5vU2VjdGlvblRhc2tzQXJyYXkuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFza0RPTSA9IGNyZWF0ZVRhc2tET00odGFzaykuZ2V0VGFza0RPTSgpO1xyXG4gICAgICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQodGFza0RPTSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbFN1YnRhc2tzID0gdGFzay5zdWJ0YXNrcztcclxuICAgICAgICAgICAgYWxsU3VidGFza3MuZm9yRWFjaChzdWJ0YXNrID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tET00gPSBjcmVhdGVTdWJ0YXNrRE9NKHN1YnRhc2spLmdldFN1YnRhc2tET00oKTtcclxuICAgICAgICAgICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChzdWJ0YXNrRE9NKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgY29uc3QgY2xlYXJBbGxUYXNrcyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudC1tYXJnaW4nKTtcclxuICAgICAgICBjb250YWluZXJEaXYucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtyZW5kZXJEZWZhdWx0LCBjbGVhckFsbFRhc2tzfTtcclxufVxyXG5cclxuXHJcblxyXG5jb25zdCBjcmVhdGVDb250YWluZXJET00gPSAoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBjb250YWluZXJET00oKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb250YWluZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsJ2NvbnRlbnQtbWFyZ2luJyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgIH1cclxuICAgIHJldHVybiB7Y29udGFpbmVyRE9NfTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlSGVhZGVyRE9NID0gKGhlYWRlck5hbWUpID0+IHtcclxuICAgIGZ1bmN0aW9uIGNvbnRhaW5lckRpdigpe1xyXG4gICAgICAgIGNvbnN0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGhlYWRlckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywnaW5ib3gtaGVhZGVyJyk7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlckRpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoZWFkaW5nVGV4dCgpIHtcclxuICAgICAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcclxuICAgICAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci10eXBlJyk7XHJcbiAgICAgICAgaGVhZGluZy5pbm5lclRleHQgPSAnSW5ib3gnO1xyXG4gICAgICAgIHJldHVybiBoZWFkaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhlYWRlckljb25zKCkge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlckljb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBoZWFkZXJJY29uRGl2LmNsYXNzTGlzdC5hZGQoJ2hlYWRlci1pY29uJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZvbGRlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgZm9sZGVySWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLWZvbGRlci1wbHVzJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc3F1YXJlLXBsdXMnKTtcclxuXHJcbiAgICAgICAgaGVhZGVySWNvbkRpdi5hcHBlbmRDaGlsZChmb2xkZXJJY29uKTtcclxuICAgICAgICBoZWFkZXJJY29uRGl2LmFwcGVuZENoaWxkKHRhc2tJY29uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhlYWRlckljb25EaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SGVhZGVyRE9NKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRhaW5lckRpdigpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGhlYWRpbmdUZXh0KCk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVySWNvbnNEaXYgPSBoZWFkZXJJY29ucygpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXJJY29uc0Rpdik7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2dldEhlYWRlckRPTX07XHJcbn1cclxuXHJcblxyXG5jb25zdCBjcmVhdGVTZWN0aW9uRE9NID0gKHNlY3Rpb25PYmopID0+IHtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNlY3Rpb25EaXYoKXtcclxuICAgICAgICBjb25zdCBzZWN0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgc2VjdGlvbkRpdi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uJyk7XHJcbiAgICAgICAgcmV0dXJuIHNlY3Rpb25EaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlU2VjdGlvbkhlYWRlcihzZWN0aW9uT2JqKXtcclxuICAgICAgICBjb25zdCBzZWN0aW9uSGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgc2VjdGlvbkhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLWhlYWRlcicpO1xyXG5cclxuICAgICAgICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uLXRpdGxlJyk7XHJcbiAgICAgICAgc2VjdGlvblRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24tdGl0bGUnKTtcclxuICAgICAgICBzZWN0aW9uVGl0bGUuaW5uZXJUZXh0ID0gc2VjdGlvbk9iai5uYW1lO1xyXG5cclxuICAgICAgICBjb25zdCBzZWN0aW9uRHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBzZWN0aW9uRHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbi1kcm9wZG93bicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGRyb3Bkb3duSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBkcm9wZG93bkljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29sZCcsJ2ZhLWNhcmV0LWRvd24nKTtcclxuICAgICAgICBzZWN0aW9uRHJvcGRvd25Db250YWluZXIuYXBwZW5kQ2hpbGQoZHJvcGRvd25JY29uKTtcclxuICAgICAgICBzZWN0aW9uSGVhZGVyRGl2LmFwcGVuZENoaWxkKHNlY3Rpb25UaXRsZSk7XHJcbiAgICAgICAgc2VjdGlvbkhlYWRlckRpdi5hcHBlbmRDaGlsZChzZWN0aW9uRHJvcGRvd25Db250YWluZXIpO1xyXG4gICAgICAgIHJldHVybiBzZWN0aW9uSGVhZGVyRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlY3Rpb25ET00oKXtcclxuICAgICAgICBjb25zdCBzZWN0aW9uRGl2ID0gY3JlYXRlU2VjdGlvbkRpdigpO1xyXG4gICAgICAgIHNlY3Rpb25EaXYuYXBwZW5kQ2hpbGQoY3JlYXRlU2VjdGlvbkhlYWRlcihzZWN0aW9uT2JqKSk7XHJcbiAgICAgICAgcmV0dXJuIHNlY3Rpb25EaXY7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtnZXRTZWN0aW9uRE9NfTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlVGFza0RPTSA9ICh0YXNrT2JqKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb250YWluZXJEaXYoKXtcclxuICAgICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XHJcbiAgICAgICAgcmV0dXJuIHRhc2tEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFza0J0bkRpdigpe1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlVGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbXBsZXRlVGFza0Rpdi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZS10YXNrLWJ0bicpO1xyXG5cclxuICAgICAgICBjb25zdCBjb21wbGV0ZVRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIGNvbXBsZXRlVGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtcmVndWxhcicsJ2ZhLWNpcmNsZScpO1xyXG4gICAgICAgIGNvbXBsZXRlVGFza0Rpdi5hcHBlbmRDaGlsZChjb21wbGV0ZVRhc2tJY29uKTtcclxuICAgICAgICByZXR1cm4gY29tcGxldGVUYXNrRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tUaXRsZURpdih0YXNrT2JqKXtcclxuICAgICAgICBjb25zdCB0YXNrVGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0YXNrVGl0bGVEaXYuY2xhc3NMaXN0LmFkZCgndGFzay10aXRsZScpO1xyXG4gICAgICAgIHRhc2tUaXRsZURpdi5pbm5lclRleHQgPSB0YXNrT2JqLmdldE5hbWUoKTtcclxuICAgICAgICByZXR1cm4gdGFza1RpdGxlRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tEZXNjcmlwdGlvbkRpdih0YXNrT2JqKXtcclxuICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0YXNrRGVzY3JpcHRpb25EaXYuY2xhc3NMaXN0LmFkZCgndGFzay1kZXNjcmlwdGlvbicpO1xyXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbkRpdi5pbm5lclRleHQgPSB0YXNrT2JqLmdldERlc2NyaXB0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIHRhc2tEZXNjcmlwdGlvbkRpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrQnV0dG9uc0Rpdigpe1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbkljb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYnV0dG9uSWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnYnV0dG9uLWljb25zJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBsdXNJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIHBsdXNJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc3F1YXJlLXBsdXMnKTtcclxuXHJcbiAgICAgICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1wZW4tdG8tc3F1YXJlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXRyYXNoJyk7XHJcblxyXG4gICAgICAgIGJ1dHRvbkljb25zRGl2LmFwcGVuZENoaWxkKHBsdXNJY29uKTtcclxuICAgICAgICBidXR0b25JY29uc0Rpdi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcbiAgICAgICAgYnV0dG9uSWNvbnNEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbkljb25zRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVzdGltYXRlZFRpbWVEaXYodGFza09iail7XHJcbiAgICAgICAgY29uc3QgZXN0aW1hdGVkVGltZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGVzdGltYXRlZFRpbWVEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1lc3RpbWF0ZWQtdGltZScpO1xyXG4gICAgICAgIGVzdGltYXRlZFRpbWVEaXYuaW5uZXJUZXh0ID0gYEVzdCBUaW1lOiAke3Rhc2tPYmouZ2V0RXN0aW1hdGVkVGltZSgpfWA7XHJcbiAgICAgICAgcmV0dXJuIGVzdGltYXRlZFRpbWVEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VGFza0RPTSgpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGNyZWF0ZUNvbnRhaW5lckRpdigpO1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnNEaXYgPSBjcmVhdGVUYXNrQnRuRGl2KCk7XHJcbiAgICAgICAgY29uc3QgdGl0bGVEaXYgPSBjcmVhdGVUYXNrVGl0bGVEaXYodGFza09iaik7XHJcbiAgICAgICAgY29uc3QgdGFza0J1dHRvbnMgPSBjcmVhdGVUYXNrQnV0dG9uc0RpdigpO1xyXG4gICAgICAgIGlmKHRhc2tPYmouZ2V0RXN0aW1hdGVkVGltZSgpKXtcclxuICAgICAgICAgICAgY29uc3QgdGFza0VzdGltYXRlZFRpbWUgPSBjcmVhdGVFc3RpbWF0ZWRUaW1lRGl2KHRhc2tPYmopO1xyXG4gICAgICAgICAgICB0aXRsZURpdi5hcHBlbmRDaGlsZCh0YXNrRXN0aW1hdGVkVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRhc2tPYmouZ2V0RGVzY3JpcHRpb24oKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGNyZWF0ZVRhc2tEZXNjcmlwdGlvbkRpdih0YXNrT2JqKTtcclxuICAgICAgICAgICAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChidXR0b25zRGl2KTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZCh0YXNrQnV0dG9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtnZXRUYXNrRE9NfTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlU3VidGFza0RPTSA9IChzdWJ0YXNrT2JqKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdWJ0YXNrRGl2KCl7XHJcbiAgICAgICAgY29uc3Qgc3VidGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHN1YnRhc2tEaXYuY2xhc3NMaXN0LmFkZCgnc3VidGFzaycpO1xyXG4gICAgICAgIHJldHVybiBzdWJ0YXNrRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbXBsZXRlU3VidGFza0Rpdigpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZS10YXNrLWJ0bicpO1xyXG5cclxuICAgICAgICBjb25zdCBjaXJjbGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIGNpcmNsZUljb24uY2xhc3NMaXN0LmFkZCgnZmEtcmVndWxhcicsJ2ZhLWNpcmNsZScpO1xyXG5cclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoY2lyY2xlSWNvbik7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdWJ0YXNrVGl0bGVEaXYoc3VidGFza09iail7XHJcbiAgICAgICAgY29uc3QgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aXRsZURpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLXRpdGxlJyk7XHJcbiAgICAgICAgdGl0bGVEaXYuaW5uZXJUZXh0ID0gc3VidGFza09iai5nZXROYW1lKCk7XHJcbiAgICAgICAgcmV0dXJuIHRpdGxlRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN1YnRhc2tCdXR0b25JY29ucygpIHtcclxuICAgICAgICBjb25zdCBidXR0b25zSWNvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGJ1dHRvbnNJY29uRGl2LmNsYXNzTGlzdC5hZGQoJ2J1dHRvbi1pY29ucycpO1xyXG5cclxuICAgICAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXBlbi10by1zcXVhcmUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtdHJhc2gnKTtcclxuXHJcbiAgICAgICAgYnV0dG9uc0ljb25EaXYuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgICAgIGJ1dHRvbnNJY29uRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xyXG4gICAgICAgIHJldHVybiBidXR0b25zSWNvbkRpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTdWJ0YXNrRE9NKCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gY3JlYXRlU3VidGFza0RpdigpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlU3VidGFza0RpdiA9IGNyZWF0ZUNvbXBsZXRlU3VidGFza0RpdigpO1xyXG4gICAgICAgIGNvbnN0IHN1YnRhc2tUaXRsZURpdiA9IGNyZWF0ZVN1YnRhc2tUaXRsZURpdihzdWJ0YXNrT2JqKTtcclxuICAgICAgICBjb25zdCBzdWJ0YXNrQnRuSWNvbnMgPSBjcmVhdGVTdWJ0YXNrQnV0dG9uSWNvbnMoKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGNvbXBsZXRlU3VidGFza0Rpdik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tUaXRsZURpdik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tCdG5JY29ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtnZXRTdWJ0YXNrRE9NfTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7cmVuZGVyVGFza3N9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7c3RvcmFnZSwgdGFza0luZGV4LCBzZWN0aW9uLCBwcm9qZWN0LCB0YXNrLCBzdWJ0YXNrfSBmcm9tICcuL3Rhc2suanMnO1xyXG5pbXBvcnQge3JlbmRlclRhc2tzfSBmcm9tICcuL3Rhc2tET00uanMnO1xyXG5cclxuLy9yZW5kZXIgaW5ib3hcclxuKCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJUYXNrSW5kZXggPSB0YXNrSW5kZXgoKTtcclxuICAgIGNvbnN0IHJlbmRlciA9IHJlbmRlclRhc2tzKCk7XHJcbiAgICBjb25zdCBhbGxUYXNrcyA9IFtdO1xyXG4gICAgY29uc3Qgc3VidGFzazEgPSBbc3VidGFzaygnRG8gc29tZXRoaW5nJywgJ1NtYWxsIERlc2NyaXB0aW9uJyksc3VidGFzaygnRG8gc29tZXRoaW5nJywgJ1NtYWxsIERlc2NyaXB0aW9uJyldO1xyXG4gICAgY29uc3QgdGFzazFUZXN0ID0gdGFzaygnRG8gc29tZXRoaW5nJywnU21hbGwgRGVzY3JpcHRpb24nLDEsJzEyLzMxLzIwMjEnLCcyIGhyIDQwIG1pbicsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHN1YnRhc2sxKTtcclxuICAgIGNvbnN0IHRhc2syVGVzdCA9IHRhc2soJ0RvIHNvbWV0aGluZycsJ1NtYWxsIERlc2NyaXB0aW9uJywxLCcxMi8zMS8yMDIxJywnMiBociA0MCBtaW4nKTtcclxuICAgIGFsbFRhc2tzLnB1c2godGFzazFUZXN0LCB0YXNrMlRlc3QpO1xyXG4gICAgcmVuZGVyLnJlbmRlckRlZmF1bHQoW10sYWxsVGFza3MpO1xyXG59KSgpO1xyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9