/*
Given the root of a Binary Search Tree (BST), return the minimum difference between the values of any two different nodes in the tree.

 

Example 1:


Input: root = [4,2,6,1,3]
Output: 1
Example 2:


Input: root = [1,0,48,null,null,12,49]
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [2, 100].
0 <= Node.val <= 105

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

function minDiffInBST(root: TreeNode | null): number {
    let minDiff = Infinity // 최소 차이를 저장할 변수, 초기값은 무한대
    let prevVal = -Infinity // 이전 노드의 값을 저장할 변수, 초기값은 음의 무한대

    // 중위 순회를 위한 재귀 함수
    function traverse(node: TreeNode | null) {
        if (node === null) {
            return
        }

        traverse(node.left)

        // 현재 노드와 이전 노드의 값 차이를 계산
        const diff = node.val - prevVal
        // 최소 차이를 업데이트
        minDiff = Math.min(minDiff, diff)
        // 이전 노드의 값을 현재 노드의 값으로 업데이트
        prevVal = node.val

        traverse(node.right)
    }

    traverse(root) // 트리의 루트에서 순회 시작
    return minDiff // 최소 차이 반환
}
