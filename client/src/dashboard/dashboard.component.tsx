import axios, { SERVER_URL } from "../api/http"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import localStorage from "../services/localStorage"
import { UserInfo } from "../services/userInfo"
import Card from "./card/task.component"
import { Task, TaskResponse, TaskState } from "./task.type"
import TaskForm from "./card/task.form"
import { useQuery } from "react-query"

function DashboardComponent() {
    const { id, username, email } = localStorage.getUserInfo()
    const [createTaskFlag, setCreateTaskFlag] = useState<boolean>(false)

    const navigate = useNavigate()

    const createFlagOn = () => {
        setCreateTaskFlag(true)
    }

    const createFlagOff = () => {
        setCreateTaskFlag(false)
    }

    const logOut = () => {
        localStorage.logOut()
        navigate('/login')
    }

    const fetchItems = async () => {
        const response = await axios.get<TaskResponse>(`${SERVER_URL}/tasks/${id}`)
        const { complete, notStarted } = response.data
        const completeState: TaskState[] = complete.map(task => ({
            ...task,
            // isEdit: false,
            isComplete: true,
        }))
        const notStartedState: TaskState[] = notStarted.map(task => ({
            ...task,
            // isEdit: false,
            isComplete: false,
        }))
        completeState.reverse()
        notStartedState.reverse()
        return {
            completedTask: completeState,
            todoTask: notStartedState,
        }
    }

    const { data, isSuccess, isLoading, isError, refetch } = useQuery<{
        completedTask: TaskState[],
        todoTask: TaskState[],
    }>('tasks', fetchItems)

    const onSubmit = async (fromEdit: boolean) => {
        await refetch({
            throwOnError: true,
        })
        if (!fromEdit) createFlagOff()
    }

    useEffect(() => {
        if (!localStorage.isLoggedIn()) navigate('/login')
    }, [])

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
                    <div className="px-6 w-full flex flex-wrap items-center justify-between">
                        <div className="grow items-center">
                            <ul className="navbar-nav mr-auto flex justify-between">
                                <li className="relative">
                                    <div className="inline-flex absolute top-3.5 -right-2 justify-center items-center w-3 h-3 text-xs font-bold text-white bg-green-500 rounded-full border-1 border-white dark:border-gray-900"></div>
                                    <h5 className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 font-bold" >{username}</h5>
                                </li>
                                <li>
                                    <h1 className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 font-bold">TODO DASHBOARD</h1>
                                </li>
                                <li>
                                    <div className="flex space-x-2 justify-center">
                                        <button type="button"
                                            className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                            onClick={logOut}>Log Out</button>
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
                            <h4 className="mr-6 text-2xl font-bold text-purple-600"> TODO</h4>
                        </div>
                        <div className="relative">
                            {
                                createTaskFlag &&
                                <TaskForm
                                    title={null}
                                    description={null}
                                    userId={id}
                                    forEdit={false}
                                    onSubmit={onSubmit}
                                    onCancel={createFlagOff}
                                />
                            }
                            {
                                !createTaskFlag &&
                                <input type="text" placeholder="What needs to be done today?"
                                    className="w-full px-2 py-3 border rounded-lg outline-none border-green-600"
                                    onClick={createFlagOn}
                                />
                            }
                        </div>
                        {
                            data?.todoTask.map((task, i) => {
                                const newTask = {
                                    ...task,
                                    onSubmit
                                }
                                return <Card key={`todo-component-${i}`} {...newTask} />
                            })
                        }

                    </div>
                </div>
                <div className="flex justify-center self-start w-6/12 mx-3">
                    <div className="w-full px-4 py-8 mx-auto shadow">
                        <div className="flex items-center mb-6">
                            <h4 className="mr-6 text-2xl font-bold text-green-600"> COMPLETE</h4>
                        </div>
                        {
                            data?.completedTask.map((task, i) => {
                                const newTask = {
                                    ...task,
                                    onSubmit
                                }
                                return <Card key={`completed-component-${i}`} {...newTask} />
                            })
                        }
                    </div>
                </div>
            </div>


        </div>
    )
}

export default DashboardComponent