function sanitizeAlphanumeric(s: string): string {
    const result: string[] = []

    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i)
        const isAlphaNum =
            (code >= 48 && code <= 57) || // 0-9
            (code >= 65 && code <= 90) || // A-Z
            (code >= 97 && code <= 122) // a-z

        if (isAlphaNum) {
            result.push(s[i])
        }
    }

    return result.join('')
}

function regexSanitizeAlphanumeric(s: string): string {
    return s.replace(/[^0-9A-Za-z]/g, '').toLowerCase()
}

const isAlphaNum = (c: string) => {
    const code = c.charCodeAt(0)
    return (
        (code >= 48 && code <= 57) || // 0-9
        (code >= 65 && code <= 90) || // A-Z
        (code >= 97 && code <= 122)
    ) // a-z
}

const isAlphaNum2 = (c: string) => {
    return /[0-9A-Za-z]/.test(c)
}

describe('String Sanitization Performance Test', () => {
    // 다양한 테스트 케이스 생성 함수
    function generateTestCases() {
        const testCases: { [key: string]: string } = {
            // 1. 매우 긴 알파벳 문자열
            longAlpha: 'a'.repeat(1000000),

            // 2. 매우 긴 특수문자 문자열
            longSpecial: '!@#$%^&*()'.repeat(100000),

            // 3. 알파벳과 특수문자 혼합 (50:50)
            mixedEqual: Array.from({ length: 100000 }, (_, i) =>
                i % 2 === 0 ? 'a' : '!'
            ).join(''),

            // 4. 대부분 알파벳 (90% 알파벳)
            mostlyAlpha: Array.from({ length: 100000 }, () =>
                Math.random() < 0.9
                    ? String.fromCharCode(97 + Math.floor(Math.random() * 26))
                    : '!'
            ).join(''),

            // 5. 대부분 특수문자 (90% 특수문자)
            mostlySpecial: Array.from({ length: 100000 }, () =>
                Math.random() < 0.9
                    ? '!@#$%^&*()'[Math.floor(Math.random() * 10)]
                    : 'a'
            ).join(''),

            // 6. 유니코드 문자 포함
            unicode: Array.from({ length: 50000 }, () =>
                String.fromCharCode(Math.floor(Math.random() * 65535))
            ).join(''),

            // 7. 매우 긴 숫자 문자열
            longNumeric: '0123456789'.repeat(100000),

            // 8. 모든 ASCII 문자 반복
            allAscii: Array.from({ length: 128 }, (_, i) =>
                String.fromCharCode(i)
            )
                .join('')
                .repeat(1000),
        }

        return testCases
    }

    test('Extreme Performance Comparison', () => {
        const testCases = generateTestCases()
        const startTime = performance.now()

        // 테이블 형식으로 표시할 결과 배열
        const performanceResults: any[] = []
        const summaryData = {
            totalTests: 0,
            charCodeAtWins: 0,
            regexWins: 0,
            totalTimeDiff: 0,
            totalMemoryDiff: 0,
        }

        Object.entries(testCases).forEach(([name, input]) => {
            // CharCodeAt 테스트
            const beforeCharCodeAt = process.memoryUsage().heapUsed
            const charCodeAtStart = performance.now()
            const charCodeAtResult = sanitizeAlphanumeric(input)
            const charCodeAtTime = performance.now() - charCodeAtStart
            const afterCharCodeAt = process.memoryUsage().heapUsed
            const charCodeAtMemory =
                (afterCharCodeAt - beforeCharCodeAt) / 1024 / 1024

            // Regex 테스트
            const beforeRegex = process.memoryUsage().heapUsed
            const regexStart = performance.now()
            const regexResult = regexSanitizeAlphanumeric(input)
            const regexTime = performance.now() - regexStart
            const afterRegex = process.memoryUsage().heapUsed
            const regexMemory = (afterRegex - beforeRegex) / 1024 / 1024

            // 성능 차이 계산
            const timeDiff = ((regexTime - charCodeAtTime) / regexTime) * 100
            const memoryDiff =
                ((regexMemory - charCodeAtMemory) / regexMemory) * 100

            // 통계 업데이트
            summaryData.totalTests++
            summaryData.totalTimeDiff += timeDiff
            summaryData.totalMemoryDiff += memoryDiff
            if (charCodeAtTime < regexTime) summaryData.charCodeAtWins++
            if (regexTime < charCodeAtTime) summaryData.regexWins++

            // 테이블용 데이터 추가
            performanceResults.push({
                'Test Case': name,
                'Input Size': input.length.toLocaleString(),
                'CharCodeAt Time (ms)': charCodeAtTime.toFixed(3),
                'Regex Time (ms)': regexTime.toFixed(3),
                'Time Diff (%)': timeDiff.toFixed(2) + '%',
                'CharCodeAt Memory (MB)': charCodeAtMemory.toFixed(2),
                'Regex Memory (MB)': regexMemory.toFixed(2),
                'Memory Diff (%)': memoryDiff.toFixed(2) + '%',
                'Faster Method':
                    charCodeAtTime < regexTime ? 'CharCodeAt' : 'Regex',
                'Results Match':
                    charCodeAtResult.toLowerCase() === regexResult ? '✓' : '✗',
            })
        })

        // 요약 데이터 계산
        const summaryTable = [
            {
                Metric: 'Total Tests',
                Value: summaryData.totalTests,
            },
            {
                Metric: 'CharCodeAt Wins',
                Value: summaryData.charCodeAtWins,
            },
            {
                Metric: 'Regex Wins',
                Value: summaryData.regexWins,
            },
            {
                Metric: 'Average Time Difference',
                Value:
                    (
                        summaryData.totalTimeDiff / summaryData.totalTests
                    ).toFixed(2) + '%',
            },
            {
                Metric: 'Average Memory Difference',
                Value:
                    (
                        summaryData.totalMemoryDiff / summaryData.totalTests
                    ).toFixed(2) + '%',
            },
            {
                Metric: 'Total Execution Time',
                Value: (performance.now() - startTime).toFixed(2) + 'ms',
            },
        ]

        // 결과 출력
        console.log('\nDetailed Performance Results:')
        console.table(performanceResults)

        console.log('\nPerformance Summary:')
        console.table(summaryTable)

        // 테스트 검증
        performanceResults.forEach((result) => {
            expect(result['Results Match']).toBe('✓')
        })
    })
})

