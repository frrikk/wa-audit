"use client";

import { useForm } from "react-hook-form";
import { cn } from "@/utils/cn";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { login } from "@/app/login/actions";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email must be at least one character" })
    .email({ message: "Must be a valid email address" }),
  password: z.string().min(4),
});

export type FormType = z.infer<typeof schema>;

export const Form = () => {
  const {
    formState: { isValid, errors },
    register,
    handleSubmit,
  } = useForm<FormType>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = async (data: FormType) => {
    if (isValid) {
      await login(data);
    }
  };

  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "mx-auto max-w-[500px] w-full flex flex-col bg-white p-8 rounded-md gap-4",
      )}
    >
      <div>
        <Input
          label="Email"
          {...register("email", { required: true })}
          type="text"
        />
        {errors.email && (
          <Error error={errors.email.message ?? ""} isValid={isValid} />
        )}
      </div>

      <div>
        <Input
          label="Password"
          {...register("password", { required: true })}
          type="password"
        />
        {errors.password && (
          <Error error={errors.password.message ?? ""} isValid={isValid} />
        )}
      </div>

      <button
        className={cn(
          "flex w-fill p-3 justify-center bg-sky-950 rounded-md text-sky-50 mt-4",
        )}
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const Input = forwardRef<HTMLInputElement, Input>((props, ref) => {
  return (
    <label
      className={cn(
        "flex flex-col gap-1 text-[10px] tracking-wide uppercase font-medium",
      )}
    >
      {props.label}
      <input
        {...props}
        className={cn("border p-3 text-sm font-normal rounded-md")}
        ref={ref}
      />
    </label>
  );
});

Input.displayName = "Input";

const Error = ({
  error,
  isValid,
}: {
  error: string | undefined;
  isValid: boolean;
}) => {
  const errorStyles = cn(
    "flex text-xs rounded-lg w-fit py-1 px-2 text-sky-800 mt-1 items-center gap-1",
  );

  return (
    <div className={errorStyles}>
      <IconExclamationCircle size={16} />
      <p>{error}</p>
    </div>
  );
};
