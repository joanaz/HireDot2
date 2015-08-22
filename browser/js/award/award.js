app.config(function($stateProvider) {
    $stateProvider.state('award', {
        url: '/award',
        templateUrl: 'js/award/award.html',
        controller: 'AwardController',
        resolve: {
            awards: (Award) =>
                Award.getAwards()
        }
    });
});

app.controller('AwardController', function($scope, awards) {
    console.log(awards);
    $scope.awards = awards;
});