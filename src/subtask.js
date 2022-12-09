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
