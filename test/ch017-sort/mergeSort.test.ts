import { mergeSort } from '@/src/util/MergeSort'

describe('mergeSort', () => {
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
        const sortedArray = mergeSort(input)

        // 정렬 결과 확인
        expect(sortedArray).toStrictEqual(expected)

        // 병합 정렬은 원본 배열을 변경하지 않는 알고리즘이므로 원본 유지 확인
        expect(input).toStrictEqual(originalArray)
    })

    // 성능 테스트
    it('대용량 배열 처리 성능 테스트', () => {
        const largeArray = Array.from({ length: 10000 }, () =>
            Math.floor(Math.random() * 10000)
        )
        const startTime = performance.now()
        const sortedArray = mergeSort(largeArray)
        const endTime = performance.now()

        // 정렬이 제대로 되었는지 확인
        for (let i = 1; i < sortedArray.length; i++) {
            expect(sortedArray[i - 1] <= sortedArray[i]).toBe(true)
        }

        // 실행 시간 로깅
        console.log(`병합 정렬 실행 시간: ${endTime - startTime}ms`)
    })

    // 병합 정렬의 안정성 테스트 (같은 값의 상대적 위치가 유지되는지)
    it('정렬 안정성 테스트', () => {
        interface Item {
            value: number
            originalIndex: number
        }

        const items: Item[] = [
            { value: 3, originalIndex: 0 },
            { value: 1, originalIndex: 1 },
            { value: 3, originalIndex: 2 },
            { value: 2, originalIndex: 3 },
            { value: 1, originalIndex: 4 },
        ]

        // 값만 추출한 배열을 정렬
        const values = items.map((item) => item.value)
        const sortedValues = mergeSort(values)

        // 원래 배열을 value 기준으로 정렬 (안정성 비교용)
        const stableSorted = [...items].sort((a, b) => a.value - b.value)

        // 같은 값을 가진 아이템들의 상대적 순서가 유지되는지 확인
        expect(sortedValues).toEqual([1, 1, 2, 3, 3])

        const sameValueIndices = new Map<number, number[]>()
        items.forEach((item) => {
            if (!sameValueIndices.has(item.value)) {
                sameValueIndices.set(item.value, [])
            }
            sameValueIndices.get(item.value)!.push(item.originalIndex)
        })

        // 각 값별로 원래 인덱스의 순서가 유지되는지 확인
        for (const [value, indices] of sameValueIndices.entries()) {
            if (indices.length > 1) {
                const sortedIndices = stableSorted
                    .filter((item) => item.value === value)
                    .map((item) => item.originalIndex)
                expect(sortedIndices).toEqual(indices)
            }
        }
    })
})
