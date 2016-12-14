const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const randomstring = require("randomstring");
const config = require("../config/db.json");
const mode = config.mode;
const db = config[mode];
const correo = db.mail.email;
const pwd = db.mail.pwd;
const transporter = nodemailer.createTransport('smtps://' + correo + ':' + pwd + '@smtp.gmail.com');


function sendMailRegistro(data, done) {

    var nombre = data.name;
    var codigo = data.codigo;
    var usermail = data.usermail;
    console.log("correo : " + correo);
    console.log("pwd : " + pwd);
    console.log("usermail: " + usermail);

    var mailGenerator = new Mailgen({
        theme: 'salted',
        product: {
            name: 'MGD',
            link: 'http://mgd.pe/',
            copyright: '© 2016 MGD - Proveedores de Servicio de Internet - Lima - Lince - Perú'
            //logo: ''
        }
    });
    var email = {
        body: {
            greeting: 'Hola,',
            signature: 'Saludos, ',
            title: 'Nuevo registro',
            name: nombre,
            intro: 'Se le informa que se ha generado el registro en el sistema de cliente de MDG ' +
            'por favor ingrese pulsando el siguiente botón.',
            action: {
                instructions: 'Validar su cuenta con la siguiente clave : ' + codigo,
                button: {
                    color: '#0275d8',
                    text: 'Ingresar',
                    link: ''
                }
            }
            ,
            outro: 'Cualquier consulta o inconveniente comunicarse al siguiente correo: '
        }
    };
    var emailBody = mailGenerator.generate(email);
    var mailOptions = {
        from: 'MGD',
        to: usermail,
        subject: 'Registro - Sistema de clientes',
        text: 'text',
        html: emailBody
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return done(error);
        }
        done(null, { cod: 1, msg: "Correo enviado con éxito" });
    });

}


module.exports = {
    sendMailRegistro
}