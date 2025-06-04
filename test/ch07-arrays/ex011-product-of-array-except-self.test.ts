import { productExceptSelf, productExceptSelf2, productExceptSelf3 } from '@/src/ch07-arrays/ex011-product-of-array-except-self'

describe('ex011-product-of-array-except-self', () => {
    const cases = [
        [
            [1, 2, 3, 4],
            [24, 12, 8, 6],
        ],
        [
            [-1, 1, 0, -3, 3],
            [0, 0, 9, 0, 0],
        ],
        [
            [1, 1, 1, 1],
            [1, 1, 1, 1],
        ],
        [
            [2, 2, 2, 2],
            [8, 8, 8, 8],
        ],
        [
            [-1, -1, -1, -1],
            [-1, -1, -1, -1],
        ],
        [
            [100, 100, 100],
            [10000, 10000, 10000],
        ],
        [
            [-100, -100, 100],
            [-10000, -10000, 10000],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 1, 2, 3, 4],
            [24, 0, 0, 0, 0],
        ],
        [
            [-1, 2, -3, 4],
            [-24, 12, -8, 6],
        ],
        [
            [30, -30, 30, -30],
            [27000, -27000, 27000, -27000],
        ],
        [
            [30, 0, -30, 30],
            [0, -27000, 0, 0],
        ],
        [
            [1, 0, -1, 2, -2],
            [0, 4, 0, 0, 0],
        ],
        [
            [10, -10, 10, -10, 10],
            [10000, -10000, 10000, -10000, 10000],
        ],
        [
            [3, 3, 3, 3, 3],
            [81, 81, 81, 81, 81],
        ],
        [
            [1, 2, 3, 4, 5],
            [120, 60, 40, 30, 24],
        ],
        [
            [2, 4, 6],
            [24, 12, 8],
        ],
        [
            [-2, -2, 2, 2],
            [-8, -8, 8, 8],
        ],
        [
            [2, 0, -2, 0],
            [0, 0, 0, 0],
        ],
        [
            [1, 2, 0, 4, 5],
            [0, 0, 40, 0, 0],
        ],
        [
            [30, 30, 30, 30],
            [27000, 27000, 27000, 27000],
        ],
        [
            [-30, -30, -30, -30],
            [-27000, -27000, -27000, -27000],
        ],
        [
            [30, -30, 30, -30],
            [27000, -27000, 27000, -27000],
        ],
        [
            [1, 2],
            [2, 1],
        ],
        [
            [1, 0, 0, 0],
            [0, 0, 0, 0],
        ],
    ]
    describe('기본 테스트', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (input, expected) => {
            expect(productExceptSelf(input)).toStrictEqual(expected)
            expect(productExceptSelf2(input)).toStrictEqual(expected)
            expect(productExceptSelf3(input)).toStrictEqual(expected)
        })
    })

    describe('성능 비교 테스트', () => {
        it('should compare performance of all implementations', () => {
            const ITERATIONS = 10; // 반복 횟수 감소
            const WARM_UP_ITERATIONS = 3; // 워밍업 반복 횟수 감소

            const performanceResults = cases.map(([input, expected], index) => {
                // 워밍업 실행
                for (let i = 0; i < WARM_UP_ITERATIONS; i++) {
                    productExceptSelf([...input]);
                    productExceptSelf2([...input]);
                    productExceptSelf3([...input]);
                }

                // productExceptSelf 성능 측정
                const times1: number[] = [];
                for (let i = 0; i < ITERATIONS; i++) {
                    const start = performance.now();
                    const result = productExceptSelf([...input]);
                    const end = performance.now();
                    times1.push(end - start);
                    expect(result).toStrictEqual(expected);
                }
                const avgTime1 = times1.reduce((sum, time) => sum + time, 0) / ITERATIONS;
                const stdDev1 = Math.sqrt(
                    times1.reduce((sum, time) => sum + Math.pow(time - avgTime1, 2), 0) / ITERATIONS
                );

                // productExceptSelf2 성능 측정
                const times2: number[] = [];
                for (let i = 0; i < ITERATIONS; i++) {
                    const start = performance.now();
                    const result = productExceptSelf2([...input]);
                    const end = performance.now();
                    times2.push(end - start);
                    expect(result).toStrictEqual(expected);
                }
                const avgTime2 = times2.reduce((sum, time) => sum + time, 0) / ITERATIONS;
                const stdDev2 = Math.sqrt(
                    times2.reduce((sum, time) => sum + Math.pow(time - avgTime2, 2), 0) / ITERATIONS
                );

                // productExceptSelf3 성능 측정
                const times3: number[] = [];
                for (let i = 0; i < ITERATIONS; i++) {
                    const start = performance.now();
                    const result = productExceptSelf3([...input]);
                    const end = performance.now();
                    times3.push(end - start);
                    expect(result).toStrictEqual(expected);
                }
                const avgTime3 = times3.reduce((sum, time) => sum + time, 0) / ITERATIONS;
                const stdDev3 = Math.sqrt(
                    times3.reduce((sum, time) => sum + Math.pow(time - avgTime3, 2), 0) / ITERATIONS
                );

                return {
                    'Test Case': index + 1,
                    'Input Size': input.length,
                    'Input Type': input.length > 10 ? 'Large Array' : 'Small Array',
                    'productExceptSelf (ms)': `${avgTime1.toFixed(3)} ± ${stdDev1.toFixed(3)}`,
                    'productExceptSelf2 (ms)': `${avgTime2.toFixed(3)} ± ${stdDev2.toFixed(3)}`,
                    'productExceptSelf3 (ms)': `${avgTime3.toFixed(3)} ± ${stdDev3.toFixed(3)}`,
                    'Fastest': avgTime1 <= avgTime2 && avgTime1 <= avgTime3 ? 'productExceptSelf' :
                              avgTime2 <= avgTime1 && avgTime2 <= avgTime3 ? 'productExceptSelf2' : 'productExceptSelf3',
                    'Confidence': Math.min(stdDev1, stdDev2, stdDev3) < 0.1 ? 'High' : 'Low'
                };
            });

            // 평균 계산
            const avgTime1 = performanceResults.reduce((sum, result) => 
                sum + parseFloat(result['productExceptSelf (ms)'].split(' ± ')[0]), 0) / performanceResults.length;
            const avgTime2 = performanceResults.reduce((sum, result) => 
                sum + parseFloat(result['productExceptSelf2 (ms)'].split(' ± ')[0]), 0) / performanceResults.length;
            const avgTime3 = performanceResults.reduce((sum, result) => 
                sum + parseFloat(result['productExceptSelf3 (ms)'].split(' ± ')[0]), 0) / performanceResults.length;

            // 요약 정보 추가
            const summary = {
                'Test Case': 'Summary',
                'Input Size': 'All Tests',
                'Input Type': 'Average',
                'productExceptSelf (ms)': avgTime1.toFixed(3),
                'productExceptSelf2 (ms)': avgTime2.toFixed(3),
                'productExceptSelf3 (ms)': avgTime3.toFixed(3),
                'Fastest': avgTime1 <= avgTime2 && avgTime1 <= avgTime3 ? 'productExceptSelf' :
                          avgTime2 <= avgTime1 && avgTime2 <= avgTime3 ? 'productExceptSelf2' : 'productExceptSelf3',
                'Confidence': 'N/A'
            };

            // 최종 결과 출력
            console.log('\n=== Performance Comparison Results ===');
            console.log(`Iterations per test case: ${ITERATIONS}`);
            console.log(`Warm-up iterations: ${WARM_UP_ITERATIONS}`);
            console.table([...performanceResults, summary]);
        });
    });
})
