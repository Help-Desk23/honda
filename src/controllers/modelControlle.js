const { pool } = require("../database/db");

// Controlador para obtener todas las motos

const getModels = async (req, res) => {
    try{
        const query = "SELECT * FROM model";
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error){
        console.error("Error en la consulta", error)
        res.status(500).json({error: "Error en la consulta GET"});
    }
};

// Controlador para adicionar motos

const addModels = async (req, res) => {
    try{
        const {name, age, category, price, description, image} = req.body;
        const query = "INSERT INTO model (name, age, category, price, description, image) VALUES ($1, $2, $3, $4, $5, $6)";
        const values = [name, age, category, price, description, image];
        await pool.query(query, values);

        res.status(201).json({message: "Moto ingresada correctamente"});
    } catch (error){
        console.error("Error al ingresar Moto", error);
        res.status(500).json({error: "Error en el motodo POST"});
    }
};

// Controlador para actualizar motos

const updateModels = async (req, res) => {
    try{
        const { id } = req.params;
        const {name, age, category, price, description, image} = req.body;
        const query = "UPDATE model SET name= $1, age= $2, category= $3, price= $4, description= $5, image= $6 WHERE id_model= $7";
        const values = [name, age, category, price, description, image, id];
        await pool.query(query, values);
        res.status(200).json({message: "Moto actualizada correctamente"});
    } catch (error) {
        console.error("Error al actualizar Moto", error);
        res.status(500).json({error: "Error en el motodo PUT"});
    }
};

// Controlado para eliminar motos

const  deleteModels = async (req, res) => {
    try{
        const { id } = req.params;
        const query = "DELETE FROM model WHERE id_model = $1";
        const values = [id];
        await pool.query(query, values);

        res.status(201).json({message: "Moto Eliminada correctamente"});
    } catch (error) {
        console.error("Error al eliminar Moto", error);
        res.status(500).json({error: "Error en el motodo DELETE"});
    }
};

// Exportar controladores

module.exports = {
    getModels,
    addModels,
    updateModels,
    deleteModels
};