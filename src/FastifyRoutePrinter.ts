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
    await this.config.printer.print(routes);
  }
}

export default FastifyRoutePrinter;
