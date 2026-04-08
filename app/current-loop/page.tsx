"use client";

import { useRouter } from "next/navigation";
import { useAppState } from "@/components/app-state";

const stages = ["Shaping", "Action", "Reflection", "Next Loop"];

export default function CurrentLoopPage() {
  const router = useRouter();
  const {
    boardItems,
    currentLoop,
    mentorMessages,
    projectDraft,
    saveCurrentLoop,
    completeLoop,
    updateBoardItem,
    updateCurrentLoopField,
  } = useAppState();

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-line bg-panel p-4 shadow-soft">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Loop Stage</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {stages.map((stage, index) => (
            <span
              key={stage}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                index === 0 ? "bg-accent text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              {stage}
            </span>
          ))}
        </div>
      </div>

      {projectDraft ? (
        <div className="rounded-lg border border-line bg-panel p-4 text-sm text-slate-700 shadow-soft">
          Initiated from: <span className="font-medium">{projectDraft.title}</span>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[300px,1fr]">
        <aside className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-soft">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">Project Board</h2>
          <ul className="mt-4 space-y-3">
            {boardItems.map((item, idx) => (
              <li key={`${item.column}-${idx}`} className="rounded-md border border-line bg-white p-3">
                <select
                  value={item.column}
                  onChange={(e) => updateBoardItem(idx, "column", e.target.value)}
                  className="w-full rounded border border-line bg-white px-2 py-1 text-xs uppercase tracking-wide text-muted"
                >
                  <option>Backlog</option>
                  <option>Now</option>
                  <option>Done</option>
                </select>
                <input
                  value={item.title}
                  onChange={(e) => updateBoardItem(idx, "title", e.target.value)}
                  className="mt-2 w-full rounded border border-line bg-white px-2 py-1 text-sm text-slate-800"
                />
              </li>
            ))}
          </ul>
        </aside>

        <section className="space-y-6">
          <article className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-900">Current Loop</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              <label className="space-y-1">
                <span>Current Question</span>
                <textarea
                  value={currentLoop.currentQuestion}
                  onChange={(e) => updateCurrentLoopField("currentQuestion", e.target.value)}
                  className="w-full rounded-md border border-line bg-white px-3 py-2"
                  rows={2}
                />
              </label>
              <label className="space-y-1">
                <span>Smallest Real Action</span>
                <textarea
                  value={currentLoop.smallestRealAction}
                  onChange={(e) => updateCurrentLoopField("smallestRealAction", e.target.value)}
                  className="w-full rounded-md border border-line bg-white px-3 py-2"
                  rows={2}
                />
              </label>
              <label className="space-y-1">
                <span>Expected Evidence</span>
                <textarea
                  value={currentLoop.expectedEvidence}
                  onChange={(e) => updateCurrentLoopField("expectedEvidence", e.target.value)}
                  className="w-full rounded-md border border-line bg-white px-3 py-2"
                  rows={2}
                />
              </label>
              <label className="space-y-1">
                <span>Actual Result</span>
                <textarea
                  value={currentLoop.actualResult}
                  onChange={(e) => updateCurrentLoopField("actualResult", e.target.value)}
                  className="w-full rounded-md border border-line bg-white px-3 py-2"
                  rows={2}
                />
              </label>
              <label className="space-y-1">
                <span>Interpretation</span>
                <textarea
                  value={currentLoop.interpretation}
                  onChange={(e) => updateCurrentLoopField("interpretation", e.target.value)}
                  className="w-full rounded-md border border-line bg-white px-3 py-2"
                  rows={2}
                />
              </label>
              <label className="space-y-1">
                <span>Next Loop Question</span>
                <textarea
                  value={currentLoop.nextLoopQuestion}
                  onChange={(e) => updateCurrentLoopField("nextLoopQuestion", e.target.value)}
                  className="w-full rounded-md border border-line bg-white px-3 py-2"
                  rows={2}
                />
              </label>
            </div>
          </article>

          <article className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-900">Mentor Dialogue</h2>
            <div className="mt-4 space-y-3">
              {mentorMessages.map((message, idx) => (
                <div key={`${message.role}-${idx}`} className="rounded-md border border-line bg-white p-3">
                  <p className="text-xs uppercase tracking-wide text-muted">{message.role}</p>
                  <p className="mt-1 text-sm text-slate-800">{message.text}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveCurrentLoop}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white"
            >
              Save current loop
            </button>
            <button
              type="button"
              onClick={() => {
                completeLoop();
                router.push("/loop-history");
              }}
              className="rounded-md border border-line bg-panel px-4 py-2 text-sm font-medium text-slate-800"
            >
              Complete this loop
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
