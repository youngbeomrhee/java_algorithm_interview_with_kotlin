export class ListNode<T> {
    val: T
    next: ListNode<T> | null
    constructor(val: T, next?: ListNode<T> | null) {
        this.val = val
        this.next = next ?? null
    }
    static generateList<T>(arr: T[]): ListNode<T> | null {
        if (arr.length === 0) {
            return null
        }
        const head = new ListNode(arr[0])
        let current = head
        for (let i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i])
            current = current.next
        }
        return head
    }
    static toArray<T>(head: ListNode<T> | null): T[] {
        const arr: T[] = []
        let current = head
        while (current !== null) {
            arr.push(current.val)
            current = current.next
        }
        return arr
    }
}
