const request = require('request');
const cheerio = require('cheerio');

function findArticulos(input, callback) {

    console.log('El input es ', input);

    input = input.split(' ').join('+');

    input = input.toLowerCase();

    var principiourl = 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=';

    var url = principiourl.concat(input);

    console.log(url);

    request({ url: url, gzip: true }, (error,
        response, html) => {
        if (!error && response.statusCode == 200) {

            const $ = cheerio.load(html);

            const siteHeading = $('ul.srp-results');

            var arreglo = input.split('+');

            var existe;

            var $articulos = new Array();

            var $el, $titulo, $titulo_minus;

            var resultados = siteHeading.find('li.s-item');

            let limite = 0;

            for (let index = 0; index < resultados.length && limite < 10; index++) {

                $url_articulo = $(resultados[index]).find('a.s-item__link').attr('href');

                $articulos.push($url_articulo);
                limite++;

            }
            callback(null, $articulos);
        } else {
            callback(error);
            return;
        }

    });

}
/*

findArticulos("joystick ps4", function(err, articls) {
    if (err) {
        console.log(err);
        reject(err);
        return;
    } else {
        console.log(articls);
    }
}); */

module.exports = {
    findArticulos
}