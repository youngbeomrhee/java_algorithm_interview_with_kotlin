function toSortedSet(s: string): string[] {
    // 문자열을 문자 단위로 저장할 배열 선언
    const set = new Set<string>()
    // 문자열을 문자 단위로 배열에 저장
    for (let i = 0; i < s.length; i++) {
        set.add(s.charAt(i))
    }
    // Set을 배열로 변환 후 정렬
    return Array.from(set).sort()
}

/*
1 removeDuplicateLetters("cbacdcbc")
1 sortedSet: [ 'a', 'b', 'c', 'd' ]
1 Current char: a, suffix: "acdcbc, sortedSuffixSet: a,b,c,d"
1 > Match found. c: 'a'
22 removeDuplicateLetters("cdcbc")
22 sortedSet: [ 'b', 'c', 'd' ]
22 Current char: b, suffix: "bc, sortedSuffixSet: b,c"
22 Current char: c, suffix: "cdcbc, sortedSuffixSet: b,c,d"
22 > Match found. c: 'c'
333 removeDuplicateLetters("db")
333 sortedSet: [ 'b', 'd' ]
333 Current char: b, suffix: "b, sortedSuffixSet: b"
333 Current char: d, suffix: "db, sortedSuffixSet: b,d"
333 > Match found. c: 'd'
4444 removeDuplicateLetters("b")
4444 sortedSet: [ 'b' ]
4444 Current char: b, suffix: "b, sortedSuffixSet: b"
4444 > Match found. c: 'b'
55555 removeDuplicateLetters("")
55555 sortedSet: []
4444 > result: b
333 > result: db
22 > result: cdb
1 > result: acdb
*/
export function removeDuplicateLettersForDebugging(
    s: string,
    depth = 1
): string {
    const separator = String(depth)
    console.group(`${separator.repeat(depth)} removeDuplicateLetters("${s}")`)

    const sortedSet = toSortedSet(s)
    console.log(`${separator.repeat(depth)} sortedSet:`, sortedSet)

    for (let i = 0; i < sortedSet.length; i++) {
        const c = sortedSet[i]
        const suffix = s.substring(s.indexOf(c))
        const sortedSuffixSet = toSortedSet(suffix)
        console.log(
            `${separator.repeat(depth)} Current char: ${c}, suffix: "${suffix}, sortedSuffixSet: ${sortedSuffixSet}"`
        )

        if (sortedSet.join('') === sortedSuffixSet.join('')) {
            console.log(`${separator.repeat(depth)} > Match found. c: '${c}'`)
            const result =
                c +
                removeDuplicateLettersForDebugging(
                    suffix.replace(new RegExp(c, 'g'), ''),
                    depth + 1
                )
            console.log(`${separator.repeat(depth)} > result: ${result}`)
            console.groupEnd()
            return result
        }
    }
    console.groupEnd()
    return ''
}

export function removeDuplicateLetters(s: string): string {
    const sortedSet = toSortedSet(s)
    for (let i = 0; i < sortedSet.length; i++) {
        const c = sortedSet[i]
        const suffix = s.substring(s.indexOf(c))
        if (toSortedSet(s).join('') === toSortedSet(suffix).join('')) {
            return (
                c +
                removeDuplicateLetters(suffix.replace(new RegExp(c, 'g'), ''))
            )
        }
    }
    return ''
}

export function removeDuplicateLetters2(s: string): string {
    const counter = new Map<string, number>()
    const seen = new Map<string, boolean>()
    const resultStack = []

    // 문자별 빈도수 카운팅
    for (let c of s.split('')) {
        counter.set(c, (counter.get(c) ?? 0) + 1)
    }

    // 문자열 순회
    for (let c of s.split('')) {
        // 현재 처리 중인 문자 빈도수 감소
        counter.set(c, (counter.get(c) ?? 0) - 1)

        // 이미 처리한 문자인 경우 스킵
        if (seen.get(c)) {
            continue
        }

        while (
            resultStack.length > 0 && // stack이 비어있지 않고,
            resultStack[resultStack.length - 1] > c && // stack의 top이 현재 문자보다 크고,
            (counter.get(resultStack[resultStack.length - 1]) ?? 0) > 0 // stack의 top에 있는 문자가 뒤에 더 나올 경우
        ) {
            // stack의 top을 제거
            let popped = resultStack.pop()
            if (popped !== undefined) {
                // 제거한 문자를 처리하지 않은 상태로 변경
                seen.set(popped, false)
            }
        }

        // 현재 문자를 스택에 추가
        resultStack.push(c)
        // 현재 문자를 처리했음을 표시
        seen.set(c, true)
    }

    return resultStack.join('')
}
