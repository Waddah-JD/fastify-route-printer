import { COLOR_VALUES_MAP, DEFAULT_COLOR_SCHEME } from "../constants.js";
import { ColorScheme, Printer, Route } from "../types.js";

class TablePrinter implements Printer {
  private readonly colorScheme: ColorScheme | null;

  constructor(options: { colors: ColorScheme | boolean }) {
    if (!options.colors) {
      this.colorScheme = null;
      return;
    }

    this.colorScheme = typeof options.colors === "boolean" ? DEFAULT_COLOR_SCHEME : options.colors;
  }

  async print(routes: Route[]): Promise<string> {
    const lines: string[] = [];

    // TODO convert to generic utility?

    const METHOD_COL_HEADER = "METHOD";
    const URL_COL_HEADER = "URL";
    let longestMethod = METHOD_COL_HEADER.length;
    let longestUrl = URL_COL_HEADER.length;
    const PADDING = 2;

    for (const r of routes) {
      longestMethod = Math.max(r.method.length, longestMethod);
      longestUrl = Math.max(r.url.length, longestUrl);
    }

    const methodColLength = longestMethod + PADDING;
    const urlColLength = longestUrl + PADDING;

    const topLine = `╔${"═".repeat(methodColLength)}╤${"═".repeat(urlColLength)}╗`;
    const layoutLine = `║${"═".repeat(methodColLength)}|${"═".repeat(urlColLength)}║`;
    const bottomLine = `╚${"═".repeat(methodColLength)}╧${"═".repeat(urlColLength)}╝`;

    lines.push(topLine);
    lines.push(`║ ${METHOD_COL_HEADER.padEnd(methodColLength - 1)}| ${URL_COL_HEADER.padEnd(urlColLength - 1)}║`);
    lines.push(layoutLine);
    for (const route of routes) {
      lines.push(`║ ${this.printMethod(route.method, methodColLength)}| ${route.url.padEnd(urlColLength - 1)}║`);
    }
    lines.push(bottomLine);

    return lines.join("\n");
  }

  private printMethod(routeMethod: string, methodColLength: number): string {
    const method = routeMethod.padEnd(methodColLength - 1);
    if (!this.colorScheme) return method;
    return `${COLOR_VALUES_MAP[this.colorScheme[routeMethod]]}${method}${COLOR_VALUES_MAP.NO_COLOR}`;
  }
}

export default TablePrinter;
