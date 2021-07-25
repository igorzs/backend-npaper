const Sequelize = require('sequelize');
const sequelize = require('../database/database.js');

const Usuario = sequelize.define("usuario", {
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nome: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate:{
            len: [3, 100]
        }
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique:true,
        validate:{
            len: [10, 100]
        }
    },
    ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    senha_hash: {
        type:Sequelize.STRING
    }
});

module.exports = Usuario;