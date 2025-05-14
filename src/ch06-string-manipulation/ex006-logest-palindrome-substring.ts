/*
  TC: O(n) * (O(n) + O(n^2)) -> O(n^3) + O(n^2) -> O(n^3)
*/
export function longestPalindrome(s: string): string {
    // early return
    if (s.length === 1) {
        return s
    }

    let logestPalindromeSubstring = s[0]

    // TC: O(n)
    for (let centerIndex = 0; centerIndex < s.length; centerIndex++) {
        let leftIndex = centerIndex - 1
        let rightIndex = centerIndex + 1

        // 중심점과 같은 문자가 이어지는 경우 처리
        // TC: O(n)
        while (s[centerIndex] === s[rightIndex]) {
            rightIndex++
            // 불필요한 작업
            // if (rightIndex - centerIndex > logestPalindromeSubstring.length) {
            //     logestPalindromeSubstring = s.slice(centerIndex, rightIndex)
            // }
        }

        // 중심점에서 좌우로 한 칸씩 이동한 문자가 같다면 계속 이동
        // TC: O(n)
        while (
            leftIndex >= 0 &&
            rightIndex < s.length &&
            s[leftIndex] === s[rightIndex]
        ) {
            if (
                rightIndex - (leftIndex - 1) >
                logestPalindromeSubstring.length
            ) {
                // TC: O(n) (최악의 경우)
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
     TC: O(2n^2) -> O(n^2)
*/
export function longestPalindrome2(s: string): string {
    // early return
    if (s.length === 1) {
        return s
    }

    let maxStartIdx = 0,
        maxEndIdx = 0

    // O(n)
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

    // O(n)
    for (let centerIdx = 0; centerIdx < s.length - 1; centerIdx++) {
        centerExpansionSearch(centerIdx, centerIdx) // 중간지점이 하나인 경우. 예) a b a
        centerExpansionSearch(centerIdx, centerIdx + 1) // 중간지점이 2개인 경우. 예) a bb a.
    }

    return s.substring(maxStartIdx, maxEndIdx + 1)
}

/*
  1번에 대한 성능개선
  정답을 매번 string을 추출해서 관리하는 대신 index로 관리
  TC: O(2n^2) -> O(n^2)
*/
function longestPalindrome3(s: string): string {
    if (s.length === 1) return s;
    
    let longestStartIndex = 0;
    let longestLength = 1;
    
    // TC: O(n)
    for (let middleIndex = 0; middleIndex < s.length; middleIndex++) {
        // 중복 문자 처리
        let rightIndex = middleIndex;
        // TC: O(n)
        while (rightIndex + 1 < s.length && s[middleIndex] === s[rightIndex + 1]) {
            rightIndex++;
        }
        
        // 팰린드롬 확장
        let leftIndex = middleIndex - 1;
        rightIndex = rightIndex + 1;
        
        // TC: O(n)
        while (
            leftIndex >= 0 &&
            rightIndex < s.length &&
            s[leftIndex] === s[rightIndex]
        ) {
            leftIndex--;
            rightIndex++;
        }
        
        // 현재 팰린드롬의 길이 계산
        const currentLength = rightIndex - leftIndex - 1;
        if (currentLength > longestLength) {
            longestLength = currentLength;
            longestStartIndex = leftIndex + 1;
        }
    }
    
    return s.slice(longestStartIndex, longestStartIndex + longestLength);
}
