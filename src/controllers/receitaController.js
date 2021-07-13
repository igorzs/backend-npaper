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

exports.SearchAll = (req, res, next) => {
    Receita.findAll()
        .then(receita => {
            if (receita) {
                res.status(status.OK).send(receita);
            }
        })
        .catch(error => next(error));
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Receita.findByPk(id)
        .then(receita => {
            if (receita) {
                res.status(status.OK).send(receita);
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
    const recebido = req.body.recebido;

    Receita.findByPk(id)
        //primeiro precisamos verificar se o dado existe
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(receita => {
            if (receita) {
                //se existir, vai atualizar
                //passa um objeto com as infos
                receita.update({
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

    Receita.findByPk(id)
        .then(receita => {
            if (receita) {
                receita.destroy({
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