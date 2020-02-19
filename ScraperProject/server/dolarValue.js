const request = require('request');
const cheerio = require('cheerio');

const url = "http://www.dolarhoy.com";

function getDolarValue(url, callback) {

    request(url, (error,
        response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            var valorDolar = $('span.pull-right').text();

            console.log("El valor del dolar ahora es ", valorDolar);

            callback(null, valorDolar);

        } else {
            callback(error);
            return;
        }
    });
}

getDolarValue(url, function(err, dolarAhora) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log(dolarAhora);
    }
});