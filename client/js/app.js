angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('light', {
        url: '',
        templateUrl: 'views/light.html',
        controller: 'LightController'
      });

    $urlRouterProvider.otherwise('light');
  }]);
