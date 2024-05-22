import {
    reverseList,
    reverseListRecursive,
} from '@/src/ch08-linked-list/ex15-reverse-linked-list'
import { ListNode } from '@/src/util/ListNode'

describe('ex15-reverse-linked-list', () => {
    const cases: [number[], number[]][] = [
        [
            [1, 2, 3, 4, 5],
            [5, 4, 3, 2, 1],
        ],
        [
            [-5000, -2500, 0, 2500, 5000],
            [5000, 2500, 0, -2500, -5000],
        ],
        [[0], [0]],
        [[], []],
        [
            [1, 2],
            [2, 1],
        ],
        [[5000], [5000]],
        [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
        ],
        [
            [-1, -2, -3, -4, -5],
            [-5, -4, -3, -2, -1],
        ],
        [
            [0, 1, 2, 3, 4],
            [4, 3, 2, 1, 0],
        ],
        [
            [2, 4, 6, 8, 10],
            [10, 8, 6, 4, 2],
        ],
        [
            [-1, 0, 1],
            [1, 0, -1],
        ],
        [
            [100, 200, 300, 400],
            [400, 300, 200, 100],
        ],
        [
            [5, 10, 15, 20, 25, 30],
            [30, 25, 20, 15, 10, 5],
        ],
        [
            [-5000, 0, 5000],
            [5000, 0, -5000],
        ],
        [
            [10, 20, 30],
            [30, 20, 10],
        ],
        [
            [-3, -2, -1, 0, 1, 2, 3],
            [3, 2, 1, 0, -1, -2, -3],
        ],
        [
            [1, 3, 5, 7, 9],
            [9, 7, 5, 3, 1],
        ],
        [
            [-1000, 1000, -2000, 2000],
            [2000, -2000, 1000, -1000],
        ],
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
        [[1], [1]],
    ]
    describe('reverseList', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (list, expected) => {
            const head = ListNode.generateList<number>(list)
            expect(ListNode.toArray(reverseList(head))).toStrictEqual(expected)
        })
    })
    describe('reverseListRecursive', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (list, expected) => {
            const head = ListNode.generateList<number>(list)
            expect(ListNode.toArray(reverseListRecursive(head))).toStrictEqual(
                expected
            )
        })
    })
})
