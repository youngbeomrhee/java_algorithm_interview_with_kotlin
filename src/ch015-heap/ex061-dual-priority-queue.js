/*
문제 설명
이중 우선순위 큐는 다음 연산을 할 수 있는 자료구조를 말합니다.

명령어	수신 탑(높이)
I 숫자	큐에 주어진 숫자를 삽입합니다.
D 1	큐에서 최댓값을 삭제합니다.
D -1	큐에서 최솟값을 삭제합니다.
이중 우선순위 큐가 할 연산 operations가 매개변수로 주어질 때, 모든 연산을 처리한 후 큐가 비어있으면 [0,0] 비어있지 않으면 [최댓값, 최솟값]을 return 하도록 solution 함수를 구현해주세요.

제한사항
operations는 길이가 1 이상 1,000,000 이하인 문자열 배열입니다.
operations의 원소는 큐가 수행할 연산을 나타냅니다.
원소는 “명령어 데이터” 형식으로 주어집니다.- 최댓값/최솟값을 삭제하는 연산에서 최댓값/최솟값이 둘 이상인 경우, 하나만 삭제합니다.
빈 큐에 데이터를 삭제하라는 연산이 주어질 경우, 해당 연산은 무시합니다.
입출력 예
operations	return
["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"]	[0,0]
["I -45", "I 653", "D 1", "I -642", "I 45", "I 97", "D 1", "D -1", "I 333"]	[333, -45]
입출력 예 설명
입출력 예 #1

16과 -5643을 삽입합니다.
최솟값을 삭제합니다. -5643이 삭제되고 16이 남아있습니다.
최댓값을 삭제합니다. 16이 삭제되고 이중 우선순위 큐는 비어있습니다.
우선순위 큐가 비어있으므로 최댓값 삭제 연산이 무시됩니다.
123을 삽입합니다.
최솟값을 삭제합니다. 123이 삭제되고 이중 우선순위 큐는 비어있습니다.
따라서 [0, 0]을 반환합니다.

입출력 예 #2

-45와 653을 삽입후 최댓값(653)을 삭제합니다. -45가 남아있습니다.
-642, 45, 97을 삽입 후 최댓값(97), 최솟값(-642)을 삭제합니다. -45와 45가 남아있습니다.
333을 삽입합니다.
이중 우선순위 큐에 -45, 45, 333이 남아있으므로, [333, -45]를 반환합니다. 

TC: 최악의 경우: O(M * N log N), M은 operations 배열의 길이, N은 힙의 최대 크기
SC: O(2N) -> O(N)
 */
// DualPriorityQueue 클래스 정의
class DualPriorityQueue {
    constructor() {
        // 최소 힙과 최대 힙을 각각 배열로 관리
        this.minHeap = [] // 오름차순 정렬된 배열로 최소값을 관리
        this.maxHeap = [] // 내림차순 정렬된 배열로 최대값을 관리
        this.size = 0 // 현재 큐의 크기를 저장
    }

    // 큐에 값을 삽입
    insert(value) {
        this.minHeap.push(value) // 최소 힙에 값 추가
        this.maxHeap.push(value) // 최대 힙에 값 추가
        this.size++ // 큐 크기 증가

        // 각각 최소 힙과 최대 힙 정렬
        this.minHeap.sort((a, b) => a - b) // 최소 힙은 오름차순 정렬
        this.maxHeap.sort((a, b) => b - a) // 최대 힙은 내림차순 정렬
    }

    // 큐에서 최댓값 삭제
    deleteMax() {
        if (this.size === 0) return // 큐가 비어있으면 아무 작업도 하지 않음

        const max = this.maxHeap.shift() // 최대 힙의 첫 번째 값을 가져오고 제거
        const index = this.minHeap.indexOf(max) // 최소 힙에서 동일 값을 찾음
        if (index > -1) this.minHeap.splice(index, 1) // 최소 힙에서도 해당 값 제거
        this.size-- // 큐 크기 감소
    }

    // 큐에서 최솟값 삭제
    deleteMin() {
        if (this.size === 0) return // 큐가 비어있으면 아무 작업도 하지 않음

        const min = this.minHeap.shift() // 최소 힙의 첫 번째 값을 가져오고 제거
        const index = this.maxHeap.indexOf(min) // 최대 힙에서 동일 값을 찾음
        if (index > -1) this.maxHeap.splice(index, 1) // 최대 힙에서도 해당 값 제거
        this.size-- // 큐 크기 감소
    }

    // 현재 큐의 상태를 반환
    getResult() {
        if (this.size === 0) return [0, 0] // 큐가 비어있으면 [0, 0] 반환
        return [this.maxHeap[0], this.minHeap[0]] // [최댓값, 최솟값] 반환
    }
}

// solution 함수 정의
function solution(operations) {
    const dpq = new DualPriorityQueue() // DualPriorityQueue 인스턴스 생성

    // operations 배열을 순회하며 연산 수행
    for (const operation of operations) {
        const [command, value] = operation.split(' ') // 명령어와 값 분리

        if (command === 'I') {
            // 삽입 명령어 (I 숫자)
            dpq.insert(Number(value))
        } else if (command === 'D') {
            if (value === '1') {
                // 최댓값 삭제 명령어 (D 1)
                dpq.deleteMax()
            } else if (value === '-1') {
                // 최솟값 삭제 명령어 (D -1)
                dpq.deleteMin()
            }
        }
    }

    // 모든 연산을 마친 후 최종 결과 반환
    return dpq.getResult()
}
