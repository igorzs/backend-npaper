
//STRING DE CONEXAO

module.exports = {
    development: {
        database: {
            host: '198.136.59.239',
            port: 3306,
            name: 'vlosscom_npaper',
            dialect: 'mysql',
            user: 'vlosscom_npaper',
            password: 'vlosscom_npaper'
        }
    },
    production: {
        database: {
            host: process.env.DB_HOST,
            host: process.env.DB_PORT
        }
    },

    secret: {
        secret: "segredo",
    }

}