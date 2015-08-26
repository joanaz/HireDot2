app.factory('Award', function($http) {
  return {
    getAwards: () =>
      $http.get('/api/awards/')
      .then(res => res.data),
    getAwardedProjects: (id) =>
      $http.get('/api/awards/' + id + '/projects')
      .then(res => res.data)
  };
});