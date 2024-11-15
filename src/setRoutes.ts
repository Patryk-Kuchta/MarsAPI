import getRovers from "./getRovers";
import {Response, Router} from "express";
import getPhoto from "./getPhoto";
import {NotFoundError} from "./server";

const errorWithACat = (res: Response, errorCode: number) => {
    res.status(errorCode).send(
        `<html>
            <img src="https://http.cat/${errorCode}">
        </html>`
    );
}

const setRoutes = (router : Router) => {

    router.get('/test', (req, res) => {
        res.send('Hello world !')
    });

    router.get('/rovers/photos', async (req, res) => {
        let result;

        try {
            result = await getPhoto("Curiosity", "FHAZ")
        } catch (error) {
            if (error instanceof NotFoundError) {
                errorWithACat(res, 404);
            } else {
                errorWithACat(res, 500);
            }
            return;
        }

        res.send(result)
    })

    router.get('/rovers/:roverName/photos/:cameraType', async (req, res) => {
        const { roverName, cameraType } = req.params;

        if (!roverName || !cameraType) {
            errorWithACat(res, 400);
            return;
        }

        let result;

        try {
            result = await getPhoto(roverName, cameraType)
        } catch (error) {
            if (error instanceof NotFoundError) {
                errorWithACat(res, 404);
            } else {
                errorWithACat(res, 500);
            }
            return;
        }

        res.send(result)
    })

    router.get('/rovers', async (req, res) => {
        res.send(await getRovers())
    });
}

export default setRoutes;