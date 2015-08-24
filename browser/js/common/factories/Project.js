app.factory('Project', ($http) => {
    return {
        getProjects: () =>
            $http.get('/api/projects/')
            .then(res => res.data),
        getProject: (id) =>
            $http.get('/api/projects/' + id)
            .then(res => res.data)
    };
});
