app.factory('User', function($http, $rootScope) {

    var getHelperFunction = (role) =>
        $http.get('/api/users?role=' + role)
        .then(res => res.data);

    // var getAwards = (

    return {
        getAdmins: () =>
            getHelperFunction('Admin'),
        getStudents: () =>
            getHelperFunction('Student'),
        getCompanies: () =>
            getHelperFunction('Company'),
        getUserById: (id) =>
            $http.get('/api/users/' + id)
            .then(res => res.data),
        getStudentsAttendingHiringDay: () =>
            getHelperFunction('Student')
            .then(students =>
                students.filter(student =>
                    student.participateHiringDay)),
        getCompaniesAttendingHiringDay: () =>
            getHelperFunction('Company')
            .then(companies =>
                companies.filter(company =>
                    company.participateHiringDay)),
        savePreferences: (userId, preferences) =>
            $http.put('/api/users/' + userId, {
                preferences: preferences
            }),
        saveTimeslots: (userId, timeslots) =>
            $http.put('/api/users/' + userId, {
                timeslots: timeslots
            })

        // getAwards: () =>

        // // returns all users
        // getAll: function(query) {
        //     return $http.get('/api/users/', {
        //         params: query
        //     }).then(responseData);
        // },
        // // get single user
        // getOne: function(id) {
        //     return $http.get('/api/users/' + id).then(responseData);
        // },
        // // deletes user based on ID
        // deleteUser: function(id) {
        //     return $http.delete('/api/users/' + id)
        //         .then(function(response) {
        //             $rootScope.$emit("userUpdate");
        //             return response.data;
        //         });
        // },
        // // updates user based on form data
        // updateUser: function(id, data) {
        //     return $http.put('/api/users/' + id, data).then(responseData);
        // },
        // // signs up the user
        // signup: function(credentials) {
        //     credentials.role = ['Student'];
        //     return $http.post('/api/users/create', credentials).then(responseData);
        // }
    };
});