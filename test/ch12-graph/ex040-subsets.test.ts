import { subsets } from '@/src/ch12-graph/ex040-subsets'

describe('subsets', () => {
    const cases: [number[], number[][]][] = [
        [
            [1, 2, 3],
            [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
        ],
        [[0], [[], [0]]],
    ]
    cases.forEach(([nums, expected]) => {
        it(`should return ${expected} for nums: ${nums}`, () => {
            const result = subsets(nums)
            console.log(result)

            const sortedResult = result.map((arr) => arr.sort()).sort()
            const sortedExpected = expected.map((arr) => arr.sort()).sort()
            expect(sortedResult).toStrictEqual(sortedExpected)
        })
    })
})
