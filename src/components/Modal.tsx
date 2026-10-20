import { useState, useEffect } from "react";

interface ModalProps {
  heading: string;
  message: string | null;
  isNewBest: boolean;
  onClick: () => void;
}

export default function Modal({
  heading,
  message,
  isNewBest,
  onClick,
}: ModalProps) {
  const [modalClass, setModalClass] = useState("opacity-0 z-[-1]");

  useEffect(() => {
    setTimeout(() => {
      setModalClass("opacity-100");
    }, 5);
  }, []);

  const handleClick = () => {
    setModalClass("opacity-0");
    setTimeout(() => {
      setModalClass("opacity-0 z-[-1]");
      onClick();
    }, 500);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 backdrop-blur backdrop-brightness-75 transition duration-500 ${modalClass}`}
    >
      <div className="flex max-w-sm flex-col gap-8 rounded-md border border-slate-900 bg-slate-700 p-8 shadow-md shadow-slate-900">
        <div className="flex flex-col gap-2 text-center">
          <div className="text-balance text-3xl">{heading}</div>
          {message && <div className="text-slate-400">{message}</div>}
          {isNewBest && (
            <div className="font-semibold text-amber-300">New best!</div>
          )}
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="rounded border border-slate-900 bg-slate-800 py-2 shadow-md shadow-slate-900 transition hover:bg-slate-600 focus:ring focus:ring-slate-500"
        >
          Play again
        </button>
      </div>
    </div>
  );
}
