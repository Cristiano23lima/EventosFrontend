const express = require("express");
const app = express();
const path = require('path');
const nomeApp = process.env.npm_package_name;


app.use(express.static(`$/dist/$`));

app.get('/*', (req, res) => {//disponibilizando todos os arquivos estáticos
  res.sendFile(path.join(`$/dist/$/index.html`));
})

app.listen(process.env.PORT || 8080);
