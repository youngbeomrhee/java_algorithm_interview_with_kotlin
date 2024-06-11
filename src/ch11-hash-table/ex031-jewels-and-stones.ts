/*
You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have. Each character in stones is a type of stone you have. You want to know how many of the stones you have are also jewels.

Letters are case sensitive, so "a" is considered a different type of stone from "A".

 

Example 1:

Input: jewels = "aA", stones = "aAAbbbb"
Output: 3
Example 2:

Input: jewels = "z", stones = "ZZ"
Output: 0
 

Constraints:

1 <= jewels.length, stones.length <= 50
jewels and stones consist of only English letters.
All the characters of jewels are unique.
*/
// Time Complexity: O(3n) -> O(n), Space Complexity: O(n)
function numJewelsInStones(jewels: string, stones: string): number {
    const jewelsSet = new Set(jewels) // TC: O(n), SC: O(n)
    return stones
        .split('') // TC: O(n), SC: O(n)
        .reduce((acc, stone) => acc + (jewelsSet.has(stone) ? 1 : 0), 0) // TC: O(n), SC: O(1)
}
