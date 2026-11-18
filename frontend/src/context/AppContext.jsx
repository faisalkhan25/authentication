import axios from "axios";
import { createContext, useContext, useEffect, useState }  from "react";
import { api } from "../config/axios-config";
import "../config/apiInterceptor";

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

    useEffect( () => {
         fetchUser();
    }, []);

    return <AppContext.Provider value={{user, setUser, isAuth, setIsAuth, isLoading, setIsLoading, fetchUser}}>
        {children}
    </AppContext.Provider>
}

export const AppData = () => {
    const context = useContext(AppContext);
    return context;
}