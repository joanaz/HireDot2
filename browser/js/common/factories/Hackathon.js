app.factory('Hackathon', ($http) => {
    return {
        getHackathons: () =>
            $http.get('/api/hackathons/')
            .then(res => res.data),
        getHackathon: (id) =>
            $http.get('/api/hackathons/' + id)
            .then(res => res.data)
    };
});