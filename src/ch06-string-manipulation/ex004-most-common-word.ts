/*
    Given a string paragraph and a string array of the banned words banned, return the most frequent word that is not banned. It is guaranteed there is at least one word that is not banned, and that the answer is unique.

    The words in paragraph are case-insensitive and the answer should be returned in lowercase.



    Example 1:

    Input: paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]
    Output: "ball"
    Explanation:
    "hit" occurs 3 times, but it is a banned word.
    "ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph.
    Note that words in the paragraph are not case sensitive,
    that punctuation is ignored (even if adjacent to words, such as "ball,"),
    and that "hit" isn't the answer even though it occurs more because it is banned.
    Example 2:

    Input: paragraph = "a.", banned = []
    Output: "a"


    Constraints:

    1 <= paragraph.length <= 1000
    paragraph consists of English letters, space ' ', or one of the symbols: "!?',;.".
    0 <= banned.length <= 100
    1 <= banned[i].length <= 10
    banned[i] consists of only lowercase English letters.

    - 가장 많은 빈도수의 단어 찾기
    - paragraph는 case-insensitive, banned는 lowercase, 정답도 lowercase
*/
// 총 시간복잡도: O(2n + m + k)
// - n: paragraph의 길이
// - m: banned 배열의 길이
// - k: words 배열의 길이
export function mostCommonWord(paragraph: string, banned: string[]): string {

    // TC: O(2n), n은 paragraph의 길이
    // - toLowerCase(): O(n)
    // - match(): O(n)

    // SC: O(n) - n은 paragraph의 길이
    // - toLowerCase() 결과: O(n)
    // - match() 결과 배열: O(n)
    const words = paragraph.toLowerCase().match(/[a-zA-Z]+/g) ?? []
    // const words = paragraph.replace(/\W+/g, ' ').toLowerCase().split(' ')    // 이렇게도 처리 가능하지만 _ 는 거르지 못한다

    // TC: O(m), m은 banned 배열의 길이
    // - Set 생성: O(m)

    // SC: O(m) - m은 banned 배열의 길이
    // - Set에 저장된 문자열들: O(m)
    const bannedSet = new Set(banned) // set을 사용하여 검색성능을 O(n)에서 O(1)로 개선

    // TC: O(k), k는 words 배열의 길이
    // - Map 생성: O(1)
    // - forEach: O(k)
    // - Map.set/get: O(1) per operation
    const frequencyMap = new Map<string, number>()
    words.forEach((word) => {
        frequencyMap.set(word, (frequencyMap.get(word) ?? 0) + 1)
    })

    // TC: O(k), k는 words 배열의 길이
    // - Map 생성: O(1)
    // - forEach: O(k)
    // - Map.set/get: O(1) per operation
    let maxFrequency = 0
    let maxFrequentWord: string = ''

    // TC: O(k), k는 words 배열의 길이
    // - forEach: O(k)
    // - Set.has: O(1) per operation
    frequencyMap.forEach((frequency, word) => {
        if (frequency > maxFrequency && !bannedSet.has(word)) {
            maxFrequency = frequency
            maxFrequentWord = word
        }
    })
    return maxFrequentWord
}

function mostCommonWord2(paragraph: string, banned: string[]): string {
    const words = paragraph
        .replace(/[!?',;.]/g, ' ')
        .replace(/\s\s/g, ' ')
        .trim()
        .toLowerCase()
        .split(' ')

    const frequencies = words.reduce((accum, temp) => {
        accum[temp] = (accum[temp] ?? 0) + 1
        return accum
    }, {})

    let maxWord, maxFeq = 0

    for (let word in frequencies) {
        if (banned.includes(word)) {
            continue
        }
        const freq = frequencies[word]
        if (freq > maxFeq) {
            maxFeq = freq
            maxWord = word
        }
    }
    return maxWord
};
