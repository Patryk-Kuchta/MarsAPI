import getRovers from "./getRovers";
import {Response, Router} from "express";
import getPhotos, {PhotoEntry} from "./getPhotos";
import {NotFoundError} from "./server";
import {MarsCameraManager} from "./cameraManager";

const handleError = (res: Response, error: any) => {
    if (error instanceof NotFoundError) {
        errorWithACat(res, 404, error.message);
    } else if (error instanceof Error) {
        errorWithACat(res, 500, error.message);
    } else {
        errorWithACat(res, 500, 'Unknown Error :(');
    }
}

const errorWithACat = (res: Response, errorCode: number, message: string) => {
    res.status(errorCode).send(
        `<html lang="en">
            <img src="https://http.cat/${errorCode}" alt="Error ${errorCode} triggered">
            <br/>
            ${message}
        </html>`
    );
}

const sendPhotosResponse = async (res: Response, roverName: string, cameraType: string) => {
    let result: PhotoEntry[];
    try {
        result = await getPhotos(roverName.toLowerCase(), cameraType.toUpperCase());
    } catch (error) {
        handleError(res, error);
        return;
    }

    if (result.length === 0) {
        return errorWithACat(res, 404, 'No photos found for the specified rover and camera on that day.');
    }

    res.send({
        input: {
          rover: roverName,
          cameraType: cameraType,
        },
        photos: result,
    });
};


const setRoutes = (router: Router) => {

    router.get('/rovers/photos', async (req, res) => {
        const randomCombo = MarsCameraManager.getInstance().getRandomCameraRoverCombo();

        await sendPhotosResponse(res, randomCombo.rover, randomCombo.cameraAbbreviation)
    })

    router.get('/rovers/:roverName/photos/:cameraType', async (req, res) => {
        const {roverName, cameraType} = req.params;

        if (!roverName || !cameraType) {
            errorWithACat(res, 400, 'Provide both the roverName and cameraType');
            return;
        }

        await sendPhotosResponse(res, roverName.toLowerCase(), cameraType.toUpperCase())
    })

    router.get('/rovers', async (req, res) => {
        res.send(await getRovers())
    });
}

export default setRoutes;