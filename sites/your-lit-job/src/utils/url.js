// eslint-disable-next-line import/prefer-default-export
export function isAbsoluteUrl(url) {
  return url.match(/^(http:\/\/|https:\/\/)/i);
}

export function makeAbsoluteUrl(url, prefix) {
  if (isAbsoluteUrl(url)) {
    return url;
  }

  return `${prefix.replace(/\/$/i, '')}/${url.replace(/^\//i, '')}`;
}
