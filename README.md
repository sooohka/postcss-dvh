# postcss-dvh

## polyfills for css dvh property

```css
height: 100vh;
```

to

```css
height: 100vh;
height: calc(var(--vh, 1vh) * 100);
height: 100dvh;
```

---

```css
height: calc(100vh - 500px);
```

to

```css
height: calc(calc(var(--vh, 1vh) * 10) - 500px);
```

## Limitation

need js to fully function, call below code block at the entry of your project

```js
const vh = document.documentElement.clientHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
```

## TODO

- dvw support
