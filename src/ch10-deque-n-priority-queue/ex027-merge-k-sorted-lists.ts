import { ListNode } from '../util/ListNode'
import { PriorityQueue } from '../util/PriorityQueue'

/*
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

 

Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []
 

Constraints:

k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-104 <= lists[i][j] <= 10^4
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 10^4.

use priority queue
*/
function mergeKLists(
    lists: Array<ListNode<number> | null>
): ListNode<number> | null {
    const compare = (a: ListNode<number>, b: ListNode<number>) => a.val - b.val
    const pq = new PriorityQueue<ListNode<number>>(compare)

    for (const list of lists) {
        if (list) {
            pq.push(list)
        }
    }

    const dummy = new ListNode<number>(-1)
    let tail = dummy

    while (!pq.isEmpty()) {
        const node = pq.pop()
        if (node) {
            tail.next = node
            tail = tail.next

            if (node.next) {
                pq.push(node.next)
            }
        }
    }

    return dummy.next
}
