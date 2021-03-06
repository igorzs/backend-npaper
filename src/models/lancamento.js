const Sequelize = require('sequelize');

//busco os dados de configuracao do bd
const sequelize = require('../database/database.js');

//o define cria a tabela no bd
//o nome da tabela é invoice
//defino os atributos
const Lancamento = sequelize.define("lancamentos", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    descricao: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
            len: [3, 100]
        }
    },
    valor: {
        allowNull: false,
        type: Sequelize.DOUBLE(),
        validate: {
            len: [1, 999999]
        }
    },
    data: {
        allowNull: false,
        type: Sequelize.DATE()
    },
    situacao: {
        allowNull: false,
        type: Sequelize.BOOLEAN(),
        defaultValue: true
    },
    tipo: {
        allowNull: false,
        type: Sequelize.INTEGER()
    },
    idUser: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
});

module.exports = Lancamento;