const Lancamento = require('../models/lancamento');
const status = require('http-status');



//inserir os dados no banco
exports.Insert = (req, res, next) => {
    //na requisicao de insert
    //ele retorna um json no corpo
    //precisamos pegar cada dados e inserir na respectiva propriedade
    const descricao = req.body.descricao;
    const valor = req.body.valor;
    const data = req.body.data;
    const situacao = req.body.situacao;
    const tipo = req.body.tipo;
console.log(valor)
    //aqui passa os parametros com dados para os atributos do model
    Lancamento.create({
        descricao: descricao,
        valor: valor,
        data: data,
        situacao: situacao,
        tipo: tipo
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
    Lancamento.findAll()
        .then(lancamento => {
            if (lancamento) {
                res.status(status.OK).send(lancamento);
            }
        })
        .catch(error => next(error));
}

exports.GetAllReceitas = (req, res, next) => {
    Lancamento.findAll({
        where: {
            tipo: 1
        }
    })
        .then(lancamento => {
            if (lancamento) {
                res.status(status.OK).send(lancamento);
            }
        })
        .catch(error => next(error));
}

exports.GetAllDespesas = (req, res, next) => {
    Lancamento.findAll({
        where: {
            tipo: 2
        }
    })
        .then(lancamento => {
            if (lancamento) {
                res.status(status.OK).send(lancamento);
            }
        })
        .catch(error => next(error));
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Lancamento.findByPk(id)
        .then(lancamento => {
            if (lancamento) {
                res.status(status.OK).send(lancamento);
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
    const situacao = req.body.situacao;
    const tipo = req.body.tipo;

    Lancamento.findByPk(id)
        //primeiro precisamos verificar se o dado existe
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(lancamento => {
            if (lancamento) {
                //se existir, vai atualizar
                //passa um objeto com as infos
                lancamento.update({
                    descricao: descricao,
                    valor: valor,
                    data: data,
                    recebido: recebido
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

    Lancamento.findByPk(id)
        .then(lancamento => {
            if (lancamento) {
                lancamento.destroy({
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