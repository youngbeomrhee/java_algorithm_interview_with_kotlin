/*
Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

Implement the MyQueue class:

void push(int x) Pushes element x to the back of the queue.
int pop() Removes the element from the front of the queue and returns it.
int peek() Returns the element at the front of the queue.
boolean empty() Returns true if the queue is empty, false otherwise.
Notes:

You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.
 

Example 1:

Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]

Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
 

Constraints:

1 <= x <= 9
At most 100 calls will be made to push, pop, peek, and empty.
All the calls to pop and peek are valid.
*/
class MyStack<T> {
    list: T[]
    constructor() {
        this.list = []
    }
    push(v: T) {
        this.list.push(v)
    }
    peek(): T | null {
        return this.list[this.list.length - 1] ?? null
    }
    pop(): T | null {
        const top = this.list.pop()
        return top ?? null
    }
    size(): number {
        return this.list.length
    }
    empty(): boolean {
        return this.list.length === 0
    }
}

class MyQueue<T> {
    stack1: MyStack<T>
    stack2: MyStack<T>
    constructor() {
        this.stack1 = new MyStack()
        this.stack2 = new MyStack()
    }
    push(v: T) {
        this.stack1.push(v)
    }
    pop(): T | null {
        if (this.stack2.empty()) {
            while (!this.stack1.empty()) {
                this.stack2.push(this.stack1.pop()!)
            }
        }
        return this.stack2.pop()
    }
    peek(): T | null {
        if (this.stack2.empty()) {
            while (!this.stack1.empty()) {
                this.stack2.push(this.stack1.pop()!)
            }
        }
        return this.stack2.peek()
    }
    empty(): boolean {
        return this.stack1.empty() && this.stack2.empty()
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
