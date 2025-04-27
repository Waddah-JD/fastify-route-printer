import { PathLike } from "fs";
import { mkdir, stat } from "fs/promises";
import path from "path";

async function createPathIfNotExists(p: PathLike): Promise<void> {
  const dirs = p.toString().split(path.sep);

  let fullPath = "";
  for (const dir of dirs) {
    fullPath = path.join(fullPath, dir);
    await createDirIfNotExists(fullPath);
  }
}

function getDirAndFileNameFromPath(p: string): { dir: string; fileName: string } {
  const { name, dir } = path.parse(p);
  return { dir, fileName: name };
}

async function createDirIfNotExists(p: PathLike): Promise<void> {
  try {
    await stat(p);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await mkdir(p);
  }
}

export default {
  fs: {
    createPathIfNotExists,
    getDirAndFileNameFromPath,
  },
};
