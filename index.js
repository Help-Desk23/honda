const express = require("express");
const app = express();
const router = express.Router();
const {getModels, pool} = require("./db");

app.use(express.json());

// Ruta Principal
app.get("/", (req, res) => {
  res.end("PAGINA PRINCIAL HONDA!");
});

// Metodo GET Tabla model - Muestra datos de la tabla

router.get("/model", async (req, res) => {
  try {
    const models = await getModels();
    res.status(200).json(models);
  } catch (error) {
    console.error("Error en la consulta", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
});

// Metodo POST Tabla model - Agrega datos a la tabla

router.post("/model", async(req, res) => {
  try{
    const {name, age, category, price, description, image} = req.body;
    const query = "INSERT INTO model (name, age, category, price, description, image) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [name, age, category, price, description, image];
    await pool.query(query, values);
    
    res.status(201).json({message: "Moto ingresada correctamente" });
  } catch (error){
    console.error("Error al ingresar Moto", error);
    res.status(500).json({error: "Error en el metodo POST"});
  }
});

// Metodo PUT tabla model - Actualiza datos a la tabla

router.put("/model/:id", async(req, res) => {
  try{
    const { id } = req.params;
    const { name, age, category, price, description, image} = req.body;
    const query = "UPDATE model SET name= $1, age= $2, category= $3, price= $4, description= $5, image= $6 WHERE id_model= $7";
    const values = [name, age, category, price, description, image, id];
    await pool.query(query, values);

    res.status(201).json({message: "Moto Actualizada correctamente"});
  } catch(error) {
    console.error("Error al actualizar Moto", error);
    res.status(500).json({error: "Error en el metodo POST"})
  }
});

// Metodo GET tabla model - Elimina datos de la tabla

router.delete("/model/:id", async(req, res) => {
try{
  const { id } = req.params;
  const query = "DELETE FROM model WHERE id_model = $1";
  const values = [id];
  await pool.query(query, values);

  res.status(201).json({message: "Moto Eliminada correctamente"});
} catch(error) {
  console.error("Error al eliminar Moto", error);
  res.status(500).json({error: "Error en el metodo DELETE"});
}
});

// Asociar el enrutador a la aplicación Express
app.use(router);

// Arrancar el Servidor en el puerto especifico
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});