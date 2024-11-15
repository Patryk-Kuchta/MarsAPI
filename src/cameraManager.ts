import cameraData from '../data/cameraData.json';
import {NotFoundError} from "./server";

enum CameraAbbreviation {
    FHAZ = "FHAZ",
    RHAZ = "RHAZ",
    MAST = "MAST",
    CHEMCAM = "CHEMCAM",
    MAHLI = "MAHLI",
    MARDI = "MARDI",
    NAVCAM = "NAVCAM",
    PANCAM = "PANCAM",
    MINITES = "MINITES"
}

class MarsCameraManager {
    private static instance: MarsCameraManager;
    private cameras = new Map<CameraAbbreviation, { name: string; rovers: string[] }>();

    private constructor() {
        Object.entries(cameraData).forEach(([key, value]) => {
            this.cameras.set(key as CameraAbbreviation, value);
        });
    }

    public static getInstance(): MarsCameraManager {
        if (!MarsCameraManager.instance) {
            MarsCameraManager.instance = new MarsCameraManager();
        }
        return MarsCameraManager.instance;
    }

    public getCameraDetails(abbreviation: string): { abbreviation: CameraAbbreviation; name: string; rovers: string[] } {
        const enumKey = abbreviation as CameraAbbreviation;
        const details = this.cameras.get(enumKey);
        if (!details) {
            throw new NotFoundError(`Camera details not found for abbreviation: ${abbreviation}`);
        }

        return {
            abbreviation: enumKey,
            name: details.name,
            rovers: details.rovers
        };
    }

    public getRandomCameraRoverCombo(): { cameraAbbreviation: CameraAbbreviation; cameraName: string; rover: string } {
        const cameraAbbreviations = Array.from(this.cameras.keys());
        const randomCameraAbbreviation = cameraAbbreviations[Math.floor(Math.random() * cameraAbbreviations.length)];
        const cameraDetails = this.cameras.get(randomCameraAbbreviation);

        if (!cameraDetails) {
            throw new Error('Camera details not found.');
        }

        const randomRover = cameraDetails.rovers[Math.floor(Math.random() * cameraDetails.rovers.length)];

        return {
            cameraAbbreviation: randomCameraAbbreviation,
            cameraName: cameraDetails.name,
            rover: randomRover
        };
    }
}

export { MarsCameraManager, CameraAbbreviation };
