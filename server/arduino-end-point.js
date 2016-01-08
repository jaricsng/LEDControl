var five = require("johnny-five");
var board = new five.Board();
var led ;

var OFF = "off";
var ON = "on";
var BLINK = "blink";

board.on("ready", function() {
  led = new five.Led(13);
  //led.blink(500);
});

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
    led.on();
  }else if (OFF == state) {
    led.stop();
    led.off();
  } else if (BLINK == state){
    led.blink();
  } else  {
    console.log('state requested: '+ state + " is invalid.");
  }

}
