import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store";
import { sendPasswordLinkAsync } from "@/store/auth/async";
import { Loader2Icon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type ForgotPasswordForm = {
  email: string;
};

export function ForgotPassword() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    try {
      const resultAction = await dispatch(sendPasswordLinkAsync(data)).unwrap();
      toast.success(resultAction, {
        duration: 3000,
        icon: "🚀",
        style: {
          background: "#3A7D44",
          color: "#FCFAEE",
          fontWeight: "600",
          borderRadius: "6px",
          boxShadow: "5px 5px 0px #222222",
          fontFamily: "monospace",
        },
      });
    } catch (err: any) {
      toast.error(err || "Failed to send reset password link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDF6] px-4">
      <div className="flex flex-col gap-6 w-full max-w-md sm:max-w-md md:max-w-lg">
        <Card className="bg-[#f4fafa] text-black font-mono border border-black rounderd-lg shadow-[8px_8px_0px_#222222]">
          <CardHeader>
            <CardTitle className="text-black text-xl font-bold">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Enter your email address and we’ll send you a reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="email">
                    Email<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="test@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" variant={"blue"}>
                    {loading ? (
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Remember your password?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
