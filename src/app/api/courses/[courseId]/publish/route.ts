import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
      where: {
        id: courseId,
        userId,
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const hasPublishedChapter = course.chapters.some(
      (chapter) => chapter.isPublished
    );

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId ||
      !hasPublishedChapter
    ) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedCourse = await db.course.update({
      data: {
        isPublished: true,
      },
      where: {
        id: courseId,
        userId,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
