const Usuario = require('../models/usuario');
const config = require('../config/config');
const status = require('http-status');
const jwt = require('jsonwebtoken');
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
            if (usuario) {
                usuario.destroy({
                    where: { id: id }
                })
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


const omitHash = (user) => {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}

const authenticate = async (email, password) => {
    try {
        const user = await Usuario.findOne({ where: { email } });
        console.log('user: ', user);

        if (!user || !(await bcrypt.compare(password, user.senha_hash)))
            throw 'Username or password is incorrect';

        const token = jwt.sign({ sub: user.id }, config.secret.secret, { expiresIn: '7d' });
        return { ...omitHash(user.get()), token };
    } catch (error) {
        return error;
    }
}



module.exports.authenticate = authenticate;