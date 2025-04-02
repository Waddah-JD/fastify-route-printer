import { HTTPMethods, RouteOptions } from "fastify";

import { Config, FastifyRoutePrinterPluginOptions, Printer, Route } from "./types.js";

class FastifyRoutePrinter {
  private static DEFAULT_CONFIG: Config = {
    includeHEAD: false,
    sortRoutes: (a, b) => (a.url >= b.url ? 1 : -1),
  };
  private readonly config: Config;

  constructor(
    private readonly routeOptions: RouteOptions[],
    private readonly printer: Printer,
    pluginOptions: FastifyRoutePrinterPluginOptions,
  ) {
    this.config = FastifyRoutePrinter.getConfig(pluginOptions);
  }

  private static getConfig(pluginOptions: FastifyRoutePrinterPluginOptions): Config {
    return {
      includeHEAD: pluginOptions.includeHEAD || FastifyRoutePrinter.DEFAULT_CONFIG.includeHEAD,
      sortRoutes: pluginOptions.sortRoutes || FastifyRoutePrinter.DEFAULT_CONFIG.sortRoutes,
    };
  }

  private getRoutesFromRouteOptions(): Route[] {
    const routes: Route[] = [];

    this.routeOptions.forEach((it) => {
      const methods: HTTPMethods[] = Array.isArray(it.method) ? it.method : [it.method];
      for (const method of methods) {
        routes.push({ method, url: it.url });
      }
    });

    const headFiltered = this.config.includeHEAD
      ? routes
      : routes.filter((it) => it.method !== "head" && it.method !== "HEAD");

    // TODO add pluggable filter

    const sorted = headFiltered.sort(this.config.sortRoutes);

    return sorted;
  }

  async print(): Promise<void> {
    const routes = this.getRoutesFromRouteOptions();
    const content = await this.printer.print(routes);

    // TODO implement other out options: OS file .. etc
    console.log(content);
  }
}

export default FastifyRoutePrinter;
