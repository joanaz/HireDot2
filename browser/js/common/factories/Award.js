app.factory('Award', function($http) {
    return {
        getAwards: () =>
            $http.get('/api/awards')
            .then(res => res.data)
    };
});
