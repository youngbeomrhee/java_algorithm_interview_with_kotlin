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
*/
export function reverseString(s: string[]): void {
    let left = 0,
        right = s.length - 1,
        temp: string
    while (left < right) {
        temp = s[left]
        s[left] = s[right]
        s[right] = temp
        left++
        right--
    }
}

/*
    개선안 destructuring assignment 활용하면 temp 변수 없이 바로 변경할 수 있다
*/
export function reverseString2(s: string[]): void {
    let left = 0,
        right = s.length - 1
    while (left < right) {
        ;[s[left], s[right]] = [s[right], s[left]]
        left++
        right--
    }
}
