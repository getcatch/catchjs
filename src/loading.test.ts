import {
  getScriptUrl,
  loadCatchjs,
  getNamespace,
  resetForTests,
} from "./loading";

const injectScript = (scriptUrl: string): Promise<void> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = scriptUrl;

    script.addEventListener("load", () => {
      resolve();
    });

    document.head.appendChild(script);
  });
};

const preloadSandbox = (): Promise<void> =>
  injectScript(getScriptUrl("production", false));
const preloadLive = (): Promise<void> =>
  injectScript(getScriptUrl("production", true));

interface ShimmedWindowForTests extends Window {
  require: () => unknown;
}

describe("loadCatchjs()", () => {
  beforeAll(() => {
    // Loading Catch.js has the side effect of calling window.customElements.define()
    // to register custom elements. Since we're loading multiple times in these tests,
    // we don't want to actually register elements (because registering an element that
    // has already been defined will throw an error).
    window.customElements.define = jest.fn();

    // Temp workaround: jsdom chockes when executing Catch.js, because Catch.js makes
    // a call to global require() which is not defined. This likely represents a deeper
    // problem with how the Catch.js bundle is generated, but for now we're working around
    // this by mocking the global require() function. These tests are intended to assert
    // the loading of Catch.js, and therefore don't care about internal require()
    // functionality.
    (window as unknown as ShimmedWindowForTests).require = jest.fn(() => {
      return {};
    });
  });

  afterEach(() => {
    document.head.innerHTML = "";
    resetForTests();
  });

  test("should load the SDK in sandbox mode by default", async () => {
    const catchjs = await loadCatchjs();
    expect(catchjs.info.mode).toEqual("sandbox");
  });

  test("should load the SDK in sandbox mode when live=false", async () => {
    const catchjs = await loadCatchjs({ live: false });
    expect(catchjs.info.mode).toEqual("sandbox");
  });

  test("should load the SDK in live mode when live=true", async () => {
    const catchjs = await loadCatchjs({ live: true });
    expect(catchjs.info.mode).toEqual("live");
  });

  test("should return the original result on repeated calls", () => {
    expect(loadCatchjs()).toBe(loadCatchjs());
  });

  test("should resolve with the preloaded namespace", async () => {
    await preloadSandbox();
    const catchjs = getNamespace();
    expect(await loadCatchjs()).toBe(catchjs);
  });

  test("should reject if the preloaded namespace is a different mode", async () => {
    await preloadLive();
    try {
      await loadCatchjs();
      throw new Error(
        "loadCatchjs() should have failed because of a mode mismatch."
      );
    } catch (error) {
      expect((error as Error).message).toEqual(
        "Catch.js has already been loaded in different mode: live."
      );
    }
  });
});
