const request = require('request');
const cheerio = require('cheerio');

//var input='pokemon sword';

//var input = input.split(' ').join('-');

//console.log('El input es ',input );

//var principiourl='https://listado.mercadolibre.com.ar/';

//var url = principiourl.concat(input);



// INICIO FUNCION 
function findArticulos(input, callback){
  
input= input.split(' ').join('-');
console.log('El input es ',input );

var principiourl='https://listado.mercadolibre.com.ar/';

var url = principiourl.concat(input);

request(url, (error,
    response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const siteHeading = $('#searchResults');

        var arreglo = input.split('-');

        var existe;

        var $articulos= new Array();

        var $el, $titulo, $titulo_minus;

        siteHeading.find('li').each(function () {
            existe = true;
            $el = $(this);
            $titulo =
                $titulo_minus = $el.find('span.main-title').text().toLowerCase();

            arreglo.forEach(function(entrada) {

                if (existe) existe = $titulo_minus.includes(entrada);
                
            })

            if (existe) {
              //  console.log('Titulo: ', $el.find('span.main-title').text());

                $articulos.push($el.find('span.main-title').text());

              //  console.log('Precio: ', $el.find('span.price__fraction').text());
            }

        })
        callback(null, $articulos);
    }else{
        callback(error);
        return;
    }
});

} //FIN DE FUNCION

module.exports = {
    findArticulos
}

/*
findArticulos("pokemon sword", function(err,articls){
    if(err) {
        console.log(err);
    }
    else {
        console.log(articls);
    }
})
*/
