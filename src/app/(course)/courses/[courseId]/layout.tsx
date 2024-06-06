import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { CourseNavbar } from "./_components/course-navbar";
import { CourseSidebar } from "./_components/course-sidebar";

import { getProgress } from "../../../../../actions/get-progress";

export default async function CourseLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: { courseId: string };
}>) {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const course = await db.course.findUnique({
        include: {
            chapters: {
                include: {
                    userProgress: {
                        where: {
                            userId,
                        },
                    },
                },
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

    const progressCount = await getProgress(userId, course.id);

    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                <CourseNavbar
                    course={course}
                    progressCount={progressCount}
                />
            </div>

            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <CourseSidebar
                    course={course}
                    progressCount={progressCount}
                />
            </div>

            <main className="md:pl-80 pt-[80px] h-full">
                {children}
            </main>
        </div>
    );
}
