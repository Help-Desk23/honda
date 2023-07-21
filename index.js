const express = require("express");
const app = express();
const { pool } = require("./src/database/db");
const { getModels, addModels, updateModels, deleteModels} = require("./src/controllers/modelControlle");
const routes = require("./src/routes/modelRoutes");


app.use(express.json());

// Ruta Principal
app.get("/", (req, res) => {
  res.end("PAGINA PRINCIAL HONDA!");
});

// Asociar el enrutador a la aplicación Express
app.use("/", routes);

// Arrancar el Servidor en el puerto especifico
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});