/*
┌─────────┬─────────────────┬─────────────┬──────────────────────┬─────────────────┬───────────────┬────────────────────────┬───────────────────┬─────────────────┬───────────────┬───────────────┐
│ (index) │    Test Case    │ Input Size  │ CharCodeAt Time (ms) │ Regex Time (ms) │ Time Diff (%) │ CharCodeAt Memory (MB) │ Regex Memory (MB) │ Memory Diff (%) │ Faster Method │ Results Match │
├─────────┼─────────────────┼─────────────┼──────────────────────┼─────────────────┼───────────────┼────────────────────────┼───────────────────┼─────────────────┼───────────────┼───────────────┤
│    0    │   'longAlpha'   │ '1,000,000' │       '28.481'       │     '0.824'     │  '-3356.40%'  │        '37.71'         │      '0.95'       │   '-3850.75%'   │    'Regex'    │      '✓'      │
│    1    │  'longSpecial'  │ '1,000,000' │       '5.382'        │    '13.596'     │   '60.42%'    │         '0.95'         │      '0.00'       │  '-140464.04%'  │ 'CharCodeAt'  │      '✓'      │
│    2    │  'mixedEqual'   │  '100,000'  │       '3.872'        │     '0.830'     │  '-366.62%'   │         '2.24'         │      '1.62'       │    '-38.28%'    │    'Regex'    │      '✓'      │
│    3    │  'mostlyAlpha'  │  '100,000'  │       '3.328'        │     '0.438'     │  '-660.31%'   │        '-12.53'        │      '0.74'       │   '1799.83%'    │    'Regex'    │      '✓'      │
│    4    │ 'mostlySpecial' │  '100,000'  │       '2.030'        │     '1.177'     │   '-72.45%'   │         '0.52'         │      '0.32'       │    '-64.78%'    │    'Regex'    │      '✓'      │
│    5    │    'unicode'    │  '50,000'   │       '0.108'        │     '0.668'     │   '83.80%'    │         '0.00'         │      '0.00'       │    '16.80%'     │ 'CharCodeAt'  │      '✓'      │
│    6    │  'longNumeric'  │ '1,000,000' │       '31.893'       │     '0.827'     │  '-3754.37%'  │        '39.15'         │      '0.95'       │   '-4002.04%'   │    'Regex'    │      '✓'      │
│    7    │   'allAscii'    │  '128,000'  │       '2.454'        │     '1.124'     │  '-118.35%'   │        '-11.62'        │      '0.30'       │   '3917.70%'    │    'Regex'    │      '✓'      │
└─────────┴─────────────────┴─────────────┴──────────────────────┴─────────────────┴───────────────┴────────────────────────┴───────────────────┴─────────────────┴───────────────┴───────────────┘

┌─────────┬─────────────────────────────┬──────────────┐
│ (index) │           Metric            │    Value     │
├─────────┼─────────────────────────────┼──────────────┤
│    0    │        'Total Tests'        │      8       │
│    1    │      'CharCodeAt Wins'      │      2       │
│    2    │        'Regex Wins'         │      6       │
│    3    │  'Average Time Difference'  │  '-944.97%'  │
│    4    │ 'Average Memory Difference' │ '-17040.76%' │
│    5    │   'Total Execution Time'    │  '100.19ms'  │
└─────────┴─────────────────────────────┴──────────────┘
*/

