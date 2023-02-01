interface CardProps {
  content: string;
  onClick: React.MouseEventHandler;
}

export default function Card({ content, onClick }: CardProps) {
  const handleClick: React.MouseEventHandler = (event) => {
    setTimeout(() => {
      onClick(event);
    }, 200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="aspect-square w-28 max-w-xs rounded-md border border-slate-900 bg-slate-700 shadow-md shadow-slate-900 transition duration-75 active:scale-95 sm:aspect-auto sm:h-44 sm:w-32 md:h-48 md:w-36 xl:h-72 xl:w-44"
    >
      {content}
    </button>
  );
}
