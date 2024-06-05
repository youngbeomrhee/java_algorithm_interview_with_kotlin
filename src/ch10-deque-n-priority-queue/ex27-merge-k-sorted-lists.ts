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
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    class PriorityQueue<T> {
        data: Array<T>
        compare: (a: T, b: T) => number

        constructor(compare: (a: T, b: T) => number) {
            this.data = []
            this.compare = compare
        }

        push(item: T, priority: number) {
            this.data.push(item)
            this.data.sort((a, b) => this.compare(a, b))
        }

        pop() {
            return this.data.shift()
        }

        peek() {
            return this.data[0]
        }

        isEmpty() {
            return this.data.length === 0
        }
    }

    const compare = (a: ListNode, b: ListNode) => a.val - b.val
    const pq = new PriorityQueue<ListNode>(compare)

    for (const list of lists) {
        if (list) {
            pq.push(list, list.val)
        }
    }

    const dummy = new ListNode()
    let tail = dummy

    while (!pq.isEmpty()) {
        const node = pq.pop()
        if (node) {
            tail.next = node
            tail = tail.next

            if (node.next) {
                pq.push(node.next, node.next.val)
            }
        }
    }

    return dummy.next
}

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}
