"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
});

export default function CreatePage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
        },
    });
    const { handleSubmit, control, formState: { isSubmitting, isValid } } = form;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post("/api/course", values);

            router.push(`/teacher/courses/${response.data.id}`);
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Name your course
                </h1>

                <p className="text-sm text-slate-600">
                    What would you like to name your course? Don&apos;t worry, you can change this later.
                </p>

                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="e.g. 'Advanced web development'"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormDescription>
                                        What will you teach in this course?
                                    </FormDescription>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button type="button" variant="ghost">
                                    Cancel
                                </Button>
                            </Link>

                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
