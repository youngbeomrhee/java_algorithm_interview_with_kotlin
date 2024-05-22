import { isPalindrome } from '@/src/ch08-linked-list/ex13-palindrome-linked-list'
import { ListNode } from '@/src/util/LinkedListNode'

describe('ex13-palindrome-linked-list', () => {
    const cases: [number[], boolean][] = [
        [[1, 2, 2, 1], true],
        [[1, 2], false],
        [[0], true],
        [[1, 2, 3, 2, 1], true],
        [[1, 2, 3, 4, 5], false],
        [[9, 8, 7, 8, 9], true],
        [[9, 8, 7, 7, 8, 9], true],
        [[1, 2, 3, 4, 3, 2, 1], true],
        [[1, 2, 3, 4, 4, 3, 2, 1], true],
        [[1, 2, 3, 4, 5, 6, 7, 8, 9], false],
        [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], true],
        [[1, 2, 1, 2, 1, 2, 1, 2, 1], true],
        [[0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0], true],
        [[0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0], true],
        [[1, 3, 3, 1, 3, 3, 1], true],
        [[9, 9, 9, 9, 9, 9, 9, 9, 9, 9], true],
        [[9], true], // 단일 요소, 최대값
        [[0, 0], true], // 두 요소, 같은 최소값
        [[9, 9], true], // 두 요소, 같은 최대값
        [[1, 2, 3, 4, 5, 4, 3, 2, 1], true], // 홀수 개수, 중간 값
        [[1, 2, 3, 4, 4, 3, 2, 1], true], // 짝수 개수, 중간 값이 동일
        [[0, 9, 0], true], // 0과 9로 구성된 회문
        [[9, 0, 9], true], // 9와 0으로 구성된 회문
        [[0, 1, 2, 1, 0], true], // 순차적 증가 및 감소
        [[1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1], true], // 대칭 회문
        [[1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0], false], // 비대칭, 중간에 다른 값
        [[1, 2, 3, 2, 1, 1], false], // 비대칭, 끝에 다른 값
        [[1, 2, 3, 3, 2, 1], true], // 짝수 개수, 회문
        [[0, 1, 2, 3, 2, 1, 0], true], // 순차적 증가 및 감소, 0으로 끝남
        [[9, 8, 7, 6, 5, 6, 7, 8, 9], true], // 역순 증가 및 감소
        [[9, 8, 7, 6, 6, 7, 8, 9], true], // 역순 증가 및 감소, 짝수 개수
        [[1, 2, 3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 4, 3, 2, 1], true], // 회문, 중간 값이 동일
        [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], true], // 동일한 값으로 구성된 회문
        [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], false], // 비대칭, 순차적 증가
    ]
    describe('isPalindrome', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (input, expected) => {
            const head = ListNode.generateList<number>(input)
            expect(isPalindrome(head)).toBe(expected)
        })
    })
})
