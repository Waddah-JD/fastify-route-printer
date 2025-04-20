import { stdout } from "process";

import { Writer } from "../types.js";

class ConsoleWriter implements Writer {
  async write(buffer: Uint8Array): Promise<void> {
    stdout.write(`${buffer}\n`);
  }
}

export default ConsoleWriter;
