/*
    You are given an array of logs. Each log is a space-delimited string of words, where the first word is the identifier.

    There are two types of logs:

    Letter-logs: All words (except the identifier) consist of lowercase English letters.
    Digit-logs: All words (except the identifier) consist of digits.
    Reorder these logs so that:

    The letter-logs come before all digit-logs.
    The letter-logs are sorted lexicographically by their contents. If their contents are the same, then sort them lexicographically by their identifiers.
    The digit-logs maintain their relative ordering.
    Return the final order of the logs.

    

    Example 1:

    Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
    Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
    Explanation:
    The letter-log contents are all different, so their ordering is "art can", "art zero", "own kit dig".
    The digit-logs have a relative order of "dig1 8 1 5 1", "dig2 3 6".
    Example 2:

    Input: logs = ["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"]
    Output: ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]
    

    Constraints:

    1 <= logs.length <= 100
    3 <= logs[i].length <= 100
    All the tokens of logs[i] are separated by a single space.
    logs[i] is guaranteed to have an identifier and at least one word after the identifier.

    
    1. letter-logs 를 앞에, digit-logs를 뒤에
    2. letter-logs 를 사전순으로 정렬. 모든 단어가 같으면 식별자 순으로 정렬
    3. digit-logs 는 상대적인 순서 그대로 유지
*/
type Logs = (string | number)[]

enum ComparisonResult {
    ALessThanB = -1,
    AEqualsB = 0,
    AGreaterThanB = 1,
}

function compareStrings(a: string, b: string): ComparisonResult {
    // early return
    if (a === b) {
        return ComparisonResult.AEqualsB
    }

    // 더 짧은 문자의 다음 문자까지만 비교하면 됨. 더 짧은 문자는 마지막 비교문자를 ''로 치환
    const searchRange = Math.min(a.length, b.length) + 1
    for (let i = 0; i < searchRange; i++) {
        const charA = a[i] ?? '',
            charB = b[i] ?? ''
        if (charA < charB) {
            return ComparisonResult.ALessThanB
        } else if (charA > charB) {
            return ComparisonResult.AGreaterThanB
        }
    }

    return ComparisonResult.AEqualsB
}

function isDigit(value: any): boolean {
    return Number.isInteger(Number.parseInt(value))
}

function compareLogFiles(a: Logs, b: Logs): ComparisonResult {
    // Digit-logs 여부 확인
    if (isDigit(a[1]) && isDigit(b[1])) {
        // 둘 다 Digit-logs라면 순서유지
        return ComparisonResult.AEqualsB
    } else if (isDigit(a[1]) && !isDigit(b[1])) {
        // a만 Digit-logs라면 b의 뒤로 보냄
        return ComparisonResult.AGreaterThanB
    } else if (!isDigit(a[1]) && isDigit(b[1])) {
        // b만 Digit-logs라면 b를 뒤로 보냄
        return ComparisonResult.ALessThanB
    }

    // 정렬을 수행해야 할 최대 길이 확인. 식별자는 제외
    const maxSearchDepth = Math.min(a.length, b.length)

    let searchDepth = 1
    for (; searchDepth <= maxSearchDepth; searchDepth++) {
        const targetA = a[searchDepth] ?? '',
            targetB = b[searchDepth] ?? ''
        const compareResult = compareStrings(
            targetA as string,
            targetB as string
        )
        if (compareResult !== ComparisonResult.AEqualsB) {
            return compareResult
        }
    }

    // 내부의 모든 문자를 비교해도 대소가 결정이 안된다면 identifier 비교
    return compareStrings(a[0] as string, b[0] as string)
}

export function reorderLogFiles(logs: string[]): string[] {
    return logs.sort((a, b) => compareLogFiles(a.split(' '), b.split(' ')))
}
