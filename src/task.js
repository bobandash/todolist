//contains the task object and subtask object to create
const task = (
    name,
    description,
    index,
    dueDate = '',
    estimatedTime = '',
    priority = '',
    project = '',
    subtasks = []) =>
{
    let currSubtaskIndex = 0;

    function incrementSubtaskIndex(){
        currSubtaskIndex++;
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

    function editTask(newTaskObj) {
        name = newTaskObj.name;
        description = newTaskObj.description;
        dueDate = newTaskObj.dueDate;
        estimatedTime = newTaskObj.estimatedTime;
        priority = newTaskObj.priority;
        project = newTaskObj.project;
    }

    return {index, addSubtask, removeSubtask, editSubtask, editTask};
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

    return {editSubtask, setIndex, getIndex};
}