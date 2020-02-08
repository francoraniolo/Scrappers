const articuloCtrl = {};

const scrapeart = require('../../scrapeart');

articuloCtrl.getArticulos = async (req, res) => {
   // res.json(scrapeart.obtenerArticulos("mochila"));
   scrapeart.obtenerArticulos("mochila");
}

module.exports = articuloCtrl;
