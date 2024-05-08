function maxProfit(prices: number[]): number {
    let maxPf = 0,
        minPrice = prices[0]
    prices.forEach((price) => {
        minPrice = Math.min(minPrice, price)
        maxPf = Math.max(maxPf, price - minPrice)
    })
    return maxPf
}
