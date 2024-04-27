import { mostCommonWord } from '@/src/ch06-string-manipulation/ex004-most-common-word'

describe('ex004-most-common-word', () => {
    const cases: [[string, string[]], string][] = [
        [
            [
                'Bob hit a ball, the hit BALL flew far after it was hit.',
                ['hit'],
            ],
            'ball',
        ],
        [['a.', []], 'a'],
    ]

    describe('', () => {
        test.each(cases)(
            '%s -> %s'.slice(0, 30),
            ([paragraph, banned], expected) => {
                expect(mostCommonWord(paragraph, banned)).toStrictEqual(
                    expected
                )
            }
        )
    })
})
