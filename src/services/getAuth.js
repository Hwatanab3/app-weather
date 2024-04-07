import { ajax } from "../tools/ajax.js"

export const getAuth = async () => {
    const optionsRequest = {
        method: "GET",
        url: "https://www.universal-tutorial.com/api/getaccesstoken",
        headers: {
            "Accept": "application/json",
            "api-token": "ujwuTZcOkgi4yi2kwwRU1L34CTgZay5f5Bm3NdLLuit14nC201hVMQPRHgf2Bp4A0g4",
            "user-email": "arq_hiroshi@outlook.com",
        },
    };
    return await ajax(optionsRequest);
}