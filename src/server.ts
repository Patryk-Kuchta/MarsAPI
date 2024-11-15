import express from "express";
import setRoutes from "./setRoutes";
import dotenv from 'dotenv';

const validateEnvVars = () => {
    if (!process.env.BASE_URL || !process.env.API_KEY) {
        throw new Error('Required environment variables are not set');
    }
};

dotenv.config();
validateEnvVars();


const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();

setRoutes(router);

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
