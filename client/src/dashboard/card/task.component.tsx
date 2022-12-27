import { Task } from "../task.type";

export default function Card(props: Task) {
    return (
        <>
            <div className="relative items-center flex-row justify-between px-2 py-6 border-b">
                <div className="border-b border-cyan-300">
                    <p className="inline-block mt-1 text-gray-600">{props.title}</p>
                </div>
                <div className="my-2">
                    <p className="inline-block mt-1 text-gray-600">{props.description}</p>
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
        </>
    )
}
