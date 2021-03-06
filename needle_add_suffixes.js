var url = require('url');
const db = require('./db/index');

var suffixes = ['contact', 'contacts', 'contactus', 'contact-us', 'contact_us',
    'info', 'contacts/info/', 'contact-page', 'contactinfo', 'kontakt', 'kontakts', 'kontakty',
    'kontaktnaya-informatsiya', 'aboutus', 'about', 'about_us', 'o-nas'
];


function createContactsUrl(page) {
    let result = [];
    let domain = url.format({protocol: url.parse(page).protocol, host: url.parse(page).host});
    result.push(domain)
    suffixes.forEach( (suffix) => result.push(url.resolve(domain, suffix)) );
    return result;
}


function addEmails(id) {
    var webpages = db.get('queries').find({ _id: id }).value().webpages;

    webpages.forEach( (page, index) => {
        var pageUrlArr = [];
        pageUrlArr.push(page.url);
        createContactsUrl(page.url).forEach( elem => pageUrlArr.push(elem) )
        webpages[index].urls = pageUrlArr;
    } );

    db.get('queries')
        .find({ _id: id })
        .assign({ webpages: webpages})
        .write();
}

// addEmails('1aof6q4jol9w87e')

module.exports = addEmails;




















