app.directive('companyThumb', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/company/company-thumb.html',
        scope: {
            theCompany: '=company'
        }
    };
});