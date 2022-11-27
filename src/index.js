const motivationalMessageDOM = () => {
    function createMotivationalMessage(motivationalMessageObj){
        const body = document.querySelector('body');
        const parentDiv = motivationalMessageContainer();
        parentDiv.appendChild(motivationalMessageHeader(motivationalMessageObj.header));
        parentDiv.appendChild(motivationalMessage(motivationalMessageObj.message));
        parentDiv.appendChild(motivationalAuthor(motivationalMessageObj.author));
        body.appendChild(parentDiv);
    }


    function motivationalMessageContainer(){
        const container = document.createElement('div');
        container.classList.add('content-margin');
        container.setAttribute('id','motivational-message');
        return container;
    }

    function motivationalMessageHeader(headerText) {
        const headerDiv = document.createElement('div');
        headerDiv.setAttribute('id','motivational-message-header');

        const invisibleButtonsDiv = buttonsDiv(false);
        invisibleButtonsDiv.classList.add('invisible-elements');

        const visibleButtonsDiv = buttonsDiv(true);

        const motivationalMessage = document.createElement('p');
        motivationalMessage.innerText = headerText;

        headerDiv.appendChild(invisibleButtonsDiv);
        headerDiv.appendChild(motivationalMessage);
        headerDiv.appendChild(visibleButtonsDiv);

        return headerDiv;
    }

    function buttonsDiv(isVisible) {
        const buttonsDiv = document.createElement('div');
        
        const settingsBtn = document.createElement('button');
        const settingsIcon = document.createElement('i');
        settingsIcon.classList.add('fa-solid');
        settingsIcon.classList.add('fa-gear');
        settingsBtn.appendChild(settingsIcon);

        const closeBtn = document.createElement('button');
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fa-solid');
        closeIcon.classList.add('fa-x');
        closeBtn.appendChild(closeIcon);

        buttonsDiv.appendChild(settingsBtn);
        buttonsDiv.appendChild(closeBtn);

        if(isVisible){
            settingsBtn.setAttribute('id','motivational-message-settings-btn');
            closeBtn.setAttribute('id', 'motivational-message-close-btn');     
        }
        else {
            buttonsDiv.classList.add('invisible-elements');
        }

        return buttonsDiv;
    }

    function motivationalMessage(message) {
        const messageParagraph = document.createElement('p');
        messageParagraph.innerText = message;
        return messageParagraph;
    }

    function motivationalAuthor(author) {
        const messageAuthor = document.createElement('p');
        messageAuthor.innerText = author;
        return messageAuthor;        
    }

    return {createMotivationalMessage};
}

const motivationalMessageDOMFunctionality = () => {
    function addSettingBtnFunctionality(){
        const settingBtn = document.getElementById('motivational-message-settings-btn');
    }
    
    function createModalForm() {
        
    }

    function addCloseBtnFunctionality() {
        const closeBtn = document.getElementById('motivational-message-close-btn');
        closeBtn.addEventListener('click', function() {
            const motivationalMessageDiv = document.getElementById('motivational-message');
            motivationalMessageDiv.remove();
        })  
    }

    function addBtnFunctionality() {
        addCloseBtnFunctionality();
        addSettingBtnFunctionality();
    }

    return {addBtnFunctionality};
}

const addMotivationalMessage = () => {
    const motivationalMessagesArray = [];
    const DOM = motivationalMessageDOM();
    const btnFunctionality = motivationalMessageDOMFunctionality();
    //object declaration for motivational messages
    function motivationalMessage(header, message, author = ''){
        return {header, message, author};
    }

    //preset methods for motivational message
    function addDefaultMotivationalMessages() {
        const motivationalMessage1 = motivationalMessage('Motivational Message','Yesterday you said tomorrow, so just do it. Don\'t let your dreams be dreams.','Shia LaBeouf');
        const motivationalMessage2 =  motivationalMessage('Motivational Message',"The most important investment you can make is in yourself.",'Warren Buffett');
        const motivationalMessage3 = motivationalMessage('Personal Message','You can play Pokemon if you finish coding this to-do list.','Bruce');
        motivationalMessagesArray.push(motivationalMessage3);
    }

    function chooseOneMotivationalMessage() {
        const random = Math.floor(Math.random() * motivationalMessagesArray.length);
        return motivationalMessagesArray[random];
    }

    function deleteMessage(index) {
        motivationalMessagesArray.splice(index, 1);
    }

    function renderDefaultMessages() {
        addDefaultMotivationalMessages();
        DOM.createMotivationalMessage(chooseOneMotivationalMessage());
        btnFunctionality.addBtnFunctionality();
    }

    return {renderDefaultMessages, deleteMessage};
}

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