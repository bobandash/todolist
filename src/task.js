//projects contain sections, sections contain tasks, tasks contain subtasks
//some tasks don't have sections
//project by default is inbox

const task = (
    name,
    description,
    taskIndex,
    dueDate,
    estimatedCompletionTime,
    priority,
    projectIndex,
    sectionIndex,
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



export {storage, taskIndex, section, project, task, subtask};



