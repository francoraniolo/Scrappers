const request = require('request');
const cheerio = require('cheerio');

async function createArticle(url) {
    return new Promise((resolve, reject) => {

        request(url, (error,
            response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);

                //Busco los precios
                var priceTags = $('#short-desc').find('span.price-tag-fraction');

                var precio;

                //Si hay dos, es porque esta en oferta y el segundo es el precio actual

                if (priceTags.length > 1) {
                    precio = '$ '.concat($(priceTags[1]).text());
                } else {
                    precio = '$ '.concat($(priceTags[0]).text());
                }

                const siteHeading = $('ul.questions__list');

                var $stock = false;
                var $fecha, $fechaTemprana;

                let limite = 0;

                var preguntasRespuestas = siteHeading.find('li');

                var $respuestaDefinitiva;

                var dosSemanas = new Date();
                var aux = dosSemanas.getDate() - 14;
                dosSemanas.setDate(aux);

                $fechaTemprana = dosSemanas;

                for (let index = 0; index < preguntasRespuestas.length && index < 10; index++) {

                    if (!$stock) {

                        $el = $(preguntasRespuestas[index]).find('article.questions__item--question');

                        $pregunta = $el.find('p').text().toLowerCase();
                        $zonarespuesta = $(preguntasRespuestas[index]).find('article.questions__item--answer');

                        //Obtengo la fecha y hora en texto, y me quedo con la fecha en string

                        $fecha = $zonarespuesta.find('time').text();
                        $fecha = $fecha.substring(0, ($fecha.indexOf(':') - 3));
                        $fecha = $fecha.split('/').join('-');
                        $fecha = $fecha.split(' ').join('');

                        $fechaArreglo = $fecha.split('-');

                        //Genero la fecha

                        fechaArticulo = new Date($fechaArreglo[2], $fechaArreglo[1] - 1, $fechaArreglo[0]);

                        //Si es de hace menos de 2 semanas, analizo

                        diferencia = (fechaArticulo.getTime() - dosSemanas.getTime());

                        if (diferencia > 0) {


                            if ($pregunta.includes('stock')) {

                                $respuesta = $zonarespuesta.find('p').text().toLowerCase();

                                if ($respuesta.includes('si ') || $respuesta.includes('sí ')
                                    || $respuesta.includes('si,') || $respuesta.includes('sí,')) {
                                    $stock = true;

                                    //Si la pregunta de stock es más reciente que la que tenía la reemplazo
                                    if ((fechaArticulo.getTime() - $fechaTemprana.getTime()) > 0) {
                                        $fechaTemprana = fechaArticulo;
                                    }


                                    $respuestaDefinitiva = $respuesta;

                                    $fecha = $zonarespuesta.find('time').text().substring(0, 10);


                                } else {
                                    if (($respuesta.includes('tenemos')) && (!$respuesta.includes(' no'))) {
                                        $stock = true;
                                        //Si la pregunta de stock es más reciente que la que tenía la reemplazo
                                        if ((fechaArticulo.getTime() - $fechaTemprana.getTime()) > 0) {
                                            $fechaTemprana = fechaArticulo;
                                        }

                                        $respuestaDefinitiva = $respuesta;

                                        $fecha = $zonarespuesta.find('time').text().substring(0, 10);
                                    } else {

                                        //Probablemente no hay stock, ver que hacer. 

                                    }
                                }

                            }
                        }
                    }
                }

                resolve({ 'precio': precio, 'stock': $stock, 'fecha': $fecha, 'respuesta': $respuestaDefinitiva, 'url': url });
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
