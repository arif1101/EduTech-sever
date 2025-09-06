import { Types } from "mongoose";
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

// get single course 

const getSingleCourse = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;

  const course = await Course.findById(id)
    // .populate("instructor")      // populate instructor if it's a ref
    // .populate("instructors")     // populate multiple instructors
    .lean();

  return course;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse
};
