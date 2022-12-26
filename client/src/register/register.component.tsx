import { useState } from "react"
import { RegisterData, RegisterKey } from "./register.type"
import axios, { SERVER_URL } from "../api/http"
import { useNavigate } from "react-router-dom"

function RegisterComponent() {
    const navigate = useNavigate()
    const [data, setData] = useState<RegisterData>({
        firstName: null,
        lastName: null,
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
    })
    const [valid, setValid] = useState<Boolean>(true)

    const changeRegisterData = ((e: React.ChangeEvent<HTMLInputElement>) => {
        const state = { ...data };
        const id: RegisterKey = e.currentTarget.id.split('-')[1] as RegisterKey;
        const val = e.currentTarget.value;
        state[id] = val;
        setData(state);
    })
    
    const save = async () => {
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            password: data.password,
            email: data.email,
        }
        const response = await axios.post(`${SERVER_URL}/auth/signUp`, payload)
        navigate('/login')
    }
    const register = () => {
        if (!validate()) setValid(false)
        else {
            setValid(true)
            save()
        }
    }

    const validate = (): boolean => {
        if (
            data.firstName
            && data.lastName
            && data.username
            && data.email
            && data.password
            && data.confirmPassword
            && data.password === data.confirmPassword
        ) return true;
        return false;
    }

    return (
        <div>
            <h1>Register User</h1>
            <br />
            <h4>First Name</h4>
            <input id='register-firstName' className="border-2 border-r-2 border-fuchsia-500" type="text" onChange={changeRegisterData}/>
            <h4>Last Name</h4>
            <input id='register-lastName' className="border-2 border-r-2 border-fuchsia-500" type="text" onChange={changeRegisterData}/>
            <h4>Email</h4>
            <input id='register-email' className="border-2 border-r-2 border-fuchsia-500" type="text" onChange={changeRegisterData}/>
            <h4>Username</h4>
            <input id='register-username' className="border-2 border-r-2 border-fuchsia-500" type="text" onChange={changeRegisterData}/>
            <h4>Password</h4>
            <input id='register-password' className="border-2 border-r-2 border-fuchsia-500" type="password" onChange={changeRegisterData}/>
            <h4>Confirm Password</h4>
            <input id='register-confirmPassword' className="border-2 border-r-2 border-fuchsia-500" type="password" onChange={changeRegisterData}/>
            <br />
            {
                !valid &&
                <h6 className='text-red-600'>*Invalid Inputs</h6>
            }
            <br />
            <button onClick={register}>Register</button>
        </div>
    )
}

export default RegisterComponent
