

import {addMotivationalMessage} from './motivationalMessage.js'

//contains all DOM Manipulation that's needed for tasks
const renderTasks = () => {
    const renderDefault = (allSectionsArray, allTasksArray) => {
        const bodyElem = document.querySelector('body');
        addMotivationalMessage().renderDefaultMessages();
        const containerDiv = createContainerDOM().containerDOM();
        const header = createHeaderDOM('Inbox').getHeaderDOM();
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
        heading.innerText = headerName;
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


export {renderTasks};


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

export {addMotivationalMessage};
