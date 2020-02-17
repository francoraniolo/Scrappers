const articuloCtrl = {};

const scrapeart = require('../scrapeart');

const amazon_scrapeart = require('../amazon_scrapeart');

articuloCtrl.getArticulos = async(req, res) => {

    $term = req.params.termino;
    //  const articulos = await scrapeart.obtenerArticulos($term);

    //  res.json(articulos);

    Promise.all([scrapeart.obtenerArticulos($term), amazon_scrapeart.obtenerArticulos($term)]).then(
        values => {
            console.log(values);
            res.json(values);
        }
    ).catch(reason => {
        console.log(reason)
    });;
}


module.exports = articuloCtrl;