"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth/auth.service";
import { ApiError } from "@/services/network/network.service";
import {
  RegisterFormSchema,
  type RegisterFormValues,
  getFirstZodError,
} from "@/utils/validationRegistryForm";

export default function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = React.useState<RegisterFormValues>({
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState(false);

  const onChange =
    (key: keyof RegisterFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((s) => ({ ...s, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(false);

    // ✅ Validate by Zod (client)
    const parsed = RegisterFormSchema.safeParse(values);
    if (!parsed.success) {
      setError(getFirstZodError(parsed.error));
      return;
    }

    setLoading(true);
    try {
      await register(parsed.data); // data is clean by schema
      setOk(true);
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else setError("An error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  }

  const [showPw, setShowPw] = React.useState(false);

  return (
    <div className="mx-auto w-full max-w-sm text-left">
      <form
        onSubmit={onSubmit}
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
            value={values.email}
            onChange={onChange("email")}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            placeholder="your_username"
            value={values.username}
            onChange={onChange("username")}
          />
          <p className="text-xs text-gray-500">
            Only allow letters, numbers, underscores and dots.
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              autoComplete="new-password"
              className="w-full rounded-lg border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-black/20"
              placeholder="••••••••"
              value={values.password}
              onChange={onChange("password")}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600"
              onClick={() => setShowPw((s) => !s)}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {ok && (
          <p className="rounded-lg bg-green-50 p-2 text-sm text-green-700">
            Create account successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-2 font-medium text-white transition active:scale-[.98] disabled:opacity-60"
        >
          {loading ? "Creating…" : "Register"}
        </button>
      </form>
    </div>
  );
}
