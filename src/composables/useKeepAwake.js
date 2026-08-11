import { onMounted, onUnmounted, ref } from "vue";

// Navigated inside the hidden frame. Any small static asset works; it is served
// from the same origin so no extra request weight or CORS handling is involved.
const PING_TARGET = "/favicon.png";

/**
 * Keeps an always-on display awake.
 *
 * Two layers, applied together:
 *  1. Screen Wake Lock API - the standard approach, where supported.
 *  2. Periodic hidden-iframe navigation - webOS TV browsers do not expose their
 *     idle timeout and ignore the wake lock hint, but a real navigation counts as
 *     activity and resets the screensaver countdown. The navigation happens in a
 *     subframe rather than the top document, because reloading the top document
 *     would tear down fullscreen mode.
 */
export function useKeepAwake(options = {}) {
  const { pingIntervalMs = 0 } = options;

  const strategy = ref("none");

  let wakeLock = null;
  let pingFrame = null;
  let pingTimer = null;

  async function requestWakeLock() {
    if (!("wakeLock" in navigator)) return false;
    try {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => {
        wakeLock = null;
      });
      return true;
    } catch {
      // Rejected when the document is hidden or the permission is denied.
      return false;
    }
  }

  function releaseWakeLock() {
    try {
      wakeLock?.release();
    } catch {
      // already released
    }
    wakeLock = null;
  }

  function mountPingFrame() {
    pingFrame = document.createElement("iframe");
    pingFrame.setAttribute("aria-hidden", "true");
    pingFrame.setAttribute("tabindex", "-1");
    // Must stay rendered: display:none frames are treated as inactive by some
    // TV browsers, which would defeat the purpose.
    pingFrame.style.cssText =
      "position:fixed;right:0;bottom:0;width:2px;height:2px;border:0;opacity:0.01;pointer-events:none;z-index:0;";
    document.body.appendChild(pingFrame);
    ping();
  }

  function ping() {
    // The query string defeats the cache so every tick is a genuine navigation.
    if (pingFrame) pingFrame.src = `${PING_TARGET}?keepawake=${Date.now()}`;
  }

  async function onVisibilityChange() {
    // The wake lock is dropped automatically whenever the page is hidden.
    if (document.visibilityState !== "visible") return;
    if (!wakeLock) await requestWakeLock();
  }

  onMounted(async () => {
    const locked = await requestWakeLock();
    if (locked) strategy.value = "wake-lock";
    if (pingIntervalMs > 0) {
      strategy.value = locked ? "wake-lock+frame-ping" : "frame-ping";
      mountPingFrame();
      pingTimer = setInterval(ping, pingIntervalMs);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
  });

  onUnmounted(() => {
    document.removeEventListener("visibilitychange", onVisibilityChange);
    if (pingTimer) clearInterval(pingTimer);
    pingFrame?.remove();
    pingFrame = null;
    releaseWakeLock();
  });

  return { strategy };
}
