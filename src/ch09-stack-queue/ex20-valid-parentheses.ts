/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false
 

Constraints:

1 <= s.length <= 10^4
s consists of parentheses only '()[]{}'.
*/
export function isValid(s: string): boolean {
    if (s.length === 1 && s.length % 2 !== 0) {
        return false
    }
    const bracketStack: string[] = [s[0]]

    for (let i = 1; i < s.length; i++) {
        const current = s[i]
        // stack의 top
        const prev = bracketStack[bracketStack.length - 1]

        switch (current) {
            case ')':
                if (bracketStack.length > 0 && prev === '(') {
                    bracketStack.pop()
                } else {
                    return false
                }
                break
            case '}':
                if (bracketStack.length > 0 && prev === '{') {
                    bracketStack.pop()
                } else {
                    return false
                }
                break
            case ']':
                if (bracketStack.length > 0 && prev === '[') {
                    bracketStack.pop()
                } else {
                    return false
                }
                break
            default:
                bracketStack.push(current)
                break
        }
    }
    return bracketStack.length === 0
}
