
import { Course } from "../course/course.model"; // assuming you have a Course model
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { ICourseCart } from "./cart.course.interface";
import { CourseCart } from "./cart.course.model";
import { Types } from "mongoose";

const addToCart = async ({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}): Promise<ICourseCart> => {
  // Check if course exists
  const course = await Course.findById(courseId);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  // Check if user already has a cart
  let cart = await CourseCart.findOne({ user: userId });

  if (!cart) {
    // Create new cart for the user
    cart = new CourseCart({
      user: userId,
      items: [
        {
          course: course._id,
          title: course.title,
          price: course.price,
          image: course.image,
        },
      ],
    });
  } else {
    // Check if course already exists in cart
    const courseExists = cart.items.some(
      (item) => item.course.toString() === courseId
    );

    if (courseExists) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Course already in cart"
      );
    }

    // Add new course to items
    cart.items.push({
    course: course._id as Types.ObjectId, // <-- fixes TS error
    title: course.title,
    price: course.price,
    image: course.image, // optional
    });
  }

  await cart.save();
  return cart;
};

const removeFromCart = async (
  userId: string,
  courseId: string
): Promise<ICourseCart | null> => {
  const cart = await CourseCart.findOne({ user: userId });

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.course.toString() === courseId
  );

  if (itemIndex === -1) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found in cart");
  }

  cart.items.splice(itemIndex, 1);

  await cart.save();
  return cart;
};

const getUserCart = async (userId: string): Promise<ICourseCart | null> => {
  const cart = await CourseCart.findOne({ user: userId }).populate("items.course");

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }

  return cart;
};



export const CourseCartService = {
  addToCart,
  getUserCart,
  removeFromCart,
};
