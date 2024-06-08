import { dailyTemperatures } from '@/src/ch09-stack-queue/ex022-daily-temperatures'

describe('ex022-daily-temperatures', () => {
    const cases = [
        [
            [23, 24, 25, 21, 19, 22, 26, 23],
            [1, 1, 4, 2, 1, 1, 0, 0],
        ],
        // [
        //     [73, 74, 75, 71, 69, 72, 76, 73],
        //     [1, 1, 4, 2, 1, 1, 0, 0],
        // ],
    ]
    describe('dailyTemperatures', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (input, expected) => {
            expect(dailyTemperatures(input)).toStrictEqual(expected)
        })
    })
})
