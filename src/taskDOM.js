

import {addMotivationalMessage} from './motivationalMessage.js'

//contains all DOM Manipulation that's needed for tasks
const renderTasks = () => {
    const renderDefault = (allSectionsArray, allTasksArray) => {
        const bodyElem = document.querySelector('body');
        addMotivationalMessage().renderDefaultMessages();
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


export {renderTasks};
