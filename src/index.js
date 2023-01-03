//render inbox
import UI from './ui.js';
import project from './project.js';
import task from './task.js'
import storage from './storage.js';
import '@fortawesome/fontawesome-free/css/all.css'
import 'js-datepicker/dist/datepicker.min.css';

(() => {
    renderDefaultProjects();

    UI.initialRender();

    function renderDefaultProjects(){
        let inbox = project('Inbox');
/*         let today = project('Today');
        let thisweek = project('This Week'); */
        let haveFun = task("Have Fun","Learn a lot while having fun");
        storage.addProject(inbox);
        inbox.addTask(haveFun);
/*         storage.addProject(today);
        storage.addProject(thisweek); */
    }


})();

