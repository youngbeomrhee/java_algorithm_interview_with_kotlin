/*
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

 

Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false

 

Constraints:

1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.
 

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
*/
/*
    TC: O(n log n)
    SC: O(n)
*/
function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false
    }
    return s.split('').sort().join() === t.split('').sort().join()
}

/*
    TC: O(2n) -> O(n)
    SC: O(n)
*/
function isAnagram2(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false
    }
    const sFreq: Record<string, number> = {}
    const tFreq: Record<string, number> = {}

    for (let i = 0; i < s.length; i++) {
        sFreq[s[i]] = (sFreq[s[i]] ?? 0) + 1
        tFreq[t[i]] = (tFreq[t[i]] ?? 0) + 1
    }

    for (let key in sFreq) {
        if (sFreq[key] !== tFreq[key]) {
            return false
        }
    }

    return true
}

/*
    TC: O(2n)
    SC: O(65535)
*/
function isAnagram3(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false
    }
    const record: number[] = new Array(65535).fill(0)
    for (let i = 0; i < s.length; i++) {
        record[s.charCodeAt(i)]++
        record[t.charCodeAt(i)]--
    }
    return record.every((v) => v === 0)
}
