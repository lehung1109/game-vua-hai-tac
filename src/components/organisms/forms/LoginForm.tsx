"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

type FormState = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = React.useState<FormState>({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((s) => ({ ...s, [key]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate simple client-side
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.message ?? "Login failed.");
        return;
      }

      // login success => redirect to play page
      router.replace("/");
      router.refresh(); // refresh the page to update the header
    } catch (err) {
      setError("An error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm text-left">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border p-6 shadow-sm bg-white"
      >
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange("email")}
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            placeholder="••••••••"
            value={form.password}
            onChange={onChange("password")}
            required
            minLength={6}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-2 font-medium text-white transition active:scale-[.98] disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        <p className="text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
}
