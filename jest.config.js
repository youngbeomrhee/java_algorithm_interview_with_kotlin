module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/test'], // test 디렉토리를 root로 설정
    testMatch: ['**/*.test.ts'], // test 파일 패턴
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1', // src 디렉토리 경로 별칭 설정
    },
}
