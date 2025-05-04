import { FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";

import FastifyRoutePrinter from "./FastifyRoutePrinter.js";
import JSONPrinter from "./printers/JSONPrinter.js";
import TablePrinter from "./printers/TablePrinter.js";
import {
  Color,
  ColorScheme,
  ColorValue,
  CustomRouteOption,
  FastifyRoutePrinterPluginOptions,
  Printer,
  Route,
  RoutePrinterConfig,
} from "./types.js";
import ConsoleWriter from "./writers/ConsoleWriter.js";
import FileWriter from "./writers/FileWriter.js";

declare module "fastify" {
  interface FastifyContextConfig {
    routePrinter?: RoutePrinterConfig;
  }
}

// eslint-disable-next-line func-style
const fastifyRoutePrinter: FastifyPluginAsync<FastifyRoutePrinterPluginOptions> = async function (instance, options) {
  if (options.disabled) return;

  const routeOptions: CustomRouteOption[] = [];

  instance.addHook("onRoute", (route) => {
    const description = route.config?.routePrinter?.description;
    routeOptions.push({ ...route, description });
  });

  instance.addHook("onReady", async () => {
    const frp = new FastifyRoutePrinter(routeOptions, options);
    await frp.print();
  });
};

export default fastifyPlugin(fastifyRoutePrinter, { name: "fastify-route-printer", fastify: "5.x" });

export {
  Color,
  ColorScheme,
  ColorValue,
  ConsoleWriter,
  FastifyRoutePrinterPluginOptions,
  FileWriter,
  JSONPrinter,
  Printer,
  Route,
  TablePrinter,
};
