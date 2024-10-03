import { canFinish } from '@/src/ch12-graph/ex043-course-schedule'

describe('canFinish', () => {
    const cases: [number, number[][], boolean][] = [
        [2, [[1, 0]], true],
        [
            2,
            [
                [1, 0],
                [0, 1],
            ],
            false,
        ],
    ]
    cases.forEach(([numCourses, prerequisites, expected]) => {
        it(`should return ${expected} for numCourses: ${numCourses} and prerequisites: ${prerequisites}`, () => {
            const result = canFinish(numCourses, prerequisites)
            expect(result).toStrictEqual(expected)
        })
    })
})
