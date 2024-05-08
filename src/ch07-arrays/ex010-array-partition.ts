export function arrayPairSum(nums: number[]): number {
    nums.sort((a, b) => a - b)
    return nums.reduce((sum, temp, i) => {
        if (i % 2 === 0) {
            sum += temp
        }
        return sum
    }, 0)
}
