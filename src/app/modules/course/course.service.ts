import { Types } from "mongoose";
import { CourseFilterQuery, ICourse } from "./course.interface";
import { Course } from "./course.model";

// create course 
const createCourse = async (payload: ICourse) => {
  const course = await Course.create(payload);
  return course;
};

// get all course 



const getAllCourses = async (
  query: CourseFilterQuery
): Promise<ICourse[]> => {
  const filter: any = {};

  // ⭐ Rating filter
  if (query.minRating) {
    filter.averageRating = { $gte: Number(query.minRating) };
  }

  // 🌐 Language filter
  if (query.language) {
    filter.language = query.language;
  }

  // 🎓 Level filter
  if (query.level) {
    filter.level = query.level;
  }

  // 🗂 Category filter
  if (query.category) {
    filter.category = query.category;
  }

  // 💰 Price filter
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) {
      filter.price.$gte = Number(query.minPrice);
    }
    if (query.maxPrice) {
      filter.price.$lte = Number(query.maxPrice);
    }
  }

  const courses = await Course.find(filter).lean<ICourse[]>();
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
