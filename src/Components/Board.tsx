import React, { useRef, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import PlusIcon from "./PlusIcon";

interface DroppableProps {
  toDos: ITodo[];
  boardId: string;
}
interface IForm {
  toDo: string;
}

const cls = (first: string, second: string) => {
  return first + " " + second;
};

function Board({ toDos, boardId }: DroppableProps) {
  const [createTodo, setCreateTodo] = useState(false);
  const setTodos = useSetRecoilState(toDoState);
  
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onClick = () => {
    setCreateTodo(true);
  };

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setTodos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
    setCreateTodo(false);
  };



  return (
    <div className="w-[240px] pt-3 bg-slate-500 rounded-md min-h-max flex flex-col overflow-hidden mt-10">
      <div className="flex justify-center ites-center w-full h-10">
        <h3 className="font-bold text-white text-xl">{boardId}</h3>
      </div>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <div
            className="px-[20px] py-[10px] pt-[30px] bg-slate-100 min-h-[200px] flex flex-col"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div
              className={`${cls(
                "transition ease-in-out duration-500",
                snapshot.isDraggingOver
                  ? "bg-[#ff793f]"
                  : `${snapshot.draggingFromThisWith ? "bg-[#f7f1e3]" : ""}`
              )}`}
            >
              {toDos.length || createTodo ? (
                toDos.map((toDo, index) => (
                  <DragabbleCard
                    toDoId={toDo.id + ""}
                    toDoText={toDo.text}
                    index={index}
                    key={toDo.id}
                    boardId={boardId}
                  />
                ))
              ) : (
                <div onClick={onClick}>
                  <PlusIcon />
                </div>
              )}

              {createTodo ? (
                <div
                  
                >
                  <form
                    className="w-full mb-5 rounded-md bg-[#a9b1d1] font-extrabold px-2 py-3 flex justify-between items-center"
                    onSubmit={handleSubmit(onValid)}
                  >
                    <input
                      {...register("toDo", { required: true })}
                      type="text"
                      placeholder={`${boardId}`}
                      className="w-full rounded-sm px-3 py-1"
                    />
                  </form>
                </div>
              ) : null}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Board;
