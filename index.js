function extractDvhValue(cssValue) {
  // 정규 표현식을 사용하여 'dvh' 앞의 숫자를 찾습니다.
  const match = cssValue.match(/(\d+)dvh/);
  // match[1]은 첫 번째 캡쳐 그룹, 즉 숫자 부분을 반환합니다.
  return match ? parseInt(match[1], 10) : NaN;
}

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
          if (/calc\(.+dvh.+|max\(.+dvh.+|min\(.+dvh.+/g.test(decl.value)) {
            const value = extractDvhValue(decl.value);
            decl.value = decl.value.replace(
              /\b\d+dvh\b/g,
              `calc(var(--vh, 1vh) * ${value})`
            );
          } else {
            const value = extractDvhValue(decl.value);
            if (isNaN(value)) {
              throw decl.error(`fail to parse ${decl.value}`);
            }
            decl.before(` ${decl.prop}: ${value}vh`);
            decl.before(` ${decl.prop}: calc(var(--vh, 1vh) * ${value})`);
          }
        }
      });
    },
  };
};

module.exports.postcss = true;
