const articuloCtrl = {};

const scrapeart = require('../scrapeart');

const amazon_scrapeart = require('../amazon_scrapeart');

const ebay_scrapeart = require('../ebay_scrapeart');

const dolar = require('../dolarValue');

articuloCtrl.getArticulos = async(req, res) => {

    $term = req.params.termino;
    //  const articulos = await scrapeart.obtenerArticulos($term);

    //  res.json(articulos);

    Promise.all([scrapeart.obtenerArticulos($term), amazon_scrapeart.obtenerArticulos($term), ebay_scrapeart.obtenerArticulos($term)]).then(
        values => {
            console.log(values);
            res.json(values);
        }
    ).catch(reason => {
        console.log(reason);

    });;
}

articuloCtrl.getDolar = async(req, res) => {
    dolar.getDolar("https://www.precio-dolar.com.ar/").then(value => {
            res.json(value);
        }

    ).catch(reason => {
        console.log(reason);

    });
}


module.exports = articuloCtrl;