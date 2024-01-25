import { expect, test } from 'vitest'
import Validator from '../../src/shared/Validator'

test('Should return an error with a null text', () => {
    const errorMsg = 'Invalid Text'
    expect(Validator.value(null).notNull().invalid).toBe(true)
    expect(Validator.value(null).notNull(errorMsg).errors[0]!.code).toBe(errorMsg)
})

test('Should validate with non-empty text', () => {
    const v = Validator.value('ABC').notEmpty()
    expect(v.errors).toHaveLength(0)
})

test('Should validate with a non-empty array', () => {
    const v = Validator.value([1, 2, 3]).notEmpty()
    expect(v.errors).toHaveLength(0)
})

test('Should return an error with an empty array', () => {
    const v = Validator.value([]).notEmpty()
    expect(v.errors).toHaveLength(1)
})
