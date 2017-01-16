'use strict';
module.exports = function (app, passport) {

    // Middleware solo para login
    app.get('/login', function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect("/profile");
        } else {
            next();
        }
    });
    //Show login scream
    app.get('/login', function (req, res) {
        res.render("login", { messages: req.flash('loginMessage') });
    });
    //Login a user and pass profile
    app.post('/login', passport.authenticate('local-login', {
        //successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }), function (req, res) {
        /*if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }*/
        var tipo = req.user.tipo;
        if (tipo === 1) {
            console.log("Admin");
        } else if (tipo === 1) {
            console.log("Usuario");
        }
        res.redirect("/profile");
    });
    //show principal page from  usuario
    app.get('/profile', isLoggedIn, function (req, res) {
        if (req.user.tipo === 1) {
            res.redirect("/admin/usuarios");
        } else {
            res.send({
                user: req.user // get the user out of session and pass to template
            });
        }
    });
    //Show Register user page
    app.get('/signup', function (req, res) {
        res.send("mostrar registro ");
    });
    //Register a user
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    //Sing out a user
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect("/login");
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect("/login");
}

