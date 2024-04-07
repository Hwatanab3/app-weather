import { ajax } from "../tools/ajax.js"

export const getCiudadClima = async (ciudad) => {
    const optionsRequest = {
        method: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
            q: ciudad,
            appid: "93cefc3a3fe37ab93b076dc99c6618f0",
            units: "metric"
        }
    };
    return await ajax(optionsRequest);
}


