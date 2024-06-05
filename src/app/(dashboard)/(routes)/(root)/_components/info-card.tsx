import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";

interface InfoCardProps {
    icon: LucideIcon;
    variant?: "default" | "success";
    label: string;
    numberOfItems: number;
}

export function InfoCard({ icon: Icon, variant, label, numberOfItems }: InfoCardProps) {
    return (
        <div className="border rounded-md flex items-center gap-x-2 p-3">
            <IconBadge
                variant={variant}
                icon={Icon}
            />

            <div>
                <p className="font-medium">
                    {label}
                </p>

                <p className="text-gray-500 text-sm">
                    {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
                </p>
            </div>
        </div>
    );
}
