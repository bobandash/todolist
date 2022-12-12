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

    const addSubtaskFormDOM = () => {
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
            container.setAttribute('id','add-subtask-form-container');
            return container;
        }

        function getForm(){
            const form = document.createElement('form');
            form.setAttribute('id','add-subtask-form');

            const nameInput = createInput('text', 'name', 'Name', true, true);
            const descriptionInput = createInput('text', 'description', 'Description', false, false);
            form.appendChild(nameInput);
            form.appendChild(descriptionInput);
            return form;
        }

        function getFormActions(){
            const containerDiv = document.createElement('div');
            containerDiv.setAttribute('id','form-actions-div');

            const cancelBtn = document.createElement('button');
            cancelBtn.setAttribute('id','cancel-add-subtask-form');
            cancelBtn.innerText = 'Cancel';

            const submitBtn = document.createElement('button');
            submitBtn.setAttribute('id','add-subtask-submit-button');
            submitBtn.innerText = 'Add Subtask';

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

            addSubtaskIconFunctionality(plusIcon);
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

        function addSubtaskIconFunctionality(plusIcon){
            plusIcon.addEventListener('click', function(){
                const container = document.getElementById('container');
                const addTaskDiv = document.getElementById('add-task-clickable-div');
                const subtaskForm = addSubtaskFormDOM().getDOM();
                addTaskDiv.remove();
                container.appendChild(subtaskForm);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLE1BQU07Ozs7OztVQzd2Qk47VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDeUI7QUFDVTtBQUNBO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLElBQUksNERBQWdCO0FBQ3BCO0FBQ0E7QUFDQSxvQkFBb0IsdURBQU87QUFDM0Isb0JBQW9CLHVEQUFPO0FBQzNCLHVCQUF1Qix1REFBTztBQUM5QixRQUFRLDhEQUFrQjtBQUMxQixRQUFRLDhEQUFrQjtBQUMxQixRQUFRLDhEQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2hlbHBlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3VpLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGluZGV4Q291bnRlciA9ICgpID0+IHtcclxuICAgIGxldCBjdXJySW5kZXggPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KCl7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRJbmRleCgpIHtcclxuICAgICAgICBjdXJySW5kZXggPSBjdXJySW5kZXggKyAxO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtnZXRJbmRleCwgaW5jcmVtZW50SW5kZXh9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbmRleENvdW50ZXI7IiwiaW1wb3J0IGluZGV4Q291bnRlciBmcm9tICcuL2hlbHBlci5qcyc7XHJcblxyXG5jb25zdCBwcm9qZWN0ID0gKG5hbWUsIHRhc2tzID0gW10sIGluZGV4KSA9PiB7XHJcbiAgICBsZXQgY3VyclRhc2tJbmRleCA9IGluZGV4Q291bnRlcigpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBnZXROYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFRhc2tzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRhc2tzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldE5hbWUobmV3TmFtZSl7XHJcbiAgICAgICAgbmFtZSA9IG5ld05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0SW5kZXgobmV3SW5kZXgpe1xyXG4gICAgICAgIGluZGV4ID0gbmV3SW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLy9uZWVkIHRvIHNldCBhIHVuaXF1ZSBpbmRleCBmb3IgdGFzayBhZnRlciBpdCdzIGNyZWF0ZWRcclxuICAgIGZ1bmN0aW9uIGFkZFRhc2sodGFzayl7XHJcbiAgICAgICAgdGFzay5zZXRJbmRleChjdXJyVGFza0luZGV4LmdldEluZGV4KCkpO1xyXG4gICAgICAgIHRhc2tzLnB1c2godGFzayk7XHJcbiAgICAgICAgY3VyclRhc2tJbmRleC5pbmNyZW1lbnRJbmRleCgpO1xyXG4gICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZVRhc2sodGFza0luZGV4KXtcclxuICAgICAgICB0YXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0YXNrLmdldEluZGV4KCkgPT09IHRhc2tJbmRleCl7XHJcbiAgICAgICAgICAgICAgICB0YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2dldE5hbWUsIGdldEluZGV4LCBnZXRUYXNrcywgc2V0TmFtZSwgc2V0SW5kZXgsIGFkZFRhc2ssIHJlbW92ZVRhc2t9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb2plY3Q7IiwiaW1wb3J0IGluZGV4Q291bnRlciBmcm9tICcuL2hlbHBlci5qcyc7XHJcbi8vcHJvamVjdHMgY29udGFpbiB0YXNrcywgdGFza3MgY29udGFpbiBzdWJ0YXNrc1xyXG4vL2ZvciBub3csIHdlJ2xsIGZvbGxvdyB0aGF0IGhpZXJhY2h5XHJcblxyXG5jb25zdCBzdG9yYWdlID0gKCgpID0+IHtcclxuICAgIC8vdGhlIGRlZmF1bHQgcHJvamVjdHMgdGhhdCBjYW4ndCBiZSByZW1vdmVkXHJcbiAgICBjb25zdCBhbGxQcm9qZWN0cyA9IFtdO1xyXG4gICAgbGV0IGN1cnJQcm9qZWN0SW5kZXggPSBpbmRleENvdW50ZXIoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3Qpe1xyXG4gICAgICAgIHByb2plY3Quc2V0SW5kZXgoY3VyclByb2plY3RJbmRleC5nZXRJbmRleCgpKTtcclxuICAgICAgICBjdXJyUHJvamVjdEluZGV4LmluY3JlbWVudEluZGV4KCk7XHJcbiAgICAgICAgYWxsUHJvamVjdHMucHVzaChwcm9qZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qZWN0KHByb2plY3RJbmRleCl7XHJcbiAgICAgICAgYWxsUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYocHJvamVjdC5nZXRJbmRleCgpID09PSBwcm9qZWN0SW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgYWxsUHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHthbGxQcm9qZWN0cywgYWRkUHJvamVjdCwgcmVtb3ZlUHJvamVjdH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yYWdlO1xyXG5cclxuIiwiaW1wb3J0IGluZGV4Q291bnRlciBmcm9tICcuL2hlbHBlci5qcyc7XHJcblxyXG5jb25zdCB0YXNrID0gKFxyXG4gICAgbmFtZSxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgZHVlRGF0ZSxcclxuICAgIGVzdGltYXRlZENvbXBsZXRpb25UaW1lLFxyXG4gICAgcHJpb3JpdHksXHJcbiAgICBzdWJ0YXNrcyA9IFtdLFxyXG4gICAgaW5kZXgpID0+XHJcbntcclxuXHJcbiAgICBsZXQgY3VyclN1YnRhc2tJbmRleCA9IGluZGV4Q291bnRlcigpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBnZXROYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oKXtcclxuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RHVlRGF0ZSgpe1xyXG4gICAgICAgIHJldHVybiBkdWVEYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEVzdGltYXRlZFRpbWUoKXtcclxuICAgICAgICByZXR1cm4gZXN0aW1hdGVkQ29tcGxldGlvblRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoKXtcclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UHJpb3JpdHkoKXtcclxuICAgICAgICByZXR1cm4gcHJpb3JpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0SW5kZXgodGFza0luZGV4KXtcclxuICAgICAgICBpbmRleCA9IHRhc2tJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTdWJ0YXNrcygpe1xyXG4gICAgICAgIHJldHVybiBzdWJ0YXNrcztcclxuICAgIH1cclxuXHJcbiAgICAvL25lZWQgdG8gc2V0IGEgdW5pcXVlIGluZGV4IGZvciBzdWJ0YXNrIGFmdGVyIGl0J3MgY3JlYXRlZFxyXG4gICAgZnVuY3Rpb24gYWRkU3VidGFzayhzdWJ0YXNrT2JqKXtcclxuICAgICAgICBzdWJ0YXNrT2JqLnNldEluZGV4KGN1cnJTdWJ0YXNrSW5kZXgpO1xyXG4gICAgICAgIHN1YnRhc2tzLnB1c2goc3VidGFza09iaik7XHJcbiAgICAgICAgaW5jcmVtZW50U3VidGFza0luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVkaXRTdWJ0YXNrKHN1YnRhc2tPYmope1xyXG4gICAgICAgIHN1YnRhc2tzLmZvckVhY2goKHN1YnRhc2ssIGkpID0+IHtcclxuICAgICAgICAgICAgaWYoc3VidGFzay5pbmRleCA9PT0gaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgc3VidGFza3NbaV0gPSBzdWJ0YXNrT2JqO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2dldE5hbWUsIGdldERlc2NyaXB0aW9uLCBnZXREdWVEYXRlLCBnZXRFc3RpbWF0ZWRUaW1lLCBnZXRJbmRleCwgZ2V0UHJpb3JpdHksIGdldFN1YnRhc2tzLFxyXG4gICAgICAgICAgICBzZXRJbmRleH07XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFzazsiLCIvL2NvbnRhaW5zIGFsbCBET00gTWFuaXB1bGF0aW9uIHRoYXQncyBuZWVkZWQgZm9yIHRhc2tzXHJcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZS5qcyc7XHJcbmltcG9ydCB0YXNrIGZyb20gJy4vdGFzay5qcyc7XHJcbmltcG9ydCBwcm9qZWN0IGZyb20gJy4vcHJvamVjdC5qcyc7XHJcblxyXG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tIFwicmVhY3QtZGF0ZXBpY2tlclwiO1xyXG5cclxuLy9lYWNoIGRvbSBlbGVtZW50IGhhcyBhIGRhdGEgaW5kZXggdGhhdCdzIGFsc28gaW4gdGhlIHN0b3JhZ2VcclxuLy90aGVzZSAnZGF0YS1pbmRleCcgYXR0cmlidXRlcyBhcmUgdXNlZCB0byByZWZlcmVuY2UgdGhlIHN0b3JhZ2UgYXJyYXlzXHJcblxyXG5jb25zdCB1aSA9ICgoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBpbml0aWFsUmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3QgYm9keUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbi8qICAgICAgICAgYWRkTW90aXZhdGlvbmFsTWVzc2FnZSgpLnJlbmRlckRlZmF1bHRNZXNzYWdlcygpOyAqL1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGNvbnRhaW5lckRPTSgpLmdldERPTSgpO1xyXG4gICAgICAgIGNvbnN0IGluYm94UHJvamVjdCA9IHN0b3JhZ2UuYWxsUHJvamVjdHMuZmlsdGVyKHByb2plY3QgPT4gcHJvamVjdC5nZXROYW1lKCkgPT09ICdJbmJveCcpWzBdO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHByb2plY3RIZWFkZXJET00oaW5ib3hQcm9qZWN0KS5nZXRET00oKTtcclxuICAgICAgICBjb25zdCBhZGRUYXNrRGl2ID0gYWRkVGFza0RpdkRPTSgpLmdldERPTSgpO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChhZGRUYXNrRGl2KTtcclxuICAgICAgICBib2R5RWxlbS5hcHBlbmRDaGlsZChjb250YWluZXJEaXYpO1xyXG4gICAgICAgIHN0b3JhZ2UuYWxsUHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICAgICAgaWYocHJvamVjdC5nZXROYW1lKCkgPT09ICdJbmJveCcpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza3MgPSBwcm9qZWN0LmdldFRhc2tzKClcclxuICAgICAgICAgICAgICAgIGFkZEFsbFRhc2tzRE9NKGNvbnRhaW5lckRpdiwgdGFza3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL2NyZWF0ZSB0aGUgY29udGFpbmVyIHRvIHB1dCBhbGwgdGFza3MsIHRoZSBhZGQgdGFzayBidXR0b24sIGFuZCBwcm9qZWN0IGhlYWRlciBpblxyXG4gICAgLy91bmlxdWUgaWQgaXMgY29udGFpbmVyXHJcbiAgICBjb25zdCBjb250YWluZXJET00gPSAoKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RE9NKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsJ2NvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge2dldERPTX07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vdGhlIHByb2plY3QgaGVhZGVyXHJcbiAgICAvL3VuaXF1ZSBpZCBpcyBwcm9qZWN0LWhlYWRlclxyXG4gICAgY29uc3QgcHJvamVjdEhlYWRlckRPTSA9IChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gY29udGFpbmVyRGl2KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBoZWFkZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsJ3Byb2plY3QtaGVhZGVyJyk7XHJcbiAgICAgICAgICAgIGhlYWRlckRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLHByb2plY3QuZ2V0SW5kZXgoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gaGVhZGluZ1RleHQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG4gICAgICAgICAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci10eXBlJyk7XHJcbiAgICAgICAgICAgIGhlYWRpbmcuaW5uZXJUZXh0ID0gcHJvamVjdC5nZXROYW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBoZWFkaW5nO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERPTSgpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyRGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGhlYWRpbmdUZXh0KCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHJldHVybiB7Z2V0RE9NfTtcclxuICAgIH1cclxuXHJcbiAgICAvL2RpdiB0aGF0IHdoZW4geW91IGNsaWNrLCB0aGUgYWRkIHRhc2sgZm9ybSBhcHBlYXJzXHJcbiAgICAvL3VuaXF1ZSBpZCBpcyBhZGQtdGFzay1jbGlja2FibGUtZGl2XHJcbiAgICBjb25zdCBhZGRUYXNrRGl2RE9NID0gKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNvbnRhaW5lcigpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FkZC10YXNrLWNsaWNrYWJsZS1kaXYnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHBsdXNJY29uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhJywnZmEtcGx1cycpO1xyXG4gICAgICAgICAgICByZXR1cm4gaWNvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFRhc2tUZXh0KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgYWRkVGFza0Rpdi5pbm5lclRleHQgPSAnQWRkIFRhc2snO1xyXG4gICAgICAgICAgICBhZGRUYXNrRGl2LmNsYXNzTGlzdC5hZGQoJ2FkZC10YXNrLXRleHQnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFkZFRhc2tEaXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRET00oKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gY29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsdXNJY29uRWxlbSA9IHBsdXNJY29uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhc2tUZXh0RWxlbSA9IGFkZFRhc2tUZXh0KCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChwbHVzSWNvbkVsZW0pO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoYWRkVGFza1RleHRFbGVtKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZFRhc2tGb3JtID0gYWRkVGFza0Zvcm1ET00oKS5nZXRET00oKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRUYXNrRm9ybSk7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJEaXYucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sIHtvbmNlOiB0cnVlfSlcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7Z2V0RE9NfTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NyZWF0ZSB0aGUgZm9ybSB0aGF0IGFkZHMgdGFza3NcclxuICAgIC8vdW5pcXVlIGlkIGlzIGFkZC10YXNrLWZvcm0tY29udGFpbmVyXHJcbiAgICBjb25zdCBhZGRUYXNrRm9ybURPTSA9ICgpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBnZXRET00oKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBnZXRGb3JtKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1BY3Rpb25zID0gZ2V0Rm9ybUFjdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1BY3Rpb25zKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0Q29udGFpbmVyKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsJ2FkZC10YXNrLWZvcm0tY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRGb3JtKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdpZCcsJ2FkZC10YXNrLWZvcm0nKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGNyZWF0ZUlucHV0KCd0ZXh0JywgJ25hbWUnLCAnTmFtZScsIHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gY3JlYXRlSW5wdXQoJ3RleHQnLCAnZGVzY3JpcHRpb24nLCAnRGVzY3JpcHRpb24nLCBmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcG9wb3ZlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBwb3BvdmVyRGl2LmNsYXNzTGlzdC5hZGQoJ3BvcG92ZXItaWNvbnMtZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5RGl2ID0gZ2V0UG9wb3Zlckljb25zKCdwcmlvcml0eS1idG4nLCAnZmEtZmxhZycsICdQcmlvcml0eScpO1xyXG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlRGl2ID0gZ2V0UG9wb3Zlckljb25zKCdkdWUtZGF0ZS1idG4nLCAnZmEtY2FsZW5kYXInLCdEdWUgRGF0ZScpO1xyXG4gICAgICAgICAgICBjb25zdCBlc3RpbWF0ZWRUaW1lRGl2ID0gZ2V0UG9wb3Zlckljb25zKCdlc3QtY29tcGxldGlvbi10aW1lLWJ0bicsICdmYS1jbG9jaycsICdFc3QgVGltZScpO1xyXG4gICAgICAgICAgICBwb3BvdmVyRGl2LmFwcGVuZENoaWxkKHByaW9yaXR5RGl2KTtcclxuICAgICAgICAgICAgcG9wb3ZlckRpdi5hcHBlbmRDaGlsZChkdWVEYXRlRGl2KTtcclxuICAgICAgICAgICAgcG9wb3ZlckRpdi5hcHBlbmRDaGlsZChlc3RpbWF0ZWRUaW1lRGl2KTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRQb3BvdmVySWNvbnMoZGl2SWQsIGljb25DbGFzcywgdGV4dCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJyxkaXZJZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaWNvblRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnICcgKyB0ZXh0KTtcclxuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnZmEtcmVndWxhcicsaWNvbkNsYXNzKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpY29uKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChpY29uVGV4dCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XHJcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dCk7XHJcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQocG9wb3ZlckRpdik7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0Rm9ybUFjdGlvbnMoKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywnZm9ybS1hY3Rpb25zLWRpdicpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywnY2FuY2VsLWFkZC10YXNrLWZvcm0nKTtcclxuICAgICAgICAgICAgY2FuY2VsQnRuLmlubmVyVGV4dCA9ICdDYW5jZWwnO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywnYWRkLXRhc2stc3VibWl0LWJ1dHRvbicpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdG4uaW5uZXJUZXh0ID0gJ0FkZCBUYXNrJztcclxuXHJcbiAgICAgICAgICAgIGFkZENhbmNlbEJ0bkZ1bmN0aW9uYWxpdHkoY2FuY2VsQnRuKTtcclxuICAgICAgICAgICAgYWRkU3VibWl0QnRuRnVuY3Rpb25hbGl0eShzdWJtaXRCdG4pO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChzdWJtaXRCdG4pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lckRpdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlcyB0aGUgZm9ybSBhbmQgYWRkcyB0aGUgYWRkIHRhc2sgdGV4dCBiYWNrXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkQ2FuY2VsQnRuRnVuY3Rpb25hbGl0eShjYW5jZWxCdG4pe1xyXG4gICAgICAgICAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkVGFza0VsZW0gPSBhZGRUYXNrRGl2RE9NKCkuZ2V0RE9NKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWZvcm0tY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgICAgICBmb3JtQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZFRhc2tFbGVtKTtcclxuICAgICAgICAgICAgfSwge29uY2U6dHJ1ZX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZW1vdmVzIHRoZSBmb3JtIGFuZCBhZGRzIHRoZSB0YXNrIGRvbVxyXG4gICAgICAgIC8vbmVlZCB0byBhZGQgZXJyb3IgbWVzc2FnZSBvZiBzb21lIHNvcnQgd2hlbiB0aGVyZSdzIG5vIHRleHQgaW4gdGhlIG5hbWUgZmllbGRcclxuICAgICAgICBmdW5jdGlvbiBhZGRTdWJtaXRCdG5GdW5jdGlvbmFsaXR5KHN1Ym1pdEJ0bil7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb25GaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYobmFtZUZpZWxkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvamVjdEluZGV4SW5BcnJheSA9IGdldFByb2plY3RJbmRleEluQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGFzayA9IHRhc2sobmFtZUZpZWxkLCBkZXNjcmlwdGlvbkZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMgdXBkYXRlcyB0aGUgdGFzayB3aXRoIHRoZSBjdXJyZW50IGluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VGFzayA9IHN0b3JhZ2UuYWxsUHJvamVjdHNbcHJvamVjdEluZGV4SW5BcnJheV0uYWRkVGFzayhuZXdUYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGFza0RPTSA9IHRhc2tET00obmV3VGFzaykuZ2V0RE9NKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZFRhc2tFbGVtID0gYWRkVGFza0RpdkRPTSgpLmdldERPTSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stZm9ybS1jb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdUYXNrRE9NKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkVGFza0VsZW0pO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfSkgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JldHVybnMgaW5kZXggb2YgcHJvamVjdCBpbiBhbGwgcHJvamVjdHMgYXJyYXlcclxuICAgICAgICBmdW5jdGlvbiBnZXRQcm9qZWN0SW5kZXhJbkFycmF5KCl7XHJcbiAgICAgICAgICAgIGxldCBwcm9qZWN0SW5kZXhJbkFycmF5ID0gMDtcclxuICAgICAgICAgICAgbGV0IHByb2plY3REYXRhSW5kZXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1oZWFkZXInKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcclxuICAgICAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYocHJvamVjdC5nZXRJbmRleCgpID09IHByb2plY3REYXRhSW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RJbmRleEluQXJyYXkgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0SW5kZXhJbkFycmF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlSW5wdXQodHlwZSwgaWQsIHBsYWNlaG9sZGVyLCBpc1JlcXVpcmVkLCBpc0F1dG9Gb2N1cyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgdHlwZSk7XHJcbiAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcbiAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlcik7XHJcbiAgICAgICAgICAgIGlmKGlzUmVxdWlyZWQgPyBpbnB1dC5yZXF1aXJlZCA9IHRydWUgOiBpbnB1dC5yZXF1aXJlZCA9IGZhbHNlKTtcclxuICAgICAgICAgICAgaWYoaXNBdXRvRm9jdXMgPyBpbnB1dC5hdXRvZm9jdXMgPSB0cnVlIDogaW5wdXQuYXV0b2ZvY3VzID0gZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge2dldERPTX07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkU3VidGFza0Zvcm1ET00gPSAoKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RE9NKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGdldENvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gZ2V0Rm9ybSgpO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtQWN0aW9ucyA9IGdldEZvcm1BY3Rpb25zKCk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtQWN0aW9ucyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldENvbnRhaW5lcigpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCdhZGQtc3VidGFzay1mb3JtLWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0Rm9ybSgpe1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCdhZGQtc3VidGFzay1mb3JtJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBjcmVhdGVJbnB1dCgndGV4dCcsICduYW1lJywgJ05hbWUnLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGNyZWF0ZUlucHV0KCd0ZXh0JywgJ2Rlc2NyaXB0aW9uJywgJ0Rlc2NyaXB0aW9uJywgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xyXG4gICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEZvcm1BY3Rpb25zKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuc2V0QXR0cmlidXRlKCdpZCcsJ2Zvcm0tYWN0aW9ucy1kaXYnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKCdpZCcsJ2NhbmNlbC1hZGQtc3VidGFzay1mb3JtJyk7XHJcbiAgICAgICAgICAgIGNhbmNlbEJ0bi5pbm5lclRleHQgPSAnQ2FuY2VsJztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdG4uc2V0QXR0cmlidXRlKCdpZCcsJ2FkZC1zdWJ0YXNrLXN1Ym1pdC1idXR0b24nKTtcclxuICAgICAgICAgICAgc3VibWl0QnRuLmlubmVyVGV4dCA9ICdBZGQgU3VidGFzayc7XHJcblxyXG4gICAgICAgICAgICBhZGRDYW5jZWxCdG5GdW5jdGlvbmFsaXR5KGNhbmNlbEJ0bik7XHJcbiAgICAgICAgICAgIGFkZFN1Ym1pdEJ0bkZ1bmN0aW9uYWxpdHkoc3VibWl0QnRuKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoc3VibWl0QnRuKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JlbW92ZXMgdGhlIGZvcm0gYW5kIGFkZHMgdGhlIGFkZCB0YXNrIHRleHQgYmFja1xyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENhbmNlbEJ0bkZ1bmN0aW9uYWxpdHkoY2FuY2VsQnRuKXtcclxuICAgICAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZFRhc2tFbGVtID0gYWRkVGFza0RpdkRPTSgpLmdldERPTSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1mb3JtLWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRUYXNrRWxlbSk7XHJcbiAgICAgICAgICAgIH0sIHtvbmNlOnRydWV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlcyB0aGUgZm9ybSBhbmQgYWRkcyB0aGUgdGFzayBkb21cclxuICAgICAgICAvL25lZWQgdG8gYWRkIGVycm9yIG1lc3NhZ2Ugb2Ygc29tZSBzb3J0IHdoZW4gdGhlcmUncyBubyB0ZXh0IGluIHRoZSBuYW1lIGZpZWxkXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3VibWl0QnRuRnVuY3Rpb25hbGl0eShzdWJtaXRCdG4pe1xyXG4gICAgICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmKG5hbWVGaWVsZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2plY3RJbmRleEluQXJyYXkgPSBnZXRQcm9qZWN0SW5kZXhJbkFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Rhc2sgPSB0YXNrKG5hbWVGaWVsZCwgZGVzY3JpcHRpb25GaWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIHVwZGF0ZXMgdGhlIHRhc2sgd2l0aCB0aGUgY3VycmVudCBpbmRleFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1Rhc2sgPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RJbmRleEluQXJyYXldLmFkZFRhc2sobmV3VGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Rhc2tET00gPSB0YXNrRE9NKG5ld1Rhc2spLmdldERPTSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRUYXNrRWxlbSA9IGFkZFRhc2tEaXZET00oKS5nZXRET00oKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWZvcm0tY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybUNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmV3VGFza0RPTSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFkZFRhc2tFbGVtKTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0pICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZXR1cm5zIGluZGV4IG9mIHByb2plY3QgaW4gYWxsIHByb2plY3RzIGFycmF5XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0UHJvamVjdEluZGV4SW5BcnJheSgpe1xyXG4gICAgICAgICAgICBsZXQgcHJvamVjdEluZGV4SW5BcnJheSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBwcm9qZWN0RGF0YUluZGV4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaGVhZGVyJykuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UuYWxsUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHByb2plY3QuZ2V0SW5kZXgoKSA9PSBwcm9qZWN0RGF0YUluZGV4KXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0SW5kZXhJbkFycmF5ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdEluZGV4SW5BcnJheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUlucHV0KHR5cGUsIGlkLCBwbGFjZWhvbGRlciwgaXNSZXF1aXJlZCwgaXNBdXRvRm9jdXMpe1xyXG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIHR5cGUpO1xyXG4gICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xyXG4gICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIpO1xyXG4gICAgICAgICAgICBpZihpc1JlcXVpcmVkID8gaW5wdXQucmVxdWlyZWQgPSB0cnVlIDogaW5wdXQucmVxdWlyZWQgPSBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmKGlzQXV0b0ZvY3VzID8gaW5wdXQuYXV0b2ZvY3VzID0gdHJ1ZSA6IGlucHV0LmF1dG9mb2N1cyA9IGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019OyAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vY3JlYXRlcyBET00gb2Ygb25lIHRhc2tcclxuICAgIGNvbnN0IHRhc2tET00gPSAodGFza09iaikgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lckRpdih0YXNrT2JqKXtcclxuICAgICAgICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2snKTtcclxuICAgICAgICAgICAgdGFza0Rpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCB0YXNrT2JqLmdldEluZGV4KCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFza0RpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVUYXNrQnRuRGl2KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlVGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tEaXYuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUtdGFzay1idG4nKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBjb21wbGV0ZVRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXJlZ3VsYXInLCdmYS1jaXJjbGUnKTtcclxuICAgICAgICAgICAgYWRkQ29tcGxldGVUYXNrSWNvbkZ1bmN0aW9uYWxpdHkoY29tcGxldGVUYXNrSWNvbik7XHJcblxyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tEaXYuYXBwZW5kQ2hpbGQoY29tcGxldGVUYXNrSWNvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb21wbGV0ZVRhc2tEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9yZW1vdmUgdGFzayBnaXZlbiBhbiBlbGVtZW50IGluc2lkZSB0aGUgdGFzayBkaXZcclxuICAgICAgICBmdW5jdGlvbiByZW1vdmVUYXNrKGNoaWxkRWxlbWVudCl7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdEluZGV4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaGVhZGVyJykuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50VGFza0luZGV4ID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBwcm9qZWN0SW5kZXhJbkFycmF5ID0gJyc7XHJcbiAgICAgICAgICAgIGxldCB0YXNrSW5kZXhJbkFycmF5ID0gJyc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2l0ZXJhdGUgY3VyciBlbGVtZW50IHVudGlsIGl0IGdldHMgdG8gdGFzayBjbGFzc1xyXG4gICAgICAgICAgICBsZXQgY3VyckVsZW0gPSBjaGlsZEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHdoaWxlKCFjdXJyRWxlbS5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygndGFzaycpKXtcclxuICAgICAgICAgICAgICAgIGN1cnJFbGVtID0gY3VyckVsZW0ucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyRWxlbSA9IGN1cnJFbGVtLnBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50VGFza0luZGV4ID0gY3VyckVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcblxyXG4gICAgICAgICAgICBwcm9qZWN0SW5kZXhJbkFycmF5ID0gc3RvcmFnZS5hbGxQcm9qZWN0cy5maW5kSW5kZXgocHJvamVjdCA9PiBwcm9qZWN0LmdldEluZGV4KCkgPT0gY3VycmVudFByb2plY3RJbmRleCk7XHJcbiAgICAgICAgICAgIHRhc2tJbmRleEluQXJyYXkgPSBzdG9yYWdlLmFsbFByb2plY3RzW3Byb2plY3RJbmRleEluQXJyYXldLmdldFRhc2tzKCkuZmluZEluZGV4KHRhc2sgPT4gdGFzay5nZXRJbmRleCgpID09IGN1cnJlbnRUYXNrSW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgc3RvcmFnZS5hbGxQcm9qZWN0c1twcm9qZWN0SW5kZXhJbkFycmF5XS5yZW1vdmVUYXNrKHRhc2tJbmRleEluQXJyYXkpO1xyXG4gICAgICAgICAgICBjdXJyRWxlbS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENvbXBsZXRlVGFza0ljb25GdW5jdGlvbmFsaXR5KGNvbXBsZXRlVGFza0ljb24pe1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRhc2tJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVUYXNrKGNvbXBsZXRlVGFza0ljb24pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlVGFza1RpdGxlRGl2KHRhc2tPYmope1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrVGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGFza1RpdGxlRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGl0bGUnKTtcclxuICAgICAgICAgICAgdGFza1RpdGxlRGl2LmlubmVyVGV4dCA9IHRhc2tPYmouZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGFza1RpdGxlRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tEZXNjcmlwdGlvbkRpdih0YXNrT2JqKXtcclxuICAgICAgICAgICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbkRpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRlc2NyaXB0aW9uJyk7XHJcbiAgICAgICAgICAgIHRhc2tEZXNjcmlwdGlvbkRpdi5pbm5lclRleHQgPSB0YXNrT2JqLmdldERlc2NyaXB0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXNrRGVzY3JpcHRpb25EaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlVGFza0J1dHRvbnNEaXYoKXtcclxuICAgICAgICAgICAgY29uc3QgYnV0dG9uSWNvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgYnV0dG9uSWNvbnNEaXYuY2xhc3NMaXN0LmFkZCgnYnV0dG9uLWljb25zJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgcGx1c0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIHBsdXNJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtc3F1YXJlLXBsdXMnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS1wZW4tdG8tc3F1YXJlJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcsJ2ZhLXRyYXNoJyk7XHJcblxyXG4gICAgICAgICAgICBhZGRTdWJ0YXNrSWNvbkZ1bmN0aW9uYWxpdHkocGx1c0ljb24pO1xyXG4gICAgICAgICAgICBhZGREZWxldGVJY29uRnVuY3Rpb25hbGl0eShkZWxldGVJY29uKTtcclxuXHJcbiAgICAgICAgICAgIGJ1dHRvbkljb25zRGl2LmFwcGVuZENoaWxkKHBsdXNJY29uKTtcclxuICAgICAgICAgICAgYnV0dG9uSWNvbnNEaXYuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgICAgICAgICBidXR0b25JY29uc0Rpdi5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbkljb25zRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8vdGFzayBzaWRlIGJ1dHRvbiBmdW5jdGlvbmFsaXRpZXNcclxuICAgICAgICBmdW5jdGlvbiBhZGREZWxldGVJY29uRnVuY3Rpb25hbGl0eShkZWxldGVJY29uKXtcclxuICAgICAgICAgICAgZGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVUYXNrKGRlbGV0ZUljb24pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3VidGFza0ljb25GdW5jdGlvbmFsaXR5KHBsdXNJY29uKXtcclxuICAgICAgICAgICAgcGx1c0ljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkVGFza0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1jbGlja2FibGUtZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJ0YXNrRm9ybSA9IGFkZFN1YnRhc2tGb3JtRE9NKCkuZ2V0RE9NKCk7XHJcbiAgICAgICAgICAgICAgICBhZGRUYXNrRGl2LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHN1YnRhc2tGb3JtKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUVzdGltYXRlZFRpbWVEaXYodGFza09iail7XHJcbiAgICAgICAgICAgIGNvbnN0IGVzdGltYXRlZFRpbWVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZXN0aW1hdGVkVGltZURpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLWVzdGltYXRlZC10aW1lJyk7XHJcbiAgICAgICAgICAgIGVzdGltYXRlZFRpbWVEaXYuaW5uZXJUZXh0ID0gYEVzdCBUaW1lOiAke3Rhc2tPYmouZ2V0RXN0aW1hdGVkVGltZSgpfWA7XHJcbiAgICAgICAgICAgIHJldHVybiBlc3RpbWF0ZWRUaW1lRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERPTSgpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBjcmVhdGVDb250YWluZXJEaXYodGFza09iaik7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbnNEaXYgPSBjcmVhdGVUYXNrQnRuRGl2KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlRGl2ID0gY3JlYXRlVGFza1RpdGxlRGl2KHRhc2tPYmopO1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrQnV0dG9ucyA9IGNyZWF0ZVRhc2tCdXR0b25zRGl2KCk7XHJcbiAgICAgICAgICAgIGlmKHRhc2tPYmouZ2V0RXN0aW1hdGVkVGltZSgpKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tFc3RpbWF0ZWRUaW1lID0gY3JlYXRlRXN0aW1hdGVkVGltZURpdih0YXNrT2JqKTtcclxuICAgICAgICAgICAgICAgIHRpdGxlRGl2LmFwcGVuZENoaWxkKHRhc2tFc3RpbWF0ZWRUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0YXNrT2JqLmdldERlc2NyaXB0aW9uKCkpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gY3JlYXRlVGFza0Rlc2NyaXB0aW9uRGl2KHRhc2tPYmopO1xyXG4gICAgICAgICAgICAgICAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChidXR0b25zRGl2KTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRhc2tCdXR0b25zKTtcclxuICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHJldHVybiB7Z2V0RE9NfTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NyZWF0ZXMgRE9NIG9mIG9uZSBzdWJ0YXNrXHJcbiAgICBjb25zdCBzdWJ0YXNrRE9NID0gKHN1YnRhc2tPYmopID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTdWJ0YXNrRGl2KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgc3VidGFza0Rpdi5jbGFzc0xpc3QuYWRkKCdzdWJ0YXNrJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdWJ0YXNrRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbXBsZXRlU3VidGFza0Rpdigpe1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlLXRhc2stYnRuJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgY2lyY2xlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICAgICAgY2lyY2xlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1yZWd1bGFyJywnZmEtY2lyY2xlJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGNpcmNsZUljb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVN1YnRhc2tUaXRsZURpdihzdWJ0YXNrT2JqKXtcclxuICAgICAgICAgICAgY29uc3QgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGl0bGVEaXYuY2xhc3NMaXN0LmFkZCgndGFzay10aXRsZScpO1xyXG4gICAgICAgICAgICB0aXRsZURpdi5pbm5lclRleHQgPSBzdWJ0YXNrT2JqLmdldE5hbWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRpdGxlRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVN1YnRhc2tCdXR0b25JY29ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgYnV0dG9uc0ljb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgYnV0dG9uc0ljb25EaXYuY2xhc3NMaXN0LmFkZCgnYnV0dG9uLWljb25zJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJywnZmEtcGVuLXRvLXNxdWFyZScpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGRlbGV0ZUljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnLCdmYS10cmFzaCcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGJ1dHRvbnNJY29uRGl2LmFwcGVuZENoaWxkKGVkaXRJY29uKTtcclxuICAgICAgICAgICAgYnV0dG9uc0ljb25EaXYuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBidXR0b25zSWNvbkRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBnZXRET00oKXtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRGl2ID0gY3JlYXRlU3VidGFza0RpdigpO1xyXG4gICAgICAgICAgICBjb25zdCBjb21wbGV0ZVN1YnRhc2tEaXYgPSBjcmVhdGVDb21wbGV0ZVN1YnRhc2tEaXYoKTtcclxuICAgICAgICAgICAgY29uc3Qgc3VidGFza1RpdGxlRGl2ID0gY3JlYXRlU3VidGFza1RpdGxlRGl2KHN1YnRhc2tPYmopO1xyXG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrQnRuSWNvbnMgPSBjcmVhdGVTdWJ0YXNrQnV0dG9uSWNvbnMoKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoY29tcGxldGVTdWJ0YXNrRGl2KTtcclxuICAgICAgICAgICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tUaXRsZURpdik7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChzdWJ0YXNrQnRuSWNvbnMpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXJEaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtnZXRET019O1xyXG4gICAgfVxyXG5cclxuICAgIC8vYWRkcyBhbGwgZG9tIG9mIHRhc2tzIGFuZCBzdWJ0YXNrcyBpbiBhIHByb2plY3RcclxuICAgIGZ1bmN0aW9uIGFkZEFsbFRhc2tzRE9NKGNvbnRhaW5lciwgdGFza3Mpe1xyXG4gICAgICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRE9NKHRhc2spLmdldERPTSgpKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsU3VidGFza3MgPSB0YXNrLmdldFN1YnRhc2tzKCk7XHJcbiAgICAgICAgICAgIGFsbFN1YnRhc2tzLmZvckVhY2goc3VidGFzayA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3VidGFza0RPTShzdWJ0YXNrKS5nZXRET00oKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbGVhckFsbFRhc2tzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXJzJyk7XHJcbiAgICAgICAgY29udGFpbmVyRGl2LnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7aW5pdGlhbFJlbmRlciwgY2xlYXJBbGxUYXNrc307XHJcblxyXG59KSgpXHJcbi8qIFxyXG5jb25zdCByZW5kZXJUYXNrcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFkZE1vdGl2YXRpb25hbE1lc3NhZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IERPTSA9IG1vdGl2YXRpb25hbE1lc3NhZ2VET00oKTtcclxuICAgICAgICBjb25zdCBidG5GdW5jdGlvbmFsaXR5ID0gbW90aXZhdGlvbmFsTWVzc2FnZURPTUZ1bmN0aW9uYWxpdHkoKTtcclxuICAgICAgICAvL29iamVjdCBkZWNsYXJhdGlvbiBmb3IgbW90aXZhdGlvbmFsIG1lc3NhZ2VzXHJcbiAgICAgICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZShoZWFkZXIsIG1lc3NhZ2UsIGF1dGhvciA9ICcnKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtoZWFkZXIsIG1lc3NhZ2UsIGF1dGhvcn07XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9wcmVzZXQgbWV0aG9kcyBmb3IgbW90aXZhdGlvbmFsIG1lc3NhZ2VcclxuICAgICAgICBmdW5jdGlvbiBhZGREZWZhdWx0TW90aXZhdGlvbmFsTWVzc2FnZXMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2UxID0gbW90aXZhdGlvbmFsTWVzc2FnZSgnTW90aXZhdGlvbmFsIE1lc3NhZ2UnLCdZZXN0ZXJkYXkgeW91IHNhaWQgdG9tb3Jyb3csIHNvIGp1c3QgZG8gaXQuIERvblxcJ3QgbGV0IHlvdXIgZHJlYW1zIGJlIGRyZWFtcy4nLCdTaGlhIExhQmVvdWYnKTtcclxuICAgICAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZTIgPSAgbW90aXZhdGlvbmFsTWVzc2FnZSgnTW90aXZhdGlvbmFsIE1lc3NhZ2UnLFwiVGhlIG1vc3QgaW1wb3J0YW50IGludmVzdG1lbnQgeW91IGNhbiBtYWtlIGlzIGluIHlvdXJzZWxmLlwiLCdXYXJyZW4gQnVmZmV0dCcpO1xyXG4gICAgICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlMyA9IG1vdGl2YXRpb25hbE1lc3NhZ2UoJ1BlcnNvbmFsIE1lc3NhZ2UnLCdZb3UgY2FuIHBsYXkgUG9rZW1vbiBpZiB5b3UgZmluaXNoIGNvZGluZyB0aGlzIHRvLWRvIGxpc3QuJywnQnJ1Y2UnKTtcclxuICAgICAgICAgICAgbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheS5wdXNoKG1vdGl2YXRpb25hbE1lc3NhZ2UzKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjaG9vc2VPbmVNb3RpdmF0aW9uYWxNZXNzYWdlKCkge1xyXG4gICAgICAgICAgICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5W3JhbmRvbV07XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlTWVzc2FnZShpbmRleCkge1xyXG4gICAgICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gcmVuZGVyRGVmYXVsdE1lc3NhZ2VzKCkge1xyXG4gICAgICAgICAgICBhZGREZWZhdWx0TW90aXZhdGlvbmFsTWVzc2FnZXMoKTtcclxuICAgICAgICAgICAgRE9NLmNyZWF0ZU1vdGl2YXRpb25hbE1lc3NhZ2UoY2hvb3NlT25lTW90aXZhdGlvbmFsTWVzc2FnZSgpKTtcclxuICAgICAgICAgICAgYnRuRnVuY3Rpb25hbGl0eS5hZGRCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtyZW5kZXJEZWZhdWx0TWVzc2FnZXMsIGRlbGV0ZU1lc3NhZ2V9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7cmVuZGVyRGVmYXVsdCwgY2xlYXJBbGxUYXNrc307XHJcbn1cclxuXHJcblxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgdWk7XHJcblxyXG5cclxuLyogY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZURPTSA9ICgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vdGl2YXRpb25hbE1lc3NhZ2UobW90aXZhdGlvbmFsTWVzc2FnZU9iail7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICAgICAgICBjb25zdCBwYXJlbnREaXYgPSBtb3RpdmF0aW9uYWxNZXNzYWdlQ29udGFpbmVyKCk7XHJcbiAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKG1vdGl2YXRpb25hbE1lc3NhZ2VIZWFkZXIobW90aXZhdGlvbmFsTWVzc2FnZU9iai5oZWFkZXIpKTtcclxuICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsTWVzc2FnZShtb3RpdmF0aW9uYWxNZXNzYWdlT2JqLm1lc3NhZ2UpKTtcclxuICAgICAgICBwYXJlbnREaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsQXV0aG9yKG1vdGl2YXRpb25hbE1lc3NhZ2VPYmouYXV0aG9yKSk7XHJcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChwYXJlbnREaXYpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBtb3RpdmF0aW9uYWxNZXNzYWdlQ29udGFpbmVyKCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtbWFyZ2luJyk7XHJcbiAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCdtb3RpdmF0aW9uYWwtbWVzc2FnZScpO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZUhlYWRlcihoZWFkZXJUZXh0KSB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaGVhZGVyRGl2LnNldEF0dHJpYnV0ZSgnaWQnLCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1oZWFkZXInKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW52aXNpYmxlQnV0dG9uc0RpdiA9IGJ1dHRvbnNEaXYoZmFsc2UpO1xyXG4gICAgICAgIGludmlzaWJsZUJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlLWVsZW1lbnRzJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHZpc2libGVCdXR0b25zRGl2ID0gYnV0dG9uc0Rpdih0cnVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlLmlubmVyVGV4dCA9IGhlYWRlclRleHQ7XHJcblxyXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChpbnZpc2libGVCdXR0b25zRGl2KTtcclxuICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQobW90aXZhdGlvbmFsTWVzc2FnZSk7XHJcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKHZpc2libGVCdXR0b25zRGl2KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhlYWRlckRpdjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBidXR0b25zRGl2KGlzVmlzaWJsZSkge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBzZXR0aW5nc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBzZXR0aW5nc0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnKTtcclxuICAgICAgICBzZXR0aW5nc0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtZ2VhcicpO1xyXG4gICAgICAgIHNldHRpbmdzQnRuLmFwcGVuZENoaWxkKHNldHRpbmdzSWNvbik7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3QgY2xvc2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcpO1xyXG4gICAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS14Jyk7XHJcbiAgICAgICAgY2xvc2VCdG4uYXBwZW5kQ2hpbGQoY2xvc2VJY29uKTtcclxuXHJcbiAgICAgICAgYnV0dG9uc0Rpdi5hcHBlbmRDaGlsZChzZXR0aW5nc0J0bik7XHJcbiAgICAgICAgYnV0dG9uc0Rpdi5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XHJcblxyXG4gICAgICAgIGlmKGlzVmlzaWJsZSl7XHJcbiAgICAgICAgICAgIHNldHRpbmdzQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCdtb3RpdmF0aW9uYWwtbWVzc2FnZS1zZXR0aW5ncy1idG4nKTtcclxuICAgICAgICAgICAgY2xvc2VCdG4uc2V0QXR0cmlidXRlKCdpZCcsICdtb3RpdmF0aW9uYWwtbWVzc2FnZS1jbG9zZS1idG4nKTsgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYnV0dG9uc0Rpdi5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUtZWxlbWVudHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidXR0b25zRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbWVzc2FnZVBhcmFncmFwaC5pbm5lclRleHQgPSBtZXNzYWdlO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlUGFyYWdyYXBoO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbEF1dGhvcihhdXRob3IpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlQXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIG1lc3NhZ2VBdXRob3IuaW5uZXJUZXh0ID0gYXV0aG9yO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlQXV0aG9yOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtjcmVhdGVNb3RpdmF0aW9uYWxNZXNzYWdlfTtcclxufVxyXG5cclxuY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZURPTUZ1bmN0aW9uYWxpdHkgPSAoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBhZGRTZXR0aW5nQnRuRnVuY3Rpb25hbGl0eSgpe1xyXG4gICAgICAgIGNvbnN0IHNldHRpbmdCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW90aXZhdGlvbmFsLW1lc3NhZ2Utc2V0dGluZ3MtYnRuJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vZGFsRm9ybSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDbG9zZUJ0bkZ1bmN0aW9uYWxpdHkoKSB7XHJcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW90aXZhdGlvbmFsLW1lc3NhZ2UtY2xvc2UtYnRuJyk7XHJcbiAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3RpdmF0aW9uYWwtbWVzc2FnZScpO1xyXG4gICAgICAgICAgICBtb3RpdmF0aW9uYWxNZXNzYWdlRGl2LnJlbW92ZSgpO1xyXG4gICAgICAgIH0pICBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRCdG5GdW5jdGlvbmFsaXR5KCkge1xyXG4gICAgICAgIGFkZENsb3NlQnRuRnVuY3Rpb25hbGl0eSgpO1xyXG4gICAgICAgIGFkZFNldHRpbmdCdG5GdW5jdGlvbmFsaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHthZGRCdG5GdW5jdGlvbmFsaXR5fTtcclxufVxyXG4gKi9cclxuLyogXHJcbiAgICAvL25lZWQgdG8gY2xlYW4gdGhpcyB1cFxyXG4gICAgLy9hZGQgYWxsIHRhc2tzIGFuZCB0YXNrcyB3aXRoIHNlY3Rpb25zXHJcbiAgICBmdW5jdGlvbiBhZGRTZWN0aW9uc1Rhc2tzRE9NKHBhcmVudERpdiwgYWxsU2VjdGlvbnNBcnJheSl7XHJcbiAgICAgICAgYWxsU2VjdGlvbnNBcnJheS5mb3JFYWNoKHNlY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uRE9NID0gY3JlYXRlU2VjdGlvbkRPTShzZWN0aW9uKS5nZXRTZWN0aW9uRE9NKCk7XHJcbiAgICAgICAgICAgIHNlY3Rpb24udGFza3MuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tET00gPSBjcmVhdGVUYXNrRE9NKHRhc2spLmdldFRhc2tET00oKTtcclxuICAgICAgICAgICAgICAgIHNlY3Rpb25ET00uYXBwZW5kQ2hpbGQodGFza0RPTSk7XHJcbiAgICAgICAgICAgICAgICB0YXNrLnN1YnRhc2tzLmZvckVhY2goc3VidGFzayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0RPTSA9IGNyZWF0ZVN1YnRhc2tET00oc3VidGFzaykuZ2V0U3VidGFza0RPTSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChzdWJ0YXNrRE9NKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChzZWN0aW9uRE9NKTsgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICovXHJcbi8qIFxyXG4gICAgY29uc3QgY3JlYXRlU2VjdGlvbkRPTSA9IChzZWN0aW9uT2JqKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU2VjdGlvbkRpdigpe1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25EaXYuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbicpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VjdGlvbkRpdjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTZWN0aW9uSGVhZGVyKHNlY3Rpb25PYmope1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uSGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25IZWFkZXJEaXYuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbi1oZWFkZXInKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uLXRpdGxlJyk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25UaXRsZS5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLXRpdGxlJyk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25UaXRsZS5pbm5lclRleHQgPSBzZWN0aW9uT2JqLm5hbWU7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkRyb3Bkb3duQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHNlY3Rpb25Ecm9wZG93bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uLWRyb3Bkb3duJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBkcm9wZG93bkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1zb2xkJywnZmEtY2FyZXQtZG93bicpO1xyXG4gICAgICAgICAgICBzZWN0aW9uRHJvcGRvd25Db250YWluZXIuYXBwZW5kQ2hpbGQoZHJvcGRvd25JY29uKTtcclxuICAgICAgICAgICAgc2VjdGlvbkhlYWRlckRpdi5hcHBlbmRDaGlsZChzZWN0aW9uVGl0bGUpO1xyXG4gICAgICAgICAgICBzZWN0aW9uSGVhZGVyRGl2LmFwcGVuZENoaWxkKHNlY3Rpb25Ecm9wZG93bkNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWN0aW9uSGVhZGVyRGl2O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFNlY3Rpb25ET00oKXtcclxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkRpdiA9IGNyZWF0ZVNlY3Rpb25EaXYoKTtcclxuICAgICAgICAgICAgc2VjdGlvbkRpdi5hcHBlbmRDaGlsZChjcmVhdGVTZWN0aW9uSGVhZGVyKHNlY3Rpb25PYmopKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25EaXY7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtnZXRTZWN0aW9uRE9NfTtcclxuICAgIH0gKi8iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vcmVuZGVyIGluYm94XHJcbmltcG9ydCBVSSBmcm9tICcuL3VpLmpzJztcclxuaW1wb3J0IHByb2plY3QgZnJvbSAnLi9wcm9qZWN0LmpzJztcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlLmpzJztcclxuXHJcbigoKSA9PiB7XHJcbiAgICByZW5kZXJEZWZhdWx0UHJvamVjdHMoKTtcclxuICAgIFVJLmluaXRpYWxSZW5kZXIoKTtcclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJEZWZhdWx0UHJvamVjdHMoKXtcclxuICAgICAgICBsZXQgaW5ib3ggPSBwcm9qZWN0KCdJbmJveCcpO1xyXG4gICAgICAgIGxldCB0b2RheSA9IHByb2plY3QoJ1RvZGF5Jyk7XHJcbiAgICAgICAgbGV0IHRoaXN3ZWVrID0gcHJvamVjdCgnVGhpcyBXZWVrJyk7XHJcbiAgICAgICAgc3RvcmFnZS5hZGRQcm9qZWN0KGluYm94KTtcclxuICAgICAgICBzdG9yYWdlLmFkZFByb2plY3QodG9kYXkpO1xyXG4gICAgICAgIHN0b3JhZ2UuYWRkUHJvamVjdCh0aGlzd2Vlayk7XHJcbiAgICB9XHJcblxyXG5cclxufSkoKTtcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==