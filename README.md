# fastify-route-printer

Customizable and Extensible Fastify Route Printer

## Features

- No configuration needed out-of-the-box
- Customizable
- Extensible, you can write your own custom `Printer` and/or `Writer` instead of relying on the options provided by this module (`TablePrinter`, `ConsoleWriter`, `FileWriter` ..etc), the interfaces you need to implement are exported for convenience

## Examples

### With Default Options

```ts
import routePrinter, { FastifyRoutePrinterPluginOptions } from "fastify-route-printer";

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

## Documentation

### FastifyRoutePrinterPluginOptions

| Property     | Type                           | Required | Default                             | Description                                                                    |
| ------------ | ------------------------------ | -------- | ----------------------------------- | ------------------------------------------------------------------------------ |
| disabled     | boolean                        | false    | false                               | opt-in disable the plugin on certain conditions, for example `NODE_ENV===prod` |
| includeHEAD  | boolean                        | false    | false                               | whether or not to include `head` and `HEAD` methods in the output              |
| sortRoutes   | (a: Route, b: Route) => number | false    | (a, b) => (a.url >= b.url ? 1 : -1) | by default, sorts routes alphabetically                                        |
| filterRoutes | (r: Route) => boolean          | false    |                                     | can be used to filter out some routes from the final output                    |
| host         | string                         | false    |                                     | add host as a prefix in the output                                             |
| printer      | Printer                        | false    | TablePrinter                        | responsible for defining how to convert `Route[]` into a string                |
| writer       | Writer                         | false    | ConsolePrinter                      | responsible for writing the `Printer`'s string (buffer) to some stream         |

### Definitions

Note: all types and interfaces are exported from this library, so you can just import and get the benefits of auto-complete and type intellisense

```ts
interface Printer {
  print(routes: Route[]): Promise<string>;
}

interface Writer {
  write(buffer: Uint8Array): Promise<void>;
}
```
