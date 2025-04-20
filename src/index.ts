import { FastifyPluginAsync, RouteOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";

import FastifyRoutePrinter from "./FastifyRoutePrinter.js";
import TablePrinter from "./printers/TablePrinter.js";
import { Config, FastifyRoutePrinterPluginOptions, Printer, Route } from "./types.js";
import ConsoleWriter from "./writers/ConsoleWriter.js";
import FileWriter from "./writers/FileWriter.js";

// eslint-disable-next-line func-style
const fastifyRoutePrinter: FastifyPluginAsync<FastifyRoutePrinterPluginOptions> = async function (instance, options) {
  if (options.disabled) return;

  const routeOptions: RouteOptions[] = [];

  instance.addHook("onRoute", (route) => {
    routeOptions.push(route);
  });

  instance.addHook("onReady", async () => {
    const frp = new FastifyRoutePrinter(routeOptions, options);
    await frp.print();
  });
};

export default fastifyPlugin(fastifyRoutePrinter, { name: "fastify-route-printer", fastify: "5.x" });

export { Config, ConsoleWriter, FastifyRoutePrinterPluginOptions, FileWriter, Printer, Route, TablePrinter };
