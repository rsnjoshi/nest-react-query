import { AxiosResponse } from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios, { SERVER_URL } from '../api/http';
import localStorage from '../services/localStorage';
import { UserInfo } from '../services/userInfo';
function LoginComponent () {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const navigate = useNavigate();

    const updateemail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const register = () => {
        navigate('/register')
    }

    const login = async () => {
        const response = await axios.post<UserInfo>(`${SERVER_URL}/auth/login`, {
            email,
            password,
        })
        localStorage.setUserState({
            id: response.data.id as string,
            username: response.data.username,
            email: response.data.email,
            accessToken: response.data.accessToken
        })
        console.log(localStorage.getUserInfo())
        const anotherResoponse = await axios.get(`${SERVER_URL}/tasks/2`)
        console.log(anotherResoponse)
    }

    return (
        <div>
            <h4>email</h4>
            <input className="border-2 border-r-2 border-fuchsia-500" type="text" onChange={updateemail}/>
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