"use client";

import Image from "next/image";
import logo from "./../../../../../public/Logo.png";
import React, { useState } from "react";
import { Eye, EyeClosed, Loader, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ApiResponse, DataObject } from "@/types";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { loginSchema } from "@/validations";
import { useLoginMutation } from "@/stores/features/auth-features/api";
import { LoginInterface } from "@/stores/features/auth-features/interface";

export default function LoginPage() {
  const router = useRouter();
  const [seen, setSeen] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [login, { isLoading, reset }] = useLoginMutation();

  const postLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    const validationResult = loginSchema.safeParse(user);

    if (!validationResult.success) {
      const newErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((err) => {
        newErrors[err.path[0].toString()] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      const response: ApiResponse<DataObject<LoginInterface>> = await login(
        user
      ).unwrap();

      if (response?.status === "success") {
        Cookies.set("token", response?.data?.id.toString());
        toast.success(response?.message);
        reset();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal Masuk! Periksa Kembali Username dan Password");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-5">
      <div className="flex flex-col w-full gap-y-5">
        <div className="w-full flex justify-center">
          <div className="w-5/12">
            <Image
              src={logo}
              alt="Klik DIgital"
              width={1000}
              height={1000}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <h2 className="text-[24px] font-semibold text-center bg-gradient-to-r from-[#763333] via-none to-[#f51d1d] inline-block text-transparent bg-clip-text">
          Selamat datang di Klik Digital Sinergi
        </h2>
      </div>
      {/* start */}
      <div className="w-full flex flex-col gap-y-12 p-6">
        <form onSubmit={postLoginUser} className="w-full flex flex-col gap-y-8">
          <div className="w-full grid grid-rows-2 gap-y-4">
            <div className="w-full flex flex-col gap-y-2">
              <div className="w-full flex flex-row items-center gap-x-2 bg-gradient-to-r from-[#f51d1d] via-none to-[#763333] rounded-md p-2">
                <Mail className="w-5 h-5 text-white" />
                <div className="w-full">
                  <Input
                    type="text"
                    name="username"
                    value={user?.username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    className="placeholder:opacity-20 placeholder:text-white focus:text-white text-white"
                    placeholder="Masukkan Username Anda"
                  />
                </div>
              </div>
              {errors.username && (
                <p className="text-red-500 text-[14px]">{errors.username}</p>
              )}
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <div className="w-full flex flex-row items-center gap-x-2 bg-gradient-to-r from-[#763333] via-none to-[#f51d1d] rounded-md p-2">
                <Lock className="w-5 h-5 text-white" />
                <div className="w-full flex flex-row gap-x-1 items-center justify-between">
                  <Input
                    type={!seen ? "text" : "password"}
                    name="password"
                    value={user?.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    autoComplete="off"
                    className="placeholder:opacity-20 placeholder:text-white focus:text-white text-white"
                    placeholder="Masukkan Kata Sandi Anda"
                  />
                  <div
                    onClick={() => setSeen(!seen)}
                    className="p-2 cursor-pointer">
                    {seen ? (
                      <EyeClosed className="text-white w-[20px] h-[20px]" />
                    ) : (
                      <Eye className="text-white w-[20px] h-[20px]" />
                    )}
                  </div>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[14px]">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-2">
            <div className="flex flex-col w-full">
              <div className="font-normal text-primary-400 hover:font-semibold text-end text-[14px] cursor-pointer hover:text-primary-500">
                Lupa kata sandi?
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-primary-500 h-10 text-white w-full">
              {isLoading ? <Loader className="animate-spin" /> : "Masuk"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
