export function longestPalindrome(s: string): string {
    // early return
    if (s.length < 2) {
        return s
    }

    let logestPalindromeSubstring = s[0]

    for (let centerIndex = 0; centerIndex < s.length; centerIndex++) {
        let leftIndex = centerIndex - 1
        let rightIndex = centerIndex + 1

        // 중심점과 같은 문자가 이어지는 경우 처리
        while (s[centerIndex] === s[rightIndex]) {
            rightIndex++
            if (rightIndex - centerIndex > logestPalindromeSubstring.length) {
                logestPalindromeSubstring = s.slice(centerIndex, rightIndex)
            }
        }

        // 중심점에서 좌우로 한 칸씩 이동한 문자가 같다면 계속 이동
        while (
            leftIndex >= 0 &&
            rightIndex < s.length &&
            s[leftIndex] === s[rightIndex]
        ) {
            if (
                rightIndex - (leftIndex - 1) >
                logestPalindromeSubstring.length
            ) {
                logestPalindromeSubstring = s.slice(leftIndex, rightIndex + 1)
            }
            leftIndex--
            rightIndex++
        }
    }
    return logestPalindromeSubstring
}

/*
    개선안
    - logestPalindromeSubstring을 매번 관리할 필요없이 maxStartIdx와 maxEndIdx를 갱신하도록 변경
    - centerExpansionSearch로 로직 분리
    - 중심점의 문자가 같은 문자로 이어지는 개수를 짝수개, 홀수개의 2가지 경우로 분리해서 호출
     - 기존 코드에 비해 가독성은 좋아지지만 성능은 미세하지만 안좋아짐
*/
export function longestPalindrome2(s: string): string {
    // early return
    if (s.length < 2) {
        return s
    }

    let maxStartIdx = 0,
        maxEndIdx = 0

    function centerExpansionSearch(leftIdx: number, rightIdx: number) {
        while (
            0 <= leftIdx &&
            rightIdx < s.length &&
            s[leftIdx] === s[rightIdx]
        ) {
            if (maxEndIdx - maxStartIdx < rightIdx - leftIdx) {
                maxStartIdx = leftIdx
                maxEndIdx = rightIdx
            }
            leftIdx--
            rightIdx++
        }
    }

    for (let centerIdx = 0; centerIdx < s.length - 1; centerIdx++) {
        centerExpansionSearch(centerIdx, centerIdx) // 중간지점이 하나인 경우. 예) a b a
        centerExpansionSearch(centerIdx, centerIdx + 1) // 중간지점이 2개인 경우. 예) a bb a.
    }

    return s.substring(maxStartIdx, maxEndIdx + 1)
}
