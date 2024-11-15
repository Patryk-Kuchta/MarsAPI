import {makeGetRequest} from "./makeGetRequest";

type RoverResponse = {
    rovers: {name : string}[]
}

const ROVERS_ENDPOINT = "rovers";

const getRovers = async (): Promise<string[]> => {
    try {
        const response = await makeGetRequest(ROVERS_ENDPOINT);
        const body = (response.data as RoverResponse);

        return body.rovers.map((rover) => {
            return rover.name;
        });
    } catch (error) {
        console.error('Failed to fetch rovers:', error);
        throw error;
    }
}

export default getRovers;