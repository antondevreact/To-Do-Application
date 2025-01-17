import {
  UseFormRegister,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import { Input as SHADCNInput } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

interface IProps<T extends FieldValues> {
  id: string;
  label: string;
  htmlFor?: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  name: Path<T>;
}

export const Input = <T extends FieldValues>({
  htmlFor,
  label,
  type,
  placeholder,
  register,
  error,
  name,
}: IProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <SHADCNInput
          id={htmlFor}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          {...register(name)}
          className={`mt-0 px-[15px] h-10 py-[10px] bg-transparent rounded-[10px] w-full ${
            error ? "border-red-500" : ""
          }`}
        />
        {type === "password" && (
          <Button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            size="icon"
            variant="link"
          >
            {showPassword ? (
              <Eye className="size-4" />
            ) : (
              <EyeClosed className="size-4" />
            )}
          </Button>
        )}
      </div>
      {error && error.message && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};
