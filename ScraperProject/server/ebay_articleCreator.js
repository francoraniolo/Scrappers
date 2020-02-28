const request = require('request');
const cheerio = require('cheerio');

async function createArticle(url) {
    return new Promise((resolve, reject) => {

        request(url, (error,
            response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);


                //Busco la imagen 

                var imagenLink = $('#icImg').attr('src');


                //Busco el titulo


                var titulo = $('#itemTitle').text();


                titulo = titulo.split('\t').join('');
                titulo = titulo.split('\n').join('');
                titulo = titulo.split('Detalles acerca de  ').join('');
                titulo = titulo.replace(/\s+/, "");

                titulo = titulo.split('-mostrar título original').join('');

                //Busco los precios

                var precio = $('#prcIsum').text();
                if (precio.localeCompare('') == 0) {
                    precio = $('#prcIsum_bidPrice').text();
                }
                if (!precio.includes('US')) {
                    precio = $('#convbidPrice').text();
                }

                if (precio.localeCompare('') == 0) {
                    precio = $('#convbinPrice').text();
                }

                if (precio.localeCompare('') == 0) {
                    precio = $('#mm-saleDscPrc').text();
                }



                precio = precio.split('(con envío incluido)').join('');
                precio = precio.split('US $').join('');

                precio = precio.replace(/\s/g, '');


                var $stock = true;
                var $fecha = null;
                var $respuestaDefinitiva = null;

                let limite = 0;

                resolve({
                    'titulo': titulo,
                    'precio': precio,
                    'stock': $stock,
                    'fecha': $fecha,
                    'respuesta': $respuestaDefinitiva,
                    'url': url,
                    'imagen': imagenLink,
                    'ecommerce': 'Ebay'
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