# fastify-route-printer

## Features

- Fastify route logger
- Extensible, write your own custom `Printer` instead of using one of the printers exported by this module

## Examples

### Default Options

```ts
import routePrinter, { FastifyRoutePrinterPluginOptions } from "fastify-route-printer";

const app = Fastify();

await app.register(routePrinter);
```

### Custom Options

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

| Property    | Type                           | Required | Default                             | Description |
| ----------- | ------------------------------ | -------- | ----------------------------------- | ----------- |
| includeHEAD | boolean                        | false    | false                               |             |
| sortRoutes  | (a: Route, b: Route) => number | false    | (a, b) => (a.url >= b.url ? 1 : -1) |             |
