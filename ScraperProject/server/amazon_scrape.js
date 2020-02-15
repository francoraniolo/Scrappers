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

    request(url, (error,
        response, html) => {
        if (!error && response.statusCode == 200) {


            const $ = cheerio.load(html);

            const siteHeading = $('div.s-result-list');

            var arreglo = input.split('+');

            var existe;

            var $articulos = new Array();

            var $el, $titulo, $titulo_minus;

            var resultados = siteHeading.find('div.s-result-item');

            let limite = 0;

            for (let index = 0; index < resultados.length && limite < 10; index++) {

                // existe = true;
                // $el = $(resultados[index]).find('span.main-title');
                // $titulo_minus = $el.text().toLowerCase();

                // arreglo.forEach(function(entrada) {

                //     if (existe) existe = $titulo_minus.includes(entrada);

                // })

                //    if (existe) {
                $url_articulo = 'https://www.amazon.com'.concat($(resultados[index]).find('a.a-link-normal').attr('href'));
                console.log('EL URL ES ', $url_articulo);
                $articulos.push($url_articulo);
                limite++;

                //    }

            }
            callback(null, $articulos);
        } else {
            callback(error);
            return;
        }

    });

} //FIN DE FUNCION


var $articulosEncontrados;
findArticulos("joystick ps4", function(err, articls) {
    if (err) {
        console.log(err);
        reject(err);
        return;
    } else {
        console.log(articls);
    }
});

module.exports = {
    findArticulos
}