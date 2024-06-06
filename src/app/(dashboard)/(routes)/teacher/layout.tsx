import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { isTeacher } from "@/lib/teacher";

export default function TeacherLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId } = auth();

    if (!userId) {
        if (!isTeacher(userId)) {
            return redirect("/");
        } else {
            return redirect("/sign-in");
        }
    }

    return <>{children}</>
}
