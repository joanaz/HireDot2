app.config(function($stateProvider) {
    $stateProvider.state('student-preferences', {
        url: '/student/preferences',
        templateUrl: 'js/student/preferences/preferences.html',
        controller: 'PreferencesController',
        resolve: {
            students: (User) =>
                User.getStudents(),
            companies: (User) =>
                User.getCompanies()
        }
    })
});

app.controller('PreferencesController', function($scope, students, companies, Student) {
    // console.log("students", students)
    $scope.students = students.map(student => Student.createPerson(student))
        // $scope.students = students;
    $scope.companies = companies.map(company => Student.createPerson(company));

    $scope.students.forEach((student, index) => {
        student.potentialCandidates = $scope.companies.slice()
        student.sortableOptions = {
            // placeholder: "app",
            connectWith: ".student-" + index
        }
    });

    console.log($scope.students[0])

    $scope.submit = () => {
        console.log($scope.companies[0].candidates)
        console.log("studnet", $scope.students[4].candidates)

        $scope.companies.forEach(company => {
            company.candidates = []
            $scope.students.forEach(student => {
                if (student.candidates.some(candidate => candidate.name === company.name)) {
                    company.candidates.push(student)
                }
            })
        })
        console.log("after studnet", $scope.students[4].candidates)

        console.log($scope.companies[0].candidates)
    }


    // for (let i = 0; i < $scope.students.length; i++) {
    //   $scope.students[i].candidates = $scope.companies.slice()
    // }


    // console.log($scope.companies[0])

    // console.log($scope.companies[0].candidates[0])

    $scope.sortingLog = []

    $scope.logModels = () => {
        // $scope.sortingLog = [];
        for (let i = 0; i < $scope.students.length; i++) {
            let logEntry = $scope.students[i].candidates.map(x => x.name).join(', ');
            logEntry = 'student ' + $scope.students[i].name + ': ' + logEntry;
            $scope.sortingLog.push(logEntry);
        }
        for (let i = 0; i < $scope.companies.length; i++) {
            let logEntry = $scope.companies[i].candidates.map(x => x.name).join(', ');
            logEntry = 'company ' + $scope.companies[i].name + ': ' + logEntry;
            $scope.sortingLog.push(logEntry);
        }
    };


    $scope.match = () => {

        //smaller set has advantage
        var smallerSet = $scope.companies
        if ($scope.students.length <= $scope.companies.length)
            smallerSet = $scope.students

        Student.engageEveryone(smallerSet)

        $scope.sortingLog = smallerSet.map(user => user.name + " is engaged to " + user.fiance.name);

        $scope.sortingLog.push("Stable = ", Student.isStable($scope.students, $scope.companies) ? "Yes" : "No");

        // $scope.companies[0].swapWith($scope.companies[1]);

        // $scope.sortingLog.push("Stable = ", Student.isStable($scope.students, $scope.companies) ? "Yes" : "No");
    }

    $scope.arrange = () => {
        var numOfSlots = 3
        Student.arrangeEveryone(numOfSlots)
            // $scope.sortingLogs = []
    }
})