import { search, search2 } from '@/src/ex018-binary-search/ex071-search-in-rotated-sorted-array';

describe('Search in Rotated Sorted Array', () => {
    // 테스트 케이스 생성 함수
    function generateTestCases(): { nums: number[], target: number, expected: number }[] {
        const testCases: { nums: number[], target: number, expected: number }[] = [];
        
        // 기본 케이스
        testCases.push({ nums: [4,5,6,7,0,1,2], target: 0, expected: 4 });
        testCases.push({ nums: [4,5,6,7,0,1,2], target: 3, expected: -1 });
        testCases.push({ nums: [1], target: 0, expected: -1 });
        
        // 회전이 없는 케이스
        testCases.push({ nums: [1,2,3,4,5], target: 3, expected: 2 });
        testCases.push({ nums: [1,2,3,4,5], target: 6, expected: -1 });
        
        // 회전이 있는 케이스
        testCases.push({ nums: [3,4,5,1,2], target: 1, expected: 3 });
        testCases.push({ nums: [3,4,5,1,2], target: 4, expected: 1 });
        
        // 큰 배열 케이스
        const largeArray = Array.from({ length: 1000 }, (_, i) => i);
        const rotatedLargeArray = [...largeArray.slice(500), ...largeArray.slice(0, 500)];
        testCases.push({ nums: rotatedLargeArray, target: 750, expected: 250 });
        testCases.push({ nums: rotatedLargeArray, target: 250, expected: 750 });
        
        // 음수 포함 케이스
        testCases.push({ nums: [-4,-3,-2,-1,0,1,2], target: -2, expected: 2 });
        testCases.push({ nums: [-4,-3,-2,-1,0,1,2], target: 3, expected: -1 });
        
        // 회전이 있는 음수 케이스
        testCases.push({ nums: [-2,-1,0,1,2,-4,-3], target: -3, expected: 6 });
        testCases.push({ nums: [-2,-1,0,1,2,-4,-3], target: 1, expected: 3 });
        
        // 중간 회전 케이스
        testCases.push({ nums: [5,6,7,8,9,1,2,3,4], target: 7, expected: 2 });
        testCases.push({ nums: [5,6,7,8,9,1,2,3,4], target: 3, expected: 7 });
        
        // 회전이 없는 큰 배열
        testCases.push({ nums: largeArray, target: 500, expected: 500 });
        testCases.push({ nums: largeArray, target: 1000, expected: -1 });
        
        // 회전이 있는 큰 배열
        testCases.push({ nums: rotatedLargeArray, target: 0, expected: 500 });
        testCases.push({ nums: rotatedLargeArray, target: 999, expected: 499 });

        // 추가 테스트 케이스 1: 매우 큰 배열
        const veryLargeArray = Array.from({ length: 10000 }, (_, i) => i);
        const rotatedVeryLargeArray = [...veryLargeArray.slice(5000), ...veryLargeArray.slice(0, 5000)];
        testCases.push({ nums: rotatedVeryLargeArray, target: 7500, expected: 2500 });
        testCases.push({ nums: rotatedVeryLargeArray, target: 2500, expected: 7500 });

        // 추가 테스트 케이스 2: 극단적인 회전
        testCases.push({ nums: [1,2,3,4,5,6,7,8,9,0], target: 0, expected: 9 });
        testCases.push({ nums: [1,2,3,4,5,6,7,8,9,0], target: 5, expected: 4 });

        // 추가 테스트 케이스 3: 중복된 회전
        testCases.push({ nums: [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5], target: 3, expected: 2 });
        testCases.push({ nums: [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5], target: 0, expected: 9 });

        // 추가 테스트 케이스 4: 극단적인 음수
        testCases.push({ nums: [-10000,-9999,-9998,-9997,-9996], target: -9999, expected: 1 });
        testCases.push({ nums: [-10000,-9999,-9998,-9997,-9996], target: -9995, expected: -1 });

        // 추가 테스트 케이스 5: 극단적인 양수
        testCases.push({ nums: [9996,9997,9998,9999,10000], target: 9999, expected: 3 });
        testCases.push({ nums: [9996,9997,9998,9999,10000], target: 10001, expected: -1 });

        // 추가 테스트 케이스 6: 회전이 없는 극단적인 배열
        testCases.push({ nums: [-10000,-9999,-9998,-9997,-9996], target: -9998, expected: 2 });
        testCases.push({ nums: [9996,9997,9998,9999,10000], target: 9998, expected: 2 });

        // 추가 테스트 케이스 7: 회전이 있는 극단적인 배열
        testCases.push({ nums: [-9997,-9996,-10000,-9999,-9998], target: -9999, expected: 3 });
        testCases.push({ nums: [9997,9998,9999,10000,9996], target: 9996, expected: 4 });

        // 추가 테스트 케이스 8: 회전이 없는 중간 크기 배열
        const mediumArray = Array.from({ length: 100 }, (_, i) => i);
        testCases.push({ nums: mediumArray, target: 50, expected: 50 });
        testCases.push({ nums: mediumArray, target: 101, expected: -1 });

        // 추가 테스트 케이스 9: 회전이 있는 중간 크기 배열
        const rotatedMediumArray = [...mediumArray.slice(50), ...mediumArray.slice(0, 50)];
        testCases.push({ nums: rotatedMediumArray, target: 75, expected: 25 });
        testCases.push({ nums: rotatedMediumArray, target: 25, expected: 75 });

        // 추가 테스트 케이스 10: 회전이 없는 작은 배열
        testCases.push({ nums: [1,2,3], target: 2, expected: 1 });
        testCases.push({ nums: [1,2,3], target: 4, expected: -1 });
        
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
            expect(search(testCase.nums, testCase.target)).toBe(testCase.expected);
            expect(search2(testCase.nums, testCase.target)).toBe(testCase.expected);
        });
    });

    // 성능 테스트
    test('Performance Test', () => {
        const iterations = 1000;
        console.log('\n성능 테스트 시작...');
        console.log(`테스트 케이스 수: ${testCases.length}`);
        console.log(`반복 횟수: ${iterations}`);

        const searchTime = measurePerformance(search, testCases, iterations);
        const search2Time = measurePerformance(search2, testCases, iterations);

        const performanceResults = [
            {
                '함수': 'search',
                '평균 실행 시간(ms)': (searchTime / (testCases.length * iterations)).toFixed(4),
                '총 실행 시간(ms)': searchTime.toFixed(2)
            },
            {
                '함수': 'search2',
                '평균 실행 시간(ms)': (search2Time / (testCases.length * iterations)).toFixed(4),
                '총 실행 시간(ms)': search2Time.toFixed(2)
            },
            {
                '함수': '성능 비교',
                '평균 실행 시간(ms)': searchTime < search2Time 
                    ? `search가 search2보다 ${((search2Time - searchTime) / searchTime * 100).toFixed(2)}% 빠름`
                    : `search2가 search보다 ${((searchTime - search2Time) / search2Time * 100).toFixed(2)}% 빠름`,
                '총 실행 시간(ms)': searchTime < search2Time 
                    ? `search가 search2보다 ${((search2Time - searchTime) / searchTime * 100).toFixed(2)}% 빠름`
                    : `search2가 search보다 ${((searchTime - search2Time) / search2Time * 100).toFixed(2)}% 빠름`
            }
        ];

        console.table(performanceResults);
/*
    ┌─────────┬─────────────┬────────────────────────────────────┬────────────────────────────────────┐
    │ (index) │ 함수        │ 평균 실행 시간(ms)                 │ 총 실행 시간(ms)                   │
    ├─────────┼─────────────┼────────────────────────────────────┼────────────────────────────────────┤
    │ 0       │ 'search'    │ '0.0005'                           │ '17.71'                            │
    │ 1       │ 'search2'   │ '0.0002'                           │ '9.63'                             │
    │ 2       │ '성능 비교' │ 'search2가 search보다 83.91% 빠름' │ 'search2가 search보다 83.91% 빠름' │
    └─────────┴─────────────┴────────────────────────────────────┴────────────────────────────────────┘
    
    ┌─────────┬─────────────┬────────────────────────────────────┬────────────────────────────────────┐
    │ (index) │ 함수        │ 평균 실행 시간(ms)                 │ 총 실행 시간(ms)                   │
    ├─────────┼─────────────┼────────────────────────────────────┼────────────────────────────────────┤
    │ 0       │ 'search'    │ '0.0005'                           │ '17.58'                            │
    │ 1       │ 'search2'   │ '0.0002'                           │ '9.30'                             │
    │ 2       │ '성능 비교' │ 'search2가 search보다 89.04% 빠름' │ 'search2가 search보다 89.04% 빠름' │
    └─────────┴─────────────┴────────────────────────────────────┴────────────────────────────────────┘
*/
        // 성능 테스트는 실패하지 않도록 항상 통과하도록 설정
        expect(true).toBe(true);
    });
}); 
