import React, { useEffect } from 'react'
import Axios from 'axios';

const UserProfile = () => {

    useEffect( () => {
        const fetchFromServer = async () =>{
            try {
                const response = await Axios.get('http://localhost:8081/api/auth/getUserInformation', 
                    { 
                        withCredentials: true, 
                        headers: {
                            'Content-Type' : 'application/json',
                            'Accept' : 'application/json',
                            'Cache' : 'no-cache'
                        }
                    }
                );
                console.log(response)
            } catch (err) {
                return err;
            } 
        }
        fetchFromServer();
    })
  return (
    <div>UserProfile</div>
  )
}

export default UserProfile