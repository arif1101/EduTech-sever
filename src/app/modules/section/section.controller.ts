import { Request, Response } from "express";
import httpStatus from "http-status";
import { SectionService } from "./section.service";

const createSection = async (req: Request, res: Response) => {
  const section = await SectionService.createSection(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Section created successfully",
    data: section,
  });
};

const getSectionsByCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  if (!courseId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Course ID is required",
      data: null,
    });
  }

  const sections = await SectionService.getSectionsByCourse(courseId);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Sections retrieved successfully",
    data: sections,
  });
};

export const SectionController = {
  createSection,
  getSectionsByCourse,
};
