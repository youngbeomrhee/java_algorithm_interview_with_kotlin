import { arrayPairSum } from '@/src/ch07-arrays/ex010-array-partition'

import { arrayPairSum2 } from '@/src/ch07-arrays/ex010-array-partition'

// Start Generation Here

describe('arrayPairSum', () => {
    const generateTestArray = (size: number): number[] => {
        const arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(Math.floor(Math.random() * 20001) - 10000);
        }
        return arr;
    };

    const testCases = [
        { input: [1, 4, 3, 2], expected: 4 },
        { input: [6, 2, 6, 5, 1, 2], expected: 9 },
        { input: [1, 1, 1, 1], expected: 2 },
        { input: [1, 2], expected: 1 },
        { input: [1, 2, 3, 4], expected: 4 },
        { input: [1, 1, 2, 2], expected: 3 },
        { input: [1, 1, 1, 2], expected: 2 },
        { input: [1, 1, 2, 3], expected: 3 },
        { input: [1, 2, 2, 3], expected: 3 },
        { input: [1, 2, 3, 3], expected: 4 }
    ];

    it('should return correct results for all test cases and compare performance', () => {
        const performanceResults = testCases.map(({ input, expected }, index) => {
            // arrayPairSum 성능 측정
            const start1 = performance.now();
            const result1 = arrayPairSum([...input]);
            const end1 = performance.now();
            const time1 = end1 - start1;

            // arrayPairSum2 성능 측정
            const start2 = performance.now();
            const result2 = arrayPairSum2([...input]);
            const end2 = performance.now();
            const time2 = end2 - start2;

            // 결과 검증
            expect(result1).toBe(expected);
            expect(result2).toBe(expected);

            return {
                'Test Case': index + 1,
                'Input': JSON.stringify(input),
                'Expected': expected,
                'arrayPairSum (ms)': time1.toFixed(3),
                'arrayPairSum2 (ms)': time2.toFixed(3),
                'Results Match': result1 === result2,
                'Performance Diff (%)': ((time2 - time1) / time1 * 100).toFixed(2)
            };
        });

        // 대규모 배열 테스트
        const largeArray = generateTestArray(10000);
        
        // arrayPairSum 대규모 테스트
        const start1 = performance.now();
        const result1 = arrayPairSum([...largeArray]);
        const end1 = performance.now();
        const time1 = end1 - start1;

        // arrayPairSum2 대규모 테스트
        const start2 = performance.now();
        const result2 = arrayPairSum2([...largeArray]);
        const end2 = performance.now();
        const time2 = end2 - start2;

        const largeArrayResult = {
            'Test Case': 'Large Array',
            'Input': '10000 elements',
            'Expected': 'N/A',
            'arrayPairSum (ms)': time1.toFixed(3),
            'arrayPairSum2 (ms)': time2.toFixed(3),
            'Results Match': result1 === result2,
            'Performance Diff (%)': ((time2 - time1) / time1 * 100).toFixed(2)
        };

        // 모든 결과 통합
        const allResults = [...performanceResults, largeArrayResult];

        // 평균 계산
        const avgTime1 = allResults.reduce((sum, result) => 
            sum + parseFloat(result['arrayPairSum (ms)']), 0) / allResults.length;
        const avgTime2 = allResults.reduce((sum, result) => 
            sum + parseFloat(result['arrayPairSum2 (ms)']), 0) / allResults.length;
        const avgDiff = allResults.reduce((sum, result) => 
            sum + parseFloat(result['Performance Diff (%)']), 0) / allResults.length;

        // 요약 정보 추가
        const summary = {
            'Test Case': 'Summary',
            'Input': 'All Tests',
            'Expected': 'N/A',
            'arrayPairSum (ms)': avgTime1.toFixed(3),
            'arrayPairSum2 (ms)': avgTime2.toFixed(3),
            'Results Match': allResults.every(result => result['Results Match']),
            'Performance Diff (%)': avgDiff.toFixed(2)
        };

        // 최종 결과 출력
        console.log('\n=== Performance Comparison Results ===');
        console.table([...allResults, summary]);

        expect(result1).toBe(result2);
    });
});
