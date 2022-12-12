const subtask = (
    name,
    description,
    index) =>
{

    function getIndex(){
        return index;
    }

    function getDescription(){
        return description;
    }

    function getName(){
        return name;
    }

    return {getIndex, getName, getDescription};
}

export default subtask;