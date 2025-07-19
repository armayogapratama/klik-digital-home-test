"use client";

import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "@/stores/store";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-gradient-to-r from-[#e62424] via-none to-[#540d0d] bg-opacity-25 w-screen h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <main className="w-screen h-screen">{children}</main>
        </Provider>
        <ToastContainer limit={5} pauseOnFocusLoss={false} autoClose={4000} />
      </Suspense>
    </section>
  );
}
