const request = require('request');
const cheerio = require('cheerio');

var scrape = require('./ebay_scrape');
var artcreator = require('./ebay_articleCreator');


async function obtenerArticulos($term) {

    return new Promise((resolve, reject) => {
        scrape.findArticulos($term, function(err, articls) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            } else {

                (async() => {

                    $articulos_atributos = new Array();



                    $promesas = new Array();

                    for (element of articls) {
                        $promesas.push(artcreator.createArticle(element));
                    }

                    Promise.all($promesas).then(values => {
                        resolve(values);
                    });

                })();
            }
        });
    });

}

/*
(async() => {

    let articuloss = await obtenerArticulos("Joystick ps4");
    console.log(articuloss);
})();
*/

module.exports = {
    obtenerArticulos
}