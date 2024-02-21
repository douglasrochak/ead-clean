import { Course, Page, CourseRepository } from '../../src'

export default class CourseRepositoryMock implements CourseRepository {
    constructor(private readonly courses: Course[] = []) {}

    async getPage(page: Page): Promise<Course[]> {
        const { number, size } = page
        const start = (number - 1) * size
        const end = start + size
        return this.courses.slice(start, end)
    }

    async getQuantity(): Promise<number> {
        return this.courses.length
    }

    async getById(id: string): Promise<Course | null> {
        return this.courses.find((c) => c.id.value === id) ?? null
    }

    async save(course: Course): Promise<Course> {
        const index = this.courses.findIndex((c) => c.id.value === course.id.value)
        if (index >= 0) {
            this.courses[index] = course
        } else {
            this.courses.push(course)
        }
        return course
    }

    async delete(id: string): Promise<Course | null> {
        const index = this.courses.findIndex((c) => c.id.value === id)
        if (index >= 0) {
            const course = this.courses[index]
            this.courses.splice(index, 1)
            return course ?? null
        }
        return null
    }
}
