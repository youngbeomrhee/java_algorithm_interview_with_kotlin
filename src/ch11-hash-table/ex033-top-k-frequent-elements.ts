/*
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

 

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]
 

Constraints:

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.
 

Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
*/
// Time Complexity: O(n log n) + O(2n) + O(2k) -> O(n log n),
// Space Complexity:  O(2n) + O(log n) + O(2k) -> O(n)
export function topKFrequent(nums: number[], k: number): number[] {
    if (nums.length === 1 && k === 1) {
        return nums
    }

    const frequentMap = new Map<number, number>()
    // TC: O(n), SC: O(n)
    nums.forEach((num) => {
        frequentMap.set(num, (frequentMap.get(num) ?? 0) + 1)
    })

    return Array.from(frequentMap) // TC: O(n), SC: O(n)
        .sort((a, b) => b[1] - a[1]) // 퀵 정렬을 사용한다고 가정하면 TC: 평균 O(n log n) 최악 O(n^2), SC: 평균 O(log n), 최악 O(n)
        .slice(0, k) // TC: O(k), SC: O(k)
        .map(([n]) => n) // TC: O(k), SC: O(k)
}

// Time Complexity: O(3n) -> O(n),
// Space Complexity: O(2n) + O(k) -> O(n)
export function topKFrequent2(nums: number[], k: number): number[] {
    if (nums.length === 1 && k === 1) {
        return nums
    }

    const numFrequencyMap = new Map<number, number>()
    // TC: O(n), SC: O(n)
    nums.forEach((num) => {
        numFrequencyMap.set(num, (numFrequencyMap.get(num) ?? 0) + 1)
    })

    const frequencyNumMap = new Map<number, number[]>()
    for (const [key, value] of numFrequencyMap) {
        // TC: O(n), SC: O(n)
        const numList = frequencyNumMap.get(value) ?? []
        numList.push(key)
        frequencyNumMap.set(value, numList)
    }

    let maxFrequency = nums.length
    const maxFrequencyNums = []
    while (maxFrequency > 0 && maxFrequencyNums.length < k) {
        // TC: O(n), SC: O(k)
        if (frequencyNumMap.has(maxFrequency)) {
            maxFrequencyNums.push(...frequencyNumMap.get(maxFrequency)!)
        }
        maxFrequency--
    }

    return maxFrequencyNums
}
