app.config(function($stateProvider) {
    $stateProvider.state('time-slots', {
        url: '/time-slots',
        templateUrl: 'js/admin/directives/time-slots/time-slots.html',
        controller: 'TimeSlotsCtrl'

    });
});

app.controller('TimeSlotsCtrl', function($scope, TimeSlots) {

    $scope.students = TimeSlots.generateStudents();
    // TimeSlots.seperateStudentsCandidates($scope.students)
    // console.log($scope.students);

    $scope.companies = TimeSlots.generateCompanies($scope.students)
    TimeSlots.removeExcessCandidates($scope.companies)
        // $scope.candidatesRemoved = TimeSlots.removeExcessCandidates($scope.companies, $scope.students)

    // console.log($scope.candidatesRemoved)

    var checkForConflict = () => {
        for (let i = 0, numOfCompanies = $scope.companies.length; i < numOfCompanies; i++) {
            for (let j = 0, numOfTimeSlots = $scope.companies[i].timeslots.length; j < numOfTimeSlots; j++) {
                let currentCandidate = $scope.companies[i].timeslots[j]
                for (let k = 0; k < i; k++) {
                    if (currentCandidate === $scope.companies[k].timeslots[j] && currentCandidate !== '') {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    $scope.arrange = () => {
        // console.log("start", 0, $scope.companies[0].timeslots)

        for (let i = 1, numOfCompanies = $scope.companies.length; i < numOfCompanies; i++) {
            // console.log("before", i, $scope.companies[i].timeslots)

            let numOfTimeSlots = $scope.companies[i].timeslots.length;
            let temp = [];
            for (let j = 0; j < numOfTimeSlots; j++) {
                temp.push('')
            }

            for (let j = 0; j < numOfTimeSlots; j++) {
                var currentCandidate = $scope.companies[i].timeslots[j]
                if (currentCandidate === '') continue;
                let l = 0;
                let safe = true;
                while (l < numOfTimeSlots) {
                    safe = true;
                    while (temp[l] !== '' && l < numOfTimeSlots) l++;
                    if (l === numOfTimeSlots) {
                        safe = false
                        break;
                    }
                    for (let k = 0; k < i; k++) {
                        if (currentCandidate === $scope.companies[k].timeslots[l]) {
                            l++;
                            safe = false;
                        }
                    }
                    if (safe) {
                        temp[l] = currentCandidate;
                        break;
                    }
                }
                if (!safe) {
                    // console.log("swap")
                    let emptyIndex = 0,
                        swapIndex = 0;
                    while (!safe) {
                        while (temp[swapIndex] === '' && swapIndex < numOfTimeSlots) swapIndex++;
                        while (temp[emptyIndex] !== '' && emptyIndex < numOfTimeSlots) emptyIndex++;
                        while (swapIndex < numOfTimeSlots) {
                            safe = true;
                            for (let k = 0; k < i; k++) {
                                if (currentCandidate === $scope.companies[k].timeslots[swapIndex] || temp[swapIndex] === $scope.companies[k].timeslots[emptyIndex]) {
                                    swapIndex++;
                                    safe = false;
                                    break;
                                }
                            }
                            if (safe) {
                                temp[emptyIndex] = temp[swapIndex];
                                temp[swapIndex] = currentCandidate;
                                break;
                            }
                        }
                        if (!safe) {
                            emptyIndex++;
                            swapIndex = 0;
                        }
                        if (emptyIndex >= numOfTimeSlots) {
                            console.log("Can't resolve student", i, "with company", currentCandidate); //??????
                            break;
                        }
                    }
                }
            }

            // for (let j = 0; j < numOfTimeSlots; j++) {
            //   if (!temp[j]) temp[j] = '';
            // }

            $scope.companies[i].timeslots = temp
                // console.log("after", i, $scope.companies[i].timeslots)
        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                var studentIndex = $scope.companies[i].timeslots[j]
                if (studentIndex !== '')
                    $scope.students[studentIndex].timeslots[j] = i
            }
        }
        $scope.students.forEach(student => {

            student.numOfTimeSlots = student.timeslots.filter(timeslot => timeslot !== '').length

        })


        if (checkForConflict())
            console.error("Has conflict!")
        else
            console.log("No conflict!")
    }

    $scope.arrange()

});
