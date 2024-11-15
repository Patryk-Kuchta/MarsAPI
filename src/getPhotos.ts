import {MarsCameraManager} from "./cameraManager";
import {makeGetRequest} from "./makeGetRequest";
import {NotFoundError} from "./server";

export type PhotoEntry = { url: string, earth_date: string }

const getPhotos = async (rover: string, camera: string, sol: number = 100) : Promise<PhotoEntry[]> => {
    let {rovers} = MarsCameraManager.getInstance().getCameraDetails(camera);

    if (!rovers.includes(rover)) {
        throw new NotFoundError(`Rover with name ${rover} does not feature the ${camera} or doesn't exist. Refer to /rovers endpoint to see available rovers.`);
    }

    const results = await makeGetRequest(`rovers/${rover}/photos`, {
        camera: camera,
        sol: sol.toString()
    });

    if (!results?.data?.photos) {
        throw new Error('Invalid response format from API');
    }

    return results.data.photos.map((entry : {
        img_src: string,
        earth_date: string,
    }) => {
        return {
            url: entry.img_src,
            earth_date: entry.earth_date
        }
    });
}

export default getPhotos;