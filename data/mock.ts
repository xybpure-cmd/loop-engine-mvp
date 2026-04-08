export type EntryStateCard = {
  title: string;
  description: string;
};

export type ProjectBoardItem = {
  column: "Backlog" | "Now" | "Done";
  title: string;
};

export type CurrentLoop = {
  currentQuestion: string;
  smallestRealAction: string;
  expectedEvidence: string;
  actualResult: string;
  interpretation: string;
  nextLoopQuestion: string;
};

export type MentorMessage = {
  role: "Mentor" | "You";
  text: string;
};

export type LoopHistoryRecord = {
  date: string;
  title: string;
  note: string;
};

export const entryStates: EntryStateCard[] = [
  {
    title: "I have an idea but can't explain it",
    description: "Shape a fuzzy intent into one clear question for this loop.",
  },
  {
    title: "I know the direction but not the first step",
    description: "Translate direction into the smallest real action you can execute now.",
  },
  {
    title: "I started but got stuck",
    description: "Reset momentum with a tighter action and cleaner evidence target.",
  },
  {
    title: "I need people or resources",
    description: "Name the dependency clearly so the next loop remains actionable.",
  },
];

export const projectBoardItems: ProjectBoardItem[] = [
  { column: "Backlog", title: "Clarify user promise" },
  { column: "Now", title: "Draft current question" },
  { column: "Now", title: "Run smallest real action" },
  { column: "Done", title: "Capture interpretation" },
];

export const currentLoop: CurrentLoop = {
  currentQuestion: "What is the smallest dashboard frame users can understand in 10 seconds?",
  smallestRealAction: "Sketch one dashboard screen and test it with one teammate.",
  expectedEvidence: "Teammate can explain screen purpose without guidance.",
  actualResult: "",
  interpretation: "",
  nextLoopQuestion: "",
};

export const mentorMessages: MentorMessage[] = [
  { role: "Mentor", text: "Keep this loop small enough to finish today." },
  { role: "You", text: "I will test one screen with one person and capture evidence." },
  { role: "Mentor", text: "Great. Evidence first, interpretation second." },
];

export const loopHistory: LoopHistoryRecord[] = [
  {
    date: "2026-04-05",
    title: "Loop 12 completed",
    note: "Onboarding prompt reduced; setup completion improved in quick check.",
  },
  {
    date: "2026-04-03",
    title: "Loop 11 completed",
    note: "Focus cue wording improved start clarity for first-time users.",
  },
  {
    date: "2026-04-01",
    title: "Loop 10 completed",
    note: "Scope narrowed to one objective, improving completion rate.",
  },
];
