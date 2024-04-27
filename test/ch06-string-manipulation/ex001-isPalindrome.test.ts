import {
    isPalindrome,
    isPalindrome2,
    isPalindrome3,
} from '@/src/ch06-string-manipulation/ex001-isPalindrome'

describe('ex001-isPalindrome', () => {
    type Cases<INPUT, EXPECTED> = [INPUT, EXPECTED][]
    const cases: Cases<string, boolean> = [
        ['A man, a plan, a canal: Panama', true],
        ['race a car', false],
        [' ', true],
        ['A'.repeat(1000) + 'B' + 'A'.repeat(1000), true],
        ['A'.repeat(2000), true],
        ['X'.repeat(999) + 'Y' + 'X'.repeat(999), true],
        ['No lemon, no melon', true],
        ['Was it a car or a cat I saw?', true],
        ["No 'x' in Nixon", true],
        ['Eva, can I see bees in a cave?', true],
        ["Madam In Eden, I'm Adam", true],
        ['Never a foot too far, even.', true],
        ['Do geese see God?', true],
        ['Mr. Owl ate my metal worm', true],
        ["Go hang a salami, I'm a lasagna hog.", true],
        ['A Santa lived as a devil at NASA.', true],
        ["Dammit, I'm mad!", true],
        ['Was it a rat I saw?', true],
        ['Step on no pets', true],
        ['Top spot', true],
        ['02/02/2020', true],
        ['Able was I, I saw Elba', true],
        ["A Toyota's a Toyota", true],
        ['A Santa at NASA', true],
        ['No lemon, no melon', true],
        ['Evil is a name of a foeman, as I live', true],
        ['Satan oscillate my metallic sonatas', true],
        ['A Toyota. Race fast, safe car. A Toyota', true],
        ['Cigar? Toss it in a can. It is so tragic', true],
        ['Dennis and Edna sinned', true],
        [
            'Dennis, Nell, Edna, Leon, Nedra, Anita, Rolf, Nora, Alice, Carol, Leo, Jane, Reed, Dena, Dale, Basil, Rae, Penny, Lana, Dave, Denny, Lena, Ida, Bernadette, Ben, Ray, Lila, Nina, Jo, Ira, Mara, Sara, Mario, Jan, Ina, Lily, Arne, Bette, Dan, Reba, Diane, Lynn, Ed, Eva, Dana, Lynne, Pearl, Isabel, Ada, Ned, Dee, Rena, Joel, Lora, Cecil, Aaron, Flora, Tina, Arden, Noel, and Ellen sinned.',
            true,
        ],
        // ['A'.repeat(2 * Math.pow(10, 5)), true],
    ]
    const timeTables = []

    describe('isPalindrome1', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (str, expected) => {
            expect(isPalindrome(str)).toBe(expected)
        })
    })

    describe('isPalindrome2', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (str, expected) => {
            expect(isPalindrome2(str)).toBe(expected)
        })
    })

    describe('isPalindrome3', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (str, expected) => {
            expect(isPalindrome3(str)).toBe(expected)
        })
    })

    describe('isPalindrome performance comparison', () => {
        const performanceTable: {
            str: string
            caseLength: number
            palindrome1: number
            palindrome2: number
            palindrome3: number
            best: string
        }[] = []
        test.each(cases)('%s'.slice(0, 10), (str, expected) => {
            let startTime, endTime

            const startTime1 = performance.now()
            const result1 = isPalindrome(str)
            const endTime1 = performance.now()
            const time1 = endTime1 - startTime1

            const startTime2 = performance.now()
            const result2 = isPalindrome2(str)
            const endTime2 = performance.now()
            const time2 = endTime2 - startTime2

            const startTime3 = performance.now()
            const result3 = isPalindrome3(str)
            const endTime3 = performance.now()
            const time3 = endTime3 - startTime3

            let best
            switch (Math.min(time1, time2, time3)) {
                case time1:
                    best = 'palindrome1'
                    break
                case time2:
                    best = 'palindrome2'
                    break
                default:
                    best = 'palindrome3'
            }

            performanceTable.push({
                str: str.slice(0, 10),
                caseLength: str.length,
                palindrome1: endTime1 - startTime1,
                palindrome2: endTime2 - startTime2,
                palindrome3: endTime3 - startTime3,
                best,
            })
        })
        afterAll(() => {
            console.table(performanceTable)
        })
    })
})
