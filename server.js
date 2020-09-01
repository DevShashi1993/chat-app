const express = require('express');
const { log } = require('console');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});


// configure socket.io
io.on('connection', (socket)=> {
    console.log('Connected...');
    // broadcast msg to all server on recieving message from sender
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
})


