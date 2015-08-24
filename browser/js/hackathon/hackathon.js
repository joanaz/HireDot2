app.config(function($stateProvider) {
    $stateProvider.state('hackathon', {
        url: '/hackathon',
        templateUrl: 'js/hackathon/hackathon.html',
        controller: 'HackathonController',
        resolve: {
            hackathons: (Hackathon) =>
                Hackathon.getHackathons()
        }
    });
});

app.controller('HackathonController', function($scope, hackathons) {
    $scope.hackathons = hackathons;
});