import { api } from "./axios-config";

const server = "http://localhost:5000";


let refreshPromise = null;

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if(error.response?.status !== 403 || originalRequest._retry) {
            return Promise.reject(error);
        }


        originalRequest._retry = true;

        if(!refreshPromise) {
            refreshPromise = api.get(`/api/v1/refresh`)
                .finally(() => {
                    refreshPromise = null;
                });
        }


        try {
            await refreshPromise;
            return api(originalRequest);
        }
        catch (refreshError) {
            return Promise.reject(refreshError);
        }

    }
)

export default api;
