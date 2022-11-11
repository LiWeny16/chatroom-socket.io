const http = require('http');
const express = require('express');
const path = require('path')
var app = express();
var server = http.createServer(app)
// var http = require('http').Server(app);
var io = require('socket.io')(server);
// var users=new Array[10]

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use("/source",express.static(path.join(__dirname+"/source")));

io.on('connection', function(socket){
  console.log('a user connected')

  socket.on("join", function (nickName) {
    // usocket[name] = socket
    io.emit("join", nickName)
    
  })

  socket.on("message", function (msg) {
    io.emit("message", msg) //将新消息广播出去
  })

  socket.on("disconnect",()=>{
    io.emit("disconnection")
  })
});

server.listen(3000, function() {
  console.log('listening on *:3000');
});