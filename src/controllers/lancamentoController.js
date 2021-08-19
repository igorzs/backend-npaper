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

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const convertLancamentoToJSON = (lancamento) => {
    return {
        id: lancamento.id,
        descricao: lancamento.descricao,
        valor: lancamento.valor,
        situacao: lancamento.situacao,
        tipo: lancamento.tipo,
        data: formatDate(lancamento.data)
    }
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;
    console.log('aqui');

    Lancamento.findByPk(id)
        .then(lancamento => {
            if (lancamento) {
                res.status(status.OK).send(convertLancamentoToJSON(lancamento));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

//atualizar os dados
exports.Update = async (req, res, next) => {
    try {
        //na requisicao de atualizar
        //quando atualizamos enviamos o id, que vai ser pego da url
        const { receita } = req.body;
        const id = req.params.id;
        const descricao = receita.descricao;
        const valor = receita.valor;
        const data = receita.data;
        const situacao = receita.situacao;

        const lancamento = await Lancamento.findByPk(id)
        if (lancamento) {
            //se existir, vai atualizar
            //passa um objeto com as infos
            const lancamentoAtualizado = await lancamento.update({
                descricao: descricao,
                valor: valor,
                data: data,
                situacao: situacao
            },
                //recebe um parametro id na clausula where
                {
                    where: { id: id }
                })
            //status 200 é o padrao
            res.status(status.OK).send(lancamentoAtualizado);
        } else {
            //caso nao existir, retorna erro
            res.status(status.NOT_FOUND).send();
        }


    } catch (error) {
        next(error);

    }
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