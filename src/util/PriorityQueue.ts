// 이해를 위해 간소화 된 형태로 구현
// TODO: heap을 사용하는 형태로 고도화
export class PriorityQueue<T> {
    data: Array<T>
    compare: (a: T, b: T) => number

    constructor(compare: (a: T, b: T) => number) {
        this.data = []
        this.compare = compare
    }

    push(item: T) {
        this.data.push(item)
        this.data.sort(this.compare)
    }

    pop(): T | undefined {
        return this.data.shift()
    }

    peek(): T | undefined {
        return this.data[0]
    }

    isEmpty(): boolean {
        return this.data.length === 0
    }
}
