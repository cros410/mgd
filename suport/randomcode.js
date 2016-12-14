const randomstring = require("randomstring");

function getRandomCode() {
     return randomstring.generate({
        length: 5,
        charset: 'alphanumeric',
        capitalization: "uppercase"
    });
}

module.exports = {
    getRandomCode
}