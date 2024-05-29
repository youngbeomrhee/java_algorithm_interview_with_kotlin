import { MyStack } from '@/src/ch09-stack-queue/ex23-implement-stack-using-queues'

describe('ex24-implement-stack-using-queues', () => {
    test('MyStack', () => {
        const myStack = new MyStack()
        myStack.push(1)
        myStack.push(2)
        myStack.push(3)
        console.log(myStack.top()) // return 3
        console.log(myStack)
    })
})
