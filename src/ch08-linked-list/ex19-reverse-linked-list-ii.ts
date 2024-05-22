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
function reverseBetween(
    head: ListNode<number> | null,
    left: number,
    right: number
): ListNode<number> | null {
    if (head === null || head.next === null) {
        return head
    }

    const dummyHead = new ListNode(0)
    dummyHead.next = head
    let prevNode = dummyHead
    let currentNode = head

    let count = 1
    while (count < left) {
        prevNode = currentNode
        currentNode = currentNode.next as ListNode<number>
        count++
    }

    let reversedHead: ListNode<number> | null = null
    let reversedTail: ListNode<number> | null = currentNode

    while (count >= left && count <= right) {
        const nextNode = currentNode.next
        currentNode.next = reversedHead
        reversedHead = currentNode
        currentNode = nextNode as ListNode<number>
        count++
    }

    prevNode.next = reversedHead
    reversedTail.next = currentNode

    return dummyHead.next
}
