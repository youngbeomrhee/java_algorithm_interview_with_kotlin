import {
    removeDuplicateLetters,
    removeDuplicateLetters2,
} from '@/src/ch09-stack-queue/ex021-remove-duplicate-letters'

describe('ex021-remove-duplicate-letters', () => {
    const cases = [
        ['bcabc', 'abc'],
        ['cbacdcbc', 'acdb'],
    ]
    describe('removeDuplicateLetters', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (input, expected) => {
            expect(removeDuplicateLetters(input)).toBe(expected)
        })
    })
    describe('removeDuplicateLetters2', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (input, expected) => {
            expect(removeDuplicateLetters2(input)).toBe(expected)
        })
    })
})
