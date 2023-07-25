const { expect } = require("chai");
const sinon = require("sinon"); // Para simular el comportamiento de pool.query()
const modelController = require("../../src/controllers/modelControlle");
const { pool } = require("../../src/database/db");

// Prueba para GetModels

describe("getModels", () => {
    it("debería devolver un array con las motos", async () => {
      // Simular una consulta exitosa usando sinon
      const queryResult = {
        rows: [
          { id_model: 1, name: "Modelo 1", age: 2023, category: "Adventure 1", price: 2500, description: "Description 1", image: "image.png 1" },
          { id_model: 3, name: "Modelo 3", age: 2024, category: "Adventure 3", price: 3500, description: "Description 3", image: "image.png 3" }
        ]
        
      };
      const queryStub = sinon.stub(pool, "query").resolves(queryResult);
  
      // Llamar
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await modelController.getModels(req, res);
  
      // Verificar el resultado
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(queryResult.rows)).to.be.true;
  
      // Restaurar el comportamiento original de pool.query()
      queryStub.restore();
    });
  
    it("debería devolver un error en caso de consulta fallida", async () => {
      // Simular una consulta fallida usando sinon
      const errorMessage = "Error en la consulta";
      const queryStub = sinon.stub(pool, "query").rejects(new Error(errorMessage));
  
      // Llamar a la función getModels
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await modelController.getModels(req, res);
  
      // Verificar el resultado
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: "Error en la consulta" })).to.be.true;
  
      // Restaurar el comportamiento original de pool.query()
      queryStub.restore();
    });
  });
  
// Prueba para addModels

describe("addModels", () => {
  it("debería agregar una moto correctamente", async () => {
    // Simular una inserción exitosa usando sinon
    const req = { body: { name: "Modelo 3", age: 2022, category: "Sport", price: 10000, description: "Descripción de la moto", image: "url_imagen" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const queryStub = sinon.stub(pool, "query").resolves();

    // Llamar a la función addModels
    await modelController.addModels(req, res);

    // Verificar el resultado
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({ message: "Moto ingresada correctamente" })).to.be.true;

    // Restaurar el comportamiento original de pool.query()
    queryStub.restore();
  });

  it("debería devolver un error en caso de falla al agregar una moto", async () => {
    // Simular una inserción fallida usando sinon
    const errorMessage = "Error al ingresar Moto";
    const req = { body: { /* Datos de la moto */ } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const queryStub = sinon.stub(pool, "query").rejects(new Error(errorMessage));

    // Llamar a la función addModels
    await modelController.addModels(req, res);

    // Verificar el resultado
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: "Error en el motodo POST" })).to.be.true;

    // Restaurar el comportamiento original de pool.query()
    queryStub.restore();
  });
});

// Prueba para updateModels

describe("updateModels", () => {
  it("debería actualizar una moto correctamente", async () => {
    // Simular una actualización exitosa usando sinon
    const req = { params: { id: 1 }, body: { name: "Modelo 1 (actualizado)", /* Otros campos actualizados */ } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const queryStub = sinon.stub(pool, "query").resolves();

    // Llamar a la función updateModels
    await modelController.updateModels(req, res);

    // Verificar el resultado
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: "Moto actualizada correctamente" })).to.be.true;

    // Restaurar el comportamiento original de pool.query()
    queryStub.restore();
  });

  it("debería devolver un error en caso de falla al actualizar una moto", async () => {
    // Simular una actualización fallida usando sinon
    const errorMessage = "Error al actualizar Moto";
    const req = { params: { id: 1 }, body: { /* Datos de la moto para actualizar */ } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const queryStub = sinon.stub(pool, "query").rejects(new Error(errorMessage));

    // Llamar a la función updateModels
    await modelController.updateModels(req, res);

    // Verificar el resultado
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: "Error en el motodo PUT" })).to.be.true;

    // Restaurar el comportamiento original de pool.query()
    queryStub.restore();
  });
});

// Prueba para deleteModels

describe("deleteModels", () => {
  it("debería eliminar una moto correctamente", async () => {
    // Simular una eliminación exitosa usando sinon
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const queryStub = sinon.stub(pool, "query").resolves();

    // Llamar a la función deleteModels
    await modelController.deleteModels(req, res);

    // Verificar el resultado
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({ message: "Moto Eliminada correctamente" })).to.be.true;

    // Verificar que pool.query() se llamó con el query correcto
    expect(queryStub.calledOnce).to.be.true;
    expect(queryStub.firstCall.args[0]).to.equal("DELETE FROM model WHERE id_model = $1");
    expect(queryStub.firstCall.args[1]).to.deep.equal([1]);

    // Restaurar el comportamiento original de pool.query()
    queryStub.restore();
  });

  it("debería devolver un error en caso de fallo en la eliminación", async () => {
    // Simular una eliminación fallida usando sinon
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const errorMessage = "Error en la eliminación";
    const queryStub = sinon.stub(pool, "query").rejects(new Error(errorMessage));

    // Llamar a la función deleteModels
    await modelController.deleteModels(req, res);

    // Verificar el resultado
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: "Error en el motodo DELETE" })).to.be.true;

    // Verificar que pool.query() se llamó con el query correcto
    expect(queryStub.calledOnce).to.be.true;
    expect(queryStub.firstCall.args[0]).to.equal("DELETE FROM model WHERE id_model = $1");
    expect(queryStub.firstCall.args[1]).to.deep.equal([1]);

    // Restaurar el comportamiento original de pool.query()
    queryStub.restore();
  });
});
