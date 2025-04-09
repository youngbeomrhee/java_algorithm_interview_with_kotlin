/*
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

 

Example 1:

Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Example 2:

Input: nums = [2,0,1]
Output: [0,1,2]
 

Constraints:

n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.
 

Follow up: Could you come up with a one-pass algorithm using only constant extra space?


*/
/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
    let low = 0 // 0을 저장할 위치
    let mid = 0 // 현재 검사 중인 위치
    let high = nums.length - 1 // 2를 저장할 위치

    while (mid <= high) {
        switch (nums[mid]) {
            case 0:
                // 0을 low 위치로 이동
                ;[nums[low], nums[mid]] = [nums[mid], nums[low]]
                low++
                mid++
                break
            case 1:
                // 1은 그대로 두고 다음으로
                mid++
                break
            case 2:
                // 2를 high 위치로 이동
                ;[nums[mid], nums[high]] = [nums[high], nums[mid]]
                high--
                break
        }
    }
}
