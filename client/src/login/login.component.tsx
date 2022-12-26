import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios, { SERVER_URL } from '../api/http';
import localStorage from '../services/localStorage';
import { UserInfo } from '../services/userInfo';
function LoginComponent () {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [valid, setValid] = useState<boolean>(true);
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
        try {
            const response = await axios.post<UserInfo>(`${SERVER_URL}/auth/login`, {
                email,
                password,
            })
            setValid(true)
            localStorage.setUserState({
                id: response.data.id as string,
                username: response.data.username,
                email: response.data.email,
                accessToken: response.data.accessToken
            })
            navigate('/dashboard')
        } catch(error) {
            setValid(false)
        }
    }

    useEffect(() => {
        if(localStorage.isLoggedIn()) {
            navigate('/dashboard')
        }
    }, [])

    return (
        <div>
            <h4>email</h4>
            <input className="border-2 border-r-2 border-fuchsia-500" type="text" onChange={updateemail}/>
            <h4>Password</h4>
            <input className="border-2 border-r-2 border-fuchsia-500" type="password" onChange={updatePassword}/>
            <br />
            <br />
            {
                !valid
                && <h6>*Invalid Credential</h6>
            }
            <button className="bg-red-500" onClick={login}>Log In</button>
            <button className="bg-blue-500 mx-5" onClick={register}>Sign Up</button>
        </div>
    )
}

export default LoginComponent