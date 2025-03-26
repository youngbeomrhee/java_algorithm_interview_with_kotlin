/*

    A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

    Given a string s, return true if it is a palindrome, or false otherwise.

    

    Example 1:

    Input: s = "A man, a plan, a canal: Panama"
    Output: true
    Explanation: "amanaplanacanalpanama" is a palindrome.
    Example 2:

    Input: s = "race a car"
    Output: false
    Explanation: "raceacar" is not a palindrome.
    Example 3:

    Input: s = " "
    Output: true
    Explanation: s is an empty string "" after removing non-alphanumeric characters.
    Since an empty string reads the same forward and backward, it is a palindrome.
    

    Constraints:

    1 <= s.length <= 2 * 105
    s consists only of printable ASCII characters.
 */

/*
    # 해법 1
    소문자로 일괄변환, 알파벳과 숫자를 제외한 모든 문자 제거
    2개의 runner를 지정해서 runner1은 제일 앞에서부터 뒤로, runner2는 제일 뒤에서부터 앞으로 하나씩 이동하면서 각자가 같은지 확인한다
    2개가 만나거나 교차되면 종료한다 (runner1의 index >= runner2의 index)
    - TC: O(3n + 1/2n) -> O(n)으로 해결가능. n은 s의 길이
    - SC: O(2)
 */
export function isPalindrome(s: string): boolean {
    // to normalized string
    // TC: O(2n) - replace 전체순회, toLowerCase 전체순회
    const ns = s.replace(/[^0-9A-Za-z]/g, '').toLowerCase()
    let r1: number = 0,
        r2: number = ns.length - 1

    // TC: O(1/2n)
    while (r1 < r2) {
        if (ns[r1] !== ns[r2]) {
            return false
        }
        r1++
        r2--
    }

    return true
}

/*
    # 해법 2
    해법 1의 성능 소폭 개선. 처음에 소문자로 일괄변환, 알파벳과 숫자를 제외한 모든 문자 제거하는 작업 역시 전체 문자에 대한 연산이므로
    (동일) 소문자로 일괄변환, 알파벳과 숫자를 제외한 모든 문자 제거하는 작업역시 비용이므로 한 번에 진행하지 말고 비교로직에 포함시킨다
    (개선) 유효한 비교값인 /0-9A-Za-z/ 인 경우만 비교하고 그 외의 값이 올 경우는 인덱스를 이동시킨다 
    (개선) 정규식 대신 charCodeAt으로 비교
    (동일) 2개가 만나면 종료한다 (runner1의 index > runner2의 index)
    - TC: O(1/2n) -> O(n)으로 해결가능. n은 s의 길이
    - SC: O(2)
    -> 성능이 개선될 것으로 예상했지만 실제로 검사해보면 오히려 성능이 떨어지는걸 확인할 수 있다. 기본 메서드의 최적화 힘!
 */
export function isPalindrome2(s: string): boolean {
    let left: number = 0,
        right: number = s.length - 1

    // 정규식과의 성능 비교 regex-vs-charCodeAt.test.ts
    const isAlphaNum = (c: string) => {
        const code = c.charCodeAt(0)
        return (
            (code >= 48 && code <= 57) || // 0-9
            (code >= 65 && code <= 90) || // A-Z
            (code >= 97 && code <= 122)
        ) // a-z
    }

    // TC: O(1/2n)
    while (left < right) {
        if (isAlphaNum(s[left])) {
            left++
        } else if (isAlphaNum(s[right])) {
            right--
        } else {
            if (s[left].toLowerCase() !== s[right].toLowerCase()) {
                return false
            }
            left++
            right--
        }
    }

    return true
}

/*
    # 해법 3
    소문자로 일괄변환, 알파벳과 숫자를 제외한 모든 문자 제거한 후 문자를 뒤집어서 비교한다
 */
export function isPalindrome3(s: string): boolean {
    const ns = s.replace(/[^0-9A-Za-z]/g, '').toLowerCase()
    return ns === ns.split('').reverse().join('')
}
