import { expect, it } from 'vitest'
import { sum } from '../src'

it('should sum two numbers', () => {
  expect(sum(1, 2)).toBe(3)
})
