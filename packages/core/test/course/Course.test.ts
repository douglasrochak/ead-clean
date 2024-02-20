import { expect, test } from 'vitest'
import CourseBuilder from '../data/CourseBuilder'
import LessonBuilder from '../data/LessonBuilder'

test('Should calculate course duration', () => {
    const lessons = [
        LessonBuilder.create('Lesson #1').withDuration(63).withOrder(1).now(),
        LessonBuilder.create('Lesson #2').withDuration(1007).withOrder(2).now(),
        LessonBuilder.create('Lesson #3').withDuration(3784).withOrder(3).now(),
    ]

    const course = CourseBuilder.create().withLessons(lessons).now()
    expect(course.props.duration).toBe(4854)
    expect(course.duration.seconds).toBe(4854)
    expect(course.duration.hoursMinutesSeconds).toBe('01h 20m 54s')
})

test('Should recalculate duration and number of lessons when chapters exist', () => {
    const course = CourseBuilder.create()
        .withDuration(60 * 58)
        .withNumberOfLessons(45)
        .withoutLessons()
        .now()
    expect(course.lessonsQuantity.value).toBe(45)
    expect(course.duration.seconds).toBe(60 * 58)
})

test('Should include lesson at the specified position', () => {
    const course = CourseBuilder.create(10).now()
    const newCourse = course.addLesson(LessonBuilder.create().withName('Second').now(), 1)
    expect(newCourse.lessons.allLessons[1]!.name.complete).toBe('Second')
})

test('Should exclude lesson', () => {
    const lessons = LessonBuilder.createListWith(10)
    const course = CourseBuilder.create().withLessons(lessons).now()
    const newCourse = course.deleteLesson(lessons[0]!).deleteLesson(lessons[1]!.id)
    expect(newCourse.lessons.allLessons).toHaveLength(8)
})

test('Should update lesson', () => {
    const lessons = LessonBuilder.createListWith(10)
    const course = CourseBuilder.create().withLessons(lessons).now()
    const lessonUpdated = lessons[0]!.clone({ name: 'New Lesson' })
    const newCourse = course.updateLesson(lessonUpdated)
    expect(newCourse.lessons.allLessons).toHaveLength(10)
    expect(newCourse.lessons.allLessons[0]!.name.complete).toBe('New Lesson')
})

test('Should ignore update for non-existent lesson', () => {
    const lessons = LessonBuilder.createListWith(10)
    const course = CourseBuilder.create().withLessons(lessons).now()
    const newLesson = LessonBuilder.create().withName('New Lesson').now()
    const newCourse = course.updateLesson(newLesson)
    expect(newCourse.lessons.allLessons).toHaveLength(10)
    expect(newCourse.lessons.allLessons[0]!.name.complete).not.toBe('New Lesson')
})

test('Should ignore exclusion for invalid id', () => {
    const course = CourseBuilder.create().now()
    const newCourse = course.deleteLesson('DOES NOT EXIST')
    expect(newCourse).toBe(course)
})

test('Should toggle lesson visibility', () => {
    const lessons = LessonBuilder.createListWith(10)
    const course = CourseBuilder.create().withLessons(lessons).now()
    const newCourse = course.toggleLessonVisibility(lessons[0]!)
    expect(newCourse.lessons.allLessons[0]!.visible).toBe(!course.lessons.allLessons[0]!.visible)
})

test('Should ignore toggle visibility for invalid id', () => {
    const course = CourseBuilder.create().now()
    const newCourse = course.toggleLessonVisibility('DOES NOT EXIST')
    expect(newCourse).toBe(course)
})

test('Should move lesson', () => {
    const lessons = LessonBuilder.createListWith(10)
    const course = CourseBuilder.create().withLessons(lessons).now()
    const newCourse = course.moveLesson(lessons[0]!, 9)
    expect(newCourse.lessons.allLessons[9]!.id.value).toBe(course.lessons.allLessons[0]!.id.value)
})

test('Should ignore move to invalid id', () => {
    const course = CourseBuilder.create().now()
    const newCourse = course.moveLesson('DOES NOT EXIST', 3)
    expect(newCourse).toBe(course)
})

test('Should calculate duration and number of lessons', () => {
    const lessons = [
        LessonBuilder.create('Lesson 1').withOrder(1).withDuration(100).now(),
        LessonBuilder.create('Lesson 2').withOrder(2).withDuration(100).now(),
        LessonBuilder.create('Lesson 3').withOrder(3).withDuration(100).now(),
    ]
    const course = CourseBuilder.create().withLessons(lessons).withoutDuration().withoutNumberOfLessons().now()
    expect(course.duration.seconds).toBe(300)
    expect(course.lessonsQuantity.value).toBe(3)
})

test('Should create course without lessons, without quantity, and without duration as draft', () => {
    const course = CourseBuilder.create().withoutLessons().withoutDuration().withoutNumberOfLessons().now()
    expect(course.duration.isZero).toBe(true)
    expect(course.lessonsQuantity.isZero).toBe(true)
    expect(course.draft).toBe(true)
})

test('Should create course in draft mode', () => {
    const course = CourseBuilder.create().draft().now()
    expect(course.duration.isZero).toBe(false)
    expect(course.lessonsQuantity.isZero).toBe(false)
    expect(course.draft).toBe(true)
})

test('Should force draft mode when deleting last lesson', () => {
    const course = CourseBuilder.create(1).published().now()
    expect(course.duration.isZero).toBe(false)
    expect(course.lessonsQuantity.isZero).toBe(false)
    expect(course.draft).toBe(false)

    const courseWithoutLessons = course.deleteLesson(course.lessons.allLessons[0]!)
    expect(courseWithoutLessons.draft).toBe(true)
})
