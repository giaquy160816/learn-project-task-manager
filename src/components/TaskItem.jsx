import { useProjectsDispatch, useProjects } from "../contexts/ProjectsContext";
import { useState } from "react";

function TaskItem({ task, projectId }) {
    const dispatch = useProjectsDispatch();
    const projects = useProjects();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(task.name);
    const [editedProjectId, setEditedProjectId] = useState(projectId);

    const handleToggle = () => {
        dispatch({ type: "TOGGLE_TASK", payload: { projectId, taskId: task.id } });
    };

    const handleDelete = () => {
        dispatch({ type: "DELETE_TASK", payload: { projectId, taskId: task.id } });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editedProjectId !== projectId) {
            // Move task to different project
            dispatch({
                type: "MOVE_TASK_BETWEEN_PROJECTS",
                payload: {
                    fromProjectId: projectId,
                    toProjectId: editedProjectId,
                    taskId: task.id
                }
            });
        }
        
        // Update task name if changed
        if (editedName !== task.name) {
            dispatch({
                type: "EDIT_TASK",
                payload: {
                    projectId: editedProjectId,
                    taskId: task.id,
                    name: editedName
                }
            });
        }
        
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedName(task.name);
        setEditedProjectId(projectId);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="flex flex-col gap-2 mt-2 p-2 border rounded">
                <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border p-1 rounded"
                    placeholder="Task name"
                />
                <select
                    value={editedProjectId}
                    onChange={(e) => setEditedProjectId(e.target.value)}
                    className="border p-1 rounded"
                >
                    {projects.map(project => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
                <div className="flex gap-2">
                    <button onClick={handleSave} className="text-green-500">Save</button>
                    <button onClick={handleCancel} className="text-gray-500">Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between items-center mt-2 p-2 border rounded">
            <label className="flex items-center gap-2">
                <input type="checkbox" checked={task.completed} onChange={handleToggle} />
                <span className={task.completed ? "line-through" : ""}>{task.name}</span>
            </label>
            <div className="flex gap-2">
                <button onClick={handleEdit} className="text-blue-500">Edit</button>
                <button onClick={handleDelete} className="text-red-500">Delete</button>
            </div>
        </div>
    );
}

export default TaskItem;