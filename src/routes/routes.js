const express = require('express');
const ReceitaController = require ('../controllers/receitaController.js');
const router = express.Router();

router.post('/receita', ReceitaController.Insert);

module.exports = router;