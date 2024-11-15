import express from "express";
import setRoutes from "./setRoutes";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();

setRoutes(router);

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
