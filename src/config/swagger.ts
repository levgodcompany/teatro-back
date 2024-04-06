import swaggerJSDoc from "swagger-jsdoc";
import  path from "path";


const options : swaggerJSDoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: { title: "LevGod", version: "1.0.0" },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            name: "x-token",
            in: "header",
          },
        },
      },
    },
    apis: [`${path.join(__dirname, "../src/routes/*")}`],
  };

export const swaggerSpec = swaggerJSDoc(options);

