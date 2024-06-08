/*
Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

 

Example 1:


Input: head = [1,2,3,4]
Output: [2,1,4,3]
Example 2:

Input: head = []
Output: []
Example 3:

Input: head = [1]
Output: [1]
 

Constraints:

The number of nodes in the list is in the range [0, 100].
0 <= Node.val <= 100
*/

import { ListNode } from '../util/ListNode'

export function swapPairs(
    head: ListNode<number> | null
): ListNode<number> | null {
    if (head === null || head.next === null) {
        return head
    }

    const dummyHead = new ListNode(0)
    dummyHead.next = head
    // 2개씩 묶었을 때 마지막 노드를 이전 노드로 저장
    let prevNode = dummyHead
    let currentNode = head

    // 2개씩 묶어서 노드를 교환
    while (currentNode !== null && currentNode.next !== null) {
        // 참조가 사라지지 않도록 현재 노드의 다음 노드와 다음 다음 노드를 미리 저장
        const nextNode = currentNode.next
        const nextNextNode = nextNode.next as ListNode<number>

        // 직전 2개 묶음 노드의 다음 노드를 현재 묶음의 뒤의 노드와 연결
        prevNode.next = nextNode
        // 2개 묶음 노드의 뒤의 노드의 다음 노드를 앞의 노드로 연결 (교환)
        nextNode.next = currentNode
        // (뒤로 이동된) 현재 노드의 다음 노드를 (다음 2번째 묶음의 첫 번째인) 다다음 노드로 연결
        currentNode.next = nextNextNode

        // 다음 2개 묶음에서 이전 노드를 바라보도록 현재 2개 묶음의 마지막 노드를 prevNode에 저장
        prevNode = currentNode
        // 현재 노드를 다음 2개 묶음의 첫 번째 노드로 이동
        currentNode = nextNextNode
    }

    return dummyHead.next
}
