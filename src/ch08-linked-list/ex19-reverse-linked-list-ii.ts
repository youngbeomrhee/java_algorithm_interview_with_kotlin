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
export function reverseBetweenSelf(
    head: ListNode<number> | null,
    left: number,
    right: number
): ListNode<number> | null {
    if (head === null || head.next === null) {
        return head
    }

    const dummyHead = new ListNode(0)
    dummyHead.next = head

    // reverse 된 목록의 첫 번째 요소와 연결할 정상 순서의 마지막 노드
    let leftLastNode = head
    // reverse 된 목록의 첫 번째 요소
    let reversedHead = null
    // reverse 된 목록의 마지막 요소
    let reversedLast = null

    let prevNode = null

    let count = 1
    while (head !== null && count <= right) {
        // pointer가 reverse 시키기 전의 목록에 도달했을 때 현재의 pointer를 leftLastNode에 저장
        if (count === left - 1) {
            leftLastNode = head
        }

        // pointer가 reverse 시킬 목록의 시작점에 도달했을 때 현재의 pointer를 reversedLast에 저장
        if (count === left) {
            reversedLast = head
        }

        // left와 right 사이의 요소 reverse
        if (count > left && count <= right) {
            const nextNode: ListNode<number> | null = head.next
            reversedHead = head
            reversedHead.next = prevNode
            prevNode = head
            head = nextNode
        } else {
            prevNode = head
            head = head.next
        }

        // 다음 요소로 계속 진행
        count++
    }

    // leftLastNode -> reversedHead
    leftLastNode.next = reversedHead
    // reversedLast -> head에 연결
    reversedLast!.next = head

    return dummyHead.next
}

export function reverseBetween(
    head: ListNode<number> | null,
    left: number,
    right: number
): ListNode<number> | null {
    // 요소가 없거나, 1개이거나, left와 right가 같은 경우, 그대로 반환
    if (head === null || head.next === null || left === right) {
        return head
    }

    const dummyHead = new ListNode(0)
    dummyHead.next = head
    let prevNode = dummyHead
    let count = 1

    // left 위치의 바로 앞 노드까지 이동
    while (count < left && prevNode.next !== null) {
        prevNode = prevNode.next
        count++
    }

    // reverse 시작 되기 전의 node를 저장 -> reverse가 끝난 후에 reverse의 시작점과 연결
    const prevReverseStart = prevNode
    const reverseStart = prevReverseStart.next

    let currentNode = reverseStart
    while (count <= right && currentNode !== null) {
        const nextNode = currentNode.next
        currentNode.next = prevNode
        prevNode = currentNode
        currentNode = nextNode
        count++
    }

    // reverse가 끝난 후 reverse의 시작 이전지점과 reverse의 시작점으로 변경된 preveNode 연결
    prevReverseStart.next = prevNode
    // reverse의 마지막 노드와 reverse의 다음 노드 연결
    reverseStart!.next = currentNode

    return dummyHead.next
}
