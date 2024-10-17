/*
Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: 3
Example 2:

Input: root = [1,null,2]
Output: 2
 

Constraints:

The number of nodes in the tree is in the range [0, 104].
-100 <= Node.val <= 100

TC: O(n) (n은 트리의 노드 개수)
SC: 최악의 경우 O(n), 최선의 경우 O(log n)
*/
function maxDepth(root: TreeNode | null): number {
    // 루트가 null인 경우, 트리가 비어있으므로 깊이는 0입니다.
    if (root === null) {
        return 0
    }

    // 왼쪽 서브트리의 최대 깊이를 재귀적으로 계산합니다.
    let left = maxDepth(root.left)
    // 오른쪽 서브트리의 최대 깊이를 재귀적으로 계산합니다.
    let right = maxDepth(root.right)

    // 왼쪽과 오른쪽 서브트리의 최대 깊이 중 큰 값을 선택하고 1을 더하여 현재 노드를 포함합니다.
    return Math.max(left, right) + 1
}
