import { create } from "zustand";

type Step = {
  date: string; // YYYY-MM-DD
  steps: number;
};

type StepStore = {
  today: number;
  week: Step[];
  setToday: (steps: number) => void;
  setWeek: (steps: Step[]) => void;
  getStepsForDay: (date: string) => number;
  reset: () => void;
};

export const useStepStore = create<StepStore>((set, get) => ({
  today: 0,
  week: [],
  setToday: (steps: number) => set({ today: steps }),
  setWeek: (steps: Step[]) => set({ week: steps }),
  getStepsForDay: (date: string) => {
    const step = get().week.find((step) => step.date === date);
    return step ? step.steps : 0;
  },
  reset: () => set({ today: 0, week: [] }),
}));
