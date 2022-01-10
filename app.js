const express = require('express');

const app = express();

app.get('/', function (req, res) {res.send('Hola citlalli');});

app.listen(3000);