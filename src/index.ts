import { FastifyPluginAsync, RouteOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";

import FastifyRoutePrinter from "./FastifyRoutePrinter.js";
import TablePrinter from "./printers/TablePrinter.js";
import { Config, FastifyRoutePrinterPluginOptions, Printer, Route } from "./types.js";

// eslint-disable-next-line func-style
const fastifyRoutePrinter: FastifyPluginAsync<FastifyRoutePrinterPluginOptions> = async function (instance, options) {
  if (options.disabled) return;

  const routeOptions: RouteOptions[] = [];

  instance.addHook("onRoute", (route) => {
    routeOptions.push(route);
  });

  instance.addHook("onReady", async () => {
    const tablePrinter = new TablePrinter();
    const frp = new FastifyRoutePrinter(routeOptions, tablePrinter, options);
    await frp.print();
  });
};

export default fastifyPlugin(fastifyRoutePrinter, { name: "fastify-route-printer", fastify: "5.x" });

export { Config, FastifyRoutePrinterPluginOptions, Printer, Route };
