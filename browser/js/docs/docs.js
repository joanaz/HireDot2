app.config(function($stateProvider) {
  $stateProvider.state('docs', {
    url: '/docs',
    templateUrl: 'js/docs/docs.html',
    controller: 'DocsCtrl'

  });
});


app.controller('DocsCtrl', function($scope, DocsFactory) {

  $scope.students = DocsFactory.generateStudents()
    // console.log($scope.students)
  $scope.companies = DocsFactory.generateCompanies($scope.students)

  $scope.companies.forEach(company => {
    company.timeslots = company.candidates.slice(0, 9)
      // while (company.timeslots.length < 9) {
      //   company.timeslots.push(NaN)
      // }

  })

  $scope.arrange = function() {
      var done
      while (!done) {
        done = true
        for (let i = 0; i < 10; i++) {
          console.log("before", i, $scope.companies[i].timeslots)
          for (let j = 0; j < $scope.companies[i].timeslots.length; j++) {
            for (let k = 0; k < i; k++) {
              // debugger;
              while ($scope.companies[i].timeslots[j] === $scope.companies[k].timeslots[j] && !isNaN($scope.companies[i].timeslots[j])) {
                done = false
                console.log("conflict with", k, "at position", j)
                if (j === $scope.companies[i].timeslots.length - 1) {
                  if ($scope.companies[i].timeslots.length < 9)
                    $scope.companies[i].timeslots.push(NaN)
                  else {
                    console.log("can't resolve conflict")
                    done = true
                    break
                    // var temp = $scope.companies[k]
                    // $scope.companies[k] = $scope.companies[i]
                    // $scope.companies[i] = temp
                    // break;
                  }
                }
                $scope.companies[i].timeslots.splice(j + 1, 0, $scope.companies[i].timeslots.splice(j, 1)[0])
                console.log("after", $scope.companies[i].timeslots)
              }
            }
          }
          console.log("final", i, $scope.companies[i].timeslots)

        }
      }
    }
    // $scope.arrange()
    // for (let i = 0; i < 10; i++) {
    //   console.log($scope.companies[i].timeslots)
    // }
});

app.factory('DocsFactory', function() {
  return {
    generateStudents: () => {
      var students = []
      for (let i = 0; i < 15; i++) {
        let candidates = []
          // var num = Math.floor(Math.random() * 10)
          // console.log(num)

        for (var j = 0; j < 6; j++) {
          // console.log(j)
          function gen() {
            var num = Math.floor(Math.random() * 10)
            if (candidates.indexOf(num) === -1 || candidates === []) {
              // console.log("here")
              candidates.push(num)
            } else gen()
          }
          gen()
        }
        // console.log(candidates)
        students.push({
          'name': i,
          'candidates': candidates
        })
      }

      return students

    },
    generateCompanies: (students) => {
      var companies = []

      for (let i = 0; i < 10; i++) {
        var candidates = []
        for (let j = 0; j < 15; j++) {
          if (students[j].candidates.indexOf(i) !== -1) {
            candidates.push(j)
          }
        }
        companies.push({
          'name': i,
          'candidates': candidates
        })
      }
      return companies
    }
  }
});