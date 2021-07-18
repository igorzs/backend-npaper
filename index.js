const http = require('http');
const express = require('express');
const status = require ('http-status');
const sequelize = require ('./src/database/database');
const app = express();
const routes = require ('./src/routes/routes.js');
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use('/api', routes);

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



/*
const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

app.get('/home', (req, res) => {
    res.json({message : 'nPaper - Tela inicial da aplicação'})
});

//app.get('/contact', (req, res) => res.send('Contact Page Route'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
*/