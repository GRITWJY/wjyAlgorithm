/*
 * 无重复字符的最长子串
 * */

var lengthOfLongestSubstring = function (str) {
  let arr = [],
    max = 0;
  for (let i = 0; i < str.length; i++) {
    let index = arr.indexOf(str[i]);
    if (index !== -1) {
      arr.splice(0, index + 1);
    }
    arr.push(str.charAt(i));
    max = Math.max(arr.length, max);
  }
  return max;
};

var lengthOfLongestSubstring = function (str) {
  let map = new Map(),
    max = 0;

  for (let i = 0; i < str.length; i++) {
    if (map.has(str[j])) {
      i = Math.max(map.get(s[j]) + 1, i);
    }
    max = Math.max(max, j - i + 1);
    map.set(s[j], j);
  }
  return max;
};
