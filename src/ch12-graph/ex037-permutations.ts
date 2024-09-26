/*
Given an array nums of distinct integers, return all the possible 
permutations
. You can return the answer in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]
Example 3:

Input: nums = [1]
Output: [[1]]
 

Constraints:

1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.
*/
function permute(nums: number[]): number[][] {
  const result: number[][] = []
  
  // 백트래킹을 위한 재귀 함수 정의
  const backtrack = (current: number[], remaining: number[]) => {
    // 남은 숫자가 없으면 현재 조합을 결과에 추가
    if (remaining.length === 0) {
      result.push([...current]) // 현재 조합을 복사하여 추가
      return
    }

    // 남은 숫자에서 하나씩 선택하여 재귀 호출
    for (let i = 0; i < remaining.length; i++) {
      // 현재 숫자를 선택하고 남은 숫자에서 제거
      const nextCurrent = [...current, remaining[i]]
      const nextRemaining = remaining.filter((_, index) => index !== i)
      backtrack(nextCurrent, nextRemaining) // 재귀 호출
    }
  }

  backtrack([], nums) // 초기 호출
  return result // 최종 결과 반환
}