const express = require('express');
const app = express();
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const server = app.listen(6789);
const io = require('socket.io') (server);
var count = 0;

io.on('connection', function (socket) {

    socket.emit('greeting', {msg: 'Greetings, from server Node, brought to you by Sockets! -Server'});
    socket.emit('update', { count });

    socket.on('thankyou', function (data) {
        console.log(data.msg);
    });

    socket.on('AddOne', function() {
        count += 1;
        io.emit('update', { count })
    })

    socket.on('Reset', function() {
        count = 0;
        io.emit('update', { count });
    })
});

//GET Requests
app.get('/', (req,res) => {
    res.render('index');
});