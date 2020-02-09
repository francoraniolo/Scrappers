const request = require('request');
const cheerio = require('cheerio');

// INICIO FUNCION 
function findArticulos(input, callback) {

    console.log('El input es ', input);

    input = input.split(' ').join('-');

    input = input.toLowerCase();

    var principiourl = 'https://listado.mercadolibre.com.ar/';

    var url = principiourl.concat(input);

    request(url, (error,
        response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const siteHeading = $('#searchResults');

            var arreglo = input.split('-');

            var existe;

            var $articulos = new Array();

            var $el, $titulo, $titulo_minus;

            var resultados = siteHeading.find('li.article');

            let limite = 0;

            for (let index = 0; index < resultados.length && limite<10; index++) {

                existe = true;
                $el = $(resultados[index]).find('span.main-title');
                $titulo_minus = $el.text().toLowerCase();

                arreglo.forEach(function (entrada) {

                    if (existe) existe = $titulo_minus.includes(entrada);

                })

                if (existe) {
                    
                    $articulos.push($(resultados[index]).find('div.images-viewer').attr('item-url'));
                    limite++;

                }

            }
            callback(null, $articulos);
        } else {
            callback(error);
            return;
        }

    });

} //FIN DE FUNCION

module.exports = {
    findArticulos
}
