export default function TaskForm() {
    return (
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
    )
}