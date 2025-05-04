export function projectsReducer(projects, action) {
    switch (action.type) {
        case 'ADD_PROJECT': {
            return [...projects, { ...action.payload, isImportant: false }];
        }
        case 'EDIT_PROJECT': {
            return projects.map(project =>
                project.id === action.payload.id
                    ? { ...project, name: action.payload.name, description: action.payload.description }
                    : project
            );
        }
        case 'DELETE_PROJECT': {
            return projects.filter(project => project.id !== action.payload.id);
        }
        case 'TOGGLE_IMPORTANT': {
            return projects.map(project =>
                project.id === action.payload.id
                    ? { ...project, isImportant: !project.isImportant }
                    : project
            );
        }
        case 'REORDER_PROJECTS': {
            const { sourceIndex, destinationIndex } = action.payload;
            const result = Array.from(projects);
            const [removed] = result.splice(sourceIndex, 1);
            result.splice(destinationIndex, 0, removed);
            return result;
        }
        case 'ADD_TASK': {
            return projects.map(project =>
                project.id === action.payload.projectId
                    ? { ...project, tasks: [...project.tasks, action.payload.task] }
                    : project
            );
        }
        case 'EDIT_TASK': {
            return projects.map(project =>
                project.id === action.payload.projectId
                    ? {
                        ...project,
                        tasks: project.tasks.map(task =>
                            task.id === action.payload.taskId
                                ? { ...task, name: action.payload.name }
                                : task
                        )
                    }
                    : project
            );
        }
        case 'TOGGLE_TASK': {
            return projects.map(project =>
                project.id === action.payload.projectId
                    ? {
                        ...project,
                        tasks: project.tasks.map(task =>
                            task.id === action.payload.taskId
                                ? { ...task, completed: !task.completed }
                                : task
                        )
                    }
                    : project
            );
        }
        case 'DELETE_TASK': {
            return projects.map(project =>
                project.id === action.payload.projectId
                    ? {
                        ...project,
                        tasks: project.tasks.filter(task => task.id !== action.payload.taskId)
                    }
                    : project
            );
        }
        case 'MOVE_TASK_BETWEEN_PROJECTS': {
            const { fromProjectId, toProjectId, taskId } = action.payload;
            
            // Find the task to move
            const fromProject = projects.find(p => p.id === fromProjectId);
            const taskToMove = fromProject?.tasks.find(t => t.id === taskId);
            
            if (!taskToMove) return projects;

            // Create new array of projects with updated tasks
            return projects.map(project => {
                if (project.id === fromProjectId) {
                    // Remove task from source project
                    return {
                        ...project,
                        tasks: project.tasks.filter(task => task.id !== taskId)
                    };
                }
                if (project.id === toProjectId) {
                    // Add task to destination project
                    return {
                        ...project,
                        tasks: [...project.tasks, taskToMove]
                    };
                }
                return project;
            });
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}