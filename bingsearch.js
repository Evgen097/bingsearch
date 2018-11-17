var uniqid = require('uniqid');
var moment = require('moment-timezone');
moment().format();

const db = require('./db/index');

var KEY = require('./config').bingKey;
var queryString = "введите пожалуйста запрос";
var queryQuantity = 50;
var queryOffset = 0;
const LIMIT = 50;
const REQUEST_PERIOD = 1000;
var allQueriesResults = [];

var Bing = require('node-bing-api')({ accKey: KEY });
var util = require('util'),
    Bing = require('node-bing-api')({ accKey: KEY }),
    searchBing = util.promisify(Bing.web.bind(Bing));


async function bingQuery(queryString, id, offset) {
    try {
        let data = await searchBing(  queryString, {count: queryQuantity, offset: offset});
        let webPages = JSON.parse(data.body).webPages;

        if (!webPages) return resultsHandling(null, queryString, id);

        webPages.value.forEach(item => allQueriesResults.push(item));
        if( webPages.value.length > 40 && offset < LIMIT ){
            await sleep(REQUEST_PERIOD);
            offset += webPages.value.length;
            bingQuery(queryString, id, offset);
        }else {
            return resultsHandling(null, queryString, id);
        }

    }
    catch (err) {
        var error = 'Ошибка при обращении в BING:' + err;
        resultsHandling(error, queryString, id)
    }
}


function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}


function resultsHandling(err, queryString, id) {
    var query = {_id: id,
        query: queryString,
        error: null,
        date: moment().locale('ru').format('LLLL'),
        message: '',
        webpages: allQueriesResults
    };

    if(err){
        query.error = err;
    }
    else if(allQueriesResults.length){
        query.message = `Обработка завершена, получено: ${allQueriesResults.length} соответствий`;
    }else {
        query.message = `Нет результатов по запросу: "${queryString}"`;
    }
    console.log(query)
    db.get('queries')
        .push(query)
        .write();
}

function bingSearch(queryString) {
    let id = uniqid();
    bingQuery(queryString, id, queryOffset);
}

// bingSearch("харьков землеустройство")
module.exports = bingSearch;