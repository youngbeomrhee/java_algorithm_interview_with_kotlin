function maxProfit(prices: number[]): number {
    let maxProfit = 0
    const dayMaxRecord = new Array(prices.length)
    for (let i = prices.length - 1; i >= 0; i--) {
        dayMaxRecord[i] = Math.max(prices[i], (dayMaxRecord[i + 1] ?? 0))
    }
    for (let i = 0; i < prices.length - 1; i++) {
        maxProfit = Math.max(dayMaxRecord[i + 1] - prices[i], maxProfit)
    }
    return maxProfit
};

// 예전 풀이
function maxProfit2(prices: number[]): number {
    let maxPf = 0,
        minPrice = prices[0]
    prices.forEach((price) => {
        minPrice = Math.min(minPrice, price)
        maxPf = Math.max(maxPf, price - minPrice)
    })
    return maxPf
}

function maxProfit3(prices: number[]): number {
    let lowPrice = prices[0]
    let maxProfit = 0
    // TC: O(n)
    for (let i = 1; i < prices.length; i++) {
        const price = prices[i]
        // 개선
        if (lowPrice > price) {
            lowPrice = price
            continue
        }
        maxProfit = Math.max(maxProfit, price - lowPrice)
    }
    return maxProfit
};
