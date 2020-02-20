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

getDolarValue(url, function(err, dolarAhora) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log("El valor del dolar ahora es ", dolarAhora);
    }
});