import {
    reverseString,
    reverseString2,
} from '@/src/ch06-string-manipulation/ex002-reverse-string'

describe('ex002-reverse-string', () => {
    const cases = [
        [
            ['h', 'e', 'l', 'l', 'o'],
            ['o', 'l', 'l', 'e', 'h'],
        ],
        [
            ['H', 'a', 'n', 'n', 'a', 'h'],
            ['h', 'a', 'n', 'n', 'a', 'H'],
        ],
    ]

    describe('reverseString', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (strs, expected) => {
            reverseString(strs)
            expect(strs).toStrictEqual(expected)
        })
    })

    describe('reverseString2', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (strs, expected) => {
            reverseString2(strs)
            setTimeout(() => {
                expect(strs).toStrictEqual(expected)
            }, 0)
        })
    })
})
