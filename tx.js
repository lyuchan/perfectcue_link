const net = require('net');
const HOST = '192.168.0.126'; // replace with the IP address of the remote server
const PORT = 3000; // replace with the port number you want to use
const socket = new net.Socket();
socket.connect(PORT, HOST, () => {
  console.log(`Connected to ${HOST}:${PORT}`);
});
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: 'COM7', baudRate: 115200 })

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', (data) => {

  switch (data) {
    case "page_up":
      //console.log("upup")
      socket.write("pageup");
      break;
    case "page_down":
      //console.log("downdown")
      socket.write("pagedown");
      break;
    case "esc":
      socket.write("escape");
      //console.log("escesc")
      break;
    case "b":
      socket.write("b");
      //console.log("bb")
      break;
    case "f5":
      socket.write("f5");
      //console.log("f5f5")
      break;
  }
})
socket.on('error', (err) => {
  console.error(`Error reading from client: ${err}`);
});
socket.on('close', () => {
  console.log('Disconnected from remote server');
});