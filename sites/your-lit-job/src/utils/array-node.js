exports.arrayChunk = (arr, size) => {
  const R = [];
  for (let i = 0; i < arr.length; i += size) {
    R.push(arr.slice(i, i + size));
  }
  return R;
};

exports.arrayShuffle = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
