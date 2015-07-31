'use strict';

angular.module('triangular', [])

// TODO: move to script file for controller

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    template: '<ng-include src="pageView"></ng-include>',
    controller: 'PageController as pageController'
  });
}])
  
.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}])

// TODO: move page controller to separate script file

.controller('PageController', function($scope, $location) {
  // TODO: refactory this so it uses proper variable names as per recommended standard
  var self = this;
  self.getPageModel = function(path){
    console.log('Original path is ' + path);
    // Use extensionless URLs
    // Append .html or default.html depending on if we end with a /
    // If path is empty make path equal to /
    // TODO: move this to a factory or service
    if (!path) {
      path = '/';
    }
    if (path.indexOf('.html', path.length - 5) !== -1) {
      // Don't adjust path for pages ending in .html
    }
    else {
      path = path.indexOf('/', path.length - 1) !== -1 ? path + 'default.html' : path + '.html';
    }
    var serviceUri = "http://azeroth.local:83/odata.svc/";
    var requestUri = serviceUri + 'Pages' +
      '?$filter=Url+eq+%27' + path + '%27' +
      '&$format=json' +
      '&$expand=PageContent';
    // TODO: move this to a factory or service
    console.log('Requesting ' + requestUri);
    OData.read(requestUri, function (data) {
      var matchingPages = data.results;
      if (matchingPages.length === 0) {
        // This represents a 404 error (there is no page in Tridion with this URL)
        // TODO: handle this
        console.error("404! Panic!");
      }
      else {
        var pageContent = data.results[0].PageContent.Content;
        $scope.$apply(function () {
          $scope.page = JSON.parse(pageContent);
          // TODO: use a factory to determine the correct view from the page
          $scope.pageView = '/pageViews/' + $scope.page.PageTemplate.Title + '.html';
        });
      }
    }, function (err) {
        // TODO: properly handle this error
        console.error(JSON.stringify(err));
    });
  };
  self.getPageModel($location.path());
});