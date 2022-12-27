import axios, { SERVER_URL } from "../api/http"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import localStorage from "../services/localStorage"
import { UserInfo } from "../services/userInfo"
import Card from "./card/task.component"
import { Task, TaskResponse } from "./task.type"
import TaskForm from "./card/task.form"
function DashboardComponent() {
    const [completedTask, setCompletedTask] = useState<Task[]>([])
    const [todoTask, setTodoTask] = useState<Task[]>([])
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.logOut()
        navigate('/login')
    }
    const { id, username, email } = localStorage.getUserInfo()
    useEffect(() => {
        if (!localStorage.isLoggedIn()) navigate('/login')
        else {
            getItems()
        }
    }, [])

    const getItems = async () => {
        const response = await axios.get<TaskResponse>(`${SERVER_URL}/tasks/${id}`)
        const { complete, notStarted } = response.data
        setCompletedTask(complete)
        setTodoTask(notStarted)

    }

    return (
        // <div>
        //     <h1>dashboard</h1>
        //     <br />
        //     <h5>Hello {username}!</h5>
        //     <br />
        //     <br />
        //     <h4>Todo</h4>
        //     {
        //         todoTask.map((task, i) => (<Card {...task}/>))
        //     }
        //     <br />
        //     <h4>Complete</h4>
        //     {
        //         completedTask.map((task, i) => (<Card {...task}/>))
        //     }
        //     <button onClick={logOut}>Logout</button>
        // </div>
        <div>
            <header>
                <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
                    <div className="px-6 w-full flex flex-wrap items-center justify-between">
                        <div className="grow items-center">
                            <ul className="navbar-nav mr-auto flex justify-between">
                                <li>
                                    <h5 className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 font-bold" >{username}</h5>
                                </li>
                                <li>
                                    <h1 className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 font-bold">TODO DASHBOARD</h1>
                                </li>
                                <li>
                                    <div className="flex space-x-2 justify-center">
                                        <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Log Out</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <div className='px-6 w-full flex items-center justify-center'>
                <div className="flex justify-center self-start w-6/12">
                    <div className="w-full px-4 py-8 mx-auto shadow">
                        <div className="flex items-center mb-6">
                            <h1 className="mr-6 text-4xl font-bold text-purple-600"> TODO</h1>
                        </div>
                        <div className="relative">
                            {/* <input type="text" placeholder="What needs to be done today?"
                                className="w-full px-2 py-3 border rounded outline-none border-grey-600" /> */}
                            <TaskForm></TaskForm>
                        </div>
                        <div className="list-reset">
                            <div className="relative items-center flex-row justify-between px-2 py-6 border-b">
                                <div className="border-b border-cyan-300">
                                    <p className="inline-block mt-1 text-gray-600">Title 1</p>
                                </div>
                                <div className="my-2">
                                    <p className="inline-block mt-1 text-gray-600">Tailwind CSS To DO App List 1 sdfadsfdsafadsfadsfa dsfdsaf adsf adsf sadf adsf asdf sda</p>
                                </div>
                                <div className=" flex items-center justify-end">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mx-1">
                                        Edit
                                    </button>
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mx-1">
                                        Complete
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mx-1">
                                        Delete
                                    </button>
                                </div>

                            </div>
                            <div className="relative items-center flex-row justify-between px-2 py-6 border-b">
                                <div className="border-b border-cyan-300">
                                    <input type="text" placeholder="Title"
                                        className="w-full px-2 py-3 border rounded outline-none border-grey-600" />
                                </div>
                                <div className="my-2">
                                    <input type="text" placeholder="Description"
                                            className="w-full px-2 py-3 border rounded outline-none border-grey-600" />
                                </div>
                                <div className=" flex items-center justify-end">
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mx-1">
                                        Done
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mx-1">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center self-start w-6/12 mx-3">
                    <div className="w-full px-4 py-8 mx-auto shadow">
                        <div className="flex items-center mb-6">
                            <h1 className="mr-6 text-4xl font-bold text-purple-600"> COMPLETE</h1>
                        </div>
                        {/* <ul className="list-reset">
                            <li className="relative flex items-center justify-between px-2 py-6 border-b">
                                <div>
                                    <p className="inline-block mt-1 text-gray-600">Tailwind CSS To DO App List 1</p>
                                </div>
                                <button type="button" className="absolute right-0 flex items-center">
                                </button>
                            </li>
                            <li className="relative flex items-center justify-between px-2 py-6 border-b">
                                <div>
                                    <p className="inline-block mt-1 text-gray-600">Tailwind CSS To DO App List 2</p>
                                </div>
                                <button type="button" className="absolute right-0 flex items-center">
                                </button>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default DashboardComponent