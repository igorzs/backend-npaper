const Receita = require('../models/receita');
const status = require('http-status');



//inserir os dados no banco
exports.Insert = (req, res, next) => {
    //na requisicao de insert
    //ele retorna um json no corpo
    //precisamos pegar cada dados e inserir na respectiva propriedade
    const descricao = req.body.descricao;
    const valor = req.body.valor;
    const data = req.body.data;
    const recebido = req.body.recebido;

    //aqui passa os parametros com dados para os atributos do model
    Receita.create({
        descricao: descricao,
        valor: valor,
        data: data,
        recebido: recebido
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(receitas => {
            if (receitas) {
                res.status(status.OK).send(receitas);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};