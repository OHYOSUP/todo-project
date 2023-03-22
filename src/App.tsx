//! 1. 삭제기능
//! 2. 새로고침 했을 때 데이터 삭제 안되도록 로컬스토리지아 firebase이용
//! 3. 보드 생성, 리스트 보기
//! 보드의 순서 바꾸기 - 보드를 하나의 draggable에 넣어서...

import { useRef, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import { useForm } from "react-hook-form";

interface ICreateBoard {
  boardTitle: string;
}

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [createBoard, setCraeteBoard] = useState(false);
  const { register, handleSubmit, setValue } = useForm<ICreateBoard>();
  const boardRef = useRef<HTMLDivElement>(null);

  const onValid = ({ boardTitle }: ICreateBoard) => {
    const newBoard = {
      id: +Date.now(),
      text: boardTitle,
    };
    setToDos((prev) => {
      return {
        ...prev,
        [boardTitle]: [],
      };
    });
    setCraeteBoard(false);
    setValue("boardTitle", "");
  };

  const boardAdd = () => {
    setCraeteBoard((prev) => !prev);
  };

  const boardDelete = () => {};

  const boardEdit = () => {
    console.log("boardEdit");
  };

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBaord = [...allBoards[source.droppableId]];
        const taskObj = sourceBaord[source.index];
        const destinationBaord = [...allBoards[destination.droppableId]];
        sourceBaord.splice(source.index, 1);
        destinationBaord.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBaord,
          [destination.droppableId]: destinationBaord,
        };
      });
    }
  };
  const outSideClick = (e: any) => {
    if (boardRef.current === e.currentTarget) {
      setCraeteBoard(false);
    }
  };
  return (
    <div className="flex">
      <div className="h-screen w-56 bg-slate-400 flex flex-col gap-16">
        <div className="h-20 flex items-center justify-center bg-slate-300 w-full">
          <span>요섭의 메모장</span>
        </div>
        {Object.keys(toDos).map((item) => (
          <div className="flex justify-between items-center [&>div]:hover:opacity-100 bg-slate-50 <w-30></w-30> h-10 cursor-pointer">
            <span className="pl-7">{item} </span>
            <div className="mr-5 opacity-0 cursor-pointer flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
                onClick={boardEdit}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        ))}
        <div className="flex h-16 items-center justify-center">
          <button onClick={boardAdd}>➕ 새 보드 만들기</button>
        </div>
      </div>
      {createBoard ? (
        <div
          ref={boardRef}
          onClick={(e) => {
            outSideClick(e);
          }}
          className="w-screen h-screen bg-black opacity-80 absolute t-0 l-0 z-0"
        >
          <div className="flex flex-col justify-center gap-10 items-center w-screen h-screen absolute z-10">
            <div>
              <h2 className="text-white text-3xl">새 보드</h2>
            </div>
            <form onSubmit={handleSubmit(onValid)}>
              <input
                className="w-[340px] h-10 pl-3 text-xl tracking-widest font-md letter bg-slate-600 text-white"
                {...register("boardTitle", {
                  required: true,
                  maxLength: 40,
                  minLength: 1,
                })}
                type="text"
                placeholder="보드 이름을 입력하세요"
              ></input>
            </form>
          </div>
        </div>
      ) : null}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex w-[100%] justify-center items-center h-[100vh]">
          <div className="grid w-[100%] grid-cols-3 max-w-[920px]">
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
