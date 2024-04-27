import {
    longestPalindrome,
    longestPalindrome2,
} from '@/src/ch06-string-manipulation/ex006-logest-palindrome-substring'

describe('ex006-logest-palindrome-substring', () => {
    const cases = [
        ['babad', 'bab'],
        ['cbbd', 'bb'],
        ['aacabdkacaa', 'aca'],
        ['racecar', 'racecar'],
        ['a', 'a'],
        ['amoreroma', 'amoreroma'],
        ['refer', 'refer'],
        ['banana', 'anana'],
        ['civic', 'civic'],
        ['level', 'level'],
        ['rotor', 'rotor'],
        ['noon', 'noon'],
        ['madam', 'madam'],
        ['aaabbbaaa', 'aaabbbaaa'],
        ['abcddcba', 'abcddcba'],
        ['neveroddoreven', 'neveroddoreven'],
        ['abccba', 'abccba'],
        ['radar', 'radar'],
        ['ablewasiereisawelba', 'ablewasiereisawelba'],
        ['abcdefghgfedcba', 'abcdefghgfedcba'],
    ]

    describe('longestPalindrome', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (str, expected) => {
            expect(longestPalindrome(str)).toBe(expected)
        })
    })

    describe('longestPalindrome2', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (str, expected) => {
            expect(longestPalindrome2(str)).toBe(expected)
        })
    })
})
