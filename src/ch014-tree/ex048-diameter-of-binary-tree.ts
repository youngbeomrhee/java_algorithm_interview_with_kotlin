/*
Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

 

Example 1:


Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
Example 2:

Input: root = [1,2]
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [1, 10^4].
-100 <= Node.val <= 100

TC: O(n)
SC: 최악의 경우 O(n), 최선의 경우 O(log n)
*/

function diameterOfBinaryTree(root: TreeNode | null): number {
    let diameter = 0 // 트리의 지름을 저장할 변수

    // 최대 깊이를 계산하는 재귀 함수
    function maxDepth(root: TreeNode | null): number {
        if (root === null) {
            return 0 // 노드가 없으면 깊이는 0
        }

        // 왼쪽 서브트리의 최대 깊이 계산
        let left = maxDepth(root.left)
        // 오른쪽 서브트리의 최대 깊이 계산
        let right = maxDepth(root.right)

        // 현재 노드를 포함한 경로의 길이를 계산하여 지름을 업데이트
        diameter = Math.max(diameter, left + right)

        // 현재 노드의 깊이를 반환 (왼쪽과 오른쪽 깊이 중 큰 값 + 1)
        return Math.max(left, right) + 1
    }

    maxDepth(root) // 루트를 시작으로 최대 깊이 계산

    return diameter // 계산된 지름 반환
}
