import React, { createContext, useState } from 'react';
import Axios from 'axios';

import { UserContextInterface } from '../models/models';

const UserContext = createContext<UserContextInterface | null>(null);

export interface Props {
    children: React.ReactNode
}

const UserProvider = (props: Props) =>{

    const [ user, setUser ] = useState({ username: '', isAdmin: false, isRegUser: false, isGuest: false });

    const loginUser = async (username: string, password: string) => {
        const data = {
            username,
            password
        }
        try { 
            const response = await Axios({
                method: 'POST',
                url: 'http://localhost:8081/api/auth/loginUser',
                headers: {
                    'Content-Type' : 'application/json',
                },
                withCredentials: true,
                data: JSON.stringify(data)

            })
            if(response.data.success){
                setUser({ username: response.data.userInfo.username, isAdmin: response.data.userInfo.isAdmin, isRegUser: response.data.userInfo.isRegUser, isGuest: response.data.userInfo.isGuest });
            } 
            console.log(response)
            return response.data.msg
        } catch (err) {
            return err;
        }
    }

    const registerUser = async (username: string, email: string, password: string) => {
        try {
            const data = {
                username: username,
                email: email,
                password: password
            }
            const response = await Axios({
                method: 'POST',
                url: 'http://localhost:8081/api/auth/registerUser',
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json',
                },
                data: JSON.stringify(data)
            })
            if(response.data.success){
                setUser({ username: response.data.userInfo.username, isAdmin: response.data.userInfo.isAdmin, isRegUser: response.data.userInfo.isRegUser, isGuest: response.data.userInfo.isGuest });
            } 
            console.log(response)
            return { msg: response.data.msg, success: response.data.success };
        } catch (err) {
            return err;
        }        
    }

    const logoutUser = async () => {
        try {
            const response = await Axios({
                method: 'POST',
                url: 'http://localhost:8081/api/auth/logoutUser',  
                withCredentials: true 
            });

            if(response.data.success){
                setUser({ username: '', isAdmin: false, isRegUser: false, isGuest: false });
            } 

            return { msg: response.data.msg, success: response.data.success };
        } catch (err) {
            return err;
        }      
    }

    const getAllUserNames = async () => {
        try {
            const response = await Axios({
                method: 'GET',
                url: 'http://localhost:8081/api/auth/getAllUsers',  
                withCredentials: true 
            });

            return response.data;

        } catch (err) {
            return err;
        }  
    }

    return <UserContext.Provider value={{
        loginUser, registerUser, logoutUser,
        user, getAllUserNames

    }}>
        { props.children }
    </UserContext.Provider>
};

export { UserContext }
export default UserProvider;