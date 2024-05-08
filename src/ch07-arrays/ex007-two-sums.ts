/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
 

Constraints:

2 <= nums.length <= 10**4
-(10**9) <= nums[i] <= 10**9
-(10**9) <= target <= 10**9
Only one valid answer exists.
*/

// Bruth-Force
export function twoSum(nums: number[], target: number): number[] | undefined {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
}

// 개선안: 첫 번째 순회할 때 map으로 만들고 해당 맵을 통해 확인
export function twoSum2(nums: number[], target: number): number[] | undefined {
    // 첫 번째 순회할 때 {number: key} 형태의 맵 생성
    const numsMap = new Map<number, number>()
    nums.forEach((n, i) => {
        numsMap.set(n, i)
    })

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]
        if (numsMap.has(complement) && i !== numsMap.get(complement)) {
            return [i, numsMap.get(complement) as number]
        }
    }
}

// 개선안: 한 번의 순회로 끝낸다
export function twoSum3(nums: number[], target: number): number[] | undefined {
    const numsMap = new Map<number, number>()

    for (let i = 0; i < nums.length; i++) {
        const n = nums[i]
        const complement = target - n
        if (numsMap.has(complement)) {
            return [numsMap.get(complement) as number, i]
        }
        numsMap.set(n, i)
    }
}