describe('Single Character Alphanumeric Check Performance Test', () => {
    function generateTestCases() {
        return {
            // 숫자 케이스
            number_start: '0',
            number_middle: '5',
            number_end: '9',

            // 대문자 케이스
            uppercase_start: 'A',
            uppercase_middle: 'M',
            uppercase_end: 'Z',

            // 소문자 케이스
            lowercase_start: 'a',
            lowercase_middle: 'm',
            lowercase_end: 'z',

            // 경계값 케이스
            before_number: String.fromCharCode(47), // '/' (0 이전)
            after_number: String.fromCharCode(58), // ':' (9 이후)
            before_upper: String.fromCharCode(64), // '@' (A 이전)
            after_upper: String.fromCharCode(91), // '[' (Z 이후)
            before_lower: String.fromCharCode(96), // '`' (a 이전)
            after_lower: String.fromCharCode(123), // '{' (z 이후)

            // 특수 문자 케이스
            special_ascii: '!',
            special_extended: '€',
            special_unicode: '한',

            // 공백 문자 케이스
            space: ' ',
            tab: '\t',
            newline: '\n',
        }
    }

    test('Single Character Performance Comparison', () => {
        const testCases = generateTestCases()
        const iterations = 1000000 // 각 케이스당 100만 번 반복
        const performanceResults: any[] = []
        const summaryData = {
            totalTests: 0,
            charCodeAtWins: 0,
            regexWins: 0,
            totalTimeDiff: 0,
            matchingResults: 0,
        }

        Object.entries(testCases).forEach(([name, char]) => {
            // CharCodeAt 테스트
            const charCodeAtStart = performance.now()
            for (let i = 0; i < iterations; i++) {
                isAlphaNum(char)
            }
            const charCodeAtTime = performance.now() - charCodeAtStart

            // Regex 테스트
            const regexStart = performance.now()
            for (let i = 0; i < iterations; i++) {
                isAlphaNum2(char)
            }
            const regexTime = performance.now() - regexStart

            // 결과 일치 여부 확인
            const charCodeAtResult = isAlphaNum(char)
            const regexResult = isAlphaNum2(char)
            const resultsMatch = charCodeAtResult === regexResult

            // 성능 차이 계산
            const timeDiff = ((regexTime - charCodeAtTime) / regexTime) * 100

            // 통계 업데이트
            summaryData.totalTests++
            summaryData.totalTimeDiff += timeDiff
            if (charCodeAtTime < regexTime) summaryData.charCodeAtWins++
            if (regexTime < charCodeAtTime) summaryData.regexWins++
            if (resultsMatch) summaryData.matchingResults++

            // 테이블용 데이터 추가
            performanceResults.push({
                'Test Case': name,
                Character: char,
                'ASCII Code': char.charCodeAt(0),
                'CharCodeAt Time (ms)': charCodeAtTime.toFixed(3),
                'Regex Time (ms)': regexTime.toFixed(3),
                'Time Diff (%)': timeDiff.toFixed(2) + '%',
                'CharCodeAt Result': charCodeAtResult,
                'Regex Result': regexResult,
                'Results Match': resultsMatch ? '✓' : '✗',
                'Faster Method':
                    charCodeAtTime < regexTime ? 'CharCodeAt' : 'Regex',
                Iterations: iterations.toLocaleString(),
            })
        })

        // 요약 테이블 데이터
        const summaryTable = [
            {
                Metric: 'Total Test Cases',
                Value: summaryData.totalTests,
            },
            {
                Metric: 'CharCodeAt Wins',
                Value: summaryData.charCodeAtWins,
            },
            {
                Metric: 'Regex Wins',
                Value: summaryData.regexWins,
            },
            {
                Metric: 'Average Time Difference',
                Value:
                    (
                        summaryData.totalTimeDiff / summaryData.totalTests
                    ).toFixed(2) + '%',
            },
            {
                Metric: 'Matching Results',
                Value: `${summaryData.matchingResults}/${summaryData.totalTests}`,
            },
        ]

        // 결과 출력
        console.log('\nSingle Character Performance Test Results:')
        console.table(performanceResults)

        console.log('\nPerformance Summary:')
        console.table(summaryTable)

        // 테스트 검증
        performanceResults.forEach((result) => {
            expect(result['Results Match']).toBe('✓')
        })
    })
})

