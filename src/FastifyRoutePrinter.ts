import { HTTPMethods, RouteOptions } from "fastify";

import TablePrinter from "./printers/TablePrinter.js";
import { Config, FastifyRoutePrinterPluginOptions, Route } from "./types.js";
import ConsoleWriter from "./writers/ConsoleWriter.js";

class FastifyRoutePrinter {
  private readonly config: Config;

  constructor(
    private readonly routeOptions: RouteOptions[],
    pluginOptions: FastifyRoutePrinterPluginOptions,
  ) {
    this.config = FastifyRoutePrinter.getConfig(pluginOptions);
  }

  private static getConfig(pluginOptions: FastifyRoutePrinterPluginOptions): Config {
    const DEFAULT_CONFIG: Config = {
      disabled: false,
      includeHEAD: false,
      sortRoutes: (a, b) => (a.url >= b.url ? 1 : -1),
      filterRoutes: null,
      host: null,
      printer: new TablePrinter({ colors: pluginOptions.colors || false }),
      writer: new ConsoleWriter(),
    };

    return {
      disabled: pluginOptions.disabled || DEFAULT_CONFIG.disabled,
      includeHEAD: pluginOptions.includeHEAD || DEFAULT_CONFIG.includeHEAD,
      sortRoutes: pluginOptions.sortRoutes || DEFAULT_CONFIG.sortRoutes,
      filterRoutes: pluginOptions.filterRoutes || DEFAULT_CONFIG.filterRoutes,
      host: pluginOptions.host || DEFAULT_CONFIG.host,
      printer: pluginOptions.printer || DEFAULT_CONFIG.printer,
      writer: pluginOptions.writer || DEFAULT_CONFIG.writer,
    };
  }

  // exposed only for testing-purpose
  public getRoutesFromRouteOptions(): Route[] {
    const routes: Route[] = [];

    this.routeOptions.forEach((it) => {
      const methods: HTTPMethods[] = Array.isArray(it.method) ? it.method : [it.method];
      for (const method of methods) {
        const prefix = this.config.host || "";
        const sanitizedPrefix = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
        routes.push({ method, url: `${sanitizedPrefix}${it.url}` });
      }
    });

    const headFiltered = this.config.includeHEAD
      ? routes
      : routes.filter((it) => it.method !== "head" && it.method !== "HEAD");

    const filtered = this.config.filterRoutes ? headFiltered.filter(this.config.filterRoutes) : headFiltered;

    const sorted = filtered.sort(this.config.sortRoutes);

    return sorted;
  }

  async print(): Promise<void> {
    const routes = this.getRoutesFromRouteOptions();
    const output = await this.config.printer.print(routes);
    const buffer = Buffer.from(output);
    await this.config.writer.write(buffer);
  }
}

export default FastifyRoutePrinter;
