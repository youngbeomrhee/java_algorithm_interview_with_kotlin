import { findItinerary } from '@/src/ch12-graph/ex041-reconstruct-itinerary'

describe('findItinerary', () => {
    const cases: [string[][], string[]][] = [
        [
            [
                ['MUC', 'LHR'],
                ['JFK', 'MUC'],
                ['SFO', 'SJC'],
                ['LHR', 'SFO'],
            ],
            ['JFK', 'MUC', 'LHR', 'SFO', 'SJC'],
        ],
    ]
    cases.forEach(([tickets, expected]) => {
        it(`should return ${expected} for tickets: ${tickets}`, () => {
            const result = findItinerary(tickets)
            expect(result).toStrictEqual(expected)
        })
    })
})
