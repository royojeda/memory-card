interface CardProps {
  content: string;
  disabled: boolean;
  onClick: () => void;
}

export default function Card({ content, disabled, onClick }: CardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="aspect-square w-full max-w-xs touch-manipulation rounded-md border border-slate-900 bg-slate-700 text-3xl font-semibold shadow-md shadow-slate-900 transition duration-75 active:scale-95 sm:aspect-auto sm:h-44 sm:w-32 sm:text-4xl md:h-48 md:w-36 md:text-5xl xl:h-72 xl:w-44 xl:text-6xl 2xl:h-80 2xl:w-52 2xl:text-7xl short:aspect-auto short:h-full short:w-full short:text-4xl"
    >
      {content}
    </button>
  );
}
