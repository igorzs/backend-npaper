const Lancamentos = require('../models/lancamentos');
const status = require('http-status');



//inserir os dados no banco
exports.Insert = (req, res, next) => {
    //na requisicao de insert
    //ele retorna um json no corpo
    //precisamos pegar cada dados e inserir na respectiva propriedade
    const descricao = req.body.descricao;
    const valor = req.body.valor;
    const data = req.body.data;
    const isDespesa = req.body.isDespesa;

    //aqui passa os parametros com dados para os atributos do model
    Lancamentos.create({
        descricao: descricao,
        valor: valor,
        data: data,
        isDespesa: isDespesa
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(lancamentos => {
            if (lancamentos) {
                res.status(status.OK).send(lancamentos);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};

exports.SearchAll = (req, res, next) => {
    Lancamentos.findAll()
        .then(lancamentos => {
            if (lancamentos) {
                res.status(status.OK).send(lancamentos);
            }
        })
        .catch(error => next(error));
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Lancamentos.findByPk(id)
        .then(lancamentos => {
            if (lancamentos) {
                res.status(status.OK).send(lancamentos);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

//atualizar os dados
exports.Update = (req, res, next) => {
    //na requisicao de atualizar
    //quando atualizamos enviamos o id, que vai ser pego da url
    const id = req.params.id;
    const descricao = req.body.descricao;
    const valor = req.body.valor;
    const data = req.body.data;
    const isDespesa = req.body.isDespesa;

    Lancamentos.findByPk(id)
        //primeiro precisamos verificar se o dado existe
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(lancamentos => {
            if (lancamentos) {
                //se existir, vai atualizar
                //passa um objeto com as infos
                lancamentos.update({
                    descricao: descricao,
                    valor: valor,
                    data: data,
                    isDespesa: isDespesa
                },
                    //recebe um parametro id na clausula where
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        //status 200 é o padrao
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                //caso nao existir, retorna erro
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};


exports.Delete = (req, res, next) => {
    const id = req.params.id;

    Lancamentos.findByPk(id)
        .then(lancamentos => {
            if (lancamentos) {
                lancamentos.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};