import { swapPairs } from '@/src/ch08-linked-list/ex017-swap-nodes-in-pairs'
import { ListNode } from '@/src/util/ListNode'

describe('ex017-swap-nodes-in-pairs', () => {
    const cases: [number[], number[]][] = [
        [
            [1, 2, 3, 4],
            [2, 1, 4, 3],
        ],
    ]
    describe('swapPairs', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (list, expected) => {
            const head = ListNode.generateList<number>(list)
            expect(ListNode.toArray(swapPairs(head))).toStrictEqual(expected)
        })
    })
})
