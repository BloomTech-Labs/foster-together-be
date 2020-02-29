describe('test environment', () => {
  test('database enviroment variable is set to "testing"', () =>
    expect(process.env.NODE_ENV).toBe('test'))
})
