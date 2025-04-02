import { HTTPMethods } from "fastify";

export type FastifyRoutePrinterPluginOptions = {
  includeHEAD?: boolean;
  sortRoutes?: (a: Route, b: Route) => number;
};

export type Config = Required<FastifyRoutePrinterPluginOptions>;

export type Route = {
  url: string;
  method: HTTPMethods;
};

export interface Printer {
  print(routes: Route[]): Promise<string>;
}
