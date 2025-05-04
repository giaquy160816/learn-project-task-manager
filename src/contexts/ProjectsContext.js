import { createContext, useContext } from "react";

export const ProjectsContext = createContext(null);
export const ProjectsDispatchContext = createContext(null);

export function useProjects() {
  return useContext(ProjectsContext);
}

export function useProjectsDispatch() {
  return useContext(ProjectsDispatchContext);
}
