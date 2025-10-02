/* TEXTBORED REWRITE */
// variables
// const ws = new WebSocket('ws://localhost:8000');
const chat = document.getElementById('chat');
let un;
let col;

// function to get a random colour
function getRandomColour() {
    let letters = '0123456789ABCDEF';
    let colour = '#';
    for (var i = 0; i < 6; i++) {
        colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
}

// convert 24 hour to 12 hour time
function convertTo12Hr(time24) {
    let [hours, minutes] = time24.split(":").map(Number); 
    let period;
    if (hours >= 12) {
        period = "PM";
    } else {
        period = "AM";
    }
    hours = hours % 12 || 12; 
     if (minutes < 10) {
        minutes = "0" + minutes; 
    }
    return hours + ":" + minutes + " " + period;
}

// parse json to html
function j2hparse(jsonMsg) {
    const msg = JSON.parse(jsonMsg)
    const time = convertTo12Hr(msg.timestamp);

    let messages = {
        join: `<div class="message jl">
    <strong class="username" style="border-color: ${msg.colour};">${msg.username}</strong>
    <div class="content">has joined the chat.</div>
    <small class="timestamp">${time}</small>
</div>`,
        leave: `<div class="message jl">
    <strong class="username" style="border-color: ${msg.colour};">${msg.username}</strong>
    <div class="content">has joined the chat.</div>
    <small class="timestamp">${time}</small>
</div>`,
        normal: `<div class="message">
    <strong class="username" style="border-color: ${msg.colour};">${msg.username}</strong>
    <small class="timestamp">${time}</small>
    <div class="content">${msg.message}</div>
</div>`,
        unable: `<p style='color: red;'>Unable to parse received message...</p>`
    }

    switch (msg.type) {
        case "message":
            return messages.normal;
        case "join":
            return messages.join;
        case "leave":
            return messages.leave;
        default:
            return messages.unable;
    };
};

// add a message to chat
function addMessage(jsonMsg) {
    chat.insertAdjacentHTML('beforeend', j2hparse(jsonMsg));
};

/* to be done later // set username and colour on page load
window.onload = () => {
    un = 'user' + Math.round(Math.random() * 999);
    col = getRandomColour();
};

// send a join message on connection open
ws.onopen = () => {
    ws.send(JSON.stringify({
        type: 'join',
        username: un,
        colour: col,
        time: new Date().toISOString()
    }));
};

// connection error and close handler
ws.onerror = (event) => {
    alert('Error! ' + event);
};

ws.close = (event) => {
    alert('Connection has closed. ' + event);
};

ws.onmessage = (event) => {
}; */