import { bubbleSort } from '@/src/util/BubbleSort'

describe('bubbleSort', () => {
    it('정렬 테스트', () => {
        const array = [3, 2, 1]
        const sortedArray = bubbleSort(array, (a, b) => a - b)
        expect(sortedArray).toStrictEqual([1, 2, 3])
    })
})
