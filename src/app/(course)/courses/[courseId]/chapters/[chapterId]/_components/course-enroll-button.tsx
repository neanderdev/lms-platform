"use client";

import { formatPrice } from "@/lib/format";

import { Button } from "@/components/ui/button";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
}

export function CourseEnrollButton({ courseId, price }: CourseEnrollButtonProps) {
    return (
        <Button
            size="sm"
            className="w-full md:w-auto"
        >
            Enroll for {formatPrice(price)}
        </Button>
    );
}
