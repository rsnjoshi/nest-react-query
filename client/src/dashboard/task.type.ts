export type Task = {
    id: string,
    title: string,
    description: string,
    status: string,
    delete: boolean,
    userId: string,
    fileLocation: string | null,
}

export type TaskResponse = {
    complete: Task[],
    notStarted: Task[],
}