import {
    mergeTwoLists,
    mergeTwoListsRecursive,
} from '@/src/ch08-linked-list/ex14-merge-two-sorted-lists'
import { ListNode } from '@/src/util/ListNode'

describe('ex14-merge-two-sorted-lists', () => {
    const cases: [[number[], number[]], number[]][] = [
        [
            [
                [1, 2, 4],
                [1, 3, 4],
            ],
            [1, 1, 2, 3, 4, 4],
        ],
        [[[], []], []],
        [[[], [0]], [0]],
        [
            [
                [1, 2, 4],
                [1, 3, 4],
            ],
            [1, 1, 2, 3, 4, 4],
        ],
        [
            [
                [-100, -50, 0, 50, 100],
                [-100, -50, 0, 50, 100],
            ],
            [-100, -100, -50, -50, 0, 0, 50, 50, 100, 100],
        ],
        [
            [[0], [0]],
            [0, 0],
        ],
        [
            [
                [1, 3, 5],
                [2, 4, 6],
            ],
            [1, 2, 3, 4, 5, 6],
        ],
        [
            [
                [-5, 0, 5],
                [-3, 2, 7],
            ],
            [-5, -3, 0, 2, 5, 7],
        ],
        [
            [[1, 2, 3], []],
            [1, 2, 3],
        ],
        [
            [[], [4, 5, 6]],
            [4, 5, 6],
        ],
        [
            [
                [0, 1, 2, 3],
                [-2, -1, 0],
            ],
            [-2, -1, 0, 0, 1, 2, 3],
        ],
        [
            [
                [-10, -5, 0, 5, 10],
                [1, 2, 3, 4, 5],
            ],
            [-10, -5, 0, 1, 2, 3, 4, 5, 5, 10],
        ],
        [
            [[100], [100]],
            [100, 100],
        ],
        [
            [
                [50, 51, 52],
                [50, 51, 52],
            ],
            [50, 50, 51, 51, 52, 52],
        ],
        [
            [[-100], [100]],
            [-100, 100],
        ],
        [
            [
                [1, 2],
                [3, 4],
            ],
            [1, 2, 3, 4],
        ],
        [
            [
                [1, 3, 5, 7],
                [2, 4, 6, 8],
            ],
            [1, 2, 3, 4, 5, 6, 7, 8],
        ],
        [
            [
                [-50, -25, 0],
                [-75, -50, -25, 0],
            ],
            [-75, -50, -50, -25, -25, 0, 0],
        ],
        [
            [
                [0, 0, 0],
                [0, 0, 0],
            ],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [
                [-10, -9, -8],
                [8, 9, 10],
            ],
            [-10, -9, -8, 8, 9, 10],
        ],
        [
            [
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10],
            ],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ],
        [
            [
                [0, 5, 10, 15],
                [2, 4, 6, 8],
            ],
            [0, 2, 4, 5, 6, 8, 10, 15],
        ],
        [[[], []], []],
        [
            [[1], [-1]],
            [-1, 1],
        ],
    ]
    describe('mergeTwoLists', () => {
        test.each(cases)(
            '%s -> %s'.slice(0, 30),
            ([list1, list2], expected) => {
                const head1 = ListNode.generateList<number>(list1)
                const head2 = ListNode.generateList<number>(list2)
                expect(
                    ListNode.toArray(mergeTwoLists(head1, head2))
                ).toStrictEqual(expected)
            }
        )
    })

    describe('mergeTwoListsRecursive', () => {
        test.each(cases)(
            '%s -> %s'.slice(0, 30),
            ([list1, list2], expected) => {
                const head1 = ListNode.generateList<number>(list1)
                const head2 = ListNode.generateList<number>(list2)
                expect(
                    ListNode.toArray(mergeTwoListsRecursive(head1, head2))
                ).toStrictEqual(expected)
            }
        )
    })
})
