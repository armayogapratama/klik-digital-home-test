"use client";

import ProfileBars from "@/components/layouts/profile-bar";
import Sidebars from "@/components/layouts/sidebars";
import { store } from "@/stores/store";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <div className="hidden md:block">
            <Sidebars />
          </div>

          <div className="w-full flex flex-row justify-end px-5 py-3 border-b border-neutral-300 bg-blue-100">
            <ProfileBars />
          </div>
          <main>{children}</main>
        </Provider>
        <ToastContainer limit={5} pauseOnFocusLoss={false} autoClose={4000} />
      </Suspense>
    </section>
  );
}
