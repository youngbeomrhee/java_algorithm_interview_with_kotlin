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

function swapPairs(head: ListNode<number> | null): ListNode<number> | null {
    if (head === null || head.next === null) {
        return head
    }

    const dummyHead = new ListNode(0)
    dummyHead.next = head
    let prevNode = dummyHead
    let currentNode = head

    while (currentNode !== null && currentNode.next !== null) {
        const nextNode = currentNode.next
        const nextNextNode = nextNode.next as ListNode<number> // Add type assertion here

        prevNode.next = nextNode
        nextNode.next = currentNode
        currentNode.next = nextNextNode

        prevNode = currentNode
        currentNode = nextNextNode
    }

    return dummyHead.next
}
