import { useProjects, useProjectsDispatch } from "../contexts/ProjectsContext";
import ProjectItem from "./ProjectItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function ProjectList() {
    const projects = useProjects();
    const dispatch = useProjectsDispatch();

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        dispatch({
            type: "REORDER_PROJECTS",
            payload: {
                sourceIndex: result.source.index,
                destinationIndex: result.destination.index
            }
        });
    };

    return (
        <div className="max-w-[800px] mx-auto p-4">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="projects">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="grid grid-cols-1 gap-4"
                        >
                            {projects.map((project, index) => (
                                <ProjectItem
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default ProjectList;