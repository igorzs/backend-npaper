const Usuario = require('../models/usuario');
const status = require('http-status');
const bcrypt = require('bcrypt');

exports.Insert = (req, res, next) => {

    const nome = req.body.nome;
    const email = req.body.email;
    const ativo = req.body.ativo;

    //CRIPTOGRAFA A SENHA DO USUÁRIO
    const senha_hash = bcrypt.hashSync(req.body.senha, 8);

    Usuario.create({
        nome: nome,
        email: email,
        ativo: ativo,
        senha_hash: senha_hash
    })
        .then(usuario => {
            if (usuario) {
                //SUCESSO:: ENVIA OS DADOS DO USUÁRIO DE VOLTA
                res.status(status.OK).send(usuario);
            } else {
                //FALHA:: NÃO RETORNA NADA
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
}

exports.SearchAll = (req, res, next) => {
    Usuario.findAll()
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            }
        })
        .catch(error => next(error));
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
}

exports.Update = (req, res, next) => {
    const id = req.params.id;

    const nome = req.body.nome;
    const email = req.body.email;
    const ativo = req.body.ativo;

    //CRIPTOGRAFA A SENHA DO USUÁRIO
    const senha_hash = bcrypt.hashSync(req.body.senha, 8);

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                usuario.update({
                    nome: nome,
                    email: email,
                    ativo: ativo,
                    senha_hash: senha_hash
                },
                    {
                        where: { id: id }
                    }
                )
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
}

exports.Delete = (req, res, next) => {
    const id = req.params.id;

    Usuario.findByPk(id)
    .then(usuario => {
        if(usuario){
            usuario.destroy({
                where: {id:id}
            })
            .then(()=>{
                res.status(status.OK).send();
            })
            .catch(error => next(error));
        }else{
            res.status(status.NOT_FOUND).send();
        }
    })
    .catch(error => next(error));
}