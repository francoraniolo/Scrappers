
const request = require('request');
const cheerio = require('cheerio');

var scrape = require('./scrape');
var parser = require('./parser');

function obtenerArticulos($term){

scrape.findArticulos("mochila", function(err,articls){
    if(err) {
        console.log(err);
    }
    else {
      console.log(articls);

      
      articls.forEach(element => {
        
        var url = parser.parseDireccionUrl(element);

        console.log("El url es ",url);
        
        request(url, (error,
            response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);

                const siteHeading = $('ul.questions__list');

               
                
                siteHeading.find('li').each(function () {



                  $el = $(this).find('article.questions__item--question');
                  console.log("PREGUNTA");
                  $pregunta=$el.find('p').text().toLowerCase();
                  console.log($pregunta);
                  console.log("RESPUESTA");
                  $respuesta= $(this).find('article.questions__item--answer').find('p').text().toLowerCase();
                  console.log($respuesta);
                  console.log("FECHA Y HORA");
                  $fecha = $(this).find('article.questions__item--answer').find('time').text();
                  console.log($fecha);
                }) 

            }else{
                //callback(error);
                //console.log("Pagina no existe");
                return;
            }
        }); 
          
      });
           
    }
}); 
    

}

module.exports = {
  obtenerArticulos
}




