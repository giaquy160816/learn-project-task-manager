import { useState } from "react";
import { useProjectsDispatch } from "../contexts/ProjectsContext";
import TaskItem from "./TaskItem";

function TaskList({ project }) {
    const dispatch = useProjectsDispatch();
    const [taskName, setTaskName] = useState("");

    const handleAddTask = (e) => {
        e.preventDefault();
        dispatch({
            type: "ADD_TASK",
            payload: { projectId: project.id, task: { id: crypto.randomUUID(), name: taskName, completed: false } },
        });
        setTaskName("");
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleAddTask} className="flex gap-2">
                <input className="border p-2 flex-1" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Task name" />
                <button className="bg-blue-400 text-white px-4 rounded">Add Task</button>
            </form>

            <div className="mt-2">
                {project.tasks.map(task => (
                    <TaskItem key={task.id} task={task} projectId={project.id} />
                ))}
            </div>
        </div>
    );
}

export default TaskList;