app.config(function($stateProvider) {
  $stateProvider.state('company-preferences.student-view', {
    url: '/:id',
    templateUrl: 'js/company/preferences/studentView.html',
    resolve: {
      student: ($stateParams, User) =>
        User.getUserById($stateParams.id)
    },
    controller: ($scope, student) => {
      $scope.student = student
      console.log(student)
    }
  })
});