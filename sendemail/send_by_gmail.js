
let lowdb = require('../db/lowdb');
let nodemailer = require ('nodemailer');


function send_by_gmail(gmail, emaildata, id) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmail.user,
            pass: gmail.password
        }
    });
    const mailOptions = {
        from: gmail.user,
        to: emaildata.email, // list of receivers
        subject: emaildata.subject, // Subject line
        html: emaildata.html// plain text body
    };

    // console.log(emaildata.email)

    function updateLowdb(email){
        lowdb.updateQuerieSentMessages(id);
        lowdb.updateAllSentEmails(email);
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            updateLowdb(mailOptions.to)
            console.log(err);
        }
        else {
            updateLowdb(mailOptions.to)
            console.log("Письмо успешно отправлено");
        }
    });

};

module.exports = send_by_gmail;
















