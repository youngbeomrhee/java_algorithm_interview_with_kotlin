/*
   Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

 

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
 

Constraints:

2 <= nums.length <= 10^5
-30 <= nums[i] <= 30
The input is generated such that answer[i] is guaranteed to fit in a 32-bit integer.
 

Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.) 
*/
export function productExceptSelf(nums: number[]): number[] {
    const result = []

    // 왼쪽 누적 곱 계산
    let leftProduct = 1
    for (let i = 0; i < nums.length; i++) {
        result[i] = leftProduct
        result[i] += 0
        leftProduct *= nums[i]
    }

    let rightProduct = 1
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= rightProduct
        result[i] += 0 // -0과 0을 다르게 판단해서 보정
        rightProduct *= nums[i]
    }
    return result
}

export function productExceptSelf2(nums: number[]): number[] {
	const result = new Array(nums.length)
    let sum = 1

    for (let i = 1; i < nums.length; i++) {
        sum = sum * nums[i - 1]
        result[i] = sum
        result[i] += 0
    }
    sum = 1

    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] = (result[i] ?? 1) * sum
        result[i] += 0
        sum = sum * nums[i]
    }
    return result
};

export function productExceptSelf3(nums: number[]): number[] {
	const result = new Array(nums.length).fill(1)
    let sum = 1

    for (let i = 1; i < nums.length; i++) {
        sum = sum * nums[i - 1]
        result[i] = sum
        result[i] += 0
    }
    sum = 1

    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] = result[i] * sum
        result[i] += 0
        sum = sum * nums[i]
    }
    return result
};
