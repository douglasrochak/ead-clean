import { Course } from "..";
import { User } from "../..";
import UseCaseAdmin from "../../shared/UseCaseAdmin";
import CourseRepository from "../provider/CourseRepository";

export default class SaveCourse extends UseCaseAdmin<Course, Course> {
  constructor(private readonly repository: CourseRepository) {
    super();
  }

  protected executeAsAdmin(course: Course, user?: User | undefined): Promise<Course> {
    return this.repository.save(course)
  }

}
