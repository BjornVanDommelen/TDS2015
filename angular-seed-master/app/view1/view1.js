'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as ctrl'
  });
}])

.controller('View1Ctrl', function($scope) {
  var self = this;
  self.getUsers = function(){
    return [
      {
        'firstName': 'Bjorn',
        'lastName': 'van Dommelen'
      },
      {
        'firstName': 'Katarina',
        'lastName': 'Stojanovski'
      }
    ];
  };
  $scope.users = self.getUsers();
});