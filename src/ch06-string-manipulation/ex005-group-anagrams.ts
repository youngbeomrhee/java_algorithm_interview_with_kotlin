/*
    Given an array of strings strs, group the anagrams together. You can return the answer in any order.

    An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

    

    Example 1:

    Input: strs = ["eat","tea","tan","ate","nat","bat"]
    Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
    Example 2:

    Input: strs = [""]
    Output: [[""]]
    Example 3:

    Input: strs = ["a"]
    Output: [["a"]]
    

    Constraints:

    1 <= strs.length <= 104
    0 <= strs[i].length <= 100
    strs[i] consists of lowercase English letters.
*/
/*
    TC: O(n) + O(k) + O(k log k) + O(k) + O(n) = O(n)
    SC: O(n) + O(n) + O(n) = O(n)
*/
function groupAnagrams(strs: string[]): string[][] {
    const anagramsMap = new Map<string, string[]>()
    // TC: O(n) - n은 strs 배열의 길이
    // SC: O(n)
    strs.forEach((str) => {
        // TC: O(k) + O(k log k) + O(k) - k는 str의 길이
        const sortedStr = str.split('').sort().join('')
        // SC: O(n)
        const values = anagramsMap.get(sortedStr) ?? []
        values.push(str)
        anagramsMap.set(sortedStr, values)
    })
    // SC: O(n)
    // TC: O(n)
    return [...anagramsMap.values()]
}
