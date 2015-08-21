app.directive('projectThumb', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/project/project-thumb.html',
    scope: {
      theProject: '=project'
    }
  };
});