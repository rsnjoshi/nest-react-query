import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios, { SERVER_URL } from '../api/http';
function LoginComponent () {
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const navigate = useNavigate();

    const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value)
    }

    const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const register = () => {
        navigate('/register')
    }

    const login = async () => {
        await axios.post(`${SERVER_URL}/auth/login`, {
            username,
            password,
        })
    }

    return (
        <div>
            <h4>Username</h4>
            <input className="border-2 border-r-2 border-fuchsia-500" type="text" onChange={updateUsername}/>
            <h4>Password</h4>
            <input className="border-2 border-r-2 border-fuchsia-500" type="password" onChange={updatePassword}/>
            <br />
            <br />
            <button className="bg-red-500" onClick={login}>Log In</button>
            <button className="bg-blue-500 mx-5" onClick={register}>Sign Up</button>
        </div>
    )
}

export default LoginComponent