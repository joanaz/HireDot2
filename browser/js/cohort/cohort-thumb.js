app.directive('cohortThumb', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/cohort/cohort-thumb.html',
        scope: {
            theCohort: '=cohort'
        }
    };
});