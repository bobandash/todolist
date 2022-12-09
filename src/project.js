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
