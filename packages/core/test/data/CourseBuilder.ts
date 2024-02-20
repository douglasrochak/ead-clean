import { Lesson, Course, CourseProps } from "../../src"
import { faker } from "@faker-js/faker"
import LessonBuilder from "./LessonBuilder"
import CourseNames from "./CourseNames"

export default class CourseBuilder {
    private constructor(private props: CourseProps) {}

    static create(lessonsQuantity: number = 10) {
        return new CourseBuilder({
            name: CourseNames.random(),
            description: "Course description",
            imageUrl: faker.image.url(),
            price: 100,
            duration: 100,
            lessonsQuantity,
            lessons: LessonBuilder.createListWith(lessonsQuantity).map((lesson) => lesson.props),
        })
    }

    withId(id: string): CourseBuilder {
        this.props.id = id
        return this
    }

    withoutId(): CourseBuilder {
        this.props.id = undefined as any
        return this
    }

    withName(name: string): CourseBuilder {
        this.props.name = name
        return this
    }

    withoutName(): CourseBuilder {
        this.props.name = undefined as any
        return this
    }

    withDescription(description: string): CourseBuilder {
        this.props.description = description
        return this
    }

    withoutDescription(): CourseBuilder {
        this.props.description = undefined as any
        return this
    }

    withPrice(price: number): CourseBuilder {
        this.props.price = price
        return this
    }

    withoutPrice(): CourseBuilder {
        this.props.price = undefined as any
        return this
    }

    withDuration(duration: number): CourseBuilder {
        this.props.duration = duration
        return this
    }

    withoutDuration(): CourseBuilder {
        this.props.duration = undefined as any
        return this
    }

    withNumberOfLessons(lessonsQuantity: number): CourseBuilder {
        this.props.lessonsQuantity = lessonsQuantity
        return this
    }

    withoutNumberOfLessons(): CourseBuilder {
        this.props.lessonsQuantity = undefined as any
        return this
    }

    withLessons(lessons: Lesson[]): CourseBuilder {
        this.props.lessons = lessons.map((l) => l.props)
        return this
    }

    withoutLessons(): CourseBuilder {
        this.props.lessons = undefined as any
        return this
    }

    published(): CourseBuilder {
        this.props.published = true
        return this
    }

    draft(): CourseBuilder {
        this.props.published = false
        return this
    }

    now(): Course {
        return new Course(this.props)
    }
}
