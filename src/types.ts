import { HTTPMethods } from "fastify";

import { COLOR_VALUES, COLORS } from "./constants.js";

export type FastifyRoutePrinterPluginOptions = {
  disabled?: boolean;
  includeHEAD?: boolean;
  sortRoutes?: (a: Route, b: Route) => number;
  filterRoutes?: (r: Route) => boolean;
  host?: string | null;
  printer?: Printer;
  writer?: Writer;
  colors?: ColorScheme | boolean;
};

export type Config = Required<Omit<FastifyRoutePrinterPluginOptions, "filterRoutes" | "colors">> & {
  filterRoutes: ((r: Route) => boolean) | null;
};

export type Route = {
  url: string;
  method: HTTPMethods;
};

export interface Printer {
  print(routes: Route[]): Promise<string>;
}

export interface Writer {
  write(buffer: Uint8Array): Promise<void>;
}

export type Color = (typeof COLORS)[number];
export type ColorValue = (typeof COLOR_VALUES)[number];
export type ColorScheme = Record<HTTPMethods, Color>;
