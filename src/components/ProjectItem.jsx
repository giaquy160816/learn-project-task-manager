import { useState } from "react";
import { useProjectsDispatch } from "../contexts/ProjectsContext";
import TaskList from "./TaskList";

function ProjectItem({ project }) {
    const dispatch = useProjectsDispatch();
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);

    const handleEdit = () => {
        dispatch({ type: "EDIT_PROJECT", payload: { id: project.id, name, description } });
        setEdit(false);
    };

    const handleDelete = () => {
        dispatch({ type: "DELETE_PROJECT", payload: { id: project.id } });
    };

    return (
        <div className="border p-4 rounded shadow">
            {edit ? (
                <>
                    <input className="border p-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
                    <input className="border p-2 w-full mt-2" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button className="bg-green-500 text-white px-2 py-1 mt-2 rounded" onClick={handleEdit}>Save</button>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-bold">{project.name}</h2>
                    <p className="text-gray-600">{project.description}</p>
                    <button className="bg-yellow-500 text-white px-2 py-1 mt-2 mr-2 rounded" onClick={() => setEdit(true)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 mt-2 rounded" onClick={handleDelete}>Delete</button>
                </>
            )}
            <TaskList project={project} />
        </div>
    );
}

export default ProjectItem;