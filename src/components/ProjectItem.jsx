import { useState } from "react";
import { useProjectsDispatch } from "../contexts/ProjectsContext";
import TaskList from "./TaskList";
import { Draggable } from "@hello-pangea/dnd";

function ProjectItem({ project, index }) {
    const dispatch = useProjectsDispatch();
    const [edit, setEdit] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);

    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    const handleEdit = () => {
        dispatch({ type: "EDIT_PROJECT", payload: { id: project.id, name, description } });
        setEdit(false);
    };

    const handleDelete = () => {
        dispatch({ type: "DELETE_PROJECT", payload: { id: project.id } });
    };

    const handleToggleImportant = (e) => {
        e.stopPropagation();
        dispatch({ type: "TOGGLE_IMPORTANT", payload: { id: project.id } });
    };

    return (
        <Draggable draggableId={project.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`border p-4 rounded shadow ${project.isImportant ? 'bg-red-50' : ''}`}
                >
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
                        <div className="flex items-center gap-2">
                            <div {...provided.dragHandleProps} className="cursor-move text-gray-400">
                                ⋮⋮
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={project.isImportant}
                                    onChange={handleToggleImportant}
                                    className="w-4 h-4"
                                />
                                <h2 className="text-xl font-bold">{project.name}</h2>
                            </div>
                            <div className="flex gap-2 text-sm text-gray-600">
                                <span>Total: {totalTasks}</span>
                                <span>Done: {completedTasks}</span>
                                <span>Pending: {pendingTasks}</span>
                            </div>
                        </div>
                        <button className="text-gray-500">
                            {isCollapsed ? '▼' : '▲'}
                        </button>
                    </div>
                    
                    {!isCollapsed && (
                        <>
                            {edit ? (
                                <>
                                    <input className="border p-2 w-full mt-2" value={name} onChange={(e) => setName(e.target.value)} />
                                    <input className="border p-2 w-full mt-2" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    <button className="bg-green-500 text-white px-2 py-1 mt-2 rounded" onClick={handleEdit}>Save</button>
                                </>
                            ) : (
                                <>
                                    <p className="text-gray-600 mt-2">{project.description}</p>
                                    <div className="mt-2">
                                        <button className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded" onClick={() => setEdit(true)}>Edit</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={handleDelete}>Delete</button>
                                    </div>
                                </>
                            )}
                            <TaskList project={project} />
                        </>
                    )}
                </div>
            )}
        </Draggable>
    );
}

export default ProjectItem;