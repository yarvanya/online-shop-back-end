const fs = require('fs');
const path = require('path');
const config = require('../../config/mailerConfig');

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const handlebars = require('handlebars');

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 25,
    auth: {
        user: config.email,
        pass: config.pass
    },
    tls: {
        rejectUnauthorized: false
    }
}));

module.exports = {
    send(data) {
        console.log(data);
        const url = `${data.host}${data.route}${data.token || ''}`;
        const userEmail = data.email;
        const html = `
            <div class="container">
                <h2 class="center">Activation</h2>
                <p class="center">Hello {{userEmail}}!</p>
                <blockquote>
                    <p>Thank you for registration.</p>
                    <p>To activate your account please follow this <a href="{{url}}">link </a>. </p>
                </blockquote>
                <p class="center small">Please note: This e-mail was sent from a notification-only address
                that cannot accept incoming e-mail. Please do not reply to this message.</p>
            </div>
        `;
        const template = handlebars.compile(html);
        const replacements = {
            userEmail: userEmail,
            url: url
        };
        const htmlToSend = template(replacements);

        console.log(url);
        let helperOptions = {
            from: '"Mocofrona" <mocofrona@gmail.com>',
            to: data.email,
            subject: 'Activation!',
            html: htmlToSend
        };

        transporter.sendMail(helperOptions, (err, info) => {
            if (err) {
                return err;
            } else {
                return info;
            }
        });
    }
}
