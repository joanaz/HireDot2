app.config(function($stateProvider) {
  $stateProvider.state('tech-projects', {
    url: '/tech/:id',
    templateUrl: 'js/project/project.html',
    resolve: {
      projects: ($stateParams, Tech) =>
        Tech.getProjects($stateParams.id)
    },
    controller: ($scope, projects) => {
      $scope.projects = projects
    }
  })
});

app.factory('Tech', ($http) => {
  return {
    getProjects: (id) =>
      $http.get('/api/technologies/' + id + '/projects')
      .then(res => res.data)
  }
});