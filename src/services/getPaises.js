import { ajax } from "../tools/ajax.js"

export const getPaises = async (authData) => {
    const optionsRequest = {
        method: "GET",
        url: "https://www.universal-tutorial.com/api/countries/",
        headers: {
            "Authorization": "Bearer " + authData,
            "Accept": "application/json",
        },
    };
    return await ajax(optionsRequest);
}


