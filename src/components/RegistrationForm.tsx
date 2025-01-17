"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Flip, ToastContainer, toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/src/components/ui/button";
import { RegistrationSchema } from "@/src/schema/user";
import { Input } from "@/src/components/Input";
import { IRegistration as IFormValues } from "@/lib/interface/user";
import { registerUser } from "@/services/user";
import { RedirectButton } from "./RedirectButton";
import { TOAST_MESSAGES } from "@/src/common";
import { regiserInputFields, ROUTE } from "@/lib/constatns";
import "react-toastify/dist/ReactToastify.css";

export const RegistrationForm: FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: yupResolver(RegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async ({ email, password }: IFormValues) => {
    try {
      await registerUser({ email, password });
      router.push(ROUTE.MAIN);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(TOAST_MESSAGES.REGISTER_ERROR);
    }
  };

  return (
    <>
      <ToastContainer transition={Flip} autoClose={2000} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {regiserInputFields.map((field) => (
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
            Register
          </Button>
        </div>
        <RedirectButton
          text="Do you have an account ?"
          linkText="Authorize."
          linkHref={ROUTE.LOGIN}
        />
      </form>
    </>
  );
};
