import TablePrinter from "./TablePrinter.js";

describe(TablePrinter.name, function () {
  const instance = new TablePrinter();

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
