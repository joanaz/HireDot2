// app.config(function($stateProvider) {
//   $stateProvider.state('students', {
//     url: '/students',
//     templateUrl: 'js/students/students.html',
//     controller: 'StudentsController',
//     resolve: {
//       students: (UsersFactory) =>
//         UsersFactory.getStudents(),
//       companies: (UsersFactory) =>
//         UsersFactory.getCompanies()
//     }
//   })
// });

// app.controller('StudentsController', function($scope, students, companies, StudentsFactory) {
//   // console.log("students", students)
//   $scope.students = students.map(student => StudentsFactory.createPerson(student))
//     // $scope.students = students;
//   $scope.companies = companies.map(company => StudentsFactory.createPerson(company));

//   $scope.students.forEach((student, index) => {
//     student.potentialCandidates = $scope.companies.slice()
//     student.sortableOptions = {
//       // placeholder: "app",
//       connectWith: ".student-" + index
//     }
//   });

//   console.log($scope.students[0])

//   $scope.submit = () => {
//     console.log($scope.companies[0].candidates)
//     console.log("studnet", $scope.students[4].candidates)

//     $scope.companies.forEach(company => {
//       company.candidates = []
//       $scope.students.forEach(student => {
//         if (student.candidates.some(candidate => candidate.name === company.name)) {
//           company.candidates.push(student)
//         }
//       })
//     })
//     console.log("after studnet", $scope.students[4].candidates)

//     console.log($scope.companies[0].candidates)
//   }


//   // for (let i = 0; i < $scope.students.length; i++) {
//   //   $scope.students[i].candidates = $scope.companies.slice()
//   // }


//   // console.log($scope.companies[0])

//   // console.log($scope.companies[0].candidates[0])

//   $scope.sortingLog = []

//   $scope.logModels = () => {
//     // $scope.sortingLog = [];
//     for (let i = 0; i < $scope.students.length; i++) {
//       let logEntry = $scope.students[i].candidates.map(x => x.name).join(', ');
//       logEntry = 'student ' + $scope.students[i].name + ': ' + logEntry;
//       $scope.sortingLog.push(logEntry);
//     }
//     for (let i = 0; i < $scope.companies.length; i++) {
//       let logEntry = $scope.companies[i].candidates.map(x => x.name).join(', ');
//       logEntry = 'company ' + $scope.companies[i].name + ': ' + logEntry;
//       $scope.sortingLog.push(logEntry);
//     }
//   };


//   $scope.match = () => {

//     //smaller set has advantage
//     var smallerSet = $scope.companies
//     if ($scope.students.length <= $scope.companies.length)
//       smallerSet = $scope.students

//     StudentsFactory.engageEveryone(smallerSet)

//     $scope.sortingLog = smallerSet.map(user => user.name + " is engaged to " + user.fiance.name);

//     $scope.sortingLog.push("Stable = ", StudentsFactory.isStable($scope.students, $scope.companies) ? "Yes" : "No");

//     // $scope.companies[0].swapWith($scope.companies[1]);

//     // $scope.sortingLog.push("Stable = ", StudentsFactory.isStable($scope.students, $scope.companies) ? "Yes" : "No");
//   }

//   $scope.arrange = () => {
//     var numOfSlots = 3
//     StudentsFactory.arrangeEveryone(numOfSlots)
//       // $scope.sortingLogs = []
//   }
// })


// app.factory('StudentsFactory', () => {
//   class Person {

//     constructor(user) {
//       this.name = user.name;
//       this.fiance = null;
//       this.candidates = user.candidates;
//       this.candidateIndex = 0;
//     }

//     rank(p) {
//       for (let i = 0; i < this.candidates.length; i++)
//         if (this.candidates[i] === p) return i;
//       return this.candidates.length + 1;
//     }

//     prefers(p) {
//       return this.rank(p) < this.rank(this.fiance);
//     }

//     nextCandidate() {
//       if (this.candidateIndex >= this.candidates.length) return null;
//       return this.candidates[this.candidateIndex++];
//     }

//     engageTo(p) {
//       if (p.fiance) {
//         // console.log("engageTo",p.fiance.fiance.name)
//         // console.log("here")

//         p.fiance.fiance = null;
//       }

//       p.fiance = this;
//       if (this.fiance) this.fiance.fiance = null;
//       this.fiance = p;
//       // console.log(this.name, this.fiance.name)
//     }

//     swapWith(p) {
//       console.log("%s & %s swap partners", this.name, p.name);
//       var thisFiance = this.fiance;
//       var pFiance = p.fiance;
//       this.engageTo(pFiance);
//       p.engageTo(thisFiance);
//     }
//   }


//   return {
//     createPerson: (user) => {
//       var person = new Person(user)
//       return person
//     },
//     isStable: (guys, gals) => {
//       for (var i = 0; i < guys.length; i++)
//         for (var j = 0; j < gals.length; j++)
//           if (guys[i].prefers(gals[j]) && gals[j].prefers(guys[i]))
//             return false;
//       return true;
//     },
//     engageEveryone: (guys) => {
//       guys.forEach(guy => {
//         if (guy.fiance) {
//           guy.fiance.fiance = null
//           guy.fiance.candidateIndex = 0
//         }
//         guy.fiance = null;
//         guy.candidateIndex = 0;
//       })

//       var done;
//       do {
//         done = true;
//         for (var i = 0; i < guys.length; i++) {
//           var guy = guys[i];

//           console.log(guy.name, guy.candidateIndex, guy.fiance)

//           if (!guy.fiance) {

//             done = false;

//             var gal = guy.nextCandidate();
//             // console.log(gal.name)
//             if (!gal.fiance || gal.prefers(guy)) {

//               guy.engageTo(gal);
//               // console.log("engage", guy.name, gal.name)
//             }
//           }
//           // console.log(guy.name, guy.fiance.name)
//         }
//       } while (!done);
//     },
//     arrangeEveryone: (numOfSlots) => {},
//     saveCandidates: () => {}
//   }
// })