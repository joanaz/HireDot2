app.factory('UsersFactory', $http => {
  var getHelperFunction = (role) =>
    $http.get('/api/users?role=' + role)
    .then(res => res.data)

  return {
    getStudents: () =>
      getHelperFunction('student'),
    getStaff: () =>
      getHelperFunction('staff'),
    getCompanies: () =>
      getHelperFunction('company')

  }
});