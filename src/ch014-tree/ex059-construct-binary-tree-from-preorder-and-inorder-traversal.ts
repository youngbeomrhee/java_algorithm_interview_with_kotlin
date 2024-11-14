/*
Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

 

Example 1:


Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
Example 2:

Input: preorder = [-1], inorder = [-1]
Output: [-1]
 

Constraints:

1 <= preorder.length <= 3000
inorder.length == preorder.length
-3000 <= preorder[i], inorder[i] <= 3000
preorder and inorder consist of unique values.
Each value of inorder also appears in preorder.
preorder is guaranteed to be the preorder traversal of the tree.
inorder is guaranteed to be the inorder traversal of the tree.

// TC: O(2n) -> O(n)
// SC: O(2n) -> O(n)
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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    // inorder 배열에서 각 값의 인덱스를 빠르게 찾기 위해 Map을 생성
    const inorderIndexMap = new Map<number, number>()
    inorder.forEach((value, index) => inorderIndexMap.set(value, index))

    // 트리를 구성하기 위한 재귀 함수
    function arrayToTree(left: number, right: number): TreeNode | null {
        if (left > right) {
            return null // 왼쪽 인덱스가 오른쪽 인덱스를 넘으면 null 반환
        }

        // preorder 배열에서 루트 값을 선택하고, 인덱스를 증가시킴
        const rootVal = preorder.shift()!
        const root = new TreeNode(rootVal)

        // 왼쪽 및 오른쪽 서브트리를 구성
        // inorderIndexMap.get(rootVal) 요소는 루트이므로 제외
        root.left = arrayToTree(left, inorderIndexMap.get(rootVal)! - 1)
        root.right = arrayToTree(inorderIndexMap.get(rootVal)! + 1, right)

        return root
    }

    return arrayToTree(0, inorder.length - 1)
}
