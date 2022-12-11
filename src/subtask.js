const subtask = (
    name,
    description,
    dueDate,
    estimatedTime,
    priority) =>
{

    function getIndex(){
        return index;
    }

    function getName(){
        return name;
    }

    return {getIndex, getName};
}

export default subtask;