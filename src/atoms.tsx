import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IBoard {
  id: number;
  title: string;
  toDos: ITodo[];
}

interface ITodoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    to_do: [{id: 1, text: "오메"}, {id: 2, text: "참말로"}]
  },
});
