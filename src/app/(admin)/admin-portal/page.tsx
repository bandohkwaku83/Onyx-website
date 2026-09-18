"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { DEMO_ADMIN } from "@/lib/admin/data";
import { BRAND, IMAGES, LOGO } from "@/lib/constants";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { Field, TextInput } from "@/components/admin/ui/FormFields";

export default function AdminLoginPage() {
  const router = useRouter();
  const { session, ready, login } = useAdminAuth();
  const [email, setEmail] = useState<string>(DEMO_ADMIN.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ready && session) {
      router.replace("/admin-portal/dashboard");
    }
  }, [ready, session, router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login(email, password, remember);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.replace("/admin-portal/dashboard");
  };

  if (!ready || session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-r-transparent" />
      </div>
    );
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src={IMAGES.hero}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/30" />
        <div className="absolute inset-x-0 bottom-0 p-10 xl:p-14">
          <p className="text-[11px] tracking-[0.22em] text-ivory/60 uppercase">
            {BRAND.categories}
          </p>
          <h2 className="mt-4 max-w-md font-serif text-4xl font-light leading-tight text-ivory xl:text-5xl">
            Redefining
            <br />
            <span className="italic">Modern Living</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-ivory/65">
            Manage the Onyx catalogue, shop, and website content from one
            place.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-ivory px-4 py-12 sm:px-8">
        <div className="w-full max-w-[400px]">
          <div className="mb-10">
            <Image
              src={LOGO}
              alt={BRAND.name}
              width={160}
              height={48}
              className="h-9 w-auto"
              priority
            />
            <p className="mt-5 text-[10px] tracking-[0.22em] text-stone uppercase">
              Admin Portal
            </p>
            <h1 className="mt-2 font-serif text-3xl font-light tracking-tight text-charcoal sm:text-4xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm font-light text-charcoal/60">
              Sign in to manage the website and storefront.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {error ? (
              <div
                role="alert"
                className="border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            ) : null}

            <Field label="Email / Username" htmlFor="admin-email">
              <TextInput
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@onyxbuild.com"
              />
            </Field>

            <Field label="Password" htmlFor="admin-password">
              <div className="relative">
                <TextInput
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pr-16"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[10px] tracking-[0.14em] text-stone uppercase transition hover:text-charcoal"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </Field>

            <div className="flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal/70">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 border-charcoal/20 text-primary focus:ring-primary/30"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-sm text-primary transition hover:underline"
                onClick={() =>
                  setError(
                    "Password reset will be available once authentication is connected.",
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            <AdminButton
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
            >
              Login
            </AdminButton>
          </form>

          <div className="mt-6 border border-charcoal/10 bg-white px-3.5 py-3 text-xs leading-relaxed text-stone">
            <p className="text-[10px] tracking-[0.14em] text-charcoal/70 uppercase">
              Demo credentials
            </p>
            <p className="mt-1.5">
              {DEMO_ADMIN.email} · {DEMO_ADMIN.password}
            </p>
          </div>

          <p className="mt-8 text-center text-xs text-stone">
            <Link href="/" className="transition hover:text-charcoal">
              ← Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
