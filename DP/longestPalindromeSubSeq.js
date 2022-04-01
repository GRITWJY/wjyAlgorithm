/*
 * 最长回文子串
 * */

function longestPalindrome(s) {
  let maxRes = 0,
    maxStr = "";

  for (let i = 0; i < s.length; i++) {
    let str1 = palindrome(s, i, i);
    let str2 = palindrome(s, i, i + 1);
    if (str1.length > maxRes) {
      maxStr = str1;
      maxRes = str1.length;
    }
    if (str2.length > maxRes) {
      maxStr = str2;
      maxRes = str2.length;
    }
    return maxStr;
  }
}

// 判断是不是一个回文串
// 1、从当前字符为中心
// 2、有左右边界
function palindrome(s, l, r) {
  while (l >= 0 && r <= s.length && s[l] === s[r]) {
    l--;
    r++;
  }
  return s.slice(l + 1, r);
}
