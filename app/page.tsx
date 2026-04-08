"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { entryStates } from "@/data/mock";
import { useAppState } from "@/components/app-state";

export default function StartPage() {
  const router = useRouter();
  const { createDraftFromCard, createDraftFromIdea } = useAppState();
  const [idea, setIdea] = useState("");

  const handleCardStart = (label: string) => {
    createDraftFromCard(label);
    router.push("/current-loop");
  };

  const handleIdeaSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createDraftFromIdea(idea);
    router.push("/current-loop");
  };

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Loop Initiation</p>
        <h1 className="text-3xl font-semibold text-slate-900">Start a focused loop with one clear intention</h1>
        <p className="max-w-2xl text-slate-600">
          Choose the state that best matches your current moment, or write a rough idea. We will shape it into a
          concrete loop with action, evidence, and reflection.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {entryStates.map((state) => (
          <button
            key={state.title}
            type="button"
            onClick={() => handleCardStart(state.title)}
            className="rounded-lg border border-line bg-panel p-5 text-left shadow-soft transition hover:border-accent"
          >
            <h2 className="text-lg font-medium text-slate-900">{state.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{state.description}</p>
          </button>
        ))}
      </div>

      <form onSubmit={handleIdeaSubmit} className="rounded-lg border border-line bg-panel p-5 shadow-soft">
        <label htmlFor="idea" className="mb-2 block text-sm font-medium text-slate-700">
          Or enter a vague project idea to initiate a loop
        </label>
        <div className="flex gap-2">
          <input
            id="idea"
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Example: I need a clearer way to run weekly product decisions"
            className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent"
          />
          <button type="submit" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white">
            Initiate loop
          </button>
        </div>
      </form>
    </section>
  );
}
