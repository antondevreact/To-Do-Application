"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Flip, ToastContainer, toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/Input";
import { ILogin as IFormValues } from "@/lib/interface/user";
import { loginUser } from "@/services/user";
import { AuthorizationSchema } from "@/schema/user";
import { RedirectButton } from "./RedirectButton";
import { TOAST_MESSAGES } from "@/src/common";
import { loginInputFields, ROUTE } from "@/lib/constatns";
import "react-toastify/dist/ReactToastify.css";

export const AuthorizationForm: FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver(AuthorizationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async ({ email, password }: IFormValues) => {
    try {
      await loginUser({ email, password });
      router.push(ROUTE.MAIN);
    } catch (error) {
      console.error("Authorization error:", error);
      toast.error(TOAST_MESSAGES.AUTH_ERROR);
    }
  };

  return (
    <>
      <ToastContainer transition={Flip} autoClose={2000} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {loginInputFields.map((field) => (
          <Input<IFormValues>
            key={field.id}
            id={field.id}
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            register={register}
            error={errors[field.name]}
          />
        ))}
        <div>
          <Button
            type="submit"
            className="bg-primary p-[10px] text-white rounded-[10px] transition-opacity w-full"
            size="icon"
            disabled={!isValid}
          >
            Login
          </Button>
        </div>
        <RedirectButton
          text="Don't have an account ?"
          linkText="Register here."
          linkHref={ROUTE.REGISTRATION}
        />
      </form>
    </>
  );
};
