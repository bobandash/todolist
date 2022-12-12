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
    
        function addCompleteTaskIconFunctionality(completeTaskIcon){
            completeTaskIcon.addEventListener('click', function(){
                let currentProjectIndex = document.getElementById('project-header').getAttribute('data-index');
                let currentTaskIndex = '';
                let projectIndexInArray = '';
                let taskIndexInArray = '';
                
                //iterate curr element until it gets to task class
                let currElem = completeTaskIcon;
                while(!currElem.parentNode.classList.contains('task')){
                    currElem = currElem.parentNode;
                }
                currElem = currElem.parentNode;

                currentTaskIndex = currElem.getAttribute('data-index');

                projectIndexInArray = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects.findIndex(project => project.getIndex() == currentProjectIndex);
                taskIndexInArray = _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectIndexInArray].getTasks().findIndex(task => task.getIndex() == currentTaskIndex);
                
                console.log(taskIndexInArray);

                _storage_js__WEBPACK_IMPORTED_MODULE_0__["default"].allProjects[projectIndexInArray].removeTask(taskIndexInArray);
                currElem.remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELDJCQUEyQjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLEVBQUUsRUFBQztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsTUFBTTs7Ozs7O1VDdm5CTjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUN5QjtBQUNVO0FBQ0E7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsSUFBSSw0REFBZ0I7QUFDcEI7QUFDQTtBQUNBLG9CQUFvQix1REFBTztBQUMzQixvQkFBb0IsdURBQU87QUFDM0IsdUJBQXVCLHVEQUFPO0FBQzlCLFFBQVEsOERBQWtCO0FBQzFCLFFBQVEsOERBQWtCO0FBQzFCLFFBQVEsOERBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaGVscGVyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdWkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaW5kZXhDb3VudGVyID0gKCkgPT4ge1xyXG4gICAgbGV0IGN1cnJJbmRleCA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoKXtcclxuICAgICAgICByZXR1cm4gY3VyckluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudEluZGV4KCkge1xyXG4gICAgICAgIGN1cnJJbmRleCA9IGN1cnJJbmRleCArIDE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge2dldEluZGV4LCBpbmNyZW1lbnRJbmRleH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluZGV4Q291bnRlcjsiLCJpbXBvcnQgaW5kZXhDb3VudGVyIGZyb20gJy4vaGVscGVyLmpzJztcclxuXHJcbmNvbnN0IHByb2plY3QgPSAobmFtZSwgdGFza3MgPSBbXSwgaW5kZXgpID0+IHtcclxuICAgIGxldCBjdXJyVGFza0luZGV4ID0gaW5kZXhDb3VudGVyKCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VGFza3MoKXtcclxuICAgICAgICByZXR1cm4gdGFza3M7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0TmFtZShuZXdOYW1lKXtcclxuICAgICAgICBuYW1lID0gbmV3TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRJbmRleChuZXdJbmRleCl7XHJcbiAgICAgICAgaW5kZXggPSBuZXdJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvL25lZWQgdG8gc2V0IGEgdW5pcXVlIGluZGV4IGZvciB0YXNrIGFmdGVyIGl0J3MgY3JlYXRlZFxyXG4gICAgZnVuY3Rpb24gYWRkVGFzayh0YXNrKXtcclxuICAgICAgICB0YXNrLnNldEluZGV4KGN1cnJUYXNrSW5kZXguZ2V0SW5kZXgoKSk7XHJcbiAgICAgICAgdGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgICBjdXJyVGFza0luZGV4LmluY3JlbWVudEluZGV4KCk7XHJcbiAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlVGFzayh0YXNrSW5kZXgpe1xyXG4gICAgICAgIHRhc2tzLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRhc2suZ2V0SW5kZXgoKSA9PT0gdGFza0luZGV4KXtcclxuICAgICAgICAgICAgICAgIHRhc2tzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7Z2V0TmFtZSwgZ2V0SW5kZXgsIGdldFRhc2tzLCBzZXROYW1lLCBzZXRJbmRleCwgYWRkVGFzaywgcmVtb3ZlVGFza31cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJvamVjdDsiLCJpbXBvcnQgaW5kZXhDb3VudGVyIGZyb20gJy4vaGVscGVyLmpzJztcclxuLy9wcm9qZWN0cyBjb250YWluIHRhc2tzLCB0YXNrcyBjb250YWluIHN1YnRhc2tzXHJcbi8vZm9yIG5vdywgd2UnbGwgZm9sbG93IHRoYXQgaGllcmFjaHlcclxuXHJcbmNvbnN0IHN0b3JhZ2UgPSAoKCkgPT4ge1xyXG4gICAgLy90aGUgZGVmYXVsdCBwcm9qZWN0cyB0aGF0IGNhbid0IGJlIHJlbW92ZWRcclxuICAgIGNvbnN0IGFsbFByb2plY3RzID0gW107XHJcbiAgICBsZXQgY3VyclByb2plY3RJbmRleCA9IGluZGV4Q291bnRlcigpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3QocHJvamVjdCl7XHJcbiAgICAgICAgcHJvamVjdC5zZXRJbmRleChjdXJyUHJvamVjdEluZGV4LmdldEluZGV4KCkpO1xyXG4gICAgICAgIGN1cnJQcm9qZWN0SW5kZXguaW5jcmVtZW50SW5kZXgoKTtcclxuICAgICAgICBhbGxQcm9qZWN0cy5wdXNoKHByb2plY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVByb2plY3QocHJvamVjdEluZGV4KXtcclxuICAgICAgICBhbGxQcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9qZWN0LmdldEluZGV4KCkgPT09IHByb2plY3RJbmRleCl7XHJcbiAgICAgICAgICAgICAgICBhbGxQcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2FsbFByb2plY3RzLCBhZGRQcm9qZWN0LCByZW1vdmVQcm9qZWN0fTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0b3JhZ2U7XHJcblxyXG4iLCJpbXBvcnQgaW5kZXhDb3VudGVyIGZyb20gJy4vaGVscGVyLmpzJztcclxuXHJcbmNvbnN0IHRhc2sgPSAoXHJcbiAgICBuYW1lLFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBkdWVEYXRlLFxyXG4gICAgZXN0aW1hdGVkQ29tcGxldGlvblRpbWUsXHJcbiAgICBwcmlvcml0eSxcclxuICAgIHN1YnRhc2tzID0gW10sXHJcbiAgICBpbmRleCkgPT5cclxue1xyXG5cclxuICAgIGxldCBjdXJyU3VidGFza0luZGV4ID0gaW5kZXhDb3VudGVyKCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGdldE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXREZXNjcmlwdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXREdWVEYXRlKCl7XHJcbiAgICAgICAgcmV0dXJuIGR1ZURhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RXN0aW1hdGVkVGltZSgpe1xyXG4gICAgICAgIHJldHVybiBlc3RpbWF0ZWRDb21wbGV0aW9uVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleCgpe1xyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQcmlvcml0eSgpe1xyXG4gICAgICAgIHJldHVybiBwcmlvcml0eTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRJbmRleCh0YXNrSW5kZXgpe1xyXG4gICAgICAgIGluZGV4ID0gdGFza0luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFN1YnRhc2tzKCl7XHJcbiAgICAgICAgcmV0dXJuIHN1YnRhc2tzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vbmVlZCB0byBzZXQgYSB1bmlxdWUgaW5kZXggZm9yIHN1YnRhc2sgYWZ0ZXIgaXQncyBjcmVhdGVkXHJcbiAgICBmdW5jdGlvbiBhZGRTdWJ0YXNrKHN1YnRhc2tPYmope1xyXG4gICAgICAgIHN1YnRhc2tPYmouc2V0SW5kZXgoY3VyclN1YnRhc2tJbmRleCk7XHJcbiAgICAgICAgc3VidGFza3MucHVzaChzdWJ0YXNrT2JqKTtcclxuICAgICAgICBpbmNyZW1lbnRTdWJ0YXNrSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZWRpdFN1YnRhc2soc3VidGFza09iail7XHJcbiAgICAgICAgc3VidGFza3MuZm9yRWFjaCgoc3VidGFzaywgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZihzdWJ0YXNrLmluZGV4ID09PSBpbmRleCl7XHJcbiAgICAgICAgICAgICAgICBzdWJ0YXNrc1tpXSA9IHN1YnRhc2tPYmo7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7Z2V0TmFtZSwgZ2V0RGVzY3JpcHRpb24sIGdldER1ZURhdGUsIGdldEVzdGltYXRlZFRpbWUsIGdldEluZGV4LCBnZXRQcmlvcml0eSwgZ2V0U3VidGFza3MsXHJcbiAgICAgICAgICAgIHNldEluZGV4fTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrOyIsIi8vY29udGFpbnMgYWxsIERPTSBNYW5pcHVsYXRpb24gdGhhdCdzIG5lZWRlZCBmb3IgdGFza3NcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlLmpzJztcclxuaW1wb3J0IHRhc2sgZnJvbSAnLi90YXNrLmpzJztcclxuaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0LmpzJztcclxuXHJcbmltcG9ydCBEYXRlUGlja2VyIGZyb20gXCJyZWFjdC1kYXRlcGlja2VyXCI7XHJcblxyXG4vL2VhY2ggZG9tIGVsZW1lbnQgaGFzIGEgZGF0YSBpbmRleCB0aGF0J3MgYWxzbyBpbiB0aGUgc3RvcmFnZVxyXG4vL3RoZXNlICdkYXRhLWluZGV4JyBhdHRyaWJ1dGVzIGFyZSB1c2VkIHRvIHJlZmVyZW5jZSB0aGUgc3RvcmFnZSBhcnJheXNcclxuXHJcbmNvbnN0IHVpID0gKCgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGluaXRpYWxSZW5kZXIoKXtcclxuICAgICAgICBjb25zdCBib2R5RWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuLyogICAgICAgICBhZGRNb3RpdmF0aW9uYWxNZXNzYWdlKCkucmVuZGVyRGVmYXVsdE1lc3NhZ2VzKCk7ICovXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gY29udGFpbmVyRE9NKCkuZ2V0RE9NKCk7XHJcbiAgICAgICAgY29uc3QgaW5ib3hQcm9qZWN0ID0gc3RvcmFnZS5hbGxQcm9qZWN0cy5maWx0ZXIocHJvamVjdCA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gJ0luYm94JylbMF07XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gcHJvamVjdEhlYWRlckRPTShpbmJveFByb2plY3QpLmdldERPTSgpO1xyXG4gICAgICAgIGNvbnN0IGFkZFRhc2tEaXYgPSBhZGRUYXNrRGl2RE9NKCkuZ2V0RE9NKCk7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGFkZFRhc2tEaXYpO1xyXG4gICAgICAgIGJvZHlFbGVtLmFwcGVuZENoaWxkKGNvbnRhaW5lckRpdik7XHJcbiAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgICAgICBpZihwcm9qZWN0LmdldE5hbWUoKSA9PT0gJ0luYm94Jyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrcyA9IHByb2plY3QuZ2V0VGFza3MoKVxyXG4gICAgICAgICAgICAgICAgYWRkQWxsVGFza3NET00oY29udGFpbmVyRGl2LCB0YXNrcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlIHRoZSBjb250YWluZXIgdG8gcHV0IGFsbCB0YXNrcywgdGhlIGFkZCB0YXNrIGJ1dHRvbiwgYW5kIHByb2plY3QgaGVhZGVyIGluXHJcbiAgICAvL3VuaXF1ZSBpZCBpcyBjb250YWluZXJcclxuICAgIGNvbnN0IGNvbnRhaW5lckRPTSA9ICgpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBnZXRET00oKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywnY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7Z2V0RE9NfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy90aGUgcHJvamVjdCBoZWFkZXJcclxuICAgIC8vdW5pcXVlIGlkIGlzIHByb2plY3QtaGVhZGVyXHJcbiAgICBjb25zdCBwcm9qZWN0SGVhZGVyRE9NID0gKHByb2plY3QpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjb250YWluZXJEaXYoKXtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywncHJvamVjdC1oZWFkZXInKTtcclxuICAgICAgICAgICAgaGVhZGVyRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcscHJvamVjdC5nZXRJbmRleCgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGhlYWRlckRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBoZWFkaW5nVGV4dCgpIHtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XHJcbiAgICAgICAgICAgIGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGVyLXR5cGUnKTtcclxuICAgICAgICAgICAgaGVhZGluZy5pbm5lclRleHQgPSBwcm9qZWN0LmdldE5hbWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGhlYWRpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RE9NKCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBjb250YWluZXJEaXYoKTtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gaGVhZGluZ1RleHQoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019O1xyXG4gICAgfVxyXG5cclxuICAgIC8vZGl2IHRoYXQgd2hlbiB5b3UgY2xpY2ssIHRoZSBhZGQgdGFzayBmb3JtIGFwcGVhcnNcclxuICAgIC8vdW5pcXVlIGlkIGlzIGFkZC10YXNrLWNsaWNrYWJsZS1kaXZcclxuICAgIGNvbnN0IGFkZFRhc2tEaXZET00gPSAoKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gY29udGFpbmVyKCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAnYWRkLXRhc2stY2xpY2thYmxlLWRpdicpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcGx1c0ljb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEnLCdmYS1wbHVzJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBpY29uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkVGFza1RleHQoKXtcclxuICAgICAgICAgICAgY29uc3QgYWRkVGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBhZGRUYXNrRGl2LmlubmVyVGV4dCA9ICdBZGQgVGFzayc7XHJcbiAgICAgICAgICAgIGFkZFRhc2tEaXYuY2xhc3NMaXN0LmFkZCgnYWRkLXRhc2stdGV4dCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gYWRkVGFza0RpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBjb250YWluZXIoKTtcclxuICAgICAgICAgICAgY29uc3QgcGx1c0ljb25FbGVtID0gcGx1c0ljb24oKTtcclxuICAgICAgICAgICAgY29uc3QgYWRkVGFza1RleHRFbGVtID0gYWRkVGFza1RleHQoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHBsdXNJY29uRWxlbSk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChhZGRUYXNrVGV4dEVsZW0pO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkVGFza0Zvcm0gPSBhZGRUYXNrRm9ybURPTSgpLmdldERPTSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZFRhc2tGb3JtKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckRpdi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSwge29uY2U6IHRydWV9KVxyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019O1xyXG4gICAgfVxyXG5cclxuICAgIC8vY3JlYXRlIHRoZSBmb3JtIHRoYXQgYWRkcyB0YXNrc1xyXG4gICAgLy91bmlxdWUgaWQgaXMgYWRkLXRhc2stZm9ybS1jb250YWluZXJcclxuICAgIGNvbnN0IGFkZFRhc2tGb3JtRE9NID0gKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldERPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBnZXRDb250YWluZXIoKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybSA9IGdldEZvcm0oKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybUFjdGlvbnMgPSBnZXRGb3JtQWN0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybUFjdGlvbnMpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXRDb250YWluZXIoKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywnYWRkLXRhc2stZm9ybS1jb250YWluZXInKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEZvcm0oKXtcclxuICAgICAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuICAgICAgICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywnYWRkLXRhc2stZm9ybScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gY3JlYXRlSW5wdXQoJ3RleHQnLCAnbmFtZScsICdOYW1lJywgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBjcmVhdGVJbnB1dCgndGV4dCcsICdkZXNjcmlwdGlvbicsICdEZXNjcmlwdGlvbicsIGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwb3BvdmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHBvcG92ZXJEaXYuY2xhc3NMaXN0LmFkZCgncG9wb3Zlci1pY29ucy1kaXYnKTtcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlEaXYgPSBnZXRQb3BvdmVySWNvbnMoJ3ByaW9yaXR5LWJ0bicsICdmYS1mbGFnJywgJ1ByaW9yaXR5Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGVEaXYgPSBnZXRQb3BvdmVySWNvbnMoJ2R1ZS1kYXRlLWJ0bicsICdmYS1jYWxlbmRhcicsJ0R1ZSBEYXRlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVzdGltYXRlZFRpbWVEaXYgPSBnZXRQb3BvdmVySWNvbnMoJ2VzdC1jb21wbGV0aW9uLXRpbWUtYnRuJywgJ2ZhLWNsb2NrJywgJ0VzdCBUaW1lJyk7XHJcbiAgICAgICAgICAgIHBvcG92ZXJEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlEaXYpO1xyXG4gICAgICAgICAgICBwb3BvdmVyRGl2LmFwcGVuZENoaWxkKGR1ZURhdGVEaXYpO1xyXG4gICAgICAgICAgICBwb3BvdmVyRGl2LmFwcGVuZENoaWxkKGVzdGltYXRlZFRpbWVEaXYpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFBvcG92ZXJJY29ucyhkaXZJZCwgaWNvbkNsYXNzLCB0ZXh0KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLGRpdklkKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgJyArIHRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1yZWd1bGFyJyxpY29uQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGljb24pO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGljb25UZXh0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbklucHV0KTtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChwb3BvdmVyRGl2KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRGb3JtQWN0aW9ucygpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCdmb3JtLWFjdGlvbnMtZGl2Jyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCdjYW5jZWwtYWRkLXRhc2stZm9ybScpO1xyXG4gICAgICAgICAgICBjYW5jZWxCdG4uaW5uZXJUZXh0ID0gJ0NhbmNlbCc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgc3VibWl0QnRuLnNldEF0dHJpYnV0ZSgnaWQnLCdhZGQtdGFzay1zdWJtaXQtYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5pbm5lclRleHQgPSAnQWRkIFRhc2snO1xyXG5cclxuICAgICAgICAgICAgYWRkQ2FuY2VsQnRuRnVuY3Rpb25hbGl0eShjYW5jZWxCdG4pO1xyXG4gICAgICAgICAgICBhZGRTdWJtaXRCdG5GdW5jdGlvbmFsaXR5KHN1Ym1pdEJ0bik7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHN1Ym1pdEJ0bik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZW1vdmVzIHRoZSBmb3JtIGFuZCBhZGRzIHRoZSBhZGQgdGFzayB0ZXh0IGJhY2tcclxuICAgICAgICBmdW5jdGlvbiBhZGRDYW5jZWxCdG5GdW5jdGlvbmFsaXR5KGNhbmNlbEJ0bil7XHJcbiAgICAgICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRUYXNrRWxlbSA9IGFkZFRhc2tEaXZET00oKS5nZXRET00oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stZm9ybS1jb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgIGZvcm1Db250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkVGFza0VsZW0pO1xyXG4gICAgICAgICAgICB9LCB7b25jZTp0cnVlfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JlbW92ZXMgdGhlIGZvcm0gYW5kIGFkZHMgdGhlIHRhc2sgZG9tXHJcbiAgICAgICAgLy9uZWVkIHRvIGFkZCBlcnJvciBtZXNzYWdlIG9mIHNvbWUgc29ydCB3aGVuIHRoZXJlJ3Mgbm8gdGV4dCBpbiB0aGUgbmFtZSBmaWVsZFxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFN1Ym1pdEJ0bkZ1bmN0aW9uYWxpdHkoc3VibWl0QnRuKXtcclxuICAgICAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZihuYW1lRmllbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9qZWN0SW5kZXhJbkFycmF5ID0gZ2V0UHJvamVjdEluZGV4SW5BcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdUYXNrID0gdGFzayhuYW1lRmllbGQsIGRlc2NyaXB0aW9uRmllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyB1cGRhdGVzIHRoZSB0YXNrIHdpdGggdGhlIGN1cnJlbnQgaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICBuZXdUYXNrID0gc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0SW5kZXhJbkFycmF5XS5hZGRUYXNrKG5ld1Rhc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdUYXNrRE9NID0gdGFza0RPTShuZXdUYXNrKS5nZXRET00oKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkVGFza0VsZW0gPSBhZGRUYXNrRGl2RE9NKCkuZ2V0RE9NKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1mb3JtLWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1Db250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5ld1Rhc2tET00pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRUYXNrRWxlbSk7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9KSAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmV0dXJucyBpbmRleCBvZiBwcm9qZWN0IGluIGFsbCBwcm9qZWN0cyBhcnJheVxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFByb2plY3RJbmRleEluQXJyYXkoKXtcclxuICAgICAgICAgICAgbGV0IHByb2plY3RJbmRleEluQXJyYXkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcHJvamVjdERhdGFJbmRleCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWhlYWRlcicpLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xyXG4gICAgICAgICAgICBzdG9yYWdlLmFsbFByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihwcm9qZWN0LmdldEluZGV4KCkgPT0gcHJvamVjdERhdGFJbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdEluZGV4SW5BcnJheSA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIHByb2plY3RJbmRleEluQXJyYXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVJbnB1dCh0eXBlLCBpZCwgcGxhY2Vob2xkZXIsIGlzUmVxdWlyZWQsIGlzQXV0b0ZvY3VzKXtcclxuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKTtcclxuICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsIGlkKTtcclxuICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIHBsYWNlaG9sZGVyKTtcclxuICAgICAgICAgICAgaWYoaXNSZXF1aXJlZCA/IGlucHV0LnJlcXVpcmVkID0gdHJ1ZSA6IGlucHV0LnJlcXVpcmVkID0gZmFsc2UpO1xyXG4gICAgICAgICAgICBpZihpc0F1dG9Gb2N1cyA/IGlucHV0LmF1dG9mb2N1cyA9IHRydWUgOiBpbnB1dC5hdXRvZm9jdXMgPSBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7Z2V0RE9NfTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NyZWF0ZXMgRE9NIG9mIG9uZSB0YXNrXHJcbiAgICBjb25zdCB0YXNrRE9NID0gKHRhc2tPYmopID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDb250YWluZXJEaXYodGFza09iail7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XHJcbiAgICAgICAgICAgIHRhc2tEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgdGFza09iai5nZXRJbmRleCgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRhc2tEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlVGFza0J0bkRpdigpe1xyXG4gICAgICAgICAgICBjb25zdCBjb21wbGV0ZVRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29tcGxldGVUYXNrRGl2LmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlLXRhc2stYnRuJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgY29tcGxldGVUYXNrSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgY29tcGxldGVUYXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1yZWd1bGFyJywnZmEtY2lyY2xlJyk7XHJcbiAgICAgICAgICAgIGFkZENvbXBsZXRlVGFza0ljb25GdW5jdGlvbmFsaXR5KGNvbXBsZXRlVGFza0ljb24pO1xyXG5cclxuICAgICAgICAgICAgY29tcGxldGVUYXNrRGl2LmFwcGVuZENoaWxkKGNvbXBsZXRlVGFza0ljb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcGxldGVUYXNrRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENvbXBsZXRlVGFza0ljb25GdW5jdGlvbmFsaXR5KGNvbXBsZXRlVGFza0ljb24pe1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdEluZGV4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaGVhZGVyJykuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFRhc2tJbmRleCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb2plY3RJbmRleEluQXJyYXkgPSAnJztcclxuICAgICAgICAgICAgICAgIGxldCB0YXNrSW5kZXhJbkFycmF5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vaXRlcmF0ZSBjdXJyIGVsZW1lbnQgdW50aWwgaXQgZ2V0cyB0byB0YXNrIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyckVsZW0gPSBjb21wbGV0ZVRhc2tJY29uO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUoIWN1cnJFbGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrJykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJFbGVtID0gY3VyckVsZW0ucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN1cnJFbGVtID0gY3VyckVsZW0ucGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFza0luZGV4ID0gY3VyckVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgcHJvamVjdEluZGV4SW5BcnJheSA9IHN0b3JhZ2UuYWxsUHJvamVjdHMuZmluZEluZGV4KHByb2plY3QgPT4gcHJvamVjdC5nZXRJbmRleCgpID09IGN1cnJlbnRQcm9qZWN0SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGFza0luZGV4SW5BcnJheSA9IHN0b3JhZ2UuYWxsUHJvamVjdHNbcHJvamVjdEluZGV4SW5BcnJheV0uZ2V0VGFza3MoKS5maW5kSW5kZXgodGFzayA9PiB0YXNrLmdldEluZGV4KCkgPT0gY3VycmVudFRhc2tJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tJbmRleEluQXJyYXkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0b3JhZ2UuYWxsUHJvamVjdHNbcHJvamVjdEluZGV4SW5BcnJheV0ucmVtb3ZlVGFzayh0YXNrSW5kZXhJbkFycmF5KTtcclxuICAgICAgICAgICAgICAgIGN1cnJFbGVtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVUYXNrVGl0bGVEaXYodGFza09iail7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tUaXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0YXNrVGl0bGVEaXYuY2xhc3NMaXN0LmFkZCgndGFzay10aXRsZScpO1xyXG4gICAgICAgICAgICB0YXNrVGl0bGVEaXYuaW5uZXJUZXh0ID0gdGFza09iai5nZXROYW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXNrVGl0bGVEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlVGFza0Rlc2NyaXB0aW9uRGl2KHRhc2tPYmope1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGFza0Rlc2NyaXB0aW9uRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGVzY3JpcHRpb24nKTtcclxuICAgICAgICAgICAgdGFza0Rlc2NyaXB0aW9uRGl2LmlubmVyVGV4dCA9IHRhc2tPYmouZ2V0RGVzY3JpcHRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRhc2tEZXNjcmlwdGlvbkRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVUYXNrQnV0dG9uc0Rpdigpe1xyXG4gICAgICAgICAgICBjb25zdCBidXR0b25JY29uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBidXR0b25JY29uc0Rpdi5jbGFzc0xpc3QuYWRkKCdidXR0b24taWNvbnMnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBwbHVzSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgcGx1c0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1zcXVhcmUtcGx1cycpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXBlbi10by1zcXVhcmUnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtdHJhc2gnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBidXR0b25JY29uc0Rpdi5hcHBlbmRDaGlsZChwbHVzSWNvbik7XHJcbiAgICAgICAgICAgIGJ1dHRvbkljb25zRGl2LmFwcGVuZENoaWxkKGVkaXRJY29uKTtcclxuICAgICAgICAgICAgYnV0dG9uSWNvbnNEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBidXR0b25JY29uc0RpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVFc3RpbWF0ZWRUaW1lRGl2KHRhc2tPYmope1xyXG4gICAgICAgICAgICBjb25zdCBlc3RpbWF0ZWRUaW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGVzdGltYXRlZFRpbWVEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1lc3RpbWF0ZWQtdGltZScpO1xyXG4gICAgICAgICAgICBlc3RpbWF0ZWRUaW1lRGl2LmlubmVyVGV4dCA9IGBFc3QgVGltZTogJHt0YXNrT2JqLmdldEVzdGltYXRlZFRpbWUoKX1gO1xyXG4gICAgICAgICAgICByZXR1cm4gZXN0aW1hdGVkVGltZURpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXRET00oKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gY3JlYXRlQ29udGFpbmVyRGl2KHRhc2tPYmopO1xyXG4gICAgICAgICAgICBjb25zdCBidXR0b25zRGl2ID0gY3JlYXRlVGFza0J0bkRpdigpO1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZURpdiA9IGNyZWF0ZVRhc2tUaXRsZURpdih0YXNrT2JqKTtcclxuICAgICAgICAgICAgY29uc3QgdGFza0J1dHRvbnMgPSBjcmVhdGVUYXNrQnV0dG9uc0RpdigpO1xyXG4gICAgICAgICAgICBpZih0YXNrT2JqLmdldEVzdGltYXRlZFRpbWUoKSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRXN0aW1hdGVkVGltZSA9IGNyZWF0ZUVzdGltYXRlZFRpbWVEaXYodGFza09iaik7XHJcbiAgICAgICAgICAgICAgICB0aXRsZURpdi5hcHBlbmRDaGlsZCh0YXNrRXN0aW1hdGVkVGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGFza09iai5nZXREZXNjcmlwdGlvbigpKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGNyZWF0ZVRhc2tEZXNjcmlwdGlvbkRpdih0YXNrT2JqKTtcclxuICAgICAgICAgICAgICAgIHRpdGxlRGl2LmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoYnV0dG9uc0Rpdik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZCh0aXRsZURpdik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZCh0YXNrQnV0dG9ucyk7XHJcbiAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZXR1cm4ge2dldERPTX07XHJcbiAgICB9XHJcblxyXG4gICAgLy9jcmVhdGVzIERPTSBvZiBvbmUgc3VidGFza1xyXG4gICAgY29uc3Qgc3VidGFza0RPTSA9IChzdWJ0YXNrT2JqKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU3VidGFza0Rpdigpe1xyXG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHN1YnRhc2tEaXYuY2xhc3NMaXN0LmFkZCgnc3VidGFzaycpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3VidGFza0RpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDb21wbGV0ZVN1YnRhc2tEaXYoKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZS10YXNrLWJ0bicpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGNpcmNsZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGNpcmNsZUljb24uY2xhc3NMaXN0LmFkZCgnZmEtcmVndWxhcicsJ2ZhLWNpcmNsZScpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChjaXJjbGVJY29uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTdWJ0YXNrVGl0bGVEaXYoc3VidGFza09iail7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRpdGxlRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGl0bGUnKTtcclxuICAgICAgICAgICAgdGl0bGVEaXYuaW5uZXJUZXh0ID0gc3VidGFza09iai5nZXROYW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aXRsZURpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTdWJ0YXNrQnV0dG9uSWNvbnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbnNJY29uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGJ1dHRvbnNJY29uRGl2LmNsYXNzTGlzdC5hZGQoJ2J1dHRvbi1pY29ucycpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXBlbi10by1zcXVhcmUnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtdHJhc2gnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBidXR0b25zSWNvbkRpdi5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcbiAgICAgICAgICAgIGJ1dHRvbnNJY29uRGl2LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gYnV0dG9uc0ljb25EaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RE9NKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGNyZWF0ZVN1YnRhc2tEaXYoKTtcclxuICAgICAgICAgICAgY29uc3QgY29tcGxldGVTdWJ0YXNrRGl2ID0gY3JlYXRlQ29tcGxldGVTdWJ0YXNrRGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tUaXRsZURpdiA9IGNyZWF0ZVN1YnRhc2tUaXRsZURpdihzdWJ0YXNrT2JqKTtcclxuICAgICAgICAgICAgY29uc3Qgc3VidGFza0J0bkljb25zID0gY3JlYXRlU3VidGFza0J1dHRvbkljb25zKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGNvbXBsZXRlU3VidGFza0Rpdik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChzdWJ0YXNrVGl0bGVEaXYpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoc3VidGFza0J0bkljb25zKTtcclxuICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHJldHVybiB7Z2V0RE9NfTtcclxuICAgIH1cclxuXHJcbiAgICAvL2FkZHMgYWxsIGRvbSBvZiB0YXNrcyBhbmQgc3VidGFza3MgaW4gYSBwcm9qZWN0XHJcbiAgICBmdW5jdGlvbiBhZGRBbGxUYXNrc0RPTShjb250YWluZXIsIHRhc2tzKXtcclxuICAgICAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0RPTSh0YXNrKS5nZXRET00oKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbFN1YnRhc2tzID0gdGFzay5nZXRTdWJ0YXNrcygpO1xyXG4gICAgICAgICAgICBhbGxTdWJ0YXNrcy5mb3JFYWNoKHN1YnRhc2sgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHN1YnRhc2tET00oc3VidGFzaykuZ2V0RE9NKCkpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xlYXJBbGxUYXNrcyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVycycpO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2luaXRpYWxSZW5kZXIsIGNsZWFyQWxsVGFza3N9O1xyXG5cclxufSkoKVxyXG5cclxuY29uc3QgcmVuZGVyVGFza3MgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhZGRNb3RpdmF0aW9uYWxNZXNzYWdlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkgPSBbXTtcclxuICAgICAgICBjb25zdCBET00gPSBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NKCk7XHJcbiAgICAgICAgY29uc3QgYnRuRnVuY3Rpb25hbGl0eSA9IG1vdGl2YXRpb25hbE1lc3NhZ2VET01GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgLy9vYmplY3QgZGVjbGFyYXRpb24gZm9yIG1vdGl2YXRpb25hbCBtZXNzYWdlc1xyXG4gICAgICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbE1lc3NhZ2UoaGVhZGVyLCBtZXNzYWdlLCBhdXRob3IgPSAnJyl7XHJcbiAgICAgICAgICAgIHJldHVybiB7aGVhZGVyLCBtZXNzYWdlLCBhdXRob3J9O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8vcHJlc2V0IG1ldGhvZHMgZm9yIG1vdGl2YXRpb25hbCBtZXNzYWdlXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkRGVmYXVsdE1vdGl2YXRpb25hbE1lc3NhZ2VzKCkge1xyXG4gICAgICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlMSA9IG1vdGl2YXRpb25hbE1lc3NhZ2UoJ01vdGl2YXRpb25hbCBNZXNzYWdlJywnWWVzdGVyZGF5IHlvdSBzYWlkIHRvbW9ycm93LCBzbyBqdXN0IGRvIGl0LiBEb25cXCd0IGxldCB5b3VyIGRyZWFtcyBiZSBkcmVhbXMuJywnU2hpYSBMYUJlb3VmJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2UyID0gIG1vdGl2YXRpb25hbE1lc3NhZ2UoJ01vdGl2YXRpb25hbCBNZXNzYWdlJyxcIlRoZSBtb3N0IGltcG9ydGFudCBpbnZlc3RtZW50IHlvdSBjYW4gbWFrZSBpcyBpbiB5b3Vyc2VsZi5cIiwnV2FycmVuIEJ1ZmZldHQnKTtcclxuICAgICAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZTMgPSBtb3RpdmF0aW9uYWxNZXNzYWdlKCdQZXJzb25hbCBNZXNzYWdlJywnWW91IGNhbiBwbGF5IFBva2Vtb24gaWYgeW91IGZpbmlzaCBjb2RpbmcgdGhpcyB0by1kbyBsaXN0LicsJ0JydWNlJyk7XHJcbiAgICAgICAgICAgIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkucHVzaChtb3RpdmF0aW9uYWxNZXNzYWdlMyk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY2hvb3NlT25lTW90aXZhdGlvbmFsTWVzc2FnZSgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheS5sZW5ndGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheVtyYW5kb21dO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGRlbGV0ZU1lc3NhZ2UoaW5kZXgpIHtcclxuICAgICAgICAgICAgbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHJlbmRlckRlZmF1bHRNZXNzYWdlcygpIHtcclxuICAgICAgICAgICAgYWRkRGVmYXVsdE1vdGl2YXRpb25hbE1lc3NhZ2VzKCk7XHJcbiAgICAgICAgICAgIERPTS5jcmVhdGVNb3RpdmF0aW9uYWxNZXNzYWdlKGNob29zZU9uZU1vdGl2YXRpb25hbE1lc3NhZ2UoKSk7XHJcbiAgICAgICAgICAgIGJ0bkZ1bmN0aW9uYWxpdHkuYWRkQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHJldHVybiB7cmVuZGVyRGVmYXVsdE1lc3NhZ2VzLCBkZWxldGVNZXNzYWdlfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge3JlbmRlckRlZmF1bHQsIGNsZWFyQWxsVGFza3N9O1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVpO1xyXG5cclxuXHJcbi8qIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2VET00gPSAoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVNb3RpdmF0aW9uYWxNZXNzYWdlKG1vdGl2YXRpb25hbE1lc3NhZ2VPYmope1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICAgICAgY29uc3QgcGFyZW50RGl2ID0gbW90aXZhdGlvbmFsTWVzc2FnZUNvbnRhaW5lcigpO1xyXG4gICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChtb3RpdmF0aW9uYWxNZXNzYWdlSGVhZGVyKG1vdGl2YXRpb25hbE1lc3NhZ2VPYmouaGVhZGVyKSk7XHJcbiAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKG1vdGl2YXRpb25hbE1lc3NhZ2UobW90aXZhdGlvbmFsTWVzc2FnZU9iai5tZXNzYWdlKSk7XHJcbiAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKG1vdGl2YXRpb25hbEF1dGhvcihtb3RpdmF0aW9uYWxNZXNzYWdlT2JqLmF1dGhvcikpO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQocGFyZW50RGl2KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZUNvbnRhaW5lcigpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250ZW50LW1hcmdpbicpO1xyXG4gICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywnbW90aXZhdGlvbmFsLW1lc3NhZ2UnKTtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbE1lc3NhZ2VIZWFkZXIoaGVhZGVyVGV4dCkge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGhlYWRlckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywnbW90aXZhdGlvbmFsLW1lc3NhZ2UtaGVhZGVyJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGludmlzaWJsZUJ1dHRvbnNEaXYgPSBidXR0b25zRGl2KGZhbHNlKTtcclxuICAgICAgICBpbnZpc2libGVCdXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZS1lbGVtZW50cycpO1xyXG5cclxuICAgICAgICBjb25zdCB2aXNpYmxlQnV0dG9uc0RpdiA9IGJ1dHRvbnNEaXYodHJ1ZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbW90aXZhdGlvbmFsTWVzc2FnZS5pbm5lclRleHQgPSBoZWFkZXJUZXh0O1xyXG5cclxuICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQoaW52aXNpYmxlQnV0dG9uc0Rpdik7XHJcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKG1vdGl2YXRpb25hbE1lc3NhZ2UpO1xyXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZCh2aXNpYmxlQnV0dG9uc0Rpdik7XHJcblxyXG4gICAgICAgIHJldHVybiBoZWFkZXJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYnV0dG9uc0Rpdihpc1Zpc2libGUpIHtcclxuICAgICAgICBjb25zdCBidXR0b25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBjb25zdCBzZXR0aW5nc0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgc2V0dGluZ3NJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XHJcbiAgICAgICAgc2V0dGluZ3NJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLWdlYXInKTtcclxuICAgICAgICBzZXR0aW5nc0J0bi5hcHBlbmRDaGlsZChzZXR0aW5nc0ljb24pO1xyXG5cclxuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IGNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBjbG9zZUljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnKTtcclxuICAgICAgICBjbG9zZUljb24uY2xhc3NMaXN0LmFkZCgnZmEteCcpO1xyXG4gICAgICAgIGNsb3NlQnRuLmFwcGVuZENoaWxkKGNsb3NlSWNvbik7XHJcblxyXG4gICAgICAgIGJ1dHRvbnNEaXYuYXBwZW5kQ2hpbGQoc2V0dGluZ3NCdG4pO1xyXG4gICAgICAgIGJ1dHRvbnNEaXYuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xyXG5cclxuICAgICAgICBpZihpc1Zpc2libGUpe1xyXG4gICAgICAgICAgICBzZXR0aW5nc0J0bi5zZXRBdHRyaWJ1dGUoJ2lkJywnbW90aXZhdGlvbmFsLW1lc3NhZ2Utc2V0dGluZ3MtYnRuJyk7XHJcbiAgICAgICAgICAgIGNsb3NlQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnbW90aXZhdGlvbmFsLW1lc3NhZ2UtY2xvc2UtYnRuJyk7ICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlLWVsZW1lbnRzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYnV0dG9uc0RpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIG1lc3NhZ2VQYXJhZ3JhcGguaW5uZXJUZXh0ID0gbWVzc2FnZTtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZVBhcmFncmFwaDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxBdXRob3IoYXV0aG9yKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZUF1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBtZXNzYWdlQXV0aG9yLmlubmVyVGV4dCA9IGF1dGhvcjtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZUF1dGhvcjsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7Y3JlYXRlTW90aXZhdGlvbmFsTWVzc2FnZX07XHJcbn1cclxuXHJcbmNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2VET01GdW5jdGlvbmFsaXR5ID0gKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gYWRkU2V0dGluZ0J0bkZ1bmN0aW9uYWxpdHkoKXtcclxuICAgICAgICBjb25zdCBzZXR0aW5nQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdGl2YXRpb25hbC1tZXNzYWdlLXNldHRpbmdzLWJ0bicpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVNb2RhbEZvcm0oKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ2xvc2VCdG5GdW5jdGlvbmFsaXR5KCkge1xyXG4gICAgICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdGl2YXRpb25hbC1tZXNzYWdlLWNsb3NlLWJ0bicpO1xyXG4gICAgICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2VEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW90aXZhdGlvbmFsLW1lc3NhZ2UnKTtcclxuICAgICAgICAgICAgbW90aXZhdGlvbmFsTWVzc2FnZURpdi5yZW1vdmUoKTtcclxuICAgICAgICB9KSAgXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQnRuRnVuY3Rpb25hbGl0eSgpIHtcclxuICAgICAgICBhZGRDbG9zZUJ0bkZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICBhZGRTZXR0aW5nQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7YWRkQnRuRnVuY3Rpb25hbGl0eX07XHJcbn1cclxuICovXHJcbi8qIFxyXG4gICAgLy9uZWVkIHRvIGNsZWFuIHRoaXMgdXBcclxuICAgIC8vYWRkIGFsbCB0YXNrcyBhbmQgdGFza3Mgd2l0aCBzZWN0aW9uc1xyXG4gICAgZnVuY3Rpb24gYWRkU2VjdGlvbnNUYXNrc0RPTShwYXJlbnREaXYsIGFsbFNlY3Rpb25zQXJyYXkpe1xyXG4gICAgICAgIGFsbFNlY3Rpb25zQXJyYXkuZm9yRWFjaChzZWN0aW9uID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkRPTSA9IGNyZWF0ZVNlY3Rpb25ET00oc2VjdGlvbikuZ2V0U2VjdGlvbkRPTSgpO1xyXG4gICAgICAgICAgICBzZWN0aW9uLnRhc2tzLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRE9NID0gY3JlYXRlVGFza0RPTSh0YXNrKS5nZXRUYXNrRE9NKCk7XHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uRE9NLmFwcGVuZENoaWxkKHRhc2tET00pO1xyXG4gICAgICAgICAgICAgICAgdGFzay5zdWJ0YXNrcy5mb3JFYWNoKHN1YnRhc2sgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tET00gPSBjcmVhdGVTdWJ0YXNrRE9NKHN1YnRhc2spLmdldFN1YnRhc2tET00oKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQoc3VidGFza0RPTSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQoc2VjdGlvbkRPTSk7ICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAqL1xyXG4vKiBcclxuICAgIGNvbnN0IGNyZWF0ZVNlY3Rpb25ET00gPSAoc2VjdGlvbk9iaikgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVNlY3Rpb25EaXYoKXtcclxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBzZWN0aW9uRGl2LmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24nKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25EaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU2VjdGlvbkhlYWRlcihzZWN0aW9uT2JqKXtcclxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBzZWN0aW9uSGVhZGVyRGl2LmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24taGVhZGVyJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbi10aXRsZScpO1xyXG4gICAgICAgICAgICBzZWN0aW9uVGl0bGUuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbi10aXRsZScpO1xyXG4gICAgICAgICAgICBzZWN0aW9uVGl0bGUuaW5uZXJUZXh0ID0gc2VjdGlvbk9iai5uYW1lO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25Ecm9wZG93bkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBzZWN0aW9uRHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbi1kcm9wZG93bicpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd25JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBkcm9wZG93bkljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29sZCcsJ2ZhLWNhcmV0LWRvd24nKTtcclxuICAgICAgICAgICAgc2VjdGlvbkRyb3Bkb3duQ29udGFpbmVyLmFwcGVuZENoaWxkKGRyb3Bkb3duSWNvbik7XHJcbiAgICAgICAgICAgIHNlY3Rpb25IZWFkZXJEaXYuYXBwZW5kQ2hpbGQoc2VjdGlvblRpdGxlKTtcclxuICAgICAgICAgICAgc2VjdGlvbkhlYWRlckRpdi5hcHBlbmRDaGlsZChzZWN0aW9uRHJvcGRvd25Db250YWluZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VjdGlvbkhlYWRlckRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXRTZWN0aW9uRE9NKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25EaXYgPSBjcmVhdGVTZWN0aW9uRGl2KCk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25EaXYuYXBwZW5kQ2hpbGQoY3JlYXRlU2VjdGlvbkhlYWRlcihzZWN0aW9uT2JqKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWN0aW9uRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHJldHVybiB7Z2V0U2VjdGlvbkRPTX07XHJcbiAgICB9ICovIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL3JlbmRlciBpbmJveFxyXG5pbXBvcnQgVUkgZnJvbSAnLi91aS5qcyc7XHJcbmltcG9ydCBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZS5qcyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gICAgcmVuZGVyRGVmYXVsdFByb2plY3RzKCk7XHJcbiAgICBVSS5pbml0aWFsUmVuZGVyKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyRGVmYXVsdFByb2plY3RzKCl7XHJcbiAgICAgICAgbGV0IGluYm94ID0gcHJvamVjdCgnSW5ib3gnKTtcclxuICAgICAgICBsZXQgdG9kYXkgPSBwcm9qZWN0KCdUb2RheScpO1xyXG4gICAgICAgIGxldCB0aGlzd2VlayA9IHByb2plY3QoJ1RoaXMgV2VlaycpO1xyXG4gICAgICAgIHN0b3JhZ2UuYWRkUHJvamVjdChpbmJveCk7XHJcbiAgICAgICAgc3RvcmFnZS5hZGRQcm9qZWN0KHRvZGF5KTtcclxuICAgICAgICBzdG9yYWdlLmFkZFByb2plY3QodGhpc3dlZWspO1xyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=