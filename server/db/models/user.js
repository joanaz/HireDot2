'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

/* Removed Items From Original User JSON file
_id
_t
_v
available
id
token {}
google {}
*/


var schema = new mongoose.Schema({
    "provider": {
        type: String
    },
    "lastName": {
        type: String
    },
    "firstName": {
        type: String
    },
    "fullName": {
        type: String
    },
    "email": {
        type: String
    },
    password: {
        type: String,
    },
    salt: {
        type: String
    },
    preferences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],
    currentCompany: {
        type: String
    },
    "resume": {
        "url": {
            type: String,
        }
    },
    "phone": {
        type: String
    },
    "status": {
        type: String
    },
    "online": {
        type: Boolean
    },
    "currentAction": {
        type: String
    },
    "previousAction": {
        type: String
    },
    "lastOnline": {
        type: String
    },
    "github": {
        "login": {
            type: String
        },
        "id": {
            type: Number
        },
        "avatar_url": {
            type: String
        },
        "gravatar_id": {
            type: String
        },
        "url": {
            type: String
        },
        "html_url": {
            type: String
        },
        "followers_url": {
            type: String
        },
        "following_url": {
            type: String
        },
        "gists_url": {
            type: String
        },
        "starred_url": {
            type: String
        },
        "subscriptions_url": {
            type: String
        },
        "organizations_url": {
            type: String
        },
        "repos_url": {
            type: String
        },
        "events_url": {
            type: String
        },
        "received_events_url": {
            type: String
        },
        "type": {
            type: String
        },
        "site_admin": {
            type: Boolean
        },
        "name": {
            type: String
        },
        "company": {
            type: String
        },
        "blog": {
            type: String
        },
        "location": {
            type: String
        },
        "email": {
            type: String
        },
        "hireable": {
            type: Boolean
        },
        "bio": {
            type: String
        },
        "public_repos": {
            type: Number
        },
        "public_gists": {
            type: Number
        },
        "followers": {
            type: Number
        },
        "following": {
            type: Number
        },
        "created_at": {
            type: String
        },
        "updated_at": {
            type: String
        },
        "private_gists": {
            type: Number
        },
        "total_private_repos": {
            type: Number
        },
        "owned_private_repos": {
            type: Number
        },
        "disk_usage": {
            type: Number
        },
        "collaborators": {
            type: Number
        },
        "plan": {
            "name": {
                type: String
            },
            "space": {
                type: Number
            },
            "collaborators": {
                type: Number
            },
            "private_repos": {
                type: Number
            }
        }
    },
    "campus": {
        type: String
    },
    "linkedin": {
        "url": {
            type: String,
        }
    },
    "slack": {
        "ok": {
            type: Boolean
        },
        "url": {
            type: String
        },
        "team": {
            type: String
        },
        "user": {
            type: String
        },
        "team_id": {
            type: String
        },
        "user_id": {
            type: String
        },
    },
    "participateHiringDay": {
        type: Boolean
    },
    "needsGithubReset": {
        type: Boolean
    },
    "cohorts": [{
        type: String
    }],
    "lockout": {
        type: Boolean
    },
    "completeActions": [{
        type: String
    }, ],
    "roles": [{
        type: String
    }, ],
    "followers": [{
        type: String
    }, ],
    "role": {
        type: String,
        enum: ['Admin', 'Student'],
        default: 'Student',
    },
    // "token": {
    //     "__t": {
    //         type: String
    //     },
    //     "_id": {
    //         type: String
    //     },
    // },
    "profile": {
        "github": {
            "login": {
                type: String
            },
            "id": {
                type: Number
            },
            "avatar_url": {
                type: String
            },
            "gravatar_id": {
                type: String
            },
            "url": {
                type: String
            },
            "html_url": {
                type: String
            },
            "followers_url": {
                type: String
            },
            "following_url": {
                type: String
            },
            "gists_url": {
                type: String
            },
            "starred_url": {
                type: String
            },
            "subscriptions_url": {
                type: String
            },
            "organizations_url": {
                type: String
            },
            "repos_url": {
                type: String
            },
            "events_url": {
                type: String
            },
            "received_events_url": {
                type: String
            },
            "type": {
                type: String
            },
            "site_admin": {
                type: Boolean
            },
            "name": {
                type: String
            },
            "company": "",
            "blog": "",
            "location": "",
            "email": "",
            "hireable": {
                type: Boolean
            },
            "bio": {
                type: String
            },
            "public_repos": {
                type: Number
            },
            "public_gists": {
                type: Number
            },
            "followers": {
                type: Number
            },
            "following": {
                type: Number
            },
            "created_at": {
                type: String
            },
            "updated_at": {
                type: String
            },
            "private_gists": {
                type: Number
            },
            "total_private_repos": {
                type: Number
            },
            "owned_private_repos": {
                type: Number
            },
            "disk_usage": {
                type: Number
            },
            "collaborators": {
                type: Number
            },
            "plan": {
                "name": {
                    type: String
                },
                "space": {
                    type: Number
                },
                "collaborators": {
                    type: Number
                },
                "private_repos": {
                    type: Number
                }
            }
        },
        "email": {
            type: String
        },
        "lastName": {
            type: String
        },
        "firstName": {
            type: String
        },
        "fullName": {
            type: String
        },
    },
    "cohort": {
        type: String
    },



    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    // salt: {
    //     type: String
    // },
    // name: {
    //     first: {
    //         type: String
    //     },
    //     last: {
    //         type: String
    //     }
    // },
    // title: {
    //     type: String
    // },
    // role: [{
    //     type: String,
    //     enum: ['Admin', 'Student', 'Company'],
    //     default: 'Student',
    //     required: true
    // }],
    // photo: {
    //     type: String,
    //     default: "https://lh3.googleusercontent.com/-nW_UEE8QEN4/AAAAAAAAAAI/AAAAAAAAAAA/_AVZs4E6WjQ/photo.jpg",
    //     unique: true
    // },
    // cohort: {
    //     type: Number
    // },
    // fellow: {
    //     type: Boolean
    // },
    // preferences: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // }],
    // currentCompany: {
    //     type: String,
    // },
    // socialLinks: {
    //     linkedin: {
    //         type: String,
    //         // unique: true
    //     },
    //     github: {
    //         type: String,
    //         // unique: true
    //     },
    //     website: {
    //         type: String
    //     },
    //     angellist: {
    //         type: String,
    //         // unique: true
    //     }
    // },
    // resume: {
    //     type: String,
    //     unique: true
    // }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function(next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function(candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
