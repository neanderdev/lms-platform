"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { formatPrice } from "@/lib/format";

import { Button } from "@/components/ui/button";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
}

export function CourseEnrollButton({ courseId, price }: CourseEnrollButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    async function onClick() {
        try {
            setIsLoading(true);

            const response = await axios.post(`/api/courses/${courseId}/checkout`);

            window.location.assign(response.data.url);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            size="sm"
            className="w-full md:w-auto"
            onClick={onClick}
            disabled={isLoading}
        >
            Enroll for {formatPrice(price)}
        </Button>
    );
}
