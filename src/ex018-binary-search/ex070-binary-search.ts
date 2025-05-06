/*
Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.



Example 1:

Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
Example 2:

Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1


Constraints:

1 <= nums.length <= 104
-104 < nums[i], target < 104
All the integers in nums are unique.
nums is sorted in ascending order.
*/
/*
    재귀로 구현
    TC: O(log n)
    SC: O(1)
*/
function search(
    nums: number[],
    target: number,
    left = 0,
    right = nums.length - 1
): number {
    // 빈 배열 또는 범위가 잘못된 경우
    if (!nums.length || left > right) return -1

    const mid = Math.floor((left + right) / 2)
    const midValue = nums[mid]

    if (midValue === target) {
        return mid
    }

    if (target < midValue) {
        return search(nums, target, left, mid - 1)
    } else {
        return search(nums, target, mid + 1, right)
    }
}

/*
    반복문으로 구현
    TC: O(log n)
    SC: O(1)
*/
export function search2(
    nums: number[],
    target: number,
): number {
    // 빈 배열 처리
    if (!nums.length) return -1

    let left = 0
    let right = nums.length - 1

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        const midValue = nums[mid]

        if (midValue === target) {
            return mid
        }

        if (target < midValue) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }

    return -1
}
/*
    반복문으로 구현
    TC: O(log n)
    SC: O(1)
*/
export function search3(
    nums: number[],
    target: number,
): number {
    // 빈 배열 처리
    if (!nums.length) return -1

    let left = 0
    let right = nums.length - 1

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        const midValue = nums[mid]

        if (nums[left] === target) {
            return left
        }
        if (nums[right] === target) {
            return right
        }
        if (midValue === target) {
            return mid
        }

        if (target < midValue) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }

    return -1
}
