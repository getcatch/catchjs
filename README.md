# Catch.js ES Module

This package provides an ES module for loading <a href="https://catch.readme.io/reference/catchjs">Catch.js</a> asynchronously, as an alternative to the basic method of including a script tag directly in your HTML (which blocks page rendering).

## Installation

Install the package using `npm` (or `yarn`, or similar):

```sh
npm install @get-catch/catchjs
```

## Usage

Use the `loadCatchjs(options)` function to load Catch.js asynchronously:

```js
import { loadCatchjs } from "@get-catch/catchjs";

const catchjs = await loadCatchjs();
```

Catch.js may be loaded in either "sandbox" mode (intended for dev/test environments) or "live" mode (for production). By default, `loadCatchjs()` will load the sandbox mode. For live mode, pass an `options` argument to `loadCatchjs()` with the entry `live: true`:

```js
const catchjs = await loadCatchjs({
  live: true, // true for "live" mode, false for "sandbox" mode
});
```

`loadCatchjs()` returns a `Promise` that resolves with the `catchjs` namespace object once Catch.js has loaded, and rejects if Catch.js fails to load. This function should only be invoked in a browser or browser-like environment (i.e. when `window` is defined), and will reject if invoked in a server environment.

Once loaded, Catch.js must still be initialized by calling `catchjs.init()` (please refer to the [initialization docs](https://catch.readme.io/reference/catchjs#initialization)).

## TypeScript Support

This package ships with TypeScript declarations for the loading utility, as well as the Catch.js SDK itself.
