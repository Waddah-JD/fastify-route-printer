import { HTTPMethods } from "fastify";

export type FastifyRoutePrinterPluginOptions = {
  disabled?: boolean;
  includeHEAD?: boolean;
  sortRoutes?: (a: Route, b: Route) => number;
  filterRoutes?: (r: Route) => boolean;
};

export type Config = Required<Omit<FastifyRoutePrinterPluginOptions, "filterRoutes">> & {
  filterRoutes: ((r: Route) => boolean) | null;
};

export type Route = {
  url: string;
  method: HTTPMethods;
};

export interface Printer {
  print(routes: Route[]): Promise<string>;
}
