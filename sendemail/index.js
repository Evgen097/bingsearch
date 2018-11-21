let lowdb = require('../db/lowdb');
let nodemailer = require ('nodemailer');

var gmails = require('../config').gmail;
var emaildata = require('../config').emaildata;
var send_by_gmail = require('./send_by_gmail');

const REQUEST_PERIOD = 1000;
var msgRestriction = 90;


async function sendEmails(id) {
    var emails = lowdb.getQuerieEmails(id);
    var sentmessages = lowdb.getQuerieSentMessages(id);
    var getAllSentEmails = lowdb.getAllSentEmails();
    var gmailIndex = 0;
    var count = 0;
    var gmail = gmails[gmailIndex];


    if(!emails || !emails.length){console.log("Имейлов для рассылки нету, id: ", id); return};
    if(sentmessages >= emails.length){console.log("На все имейлы сообщения уже отправлены, id: ", id); return};

    try {
        for(var i=sentmessages; i<emails.length; i++){
            var email = emails[i];
            count++;
            if(count > msgRestriction){
                count = 0;
                gmailIndex++;
            }
            if(!gmails[gmailIndex]){console.log(`Достигнуты лимиты отправки, с каждого gmail уже отправлено по ${msgRestriction} сообщений `); break; }

            if(getAllSentEmails.includes(email)){
                console.log(`На email: ${email} письмо уже было отправлено по другому поисковому запросу`);
            }else {
                emaildata.email = email;
                send_by_gmail(gmail, emaildata, id)
                await sleep(REQUEST_PERIOD);
            }

        }

    }
    catch (err) {
        var error = 'Ошибка при отправке сообщение на emails:' + err;
        console.log(error)
    }




    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}


var id = "1aof6q4jol9w87e";
// sendEmails(id)
module.exports = sendEmails;