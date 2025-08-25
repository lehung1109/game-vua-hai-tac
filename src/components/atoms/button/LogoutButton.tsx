"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onLogout() {
    try {
      setLoading(true);
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onLogout}
      disabled={loading}
      className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
