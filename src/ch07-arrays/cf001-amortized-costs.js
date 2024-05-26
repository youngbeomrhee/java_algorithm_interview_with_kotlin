const fs = require('fs')

function dynamicArrayAnalysis(numElements) {
    let currentSize = 1
    let totalCost = 0
    // let array = new Array(currentSize)
    let currentIndex = 0
    let minCost = Number.MAX_VALUE
    let maxCost = Number.MIN_VALUE
    let sum = 0

    // 스트림을 사용하여 파일에 쓰기
    const outputStream = fs.createWriteStream(
        `./DynamicArrayAnalysis-${numElements}.csv`
    )
    outputStream.write(
        'Element Index,Addition Cost,Copy Cost,Total Cost,Amortized Cost\n'
    )

    for (let i = 1; i <= numElements; i++) {
        let addCost = 1 // 요소를 추가하는 비용은 항상 1
        let copyCost = 0 // 복사 비용은 기본적으로 0, 크기를 늘려야 할 때만 계산

        // 배열에 더 이상 공간이 없으면 크기를 두 배로 늘림
        if (currentIndex === currentSize) {
            // 새 배열을 생성하고 기존 요소를 모두 복사
            let newSize = currentSize * 2

            // 실제 복사하는 로직은 계산하는데 불필요해서 주석처리
            // let newArray = new Array(newSize)
            // for (let j = 0; j < currentSize; j++) {
            //     newArray[j] = array[j]
            // }
            // array = newArray

            copyCost = currentSize // 복사하는 요소의 수는 현재 크기와 같음
            currentSize = newSize
        }

        // array[currentIndex++] = i // 새 요소 추가
        currentIndex++

        totalCost += addCost + copyCost

        let amortizedCost = totalCost / i // 평균 상환 비용 계산

        minCost = Math.min(amortizedCost, minCost)
        maxCost = Math.max(amortizedCost, maxCost)
        sum += amortizedCost
        // 데이터를 스트림에 쓰기
        // if (amortizedCost < 2) {
        outputStream.write(
            `${i},${addCost},${copyCost},${totalCost},${amortizedCost.toFixed(10)}\n`
        )
        // }
    }

    console.log(`\n\n****************** Summary ****************\n`)
    console.log(`Min: ${minCost}\n`)
    console.log(`Max: ${maxCost}\n`)
    console.log(`Average AmortizedCost: ${sum / numElements}\n`)

    outputStream.end(() => {
        console.log('Data has been written to file successfully.')
    })
}

// dynamicArrayAnalysis(Math.pow(2, 10))
// dynamicArrayAnalysis(Math.pow(2, 15))
// dynamicArrayAnalysis(Math.pow(2, 20))
dynamicArrayAnalysis(Math.pow(2, 25))
// dynamicArrayAnalysis(Math.pow(2, 27))
// dynamicArrayAnalysis(Math.pow(2, 29))
// dynamicArrayAnalysis(Math.pow(2, 30))
