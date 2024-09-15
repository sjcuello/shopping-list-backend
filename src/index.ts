import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import appRoutes from './routes';
// import { CLIENT_URL } from "./utils/getUrl";
import xss from './middlewares/xss';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './routes/swagger.json';

dotenv.config();
const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(xss());

// app.use(
//   cors({
//     origin: `${CLIENT_URL}`,
//     methods: 'GET,POST,PUT,DELETE, PATCH',
//     credentials: true,
//   }),
// );
app.use(cors());
app.options('*', cors());

app.use(appRoutes);

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}).on("error", (error) => {
  throw new Error(error.message);
});