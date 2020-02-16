const request = require('request');
const cheerio = require('cheerio');

// INICIO FUNCION 
function findArticulos(input, callback) {

    console.log('El input es ', input);

    input = input.split(' ').join('+');

    input = input.toLowerCase();

    var principiourl = 'https://www.amazon.com/s?k=';

    var url = principiourl.concat(input);

    console.log(url);

    request({ url: url, gzip: true }, (error,
        response, html) => {
        if (!error && response.statusCode == 200) {

            const $ = cheerio.load(html);

            const siteHeading = $('span.s-latency-cf-section').find('div.s-result-list');

            var arreglo = input.split('+');

            var existe;

            var $articulos = new Array();

            var $el, $titulo, $titulo_minus;

            var resultados = siteHeading.find('div.s-result-item');
            console.log("resultados length", resultados.length);
            let limite = 0;

            for (let index = 0; index < resultados.length && limite < 10; index++) {

                $url_articulo = 'https://www.amazon.com'.concat($(resultados[index]).find('a.a-link-normal').attr('href'));
                if (!$url_articulo.includes('/gp/')) {
                    $articulos.push($url_articulo);
                    limite++;
                }


                //    }

            }
            callback(null, $articulos);
        } else {
            callback(error);
            return;
        }

    });

} //FIN DE FUNCION

/*
var $articulosEncontrados;
findArticulos("joystick ps4", function(err, articls) {
    if (err) {
        console.log(err);
        reject(err);
        return;
    } else {
        console.log(articls);
    }
});*/

module.exports = {
    findArticulos
}