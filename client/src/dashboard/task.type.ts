export type Task = {
    id: string,
    title: string,
    description: string,
    status: string,
    delete: boolean,
    userId: string,
    fileLocation?: string | null,
}

export type TaskResponse = {
    complete: Task[],
    notStarted: Task[],
}

export type TaskFormDataProps = {
    title: string | null,
    description: string | null,
    userId: string,
    forEdit: boolean,
    id?: string,
    onSubmit: (fromEdit: boolean) => void,
    onCancel: () => void,
}

export type TaskRequest = {
    id?: string,
    title?: string,
    description?: string,
    status?: string,
    delete?: boolean,
    userId?: string,
    fileLocation?: string | null,
}

export type ComponentState = {
    addNewTask: boolean,
}

export type TaskState = Task & { 
    // isEdit: boolean,
    isComplete: boolean,
    onSubmit: (fromEdit: boolean) => void,
}