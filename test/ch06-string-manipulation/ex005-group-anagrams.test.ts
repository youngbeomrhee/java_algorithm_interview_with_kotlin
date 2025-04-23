import { groupAnagrams, groupAnagrams2 } from '@/src/ch06-string-manipulation/ex005-group-anagrams';

describe('Group Anagrams Performance Test', () => {
    // 테스트 케이스 생성 함수
    function generateTestCases(): { strs: string[]; expected: string[][] }[] {
        const testCases: { strs: string[]; expected: string[][] }[] = []

        // 기본 케이스
        testCases.push({
            strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'],
            expected: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']],
        })

        // 빈 문자열 케이스
        testCases.push({
            strs: [''],
            expected: [['']],
        })

        // 단일 문자 케이스
        testCases.push({
            strs: ['a'],
            expected: [['a']],
        })

        // 큰 배열 케이스
        const largeArray = Array.from({ length: 1000 }, (_, i) => {
            const word = 'word' + i
            return word
                .split('')
                .sort(() => Math.random() - 0.5)
                .join('')
        })
        testCases.push({
            strs: largeArray,
            expected: [], // 실제 결과는 실행 시 계산
        })

        // 긴 문자열 케이스
        const longWords = Array.from({ length: 100 }, (_, i) => {
            const word = 'longword'.repeat(10) + i
            return word
                .split('')
                .sort(() => Math.random() - 0.5)
                .join('')
        })
        testCases.push({
            strs: longWords,
            expected: [], // 실제 결과는 실행 시 계산
        })

        // 중복된 애너그램 케이스
        const duplicates = Array.from({ length: 100 }, () => 'eat')
        testCases.push({
            strs: duplicates,
            expected: [duplicates],
        })
        // 경계값 테스트 케이스 추가
        // 1. 최소 길이 (1개)
        testCases.push({
            strs: ['a'],
            expected: [['a']],
        })

        // 2. 최대 길이 (104개)
        const maxLengthArray = Array.from({ length: 104 }, (_, i) =>
            String.fromCharCode(97 + (i % 26)).repeat(10)
        )
        testCases.push({
            strs: maxLengthArray,
            expected: [], // 실행 시 계산
        })

        // 3. 빈 문자열 (0 길이)
        testCases.push({
            strs: [''],
            expected: [['']],
        })

        // 4. 최대 길이 문자열 (100자)
        const maxLengthStr = 'a'.repeat(100)
        testCases.push({
            strs: [maxLengthStr],
            expected: [[maxLengthStr]],
        })

        // 5. 모든 소문자 알파벳 사용
        testCases.push({
            strs: ['abcdefghijklmnopqrstuvwxyz'],
            expected: [['abcdefghijklmnopqrstuvwxyz']],
        })

        // 6. 동일한 문자 반복
        testCases.push({
            strs: ['a'.repeat(100)],
            expected: [['a'.repeat(100)]],
        })

        // 7. 최대 길이의 애너그램 그룹
        const anagramGroup = Array.from({ length: 50 }, () =>
            'abcdefghijklmnopqrstuvwxyz'
                .split('')
                .sort(() => Math.random() - 0.5)
                .join('')
        )
        testCases.push({
            strs: anagramGroup,
            expected: [], // 실행 시 계산
        })

        // 8. 모든 가능한 길이의 문자열
        testCases.push({
            strs: Array.from({ length: 101 }, (_, i) => 'a'.repeat(i)),
            expected: [], // 실행 시 계산
        })

        // 9. 최대 길이의 서로 다른 애너그램
        const differentAnagrams = Array.from({ length: 104 }, (_, i) =>
            String.fromCharCode(97 + (i % 26)).repeat(100)
        )
        testCases.push({
            strs: differentAnagrams,
            expected: [], // 실행 시 계산
        })

        // 10. 최대 길이의 동일한 애너그램
        const sameAnagram = 'a'.repeat(100)
        testCases.push({
            strs: Array(104).fill(sameAnagram),
            expected: [Array(104).fill(sameAnagram)],
        })

        // 11. 최소 길이의 서로 다른 문자열
        testCases.push({
            strs: Array.from({ length: 104 }, (_, i) =>
                String.fromCharCode(97 + (i % 26))
            ),
            expected: [], // 실행 시 계산
        })

        // 12. 최대 길이의 회문 애너그램
        const palindrome = 'a'.repeat(50) + 'b'.repeat(50)
        testCases.push({
            strs: [palindrome, palindrome.split('').reverse().join('')],
            expected: [[palindrome, palindrome.split('').reverse().join('')]],
        })

        // 13. 최대 길이의 순환 애너그램
        const cyclicAnagram = 'abcdefghijklmnopqrstuvwxyz'.repeat(4)
        testCases.push({
            strs: [cyclicAnagram, cyclicAnagram.slice(1) + cyclicAnagram[0]],
            expected: [], // 실행 시 계산
        })

        // 14. 최대 길이의 중복 문자
        testCases.push({
            strs: ['a'.repeat(100), 'a'.repeat(100)],
            expected: [['a'.repeat(100), 'a'.repeat(100)]],
        })

        // 15. 최대 길이의 서로 다른 회문
        const palindromes = Array.from(
            { length: 104 },
            (_, i) =>
                'a'.repeat(50) +
                String.fromCharCode(97 + (i % 26)) +
                'a'.repeat(50)
        )
        testCases.push({
            strs: palindromes,
            expected: [], // 실행 시 계산
        })

        // 16. 최대 길이의 순차적 애너그램
        const sequentialAnagrams = Array.from({ length: 104 }, (_, i) =>
            String.fromCharCode(97 + (i % 26)).repeat(100)
        )
        testCases.push({
            strs: sequentialAnagrams,
            expected: [], // 실행 시 계산
        })

        // 17. 최대 길이의 랜덤 애너그램
        const randomAnagrams = Array.from({ length: 104 }, () =>
            Array.from({ length: 100 }, () =>
                String.fromCharCode(97 + Math.floor(Math.random() * 26))
            ).join('')
        )
        testCases.push({
            strs: randomAnagrams,
            expected: [], // 실행 시 계산
        })

        // 18. 최대 길이의 대칭 애너그램
        const symmetricAnagram = 'a'.repeat(50) + 'b'.repeat(50)
        testCases.push({
            strs: [
                symmetricAnagram,
                symmetricAnagram.split('').reverse().join(''),
            ],
            expected: [
                [
                    symmetricAnagram,
                    symmetricAnagram.split('').reverse().join(''),
                ],
            ],
        })

        // 19. 최대 길이의 반복 패턴
        const patternAnagram = 'abc'.repeat(33) + 'd'
        testCases.push({
            strs: [patternAnagram, patternAnagram.split('').sort().join('')],
            expected: [], // 실행 시 계산
        })

        // 20. 최대 길이의 혼합 패턴
        const mixedPattern = Array.from({ length: 104 }, (_, i) =>
            String.fromCharCode(97 + (i % 26)).repeat(100)
        )
        testCases.push({
            strs: mixedPattern,
            expected: [], // 실행 시 계산
        })
        
        return testCases
    }

    // 성능 측정 함수
    function measurePerformance(
        fn: (strs: string[]) => string[][],
        testCases: { strs: string[] }[],
        iterations: number
    ): number {
        const start = performance.now()

        for (let i = 0; i < iterations; i++) {
            for (const testCase of testCases) {
                fn(testCase.strs)
            }
        }

        const end = performance.now()
        return end - start
    }

    // 정확성 테스트
    const testCases = generateTestCases()
    testCases.forEach((testCase, index) => {
        test(`Test Case ${index + 1}: strs=${JSON.stringify(testCase.strs)}`, () => {
            const result1 = groupAnagrams(testCase.strs)
            const result2 = groupAnagrams2(testCase.strs)

            // 결과 정렬 후 비교
            const sortedResult1 = result1.map((arr) => arr.sort()).sort()
            const sortedResult2 = result2.map((arr) => arr.sort()).sort()

            expect(sortedResult1).toEqual(sortedResult2)
        })
    })

    // 성능 테스트
    test('Performance Test', () => {
        const iterations = 1000
        console.log('\n성능 테스트 시작...')
        console.log(`테스트 케이스 수: ${testCases.length}`)
        console.log(`반복 횟수: ${iterations}`)

        const groupAnagramsTime = measurePerformance(
            groupAnagrams,
            testCases,
            iterations
        )
        const groupAnagrams2Time = measurePerformance(
            groupAnagrams2,
            testCases,
            iterations
        )

        const performanceResults = [
            {
                함수: 'groupAnagrams',
                '평균 실행 시간(ms)': (
                    groupAnagramsTime /
                    (testCases.length * iterations)
                ).toFixed(4),
                '총 실행 시간(ms)': groupAnagramsTime.toFixed(2),
            },
            {
                함수: 'groupAnagrams2',
                '평균 실행 시간(ms)': (
                    groupAnagrams2Time /
                    (testCases.length * iterations)
                ).toFixed(4),
                '총 실행 시간(ms)': groupAnagrams2Time.toFixed(2),
            },
            {
                함수: '성능 비교',
                '평균 실행 시간(ms)':
                    groupAnagramsTime < groupAnagrams2Time
                        ? `groupAnagrams가 groupAnagrams2보다 ${(((groupAnagrams2Time - groupAnagramsTime) / groupAnagramsTime) * 100).toFixed(2)}% 빠름`
                        : `groupAnagrams2가 groupAnagrams보다 ${(((groupAnagramsTime - groupAnagrams2Time) / groupAnagrams2Time) * 100).toFixed(2)}% 빠름`,
                '총 실행 시간(ms)':
                    groupAnagramsTime < groupAnagrams2Time
                        ? `groupAnagrams가 groupAnagrams2보다 ${(((groupAnagrams2Time - groupAnagramsTime) / groupAnagramsTime) * 100).toFixed(2)}% 빠름`
                        : `groupAnagrams2가 groupAnagrams보다 ${(((groupAnagramsTime - groupAnagrams2Time) / groupAnagrams2Time) * 100).toFixed(2)}% 빠름`,
            },
        ]

        console.table(performanceResults)
        /*
    ┌─────────┬──────────────────┬─────────────────────────────────────────────────┬─────────────────────────────────────────────────┐
    │ (index) │ 함수             │ 평균 실행 시간(ms)                              │ 총 실행 시간(ms)                                │
    ├─────────┼──────────────────┼─────────────────────────────────────────────────┼─────────────────────────────────────────────────┤
    │ 0       │ 'groupAnagrams'  │ '0.1000'                                        │ '2601.09'                                       │
    │ 1       │ 'groupAnagrams2' │ '0.0967'                                        │ '2515.42'                                       │
    │ 2       │ '성능 비교'      │ 'groupAnagrams2가 groupAnagrams보다 3.41% 빠름' │ 'groupAnagrams2가 groupAnagrams보다 3.41% 빠름' │
    └─────────┴──────────────────┴─────────────────────────────────────────────────┴─────────────────────────────────────────────────┘
    
    
        */
    })
})
