/*
 * 给定一个包含非负整数的 M x N 迷宫，请找出一条从左上角到右下角的路径，使得路径上的数字总和最小。每次只能向下或者向右移动一步。
 *
3 3
1 3 1
1 5 1
4 2 1
 * */

function minPathSum(grid) {
  const m = grid.length,
    n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 && j != 0) {
        grid[i][j] = grid[i][j] + grid[i][j - 1];
      } else if (i != 0 && j == 0) {
        grid[i][j] = grid[i][j] + grid[i - 1][j];
      } else if (i != 0 && j != 0) {
        grid[i][j] = grid[i][j] + Math.min(grid[i - 1][j], grid[i][j - 1]);
      }
    }
  }
  return grid[m - 1][n - 1];
}
