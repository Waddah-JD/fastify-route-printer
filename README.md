# fastify-route-printer

Light-Weight, Fully Customizable and Extensible Fastify Route Printer

## Features

- No configuration needed
- Fully Customizable
- Multiple out-of-the-box "write" options: stdout, file
- Multiple out-of-the-box "print" options: table, json
- Plug-and-play, if the provided "print" and "write" options are not what you are looking for, write your own custom `Printer` and/or `Writer`, you only need to adhere to the interfaces (check below for details), the rest is fully up to you.
- Light-Weight
- No bloat, only one run-time dependency

## Examples

### With Default Options

```ts
import routePrinter from "fastify-route-printer";

const app = Fastify();

await app.register(routePrinter);
```

### With Custom Options

```ts
import routePrinter, { FastifyRoutePrinterPluginOptions } from "fastify-route-printer";

const app = Fastify();

const opts: FastifyRoutePrinterPluginOptions = {
  // check Documentation below for a full list of available properties
};
await app.register(routePrinter, opts);
```

#### Route definitions

```ts
app
  .get("/with-description", { config: { routePrinter: { description: "..." } } }, async function (request, reply) {})
  .get("/without-description", async function (request, reply) {});

// or
app.route({
  url: "/with-description",
  method: "get",
  config: { routePrinter: { description: "..." } },
  handler: async function (request, reply) {},
});
app.route({
  url: "/without-description",
  method: "get",
  handler: async function (request, reply) {},
});
```

## Documentation

### FastifyRoutePrinterPluginOptions

| Property     | Type                           | Required | Default                             | Description                                                                                                |
| ------------ | ------------------------------ | -------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| disabled     | boolean                        | false    | false                               | opt-in disable the plugin on certain conditions, for example `NODE_ENV===prod`                             |
| includeHEAD  | boolean                        | false    | false                               | whether or not to include `head` and `HEAD` methods in the output                                          |
| sortRoutes   | (a: Route, b: Route) => number | false    | (a, b) => (a.url >= b.url ? 1 : -1) | by default, sorts routes alphabetically                                                                    |
| filterRoutes | (r: Route) => boolean          | false    |                                     | can be used to filter out some routes from the final output                                                |
| host         | string                         | false    |                                     | add host as a prefix in the output                                                                         |
| printer      | Printer                        | false    | TablePrinter                        | responsible for defining how to convert `Route[]` into a string                                            |
| writer       | Writer                         | false    | ConsoleWriter                       | responsible for writing the `Printer`'s string (buffer) to some stream                                     |
| colors       | ColorScheme \| boolean         | false    | false                               | whether to print colorized HTTP methods, use true to use default color scheme, or pass custom color scheme |

### Types & Definitions

The default export is the plugin itself

For convenience, the library also exposes all types and interfaces

```ts
import fastifyRoutePrinterPlugin, {
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
} from "fastify-route-printer";
```

#### Interfaces you need to implement if you want custom print and/or write options

```ts
interface Printer {
  print(routes: Route[]): Promise<string>;
}

interface Writer {
  write(buffer: Uint8Array): Promise<void>;
}
```
