"use client";

import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { Plus } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TodoSchema } from "@/schema/todo";

interface ITaskInputProps {
  onAddTodo: (title: string) => void;
}

interface IFormInputs {
  title: string;
}
const TaskInput: FC<ITaskInputProps> = ({ onAddTodo }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(TodoSchema),
  });

  const onSubmit = ({ title }: IFormInputs) => {
    onAddTodo(title.trim());
    reset({ title: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex items-center gap-[10px]">
        <div className="flex flex-col w-full">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  type="text"
                  placeholder="Add a new task"
                  className="px-[15px] h-10 py-[10px] bg-transparent text-white rounded-[10px] w-full border-[#3E1671] border-2 focus:outline-none"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        {isValid && (
          <Button
            type="submit"
            className="bg-primary p-[10px] rounded-[10px] transition-opacity animate-fade-in"
            size="icon"
            disabled={!isValid}
          >
            <Plus className="size-5 text-white" />
          </Button>
        )}
      </div>
    </form>
  );
};

export default TaskInput;
