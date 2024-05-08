export class ArrayStack<T> {
    #items: T[]

    constructor() {
        this.#items = []
    }
    push(data: T) {
        return this.#items.push(data)
    }
    pop() {
        if (this.isEmpty()) {
            throw new Error(
                'Stack is empty. You should check using isEmpty() before pop()'
            )
        }
        return this.#items.pop()
    }
    peek() {
        if (this.isEmpty()) {
            throw new Error(
                'Stack is empty. You should check using isEmpty() before peek()'
            )
        }
        return this.#items[this.#items.length - 1]
    }
    isEmpty() {
        return this.#items.length === 0
    }
    clear() {
        this.#items = []
    }
}
