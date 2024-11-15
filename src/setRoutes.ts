import getRovers from "./getRovers";
import {Response, Router} from "express";
import getPhotos from "./getPhotos";
import {NotFoundError} from "./server";

const errorWithACat = (res: Response, errorCode: number, message: string) => {
    res.status(errorCode).send(
        `<html lang="en">
            <img src="https://http.cat/${errorCode}" alt="Error ${errorCode} triggered">
            <br/>
            ${message}
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
            result = await getPhotos("curiosity", "FHAZ")
        } catch (error) {
            if (error instanceof NotFoundError) {
                errorWithACat(res, 404, error.message);
            } else if (error instanceof Error) {
                errorWithACat(res, 500, error.message);
            } else {
                errorWithACat(res, 500, 'Unknown Error :(')
            }
            return;
        }

        res.send(result)
    })

    router.get('/rovers/:roverName/photos/:cameraType', async (req, res) => {
        const { roverName, cameraType } = req.params;

        if (!roverName || !cameraType) {
            errorWithACat(res, 400, 'Provide both the roverName and cameraType');
            return;
        }

        let result;

        try {
            result = await getPhotos(roverName.toLowerCase(), cameraType.toUpperCase());
        } catch (error) {
            if (error instanceof NotFoundError) {
                errorWithACat(res, 404, error.message);
            } else if (error instanceof Error) {
                errorWithACat(res, 500, error.message);
            } else {
                errorWithACat(res, 500, 'Unknown Error :(')
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