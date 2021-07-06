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