/**
 * 不同的子序列
 *
 * 给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。
 * 最近我发现了一个规律，像字符串的题，有以下几种方法，KMP，动态规划
 *
 * 这题可以采用动态规划，需要自己手动画图
 * s = babgbag
 * t = bag
 *
 *
 *
 * */

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  const m = s.length,
    n = t.length;
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));
  for (let j = 0; j <= m; j++) {
    dp[0][j] = 1;
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (t[i - 1] == s[j - 1]) {
        dp[i][j] = dp[i][j - 1] + dp[i - 1][j - 1];
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }

  return dp[n][m];
};

console.log(numDistinct("babgbag", "bag"));
