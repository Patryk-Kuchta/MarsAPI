import {makeGetRequest} from "./makeGetRequest";

type RoverResponse = {
    rovers: {name : string}[]
}

const getRovers = async () : Promise<string[]> => {
    const response = await makeGetRequest("rovers");
    const body = (response.data as RoverResponse);

    return body.rovers.map((entry) => entry.name);
}

export default getRovers;