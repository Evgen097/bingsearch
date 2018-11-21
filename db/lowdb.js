
const db = require('./index');
let lowdb = {};

lowdb.updateQuerieEmails = function(id, data){
    db.get('queries')
        .find({ _id: id })
        .assign({ emails: data})
        .write();
}
lowdb.updateQuerieEmailStatistic = function(id, data){
    db.get('queries')
        .find({ _id: id })
        .assign({ emailstatistics: data})
        .write();
}
lowdb.getQuerieEmails = function(id){
    var result = db.get('queries').find({ _id: id }).value().emails;
    return result;
}
lowdb.getQuerieSentMessages = function(id){
    var result = db.get('queries').find({ _id: id }).value().sentmessages;
    return result;
}

lowdb.updateQuerieSentMessages = function(id){
    db.get('queries').find({ _id: id }).update('sentmessages', n => n + 1)
        .write();
}

lowdb.getAllSentEmails = function(){
    var result = db.get('allsentemails').value();
    return result;
}

lowdb.updateAllSentEmails = function(email){
    db.get('allsentemails')
        .push(email)
        .write()
}


module.exports = lowdb;




























