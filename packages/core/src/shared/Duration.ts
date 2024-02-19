import Validator from "./Validator";

export default class Duration {
  static readonly MINUTE = 60;
  static readonly HOUR = 3600;

  constructor(
    readonly seconds: number = 0,
    readonly min: number = 0,
    attribute?: string,
    object?: string,
  ) {
    this.seconds = seconds;
    Validator.value(seconds, attribute, object)
      .notNull()
      .greaterThanOrEqual(min)
      .throwIfError();
  }

  add(duration: Duration): Duration {
    return new Duration(this.seconds + duration.seconds)
  }

  get formatted(): string {
    return this.seconds < Duration.HOUR ? this.minutesSeconds : this.hoursMinutes
  }

  get hoursMinutesSeconds() {
    const {hours, minutes, seconds } = this.parts
    const h = hours.toString().padStart(2, "0")
    const m = minutes.toString().padStart(2, "0")
    const s = seconds.toString().padStart(2, "0")
    if(hours) return `${h}h ${m}m ${s}s`
    if(minutes) return `${m}m ${s}s`
    return `${s}s`
  }

  get hoursMinutes() {
    const {hours, minutes } = this.parts
    const h = hours.toString().padStart(2, "0")
    const m = minutes.toString().padStart(2, "0")
    if(hours) return `${h}h ${m}m`
    return `${m}m`
  }

  get minutesSeconds() {
    const {minutes, seconds } = this.parts
    const m = minutes.toString().padStart(2, "0")
    const s = seconds.toString().padStart(2, "0")
    if(minutes) return `${m}m ${s}s`
    return `${s}s`
  }

  get parts() {
    return {
      hours: Math.floor(this.seconds / Duration.HOUR),
      minutes: Math.floor((this.seconds % Duration.HOUR) / Duration.MINUTE),
      seconds: this.seconds % Duration.MINUTE,
    }
  }

  get isZero(): boolean {
    return this.seconds === 0
  }

  equal(duration: Duration): boolean {
    return this.seconds === duration.seconds
  }

  notEqual(duration: Duration): boolean {
    return !this.equal(duration)
  }
}
