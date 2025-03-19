/* 
56. Merge Intervals
Medium
Topics
Companies
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 

Constraints:

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
*/
/*
TC: O(n log n) + O(n) = O(n log n)
SC: 2 * O(n) + 2 = O(n)
*/
function merge(intervals: number[][]): number[][] {
    if (!intervals.length) return []

    // 시작 지점을 기준으로 정렬
    // TC: O(n log n)
    // SC: O(n)
    intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1])

    // SC: 최선 O(1), 최악 O(n)
    const result: number[][] = [intervals[0]]

    // TC: O(n)
    for (let i = 1; i < intervals.length; i++) {
        const currentInterval = intervals[i]
        const lastMergedInterval = result[result.length - 1]

        // 현재 구간의 시작점이 이전 구간의 끝점보다 작거나 같으면 병합
        if (currentInterval[0] <= lastMergedInterval[1]) {
            lastMergedInterval[1] = Math.max(
                lastMergedInterval[1],
                currentInterval[1]
            )
        } else {
            // 겹치지 않는 경우 새로운 구간으로 추가
            result.push(currentInterval)
        }
    }

    return result
}

function merge2(intervals: number[][]): number[][] {
    if (intervals.length <= 1) return intervals

    // 배열을 정렬
    // TC: O(n log n)
    // SC: O(n)
    intervals.sort((a, b) => a[0] - b[0])

    // 분할
    const mid = Math.floor(intervals.length / 2)
    const left = intervals.slice(0, mid) // TC: O(n)
    const right = intervals.slice(mid) // TC: O(n)

    // 재귀적으로 각 부분 병합
    return mergeTwoLists(merge(left), merge(right))
}

function mergeTwoLists(list1: number[][], list2: number[][]): number[][] {
    const result: number[][] = []
    let i = 0,
        j = 0

    // TC: O(n)
    while (i < list1.length && j < list2.length) {
        let interval1 = list1[i]
        let interval2 = list2[j]

        // 겹치는 구간 처리
        if (interval1[1] >= interval2[0]) {
            // interval1이 interval2와 겹치는 경우
            if (interval1[0] <= interval2[0]) {
                const mergedInterval = [
                    interval1[0],
                    Math.max(interval1[1], interval2[1]),
                ]
                result.push(mergedInterval)
                i++
                j++

                // 다음 구간들과도 겹치는지 확인
                while (j < list2.length && list2[j][0] <= mergedInterval[1]) {
                    mergedInterval[1] = Math.max(mergedInterval[1], list2[j][1])
                    j++
                }
            } else {
                // interval2가 interval1과 겹치는 경우
                const mergedInterval = [
                    interval2[0],
                    Math.max(interval1[1], interval2[1]),
                ]
                result.push(mergedInterval)
                i++
                j++

                // 다음 구간들과도 겹치는지 확인
                while (i < list1.length && list1[i][0] <= mergedInterval[1]) {
                    mergedInterval[1] = Math.max(mergedInterval[1], list1[i][1])
                    i++
                }
            }
        } else if (interval1[0] < interval2[0]) {
            // 겹치지 않고 interval1이 앞에 있는 경우
            result.push(interval1)
            i++
        } else {
            // 겹치지 않고 interval2가 앞에 있는 경우
            result.push(interval2)
            j++
        }
    }

    // 남은 구간들 처리
    while (i < list1.length) result.push(list1[i++])
    while (j < list2.length) result.push(list2[j++])

    return result
}
