/**
 * 버블 정렬
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */

export function bubbleSort<T>(
    array: T[],
    compare: (a: T, b: T) => number
): T[] {
    const n = array.length
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (compare(array[j], array[j + 1]) > 0) {
                ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
            }
        }
    }
    return array
}
