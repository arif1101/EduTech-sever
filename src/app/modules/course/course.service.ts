/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from "mongoose";
import { CourseFilterQuery, ICourse } from "./course.interface";
import { Course } from "./course.model";
import { Section } from "../section/section.model";
import { Lesson } from "../lesson/lesson.model";

// create course
const createCourse = async (payload: ICourse) => {
  const course = await Course.create(payload);
  return course;
};

// get all course
const getAllCourses = async (query: CourseFilterQuery): Promise<ICourse[]> => {
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

const getFullCourse = async (courseId: string) => {
  // 1. Get course
  const course = await Course.findById(courseId);
  if (!course) return null;

  // 2. Get sections
  const sections = await Section.find({ course: courseId }).sort({ order: 1 });

  // 3. Get lessons for each section
  const sectionsWithLessons = await Promise.all(
    sections.map(async (section) => {
      const lessons = await Lesson.find({ section: section._id }).sort({
        order: 1,
      });

      return {
        ...section.toObject(),
        lessons,
      };
    })
  );

  return {
    course,
    sections: sectionsWithLessons,
  };
};


const deleteCourse = async (courseId: string) => {
  if (!Types.ObjectId.isValid(courseId)) return null;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1️⃣ Check course
    const course = await Course.findById(courseId).session(session);
    if (!course) {
      await session.abortTransaction();
      session.endSession();
      return null;
    }

    // 2️⃣ Find sections
    const sections = await Section.find({ course: courseId }).session(session);
    const sectionIds = sections.map(section => section._id);

    // 3️⃣ Delete lessons
    await Lesson.deleteMany({ section: { $in: sectionIds } }).session(session);

    // 4️⃣ Delete sections
    await Section.deleteMany({ course: courseId }).session(session);

    // 5️⃣ Delete course
    await Course.findByIdAndDelete(courseId).session(session);

    await session.commitTransaction();
    session.endSession();

    return true;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};



export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  getFullCourse,
  deleteCourse
};
