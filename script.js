// script for homepage - textbored
let modalOkButton;
let modalClButton;
let lipsumShown = false;
const chatList = document.getElementById('chatList');
const modal = {
    open: function(title, content, okfunc, clfunc) {
        const modalContent = `<div id="modal-wrapper">
    <div id="modal">
        <h2>${title}</h2>
        <div>${content}</div>
        <div id="modal-btns">
            <button id="modal-cancel" onclick="modal.cancel(${clfunc}, this)" style="background: #555;">Cancel</button>
            <button id="modal-ok" onclick="modal.ok(${okfunc}, this)" style="background: #3ee668;">OK</button>
        </div>
    </div>
</div>`;
        chatList.insertAdjacentHTML('beforeend', modalContent);
        console.log('Opened modal with title ' + title);
        modalOkButton = document.getElementById('modal-ok');
        modalClButton = document.getElementById('modal-cancel');
    },
    ok: function(act, elem) { 
        rfar(act, elem);
    },
    cancel: function(act, elem) { 
        rfar(act, elem);
    }
};
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

// run function and remove
function rfar(action, element) {
    if (typeof action === 'function') {
        action();
    } else if (!action) {
    } else {
        console.log("Provided action isn't a function.");
    }
    element.parentElement.parentElement.parentElement.remove();
};

// new chat stuff
function newChat() {
    modal.open('New Chat', detailsObj);

    modalOkButton.onclick = () => {
        const name = document.getElementById('details-name').value;
        const link = document.getElementById('details-link').value;
        const col = document.getElementById('details-colour').value;
        const id = name.replaceAll(' ', '-');
        const chatObj = `<div class="chat" id="chat-${id}" onclick="window.open('./#')">
            <h3 style="text-decoration: underline ${col};">${name}</h3>
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

    modalClButton.onclick = () => {
        modalClButton.parentElement.parentElement.parentElement.remove();
    };
};

// remove chat
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