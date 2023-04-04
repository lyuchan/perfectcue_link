const net = require('net');
const robot = require('robotjs');

const PORT = 3000; // replace with the port number you want to use

// create a server that listens for incoming client connections
const server = net.createServer((socket) => {
    console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

    // log any errors that occur
    socket.on('error', (err) => {
        console.error(`Error reading from client: ${err}`);
    });

    // handle incoming data from the client
    socket.on('data', (data) => {
        const key = Buffer.from(data).toString('latin1');
        console.log(key);
        robot.keyToggle(key, "down");
        robot.keyToggle(key, "up");
    });

    // handle the client disconnecting
    socket.on('close', () => {
        console.log(`Client disconnected from ${socket.remoteAddress}:${socket.remotePort}`);
    });
});

// start the server and log any errors that occur
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on('error', (err) => {
    console.error(`Error starting server: ${err}`);
});
