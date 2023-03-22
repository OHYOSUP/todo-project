import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IDraggableProprs {
  toDoId: string;
  toDoText: string;
  index: number;
  boardId: string;
}
interface IEditForm {
  editForm: string;
}
const cls = (first: string, second: string) => {
  return first + " " + second;
};

function DragabbleCard({ toDoText, toDoId, index, boardId }: IDraggableProprs) {
  const { register, handleSubmit } = useForm<IEditForm>();
  const [card, setCard] = useRecoilState(toDoState);
  const [edit, setEdit] = useState(false);
  // 카드삭제
  const cardDelete = () => {
    console.log(boardId, card[boardId], card);
    setCard((prev) => {
      const boardCopy = [...prev[boardId]];
      const findIndex = boardCopy.findIndex((v) => v.id + "" === toDoId);
      boardCopy.splice(findIndex, 1);
      return { ...prev, [boardId]: boardCopy };
    });
  };
  const onValid = (data: IEditForm) => {
    setCard((prev) => {
      const copy = [...prev[boardId]];
      const findIndex = copy.findIndex((v) => v.id + "" === toDoId);
      const editedText = { id: +toDoId, text: data.editForm };

      copy.splice(findIndex, 1);
      copy.splice(findIndex, 0, editedText);

      return {
        ...prev,
        [boardId]: copy,
      };
    });
    setEdit((prev) => !prev);
  };

  const cardEdit = () => {
    setEdit((prev) => !prev);
    console.log(toDoId);
  };

  return (
    <Draggable draggableId={toDoId} index={index}>
      {(provided, snapshot) => (
        <div className="flex justify-between items-center">
          <div
            className={`${cls(
              "rounded-md mb-4 bg-[#a9b1d1] font-extrabold px-2 py-3 h-max w-full flex justify-between items-center [&>div]:hover:opacity-100 ",
              `${snapshot.isDragging ? "shadow-lg, shadow-slate-800" : ""}`
            )}`}
            ref={provided.innerRef}
            // 드래그할때 잡을 수 있는 부분
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <div>
              {edit ? (
                <form onSubmit={handleSubmit(onValid)}>
                  <input
                    className="w-[180px] min-w-full rounded-sm"
                    {...register("editForm")}
                    placeholder={toDoText}
                  />
                </form>
              ) : (
                toDoText
              )}
            </div>
            <div className="flex text-slate-300 opacity-0 transition ease-in-out hover:opacity-100">
              <svg
                onClick={cardEdit}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
              <svg
                onClick={cardDelete}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

//? 변하지 않은 prop은 리랜더링 하지 말아라 -> 실제로 바뀐것들만 랜더링해라
export default React.memo(DragabbleCard);
