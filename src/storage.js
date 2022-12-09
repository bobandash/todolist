storage = (() => {
    const indexCounter = () => {
        let currIndex = 0;
        function incrementIndex() {
            currIndex = currIndex + 1;
        }
        return {currIndex, incrementIndex};
    }

    let projectIndex = indexCounter();
    let sectionIndex = indexCounter();
    let taskIndex = indexCounter();
    let subtaskIndex = indexCounter();

    const allProjects = [];
    const allSections = [];
    const allTasks = [];
    return {allSections, allProjects, allTasks};
})()

