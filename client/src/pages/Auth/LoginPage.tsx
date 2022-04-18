import React, { useState, useContext } from 'react'

import InputField from '../../components/UI Elements/InputField/InputField';
import { UserContext } from '../../Context/User-Context';
import { UserContextInterface } from '../../models/models';
import './LoginPage.css';

export interface Context {
    loginUser: () => void;
    registerUser: () => void;
}
const LoginPage = () => {
    
    const [ login, setLogin ] = useState<boolean>(true);
    const [ password, setPassword] = useState<string>('');
    const [ username, setUsername] = useState<string>('');
    const [ email, setEmail] = useState<string>('');
    const { loginUser, registerUser } = useContext(UserContext) as UserContextInterface;

  return (
    <div className='LoginPage'>
        <h1>{ login ? 'Login' : 'Register' }</h1>

        <div className='LoginPage-Form'>
            <InputField label='Username' as='text' placeholder='Enter your username' value={username} updateValue={(val) => setUsername(val)} />
            { !login && <InputField label='Email' as='text' placeholder='Enter your email' value={email} updateValue={(val) => setEmail(val)} /> }
            <InputField label='Password' as='password' placeholder='Enter your password' value={password} updateValue={(val) => setPassword(val)} />
            <div className='LoginPage-FormButtons'>
                <button onClick={() => { login ? loginUser(username, password) : registerUser(username, email, password)}}>
                    { login ? 'Login' : 'Register' }
                </button>
            </div>
        </div>
        <div className='LoginPage-ToggleAuth'>
            <p onClick={() => setLogin(prevState => !prevState)}> 
                { login ? 'New user? Click here to register!' : 'Already a user? Click here to login!'} 
            </p>
        </div>
    </div>
  )
}

export default LoginPage