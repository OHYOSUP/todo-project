import React from "react";

function PlusIcon() {
  return (
    <div className="flex justify-center items-center w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-10 h-10 opacity-20 text-slate-500 hover:opacity-100 transition ease-in-out cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </div>
  );
}

export default PlusIcon;
