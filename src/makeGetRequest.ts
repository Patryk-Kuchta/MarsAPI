type GetParameters = {
    key: string;
    value: string;
}[]

const validateEnvVars = () => {
    console.log(process.env)

    if (!process.env.BASE_URL || !process.env.API_KEY) {
        throw new Error('Required environment variables are not set');
    }
};

const validateParams = (params: GetParameters) => {
    return params.every(({key, value}) => {
        return key.trim() !== '' && value.trim() !== '';
    });
};

const makeGetRequest = (route : string, params : GetParameters) => {
    validateEnvVars();
    validateParams(params);

    const paramsArray = params.map(({key, value}) => {
        return encodeURI(key) + '=' + encodeURI(value);
    });

    paramsArray.push(`api_key=${process.env.API_KEY}`)

    return fetch(`${process.env.BASE_URL}/${route}?${paramsArray.join('&')}`)
}

export { makeGetRequest, validateEnvVars };
