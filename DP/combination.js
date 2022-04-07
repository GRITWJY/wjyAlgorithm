/*
 * 动态规划之组合问题
 *
 *
 * 总数为Nums, 分别有n个数，
 * 100  50，30，20，5
 * 要求组合的数量最少即可，每张都没限制
 * */

function fn(coins, nums) {
  let dp = new Array(nums + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= nums; i++) {
    for (const coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[nums] === Infinity ? "Impossible" : dp[nums];
}
