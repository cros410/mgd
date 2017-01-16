const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const dbc = require("../config/db.json");
const mode = dbc.mode;
const db = dbc[mode];
const dbconfig = {
    connection: {
        host: db.host,
        user: db.user,
        password: db.pwd,
        port: db.port
    },
    database: "mgd2015_usuarios",
    users_table: "usuarios"
}
const connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.dni);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        connection.query("SELECT * FROM usuarios WHERE dni = ? ", [id], function (err, rows) {
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'dni',
            passwordField: 'pwd',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
            function (req, username, password, done) {
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                connection.query("SELECT * FROM usuarios WHERE dni = ? ", [username], function (err, rows) {
                    if (err) {
                        return done(err);
                    } else {
                        if (rows.length) {
                            return done(null, false, req.flash('signupMessage', 'Ya se registro este DNI'));
                        } else {
                            var newUserMysql = {
                                dni: username,
                                pwd: bcrypt.hashSync(password, null, null),  // use the generateHash function in our user model
                                nombre: req.body.nombre,
                                direc: req.body.direc,
                                distrito: req.body.distrito,
                                celular: req.body.celular,
                                telefono: req.body.telefono,
                                correo: req.body.correo,
                                plan: req.body.plan,
                                megas: req.body.megas
                            };
                            var insertQuery = "INSERT INTO usuarios SET ? ";
                            connection.query(insertQuery, newUserMysql , function (err, rows) {
                                if (err) {
                                    console.log("ERR : " + err);
                                } else {
                                    newUserMysql.id = rows.insertId;
                                    return done(null, newUserMysql);
                                }
                            });
                        }
                    }
                });
            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'dni',
            passwordField: 'pwd',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
            function (req, username, password, done) { // callback with email and password from our form
                connection.query("SELECT * FROM usuarios WHERE dni = ? ", [username], function (err, rows) {
                    if (err) {
                        return done(err);
                    } else {
                        if (!rows.length) {
                            return done(null, false, req.flash('loginMessage', 'Usuario no registrado')); // req.flash is the way to set flashdata using connect-flash
                        } else {
                            if (!bcrypt.compareSync(password, rows[0].pwd)) {
                                return done(null, false, req.flash('loginMessage', 'Contraseña equivocada')); // create the loginMessage and save it to session as flashdata
                            } else {
                                // all is well, return successful user
                                return done(null, rows[0]);
                            }
                        }
                    }
                });
            })
    );
};