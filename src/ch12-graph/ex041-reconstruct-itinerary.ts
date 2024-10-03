/*
You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.

 

Example 1:


Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]
Example 2:


Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.
 

Constraints:

1 <= tickets.length <= 300
tickets[i].length == 2
fromi.length == 3
toi.length == 3
fromi and toi consist of uppercase English letters.
fromi != toi
*/
export function findItinerary(tickets: string[][]): string[] {
    const adj: { [key: string]: string[] } = {} // 인접 리스트로 그래프를 표현

    // 각 출발 공항에서 목적지 공항들을 정렬하여 그래프에 삽입
    for (const [from, to] of tickets) {
        if (!adj[from]) {
            adj[from] = []
        }
        adj[from].push(to)
    }

    // 각 공항의 목적지들을 사전순으로 정렬
    for (const from in adj) {
        adj[from].sort().reverse() // 스택을 이용한 DFS이므로 반대로 정렬
    }

    const result: string[] = []
    const stack: string[] = ['JFK'] // JFK에서 출발

    // DFS 탐색
    while (stack.length) {
        const airport = stack[stack.length - 1] // 현재 위치한 공항

        // 아직 방문하지 않은 목적지가 있는 경우
        if (adj[airport] && adj[airport].length > 0) {
            stack.push(adj[airport].pop()!) // 스택에 다음 목적지를 추가
        } else {
            result.push(stack.pop()!) // 더 이상 갈 곳이 없으면 해당 공항을 결과에 추가
        }
    }

    return result.reverse() // 역순으로 일정을 반환
}
