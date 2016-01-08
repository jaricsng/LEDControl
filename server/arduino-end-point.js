var five = require("johnny-five");
var board = new five.Board();
var led ;

var OFF = "off";
var ON = "on";
var BLINK = "blink";

var onStr = "";
var offStr = "";
var blinkStr = "";

var arduinoConnected = false;

var fs = require("fs");

fs.readFile("./server/ascii-on.txt","utf-8", function (err, data) {
    if (err) throw err;
    onStr = data;
});

fs.readFile("./server/ascii-off.txt","utf-8", function (err, data) {
    if (err) throw err;
    offStr = data;
});

fs.readFile("./server/ascii-blink.txt","utf-8", function (err, data) {
    if (err) throw err;
    blinkStr = data;
});

if (arduinoConnected){
    board.on("ready", function() {
	led = new five.Led(13);
	//led.blink(500);
    });
}

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');

var TOPIC = "js-arduino-end-point";

console.log("before client on");
client.on('connect', function() {
  console.log("subscribe to: "+TOPIC);
  client.subscribe(TOPIC);
});

client.on('message', function(topic, message) {
  // message is Buffer
  var str = message.toString();
  console.log("str = "+ str);
  var ledState = JSON.parse(str);
  console.log(ledState);

  console.log("lightState = "+ledState.lightState);
  console.log("lightID = "+ledState.lightID);
  //client.end();
  setLight(ledState.lightID, ledState.lightState);
});

function setLight(otherId, otherState){
  var state = otherState;
  var id = otherId;

  console.log('state requested: '+state + ' for ID: '+id);

    if(ON == state){
	if(arduinoConnected){
	    led.on();
	}
	console.log(onStr);
  }else if (OFF == state) {
	if(arduinoConnected){
	    led.stop();
	    led.off();
	}
      console.log(offStr);
  } else if (BLINK == state){
	if(arduinoConnected){
	    led.blink();
	}
      console.log(blinkStr);
  } else  {
    console.log('state requested: '+ state + " is invalid.");
  }

}
