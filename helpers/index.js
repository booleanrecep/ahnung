export const capitalize = (text) => {
  return text.replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  });
};

export const countMinute = (text) => {
  const len = text.split(" ").length;
  const wordPerMinute = 50;
  const res = len < wordPerMinute ? 1 : Math.floor(len / wordPerMinute);
  return res;
};