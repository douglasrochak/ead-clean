// import LessonBuilder from "../data/LessonBuilder";
import { expect, test } from "vitest";
import Test from "../utils/Test";
import LessonBuilder from "../data/LessonBuilder";

test("Should throw an error with visible lesson and isZero duration", () => {
    Test.withError(() => LessonBuilder.create().withDuration(0).visible().now(), {
        code: "SMALL_SIZE",
        attribute: "duration",
        min: 1,
        value: 0,
    });
});

test("Should create an invisible lesson with isZero duration", () => {
    const lesson = LessonBuilder.create().withDuration(0).invisible().now();
    expect(lesson.visible).toBe(false);
    expect(lesson.duration.isZero).toBe(true);
});

test("Should create an invisible lesson with positive duration", () => {
    const lesson = LessonBuilder.create().withDuration(1000).invisible().now();
    expect(lesson.visible).toBe(false);
    expect(lesson.duration.isZero).toBe(false);
    expect(lesson.duration.seconds).toBe(1000);
});

test("Should create with duration and visible by default", () => {
    const lesson = LessonBuilder.create().withDuration(1000).withoutVisible().now();
    expect(lesson.visible).toBe(true);
    expect(lesson.duration.isZero).toBe(false);
    expect(lesson.duration.seconds).toBe(1000);
});

test("Should have default order as 1", () => {
    const lesson = LessonBuilder.create().withoutOrder().now();
    expect(lesson.order.value).toBe(1);
});

test("Should create lesson with order isZero", () => {
    const lesson = LessonBuilder.create().withOrder(0).now();
    expect(lesson.order.value).toBe(0);
});

test("Should throw an error when trying to create a lesson with negative order", () => {
    Test.withError(() => LessonBuilder.create().withOrder(-10).now(), {
        code: "SMALL_SIZE",
        attribute: "order",
        min: 0,
        value: -10,
    });
});

test("Should throw an error when trying to create a lesson with a small name", () => {
    try {
        LessonBuilder.create().withName("X").now();
    } catch (e: any) {
        expect(e[0]).toHaveProperty("attribute", "name");
        expect(e[0]).toHaveProperty("code", "SMALL_SIZE");
    }
});
