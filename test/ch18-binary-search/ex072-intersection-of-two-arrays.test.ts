import { intersection, intersection2, intersection3, intersection4 } from '@/src/ex018-binary-search/ex072-intersection-of-two-arrays';

describe('Intersection of Two Arrays', () => {
    // 엣지케이스 및 다양한 케이스 생성
    function generateTestCases(): { nums1: number[], nums2: number[], expected: number[] }[] {
        const cases: { nums1: number[], nums2: number[], expected: number[] }[] = [];
        // 기본 케이스
        cases.push({ nums1: [1,2,2,1], nums2: [2,2], expected: [2] });
        cases.push({ nums1: [4,9,5], nums2: [9,4,9,8,4], expected: [4,9] });
        // 길이 1
        cases.push({ nums1: [1], nums2: [1], expected: [1] });
        cases.push({ nums1: [1], nums2: [2], expected: [] });
        // 한쪽이 빈 배열
        cases.push({ nums1: [], nums2: [1,2,3], expected: [] });
        cases.push({ nums1: [1,2,3], nums2: [], expected: [] });
        // 둘 다 빈 배열
        cases.push({ nums1: [], nums2: [], expected: [] });
        // 중복 원소
        cases.push({ nums1: [1,1,1,1], nums2: [1,1], expected: [1] });
        // 음수, 0, 양수
        cases.push({ nums1: [-1,0,1], nums2: [0,1,2], expected: [0,1] });
        // 최대값, 최소값
        cases.push({ nums1: [0,1000], nums2: [1000], expected: [1000] });
        cases.push({ nums1: [0], nums2: [1000], expected: [] });
        // 큰 배열
        const arr1 = Array.from({length: 1000}, (_, i) => i);
        const arr2 = Array.from({length: 1000}, (_, i) => 500 + i);
        cases.push({ nums1: arr1, nums2: arr2, expected: Array.from({length: 500}, (_, i) => 500 + i) });
        // 완전히 겹치지 않는 경우
        cases.push({ nums1: [1,2,3], nums2: [4,5,6], expected: [] });
        // 한쪽이 다른 쪽을 완전히 포함
        cases.push({ nums1: [1,2,3,4,5], nums2: [2,3,4], expected: [2,3,4] });
        // 순서가 달라도 결과는 상관없음
        cases.push({ nums1: [5,4,3,2,1], nums2: [1,2,3], expected: [1,2,3] });
        
        // 추가 케이스 20개
        cases.push({ nums1: [0, 0, 0], nums2: [0], expected: [0] }); // 0만 중복
        cases.push({ nums1: [1000, 999, 998], nums2: [998, 997, 996], expected: [998] }); // 최대값 근처
        cases.push({ nums1: [1, 2, 3, 4, 5], nums2: [5, 4, 3, 2, 1], expected: [1,2,3,4,5] }); // 완전 동일, 순서 뒤섞임
        cases.push({ nums1: [1, 2, 3], nums2: [4, 5, 6], expected: [] }); // 교집합 없음
        cases.push({ nums1: [1, 2, 3, 4, 5], nums2: [1], expected: [1] }); // 한쪽이 한 원소만
        cases.push({ nums1: [1], nums2: [1, 2, 3, 4, 5], expected: [1] }); // 반대 경우
        cases.push({ nums1: [0, 1, 2, 3, 4, 5], nums2: [5, 6, 7, 8, 9, 0], expected: [0,5] }); // 양쪽 끝만 교집합
        cases.push({ nums1: [1000], nums2: [1000], expected: [1000] }); // 최대값 한 개
        cases.push({ nums1: [0], nums2: [0], expected: [0] }); // 최소값 한 개
        cases.push({ nums1: [1, 1, 1, 1, 1], nums2: [1, 1, 1, 1, 1], expected: [1] }); // 모두 중복
        cases.push({ nums1: [1, 2, 3, 4, 5], nums2: [2, 4, 6, 8, 10], expected: [2,4] }); // 일부만 교집합
        cases.push({ nums1: [1, 3, 5, 7, 9], nums2: [2, 4, 6, 8, 10], expected: [] }); // 홀수/짝수 분리
        cases.push({ nums1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], nums2: [5], expected: [5] }); // 한쪽이 한 원소만, 다른 쪽에 포함
        cases.push({ nums1: [1, 2, 3, 4, 5], nums2: [1, 2, 3, 4, 5], expected: [1,2,3,4,5] }); // 완전 동일
        cases.push({ nums1: [1, 2, 3, 4, 5], nums2: [], expected: [] }); // 한쪽이 빈 배열
        cases.push({ nums1: [], nums2: [1, 2, 3, 4, 5], expected: [] }); // 반대 경우
        cases.push({ nums1: [0, 500, 1000], nums2: [0, 1000], expected: [0,1000] }); // 양 끝값만 교집합
        cases.push({ nums1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], nums2: [2, 4, 6, 8, 10], expected: [2,4,6,8,10] }); // 짝수만 교집합
        cases.push({ nums1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], nums2: [1, 3, 5, 7, 9], expected: [1,3,5,7,9] }); // 홀수만 교집합
        cases.push({ nums1: Array.from({length: 1000}, (_, i) => i), nums2: [0, 999], expected: [0, 999] }); // 최대 길이, 양 끝만 교집합
        
        return cases;
    }

    // 결과 비교를 위한 헬퍼 (정렬 후 비교)
    function arraysEqualUnordered(a: number[], b: number[]): boolean {
        return a.length === b.length && a.sort().every((v, i) => v === b.sort()[i]);
    }

    // 정확성 테스트
    const testCases = generateTestCases();
    testCases.forEach((testCase, idx) => {
        test(`Test Case ${idx + 1}: nums1=${JSON.stringify(testCase.nums1)}, nums2=${JSON.stringify(testCase.nums2)}`, () => {
            expect(arraysEqualUnordered(intersection(testCase.nums1, testCase.nums2), testCase.expected)).toBe(true);
            expect(arraysEqualUnordered(intersection2(testCase.nums1, testCase.nums2), testCase.expected)).toBe(true);
            expect(arraysEqualUnordered(intersection3(testCase.nums1, testCase.nums2), testCase.expected)).toBe(true);
            expect(arraysEqualUnordered(intersection4(testCase.nums1, testCase.nums2), testCase.expected)).toBe(true);
        });
    });

    // 성능 측정 함수
    function measurePerformance(fn: (nums1: number[], nums2: number[]) => number[], testCases: { nums1: number[], nums2: number[] }[], iterations: number): number {
        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
            for (const testCase of testCases) {
                fn(testCase.nums1, testCase.nums2);
            }
        }
        const end = performance.now();
        return end - start;
    }

    // 성능 테스트
    test('Performance Test', () => {
        const iterations = 1000;
        console.log('\n성능 테스트 시작...');
        console.log(`테스트 케이스 수: ${testCases.length}`);
        console.log(`반복 횟수: ${iterations}`);

        const intersectionTime = measurePerformance(intersection, testCases, iterations);
        const intersection2Time = measurePerformance(intersection2, testCases, iterations);
        const intersection3Time = measurePerformance(intersection3, testCases, iterations);
        const intersection4Time = measurePerformance(intersection4, testCases, iterations);

        const performanceResults = [
            {
                '함수': 'intersection',
                '평균 실행 시간(ms)': (intersectionTime / (testCases.length * iterations)).toFixed(6),
                '총 실행 시간(ms)': intersectionTime.toFixed(2)
            },
            {
                '함수': 'intersection2',
                '평균 실행 시간(ms)': (intersection2Time / (testCases.length * iterations)).toFixed(6),
                '총 실행 시간(ms)': intersection2Time.toFixed(2)
            },
            {
                '함수': 'intersection3',
                '평균 실행 시간(ms)': (intersection3Time / (testCases.length * iterations)).toFixed(6),
                '총 실행 시간(ms)': intersection3Time.toFixed(2)
            },
            {
                '함수': 'intersection4',
                '평균 실행 시간(ms)': (intersection4Time / (testCases.length * iterations)).toFixed(6),
                '총 실행 시간(ms)': intersection4Time.toFixed(2)
            }
        ];

        const minTime = Math.min(intersectionTime, intersection2Time, intersection3Time, intersection4Time).toFixed(2);
        const fastest = performanceResults
            .slice(0, 4)
            .find(r => Number(r['총 실행 시간(ms)']) === Number(minTime))!['함수'];
        performanceResults.push({
            '함수': '성능 비교',
            '평균 실행 시간(ms)': `${fastest}가 가장 빠름`,
            '총 실행 시간(ms)': `${fastest}가 가장 빠름`
        });

        console.table(performanceResults);
/*
    ┌─────────┬─────────────────┬─────────────────────────────┬─────────────────────────────┐
    │ (index) │ 함수            │ 평균 실행 시간(ms)          │ 총 실행 시간(ms)            │
    ├─────────┼─────────────────┼─────────────────────────────┼─────────────────────────────┤
    │ 0       │ 'intersection'  │ '0.024878'                  │ '870.75'                    │
    │ 1       │ 'intersection2' │ '0.002380'                  │ '83.28'                     │
    │ 2       │ 'intersection3' │ '0.001977'                  │ '69.18'                     │
    │ 3       │ 'intersection4' │ '0.001426'                  │ '49.91'                     │
    │ 4       │ '성능 비교'     │ 'intersection4가 가장 빠름' │ 'intersection4가 가장 빠름' │
    └─────────┴─────────────────┴─────────────────────────────┴─────────────────────────────┘
*/
        // 성능 테스트는 항상 통과
        expect(true).toBe(true);
    });
});
