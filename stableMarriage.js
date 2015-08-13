function Person(name) {

    var candidateIndex = 0;

    this.name = name;
    this.fiance = null;
    this.candidates = [];

    this.rank = function(p) {
        for (i = 0; i < this.candidates.length; i++)
            if (this.candidates[i] === p) return i;
        return this.candidates.length + 1;
    }

    this.prefers = function(p) {
        return this.rank(p) < this.rank(this.fiance);
    }

    this.nextCandidate = function() {
        if (candidateIndex >= this.candidates.length) return null;
        return this.candidates[candidateIndex++];
    }

    this.engageTo = function(p) {
        if (p.fiance) {
            // console.log("engageTo",p.fiance.fiance.name)
            p.fiance.fiance = null;
        }

        p.fiance = this;
        if (this.fiance) this.fiance.fiance = null;
        this.fiance = p;
        // console.log(this.name, this.fiance.name)
    }

    this.swapWith = function(p) {
        console.log("%s & %s swap partners", this.name, p.name);
        var thisFiance = this.fiance;
        var pFiance = p.fiance;
        this.engageTo(pFiance);
        p.engageTo(thisFiance);
    }
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
            console.log(guy.name)

            if (!guy.fiance) {
                done = false;

                var gal = guy.nextCandidate();
                console.log(gal.name)
                if (!gal.fiance || gal.prefers(guy)) {
                    guy.engageTo(gal);
                    console.log("engage", guy.name, gal.name)
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

    var smallerSet
    if (people.length <= companies.length)
        smallerSet = people
    else
        smallerSet = companies

    engageEveryone(smallerSet)

    for (var i = 0; i < smallerSet.length; i++) {
        console.log("%s is engaged to %s", smallerSet[i].name, smallerSet[i].fiance.name);
    }
    console.log("Stable = %s", isStable(people, companies) ? "Yes" : "No");
    joanna.swapWith(frances);
    console.log("Stable = %s", isStable(people, companies) ? "Yes" : "No");
}

doMarriage();