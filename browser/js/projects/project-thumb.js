app.directive('projectThumbnail', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/projects/project-thumb.html',
    scope: {
      theProject: '=project'
    }
  };
});