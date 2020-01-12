
const request = require('request');
const cheerio = require('cheerio');

var scrape = require('./scrape');

var articulos = scrape.findArticulos("pokemon sword", function(err,articls){
    if(err) {
        console.log(err);
    }
    else {
        console.log(articls);
    }
})

