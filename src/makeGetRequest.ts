import axios from "axios";

const makeGetRequest = (route: string, params?: Record<string, string>) => {
    if (!params) {
        params = { api_key: process.env.API_KEY! };
    } else {
        params.api_key = process.env.API_KEY!;
    }

    return axios.get(`${process.env.BASE_URL}/${route}`, { params });
};

export { makeGetRequest };
