export default project = (name, tasks = [], index) => {
    function getName(){
        return name;
    }

    function getIndex() {
        return index;
    }

    function setIndex(index){
        return index;
    }

    function setName(newName){
        name = newName;
    }

    function addTask(task){
        tasks.push(task);
    }

    function removeSection(section){
    }

    return {getName, getIndex, setIndex, setName, addSection, removeSection}
}
