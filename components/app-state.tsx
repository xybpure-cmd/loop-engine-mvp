"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  currentLoop as defaultCurrentLoop,
  entryStates,
  loopHistory as defaultLoopHistory,
  mentorMessages as defaultMentorMessages,
  projectBoardItems as defaultProjectBoardItems,
  type CurrentLoop,
  type LoopHistoryRecord,
  type MentorMessage,
  type ProjectBoardItem,
} from "@/data/mock";

export type ProjectDraft = {
  title: string;
  source: "card" | "idea";
  note: string;
};

type AppStateValue = {
  projectDraft: ProjectDraft | null;
  boardItems: ProjectBoardItem[];
  currentLoop: CurrentLoop;
  mentorMessages: MentorMessage[];
  loopHistory: LoopHistoryRecord[];
  createDraftFromCard: (label: string) => void;
  createDraftFromIdea: (idea: string) => void;
  updateBoardItem: (idx: number, field: "column" | "title", value: string) => void;
  updateCurrentLoopField: (field: keyof CurrentLoop, value: string) => void;
  saveCurrentLoop: () => void;
  completeLoop: () => void;
  resetLocalDemoData: () => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

const STORAGE_KEYS = {
  projectDraft: "loop-engine:projectDraft",
  currentLoop: "loop-engine:currentLoop",
  loopHistory: "loop-engine:loopHistory",
} as const;

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [projectDraft, setProjectDraft] = useState<ProjectDraft | null>(null);
  const [boardItems, setBoardItems] = useState<ProjectBoardItem[]>(defaultProjectBoardItems);
  const [currentLoop, setCurrentLoop] = useState<CurrentLoop>(defaultCurrentLoop);
  const [mentorMessages] = useState<MentorMessage[]>(defaultMentorMessages);
  const [loopHistory, setLoopHistory] = useState<LoopHistoryRecord[]>(defaultLoopHistory);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedDraft = window.localStorage.getItem(STORAGE_KEYS.projectDraft);
      const storedCurrentLoop = window.localStorage.getItem(STORAGE_KEYS.currentLoop);
      const storedLoopHistory = window.localStorage.getItem(STORAGE_KEYS.loopHistory);

      if (storedDraft) {
        setProjectDraft(JSON.parse(storedDraft) as ProjectDraft);
      }

      if (storedCurrentLoop) {
        setCurrentLoop(JSON.parse(storedCurrentLoop) as CurrentLoop);
      }

      if (storedLoopHistory) {
        setLoopHistory(JSON.parse(storedLoopHistory) as LoopHistoryRecord[]);
      }
    } catch {
      // Ignore malformed local demo data and continue with defaults.
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEYS.projectDraft, JSON.stringify(projectDraft));
  }, [projectDraft, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEYS.currentLoop, JSON.stringify(currentLoop));
  }, [currentLoop, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEYS.loopHistory, JSON.stringify(loopHistory));
  }, [loopHistory, hasHydrated]);

  const createDraftFromCard = (label: string) => {
    setProjectDraft({ title: label, source: "card", note: `Started from state: ${label}` });
  };

  const createDraftFromIdea = (idea: string) => {
    const trimmed = idea.trim();
    if (!trimmed) {
      return;
    }

    setProjectDraft({
      title: trimmed.slice(0, 60),
      source: "idea",
      note: trimmed,
    });
  };

  const updateBoardItem = (idx: number, field: "column" | "title", value: string) => {
    setBoardItems((prev) =>
      prev.map((item, i) => {
        if (i !== idx) {
          return item;
        }

        if (field === "column" && (value === "Backlog" || value === "Now" || value === "Done")) {
          return { ...item, column: value };
        }

        if (field === "title") {
          return { ...item, title: value };
        }

        return item;
      }),
    );
  };

  const updateCurrentLoopField = (field: keyof CurrentLoop, value: string) => {
    setCurrentLoop((prev) => ({ ...prev, [field]: value }));
  };

  const saveCurrentLoop = () => {
    setProjectDraft((prev) => {
      if (!prev) {
        return {
          title: entryStates[0].title,
          source: "card",
          note: "Saved current loop without explicit start input.",
        };
      }

      return prev;
    });
  };

  const completeLoop = () => {
    const nextRecord: LoopHistoryRecord = {
      date: new Date().toISOString().slice(0, 10),
      title: `Loop ${loopHistory.length + 1} completed`,
      note: `Result: ${currentLoop.actualResult || "No result captured yet"}`,
    };

    setLoopHistory((prev) => [nextRecord, ...prev]);
  };

  const resetLocalDemoData = () => {
    setProjectDraft(null);
    setCurrentLoop(defaultCurrentLoop);
    setLoopHistory(defaultLoopHistory);

    window.localStorage.removeItem(STORAGE_KEYS.projectDraft);
    window.localStorage.removeItem(STORAGE_KEYS.currentLoop);
    window.localStorage.removeItem(STORAGE_KEYS.loopHistory);
  };

  const value = useMemo<AppStateValue>(
    () => ({
      projectDraft,
      boardItems,
      currentLoop,
      mentorMessages,
      loopHistory,
      createDraftFromCard,
      createDraftFromIdea,
      updateBoardItem,
      updateCurrentLoopField,
      saveCurrentLoop,
      completeLoop,
      resetLocalDemoData,
    }),
    [projectDraft, boardItems, currentLoop, mentorMessages, loopHistory],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);

  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return ctx;
}
