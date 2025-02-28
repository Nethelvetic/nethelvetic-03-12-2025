import {create} from 'zustand';

interface QuestionnaireState {
  answers: { [key: number]: number[] };
  currentStep: number;
  setAnswers: (step: number, selected: number[]) => void;
  setCurrentStep: (step: number) => void;
}

export const useQuestionnaireStore = create<QuestionnaireState>((set) => ({
  answers: {},
  currentStep: 0,
  setAnswers: (step, selected) => set((state) => ({ 
                                                     answers: { ...state.answers, [step]: selected } 
                                                   })),
  setCurrentStep: (step) => set({ 
                                  currentStep: step 
                                }),
  }));
