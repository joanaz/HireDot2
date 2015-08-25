app.config(function($stateProvider) {
    $stateProvider.state('student-preferences', {
        url: '/student/preferences',
        templateUrl: 'js/student/preferences/preferences.html',
        controller: 'PreferencesController',
        resolve: {
            students: (User) => User.getStudentsAttendingHiringDay(),
            companies: (User) => User.getCompaniesAttendingHiringDay(),
            user: (AuthService, User) => AuthService.getLoggedInUser().then(user => User.getUserById(user._id))
        }
    })
});

app.controller('PreferencesController', function($scope, students, companies, user, PreferencesFactory) {
    // console.log("students", students)
    // $scope.students = students.map(student => Student.createPerson(student))
    $scope.students = students;
    // $scope.companies = companies.map(company => Student.createPerson(company));
    $scope.companies = companies;

    $scope.user = user;

    console.log(user)
        $scope.students.forEach(student => {
            student.preferences = $scope.companies.slice()
                // student.sortableOptions = {
                //     // placeholder: "app",
                //     connectWith: ".student-" + index
                // }
        });

    // let preferences = $scope.students[0].preferences.map(preference => preference._id)
    // PreferencesFactory.savePreferences($scope.students[0]._id, preferences)
    // console.log($scope.students[0])

    $scope.submit = () => {
        console.log($scope.companies[0].preferences)
        console.log("studnet", $scope.students[4].preferences)

        $scope.students.forEach(student => {
            let preferences = student.preferences.map(preference => preference._id)
            PreferencesFactory.savePreferences(student._id, preferences)
        })

        $scope.companies.forEach(company => {
            company.preferences = []
            let len = $scope.students[0].preferences.length

            for (let i = 0; i < len; i++) {
                $scope.students.forEach(student => {
                    //     if (student.preferences.some(candidate => candidate.name === company.name)) {
                    //         company.preferences.push(student)
                    //     }
                    // })

                    if (student.preferences[i].fullName === company.fullName) {
                        company.preferences.push(student);
                    }
                })

            }

            let preferences = company.preferences.map(preference => preference._id)

            PreferencesFactory.savePreferences(company._id, preferences)

        })

        console.log("after studnet", $scope.students[4].preferences)

        console.log($scope.companies[0].preferences)
    }


    // for (let i = 0; i < $scope.students.length; i++) {
    //   $scope.students[i].preferences = $scope.companies.slice()
    // }


    // console.log($scope.companies[0])

    // console.log($scope.companies[0].preferences[0])

    // $scope.sortingLog = []

    // $scope.logModels = () => {
    //     // $scope.sortingLog = [];
    //     for (let i = 0; i < $scope.students.length; i++) {
    //         let logEntry = $scope.students[i].preferences.map(x => x.name).join(', ');
    //         logEntry = 'student ' + $scope.students[i].name + ': ' + logEntry;
    //         $scope.sortingLog.push(logEntry);
    //     }
    //     for (let i = 0; i < $scope.companies.length; i++) {
    //         let logEntry = $scope.companies[i].preferences.map(x => x.name).join(', ');
    //         logEntry = 'company ' + $scope.companies[i].name + ': ' + logEntry;
    //         $scope.sortingLog.push(logEntry);
    //     }
    // };


    // $scope.match = () => {

    //     //smaller set has advantage
    //     var smallerSet = $scope.companies
    //     if ($scope.students.length <= $scope.companies.length)
    //         smallerSet = $scope.students

    //     Student.engageEveryone(smallerSet)

    //     $scope.sortingLog = smallerSet.map(user => user.name + " is engaged to " + user.fiance.name);

    //     $scope.sortingLog.push("Stable = ", Student.isStable($scope.students, $scope.companies) ? "Yes" : "No");

    //     // $scope.companies[0].swapWith($scope.companies[1]);

    //     // $scope.sortingLog.push("Stable = ", Student.isStable($scope.students, $scope.companies) ? "Yes" : "No");
    // }

    // $scope.arrange = () => {
    //     var numOfSlots = 3
    //     Student.arrangeEveryone(numOfSlots)
    //         // $scope.sortingLogs = []
    // }
})

app.factory('PreferencesFactory', ($http) => {
    return {
        savePreferences: (userId, preferences) =>
            $http.put('/api/users/' + userId, {
                preferences: preferences
            }).then(res => {
                console.log("put", res.data)
            })


    }
})