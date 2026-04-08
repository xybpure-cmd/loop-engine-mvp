"use client";

import Link from "next/link";
import { useAppState } from "@/components/app-state";

const links = [
  { href: "/", label: "Start" },
  { href: "/current-loop", label: "Active Loop" },
  { href: "/loop-history", label: "History" },
];

export function TopNav() {
  const { resetLocalDemoData } = useAppState();

  return (
    <header className="border-b border-line bg-panel">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Loop Engine</p>
          <p className="text-sm font-medium text-slate-700">MVP Workbench</p>
        </div>
        <nav className="flex items-center gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={resetLocalDemoData}
            className="ml-1 rounded px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            Reset local demo data
          </button>
        </nav>
      </div>
    </header>
  );
}
