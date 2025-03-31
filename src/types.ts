import { HTTPMethods } from "fastify";

export type PluginOptions = {
  includeHEAD?: boolean;
};

export type Config = Required<PluginOptions>;

export type Route = {
  url: string;
  methods: HTTPMethods[];
};

export interface Printer {
  print(routes: Route[]): Promise<string>;
}
