export class PriorityQueue<T> {
    private heap: Array<{ node: T; priority: number }>

    constructor() {
        this.heap = []
    }

    private getParentIndex(index: number): number {
        return Math.floor((index - 1) / 2)
    }

    private getLeftChildIndex(index: number): number {
        return 2 * index + 1
    }

    private getRightChildIndex(index: number): number {
        return 2 * index + 2
    }

    private swap(index1: number, index2: number) {
        ;[this.heap[index1], this.heap[index2]] = [
            this.heap[index2],
            this.heap[index1],
        ]
    }

    private heapifyUp(index: number) {
        let currentIndex = index
        while (currentIndex > 0) {
            const parentIndex = this.getParentIndex(currentIndex)
            if (
                this.heap[currentIndex].priority <
                this.heap[parentIndex].priority
            ) {
                this.swap(currentIndex, parentIndex)
                currentIndex = parentIndex
            } else {
                break
            }
        }
    }

    private heapifyDown(index: number) {
        let currentIndex = index
        const length = this.heap.length
        while (this.getLeftChildIndex(currentIndex) < length) {
            const leftChildIndex = this.getLeftChildIndex(currentIndex)
            const rightChildIndex = this.getRightChildIndex(currentIndex)
            let smallestChildIndex = leftChildIndex

            if (
                rightChildIndex < length &&
                this.heap[rightChildIndex].priority <
                    this.heap[leftChildIndex].priority
            ) {
                smallestChildIndex = rightChildIndex
            }

            if (
                this.heap[currentIndex].priority >
                this.heap[smallestChildIndex].priority
            ) {
                this.swap(currentIndex, smallestChildIndex)
                currentIndex = smallestChildIndex
            } else {
                break
            }
        }
    }

    push(node: T, priority: number) {
        this.heap.push({ node, priority })
        this.heapifyUp(this.heap.length - 1)
    }

    pop(): T | null {
        if (this.heap.length === 0) return null
        if (this.heap.length === 1) return this.heap.pop()!.node

        const root = this.heap[0]
        this.heap[0] = this.heap.pop()!
        this.heapifyDown(0)

        return root.node
    }

    isEmpty(): boolean {
        return this.heap.length === 0
    }
}
