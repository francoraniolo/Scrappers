const request = require('request');
const cheerio = require('cheerio');

var scrape = require('./amazon_scrape');
var artcreator = require('./amazon_articleCreator');



async function obtenerArticulos($term) {

    return new Promise((resolve, reject) => {
        scrape.findArticulos($term, function(err, articls) {
            if (err) {
                console.log(err);
                //reject(err);
                return;
            } else {

                console.log("articls es", articls);
                (async() => {

                    $articulos_atributos = new Array();



                    $promesas = new Array();

                    for (element of articls) {
                        $promesas.push(artcreator.createArticle(element));
                    }

                    Promise.all($promesas).then(values => {
                        resolve(values);
                    }).catch(function(e) {
                        console.log(e);
                    });

                })();
            }
        });
    });

}


/*
(async() => {

    let articuloss = await obtenerArticulos("Joystick ps4");

})();
*/

module.exports = {
    obtenerArticulos
}