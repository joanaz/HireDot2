app.config(function($stateProvider) {
    $stateProvider.state('award', {
        url: '/award',
        templateUrl: 'js/award/award.html',
        resolve: {
            awards: (Award) => Award.getAwards()
        },
        controller: ($scope, awards) => {
            $scope.awards = awards;
        }
    });
});