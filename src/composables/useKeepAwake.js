import { onMounted, onUnmounted, ref } from "vue";

// Optional real media file. Drop an mp4 here (public/keepalive.mp4) for the most
// reliable behaviour on webOS; when it is missing we fall back to a canvas stream.
const KEEPALIVE_VIDEO_SRC = "/keepalive.mp4";

/**
 * Keeps a always-on display awake.
 *
 * Two layers, applied together:
 *  1. Screen Wake Lock API   - the standard approach (Chromium based browsers).
 *  2. Hidden looping <video> - webOS/Tizen TV browsers force their clock
 *     screensaver on pages with no active media playback, so an autoplaying
 *     muted video keeps the page classified as "playing media".
 */
export function useKeepAwake() {
  const strategy = ref("none");

  let wakeLock = null;
  let video = null;
  let stream = null;
  let canvasTimer = null;
  let retryTimer = null;

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

  // A canvas capture stream is real media playback, so it satisfies the same
  // "page is playing media" check without needing any bundled asset.
  function attachCanvasStream() {
    const canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 2;
    const ctx = canvas.getContext("2d");

    let flip = false;
    const paint = () => {
      flip = !flip;
      ctx.fillStyle = flip ? "#000000" : "#010101";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    paint();
    canvasTimer = setInterval(paint, 1000);

    stream = canvas.captureStream(1);
    video.removeAttribute("src");
    video.srcObject = stream;
    strategy.value = "canvas-stream";
    play();
  }

  function play() {
    const attempt = video?.play();
    if (attempt?.catch) {
      attempt.catch(() => {
        // Autoplay can be blocked until the first user gesture.
        document.addEventListener("click", play, { once: true });
        document.addEventListener("touchstart", play, { once: true });
        document.addEventListener("keydown", play, { once: true });
      });
    }
  }

  function mountVideo() {
    video = document.createElement("video");
    video.loop = true;
    video.autoplay = true;
    video.controls = false;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    // Attributes (not just properties) are required by some TV browsers.
    video.setAttribute("muted", "");
    video.setAttribute("loop", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    // Must stay rendered: display:none or visibility:hidden makes the browser
    // treat the element as inactive, which defeats the whole purpose.
    video.style.cssText =
      "position:fixed;right:0;bottom:0;width:2px;height:2px;opacity:0.01;pointer-events:none;z-index:0;";

    video.addEventListener("error", attachCanvasStream, { once: true });
    video.addEventListener("ended", play);
    video.addEventListener("pause", play);

    video.src = KEEPALIVE_VIDEO_SRC;
    strategy.value = "video-file";
    document.body.appendChild(video);
    play();
  }

  async function onVisibilityChange() {
    if (document.visibilityState !== "visible") return;
    // The wake lock is dropped automatically when the page is hidden.
    if (!wakeLock) await requestWakeLock();
    play();
  }

  onMounted(async () => {
    const locked = await requestWakeLock();
    if (locked) strategy.value = "wake-lock";
    mountVideo();
    // Playback can be silently dropped by the TV browser; nudge it periodically.
    retryTimer = setInterval(() => {
      if (video?.paused) play();
    }, 15000);
    document.addEventListener("visibilitychange", onVisibilityChange);
  });

  onUnmounted(() => {
    document.removeEventListener("visibilitychange", onVisibilityChange);
    if (retryTimer) clearInterval(retryTimer);
    if (canvasTimer) clearInterval(canvasTimer);
    stream?.getTracks?.().forEach((track) => track.stop());
    if (video) {
      video.removeEventListener("pause", play);
      video.removeEventListener("ended", play);
      video.pause();
      video.srcObject = null;
      video.remove();
      video = null;
    }
    releaseWakeLock();
  });

  return { strategy };
}
