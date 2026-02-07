/* TEXTBORED WEBSOCKET SERVER */
import sanitizeHtml from 'sanitize-html';

const connectedClients = new Set();
const sanitizeOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'img', 'marquee', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'br', 'ul', 'ol', 'li'],
    allowedAttributes: {
        'a': [ 'href' ],
        'img': [ 'src', 'height', 'width' ],
        'span': [ 'style' ]
    }
}

Deno.serve((req) => {
    // see if client is trying to upgrade to websockets, if not give a status of 426
    if (req.headers.get("upgrade") != "websocket") {
        return new Response(null, { status: 426 });
    }

    // then upgrade the request to a websocket
    const { socket, response } = Deno.upgradeWebSocket(req);

    // client connection open and close handler
    socket.onopen = () => {
        console.log(`A client has connected`);
        connectedClients.add(socket);
    };
    socket.onclose = () => {
        console.log(`A client has disconnected`);
        // add leave message
        // SINCE WHEN WAS COPILOT INTEGRATED IN VS CODE
        connectedClients.delete(socket);
    };

    // message handler
    socket.onmessage = (event) => {
        console.log("Recieved message");
        connectedClients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(sanitizeHtml(event.data, sanitizeOptions));
            };
        });
    };
    return response;
});