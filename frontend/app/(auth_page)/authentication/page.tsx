"use client";

import Login from "@/components/authentication/Login";
import Signup from "@/components/authentication/Signup";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function page() {
  return (
    <Suspense fallback={"...loading"}>
      <AuthenticationPage />
    </Suspense>
  );
}

function AuthenticationPage() {
  const searchParams = useSearchParams();
  const page_method = searchParams.get("method");

  const [tab, setTab] = useState<"Login" | "Signup">(
    page_method == "signup" ? "Signup" : "Login",
  );
  const isLogin = tab === "Login";

  // All this does it update the URL on the page to give search params
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("method", tab.toLowerCase());
    window.history.replaceState(null, "", url);
  }, [tab]);

  return (
    <main className="isolate w-full overflow-x-clip bg-background font-sans text-foreground motion-safe:transition-colors motion-safe:duration-200">
      <div
        className={`grid min-h-dvh w-full grid-cols-[100%_100%] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-in-out lg:grid-cols-[70%_30%_70%] ${
          isLogin ? "translate-x-0" : "-translate-x-full lg:-translate-x-[70%]"
        }`}
      >
        <AuthenticationSection active={isLogin} label="Login">
          <Login swapTab={() => setTab("Signup")} />
        </AuthenticationSection>
        <AuthenticationAside />
        <AuthenticationSection active={!isLogin} label="Signup">
          <Signup swapTab={() => setTab("Login")} />
        </AuthenticationSection>
      </div>
    </main>
  );
}

function AuthenticationSection({
  active,
  label,
  children,
}: {
  active: boolean;
  label: "Login" | "Signup";
  children: React.ReactNode;
}) {
  return (
    <section
      id={label + "_Section"}
      inert={!active}
      className="flex min-w-0 flex-col py-8"
    >
      <div className="mx-auto my-auto w-full max-w-lg px-5 sm:px-8">
        {children}
      </div>
    </section>
  );
}

function AuthenticationAside() {
  return (
    <aside aria-hidden="true" className="hidden bg-accent-panel lg:block" />
  );
}
