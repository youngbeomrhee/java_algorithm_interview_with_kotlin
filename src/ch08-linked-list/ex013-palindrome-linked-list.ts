import { ListNode } from '../util/ListNode'
/*
Given the head of a singly linked list, return true if it is a 
palindrome or false otherwise.

Example 1:

Input: head = [1,2,2,1]
Output: true
Example 2:

Input: head = [1,2]
Output: false

## Constraints:

The number of nodes in the list is in the range [1, 10^5].
0 <= Node.val <= 9
 
Follow up: Could you do it in O(n) time and O(1) space?
*/
export function isPalindrome(head: ListNode<number> | null): boolean {
    // early return
    // head가 비어있는 경우
    if (head === null) {
        return false
    }
    // head가 종단 node인 경우
    if (head.next === null) {
        return true
    }

    const valStack: number[] = [head.val]
    let runnerHead = head

    while (
        head.next !== null &&
        runnerHead.next !== null &&
        runnerHead.next.next !== null
    ) {
        valStack.push(head.next.val)
        head = head.next
        runnerHead = runnerHead.next.next
    }

    // 홀수 케이스
    if (runnerHead.next === null) {
        valStack.pop()
    }

    while (valStack.length > 0 && head.next !== null) {
        if (valStack.pop() !== head.next.val) {
            return false
        }
        head = head.next
    }
    return true
}
