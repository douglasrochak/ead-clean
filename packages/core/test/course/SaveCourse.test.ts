import { expect, test } from "vitest"
import { SaveCourse } from "../../src"
import CourseBuilder from "../data/CourseBuilder"
import UserBuilder from "../data/UserBuilder"
import CourseRepositoryMock from "../mock/CourseRepositoryMock"

test("Should execute SaveCourse", async () => {
    const course = CourseBuilder.create().now()
    const user = UserBuilder.create().admin().now()
    const useCase = new SaveCourse(new CourseRepositoryMock())
    const newCourse = await useCase.execute(course, user)
    expect(newCourse).toBeDefined()
})
