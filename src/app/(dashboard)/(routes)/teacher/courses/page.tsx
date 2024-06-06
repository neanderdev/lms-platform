import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function CoursesPage() {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
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
            <DataTable columns={columns} data={courses} />
        </div>
    );
}
