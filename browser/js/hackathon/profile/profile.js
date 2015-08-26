app.config(function($stateProvider) {
    $stateProvider.state('hackathon-profile', {
        url: '/hackathon/:id',
        templateUrl: 'js/hackathon/profile/profile.html',
        resolve: {
            hackathon: ($stateParams, Hackathon) =>
                Hackathon.getHackathonById($stateParams.id)
        },
        controller: ($scope, hackathon) => {
            $scope.hackathon = hackathon;
        }
    });
});