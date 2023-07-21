const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//Meta data info about to API

const option = {
    definition: {
        openapi: "3.0.0",
        info: {title:"Honda", version:"1.0.0"},
    },
    apis: ['/index.js', '/db.js'],
};
//Documentación en JSON Format

const swaggerSpec = swaggerJSDOC(option);

// Fuction to setup out docs

const swaggerDocs = (app, port) => {
    app.use( '/api/index.js/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get('/api/index.js/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log('Version 1 docs are you available at http://localhost:3000/api/index.js/docs');    
};

module.exports = {swaggerDocs};