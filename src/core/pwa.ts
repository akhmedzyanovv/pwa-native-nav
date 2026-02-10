export const isStandalone = (): boolean => {
  const isStandaloneQuery = window.matchMedia(
    "(display-mode: standalone)",
  ).matches;

  const isIOSStandalone = (window.navigator as any).standalone === true;

  return isStandaloneQuery || isIOSStandalone;
};
