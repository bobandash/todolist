/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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


const addMotivationalMessage = () => {
    const motivationalMessagesArray = [];
    const DOM = motivationalMessageDOM();

    //object declaration for motivational messages
    function motivationalMessage(header, message, author = ''){
        return {header, message, author};
    }

    //preset methods for motivational message
    function addDefaultMotivationalMessages() {
        const motivationalMessage1 = motivationalMessage('Motivational Message','Yesterday you said tomorrow, so just do it. Don\'t let your dreams be dreams.','Shia LaBeouf');
        const motivationalMessage2 =  motivationalMessage('Motivational Message',"The most important investment you can make is in yourself.",'Warren Buffett');
        const motivationalMessage3 = motivationalMessage('Personal Message','You can play Pokemon if you finish coding this to-do list.','Bruce');
        motivationalMessagesArray.push(motivationalMessage1, motivationalMessage2, motivationalMessage3);
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
    }

    return {renderDefaultMessages, deleteMessage};
}


//render inbox
const renderInbox = (() => {
    const motivationalMessages = addMotivationalMessage();
    motivationalMessages.renderDefaultMessages();
})();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2VET00gPSAoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVNb3RpdmF0aW9uYWxNZXNzYWdlKG1vdGl2YXRpb25hbE1lc3NhZ2VPYmope1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICAgICAgY29uc3QgcGFyZW50RGl2ID0gbW90aXZhdGlvbmFsTWVzc2FnZUNvbnRhaW5lcigpO1xyXG4gICAgICAgIHBhcmVudERpdi5hcHBlbmRDaGlsZChtb3RpdmF0aW9uYWxNZXNzYWdlSGVhZGVyKG1vdGl2YXRpb25hbE1lc3NhZ2VPYmouaGVhZGVyKSk7XHJcbiAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKG1vdGl2YXRpb25hbE1lc3NhZ2UobW90aXZhdGlvbmFsTWVzc2FnZU9iai5tZXNzYWdlKSk7XHJcbiAgICAgICAgcGFyZW50RGl2LmFwcGVuZENoaWxkKG1vdGl2YXRpb25hbEF1dGhvcihtb3RpdmF0aW9uYWxNZXNzYWdlT2JqLmF1dGhvcikpO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQocGFyZW50RGl2KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZUNvbnRhaW5lcigpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250ZW50LW1hcmdpbicpO1xyXG4gICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywnbW90aXZhdGlvbmFsLW1lc3NhZ2UnKTtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbE1lc3NhZ2VIZWFkZXIoaGVhZGVyVGV4dCkge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGhlYWRlckRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywnbW90aXZhdGlvbmFsLW1lc3NhZ2UtaGVhZGVyJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGludmlzaWJsZUJ1dHRvbnNEaXYgPSBidXR0b25zRGl2KGZhbHNlKTtcclxuICAgICAgICBpbnZpc2libGVCdXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZS1lbGVtZW50cycpO1xyXG5cclxuICAgICAgICBjb25zdCB2aXNpYmxlQnV0dG9uc0RpdiA9IGJ1dHRvbnNEaXYodHJ1ZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbW90aXZhdGlvbmFsTWVzc2FnZS5pbm5lclRleHQgPSBoZWFkZXJUZXh0O1xyXG5cclxuICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQoaW52aXNpYmxlQnV0dG9uc0Rpdik7XHJcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKG1vdGl2YXRpb25hbE1lc3NhZ2UpO1xyXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZCh2aXNpYmxlQnV0dG9uc0Rpdik7XHJcblxyXG4gICAgICAgIHJldHVybiBoZWFkZXJEaXY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYnV0dG9uc0Rpdihpc1Zpc2libGUpIHtcclxuICAgICAgICBjb25zdCBidXR0b25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBjb25zdCBzZXR0aW5nc0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgc2V0dGluZ3NJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XHJcbiAgICAgICAgc2V0dGluZ3NJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLWdlYXInKTtcclxuICAgICAgICBzZXR0aW5nc0J0bi5hcHBlbmRDaGlsZChzZXR0aW5nc0ljb24pO1xyXG5cclxuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IGNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBjbG9zZUljb24uY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnKTtcclxuICAgICAgICBjbG9zZUljb24uY2xhc3NMaXN0LmFkZCgnZmEteCcpO1xyXG4gICAgICAgIGNsb3NlQnRuLmFwcGVuZENoaWxkKGNsb3NlSWNvbik7XHJcblxyXG4gICAgICAgIGJ1dHRvbnNEaXYuYXBwZW5kQ2hpbGQoc2V0dGluZ3NCdG4pO1xyXG4gICAgICAgIGJ1dHRvbnNEaXYuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xyXG5cclxuICAgICAgICBpZihpc1Zpc2libGUpe1xyXG4gICAgICAgICAgICBzZXR0aW5nc0J0bi5zZXRBdHRyaWJ1dGUoJ2lkJywnbW90aXZhdGlvbmFsLW1lc3NhZ2Utc2V0dGluZ3MtYnRuJyk7XHJcbiAgICAgICAgICAgIGNsb3NlQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnbW90aXZhdGlvbmFsLW1lc3NhZ2UtY2xvc2UtYnRuJyk7ICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlLWVsZW1lbnRzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBidXR0b25zRGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbE1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgbWVzc2FnZVBhcmFncmFwaC5pbm5lclRleHQgPSBtZXNzYWdlO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlUGFyYWdyYXBoO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vdGl2YXRpb25hbEF1dGhvcihhdXRob3IpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlQXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIG1lc3NhZ2VBdXRob3IuaW5uZXJUZXh0ID0gYXV0aG9yO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlQXV0aG9yOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtjcmVhdGVNb3RpdmF0aW9uYWxNZXNzYWdlfTtcclxufVxyXG5cclxuXHJcbmNvbnN0IGFkZE1vdGl2YXRpb25hbE1lc3NhZ2UgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5ID0gW107XHJcbiAgICBjb25zdCBET00gPSBtb3RpdmF0aW9uYWxNZXNzYWdlRE9NKCk7XHJcblxyXG4gICAgLy9vYmplY3QgZGVjbGFyYXRpb24gZm9yIG1vdGl2YXRpb25hbCBtZXNzYWdlc1xyXG4gICAgZnVuY3Rpb24gbW90aXZhdGlvbmFsTWVzc2FnZShoZWFkZXIsIG1lc3NhZ2UsIGF1dGhvciA9ICcnKXtcclxuICAgICAgICByZXR1cm4ge2hlYWRlciwgbWVzc2FnZSwgYXV0aG9yfTtcclxuICAgIH1cclxuXHJcbiAgICAvL3ByZXNldCBtZXRob2RzIGZvciBtb3RpdmF0aW9uYWwgbWVzc2FnZVxyXG4gICAgZnVuY3Rpb24gYWRkRGVmYXVsdE1vdGl2YXRpb25hbE1lc3NhZ2VzKCkge1xyXG4gICAgICAgIGNvbnN0IG1vdGl2YXRpb25hbE1lc3NhZ2UxID0gbW90aXZhdGlvbmFsTWVzc2FnZSgnTW90aXZhdGlvbmFsIE1lc3NhZ2UnLCdZZXN0ZXJkYXkgeW91IHNhaWQgdG9tb3Jyb3csIHNvIGp1c3QgZG8gaXQuIERvblxcJ3QgbGV0IHlvdXIgZHJlYW1zIGJlIGRyZWFtcy4nLCdTaGlhIExhQmVvdWYnKTtcclxuICAgICAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlMiA9ICBtb3RpdmF0aW9uYWxNZXNzYWdlKCdNb3RpdmF0aW9uYWwgTWVzc2FnZScsXCJUaGUgbW9zdCBpbXBvcnRhbnQgaW52ZXN0bWVudCB5b3UgY2FuIG1ha2UgaXMgaW4geW91cnNlbGYuXCIsJ1dhcnJlbiBCdWZmZXR0Jyk7XHJcbiAgICAgICAgY29uc3QgbW90aXZhdGlvbmFsTWVzc2FnZTMgPSBtb3RpdmF0aW9uYWxNZXNzYWdlKCdQZXJzb25hbCBNZXNzYWdlJywnWW91IGNhbiBwbGF5IFBva2Vtb24gaWYgeW91IGZpbmlzaCBjb2RpbmcgdGhpcyB0by1kbyBsaXN0LicsJ0JydWNlJyk7XHJcbiAgICAgICAgbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheS5wdXNoKG1vdGl2YXRpb25hbE1lc3NhZ2UxLCBtb3RpdmF0aW9uYWxNZXNzYWdlMiwgbW90aXZhdGlvbmFsTWVzc2FnZTMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNob29zZU9uZU1vdGl2YXRpb25hbE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbW90aXZhdGlvbmFsTWVzc2FnZXNBcnJheS5sZW5ndGgpO1xyXG4gICAgICAgIHJldHVybiBtb3RpdmF0aW9uYWxNZXNzYWdlc0FycmF5W3JhbmRvbV07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlTWVzc2FnZShpbmRleCkge1xyXG4gICAgICAgIG1vdGl2YXRpb25hbE1lc3NhZ2VzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJEZWZhdWx0TWVzc2FnZXMoKSB7XHJcbiAgICAgICAgYWRkRGVmYXVsdE1vdGl2YXRpb25hbE1lc3NhZ2VzKCk7XHJcbiAgICAgICAgRE9NLmNyZWF0ZU1vdGl2YXRpb25hbE1lc3NhZ2UoY2hvb3NlT25lTW90aXZhdGlvbmFsTWVzc2FnZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge3JlbmRlckRlZmF1bHRNZXNzYWdlcywgZGVsZXRlTWVzc2FnZX07XHJcbn1cclxuXHJcblxyXG4vL3JlbmRlciBpbmJveFxyXG5jb25zdCByZW5kZXJJbmJveCA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBtb3RpdmF0aW9uYWxNZXNzYWdlcyA9IGFkZE1vdGl2YXRpb25hbE1lc3NhZ2UoKTtcclxuICAgIG1vdGl2YXRpb25hbE1lc3NhZ2VzLnJlbmRlckRlZmF1bHRNZXNzYWdlcygpO1xyXG59KSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==