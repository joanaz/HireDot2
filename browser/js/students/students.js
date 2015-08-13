app.config(function($stateProvider) {
  $stateProvider.state('students', {
    url: '/students',
    templateUrl: 'js/students/students.html',
    resolve: {
      students: (UsersFactory) => {
        UsersFactory.getStudents()
      }
    }
  })
});

app.controller('StudentsController', function($scope, students) {
  $scope.students = students;
})