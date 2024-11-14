type RoverResponse = {
    rovers: {name : string}[]
}

const getRovers = async () : Promise<string[]> => {
    const response = await fetch("https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=DEMO_KEY");
    const body = (await response.json() as RoverResponse);

    return body.rovers.map((entry) => entry.name);
}

export default getRovers;