/*
Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].

 

Example 1:


Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
Output: 32
Explanation: Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32.
Example 2:


Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
Output: 23
Explanation: Nodes 6, 7, and 10 are in the range [6, 10]. 6 + 7 + 10 = 23.
 

Constraints:

The number of nodes in the tree is in the range [1, 2 * 10^4].
1 <= Node.val <= 10^5
1 <= low <= high <= 10^5
All Node.val are unique.

bst의 성질 활용
- 특정 노드의 값이 low 보다 작으면 더이상 왼쪽은 탐색 불필요
- 특정 노드의 값이 high 보다 크면 더이상 오른쪽은 탐색 불필요
- 반복적으로 접근하는 값을 할당

TC : O(N)
SC : 최악 O(N), 평균 O(logN)
*/

// Definition for a binary tree node.
export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
    let sum = 0

    function traverse(node: TreeNode | null) {
        if (node === null) {
            return
        }

        const { val, left, right } = node // 현재 노드의 값과 자식 노드 참조

        if (val >= low && val <= high) {
            sum += val // 노드의 값이 범위 내에 있으면 합계에 추가
        }
        if (val > low) {
            traverse(left) // 노드의 값이 low보다 크면 왼쪽 자식 노드 탐색
        }

        if (val < high) {
            traverse(right) // 노드의 값이 high보다 작으면 오른쪽 자식 노드 탐색
        }
    }
    traverse(root) // 트리의 루트 노드부터 탐색 시작
    return sum // 계산된 합계 반환
}

function rangeSumBST2(
    root: TreeNode | null,
    low: number,
    high: number
): number {
    let sum = 0
    const stack: (TreeNode | null)[] = [root] // 스택 초기화

    while (stack.length > 0) {
        const node = stack.pop()
        if (node) {
            const { val, left, right } = node // 현재 노드의 값과 자식 노드 참조

            if (val >= low && val <= high) {
                sum += val // 노드의 값이 범위 내에 있으면 합계에 추가
            }
            if (val > low) {
                stack.push(left) // 노드의 값이 low보다 크면 왼쪽 자식 노드 스택에 추가
            }
            if (val < high) {
                stack.push(right) // 노드의 값이 high보다 작으면 오른쪽 자식 노드 스택에 추가
            }
        }
    }
    return sum // 계산된 합계 반환
}
