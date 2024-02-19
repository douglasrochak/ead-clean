import { expect, test } from "vitest";

import Duration from "../../src/shared/Duration";
import Test from "../utils/Test";

test("Should create an empty duration", () => {
    expect(new Duration().seconds).toBe(0);
    expect(new Duration().hoursMinutesSeconds).toBe("00s");
    expect(new Duration().hoursMinutes).toBe("00m");
    expect(new Duration().isZero).toBe(true);
});

test("Should create a zero duration", () => {
    expect(new Duration(0).seconds).toBe(0);
    expect(new Duration(0).hoursMinutesSeconds).toBe("00s");
    expect(new Duration(0).hoursMinutes).toBe("00m");
    expect(new Duration(0).isZero).toBe(true);
});

test("Should format duration", () => {
    expect(new Duration(3666).formatted).toBe("01h 01m");
    expect(new Duration(187).formatted).toBe("03m 07s");
});

test("Should format duration in hours and minutes", () => {
    expect(new Duration(3600).hoursMinutes).toBe("01h 00m");
    expect(new Duration(3660).hoursMinutes).toBe("01h 01m");
    expect(new Duration(180).hoursMinutes).toBe("03m");
});

test("Should format duration in hours, minutes, and seconds", () => {
    expect(new Duration(3601).hoursMinutesSeconds).toBe("01h 00m 01s");
    expect(new Duration(3660).hoursMinutesSeconds).toBe("01h 01m 00s");
    expect(new Duration(180).hoursMinutesSeconds).toBe("03m 00s");
    expect(new Duration(58).hoursMinutesSeconds).toBe("58s");
});

test("Should add durations", () => {
    const d1 = new Duration(3600);
    const d2 = new Duration(180);
    expect(d1.add(d2).seconds).toBe(3780);
    expect(d1.add(d2).hoursMinutes).toBe("01h 03m");
});

test("Should compare durations as equal", () => {
    const d1 = new Duration(3600);
    const d2 = new Duration(3600);
    expect(d1.equal(d2)).toBe(true);
    expect(d1.notEqual(d2)).toBe(false);
});

test("Should compare durations as different", () => {
    const d1 = new Duration(3600);
    const d2 = new Duration(3601);
    expect(d1.equal(d2)).toBe(false);
    expect(d1.notEqual(d2)).toBe(true);
});

test("Should throw an error when trying to create a negative duration", () => {
    Test.withError(() => new Duration(-7, 0, "duration"), {
        code: "SMALL_SIZE",
        attribute: "duration",
        min: 0,
        value: -7,
    });
});

test("Should throw an error when trying to create a duration less than the minimum", () => {
    Test.withError(() => new Duration(10, 100, "duration"), {
        code: "SMALL_SIZE",
        attribute: "duration",
        min: 100,
        value: 10,
    });
});
