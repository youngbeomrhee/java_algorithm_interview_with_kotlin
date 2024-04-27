import { reorderLogFiles } from '@/src/ch06-string-manipulation/ex003-reorder-data-in-log-files'
import { reorderLogFiles2 } from '@/src/ch06-string-manipulation/ex003-reorder-data-in-log-files2'

describe('ex003-reorder-data-in-log-files.test', () => {
    const cases = [
        [
            [
                'dig1 8 1 5 1',
                'let1 art zero can',
                'dig2 3 6',
                'let2 own kit dig',
                'let3 art zero',
            ],
            [
                'let3 art zero',
                'let1 art zero can',
                'let2 own kit dig',
                'dig1 8 1 5 1',
                'dig2 3 6',
            ],
        ],
        [
            [
                'a1 9 2 3 1',
                'g1 act car',
                'zo4 4 7',
                'ab1 off key dog',
                'a8 act zoo',
            ],
            [
                'g1 act car',
                'a8 act zoo',
                'ab1 off key dog',
                'a1 9 2 3 1',
                'zo4 4 7',
            ],
        ],
    ]

    describe('', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (input, expected) => {
            expect(reorderLogFiles(input)).toStrictEqual(expected)
        })
    })
    describe('', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (input, expected) => {
            expect(reorderLogFiles2(input)).toStrictEqual(expected)
        })
    })
})
