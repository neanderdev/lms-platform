"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";

import { isTeacher } from "@/lib/teacher";

export function NavbarRoutes() {
    const { userId } = useAuth();
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.startsWith("/courses");
    const isSearchPage = pathname === "/search";

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}

            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isCoursePage
                    ? (
                        <Link href="/">
                            <Button size="sm" variant="ghost">
                                <LogOut className="w-4 h-4 mr-2" />

                                Exit
                            </Button>
                        </Link>
                    )
                    : isTeacher(userId) ? (
                        <Link href="/teacher/courses">
                            <Button size="sm" variant="ghost">
                                Teacher mode
                            </Button>
                        </Link>
                    ) : null
                }

                <UserButton
                    afterSignOutUrl="/"
                />
            </div>
        </>
    );
}
