/**
 * 배열을 병합 정렬 알고리즘을 사용하여 정렬합니다.
 * 시간 복잡도: O(n log n)
 * 공간 복잡도: O(n)
 * @param arr 정렬할 숫자 배열
 * @returns 정렬된 새 배열
 */
export function mergeSort(arr: number[]): number[] {
    // 기저 조건: 배열의 길이가 1 이하면 이미 정렬된 것으로 간주
    if (arr.length <= 1) return arr

    // 배열을 반으로 나누기 위한 중간 인덱스 계산
    const middle = Math.floor(arr.length / 2)
    // 원본 배열을 왼쪽 부분과 오른쪽 부분으로 분할
    const left = arr.slice(0, middle)
    const right = arr.slice(middle)

    // 분할된 배열을 각각 정렬한 후, 정렬된 두 배열을 병합
    return merge(mergeSort(left), mergeSort(right))
}

/**
 * 두 개의 정렬된 배열을 하나의 정렬된 배열로 병합합니다.
 * @param left 정렬된 왼쪽 배열
 * @param right 정렬된 오른쪽 배열
 * @returns 두 배열이 병합된 정렬된 배열
 */
function merge(left: number[], right: number[]): number[] {
    // 병합 결과를 저장할 빈 배열 생성
    const result: number[] = []

    // 두 배열 모두 요소가 남아있는 동안 반복
    while (left.length && right.length) {
        // 왼쪽 배열의 첫 요소가 오른쪽 배열의 첫 요소보다 작거나 같은 경우
        if (left[0] <= right[0]) {
            // 왼쪽 배열의 첫 요소를 제거하여 결과 배열에 추가
            // shift()는 배열의 첫 번째 요소를 제거하고 그 요소를 반환
            // !는 TypeScript에게 반환값이 undefined가 아님을 알림
            result.push(left.shift()!)
        } else {
            // 오른쪽 배열의 첫 요소가 더 작은 경우, 해당 요소를 결과 배열에 추가
            result.push(right.shift()!)
        }
    }

    // 두 배열 중 하나가 모두 소진되면, 남은 배열의 모든 요소를 결과 배열에 추가
    // 이 시점에서 left나 right 중 하나는 빈 배열일 수 있음
    return [...result, ...left, ...right]
}
