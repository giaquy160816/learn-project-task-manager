import { useProjects } from "../contexts/ProjectsContext";
import ProjectItem from "./ProjectItem";

function ProjectList() {
    const projects = useProjects();

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(project => (
                <ProjectItem key={project.id} project={project} />
            ))}
        </div>
    );
}

export default ProjectList;