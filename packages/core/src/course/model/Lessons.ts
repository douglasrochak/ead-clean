import { Lesson, LessonProps } from "..";
import Id from "../../shared/Id";

export default class Lessons {
  readonly allLessons: Lesson[]

  constructor(allLessons: LessonProps[]) {
    this.allLessons = this.order(allLessons).map(props => new Lesson(props))
  }

  get props(): LessonProps[] {
    return this.allLessons.map(lesson => lesson.props)
  }

  contains(lesson: Lesson | Id | string): boolean {
    const lessonId = this.simpleId(lesson)
    return this.allLessons.some(lesson => lesson.id.value === lessonId)
  }

  add(lesson: Lesson, position?: number): Lessons {
    const lessons = [...this.props]
    position != null ? lessons.splice(position, 0, lesson.props): lessons.push(lesson.props)
    return new Lessons(lessons.map((props, i) => ({...props, order: i + 1})))
  }

  delete(lesson: Lesson | Id | string): Lessons {
    const lessonId = this.simpleId(lesson)
    return new Lessons(this.props.filter(lesson => lesson.id !== lessonId))
  }

  update(lesson: Lesson): Lessons {
    const lessonId = this.simpleId(lesson)
    const lessons = this.allLessons.map(l => { return l.id.value === lessonId ? lesson : l })
    return new Lessons(lessons.map((lesson, i) => ({...lesson.props, order: i+1})))
  }

  notFound(lessons: Lessons): Lessons {
    const ids = lessons.allLessons.map(lesson => lesson.id.value)
    const notFound = this.allLessons.filter(lesson => !ids.includes(lesson.id.value))
    return new Lessons(notFound.map(lesson => lesson.props))
  }

  toggleVisibility(lesson: Lesson | Id | string): Lessons {
    const lessonId = this.simpleId(lesson)
    return new Lessons(
      this.props.map((lesson) => (lesson.id === lessonId ? {...lesson, visible: !lesson.visible} : lesson))
    )
  }

  move(lesson: Lesson | Id | string, delta: number): Lessons {
    const lessonId = this.simpleId(lesson)
    
    const origin = this.allLessons.findIndex(lesson => lesson.id.value === lessonId)
    if(origin === -1) return this

    const destiny = origin + delta
    if(destiny < 0 || destiny >= this.allLessons.length) return this

    const lessonsProps =  [...this.props]
    const [ lessonToMove ] = lessonsProps.splice(origin, 1)
    lessonsProps.splice(destiny, 0, lessonToMove!)

    return new Lessons(lessonsProps.map((props, i) => ({...props, order: i + 1})))
  }

  private order(lessons: LessonProps[]): LessonProps[] {
    return [...(lessons ?? [])]
      .map((lesson, i) => ({i, lesson}))
      .sort((a, b) => {
        if(a.lesson.order === b.lesson.order) return a.i - b.i
        return a.lesson.order - b.lesson.order
      })
      .map((l) => l.lesson)
      .map((a,i) => ({...a, order: i + 1}))
  }

  private simpleId(lesson: Lesson | Id | string): string {
    return lesson instanceof Lesson ? lesson.id.value 
    : lesson instanceof Id ? lesson.value : lesson
  }
}
