import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import dbConnect from "./config/mongo";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors());

dbConnect().then(() => console.log("Conexion Ready"));

app.use("/api/v1/", router);

app.use(
    "/api/v1/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );

app.all("*", (req, res) => {
    res.send(`Oh, can't find ${req.originalUrl} on this server!`)
    
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});


