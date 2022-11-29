import {storage, taskIndex, project, task, subtask} from './task.js';
import {renderTasks} from './taskDOM.js';

//render inbox
(() => {
    const currTaskIndex = taskIndex();
    const render = renderTasks();
    const allTasks = [];
    const task1Test = task('Do something','Small Description',1,'12/31/2021','2 hr 40 min');
    const task2Test = task('Do something','Small Description',1,'12/31/2021','2 hr 40 min');
    allTasks.push(task1Test, task2Test);
    render.renderDefault([],allTasks);
})();

