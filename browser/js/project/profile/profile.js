app.config(function($stateProvider) {
  $stateProvider.state('project-profile', {
    url: '/project/:id',
    templateUrl: 'js/project/profile/profile.html',
    params: {
      project: null
    },
    resolve: {
      project: ($stateParams, User) => {
        $stateParams.project.team.map(member => User.getUserFromFullName(member))
        return $stateParams.project
      }
    },
    controller: ($scope, project) => {
      $scope.project = project
    }
  });
});