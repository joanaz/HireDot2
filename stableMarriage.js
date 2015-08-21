function Person(name) {

    var candidateIndex = 0;

    this.name = name;
    this.fiance = null;
    this.candidates = [];

    this.rank = function(p) {
        for (i = 0; i < this.candidates.length; i++)
            if (this.candidates[i] === p) return i;
        return this.candidates.length + 1;
<<<<<<< HEAD
    }

    this.prefers = function(p) {
        return this.rank(p) < this.rank(this.fiance);
    }
=======
    };

    this.prefers = function(p) {
        return this.rank(p) < this.rank(this.fiance);
    };
>>>>>>> master

    this.nextCandidate = function() {
        if (candidateIndex >= this.candidates.length) return null;
        return this.candidates[candidateIndex++];
<<<<<<< HEAD
    }
=======
    };
>>>>>>> master

    this.engageTo = function(p) {
        if (p.fiance) {
            // console.log("engageTo",p.fiance.fiance.name)
            p.fiance.fiance = null;
        }

        p.fiance = this;
        if (this.fiance) this.fiance.fiance = null;
        this.fiance = p;
        // console.log(this.name, this.fiance.name)
<<<<<<< HEAD
    }
=======
    };
>>>>>>> master

    this.swapWith = function(p) {
        console.log("%s & %s swap partners", this.name, p.name);
        var thisFiance = this.fiance;
        var pFiance = p.fiance;
        this.engageTo(pFiance);
        p.engageTo(thisFiance);
<<<<<<< HEAD
    }
=======
    };
>>>>>>> master
}

function isStable(guys, gals) {
    for (var i = 0; i < guys.length; i++)
        for (var j = 0; j < gals.length; j++)
            if (guys[i].prefers(gals[j]) && gals[j].prefers(guys[i]))
                return false;
    return true;
}

function engageEveryone(guys) {
    var done;
    do {
        done = true;
        for (var i = 0; i < guys.length; i++) {
            var guy = guys[i];
<<<<<<< HEAD
            console.log(guy.name)
=======
            console.log(guy.name);
>>>>>>> master

            if (!guy.fiance) {
                done = false;

                var gal = guy.nextCandidate();
<<<<<<< HEAD
                console.log(gal.name)
                if (!gal.fiance || gal.prefers(guy)) {
                    guy.engageTo(gal);
                    console.log("engage", guy.name, gal.name)
=======
                console.log(gal.name);
                if (!gal.fiance || gal.prefers(guy)) {
                    guy.engageTo(gal);
                    console.log("engage", guy.name, gal.name);
>>>>>>> master
                }
            }
            // console.log(guy.name, guy.fiance.name)
        }
    } while (!done);
}

function doMarriage() {

    var joanna = new Person("Joanna");
    var frances = new Person("Frances");
    var violet = new Person("Violet");

    var google = new Person("Google");
    var fb = new Person("Facebook");
    // var twitter = new Person("Twitter");
    // var linkedin=new Person('Linkedin');

    joanna.candidates = [google, fb];
    frances.candidates = [fb, google];
    violet.candidates = [google, fb];

    google.candidates = [frances, violet, joanna];
    fb.candidates = [joanna, frances, violet];
    // twitter.candidates = [frances, joanna, violet];
    // linkedin.candidates=[joanna,frances,violet];

    var people = [joanna, frances, violet];
    var companies = [google, fb, ];

<<<<<<< HEAD
    var smallerSet
    if (people.length <= companies.length)
        smallerSet = people
    else
        smallerSet = companies

    engageEveryone(smallerSet)
=======
    var smallerSet;
    if (people.length <= companies.length)
        smallerSet = people;
    else
        smallerSet = companies;

    engageEveryone(smallerSet);
>>>>>>> master

    for (var i = 0; i < smallerSet.length; i++) {
        console.log("%s is engaged to %s", smallerSet[i].name, smallerSet[i].fiance.name);
    }
    console.log("Stable = %s", isStable(people, companies) ? "Yes" : "No");
    joanna.swapWith(frances);
    console.log("Stable = %s", isStable(people, companies) ? "Yes" : "No");
}

doMarriage();