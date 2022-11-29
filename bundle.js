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

    return {index, addSubtask, removeSubtask, editSubtask, editTask, getSection, getName, getDescription};
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

    //add all tasks and tasks with sections
    function addSectionsTasksDOM(parentDiv, allSectionsArray){
        allSectionsArray.forEach(section => {
            const sectionDOM = createSectionDOM(section).getSectionDOM();
            section.tasks.forEach(task => {
                const taskDOM = createTaskDOM(task).getTaskDOM();
                sectionDOM.appendChild(taskDOM);
                task.subtasks.forEach(subtask => {
                    const subtaskDOM = createSubtaskDOM(subtask).getSubtaskDOM();
                    sectionDOM.appendChild(subtaskDOM);
                })
            })
            parentDiv.appendChild(sectionDOM);    
        })
    }

    function addNoSectionsTasksDOM(parentDiv, allTasksArray){
        allTasksArray.forEach(task => console.log(task.getSection()));
        console.log(allTasksArray[0].getSection());
        const noSectionTasksArray = allTasksArray.filter(task => !task.getSection());
        console.log(noSectionTasksArray);
        noSectionTasksArray.forEach(task => {
            const taskDOM = createTaskDOM(task).getTaskDOM();
            parentDiv.appendChild(taskDOM);
        })
    }



