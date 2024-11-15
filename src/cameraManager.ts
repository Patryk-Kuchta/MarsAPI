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
}

export { MarsCameraManager, CameraAbbreviation };
