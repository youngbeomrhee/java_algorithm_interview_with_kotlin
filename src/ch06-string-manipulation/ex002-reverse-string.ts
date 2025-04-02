/*
    Write a function that reverses a string. The input string is given as an array of characters s.

    You must do this by modifying the input array in-place with O(1) extra memory.

    

    Example 1:

    Input: s = ["h","e","l","l","o"]
    Output: ["o","l","l","e","h"]
    Example 2:

    Input: s = ["H","a","n","n","a","h"]
    Output: ["h","a","n","n","a","H"]
    

    Constraints:

    1 <= s.length <= 105
    s[i] is a printable ascii character.

    문자열을 뒤집는 함수. O(1)의 메모리 공간만 사용 가능

    TC: O(1/2n) -> O(n)
    SC: O(2) -> O(1)
*/
export function reverseString(s: string[]): void {
    for (let i = 0; i < (s.length - 1) / 2; i++) {
        let temp = s[i]
        s[i] = s[s.length - 1 - i]
        s[s.length - 1 - i] = temp
    }
}

/*
    개선안 destructuring assignment 활용하면 temp 변수 없이 바로 변경할 수 있다
    TC: O(1/2n) -> O(n)
    SC: O(1)
*/
export function reverseString2(s: string[]): void {
    for (let i = 0; i < (s.length - 1) / 2; i++) {
        ;[s[i], s[s.length - 1 - i]] = [s[s.length - 1 - i], s[i]]
    }
}
