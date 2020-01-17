function parseDireccionUrl($titulo){

    var principiourl = 'https://articulo.mercadolibre.com.ar/MLA-0-';

    var input = $titulo.split(' - ').join('-');
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

    input= input.split(' ').join('-');
    input= input.toLowerCase();
    input= input.slice(1);

    var finurl = '_JM?';

    var url = principiourl.concat(input);
    url= url.concat(finurl);

    return url;
}

module.exports = {
    parseDireccionUrl
}