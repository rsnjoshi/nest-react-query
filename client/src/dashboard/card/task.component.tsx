import { useState } from "react";
import { TaskState } from "../task.type";
import TaskForm from "./task.form";

import axios, { SERVER_URL } from "../../api/http"

export default function Card(props: TaskState) {
    const [createTaskFlag, setCreateTaskFlag] = useState<boolean>(false)
    const createFlagOn = () => {
        setCreateTaskFlag(true)
    }
    const createFlagOff = () => {
        setCreateTaskFlag(false)
    }
    const onSubmit = () => {
        props.onSubmit(true)
        createFlagOff()
    }
    const updateStatus = async () => {
        await axios.put(`${SERVER_URL}/tasks/${props.id}`,
            {
                status: 'COMPLETED'
            }
        );
        props.onSubmit(true)
    }
    const deleteTask = async () => {
        await axios.delete(`${SERVER_URL}/tasks/${props.id}`)
        props.onSubmit(true)
    }
    return (
        <>
            {
                createTaskFlag &&
                <TaskForm
                    id={props.id}
                    title={props.title}
                    description={props.description}
                    userId={props.userId}
                    forEdit={true}
                    onSubmit={onSubmit}
                    onCancel={createFlagOff}
                />
            }
            {
                !createTaskFlag &&
                <div className="relative items-center flex-row justify-between px-2 py-6 border-b">
                    <div className="border-b border-cyan-300">
                        <p className="inline-block mt-1 text-gray-600">{props.title}</p>
                    </div>
                    <div className="my-2">
                        <p className="inline-block mt-1 text-gray-600">{props.description}</p>
                    </div>
                    <div className=" flex items-center justify-end">
                        {
                            !props.isComplete &&
                            <>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mx-1"
                                    onClick={createFlagOn}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mx-1"
                                    onClick={updateStatus}
                                >
                                    Complete
                                </button>
                            </>
                        }
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mx-1"
                            onClick={deleteTask}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            }
        </>
    )
}
