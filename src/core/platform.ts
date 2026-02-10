export type Platform = "ios" | "android" | "web";

export const getPlatform = (): Platform => {
  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return "ios";
  }

  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) {
    return "ios";
  }

  if (/android/.test(userAgent)) {
    return "android";
  }

  return "web";
};
