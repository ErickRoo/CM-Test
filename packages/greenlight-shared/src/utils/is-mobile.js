export default (() => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return typeof window.navigator !== 'undefined'
    ? /iPhone|iPad|iPod|Android|Blackberry|IEMobile/g.test(navigator.userAgent)
    : undefined;
})();
