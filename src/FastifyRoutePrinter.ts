import { HTTPMethods, RouteOptions } from "fastify";

import { Config, PluginOptions, Printer, Route } from "./types.js";

class FastifyRoutePrinter {
  private readonly config: Config;

  constructor(
    private readonly routeOptions: RouteOptions[],
    private readonly printer: Printer,
    pluginOptions: PluginOptions,
  ) {
    this.config = FastifyRoutePrinter.getConfig(pluginOptions);
  }

  private static getConfig(pluginOptions: PluginOptions): Config {
    return {
      includeHEAD: pluginOptions.includeHEAD || false,
    };
  }

  // TODO add pluggable filter and pluggable sort
  private getRoutesFromRouteOptions(): Route[] {
    const routes: Route[] = [];

    this.routeOptions.forEach((it) => {
      const methods: HTTPMethods[] = Array.isArray(it.method) ? it.method : [it.method];
      for (const method of methods) {
        routes.push({ method, url: it.url });
      }
    });

    return routes.filter((it) => {
      if (this.config.includeHEAD) return true;
      return it.method !== "head" && it.method !== "HEAD";
    });
  }

  async print(): Promise<void> {
    const routes = this.getRoutesFromRouteOptions();
    const content = await this.printer.print(routes);

    // TODO implement other out options: OS file .. etc
    console.log(content);
  }
}

export default FastifyRoutePrinter;
