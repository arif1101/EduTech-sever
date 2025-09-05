import { ICourse } from "./course.interface";
import { Course } from "./course.model";

// create course 
const createCourse = async (payload: ICourse) => {
  const course = await Course.create(payload);
  return course;
};

// get all course 

const getAllCourses = async (): Promise<ICourse[]> => {
  const courses = await Course.find().lean<ICourse[]>();
  return courses;
};


export const CourseService = {
  createCourse,
  getAllCourses
};
