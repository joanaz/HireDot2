app.config(function($stateProvider) {
  $stateProvider.state('project-profile', {
    url: '/project/:id',
    templateUrl: 'js/project/profile/profile.html',
    resolve: {
      project: ($stateParams, ProjectsFactory) =>
        ProjectsFactory.getProject($stateParams.id)
    },
    controller: ($scope, project) => {
      $scope.project = project
    }
  });
});