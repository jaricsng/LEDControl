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

module.exports = function(Light) {
  Light.getLightState = function(lightID, cb) {
    Light.findById(lightID, function(err, instance) {
      response = "Light with ID: " + instance.lightID + " is " + instance.lightState;
      cb(null, response);
      console.log(response);
    });
  }

  Light.remoteMethod(
    'getLightState', {
      http: {
        path: '/getLightState',
        verb: 'get'
      },
      accepts: {
        arg: 'id',
        type: 'number',
        http: {
          source: 'query'
        }
      },
      returns: {
        arg: 'name',
        type: 'string'
      }
    }
  );

  Light.afterRemote('upsert', function(context, user, next) {
    console.log("+++ upsert afterRemote is called.");
    var state = context.req.body.lightState.toLowerCase();
    var id = context.req.body.lightID;
    console.log('state requested: '+context.req.body.lightState + ' for ID: '+id);

    LED(id,state);

    next();
  });

  Light.afterRemote('create',function(context, user, next) {
    console.log("+++ create afterRemote is called.");
    var state = context.req.body.lightState.toLowerCase();
    var id = context.req.body.lightID;
    console.log('state requested: '+context.req.body.lightState + ' for ID: '+id);

    LED(id,state);

    next();
  });

  function LED(id, state){
    // on
    if(ON == state){
      led.on();
    }else if (OFF == state) {
      led.stop();
      led.off();
    } else if (BLINK == state){
      led.blink();
    } else  {
      console.log('state requested: '+context.req.body.lightState + " is invalid.");
    }
  }
};
