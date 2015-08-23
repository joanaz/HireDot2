app.config(function($stateProvider) {
  $stateProvider.state('student-profile', {
    url: '/student/:id',
    templateUrl: 'js/student/profile/profile.html',
    resolve: {
      student: ($stateParams, User) =>
        User.getUserById($stateParams.id)
    },
    controller: ($scope, student) => {
      $scope.student = student
    }
  });
});