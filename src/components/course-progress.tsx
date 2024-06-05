import { cn } from "@/lib/utils";

import { Progress } from "./ui/progress";

interface CourseProgressProps {
    variant?: "default" | "success";
    size?: "default" | "sm";
    value: number;
};

const colorByVariants = {
    default: "text-sky-700",
    success: "text-emerald-700",
};

const sizeByVariants = {
    default: "text-sm",
    sm: "text-xs",
};

export function CourseProgress({ variant, size, value }: CourseProgressProps) {
    return (
        <div>
            <Progress
                className="h-2"
                value={value}
                variant={variant}
            />

            <p className={cn(
                "font-medium mt-2 text-sky-700",
                colorByVariants[variant || "default"],
                sizeByVariants[size || "default"]
            )}>
                {Math.round(value)}% Complete
            </p>
        </div>
    );
}
