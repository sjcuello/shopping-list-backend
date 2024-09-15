import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import appRoutes from './routes';
import xss from './middlewares/xss';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './routes/swagger.json';

dotenv.config();
const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(xss());

app.use(cors());
app.options('*', cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(appRoutes);

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
  console.log(`Swagger is running on: http:localhost:${PORT}/docs`);
});