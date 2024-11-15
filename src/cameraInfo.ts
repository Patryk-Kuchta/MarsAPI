enum CameraAbbreviation {
    FHAZ = "FHAZ",
    RHAZ = "RHAZ",
    MAST = "MAST",
    CHEMCAM = "CHEMCAM",
    MAHLI = "MAHLI",
    MARDI = "MARDI",
    NAVCAM = "NAVCAM",
    PANCAM = "PANCAM",
    MINITES = "MINITES",
}

class MarsCamera {
    abbreviation: CameraAbbreviation;
    name: string;
    usedByCuriosity: boolean;
    usedByOpportunity: boolean;
    usedBySpirit: boolean;

    constructor(
        abbreviation: CameraAbbreviation,
        name: string,
        usedByCuriosity: boolean,
        usedByOpportunity: boolean,
        usedBySpirit: boolean
    ) {
        this.abbreviation = abbreviation;
        this.name = name;
        this.usedByCuriosity = usedByCuriosity;
        this.usedByOpportunity = usedByOpportunity;
        this.usedBySpirit = usedBySpirit;
    }

    getDetails(): string {
        return `${this.abbreviation}: ${this.name} - Curiosity: ${this.usedByCuriosity}, Opportunity: ${this.usedByOpportunity}, Spirit: ${this.usedBySpirit}`;
    }
}

const cameras: MarsCamera[] = [
    new MarsCamera(CameraAbbreviation.FHAZ, "Front Hazard Avoidance Camera", true, true, true),
    new MarsCamera(CameraAbbreviation.RHAZ, "Rear Hazard Avoidance Camera", true, true, true),
    new MarsCamera(CameraAbbreviation.MAST, "Mast Camera", true, false, false),
    new MarsCamera(CameraAbbreviation.CHEMCAM, "Chemistry and Camera Complex", true, false, false),
    new MarsCamera(CameraAbbreviation.MAHLI, "Mars Hand Lens Imager", true, false, false),
    new MarsCamera(CameraAbbreviation.MARDI, "Mars Descent Imager", true, false, false),
    new MarsCamera(CameraAbbreviation.NAVCAM, "Navigation Camera", true, true, true),
    new MarsCamera(CameraAbbreviation.PANCAM, "Panoramic Camera", false, true, true),
    new MarsCamera(CameraAbbreviation.MINITES, "Miniature Thermal Emission Spectrometer", false, true, true),
];

cameras.forEach((camera) => console.log(camera.getDetails()));
