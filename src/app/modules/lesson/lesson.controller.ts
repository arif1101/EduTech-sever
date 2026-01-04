import { Request, Response } from "express";
import httpStatus from "http-status";
import { LessonService } from "./lesson.service";

const createLesson = async (req: Request, res: Response) => {
  const lesson = await LessonService.createLesson(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Lesson created successfully",
    data: lesson,
  });
};

const getLessonsBySection = async (req: Request, res: Response) => {
  const { sectionId } = req.params;

  if (!sectionId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Section ID is required",
      data: null,
    });
  }

  const lessons = await LessonService.getLessonsBySection(sectionId);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Lessons retrieved successfully",
    data: lessons,
  });
};

export const LessonController = {
  createLesson,
  getLessonsBySection,
};
