/*
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

 

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
 

Constraints:

1 <= k <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4

TC: O(n) * O(log k) (k는 minHeap의 크기) -> O(n log k)
SC: O(k)
*/
function findKthLargest(nums: number[], k: number): number {
    const minHeap: number[] = [] // 최소 힙을 저장할 배열

    // 힙에 요소를 추가하는 함수
    const addToHeap = (num: number) => {
        if (minHeap.length < k) {
            // 힙의 크기가 k보다 작으면 요소를 추가하고 siftUp 호출
            minHeap.push(num)
            siftUp(minHeap.length - 1)
        } else if (num > minHeap[0]) {
            // 새로운 요소가 힙의 루트보다 크면 루트를 교체하고 siftDown 호출
            minHeap[0] = num
            siftDown(0)
        }
    }

    // 힙의 성질을 유지하기 위해 위로 이동시키는 함수
    const siftUp = (index: number) => {
        let parentIndex
        while (index > 0) {
            parentIndex = Math.floor((index - 1) / 2) // 부모 인덱스 계산
            if (minHeap[index] < minHeap[parentIndex]) {
                // 현재 요소가 부모보다 작으면 교환
                ;[minHeap[index], minHeap[parentIndex]] = [
                    minHeap[parentIndex],
                    minHeap[index],
                ]
                index = parentIndex // 인덱스를 부모로 이동
            } else {
                break // 힙의 성질이 만족되면 종료
            }
        }
    }

    // 힙의 성질을 유지하기 위해 아래로 이동시키는 함수
    const siftDown = (index: number) => {
        const length = minHeap.length
        let smallest = index
        while (true) {
            const left = 2 * index + 1 // 왼쪽 자식 인덱스
            const right = 2 * index + 2 // 오른쪽 자식 인덱스

            if (left < length && minHeap[left] < minHeap[smallest]) {
                smallest = left // 왼쪽 자식이 더 작으면 smallest 갱신
            }
            if (right < length && minHeap[right] < minHeap[smallest]) {
                smallest = right // 오른쪽 자식이 더 작으면 smallest 갱신
            }
            if (smallest !== index) {
                // smallest가 변경되었으면 교환
                ;[minHeap[index], minHeap[smallest]] = [
                    minHeap[smallest],
                    minHeap[index],
                ]
                index = smallest // 인덱스를 smallest로 이동
            } else {
                break // 힙의 성질이 만족되면 종료
            }
        }
    }

    // 배열의 각 요소를 힙에 추가
    for (const num of nums) {
        addToHeap(num)
    }

    return minHeap[0] // k번째로 큰 요소 반환
}
