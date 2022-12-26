import axios, { SERVER_URL } from "../api/http"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import localStorage from "../services/localStorage"
import { UserInfo } from "../services/userInfo"
import Card from "./card/task.component"
import { Task, TaskResponse } from "./task.type"

function DashboardComponent() {
    const [completedTask, setCompletedTask] = useState<Task[]>([])
    const [todoTask, setTodoTask] = useState<Task[]>([])
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.logOut()
        navigate('/login')
    }
    const {id, username, email} = localStorage.getUserInfo()
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
        <div>
            <h1>dashboard</h1>
            <br />
            <h5>Hello {username}!</h5>
            <br />
            <br />
            <h4>Todo</h4>
            {
                todoTask.map((task, i) => (<Card {...task}/>))
            }
            <br />
            <h4>Complete</h4>
            {
                completedTask.map((task, i) => (<Card {...task}/>))
            }
            <button onClick={logOut}>Logout</button>
        </div>
        
    )
}

export default DashboardComponent