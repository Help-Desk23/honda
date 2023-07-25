const express = require("express");
const { getModels, addModels, updateModels, deleteModels } = require("../../controllers/modelControlle");

const router = express.Router();


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

/**
 * @swagger
 * /model:
 *   post:
 *     summary: Crea un nuevo modelo
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

// Asignar los controladores a las rutas correspondientes
router.get("/model", getModels);
router.post("/model", addModels);
router.put("/model/:id", updateModels);
router.delete("/model/:id", deleteModels);

module.exports = router;
