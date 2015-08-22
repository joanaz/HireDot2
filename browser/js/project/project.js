app.config(function($stateProvider) {
  $stateProvider.state('project', {
    url: '/project',
    templateUrl: 'js/project/project.html',
    resolve: {
      projects: (ProjectsFactory) =>
        ProjectsFactory.getProjects()
    },
    controller: ($scope, projects) => {
      $scope.projects = projects
    }
  });
});

app.factory('ProjectsFactory', ($http) => {
  return {
    getProjects: () =>
      $http.get('/api/projects/')
      .then(res => res.data)
  }
})