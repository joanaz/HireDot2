app.config(function($stateProvider) {
  $stateProvider.state('user-time-slots', {
    url: '/user-time-slots',
    templateUrl: 'js/admin/directives/time-slots/user-time-slots.html',
    resolve: {
      user: (AuthService, User) =>
        AuthService.getLoggedInUser()
        .then(user => User.getUserById(user._id))
    },
    controller: ($scope, user) => {
      $scope.user = user
      $scope.timeslots = ['13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00'];
      console.log(user.timeslots)
    }
  });
});