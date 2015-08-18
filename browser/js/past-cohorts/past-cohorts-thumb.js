app.directive('pastCohortThumbnail', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/past-cohorts/past-cohorts-thumb.html',
    scope: {
      theCohort: '=cohort'
    }
  };
});