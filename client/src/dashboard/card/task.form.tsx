import React, { useEffect, useState } from "react";
import { Task, TaskFormDataProps } from "../task.type";
import axios, { SERVER_URL } from '../../api/http'
type TaskState = {
    title: string | null,
    description: string | null,
}

export default function TaskForm(props: TaskFormDataProps) {

    const [task, setTask] = useState<TaskState>({
        title: props.title,
        description: props.description,
    })

    const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({
            ...task,
            title: e.target.value
        })
    }

    const updateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({
            ...task,
            description: e.target.value
        })
    }

    const save = async () => {
        if (props.forEdit) {
            await axios.put(`${SERVER_URL}/tasks/${props.id}`,
                {
                    title: task.title,
                    description: task.description,
                })
        } else {
            await axios.post(`${SERVER_URL}/tasks/`,
                {
                    title: task.title,
                    status: 'NOT_STARTED',
                    description: task.description,
                    fileLocation: '',
                    delete: false,
                    userId: props.userId,
                })
        }
        props.onSubmit()
    }




    return (
        <div className="relative items-center flex-row justify-between px-2 py-6 border-b">
            <div className="border-b border-cyan-300">
                <input type="text" placeholder="Title"
                    className="w-full px-2 py-3 border rounded outline-none border-grey-600" value={task.title || ''} onChange={updateTitle} />
            </div>
            <div className="my-2">
                <input type="text" placeholder="Description"
                    className="w-full px-2 py-3 border rounded outline-none border-grey-600" value={task.description || ''} onChange={updateDescription} />
            </div>
            <div className=" flex items-center justify-end">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mx-1"
                    onClick={save}
                >
                    Done
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mx-1"
                    onClick={props.onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
