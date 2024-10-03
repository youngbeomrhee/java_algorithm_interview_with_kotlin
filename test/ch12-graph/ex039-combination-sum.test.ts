import { combinationSum } from '@/src/ch12-graph/ex039-combination-sum'

describe('ex039-combination-sum', () => {
    const cases: [number[], number, number[][]][] = [
        [[2, 3, 6, 7], 7, [[2, 2, 3], [7]]],
        [
            [2, 3, 5],
            8,
            [
                [2, 2, 2, 2],
                [2, 3, 3],
                [3, 5],
            ],
        ],
        [[2], 1, []],
        [[1], 2, [[1, 1]]],
    ]
    cases.forEach(([candidates, target, expected]) => {
        it(`should return ${expected} for candidates: ${candidates} and target: ${target}`, () => {
            expect(combinationSum(candidates, target)).toStrictEqual(expected)
        })
    })
})
