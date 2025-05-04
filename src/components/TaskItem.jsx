import { useProjectsDispatch } from "../contexts/ProjectsContext";

function TaskItem({ task, projectId }) {
    const dispatch = useProjectsDispatch();

    const handleToggle = () => {
        dispatch({ type: "TOGGLE_TASK", payload: { projectId, taskId: task.id } });
    };

    const handleDelete = () => {
        dispatch({ type: "DELETE_TASK", payload: { projectId, taskId: task.id } });
    };

    return (
        <div className="flex justify-between items-center mt-2 p-2 border rounded">
            <label className="flex items-center gap-2">
                <input type="checkbox" checked={task.completed} onChange={handleToggle} />
                <span className={task.completed ? "line-through" : ""}>{task.name}</span>
            </label>
            <button onClick={handleDelete} className="text-red-500">Delete</button>
        </div>
    );
}

export default TaskItem;