import { insertionSort } from '@/src/util/InsertionSort'

describe('insertionSort', () => {
    // 다양한 테스트 케이스를 it.each를 사용하여 구현
    it.each([
        {
            description: '기본 정렬 테스트',
            input: [3, 2, 1],
            expected: [1, 2, 3],
        },
        {
            description: '빈 배열 테스트',
            input: [],
            expected: [],
        },
        {
            description: '이미 정렬된 배열 테스트',
            input: [1, 2, 3, 4, 5],
            expected: [1, 2, 3, 4, 5],
        },
        {
            description: '중복 값이 있는 배열 테스트',
            input: [4, 2, 2, 8, 3, 3, 1],
            expected: [1, 2, 2, 3, 3, 4, 8],
        },
        {
            description: '음수 값이 있는 배열 테스트',
            input: [5, -2, 0, -10, 3],
            expected: [-10, -2, 0, 3, 5],
        },
        {
            description: '역순 정렬된 큰 배열 테스트',
            input: Array.from({ length: 100 }, (_, i) => 100 - i),
            expected: Array.from({ length: 100 }, (_, i) => i + 1),
        },
    ])('$description', ({ input, expected }) => {
        // 원본 배열이 변경되지 않는지 확인하기 위해 복사
        const originalArray = [...input]
        const sortedArray = insertionSort(input)

        // 정렬 결과 확인
        expect(sortedArray).toStrictEqual(expected)
    })

    // 성능 테스트 (선택적)
    it('대용량 배열 처리 성능 테스트', () => {
        const largeArray = Array.from({ length: 1000 }, () =>
            Math.floor(Math.random() * 1000)
        )
        const startTime = performance.now()
        const sortedArray = insertionSort(largeArray)
        const endTime = performance.now()

        // 정렬이 제대로 되었는지 확인
        for (let i = 1; i < sortedArray.length; i++) {
            expect(sortedArray[i - 1] <= sortedArray[i]).toBe(true)
        }

        // 실행 시간 로깅 (선택적)
        console.log(`삽입 정렬 실행 시간: ${endTime - startTime}ms`)
    })
})
