const express = require('express');
const ReceitaController = require ('../controllers/receitaController.js');
const router = express.Router();

router.post('/receita', ReceitaController.Insert);
router.get('/receita', ReceitaController.SearchAll);
router.get('/receita/:id', ReceitaController.SearchOne);
router.put('/receita/:id', ReceitaController.Update);
router.delete('/receita/:id', ReceitaController.Delete);

module.exports = router;