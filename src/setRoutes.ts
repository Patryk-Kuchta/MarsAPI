import getRovers from "./getRovers";
import {Router} from "express";

const setRoutes = (router : Router) => {

    router.get('/test', (req, res) => {
        res.send('Hello world !')
    });

    router.get('/rovers', async (req, res) => {
        res.send(await getRovers())
    });

}

export default setRoutes;