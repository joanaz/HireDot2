app.config(function($stateProvider) {
  $stateProvider.state('student-preferences.company-view', {
    url: '/:id',
    templateUrl: 'js/student/preferences/companyView.html',
    resolve: {
      company: ($stateParams, User) =>
        User.getUserById($stateParams.id)
    },
    controller: ($scope, company) => {
      $scope.company = company
      console.log(company)
    }
  })
});