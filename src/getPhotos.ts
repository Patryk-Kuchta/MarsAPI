import {MarsCameraManager} from "./cameraManager";
import {makeGetRequest} from "./makeGetRequest";
import {NotFoundError} from "./server";

const getPhotos = async (rover: string, camera: string) : Promise<string[]> => {
    let {rovers} = MarsCameraManager.getInstance().getCameraDetails(camera);

    if (!rovers.includes(rover)) {
        throw new NotFoundError(`Rover with name ${rover} does not feature the ${camera} or doesn't exist. Refer to /rovers endpoint to see available rovers.`);
    }

    const results = await makeGetRequest(`rovers/${rover}/photos`, {
        camera: camera,
        sol: "100"
    });

    return results.data.photos.map((entry : {img_src: string}) => entry.img_src);
}

export default getPhotos;