// Configuração para testes unitários
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/main.ts',
    '!src/**/*.module.(t|j)s',
    '!src/**/*.entity.(t|j)s',
    '!src/**/*.schema.(t|j)s',
    '!src/**/*.repository.(t|j)s',
    '!src/**/*.interface.(t|j)s',
    '!src/**/*.controller.(t|j)s',
    '!src/**/*.response.dto.(t|j)s'
  ],
  coverageDirectory: './coverage',
};
