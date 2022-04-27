import { useState } from "react";


export default function useToken() {

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        // if not present in localstorage, then str is null, userToken is null
        return userToken;
    }

    const saveToken = userToken => {
        console.log("usertoken is : ", userToken)
        if (userToken?.token === 'ERROR') {
            localStorage.removeItem('token');
            setToken(null);
            console.log("Token is invalid")
            return 'ERROR';
        }
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
        return 'VALID';
    }


    const [token, setToken] = useState(getToken());

    return {
        setToken: saveToken,
        token
    }


}