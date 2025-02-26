import { z } from "zod";
import { useEffect } from "react";
import axios from "axios";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../../components/button";
import Input from "../../components/inputs";
import { Card } from "../../components/card";

// Minimum 6 characters,
// At least one uppercase letter,
// One lowercase letter,
// One number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const userSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z.string().regex(passwordValidation, {
    message: "Your password is not valid",
  }),
});

const Login = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post("http://127.0.0.1:3000/signin/admin", data);
    },
    onSuccess: (response) => {
      toast.success("Login Successfully");
      queryClient.setQueryData("auth", response?.data);
      localStorage.setItem("auth", JSON.stringify(response?.data));
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const form = useForm({
    defaultValues: {
      email: "admin@admin.com",
      password: "Admin123!",
    },
    validators: {
      onChange: userSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  return (
    <div className="opacity-0 bg-gray-200 dark:bg-dark-100">
      <div className="flex flex-col items-center justify-center md:w-96 w-5/6 mx-auto h-screen">
        <Card>
          <div className="sm:p-9 p-6">
            {/* ==================== HEADING - CONTENT ==================== */}
            <h2 className="text-center text-2xl font-bold pb-5 text-gray-700 dark:text-gray-200">
              Awesome
            </h2>
            <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200 pb-1">
              Welcome to Awesome! 👋
            </h4>
            <p className="text-gray-600 dark:text-gray-300 pb-5">
              Please sign-in to your account and start the adventure
            </p>

            {/* ==================== FORM WRAPPER ==================== */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              {/* =================== EMAIL =================== */}
              <form.Field
                name="email"
                children={(field) => {
                  return (
                    <Input
                      id={field?.name}
                      type="email"
                      placeholder="Enter your email"
                      label={field?.name}
                      name={field?.name}
                      value={field?.state.value}
                      onChange={(e) => field?.handleChange(e?.target?.value)}
                      isError={field?.state?.meta?.errors?.length}
                      messageError={field?.state?.meta?.errors}
                      autoComplete="email"
                    />
                  );
                }}
              />

              {/* =================== PASSWORD =================== */}
              <form.Field
                name="password"
                children={(field) => (
                  <Input
                    id={field?.name}
                    type="password"
                    placeholder="············"
                    label={field?.name}
                    name={field?.name}
                    value={field?.state.value}
                    onChange={(e) => field?.handleChange(e?.target?.value)}
                    isError={field?.state?.meta?.errors?.length}
                    messageError={field?.state?.meta?.errors}
                    autoComplete="current-password"
                  />
                )}
              />

              {/* =================== SUBMIT BUTTON =================== */}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    className="w-full justify-center"
                    disabled={!canSubmit}
                    name={isSubmitting ? "..." : "Submit"}
                  />
                )}
              />
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
