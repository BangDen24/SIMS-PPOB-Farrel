import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/validation";
import { useRegisterMutation } from "../store/services/authApi";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useState } from "react";
import { MailIcon } from "lucide-react";
import { UserIcon } from "lucide-react";
import { Lock } from "lucide-react";
import { AtSign } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      setApiError("");
      setSuccessMessage("");

      const { ...registerData } = data;

      await registerUser(registerData).unwrap();

      setSuccessMessage("Registrasi berhasil! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setApiError(
        error?.data?.message || "Registrasi gagal. Silakan coba lagi."
      );
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8 text-black">
            <img
              src="/logo.png"
              className="w-6 h-6 bg-primary rounded-full"
              alt="Logo"
            />
            <h1 className="text-2xl font-semibold">SIMS PPOB</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {apiError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {apiError}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {successMessage}
              </div>
            )}
            <div className="flex flex-col gap-2 p-0">
              <Input
                type="email"
                placeholder="masukan email anda"
                icon={AtSign}
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                type="text"
                placeholder="nama depan"
                icon={UserIcon}
                error={errors.first_name?.message}
                {...register("first_name")}
              />

              <Input
                type="text"
                placeholder="nama belakang"
                icon={UserIcon}
                error={errors.last_name?.message}
                {...register("last_name")}
              />

              <Input
                type="password"
                placeholder="buat password"
                icon={Lock}
                error={errors.password?.message}
                {...register("password")}
              />

              <Input
                type="password"
                placeholder="konfirmasi password"
                icon={Lock}
                error={errors.confirm_password?.message}
                {...register("confirm_password")}
              />
            </div>

            <Button type="submit" disabled={isLoading} className="mt-2">
              {isLoading ? "Loading..." : "Registrasi"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            sudah punya akun? login{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary font-bold hover:scale-105 text-red-500"
            >
              di sini
            </button>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 h-auto object-cover ">
        <img
          src="login.png"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
