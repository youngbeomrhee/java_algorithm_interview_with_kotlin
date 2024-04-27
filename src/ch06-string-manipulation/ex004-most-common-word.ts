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
export function mostCommonWord(paragraph: string, banned: string[]): string {
    const words = paragraph.toLowerCase().match(/[a-zA-Z]+/g) ?? []
    // const words = paragraph.replace(/\W+/g, ' ').toLowerCase().split(' ')    // 이렇게도 처리 가능하지만 _ 는 거르지 못한다
    const frequencyMap = new Map<string, number>()
    words.forEach((word) => {
        frequencyMap.set(word, (frequencyMap.get(word) ?? 0) + 1)
    })

    let maxFrequency = 0
    let maxFrequentWord: string = ''

    frequencyMap.forEach((frequency, word) => {
        if (frequency > maxFrequency && banned.indexOf(word) === -1) {
            maxFrequency = frequency
            maxFrequentWord = word
        }
    })
    return maxFrequentWord
}
