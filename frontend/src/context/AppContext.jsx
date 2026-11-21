
import { createContext, useContext, useEffect, useState }  from "react";
import { api } from "../config/axios-config";
import "../config/apiInterceptor";
import { setCsrfToken } from "../config/token-setting";

const AppContext = createContext(null);

export const ContextProvider =  ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    async function fetchUser() {
        setIsLoading(true);
        console.log("fetch User is called")

        try{
            const {data} = await api.get(`/api/v1/me`);
            setUser(data.user);
            setIsAuth(true);
        }

        catch(error) {
            console.log(error.message);
            setUser(null);
            setIsAuth(false);
        }

        finally{
            setIsLoading(false);
        }
    }

    async function fetchCsrfToken() {
        try{
            const {data} = await api.get(`/api/v1/csrf-token`);
            setCsrfToken(data.csrfToken);
        }
        catch(error) {
            console.log(`[CSRF-TOKEN]:${error.message}`);
        }
    }

    useEffect( () => {
         fetchUser();
         fetchCsrfToken();
    }, []);

    return <AppContext.Provider value={{user, setUser, isAuth, setIsAuth, isLoading, setIsLoading, fetchUser}}>
        {children}
    </AppContext.Provider>
}

export const AppData = () => {
    const context = useContext(AppContext);
    return context;
}