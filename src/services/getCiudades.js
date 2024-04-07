import { ajax } from "../tools/ajax.js"

export const getCiudades = async (estado, authData) => {
    const optionsRequest = {
        method: "GET",
        url: `https://www.universal-tutorial.com/api/cities/${estado}`,
        headers: {
            "Authorization": "Bearer " + authData,
            "Accept": "application/json",
        },
    };
    return await ajax(optionsRequest);
}

