/*
 * 最长公共子序列问题-此问题我按照牛客网出的题进行解答，
 * */

/*
* 一、
*给定两个字符串 s1 和 s2，长度为m和n 。求两个字符串最长公共子序列的长度。
所谓子序列，指一个字符串删掉部分字符（也可以不删）形成的字符串。例如：字符串 "arcaea" 的子序列有 "ara" 、 "rcaa" 等。但 "car" 、 "aaae" 则不是它的子序列。
所谓 s1 和 s2 的最长公共子序列，即一个最长的字符串，它既是 s1 的子序列，也是 s2 的子序列。
保证字符串中的字符只有小写字母。
要求：空间复杂度 O(mn),时间复杂度 O(mn)
进阶：空间复杂度 O(min(m,n))，时间复杂度 O(mn)
*
*
思路
*  这里的要求中空间复杂度为O(mn)，应该很容易就想到用dp。
大家可能对dp不是很容易理解，我一般都是用矩阵来帮助理解
* 思路大致是这样的，假设以bdcaaaa去遍历abcde
* 这样，就会用bdcaaaa 的每个字符去遍历abcde，
* 如果找到相同的，就在斜上方(为了防止一个对应对个) + 1
* 不同的就左上两个方向比较，取最大值
* 然后，它的之后(如果没有相同的，就全为1，如下图的第一行所示)，那么，这里就表示当 b 与abcde匹配时，最长为1，即b
* 之后到第二行，d，匹配到d了，那么2就表示bd。
*
* 可能不是很清楚，主要是我自己也不是很熟，但应该有助于理解的
*
*   a b c d e
* b 0 1 1 1 1
* d 0 1 1 2 2
* c 0 1 2 2 2
* a 1 1 2 2 2
* a 1 1 2 2 2
* a 1 1 2 2 2
* a 1 1 2 2 2
* *
*
* 状态转移方程
* dp[i][j] = 0   空集
* dp[i][j] = 1 + dp[i-1][j-1] xi=yj   元素相等时
* dp[i][j] = max(dp[i-1][j],dp[i][j-1])  xi  !=  yj
* * */
function longestCommonSubsequence(str1, str2) {
  let n = str1.length,
    m = str2.length;
  let dp = [];
  for (let i = 0; i <= n; i++) {
    dp[i] = [];
    for (let j = 0; j <= m; j++) {
      dp[i][j] = 0;
    }
  }

  // 获取最大公共子序列
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (str1[i - 1] == str2[j - 1]) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + 1);
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  console.log(getLCS(dp, n, m, str1, str2).split("").reverse().join(""));

  return dp[n][m];
}

function getLCS(dp, i, j, s1, s2) {
  let str = "";
  if (i == 0 || j == 0) return "";

  if (s1[i - 1] === s2[j - 1]) {
    str += s1[i - 1] + getLCS(dp, i - 1, j - 1, s1, s2);
  } else if (dp[i][j - 1] > dp[i - 1][j]) {
    str += getLCS(dp, i, j - 1, s1, s2);
  } else {
    str += getLCS(dp, i - 1, j, s1, s2);
  }
  return str;
}

// longestCommonSubsequence("abcfafsafdfade", "afafafabcde");

/*
 * 最长公共子串
 * 与序列的区别就是是否连续
 * */

function longestCommonSubString(str1, str2) {
  let n = str1.length,
    m = str2.length;
  let index;
  let maxLen = -1;
  let dp = [];
  for (let i = 0; i <= n; i++) {
    dp[i] = [];
    for (let j = 0; j <= m; j++) {
      dp[i][j] = 0;
    }
  }

  // 获取最大公共子序列
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (str1[i - 1] == str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (maxLen < dp[i][j]) {
          index = i;
          maxLen = dp[i][j];
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }

  return str1.substring(index - maxLen, index);
}

/*
 * 最长公共前缀
 * */
function longestCommonPrefix(strs) {
  let first = strs[0];
  if (first === "" || first === undefined) return "";
  let minLen = 9999;
  for (let i = 0; i < strs.length; i++) {
    let len = towStrLongestCommonPrefix(first, strs[i]);
    minLen = Math.min(len, minLen);
  }
  return first.slice(0, minLen);
}

function towStrLongestCommonPrefix(s, t) {
  let i = 0,
    j = 0;
  let cnt = 0;

  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      cnt++;
    } else {
      return cnt;
    }
    i++;
    j++;
  }
  return cnt;
}
