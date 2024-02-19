import { expect, test } from "vitest"

import { Lesson, Lessons } from "../../src"
import LessonBuilder from "../data/LessonBuilder"

test("Should create lessons with an empty array", () => {
    const lessons = new Lessons([])
    expect(lessons.allLessons).toHaveLength(0)
})

test("Should create lessons with null", () => {
    const lessons = new Lessons(null as any)
    expect(lessons.allLessons).toHaveLength(0)
})

test("Should create lessons with array in order", () => {
    const lessons = new Lessons([
        LessonBuilder.create().withOrder(1).props,
        LessonBuilder.create().withOrder(2).props,
        LessonBuilder.create().withOrder(3).props,
    ])
    expect(lessons.allLessons).toHaveLength(3)
})

test("Should create lessons with array with same order", () => {
    const lessons = new Lessons([
        LessonBuilder.create("Lesson 3").withOrder(1).props,
        LessonBuilder.create("Lesson 1").withOrder(1).props,
        LessonBuilder.create("Lesson 2").withOrder(1).props,
    ])
    expect(lessons.allLessons[0]!.name.complete).toBe("Lesson 3")
    expect(lessons.allLessons[1]!.name.complete).toBe("Lesson 1")
    expect(lessons.allLessons[2]!.name.complete).toBe("Lesson 2")
})

test("Should create lessons with array out of order", () => {
    const lessons = new Lessons([
        LessonBuilder.create("Lesson 3").withOrder(3).props,
        LessonBuilder.create("Lesson 1").withOrder(1).props,
        LessonBuilder.create("Lesson 2").withOrder(2).props,
    ])
    expect(lessons.allLessons).toHaveLength(3)
    expect(lessons.allLessons[0]!.name.complete).toBe("Lesson 1")
    expect(lessons.allLessons[1]!.name.complete).toBe("Lesson 2")
    expect(lessons.allLessons[2]!.name.complete).toBe("Lesson 3")
})

test("Should return if a lesson is contained or not", () => {
    const items = [
        LessonBuilder.create("Lesson 1").withOrder(1).now(),
        LessonBuilder.create("Lesson 2").withOrder(2).now(),
        LessonBuilder.create("Lesson 3").withOrder(3).now(),
    ]

    const lessons = new Lessons(items.map((a) => a.props))
    expect(lessons.contains(items[0]!)).toBeTruthy()
    expect(lessons.contains(items[1]!.id)).toBeTruthy()
    expect(lessons.contains("DOES NOT EXIST")).toBeFalsy()
})

test("Should include lesson at a specific position", () => {
    const lessons = new Lessons([
        LessonBuilder.create("Lesson 1").withOrder(1).props,
        LessonBuilder.create("Lesson 2").withOrder(2).props,
        LessonBuilder.create("Lesson 3").withOrder(3).props,
    ])

    const newLessons = lessons.add(LessonBuilder.create("Lesson 2.5").withOrder(2).now(), 2)
    expect(newLessons.allLessons).toHaveLength(4)
    expect(newLessons.allLessons[1]!.name.complete).toBe("Lesson 2")
    expect(newLessons.allLessons[2]!.name.complete).toBe("Lesson 2.5")
    expect(newLessons.allLessons[3]!.name.complete).toBe("Lesson 3")
})

test("Should include lesson at the end", () => {
    const lessons = new Lessons([
        LessonBuilder.create("Lesson 1").withOrder(1).props,
        LessonBuilder.create("Lesson 2").withOrder(2).props,
        LessonBuilder.create("Lesson 3").withOrder(3).props,
    ])

    const newLessons = lessons.add(LessonBuilder.create("Lesson 4").withOrder(2).now())
    expect(newLessons.allLessons).toHaveLength(4)
    expect(newLessons.allLessons[3]!.name.complete).toBe("Lesson 4")
})

test("Should exclude lesson", () => {
    const lessons = new Lessons([
        LessonBuilder.create("Lesson 1").withOrder(1).props,
        LessonBuilder.create("Lesson 2").withOrder(2).props,
        LessonBuilder.create("Lesson 3").withOrder(3).props,
    ])

    const newLessons = lessons.delete(lessons.allLessons[0]!)
    expect(newLessons.allLessons).toHaveLength(2)
    expect(newLessons.allLessons[0]!.name.complete).toBe("Lesson 2")
})

