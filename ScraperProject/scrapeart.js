
const request = require('request');
const cheerio = require('cheerio');

var scrape = require('./scrape');
var artcreator = require('./articleCreator');



async function obtenerArticulos($term) {

  return new Promise((resolve, reject) => {
    scrape.findArticulos($term, function (err, articls) {
      if (err) {
        console.log(err);
        reject(err); return;
      }
      else {

        (async () => {

          $articulos_atributos = new Array();
          console.log("articls es :",articls);
          for (element of articls) {

            var objetoArticulo = await artcreator.createArticle(element);
            if (objetoArticulo != null) {
              $articulos_atributos.push(objetoArticulo);
            }


          }
          resolve($articulos_atributos);
        })();
      }
    });
  });

}


(async () => {

  let articuloss = await obtenerArticulos("monopoly");
  console.log(articuloss);

})();


module.exports = {
  obtenerArticulos
}




