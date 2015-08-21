app.config(function($stateProvider) {
  $stateProvider.state('docs', {
    url: '/docs',
    templateUrl: 'js/docs/docs.html',
    controller: 'DocsCtrl'

  });
});


app.controller('DocsCtrl', function($scope, DocsFactory) {

  $scope.students = DocsFactory.generateStudents();
  // DocsFactory.seperateStudentsCandidates($scope.students)
  // console.log($scope.students);

  $scope.companies = DocsFactory.generateCompanies($scope.students)
  DocsFactory.removeExcessCandidates($scope.companies)
    // $scope.candidatesRemoved = DocsFactory.removeExcessCandidates($scope.companies, $scope.students)

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

app.factory('DocsFactory', function() {
  return {
    generateStudents: () => {
      var students = []
      let initTimeSlots = [];
      for (let j = 0; j < 9; j++) {
        initTimeSlots.push('')
      }

      for (let i = 0; i < 15; i++) {
        let candidates = []
        let length = Math.floor(Math.random() * 5) + 6
        for (var j = 0; j < length; j++) {
          function gen() {
            var num = Math.floor(Math.random() * 10)
            if (candidates.indexOf(num) === -1 || candidates === []) {
              // console.log("here")
              candidates.push(num)
            } else gen();
          }
          gen();
        }
        students.push({
          'name': i,
          'candidates': candidates,
          'timeslots': initTimeSlots.slice()
        })
      }
      return students;
    },
    seperateStudentsCandidates: (students) => {
      students.forEach(student => {
        student.backupCandidates = student.candidates.splice(6, Number.MAX_VALUE)
      })
    },
    generateCompanies: (students) => {
      var companies = []

      for (let i = 0; i < 10; i++) {
        var candidates = []
        let rank = 0,
          maxRank = 0;

        for (let j = 0, len = students.length; j < len; j++) {
          let length = students[j].candidates.length
          maxRank = length > maxRank ? length : maxRank
        }

        while (rank < maxRank) {
          for (let j = 0, len = students.length; j < len; j++) {
            if (students[j].candidates[rank] !== undefined && students[j].candidates[rank] === i) {
              candidates.push(j)
            }
          }
          rank++;
        }

        companies.push({
          'name': i,
          'candidates': candidates
        })
      }
      return companies;
    },
    removeExcessCandidates: (companies) => {
      // var studentsRemoved = []
      companies.forEach(company => {
        company.timeslots = company.candidates.slice(0, 9)
          // if (company.timeslots.length > 9) {
          //   company.timeslots.splice(9, Number.MAX_VALUE)
          // }
          // console.log(company.timeslots)
      })

      // studentsRemoved.sort((a, b) => a - b);
      // console.log(studentsRemoved)

      // for (let i = 0; i < studentsRemoved.length; i++) {
      //   let student = studentsRemoved[i]
      //   for (let j = 0; j < students[student].backupCandidates.length; j++) {
      //     let backupCandidate = students[student].backupCandidates[j]
      //     if (companies[backupCandidate].timeslots.length < 9 && companies[backupCandidate].timeslots.indexOf(student) === -1) {
      //       companies[backupCandidate].timeslots.push(studentsRemoved.splice(i, 1)[0])
      //       i--;
      //       break;
      //     }
      //   }
      // }

      // companies.forEach(company => {
      //   var removedStudentIndex = 0
      //   while (company.timeslots.length < 9 && removedStudentIndex < studentsRemoved.length) {
      //     if (company.timeslots.indexOf(studentsRemoved[removedStudentIndex]) === -1) {
      //       company.timeslots.push(studentsRemoved.splice(removedStudentIndex, 1)[0])
      //     }
      //     removedStudentIndex++
      //   }
      //   while (company.timeslots.length < 9) {
      //     company.timeslots.push('')
      //   }
      // })
      // return studentsRemoved;
    }
  }
});