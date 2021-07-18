const express = require('express');
const ReceitaController = require('../controllers/receitaController.js');
const UsuarioController = require('../controllers/usuarioController.js');
const router = express.Router();

//ROTAS:: RECEITAS
router.post('/receita', ReceitaController.Insert);
router.get('/receita', ReceitaController.SearchAll);
router.get('/receita/:id', ReceitaController.SearchOne);
router.put('/receita/:id', ReceitaController.Update);
router.delete('/receita/:id', ReceitaController.Delete);

//ROTAS:: CADASTRO DE USUARIOS
router.post('/cadastro', UsuarioController.Insert);
router.get('/cadastro', UsuarioController.SearchAll);
router.get('/cadastro/:id', UsuarioController.SearchOne);
router.put('/cadastro/:id', UsuarioController.Update);
router.delete('/cadastro/:id', UsuarioController.Delete);



module.exports = router;