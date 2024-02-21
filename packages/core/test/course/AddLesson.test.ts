import { AddLesson } from "../../src";
import LessonBuilder from "../data/LessonBuilder";
import CourseBuilder from "../data/CourseBuilder";
import UserBuilder from "../data/UserBuilder";
import { expect, test } from "vitest";

test("Should execute IncludeLesson as an administrator", async () => {
    const course = CourseBuilder.create(1).now();
    const user = UserBuilder.create().admin().now();
    const lesson = LessonBuilder.create().withName('New lesson').now();
    const useCase = new AddLesson();
    const newCourse = await useCase.execute({ course, lesson, position: 0 }, user);
    expect(newCourse.lessons.allLessons[0]!.id.value).toBe(lesson.id.value);
});
