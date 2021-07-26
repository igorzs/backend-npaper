const express = require('express');
const LancamentoController = require('../controllers/lancamentoController.js');
const UsuarioController = require('../controllers/usuarioController.js');
const router = express.Router();


//ROTAS:: CADASTRO DE USUARIOS
router.post('/cadastro', UsuarioController.Insert);
router.get('/cadastro', UsuarioController.SearchAll);
router.get('/cadastro/:id', UsuarioController.SearchOne);
router.put('/cadastro/:id', UsuarioController.Update);
router.delete('/cadastro/:id', UsuarioController.Delete);

//ROTAS:: LANCAMENTOS
router.post('/lancamento', LancamentoController.Insert);
router.get('/lancamento', LancamentoController.SearchAll);
router.get('/lancamento/:id', LancamentoController.SearchOne);
router.put('/lancamento/:id', LancamentoController.Update);
router.delete('/lancamento/:id', LancamentoController.Delete);



module.exports = router;