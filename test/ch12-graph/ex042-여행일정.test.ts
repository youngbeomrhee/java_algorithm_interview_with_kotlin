import { solution } from '@/src/ch12-graph/ex042-여행경로'

describe('solution', () => {
    const cases: [string[][], string[]][] = [
        [
            [
                ['ICN', 'JFK'],
                ['HND', 'IAD'],
                ['JFK', 'HND'],
            ],
            ['ICN', 'JFK', 'HND', 'IAD'],
        ],
        [
            [
                ['ICN', 'SFO'],
                ['ICN', 'ATL'],
                ['SFO', 'ATL'],
                ['ATL', 'ICN'],
                ['ATL', 'SFO'],
            ],
            ['ICN', 'ATL', 'ICN', 'SFO', 'ATL', 'SFO'],
        ],
    ]
    cases.forEach(([tickets, expected]) => {
        it(`should return ${expected} for tickets: ${tickets}`, () => {
            const result = solution(tickets)
            expect(result).toStrictEqual(expected)
        })
    })
})
