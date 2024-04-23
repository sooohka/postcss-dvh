/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
  const viewportUnitRegex = /(\d)[d]([vh|vw])/g;
  return {
    postcssPlugin: "postcss-dvh",
    OnceExit: (root) => {
      root.walkDecls((decl) => {
        if (
          typeof decl.value === "string" &&
          decl.value.match(viewportUnitRegex)
        ) {
          const value = parseInt(decl.value.replace(/dvh/, "").trim(), 10);
          if (isNaN(value)) {
            throw decl.error(`fail to parse ${decl.value}`);
          }
          console.log(decl.value, value);
          decl.before(` ${decl.prop}: ${value}vh`);
          decl.before(` ${decl.prop}: calc(var(--vh, 1vh) * ${value})`);
        }
      });
    },
  };
};

module.exports.postcss = true;
