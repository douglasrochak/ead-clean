import Course, { CourseProps } from './model/Course';

import Lesson, { LessonProps } from './model/Lesson';
import Lessons from './model/Lessons';

import CourseRepository from './provider/CourseRepository';
import SaveCourse from './service/SaveCourse';

export type { CourseProps, CourseRepository, LessonProps }

export { Course, SaveCourse, Lesson, Lessons }
