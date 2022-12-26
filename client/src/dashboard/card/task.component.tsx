import { Task } from "../task.type";

export default function Card(props: Task) {
    return (
        <div>
            <h6>{props.title}</h6>
            <h6>{props.description}</h6>
            <h6>{props.status}</h6>
        </div>
    )
}
