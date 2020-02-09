const articuloCtrl = {};

const scrapeart = require('../scrapeart');



articuloCtrl.getArticulos = async (req, res) => {
   // res.json(scrapeart.obtenerArticulos("mochila"));
   $term = req.params.termino;
   const articulos = await scrapeart.obtenerArticulos($term);

   res.json(articulos);
}

module.exports = articuloCtrl;
