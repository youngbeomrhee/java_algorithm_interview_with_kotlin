export function insertionSort(arr: number[]): number[] {
    const length = arr.length

    // 배열의 첫 번째 요소는 이미 정렬되어 있다고 가정하고 두 번째 요소부터 시작
    for (let i = 1; i < length; i++) {
        // 현재 비교할 요소를 저장
        const current = arr[i]

        // 이전 요소들과 비교할 인덱스
        let j = i - 1

        // 현재 요소보다 큰 요소들을 모두 오른쪽으로 이동
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j]
            j--
        }

        // 적절한 위치에 현재 요소 삽입
        arr[j + 1] = current
    }

    return arr
}
