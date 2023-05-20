const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {
    API_HOST
} = process.env;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo App API Documentation',
            version: '1.0.0',
        },
        servers: [{
            url: API_HOST.includes('localhost') ? `http://${API_HOST}/api` : `https://${API_HOST}/api`,
        }, ],
    },
    apis: ['app.js', './components/*/*.route.js']
};
const specs = swaggerJsdoc(options);


module.exports = {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(specs)
};