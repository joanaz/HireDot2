app.factory('Award', function($http, $rootScope) {
    return {
        getAwards: () =>
            $http.get('/api/awards')
            .then(res => res.data)
    };
});
