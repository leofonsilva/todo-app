import faker from 'faker';

// Configuração global do Faker para consistência
export const setupTestEnvironment = () => {
  // Seed para dados consistentes nos testes
  faker.seed(123);
};

// Cleanup após testes
export const cleanupTestEnvironment = () => {
  jest.clearAllMocks();
};