const express = require("express");
const { getModels, addModels, updateModels, deleteModels } = require("../controllers/modelControlle");

const router = express.Router();

// Asignar los controladores a las rutas correspondientes
router.get("/model", getModels);
router.post("/model", addModels);
router.put("/model/:id", updateModels);
router.delete("/model/:id", deleteModels);

module.exports = router;
