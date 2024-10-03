/*
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

 

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
 

Constraints:

1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
All the pairs prerequisites[i] are unique.
*/
export function canFinish(
    numCourses: number,
    prerequisites: number[][]
): boolean {
    const adj: { [key: number]: number[] } = {}
    for (const [ai, bi] of prerequisites) {
        if (!adj[bi]) {
            adj[bi] = []
        }
        adj[bi].push(ai)
    }

    const visited: boolean[] = new Array(numCourses).fill(false)
    const onPath: boolean[] = new Array(numCourses).fill(false)

    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i, adj, visited, onPath)) {
            return false
        }
    }

    return true
}

function hasCycle(
    i: number,
    adj: { [key: number]: number[] },
    visited: boolean[],
    onPath: boolean[]
): boolean {
    if (visited[i]) return false
    visited[i] = true
    onPath[i] = true

    for (const j of adj[i] || []) {
        if (onPath[j] || hasCycle(j, adj, visited, onPath)) {
            return true
        }
    }

    onPath[i] = false
    return false
}
