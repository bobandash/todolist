const subtask = (
    name,
    description) =>
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