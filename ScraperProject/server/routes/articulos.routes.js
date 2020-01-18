const express = require('express');
const router = express.Router();

const articulo = require('../controllers/articulo.controller');

router.get('/:nombre', articulo.getArticulos );

module.exports = router;