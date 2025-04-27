import { Printer, Route } from "../types.js";

type StringifyParameters = Parameters<JSON["stringify"]>;
type Replacer = StringifyParameters[1];
type Space = StringifyParameters[2];

class JSONPrinter implements Printer {
  constructor(
    private readonly replacer?: Replacer,
    private readonly space?: Space,
  ) {}

  async print(routes: Route[]): Promise<string> {
    return JSON.stringify(routes, this.replacer, this.space);
  }
}

export default JSONPrinter;
