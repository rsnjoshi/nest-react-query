import { useState } from "react";
import { TaskState } from "../task.type";
import TaskForm from "./task.form";

import axios, { SERVER_URL } from "../../api/http"
import { useMutation } from "react-query";

export default function Card(props: TaskState) {
    const [createTaskFlag, setCreateTaskFlag] = useState<boolean>(false)
    const createFlagOn = () => {
        setCreateTaskFlag(true)
    }
    const createFlagOff = () => {
        setCreateTaskFlag(false)
    }

    const afterSubmit = () => {
        if (props.onSubmit) props.onSubmit(true)
    }

    const onSubmit = () => {
        afterSubmit()
        createFlagOff()
    }
    
    const updateCard = async (isDelete: boolean) => {
        try {
            if (isDelete) {
                const response = await axios.delete(`${SERVER_URL}/tasks/${props.id}`)
                return response.data
            } else {
                const response = await axios.put(`${SERVER_URL}/tasks/${props.id}`,
                    {
                        status: 'COMPLETED'
                    }
                )
                return response.data
            }
        } catch(err) {
            throw new Error('Something went wrong')
        }
    }


    const { mutate } = useMutation(updateCard, {
        onSuccess: () => {
            afterSubmit()
        }
    })

    const updateStatus = () => {
        mutate(false)
    }
    const deleteTask = () => {
        mutate(true)
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
                <div className="relative items-center flex-row justify-between px-2 py-6 border my-2 border-cyan-300 rounded-lg">
                    <div className="border-b border-cyan-300">
                        <p className="inline-block mt-1 text-gray-600 font-bold capitalize">{props.title}</p>
                    </div>
                    <div className="my-2">
                        <p className="inline-block mt-1 text-gray-600">{props.description}</p>
                    </div>
                    <div className=" flex items-center justify-end mt-2">
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
