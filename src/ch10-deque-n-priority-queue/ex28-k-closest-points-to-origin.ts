import { PriorityQueue } from '../util/PriorityQueue'

/*
Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

 

Example 1:


Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.
 

Constraints:

1 <= k <= points.length <= 10^4
-104 <= xi, yi <= 10^4
*/
function kClosest(points: number[][], k: number): number[][] {
    // 각 점의 유클리드 거리의 제곱을 계산하는 헬퍼 함수. 성능을 위해 sqrt 사용하지 않음
    const distance = (point: number[]): number => {
        return point[0] * point[0] + point[1] * point[1] // x^2 + y^2 계산
    }

    // 사용자 정의 비교 함수를 사용하여 최대 힙을 생성합니다
    const pq = new PriorityQueue<number[]>((a, b) => distance(b) - distance(a)) // 거리의 제곱을 기준으로 큰 값이 먼저 오도록 설정

    // 주어진 점들을 순회하면서 우선순위 큐에 추가합니다
    for (const point of points) {
        pq.push(point) // 점을 우선순위 큐에 추가
        if (pq.data.length > k) {
            // 큐의 크기가 k를 초과하면
            pq.pop() // 가장 큰 거리 값을 가진 점을 제거
        }
    }

    return pq.data // 최종적으로 k개의 가장 가까운 점들을 반환
}
