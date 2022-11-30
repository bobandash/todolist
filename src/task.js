//js file contains the everything related to tasks
//task object and subtask object to create
import {renderTasks} from './taskDOM.js';

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


export {storage, taskIndex, section, project, task, subtask};



