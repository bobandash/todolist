//render inbox
import UI from './ui.js';
import project from './project.js';
import storage from './storage.js';

(() => {
    renderDefaultProjects();
    UI.initialRender();

    function renderDefaultProjects(){
        let inbox = project('Inbox');
        let today = project('Today');
        let thisweek = project('This Week');
        storage.addProject(inbox);
        storage.addProject(today);
        storage.addProject(thisweek);
    }


})();

