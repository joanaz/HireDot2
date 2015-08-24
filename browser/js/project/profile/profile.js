app.config(function($stateProvider) {
  $stateProvider.state('project-profile', {
    url: '/project/:id',
    templateUrl: 'js/project/profile/profile.html',
    resolve: {
      project: ($stateParams, ProjectsFactory) =>
        ProjectsFactory.getProject($stateParams.id),
      team: ($stateParams, ProjectsFactory) =>
        ProjectsFactory.getProjectTeam($stateParams.id)
    },
    controller: ($scope, project, team) => {
      $scope.project = project
      $scope.project.team = team
    }
  });
});