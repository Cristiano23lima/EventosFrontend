const express = require("express");
const app = express();
const path = require('path');
const nomeApp = process.env.npm_package_name;


app.use(express.static(__dirname + '/src/'));

app.get('/*', (req, res) => {//disponibilizando todos os arquivos estáticos
  res.sendFile(path.join(__dirname + '/src/index.html'));
})

app.listen(process.env.PORT || 8080);
