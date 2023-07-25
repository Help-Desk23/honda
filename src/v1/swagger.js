const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//Meta data info about to API

const options = {
    definition: {
        openapi: "3.0.0",
        info: {title:"Honda", version:"1.0.0"},
        components: {
            schemas: {
                model: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "Nombre del Modelo",
                        },
                        age: {
                            type: "integer",
                            description: "Año de fabricacion de Moto",
                        },
                        category: { 
                            type:"string",
                            description: "Categoria de la Moto",
                        },
                        price: {
                            type: "integer",
                            description: "Precio de Moto",
                        },
                        description: {
                            type: "string",
                            description: "Breve descripción de Moto",
                        },
                        image: {
                            type: "string",
                            description: "Imagen de la Moto",
                        },
                    }
                }
            }
        }
    },
    apis: ['./src/v1/routes/modelRoutes.js', './src/database/db.js'],
};
//Documentación en JSON Format

const swaggerSpec = swaggerJSDOC(options);

// Fuction to setup out docs

const swaggerDocs = (app, port) => {
    app.use( '/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log('Version 1 docs are you available at http://localhost:3000/api/v1/docs');    
};

module.exports = {swaggerDocs};