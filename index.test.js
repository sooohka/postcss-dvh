const postcss = require("postcss");

const plugin = require("./");

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

describe("postcss-dvh", () => {
  it("dvh", () => {
    run(
      "a { height: 100dvh; }",
      "a { height: 100vh; height: calc(var(--vh, 1vh) * 100); height: 100dvh; }"
    );
  });
});
