/*
Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".

One of the benefits of the circular queue is that we can make use of the spaces in front of the queue. In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue. But using the circular queue, we can use the space to store new values.

Implement the MyCircularQueue class:

MyCircularQueue(k) Initializes the object with the size of the queue to be k.
int Front() Gets the front item from the queue. If the queue is empty, return -1.
int Rear() Gets the last item from the queue. If the queue is empty, return -1.
boolean enQueue(int value) Inserts an element into the circular queue. Return true if the operation is successful.
boolean deQueue() Deletes an element from the circular queue. Return true if the operation is successful.
boolean isEmpty() Checks whether the circular queue is empty or not.
boolean isFull() Checks whether the circular queue is full or not.
You must solve the problem without using the built-in queue data structure in your programming language. 

 

Example 1:

Input
["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
Output
[null, true, true, true, false, 3, true, true, true, 4]

Explanation
MyCircularQueue myCircularQueue = new MyCircularQueue(3);
myCircularQueue.enQueue(1); // return True
myCircularQueue.enQueue(2); // return True
myCircularQueue.enQueue(3); // return True
myCircularQueue.enQueue(4); // return False
myCircularQueue.Rear();     // return 3
myCircularQueue.isFull();   // return True
myCircularQueue.deQueue();  // return True
myCircularQueue.enQueue(4); // return True
myCircularQueue.Rear();     // return 4
 

Constraints:

1 <= k <= 1000
0 <= value <= 1000
At most 3000 calls will be made to enQueue, deQueue, Front, Rear, isEmpty, and isFull.
*/
class MyCircularQueue {
    list: number[]
    head = 0
    tail = 0
    length = 0
    constructor(k: number) {
        // k 크기의 원형 큐로 사용할 배열 선언
        this.list = new Array(k)
    }
    Front(): number {
        // 맨 앞의 값을 가져온다
        return this.length === 0 ? -1 : this.list[this.head]
    }
    Rear(): number {
        // 맨 뒤의 값을 가져온다
        return this.length === 0
            ? -1
            : this.list[(this.tail - 1 + this.list.length) % this.list.length]
    }
    enQueue(value: number): boolean {
        // 꽉 차 있지 않다면 삽입 진행
        if (!this.isFull()) {
            return false
        }
        // tail 포인터 한 칸 앞으로 이동, 최대 크기를 초과하면 나머지 위치로 이동
        this.tail = (this.tail + 1) % this.list.length
        this.list[this.tail] = value
        this.length++
        return true
    }
    deQueue(): boolean {
        // 비어 있다면 삭제 진행 불가
        if (this.isEmpty()) {
            return false
        }
        // head 포인터 한 칸 앞으로 이동, 최대 크기를 초과하면 나머지 위치로 이동
        this.head = (this.head + 1) % this.list.length
        this.length--
        return true
    }
    isEmpty(): boolean {
        return this.length === 0
    }
    isFull(): boolean {
        return this.length === this.list.length
    }
}
