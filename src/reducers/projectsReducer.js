import ProjectModel from '../models/ProjectModel';

export function projectsReducer(projects, action) {
    switch (action.type) {
        case 'ADD_PROJECT': {
            return ProjectModel.add({ ...action.payload, isImportant: false });
        }
        case 'EDIT_PROJECT': {
            return ProjectModel.update(action.payload.id, {
                name: action.payload.name,
                description: action.payload.description
            });
        }
        case 'DELETE_PROJECT': {
            return ProjectModel.delete(action.payload.id);
        }
        case 'TOGGLE_IMPORTANT': {
            return ProjectModel.toggleImportant(action.payload.id);
        }
        case 'REORDER_PROJECTS': {
            return ProjectModel.reorder(
                action.payload.sourceIndex,
                action.payload.destinationIndex
            );
        }
        case 'ADD_TASK': {
            return ProjectModel.addTask(action.payload.projectId, action.payload.task);
        }
        case 'EDIT_TASK': {
            return ProjectModel.updateTask(
                action.payload.projectId,
                action.payload.taskId,
                { name: action.payload.name }
            );
        }
        case 'TOGGLE_TASK': {
            const project = projects.find(p => p.id === action.payload.projectId);
            const task = project?.tasks.find(t => t.id === action.payload.taskId);
            if (!task) return projects;

            return ProjectModel.updateTask(
                action.payload.projectId,
                action.payload.taskId,
                { completed: !task.completed }
            );
        }
        case 'DELETE_TASK': {
            return ProjectModel.deleteTask(action.payload.projectId, action.payload.taskId);
        }
        case 'MOVE_TASK_BETWEEN_PROJECTS': {
            return ProjectModel.moveTask(
                action.payload.fromProjectId,
                action.payload.toProjectId,
                action.payload.taskId
            );
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}