app.config(function($stateProvider) {
  $stateProvider.state('awarded-projects', {
    url: '/award/:id',
    templateUrl: 'js/project/project.html',
    resolve: {
      projects: ($stateParams, Award) =>
        Award.getAwardedProjects($stateParams.id)
    },
    controller: ($scope, projects) => {
      $scope.projects = projects
    }
  });
});