/*
┌─────────┬────────────────────┬───────────┬────────────┬──────────────────────┬─────────────────┬───────────────┬───────────────────┬──────────────┬───────────────┬───────────────┬─────────────┐
│ (index) │     Test Case      │ Character │ ASCII Code │ CharCodeAt Time (ms) │ Regex Time (ms) │ Time Diff (%) │ CharCodeAt Result │ Regex Result │ Results Match │ Faster Method │ Iterations  │
├─────────┼────────────────────┼───────────┼────────────┼──────────────────────┼─────────────────┼───────────────┼───────────────────┼──────────────┼───────────────┼───────────────┼─────────────┤
│    0    │   'number_start'   │    '0'    │     48     │       '3.075'        │    '14.614'     │   '78.96%'    │       true        │     true     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│    1    │  'number_middle'   │    '5'    │     53     │       '5.152'        │    '11.035'     │   '53.31%'    │       true        │     true     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│    2    │    'number_end'    │    '9'    │     57     │       '1.371'        │    '10.790'     │   '87.29%'    │       true        │     true     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│    3    │ 'uppercase_start'  │    'A'    │     65     │       '5.681'        │    '10.944'     │   '48.09%'    │       true        │     true     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│    4    │ 'uppercase_middle' │    'M'    │     77     │       '1.356'        │    '10.760'     │   '87.40%'    │       true        │     true     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│    5    │  'uppercase_end'   │    'Z'    │     90     │       '1.380'        │    '11.176'     │   '87.65%'    │       true        │     true     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│    6    │ 'lowercase_start'  │    'a'    │     97     │       '5.374'        │    '11.110'     │   '51.63%'    │       true        │     true     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│    7    │ 'lowercase_middle' │    'm'    │    109     │       '1.082'        │    '10.606'     │   '89.79%'    │       true        │     true     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│    8    │  'lowercase_end'   │    'z'    │    122     │       '1.126'        │    '10.571'     │   '89.35%'    │       true        │     true     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│    9    │  'before_number'   │    '/'    │     47     │       '1.665'        │     '9.801'     │   '83.02%'    │       false       │    false     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│   10    │   'after_number'   │    ':'    │     58     │       '1.395'        │    '10.121'     │   '86.22%'    │       false       │    false     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│   11    │   'before_upper'   │    '@'    │     64     │       '1.355'        │     '9.717'     │   '86.06%'    │       false       │    false     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│   12    │   'after_upper'    │    '['    │     91     │       '1.241'        │     '9.864'     │   '87.41%'    │       false       │    false     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│   13    │   'before_lower'   │    '`'    │     96     │       '1.097'        │    '10.030'     │   '89.06%'    │       false       │    false     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│   14    │   'after_lower'    │    '{'    │    123     │       '1.112'        │    '10.156'     │   '89.05%'    │       false       │    false     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│   15    │  'special_ascii'   │    '!'    │     33     │       '1.626'        │     '9.756'     │   '83.33%'    │       false       │    false     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│   16    │ 'special_extended' │    '€'    │    8364    │       '1.145'        │    '10.031'     │   '88.58%'    │       false       │    false     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│   17    │ 'special_unicode'  │   '한'    │   54620    │       '1.071'        │     '9.648'     │   '88.89%'    │       false       │    false     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│   18    │      'space'       │    ' '    │     32     │       '1.636'        │    '10.399'     │   '84.27%'    │       false       │    false     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│   19    │       'tab'        │   '\t'    │     9      │       '1.562'        │    '10.979'     │   '85.78%'    │       false       │    false     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
│   20    │     'newline'      │   '\n'    │     10     │       '1.522'        │    '10.652'     │   '85.71%'    │       false       │    false     │      '✓'      │ 'CharCodeAt'  │ '1,000,000' │
└─────────┴────────────────────┴───────────┴────────────┴──────────────────────┴─────────────────┴───────────────┴───────────────────┴──────────────┴───────────────┴───────────────┴─────────────┘

┌─────────┬───────────────────────────┬──────────┐
│ (index) │          Metric           │  Value   │
├─────────┼───────────────────────────┼──────────┤
│    0    │    'Total Test Cases'     │    21    │
│    1    │     'CharCodeAt Wins'     │    21    │
│    2    │       'Regex Wins'        │    0     │
│    3    │ 'Average Time Difference' │ '81.41%' │
│    4    │    'Matching Results'     │ '21/21'  │
└─────────┴───────────────────────────┴──────────┘    
*/
