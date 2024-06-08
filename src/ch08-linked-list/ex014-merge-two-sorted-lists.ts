/*
You are given the heads of two sorted linked lists list1 and list2.
Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
Return the head of the merged linked list.

 
Example 1:


Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: list1 = [], list2 = []
Output: []
Example 3:

Input: list1 = [], list2 = [0]
Output: [0]
 

Constraints:

The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.
*/

import { ListNode } from '../util/ListNode'

export function mergeTwoLists<T>(
    list1: ListNode<T> | null,
    list2: ListNode<T> | null
): ListNode<T> | null {
    // early return
    if (list1 === null || list2 === null) {
        return list1 ?? list2
    }

    let runner1: ListNode<T> | null = list1,
        runner2: ListNode<T> | null = list2
    let mergedRunner
    if (runner1.val <= runner2.val) {
        mergedRunner = runner1
        runner1 = runner1.next
    } else {
        mergedRunner = runner2
        runner2 = runner2.next
    }
    const mergedHeader = mergedRunner

    while (runner1 || runner2) {
        if (runner1 === null) {
            mergedRunner.next = runner2
            break
        }
        if (runner2 === null) {
            mergedRunner.next = runner1
            break
        }
        if (runner1.val <= runner2.val) {
            mergedRunner.next = runner1
            runner1 = runner1.next
        } else {
            mergedRunner.next = runner2
            runner2 = runner2.next
        }
        mergedRunner = mergedRunner.next
    }
    return mergedHeader
}

export function mergeTwoListsRecursive<T>(
    list1: ListNode<T> | null,
    list2: ListNode<T> | null
): ListNode<T> | null {
    if (list1 === null) {
        return list2
    }
    if (list2 === null) {
        return list1
    }
    if (list1.val <= list2.val) {
        list1.next = mergeTwoListsRecursive(list1.next, list2)
        return list1
    } else {
        list2.next = mergeTwoListsRecursive(list1, list2.next)
        return list2
    }
}
