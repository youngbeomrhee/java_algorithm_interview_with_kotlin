/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
class ListNode {
    val: number // 노드의 값
    next: ListNode | null // 다음 노드를 가리키는 포인터
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val // 값이 없으면 기본값 0
        this.next = next === undefined ? null : next // 다음 노드가 없으면 null
    }
}

/**
 * 연결 리스트를 정렬하는 함수 (병합 정렬 알고리즘 사용)
 * 시간 복잡도: O(n log n)
 * 공간 복잡도: O(log n) - 재귀 호출 스택
 *
 * @param head 정렬할 연결 리스트의 헤드 노드
 * @returns 정렬된 연결 리스트의 헤드 노드
 */
function sortList(head: ListNode | null): ListNode | null {
    // 기저 조건: 빈 리스트거나 노드가 하나만 있으면 이미 정렬된 상태
    if (head === null || head.next === null) return head

    // 빠른 포인터(fast)와 느린 포인터(slow)를 사용해 리스트 중간 지점 찾기
    let slow: ListNode | null = head // 느린 포인터: 한 칸씩 이동
    let fast: ListNode | null = head // 빠른 포인터: 두 칸씩 이동
    let half: ListNode | null = null // 첫 번째 리스트의 마지막 노드

    // 빠른 포인터가 리스트 끝에 도달할 때까지 이동
    while (fast && fast.next && slow) {
        half = slow // 첫 번째 리스트의 마지막 노드 갱신
        slow = slow.next // 느린 포인터 한 칸 이동
        fast = fast.next.next // 빠른 포인터 두 칸 이동
    }

    // 첫 번째 리스트의 끝을 null로 설정하여 리스트 분리
    if (half) {
        half.next = null
    }

    // 분할 정복: 두 부분 리스트를 각각 정렬
    const l1 = sortList(head) // 첫 번째 부분 리스트 정렬
    const l2 = sortList(slow) // 두 번째 부분 리스트 정렬

    // 정렬된 두 리스트 병합
    return mergeTwoList(l1, l2)
}

/**
 * 두 개의 정렬된 연결 리스트를 병합하는 함수
 *
 * @param l1 첫 번째 정렬된 리스트
 * @param l2 두 번째 정렬된 리스트
 * @returns 병합된 정렬 리스트
 */
function mergeTwoList(l1: ListNode | null, l2: ListNode | null) {
    // 기저 조건 처리
    if (l1 === null) {
        return l2 // l1이 비어있으면 l2 반환
    }
    if (l2 === null) {
        return l1 // l2가 비어있으면 l1 반환
    }

    // 두 리스트의 헤드 값을 비교하여 작은 값이 l1이 되도록 정렬
    if (l1.val > l2.val) {
        const temp = l1
        l1 = l2
        l2 = temp
    }

    // 재귀적으로 l1의 다음 노드와 l2를 병합
    l1.next = mergeTwoList(l1.next, l2)
    return l1 // 병합된 리스트의 헤드 반환
}

/**
 * 연결 리스트를 정렬하는 두 번째 방법 (배열 변환 방식)
 * 시간 복잡도: O(n log n) - 배열 정렬에 의존
 * 공간 복잡도: O(n) - 모든 노드를 배열에 저장
 *
 * @param head 정렬할 연결 리스트의 헤드 노드
 * @returns 정렬된 연결 리스트의 헤드 노드
 */
function sortList2(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return head
    }

    // 연결 리스트의 모든 노드를 배열에 저장
    const arr: ListNode[] = []
    let current: ListNode | null = head

    while (current) {
        arr.push(current) // 현재 노드를 배열에 추가
        current = current.next // 다음 노드로 이동
    }

    // 노드 값(val)을 기준으로 배열 정렬
    // JavaScript의 내장 정렬 함수 사용
    arr.sort((a, b) => a.val - b.val)

    let index = 1
    // 정렬된 배열을 다시 연결 리스트로 연결
    while (index < arr.length) {
        arr[index - 1].next = arr[index]
        index++
    }

    // 마지막 노드의 next를 null로 설정하여 리스트 종료
    arr[arr.length - 1].next = null

    // 정렬된 연결 리스트의 헤드(첫 번째 노드) 반환
    return arr[0]
}
