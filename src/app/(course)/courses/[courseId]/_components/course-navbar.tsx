import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";

import { NavbarRoutes } from "@/app/(dashboard)/_components/navbar-routes";

import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
}

export async function CourseNavbar({ course, progressCount }: CourseNavbarProps) {
    const { userId } = auth();

    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <CourseMobileSidebar
                course={course}
                progressCount={progressCount}
            />

            <NavbarRoutes
                userId={userId}
            />
        </div>
    );
}
