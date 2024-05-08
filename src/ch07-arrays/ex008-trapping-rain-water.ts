import { ArrayStack } from '../util/ArrayStack'
/*


*/

export function trap(heights: number[]): number {
    let waterVolume = 0
    let left = 0
    let right = heights.length - 1
    let leftMax = heights[left]
    let rightMax = heights[right]
    while (left < right) {
        const leftHeight = heights[left]
        const rightHeight = heights[right]

        leftMax = Math.max(leftMax, heights[left])
        rightMax = Math.max(rightMax, heights[right])

        // 가장 높은 곳을 향해 투 포인터 이동
        if (leftMax < rightMax) {
            waterVolume += leftMax - leftHeight
            left++
        } else {
            waterVolume += rightMax - rightHeight
            right--
        }
    }
    return waterVolume
}

export function trap2(heights: number[]): number {
    const indexStack = new ArrayStack<number>()
    let waterVolume = 0
    for (let i = 0; i < heights.length; i++) {
        // 이전의 높이보다 현재의 높이가 높고, stack이 비어있지 않으면
        while (
            !indexStack.isEmpty() &&
            heights[i] > heights[indexStack.peek()]
        ) {
            const prevIndex = indexStack.pop()!
            // stack에 하나만 쌓여있다면 물이 고일 수 없으므로 종료
            if (indexStack.isEmpty()) {
                break
            }

            const distance = i - indexStack.peek() - 1
            // 현재 높이 또는 스택에 넣었던 현재위치에서 2번째 전의 높이 중 낮은 값을 찾고
            // 이전 높이와의 차이를 물 높이로 지정
            const currentHeight = heights[i]
            const indexStacktop = heights[indexStack.peek()]
            const prevHeight = heights[prevIndex]
            const watersHeight =
                Math.min(currentHeight, indexStacktop) - prevHeight
            waterVolume += distance * watersHeight
        }
        // 진행하면서 직전의 index를 스택에 넣는다
        indexStack.push(i)
    }
    return waterVolume
}
