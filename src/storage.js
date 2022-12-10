import project from './project.js';

//projects contain tasks, tasks contain subtasks
//for now, we'll follow that hierachy

export default storage = (() => {
    //the default projects that can't be removed
    const allProjects = [];

    let currProjectIndex = indexCounter();
/*     let currSectionIndex = indexCounter(); */
    let currTaskIndex = indexCounter();
    let currSubtaskIndex = indexCounter();
    renderDefaultProjects();

    function renderDefaultProjects(){
        let inbox = project('Inbox');
        let today = project('Today');
        let thisweek = project('This Week');
        addProject(inbox);
        addProject(today);
        addProject(thisweek);
    }

    function addProject(project){
        allProjects.push(project);
        project.setIndex(currProjectIndex.currIndex);
        currProjectIndex.incrementIndex();
    }

    function removeProject(projectIndex){
        allProjects.forEach((project, index) => {
            if(project.getIndex() === projectIndex){
                allProjects.splice(index, 1);
            }
        })
    }




    return {allSections, allProjects, allTasks, currProjectIndex, currSectionIndex, currTaskIndex, currSubtaskIndex};
})();

