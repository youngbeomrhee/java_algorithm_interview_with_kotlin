import { lengthOfLongestSubstring } from '@/src/ch11-hash-table/ex032-longest-substring-without-repeating-characters'

describe('ex032-longest-substring-without-repeating-characters', () => {
    // 20개의 test case
    const cases: [string, number][] = [
        ['abcabcbb', 3],
        ['bbbbb', 1],
        ['pwwkew', 3],
        ['abba', 2],
        ['a', 1],
        ['abcdef', 6],
        ['aab', 2],
        ['dvdf', 3],
        ['anviaj', 5],
        ['tmmzuxt', 5],
        ['', 0],
        ['au', 2],
        ['aabacbebebe', 4],
        ['abccabb', 3],
        ['abcaefgh', 7],
        ['abcdefgh', 8],
        ['abcbcadefgh', 8],
        ['abcdefgghijk', 7],
        ['abcdefghijklmnopqrstuvwxyza', 26],
        ['a'.repeat(50000), 1], // 경계값 테스트 (최대 길이 문자열)
    ]
    describe('lengthOfLongestSubstring', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (input, expected) => {
            expect(lengthOfLongestSubstring(input)).toBe(expected)
        })
    })
})
