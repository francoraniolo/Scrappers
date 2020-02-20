const request = require('request');
const cheerio = require('cheerio');

const url = "https://www.precio-dolar.com.ar/";

function getDolarValue(url, callback) {

    request(url, (error,
        response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            var valorDolar = $('div.sc-htoDjs').text();

            var arreglo = valorDolar.split('$');
            valorDolar = arreglo[2];

            callback(null, valorDolar);

        } else {
            callback(error);
            return;
        }
    });
}

function getDolar(url) {

    return new Promise((resolve, reject) => {
        getDolarValue(url, function(err, value) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            } else {
                console.log("El valor es ", value);
                resolve(value);
            }
        });
    });
}


getDolar(url).then(function(res) {
    console.log("Res es ", res);
});


module.exports = {
    getDolar
}