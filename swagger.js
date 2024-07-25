const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "DapJi API",
      version: "1.0.0",
      description: "DapJi API Swagger",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // API 문서화를 할 경로
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
