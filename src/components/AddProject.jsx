import { useState } from "react";
import { useProjectsDispatch } from "../contexts/ProjectsContext";

function AddProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useProjectsDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_PROJECT",
      payload: { id: crypto.randomUUID(), name, description, tasks: [] },
    });
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex gap-2">
      <input className="border p-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" />
      <input className="border p-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Project</button>
    </form>
  );
}

export default AddProject;
