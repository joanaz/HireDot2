app.directive('studentThumb', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/student/student-thumb.html',
    scope: {
      theStudent: '=student'
    }
  };
});