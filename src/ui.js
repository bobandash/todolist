//contains all DOM Manipulation that's needed for tasks
import storage from './storage.js';
import task from './task.js';
import subtask from './subtask.js';
import { createPopper } from '@popperjs/core';
import datepicker from 'js-datepicker';
import project from './project.js';

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
        const inboxProject = storage.allProjects.filter(project => project.getName() === 'Inbox')[0];
        const header = createDOMProjectHeader(inboxProject);
        const addTaskDiv = createDOMAddTask();
        
        containerDiv.appendChild(header);
        storage.allProjects.forEach(project => {
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
/*         const todayNav = document.querySelector('a[data-project-index="1"]');
        const thisWeekNav = document.querySelector('a[data-project-index="2"]'); */
        
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
                        let newProject = project(projectName);
                        storage.addProject(newProject);
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
                    const relevantTasks = storage.allProjects[projectIndexArray].getTasks();
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
        addEstTimePopoverEventListener(estimatedTimeDiv, popoverContainer);


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
                removeActivePopovers();
                removeOtherActiveStatuses(priorityDiv);
                if(!isActive(priorityDiv)){
                    const priority1 = getPriorityOption(1);
                    const priority2 = getPriorityOption(2);
                    const priority3 = getPriorityOption(3);
                    const priorityContainer = createContainer('div',['popover-container','active-popover'], 'priority-options', [priority1, priority2, priority3], skip(1));
                    createPopper(priorityDiv, priorityContainer, {placement: 'bottom'});
                    parentDiv.appendChild(priorityContainer);
                }
                toggleActive(priorityDiv);
            })
        }

        function addEstTimePopoverEventListener(estimatedTimeDiv, parentDiv){
            estimatedTimeDiv.addEventListener('click', function(){
                removeActivePopovers();
                removeOtherActiveStatuses(estimatedTimeDiv);
                if(!isActive(estimatedTimeDiv)){
                    const estimatedTimeForm = createEstimatedTimeForm(estimatedTimeDiv);
                    createPopper(estimatedTimeDiv, estimatedTimeForm, {placement: 'bottom'});
                    parentDiv.appendChild(estimatedTimeForm);
                }
                toggleActive(estimatedTimeDiv);
            })            
        }

        function addDueDatePopoverEventListener(dueDateDiv, parentDiv){
            dueDateDiv.addEventListener('click', function(){

                removeActivePopovers();
                dueDateDiv.classList.add('active');
/*                 const spanHelper = createTag('span', skip(1), ['active-popover'], skip(1)) */;
                const picker = datepicker(dueDateDiv, {
                    minDate: new Date(),
                    onSelect: (instance, date) => {
                        dueDateDiv.setAttribute('data-due-date', date.toLocaleDateString());;
                        dueDateDiv.innerText = '';
                        const calendarIcon = createTag('i', skip(1), ['fa-regular', 'fa-calendar'], skip(1));
                        const dateText = document.createTextNode(` ${date.toLocaleDateString()}`);
                        dueDateDiv.appendChild(calendarIcon);
                        dueDateDiv.appendChild(dateText);
                        picker.remove();
                        // Do stuff when a date is selected (or unselected) on the calendar.
                        // You have access to the datepicker instance for convenience.
                      }
                });         
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

        function removeOtherActiveStatuses(element){
            const allActivePopoverIcons = Array.from(document.querySelectorAll('.active'));
            allActivePopoverIcons.forEach(activeIcon => {
                if(activeIcon != element){
                    activeIcon.classList.remove('active');
                }
            })
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

        function createEstimatedTimeForm(estimatedTimeDiv){
            const daysText = createTag('div','Days:', ...skip(2));
            const daysInput = createEstTimeInputs('days', 1);

            const hoursText = createTag('div','Hours (1-23):', ...skip(2));
            const hoursInput = createEstTimeInputs('hours', 1, 23);
            
            const minutesText = createTag('div','Minutes (1-59):', ...skip(2));
            const minutesInput = createEstTimeInputs('minutes', 1, 59);
            addExistingInputValues();

            const confirmIcon = createTag('i', skip(1), ['fa-solid','fa-sharp','fa-check'], skip(1));
            const confirmBtn = createContainer('button', skip(1), 'confirm-est-time', [confirmIcon], skip(1));

            const cancelIcon = createTag('i', skip(1), ["fa-solid","fa-sharp","fa-x"], skip(1));
            const cancelBtn = createContainer('button', skip(1), 'cancel-est-time', [cancelIcon], skip(1));
            const buttonsContainer = createContainer('div', ['button-container'], skip(1), [confirmBtn, cancelBtn], skip(1));

            const form = createContainer('form', ['active-popover'], 'estimated-time-form', [daysText, daysInput, hoursText, hoursInput, minutesText, minutesInput, buttonsContainer], skip(1));
            
            function createEstTimeInputs(identifer, min, max){
                const input = document.createElement('input');
                input.setAttribute('type','number');
                input.setAttribute('id',identifer);
                input.setAttribute('name',identifer);
                input.setAttribute('min', min);
                if(max){
                    input.setAttribute('max', max);
                }
                return input;
            }

            function addExistingInputValues(){
                const days = estimatedTimeDiv.getAttribute('data-days');
                const hours = estimatedTimeDiv.getAttribute('data-hours');
                const minutes = estimatedTimeDiv.getAttribute('data-minutes');
                if(days){
                    daysInput.value = days;
                }
                if(hours){
                    hoursInput.value = hours;
                }
                if(minutes){
                    minutesInput.value = minutes;
                }
            }


            cancelBtn.addEventListener('click', function(){
                removeActivePopovers();
                toggleActive(estimatedTimeDiv);               
            })

            confirmBtn.addEventListener('click', function(){
                const days = daysInput.value;
                const hours = hoursInput.value;
                const minutes = minutesInput.value;
                removeExistingTimeAttributes();
                addNewTimeAttributes();
                changeTimeText();
                removeActivePopovers();
                toggleActive(estimatedTimeDiv);

                function removeExistingTimeAttributes(){
                    estimatedTimeDiv.removeAttribute('data-days');
                    estimatedTimeDiv.removeAttribute('data-hours');
                    estimatedTimeDiv.removeAttribute('data-minutes');
                }
        
                function addNewTimeAttributes(){
                    if(days){
                        estimatedTimeDiv.setAttribute('data-days', days);
                    }
                    if(hours){
                        estimatedTimeDiv.setAttribute('data-hours', hours);
                    }
                    if(minutes){
                        estimatedTimeDiv.setAttribute('data-minutes', minutes);
                    }
                }
        
                function changeTimeText(){
                    const clockIcon = createTag('i', skip(1), ['fa-regular','fa-clock'], skip(1));
                    let timeText = '';
                    let timeTextNode = '';
                    if(days || hours || minutes){
                        if(days){
                            timeText = days + 'D';
                        }
                        if(hours){
                            if(timeText.slice(-1) === 'D'){
                                timeText = `${timeText}:${hours}H`;
                            }
                            else{
                                timeText = `${hours}H`
                            }
                        }
                        if(minutes){
                            if(timeText.slice(-1) === 'D' || timeText.slice(-1) === 'H'){
                                timeText = `${timeText}:${minutes}M`;
                            }
                            else{
                                timeText = `${minutes}M`
                            }                           
                        }
                    } else {
                        timeText = 'Est Time';
                    }
                    
                    timeTextNode = document.createTextNode(` ${timeText}`);
                    estimatedTimeDiv.innerText = '';
                    estimatedTimeDiv.appendChild(clockIcon);
                    estimatedTimeDiv.appendChild(timeTextNode);
                }

            })
            return form;
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
                //add estimated time functionality
                const estTimeDays = document.getElementById('est-completion-time-btn').getAttribute('data-days');
                const estTimeHours = document.getElementById('est-completion-time-btn').getAttribute('data-hours');
                const estTimeMinutes = document.getElementById('est-completion-time-btn').getAttribute('data-minutes');
                const dueDate = document.getElementById('due-date-btn').getAttribute('data-due-date');
                

                if(nameField){
                    const container = document.getElementById('container');

                    let projectIndexInArray = storageLookups.getProjectIndex();
                    let newTask = task(nameField, descriptionField, dueDate, [estTimeDays, estTimeHours, estTimeMinutes], priorityNumber);
                    newTask = storage.allProjects[projectIndexInArray].addTask(newTask);

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
                const estimatedCompletionTimeBtn = document.getElementById('est-completion-time-btn');
                const estimatedCompletionTime = [estimatedCompletionTimeBtn.getAttribute('data-days'), estimatedCompletionTimeBtn.getAttribute('data-hours'), estimatedCompletionTimeBtn.getAttribute('data-minutes')];
                const invisibleTaskElement = document.getElementById('invisible');
                

                if(nameField){
                    const currentTaskDataIndex = invisibleTaskElement.getAttribute('data-task-index');
                    const projectIndexInArray = storageLookups.getProjectIndex();
                    const taskIndexInArray = storageLookups.getTaskIndex(projectIndexInArray, currentTaskDataIndex);
                    const currentTask = storage.allProjects[projectIndexInArray].getTasks()[taskIndexInArray];
                    currentTask.setName(nameField)
                    currentTask.setDescription(descriptionField)
                    currentTask.setPriority(priorityNumber);
                    currentTask.setEstimatedTime(estimatedCompletionTime);

                    const newTaskDOM = createDOMTask(currentTask);
                    invisibleTaskElement.parentNode.insertBefore(newTaskDOM, invisibleTaskElement);
                    invisibleTaskElement.remove();
                    form.remove();
                }               
            })
        }

        //helper function for priority, estimated time, and due date icons
        //for priority
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
        //end for priority
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
                    let newSubtask = subtask(nameField, descriptionField);

                    const projectArrayIndex = storageLookups.getProjectIndex();
                    const dataTaskIndex = form.getAttribute('data-task-index');
                    const taskArrayIndex = storageLookups.getTaskIndex(projectArrayIndex, dataTaskIndex);
                    const currentTaskInStorage = storage.allProjects[projectArrayIndex].getTasks()[taskArrayIndex];
                    
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
                const currentSubtask = storage.allProjects[projectArrayIndex].getTasks()[taskArrayIndex].getSubtasks()[subtaskArrayIndex];

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

        if(taskObj.getDescription()){
            const taskDescription = createTag('div',taskObj.getDescription(), ['task-description'], skip(1));
            taskInformationDiv.appendChild(taskDescription);
        }
        if(taskObj.getDueDate()){
            const taskEstimatedDueDate = createTag('div',`Due: ${taskObj.getDueDate()}`, ['task-due-date'], skip(1));
            taskInformationDiv.appendChild(taskEstimatedDueDate);
        }
        if(taskObj.getEstimatedTimeText()){
            const taskEstimatedTime = createTag('div',`Est Time: ${taskObj.getEstimatedTimeText()}`, ['task-estimated-time'], skip(1));
            taskInformationDiv.appendChild(taskEstimatedTime);
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
            const projectArrayIndex = storage.allProjects.findIndex(project => project.getIndex() == projectIndex);
            return projectArrayIndex;
        }

        function getStorageTaskIndex(projectIndex, taskElement){
            const taskIndex = taskElement.getAttribute('data-task-index');
            const taskArrayIndex = storage.allProjects[projectIndex].getTasks().findIndex(task => task.getIndex() == taskIndex);
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
            storage.allProjects[storageProjectIndex].removeTask(storageTaskIndex);
        }

        function removeRelevantTasksAndSubtasksDOM(){
            const taskIndex = taskObj.getIndex();
            const allDOMToRemove = Array.from(document.querySelectorAll(`[data-task-index='${taskIndex}']`));
            allDOMToRemove.forEach(node => {{
                node.remove();
            }})
        }

        //end for completing a task and deleting a task


        //for editing a task, add attributes from the task that's being edited to the form
        function addEditIconFunctionality(){
            editIcon.addEventListener('click', function() {
                if(hasForm()){
                    revertForm();
                }
                const taskElement = getTaskFromChildNode(editIcon);
                const taskForm = createDOMTaskForm('edit');

                const storageProjectIndex = getStorageProjectIndex();
                const storageTaskIndex = getStorageTaskIndex(storageProjectIndex, taskElement);
                const currentTaskObject = storage.allProjects[storageProjectIndex].getTasks()[storageTaskIndex];

                taskElement.parentNode.insertBefore(taskForm, taskElement.nextSibling);
                taskElement.setAttribute('id','invisible');

                document.getElementById('name').value = currentTaskObject.getName();
                document.getElementById('description').value = currentTaskObject.getDescription();
                const priorityIcon = document.querySelector('#priority-btn > i');
                const estTimeBtn = document.getElementById('est-completion-time-btn');
                const dueDateBtn = document.getElementById('due-date-btn');              
                if(currentTaskObject.getPriority()){
                    addPriorityColor(priorityIcon, currentTaskObject.getPriority());
                    makeSolidIcon(priorityIcon);
                }

                if(currentTaskObject.getEstimatedTimeText()){
                    estTimeBtn.setAttribute('data-days',currentTaskObject.getEstimatedTimeDays());
                    estTimeBtn.setAttribute('data-hours',currentTaskObject.getEstimatedTimeHours());                   
                    estTimeBtn.setAttribute('data-minutes',currentTaskObject.getEstimatedTimeMinutes());
                    estTimeBtn.innerText = '';
                    const clockIcon = createTag('i', skip(1), ['fa-regular','fa-clock'], skip(1));
                    const estTimeText = document.createTextNode(` ${currentTaskObject.getAbbreviatedEstimatedTimeText()}`);
                    estTimeBtn.appendChild(clockIcon);
                    estTimeBtn.appendChild(estTimeText);
                }

                if(currentTaskObject.getDueDate()){
                    dueDateBtn.setAttribute('data-due-date', currentTaskObject.getDueDate());
                    dueDateBtn.innerText = '';
                    const calendarIcon = createTag('i', skip(1), ['fa-regular','fa-calendar'], skip(1));
                    const dueDateText = document.createTextNode(` ${currentTaskObject.getDueDate()}`);
                    dueDateBtn.appendChild(calendarIcon);
                    dueDateBtn.appendChild(dueDateText);                    
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
                storage.allProjects[projectArrayIndex].getTasks()[taskDataIndex].removeSubtask(subtaskArrayIndex);
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
                storage.allProjects[projectArrayIndex].getTasks()[taskDataIndex].removeSubtask(subtaskArrayIndex);
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
            storage.allProjects.forEach((project, index) => {
                if(project.getIndex() == projectDataIndex){
                    projectIndexInArray = index;
                }
            })
            return projectIndexInArray;
        }

        //returns index of task in all tasks array
        function getTaskIndex(projectIndex, taskDataIndex){
            let currentProjectTasks = storage.allProjects[projectIndex].getTasks();
            return currentProjectTasks.findIndex(task => task.getIndex() == taskDataIndex);
        }

        function getSubtaskIndex(projectIndex, taskIndex, subtaskDataIndex){
            let currentProjectSubtasks = storage.allProjects[projectIndex].getTasks()[taskIndex].getSubtasks();
            return currentProjectSubtasks.findIndex(subtask => subtask.getIndex() == subtaskDataIndex);
        }

        return {getProjectIndex, getTaskIndex, getSubtaskIndex}
    })();

    return {initialRender};

})();

export default ui;