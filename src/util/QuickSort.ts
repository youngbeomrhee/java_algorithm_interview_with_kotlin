/**
 * 퀵 정렬 알고리즘을 구현한 함수
 * @param array 정렬할 숫자 배열
 * @param left 정렬 범위의 시작 인덱스
 * @param right 정렬 범위의 끝 인덱스
 */
export function quickSort(array: number[], left: number, right: number) {
    // 배열 길이가 1 이하면 이미 정렬된 상태이므로 그대로 반환
    if (array.length <= 1) return array

    // 배열을 분할하고 피벗 위치를 반환받음
    const pivot = partition(array, left, right)

    // 피벗을 기준으로 왼쪽 부분 배열을 재귀적으로 정렬
    quickSort(array, left, pivot - 1)

    // 피벗을 기준으로 오른쪽 부분 배열을 재귀적으로 정렬
    quickSort(array, pivot + 1, right)
}

/**
 * 배열을 피벗을 기준으로 분할하는 함수
 * @param array 분할할 배열
 * @param left 분할 범위의 시작 인덱스
 * @param right 분할 범위의 끝 인덱스
 * @returns 최종 피벗 위치 인덱스
 */
function partition(array: number[], left: number, right: number) {
    // 가장 오른쪽 요소를 피벗으로 선택
    const pivot = array[right]

    // 왼쪽 포인터 초기화
    let i = left

    // 오른쪽 포인터 초기화 (피벗 바로 왼쪽)
    let j = right - 1

    // 왼쪽 포인터와 오른쪽 포인터가 교차할 때까지 반복
    while (i <= j) {
        // 피벗보다 크거나 같은 요소를 찾을 때까지 왼쪽 포인터를 오른쪽으로 이동
        while (array[i] < pivot) i++

        // 피벗보다 작거나 같은 요소를 찾을 때까지 오른쪽 포인터를 왼쪽으로 이동
        while (array[j] > pivot) j--

        // 두 포인터가 아직 교차하지 않았다면 요소를 교환
        if (i <= j) {
            // 구조 분해 할당을 사용하여 두 요소의 위치를 교환
            ;[array[i], array[j]] = [array[j], array[i]]
            i++
            j--
        }
    }

    // 피벗을 최종 위치로 이동 (i 위치와 피벗 교환)
    ;[array[i], array[right]] = [array[right], array[i]]

    // 피벗의 최종 위치 반환
    return i
}
