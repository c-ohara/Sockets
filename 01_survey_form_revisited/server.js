const express = require('express');
const app = express();
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const server = app.listen(1337);
const io = require('socket.io') (server);
var counter = 0;

io.on('connection', function (socket) {

    socket.emit('greeting', {msg: 'Greetings, from server Node, brought to you by Sockets! -Server'});
    socket.on('thankyou', function (data) {
        console.log(data.msg);
    });
    socket.on('posting_form', function (user) {
        console.log("Posting...")
        var user_info = {
            Name: user.info.Name,
            Location: user.info.Location,
            Language: user.info.Language,
            Comment: user.info.Comment
        }
        socket.emit('updated_message', {msg: "You emitted the following information to the server: " + JSON.stringify(user_info)});
        socket.emit('random_number', {msg: "Your lucky number emitted by the server is " + Math.ceil(Math.random() * 1000)});
    });
});

//GET Requests
app.get('/', (req,res) => {
    res.render('index');
});

//POST Requests
app.post('/posting_form', (req,res) => {
    console.log(req.body);
    req.session.Name = req.body.Name;
    req.session.Location = req.body.Location;
    req.session.Language = req.body.Language;
    req.session.Comment = req.body.Comment;
    res.redirect('/success')
})