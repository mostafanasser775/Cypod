'use client'
import React, { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/input";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { userSchema } from "@/schema/user";
import { userStore } from "@/store/userStore";

export default function LoginForm() {
    const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: { username: "", password: "" }
    });
    const router = useRouter();
    const [isPending, startTransition] = useTransition()
    const { login } = userStore()
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = async (user: z.infer<typeof userSchema>) => {
        startTransition(async () => {

            const res = await login(user)

            if (res) {
             
                router.push('/')
            }

        })

    };

    return (
        <div className="w-full max-w-md p-10 border rounded-large shadow-xl" dir="rtl">
            <div className="flex justify-center pb-6 mt-6 mb-10 font-sans text-2xl font-extrabold text-primary-600">
                Welcome to Our Platform
            </div>
            <div className="flex flex-col mb-8 space-y-6">
                <p className="text-base text-default-600">
                     provide your login details to access your account.
                </p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <Controller
                        control={control}
                        name="username"
                        render={({ field }) => (
                            <Input isRequired errorMessage={errors.username?.message} 
                            isInvalid={!!errors.username}
                                label="Email Address" variant="bordered"
                                {...field}
                            />
                        )}
                    />
                </div>

                <div>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Input isRequired
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {isVisible ? (
                                            <LuEyeClosed className="text-2xl text-default-400" />
                                        ) : (
                                            <LuEye className="text-2xl text-default-400" />
                                        )}
                                    </button>
                                }
                                errorMessage={errors.password?.message}
                                isInvalid={!!errors.password}
                                label="Password"
                                type={isVisible ? "text" : "password"}
                                variant="bordered" {...field}
                            />
                        )}
                    />
                </div>

                <hr className="my-10 border-t-2 border-primary-200" />

                <Button size="lg" className="w-full" variant="solid" isLoading={isPending} type="submit">
                    Log In to Your Account
                </Button>
            </form>
        </div>
    );
}