/* 
    nums를 3개의 모든 부분집합으로 쪼갤 수 있는가?
    어떻게 효율적으로 쪼갤 수 있는가?
    배열의 요소가 모두 같은 배열을 어떻게 판단할 수 있는가? 효율적으로 리스트로 관리할 수 있을까?
*/
// Bruth force -> time limit exceeded
export function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b)

    // early return
    if (nums.length === 3) {
        return nums[0] + nums[1] + nums[2] === 0 ? [nums] : []
    }

    const matched = []
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        for (let j = i + 1; j < nums.length - 1; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue
            }
            for (let k = j + 1; k < nums.length; k++) {
                if (k > j + 1 && nums[k] === nums[k - 1]) {
                    continue
                }
                if (nums[i] + nums[j] + nums[k] === 0) {
                    matched.push([nums[i], nums[j], nums[k]])
                }
            }
        }
    }
    return matched
}

export function threeSum2(nums: number[]): number[][] {
    // 먼저 정렬
    nums.sort((a, b) => a - b)

    // early return
    if (nums.length === 3) {
        return nums[0] + nums[1] + nums[2] === 0 ? [nums] : []
    }
    const zeroSums = []
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }

        let left = i + 1,
            right = nums.length - 1

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right]
            if (sum < 0) {
                left++
            } else if (sum > 0) {
                right--
            } else {
                zeroSums.push([nums[i], nums[left], nums[right]])

                // 중복제거
                while (left < right && nums[left] === nums[left + 1]) {
                    left++
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--
                }
                left++
                right--
            }
        }
    }
    return zeroSums
}
