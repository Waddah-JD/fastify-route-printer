# fastify-route-printer

## Features

- Fastify route logger
- Extensible, write your own custom `Printer` instead of using one of the printers exported by this module

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

| Property    | Type                           | Required | Default                             | Description                                                                  |
| ----------- | ------------------------------ | -------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| disabled    | boolean                        | false    | false                               | opt-in disable the plugin on certain conditions, for example `NODE_ENV=prod` |
| includeHEAD | boolean                        | false    | false                               |                                                                              |
| sortRoutes  | (a: Route, b: Route) => number | false    | (a, b) => (a.url >= b.url ? 1 : -1) | by default, sorts routes alphabetically                                      |
