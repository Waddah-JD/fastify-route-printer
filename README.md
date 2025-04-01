# fastify-route-printer

## Features

• Fastify route logger
• Extensible, write your own custom `Printer` instead of using one of the printers exported by this module

## Examples

```ts
import routePrinter, { FastifyRoutePrinterPluginOptions } from "fastify-route-printer";

const app = Fastify();

const opts: FastifyRoutePrinterPluginOptions = { includeHEAD: true };
await app.register(routePrinter, opts);
```

## Documentation

### FastifyRoutePrinterPluginOptions

| Property    | Type    | Required | Default |
| ----------- | ------- | -------- | ------- |
| includeHEAD | boolean | false    | false   |
