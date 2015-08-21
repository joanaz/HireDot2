app.factory('Student', ($http) => {
    class Person {

        constructor(user) {
            this.name = user.name;
            this.fiance = null;
            this.candidates = user.preferences;
            this.candidateIndex = 0;
        }

        rank(p) {
            for (let i = 0; i < this.candidates.length; i++)
                if (this.candidates[i] === p) return i;
            return this.candidates.length + 1;
        }

        prefers(p) {
            return this.rank(p) < this.rank(this.fiance);
        }

        nextCandidate() {
            if (this.candidateIndex >= this.candidates.length) return null;
            return this.candidates[this.candidateIndex++];
        }

        engageTo(p) {
            if (p.fiance) {
                // console.log("engageTo",p.fiance.fiance.name)
                // console.log("here")

                p.fiance.fiance = null;
            }

            p.fiance = this;
            if (this.fiance) this.fiance.fiance = null;
            this.fiance = p;
            // console.log(this.name, this.fiance.name)
        }

        swapWith(p) {
            console.log("%s & %s swap partners", this.name, p.name);
            var thisFiance = this.fiance;
            var pFiance = p.fiance;
            this.engageTo(pFiance);
            p.engageTo(thisFiance);
        }
    }


    return {
        createPerson: (user) => {
            var person = new Person(user);
            return person;
        },
        isStable: (guys, gals) => {
            for (var i = 0; i < guys.length; i++)
                for (var j = 0; j < gals.length; j++)
                    if (guys[i].prefers(gals[j]) && gals[j].prefers(guys[i]))
                        return false;
            return true;
        },
        engageEveryone: (guys) => {
            guys.forEach(guy => {
                if (guy.fiance) {
                    guy.fiance.fiance = null;
                    guy.fiance.candidateIndex = 0;
                }
                guy.fiance = null;
                guy.candidateIndex = 0;
            });

            var done;
            do {
                done = true;
                for (var i = 0; i < guys.length; i++) {
                    var guy = guys[i];

                    console.log(guy.name, guy.candidateIndex, guy.fiance);

                    if (!guy.fiance) {

                        done = false;

                        var gal = guy.nextCandidate();
                        // console.log(gal.name)
                        if (!gal.fiance || gal.prefers(guy)) {

                            guy.engageTo(gal);
                            // console.log("engage", guy.name, gal.name)
                        }
                    }
                    // console.log(guy.name, guy.fiance.name)
                }
            } while (!done);
        },
        arrangeEveryone: (numOfSlots) => {},
        saveCandidates: () => {}
    };
});
