var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');
var TOPIC = "js-arduino-end-point";

client.subscribe(TOPIC);

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

      console.log("before call LED()");
      LED(context);
      console.log("after call LED()");
      next();
  });

  Light.afterRemote('create',function(context, user, next) {
    console.log("+++ create afterRemote is called.");

    LED(context);

    next();
  });

  function LED(context){

      var state = context.req.body.lightState.toLowerCase();
      var id = context.req.body.lightID;
    
      console.log('state requested: '+state + ' for ID: '+id);

      console.log("before publish with client...");
      var payload = '{"lightID":'+id+',"lightState":"'+state+'"}';
      client.publish(TOPIC, payload);
      console.log("publish payload: "+payload);
  }
};
