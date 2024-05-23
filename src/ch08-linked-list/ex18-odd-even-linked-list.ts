import { ListNode } from '../util/ListNode'

/*
Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in O(1) extra space complexity and O(n) time complexity.

 

Example 1:


Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]
Example 2:


Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]
 

Constraints:

The number of nodes in the linked list is in the range [0, 10^4].
-10^6 <= Node.val <= 10^6
*/
export function oddEvenList(
    head: ListNode<number> | null
): ListNode<number> | null {
    if (head === null || head.next === null || head.next === null) {
        return head
    }

    // 두 개의 포인터를 초기화: 하나는 홀수 인덱싱 노드용(oddRunner), 다른 하나는 짝수 인덱싱 노드용(evenRunner).
    let oddRunner: ListNode<number> | null = head
    let evenRunner: ListNode<number> | null = head.next

    // 짝수 인덱싱된 노드의 헤드에 대한 참조를 유지 -> oddRunner.next로 연결할 때 사용
    const evenHead = evenRunner

    // 처리할 짝수 노드가 더 이상 없을 때까지 반복
    while (evenRunner !== null && evenRunner.next !== null) {
        // 현재 홀수 노드의 next를 다음 홀수 노드에 연결 (예: 1 -> 3 (2의 next))
        oddRunner.next = evenRunner.next
        // 홀수 노드의 포인터를 다음 홀수 노드로 이동
        oddRunner = oddRunner.next
        // 현재 짝수 노드를 다음 짝수 노드에 연결
        evenRunner.next = oddRunner.next
        // 짝수 노드의 포인터를 다음 짝수 노드로 이동
        evenRunner = evenRunner.next
    }

    // 홀수 번째 요소만 연결된 노드의 마지막을 짝수 번째 노드만 연결된 노드의 헤드로 연결
    oddRunner.next = evenHead

    return head
}
