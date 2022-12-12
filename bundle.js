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
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
//contains all DOM Manipulation that's needed for tasks






//each dom element has a data index that's also in the storage
//these 'data-index' attributes are used to reference the storage arrays

const ui = (() => {
    function initialRender(){
        const bodyElem = document.querySelector('body');
/*         addMotivationalMessage().renderDefaultMessages(); */
        const containerDiv = containerDOM().getDOM();
        const inboxProject = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects.filter(project => project.getName() === 'Inbox')[0];
        const header = projectHeaderDOM(inboxProject).getDOM();
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
    //unique id is project-header
    const projectHeaderDOM = (project) => {
        function containerDiv(){
            const headerDiv = document.createElement('div');
            headerDiv.setAttribute('id','project-header');
            headerDiv.setAttribute('data-index',project.getIndex());
            return headerDiv;
        }
    
        function headingText() {
            const heading = document.createElement('h1');
            heading.classList.add('header-type');
            heading.innerText = project.getName();
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
                    let projectIndexInArray = getProjectIndexInArray();
                    let newTask = (0,_task_js__WEBPACK_IMPORTED_MODULE_1__["default"])(nameField, descriptionField);
                    //this updates the task with the current index
                    newTask = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectIndexInArray].addTask(newTask);
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

        //returns index of project in all projects array
        function getProjectIndexInArray(){
            let projectIndexInArray = 0;
            let projectDataIndex = document.getElementById('project-header').getAttribute('data-index');
            _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects.forEach((project, index) => {
                if(project.getIndex() == projectDataIndex){
                    projectIndexInArray = index;
                    return;
                }
            })
            return projectIndexInArray;
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
        function createContainerDiv(taskObj){
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.setAttribute('data-index', taskObj.getIndex());
            return taskDiv;
        }
    
        function createTaskBtnDiv(){
            const completeTaskDiv = document.createElement('div');
            completeTaskDiv.classList.add('complete-task-btn');
    
            const completeTaskIcon = document.createElement('i');
            completeTaskIcon.classList.add('fa-regular','fa-circle');
            addCompleteTaskIconFunctionality(completeTaskIcon);

            completeTaskDiv.appendChild(completeTaskIcon);
            return completeTaskDiv;
        }
    
        //remove task given an element inside the task div
        function removeTask(childElement){
            let currentProjectIndex = document.getElementById('project-header').getAttribute('data-index');
            let currentTaskIndex = '';
            let projectIndexInArray = '';
            let taskIndexInArray = '';
            
            //iterate curr element until it gets to task class
            let currElem = childElement;
            while(!currElem.parentNode.classList.contains('task')){
                currElem = currElem.parentNode;
            }
            currElem = currElem.parentNode;

            currentTaskIndex = currElem.getAttribute('data-index');

            projectIndexInArray = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects.findIndex(project => project.getIndex() == currentProjectIndex);
            taskIndexInArray = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectIndexInArray].getTasks().findIndex(task => task.getIndex() == currentTaskIndex);

            _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectIndexInArray].removeTask(taskIndexInArray);
            currElem.remove();
        }

        function addCompleteTaskIconFunctionality(completeTaskIcon){
            completeTaskIcon.addEventListener('click', function() {
                removeTask(completeTaskIcon);
            })
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

            addDeleteIconFunctionality(deleteIcon);

            buttonIconsDiv.appendChild(plusIcon);
            buttonIconsDiv.appendChild(editIcon);
            buttonIconsDiv.appendChild(deleteIcon);
            return buttonIconsDiv;
        }
    
        //task side button functionalities
        function addDeleteIconFunctionality(deleteIcon){
            deleteIcon.addEventListener('click', function(){
                removeTask(deleteIcon);
            })
        }

        function createEstimatedTimeDiv(taskObj){
            const estimatedTimeDiv = document.createElement('div');
            estimatedTimeDiv.classList.add('task-estimated-time');
            estimatedTimeDiv.innerText = `Est Time: ${taskObj.getEstimatedTime()}`;
            return estimatedTimeDiv;
        }
    
        function getDOM(){
            const containerDiv = createContainerDiv(taskObj);
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
}


 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsMkJBQTJCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsRUFBRSxFQUFDO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixNQUFNOzs7Ozs7VUNwb0JOO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ3lCO0FBQ1U7QUFDQTtBQUNuQztBQUNBO0FBQ0E7QUFDQSxJQUFJLDREQUFnQjtBQUNwQjtBQUNBO0FBQ0Esb0JBQW9CLHVEQUFPO0FBQzNCLG9CQUFvQix1REFBTztBQUMzQix1QkFBdUIsdURBQU87QUFDOUIsUUFBUSw4REFBa0I7QUFDMUIsUUFBUSw4REFBa0I7QUFDMUIsUUFBUSw4REFBa0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbmRleENvdW50ZXIgPSAoKSA9PiB7XHJcbiAgICBsZXQgY3VyckluZGV4ID0gMDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleCgpe1xyXG4gICAgICAgIHJldHVybiBjdXJySW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50SW5kZXgoKSB7XHJcbiAgICAgICAgY3VyckluZGV4ID0gY3VyckluZGV4ICsgMTtcclxuICAgIH1cclxuICAgIHJldHVybiB7Z2V0SW5kZXgsIGluY3JlbWVudEluZGV4fTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5kZXhDb3VudGVyOyIsImltcG9ydCBpbmRleENvdW50ZXIgZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5cclxuY29uc3QgcHJvamVjdCA9IChuYW1lLCB0YXNrcyA9IFtdLCBpbmRleCkgPT4ge1xyXG4gICAgbGV0IGN1cnJUYXNrSW5kZXggPSBpbmRleENvdW50ZXIoKTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gZ2V0TmFtZSgpe1xyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KCkge1xyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRUYXNrcygpe1xyXG4gICAgICAgIHJldHVybiB0YXNrcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXROYW1lKG5ld05hbWUpe1xyXG4gICAgICAgIG5hbWUgPSBuZXdOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldEluZGV4KG5ld0luZGV4KXtcclxuICAgICAgICBpbmRleCA9IG5ld0luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8vbmVlZCB0byBzZXQgYSB1bmlxdWUgaW5kZXggZm9yIHRhc2sgYWZ0ZXIgaXQncyBjcmVhdGVkXHJcbiAgICBmdW5jdGlvbiBhZGRUYXNrKHRhc2spe1xyXG4gICAgICAgIHRhc2suc2V0SW5kZXgoY3VyclRhc2tJbmRleC5nZXRJbmRleCgpKTtcclxuICAgICAgICB0YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgICAgIGN1cnJUYXNrSW5kZXguaW5jcmVtZW50SW5kZXgoKTtcclxuICAgICAgICByZXR1cm4gdGFzaztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVUYXNrKHRhc2tJbmRleCl7XHJcbiAgICAgICAgdGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYodGFzay5nZXRJbmRleCgpID09PSB0YXNrSW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgdGFza3Muc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtnZXROYW1lLCBnZXRJbmRleCwgZ2V0VGFza3MsIHNldE5hbWUsIHNldEluZGV4LCBhZGRUYXNrLCByZW1vdmVUYXNrfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0OyIsImltcG9ydCBpbmRleENvdW50ZXIgZnJvbSAnLi9oZWxwZXIuanMnO1xyXG4vL3Byb2plY3RzIGNvbnRhaW4gdGFza3MsIHRhc2tzIGNvbnRhaW4gc3VidGFza3NcclxuLy9mb3Igbm93LCB3ZSdsbCBmb2xsb3cgdGhhdCBoaWVyYWNoeVxyXG5cclxuY29uc3Qgc3RvcmFnZSA9ICgoKSA9PiB7XHJcbiAgICAvL3RoZSBkZWZhdWx0IHByb2plY3RzIHRoYXQgY2FuJ3QgYmUgcmVtb3ZlZFxyXG4gICAgY29uc3QgYWxsUHJvamVjdHMgPSBbXTtcclxuICAgIGxldCBjdXJyUHJvamVjdEluZGV4ID0gaW5kZXhDb3VudGVyKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChwcm9qZWN0KXtcclxuICAgICAgICBwcm9qZWN0LnNldEluZGV4KGN1cnJQcm9qZWN0SW5kZXguZ2V0SW5kZXgoKSk7XHJcbiAgICAgICAgY3VyclByb2plY3RJbmRleC5pbmNyZW1lbnRJbmRleCgpO1xyXG4gICAgICAgIGFsbFByb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0SW5kZXgpe1xyXG4gICAgICAgIGFsbFByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2plY3QuZ2V0SW5kZXgoKSA9PT0gcHJvamVjdEluZGV4KXtcclxuICAgICAgICAgICAgICAgIGFsbFByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7YWxsUHJvamVjdHMsIGFkZFByb2plY3QsIHJlbW92ZVByb2plY3R9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RvcmFnZTtcclxuXHJcbiIsImltcG9ydCBpbmRleENvdW50ZXIgZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5cclxuY29uc3QgdGFzayA9IChcclxuICAgIG5hbWUsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGR1ZURhdGUsXHJcbiAgICBlc3RpbWF0ZWRDb21wbGV0aW9uVGltZSxcclxuICAgIHByaW9yaXR5LFxyXG4gICAgc3VidGFza3MgPSBbXSxcclxuICAgIGluZGV4KSA9PlxyXG57XHJcblxyXG4gICAgbGV0IGN1cnJTdWJ0YXNrSW5kZXggPSBpbmRleENvdW50ZXIoKTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gZ2V0TmFtZSgpe1xyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldERlc2NyaXB0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldER1ZURhdGUoKXtcclxuICAgICAgICByZXR1cm4gZHVlRGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRFc3RpbWF0ZWRUaW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIGVzdGltYXRlZENvbXBsZXRpb25UaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KCl7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFByaW9yaXR5KCl7XHJcbiAgICAgICAgcmV0dXJuIHByaW9yaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldEluZGV4KHRhc2tJbmRleCl7XHJcbiAgICAgICAgaW5kZXggPSB0YXNrSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U3VidGFza3MoKXtcclxuICAgICAgICByZXR1cm4gc3VidGFza3M7XHJcbiAgICB9XHJcblxyXG4gICAgLy9uZWVkIHRvIHNldCBhIHVuaXF1ZSBpbmRleCBmb3Igc3VidGFzayBhZnRlciBpdCdzIGNyZWF0ZWRcclxuICAgIGZ1bmN0aW9uIGFkZFN1YnRhc2soc3VidGFza09iail7XHJcbiAgICAgICAgc3VidGFza09iai5zZXRJbmRleChjdXJyU3VidGFza0luZGV4KTtcclxuICAgICAgICBzdWJ0YXNrcy5wdXNoKHN1YnRhc2tPYmopO1xyXG4gICAgICAgIGluY3JlbWVudFN1YnRhc2tJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlZGl0U3VidGFzayhzdWJ0YXNrT2JqKXtcclxuICAgICAgICBzdWJ0YXNrcy5mb3JFYWNoKChzdWJ0YXNrLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHN1YnRhc2suaW5kZXggPT09IGluZGV4KXtcclxuICAgICAgICAgICAgICAgIHN1YnRhc2tzW2ldID0gc3VidGFza09iajtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtnZXROYW1lLCBnZXREZXNjcmlwdGlvbiwgZ2V0RHVlRGF0ZSwgZ2V0RXN0aW1hdGVkVGltZSwgZ2V0SW5kZXgsIGdldFByaW9yaXR5LCBnZXRTdWJ0YXNrcyxcclxuICAgICAgICAgICAgc2V0SW5kZXh9O1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2s7IiwiLy9jb250YWlucyBhbGwgRE9NIE1hbmlwdWxhdGlvbiB0aGF0J3MgbmVlZGVkIGZvciB0YXNrc1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xyXG5pbXBvcnQgdGFzayBmcm9tICcuL3Rhc2suanMnO1xyXG5pbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3QuanMnO1xyXG5cclxuaW1wb3J0IERhdGVQaWNrZXIgZnJvbSBcInJlYWN0LWRhdGVwaWNrZXJcIjtcclxuXHJcbi8vZWFjaCBkb20gZWxlbWVudCBoYXMgYSBkYXRhIGluZGV4IHRoYXQncyBhbHNvIGluIHRoZSBzdG9yYWdlXHJcbi8vdGhlc2UgJ2RhdGEtaW5kZXgnIGF0dHJpYnV0ZXMgYXJlIHVzZWQgdG8gcmVmZXJlbmNlIHRoZSBzdG9yYWdlIGFycmF5c1xyXG5cclxuY29uc3QgdWkgPSAoKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gaW5pdGlhbFJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IGJvZHlFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4vKiAgICAgICAgIGFkZE1vdGl2YXRpb25hbE1lc3NhZ2UoKS5yZW5kZXJEZWZhdWx0TWVzc2FnZXMoKTsgKi9cclxuICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBjb250YWluZXJET00oKS5nZXRET00oKTtcclxuICAgICAgICBjb25zdCBpbmJveFByb2plY3QgPSBzdG9yYWdlLmFsbFByb2plY3RzLmZpbHRlcihwcm9qZWN0ID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSAnSW5ib3gnKVswXTtcclxuICAgICAgICBjb25zdCBoZWFkZXIgPSBwcm9qZWN0SGVhZGVyRE9NKGluYm94UHJvamVjdCkuZ2V0RE9NKCk7XHJcbiAgICAgICAgY29uc3QgYWRkVGFza0RpdiA9IGFkZFRhc2tEaXZET00oKS5nZXRET00oKTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoYWRkVGFza0Rpdik7XHJcbiAgICAgICAgYm9keUVsZW0uYXBwZW5kQ2hpbGQoY29udGFpbmVyRGl2KTtcclxuICAgICAgICBzdG9yYWdlLmFsbFByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKHByb2plY3QuZ2V0TmFtZSgpID09PSAnSW5ib3gnKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tzID0gcHJvamVjdC5nZXRUYXNrcygpXHJcbiAgICAgICAgICAgICAgICBhZGRBbGxUYXNrc0RPTShjb250YWluZXJEaXYsIHRhc2tzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy9jcmVhdGUgdGhlIGNvbnRhaW5lciB0byBwdXQgYWxsIHRhc2tzLCB0aGUgYWRkIHRhc2sgYnV0dG9uLCBhbmQgcHJvamVjdCBoZWFkZXIgaW5cclxuICAgIC8vdW5pcXVlIGlkIGlzIGNvbnRhaW5lclxyXG4gICAgY29uc3QgY29udGFpbmVyRE9NID0gKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldERPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL3RoZSBwcm9qZWN0IGhlYWRlclxyXG4gICAgLy91bmlxdWUgaWQgaXMgcHJvamVjdC1oZWFkZXJcclxuICAgIGNvbnN0IHByb2plY3RIZWFkZXJET00gPSAocHJvamVjdCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNvbnRhaW5lckRpdigpe1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaGVhZGVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCdwcm9qZWN0LWhlYWRlcicpO1xyXG4gICAgICAgICAgICBoZWFkZXJEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyxwcm9qZWN0LmdldEluZGV4KCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gaGVhZGVyRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGhlYWRpbmdUZXh0KCkge1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcclxuICAgICAgICAgICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkZXItdHlwZScpO1xyXG4gICAgICAgICAgICBoZWFkaW5nLmlubmVyVGV4dCA9IHByb2plY3QuZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gaGVhZGluZztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXRET00oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRhaW5lckRpdigpO1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBoZWFkaW5nVGV4dCgpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZXR1cm4ge2dldERPTX07XHJcbiAgICB9XHJcblxyXG4gICAgLy9kaXYgdGhhdCB3aGVuIHlvdSBjbGljaywgdGhlIGFkZCB0YXNrIGZvcm0gYXBwZWFyc1xyXG4gICAgLy91bmlxdWUgaWQgaXMgYWRkLXRhc2stY2xpY2thYmxlLWRpdlxyXG4gICAgY29uc3QgYWRkVGFza0RpdkRPTSA9ICgpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjb250YWluZXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsICdhZGQtdGFzay1jbGlja2FibGUtZGl2Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBwbHVzSWNvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYScsJ2ZhLXBsdXMnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGljb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRUYXNrVGV4dCgpe1xyXG4gICAgICAgICAgICBjb25zdCBhZGRUYXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGFkZFRhc2tEaXYuaW5uZXJUZXh0ID0gJ0FkZCBUYXNrJztcclxuICAgICAgICAgICAgYWRkVGFza0Rpdi5jbGFzc0xpc3QuYWRkKCdhZGQtdGFzay10ZXh0Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBhZGRUYXNrRGl2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RE9NKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGNvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICBjb25zdCBwbHVzSWNvbkVsZW0gPSBwbHVzSWNvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBhZGRUYXNrVGV4dEVsZW0gPSBhZGRUYXNrVGV4dCgpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQocGx1c0ljb25FbGVtKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGFkZFRhc2tUZXh0RWxlbSk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRUYXNrRm9ybSA9IGFkZFRhc2tGb3JtRE9NKCkuZ2V0RE9NKCk7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkVGFza0Zvcm0pO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyRGl2LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LCB7b25jZTogdHJ1ZX0pXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge2dldERPTX07XHJcbiAgICB9XHJcblxyXG4gICAgLy9jcmVhdGUgdGhlIGZvcm0gdGhhdCBhZGRzIHRhc2tzXHJcbiAgICAvL3VuaXF1ZSBpZCBpcyBhZGQtdGFzay1mb3JtLWNvbnRhaW5lclxyXG4gICAgY29uc3QgYWRkVGFza0Zvcm1ET00gPSAoKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RE9NKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGdldENvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gZ2V0Rm9ybSgpO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtQWN0aW9ucyA9IGdldEZvcm1BY3Rpb25zKCk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtQWN0aW9ucyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldENvbnRhaW5lcigpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCdhZGQtdGFzay1mb3JtLWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0Rm9ybSgpe1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCdhZGQtdGFzay1mb3JtJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBjcmVhdGVJbnB1dCgndGV4dCcsICduYW1lJywgJ05hbWUnLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGNyZWF0ZUlucHV0KCd0ZXh0JywgJ2Rlc2NyaXB0aW9uJywgJ0Rlc2NyaXB0aW9uJywgZmFsc2UsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHBvcG92ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgcG9wb3ZlckRpdi5jbGFzc0xpc3QuYWRkKCdwb3BvdmVyLWljb25zLWRpdicpO1xyXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eURpdiA9IGdldFBvcG92ZXJJY29ucygncHJpb3JpdHktYnRuJywgJ2ZhLWZsYWcnLCAnUHJpb3JpdHknKTtcclxuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZURpdiA9IGdldFBvcG92ZXJJY29ucygnZHVlLWRhdGUtYnRuJywgJ2ZhLWNhbGVuZGFyJywnRHVlIERhdGUnKTtcclxuICAgICAgICAgICAgY29uc3QgZXN0aW1hdGVkVGltZURpdiA9IGdldFBvcG92ZXJJY29ucygnZXN0LWNvbXBsZXRpb24tdGltZS1idG4nLCAnZmEtY2xvY2snLCAnRXN0IFRpbWUnKTtcclxuICAgICAgICAgICAgcG9wb3ZlckRpdi5hcHBlbmRDaGlsZChwcmlvcml0eURpdik7XHJcbiAgICAgICAgICAgIHBvcG92ZXJEaXYuYXBwZW5kQ2hpbGQoZHVlRGF0ZURpdik7XHJcbiAgICAgICAgICAgIHBvcG92ZXJEaXYuYXBwZW5kQ2hpbGQoZXN0aW1hdGVkVGltZURpdik7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UG9wb3Zlckljb25zKGRpdklkLCBpY29uQ2xhc3MsIHRleHQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsZGl2SWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGljb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnICsgdGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXJlZ3VsYXInLGljb25DbGFzcyk7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaWNvbik7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoaWNvblRleHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xyXG4gICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xyXG4gICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKHBvcG92ZXJEaXYpO1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEZvcm1BY3Rpb25zKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsJ2Zvcm0tYWN0aW9ucy1kaXYnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKCdpZCcsJ2NhbmNlbC1hZGQtdGFzay1mb3JtJyk7XHJcbiAgICAgICAgICAgIGNhbmNlbEJ0bi5pbm5lclRleHQgPSAnQ2FuY2VsJztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdG4uc2V0QXR0cmlidXRlKCdpZCcsJ2FkZC10YXNrLXN1Ym1pdC1idXR0b24nKTtcclxuICAgICAgICAgICAgc3VibWl0QnRuLmlubmVyVGV4dCA9ICdBZGQgVGFzayc7XHJcblxyXG4gICAgICAgICAgICBhZGRDYW5jZWxCdG5GdW5jdGlvbmFsaXR5KGNhbmNlbEJ0bik7XHJcbiAgICAgICAgICAgIGFkZFN1Ym1pdEJ0bkZ1bmN0aW9uYWxpdHkoc3VibWl0QnRuKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoc3VibWl0QnRuKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JlbW92ZXMgdGhlIGZvcm0gYW5kIGFkZHMgdGhlIGFkZCB0YXNrIHRleHQgYmFja1xyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENhbmNlbEJ0bkZ1bmN0aW9uYWxpdHkoY2FuY2VsQnRuKXtcclxuICAgICAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZFRhc2tFbGVtID0gYWRkVGFza0RpdkRPTSgpLmdldERPTSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1mb3JtLWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRUYXNrRWxlbSk7XHJcbiAgICAgICAgICAgIH0sIHtvbmNlOnRydWV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlcyB0aGUgZm9ybSBhbmQgYWRkcyB0aGUgdGFzayBkb21cclxuICAgICAgICAvL25lZWQgdG8gYWRkIGVycm9yIG1lc3NhZ2Ugb2Ygc29tZSBzb3J0IHdoZW4gdGhlcmUncyBubyB0ZXh0IGluIHRoZSBuYW1lIGZpZWxkXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3VibWl0QnRuRnVuY3Rpb25hbGl0eShzdWJtaXRCdG4pe1xyXG4gICAgICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmKG5hbWVGaWVsZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2plY3RJbmRleEluQXJyYXkgPSBnZXRQcm9qZWN0SW5kZXhJbkFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Rhc2sgPSB0YXNrKG5hbWVGaWVsZCwgZGVzY3JpcHRpb25GaWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIHVwZGF0ZXMgdGhlIHRhc2sgd2l0aCB0aGUgY3VycmVudCBpbmRleFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1Rhc2sgPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RJbmRleEluQXJyYXldLmFkZFRhc2sobmV3VGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Rhc2tET00gPSB0YXNrRE9NKG5ld1Rhc2spLmdldERPTSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRUYXNrRWxlbSA9IGFkZFRhc2tEaXZET00oKS5nZXRET00oKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWZvcm0tY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybUNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmV3VGFza0RPTSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZFRhc2tFbGVtKTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0pICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZXR1cm5zIGluZGV4IG9mIHByb2plY3QgaW4gYWxsIHByb2plY3RzIGFycmF5XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0UHJvamVjdEluZGV4SW5BcnJheSgpe1xyXG4gICAgICAgICAgICBsZXQgcHJvamVjdEluZGV4SW5BcnJheSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBwcm9qZWN0RGF0YUluZGV4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaGVhZGVyJykuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UuYWxsUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHByb2plY3QuZ2V0SW5kZXgoKSA9PSBwcm9qZWN0RGF0YUluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0SW5kZXhJbkFycmF5ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdEluZGV4SW5BcnJheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUlucHV0KHR5cGUsIGlkLCBwbGFjZWhvbGRlciwgaXNSZXF1aXJlZCwgaXNBdXRvRm9jdXMpe1xyXG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIHR5cGUpO1xyXG4gICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG4gICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIpO1xyXG4gICAgICAgICAgICBpZihpc1JlcXVpcmVkID8gaW5wdXQucmVxdWlyZWQgPSB0cnVlIDogaW5wdXQucmVxdWlyZWQgPSBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmKGlzQXV0b0ZvY3VzID8gaW5wdXQuYXV0b2ZvY3VzID0gdHJ1ZSA6IGlucHV0LmF1dG9mb2N1cyA9IGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019O1xyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlcyBET00gb2Ygb25lIHRhc2tcclxuICAgIGNvbnN0IHRhc2tET00gPSAodGFza09iaikgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lckRpdih0YXNrT2JqKXtcclxuICAgICAgICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2snKTtcclxuICAgICAgICAgICAgdGFza0Rpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCB0YXNrT2JqLmdldEluZGV4KCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFza0RpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVUYXNrQnRuRGl2KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlVGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tEaXYuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUtdGFzay1idG4nKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBjb21wbGV0ZVRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXJlZ3VsYXInLCdmYS1jaXJjbGUnKTtcclxuICAgICAgICAgICAgYWRkQ29tcGxldGVUYXNrSWNvbkZ1bmN0aW9uYWxpdHkoY29tcGxldGVUYXNrSWNvbik7XHJcblxyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tEaXYuYXBwZW5kQ2hpbGQoY29tcGxldGVUYXNrSWNvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb21wbGV0ZVRhc2tEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9yZW1vdmUgdGFzayBnaXZlbiBhbiBlbGVtZW50IGluc2lkZSB0aGUgdGFzayBkaXZcclxuICAgICAgICBmdW5jdGlvbiByZW1vdmVUYXNrKGNoaWxkRWxlbWVudCl7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdEluZGV4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaGVhZGVyJykuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50VGFza0luZGV4ID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBwcm9qZWN0SW5kZXhJbkFycmF5ID0gJyc7XHJcbiAgICAgICAgICAgIGxldCB0YXNrSW5kZXhJbkFycmF5ID0gJyc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2l0ZXJhdGUgY3VyciBlbGVtZW50IHVudGlsIGl0IGdldHMgdG8gdGFzayBjbGFzc1xyXG4gICAgICAgICAgICBsZXQgY3VyckVsZW0gPSBjaGlsZEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHdoaWxlKCFjdXJyRWxlbS5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygndGFzaycpKXtcclxuICAgICAgICAgICAgICAgIGN1cnJFbGVtID0gY3VyckVsZW0ucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyRWxlbSA9IGN1cnJFbGVtLnBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50VGFza0luZGV4ID0gY3VyckVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcblxyXG4gICAgICAgICAgICBwcm9qZWN0SW5kZXhJbkFycmF5ID0gc3RvcmFnZS5hbGxQcm9qZWN0cy5maW5kSW5kZXgocHJvamVjdCA9PiBwcm9qZWN0LmdldEluZGV4KCkgPT0gY3VycmVudFByb2plY3RJbmRleCk7XHJcbiAgICAgICAgICAgIHRhc2tJbmRleEluQXJyYXkgPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RJbmRleEluQXJyYXldLmdldFRhc2tzKCkuZmluZEluZGV4KHRhc2sgPT4gdGFzay5nZXRJbmRleCgpID09IGN1cnJlbnRUYXNrSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0SW5kZXhJbkFycmF5XS5yZW1vdmVUYXNrKHRhc2tJbmRleEluQXJyYXkpO1xyXG4gICAgICAgICAgICBjdXJyRWxlbS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENvbXBsZXRlVGFza0ljb25GdW5jdGlvbmFsaXR5KGNvbXBsZXRlVGFza0ljb24pe1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVUYXNrKGNvbXBsZXRlVGFza0ljb24pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlVGFza1RpdGxlRGl2KHRhc2tPYmope1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrVGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGFza1RpdGxlRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGl0bGUnKTtcclxuICAgICAgICAgICAgdGFza1RpdGxlRGl2LmlubmVyVGV4dCA9IHRhc2tPYmouZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFza1RpdGxlRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tEZXNjcmlwdGlvbkRpdih0YXNrT2JqKXtcclxuICAgICAgICAgICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbkRpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRlc2NyaXB0aW9uJyk7XHJcbiAgICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbkRpdi5pbm5lclRleHQgPSB0YXNrT2JqLmdldERlc2NyaXB0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXNrRGVzY3JpcHRpb25EaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlVGFza0J1dHRvbnNEaXYoKXtcclxuICAgICAgICAgICAgY29uc3QgYnV0dG9uSWNvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgYnV0dG9uSWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnYnV0dG9uLWljb25zJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgcGx1c0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIHBsdXNJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc3F1YXJlLXBsdXMnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1wZW4tdG8tc3F1YXJlJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXRyYXNoJyk7XHJcblxyXG4gICAgICAgICAgICBhZGREZWxldGVJY29uRnVuY3Rpb25hbGl0eShkZWxldGVJY29uKTtcclxuXHJcbiAgICAgICAgICAgIGJ1dHRvbkljb25zRGl2LmFwcGVuZENoaWxkKHBsdXNJY29uKTtcclxuICAgICAgICAgICAgYnV0dG9uSWNvbnNEaXYuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgICAgICAgICBidXR0b25JY29uc0Rpdi5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbkljb25zRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8vdGFzayBzaWRlIGJ1dHRvbiBmdW5jdGlvbmFsaXRpZXNcclxuICAgICAgICBmdW5jdGlvbiBhZGREZWxldGVJY29uRnVuY3Rpb25hbGl0eShkZWxldGVJY29uKXtcclxuICAgICAgICAgICAgZGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVUYXNrKGRlbGV0ZUljb24pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlRXN0aW1hdGVkVGltZURpdih0YXNrT2JqKXtcclxuICAgICAgICAgICAgY29uc3QgZXN0aW1hdGVkVGltZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBlc3RpbWF0ZWRUaW1lRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stZXN0aW1hdGVkLXRpbWUnKTtcclxuICAgICAgICAgICAgZXN0aW1hdGVkVGltZURpdi5pbm5lclRleHQgPSBgRXN0IFRpbWU6ICR7dGFza09iai5nZXRFc3RpbWF0ZWRUaW1lKCl9YDtcclxuICAgICAgICAgICAgcmV0dXJuIGVzdGltYXRlZFRpbWVEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RE9NKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGNyZWF0ZUNvbnRhaW5lckRpdih0YXNrT2JqKTtcclxuICAgICAgICAgICAgY29uc3QgYnV0dG9uc0RpdiA9IGNyZWF0ZVRhc2tCdG5EaXYoKTtcclxuICAgICAgICAgICAgY29uc3QgdGl0bGVEaXYgPSBjcmVhdGVUYXNrVGl0bGVEaXYodGFza09iaik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tCdXR0b25zID0gY3JlYXRlVGFza0J1dHRvbnNEaXYoKTtcclxuICAgICAgICAgICAgaWYodGFza09iai5nZXRFc3RpbWF0ZWRUaW1lKCkpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0VzdGltYXRlZFRpbWUgPSBjcmVhdGVFc3RpbWF0ZWRUaW1lRGl2KHRhc2tPYmopO1xyXG4gICAgICAgICAgICAgICAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQodGFza0VzdGltYXRlZFRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRhc2tPYmouZ2V0RGVzY3JpcHRpb24oKSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBjcmVhdGVUYXNrRGVzY3JpcHRpb25EaXYodGFza09iaik7XHJcbiAgICAgICAgICAgICAgICB0aXRsZURpdi5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGJ1dHRvbnNEaXYpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGFza0J1dHRvbnMpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019O1xyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlcyBET00gb2Ygb25lIHN1YnRhc2tcclxuICAgIGNvbnN0IHN1YnRhc2tET00gPSAoc3VidGFza09iaikgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVN1YnRhc2tEaXYoKXtcclxuICAgICAgICAgICAgY29uc3Qgc3VidGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBzdWJ0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3N1YnRhc2snKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YnRhc2tEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ29tcGxldGVTdWJ0YXNrRGl2KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUtdGFzay1idG4nKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBjaXJjbGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBjaXJjbGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXJlZ3VsYXInLCdmYS1jaXJjbGUnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoY2lyY2xlSWNvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU3VidGFza1RpdGxlRGl2KHN1YnRhc2tPYmope1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0aXRsZURpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLXRpdGxlJyk7XHJcbiAgICAgICAgICAgIHRpdGxlRGl2LmlubmVyVGV4dCA9IHN1YnRhc2tPYmouZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGl0bGVEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU3VidGFza0J1dHRvbkljb25zKCkge1xyXG4gICAgICAgICAgICBjb25zdCBidXR0b25zSWNvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBidXR0b25zSWNvbkRpdi5jbGFzc0xpc3QuYWRkKCdidXR0b24taWNvbnMnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1wZW4tdG8tc3F1YXJlJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXRyYXNoJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgYnV0dG9uc0ljb25EaXYuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgICAgICAgICBidXR0b25zSWNvbkRpdi5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbnNJY29uRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBjcmVhdGVTdWJ0YXNrRGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlU3VidGFza0RpdiA9IGNyZWF0ZUNvbXBsZXRlU3VidGFza0RpdigpO1xyXG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrVGl0bGVEaXYgPSBjcmVhdGVTdWJ0YXNrVGl0bGVEaXYoc3VidGFza09iaik7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tCdG5JY29ucyA9IGNyZWF0ZVN1YnRhc2tCdXR0b25JY29ucygpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChjb21wbGV0ZVN1YnRhc2tEaXYpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoc3VidGFza1RpdGxlRGl2KTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tCdG5JY29ucyk7XHJcbiAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZXR1cm4ge2dldERPTX07XHJcbiAgICB9XHJcblxyXG4gICAgLy9hZGRzIGFsbCBkb20gb2YgdGFza3MgYW5kIHN1YnRhc2tzIGluIGEgcHJvamVjdFxyXG4gICAgZnVuY3Rpb24gYWRkQWxsVGFza3NET00oY29udGFpbmVyLCB0YXNrcyl7XHJcbiAgICAgICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tET00odGFzaykuZ2V0RE9NKCkpO1xyXG4gICAgICAgICAgICBjb25zdCBhbGxTdWJ0YXNrcyA9IHRhc2suZ2V0U3VidGFza3MoKTtcclxuICAgICAgICAgICAgYWxsU3VidGFza3MuZm9yRWFjaChzdWJ0YXNrID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJ0YXNrRE9NKHN1YnRhc2spLmdldERPTSgpKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsZWFyQWxsVGFza3MgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcnMnKTtcclxuICAgICAgICBjb250YWluZXJEaXYucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtpbml0aWFsUmVuZGVyLCBjbGVhckFsbFRhc2tzfTtcclxuXHJcbn0pKClcclxuLyogXHJcbmNvbnN0IHJlbmRlclRhc2tzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWRkTW90aXZhdGlvbmFsTWVzc2FnZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5ID0gW107XHJcbiAgICAgICAgY29uc3QgRE9NID0gbW90aXZhdGlvbmFsTWVzc2FnZURPTSgpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkZ1bmN0aW9uYWxpdHkgPSBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIC8vb2JqZWN0IGRlY2xhcmF0aW9uIGZvciBtb3RpdmF0aW9uYWwgbWVzc2FnZXNcclxuICAgICAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxNZXNzYWdlKGhlYWRlciwgbWVzc2FnZSwgYXV0aG9yID0gJycpe1xyXG4gICAgICAgICAgICByZXR1cm4ge2hlYWRlciwgbWVzc2FnZSwgYXV0aG9yfTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL3ByZXNldCBtZXRob2RzIGZvciBtb3RpdmF0aW9uYWwgbWVzc2FnZVxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZERlZmF1bHRNb3RpdmF0aW9uYWxNZXNzYWdlcygpIHtcclxuICAgICAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZTEgPSBtb3RpdmF0aW9uYWxNZXNzYWdlKCdNb3RpdmF0aW9uYWwgTWVzc2FnZScsJ1llc3RlcmRheSB5b3Ugc2FpZCB0b21vcnJvdywgc28ganVzdCBkbyBpdC4gRG9uXFwndCBsZXQgeW91ciBkcmVhbXMgYmUgZHJlYW1zLicsJ1NoaWEgTGFCZW91ZicpO1xyXG4gICAgICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlMiA9ICBtb3RpdmF0aW9uYWxNZXNzYWdlKCdNb3RpdmF0aW9uYWwgTWVzc2FnZScsXCJUaGUgbW9zdCBpbXBvcnRhbnQgaW52ZXN0bWVudCB5b3UgY2FuIG1ha2UgaXMgaW4geW91cnNlbGYuXCIsJ1dhcnJlbiBCdWZmZXR0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2UzID0gbW90aXZhdGlvbmFsTWVzc2FnZSgnUGVyc29uYWwgTWVzc2FnZScsJ1lvdSBjYW4gcGxheSBQb2tlbW9uIGlmIHlvdSBmaW5pc2ggY29kaW5nIHRoaXMgdG8tZG8gbGlzdC4nLCdCcnVjZScpO1xyXG4gICAgICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5LnB1c2gobW90aXZhdGlvbmFsTWVzc2FnZTMpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNob29zZU9uZU1vdGl2YXRpb25hbE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkubGVuZ3RoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXlbcmFuZG9tXTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBkZWxldGVNZXNzYWdlKGluZGV4KSB7XHJcbiAgICAgICAgICAgIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiByZW5kZXJEZWZhdWx0TWVzc2FnZXMoKSB7XHJcbiAgICAgICAgICAgIGFkZERlZmF1bHRNb3RpdmF0aW9uYWxNZXNzYWdlcygpO1xyXG4gICAgICAgICAgICBET00uY3JlYXRlTW90aXZhdGlvbmFsTWVzc2FnZShjaG9vc2VPbmVNb3RpdmF0aW9uYWxNZXNzYWdlKCkpO1xyXG4gICAgICAgICAgICBidG5GdW5jdGlvbmFsaXR5LmFkZEJ0bkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZXR1cm4ge3JlbmRlckRlZmF1bHRNZXNzYWdlcywgZGVsZXRlTWVzc2FnZX07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtyZW5kZXJEZWZhdWx0LCBjbGVhckFsbFRhc2tzfTtcclxufVxyXG5cclxuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCB1aTtcclxuXHJcblxyXG4vKiBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NID0gKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlTW90aXZhdGlvbmFsTWVzc2FnZShtb3RpdmF0aW9uYWxNZXNzYWdlT2JqKXtcclxuICAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gICAgICAgIGNvbnN0IHBhcmVudERpdiA9IG1vdGl2YXRpb25hbE1lc3NhZ2VDb250YWluZXIoKTtcclxuICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsTWVzc2FnZUhlYWRlcihtb3RpdmF0aW9uYWxNZXNzYWdlT2JqLmhlYWRlcikpO1xyXG4gICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChtb3RpdmF0aW9uYWxNZXNzYWdlKG1vdGl2YXRpb25hbE1lc3NhZ2VPYmoubWVzc2FnZSkpO1xyXG4gICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChtb3RpdmF0aW9uYWxBdXRob3IobW90aXZhdGlvbmFsTWVzc2FnZU9iai5hdXRob3IpKTtcclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHBhcmVudERpdik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbE1lc3NhZ2VDb250YWluZXIoKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGVudC1tYXJnaW4nKTtcclxuICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsJ21vdGl2YXRpb25hbC1tZXNzYWdlJyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxNZXNzYWdlSGVhZGVyKGhlYWRlclRleHQpIHtcclxuICAgICAgICBjb25zdCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBoZWFkZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsJ21vdGl2YXRpb25hbC1tZXNzYWdlLWhlYWRlcicpO1xyXG5cclxuICAgICAgICBjb25zdCBpbnZpc2libGVCdXR0b25zRGl2ID0gYnV0dG9uc0RpdihmYWxzZSk7XHJcbiAgICAgICAgaW52aXNpYmxlQnV0dG9uc0Rpdi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUtZWxlbWVudHMnKTtcclxuXHJcbiAgICAgICAgY29uc3QgdmlzaWJsZUJ1dHRvbnNEaXYgPSBidXR0b25zRGl2KHRydWUpO1xyXG5cclxuICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIG1vdGl2YXRpb25hbE1lc3NhZ2UuaW5uZXJUZXh0ID0gaGVhZGVyVGV4dDtcclxuXHJcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKGludmlzaWJsZUJ1dHRvbnNEaXYpO1xyXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChtb3RpdmF0aW9uYWxNZXNzYWdlKTtcclxuICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQodmlzaWJsZUJ1dHRvbnNEaXYpO1xyXG5cclxuICAgICAgICByZXR1cm4gaGVhZGVyRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJ1dHRvbnNEaXYoaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIHNldHRpbmdzSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcpO1xyXG4gICAgICAgIHNldHRpbmdzSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1nZWFyJyk7XHJcbiAgICAgICAgc2V0dGluZ3NCdG4uYXBwZW5kQ2hpbGQoc2V0dGluZ3NJY29uKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBjb25zdCBjbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XHJcbiAgICAgICAgY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXgnKTtcclxuICAgICAgICBjbG9zZUJ0bi5hcHBlbmRDaGlsZChjbG9zZUljb24pO1xyXG5cclxuICAgICAgICBidXR0b25zRGl2LmFwcGVuZENoaWxkKHNldHRpbmdzQnRuKTtcclxuICAgICAgICBidXR0b25zRGl2LmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcclxuXHJcbiAgICAgICAgaWYoaXNWaXNpYmxlKXtcclxuICAgICAgICAgICAgc2V0dGluZ3NCdG4uc2V0QXR0cmlidXRlKCdpZCcsJ21vdGl2YXRpb25hbC1tZXNzYWdlLXNldHRpbmdzLWJ0bicpO1xyXG4gICAgICAgICAgICBjbG9zZUJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21vdGl2YXRpb25hbC1tZXNzYWdlLWNsb3NlLWJ0bicpOyAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZS1lbGVtZW50cycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbnNEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZVBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBtZXNzYWdlUGFyYWdyYXBoLmlubmVyVGV4dCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VQYXJhZ3JhcGg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsQXV0aG9yKGF1dGhvcikge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VBdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbWVzc2FnZUF1dGhvci5pbm5lclRleHQgPSBhdXRob3I7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VBdXRob3I7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2NyZWF0ZU1vdGl2YXRpb25hbE1lc3NhZ2V9O1xyXG59XHJcblxyXG5jb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NRnVuY3Rpb25hbGl0eSA9ICgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGFkZFNldHRpbmdCdG5GdW5jdGlvbmFsaXR5KCl7XHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1zZXR0aW5ncy1idG4nKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTW9kYWxGb3JtKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZENsb3NlQnRuRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1jbG9zZS1idG4nKTtcclxuICAgICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdGl2YXRpb25hbC1tZXNzYWdlJyk7XHJcbiAgICAgICAgICAgIG1vdGl2YXRpb25hbE1lc3NhZ2VEaXYucmVtb3ZlKCk7XHJcbiAgICAgICAgfSkgIFxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEJ0bkZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICAgICAgYWRkQ2xvc2VCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgYWRkU2V0dGluZ0J0bkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2FkZEJ0bkZ1bmN0aW9uYWxpdHl9O1xyXG59XHJcbiAqL1xyXG4vKiBcclxuICAgIC8vbmVlZCB0byBjbGVhbiB0aGlzIHVwXHJcbiAgICAvL2FkZCBhbGwgdGFza3MgYW5kIHRhc2tzIHdpdGggc2VjdGlvbnNcclxuICAgIGZ1bmN0aW9uIGFkZFNlY3Rpb25zVGFza3NET00ocGFyZW50RGl2LCBhbGxTZWN0aW9uc0FycmF5KXtcclxuICAgICAgICBhbGxTZWN0aW9uc0FycmF5LmZvckVhY2goc2VjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25ET00gPSBjcmVhdGVTZWN0aW9uRE9NKHNlY3Rpb24pLmdldFNlY3Rpb25ET00oKTtcclxuICAgICAgICAgICAgc2VjdGlvbi50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0RPTSA9IGNyZWF0ZVRhc2tET00odGFzaykuZ2V0VGFza0RPTSgpO1xyXG4gICAgICAgICAgICAgICAgc2VjdGlvbkRPTS5hcHBlbmRDaGlsZCh0YXNrRE9NKTtcclxuICAgICAgICAgICAgICAgIHRhc2suc3VidGFza3MuZm9yRWFjaChzdWJ0YXNrID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRE9NID0gY3JlYXRlU3VidGFza0RPTShzdWJ0YXNrKS5nZXRTdWJ0YXNrRE9NKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKHN1YnRhc2tET00pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKHNlY3Rpb25ET00pOyAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gKi9cclxuLyogXHJcbiAgICBjb25zdCBjcmVhdGVTZWN0aW9uRE9NID0gKHNlY3Rpb25PYmopID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTZWN0aW9uRGl2KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgc2VjdGlvbkRpdi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWN0aW9uRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVNlY3Rpb25IZWFkZXIoc2VjdGlvbk9iail7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25IZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgc2VjdGlvbkhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLWhlYWRlcicpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24tdGl0bGUnKTtcclxuICAgICAgICAgICAgc2VjdGlvblRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24tdGl0bGUnKTtcclxuICAgICAgICAgICAgc2VjdGlvblRpdGxlLmlubmVyVGV4dCA9IHNlY3Rpb25PYmoubmFtZTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uRHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgc2VjdGlvbkRyb3Bkb3duQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24tZHJvcGRvd24nKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgZHJvcGRvd25JY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGQnLCdmYS1jYXJldC1kb3duJyk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25Ecm9wZG93bkNvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wZG93bkljb24pO1xyXG4gICAgICAgICAgICBzZWN0aW9uSGVhZGVyRGl2LmFwcGVuZENoaWxkKHNlY3Rpb25UaXRsZSk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25IZWFkZXJEaXYuYXBwZW5kQ2hpbGQoc2VjdGlvbkRyb3Bkb3duQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25IZWFkZXJEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0U2VjdGlvbkRPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uRGl2ID0gY3JlYXRlU2VjdGlvbkRpdigpO1xyXG4gICAgICAgICAgICBzZWN0aW9uRGl2LmFwcGVuZENoaWxkKGNyZWF0ZVNlY3Rpb25IZWFkZXIoc2VjdGlvbk9iaikpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VjdGlvbkRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZXR1cm4ge2dldFNlY3Rpb25ET019O1xyXG4gICAgfSAqLyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy9yZW5kZXIgaW5ib3hcclxuaW1wb3J0IFVJIGZyb20gJy4vdWkuanMnO1xyXG5pbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3QuanMnO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xyXG5cclxuKCgpID0+IHtcclxuICAgIHJlbmRlckRlZmF1bHRQcm9qZWN0cygpO1xyXG4gICAgVUkuaW5pdGlhbFJlbmRlcigpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlckRlZmF1bHRQcm9qZWN0cygpe1xyXG4gICAgICAgIGxldCBpbmJveCA9IHByb2plY3QoJ0luYm94Jyk7XHJcbiAgICAgICAgbGV0IHRvZGF5ID0gcHJvamVjdCgnVG9kYXknKTtcclxuICAgICAgICBsZXQgdGhpc3dlZWsgPSBwcm9qZWN0KCdUaGlzIFdlZWsnKTtcclxuICAgICAgICBzdG9yYWdlLmFkZFByb2plY3QoaW5ib3gpO1xyXG4gICAgICAgIHN0b3JhZ2UuYWRkUHJvamVjdCh0b2RheSk7XHJcbiAgICAgICAgc3RvcmFnZS5hZGRQcm9qZWN0KHRoaXN3ZWVrKTtcclxuICAgIH1cclxuXHJcblxyXG59KSgpO1xyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9