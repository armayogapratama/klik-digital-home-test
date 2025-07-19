"use client";

import React from "react";
import LoginPage from "@/components/elements/auth/login";

export default function AuthenticationPage() {
  return (
    <section className="w-screen h-screen flex flex-row justify-center items-center">
      <div className="w-10/12 md:w-7/12 lg:w-4/12 min-h-[500px] max-h-[500px] bg-white mx-auto border border-neutral-400 rounded-md shadow-md p-5">
        <LoginPage />
      </div>
    </section>
  );
}
