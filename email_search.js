var async = require('async');
var needle = require('needle');
var emailsRegex = require('emails-regex');
const db = require('./db/index');
let lowdb = require('./db/lowdb');

var parallelWorkers = 10;

function emailsSearch(id) {
    var result = [];
    var emailStatistic = {};
    var pagesUrls = [];
    var webpages = db.get('queries').find({ _id: id }).value().webpages;

    if(webpages && webpages.length){
        webpages.forEach( page => {
           if (page.urls && page.urls.length) {pagesUrls.push( page.urls );
           }else {pagesUrls.push( [] )}})
    }

    var q = async.queue(function (url, callback) {
        needle.get(url, function(err, res){
            if (err) { return console.log('error in needle url: ' + url); };
            var emails = res.body.match(emailsRegex());
            if (emails && emails.length) {emails.forEach( email => {
                if (!result.includes(email)) result.push(email);
            })}
            try {
                emailStatistic[url] = [];
                if (emails && emails.length) {emails.forEach( email => {
                    emailStatistic[url].push(email);
                })}
            }catch (e) {emailStatistic.url = e;}

            callback();
        });
    }, parallelWorkers);

    q.drain = function () {
        console.log('The queue has finished processing!');
        lowdb.updateQuerieEmails(id, result);
        lowdb.updateQuerieEmailStatistic(id, emailStatistic);
    };


    function startQueue(){
        pagesUrls.forEach( urls=>{
            urls.forEach( url =>{
                q.push(url, function (err) {
                    if (err) { return console.log('error in adding tasks to queue'); }
                });
            } )
        } );
    }

    startQueue()


}

var id = '1aof6q4jol9w87e';
emailsSearch(id);




















































