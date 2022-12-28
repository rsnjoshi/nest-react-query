import { useState } from "react"
import { RegisterData, RegisterKey } from "./register.type"
import axios, { SERVER_URL } from "../api/http"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
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

    const createUser = async (data: RegisterData) => {
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            password: data.password,
            email: data.email,
        }
        const response = await axios.post(`${SERVER_URL}/auth/signUp`, payload)
        return response.data
    }

    const { mutate } = useMutation<unknown, unknown, RegisterData>(createUser, {
        onSuccess: () => {
            navigate('/login')
        },
        onError: () => {
            setValid(false)
        },
    })

    const register = () => {
        if (!validate()) setValid(false)
        else {
            setValid(true)
            mutate(data)
        }
    }

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        id='register-email'
                        onChange={changeRegisterData}
                        placeholder="Email" />

                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        id='register-firstName'
                        onChange={changeRegisterData}
                        placeholder="First Name" />

                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        id='register-lastName'
                        onChange={changeRegisterData}
                        placeholder="Last Name" />

                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        id='register-username'
                        onChange={changeRegisterData}
                        placeholder="Username" />

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        id='register-password'
                        onChange={changeRegisterData}
                        placeholder="Password" />
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        id='register-confirmPassword'
                        onChange={changeRegisterData}
                        placeholder="Confirm Password" />
                    {
                        !valid &&
                        <p className="text-red-500 text-xs italic">*Invalid Input.</p>
                    }

                    <button
                        className="w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1"
                        onClick={register}
                    >Create Account</button>

                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <a className="underline border-b border-blue text-blue hover:cursor-pointer hover:text-blue-600" onClick={() => navigate('/login')}>
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent
