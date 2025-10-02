// script for homepage
import { modal } from "./script.js";

let lipsumShown = false;
const chatList = document.getElementById('chatList');
const detailsObj = `<div>
    <label for="name">Name:</label>
    <input name="name" id="details-name" type="text">
    <br>
    <label for="link">Link (useless):</label>
    <input name="link" id="details-link" type="text">
    <br>
    <label for="colour">Underline colour:</label>
    <input name="colour" id="details-colour" type="color">
</div>`;

// new chat stuff
function newChat() {
    modal.open('New Chat', detailsObj);

    modalOkButton.onclick = () => {
        const name = document.getElementById('details-name').value;
        const link = document.getElementById('details-link').value;
        const col = document.getElementById('details-colour').value;
        const id = name.replaceAll(' ', '-');
        const chatObj = `<div class="chatDetails" id="chat-${id}" onclick="window.open('./#')">
            <h3 style="text-decoration: underline ${col} 3px;">${name}</h3>
            <div class="csettings">
                <i class="bi bi-pencil-square"></i>
                <i class="bi bi-trash-fill" onclick="removeChat('${id}')"></i>
            </div>
        </div>`;

        chatList.insertAdjacentHTML('beforeend', chatObj);
        console.log('Added chat ' + id);
        modalOkButton.parentElement.parentElement.parentElement.remove();

        if (document.getElementById('ntsh')) {
            document.getElementById('ntsh').remove();
        };
    };
};

// remove and edit chat
function removeChat(id) {
    if (confirm(`Are you sure you want to remove chat ${id}?`)) {
        document.getElementById('chat-' + id).remove();
        console.log('Removed chat ' + id)
    };
    // check if chatList is empty, if so put text
    if (chatList.innerHTML == `
                
            ` || chatList.innerHTML == '') {
        console.log('No chats')
        chatList.innerHTML = '<h3 id="ntsh">Nothing to see here... </h3>';
    };
};
function editChat(id) {
    console.log('edit chat ' + id);
};

// lorem ipsum
function lipsum(elem) {
    if (elem) {
        if (lipsumShown) {
            document.getElementById('lipsum').style.display = 'none';
            elem.innerHTML = 'Show Lorem Ipsum';
            lipsumShown = false;
            console.log('Lorem Ipsum Hidden')
        } else {
            document.getElementById('lipsum').style.display = 'block';
            elem.innerHTML = 'Hide Lorem Ipsum';
            lipsumShown = true;
            console.log('Lorem Ipsum Shown')
        };
    };
};