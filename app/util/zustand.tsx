import { create } from 'zustand';

interface CounterState {
  userAdmin: string;
  setUserAdmin: (n: string) => void;
}


const useStore = create<CounterState>((set) => ({
  userAdmin: "",
  setUserAdmin: (n) => set({ userAdmin: n }),
}));

console.log("1.0 zusand useStore count= ");
export  default useStore;
