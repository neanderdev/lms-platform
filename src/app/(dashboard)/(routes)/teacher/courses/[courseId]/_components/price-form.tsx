"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    price: z.coerce.number(),
});

export function PriceForm({ initialData, courseId }: PriceFormProps) {
    const [isEditing, setIsEditing] = useState(false);

    const router = useRouter();

    function toggleEdit() {
        setIsEditing((current) => !current);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined,
        },
    });

    const { handleSubmit, control, formState: { isSubmitting, isValid } } = form;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);

            toast.success("Course updated");

            toggleEdit();

            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course price

                <Button
                    variant="ghost"
                    onClick={toggleEdit}
                >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />

                            Edit price
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData.price && "text-slate-500 italic"
                    )}
                >
                    {initialData.price
                        ? formatPrice(initialData.price)
                        : "No price"
                    }
                </p>
            )}

            {isEditing && (
                <Form {...form}>
                    <form
                        className="space-y-4 mt-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            disabled={isSubmitting}
                                            placeholder="Set a price for your course"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}
