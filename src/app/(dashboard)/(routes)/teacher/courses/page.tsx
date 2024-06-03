import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import { db } from "@/lib/db";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function CoursesPage() {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
            <Link href="/teacher/create">
                <Button>New Course</Button>
            </Link>

            <DataTable columns={columns} data={courses} />
        </div>
    );
}
