const http = require('http');
const express = require('express');
const session = require('express-session');
const status = require ('http-status');
const sequelize = require ('./src/database/database');
const app = express();
const routes = require ('./src/routes/routes.js');
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use(session({ secret: 'segredo' }));

app.use('/api', routes);

app.get('/', (req, res) => {
    res.json({message : 'nPaper - ADS 2021'})
});

app.use((req, res, next) => {
    res.status.apply(status.NOT_FOUND).send("Page not found");
});

app.use((req, res, next) => {
    res.status.apply(status.INTERNAL_SERVER_ERROR).json({error});
});

sequelize.sync({force: false}).then( () => {
    const port = 3001;
    app.set("port", port);
    const server = http.createServer(app);
    server.listen(port);
});