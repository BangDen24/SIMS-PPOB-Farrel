import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/validation";
import { useLoginMutation } from "../store/services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useState } from "react";
import { MailIcon } from "lucide-react";
import { Lock } from "lucide-react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setApiError("");
      const response = await login(data).unwrap();
      const token = response.data.token;

      dispatch(setCredentials({ token }));
      navigate("/");
    } catch (error) {
      setApiError(error?.data?.message || "Login gagal. Silakan coba lagi.");
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

            <Input
              type="email"
              placeholder="masukan email anda"
              icon={MailIcon}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              type="password"
              placeholder="masukan password anda"
              icon={Lock}
              error={errors.password?.message}
              {...register("password")}
            />

            <Button type="submit" disabled={isLoading} className="mt-2">
              {isLoading ? "Loading..." : "Masuk"}
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            belum punya akun? registrasi{" "}
            <button
              onClick={() => navigate("/register")}
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

export default LoginPage;