test("Should exclude lesson by id", () => {
    const lessons = new Lessons([
        LessonBuilder.create("Lesson 1").withOrder(1).props,
        LessonBuilder.create("Lesson 2").withOrder(2).props,
        LessonBuilder.create("Lesson 3").withOrder(3).props,
    ])

    const newLessons = lessons.delete(lessons.allLessons[1]!.id)
    expect(newLessons.allLessons).toHaveLength(2)
    expect(newLessons.allLessons[0]!.name.complete).toBe("Lesson 1")
})

test("Should return non-matching lessons (difference)", () => {
    const items = [
        LessonBuilder.create("Lesson 1").withOrder(1).now().props,
        LessonBuilder.create("Lesson 2").withOrder(2).now().props,
        LessonBuilder.create("Lesson 3").withOrder(3).now().props,
    ]

    const lessons = new Lessons(items)
    const otherLessons = new Lessons([items[0]!, items[2]!])

    const difference = lessons.notFound(otherLessons)
    expect(difference.allLessons).toHaveLength(1)
    expect(difference.allLessons[0]!.name.complete).toBe("Lesson 2")
})

test("Should toggle visibility of a lesson", () => {
    const items = [
        LessonBuilder.create("Lesson 1").withOrder(1).now().props,
        LessonBuilder.create("Lesson 2").withOrder(2).now().props,
        LessonBuilder.create("Lesson 3").withOrder(3).now().props,
    ]

    const lessons = new Lessons(items)
    const newLessons = lessons.toggleVisibility(items[0]!.id!)
    expect(newLessons.allLessons[0]!.visible).toBe(!lessons.allLessons[0]!.visible)
})

test("Should move lesson down", () => {
    const items = [
        LessonBuilder.create("Lesson 3").withOrder(1).now().props,
        LessonBuilder.create("Lesson 1").withOrder(2).now().props,
        LessonBuilder.create("Lesson 2").withOrder(3).now().props,
    ]

    const lessons = new Lessons(items).move(items[0]!.id!, 2)
    expect(lessons.allLessons[0]!.name.complete).toBe("Lesson 1")
    expect(lessons.allLessons[1]!.name.complete).toBe("Lesson 2")
    expect(lessons.allLessons[2]!.name.complete).toBe("Lesson 3")
})

test("Should move lesson up", () => {
    const items = [
        LessonBuilder.create("Lesson 3").withOrder(1).now().props,
        LessonBuilder.create("Lesson 1").withOrder(2).now().props,
        LessonBuilder.create("Lesson 2").withOrder(3).now().props,
    ]

    const lessons = new Lessons(items).move(items[1]!.id!, -1).move(items[2]!.id!, -1)
    expect(lessons.allLessons[0]!.name.complete).toBe("Lesson 1")
    expect(lessons.allLessons[1]!.name.complete).toBe("Lesson 2")
    expect(lessons.allLessons[2]!.name.complete).toBe("Lesson 3")
})

test("Should ignore when trying to move non-existing lesson", () => {
    const items = [
        LessonBuilder.create("Lesson 3").withOrder(1).now().props,
        LessonBuilder.create("Lesson 1").withOrder(2).now().props,
        LessonBuilder.create("Lesson 2").withOrder(3).now().props,
    ]

    const lessons = new Lessons(items)
    const otherLessons = lessons.move("DOES NOT EXIST", -1)
    expect(otherLessons).toBe(lessons)
})

test("Should ignore when trying to move lesson to invalid position", () => {
    const items = [
        LessonBuilder.create("Lesson 1").withOrder(1).now().props,
        LessonBuilder.create("Lesson 2").withOrder(2).now().props,
        LessonBuilder.create("Lesson 3").withOrder(3).now().props,
    ]

    const lessons = new Lessons(items)
    const sameLessons1 = lessons.move(items[0]!.id!, -1)
    const sameLessons2 = lessons.move(items[1]!.id!, -2)
    const sameLessons3 = lessons.move(items[2]!.id!, -3)
    expect(sameLessons1).toBe(lessons)
    expect(sameLessons2).toBe(lessons)
    expect(sameLessons3).toBe(lessons)
})

test("Should update lesson", () => {
    const items = [
        LessonBuilder.create("Lesson 1").withName("Intro").withOrder(1).now().props,
        LessonBuilder.create("Lesson 2").withOrder(2).now().props,
        LessonBuilder.create("Lesson 3").withOrder(3).now().props,
    ]

    const lessons = new Lessons(items)
    const updatedLesson = new Lesson(items[0]!).clone({ name: "Introduction" })
    const newLessons = lessons.update(updatedLesson)
    expect(newLessons.allLessons[0]!.name.complete).toBe("Introduction")
})
