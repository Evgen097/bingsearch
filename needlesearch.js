var needle = require('needle');
var url = require('url');

var contactsPages = ['contact', 'contacts', 'contactus', 'contact-us', 'contact_us',
    'info', 'contacts/info/', 'contact-page', 'contactinfo', 'kontakt', 'kontakts', 'kontakty',
    'kontaktnaya-informatsiya', 'aboutus', 'about', 'about_us', 'o-nas'
];

var testdata = [
    {
        "id": "https://api.cognitive.microsoft.com/api/v7/#WebPages.0",
        "name": "Землеустройство в Харькове — Городской сайт Харьков.Инфо",
        "url": "https://kharkov.info/place/nedvizhimost/zemleustrojstvo",
        "isFamilyFriendly": true,
        "displayUrl": "https://kharkov.info/place/nedvizhimost/zemleustrojstvo",
        "snippet": "Использование информации разрешается при условии обязательного указания активной гиперссылки на сайт Харьков Инфо, для печатных изданий – с формулировкой «по материалам Информационного портала Харьков Инфо».",
        "dateLastCrawled": "2018-10-31T19:40:00.0000000Z",
        "language": "ru",
        "isNavigational": false
    },
    {
        "id": "https://api.cognitive.microsoft.com/api/v7/#WebPages.1",
        "name": "Землеустройство, компания, Харьков",
        "url": "https://harkovua.com.ua/?127301",
        "isFamilyFriendly": true,
        "displayUrl": "https://harkovua.com.ua/?127301",
        "snippet": "Сертифицированные и лицензированные специалисты оказывают широкий спектр ...",
        "dateLastCrawled": "2018-10-25T22:45:00.0000000Z",
        "language": "ru",
        "isNavigational": false
    }
];

// url.resolve('http://example.com/', '/one')    // 'http://example.com/one'

var pageUrl = url.format(
    {
        protocol: url.parse(testdata[1].url).protocol,
        host: url.parse(testdata[1].url).host
    }
);
console.log(pageUrl)



async function needleQuery() {
    try {
        let data = await needle('get', pageUrl);
        // let webPages = JSON.parse(data.body).webPages;
        console.log(data.body)


    }
    catch (err) {
        var error = 'Ошибка при обращении neddle:' + err;
        console.log(error)
    }
}

// needleQuery()
























