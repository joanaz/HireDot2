app.config(function($stateProvider) {
  $stateProvider.state('student', {
    url: '/student',
    templateUrl: 'js/student/student.html',
    resolve: {
      students: (User) => User.getStudents()
    },
    controller: ($scope, students) => {
      $scope.students = students;
    }
  });
});