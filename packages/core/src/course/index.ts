import Course, { CourseProps } from './model/Course';

import Lesson, { LessonProps } from './model/Lesson';
import Lessons from './model/Lessons';

import CourseRepository from './provider/CourseRepository';

// Services
import SaveCourse from './service/SaveCourse';
import AddLesson from './service/AddLesson';

export type { CourseProps, CourseRepository, LessonProps }

export { Course, SaveCourse, AddLesson, Lesson, Lessons }
