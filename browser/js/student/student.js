app.config(function($stateProvider) {
  $stateProvider.state('student', {
    url: '/student',
    templateUrl: 'js/student/student.html',
    controller: 'StudentController',
    resolve: {
      students: (User) =>
        User.getStudents()
    }
  });
});

app.controller('StudentController', function($scope, students) {
  $scope.students = students;
});