/* TEXTBORED CLIENT */
// 📋 VARIABLES
let currentURL = new URL(window.location.href);
let params = new URLSearchParams(currentURL.search);

const ws = new WebSocket(params.get('server') || 'ws://localhost:8080');
const thisUrl = new URL(window.location.href)
const chat = document.getElementById('chat');
const msgBar = document.getElementById('usrMessage');
const settings = {
    wrapper: document.getElementById('settings').parentElement,
    name: document.getElementById('usrName'),
    col: document.getElementById('usrCol'),
    opened: false,
    openClose() {
        if (this.opened) {
            this.wrapper.style.display = 'none';
            this.opened = false;
        } else {
            this.wrapper.style.display = 'block';
            this.opened = true;
        }
    },
    save() {
        un = this.name.value || un;
        col = this.col.value || col;
        console.log('Settings saved!');
        this.openClose();
    }
}

let un;
let col;

// 🛠️ FUNCTIONS
// get a random colour
function getRandomColour() {
    const letters = '0123456789ABCDEF';
    let colour = '#';
    for (let i = 0; i < 6; i++) {
        colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
}

// parse json to html
function j2hparse(jsonMsg) {
    let data=()=>{
        try {
            return JSON.parse(jsonMsg);
        } catch (error) {
            return {
                type: "unable"
            };
        }
    }
    const msg = data();
    
    // const time = convertTo12Hr(msg.timestamp);
    const time = new Date(msg.time).toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit'});

    const messages = {
        join: `<div class="message jl">
    <strong class="username" style="border-color: ${msg.colour};">${msg.username}</strong>
    <div class="content">has joined the chat.</div>
    <small class="timestamp">${time}</small>
</div>`,
        leave: `<div class="message jl">
    <strong class="username" style="border-color: ${msg.colour};">${msg.username}</strong>
    <div class="content">has left the chat.</div>
    <small class="timestamp">${time}</small>
</div>`,
        normal: `<div class="message">
    <strong class="username" style="border-color: ${msg.colour};">${msg.username}</strong>
    <small class="timestamp">${time}</small>
    <div class="content">${msg.message}</div>
</div>`,
        unable: `<p style='color: red;'>Unable to parse received message...</p>`
    }

    switch (msg.type.toUpperCase()) {
        case "NORMAL":
            return messages.normal;
        case "JOIN":
            return messages.join;
        case "LEAVE":
            return messages.leave;
        default:
            console.error('Unable to parse message: ' + jsonMsg)
            return messages.unable;
    }
}

// add a message to chat div
function addMessage(jsonMsg) {
    chat.insertAdjacentHTML('beforeend', j2hparse(jsonMsg));
}

// send a message to the websocket server
function sendMessage() {
    if (msgBar.value != "") {
        const msg = JSON.stringify({
            type: 'normal',
            username: un,
            colour: col,
            message: msgBar.value,
            time: new Date().toUTCString()
        });
        ws.send(msg);
        msgBar.value = "";
    }
    // rate limit
    let lastTime = new Date();
    return ()=>{
        const now = new Date();
        if ((now - lastTime) < 10000) return;
        lastTime = now;
    }
}

function customServer() {
    const input = prompt("Enter your server URL (eg wss://echo.websocket.org/)");
    if (!input) return;
    let url;
    try {
        url = new URL(input);
    } catch (e) {
        try {
            url = new URL('ws://' + input);
        } catch (e2) {
            alert('Invalid server URL');
            return;
        }
    }
    params.set("server", url.toString());
    currentURL.search = params.toString();
    window.location.href = currentURL.toString();
}

// 🔌 WEBSOCKET STUFF
// send a join message on connection open
ws.onopen = () => {
    console.log("Connection initialised!")
    chat.insertAdjacentHTML('beforeend', '<h2>Connection initialised!</h2>');
    ws.send(JSON.stringify({
        type: 'join',
        username: un,
        colour: col,
        time: new Date().toUTCString()
    }));
}

// add message to dom on message
ws.onmessage = (event) => {
    addMessage(event.data);
}

// connection error and close handler
ws.onerror = (event) => {
    alert('Error!');
    console.error(event);
}

ws.onclose = (event) => {
    alert('Connection has closed.');
    chat.insertAdjacentHTML('beforeend', '<h2>Connection has closed.</h2>');
    console.error(event);
}

// 🧩 OTHER STUFF
// random username and colour on page load, cookies to be implemented later
window.onload =()=> {
    un = `user${Math.floor(Math.random() * 999) * 10}`;
    col = getRandomColour();
}

// send message on enter key in message bar
msgBar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
}); 