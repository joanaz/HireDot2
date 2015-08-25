app.config(function($stateProvider) {
	$stateProvider.state('time-slots', {
		url: '/time-slots',
		templateUrl: 'js/admin/directives/time-slots/time-slots.html',
		controller: 'TimeSlotsCtrl',
		resolve: {
			students: (User) => User.getStudentsAttendingHiringDay(),
			companies: (User) => User.getCompaniesAttendingHiringDay()
		}
	});
});

app.controller('TimeSlotsCtrl', function($scope, students, companies, TimeSlots) {
	$scope.students = students
	$scope.companies = companies
	$scope.studentNumOfTimeSlots = 6;
	$scope.companyNumOfTimeSlots = 9;
	$scope.numCompaniesNeeded = studentNumOfTimeSlots * $scope.students.length / $scope.companyNumOfTimeSlots;


	// $scope.students = TimeSlots.generateStudents();
	// TimeSlots.seperateStudentsCandidates($scope.students)
	// console.log($scope.students);

	// $scope.companies = TimeSlots.generateCompanies($scope.students)
	// TimeSlots.removeExcessCandidates($scope.companies)


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

	// $scope.arrange = () => {
	// 	// console.log("start", 0, $scope.companies[0].timeslots)

	// 	for (let i = 1, numOfCompanies = $scope.companies.length; i < numOfCompanies; i++) {
	// 		// console.log("before", i, $scope.companies[i].timeslots)

	// 		let numOfTimeSlots = $scope.companies[i].timeslots.length;
	// 		let temp = Array(numOfTimeSlots).map(n => '');

	// 		for (let j = 0; j < numOfTimeSlots; j++) {
	// 			var currentCandidate = $scope.companies[i].timeslots[j]
	// 			if (currentCandidate === '') continue;
	// 			let l = 0;
	// 			let safe = true;
	// 			while (l < numOfTimeSlots) {
	// 				safe = true;
	// 				while (temp[l] !== '' && l < numOfTimeSlots) l++;
	// 				if (l === numOfTimeSlots) {
	// 					safe = false
	// 					break;
	// 				}
	// 				for (let k = 0; k < i; k++) {
	// 					if (currentCandidate === $scope.companies[k].timeslots[l]) {
	// 						l++;
	// 						safe = false;
	// 					}
	// 				}
	// 				if (safe) {
	// 					temp[l] = currentCandidate;
	// 					break;
	// 				}
	// 			}
	// 			if (!safe) {
	// 				// console.log("swap")
	// 				let emptyIndex = 0,
	// 					swapIndex = 0;
	// 				while (!safe) {
	// 					while (temp[swapIndex] === '' && swapIndex < numOfTimeSlots) swapIndex++;
	// 					while (temp[emptyIndex] !== '' && emptyIndex < numOfTimeSlots) emptyIndex++;
	// 					while (swapIndex < numOfTimeSlots) {
	// 						safe = true;
	// 						for (let k = 0; k < i; k++) {
	// 							if (currentCandidate === $scope.companies[k].timeslots[swapIndex] || temp[swapIndex] === $scope.companies[k].timeslots[emptyIndex]) {
	// 								swapIndex++;
	// 								safe = false;
	// 								break;
	// 							}
	// 						}
	// 						if (safe) {
	// 							temp[emptyIndex] = temp[swapIndex];
	// 							temp[swapIndex] = currentCandidate;
	// 							break;
	// 						}
	// 					}
	// 					if (!safe) {
	// 						emptyIndex++;
	// 						swapIndex = 0;
	// 					}
	// 					if (emptyIndex >= numOfTimeSlots) {
	// 						console.log("Can't resolve student", i, "with company", currentCandidate); //??????
	// 						break;
	// 					}
	// 				}
	// 			}
	// 		}

	// 		// for (let j = 0; j < numOfTimeSlots; j++) {
	// 		//   if (!temp[j]) temp[j] = '';
	// 		// }

	// 		$scope.companies[i].timeslots = temp
	// 			// console.log("after", i, $scope.companies[i].timeslots)
	// 	}
	// }

	var generateStudentTimeSlots = () => {
		let initTimeSlots = Array($scope.studentNumOfTimeSlots > $scope.companyNumOfTimeSlots ? $scope.studentNumOfTimeSlots : $scope.companyNumOfTimeSlots).map(n => '');

		$scope.students.forEach(student => {
			student.timeslots = initTimeSlots.slice()
		})

		for (let i = 0, numOfCompanies = $scope.companies.length; i < numOfCompanies; i++) {
			for (let j = 0, numOfTimeSlots = $scope.companies[i].timeslots.length; j < numOfTimeSlots; j++) {
				var currentstudent = $scope.companies[i].timeslots[j]
				if (currentstudent !== '') {
					$scope.students.forEach(student => {
						if (student._id === currentstudent._id) {
							student.timeslots[j] = $scope.companies[i]
						}
					})
				}
			}
		}
		$scope.students.forEach(student => {
			student.numOfTimeSlots = student.timeslots.filter(timeslot => timeslot !== '').length
		})


		if (checkForConflict())
			console.error("Has conflict!")
		else {
			console.log("No conflict!")
			$scope.students.forEach(student => {
				let timeslots = student.timeslots.map(timeslot => timeslot._id)
				User.saveTimeslots(student._id, preferences)
			})
			$scope.students.forEach(student => {
				let preferences = student.preferences.map(preference => preference._id)
				User.saveTimeslots(student._id, preferences)
			})
		}
	}


	$scope.newAlgorithm = () => {
		let maxNum = 0;
		for (let i = 0, numOfCompanies = $scope.companies.length; i < numOfCompanies; i++) {

			let length = $scope.companies[i].preferences.length;
			maxNum = length > maxNum ? length : maxNum;

			$scope.companies[i].timeslots = []
		}

		let index = 0
		while (index < maxNum) {
			for (let i = 0, numOfCompanies = $scope.companies.length; i < numOfCompanies; i++) {
				let currentCandidate = $scope.companies[i].preferences[index]
				if (currentCandidate === undefined) continue;

				for (let j = 0; j < maxNum; j++) {
					if ($scope.companies[i].timeslots[j] !== undefined) continue;
					let safe = true
					for (let k = 0; k < numOfCompanies; k++) {
						if (currentCandidate === $scope.companies[k].timeslots[j]) {
							// $scope.companies[i].timeslots[j + 1] = currentCandidate
							// j++;
							safe = false;
							break;
						}
					}
					if (safe) {
						$scope.companies[i].timeslots[j] = currentCandidate;
						break;
					}
				}
			}
			index++;
		}

		for (let i = 0, numOfCompanies = $scope.companies.length; i < numOfCompanies; i++) {
			$scope.companies[i].timeslots = $scope.companies[i].timeslots.slice(0, $scope.companyNumOfTimeSlots)
			for (let j = 0, numOfTimeSlots = $scope.companies[i].timeslots.length; j < numOfTimeSlots; j++) {
				if ($scope.companies[i].timeslots[j] === undefined) {
					$scope.companies[i].timeslots[j] = ''
					let recommendation = $scope.students.filter((student) => {
						let sameCom = $scope.companies[i].timeslots.some(timeslot => timeslot._id === student._id)
							// console.log("same company", sameCom)
						let diffComSameTime = $scope.companies.some(company => company.timeslots[j]._id === student._id)
							// console.log("diff company", diffCom)

						return !sameCom && !diffComSameTime
					})
					recommendation = recommendation.map(elem => elem.fullName)
					console.log("Recommand students", recommendation, "for company", i, "at timeslot", j)
				}
			}
		}

		generateStudentTimeSlots()
	}

	$scope.newAlgorithm()
		// $scope.arrange()


});