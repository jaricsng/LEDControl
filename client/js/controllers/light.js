angular
  .module('app')
  .controller('LightController', ['$scope', '$state', 'Light', function($scope,
      $state, Light) {
    $scope.lights = [];
    $scope.newLight = {};

    function getLights() {
      Light
        .find()
        .$promise
        .then(function(results) {
          $scope.lights = results;
        });
    }
    getLights();

    $scope.onLight = function(){
      console.log("onLight is called.");
      $scope.newLight.lightState = "on";
      $scope.newLight.lightID = 13;
      console.log("lightState : "+$scope.newLight.lightState);
      console.log("lightID : "+$scope.newLight.lightID);
      $scope.setLight();
    };

    $scope.offLight = function(){
      console.log("offLight is called.");
      $scope.newLight.lightState = "off";
      $scope.newLight.lightID = 13;
      console.log("lightState : "+$scope.newLight.lightState);
      console.log("lightID : "+$scope.newLight.lightID);
      $scope.setLight();
    };

    $scope.blinkLight = function(){
      console.log("blinkLight is called.");
      $scope.newLight.lightState = "blink";
      $scope.newLight.lightID = 13;
      console.log("lightState : "+$scope.newLight.lightState);
      console.log("lightID : "+$scope.newLight.lightID);
      $scope.setLight();
    };

    $scope.setLight = function() {
      console.log("setLight is called.");
      $scope.newLight.lightID = 13;
      console.log("newLight : "+$scope.newLight.lightState);
      console.log("newLight : "+$scope.newLight.lightID);
      Light
        .upsert($scope.newLight)
        .$promise
        .then(function(light) {
          $scope.lightForm.lightState.$setPristine();
          $scope.lightForm.lightID.$setPristine();
          $('.focus').focus();
          getLights();
        });
    };
  }]);
