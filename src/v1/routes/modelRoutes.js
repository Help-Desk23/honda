const express = require("express");
const { getModels, addModels, updateModels, deleteModels } = require("../../controllers/modelControlle");

const router = express.Router();

// Ruta GET en Swagger
/**
 * @openapi
 * /model:
 *   get:
 *     tags:
 *       - Model
 *     responses:
 *       200:
 *         description: Muestra los datos de la ruta model
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/model"
 */

router.get("/model", getModels);

// Ruta POST en Swagger

/**
 * @swagger
 * /model:
 *   post:
 *     summary: Ingresa una moto nueva
 *     description: Crea un nuevo modelo con los datos proporcionados.
 *     tags:
 *       - Model
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/model"
 *     responses:
 *       200:
 *         description: Modelo creado exitosamente
 *       400:
 *         description: Error en la solicitud del cliente
 *       500:
 *         description: Error del servidor
 */

router.post("/model", addModels);

// Ruta PUT en Swagger

/**
 * @swagger
 * /model/{id}:
 *   put:
 *     summary: Actualiza un modelo existente
 *     description: Actualiza un modelo existente con los datos proporcionados.
 *     tags:
 *       - Model
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del modelo a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/model'
 *     responses:
 *       200:
 *         description: Modelo actualizado exitosamente
 *       400:
 *         description: Error en la solicitud del cliente
 *       500:
 *         description: Error del servidor
 */

router.put("/model/:id", updateModels);


// Ruta DELETE en Swagger

/**
 * @swagger
 * /model/{id}:
 *   delete:
 *     summary: Elimina un modelo existente
 *     description: Elimina un modelo existente con el ID proporcionado.
 *     tags:
 *       - Model
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del modelo a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Modelo eliminado exitosamente
 *       400:
 *         description: Error en la solicitud del cliente
 *       500:
 *         description: Error del servidor
 */

router.delete("/model/:id", deleteModels);

module.exports = router;
