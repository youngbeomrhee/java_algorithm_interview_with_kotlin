/*
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

 

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.

TC: O(MxN)
SC: O(MxN)

해당 문제가 묻는 바를 캐치하는게 중요. 
fdfs로 풀 수 있는 문제이고 이미 방문한 지점을 리스트로 관리하는게 아니라 방문한 지점을 '0'으로 마킹하는게 핵심 아이디어
*/

function dfs(i: number, j: number, grid: string[][]) {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {
      return
  }

  grid[i][j] = '0'
  
  // 동서남북
  dfs(i, j + 1, grid)
  dfs(i, j - 1, grid)
  dfs(i - 1, j, grid)
  dfs(i + 1, j, grid)
}

function numIslands(grid: string[][]): number {
  let count = 0
  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
          if (grid[i][j] === '1') {
              dfs(i, j, grid)
              count++
          }
      }
  }
  return count
};