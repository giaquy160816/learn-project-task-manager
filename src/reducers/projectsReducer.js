export function projectsReducer(projects, action) {
    switch (action.type) {
        case 'ADD_PROJECT': {
            return [...projects, action.payload];
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
            let movedTask = null;
            const updatedProjects = projects.map(project => {
                if (project.id === fromProjectId) {
                    const filteredTasks = project.tasks.filter(task => {
                        if (task.id === taskId) {
                            movedTask = task;
                            return false;
                        }
                        return true;
                    });
                    return { ...project, tasks: filteredTasks };
                }
                if (project.id === toProjectId && movedTask) {
                    return { ...project, tasks: [...project.tasks, movedTask] };
                }
                return project;
            });
            return updatedProjects;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}