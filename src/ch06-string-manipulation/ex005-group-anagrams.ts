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
export function groupAnagrams(strs: string[]): string[][] {
    const anagramsMap = new Map<string, string[]>()
    strs.forEach((str) => {
        const sortedStr = str.split('').sort().join('')
        anagramsMap.set(sortedStr, [...(anagramsMap.get(sortedStr) ?? []), str])
    })
    return [...anagramsMap.values()]
}


export function groupAnagrams2(strs: string[]): string[][] {
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

// 기존 테스트 케이스에 추가
function generateTestCases(): { strs: string[], expected: string[][] }[] {
    const testCases: { strs: string[], expected: string[][] }[] = [];
    
    // ... 기존 테스트 케이스들 ...

    // 경계값 테스트 케이스 추가
    // 1. 최소 길이 (1개)
    testCases.push({
        strs: ["a"],
        expected: [["a"]]
    });

    // 2. 최대 길이 (104개)
    const maxLengthArray = Array.from({ length: 104 }, (_, i) => 
        String.fromCharCode(97 + (i % 26)).repeat(10)
    );
    testCases.push({
        strs: maxLengthArray,
        expected: [] // 실행 시 계산
    });

    // 3. 빈 문자열 (0 길이)
    testCases.push({
        strs: [""],
        expected: [[""]]
    });

    // 4. 최대 길이 문자열 (100자)
    const maxLengthStr = "a".repeat(100);
    testCases.push({
        strs: [maxLengthStr],
        expected: [[maxLengthStr]]
    });

    // 5. 모든 소문자 알파벳 사용
    testCases.push({
        strs: ["abcdefghijklmnopqrstuvwxyz"],
        expected: [["abcdefghijklmnopqrstuvwxyz"]]
    });

    // 6. 동일한 문자 반복
    testCases.push({
        strs: ["a".repeat(100)],
        expected: [["a".repeat(100)]]
    });

    // 7. 최대 길이의 애너그램 그룹
    const anagramGroup = Array.from({ length: 50 }, () => 
        "abcdefghijklmnopqrstuvwxyz".split('').sort(() => Math.random() - 0.5).join('')
    );
    testCases.push({
        strs: anagramGroup,
        expected: [] // 실행 시 계산
    });

    // 8. 모든 가능한 길이의 문자열
    testCases.push({
        strs: Array.from({ length: 101 }, (_, i) => "a".repeat(i)),
        expected: [] // 실행 시 계산
    });

    // 9. 최대 길이의 서로 다른 애너그램
    const differentAnagrams = Array.from({ length: 104 }, (_, i) => 
        String.fromCharCode(97 + (i % 26)).repeat(100)
    );
    testCases.push({
        strs: differentAnagrams,
        expected: [] // 실행 시 계산
    });

    // 10. 최대 길이의 동일한 애너그램
    const sameAnagram = "a".repeat(100);
    testCases.push({
        strs: Array(104).fill(sameAnagram),
        expected: [Array(104).fill(sameAnagram)]
    });

    // 11. 최소 길이의 서로 다른 문자열
    testCases.push({
        strs: Array.from({ length: 104 }, (_, i) => 
            String.fromCharCode(97 + (i % 26))
        ),
        expected: [] // 실행 시 계산
    });

    // 12. 최대 길이의 회문 애너그램
    const palindrome = "a".repeat(50) + "b".repeat(50);
    testCases.push({
        strs: [palindrome, palindrome.split('').reverse().join('')],
        expected: [[palindrome, palindrome.split('').reverse().join('')]]
    });

    // 13. 최대 길이의 순환 애너그램
    const cyclicAnagram = "abcdefghijklmnopqrstuvwxyz".repeat(4);
    testCases.push({
        strs: [cyclicAnagram, cyclicAnagram.slice(1) + cyclicAnagram[0]],
        expected: [] // 실행 시 계산
    });

    // 14. 최대 길이의 중복 문자
    testCases.push({
        strs: ["a".repeat(100), "a".repeat(100)],
        expected: [["a".repeat(100), "a".repeat(100)]]
    });

    // 15. 최대 길이의 서로 다른 회문
    const palindromes = Array.from({ length: 104 }, (_, i) => 
        "a".repeat(50) + String.fromCharCode(97 + (i % 26)) + "a".repeat(50)
    );
    testCases.push({
        strs: palindromes,
        expected: [] // 실행 시 계산
    });

    // 16. 최대 길이의 순차적 애너그램
    const sequentialAnagrams = Array.from({ length: 104 }, (_, i) => 
        String.fromCharCode(97 + (i % 26)).repeat(100)
    );
    testCases.push({
        strs: sequentialAnagrams,
        expected: [] // 실행 시 계산
    });

    // 17. 최대 길이의 랜덤 애너그램
    const randomAnagrams = Array.from({ length: 104 }, () => 
        Array.from({ length: 100 }, () => 
            String.fromCharCode(97 + Math.floor(Math.random() * 26))
        ).join('')
    );
    testCases.push({
        strs: randomAnagrams,
        expected: [] // 실행 시 계산
    });

    // 18. 최대 길이의 대칭 애너그램
    const symmetricAnagram = "a".repeat(50) + "b".repeat(50);
    testCases.push({
        strs: [symmetricAnagram, symmetricAnagram.split('').reverse().join('')],
        expected: [[symmetricAnagram, symmetricAnagram.split('').reverse().join('')]]
    });

    // 19. 최대 길이의 반복 패턴
    const patternAnagram = "abc".repeat(33) + "d";
    testCases.push({
        strs: [patternAnagram, patternAnagram.split('').sort().join('')],
        expected: [] // 실행 시 계산
    });

    // 20. 최대 길이의 혼합 패턴
    const mixedPattern = Array.from({ length: 104 }, (_, i) => 
        String.fromCharCode(97 + (i % 26)).repeat(100)
    );
    testCases.push({
        strs: mixedPattern,
        expected: [] // 실행 시 계산
    });

    return testCases;
}
