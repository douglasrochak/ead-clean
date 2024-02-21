import { Course, Lesson } from "..";
import UseCaseAdmin from "../../shared/UseCaseAdmin";

interface Input {
  lesson: Lesson
  position?: number
  course: Course
}

export default class AddLesson extends UseCaseAdmin<Input, Course> {
  protected async executeAsAdmin(input: Input): Promise<Course> {
    return input.course.addLesson(input.lesson, input.position!)
  }
} 
