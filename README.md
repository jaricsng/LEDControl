# LED Control

Using StrongLoop to rapid proto type application for proof of concept and demostration.
Wtth IBM purchased of StrongLoop, I need to be familiar with it and the best way to do that is to develop.

## Project 1 
started with a demo where I developed a web appliction which works locally on my notebook controlling a LED on a Arduino board.

### Overview
It uses
- [AngularJS](https://angularjs.org/)
- [StrongLoop](https://strongloop.com/)/NodeJS
- [Johnny-Five](http://johnny-five.io/)
- Arduino Board starter kit bought at [Sgbotic](http://www.sgbotic.com/)

## Project 2
Beside StrongLoop, I am given expanded role to look into [Bluemix](https://console.ng.bluemix.net/), so I wanted to put this demo on the Bluemix and yet I would like to control my Arduino board LED.

I was considering to use 
- websocket
- mqtt

In the spirit of agile and show how to manage two speed IT, I decided to use mqtt.

In this project (mqtt-web), I modified Project 1, where I make use of [mosquitto](http://mosquitto.org/) test broker (mqtt://test.mosquitto.org), to send LED command (publish) via the broker. A separate nodeJS app was created to listen (subscribe) to command from the web appliation hosted in Bluemix via the test broker.

It uses
- mosquitto - mqtt
- Bluemix - StrongLoop loopback starter app 

[Diagram](https://github.com/rwaldron/johnny-five/blob/master/docs/repl.md) of connecting the LED on Arduino.
