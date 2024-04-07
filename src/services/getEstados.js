import { ajax } from "../tools/ajax.js"

export const getEstados = async (pais, authData) => {
    const optionsRequest = {
        method: "GET",
        url: `https://www.universal-tutorial.com/api/states/${pais}`,
        headers: {
            "Authorization": "Bearer " + authData,
            "Accept": "application/json",
        },
    };
    return await ajax(optionsRequest);
}