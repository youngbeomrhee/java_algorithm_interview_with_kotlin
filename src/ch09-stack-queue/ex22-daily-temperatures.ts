/*
Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

 

Example 1:

Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
Example 2:

Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
Example 3:

Input: temperatures = [30,60,90]
Output: [1,1,0]
 

Constraints:

1 <= temperatures.length <= 10^5
30 <= temperatures[i] <= 100
*/
export function dailyTemperatures(temperatures: number[]): number[] {
    const stack: number[] = []
    const result: number[] = Array(temperatures.length).fill(0)

    for (let i = 0; i < temperatures.length; i++) {
        // stack의 topIndex의 온도가 현재 온도보다 작은 경우는 계속 pop
        while (
            stack.length > 0 &&
            temperatures[stack[stack.length - 1]] < temperatures[i]
        ) {
            // stack의 topIndex를 pop하고, 현재 인덱스와 차이를 구함
            const topIndex = stack.pop()
            if (topIndex !== undefined) {
                result[topIndex] = i - topIndex
            }
        }
        stack.push(i)
    }

    return result
}
