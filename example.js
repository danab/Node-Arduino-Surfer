
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendfile('index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

var five = require("johnny-five"),
	board = new five.Board();

board.on("ready", function() {

	var accelerometer = new five.Accelerometer({
		// z, y, x
		pins: ["A0", "A1", "A2"],
		autoCalibrate: true
	});

	accelerometer.on("change", function() {
		io.emit( 'accelerometer', [ this.x, this.y, this.z ] );
	});
});
