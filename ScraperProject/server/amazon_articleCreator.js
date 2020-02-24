const request = require('request');
const cheerio = require('cheerio');

async function createArticle(url) {
    return new Promise((resolve, reject) => {

        request({ url: url, gzip: true }, (error,
            response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);

                //Busco la imagen 

                var imagenLink = $('li.itemNo0').find('img').attr('src');
                if (imagenLink != null) {
                    if (imagenLink.length > 150) {
                        imagenLink = $('li.itemNo0');
                        imagenLink = imagenLink.find('#imgTagWrapperId').find('img').attr('data-old-hires');

                    }
                }

                if (imagenLink.localeCompare('') == 0) {
                    imagenLink = null;
                }

                //Busco el titulo

                var titulo = $('#productTitle').text();

                titulo = titulo.split('\n').join('');
                titulo = titulo.split('"').join('');
                titulo = titulo.split('  ').join('');




                //Busco los precios

                var espacioPrecio = $('#priceblock_ourprice');


                var precioPrimerParte = espacioPrecio.find('span.price-large');

                var precio = precioPrimerParte.text().
                concat('.').concat(espacioPrecio.find('span.price-info-superscript').text());


                precio = precio.split('\n').join('');
                precio = precio.split(' ').join('');
                precio = precio.split('$').join('');


                if (precio.localeCompare('\t\t\t\t') == 0) {
                    var espacioPrecio = $('#usedPitchPrice');
                    var precioPrimerParte = espacioPrecio.find('span.price-large');

                    var precio = precioPrimerParte.text().
                    concat('.').concat(espacioPrecio.find('span.price-info-superscript').text());

                    precio = precio.split('\n').join('');
                    precio = precio.split(' ').join('');
                    precio = precio.split('$').join('');
                }

                if (precio.localeCompare('.') == 0) {
                    var precio = $('#priceblock_ourprice').text();
                    precio = precio.split('US$&nbsp;').join('');

                    precio = precio.split('\n').join('');
                    precio = precio.split(' ').join('');
                    precio = precio.split('$').join('');
                }

                if (precio.localeCompare('') == 0) {
                    var precio = $('#price_inside_buybox').text();
                    precio = precio.split('US$&nbsp;').join('');

                    precio = precio.split('\n').join('');
                    precio = precio.split(' ').join('');
                    precio = precio.split('$').join('');
                }

                if (precio.localeCompare('') == 0) {

                    var precio = $('#newBuyBoxPrice').text();
                    precio = precio.split('US$&nbsp;').join('');

                    precio = precio.split('\n').join('');
                    precio = precio.split(' ').join('');
                    precio = precio.split('$').join('');
                }

                if (precio.localeCompare('') == 0) {

                    var precio = $('#buyNewSection').find('span.offer-price').text();
                    precio = precio.split('US$&nbsp;').join('');

                    precio = precio.split('\n').join('');
                    precio = precio.split(' ').join('');
                    precio = precio.split('$').join('');
                }


                if (precio.localeCompare('') == 0) {

                    var precio = $('#newOfferAccordionRow').find('div.a-span4').find('span.a-color-price').text();
                    precio = precio.split('US$&nbsp;').join('');
                    precio = precio.split('\t').join('');
                    precio = precio.split('\n').join('');
                    precio = precio.split(' ').join('');
                    precio = precio.split('$').join('');
                }

                precio = precio.split(',').join('');

                if (precio.localeCompare('') == 0) {
                    precio = null;
                }

                var disponibilidad = $('#availability').text();

                var $stock = (!disponibilidad.includes('No disponible'));

                var $fecha = null;
                var $respuestaDefinitiva = null;

                resolve({
                    'titulo': titulo,
                    'precio': precio,
                    'stock': $stock,
                    'fecha': $fecha,
                    'respuesta': $respuestaDefinitiva,
                    'url': url,
                    'imagen': imagenLink,
                    'ecommerce': 'Amazon USA'
                });
            } else {
                resolve(null);
                return;
            }
        });

    });

}

module.exports = {
    createArticle
}