app.factory('UsersFactory', $http => {
  function getHelperFunction(role) {
    $http.get('/api/users?role=' + role)
      .then(res => {
        console.log(res)
        return res.data
      })
  }

  return {
    getStudents() {
        getHelperFunction('student')
      },
      getStaff() {
        getHelperFunction('staff')
      },
      getCompanies() {
        getHelperFunction('company')
      }
  }
});