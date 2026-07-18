// src/config/swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import EnvConfig from "./env.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AgroConnect API",
      version: "1.0.0",
      description: "API documentation for AgroConnect backend",
    },
    servers: [{ url: `http://localhost:${EnvConfig.getPort()}` }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

export default swaggerJsdoc(swaggerOptions);
