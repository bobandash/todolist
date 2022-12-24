const subtask = (
    name,
    description,
    index) =>
{

    function setIndex(newIndex){
        index = newIndex;
    }

    function getIndex(){
        return index;
    }

    function getDescription(){
        return description;
    }

    function getName(){
        return name;
    }

    return {getIndex, getName, getDescription, setIndex};
}

export default subtask;