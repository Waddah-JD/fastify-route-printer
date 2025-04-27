import { PathLike } from "fs";
import { writeFile } from "fs/promises";

import { Writer } from "../types.js";
import utils from "../utils.js";

class FileWriter implements Writer {
  constructor(private readonly path: PathLike) {}

  async write(buffer: Uint8Array): Promise<void> {
    await this.createDirIfNotExists(this.path);
    await writeFile(this.path, buffer);
  }

  async createDirIfNotExists(path: PathLike): Promise<void> {
    const { dir } = utils.fs.getDirAndFileNameFromPath(path.toString());
    await utils.fs.createPathIfNotExists(dir);
  }
}

export default FileWriter;
