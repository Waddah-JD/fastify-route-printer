import TablePrinter from "./TablePrinter.js";

describe(TablePrinter.name, function () {
  describe("{colors: false}", function () {
    const instance = new TablePrinter({ colors: false });

    describe(TablePrinter.prototype.print.name, function () {
      it("should print table even if routes are empty", async function () {
        const table = await instance.print([]);
        const expected = `╔════════╤═════╗\n║ METHOD | URL ║\n║════════|═════║\n╚════════╧═════╝`;
        expect(table).toBe(expected);
      });

      it("should print proper table when there is only one route", async function () {
        const table = await instance.print([{ method: "GET", url: "/employees" }]);
        const expected = `╔════════╤════════════╗\n║ METHOD | URL        ║\n║════════|════════════║\n║ GET    | /employees ║\n╚════════╧════════════╝`;
        expect(table).toBe(expected);
      });

      it("should print proper table when there are multiple routes", async function () {
        const table = await instance.print([
          { method: "GET", url: "/employees" },
          { method: "GET", url: "/employees/:id" },
          { method: "PATCH", url: "/employees/:id" },
        ]);
        const expected = `╔════════╤════════════════╗\n║ METHOD | URL            ║\n║════════|════════════════║\n║ GET    | /employees     ║\n║ GET    | /employees/:id ║\n║ PATCH  | /employees/:id ║\n╚════════╧════════════════╝`;
        expect(table).toBe(expected);
      });
    });
  });

  describe("{colors: true}", function () {
    const instance = new TablePrinter({ colors: true });

    describe(`${TablePrinter.prototype.print.name}, {colors: true}`, function () {
      it("should print table even if routes are empty", async function () {
        const table = await instance.print([]);
        const expected = `╔════════╤═════╗\n║ METHOD | URL ║\n║════════|═════║\n╚════════╧═════╝`;
        expect(table).toBe(expected);
      });

      it("should print proper table when there is only one route, using default color scheme if colors option is toggled on", async function () {
        const table = await instance.print([{ method: "GET", url: "/employees" }]);
        const expected = `╔════════╤════════════╗\n║ METHOD | URL        ║\n║════════|════════════║\n║ \u001b[1;32mGET    \u001b[0m| /employees ║\n╚════════╧════════════╝`;
        expect(table).toBe(expected);
      });

      it("should print proper table when there are multiple routes, using default color scheme if colors option is toggled on", async function () {
        const table = await instance.print([
          { method: "GET", url: "/employees" },
          { method: "GET", url: "/employees/:id" },
          { method: "PATCH", url: "/employees/:id" },
        ]);
        const expected = `╔════════╤════════════════╗\n║ METHOD | URL            ║\n║════════|════════════════║\n║ \u001b[1;32mGET    \u001b[0m| /employees     ║\n║ \u001b[1;32mGET    \u001b[0m| /employees/:id ║\n║ \u001b[1;34mPATCH  \u001b[0m| /employees/:id ║\n╚════════╧════════════════╝`;
        expect(table).toBe(expected);
      });
    });
  });

  // TODO add a test case with custom color scheme
});
