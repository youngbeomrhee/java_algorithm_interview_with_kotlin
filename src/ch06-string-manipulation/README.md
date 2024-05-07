# 6장 문자열 처리

## 01 유효한 팰린드롬

기본으로 제공되는 메서드는 대부분 최적화 되어있기 때문에 언어가 다르다면 책에서 나온대로 어떤 풀이가 더 빠르다고 단언할 수 없다
-> 성능 평가를 통해 비교해본다

## 패턴

-   영문대소문자를 제외한 다른 문자 제거, 소문자 변환 (isPalindrome)
    s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
-   숫자인지 확인하는 정규식 (isDigitLog)
    /\d/g.test(target)
-   여러 단어로 조합된 문장의 사전순 비교는 단어별로 자를 필요 없다. 그냥 문장 전체로 비교해도 된다 (reorderLogFiles2)
    예) 'ab c', 'a cb' -> 'a' 동일, 공백문자(32)가 b(98)보다 char code가 앞서므로 'ab c' > 'a cb'
-   특정 리스트에서 특정 키에 해당하는 값이 있는지 자주 비교해야 한다면 HashSet으로 변환한다.
-   특정 단어들이 Anagram인지 여부는 단어를 정렬한 후 같은지 비교한다
-   문장 내에 가장 긴 palindrome을 찾을 때는 중앙 확장법 (center expansion)을 사용한다

### 참고: 문자열 배열의 대소비교 (isLessThan)

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than#description
https://tc39.es/ecma262/#sec-islessthan

요약하자면

-   IsLessThan(x, y)
-   ToPrimitive(x, NUMBER)
    배열에는 @@toPrimitive 메서드가 없으므로
-   OrdinaryToPrimitive(input, NUMBER)
-   valueOf, toString메서드가 실행
    -> string으로 변환되서 사전순(The comparison of Strings uses a simple lexicographic ordering on sequences of UTF-16 code unit values)으로 대소비교

예시)

-   ['a', 'bc'] < ['ab', 'c']
-   ['a', 'bc'].valueOf().toString() < ['ab', 'c'].valueOf().toString()
    배열의 valueOf()는 자기 자신이므로
-   ['a', 'bc'].toString() < ['ab', 'c'].toString()
-   'a,bc' < 'ab,c'
    'a'는 동일, ','.chatCodeAt() -> 44, 'b'.chatCodeAt() -> 98 이므로
    => true
