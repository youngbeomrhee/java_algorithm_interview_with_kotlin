import { search2, search3 } from '@/src/ex018-binary-search/ex070-binary-search';
describe('Binary Search Performance Test', () => {
    // 테스트 케이스 생성 함수
    function generateTestCases(): { nums: number[], target: number, expected: number }[] {
        const testCases: { nums: number[], target: number, expected: number }[] = [];
        
        // 기본 케이스
        testCases.push({ nums: [-1,0,3,5,9,12], target: 9, expected: 4 });
        testCases.push({ nums: [-1,0,3,5,9,12], target: 2, expected: -1 });
        
        // 작은 배열 케이스
        testCases.push({ nums: [1,2,3], target: 2, expected: 1 });
        testCases.push({ nums: [1,2,3], target: 4, expected: -1 });
        
        // 중간 크기 배열
        const mediumArray = Array.from({ length: 100 }, (_, i) => i);
        testCases.push({ nums: mediumArray, target: 50, expected: 50 });
        testCases.push({ nums: mediumArray, target: 101, expected: -1 });
        
        // 큰 배열 케이스
        const largeArray = Array.from({ length: 1000 }, (_, i) => i);
        testCases.push({ nums: largeArray, target: 500, expected: 500 });
        testCases.push({ nums: largeArray, target: 1001, expected: -1 });
        
        // 매우 큰 배열 케이스
        const veryLargeArray = Array.from({ length: 10000 }, (_, i) => i);
        testCases.push({ nums: veryLargeArray, target: 5000, expected: 5000 });
        testCases.push({ nums: veryLargeArray, target: 10001, expected: -1 });
        
        // 음수 포함 케이스
        testCases.push({ nums: [-100,-50,0,50,100], target: -50, expected: 1 });
        testCases.push({ nums: [-100,-50,0,50,100], target: 75, expected: -1 });
        
        // 극단적인 값 케이스
        testCases.push({ nums: [-10000,-9999,-9998,-9997,-9996], target: -9999, expected: 1 });
        testCases.push({ nums: [9996,9997,9998,9999,10000], target: 9999, expected: 3 });
        
        return testCases;
    }

    // 성능 측정 함수
    function measurePerformance(fn: (nums: number[], target: number) => number, testCases: { nums: number[], target: number }[], iterations: number): number {
        const start = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            for (const testCase of testCases) {
                fn(testCase.nums, testCase.target);
            }
        }
        
        const end = performance.now();
        return end - start;
    }

    // 정확성 테스트
    const testCases = generateTestCases();
    testCases.forEach((testCase, index) => {
        test(`Test Case ${index + 1}: nums=${JSON.stringify(testCase.nums)}, target=${testCase.target}`, () => {
            expect(search2(testCase.nums, testCase.target)).toBe(testCase.expected);
            expect(search3(testCase.nums, testCase.target)).toBe(testCase.expected);
        });
    });

    // 성능 테스트
    test('Performance Test', () => {
        const iterations = 1000;
        console.log('\n성능 테스트 시작...');
        console.log(`테스트 케이스 수: ${testCases.length}`);
        console.log(`반복 횟수: ${iterations}`);

        const search2Time = measurePerformance(search2, testCases, iterations);
        const search3Time = measurePerformance(search3, testCases, iterations);

        const performanceResults = [
            {
                '함수': 'search2',
                '평균 실행 시간(ms)': (search2Time / (testCases.length * iterations)).toFixed(4),
                '총 실행 시간(ms)': search2Time.toFixed(2)
            },
            {
                '함수': 'search3',
                '평균 실행 시간(ms)': (search3Time / (testCases.length * iterations)).toFixed(4),
                '총 실행 시간(ms)': search3Time.toFixed(2)
            },
            {
                '함수': '성능 비교',
                '평균 실행 시간(ms)': search2Time < search3Time 
                    ? `search2가 search3보다 ${((search3Time - search2Time) / search2Time * 100).toFixed(2)}% 빠름`
                    : `search3가 search2보다 ${((search2Time - search3Time) / search3Time * 100).toFixed(2)}% 빠름`,
                '총 실행 시간(ms)': search2Time < search3Time 
                    ? `search2가 search3보다 ${((search3Time - search2Time) / search2Time * 100).toFixed(2)}% 빠름`
                    : `search3가 search2보다 ${((search2Time - search3Time) / search3Time * 100).toFixed(2)}% 빠름`
            }
        ];

        console.table(performanceResults);
        
        /*
    ┌─────────┬─────────────┬─────────────────────────────────────┬─────────────────────────────────────┐
    │ (index) │ 함수        │ 평균 실행 시간(ms)                  │ 총 실행 시간(ms)                    │
    ├─────────┼─────────────┼─────────────────────────────────────┼─────────────────────────────────────┤
    │ 0       │ 'search2'   │ '0.0006'                            │ '7.80'                              │
    │ 1       │ 'search3'   │ '0.0004'                            │ '5.55'                              │
    │ 2       │ '성능 비교' │ 'search3가 search2보다 40.59% 빠름' │ 'search3가 search2보다 40.59% 빠름' │
    └─────────┴─────────────┴─────────────────────────────────────┴─────────────────────────────────────┘
        */
        // 성능 테스트는 실패하지 않도록 항상 통과하도록 설정
        expect(true).toBe(true);
    });
});
