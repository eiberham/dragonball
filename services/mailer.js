const nodemailer = require('nodemailer');

class Mailer {
    options;
    transporter;

    constructor(from, to, subject, text){
        this.options = {
            from,
            to,
            subject,
            text
        }

        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.MAIL_ACCOUNT,
              pass: process.env.MAIL_PWD
            }
        });
    }

    send(){
        return new Promise((reject, resolve) => {
            this.transporter.sendMail(this.options, function(error, info) {
                if (error) {
                  reject(error);
                } else {
                  resolve("Email successfully sent!");
                }
            });
        })
    }
}

module.exports = Mailer;