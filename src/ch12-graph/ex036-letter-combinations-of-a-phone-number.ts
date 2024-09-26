/*
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]
 

Constraints:

0 <= digits.length <= 4
digits[i] is a digit in the range ['2', '9'].

n의 digits의 길이라고 할 때
TC: O(4^n)
SC: O(4^n)
*/
function letterCombinations(digits: string): string[] {
  // early return
  if (!digits) {
    return []
  }

  const numberCharsMap = new Map<string, string>()
  numberCharsMap.set('2', 'abc')
  numberCharsMap.set('3', 'def')
  numberCharsMap.set('4', 'ghi')
  numberCharsMap.set('5', 'jkl')
  numberCharsMap.set('6', 'mno')
  numberCharsMap.set('7', 'pqrs')
  numberCharsMap.set('8', 'tuv')
  numberCharsMap.set('9', 'wxyz')

  const result: string[] = []

  // 백트래킹을 위한 재귀 함수 정의
  const backtrack = (index: number, currentCombination: string) => {
    // 현재 인덱스가 digits의 길이와 같으면 조합이 완성된 것
    console.log(index, digits.length, currentCombination)
    if (index === digits.length) {
      result.push(currentCombination) // 결과 배열에 추가
      return
    }

    // 현재 인덱스의 숫자에 해당하는 문자들 가져오기
    const letters = numberCharsMap.get(digits[index])
    if (letters) {
      // 각 문자에 대해 재귀 호출
      for (const letter of letters) {
        backtrack(index + 1, currentCombination + letter) // 다음 인덱스로 이동
      }
    }
  }

  // 백트래킹 시작
  backtrack(0, '')
  return result // 최종 결과 반환
}

letterCombinations('23')