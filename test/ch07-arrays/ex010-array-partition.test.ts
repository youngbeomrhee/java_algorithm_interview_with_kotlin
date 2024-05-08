import { arrayPairSum } from '@/src/ch07-arrays/ex010-array-partition'

describe('ex010-array-partition', () => {
    const cases: [number[], number][] = [
        [[1, 4, 3, 2], 4],
        [[6, 2, 6, 5, 1, 2], 9],
    ]
    describe('case를 반복하며 테스트 수행', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (input, expected) => {
            expect(arrayPairSum(input)).toBe(expected)
        })
    })
})
