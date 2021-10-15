import type { CatchSDK, CatchLoadOptions, CatchWindow } from "../types";

const SANDBOX_SCRIPT_URL =
  "https://js-sandbox.getcatch.com/catchjs/v1/catch.js";
const LIVE_SCRIPT_URL = "https://js.getcatch.com/catchjs/v1/catch.js";

let catchPromise: Promise<CatchSDK> | null = null;

/*
 * Asynchronously load the Catch.js SDK.
 *
 * Returns a Promise which resolves with a reference to the `catchjs` namespace
 * option, or rejects if there is an error loading the SDK.
 *
 * Catch.js may be loaded in one of two modes: "live" or "sandbox". Live mode should
 * be used in production environments, and sandbox should be used in development and
 * testing environments. By default, Catch.js is loaded in sandbox mode. The `live`
 * entry in the `options` parameter is used to load live mode:
 *
 * ```
 * const catchjs = await loadCatchjs({
 *  live: true,
 * });
 * ```
 *
 * Once loaded, the SDK must still be initialized by calling `catchjs.init()`.
 */
const loadCatchjs = (options: CatchLoadOptions = {}): Promise<CatchSDK> => {
  // `loadCatchjs()` should only be called once in the lifecycle of an application.
  // However, in case it's called more than once, always return the result of the
  // original call.
  if (catchPromise) {
    return catchPromise;
  }

  catchPromise = new Promise((resolve, reject) => {
    // Don't allow `loadCatchjs` in server-side code.
    if (typeof window === "undefined") {
      reject(new Error("Catch.js must be loaded in a browser environment."));
      return;
    }

    const { live = false } = options;

    let catchjs = getNamespace();
    if (catchjs) {
      // If Catch.js is already loaded, resolve with the existing namespace object
      // only if it has the same mode as what was requested to `loadCatchjs()`.
      // Reject if the modes mismatch.
      const currentMode = catchjs.info.mode;
      if (
        (live && currentMode !== "live") ||
        (!live && currentMode === "live")
      ) {
        reject(
          new Error(
            `Catch.js has already been loaded in different mode: ${currentMode}.`
          )
        );
        return;
      }
      resolve(catchjs);
      return;
    }

    const scriptUrl = live ? LIVE_SCRIPT_URL : SANDBOX_SCRIPT_URL;
    let inject = false;
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptUrl}"]`
    );
    if (!script) {
      inject = true;
      script = document.createElement("script");
      script.src = scriptUrl;
    }

    script.addEventListener("load", () => {
      catchjs = getNamespace();
      if (catchjs) {
        resolve(catchjs);
      } else {
        reject(new Error("Catch.js not available."));
      }
    });

    script.addEventListener("error", () => {
      reject(new Error("Failed to load Catch.js"));
    });

    if (inject) {
      const node = document.head || document.body;
      if (node) {
        node.appendChild(script);
      } else {
        reject(new Error("Catch.js requires a <body> element."));
      }
    }
  });

  return catchPromise;
};

/*
 * Get the global `catchjs` object if it exists.
 */
const getNamespace = (): CatchSDK | undefined =>
  (window as unknown as CatchWindow).catchjs;

/*
 * Cleanup internal state to allow fresh calls to `loadCatchjs()`.
 * For internal use in tests only.
 */
const resetForTests = (): void => {
  (window as unknown as CatchWindow).catchjs = undefined;
  catchPromise = null;
};

export {
  SANDBOX_SCRIPT_URL,
  LIVE_SCRIPT_URL,
  loadCatchjs,
  getNamespace,
  resetForTests,
};
