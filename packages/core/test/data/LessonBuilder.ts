import { Lesson, LessonProps } from '../../src'
import LessonName from './LessonName'
import { faker } from '@faker-js/faker'

export default class LessonBuilder {
    private constructor(public props: LessonProps) {}

    static create(name?: string): LessonBuilder {
        return new LessonBuilder({
            name: name ?? LessonName.random(),
            duration: faker.number.int({ min: 90, max: 3600 }),
            video: faker.internet.url(),
            order: faker.number.int({ min: 1, max: 100 }),
            visible: faker.datatype.boolean({ probability: 0.9 }),
        })
    }

    static createListWith(quantity: number): Lesson[] {
        const lesson = (i: number) =>
            LessonBuilder.create()
                .withOrder(i + 1)
                .now()
        return Array.from({ length: quantity }).map((_, i) => lesson(i))
    }

    withId(id: string): LessonBuilder {
        this.props.id = id
        return this
    }

    withName(name: string): LessonBuilder {
        this.props.name = name
        return this
    }

    withoutName(): LessonBuilder {
        this.props.name = undefined as any
        return this
    }

    withDuration(duration: number): LessonBuilder {
        this.props.duration = duration
        return this
    }

    withoutDuration(): LessonBuilder {
        this.props.duration = undefined as any
        return this
    }

    withOrder(order: number): LessonBuilder {
        this.props.order = order
        return this
    }

    withoutOrder(): LessonBuilder {
        this.props.order = undefined as any
        return this
    }

    visible(): LessonBuilder {
        this.props.visible = true
        return this
    }

    invisible(): LessonBuilder {
        this.props.visible = false
        return this
    }

    withoutVisible(): LessonBuilder {
        this.props.visible = undefined as any
        return this
    }

    now(): Lesson {
        return new Lesson(this.props)
    }
}
