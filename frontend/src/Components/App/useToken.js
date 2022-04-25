import { useState } from "react";


export default function useToken() {

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token;
    }

    const saveToken = userToken => {
        console.log("usertoken is : ", userToken)
        if (userToken?.token === 'ERROR') {
            sessionStorage.removeItem('token');
            setToken(null);
            console.log("Token is invalid")
            return 'ERROR';
        }
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
        return 'VALID';
    }


    const [token, setToken] = useState(getToken());

    return {
        setToken: saveToken,
        token
    }


}