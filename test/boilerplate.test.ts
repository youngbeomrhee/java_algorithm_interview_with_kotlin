describe('boilerplate', () => {
    const cases = [
        ['input', 'result'],
        ['input2', 'result'],
    ]
    function testFunction(input = '') {
        return 'result'
    }
    describe('case를 반복하며 테스트 수행', () => {
        test.each(cases)('%s -> %s'.slice(0, 30), (input, expected) => {
            expect(testFunction(input)).toBe(expected)
        })
    })
})
