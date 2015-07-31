(function() {
  'use strict';

  angular
    .module('triangular.page')
    .filter('render', RenderFilter);

  RenderFilter.$inject = ['$sce'];
  
  function RenderFilter($sce) {
    return render;
    
    function render(input) {
      var renderedOutput = '';
      angular.forEach(input, function (componentPresentation) {
        renderedOutput += 'Schema=' + componentPresentation.Component.Schema.Title + '<br/>Template=' + componentPresentation.ComponentTemplate.Title;
      });
      return $sce.trustAsHtml(renderedOutput);
    }
  }
})();