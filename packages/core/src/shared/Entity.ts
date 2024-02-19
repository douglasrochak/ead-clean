import Id from "./Id"

export interface EntityProps {
  id?: string
}

export default abstract class Entity<Type, Props extends EntityProps> {
  readonly id: Id
  readonly props: Props

  constructor(props: Props) {
    this.id = new Id(props.id)
    this.props = { ...props, id: this.id.value}
  }

  same(entity: Entity<Type, Props>): boolean {
    return this.id.same(entity.id)
  }

  different(entity: Entity<Type, Props>): boolean {
    return this.id.different(entity.id)
  }

  clone(newProps: Partial<Props>, ...args: any[]): Type {
    return new (this.constructor as any)(
      {
        ...this.props,
        ...newProps,
      },
      ...args
    )
  }
}
