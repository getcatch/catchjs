/*
 * Example app (used for development only).
 */

import { loadCatchjs } from ".";

const insertHtml = (selector: string, html: string): void => {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = html;
  }
};

const loadStartTime = performance.now();
const catchjs = await loadCatchjs();
const loadEndTime = performance.now();
const info = catchjs.info;

insertHtml(
  ".load-info",
  `
    <p>Loaded Catch.js ${info.packageVersion} in ${info.mode} mode.</p>
    <p>Load time: ${Math.round(loadEndTime - loadStartTime)}ms.</p>
  `
);

const initStartTime = performance.now();
// Initialize with test public key for Merch by Catch.
await catchjs.init("Ei6eCMabeqZT3AuiFcX3XuUC", {
  pageType: "demo",
  theme: "dark-mono",
});
const initEndTime = performance.now();

insertHtml(
  ".init-info",
  `
    <p>Initialized Catch.js.</p>
    <p>Initialization time: ${Math.round(initEndTime - initStartTime)}ms.</p>
  `
);
