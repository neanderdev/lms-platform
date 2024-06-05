import { redirect } from "next/navigation";

import { db } from "@/lib/db";

export default async function CourseIdPage({
    params,
}: {
    params: { courseId: string };
}) {
    const course = await db.course.findUnique({
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                orderBy: {
                    position: "asc",
                },
            },
        },
        where: {
            id: params.courseId,
        },
    });

    if (!course) {
        return redirect("/");
    }

    return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}
