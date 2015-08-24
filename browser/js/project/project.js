app.config(function($stateProvider) {
    $stateProvider.state('project', {
        url: '/project',
        templateUrl: 'js/project/project.html',
        controller: 'ProjectController',
        resolve: {
            projects: (Project) =>
                Project.getProjects()
        }
    });
});

app.controller('ProjectController', function($scope, projects) {
    $scope.projects = projects;
});