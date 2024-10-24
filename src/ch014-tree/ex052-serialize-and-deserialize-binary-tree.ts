/*
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

 

Example 1:


Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
Example 2:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 10^4].
-1000 <= Node.val <= 1000


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
 */

/*
 * Encodes a tree to a single string.
TC: O(n) (n은 트리의 노드 개수)
SC: O(n)
 */
function serialize(root: TreeNode | null): string {
    const result: string[] = []

    function traverse(node: TreeNode | null) {
        if (node === null) {
            result.push('null')
            return
        }
        result.push(node.val.toString())
        traverse(node.left)
        traverse(node.right)
    }

    traverse(root)
    return result.join(',')
}

/*
 * Decodes your encoded data to tree.
TC: O(n) (n은 트리의 노드 개수)
SC: O(n)
 */
function deserialize(data: string): TreeNode | null {
    const nodes = data.split(',')
    let index = 0

    function buildTree(): TreeNode | null {
        if (nodes[index] === 'null') {
            index++
            return null
        }
        const node = new TreeNode(parseInt(nodes[index++]))
        node.left = buildTree()
        node.right = buildTree()
        return node
    }

    return buildTree()
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
