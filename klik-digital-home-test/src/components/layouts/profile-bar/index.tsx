"use client";

import person from "../../../../public/image.png";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import Cookies from "js-cookie";

export default function ProfileBars() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const profileButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Berhasil Keluar! Silahkan Login Kapanpun.");
    router.push("/login");
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div
        className={`pl-20 flex flex-row justify-center items-center gap-x-3`}></div>

      <div
        ref={profileButtonRef}
        className="flex items-center gap-x-2 cursor-pointer"
        onClick={() => setIsProfileOpen(!isProfileOpen)}>
        <div className="w-10 h-10 rounded-full">
          <Image
            src={person}
            alt={"Guess"}
            width={1000}
            height={1000}
            className="w-full h-full border border-white rounded-full object-cover object-center"
          />
        </div>
        <span className="text-[14px] font-semibold text-white">Guesss</span>
      </div>

      {isProfileOpen && (
        <div
          ref={modalRef}
          className="absolute right-3 top-14 w-48 bg-white p-2 border rounded-lg shadow-md">
          <ul className="text-sm font-semibold">
            <li className="p-2 hover:bg-gray-200 rounded-md cursor-pointer">
              <Link href="/">Dashboard</Link>
            </li>

            <li className="p-2 hover:bg-gray-200 rounded-md cursor-pointer block md:hidden lg:hidden">
              <Link href="/group-management">Group Management</Link>
            </li>

            <li className="p-2 hover:bg-gray-200 rounded-md cursor-pointer block md:hidden lg:hidden">
              <Link href="/management">Management</Link>
            </li>

            <div className="px-2 hover:bg-gray-200 rounded-md cursor-pointer">
              <div className="w-full">
                <AlertDialog>
                  <AlertDialogTrigger className="w-full cursor-pointer py-2 flex flex-row items-center gap-x-2 text-[14px]">
                    Keluar
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white rounded-md w-full verticalScroll max-h-[800px] max-w-[400px] md:max-w-[500px] flex flex-col py-8 px-0">
                    <div className="w-full flex flex-row items-center pb-2 px-3">
                      <div className="w-full flex flex-col gap-y-1 px-3">
                        <AlertDialogTitle className="font-semibold text-[20px]">
                          Keluar Dari Akun Anda
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                          Kamu bisa login kembali kapan saja
                        </AlertDialogDescription>
                      </div>
                    </div>

                    <div className="w-full flex flex-col gap-y-3">
                      <div className="w-full flex flex-col gap-y-1 px-3">
                        <AlertDialogHeader className="w-full flex flex-col gap-y-5 px-3 py-2">
                          <AlertDialogFooter className="w-full flex flex-row items-center gap-x-3 justify-end">
                            <AlertDialogCancel className="mt-0 w-4/12 md:w-[28%] border border-neutral-40 px-2">
                              Batalkan
                            </AlertDialogCancel>

                            <Button
                              onClick={handleLogout}
                              className="bg-blue-400 cursor-pointer hover:bg-blue-500 text-white w-4/12 md:w-[28%]">
                              Keluar
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogHeader>
                      </div>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}
