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

    function setIndex(taskIndex){
        index = taskIndex;
    }

    function getSubtasks(){
        return subtasks;
    }

    //need to set a unique index for subtask after it's created
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

    return {getName, getDescription, getDueDate, getEstimatedTime, getIndex, getPriority, getSubtasks,
            setIndex};
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
                containerDiv.remove();
            }, {once: true})
            return containerDiv;
        }

        return {getDOM};
    }

    //create the form that adds tasks
    //unique id is add-task-form-container
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

            const nameInput = createInput('text', 'name', 'Name', true, true);
            const descriptionInput = createInput('text', 'description', 'Description', false, false);

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

            addCancelBtnFunctionality(cancelBtn);
            addSubmitBtnFunctionality(submitBtn);

            containerDiv.appendChild(cancelBtn);
            containerDiv.appendChild(submitBtn);

            return containerDiv;
        }

        //removes the form and adds the add task text back
        function addCancelBtnFunctionality(cancelBtn){
            cancelBtn.addEventListener('click', function(){
                const container = document.getElementById('container');
                const addTaskElem = addTaskDivDOM().getDOM();
                const formContainer = document.getElementById('add-task-form-container');
                formContainer.remove();
                container.appendChild(addTaskElem);
            }, {once:true});
        }

        //removes the form and adds the task dom
        //need to add error message of some sort when there's no text in the name field
        function addSubmitBtnFunctionality(submitBtn){
            submitBtn.addEventListener('click', function(){
                const nameField = document.getElementById('name').value;
                const descriptionField = document.getElementById('description').value;
                if(nameField){
                    //create task
                    let newTask = (0,_task_js__WEBPACK_IMPORTED_MODULE_1__["default"])(nameField, descriptionField);
                    let newTaskDOM = taskDOM(newTask).getDOM();
                    const container = document.getElementById('container');
                    const addTaskElem = addTaskDivDOM().getDOM();
                    const formContainer = document.getElementById('add-task-form-container');
                    formContainer.remove();
                    container.appendChild(newTaskDOM);
                    container.appendChild(addTaskElem);
                } 
            })          
        }

        function createInput(type, id, placeholder, isRequired, isAutoFocus){
            const input = document.createElement('input');
            input.setAttribute('type', type);
            input.setAttribute('id', id);
            input.setAttribute('placeholder', placeholder);
            if(isRequired ? input.required = true : input.required = false);
            if(isAutoFocus ? input.autofocus = true : input.autofocus = false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsaUVBQWUsWUFBWTs7Ozs7Ozs7Ozs7Ozs7O0FDUlk7QUFDdkM7QUFDQTtBQUNBLHdCQUF3QixzREFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsaUVBQWUsT0FBTzs7Ozs7Ozs7Ozs7Ozs7OztBQzNDYTtBQUNJO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixzREFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxPQUFPLEVBQUM7QUFDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QnVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0RBQVk7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsSUFBSTs7Ozs7Ozs7Ozs7Ozs7OztBQ3BFbkI7QUFDbUM7QUFDTjtBQUNhO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1RUFBMkI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxHQUFHLFdBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsR0FBRyxVQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG9EQUFJO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsMkJBQTJCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLEVBQUUsRUFBQztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsTUFBTTs7Ozs7O1VDMWtCTjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUN5QjtBQUNVO0FBQ0E7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsSUFBSSw0REFBZ0I7QUFDcEI7QUFDQTtBQUNBLG9CQUFvQix1REFBTztBQUMzQixvQkFBb0IsdURBQU87QUFDM0IsdUJBQXVCLHVEQUFPO0FBQzlCLFFBQVEsOERBQWtCO0FBQzFCLFFBQVEsOERBQWtCO0FBQzFCLFFBQVEsOERBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaGVscGVyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdWkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaW5kZXhDb3VudGVyID0gKCkgPT4ge1xyXG4gICAgbGV0IGN1cnJJbmRleCA9IDA7XHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRJbmRleCgpIHtcclxuICAgICAgICBjdXJySW5kZXggPSBjdXJySW5kZXggKyAxO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtjdXJySW5kZXgsIGluY3JlbWVudEluZGV4fTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5kZXhDb3VudGVyOyIsImltcG9ydCBpbmRleENvdW50ZXIgZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5cclxuY29uc3QgcHJvamVjdCA9IChuYW1lLCB0YXNrcyA9IFtdLCBpbmRleCkgPT4ge1xyXG4gICAgbGV0IGN1cnJUYXNrSW5kZXggPSBpbmRleENvdW50ZXIoKTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gZ2V0TmFtZSgpe1xyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KCkge1xyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRUYXNrcygpe1xyXG4gICAgICAgIHJldHVybiB0YXNrcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXROYW1lKG5ld05hbWUpe1xyXG4gICAgICAgIG5hbWUgPSBuZXdOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldEluZGV4KGluZGV4KXtcclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLy9uZWVkIHRvIHNldCBhIHVuaXF1ZSBpbmRleCBmb3IgdGFzayBhZnRlciBpdCdzIGNyZWF0ZWRcclxuICAgIGZ1bmN0aW9uIGFkZFRhc2sodGFzayl7XHJcbiAgICAgICAgdGFzay5zZXRJbmRleChjdXJyVGFza0luZGV4LmdldEluZGV4KCkpO1xyXG4gICAgICAgIHRhc2tzLnB1c2godGFzayk7XHJcbiAgICAgICAgY3VyclRhc2tJbmRleC5pbmNyZW1lbnRJbmRleCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVRhc2sodGFza0luZGV4KXtcclxuICAgICAgICB0YXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0YXNrLmdldEluZGV4KCkgPT09IHRhc2tJbmRleCl7XHJcbiAgICAgICAgICAgICAgICB0YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2dldE5hbWUsIGdldEluZGV4LCBnZXRUYXNrcywgc2V0TmFtZSwgc2V0SW5kZXgsIGFkZFRhc2ssIHJlbW92ZVRhc2t9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb2plY3Q7IiwiaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0LmpzJztcclxuaW1wb3J0IGluZGV4Q291bnRlciBmcm9tICcuL2hlbHBlci5qcyc7XHJcbi8vcHJvamVjdHMgY29udGFpbiB0YXNrcywgdGFza3MgY29udGFpbiBzdWJ0YXNrc1xyXG4vL2ZvciBub3csIHdlJ2xsIGZvbGxvdyB0aGF0IGhpZXJhY2h5XHJcblxyXG5jb25zdCBzdG9yYWdlID0gKCgpID0+IHtcclxuICAgIC8vdGhlIGRlZmF1bHQgcHJvamVjdHMgdGhhdCBjYW4ndCBiZSByZW1vdmVkXHJcbiAgICBjb25zdCBhbGxQcm9qZWN0cyA9IFtdO1xyXG4gICAgbGV0IGN1cnJQcm9qZWN0SW5kZXggPSBpbmRleENvdW50ZXIoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3Qpe1xyXG4gICAgICAgIGFsbFByb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbiAgICAgICAgcHJvamVjdC5zZXRJbmRleChjdXJyUHJvamVjdEluZGV4LmN1cnJJbmRleCk7XHJcbiAgICAgICAgY3VyclByb2plY3RJbmRleC5pbmNyZW1lbnRJbmRleCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVByb2plY3QocHJvamVjdEluZGV4KXtcclxuICAgICAgICBhbGxQcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9qZWN0LmdldEluZGV4KCkgPT09IHByb2plY3RJbmRleCl7XHJcbiAgICAgICAgICAgICAgICBhbGxQcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2FsbFByb2plY3RzLCBhZGRQcm9qZWN0LCByZW1vdmVQcm9qZWN0fTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0b3JhZ2U7XHJcblxyXG4iLCJpbXBvcnQgaW5kZXhDb3VudGVyIGZyb20gJy4vaGVscGVyLmpzJztcclxuXHJcbmNvbnN0IHRhc2sgPSAoXHJcbiAgICBuYW1lLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBkdWVEYXRlLFxyXG4gICAgZXN0aW1hdGVkQ29tcGxldGlvblRpbWUsXHJcbiAgICBwcmlvcml0eSxcclxuICAgIHN1YnRhc2tzID0gW10sXHJcbiAgICBpbmRleCkgPT5cclxue1xyXG5cclxuICAgIGxldCBjdXJyU3VidGFza0luZGV4ID0gaW5kZXhDb3VudGVyKCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXREZXNjcmlwdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXREdWVEYXRlKCl7XHJcbiAgICAgICAgcmV0dXJuIGR1ZURhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RXN0aW1hdGVkVGltZSgpe1xyXG4gICAgICAgIHJldHVybiBlc3RpbWF0ZWRDb21wbGV0aW9uVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleCgpe1xyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQcmlvcml0eSgpe1xyXG4gICAgICAgIHJldHVybiBwcmlvcml0eTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRJbmRleCh0YXNrSW5kZXgpe1xyXG4gICAgICAgIGluZGV4ID0gdGFza0luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFN1YnRhc2tzKCl7XHJcbiAgICAgICAgcmV0dXJuIHN1YnRhc2tzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vbmVlZCB0byBzZXQgYSB1bmlxdWUgaW5kZXggZm9yIHN1YnRhc2sgYWZ0ZXIgaXQncyBjcmVhdGVkXHJcbiAgICBmdW5jdGlvbiBhZGRTdWJ0YXNrKHN1YnRhc2tPYmope1xyXG4gICAgICAgIHN1YnRhc2tPYmouc2V0SW5kZXgoY3VyclN1YnRhc2tJbmRleCk7XHJcbiAgICAgICAgc3VidGFza3MucHVzaChzdWJ0YXNrT2JqKTtcclxuICAgICAgICBpbmNyZW1lbnRTdWJ0YXNrSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZWRpdFN1YnRhc2soc3VidGFza09iail7XHJcbiAgICAgICAgc3VidGFza3MuZm9yRWFjaCgoc3VidGFzaywgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZihzdWJ0YXNrLmluZGV4ID09PSBpbmRleCl7XHJcbiAgICAgICAgICAgICAgICBzdWJ0YXNrc1tpXSA9IHN1YnRhc2tPYmo7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7Z2V0TmFtZSwgZ2V0RGVzY3JpcHRpb24sIGdldER1ZURhdGUsIGdldEVzdGltYXRlZFRpbWUsIGdldEluZGV4LCBnZXRQcmlvcml0eSwgZ2V0U3VidGFza3MsXHJcbiAgICAgICAgICAgIHNldEluZGV4fTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrOyIsIi8vY29udGFpbnMgYWxsIERPTSBNYW5pcHVsYXRpb24gdGhhdCdzIG5lZWRlZCBmb3IgdGFza3NcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlLmpzJztcclxuaW1wb3J0IHRhc2sgZnJvbSAnLi90YXNrLmpzJztcclxuaW1wb3J0IERhdGVQaWNrZXIgZnJvbSBcInJlYWN0LWRhdGVwaWNrZXJcIjtcclxuXHJcblxyXG5jb25zdCB1aSA9ICgoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBpbml0aWFsUmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3QgYm9keUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbi8qICAgICAgICAgYWRkTW90aXZhdGlvbmFsTWVzc2FnZSgpLnJlbmRlckRlZmF1bHRNZXNzYWdlcygpOyAqL1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGNvbnRhaW5lckRPTSgpLmdldERPTSgpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHByb2plY3RIZWFkZXJET00oJ0luYm94JykuZ2V0RE9NKCk7XHJcbiAgICAgICAgY29uc3QgYWRkVGFza0RpdiA9IGFkZFRhc2tEaXZET00oKS5nZXRET00oKTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoYWRkVGFza0Rpdik7XHJcbiAgICAgICAgYm9keUVsZW0uYXBwZW5kQ2hpbGQoY29udGFpbmVyRGl2KTtcclxuICAgICAgICBzdG9yYWdlLmFsbFByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2plY3QuZ2V0TmFtZSgpID09PSAnSW5ib3gnKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tzID0gcHJvamVjdC5nZXRUYXNrcygpXHJcbiAgICAgICAgICAgICAgICBhZGRBbGxUYXNrc0RPTShjb250YWluZXJEaXYsIHRhc2tzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy9jcmVhdGUgdGhlIGNvbnRhaW5lciB0byBwdXQgYWxsIHRhc2tzLCB0aGUgYWRkIHRhc2sgYnV0dG9uLCBhbmQgcHJvamVjdCBoZWFkZXIgaW5cclxuICAgIC8vdW5pcXVlIGlkIGlzIGNvbnRhaW5lclxyXG4gICAgY29uc3QgY29udGFpbmVyRE9NID0gKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldERPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL3RoZSBwcm9qZWN0IGhlYWRlclxyXG4gICAgLy91bmlxdWUgaWQgaXMgaW5ib3gtaGVhZGVyXHJcbiAgICBjb25zdCBwcm9qZWN0SGVhZGVyRE9NID0gKGhlYWRlck5hbWUpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjb250YWluZXJEaXYoKXtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywnaW5ib3gtaGVhZGVyJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gaGVhZGluZ1RleHQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG4gICAgICAgICAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci10eXBlJyk7XHJcbiAgICAgICAgICAgIGhlYWRpbmcuaW5uZXJUZXh0ID0gaGVhZGVyTmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIGhlYWRpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RE9NKCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBjb250YWluZXJEaXYoKTtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gaGVhZGluZ1RleHQoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019O1xyXG4gICAgfVxyXG5cclxuICAgIC8vZGl2IHRoYXQgd2hlbiB5b3UgY2xpY2ssIHRoZSBhZGQgdGFzayBmb3JtIGFwcGVhcnNcclxuICAgIC8vdW5pcXVlIGlkIGlzIGFkZC10YXNrLWNsaWNrYWJsZS1kaXZcclxuICAgIGNvbnN0IGFkZFRhc2tEaXZET00gPSAoKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gY29udGFpbmVyKCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAnYWRkLXRhc2stY2xpY2thYmxlLWRpdicpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcGx1c0ljb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEnLCdmYS1wbHVzJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpY29uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkVGFza1RleHQoKXtcclxuICAgICAgICAgICAgY29uc3QgYWRkVGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBhZGRUYXNrRGl2LmlubmVyVGV4dCA9ICdBZGQgVGFzayc7XHJcbiAgICAgICAgICAgIGFkZFRhc2tEaXYuY2xhc3NMaXN0LmFkZCgnYWRkLXRhc2stdGV4dCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWRkVGFza0RpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBjb250YWluZXIoKTtcclxuICAgICAgICAgICAgY29uc3QgcGx1c0ljb25FbGVtID0gcGx1c0ljb24oKTtcclxuICAgICAgICAgICAgY29uc3QgYWRkVGFza1RleHRFbGVtID0gYWRkVGFza1RleHQoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHBsdXNJY29uRWxlbSk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChhZGRUYXNrVGV4dEVsZW0pO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkVGFza0Zvcm0gPSBhZGRUYXNrRm9ybURPTSgpLmdldERPTSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZFRhc2tGb3JtKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckRpdi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSwge29uY2U6IHRydWV9KVxyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019O1xyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlIHRoZSBmb3JtIHRoYXQgYWRkcyB0YXNrc1xyXG4gICAgLy91bmlxdWUgaWQgaXMgYWRkLXRhc2stZm9ybS1jb250YWluZXJcclxuICAgIGNvbnN0IGFkZFRhc2tGb3JtRE9NID0gKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldERPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBnZXRDb250YWluZXIoKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybSA9IGdldEZvcm0oKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybUFjdGlvbnMgPSBnZXRGb3JtQWN0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybUFjdGlvbnMpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXRDb250YWluZXIoKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywnYWRkLXRhc2stZm9ybS1jb250YWluZXInKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEZvcm0oKXtcclxuICAgICAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuICAgICAgICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywnYWRkLXRhc2stZm9ybScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gY3JlYXRlSW5wdXQoJ3RleHQnLCAnbmFtZScsICdOYW1lJywgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBjcmVhdGVJbnB1dCgndGV4dCcsICdkZXNjcmlwdGlvbicsICdEZXNjcmlwdGlvbicsIGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwb3BvdmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHBvcG92ZXJEaXYuY2xhc3NMaXN0LmFkZCgncG9wb3Zlci1pY29ucy1kaXYnKTtcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlEaXYgPSBnZXRQb3BvdmVySWNvbnMoJ3ByaW9yaXR5LWJ0bicsICdmYS1mbGFnJywgJ1ByaW9yaXR5Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGVEaXYgPSBnZXRQb3BvdmVySWNvbnMoJ2R1ZS1kYXRlLWJ0bicsICdmYS1jYWxlbmRhcicsJ0R1ZSBEYXRlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVzdGltYXRlZFRpbWVEaXYgPSBnZXRQb3BvdmVySWNvbnMoJ2VzdC1jb21wbGV0aW9uLXRpbWUtYnRuJywgJ2ZhLWNsb2NrJywgJ0VzdCBUaW1lJyk7XHJcbiAgICAgICAgICAgIHBvcG92ZXJEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlEaXYpO1xyXG4gICAgICAgICAgICBwb3BvdmVyRGl2LmFwcGVuZENoaWxkKGR1ZURhdGVEaXYpO1xyXG4gICAgICAgICAgICBwb3BvdmVyRGl2LmFwcGVuZENoaWxkKGVzdGltYXRlZFRpbWVEaXYpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFBvcG92ZXJJY29ucyhkaXZJZCwgaWNvbkNsYXNzLCB0ZXh0KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLGRpdklkKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgJyArIHRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1yZWd1bGFyJyxpY29uQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGljb24pO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGljb25UZXh0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbklucHV0KTtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChwb3BvdmVyRGl2KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRGb3JtQWN0aW9ucygpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCdmb3JtLWFjdGlvbnMtZGl2Jyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCdjYW5jZWwtYWRkLXRhc2stZm9ybScpO1xyXG4gICAgICAgICAgICBjYW5jZWxCdG4uaW5uZXJUZXh0ID0gJ0NhbmNlbCc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgc3VibWl0QnRuLnNldEF0dHJpYnV0ZSgnaWQnLCdhZGQtdGFzay1zdWJtaXQtYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5pbm5lclRleHQgPSAnQWRkIFRhc2snO1xyXG5cclxuICAgICAgICAgICAgYWRkQ2FuY2VsQnRuRnVuY3Rpb25hbGl0eShjYW5jZWxCdG4pO1xyXG4gICAgICAgICAgICBhZGRTdWJtaXRCdG5GdW5jdGlvbmFsaXR5KHN1Ym1pdEJ0bik7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHN1Ym1pdEJ0bik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZW1vdmVzIHRoZSBmb3JtIGFuZCBhZGRzIHRoZSBhZGQgdGFzayB0ZXh0IGJhY2tcclxuICAgICAgICBmdW5jdGlvbiBhZGRDYW5jZWxCdG5GdW5jdGlvbmFsaXR5KGNhbmNlbEJ0bil7XHJcbiAgICAgICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRUYXNrRWxlbSA9IGFkZFRhc2tEaXZET00oKS5nZXRET00oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stZm9ybS1jb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgIGZvcm1Db250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkVGFza0VsZW0pO1xyXG4gICAgICAgICAgICB9LCB7b25jZTp0cnVlfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JlbW92ZXMgdGhlIGZvcm0gYW5kIGFkZHMgdGhlIHRhc2sgZG9tXHJcbiAgICAgICAgLy9uZWVkIHRvIGFkZCBlcnJvciBtZXNzYWdlIG9mIHNvbWUgc29ydCB3aGVuIHRoZXJlJ3Mgbm8gdGV4dCBpbiB0aGUgbmFtZSBmaWVsZFxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFN1Ym1pdEJ0bkZ1bmN0aW9uYWxpdHkoc3VibWl0QnRuKXtcclxuICAgICAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZihuYW1lRmllbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY3JlYXRlIHRhc2tcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGFzayA9IHRhc2sobmFtZUZpZWxkLCBkZXNjcmlwdGlvbkZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGFza0RPTSA9IHRhc2tET00obmV3VGFzaykuZ2V0RE9NKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZFRhc2tFbGVtID0gYWRkVGFza0RpdkRPTSgpLmdldERPTSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stZm9ybS1jb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdUYXNrRE9NKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkVGFza0VsZW0pO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfSkgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVJbnB1dCh0eXBlLCBpZCwgcGxhY2Vob2xkZXIsIGlzUmVxdWlyZWQsIGlzQXV0b0ZvY3VzKXtcclxuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKTtcclxuICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIHBsYWNlaG9sZGVyKTtcclxuICAgICAgICAgICAgaWYoaXNSZXF1aXJlZCA/IGlucHV0LnJlcXVpcmVkID0gdHJ1ZSA6IGlucHV0LnJlcXVpcmVkID0gZmFsc2UpO1xyXG4gICAgICAgICAgICBpZihpc0F1dG9Gb2N1cyA/IGlucHV0LmF1dG9mb2N1cyA9IHRydWUgOiBpbnB1dC5hdXRvZm9jdXMgPSBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7Z2V0RE9NfTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NyZWF0ZXMgRE9NIG9mIG9uZSB0YXNrXHJcbiAgICBjb25zdCB0YXNrRE9NID0gKHRhc2tPYmopID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDb250YWluZXJEaXYoKXtcclxuICAgICAgICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2snKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRhc2tEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlVGFza0J0bkRpdigpe1xyXG4gICAgICAgICAgICBjb25zdCBjb21wbGV0ZVRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29tcGxldGVUYXNrRGl2LmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlLXRhc2stYnRuJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgY29tcGxldGVUYXNrSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgY29tcGxldGVUYXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1yZWd1bGFyJywnZmEtY2lyY2xlJyk7XHJcbiAgICAgICAgICAgIGNvbXBsZXRlVGFza0Rpdi5hcHBlbmRDaGlsZChjb21wbGV0ZVRhc2tJY29uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRlVGFza0RpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVUYXNrVGl0bGVEaXYodGFza09iail7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tUaXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0YXNrVGl0bGVEaXYuY2xhc3NMaXN0LmFkZCgndGFzay10aXRsZScpO1xyXG4gICAgICAgICAgICB0YXNrVGl0bGVEaXYuaW5uZXJUZXh0ID0gdGFza09iai5nZXROYW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXNrVGl0bGVEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlVGFza0Rlc2NyaXB0aW9uRGl2KHRhc2tPYmope1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGFza0Rlc2NyaXB0aW9uRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGVzY3JpcHRpb24nKTtcclxuICAgICAgICAgICAgdGFza0Rlc2NyaXB0aW9uRGl2LmlubmVyVGV4dCA9IHRhc2tPYmouZ2V0RGVzY3JpcHRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRhc2tEZXNjcmlwdGlvbkRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVUYXNrQnV0dG9uc0Rpdigpe1xyXG4gICAgICAgICAgICBjb25zdCBidXR0b25JY29uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBidXR0b25JY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdidXR0b24taWNvbnMnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBwbHVzSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgcGx1c0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1zcXVhcmUtcGx1cycpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXBlbi10by1zcXVhcmUnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtdHJhc2gnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBidXR0b25JY29uc0Rpdi5hcHBlbmRDaGlsZChwbHVzSWNvbik7XHJcbiAgICAgICAgICAgIGJ1dHRvbkljb25zRGl2LmFwcGVuZENoaWxkKGVkaXRJY29uKTtcclxuICAgICAgICAgICAgYnV0dG9uSWNvbnNEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBidXR0b25JY29uc0RpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVFc3RpbWF0ZWRUaW1lRGl2KHRhc2tPYmope1xyXG4gICAgICAgICAgICBjb25zdCBlc3RpbWF0ZWRUaW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGVzdGltYXRlZFRpbWVEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1lc3RpbWF0ZWQtdGltZScpO1xyXG4gICAgICAgICAgICBlc3RpbWF0ZWRUaW1lRGl2LmlubmVyVGV4dCA9IGBFc3QgVGltZTogJHt0YXNrT2JqLmdldEVzdGltYXRlZFRpbWUoKX1gO1xyXG4gICAgICAgICAgICByZXR1cm4gZXN0aW1hdGVkVGltZURpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXRET00oKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gY3JlYXRlQ29udGFpbmVyRGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbnNEaXYgPSBjcmVhdGVUYXNrQnRuRGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlRGl2ID0gY3JlYXRlVGFza1RpdGxlRGl2KHRhc2tPYmopO1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrQnV0dG9ucyA9IGNyZWF0ZVRhc2tCdXR0b25zRGl2KCk7XHJcbiAgICAgICAgICAgIGlmKHRhc2tPYmouZ2V0RXN0aW1hdGVkVGltZSgpKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tFc3RpbWF0ZWRUaW1lID0gY3JlYXRlRXN0aW1hdGVkVGltZURpdih0YXNrT2JqKTtcclxuICAgICAgICAgICAgICAgIHRpdGxlRGl2LmFwcGVuZENoaWxkKHRhc2tFc3RpbWF0ZWRUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0YXNrT2JqLmdldERlc2NyaXB0aW9uKCkpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gY3JlYXRlVGFza0Rlc2NyaXB0aW9uRGl2KHRhc2tPYmopO1xyXG4gICAgICAgICAgICAgICAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChidXR0b25zRGl2KTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRhc2tCdXR0b25zKTtcclxuICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHJldHVybiB7Z2V0RE9NfTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NyZWF0ZXMgRE9NIG9mIG9uZSBzdWJ0YXNrXHJcbiAgICBjb25zdCBzdWJ0YXNrRE9NID0gKHN1YnRhc2tPYmopID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTdWJ0YXNrRGl2KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgc3VidGFza0Rpdi5jbGFzc0xpc3QuYWRkKCdzdWJ0YXNrJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdWJ0YXNrRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbXBsZXRlU3VidGFza0Rpdigpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlLXRhc2stYnRuJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgY2lyY2xlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgY2lyY2xlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1yZWd1bGFyJywnZmEtY2lyY2xlJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGNpcmNsZUljb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVN1YnRhc2tUaXRsZURpdihzdWJ0YXNrT2JqKXtcclxuICAgICAgICAgICAgY29uc3QgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGl0bGVEaXYuY2xhc3NMaXN0LmFkZCgndGFzay10aXRsZScpO1xyXG4gICAgICAgICAgICB0aXRsZURpdi5pbm5lclRleHQgPSBzdWJ0YXNrT2JqLmdldE5hbWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRpdGxlRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVN1YnRhc2tCdXR0b25JY29ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgYnV0dG9uc0ljb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgYnV0dG9uc0ljb25EaXYuY2xhc3NMaXN0LmFkZCgnYnV0dG9uLWljb25zJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtcGVuLXRvLXNxdWFyZScpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGRlbGV0ZUljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS10cmFzaCcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGJ1dHRvbnNJY29uRGl2LmFwcGVuZENoaWxkKGVkaXRJY29uKTtcclxuICAgICAgICAgICAgYnV0dG9uc0ljb25EaXYuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBidXR0b25zSWNvbkRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXRET00oKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gY3JlYXRlU3VidGFza0RpdigpO1xyXG4gICAgICAgICAgICBjb25zdCBjb21wbGV0ZVN1YnRhc2tEaXYgPSBjcmVhdGVDb21wbGV0ZVN1YnRhc2tEaXYoKTtcclxuICAgICAgICAgICAgY29uc3Qgc3VidGFza1RpdGxlRGl2ID0gY3JlYXRlU3VidGFza1RpdGxlRGl2KHN1YnRhc2tPYmopO1xyXG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrQnRuSWNvbnMgPSBjcmVhdGVTdWJ0YXNrQnV0dG9uSWNvbnMoKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoY29tcGxldGVTdWJ0YXNrRGl2KTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tUaXRsZURpdik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChzdWJ0YXNrQnRuSWNvbnMpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019O1xyXG4gICAgfVxyXG5cclxuICAgIC8vYWRkcyBhbGwgZG9tIG9mIHRhc2tzIGFuZCBzdWJ0YXNrcyBpbiBhIHByb2plY3RcclxuICAgIGZ1bmN0aW9uIGFkZEFsbFRhc2tzRE9NKGNvbnRhaW5lciwgdGFza3Mpe1xyXG4gICAgICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRE9NKHRhc2spLmdldERPTSgpKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsU3VidGFza3MgPSB0YXNrLmdldFN1YnRhc2tzKCk7XHJcbiAgICAgICAgICAgIGFsbFN1YnRhc2tzLmZvckVhY2goc3VidGFzayA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3VidGFza0RPTShzdWJ0YXNrKS5nZXRET00oKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbGVhckFsbFRhc2tzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXJzJyk7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7aW5pdGlhbFJlbmRlciwgY2xlYXJBbGxUYXNrc307XHJcblxyXG59KSgpXHJcblxyXG5jb25zdCByZW5kZXJUYXNrcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFkZE1vdGl2YXRpb25hbE1lc3NhZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IERPTSA9IG1vdGl2YXRpb25hbE1lc3NhZ2VET00oKTtcclxuICAgICAgICBjb25zdCBidG5GdW5jdGlvbmFsaXR5ID0gbW90aXZhdGlvbmFsTWVzc2FnZURPTUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICAvL29iamVjdCBkZWNsYXJhdGlvbiBmb3IgbW90aXZhdGlvbmFsIG1lc3NhZ2VzXHJcbiAgICAgICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZShoZWFkZXIsIG1lc3NhZ2UsIGF1dGhvciA9ICcnKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtoZWFkZXIsIG1lc3NhZ2UsIGF1dGhvcn07XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9wcmVzZXQgbWV0aG9kcyBmb3IgbW90aXZhdGlvbmFsIG1lc3NhZ2VcclxuICAgICAgICBmdW5jdGlvbiBhZGREZWZhdWx0TW90aXZhdGlvbmFsTWVzc2FnZXMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2UxID0gbW90aXZhdGlvbmFsTWVzc2FnZSgnTW90aXZhdGlvbmFsIE1lc3NhZ2UnLCdZZXN0ZXJkYXkgeW91IHNhaWQgdG9tb3Jyb3csIHNvIGp1c3QgZG8gaXQuIERvblxcJ3QgbGV0IHlvdXIgZHJlYW1zIGJlIGRyZWFtcy4nLCdTaGlhIExhQmVvdWYnKTtcclxuICAgICAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZTIgPSAgbW90aXZhdGlvbmFsTWVzc2FnZSgnTW90aXZhdGlvbmFsIE1lc3NhZ2UnLFwiVGhlIG1vc3QgaW1wb3J0YW50IGludmVzdG1lbnQgeW91IGNhbiBtYWtlIGlzIGluIHlvdXJzZWxmLlwiLCdXYXJyZW4gQnVmZmV0dCcpO1xyXG4gICAgICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlMyA9IG1vdGl2YXRpb25hbE1lc3NhZ2UoJ1BlcnNvbmFsIE1lc3NhZ2UnLCdZb3UgY2FuIHBsYXkgUG9rZW1vbiBpZiB5b3UgZmluaXNoIGNvZGluZyB0aGlzIHRvLWRvIGxpc3QuJywnQnJ1Y2UnKTtcclxuICAgICAgICAgICAgbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheS5wdXNoKG1vdGl2YXRpb25hbE1lc3NhZ2UzKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjaG9vc2VPbmVNb3RpdmF0aW9uYWxNZXNzYWdlKCkge1xyXG4gICAgICAgICAgICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5W3JhbmRvbV07XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlTWVzc2FnZShpbmRleCkge1xyXG4gICAgICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gcmVuZGVyRGVmYXVsdE1lc3NhZ2VzKCkge1xyXG4gICAgICAgICAgICBhZGREZWZhdWx0TW90aXZhdGlvbmFsTWVzc2FnZXMoKTtcclxuICAgICAgICAgICAgRE9NLmNyZWF0ZU1vdGl2YXRpb25hbE1lc3NhZ2UoY2hvb3NlT25lTW90aXZhdGlvbmFsTWVzc2FnZSgpKTtcclxuICAgICAgICAgICAgYnRuRnVuY3Rpb25hbGl0eS5hZGRCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtyZW5kZXJEZWZhdWx0TWVzc2FnZXMsIGRlbGV0ZU1lc3NhZ2V9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuXHJcblxyXG5cclxuICAgIHJldHVybiB7cmVuZGVyRGVmYXVsdCwgY2xlYXJBbGxUYXNrc307XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdWk7XHJcblxyXG5cclxuLyogY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZURPTSA9ICgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vdGl2YXRpb25hbE1lc3NhZ2UobW90aXZhdGlvbmFsTWVzc2FnZU9iail7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICAgICAgICBjb25zdCBwYXJlbnREaXYgPSBtb3RpdmF0aW9uYWxNZXNzYWdlQ29udGFpbmVyKCk7XHJcbiAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKG1vdGl2YXRpb25hbE1lc3NhZ2VIZWFkZXIobW90aXZhdGlvbmFsTWVzc2FnZU9iai5oZWFkZXIpKTtcclxuICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsTWVzc2FnZShtb3RpdmF0aW9uYWxNZXNzYWdlT2JqLm1lc3NhZ2UpKTtcclxuICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsQXV0aG9yKG1vdGl2YXRpb25hbE1lc3NhZ2VPYmouYXV0aG9yKSk7XHJcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChwYXJlbnREaXYpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxNZXNzYWdlQ29udGFpbmVyKCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtbWFyZ2luJyk7XHJcbiAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCdtb3RpdmF0aW9uYWwtbWVzc2FnZScpO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZUhlYWRlcihoZWFkZXJUZXh0KSB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaGVhZGVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1oZWFkZXInKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW52aXNpYmxlQnV0dG9uc0RpdiA9IGJ1dHRvbnNEaXYoZmFsc2UpO1xyXG4gICAgICAgIGludmlzaWJsZUJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlLWVsZW1lbnRzJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHZpc2libGVCdXR0b25zRGl2ID0gYnV0dG9uc0Rpdih0cnVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlLmlubmVyVGV4dCA9IGhlYWRlclRleHQ7XHJcblxyXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChpbnZpc2libGVCdXR0b25zRGl2KTtcclxuICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsTWVzc2FnZSk7XHJcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKHZpc2libGVCdXR0b25zRGl2KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhlYWRlckRpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBidXR0b25zRGl2KGlzVmlzaWJsZSkge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBzZXR0aW5nc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBzZXR0aW5nc0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnKTtcclxuICAgICAgICBzZXR0aW5nc0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtZ2VhcicpO1xyXG4gICAgICAgIHNldHRpbmdzQnRuLmFwcGVuZENoaWxkKHNldHRpbmdzSWNvbik7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3QgY2xvc2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcpO1xyXG4gICAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS14Jyk7XHJcbiAgICAgICAgY2xvc2VCdG4uYXBwZW5kQ2hpbGQoY2xvc2VJY29uKTtcclxuXHJcbiAgICAgICAgYnV0dG9uc0Rpdi5hcHBlbmRDaGlsZChzZXR0aW5nc0J0bik7XHJcbiAgICAgICAgYnV0dG9uc0Rpdi5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XHJcblxyXG4gICAgICAgIGlmKGlzVmlzaWJsZSl7XHJcbiAgICAgICAgICAgIHNldHRpbmdzQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1zZXR0aW5ncy1idG4nKTtcclxuICAgICAgICAgICAgY2xvc2VCdG4uc2V0QXR0cmlidXRlKCdpZCcsICdtb3RpdmF0aW9uYWwtbWVzc2FnZS1jbG9zZS1idG4nKTsgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYnV0dG9uc0Rpdi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUtZWxlbWVudHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidXR0b25zRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbWVzc2FnZVBhcmFncmFwaC5pbm5lclRleHQgPSBtZXNzYWdlO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlUGFyYWdyYXBoO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbEF1dGhvcihhdXRob3IpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlQXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIG1lc3NhZ2VBdXRob3IuaW5uZXJUZXh0ID0gYXV0aG9yO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlQXV0aG9yOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtjcmVhdGVNb3RpdmF0aW9uYWxNZXNzYWdlfTtcclxufVxyXG5cclxuY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZURPTUZ1bmN0aW9uYWxpdHkgPSAoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBhZGRTZXR0aW5nQnRuRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW90aXZhdGlvbmFsLW1lc3NhZ2Utc2V0dGluZ3MtYnRuJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vZGFsRm9ybSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDbG9zZUJ0bkZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW90aXZhdGlvbmFsLW1lc3NhZ2UtY2xvc2UtYnRuJyk7XHJcbiAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3RpdmF0aW9uYWwtbWVzc2FnZScpO1xyXG4gICAgICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlRGl2LnJlbW92ZSgpO1xyXG4gICAgICAgIH0pICBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRCdG5GdW5jdGlvbmFsaXR5KCkge1xyXG4gICAgICAgIGFkZENsb3NlQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIGFkZFNldHRpbmdCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHthZGRCdG5GdW5jdGlvbmFsaXR5fTtcclxufVxyXG4gKi9cclxuLyogXHJcbiAgICAvL25lZWQgdG8gY2xlYW4gdGhpcyB1cFxyXG4gICAgLy9hZGQgYWxsIHRhc2tzIGFuZCB0YXNrcyB3aXRoIHNlY3Rpb25zXHJcbiAgICBmdW5jdGlvbiBhZGRTZWN0aW9uc1Rhc2tzRE9NKHBhcmVudERpdiwgYWxsU2VjdGlvbnNBcnJheSl7XHJcbiAgICAgICAgYWxsU2VjdGlvbnNBcnJheS5mb3JFYWNoKHNlY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uRE9NID0gY3JlYXRlU2VjdGlvbkRPTShzZWN0aW9uKS5nZXRTZWN0aW9uRE9NKCk7XHJcbiAgICAgICAgICAgIHNlY3Rpb24udGFza3MuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tET00gPSBjcmVhdGVUYXNrRE9NKHRhc2spLmdldFRhc2tET00oKTtcclxuICAgICAgICAgICAgICAgIHNlY3Rpb25ET00uYXBwZW5kQ2hpbGQodGFza0RPTSk7XHJcbiAgICAgICAgICAgICAgICB0YXNrLnN1YnRhc2tzLmZvckVhY2goc3VidGFzayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0RPTSA9IGNyZWF0ZVN1YnRhc2tET00oc3VidGFzaykuZ2V0U3VidGFza0RPTSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChzdWJ0YXNrRE9NKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChzZWN0aW9uRE9NKTsgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICovXHJcbi8qIFxyXG4gICAgY29uc3QgY3JlYXRlU2VjdGlvbkRPTSA9IChzZWN0aW9uT2JqKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU2VjdGlvbkRpdigpe1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25EaXYuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbicpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VjdGlvbkRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTZWN0aW9uSGVhZGVyKHNlY3Rpb25PYmope1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uSGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25IZWFkZXJEaXYuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbi1oZWFkZXInKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uLXRpdGxlJyk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25UaXRsZS5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLXRpdGxlJyk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25UaXRsZS5pbm5lclRleHQgPSBzZWN0aW9uT2JqLm5hbWU7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkRyb3Bkb3duQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25Ecm9wZG93bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLWRyb3Bkb3duJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBkcm9wZG93bkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xkJywnZmEtY2FyZXQtZG93bicpO1xyXG4gICAgICAgICAgICBzZWN0aW9uRHJvcGRvd25Db250YWluZXIuYXBwZW5kQ2hpbGQoZHJvcGRvd25JY29uKTtcclxuICAgICAgICAgICAgc2VjdGlvbkhlYWRlckRpdi5hcHBlbmRDaGlsZChzZWN0aW9uVGl0bGUpO1xyXG4gICAgICAgICAgICBzZWN0aW9uSGVhZGVyRGl2LmFwcGVuZENoaWxkKHNlY3Rpb25Ecm9wZG93bkNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWN0aW9uSGVhZGVyRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFNlY3Rpb25ET00oKXtcclxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkRpdiA9IGNyZWF0ZVNlY3Rpb25EaXYoKTtcclxuICAgICAgICAgICAgc2VjdGlvbkRpdi5hcHBlbmRDaGlsZChjcmVhdGVTZWN0aW9uSGVhZGVyKHNlY3Rpb25PYmopKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25EaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtnZXRTZWN0aW9uRE9NfTtcclxuICAgIH0gKi8iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vcmVuZGVyIGluYm94XHJcbmltcG9ydCBVSSBmcm9tICcuL3VpLmpzJztcclxuaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0LmpzJztcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlLmpzJztcclxuXHJcbigoKSA9PiB7XHJcbiAgICByZW5kZXJEZWZhdWx0UHJvamVjdHMoKTtcclxuICAgIFVJLmluaXRpYWxSZW5kZXIoKTtcclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJEZWZhdWx0UHJvamVjdHMoKXtcclxuICAgICAgICBsZXQgaW5ib3ggPSBwcm9qZWN0KCdJbmJveCcpO1xyXG4gICAgICAgIGxldCB0b2RheSA9IHByb2plY3QoJ1RvZGF5Jyk7XHJcbiAgICAgICAgbGV0IHRoaXN3ZWVrID0gcHJvamVjdCgnVGhpcyBXZWVrJyk7XHJcbiAgICAgICAgc3RvcmFnZS5hZGRQcm9qZWN0KGluYm94KTtcclxuICAgICAgICBzdG9yYWdlLmFkZFByb2plY3QodG9kYXkpO1xyXG4gICAgICAgIHN0b3JhZ2UuYWRkUHJvamVjdCh0aGlzd2Vlayk7XHJcbiAgICB9XHJcblxyXG5cclxufSkoKTtcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==