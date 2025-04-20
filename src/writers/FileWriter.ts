import { PathLike } from "fs";
import { writeFile } from "fs/promises";

import { Writer } from "../types.js";

class FileWriter implements Writer {
  constructor(private readonly path: PathLike) {}

  async write(buffer: Uint8Array): Promise<void> {
    await writeFile(this.path, buffer);
  }
}

export default FileWriter;
