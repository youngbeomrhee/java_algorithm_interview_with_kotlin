import { ListNode } from '../util/ListNode'
/*
Given the head of a singly linked list, reverse the list, and return the reversed list.

 

Example 1:


Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
Example 2:


Input: head = [1,2]
Output: [2,1]
Example 3:

Input: head = []
Output: []
 

Constraints:

The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000
 

Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?
*/
export function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
    // early return
    if (head === null || head.next === null) {
        return head
    }

    let prevNode: ListNode<T> | null = null
    let currentNode: ListNode<T> | null = head

    while (currentNode !== null) {
        // 현재 노드의 다음 노드 임시 저장
        const nextNode: ListNode<T> | null = currentNode.next
        // 현재 노드의 다음 노드를 현재 노드의 이전 노드로 변경 (초기에는 null)
        currentNode.next = prevNode
        // 이전 노드를 현재 노드의 다음 노드로 변경
        prevNode = currentNode
        // 현재 노드를 다음 노드로 변경
        currentNode = nextNode
    }

    return prevNode
}

export function reverseListRecursive<T>(
    head: ListNode<T> | null
): ListNode<T> | null {
    if (head === null || head.next === null) {
        return head
    }
    const reversedHead = reverseListRecursive(head.next)
    head.next.next = head
    head.next = null
    return reversedHead
}
