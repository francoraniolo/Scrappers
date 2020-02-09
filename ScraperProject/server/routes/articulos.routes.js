const express = require('express');
const router = express.Router();

const articulo = require('../controllers/articulo.controller');

router.get('/:termino', articulo.getArticulos );



module.exports = router;