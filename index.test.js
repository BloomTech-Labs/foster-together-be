describe('test environment', () => {
  test('database enviroment variable is set to "testing"', () =>
    expect(process.env.DB_ENV).toBe('testing'))
})
