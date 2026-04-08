"use client";

import { useAppState } from "@/components/app-state";

export default function LoopHistoryPage() {
  const { loopHistory } = useAppState();

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Completed Loops</p>
        <h1 className="text-2xl font-semibold text-slate-900">Loop Timeline</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          A chronological record of completed loops and what each loop taught the workbench.
        </p>
      </div>

      <ol className="relative space-y-5 border-l-2 border-line pl-6">
        {loopHistory.map((loop, index) => (
          <li key={`${loop.title}-${index}`} className="relative rounded-lg border border-line bg-panel p-4 shadow-soft">
            <span className="absolute -left-[30px] top-5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
              ✓
            </span>
            <p className="text-xs uppercase tracking-wide text-muted">{loop.date}</p>
            <h2 className="mt-1 text-base font-medium text-slate-900">{loop.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{loop.note}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
