interface CardProps {
  content: string;
  onClick: React.MouseEventHandler;
}

export default function Card(props: CardProps) {
  const { content, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className="aspect-square w-28 max-w-xs rounded-md border border-slate-900 bg-slate-700 shadow-md shadow-slate-900 sm:aspect-auto sm:h-44 sm:w-32 md:h-48 md:w-36 xl:h-72 xl:w-44"
    >
      {content}
    </button>
  );
}
