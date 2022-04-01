/*
* 给定一个长度为 n 的数组 arr，求它的最长严格上升子序列的长度。
所谓子序列，指一个数组删掉一些数（也可以不删）之后，形成的新数组。例如 [1,5,3,7,3] 数组，其子序列有：[1,3,3]、[7] 等。但 [1,6]、[1,3,5] 则不是它的子序列。
* O(n^2)
* O(n)
* */

function LIS(nums) {
  let dp = [];
  let maxLen = 0;
  for (let i = 0; i < nums.length; i++) {
    dp[i] = 1;
  }
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }
  return maxLen;
}

/*
 * dp+递归
 *
 * 优化解法
 * 我们要得到最长的递增子序列，那么相邻两项的差值肯定要最小，即递增的尽可能慢
 *
 * 1。用dp[i]记录长度为i的最长递增子序列尾部元素的最小值。
 * 2.dp[1] 的初始值为num[0]
 * 3.如果dp中的元素都比num[i]小，将它放在最后
 * */

function lengthOfLIS(nums) {
  const n = nums.length;
  const dp = [null, nums[0]];
  let max = 1;

  for (let i = 0; i < n; i++) {
    if (dp[max] < nums[i]) {
      dp[++max] = nums[i];
    }
    // 二分查找
    let pos = 0;
    let left = 1,
      right = max,
      mid;
    while (left <= right) {
      mid = (left + right) >> 1;
      if (nums[i] > dp[mid]) {
        // 元素在右边
        left = mid + 1;
        pos = mid;
      } else {
        right = mid - 1;
      }
    }
    dp[pos + 1] = nums[i];
  }

  return max;
}

/*
 * 最长递增子串
 * */
function findLengthOfCIS(nums) {
  const n = nums.length;
  let left = 0,
    right = 1; // 相邻两个判断
  let maxLen = 1,
    res = 0;
  while (right < n) {
    if (nums[right] > nums[left]) maxLen++;
    else {
      maxLen = 1;
    }
    left++;
    right++;
    res = Math.max(res, maxLen);
  }
  return res;
}
