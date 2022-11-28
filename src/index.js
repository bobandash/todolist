import {addMotivationalMessage} from './motivationalMessage.js'


//render inbox
const initialRender = (() => {
    const motivationalMessages = addMotivationalMessage();
    motivationalMessages.renderDefaultMessages();
})();

const createTaskDOM = () => {
    const elemContainerDOM = () => {
        const containerDiv = document.createElement('div');
        containerDiv.setAttribute('id','content-margin');
        return containerDiv;
    }
    
    const mainHeaderDOM = () => {
        function containerDiv(){
            const headerDiv = document.createElement('div');
            headerDiv.setAttribute('id','inbox-header');
            
            return headerDiv;
        }
    
        function headingText() {
            const heading = document.createElement('h1');
            heading.classList.add('header-type');
            heading.innerText = Inbox;
            return heading;
        }
    
        function headerIcons() {
            const headerIconDiv = document.createElement('div');
            headerIconDiv.classList.add('header-icon');
    
            const folderIcon = document.createElement('i');
            folderIcon.classList.add('fa-sold','fa-folder-plus');
    
            const taskIcon = document.createElement('i');
            taskIcon.classList.add('fa-solid','fa-square-plus');
    
            headerIconDiv.appendChild(folderIcon);
            headerIconDiv.appendChild(taskIcon);
    
            return headerIconDiv;
        }
    
        function getHeaderDOM() {
            const container = containerDiv();
            const header = headingText();
            const headerIconsDiv = headerIcons();
            container.appendChild(header);
            container.appendChild(headerIconsDiv);
            return container;
        }
    
        return {getHeaderDOM};
    }
}


/* 
<div class = "section">
    <div class = "section-header">
        <h2 class = "section-title">Hello my name is Bruce</h2>
        <div class = "section-dropdown"><i class="fa-solid fa-caret-down"></i></div>
    </div>
    <div class = "task">
        <div class = "complete-task-btn">
            <i class="fa-regular fa-circle"></i>
        </div>
        <div class = "task-title">Do something that works Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex reprehenderit optio excepturi saepe dolore voluptatibus recusandae iure quaerat dicta non!
        <div class = "task-description">tst</div>
        </div>
        <div class = "button-icons">
            <i class="fa-solid fa-square-plus"></i>
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>
    <div class = "subtask">
        <div class = "complete-task-btn">
            <i class="fa-regular fa-circle"></i>
        </div>
        <div class = "task-title">Do something that works Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex reprehenderit optio excepturi saepe dolore voluptatibus recusandae iure quaerat dicta non!</div>
        <div class = "button-icons">
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>            
</div>
</div>
 */