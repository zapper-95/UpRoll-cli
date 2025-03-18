import fs from 'fs';
import {PATH_NAME} from "./config";
export async function ensureProjectDirectory(projectName: string) {
  const projectPath = `${PATH_NAME.UPROLL_CLI}/dist/projects/${projectName}/`;
  await fs.promises.mkdir(projectPath, { recursive: true });
  return projectPath;
}