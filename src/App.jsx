import { useReducer } from "react";
import { ProjectsContext, ProjectsDispatchContext } from "./contexts/ProjectsContext";
import { projectsReducer } from "./reducers/projectsReducer";
import AddProject from "./components/AddProject";
import ProjectList from "./components/ProjectList";
import ProjectModel from "./models/ProjectModel";

function App() {
  const [projects, dispatch] = useReducer(projectsReducer, ProjectModel.getAll());

  return (
    <ProjectsContext.Provider value={projects}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        <div className="max-w-[800px] mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Project Management</h1>
          <AddProject />
          <ProjectList />
        </div>
      </ProjectsDispatchContext.Provider>
    </ProjectsContext.Provider>
  );
}

export default App;