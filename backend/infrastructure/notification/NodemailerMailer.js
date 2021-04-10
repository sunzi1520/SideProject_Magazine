'use strict';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'group4.greenwich@gmail.com',
        pass: 'JustForAcademicPurpose91~'
    }
});

module.exports = class {

    async sendMail(receiver, content, subject = '') {
        const mailOptions = {
            from: 'Group 4 - Enterprise Web Software Development',
            to: receiver,
            subject: subject,
            text: content
            };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}