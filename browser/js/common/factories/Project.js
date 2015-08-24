app.factory('Project', ($http) => {
    return {
        getProjects: () =>
            $http.get('/api/projects/')
            .then(res => res.data),
        getProject: (id) =>
            $http.get('/api/projects/' + id)
            .then(res => res.data),
        getProjectTeam: (id) =>
            $http.get('/api/projects/' + id + "/team")
            .then(res => res.data)
    };
});