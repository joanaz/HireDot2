app.directive('hackathonThumb', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/hackathon/hackathon-thumb.html',
    scope: {
      theHackathon: '=hackathon'
    }
  };
});