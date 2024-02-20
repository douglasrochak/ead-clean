import { Course } from "..";
import Page from "../../shared/Page";

export default interface CourseRepository {
  getPage(page: Page, publishedOnly?: boolean): Promise<Course[]>
  getQuantity(): Promise<number>
  getById(id: string): Promise<Course | null>
  save(course: Course): Promise<Course>
  delete(id: string): Promise<Course | null>
}
