import axios from "axios";

const validateEnvVars = () => {
    if (!process.env.BASE_URL || !process.env.API_KEY) {
        throw new Error('Required environment variables are not set');
    }
};

const makeGetRequest = (route: string, params?: Record<string, string>) => {
    validateEnvVars();

    if (!params) {
        params = { api_key: process.env.API_KEY! };
    } else {
        params.api_key = process.env.API_KEY!;
    }

    return axios.get(`${process.env.BASE_URL}/${route}`, { params });
};

export { makeGetRequest, validateEnvVars };
