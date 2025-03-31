import { Printer, Route } from "../types.js";

class TablePrinter implements Printer {
  async print(routes: Route[]): Promise<string> {
    const lines: string[] = [];

    // TODO convert to generic utility?
    // TODO add some unit tests

    const METHOD_COL_HEADER = "METHOD";
    const URL_COL_HEADER = "URL";
    let longestMethod = METHOD_COL_HEADER.length;
    let longestUrl = URL_COL_HEADER.length;
    const PADDING = 2;

    for (const r of routes) {
      longestMethod = Math.max(r.methods.join(", ").length, longestMethod);
      longestUrl = Math.max(r.url.length, longestUrl);
    }

    const methodColLength = longestMethod + PADDING;
    const urlColLength = longestUrl + PADDING;

    const layoutLine = `|${"-".repeat(methodColLength)}|${"-".repeat(urlColLength)}|`;

    lines.push(layoutLine);
    lines.push(`| ${METHOD_COL_HEADER.padEnd(methodColLength - 1)}| ${URL_COL_HEADER.padEnd(urlColLength - 1)}|`);
    lines.push(layoutLine);
    for (const route of routes) {
      lines.push(`| ${route.methods.join(", ").padEnd(methodColLength - 1)}| ${route.url.padEnd(urlColLength - 1)}|`);
    }
    lines.push(layoutLine);

    return lines.join("\n");
  }
}

export default TablePrinter;
