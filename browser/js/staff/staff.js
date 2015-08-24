app.config(function($stateProvider) {
    $stateProvider.state('staff', {
        url: '/staff',
        templateUrl: 'js/staff/staff.html',
        controller: 'StaffController',
        resolve: {
            admins: (User) =>
                User.getAdmins()
        }
    });
});

app.controller('StaffController', function($scope, admins) {
    console.log(admins);
    $scope.admins = admins;
});