
const db = require('./index');
let lowdb = {};
// lowdb.updateQuerieEmails(id, result)
// lowdb.updateQuerieEmailsStatistic(id, emailStatistic)

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

module.exports = lowdb;




























