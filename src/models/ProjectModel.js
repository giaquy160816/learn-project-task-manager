const STORAGE_KEY = 'projects';

class ProjectModel {
    static getAll() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    static save(projects) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }

    static add(project) {
        const projects = this.getAll();
        projects.push(project);
        this.save(projects);
        return projects;
    }

    static update(projectId, updates) {
        const projects = this.getAll();
        const updatedProjects = projects.map(project =>
            project.id === projectId ? { ...project, ...updates } : project
        );
        this.save(updatedProjects);
        return updatedProjects;
    }

    static delete(projectId) {
        const projects = this.getAll();
        const filteredProjects = projects.filter(project => project.id !== projectId);
        this.save(filteredProjects);
        return filteredProjects;
    }

    static reorder(sourceIndex, destinationIndex) {
        const projects = this.getAll();
        const [removed] = projects.splice(sourceIndex, 1);
        projects.splice(destinationIndex, 0, removed);
        this.save(projects);
        return projects;
    }

    static toggleImportant(projectId) {
        const projects = this.getAll();
        const updatedProjects = projects.map(project =>
            project.id === projectId
                ? { ...project, isImportant: !project.isImportant }
                : project
        );
        this.save(updatedProjects);
        return updatedProjects;
    }

    static addTask(projectId, task) {
        const projects = this.getAll();
        const updatedProjects = projects.map(project =>
            project.id === projectId
                ? { ...project, tasks: [...project.tasks, task] }
                : project
        );
        this.save(updatedProjects);
        return updatedProjects;
    }

    static updateTask(projectId, taskId, updates) {
        const projects = this.getAll();
        const updatedProjects = projects.map(project =>
            project.id === projectId
                ? {
                    ...project,
                    tasks: project.tasks.map(task =>
                        task.id === taskId ? { ...task, ...updates } : task
                    )
                }
                : project
        );
        this.save(updatedProjects);
        return updatedProjects;
    }

    static deleteTask(projectId, taskId) {
        const projects = this.getAll();
        const updatedProjects = projects.map(project =>
            project.id === projectId
                ? {
                    ...project,
                    tasks: project.tasks.filter(task => task.id !== taskId)
                }
                : project
        );
        this.save(updatedProjects);
        return updatedProjects;
    }

    static moveTask(fromProjectId, toProjectId, taskId) {
        const projects = this.getAll();
        const fromProject = projects.find(p => p.id === fromProjectId);
        const taskToMove = fromProject?.tasks.find(t => t.id === taskId);

        if (!taskToMove) return projects;

        const updatedProjects = projects.map(project => {
            if (project.id === fromProjectId) {
                return {
                    ...project,
                    tasks: project.tasks.filter(task => task.id !== taskId)
                };
            }
            if (project.id === toProjectId) {
                return {
                    ...project,
                    tasks: [...project.tasks, taskToMove]
                };
            }
            return project;
        });

        this.save(updatedProjects);
        return updatedProjects;
    }
}

export default ProjectModel; 