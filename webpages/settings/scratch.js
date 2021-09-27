import handleSettings from "../../background/handle-settings-page.js";
import handleL10n from "../../background/handle-l10n.js";

const iframe = document.querySelector("iframe");

// not used here
scratchAddons.localState.ready.i18n = scratchAddons.localState.ready.auth = true;
window.dispatchEvent(new CustomEvent(".i18n load"));

window.addEventListener("message", async (e) => {
  if (typeof e.data.reqId === "string" || !(e.source === iframe.contentWindow || e.source === window || e.data.message))
    return;

  function sendResponse(res = {}) {
    return e.source.postMessage({ res, reqId: e.data.id + "r" }, e.origin);
  }

  const data = e.data.message;

  if (handleSettings(data, sendResponse) || handleL10n(data, sendResponse)) return;

  if (data.getFromStorage) {
    return sendResponse(window.top.localStorage["SCRATCHADDONS__" + data.getFromStorage]);
  }

  if (data.setInStorage) {
    return sendResponse(
      (window.top.localStorage["SCRATCHADDONS__" + data.setInStorage[0]] = JSON.stringify(data.setInStorage[1]))
    );
  }

  if (data.title) {
    return sendResponse((document.title = window.top.document.title = data.title));
  }

  if (data === "waitForState") {
    if (scratchAddons.localState.allReady) {
      sendResponse();
    } else {
      scratchAddons.localEvents.addEventListener("ready", () => {
        sendResponse();
      });
    }
  }
  if (data === "waitForState") {
    if (scratchAddons.localState.listeners) {
      sendResponse();
    } else {
      scratchAddons.localEvents.addEventListener("listeners ready", () => {
        sendResponse();
      });
    }
  }

  return sendResponse();
});

scratchAddons.localState.ready.listeners = true;
scratchAddons.localEvents.dispatchEvent(new CustomEvent("listeners ready"));
