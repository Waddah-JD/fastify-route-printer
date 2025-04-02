import { HTTPMethods } from "fastify";

export type PluginOptions = {
  includeHEAD?: boolean;
};

export type Config = Required<PluginOptions>;

export type Route = {
  url: string;
  method: HTTPMethods;
};

export interface Printer {
  print(routes: Route[]): Promise<string>;
}
