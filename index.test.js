const postcss = require("postcss");

const dvhPolyfill = require("./");

describe("postcss-dvh", () => {
  it("converts dvh to vh", async () => {
    const inputCSS = "a { height: 100dvh; }";
    const outputCSS =
      "a { height: 100vh; height: calc(var(--vh, 1vh) * 100); height: 100dvh; }";

    const result = await postcss([dvhPolyfill]).process(inputCSS, {
      from: undefined,
    });
    expect(result.css).toEqual(outputCSS);
  });

  it("converts dvh to vh in media queries", async () => {
    const inputCSS =
      "@media (min-height: 500px) { .container { height: 50dvh; } }";
    const outputCSS =
      "@media (min-height: 500px) { .container { height: 50vh; height: calc(var(--vh, 1vh) * 50); height: 50dvh; } }";

    const result = await postcss([dvhPolyfill]).process(inputCSS, {
      from: undefined,
    });
    expect(result.css).toEqual(outputCSS);
  });

  it("converts dvh to vh in calc()", async () => {
    const inputCSS = ".header { height: calc(100dvh - 50px); }";
    const outputCSS = ".header { height: calc(calc(var(--vh, 1vh) * 100) - 50px); }";

    const result = await postcss([dvhPolyfill]).process(inputCSS, {
      from: undefined,
    });
    expect(result.css).toEqual(outputCSS);
  });

  it("converts dvh to vh in max()", async () => {
    const inputCSS = ".content { height: max(500px, 50dvh); }";
    const outputCSS = ".content { height: max(500px, calc(var(--vh, 1vh) * 50)); }";

    const result = await postcss([dvhPolyfill]).process(inputCSS, {
      from: undefined,
    });
    expect(result.css).toEqual(outputCSS);
  });

  it("converts dvh to vh in min()", async () => {
    const inputCSS = ".footer { height: min(100px, 10dvh); }";
    const outputCSS = ".footer { height: min(100px, calc(var(--vh, 1vh) * 10)); }";

    const result = await postcss([dvhPolyfill]).process(inputCSS, {
      from: undefined,
    });
    expect(result.css).toEqual(outputCSS);
  });
});
