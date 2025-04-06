import { HTTPMethods, RouteOptions } from "fastify";

import { Config, FastifyRoutePrinterPluginOptions, Printer, Route } from "./types.js";

class FastifyRoutePrinter {
  private static DEFAULT_CONFIG: Config = {
    disabled: false,
    includeHEAD: false,
    sortRoutes: (a, b) => (a.url >= b.url ? 1 : -1),
    filterRoutes: null,
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
      disabled: pluginOptions.disabled || FastifyRoutePrinter.DEFAULT_CONFIG.disabled,
      includeHEAD: pluginOptions.includeHEAD || FastifyRoutePrinter.DEFAULT_CONFIG.includeHEAD,
      sortRoutes: pluginOptions.sortRoutes || FastifyRoutePrinter.DEFAULT_CONFIG.sortRoutes,
      filterRoutes: pluginOptions.filterRoutes || FastifyRoutePrinter.DEFAULT_CONFIG.filterRoutes,
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

    const filtered = this.config.filterRoutes ? headFiltered.filter(this.config.filterRoutes) : headFiltered;

    const sorted = filtered.sort(this.config.sortRoutes);

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
