import { expect, test } from "vitest";
import Entity, { EntityProps } from "../../src/shared/Entity";
import Id from "../../src/shared/Id";

interface UserProps extends EntityProps {
  name?: string
  age?: number
}

class User extends Entity<User, UserProps> {
  constructor(props: UserProps) {
    super(props)
  }
}

test('Should calculate equality as true when the entities have the same ID', () => {
  const id = Id.new.value
  const entity1 = new User({id})
  const entity2 = new User({id})

  expect(entity1.same(entity2)).toBe(true)
  expect(entity1.different(entity2)).toBe(false)
})

test('Should calculate equality as false when the entities have different IDs', () => {
  const id1 = Id.new.value
  const id2 = Id.new.value
  const entity1 = new User({id: id1})
  const entity2 = new User({id: id2})

  expect(entity1.same(entity2)).toBe(false)
  expect(entity1.different(entity2)).toBe(true)
})


test('Should clone an entity', () => {
  const entity = new User({name: 'John', age: 25})
  const clone = entity.clone({name: 'Jane'})

  expect(clone.id.value).toBe(entity.id.value)
  expect(clone.props.name).toBe('Jane')
  expect(clone.props.age).toBe(entity.props.age)
})
