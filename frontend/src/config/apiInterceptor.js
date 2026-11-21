
import { api } from "./axios-config";
import { getCsrfToken, setCsrfToken } from "./token-setting";

const server = "http://localhost:5000";


let refreshPromise = null;
let csrfRefreshPromise = null;

api.interceptors.request.use(
    (config) => {
        if(config.method !== "get") {
            const csrfToken = getCsrfToken();

            if(csrfToken) {
                config.headers['x-csrf-token'] = csrfToken;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if(!error.response) {
            return Promise.reject(error);
        }

        if(error.response?.status !== 403) {
            return Promise.reject(error);
        }


        const errorCode = error.response.data?.code;

        if (errorCode === "CSRF") {
            if (originalRequest._retryCsrf) {
                return Promise.reject(error);
            }
            
            originalRequest._retryCsrf = true;

            if (!csrfRefreshPromise) {
                csrfRefreshPromise = api.get('/api/v1/csrf-token')
                    .then(({ data }) => {
                        setCsrfToken(data.csrfToken);
                    })
                    .finally(() => {
                        csrfRefreshPromise = null;
                    });
            }
        } else if (errorCode === "ACCESS-TOKEN") {
            if (originalRequest._retryAuth) {
                return Promise.reject(error);
            }
            originalRequest._retryAuth = true;

            if (!refreshPromise) {
                refreshPromise = api.get(`/api/v1/refresh`)
                    .finally(() => {
                        refreshPromise = null;
                    });
            }
        } else {
            return Promise.reject(error);
        }




        try {
            await refreshPromise;
            await csrfRefreshPromise;
            return api(originalRequest);
        }
        catch (refreshError) {
            return Promise.reject(refreshError);
        }

    }
)

export default api;
