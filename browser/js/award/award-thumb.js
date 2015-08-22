app.directive('awardThumb', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/award/award-thumb.html',
    scope: {
      award: '='
    }
  };
});