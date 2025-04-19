import { RouteOptions } from "fastify";

import FastifyRoutePrinter from "./FastifyRoutePrinter.js";
import { FastifyRoutePrinterPluginOptions } from "./types.js";

describe(FastifyRoutePrinter.name, function () {
  describe(FastifyRoutePrinter.prototype.getRoutesFromRouteOptions.name, function () {
    it("should not include HEAD methods if user didn't explicity opt-in showing them", function () {
      const userOptions: FastifyRoutePrinterPluginOptions = {};
      const routeOptions: RouteOptions[] = [
        { method: "GET", url: "/url-1" },
        { method: "HEAD", url: "/url-2" },
        { method: "head", url: "/url-3" },
      ] as RouteOptions[];
      const instance = new FastifyRoutePrinter(routeOptions, userOptions);
      const expected = [{ method: "GET", url: "/url-1" }];
      const actual = instance.getRoutesFromRouteOptions();
      expect(actual).toStrictEqual(expected);
    });

    it("should include HEAD methods if user explicity set the flag `includeHEAD: true`", function () {
      const userOptions: FastifyRoutePrinterPluginOptions = { includeHEAD: true };
      const routeOptions: RouteOptions[] = [
        { method: "GET", url: "/url-1" },
        { method: "HEAD", url: "/url-2" },
        { method: "head", url: "/url-3" },
      ] as RouteOptions[];
      const instance = new FastifyRoutePrinter(routeOptions, userOptions);
      const expected = [
        { method: "GET", url: "/url-1" },
        { method: "HEAD", url: "/url-2" },
        { method: "head", url: "/url-3" },
      ];
      const actual = instance.getRoutesFromRouteOptions();
      expect(actual).toStrictEqual(expected);
    });

    it("should split arrays of methods passed from the framework", function () {
      const userOptions: FastifyRoutePrinterPluginOptions = {};
      const routeOptions: RouteOptions[] = [
        { method: ["GET", "POST"], url: "/url-1" },
        { method: ["POST", "PATCH"], url: "/url-2" },
        { method: "GET", url: "/url-3" },
      ] as RouteOptions[];
      const instance = new FastifyRoutePrinter(routeOptions, userOptions);
      const expected = [
        { method: "GET", url: "/url-1" },
        { method: "POST", url: "/url-1" },
        { method: "POST", url: "/url-2" },
        { method: "PATCH", url: "/url-2" },
        { method: "GET", url: "/url-3" },
      ];
      const actual = instance.getRoutesFromRouteOptions();
      expect(actual).toStrictEqual(expected);
    });

    it("should split arrays of methods passed from the framework, and not include HEAD methods unless user explicitly sets option `includeHEAD: true`", function () {
      const userOptions: FastifyRoutePrinterPluginOptions = {};
      const routeOptions: RouteOptions[] = [
        { method: ["GET", "head"], url: "/url-1" },
        { method: ["POST", "HEAD"], url: "/url-2" },
        { method: "GET", url: "/url-3" },
      ] as RouteOptions[];
      const instance = new FastifyRoutePrinter(routeOptions, userOptions);
      const expected = [
        { method: "GET", url: "/url-1" },
        { method: "POST", url: "/url-2" },
        { method: "GET", url: "/url-3" },
      ];
      const actual = instance.getRoutesFromRouteOptions();
      expect(actual).toStrictEqual(expected);
    });

    it("should split arrays of methods passed from the framework, and include HEAD methods if user explicitly sets option `includeHEAD: true`", function () {
      const userOptions: FastifyRoutePrinterPluginOptions = { includeHEAD: true };
      const routeOptions: RouteOptions[] = [
        { method: ["GET", "head"], url: "/url-1" },
        { method: ["POST", "HEAD"], url: "/url-2" },
        { method: "GET", url: "/url-3" },
      ] as RouteOptions[];
      const instance = new FastifyRoutePrinter(routeOptions, userOptions);
      const expected = [
        { method: "GET", url: "/url-1" },
        { method: "head", url: "/url-1" },
        { method: "POST", url: "/url-2" },
        { method: "HEAD", url: "/url-2" },
        { method: "GET", url: "/url-3" },
      ];
      const actual = instance.getRoutesFromRouteOptions();
      expect(actual).toStrictEqual(expected);
    });

    it("should apply user's custom filter logic if a filter option is passed", function () {
      const userOptions: FastifyRoutePrinterPluginOptions = {
        filterRoutes: (it) => it.method === "PATCH" || it.url.endsWith("3"),
      };
      const routeOptions: RouteOptions[] = [
        { method: "GET", url: "/url-1" },
        { method: "POST", url: "/url-1" },
        { method: "PATCH", url: "/url-2" },
        { method: "PUT", url: "/url-2" },
        { method: "HEAD", url: "/url-2" },
        { method: "DELETE", url: "/url-3" },
      ] as RouteOptions[];
      const instance = new FastifyRoutePrinter(routeOptions, userOptions);
      const expected = [
        { method: "PATCH", url: "/url-2" },
        { method: "DELETE", url: "/url-3" },
      ];
      const actual = instance.getRoutesFromRouteOptions();
      expect(actual).toStrictEqual(expected);
    });

    it("should apply user's custom sort logic if a sort option is passed", function () {
      const userOptions: FastifyRoutePrinterPluginOptions = {
        sortRoutes: function (a, b) {
          if (a.method === b.method) {
            return a.url > b.url ? 1 : -1;
          }
          return a.method > b.method ? 1 : -1;
        },
      };
      const routeOptions: RouteOptions[] = [
        { method: "GET", url: "/url-1" },
        { method: "HEAD", url: "/url-1" },
        { method: "POST", url: "/url-2" },
        { method: "GET", url: "/url-2" },
        { method: "POST", url: "/url-1" },
        { method: "POST", url: "/url-3" },
        { method: "HEAD", url: "/url-3" },
      ] as RouteOptions[];
      const instance = new FastifyRoutePrinter(routeOptions, userOptions);
      const expected = [
        { method: "GET", url: "/url-1" },
        { method: "GET", url: "/url-2" },
        { method: "POST", url: "/url-1" },
        { method: "POST", url: "/url-2" },
        { method: "POST", url: "/url-3" },
      ];
      const actual = instance.getRoutesFromRouteOptions();
      expect(actual).toStrictEqual(expected);
    });
  });
});
