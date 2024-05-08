export function productExceptSelf(nums: number[]): number[] {
    const result = []

    // 왼쪽 누적 곱 계산
    let leftProduct = 1
    for (let i = 0; i < nums.length; i++) {
        result[i] = leftProduct
        leftProduct *= nums[i]
    }

    let rightProduct = 1
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= rightProduct
        result[i] += 0 // -0과 0을 다르게 판단해서 보정
        rightProduct *= nums[i]
    }
    return result
}
