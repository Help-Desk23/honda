const express = require("express");
const app = express();
const { pool } = require("./src/database/db");
const { getModels, addModels, updateModels, deleteModels} = require("./src/controllers/modelControlle");
const routes = require("./src/v1/routes/modelRoutes");
const { swaggerDocs: V1SwaggerDocs } = require("./src/v1/swagger");
const cors = require("cors");

app.use(express.json());

// Ruta Principal
app.get("/", (req, res) => {
  res.end("PAGINA PRINCIAL HONDA!");
});

// Configurar CORS para permitir solicitudes desde http://localhost:5173
app.use(cors({ origin: 'http://localhost:5173' }));

// Asociar el enrutador a la aplicación Express
app.use("/", routes);

// Arrancar el Servidor en el puerto especifico
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
  V1SwaggerDocs(app, port);
});