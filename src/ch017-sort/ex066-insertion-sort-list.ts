/*
Insertion Sort List

Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.

The steps of the insertion sort algorithm:

Insertion sort iterates, consuming one input element each repetition and growing a sorted output list.
At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list and inserts it there.
It repeats until no input elements remain.
The following is a graphical example of the insertion sort algorithm. The partially sorted list (black) initially contains only the first element in the list. One element (red) is removed from the input data and inserted in-place into the sorted list with each iteration.


 

Example 1:


Input: head = [4,2,1,3]
Output: [1,2,3,4]
Example 2:


Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
 

Constraints:

The number of nodes in the list is in the range [1, 5000].
-5000 <= Node.val <= 5000
*/
/* 
  TC: O(n * (n - 1)) -> n^2
  SC: O(1)

  입력값에 필요한 공간은 O(n)이지만 입력값을 별도의 데이터 구조에 저장하지 않고 내부 로직은 In-Place Algorithm으로 구현되므로 O(1)로 봄 
*/
function insertionSortList(head: ListNode | null): ListNode | null {
    // 빈 연결 리스트인 경우 null 반환
    if (!head) return null

    // 정렬된 리스트의 시작점을 가리키는 더미 노드 생성
    // 더미 노드를 사용하면 첫 번째 노드 삽입 시의 특별한 처리를 피할 수 있음
    const orderedListDummyHead = new ListNode(0)

    // current: 현재 정렬할 노드
    let current = head
    // insertPos: 정렬된 리스트에서 삽입 위치를 찾기 위한 포인터
    let insertPos = orderedListDummyHead

    // 모든 노드를 순회하면서 정렬
    // TC: O(n)
    while (current) {
        // 다음에 처리할 노드를 미리 저장
        // (current.next가 변경되기 전에 저장해야 함)
        const next = current.next

        // 매 반복마다 정렬된 리스트의 처음부터 탐색
        // 적절한 삽입 위치를 찾기 위해 더미 노드부터 시작
        insertPos = orderedListDummyHead

        // 삽입할 위치 찾기
        // prev.next가 존재하고, 그 값이 현재 노드의 값보다 작은 동안 계속 이동
        // TC: O(n - 1)
        while (insertPos.next && insertPos.next.val < current.val) {
            insertPos = insertPos.next
        }

        // 1. current의 next를 prev의 다음 노드로 설정
        current.next = insertPos.next
        // 2. prev의 next를 current로 설정
        insertPos.next = current

        // 다음 노드가 없으면 종료
        if (next === null) break
        // 다음 노드로 이동
        current = next
    }

    // 더미 노드의 다음 노드가 정렬된 리스트의 시작점
    return orderedListDummyHead.next
}

function insertionSortList2(head: ListNode | null): ListNode | null {
    // 빈 리스트나 단일 노드는 이미 정렬된 상태
    if (!head || !head.next) return head

    // 정렬된 리스트의 시작점을 표시하는 더미 노드
    const dummyHead = new ListNode(-5001) // 문제 제약조건보다 작은 값으로 초기화
    let sortedTail = dummyHead // 정렬된 리스트의 마지막 노드 추적
    let current = head // 현재 처리할 노드

    while (current) {
        const next = current.next // 다음 처리할 노드 저장

        // 최적화 1: 현재 노드가 정렬된 리스트의 마지막 노드보다 크거나 같으면
        // 리스트의 끝에 바로 추가 (O(1) 연산)
        if (sortedTail.val <= current.val) {
            sortedTail.next = current
            current.next = null
            sortedTail = current
        } else {
            // 정렬된 리스트에서 적절한 삽입 위치 찾기
            let insertPos = dummyHead

            while (insertPos.next && insertPos.next.val < current.val) {
                insertPos = insertPos.next
            }

            // 현재 노드를 찾은 위치에 삽입
            current.next = insertPos.next
            insertPos.next = current
        }
        if (next === null) break
        current = next // 다음 노드로 이동
    }

    return dummyHead.next
}
