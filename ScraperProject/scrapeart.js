
const request = require('request');
const cheerio = require('cheerio');

var scrape = require('./scrape');

scrape.findArticulos("mochila", function(err,articls){
    if(err) {
        console.log(err);
    }
    else {
      console.log(articls);

      
      articls.forEach(element => {
           
        var principiourl = 'https://articulo.mercadolibre.com.ar/MLA-0-';

        var input = element.split(' - ').join('-');
        input = input.split(' / ').join('-');
        input = input.split(' | ').join('-');
        input = input.split(' + ').join('-');
        input = input.split(' * ').join('-');
        input = input.split('!').join('');
        input = input.split(', ').join('-');

        input = input.split(' (').join('-');
        input = input.split(') ').join('-');

        input = input.split('$').join('');

        
        input = input.replace(' +','-');

        input = input.split('+').join('');
        
        input = input.replace(',','');
        input = input.replace('.','');
        input = input.replace('/','');
        input = input.replace('´',''); 
        input = input.replace('¨',''); 
        input = input.replace("'",''); 
       
        //tildes
        input = input.replace('á','a');
        input = input.replace('é','e');
        input = input.replace('í','i');
        input = input.replace('ó','o');
        input = input.replace('ú','u');

        input = input.replace('ñ','n');

        //input = input.split('/').join('-');
        input= input.split(' ').join('-');
        input= input.toLowerCase();
        input= input.slice(1);

        var finurl = '_JM?';

        var url = principiourl.concat(input);
        url= url.concat(finurl);

        console.log("El url es ",url);

      /*  request(url, (error,
            response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);



            }else{
                callback(error);
                return;
            }
        }); */
          
      });
           
    }
}); 
    






