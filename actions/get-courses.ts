import { Category, Course } from "@prisma/client";

import { db } from "@/lib/db";

import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export async function getCourses({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> {
  try {
    const courses = await db.course.findMany({
      include: {
        category: true,
        chapters: {
          select: {
            id: true,
          },
          where: {
            isPublished: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = await getProgress(userId, course.id);

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);

    return [];
  }
}
