/*
Given the root of a binary tree, invert the tree, and return its root.

 

Example 1:


Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
Example 2:


Input: root = [2,1,3]
Output: [2,3,1]
Example 3:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
*/
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 * TC: O(n) (n은 트리의 노드 개수)
 * SC: 최악의 경우 O(n), 최선의 경우 O(log n)
 */
function invertTree(root: TreeNode | null): TreeNode | null {
    if (root === null) {
        return null
    }

    // 왼쪽 서브트리를 오른쪽 서브트리로 대입합니다.
    let left = invertTree(root.left)
    // 오른쪽 서브트리를 왼쪽 서브트리로 대입합니다.
    let right = invertTree(root.right)

    root.left = right
    root.right = left

    return root
}
