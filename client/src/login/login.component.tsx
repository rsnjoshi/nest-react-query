import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios, { SERVER_URL } from '../api/http';
import localStorage from '../services/localStorage';
import { UserInfo } from '../services/userInfo';
function LoginComponent() {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [valid, setValid] = useState<boolean>(true);
    const navigate = useNavigate();

    const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        } catch (error) {
            setValid(false)
        }
    }

    useEffect(() => {
        if (localStorage.isLoggedIn()) {
            navigate('/dashboard')
        }
    }, [])

    return (
        <div className="w-full max-w-xs m-auto mt-20">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="xyz@example.com" onChange={updateEmail} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="shadow appearance-none borde rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={updatePassword} />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={login}>
                        Log In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 hover:cursor-pointer" onClick={register}>
                        Create Account?
                    </a>
                </div>
            </form>
        </div>
    )
}

export default LoginComponent