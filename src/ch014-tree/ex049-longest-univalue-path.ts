/*
Given the root of a binary tree, return the length of the longest path, where each node in the path has the same value. This path may or may not pass through the root.

The length of the path between two nodes is represented by the number of edges between them.

 

Example 1:


Input: root = [5,4,5,1,1,null,5]
Output: 2
Explanation: The shown image shows that the longest path of the same value (i.e. 5).
Example 2:


Input: root = [1,4,5,4,4,null,5]
Output: 2
Explanation: The shown image shows that the longest path of the same value (i.e. 4).
 

Constraints:

The number of nodes in the tree is in the range [0, 104].
-1000 <= Node.val <= 1000
The depth of the tree will not exceed 1000.

TC: O(n)
SC: 최악의 경우 O(n), 최선의 경우 O(log n)
*/
function longestUnivaluePath(root: TreeNode | null): number {
    let longest = 0 // 가장 긴 경로의 길이를 저장하는 변수

    // 재귀적으로 최대 깊이를 계산하는 내부 함수
    function maxDepth(node: TreeNode | null): number {
        if (node === null) {
            return 0 // 노드가 null인 경우 깊이는 0
        }

        // 왼쪽 및 오른쪽 자식 노드의 최대 깊이를 재귀적으로 계산
        let left = maxDepth(node.left)
        let right = maxDepth(node.right)

        let leftPath = 0 // 왼쪽 경로의 길이
        let rightPath = 0 // 오른쪽 경로의 길이

        // 왼쪽 자식 노드가 현재 노드와 같은 값을 가지면 왼쪽 경로 길이를 증가
        if (node.left !== null && node.left.val === node.val) {
            leftPath = left + 1 // 왼쪽 경로 길이 증가
        }

        // 오른쪽 자식 노드가 현재 노드와 같은 값을 가지면 오른쪽 경로 길이를 증가
        if (node.right !== null && node.right.val === node.val) {
            rightPath = right + 1 // 오른쪽 경로 길이 증가
        }

        // 현재 노드를 포함한 가장 긴 경로 길이를 업데이트
        longest = Math.max(longest, leftPath + rightPath)

        // 현재 노드에서의 최대 경로 길이를 반환
        return Math.max(leftPath, rightPath)
    }

    maxDepth(root) // 루트 노드에서 시작하여 최대 깊이 계산

    return longest // 가장 긴 경로의 길이를 반환
}
