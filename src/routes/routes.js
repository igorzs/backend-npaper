const express = require('express');
const LancamentoController = require('../controllers/lancamentoController.js');
const UsuarioController = require('../controllers/usuarioController.js');
const router = express.Router();

//ROTAS:: LANÇAMENTOS
router.post('/lancamento', LancamentoController.Insert);
router.get('/despesa', LancamentoController.GetAllDespesas);
router.get('/receita', LancamentoController.GetAllReceitas);
router.get('/lancamento/:id', LancamentoController.SearchOne);
router.put('/lancamento/:id', LancamentoController.Update);
router.delete('/lancamento/:id', LancamentoController.Delete);

//ROTAS:: CADASTRO DE USUARIOS
router.post('/cadastro', UsuarioController.Insert);
router.get('/cadastro', UsuarioController.SearchAll);
router.get('/cadastro/:id', UsuarioController.SearchOne);
router.put('/cadastro/:id', UsuarioController.Update);
router.delete('/cadastro/:id', UsuarioController.Delete);

router.post('/authenticate', async (req, res) => {
    if (!!req.body.email && !!req.body.senha) {
    const user = await UsuarioController.authenticate(req.body.email, req.body.senha);
    res.send(user.token);
    } else {
        res.sendStatus(500);
    } 

});

module.exports = router;