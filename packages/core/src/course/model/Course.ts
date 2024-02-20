import { Lesson, LessonProps, Lessons } from "..";
import Entity, { EntityProps } from "../../shared/Entity";
import Id from "../../shared/Id";
import Price from "../../shared/Price";
import Quantity from "../../shared/Quantity";
import SimpleText from "../../shared/SimpleText";
import Duration from "../../shared/Duration";
import Url from "../../shared/Url";

export interface CourseProps extends EntityProps {
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  lessons?: LessonProps[];
  lessonsQuantity?: number;
  duration?: number; 
  published?: boolean;
}

export default class Course extends Entity<Course, CourseProps> {
  readonly name: SimpleText
  readonly description: SimpleText
  readonly imageUrl: Url
  readonly price: Price
  readonly lessons: Lessons
  readonly lessonsQuantity: Quantity
  readonly duration: Duration
  readonly published: boolean = true

  constructor(props: CourseProps) {
    super({...props, ...Course.calculateDuration(props)})
    this.name = new SimpleText(props.name, 3, 80,'name', 'Course')
    this.description = new SimpleText(props.description, 3, 255, 'description', 'Course')
    this.imageUrl = new Url(props.imageUrl!, 'imageUrl', 'Course')
    this.price = new Price(props.price, 'price', 'Course')
    this.lessons = new Lessons(props.lessons!)
    // props from super
    this.lessonsQuantity = new Quantity(this.props.lessonsQuantity, 0, 'lessonsQuantity', 'Course')
    this.duration = new Duration(this.props.duration, 0, 'duration', 'Course')

    const isDraft = this.duration.isZero || this.lessonsQuantity.isZero
    this.published = isDraft ? false : props.published ?? true
  }

  get draft(): boolean {
    return !this.published
  }

  private static calculateDuration(props: CourseProps) {
    if(!props.lessons || !props.lessons.length) {
    return {
      duration: props.duration ?? 0,
      lessonsQuantity: props.lessonsQuantity ?? 0
    }
  }

    const lessons = props.lessons.map((props) => new Lesson(props))
    const duration = lessons.reduce((acc, lesson) => acc + lesson.duration.seconds, 0)
    return { duration, lessonsQuantity: lessons.length }
  }

  addLesson(lesson: Lesson, position: number): Course {
    return this.clone({lessons: this.lessons.add(lesson, position).props})
  }

  deleteLesson(lesson: Lesson | Id | string): Course {
    if(!this.lessons.contains(lesson)) return this
    const lessons = this.lessons.delete(lesson).props
    return this.clone({
      lessons,
      lessonsQuantity: lessons.length,
      duration: lessons.reduce((acc, lesson) => acc + lesson.duration, 0)
    })
  }

  updateLesson(lesson: Lesson): Course {
    if(!this.lessons.contains(lesson)) return this
    const lessons = this.lessons.update(lesson).props
    return this.clone({
      lessons,
      duration: lessons.reduce((acc, lesson) => acc + lesson.duration, 0)
    })
  }

  toggleLessonVisibility(lesson: Lesson | Id | string): Course {
    if(!this.lessons.contains(lesson)) return this
    return this.clone({lessons: this.lessons.toggleVisibility(lesson).props})
  }
  
  moveLesson(lesson: Lesson | Id | string, delta: number): Course {
    if(!this.lessons.contains(lesson)) return this
    return this.clone({lessons: this.lessons.move(lesson, delta).props})
  }
  
}
