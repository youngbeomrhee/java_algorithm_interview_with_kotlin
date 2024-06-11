/*
Given a string s, find the length of the longest 
substring
 without repeating characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 

Constraints:

0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.
*/
// Time Complexity: O(n), Space Complexity: O(n)
export function lengthOfLongestSubstring(s: string): number {
    const map = new Map<string, number>()
    let startIndex = 0
    let maxLength = 0
    let endIndex = 0
    // TC: O(n)
    for (; endIndex < s.length; endIndex++) {
        const c = s[endIndex]
        // 동일한 문자가 이미 존재했고, 저장된 index가 startIndex보다 크거나 같다면
        if (map.has(c) && map.get(c)! >= startIndex) {
            startIndex = map.get(c)! + 1
        }
        map.set(c, endIndex) // SC: O(n)
        maxLength = Math.max(maxLength, endIndex - startIndex + 1)
    }
    return maxLength
}
