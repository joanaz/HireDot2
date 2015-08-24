app.directive('staffThumb', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/staff/staff-thumb.html',
    scope: {
      staff: '='
    }
  };
});