const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // mongodb connection
    methodOverride = require('method-override');  // used to manipulate POST data
const User = mongoose.model('User');

// function updateUser(req, res, user) {
//     let thisUser;
//     if (user._id!="000000") {
//         thisUser = User.findById(user._id);

//         if (!thisUser) {
//             handleError(new Error(), res, 'Not Found', 404);
//         } else {
//             thisUser.name = req.body.name;
//             // thisUser.username = req.body.username;
//             // thisUser.password = req.body.password;
//             // thisUser.emailAddress = req.body.emailAddress;
//             // thisUser.gender = req.body.gender;
//             // thisUser.address = req.body.address;
//             // thisUser.favoriteGenre = req.body.favoriteGenre;
//             // thisUser.hiredBy = req.body.hiredBy;
//             // thisUser.artpieces = req.body.artpieces;
//             User.update( (err, user) => {
//                 if (err) {
//                     handleError(err, res, 'Could not update user1', 400);
//                 } else {
//                     res.json(User.findById(user._id));
//                 }
//             });
//         }
//     } else {
//         handleError(new Error(), res, 'Could not update user2', 400);
//     }
// }


router.use(methodOverride( (req) => {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

function handleError(err, res, msg, statusCode) {
    res.status(statusCode);
    err.status = statusCode;
    err.message = msg;
    res.json({ message: err.status + ' ' + err }); 
}

// READY to build our API
router.route('/')
    // GET all users
    .get( (req, res) => {
        User.find({},  (err, users) => {
            if (err) {
                handleError(err, res, 'Not Found', 404);
            } else {
                res.json(users);
            }
        });
    })
    // TODO: ADD a user
    .post((req, res) => {
        // This is just a start of what you need to do
        User.create({
            username : req.body.username,
            password : req.body.password,
            __v : req.body.__v,
            artpieces : []
        }, (err, user) => {
            if (err) {
                res.status(400);
                handleError(err,res,'Error creating user');
                return;
            }else{
                res.json(user);
            }
        });
        
    });


router.route('/uname/:uname')
    // GET user by userName
    .get( (req, res) => {
        console.log("object");
        if (req.params && req.params.uname) {
            User.find({username: req.params.uname}, (err, user) => {
                if (err) {
                    handleError(err, res, 'Not Found', 404);
                } else {
                    res.json(user); 
                }
            });
        } else {
            handleError(new Error(), res, 'GET error, problem retrieving data', 404);
        }
    });


router.route('/:userid')
    // GET user by id
    .get( (req, res) => {
        if (req.params && req.params.userid) {
            User.findById(req.params.userid, (err, user) => {
                if (err) {
                    handleError(err, res, 'Not Found', 404);
                } else {
                    res.json(user); 
                }
            });
        } else {
            handleError(new Error(), res, 'GET error, problem retrieving data', 404);
        }
    })

    // update user by id
    .put( function (req, res) {
        User.findById(req.params.userid, function (err, user) {
            user.name = req.body.name||user.name;
            user.username = req.body.username||user.username;
            // user.password = req.params.password||user.name;
            // user.emailAddress = req.params.emailAddress||user.emailAddress;
            // user.gender = req.params.gender||user.gender;
            // user.address = req.params.address||user.address;
            // user.favoriteGenre = req.params.favoriteGenre||user.favoriteGenre;
            // user.hiredBy = req.params.hiredBy||user.hiredBy;
            // user.artpieces = req.params.artpieces||user.artpieces;
            user.emailAddress = req.body.emailAddress||user.emailAddress;
            user.gender = req.body.gender||user.gender;
            user.address = req.body.address||user.address;
            user.favoriteGenre = req.body.favoriteGenre||user.favoriteGenre;
            user.hiredBy = req.body.hiredBy||user.hiredBy;
            user.artpieces = req.body.artpieces||user.artpieces;
            user.password = req.body.password||user.password;
            //console.log(req.body.name);
            user.save(function (err, rev) {
                if (err) {
                    res.status(404);
                    handleError(err, res, 'Problem updating user');
                } else {
                    res.format({
                        json: function () {
                            res.json(rev);
                        }
                    });
                }
            });
        });
    });


module.exports = router;
