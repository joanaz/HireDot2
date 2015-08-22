app.config(function($stateProvider) {
  $stateProvider.state('company', {
    url: '/company',
    templateUrl: 'js/company/company.html',
    controller: 'CompanyController',
    resolve: {
      companies: (User) =>
        User.getCompanies()
    }
  });
});

app.controller('CompanyController', function($scope, companies) {
  console.log(companies)
  $scope.companies = companies
})