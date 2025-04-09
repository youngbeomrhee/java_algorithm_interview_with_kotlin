/*
    1. letter-logs 를 앞에, digit-logs를 뒤에
    2. letter-logs 를 사전순으로 정렬. 모든 단어가 같으면 식별자 순으로 정렬
    3. digit-logs 는 상대적인 순서 그대로 유지

    개선안: 
        - 문자를 비교해주는 localeCompare 활용 -> 낯선 localCompare 보다는 그냥 기본 대소비교 연산자로 비교한다
        - 처음에 letter-logs와 digit-logs를 분리해서 전체 목록이 아닌 letter-logs 내부만 정렬을 수행한다
        - letter-logs는 identifer를 제외한 나머지 문자를 바로 비교하면 된다 (문자의 배열로 분리할 필요 없다)
        - 구조분해 할당 후 다시 join 하는 방식 대신 바로 문자를 자르는 방식으로 수정
*/
// TC: O(2n) + O(n log n)
export function reorderLogFiles2(logs: string[]): string[] {
    enum ComparisonResult {
        ALessThanB = -1,
        AEqualsB = 0,
        AGreaterThanB = 1,
    }

    function compareStrings(a: string, b: string): ComparisonResult {
        if (a < b) {
            return ComparisonResult.ALessThanB
        } else if (a > b) {
            return ComparisonResult.AGreaterThanB
        } else {
            return ComparisonResult.AEqualsB
        }
    }

    function isDigitLog(value: string): boolean {
        return /\d/g.test(value.split(' ')[1])
    }

    const letterLogs: string[] = []
    const digitLogs: string[] = []

    // TC: O(n)
    logs.forEach((log) => {
        if (isDigitLog(log)) {
            digitLogs.push(log)
        } else {
            letterLogs.push(log)
        }
    })

    // TC: O(n log n)
    letterLogs.sort((a, b) => {
        const splitIndexA = a.indexOf(' ')
        const splitIndexB = b.indexOf(' ')
        const idA = a.slice(0, splitIndexA)
        const idB = b.slice(0, splitIndexB)
        const contentA = a.slice(splitIndexA + 1)
        const contentB = b.slice(splitIndexB + 1)
        const compareResult = compareStrings(contentA, contentB)
        if (compareResult !== ComparisonResult.AEqualsB) return compareResult

        // 내부의 모든 문자를 비교해도 대소가 결정이 안된다면 identifier 비교
        return compareStrings(idA, idB)
    })

    // TC: O(n)
    return [...letterLogs, ...digitLogs]
}
