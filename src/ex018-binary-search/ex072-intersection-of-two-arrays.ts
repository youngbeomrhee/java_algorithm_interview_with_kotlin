/*
Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

 

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.
 

Constraints:

1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000
*/
/*
  TC: O(b log b + s log b + s) -> O(2 * b log b) -> O(b log b)
  SC: O(b + s + b + s) -> O(2b + 2s) -> O(b + s) -> O(b)
*/
export function intersection(nums1: number[], nums2: number[]): number[] {
    if (nums1.length === 1 && nums2.length === 1) {
        return nums1[0] === nums2[0] ? [nums1[0]] : []
    }

    // SC: O(b)
    const bigger = nums1.length > nums2.length ? nums1 : nums2
    // SC: O(s)
    const smaller = nums1.length > nums2.length ? nums2 : nums1
    
    // TC: O(b log b). b은 bigger의 길이
    // SC: O(b)
    const sortedArray = bigger.sort((a, b) => a - b)
    const intersectionSet = new Set<number>()
    
    // TC: O(s). s은 smaller의 길이
    // SC: O(s)
    smaller.forEach((n) => {
        // TC: O(log b). b는 bigger의 길이
        if (binarySearch(sortedArray, n) != -1) {
            intersectionSet.add(n)
        }
    })
    // TC: O(s). s은 smaller의 길이 (i(intersectionSet의 길이) <= s)
    return Array.from(intersectionSet)
};

// TC: O(log n). b은 nums의 길이
function binarySearch(nums: number[], num: number): number {
    let leftIdx = 0, middleIdx, rightIdx = nums.length - 1

    while (leftIdx <= rightIdx) {
        const left = nums[leftIdx]
        middleIdx = Math.floor(leftIdx + (rightIdx - leftIdx) / 2)
        const middle = nums[middleIdx]
        const right = nums[rightIdx]
      
        if (left === num) {
            return leftIdx
        }
        if (middle === num) {
            return middleIdx
        }
        if (right === num) {
            return rightIdx
        }

        if (num < middle) {
            rightIdx = middleIdx - 1
        } else {
            leftIdx = middleIdx + 1
        }
    }
    return -1
}

/*
  TC: O(n + m + n + n) -> O(3n + m) -> O(n + m)
  SC: O(n + m + n) -> O(2n + m) -> O(n + m)
*/
export function intersection2(nums1: number[], nums2: number[]): number[] {
  // TC: O(n). n은 nums1의 길이
  // SC: O(n)
  const nums1Set = new Set<number>(nums1)
  // TC: O(m). m은 nums2의 길이
  // SC: O(m)
  const nums2Set = new Set<number>(nums2)
  const intersectionSet = new Set<number>()
  // TC: O(n). n은 nums1의 길이
  // SC: O(n)
  for (const n of nums1Set) {
      if (nums2Set.has(n)) {
          intersectionSet.add(n)
      }
  }
  // TC: O(n)
  return Array.from(intersectionSet)
}

/*
  TC: O(n + m + s + s) -> O(n + m)
  SC: O(n + m + n + m + s) -> O(2n + 2m + s) -> O(n + m)
*/
export function intersection3(nums1: number[], nums2: number[]): number[] {
  // TC: O(n). n은 nums1의 길이
  // SC: O(n)
  const nums1Set = new Set<number>(nums1)
  // TC: O(m). m은 nums2의 길이
  // SC: O(m)
  const nums2Set = new Set<number>(nums2)
  const intersectionSet = new Set<number>()

  // SC: O(n + m)
  const smallerSet = nums1Set.size > nums2Set.size ? nums1Set : nums2Set
  const biggerSet = nums1Set.size > nums2Set.size ? nums2Set : nums1Set

  // TC: O(s). s는 smallerSet의 길이
  // SC: O(s)
  for (const n of smallerSet) {
      if (biggerSet.has(n)) {
          intersectionSet.add(n)
      }
  }
  // TC: O(s)
  return Array.from(intersectionSet)
}

/*
  TC: O(n log n + m log m + n + m) -> O(n log n + m log m)
*/
export function intersection4(nums1: number[], nums2: number[]): number[] {
  // TC: O(n log n). n은 nums1의 길이
  nums1.sort((a, b) => a - b)
  // TC: O(m log m). m은 nums2의 길이
  nums2.sort((a, b) => a - b)
  const intersectionSet = new Set<number>()
  let i = 0, j = 0
  // TC: O(n + m)
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      intersectionSet.add(nums1[i]) 
      i++
      j++
    } else if (nums1[i] < nums2[j]) {
      i++
    } else {
      j++
    }
  }
  // TC: O(i). i는 intersectionSet의 길이
  return Array.from(intersectionSet)
}