/*     const section = (name, index, tasks = []) => {
        return {name, index, tasks};
    } */
    

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

    function getTaskDOM(){
        const containerDiv = createContainerDiv();
        const buttonsDiv = createTaskBtnDiv();
        const titleDiv = createTaskTitleDiv(taskObj);
        const taskDescription = createTaskDescriptionDiv(taskObj);
        const taskButtons = createTaskButtonsDiv();

        titleDiv.appendChild(taskDescription);
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
        return buttonsIconDiv();
    }

    function getSubtaskDOM(){
        const containerDiv = createSubtaskDiv();
        const completeSubtaskDiv = createCompleteSubtaskDiv();
        const subtaskTitleDiv = createSubtaskTitleDiv(subtaskObj);
        const subtaskBtnIcons = createSubtaskButtonIcons();

        containerDiv.appendChild(titleDiv);
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
    const task1Test = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('Do something','Small Description',1,'12/31/2021','2 hr 40 min');
    const task2Test = (0,_task_js__WEBPACK_IMPORTED_MODULE_0__.task)('Do something','Small Description',1,'12/31/2021','2 hr 40 min');
    allTasks.push(task1Test, task2Test);
    render.renderDefault([],allTasks);
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNnQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3SWhDO0FBQ0E7QUFDeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDb0Q7QUFDcEQ7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDckpBO0FBQ0E7QUFDK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0VBQXNCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDcUI7Ozs7Ozs7VUNuUnJCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnFFO0FBQzVCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixtREFBUztBQUNuQyxtQkFBbUIsd0RBQVc7QUFDOUI7QUFDQSxzQkFBc0IsOENBQUk7QUFDMUIsc0JBQXNCLDhDQUFJO0FBQzFCO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vdGl2YXRpb25hbE1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFza0RPTS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NID0gKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlTW90aXZhdGlvbmFsTWVzc2FnZShtb3RpdmF0aW9uYWxNZXNzYWdlT2JqKXtcclxuICAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgICAgIGNvbnN0IHBhcmVudERpdiA9IG1vdGl2YXRpb25hbE1lc3NhZ2VDb250YWluZXIoKTtcclxuICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsTWVzc2FnZUhlYWRlcihtb3RpdmF0aW9uYWxNZXNzYWdlT2JqLmhlYWRlcikpO1xyXG4gICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChtb3RpdmF0aW9uYWxNZXNzYWdlKG1vdGl2YXRpb25hbE1lc3NhZ2VPYmoubWVzc2FnZSkpO1xyXG4gICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChtb3RpdmF0aW9uYWxBdXRob3IobW90aXZhdGlvbmFsTWVzc2FnZU9iai5hdXRob3IpKTtcclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHBhcmVudERpdik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbE1lc3NhZ2VDb250YWluZXIoKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGVudC1tYXJnaW4nKTtcclxuICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsJ21vdGl2YXRpb25hbC1tZXNzYWdlJyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxNZXNzYWdlSGVhZGVyKGhlYWRlclRleHQpIHtcclxuICAgICAgICBjb25zdCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBoZWFkZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsJ21vdGl2YXRpb25hbC1tZXNzYWdlLWhlYWRlcicpO1xyXG5cclxuICAgICAgICBjb25zdCBpbnZpc2libGVCdXR0b25zRGl2ID0gYnV0dG9uc0RpdihmYWxzZSk7XHJcbiAgICAgICAgaW52aXNpYmxlQnV0dG9uc0Rpdi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUtZWxlbWVudHMnKTtcclxuXHJcbiAgICAgICAgY29uc3QgdmlzaWJsZUJ1dHRvbnNEaXYgPSBidXR0b25zRGl2KHRydWUpO1xyXG5cclxuICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIG1vdGl2YXRpb25hbE1lc3NhZ2UuaW5uZXJUZXh0ID0gaGVhZGVyVGV4dDtcclxuXHJcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKGludmlzaWJsZUJ1dHRvbnNEaXYpO1xyXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChtb3RpdmF0aW9uYWxNZXNzYWdlKTtcclxuICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQodmlzaWJsZUJ1dHRvbnNEaXYpO1xyXG5cclxuICAgICAgICByZXR1cm4gaGVhZGVyRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJ1dHRvbnNEaXYoaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIHNldHRpbmdzSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcpO1xyXG4gICAgICAgIHNldHRpbmdzSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1nZWFyJyk7XHJcbiAgICAgICAgc2V0dGluZ3NCdG4uYXBwZW5kQ2hpbGQoc2V0dGluZ3NJY29uKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBjb25zdCBjbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XHJcbiAgICAgICAgY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXgnKTtcclxuICAgICAgICBjbG9zZUJ0bi5hcHBlbmRDaGlsZChjbG9zZUljb24pO1xyXG5cclxuICAgICAgICBidXR0b25zRGl2LmFwcGVuZENoaWxkKHNldHRpbmdzQnRuKTtcclxuICAgICAgICBidXR0b25zRGl2LmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcclxuXHJcbiAgICAgICAgaWYoaXNWaXNpYmxlKXtcclxuICAgICAgICAgICAgc2V0dGluZ3NCdG4uc2V0QXR0cmlidXRlKCdpZCcsJ21vdGl2YXRpb25hbC1tZXNzYWdlLXNldHRpbmdzLWJ0bicpO1xyXG4gICAgICAgICAgICBjbG9zZUJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21vdGl2YXRpb25hbC1tZXNzYWdlLWNsb3NlLWJ0bicpOyAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZS1lbGVtZW50cycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbnNEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZVBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBtZXNzYWdlUGFyYWdyYXBoLmlubmVyVGV4dCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VQYXJhZ3JhcGg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsQXV0aG9yKGF1dGhvcikge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VBdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbWVzc2FnZUF1dGhvci5pbm5lclRleHQgPSBhdXRob3I7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VBdXRob3I7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2NyZWF0ZU1vdGl2YXRpb25hbE1lc3NhZ2V9O1xyXG59XHJcblxyXG5jb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NRnVuY3Rpb25hbGl0eSA9ICgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGFkZFNldHRpbmdCdG5GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1zZXR0aW5ncy1idG4nKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTW9kYWxGb3JtKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZENsb3NlQnRuRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1jbG9zZS1idG4nKTtcclxuICAgICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdGl2YXRpb25hbC1tZXNzYWdlJyk7XHJcbiAgICAgICAgICAgIG1vdGl2YXRpb25hbE1lc3NhZ2VEaXYucmVtb3ZlKCk7XHJcbiAgICAgICAgfSkgIFxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEJ0bkZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICAgICAgYWRkQ2xvc2VCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgYWRkU2V0dGluZ0J0bkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2FkZEJ0bkZ1bmN0aW9uYWxpdHl9O1xyXG59XHJcblxyXG5jb25zdCBhZGRNb3RpdmF0aW9uYWxNZXNzYWdlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheSA9IFtdO1xyXG4gICAgY29uc3QgRE9NID0gbW90aXZhdGlvbmFsTWVzc2FnZURPTSgpO1xyXG4gICAgY29uc3QgYnRuRnVuY3Rpb25hbGl0eSA9IG1vdGl2YXRpb25hbE1lc3NhZ2VET01GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAvL29iamVjdCBkZWNsYXJhdGlvbiBmb3IgbW90aXZhdGlvbmFsIG1lc3NhZ2VzXHJcbiAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxNZXNzYWdlKGhlYWRlciwgbWVzc2FnZSwgYXV0aG9yID0gJycpe1xyXG4gICAgICAgIHJldHVybiB7aGVhZGVyLCBtZXNzYWdlLCBhdXRob3J9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vcHJlc2V0IG1ldGhvZHMgZm9yIG1vdGl2YXRpb25hbCBtZXNzYWdlXHJcbiAgICBmdW5jdGlvbiBhZGREZWZhdWx0TW90aXZhdGlvbmFsTWVzc2FnZXMoKSB7XHJcbiAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZTEgPSBtb3RpdmF0aW9uYWxNZXNzYWdlKCdNb3RpdmF0aW9uYWwgTWVzc2FnZScsJ1llc3RlcmRheSB5b3Ugc2FpZCB0b21vcnJvdywgc28ganVzdCBkbyBpdC4gRG9uXFwndCBsZXQgeW91ciBkcmVhbXMgYmUgZHJlYW1zLicsJ1NoaWEgTGFCZW91ZicpO1xyXG4gICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2UyID0gIG1vdGl2YXRpb25hbE1lc3NhZ2UoJ01vdGl2YXRpb25hbCBNZXNzYWdlJyxcIlRoZSBtb3N0IGltcG9ydGFudCBpbnZlc3RtZW50IHlvdSBjYW4gbWFrZSBpcyBpbiB5b3Vyc2VsZi5cIiwnV2FycmVuIEJ1ZmZldHQnKTtcclxuICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlMyA9IG1vdGl2YXRpb25hbE1lc3NhZ2UoJ1BlcnNvbmFsIE1lc3NhZ2UnLCdZb3UgY2FuIHBsYXkgUG9rZW1vbiBpZiB5b3UgZmluaXNoIGNvZGluZyB0aGlzIHRvLWRvIGxpc3QuJywnQnJ1Y2UnKTtcclxuICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5LnB1c2gobW90aXZhdGlvbmFsTWVzc2FnZTMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNob29zZU9uZU1vdGl2YXRpb25hbE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheS5sZW5ndGgpO1xyXG4gICAgICAgIHJldHVybiBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5W3JhbmRvbV07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlTWVzc2FnZShpbmRleCkge1xyXG4gICAgICAgIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJEZWZhdWx0TWVzc2FnZXMoKSB7XHJcbiAgICAgICAgYWRkRGVmYXVsdE1vdGl2YXRpb25hbE1lc3NhZ2VzKCk7XHJcbiAgICAgICAgRE9NLmNyZWF0ZU1vdGl2YXRpb25hbE1lc3NhZ2UoY2hvb3NlT25lTW90aXZhdGlvbmFsTWVzc2FnZSgpKTtcclxuICAgICAgICBidG5GdW5jdGlvbmFsaXR5LmFkZEJ0bkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge3JlbmRlckRlZmF1bHRNZXNzYWdlcywgZGVsZXRlTWVzc2FnZX07XHJcbn1cclxuXHJcbmV4cG9ydCB7YWRkTW90aXZhdGlvbmFsTWVzc2FnZX07XHJcbiIsIi8vanMgZmlsZSBjb250YWlucyB0aGUgZXZlcnl0aGluZyByZWxhdGVkIHRvIHRhc2tzXHJcbi8vdGFzayBvYmplY3QgYW5kIHN1YnRhc2sgb2JqZWN0IHRvIGNyZWF0ZVxyXG5pbXBvcnQge3JlbmRlclRhc2tzfSBmcm9tICcuL3Rhc2tET00uanMnO1xyXG5cclxuLy9wcm9qZWN0cyBjb250YWluIHNlY3Rpb25zLCBzZWN0aW9ucyBjb250YWluIHRhc2tzLCB0YXNrcyBjb250YWluIHN1YnRhc2tzXHJcbi8vc29tZSB0YXNrcyBkb24ndCBoYXZlIHNlY3Rpb25zXHJcbi8vcHJvamVjdCBieSBkZWZhdWx0IGlzIGluYm94XHJcbmNvbnN0IHN0b3JhZ2UgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhbGxQcm9qZWN0cyA9IFtdO1xyXG4gICAgY29uc3QgYWxsU2VjdGlvbnMgPSBbXTtcclxuICAgIGNvbnN0IGFsbFRhc2tzID0gW107XHJcbiAgICByZXR1cm4ge2FsbFNlY3Rpb25zLCBhbGxQcm9qZWN0cywgYWxsVGFza3N9O1xyXG59XHJcblxyXG5jb25zdCB0YXNrSW5kZXggPSAoKSA9PiB7XHJcbiAgICBsZXQgdGFza0luZGV4ID0gMDtcclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudEluZGV4KCl7XHJcbiAgICAgICAgdGFza0luZGV4Kys7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleCgpe1xyXG4gICAgICAgIHJldHVybiB0YXNrSW5kZXg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge2luY3JlbWVudEluZGV4LCBnZXRJbmRleH07XHJcbn1cclxuXHJcbmNvbnN0IHByb2plY3QgPSAobmFtZSwgc2VjdGlvbnMgPSBbXSkgPT4ge1xyXG4gICAgZnVuY3Rpb24gZ2V0TmFtZSgpe1xyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoYW5nZU5hbWUobmV3TmFtZSl7XHJcbiAgICAgICAgbmFtZSA9IG5ld05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkU2VjdGlvbihzZWN0aW9uKXtcclxuICAgICAgICBzZWN0aW9ucy5wdXNoKHNlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVNlY3Rpb24oc2VjdGlvbil7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtnZXROYW1lLCBjaGFuZ2VOYW1lLCBhZGRTZWN0aW9uLCByZW1vdmVTZWN0aW9ufVxyXG59XHJcblxyXG5jb25zdCBzZWN0aW9uID0gKG5hbWUsIGluZGV4LCB0YXNrcyA9IFtdKSA9PiB7XHJcbiAgICByZXR1cm4ge25hbWUsIGluZGV4LCB0YXNrc307XHJcbn1cclxuXHJcbmNvbnN0IHRhc2sgPSAoXHJcbiAgICBuYW1lLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBpbmRleCxcclxuICAgIGR1ZURhdGUgPSAnJyxcclxuICAgIGVzdGltYXRlZFRpbWUgPSAnJyxcclxuICAgIHByaW9yaXR5ID0gJycsXHJcbiAgICBwcm9qZWN0ID0gJycsXHJcbiAgICBzZWN0aW9uID0gJycsXHJcbiAgICBzdWJ0YXNrcyA9IFtdKSA9PlxyXG57XHJcbiAgICBsZXQgY3VyclN1YnRhc2tJbmRleCA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50U3VidGFza0luZGV4KCl7XHJcbiAgICAgICAgY3VyclN1YnRhc2tJbmRleCsrO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXREZXNjcmlwdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gZ2V0U2VjdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBzZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFN1YnRhc2soc3VidGFza09iail7XHJcbiAgICAgICAgc3VidGFza09iai5zZXRJbmRleChjdXJyU3VidGFza0luZGV4KTtcclxuICAgICAgICBzdWJ0YXNrcy5wdXNoKHN1YnRhc2tPYmopO1xyXG4gICAgICAgIGluY3JlbWVudFN1YnRhc2tJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlZGl0U3VidGFzayhzdWJ0YXNrT2JqKXtcclxuICAgICAgICBzdWJ0YXNrcy5mb3JFYWNoKChzdWJ0YXNrLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHN1YnRhc2suaW5kZXggPT09IGluZGV4KXtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2tzW2ldID0gc3VidGFza09iajtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlU3VidGFzayhpbmRleCl7XHJcbiAgICAgICAgc3VidGFza3MuZm9yRWFjaCgoc3VidGFzaywgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZihzdWJ0YXNrLmluZGV4ID09PSBpbmRleCl7XHJcbiAgICAgICAgICAgICAgICBzdWJ0YXNrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vcHJldHR5IHN1cmUgdGhlcmUncyBhIGJldHRlciB3YXkgdG8gZG8gdGhpc1xyXG4gICAgZnVuY3Rpb24gZWRpdFRhc2sobmV3VGFza09iaikge1xyXG4gICAgICAgIG5hbWUgPSBuZXdUYXNrT2JqLm5hbWU7XHJcbiAgICAgICAgZGVzY3JpcHRpb24gPSBuZXdUYXNrT2JqLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIGR1ZURhdGUgPSBuZXdUYXNrT2JqLmR1ZURhdGU7XHJcbiAgICAgICAgZXN0aW1hdGVkVGltZSA9IG5ld1Rhc2tPYmouZXN0aW1hdGVkVGltZTtcclxuICAgICAgICBwcmlvcml0eSA9IG5ld1Rhc2tPYmoucHJpb3JpdHk7XHJcbiAgICAgICAgcHJvamVjdCA9IG5ld1Rhc2tPYmoucHJvamVjdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2luZGV4LCBhZGRTdWJ0YXNrLCByZW1vdmVTdWJ0YXNrLCBlZGl0U3VidGFzaywgZWRpdFRhc2ssIGdldFNlY3Rpb24sIGdldE5hbWUsIGdldERlc2NyaXB0aW9ufTtcclxufVxyXG5cclxuY29uc3Qgc3VidGFzayA9IChcclxuICAgIG5hbWUsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGR1ZURhdGUgPSAnJyxcclxuICAgIGVzdGltYXRlZFRpbWUgPSAnJyxcclxuICAgIHByaW9yaXR5ID0gJycpID0+XHJcbntcclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBmdW5jdGlvbiBzZXRJbmRleChuZXdJbmRleCl7XHJcbiAgICAgICAgaW5kZXggPSBuZXdJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleCgpe1xyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlZGl0U3VidGFzayhzdWJ0YXNrT2JqKXtcclxuICAgICAgICBuYW1lID0gc3VidGFza09iai5uYW1lO1xyXG4gICAgICAgIGRlc2NyaXB0aW9uID0gc3VidGFza09iai5kZXNjcmlwdGlvbjtcclxuICAgICAgICBkdWVEYXRlID0gc3VidGFza09iai5kdWVEYXRlO1xyXG4gICAgICAgIGVzdGltYXRlZFRpbWUgPSBzdWJ0YXNrT2JqLmVzdGltYXRlZFRpbWU7XHJcbiAgICAgICAgcHJpb3JpdHkgPSBzdWJ0YXNrT2JqLnByaW9yaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2VkaXRTdWJ0YXNrLCBzZXRJbmRleCwgZ2V0SW5kZXgsIGdldE5hbWV9O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHtzdG9yYWdlLCB0YXNrSW5kZXgsIHByb2plY3QsIHRhc2ssIHN1YnRhc2t9O1xyXG5cclxuXHJcblxyXG4iLCJcclxuXHJcbmltcG9ydCB7YWRkTW90aXZhdGlvbmFsTWVzc2FnZX0gZnJvbSAnLi9tb3RpdmF0aW9uYWxNZXNzYWdlLmpzJ1xyXG5cclxuLy9jb250YWlucyBhbGwgRE9NIE1hbmlwdWxhdGlvbiB0aGF0J3MgbmVlZGVkIGZvciB0YXNrc1xyXG5jb25zdCByZW5kZXJUYXNrcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJlbmRlckRlZmF1bHQgPSAoYWxsU2VjdGlvbnNBcnJheSwgYWxsVGFza3NBcnJheSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJvZHlFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgICAgIGFkZE1vdGl2YXRpb25hbE1lc3NhZ2UoKS5yZW5kZXJEZWZhdWx0TWVzc2FnZXMoKTtcclxuICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBjcmVhdGVDb250YWluZXJET00oKS5jb250YWluZXJET00oKTtcclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIZWFkZXJET00oKS5nZXRIZWFkZXJET00oKTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgICAgICBib2R5RWxlbS5hcHBlbmRDaGlsZChjb250YWluZXJEaXYpO1xyXG4gICAgICAgIGFkZFNlY3Rpb25zVGFza3NET00oY29udGFpbmVyRGl2LCBhbGxTZWN0aW9uc0FycmF5KTtcclxuICAgICAgICBhZGROb1NlY3Rpb25zVGFza3NET00oY29udGFpbmVyRGl2LCBhbGxUYXNrc0FycmF5KTtcclxuICAgIH1cclxuXHJcbiAgICAvL2FkZCBhbGwgdGFza3MgYW5kIHRhc2tzIHdpdGggc2VjdGlvbnNcclxuICAgIGZ1bmN0aW9uIGFkZFNlY3Rpb25zVGFza3NET00ocGFyZW50RGl2LCBhbGxTZWN0aW9uc0FycmF5KXtcclxuICAgICAgICBhbGxTZWN0aW9uc0FycmF5LmZvckVhY2goc2VjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25ET00gPSBjcmVhdGVTZWN0aW9uRE9NKHNlY3Rpb24pLmdldFNlY3Rpb25ET00oKTtcclxuICAgICAgICAgICAgc2VjdGlvbi50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0RPTSA9IGNyZWF0ZVRhc2tET00odGFzaykuZ2V0VGFza0RPTSgpO1xyXG4gICAgICAgICAgICAgICAgc2VjdGlvbkRPTS5hcHBlbmRDaGlsZCh0YXNrRE9NKTtcclxuICAgICAgICAgICAgICAgIHRhc2suc3VidGFza3MuZm9yRWFjaChzdWJ0YXNrID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRE9NID0gY3JlYXRlU3VidGFza0RPTShzdWJ0YXNrKS5nZXRTdWJ0YXNrRE9NKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbkRPTS5hcHBlbmRDaGlsZChzdWJ0YXNrRE9NKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChzZWN0aW9uRE9NKTsgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGROb1NlY3Rpb25zVGFza3NET00ocGFyZW50RGl2LCBhbGxUYXNrc0FycmF5KXtcclxuICAgICAgICBhbGxUYXNrc0FycmF5LmZvckVhY2godGFzayA9PiBjb25zb2xlLmxvZyh0YXNrLmdldFNlY3Rpb24oKSkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFsbFRhc2tzQXJyYXlbMF0uZ2V0U2VjdGlvbigpKTtcclxuICAgICAgICBjb25zdCBub1NlY3Rpb25UYXNrc0FycmF5ID0gYWxsVGFza3NBcnJheS5maWx0ZXIodGFzayA9PiAhdGFzay5nZXRTZWN0aW9uKCkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5vU2VjdGlvblRhc2tzQXJyYXkpO1xyXG4gICAgICAgIG5vU2VjdGlvblRhc2tzQXJyYXkuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFza0RPTSA9IGNyZWF0ZVRhc2tET00odGFzaykuZ2V0VGFza0RPTSgpO1xyXG4gICAgICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQodGFza0RPTSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG5cclxuLyogICAgIGNvbnN0IHNlY3Rpb24gPSAobmFtZSwgaW5kZXgsIHRhc2tzID0gW10pID0+IHtcclxuICAgICAgICByZXR1cm4ge25hbWUsIGluZGV4LCB0YXNrc307XHJcbiAgICB9ICovXHJcbiAgICBcclxuXHJcbiAgICBjb25zdCBjbGVhckFsbFRhc2tzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50LW1hcmdpbicpO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge3JlbmRlckRlZmF1bHQsIGNsZWFyQWxsVGFza3N9O1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBjcmVhdGVDb250YWluZXJET00gPSAoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBjb250YWluZXJET00oKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb250YWluZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsJ2NvbnRlbnQtbWFyZ2luJyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgIH1cclxuICAgIHJldHVybiB7Y29udGFpbmVyRE9NfTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlSGVhZGVyRE9NID0gKGhlYWRlck5hbWUpID0+IHtcclxuICAgIGZ1bmN0aW9uIGNvbnRhaW5lckRpdigpe1xyXG4gICAgICAgIGNvbnN0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGhlYWRlckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywnaW5ib3gtaGVhZGVyJyk7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlckRpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoZWFkaW5nVGV4dCgpIHtcclxuICAgICAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcclxuICAgICAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci10eXBlJyk7XHJcbiAgICAgICAgaGVhZGluZy5pbm5lclRleHQgPSAnSW5ib3gnO1xyXG4gICAgICAgIHJldHVybiBoZWFkaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhlYWRlckljb25zKCkge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlckljb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBoZWFkZXJJY29uRGl2LmNsYXNzTGlzdC5hZGQoJ2hlYWRlci1pY29uJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZvbGRlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgZm9sZGVySWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLWZvbGRlci1wbHVzJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc3F1YXJlLXBsdXMnKTtcclxuXHJcbiAgICAgICAgaGVhZGVySWNvbkRpdi5hcHBlbmRDaGlsZChmb2xkZXJJY29uKTtcclxuICAgICAgICBoZWFkZXJJY29uRGl2LmFwcGVuZENoaWxkKHRhc2tJY29uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhlYWRlckljb25EaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SGVhZGVyRE9NKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRhaW5lckRpdigpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGhlYWRpbmdUZXh0KCk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVySWNvbnNEaXYgPSBoZWFkZXJJY29ucygpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXJJY29uc0Rpdik7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2dldEhlYWRlckRPTX07XHJcbn1cclxuXHJcblxyXG5jb25zdCBjcmVhdGVTZWN0aW9uRE9NID0gKHNlY3Rpb25PYmopID0+IHtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNlY3Rpb25EaXYoKXtcclxuICAgICAgICBjb25zdCBzZWN0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgc2VjdGlvbkRpdi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uJyk7XHJcbiAgICAgICAgcmV0dXJuIHNlY3Rpb25EaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlU2VjdGlvbkhlYWRlcihzZWN0aW9uT2JqKXtcclxuICAgICAgICBjb25zdCBzZWN0aW9uSGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgc2VjdGlvbkhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLWhlYWRlcicpO1xyXG5cclxuICAgICAgICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uLXRpdGxlJyk7XHJcbiAgICAgICAgc2VjdGlvblRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24tdGl0bGUnKTtcclxuICAgICAgICBzZWN0aW9uVGl0bGUuaW5uZXJUZXh0ID0gc2VjdGlvbk9iai5uYW1lO1xyXG5cclxuICAgICAgICBjb25zdCBzZWN0aW9uRHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBzZWN0aW9uRHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbi1kcm9wZG93bicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGRyb3Bkb3duSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBkcm9wZG93bkljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29sZCcsJ2ZhLWNhcmV0LWRvd24nKTtcclxuICAgICAgICBzZWN0aW9uRHJvcGRvd25Db250YWluZXIuYXBwZW5kQ2hpbGQoZHJvcGRvd25JY29uKTtcclxuICAgICAgICBzZWN0aW9uSGVhZGVyRGl2LmFwcGVuZENoaWxkKHNlY3Rpb25UaXRsZSk7XHJcbiAgICAgICAgc2VjdGlvbkhlYWRlckRpdi5hcHBlbmRDaGlsZChzZWN0aW9uRHJvcGRvd25Db250YWluZXIpO1xyXG4gICAgICAgIHJldHVybiBzZWN0aW9uSGVhZGVyRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlY3Rpb25ET00oKXtcclxuICAgICAgICBjb25zdCBzZWN0aW9uRGl2ID0gY3JlYXRlU2VjdGlvbkRpdigpO1xyXG4gICAgICAgIHNlY3Rpb25EaXYuYXBwZW5kQ2hpbGQoY3JlYXRlU2VjdGlvbkhlYWRlcihzZWN0aW9uT2JqKSk7XHJcbiAgICAgICAgcmV0dXJuIHNlY3Rpb25EaXY7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtnZXRTZWN0aW9uRE9NfTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlVGFza0RPTSA9ICh0YXNrT2JqKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb250YWluZXJEaXYoKXtcclxuICAgICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XHJcbiAgICAgICAgcmV0dXJuIHRhc2tEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFza0J0bkRpdigpe1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlVGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbXBsZXRlVGFza0Rpdi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZS10YXNrLWJ0bicpO1xyXG5cclxuICAgICAgICBjb25zdCBjb21wbGV0ZVRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIGNvbXBsZXRlVGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtcmVndWxhcicsJ2ZhLWNpcmNsZScpO1xyXG4gICAgICAgIGNvbXBsZXRlVGFza0Rpdi5hcHBlbmRDaGlsZChjb21wbGV0ZVRhc2tJY29uKTtcclxuICAgICAgICByZXR1cm4gY29tcGxldGVUYXNrRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tUaXRsZURpdih0YXNrT2JqKXtcclxuICAgICAgICBjb25zdCB0YXNrVGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0YXNrVGl0bGVEaXYuY2xhc3NMaXN0LmFkZCgndGFzay10aXRsZScpO1xyXG4gICAgICAgIHRhc2tUaXRsZURpdi5pbm5lclRleHQgPSB0YXNrT2JqLmdldE5hbWUoKTtcclxuICAgICAgICByZXR1cm4gdGFza1RpdGxlRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tEZXNjcmlwdGlvbkRpdih0YXNrT2JqKXtcclxuICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0YXNrRGVzY3JpcHRpb25EaXYuY2xhc3NMaXN0LmFkZCgndGFzay1kZXNjcmlwdGlvbicpO1xyXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbkRpdi5pbm5lclRleHQgPSB0YXNrT2JqLmdldERlc2NyaXB0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIHRhc2tEZXNjcmlwdGlvbkRpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrQnV0dG9uc0Rpdigpe1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbkljb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYnV0dG9uSWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnYnV0dG9uLWljb25zJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBsdXNJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIHBsdXNJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc3F1YXJlLXBsdXMnKTtcclxuXHJcbiAgICAgICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1wZW4tdG8tc3F1YXJlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXRyYXNoJyk7XHJcblxyXG4gICAgICAgIGJ1dHRvbkljb25zRGl2LmFwcGVuZENoaWxkKHBsdXNJY29uKTtcclxuICAgICAgICBidXR0b25JY29uc0Rpdi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcbiAgICAgICAgYnV0dG9uSWNvbnNEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbkljb25zRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFRhc2tET00oKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBjcmVhdGVDb250YWluZXJEaXYoKTtcclxuICAgICAgICBjb25zdCBidXR0b25zRGl2ID0gY3JlYXRlVGFza0J0bkRpdigpO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlRGl2ID0gY3JlYXRlVGFza1RpdGxlRGl2KHRhc2tPYmopO1xyXG4gICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGNyZWF0ZVRhc2tEZXNjcmlwdGlvbkRpdih0YXNrT2JqKTtcclxuICAgICAgICBjb25zdCB0YXNrQnV0dG9ucyA9IGNyZWF0ZVRhc2tCdXR0b25zRGl2KCk7XHJcblxyXG4gICAgICAgIHRpdGxlRGl2LmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGJ1dHRvbnNEaXYpO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZCh0aXRsZURpdik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRhc2tCdXR0b25zKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2dldFRhc2tET019O1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGVTdWJ0YXNrRE9NID0gKHN1YnRhc2tPYmopID0+IHtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN1YnRhc2tEaXYoKXtcclxuICAgICAgICBjb25zdCBzdWJ0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgc3VidGFza0Rpdi5jbGFzc0xpc3QuYWRkKCdzdWJ0YXNrJyk7XHJcbiAgICAgICAgcmV0dXJuIHN1YnRhc2tEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29tcGxldGVTdWJ0YXNrRGl2KCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlLXRhc2stYnRuJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNpcmNsZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgY2lyY2xlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1yZWd1bGFyJywnZmEtY2lyY2xlJyk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChjaXJjbGVJY29uKTtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN1YnRhc2tUaXRsZURpdihzdWJ0YXNrT2JqKXtcclxuICAgICAgICBjb25zdCB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRpdGxlRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGl0bGUnKTtcclxuICAgICAgICB0aXRsZURpdi5pbm5lclRleHQgPSBzdWJ0YXNrT2JqLmdldE5hbWUoKTtcclxuICAgICAgICByZXR1cm4gdGl0bGVEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlU3VidGFza0J1dHRvbkljb25zKCkge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnNJY29uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYnV0dG9uc0ljb25EaXYuY2xhc3NMaXN0LmFkZCgnYnV0dG9uLWljb25zJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtcGVuLXRvLXNxdWFyZScpO1xyXG5cclxuICAgICAgICBjb25zdCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIGRlbGV0ZUljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS10cmFzaCcpO1xyXG5cclxuICAgICAgICBidXR0b25zSWNvbkRpdi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcbiAgICAgICAgYnV0dG9uc0ljb25EaXYuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbnNJY29uRGl2KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U3VidGFza0RPTSgpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGNyZWF0ZVN1YnRhc2tEaXYoKTtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZVN1YnRhc2tEaXYgPSBjcmVhdGVDb21wbGV0ZVN1YnRhc2tEaXYoKTtcclxuICAgICAgICBjb25zdCBzdWJ0YXNrVGl0bGVEaXYgPSBjcmVhdGVTdWJ0YXNrVGl0bGVEaXYoc3VidGFza09iaik7XHJcbiAgICAgICAgY29uc3Qgc3VidGFza0J0bkljb25zID0gY3JlYXRlU3VidGFza0J1dHRvbkljb25zKCk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZCh0aXRsZURpdik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGNvbXBsZXRlU3VidGFza0Rpdik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tUaXRsZURpdik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tCdG5JY29ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtnZXRTdWJ0YXNrRE9NfTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7cmVuZGVyVGFza3N9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7c3RvcmFnZSwgdGFza0luZGV4LCBwcm9qZWN0LCB0YXNrLCBzdWJ0YXNrfSBmcm9tICcuL3Rhc2suanMnO1xyXG5pbXBvcnQge3JlbmRlclRhc2tzfSBmcm9tICcuL3Rhc2tET00uanMnO1xyXG5cclxuLy9yZW5kZXIgaW5ib3hcclxuKCgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJUYXNrSW5kZXggPSB0YXNrSW5kZXgoKTtcclxuICAgIGNvbnN0IHJlbmRlciA9IHJlbmRlclRhc2tzKCk7XHJcbiAgICBjb25zdCBhbGxUYXNrcyA9IFtdO1xyXG4gICAgY29uc3QgdGFzazFUZXN0ID0gdGFzaygnRG8gc29tZXRoaW5nJywnU21hbGwgRGVzY3JpcHRpb24nLDEsJzEyLzMxLzIwMjEnLCcyIGhyIDQwIG1pbicpO1xyXG4gICAgY29uc3QgdGFzazJUZXN0ID0gdGFzaygnRG8gc29tZXRoaW5nJywnU21hbGwgRGVzY3JpcHRpb24nLDEsJzEyLzMxLzIwMjEnLCcyIGhyIDQwIG1pbicpO1xyXG4gICAgYWxsVGFza3MucHVzaCh0YXNrMVRlc3QsIHRhc2syVGVzdCk7XHJcbiAgICByZW5kZXIucmVuZGVyRGVmYXVsdChbXSxhbGxUYXNrcyk7XHJcbn0pKCk7XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=