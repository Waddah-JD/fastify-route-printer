import { HTTPMethods, RouteOptions } from "fastify";

import TablePrinter from "./printers/TablePrinter.js";
import { Config, FastifyRoutePrinterPluginOptions, Route } from "./types.js";

class FastifyRoutePrinter {
  private static DEFAULT_CONFIG: Config = {
    disabled: false,
    includeHEAD: false,
    sortRoutes: (a, b) => (a.url >= b.url ? 1 : -1),
    filterRoutes: null,
    printer: new TablePrinter(),
    host: null,
  };
  private readonly config: Config;

  constructor(
    private readonly routeOptions: RouteOptions[],
    pluginOptions: FastifyRoutePrinterPluginOptions,
  ) {
    this.config = FastifyRoutePrinter.getConfig(pluginOptions);
  }

  private static getConfig(pluginOptions: FastifyRoutePrinterPluginOptions): Config {
    return {
      disabled: pluginOptions.disabled || FastifyRoutePrinter.DEFAULT_CONFIG.disabled,
      includeHEAD: pluginOptions.includeHEAD || FastifyRoutePrinter.DEFAULT_CONFIG.includeHEAD,
      sortRoutes: pluginOptions.sortRoutes || FastifyRoutePrinter.DEFAULT_CONFIG.sortRoutes,
      filterRoutes: pluginOptions.filterRoutes || FastifyRoutePrinter.DEFAULT_CONFIG.filterRoutes,
      printer: pluginOptions.printer || FastifyRoutePrinter.DEFAULT_CONFIG.printer,
      host: pluginOptions.host || FastifyRoutePrinter.DEFAULT_CONFIG.host,
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

    // TODO add options: stdout or fs, for now to stdout by default
    console.log(output);
  }
}

export default FastifyRoutePrinter;
