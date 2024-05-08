import { trap, trap2 } from '@/src/ch07-arrays/ex008-trapping-rain-water'

describe('ex008-trapping-rain-water', () => {
    const cases: [number[], number][] = [
        [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], 6],
        [[4, 2, 0, 3, 2, 5], 9],
        [[1, 0, 1], 1],
        [[2, 1, 0, 1, 3], 4],
        [[0, 1, 2, 1, 0], 0],
        [[5, 4, 3, 2, 1, 2, 3, 4, 5], 16],
        [[0, 0, 0, 0, 0], 0],
        [[10, 1, 10], 9],
        [[3, 0, 0, 2, 0, 4], 10],
        [[0, 5, 0, 0, 5, 0, 0, 5, 0, 5], 25],
        [[100000, 0, 100000], 100000],
        [[1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1], 0],
        [[0, 10000, 0], 0],
        [[100, 0, 50, 0, 100], 250],
        [[0, 100, 0, 100, 0], 100],
        [[100, 99, 98, 100], 3],
        [[100, 0, 100, 0, 100, 0, 100], 300],
        [[1, 7, 5, 9, 6, 7, 4, 8, 5], 9],
        [[2, 1, 2, 1, 2, 1, 2, 1, 2], 4],
        [[0, 100000, 0, 100000, 0, 100000, 0], 200000],
    ]
    describe('trap', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (heights, expected) => {
            expect(trap(heights)).toStrictEqual(expected)
        })
    })
    describe('trap2', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (heights, expected) => {
            expect(trap2(heights)).toStrictEqual(expected)
        })
    })
})
