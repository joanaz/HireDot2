app.factory('TimeSlots', function() {
  return {
    generateStudents: () => {
      var students = [];
      let initTimeSlots = [];
      for (let j = 0; j < 9; j++) {
        initTimeSlots.push('');
      }

      for (let i = 0; i < 15; i++) {
        let candidates = [];
        let length = Math.floor(Math.random() * 5) + 6;
        for (var j = 0; j < length; j++) {
          function gen() {
            var num = Math.floor(Math.random() * 10);
            if (candidates.indexOf(num) === -1 || candidates === []) {
              // console.log("here")
              candidates.push(num);
            } else gen();
          }
          gen();
        }
        students.push({
          'name': i,
          'candidates': candidates,
          'timeslots': initTimeSlots.slice()
        });
      }
      return students;
    },
    seperateStudentsCandidates: (students) => {
      students.forEach(student => {
        student.backupCandidates = student.candidates.splice(6, Number.MAX_VALUE);
      });
    },
    generateCompanies: (students) => {
      var companies = [];

      for (let i = 0; i < 10; i++) {
        var candidates = [];
        let rank = 0,
          maxRank = 0;

        for (let j = 0, len = students.length; j < len; j++) {
          let length = students[j].candidates.length;
          maxRank = length > maxRank ? length : maxRank;
        }

        while (rank < maxRank) {
          for (let j = 0, len = students.length; j < len; j++) {
            if (students[j].candidates[rank] !== undefined && students[j].candidates[rank] === i) {
              candidates.push(j);
            }
          }
          rank++;
        }

        companies.push({
          'name': i,
          'candidates': candidates
        });
      }
      return companies;
    },
    removeExcessCandidates: (companies) => {
      // var studentsRemoved = []
      companies.forEach(company => {
        company.timeslots = company.candidates.slice(0, 9);
        // if (company.timeslots.length > 9) {
        //   company.timeslots.splice(9, Number.MAX_VALUE)
        // }
        // console.log(company.timeslots)
      });

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
  };
});