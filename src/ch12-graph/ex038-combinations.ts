/*
Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

You may return the answer in any order.

 

Example 1:

Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Explanation: There are 4 choose 2 = 6 total combinations.
Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.
Example 2:

Input: n = 1, k = 1
Output: [[1]]
Explanation: There is 1 choose 1 = 1 total combination.
 

Constraints:

1 <= n <= 20
1 <= k <= n
*/

function combine(n: number, k: number): number[][] {
  const result: number[][] = [] // 결과를 저장할 배열

  // 백트래킹을 위한 재귀 함수 정의
  const backtrack = (current: number[], start: number) => {
    // 현재 조합의 길이가 k와 같으면 결과에 추가
    if (current.length === k) {
      result.push([...current]) // 현재 조합을 복사하여 결과에 추가
      return
    }

    // start부터 n까지 반복하여 조합 생성
    for (let i = start; i <= n; i++) {
      current.push(i) // 현재 숫자를 조합에 추가
      backtrack(current, i + 1) // 다음 숫자를 선택하기 위해 재귀 호출
      current.pop() // 마지막에 추가한 숫자를 제거하여 다음 조합을 위해 상태 복원
    }
  }

  backtrack([], 1) // 초기 호출: 빈 조합과 시작 숫자 1
  return result // 최종 결과 반환
}