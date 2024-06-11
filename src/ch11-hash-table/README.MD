# ex30 해시맵 디자인

현재 leetcode 기준 요구사항으로는 hash가 충돌할 경우 새로운 값으로 update 하도록 되어 있어서 책의 예제코드는 요구사항과 다르다

# ex34

일반적으로 participant를 map으로 만들고 completion을 순회하면서 map에서 제거하는 방법을 사용
-> participant 전체 순회, completion 전체 순회, 남은 participant 리턴
completion을 map으로 만들고 participant를 순회하면서 participant가 없는 경우 바로 return 하도록 하면 성능을 향상시킬 수 있다
-> completion 전체 순회, participant 순회하다가 completion map 내에 없으면 바로 리턴 (전체 순회하는 경우에 비해 성능 향상)
