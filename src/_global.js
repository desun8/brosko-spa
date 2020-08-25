// import { throttle } from "lodash";
/* eslint-disable */
window._$ = document.querySelector.bind(document);
window._$$ = document.querySelectorAll.bind(document);

window._domReady = callback =>
    document.addEventListener("DOMContentLoaded", callback);

// const isIpad =
//   window.matchMedia("(width: 85.375em)").matches &&
//   window.matchMedia("(height: 64em)").matches &&
//   navigator.userAgent.match(/iPad/i) != null;

window._isScreenLg = window.matchMedia(
    "(min-width: 68.75em)",
).matches;
window._isScreenFhd = window.matchMedia(
    "(min-width: 116.25em)",
).matches;
window._isScreen1440 = window.matchMedia(
    "(min-width: 90em)",
).matches;
window._isScreen375 = window.matchMedia(
    "(min-width: 23.438em)",
).matches;
window._isScreen414 = window.matchMedia(
    "(min-width: 25em)",
).matches;


// window._isDesktop =
//     window.matchMedia("(min-width: 68.75em)").matches &&
//     window.matchMedia("(width: 85.375em)").matches &&
//     window.matchMedia("(height: 64em)").matches &&
//     navigator.userAgent.match(/iPad/i) != null;

// window.addEventListener(
//     "resize",
//     throttle(() => {
//         window._isScreenLg = window.matchMedia(
//             "(min-width: 68.75em)",
//         ).matches;
//         console.warn(`_isScreenLg: ${window._isScreenLg}`);
//     }, 500),
// );

// OverlayScrollbars
// window._overlayScrollbarsToTop = null;
// window._overlayScrollbarsHide = null;
// window._overlayScrollbarsShow = null;
