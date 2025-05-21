
/*
Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.
 

Example 1:


Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: true
Example 2:


Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
Output: false
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= n, m <= 300
-10^9 <= matrix[i][j] <= 10^9
All the integers in each row are sorted in ascending order.
All the integers in each column are sorted in ascending order.
-10^9 <= target <= 10^9
*/
/*
  TC: O(n) * O(log n) = O(n log n)
*/
function searchMatrix(matrix: number[][], target: number): boolean {
	for (let i = 0; i < matrix.length; i++) {
			const line = matrix[i]
			const start = line[0]
			const end = line[line.length - 1]

			if (target === start || target === end) {
					return true
			} else if (target > start && target < end) {
					if (binarySearch(line, target) !== -1) {
							return true
					}
			}
			
	}
	return false
};

// TC: O(log n)
function binarySearch(arr: number[], target: number) {
	
	let leftIndex = 0
	let rightIndex = arr.length - 1
	
	while (leftIndex < rightIndex) {
			const middleIndex = Math.floor(leftIndex + (rightIndex - leftIndex) / 2)

			if (arr[leftIndex] === target) {
					return leftIndex
			}
			if (arr[rightIndex] === target) {
					return rightIndex
			}
			if (arr[middleIndex] === target) {
					return middleIndex
			}

			if (target < arr[middleIndex]) {
					rightIndex = middleIndex - 1
			} else {
					leftIndex = middleIndex + 1
			}
	}
	return -1
}
